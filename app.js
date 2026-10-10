/* คืนนี้มีเรา — private two-player rooms via server-side Edge Function */
(() => {
  const $ = id => document.getElementById(id);
  const state = { room:null, player:null, token:null, nickname:"", story:[], turn:1, mode:"แต่งเรื่องต่อกัน", p1:"ผู้เล่น 1", p2:"ผู้เล่น 2", joined:false, pollTimer:null };
  const setup = $("setup"), roomView = $("room");
  const say = (id, text) => { const el=$(id); if(el) el.textContent=text; };
  const configReady = () => window.SUPABASE_URL && window.SUPABASE_ANON_KEY && window.ROOM_API_URL && !window.SUPABASE_URL.includes("PASTE_");
  const errorText = code => ({room_not_found:"ไม่พบห้องนี้ ลองตรวจรหัสอีกครั้งนะ",room_full:"ห้องนี้มีผู้เล่นครบ 2 คนแล้ว",not_authorized:"สิทธิ์เข้าห้องไม่ถูกต้อง ลองเข้าห้องใหม่อีกครั้ง",not_your_turn:"ยังไม่ถึงตาของนาย ลองรอสักครู่นะ",waiting_for_player_two:"รอให้ผู้เล่นคนที่ 2 เข้าห้องก่อนนะ",message_length:"ข้อความต้องมี 1–500 ตัวอักษร",only_host_can_change_mode:"เฉพาะคนสร้างห้องเท่านั้นที่เปลี่ยนโหมดได้",server_error:"เซิร์ฟเวอร์มีปัญหาชั่วคราว ลองอีกครั้งนะ"}[code] || code || "เกิดข้อผิดพลาด ลองอีกครั้งนะ");
  async function api(action, extra={}) {
    if (!configReady()) throw new Error("ยังตั้งค่าการเชื่อมต่อไม่ครบ");
    const res = await fetch(window.ROOM_API_URL, {method:"POST",headers:{"Content-Type":"application/json","apikey":window.SUPABASE_ANON_KEY,"Authorization":"Bearer "+window.SUPABASE_ANON_KEY},body:JSON.stringify({action,code:state.room?.code,player:state.player,token:state.token,...extra})});
    const data = await res.json().catch(()=>({error:"server_error"}));
    if (!res.ok) throw new Error(data.error || "server_error");
    return data;
  }
  function setMessage(text, target="roomMsg") { say(target, text); }
  function showRoom() { setup.classList.add("hidden"); roomView.classList.remove("hidden"); }
  function saveSession() { try { sessionStorage.setItem("knmr_room",state.room.code); sessionStorage.setItem("knmr_player",String(state.player)); sessionStorage.setItem("knmr_token",state.token); } catch {} }
  function clearSession() { try { sessionStorage.removeItem("knmr_room"); sessionStorage.removeItem("knmr_player"); sessionStorage.removeItem("knmr_token"); } catch {} }
  function applyRoom(room) {
    state.room=room; state.turn=room.turn_player || 1; state.mode=room.mode || state.mode;
    state.p1=room.player1_name || "ผู้เล่น 1"; state.p2=room.player2_name || "ผู้เล่น 2";
    state.joined=!!room.player2_token_hash || !!room.player2_name;
    state.story=Array.isArray(room.story)?room.story:[];
    render();
  }
  function render() {
    $("roomCode").textContent=state.room?.code || "——";
    $("p1name").textContent=state.p1; $("p2name").textContent=state.p2;
    $("p2status").textContent=state.joined?"เข้าร่วมห้องแล้ว 💗":"กำลังรอเพื่อนเข้าห้อง";
    $("p1card").classList.toggle("active",state.turn===1); $("p2card").classList.toggle("active",state.turn===2);
    $("count").textContent=`${state.story.length} ข้อความ`;
    const story=$("story"); story.replaceChildren();
    if(!state.story.length){const empty=document.createElement("div");empty.className="empty";empty.textContent="เมื่อเริ่มแต่งเรื่อง ข้อความของเราจะอยู่ตรงนี้ 💫";story.append(empty);}
    else state.story.forEach(item=>{const bubble=document.createElement("div");bubble.className="bubble"+(item.player===2?" p2":"");const who=document.createElement("span");who.className="who";who.textContent=item.player===1?state.p1:state.p2;const body=document.createElement("span");body.textContent=item.text;bubble.append(who,body);story.append(bubble);});
    story.scrollTop=story.scrollHeight;
    const isMyTurn=state.player===state.turn; let banner="";
    if(!state.joined && state.player===1) banner="สร้างห้องแล้ว 💗 ส่งรหัสให้แฟนเข้าร่วมก่อนเริ่มเล่น";
    else if(!isMyTurn) banner=state.turn===1?"รอผู้เล่นคนที่ 1 แต่งก่อน…":"รอผู้เล่นคนที่ 2 แต่งก่อน…";
    else banner=state.player===1&&state.story.length===0?"ถึงตานายเริ่มแต่งเรื่องก่อนเลย ✨":"ถึงตาเธอแต่งต่อแล้วน้าา 💗";
    say("turnBanner",banner);
    $("draft").disabled=!isMyTurn||!state.joined;
    $("sendBtn").disabled=!isMyTurn||!state.joined||!$("draft").value.trim();
    $("modeSelect").value=state.mode; $("modeSelect").disabled=state.player!==1;
  }
  async function refreshRoom(silent=true){
    if(!state.room||!state.token)return;
    try{const data=await api("get");applyRoom(data.room);}
    catch(e){if(!silent)setMessage(errorText(e.message));}
  }
  function startPolling(){if(state.pollTimer)clearInterval(state.pollTimer);state.pollTimer=setInterval(()=>refreshRoom(true),1800);}
  async function createRoom(){
    if(!configReady()){say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ");return;}
    state.nickname=$("nickname").value.trim()||"ผู้เล่น 1";
    try{const data=await api("create",{name:state.nickname,mode:$("modeSelect").value});state.room=data.room;state.player=data.player;state.token=data.token;state.p1=data.room.player1_name;state.p2="ผู้เล่น 2";state.turn=1;state.story=[];state.mode=data.room.mode;state.joined=false;saveSession();showRoom();render();startPolling();history.replaceState({},"","?room="+state.room.code);setMessage("ส่งรหัส "+state.room.code+" ให้แฟนเพื่อเข้าห้องได้เลย");}
    catch(e){say("setupMsg",errorText(e.message));}
  }
  async function joinRoom(){
    if(!configReady()){say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ");return;}
    const roomCode=$("roomInput").value.trim().toUpperCase()||new URLSearchParams(location.search).get("room")?.toUpperCase();
    if(!roomCode){say("setupMsg","ใส่รหัสห้องก่อนนะ");return;}
    state.nickname=$("nickname").value.trim()||"ผู้เล่น 2";
    try{const data=await api("join",{code:roomCode,name:state.nickname});state.room=data.room;state.player=data.player;state.token=data.token;state.p1=data.room.player1_name;state.p2=data.room.player2_name;state.turn=data.room.turn_player;state.mode=data.room.mode;state.story=data.room.story||[];state.joined=true;saveSession();showRoom();render();startPolling();history.replaceState({},"","?room="+roomCode);}
    catch(e){say("setupMsg",errorText(e.message));}
  }
  async function sendStory(){const text=$("draft").value.trim();if(!text||state.player!==state.turn||!state.joined)return;
    try{const data=await api("send",{text});$("draft").value="";applyRoom(data.room);setMessage("ส่งข้อความแล้ว 💗");}
    catch(e){setMessage(errorText(e.message));await refreshRoom(true);}
  }
  async function changeMode(){if(!state.room||state.player!==1)return;try{const data=await api("mode",{mode:$("modeSelect").value});applyRoom(data.room);setMessage("เปลี่ยนโหมดแล้ว 💗");}catch(e){setMessage(errorText(e.message));}}
  $("createBtn").addEventListener("click",createRoom); $("joinBtn").addEventListener("click",joinRoom); $("sendBtn").addEventListener("click",sendStory);
  $("draft").addEventListener("input",render); $("modeSelect").addEventListener("change",changeMode);
  $("copyBtn").addEventListener("click",async()=>{const url=location.origin+location.pathname+"?room="+state.room.code;try{await navigator.clipboard.writeText(url);setMessage("คัดลอกลิงก์แล้ว ส่งให้แฟนได้เลย 💌");}catch{setMessage("ลิงก์ห้อง: "+url);}});
  $("leaveBtn").addEventListener("click",()=>{if(state.pollTimer)clearInterval(state.pollTimer);state.pollTimer=null;state.room=null;state.token=null;state.player=null;clearSession();roomView.classList.add("hidden");setup.classList.remove("hidden");history.replaceState({},"",location.pathname);});
  const urlRoom=new URLSearchParams(location.search).get("room");if(urlRoom)$("roomInput").value=urlRoom;
  if(!configReady())say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ กรุณาตรวจ public/config.js");
})();
