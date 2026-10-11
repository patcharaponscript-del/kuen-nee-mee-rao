/* คืนนี้มีเรา — 10 เกม + สุ่มเกม + ห้องออนไลน์ */
(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const GAMES = [
    "วาดปุ๊บ ทายปั๊บ 🎨",
    "ใจตรงกันไหม? 💗",
    "ภารกิจวัดใจ 🎯",
    "นักสืบรู้ใจ 🔍",
    "ศึกเมาท์มอย ⚡",
    "เลือกแล้วลุ้น! 🎲",
    "คู่หูไขรหัส 🧩",
    "จำให้แม่น! 🧠",
    "ป่วนจักรวาล ✨",
    "สร้างโลกของเรา 🏝️"
  ];
  const STYLES = [
    "สายฮา",
    "สายหวาน",
    "สายโรแมนติก",
    "สุ่มเซอร์ไพรส์"
  ];
  const GAME_INFO = {
    "วาดปุ๊บ ทายปั๊บ 🎨": {
      title: "วาดปุ๊บ ทายปั๊บ 🎨",
      description: "ผลัดกันวาดและทายสิ่งที่อีกฝ่ายคิด",
      prompts: ["แมว", "ฟุตบอล", "ภูเขา", "ไอศกรีม", "จรวด"],
      placeholder: "พิมพ์คำใบ้หรือคำตอบ..."
    },
    "ใจตรงกันไหม? 💗": {
      title: "ใจตรงกันไหม? 💗",
      description: "เลือกคำตอบแล้วดูว่าเราคิดเหมือนกันหรือเปล่า",
      prompts: [
        "ทะเล 🏖️ หรือภูเขา ⛰️",
        "หนัง 🎬 หรือเกม 🎮",
        "หมา 🐶 หรือแมว 🐱",
        "กลางวัน ☀️ หรือกลางคืน 🌙",
        "หวาน 🍰 หรือเค็ม 🍟"
      ],
      placeholder: "พิมพ์ตัวเลือกของตัวเอง..."
    },
    "ภารกิจวัดใจ 🎯": {
      title: "ภารกิจวัดใจ 🎯",
      description: "ทำภารกิจให้สำเร็จก่อนหมดเวลา",
      prompts: [
        "บอกชื่อสัตว์ 5 ชนิดใน 15 วินาที",
        "คิดชื่อทีมของเราภายใน 10 วินาที",
        "บอกข้อดีของอีกฝ่าย 3 ข้อ",
        "ตั้งชื่อซูเปอร์ฮีโร่ให้ตัวเอง",
        "คิดคำใบ้ให้เพื่อนทาย 1 คำ"
      ],
      placeholder: "รายงานผลภารกิจ..."
    },
    "นักสืบรู้ใจ 🔍": {
      title: "นักสืบรู้ใจ 🔍",
      description: "ตั้งปริศนาแล้วให้อีกฝ่ายหาคำตอบ",
      prompts: [
        "อะไรเอ่ย มีหน้าแต่ไม่มีตา?",
        "อะไรเอ่ย ยิ่งเติมยิ่งเต็ม?",
        "อะไรเอ่ย มีฟันแต่กินไม่ได้?",
        "อะไรเอ่ย มีขาแต่เดินไม่ได้?",
        "อะไรเอ่ย มีเข็มแต่เย็บผ้าไม่ได้?"
      ],
      placeholder: "พิมพ์คำตอบหรือปริศนา..."
    },
    "ศึกเมาท์มอย ⚡": {
      title: "ศึกเมาท์มอย ⚡",
      description: "ตอบไว คิดไว สร้างเสียงหัวเราะ",
      prompts: [
        "ถ้าเราเป็นตัวละครในเกม จะมีพลังอะไร?",
        "ตั้งชื่อร้านสุดแปลกของเราสองคน",
        "ถ้าสัตว์พูดได้ อยากคุยกับตัวอะไร?",
        "คิดคำโฆษณาสุดฮาให้รองเท้า",
        "ถ้าเป็นประธานห้องหนึ่งวัน จะทำอะไร?"
      ],
      placeholder: "ตอบให้สร้างสรรค์..."
    },
    "เลือกแล้วลุ้น! 🎲": {
      title: "เลือกแล้วลุ้น! 🎲",
      description: "เลือกหมายเลขแล้วรับโจทย์สุ่ม",
      prompts: [
        "โบนัส: ชมอีกฝ่าย 1 ข้อ 💗",
        "ภารกิจ: คิดชื่อทีมใหม่ 🎯",
        "เซอร์ไพรส์: เล่าเรื่องฮา 1 เรื่อง 😂",
        "โบนัส: ได้ดาวเพิ่ม 1 ดวง ⭐",
        "ท้าทาย: ตอบคำถามใน 10 วินาที ⚡"
      ],
      placeholder: "พิมพ์ผลที่ได้..."
    },
    "คู่หูไขรหัส 🧩": {
      title: "คู่หูไขรหัส 🧩",
      description: "ช่วยกันแก้ปริศนาและถอดรหัส",
      prompts: [
        "รหัส 2-1-3 หมายถึงลำดับตัวอักษรอะไร?",
        "เรียงคำว่า ก-บ-า ให้เป็นคำ",
        "เลขต่อไปคืออะไร: 2, 4, 6, __",
        "หาคำที่เชื่อมโยงระหว่าง ฝน กับ ร่ม",
        "คิดคำใบ้ให้เพื่อนทายคำลับ"
      ],
      placeholder: "พิมพ์คำตอบหรือคำใบ้..."
    },
    "จำให้แม่น! 🧠": {
      title: "จำให้แม่น! 🧠",
      description: "ทดสอบความจำและความเร็ว",
      prompts: [
        "จำลำดับนี้: 🍎 🐶 ⚽ 🌙",
        "จำลำดับนี้: 🔑 🌸 🐱 🚀",
        "จำลำดับนี้: ☀️ 🍕 🎮 🐼",
        "จำลำดับนี้: 🏀 🐸 ⭐ 🍉",
        "จำลำดับนี้: 🎈 🦊 🌈 🍰"
      ],
      placeholder: "พิมพ์ลำดับที่จำได้..."
    },
    "ป่วนจักรวาล ✨": {
      title: "ป่วนจักรวาล ✨",
      description: "ช่วยกันแต่งเรื่องที่คาดเดาไม่ได้",
      prompts: [
        "วันหนึ่งโลกทั้งใบกลายเป็นเยลลี่...",
        "ประตูห้องเปิดออก แล้วมีมังกรตัวจิ๋ว...",
        "เราเจอรีโมตที่หยุดเวลาได้...",
        "จู่ ๆ ทุกคนในเมืองพูดเป็นเพลง...",
        "ยานอวกาศลงจอดกลางสนามฟุตบอล..."
      ],
      placeholder: "แต่งเรื่องต่อจากอีกฝ่าย..."
    },
    "สร้างโลกของเรา 🏝️": {
      title: "สร้างโลกของเรา 🏝️",
      description: "สะสมดาวจากการเล่นและช่วยกันสร้างโลก",
      prompts: [
        "ถ้าเพิ่มบ้านหนึ่งหลัง จะสร้างบ้านแบบไหน?",
        "ถ้าปลูกต้นไม้ได้หนึ่งต้น จะเลือกต้นอะไร?",
        "ถ้าเพิ่มสถานที่เที่ยว จะสร้างที่ไหน?",
        "ถ้าเลี้ยงสัตว์ในเกาะได้หนึ่งตัว จะเลือกอะไร?",
        "ตั้งชื่อเกาะของเราสองคน"
      ],
      placeholder: "บอกไอเดียสร้างโลกของเรา..."
    }
  };
  const state = {
    room: null,
    player: null,
    token: null,
    nickname: "",
    story: [],
    turn: 1,
    mode: GAMES[0],
    style: STYLES[0],
    p1: "ผู้เล่น 1",
    p2: "ผู้เล่น 2",
    joined: false,
    pollTimer: null,
    seconds: 30,
    timer: null,
    score: [0, 0],
    usedPrompts: {},
    lastRandom: "",
    roundStarted: false
  };
  const setup = $("setup");
  const roomView = $("room");
  const say = (id, text) => {
    const el = $(id);
    if (el) el.textContent = text;
  };
  const configReady = () =>
    window.SUPABASE_URL &&
    window.SUPABASE_ANON_KEY &&
    window.ROOM_API_URL &&
    !window.SUPABASE_URL.includes("PASTE_");
  const errorText = code => ({
    room_not_found: "ไม่พบห้องนี้ ลองตรวจรหัสอีกครั้งนะ",
    room_full: "ห้องนี้มีผู้เล่นครบ 2 คนแล้ว",
    not_authorized: "สิทธิ์เข้าห้องไม่ถูกต้อง ลองเข้าห้องใหม่อีกครั้ง",
    not_your_turn: "ยังไม่ถึงตาของนาย รอสักครู่นะ",
    waiting_for_player_two: "รอผู้เล่นคนที่ 2 เข้าห้องก่อนนะ",
    message_length: "ข้อความต้องมี 1–500 ตัวอักษร",
    only_host_can_change_mode:
      "เฉพาะคนสร้างห้องเท่านั้นที่เปลี่ยนเกมได้",
    server_error: "เซิร์ฟเวอร์มีปัญหาชั่วคราว ลองอีกครั้งนะ"
  }[code] || code || "เกิดข้อผิดพลาด ลองอีกครั้งนะ");
  function packSettings(mode = state.mode, style = state.style) {
    return `${mode} • ${style}`.slice(0, 60);
  }
  function unpackSettings(value) {
    const parts = String(value || "").split(" • ");
    state.mode = GAMES.includes(parts[0]) ? parts[0] : GAMES[0];
    state.style = STYLES.includes(parts[1]) ? parts[1] : STYLES[0];
  }
  async function api(action, extra = {}) {
    if (!configReady()) {
      throw new Error("ยังตั้งค่าการเชื่อมต่อไม่ครบ");
    }
    const res = await fetch(window.ROOM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: window.SUPABASE_ANON_KEY,
        Authorization: "Bearer " + window.SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        action,
        code: state.room?.code,
        player: state.player,
        token: state.token,
        ...extra
      })
    });
    const data = await res.json().catch(() => ({
      error: "server_error"
    }));
    if (!res.ok) {
      throw new Error(data.error || "server_error");
    }
    return data;
  }
  function setMessage(text, target = "roomMsg") {
    say(target, text);
  }
  function showRoom() {
    setup.classList.add("hidden");
    roomView.classList.remove("hidden");
  }
  function saveSession() {
    try {
      sessionStorage.setItem("knmr_room", state.room.code);
      sessionStorage.setItem("knmr_player", String(state.player));
      sessionStorage.setItem("knmr_token", state.token);
    } catch {}
  }
  function clearSession() {
    try {
      sessionStorage.removeItem("knmr_room");
      sessionStorage.removeItem("knmr_player");
      sessionStorage.removeItem("knmr_token");
    } catch {}
  }
  function randomPrompt() {
    const pool = GAME_INFO[state.mode]?.prompts || [];
    if (!pool.length) return "เริ่มเกมกันเลย!";
    if (!state.usedPrompts[state.mode]) {
      state.usedPrompts[state.mode] = [];
    }
    let available = pool.filter(
      prompt => !state.usedPrompts[state.mode].includes(prompt)
    );
    if (!available.length) {
      state.usedPrompts[state.mode] = [];
      available = [...pool];
    }
    const prompt = available[Math.floor(Math.random() * available.length)];
    state.usedPrompts[state.mode].push(prompt);
    return prompt;
  }
  function randomGame() {
    if (state.player !== 1) {
      setMessage("ให้ผู้สร้างห้องเป็นคนสุ่มเกมนะ");
      return;
    }
    const choices = GAMES.filter(game => game !== state.lastRandom);
    const game = choices[Math.floor(Math.random() * choices.length)];
    state.lastRandom = game;
    $("modeSelect").value = game;
    changeSettings();
  }
  function gameInfo() {
    return GAME_INFO[state.mode] || GAME_INFO[GAMES[0]];
  }
  function applyRoom(room) {
    state.room = room;
    state.turn = room.turn_player || 1;
    unpackSettings(room.mode);
    state.p1 = room.player1_name || "ผู้เล่น 1";
    state.p2 = room.player2_name || "ผู้เล่น 2";
    state.joined = !!room.player2_token_hash || !!room.player2_name;
    state.story = Array.isArray(room.story) ? room.story : [];
    render();
  }
  function renderStory() {
    const story = $("story");
    if (!story) return;
    story.replaceChildren();
    if (!state.story.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent =
        `เริ่มเกม ${state.mode} แล้วข้อความจะอยู่ตรงนี้ ✨`;
      story.append(empty);
      return;
    }
    state.story.forEach(item => {
      const bubble = document.createElement("div");
      bubble.className =
        "bubble" + (item.player === 2 ? " p2" : "");
      const who = document.createElement("span");
      who.className = "who";
      who.textContent = item.player === 1 ? state.p1 : state.p2;
      const body = document.createElement("span");
      body.textContent = item.text;
      bubble.append(who, body);
      story.append(bubble);
    });
    story.scrollTop = story.scrollHeight;
  }
  function render() {
    if (!state.room) return;
    say("roomCode", state.room.code || "——");
    say("p1name", state.p1);
    say("p2name", state.p2);
    say(
      "p2status",
      state.joined
        ? "เข้าร่วมห้องแล้ว 💗"
        : "กำลังรอเพื่อนเข้าห้อง"
    );
    $("p1card")?.classList.toggle("active", state.turn === 1);
    $("p2card")?.classList.toggle("active", state.turn === 2);
    say("count", `${state.story.length} รายการ`);
    renderStory();
    const info = gameInfo();
    const myTurn = state.player === state.turn;
    const ready = state.joined;
    say("feedTitle", info.title);
    say("draftLabel", "คำตอบหรือผลการเล่น");
    $("draft").placeholder = info.placeholder;
    $("sendBtn").textContent = "ส่งคำตอบ 🎮";
    $("draft").disabled = !myTurn || !ready;
    $("sendBtn").disabled =
      !myTurn || !ready || !$("draft").value.trim();
    $("promptBtn").disabled = !myTurn || !ready;
    say(
      "turnBanner",
      !ready && state.player === 1
        ? "สร้างห้องแล้ว ส่งรหัสให้เพื่อนเข้าร่วมก่อน 💗"
        : !myTurn
          ? `รอ${state.turn === 1 ? state.p1 : state.p2}เล่นก่อน...`
          : info.description
    );
    $("modeSelect").value = state.mode;
    $("styleSelect").value = state.style;
    $("modeSelect").disabled = state.player !== 1;
    $("styleSelect").disabled = state.player !== 1;
    document.querySelectorAll(".mode-card").forEach(card => {
      card.classList.toggle(
        "selected",
        card.dataset.mode === state.mode
      );
      card.disabled = state.player !== 1;
    });
    if ($("randomModeBtn")) {
      $("randomModeBtn").disabled = state.player !== 1;
      $("randomModeBtn").textContent = "🎰 สุ่มเกม";
    }
    document.body.dataset.style = state.style;
    say("score1", String(state.score[0]));
    say("score2", String(state.score[1]));
  }
  async function refreshRoom(silent = true) {
    if (!state.room || !state.token) return;
    try {
      const data = await api("get");
      applyRoom(data.room);
    } catch (error) {
      if (!silent) setMessage(errorText(error.message));
    }
  }
  function startPolling() {
    if (state.pollTimer) clearInterval(state.pollTimer);
    state.pollTimer = setInterval(
      () => refreshRoom(true),
      1800
    );
  }
  async function createRoom() {
    if (!configReady()) {
      say("setupMsg", "ยังตั้งค่าการเชื่อมต่อไม่ครบ");
      return;
    }
    state.nickname = $("nickname").value.trim() || "ผู้เล่น 1";
    try {
      const data = await api("create", {
        name: state.nickname,
        mode: packSettings(GAMES[0], STYLES[0])
      });
      state.player = data.player;
      state.token = data.token;
      applyRoom(data.room);
      saveSession();
      showRoom();
      startPolling();
      history.replaceState(
        {},
        "",
        "?room=" + state.room.code
      );
      setMessage(
        "สร้างห้องแล้ว ส่งรหัส " + state.room.code +
        " ให้เพื่อนเข้ามาเล่นได้เลย 💗"
      );
    } catch (error) {
      say("setupMsg", errorText(error.message));
    }
  }
  async function joinRoom() {
    if (!configReady()) {
      say("setupMsg", "ยังตั้งค่าการเชื่อมต่อไม่ครบ");
      return;
    }
    const roomCode =
      $("roomInput").value.trim().toUpperCase() ||
      new URLSearchParams(location.search)
        .get("room")?.toUpperCase();
    if (!roomCode) {
      say("setupMsg", "ใส่รหัสห้องก่อนนะ");
      return;
    }
    state.nickname = $("nickname").value.trim() || "ผู้เล่น 2";
    try {
      const data = await api("join", {
        code: roomCode,
        name: state.nickname
      });
      state.player = data.player;
      state.token = data.token;
      applyRoom(data.room);
      saveSession();
      showRoom();
      startPolling();
      history.replaceState({}, "", "?room=" + roomCode);
    } catch (error) {
      say("setupMsg", errorText(error.message));
    }
  }
  async function sendStory() {
    const input = $("draft");
    const text = input.value.trim();
    if (!text || state.player !== state.turn || !state.joined) {
      return;
    }
    try {
      const data = await api("send", { text });
      input.value = "";
      applyRoom(data.room);
      setMessage("ส่งแล้ว! ถึงตาอีกฝ่ายเล่นต่อ 🎮");
    } catch (error) {
      setMessage(errorText(error.message));
      await refreshRoom(true);
    }
  }
  async function changeSettings() {
    if (!state.room || state.player !== 1) return;
    const newMode = $("modeSelect").value;
    const newStyle = $("styleSelect").value;
    if (!GAMES.includes(newMode)) {
      setMessage("ตัวเลือกเกมในหน้าเว็บยังไม่ตรงกับ app.js");
      return;
    }
    state.mode = newMode;
    state.style = STYLES.includes(newStyle)
      ? newStyle
      : STYLES[0];
    render();
    try {
      const data = await api("mode", {
        mode: packSettings()
      });
      applyRoom(data.room);
      setMessage("เปลี่ยนเกมแล้ว ทั้งคู่เห็นเกมที่เลือก 💗");
    } catch (error) {
      setMessage(errorText(error.message));
      await refreshRoom(true);
    }
  }
  function startTimer(seconds = 30) {
    if (state.timer) clearInterval(state.timer);
    state.seconds = seconds;
    state.roundStarted = true;
    say("turnBanner", `เหลือเวลา ${state.seconds} วินาที ⏱️`);
    state.timer = setInterval(() => {
      state.seconds--;
      if (state.seconds <= 0) {
        clearInterval(state.timer);
        state.timer = null;
        state.roundStarted = false;
        say("turnBanner", "หมดเวลาแล้ว! ส่งผลการเล่นได้เลย ⏰");
        return;
      }
      say("turnBanner", `เหลือเวลา ${state.seconds} วินาที ⏱️`);
    }, 1000);
  }
  $("createBtn")?.addEventListener("click", createRoom);
  $("joinBtn")?.addEventListener("click", joinRoom);
  $("sendBtn")?.addEventListener("click", sendStory);
  $("draft")?.addEventListener("input", () => {
    const button = $("sendBtn");
    if (button) {
      button.disabled =
        state.player !== state.turn ||
        !state.joined ||
        !$("draft").value.trim();
    }
  });
  $("modeSelect")?.addEventListener("change", changeSettings);
  $("styleSelect")?.addEventListener("change", changeSettings);
  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => {
      if (state.player !== 1) return;
      const selected = card.dataset.mode;
      if (!GAMES.includes(selected)) return;
      $("modeSelect").value = selected;
      changeSettings();
    });
  });
  $("randomModeBtn")?.addEventListener("click", randomGame);
  $("promptBtn")?.addEventListener("click", () => {
    if (state.player !== state.turn || !state.joined) return;
    $("draft").value = randomPrompt();
    render();
    $("draft").focus();
  });
  $("copyBtn")?.addEventListener("click", async () => {
    if (!state.room?.code) return;
    const url =
      location.origin + location.pathname +
      "?room=" + state.room.code;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("คัดลอกลิงก์แล้ว ส่งให้เพื่อนได้เลย 💌");
    } catch {
      setMessage("ลิงก์ห้อง: " + url);
    }
  });
  $("leaveBtn")?.addEventListener("click", () => {
    if (state.pollTimer) clearInterval(state.pollTimer);
    if (state.timer) clearInterval(state.timer);
    state.pollTimer = null;
    state.timer = null;
    state.room = null;
    state.token = null;
    state.player = null;
    clearSession();
    roomView.classList.add("hidden");
    setup.classList.remove("hidden");
    history.replaceState({}, "", location.pathname);
  });
  const urlRoom =
    new URLSearchParams(location.search).get("room");
  if (urlRoom && $("roomInput")) {
    $("roomInput").value = urlRoom;
  }
  if (!configReady()) {
    say("setupMsg", "ยังตั้งค่าการเชื่อมต่อไม่ครบ กรุณาตรวจ config.js");
  }
  // เปิดฟังก์ชันสำหรับพัฒนาเกมในขั้นต่อไป
  window.KNMR = {
    games: GAMES,
    gameInfo,
    randomPrompt,
    startTimer,
    getState: () => ({
      mode: state.mode,
      style: state.style,
      player: state.player,
      turn: state.turn,
      score: [...state.score]
    })
  };
})();
