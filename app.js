/* คืนนี้มีเรา — six game modes + four shared styles */
(() => {
  const $ = id => document.getElementById(id);
  const MODES = ["แต่งเรื่องต่อกัน","ถามตอบรู้ใจ","ภารกิจคู่รัก","ทายใจอีกฝ่าย","เมาท์มอยไม่พัก","เลือกอะไรดี?"];
  const STYLES = ["สายฮา","สายหวาน","สายโรแมนติก","สุ่มเซอร์ไพรส์"];
  const state = {room:null,player:null,token:null,nickname:"",story:[],turn:1,mode:MODES[0],style:STYLES[0],p1:"ผู้เล่น 1",p2:"ผู้เล่น 2",joined:false,pollTimer:null};
  const setup=$("setup"), roomView=$("room");
  const say=(id,text)=>{const el=$(id);if(el)el.textContent=text;};
  const configReady=()=>window.SUPABASE_URL&&window.SUPABASE_ANON_KEY&&window.ROOM_API_URL&&!window.SUPABASE_URL.includes("PASTE_");
  const errorText=code=>({room_not_found:"ไม่พบห้องนี้ ลองตรวจรหัสอีกครั้งนะ",room_full:"ห้องนี้มีผู้เล่นครบ 2 คนแล้ว",not_authorized:"สิทธิ์เข้าห้องไม่ถูกต้อง ลองเข้าห้องใหม่อีกครั้ง",not_your_turn:"ยังไม่ถึงตาของนาย ลองรอสักครู่นะ",waiting_for_player_two:"รอให้ผู้เล่นคนที่ 2 เข้าห้องก่อนนะ",message_length:"ข้อความต้องมี 1–500 ตัวอักษร",only_host_can_change_mode:"เฉพาะคนสร้างห้องเท่านั้นที่เปลี่ยนโหมดหรือสไตล์ได้",server_error:"เซิร์ฟเวอร์มีปัญหาชั่วคราว ลองอีกครั้งนะ"}[code]||code||"เกิดข้อผิดพลาด ลองอีกครั้งนะ");
  function packSettings(mode=state.mode,style=state.style){return `${mode} • ${style}`.slice(0,60)};
  function unpackSettings(value){const parts=String(value||"").split(" • ");state.mode=MODES.includes(parts[0])?parts[0]:MODES[0];state.style=STYLES.includes(parts[1])?parts[1]:STYLES[0];}
  async function api(action,extra={}){if(!configReady())throw new Error("ยังตั้งค่าการเชื่อมต่อไม่ครบ");const res=await fetch(window.ROOM_API_URL,{method:"POST",headers:{"Content-Type":"application/json","apikey":window.SUPABASE_ANON_KEY,"Authorization":"Bearer "+window.SUPABASE_ANON_KEY},body:JSON.stringify({action,code:state.room?.code,player:state.player,token:state.token,...extra})});const data=await res.json().catch(()=>({error:"server_error"}));if(!res.ok)throw new Error(data.error||"server_error");return data;}
  function setMessage(text,target="roomMsg"){say(target,text);}
  function showRoom(){setup.classList.add("hidden");roomView.classList.remove("hidden");}
  function saveSession(){try{sessionStorage.setItem("knmr_room",state.room.code);sessionStorage.setItem("knmr_player",String(state.player));sessionStorage.setItem("knmr_token",state.token);}catch{}}
  function clearSession(){try{sessionStorage.removeItem("knmr_room");sessionStorage.removeItem("knmr_player");sessionStorage.removeItem("knmr_token");}catch{}}
  function prompts(){
    const pools={
      "แต่งเรื่องต่อกัน":["จู่ ๆ ก็มีจดหมายปริศนาส่งมาถึงเรา…","คืนนั้นเราเห็นดาวตก แล้วมีเรื่องมหัศจรรย์เกิดขึ้น…","ถ้าเราได้ออกเดินทางด้วยกัน เรื่องเริ่มต้นที่…"],
      "ถามตอบรู้ใจ":["ช่วงนี้อะไรทำให้ยิ้มได้ง่ายที่สุด?","ถ้าเลือกวันพักผ่อนได้หนึ่งวัน อยากทำอะไร?","มีเรื่องเล็ก ๆ อะไรที่อยากให้อีกฝ่ายรู้ไหม?"],
      "ภารกิจคู่รัก":["ส่งอีโมจิ 3 ตัวที่อธิบายอีกฝ่ายได้ดีที่สุด","ตั้งฉายาใหม่ให้อีกฝ่าย 1 ชื่อ พร้อมเหตุผล","ชมอีกฝ่ายหนึ่งอย่างที่ไม่ค่อยได้พูด"],
      "ทายใจอีกฝ่าย":["คิดว่าอีกฝ่ายอยากไปเที่ยวที่ไหนมากที่สุด?","เดาว่าอีกฝ่ายจะเลือกทะเลหรือภูเขา?","คิดว่าเมนูโปรดที่อีกฝ่ายกินได้บ่อย ๆ คืออะไร?"],
      "เมาท์มอยไม่พัก":["ถ้าพรุ่งนี้ตื่นมาแล้วมีเงินเที่ยวได้ทันที จะไปไหน?","เรื่องเปิ่น ๆ ที่นึกถึงทีไรก็ขำคืออะไร?","ถ้าชีวิตเราเป็นหนัง ชื่อเรื่องจะชื่ออะไร?"],
      "เลือกอะไรดี?":["ทะเล 🏖️ หรือภูเขา ⛰️? บอกเหตุผลด้วย","ดูหนัง 🎬 หรือเล่นเกม 🎮? ทำไมถึงเลือกอันนั้น","กินของหวาน 🍰 หรือของคาว 🍕 ตลอดหนึ่งวัน?"]
    };
    let pool=pools[state.mode]||pools[MODES[0]];
    if(state.style==="สายฮา")pool=pool.concat(["ถ้าอีกฝ่ายเป็นมีมหนึ่งรูป จะเป็นรูปไหน?","ตั้งชื่อแก๊งของเราสองคนแบบฮา ๆ หน่อย"]);
    if(state.style==="สายหวาน")pool=pool.concat(["ความทรงจำเล็ก ๆ เรื่องไหนที่ทำให้ยิ้มได้?","มีอะไรน่ารัก ๆ ที่อยากทำด้วยกันสักครั้ง?"]);
    if(state.style==="สายโรแมนติก")pool=pool.concat(["ถ้ามีคืนพิเศษด้วยกัน อยากให้บรรยากาศเป็นแบบไหน?","เพลงไหนเหมาะกับเรื่องราวของเราสองคน?"]);
    if(state.style==="สุ่มเซอร์ไพรส์")pool=pool.concat(pools[MODES[Math.floor(Math.random()*MODES.length)]]||[]);
    return pool;
  }
  function modeCopy(){return ({
    "แต่งเรื่องต่อกัน":{title:"เรื่องราวของเรา ✍️",label:"เขียนเรื่องราวต่อ",placeholder:"ช่วยกันแต่งเรื่องทีละตา…",button:"ส่งเรื่องและส่งตา 💌",banner:"ถึงตาของนายแล้ว ช่วยกันแต่งเรื่องต่อเลย ✨"},
    "ถามตอบรู้ใจ":{title:"ถามตอบรู้ใจ 💗",label:"คำตอบของเรา",placeholder:"ตอบคำถามหรือเขียนสิ่งที่อยากให้อีกฝ่ายรู้…",button:"ส่งคำตอบ 💌",banner:"ถึงตาตอบแล้ว มาทำความรู้จักกันให้มากขึ้น 💗"},
    "ภารกิจคู่รัก":{title:"ภารกิจของเรา 🎯",label:"รายงานภารกิจ",placeholder:"พิมพ์คำตอบหรือบอกว่าทำภารกิจสำเร็จยังไง…",button:"ส่งภารกิจ 💌",banner:"ถึงตารับภารกิจแล้ว ลุยเลย! 🎯"},
    "ทายใจอีกฝ่าย":{title:"ทายใจอีกฝ่าย 🔮",label:"คำทายของเรา",placeholder:"เดาว่าอีกฝ่ายจะตอบอะไร พร้อมเหตุผล…",button:"ส่งคำทาย 💌",banner:"ลองทายใจอีกฝ่ายดูสิ 🔮"},
    "เมาท์มอยไม่พัก":{title:"เมาท์มอยไม่พัก 🗣️",label:"เล่ามาได้เลย",placeholder:"คุยได้ทุกเรื่อง จะฮา จะจริงจังก็ได้…",button:"ส่งแล้วส่งตาต่อ 💌",banner:"ถึงตาเมาท์แล้ว เล่ามาให้หมด 555 😂"},
    "เลือกอะไรดี?":{title:"เลือกอะไรดี? ⚖️",label:"ตัวเลือกของเรา",placeholder:"เลือกหนึ่งอย่างจากหัวข้อ แล้วบอกเหตุผล…",button:"ล็อกคำตอบและส่งตา 💌",banner:"เลือกคำตอบของตัวเอง แล้วมาดูว่าใจตรงกันไหม! ⚖️"}
  })[state.mode]||{title:"เล่นด้วยกัน 💗",label:"พิมพ์คำตอบ",placeholder:"พิมพ์ข้อความตรงนี้…",button:"ส่งข้อความ 💌",banner:"ถึงตาของนายแล้ว 💗"};}
  function applyRoom(room){state.room=room;state.turn=room.turn_player||1;unpackSettings(room.mode);state.p1=room.player1_name||"ผู้เล่น 1";state.p2=room.player2_name||"ผู้เล่น 2";state.joined=!!room.player2_token_hash||!!room.player2_name;state.story=Array.isArray(room.story)?room.story:[];render();}
  function guessState(){
    const entries=state.story.filter(x=>typeof x.text==="string" && /^(🔮 คำถาม:|💭 คำตอบ:|✅ ตัดสิน:|🙈 ตัดสิน:)/.test(x.text));
    const last=entries[entries.length-1];
    const scores=[0,0];
    entries.forEach((x,i)=>{if(x.text.startsWith("✅ ตัดสิน:")){const answer=[...entries.slice(0,i)].reverse().find(y=>y.text.startsWith("💭 คำตอบ:"));if(answer)scores[answer.player===1?0:1]++;}});
    let phase="question";
    if(last?.text.startsWith("🔮 คำถาม:"))phase="answer";
    else if(last?.text.startsWith("💭 คำตอบ:"))phase="judge";
    else if(last?.text.startsWith("✅ ตัดสิน:")||last?.text.startsWith("🙈 ตัดสิน:"))phase="question";
    return {phase,scores,last};
  }
  function render(){
    $("roomCode").textContent=state.room?.code||"——";$("p1name").textContent=state.p1;$("p2name").textContent=state.p2;$("p2status").textContent=state.joined?"เข้าร่วมห้องแล้ว 💗":"กำลังรอเพื่อนเข้าห้อง";
    $("p1card").classList.toggle("active",state.turn===1);$("p2card").classList.toggle("active",state.turn===2);$("count").textContent=`${state.story.length} ข้อความ`;
    const story=$("story");story.replaceChildren();if(!state.story.length){const empty=document.createElement("div");empty.className="empty";empty.textContent=`เริ่มเล่นโหมด${state.mode} สไตล์${state.style} แล้วข้อความจะอยู่ตรงนี้ 💫`;story.append(empty);}else state.story.forEach(item=>{const bubble=document.createElement("div");bubble.className="bubble"+(item.player===2?" p2":"");const who=document.createElement("span");who.className="who";who.textContent=item.player===1?state.p1:state.p2;const body=document.createElement("span");body.textContent=item.text;bubble.append(who,body);story.append(bubble);});story.scrollTop=story.scrollHeight;
    const c=modeCopy(),isMyTurn=state.player===state.turn;
    const guess=guessState(),isGuess=state.mode==="ทายใจอีกฝ่าย";
    $("guessPanel").classList.toggle("hidden",!isGuess);
    $("score1").textContent=String(guess.scores[0]);$("score2").textContent=String(guess.scores[1]);
    const judging=isGuess&&guess.phase==="judge"&&isMyTurn&&state.joined;
    $("correctBtn").classList.toggle("hidden",!judging);$("wrongBtn").classList.toggle("hidden",!judging);
    let banner=!state.joined&&state.player===1?"สร้างห้องแล้ว 💗 ส่งรหัสให้แฟนเข้าร่วมก่อนเริ่มเล่น":!isMyTurn?(state.turn===1?`รอ ${state.p1} เล่นก่อน…`:`รอ ${state.p2} เล่นก่อน…`):c.banner;
    say("turnBanner",banner);say("feedTitle",c.title);say("draftLabel",c.label);$("draft").placeholder=c.placeholder;$("sendBtn").textContent=c.button;
    const answerPhase=isGuess&&guess.phase==="answer";
    $("draft").disabled=!isMyTurn||!state.joined||judging;
    $("sendBtn").disabled=!isMyTurn||!state.joined||!$("draft").value.trim()||judging;
    $("promptBtn").disabled=!isMyTurn||!state.joined||judging;
    if(isGuess){
      if(guess.phase==="question"){$("draftLabel").textContent="ตั้งคำถามให้เพื่อนทาย";$("draft").placeholder="พิมพ์คำถามที่อีกฝ่ายต้องทาย…";$("sendBtn").textContent="ส่งคำถาม 🔮";}
      else if(answerPhase){$("draftLabel").textContent="คำทายของเรา";$("draft").placeholder="ลองทายคำตอบของอีกฝ่าย…";$("sendBtn").textContent="ส่งคำทาย 💭";}
      else {$("draftLabel").textContent="รอผู้ตั้งคำถามตัดสิน";$("draft").placeholder="อีกฝ่ายกำลังตัดสินคำตอบ…";$("sendBtn").textContent="รอผลตัดสิน";}
      $("guessHint").textContent=guess.phase==="question"?"ตั้งคำถามก่อน แล้วให้อีกฝ่ายทายคำตอบ":guess.phase==="answer"?"ถึงตาของอีกฝ่ายลองทายใจคุณ":"คนตั้งคำถามเลือกว่าถูกหรือยังไม่ถูกได้เลย";
    }
    $("modeSelect").value=state.mode;$("styleSelect").value=state.style;$("modeSelect").disabled=state.player!==1;$("styleSelect").disabled=state.player!==1;
    document.querySelectorAll(".mode-card").forEach(card=>{card.classList.toggle("selected",card.dataset.mode===state.mode);card.disabled=state.player!==1;});
    $("randomModeBtn").disabled=state.player!==1;
    document.body.dataset.style=state.style;
  }
  async function refreshRoom(silent=true){if(!state.room||!state.token)return;try{const data=await api("get");applyRoom(data.room);}catch(e){if(!silent)setMessage(errorText(e.message));}}
  function startPolling(){if(state.pollTimer)clearInterval(state.pollTimer);state.pollTimer=setInterval(()=>refreshRoom(true),1800);}
  async function createRoom(){if(!configReady()){say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ");return;}state.nickname=$("nickname").value.trim()||"ผู้เล่น 1";try{const data=await api("create",{name:state.nickname,mode:packSettings(MODES[0],STYLES[0])});state.player=data.player;state.token=data.token;applyRoom(data.room);saveSession();showRoom();startPolling();history.replaceState({},"","?room="+state.room.code);setMessage("ส่งรหัส "+state.room.code+" ให้แฟนเพื่อเข้าห้องได้เลย");}catch(e){say("setupMsg",errorText(e.message));}}
  async function joinRoom(){if(!configReady()){say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ");return;}const roomCode=$("roomInput").value.trim().toUpperCase()||new URLSearchParams(location.search).get("room")?.toUpperCase();if(!roomCode){say("setupMsg","ใส่รหัสห้องก่อนนะ");return;}state.nickname=$("nickname").value.trim()||"ผู้เล่น 2";try{const data=await api("join",{code:roomCode,name:state.nickname});state.player=data.player;state.token=data.token;applyRoom(data.room);saveSession();showRoom();startPolling();history.replaceState({},"","?room="+roomCode);}catch(e){say("setupMsg",errorText(e.message));}}
  async function sendStory(){let text=$("draft").value.trim();if(!text||state.player!==state.turn||!state.joined)return;
    if(state.mode==="ทายใจอีกฝ่าย"){
      const gs=guessState();
      if(gs.phase==="judge"){setMessage("ผู้ตั้งคำถามต้องตัดสินก่อนนะ");return;}
      text=gs.phase==="answer"?"💭 คำตอบ: "+text:"🔮 คำถาม: "+text;
    }
    try{const data=await api("send",{text});$("draft").value="";applyRoom(data.room);setMessage("ส่งแล้ว ถึงตาอีกฝ่ายต่อเลย 💗");}catch(e){setMessage(errorText(e.message));await refreshRoom(true);}}
  async function judgeGuess(correct){
    if(state.mode!=="ทายใจอีกฝ่าย"||state.player!==state.turn||!state.joined||guessState().phase!=="judge")return;
    const text=correct?"✅ ตัดสิน: ถูก! +1 คะแนน 💗":"🙈 ตัดสิน: ยังไม่ถูก รอบหน้าลองใหม่ได้";
    try{const data=await api("send",{text});applyRoom(data.room);setMessage(correct?"บันทึกคะแนนให้คนทายแล้ว 💗":"บันทึกผลแล้ว ไปคำถามต่อไปกัน 💗");}catch(e){setMessage(errorText(e.message));await refreshRoom(true);}
  }
  async function changeSettings(){if(!state.room||state.player!==1)return;state.mode=$("modeSelect").value;state.style=$("styleSelect").value;render();try{const data=await api("mode",{mode:packSettings()});applyRoom(data.room);setMessage("เปลี่ยนโหมดและสไตล์แล้ว ทั้งคู่เห็นเหมือนกัน 💗");}catch(e){setMessage(errorText(e.message));await refreshRoom(true);}}
  $("correctBtn").addEventListener("click",()=>judgeGuess(true));$("wrongBtn").addEventListener("click",()=>judgeGuess(false));
  $("createBtn").addEventListener("click",createRoom);$("joinBtn").addEventListener("click",joinRoom);$("sendBtn").addEventListener("click",sendStory);$("draft").addEventListener("input",render);$("modeSelect").addEventListener("change",changeSettings);$("styleSelect").addEventListener("change",changeSettings);
  document.querySelectorAll(".mode-card").forEach(card=>card.addEventListener("click",()=>{if(state.player!==1)return;$("modeSelect").value=card.dataset.mode;changeSettings();}));
  $("randomModeBtn").addEventListener("click",()=>{if(state.player!==1)return;const choices=MODES.filter(m=>m!==state.mode);$("modeSelect").value=choices[Math.floor(Math.random()*choices.length)];changeSettings();});
  $("promptBtn").addEventListener("click",()=>{const pool=prompts();$("draft").value=pool[Math.floor(Math.random()*pool.length)];render();$("draft").focus();});
  $("copyBtn").addEventListener("click",async()=>{const url=location.origin+location.pathname+"?room="+state.room.code;try{await navigator.clipboard.writeText(url);setMessage("คัดลอกลิงก์แล้ว ส่งให้แฟนได้เลย 💌");}catch{setMessage("ลิงก์ห้อง: "+url);}});
  $("leaveBtn").addEventListener("click",()=>{if(state.pollTimer)clearInterval(state.pollTimer);state.pollTimer=null;state.room=null;state.token=null;state.player=null;clearSession();roomView.classList.add("hidden");setup.classList.remove("hidden");history.replaceState({},"",location.pathname);});
  const urlRoom=new URLSearchParams(location.search).get("room");if(urlRoom)$("roomInput").value=urlRoom;if(!configReady())say("setupMsg","ยังตั้งค่าการเชื่อมต่อไม่ครบ กรุณาตรวจ config.js");
})();
