/* คืนนี้มีเรา — 10 เกม + จำห้อง + โจทย์เพิ่ม + กระดานวาด */
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
      description: "วาดรูปให้อีกฝ่ายทาย แล้วสลับกัน!",
      placeholder: "หลังวาดเสร็จ พิมพ์คำตอบหรือคำใบ้...",
      prompts: [
        "แมว","หมา","ฟุตบอล","บ้าน","ต้นไม้","ดอกไม้","หัวใจ","พระอาทิตย์",
        "พระจันทร์","ดาว","เมฆ","สายรุ้ง","ภูเขา","ทะเล","ปลา","เต่า",
        "ผีเสื้อ","นก","กระต่าย","หมี","ไอศกรีม","พิซซ่า","แฮมเบอร์เกอร์",
        "เค้ก","แตงโม","กล้วย","แอปเปิล","รถยนต์","จักรยาน","เครื่องบิน",
        "จรวด","เรือ","รถไฟ","นาฬิกา","โทรศัพท์","คอมพิวเตอร์","แว่นตา",
        "รองเท้า","หมวก","ร่ม","กุญแจ","หนังสือ","ดินสอ","กระเป๋า","แว่นขยาย",
        "มงกุฎ","หุ่นยนต์","ไดโนเสาร์","ปลาหมึก","ปราสาท"
      ]
    },
    "ใจตรงกันไหม? 💗": {
      description: "ตอบคำถามเดียวกัน แล้วดูว่าใจตรงกันไหม",
      placeholder: "พิมพ์คำตอบของตัวเอง...",
      prompts: [
        "ทะเลหรือภูเขา?","หมาหรือแมว?","กลางวันหรือกลางคืน?",
        "หนังหรือเกม?","หวานหรือเค็ม?","ฤดูร้อนหรือฤดูหนาว?",
        "ข้าวหรือก๋วยเตี๋ยว?","น้ำหรือชา?","ฟุตบอลหรือบาสเกตบอล?",
        "อยู่บ้านหรือออกไปเที่ยว?","โทรหรือแชต?","ตื่นเช้าหรือนอนดึก?",
        "สีฟ้าหรือสีชมพู?","พิซซ่าหรือเบอร์เกอร์?","ทะเลหรือสระว่ายน้ำ?",
        "ภูเขาหรือป่า?","หนังตลกหรือหนังผจญภัย?","ร้องเพลงหรือเต้น?",
        "เที่ยวใกล้หรือเที่ยวไกล?","ถ่ายรูปหรือถ่ายวิดีโอ?",
        "ของขวัญหรือจดหมาย?","ดูดาวหรือดูพระอาทิตย์ตก?",
        "ไอศกรีมหรือเค้ก?","ฝนตกหรืออากาศเย็น?","เกมมือถือหรือเกมคอม?",
        "อยู่กับเพื่อนหรืออยู่กับครอบครัว?","แมวขี้อ้อนหรือหมาขี้เล่น?",
        "ชอบวางแผนหรือชอบเซอร์ไพรส์?","เที่ยวสวนสนุกหรือสวนสัตว์?",
        "อาหารไทยหรืออาหารญี่ปุ่น?","อ่านหนังสือหรือดูซีรีส์?",
        "เดินเล่นหรือปั่นจักรยาน?","ของทำมือหรือของซื้อ?",
        "ชอบฟังหรือชอบเล่า?","ชอบชนะหรือชอบเล่นสนุก?",
        "ถ่ายรูปวิวหรือถ่ายรูปตัวเอง?","สีดำหรือสีขาว?",
        "ขนมหรือผลไม้?","วันหยุดหรือวันเกิด?",
        "ไปเที่ยวกับกลุ่มหรือไปกับคนสนิท?","ชอบเพลงช้าหรือเพลงเร็ว?",
        "กาแฟหรือโกโก้?","รถยนต์หรือรถไฟ?","น้ำแข็งหรือเครื่องดื่มอุ่น?",
        "เล่นกีฬาในร่มหรือกลางแจ้ง?","ชอบเซอร์ไพรส์หรือรู้ล่วงหน้า?",
        "ชอบคุยเรื่องจริงจังหรือเรื่องฮา?","วางแผนเที่ยวหรือเที่ยวตามใจ?",
        "พระอาทิตย์ขึ้นหรือพระอาทิตย์ตก?","ชอบทำอาหารหรือสั่งอาหาร?"
      ]
    },
    "ภารกิจวัดใจ 🎯": {
      description: "ทำภารกิจให้สำเร็จ แล้วรายงานผล",
      placeholder: "พิมพ์ผลภารกิจ...",
      prompts: [
        "บอกชื่อสัตว์ 5 ชนิดใน 15 วินาที","คิดชื่อทีมของเราภายใน 10 วินาที",
        "บอกข้อดีของอีกฝ่าย 3 ข้อ","ตั้งชื่อซูเปอร์ฮีโร่ให้ตัวเอง",
        "คิดคำใบ้ให้เพื่อนทาย 1 คำ","ตั้งชื่อร้านอาหารสุดแปลก",
        "บอกชื่อผลไม้ 7 ชนิด","คิดชื่อดาวเคราะห์ใหม่",
        "เล่าเรื่องตลกสั้น ๆ","คิดคำขวัญประจำทีม",
        "บอกสิ่งที่เห็นรอบตัว 5 อย่าง","ตั้งชื่อให้สัตว์เลี้ยงในจินตนาการ",
        "คิดเมนูอาหารใหม่","ตั้งชื่อวงดนตรีของเรา",
        "บอกสิ่งที่ทำให้ยิ้มได้ 3 อย่าง","แต่งประโยคที่มีคำว่าเมฆ",
        "คิดชื่อเมืองในฝัน","บอกชื่อกีฬา 5 ชนิด",
        "สร้างท่าเต้นประจำทีม","ตั้งชื่อหุ่นยนต์",
        "คิดคำโฆษณาให้ดินสอ","บอกชื่อสี 8 สี",
        "แต่งนิทาน 3 ประโยค","คิดชื่อสนามฟุตบอล",
        "พูดคำชมตัวเอง 1 ข้อ","คิดชื่อเกมใหม่",
        "บอกสิ่งของที่เป็นวงกลม 5 อย่าง","ตั้งชื่อร้านไอศกรีม",
        "คิดพลังวิเศษที่อยากมี","บอกชื่อประเทศ 5 ประเทศ",
        "แต่งเพลงสั้น ๆ 2 บรรทัด","คิดชื่อเกาะลับ",
        "เลียนเสียงสัตว์ 3 ชนิด","บอกสิ่งที่อยากเรียนรู้ 3 อย่าง",
        "คิดชื่อทีมฟุตบอล","แต่งคำทักทายจากต่างดาว",
        "ตั้งชื่อหุ่นยนต์ช่วยงานบ้าน","บอกสิ่งที่ทำให้หัวเราะ",
        "คิดชื่อขนมใหม่","บอกชื่ออาชีพ 5 อาชีพ",
        "คิดชื่อร้านขายของวิเศษ","สร้างคำใหม่พร้อมความหมาย",
        "บอกสิ่งที่อยากลองทำสักครั้ง","ตั้งชื่อการแข่งขัน",
        "แต่งประโยคจากคำว่าแสงดาว","คิดชื่อยานอวกาศ",
        "บอกสิ่งที่ทำได้ดี 3 อย่าง","คิดชื่อทีมผจญภัย",
        "ออกแบบสัญลักษณ์ทีมด้วยคำพูด","ตั้งชื่อเทศกาลใหม่"
      ]
    },
    "นักสืบรู้ใจ 🔍": {
      description: "แก้ปริศนาและทายคำตอบ",
      placeholder: "พิมพ์คำตอบหรือปริศนา...",
      prompts: [
        "อะไรเอ่ย มีหน้าแต่ไม่มีตา?","อะไรเอ่ย มีฟันแต่กินไม่ได้?",
        "อะไรเอ่ย มีขาแต่เดินไม่ได้?","อะไรเอ่ย มีเข็มแต่เย็บผ้าไม่ได้?",
        "อะไรเอ่ย ยิ่งเติมยิ่งเต็ม?","อะไรเอ่ย มีคอแต่ไม่มีหัว?",
        "อะไรเอ่ย มีปีกแต่บินไม่ได้?","อะไรเอ่ย มีใบแต่ไม่ใช่ต้นไม้?",
        "อะไรเอ่ย เปิดได้แต่ไม่มีประตู?","อะไรเอ่ย มีหูแต่ไม่ได้ยิน?",
        "อะไรเอ่ย เดินทางรอบโลกแต่ยังอยู่มุมเดิม?","อะไรเอ่ย มีรูเต็มตัวแต่เก็บน้ำได้?",
        "อะไรเอ่ย ยิ่งเช็ดยิ่งเปียก?","อะไรเอ่ย มีเมืองแต่ไม่มีบ้าน?",
        "อะไรเอ่ย มีแม่น้ำแต่ไม่มีน้ำ?","อะไรเอ่ย ขึ้นได้แต่ลงไม่ได้?",
        "อะไรเอ่ย มีหัวมีหางแต่ไม่มีตัว?","อะไรเอ่ย ต้องแตกก่อนจึงใช้ได้?",
        "อะไรเอ่ย ยิ่งตัดยิ่งยาว?","อะไรเอ่ย มีฟันหลายซี่แต่เคี้ยวไม่ได้?",
        "อะไรเอ่ย มีหน้าปัดแต่ไม่มีหน้า?","อะไรเอ่ย มีลิ้นแต่พูดไม่ได้?",
        "อะไรเอ่ย มีแขนแต่กอดไม่ได้?","อะไรเอ่ย มีตาแต่ไม่เคยมอง?",
        "อะไรเอ่ย ลอยได้แต่ไม่มีปีก?","อะไรเอ่ย วิ่งได้แต่ไม่มีขา?",
        "อะไรเอ่ย มีแสงแต่จับไม่ได้?","อะไรเอ่ย ยิ่งใช้ยิ่งสั้น?",
        "อะไรเอ่ย อยู่บนฟ้าแต่ไม่ใช่นก?","อะไรเอ่ย มีบ้านอยู่บนหลัง?",
        "อะไรเอ่ย มีวงแหวนแต่ไม่ใช่นิ้ว?","อะไรเอ่ย ส่งเสียงแต่ไม่มีปาก?",
        "อะไรเอ่ย กินไฟแต่ไม่กินข้าว?","อะไรเอ่ย ยิ่งแบ่งยิ่งมาก?",
        "อะไรเอ่ย มีปุ่มแต่ไม่ใช่เสื้อ?","อะไรเอ่ย มีจอแต่ไม่ใช่โรงหนัง?",
        "อะไรเอ่ย มีเมล็ดแต่ไม่ใช่ผลไม้?","อะไรเอ่ย มีรากแต่ไม่ใช่ต้นไม้?",
        "อะไรเอ่ย ตกลงมาแต่ไม่เคยเจ็บ?","อะไรเอ่ย มีหางแต่ไม่ใช่สัตว์?",
        "อะไรเอ่ย ใช้เขียนแต่ไม่ใช่ปากกา?","อะไรเอ่ย มีฟองแต่ไม่ใช่น้ำอัดลม?",
        "อะไรเอ่ย มีปากแต่กินไม่ได้?","อะไรเอ่ย หมุนได้แต่เดินทางไม่ได้?",
        "อะไรเอ่ย ส่องได้แต่ไม่ใช่ไฟฉาย?","อะไรเอ่ย มีช่องแต่ไม่ใช่หน้าต่าง?",
        "อะไรเอ่ย ยิ่งลบยิ่งสะอาด?","อะไรเอ่ย อยู่ในน้ำแต่ไม่เปียก?",
        "อะไรเอ่ย มีเสียงดังแต่ไม่มีชีวิต?","อะไรเอ่ย มีปลายแต่ไม่มีต้น?"
      ]
    },
    "ศึกเมาท์มอย ⚡": {
      description: "ตอบคำถามไว ๆ แบบสร้างสรรค์",
      placeholder: "พิมพ์คำตอบของคุณ...",
      prompts: [
        "ถ้าเราเป็นตัวละครในเกม จะมีพลังอะไร?","ตั้งชื่อร้านสุดแปลกของเรา",
        "ถ้าสัตว์พูดได้ อยากคุยกับตัวอะไร?","คิดคำโฆษณาสุดฮาให้รองเท้า",
        "ถ้าเป็นประธานห้องหนึ่งวัน จะทำอะไร?","ถ้าตื่นมาแล้วตัวเล็กเท่ามดจะทำอะไร?",
        "ถ้าสร้างสวนสนุกได้ จะมีเครื่องเล่นอะไร?","ถ้าอาหารพูดได้จะพูดว่าอะไร?",
        "ถ้ามีหุ่นยนต์ช่วยหนึ่งอย่าง จะให้ทำอะไร?","ถ้าเป็นนักประดิษฐ์จะสร้างอะไร?",
        "ถ้าตั้งชื่อดาวตัวเองจะชื่ออะไร?","ถ้ามีพลังหยุดเวลา จะใช้ทำอะไรที่เป็นประโยชน์?",
        "ถ้าพูดกับสัตว์ได้ อยากคุยกับใคร?","ถ้าโรงเรียนอยู่บนดวงจันทร์จะเป็นยังไง?",
        "ถ้าสร้างวันหยุดใหม่จะตั้งชื่อว่าอะไร?","ถ้าเป็นผู้กำกับหนังจะทำหนังแนวไหน?",
        "ถ้ามีร้านเป็นของตัวเองจะขายอะไร?","ถ้าตั้งชื่อเมฆได้จะตั้งว่าอะไร?",
        "ถ้ามีประตูไปที่ไหนก็ได้จะไปไหน?","ถ้าเปลี่ยนสีท้องฟ้าได้จะเลือกสีอะไร?",
        "ถ้าสร้างกีฬาใหม่จะเล่นยังไง?","ถ้ามีหุ่นยนต์เป็นเพื่อนจะตั้งชื่อว่าอะไร?",
        "ถ้าทุกคนมีหางจะเกิดอะไรขึ้น?","ถ้าฝนตกเป็นขนมจะเลือกอะไร?",
        "ถ้าโลกไม่มีอินเทอร์เน็ตหนึ่งวันจะทำอะไร?","ถ้าเป็นนักสำรวจจะไปสำรวจที่ไหน?",
        "ถ้าออกแบบบ้านต้นไม้จะมีอะไรบ้าง?","ถ้าเป็นนักมายากลจะเสกอะไร?",
        "ถ้าสร้างพิพิธภัณฑ์แปลก ๆ จะจัดแสดงอะไร?","ถ้าเป็นสัตว์หนึ่งวันจะเป็นอะไร?",
        "ถ้าคิดแอปใหม่ได้จะให้ทำอะไร?","ถ้าอาหารจานโปรดมีชื่อใหม่จะชื่ออะไร?",
        "ถ้าเราตั้งกฎตลก ๆ ได้หนึ่งข้อจะเป็นอะไร?","ถ้าสร้างหุ่นยนต์ทำความสะอาดจะหน้าตาแบบไหน?",
        "ถ้าจัดงานเทศกาลของเราเองจะมีอะไร?","ถ้าเดินทางข้ามเวลาได้จะไปยุคไหน?",
        "ถ้าเป็นนักกีฬาอาชีพจะเลือกกีฬาอะไร?","ถ้ามีสนามฟุตบอลบนดาวอังคารจะเป็นยังไง?",
        "ถ้าสร้างตัวละครการ์ตูนจะมีนิสัยอะไร?","ถ้าสร้างขนมรูปสัตว์จะเป็นรูปอะไร?",
        "ถ้าทำช่องวิดีโอจะทำเรื่องอะไร?","ถ้าแต่งเพลงให้ฝนจะชื่อเพลงอะไร?",
        "ถ้าเป็นนักข่าวหนึ่งวันจะรายงานข่าวอะไร?","ถ้ามีสวนลับจะซ่อนอะไรไว้?",
        "ถ้าให้สัตว์เป็นครูจะเลือกตัวไหน?","ถ้าสร้างรถบินได้จะตั้งชื่ออะไร?",
        "ถ้ามีร้านขายความฝันจะขายฝันแบบไหน?","ถ้าสร้างเกาะใหม่จะตั้งชื่ออะไร?",
        "ถ้าเป็นนักวิทยาศาสตร์จะทดลองอะไร?","ถ้าสร้างห้องเล่นเกมในฝันจะมีอะไร?"
      ]
    },
    "เลือกแล้วลุ้น! 🎲": {
      description: "สุ่มโจทย์หรือภารกิจใหม่ทุกครั้ง",
      placeholder: "พิมพ์ผลที่ได้...",
      prompts: [
        "โบนัส: ชมอีกฝ่าย 1 ข้อ 💗","ภารกิจ: คิดชื่อทีมใหม่ 🎯",
        "เซอร์ไพรส์: เล่าเรื่องฮา 1 เรื่อง 😂","ท้าทาย: ตอบคำถามใน 10 วินาที ⚡",
        "คิดคำใบ้ 3 คำให้ทาย","เลือกสีที่แทนวันนี้",
        "เล่าเรื่องดี ๆ ที่เกิดขึ้นวันนี้","คิดชื่อเมืองในจินตนาการ",
        "วาดดาว 5 แฉก","บอกสัตว์ที่อยากเป็น",
        "แต่งคำขวัญทีม","คิดเมนูอาหารใหม่",
        "ตั้งชื่อเกมใหม่","เล่าเรื่องการผจญภัยสั้น ๆ",
        "เลือกอิโมจิแทนอารมณ์","คิดชื่อดาวเคราะห์",
        "บอกสิ่งที่อยากเรียนรู้","สร้างคำใหม่พร้อมความหมาย",
        "คิดชื่อหุ่นยนต์","แต่งประโยคที่มีคำว่าทะเล",
        "บอกชื่อผลไม้ 5 ชนิด","ตั้งชื่อสนามแข่ง",
        "คิดชื่อร้านขนม","เลียนเสียงสัตว์",
        "คิดชื่อเกาะลับ","บอกสิ่งของสีฟ้า 5 อย่าง",
        "ตั้งชื่อทีมผจญภัย","แต่งคำทักทายจากต่างดาว",
        "คิดชื่อยานอวกาศ","บอกสิ่งที่ทำให้หัวเราะ",
        "สร้างสัญลักษณ์ทีม","คิดคำโฆษณาให้หมอน",
        "ตั้งชื่อเทศกาลใหม่","บอกชื่อกีฬา 5 ชนิด",
        "คิดชื่อการ์ตูน","แต่งเรื่องจากคำว่าแสงดาว",
        "บอกสิ่งที่อยากลองทำ","คิดชื่อร้านวิเศษ",
        "ตั้งชื่อสัตว์เลี้ยงในจินตนาการ","คิดพลังวิเศษใหม่",
        "บอกชื่อประเทศ 5 ประเทศ","ตั้งชื่อขนมใหม่",
        "คิดชื่อทีมฟุตบอล","วาดรูปสิ่งที่อยู่บนฟ้า",
        "แต่งนิทาน 3 ประโยค","ตั้งชื่อเครื่องเล่นสวนสนุก",
        "บอกของที่พกติดตัว 3 อย่าง","คิดชื่อเมืองใต้ทะเล",
        "ตั้งชื่อการแข่งขัน","คิดชื่อแอปใหม่"
      ]
    },
    "คู่หูไขรหัส 🧩": {
      description: "ช่วยกันคิดและแก้ปริศนา",
      placeholder: "พิมพ์คำตอบหรือคำใบ้...",
      prompts: [
        "เลขต่อไปคืออะไร: 2, 4, 6, __","เรียงคำว่า ก-บ-า ให้เป็นคำ",
        "หาคำที่เชื่อมโยงระหว่างฝนกับร่ม","คิดคำใบ้ให้เพื่อนทายคำลับ",
        "เลขต่อไปคือ 3, 6, 9, __","เลขต่อไปคือ 5, 10, 15, __",
        "ถ้า A=1, B=2 แล้ว C เท่ากับอะไร?","อะไรหนักกว่ากัน: 1 กิโลกรัมฝ้ายหรือเหล็ก?",
        "มีแอปเปิล 3 ลูก ให้เพื่อน 1 ลูก เหลือกี่ลูก?","วันพรุ่งนี้ของวันศุกร์คือวันอะไร?",
        "คำไหนไม่เข้าพวก: แมว หมา ปลา โต๊ะ","เรียงคำว่า ม-า-น ให้เป็นคำ",
        "เลขต่อไปคือ 1, 1, 2, 3, 5, __","มี 4 มุม ตัดออก 1 มุม เหลือกี่มุม?",
        "อะไรอยู่กลางคำว่าโรงเรียน?","ถอดรหัสอิโมจิ 🐱+🐟",
        "อะไรเกิดก่อน: ไก่หรือไข่? อธิบายเหตุผล","เลขต่อไปคือ 10, 20, 30, __",
        "มี 2 คู่กับอีก 3 ชิ้น รวมกี่ชิ้น?","เรียงคำว่า ฟ-า-ร-ุ้-ง ให้เป็นคำ",
        "หาคำที่เชื่อมโยงระหว่างหนังสือกับความรู้","ถ้าเมื่อวานเป็นวันจันทร์ วันนี้วันอะไร?",
        "เลขต่อไปคือ 100, 90, 80, __","หาคำที่ซ่อนอยู่ในคำว่า 'ดวงดาว'",
        "อะไรใช้วัดเวลาแต่ไม่ใช่นาฬิกา?","มีสามเหลี่ยม 2 รูป รวมกี่ด้าน?",
        "คำไหนไม่เข้าพวก: แดง เขียว น้ำเงิน เก้าอี้","ถอดรหัส 🐶+🦴",
        "ถ้ามี 5 คนจับมือกันทีละคู่ จะเกิดอะไรขึ้น?","อะไรเป็นคู่แต่ใส่ได้ข้างเดียว?",
        "เลขต่อไปคือ 7, 14, 21, __","คิดรหัสลับจากชื่อเล่นตัวเอง",
        "อะไรอยู่ระหว่างเลข 2 กับ 4?","มี 12 เดือน เดือนที่ 3 คือเดือนอะไร?",
        "หาคำที่เชื่อมโยงระหว่างดินสอกับกระดาษ","ถอดรหัส 🌙+⭐",
        "เลขต่อไปคือ 8, 6, 4, __","เรียงลำดับ: เช้า บ่าย กลางคืน",
        "อะไรมี 4 ขาแต่ไม่มีชีวิต?","คิดคำใบ้ 3 คำให้ทายฟุตบอล",
        "ถ้า 2+2=4 แล้ว 4+4 เท่ากับอะไร?","มีขนม 10 ชิ้น แบ่งให้ 2 คนเท่ากันได้คนละกี่ชิ้น?",
        "อะไรใช้เปิดประตูแต่ไม่ใช่กุญแจ?","คำไหนไม่เข้าพวก: รถ เรือ เครื่องบิน กล้วย",
        "เลขต่อไปคือ 1, 3, 5, 7, __","หาคำที่เชื่อมโยงระหว่างเมฆกับฝน",
        "อะไรมีหน้าแต่ไม่มีตา?","ถอดรหัส ☀️+🌻",
        "คิดปริศนาสั้น ๆ ให้เพื่อน 1 ข้อ","สร้างรหัสจากตัวเลข 3 ตัวแล้วให้เพื่อนทาย"
      ]
    },
    "จำให้แม่น! 🧠": {
      description: "จำลำดับอิโมจิแล้วพิมพ์กลับมา",
      placeholder: "พิมพ์ลำดับที่จำได้...",
      prompts: [
        "จำลำดับนี้: 🍎 🐶 ⚽ 🌙","จำลำดับนี้: 🔑 🌸 🐱 🚀",
        "จำลำดับนี้: ☀️ 🍕 🎮 🐼","จำลำดับนี้: 🏀 🐸 ⭐ 🍉",
        "จำลำดับนี้: 🎈 🦊 🌈 🍰","จำลำดับนี้: 🐳 🍀 🚲 🍓",
        "จำลำดับนี้: 🌻 🐢 🎸 🍇","จำลำดับนี้: 🚀 🐙 🍕 🌧️",
        "จำลำดับนี้: 🦋 🍉 🏀 🐼","จำลำดับนี้: 🐱 🌙 🔑 🍰",
        "จำลำดับนี้: 🐸 ⭐ 🚗 🍎","จำลำดับนี้: 🐧 🍓 ☀️ 🎈",
        "จำลำดับนี้: 🐶 🌈 🥕 🚀","จำลำดับนี้: 🦊 ⚽ 🌸 🐢",
        "จำลำดับนี้: 🍕 🐳 🌙 🎸","จำลำดับนี้: 🌧️ 🍇 🐼 🔑",
        "จำลำดับนี้: 🐢 🍎 🚲 ⭐","จำลำดับนี้: 🎮 🌻 🐱 🍉",
        "จำลำดับนี้: 🐙 🎈 🍰 ☀️","จำลำดับนี้: 🚗 🦋 🍓 🌙",
        "จำลำดับนี้: 🥕 🐧 🎸 🍎","จำลำดับนี้: ⭐ 🐶 🍕 🌈",
        "จำลำดับนี้: 🌸 🚀 🐢 🍇","จำลำดับนี้: 🍉 🐼 🔑 🎮",
        "จำลำดับนี้: 🐳 🍰 ☀️ 🦊","จำลำดับนี้: 🚲 🍓 🌧️ 🐱",
        "จำลำดับนี้: 🎸 🐙 🌻 🏀","จำลำดับนี้: 🐧 🍎 🌙 🎈",
        "จำลำดับนี้: 🍇 🦋 🚗 ⭐","จำลำดับนี้: 🌈 🐢 🍕 🔑",
        "จำลำดับนี้: 🐼 🎮 🍓 ☀️","จำลำดับนี้: 🍰 🐶 🌸 🚀",
        "จำลำดับนี้: 🐱 🏀 🌧️ 🍉","จำลำดับนี้: 🔑 🐳 🎸 🌻",
        "จำลำดับนี้: 🚀 🍎 🐧 🌈","จำลำดับนี้: 🦊 🍇 ⭐ 🎮",
        "จำลำดับนี้: 🌙 🍕 🐢 🍰","จำลำดับนี้: 🐙 🌸 🚲 ☀️",
        "จำลำดับนี้: 🍓 🐼 🔑 🎈","จำลำดับนี้: 🎮 🦋 🍉 🐶",
        "จำลำดับนี้: 🌻 🐧 🍎 🚗","จำลำดับนี้: ⭐ 🍰 🐳 🍇",
        "จำลำดับนี้: 🐢 🌈 🎸 🍓","จำลำดับนี้: 🍕 🚀 🐱 🌧️",
        "จำลำดับนี้: 🐶 🔑 ☀️ 🦊","จำลำดับนี้: 🍉 🎈 🐙 🎮",
        "จำลำดับนี้: 🦋 🍰 🌙 🐼","จำลำดับนี้: 🚲 🍎 🌸 ⭐",
        "จำลำดับนี้: 🐧 🎸 🍇 ☀️","จำลำดับนี้: 🌧️ 🐳 🍕 🔑"
      ]
    },
    "ป่วนจักรวาล ✨": {
      description: "ผลัดกันแต่งเรื่องสุดจินตนาการ",
      placeholder: "แต่งเรื่องต่อจากอีกฝ่าย...",
      prompts: [
        "วันหนึ่งโลกทั้งใบกลายเป็นเยลลี่...","ประตูเปิดออกแล้วมีมังกรตัวจิ๋ว...",
        "เราเจอรีโมตที่หยุดเวลาได้...","จู่ ๆ ทุกคนในเมืองพูดเป็นเพลง...",
        "ยานอวกาศลงจอดกลางสนามฟุตบอล...","แมวตัวหนึ่งกลายเป็นนายกเมือง...",
        "ฝนตกลงมาเป็นลูกอม...","มีจดหมายส่งมาจากอนาคต...",
        "ตื่นขึ้นมาแล้วพบว่าพูดกับต้นไม้ได้...","โรงเรียนกลายเป็นปราสาทลอยฟ้า...",
        "มีหุ่นยนต์มาขอให้เราช่วยตามหาเพื่อน...","เจอแผนที่ขุมทรัพย์ใต้โต๊ะ...",
        "ดวงจันทร์ส่งข้อความมาหาเรา...","รองเท้าคู่หนึ่งพาเราเดินทางข้ามเวลา...",
        "ลูกบอลฟุตบอลพูดได้และมีความลับ...","พบเกาะที่ทุกอย่างทำจากขนม...",
        "มีประตูเล็ก ๆ ซ่อนอยู่หลังตู้...","วันหนึ่งแรงโน้มถ่วงหายไป...",
        "สัตว์ทุกตัวสลับเสียงกัน...","มีร้านขายความฝันเปิดตอนเที่ยงคืน...",
        "เราพบเมืองที่ทุกคนตัวเท่าตุ๊กตา...","ดาวตกลงจอดในสวนหลังบ้าน...",
        "กระเป๋าใบหนึ่งเก็บของได้ไม่จำกัด...","หนังสือเล่มหนึ่งเขียนเรื่องอนาคต...",
        "เราได้เป็นผู้ดูแลดาวเคราะห์หนึ่งวัน...","มีรถไฟวิ่งผ่านก้อนเมฆ...",
        "ต้นไม้ต้นหนึ่งออกผลเป็นอัญมณี...","มีมังกรมาแข่งฟุตบอล...",
        "โลกถูกปกคลุมด้วยฟองสบู่...","นาฬิกาเรือนหนึ่งเดินถอยหลัง...",
        "หุ่นยนต์ตัวจิ๋วขอมาอยู่ด้วย...","เราพบสนามเด็กเล่นบนดาวเสาร์...",
        "มีเมฆก้อนหนึ่งตามเราไปทุกที่...","ทะเลกลายเป็นสีรุ้ง...",
        "ประตูบ้านเปิดไปยังโลกคู่ขนาน...","นกตัวหนึ่งนำจดหมายลับมาให้...",
        "ทุกคนมีพลังวิเศษหนึ่งชั่วโมง...","เราพบห้องสมุดใต้ทะเล...",
        "มีดาวเคราะห์ที่ทุกคนพูดกลับคำ...","สนามฟุตบอลลอยขึ้นไปบนฟ้า...",
        "มีแม่น้ำที่ไหลย้อนเวลา...","เราเจอแว่นที่มองเห็นความฝัน...",
        "โลกกลายเป็นภาพวาด...","มีเกาะลอยได้ปรากฏเหนือเมือง...",
        "มีหุ่นยนต์จัดการแข่งขันตลก...","เราได้ยินเสียงจากดวงดาว...",
        "มีร้านอาหารสำหรับมนุษย์ต่างดาว...","เจอประตูที่เปิดได้เฉพาะตอนหัวเราะ...",
        "ฝูงผีเสื้อพาเราไปยังเมืองลับ...","มีการแข่งขันสร้างโลกในหนึ่งวัน..."
      ]
    },
    "สร้างโลกของเรา 🏝️": {
      description: "ช่วยกันสร้างเกาะในจินตนาการ",
      placeholder: "พิมพ์ไอเดียสร้างโลกของเรา...",
      prompts: [
        "ถ้าเพิ่มบ้านหนึ่งหลัง จะสร้างแบบไหน?","ถ้าปลูกต้นไม้ได้หนึ่งต้น จะเลือกอะไร?",
        "ถ้าเพิ่มสถานที่เที่ยว จะสร้างที่ไหน?","ถ้าเลี้ยงสัตว์บนเกาะได้หนึ่งตัว จะเลือกอะไร?",
        "ตั้งชื่อเกาะของเราสองคน","ออกแบบชายหาดในฝัน",
        "สร้างร้านอาหารประจำเกาะ","เลือกสีท้องฟ้าของเกาะ",
        "สร้างสะพานเชื่อมเกาะ","ออกแบบบ้านต้นไม้",
        "ตั้งชื่อภูเขาบนเกาะ","สร้างน้ำตกมหัศจรรย์",
        "เลือกสัตว์ประจำเกาะ","สร้างสนามกีฬา",
        "สร้างห้องสมุดกลางป่า","ออกแบบสวนดอกไม้",
        "สร้างท่าเรือสุดพิเศษ","เลือกอาหารประจำเกาะ",
        "สร้างถ้ำลับ","ออกแบบหอคอยชมดาว",
        "สร้างตลาดนัด","เลือกเพลงประจำเกาะ",
        "สร้างโรงหนังกลางแจ้ง","ออกแบบสวนสนุก",
        "สร้างพิพิธภัณฑ์แปลก ๆ","ตั้งชื่อแม่น้ำ",
        "สร้างฟาร์มผลไม้","ออกแบบบ้านริมทะเล",
        "สร้างสนามฟุตบอล","เลือกเทศกาลประจำปี",
        "สร้างโรงเรียนในฝัน","ออกแบบห้องเล่นเกม",
        "สร้างเส้นทางจักรยาน","ตั้งชื่อป่า",
        "สร้างศูนย์ช่วยเหลือสัตว์","เลือกดอกไม้ประจำเกาะ",
        "สร้างประภาคาร","ออกแบบร้านขนม",
        "สร้างลานดูดาว","เลือกชุดประจำเกาะ",
        "สร้างสวนผีเสื้อ","ออกแบบน้ำพุ",
        "สร้างเรือสำรวจ","ตั้งชื่อเมืองเล็ก ๆ",
        "สร้างสะพานสายรุ้ง","ออกแบบสนามเด็กเล่น",
        "สร้างสถานีรถไฟ","เลือกสัญลักษณ์ประจำเกาะ",
        "สร้างห้องลับ","ออกแบบทางเดินดอกไม้",
        "สร้างลานกิจกรรม","เลือกกฎสนุก ๆ ของเกาะ"
      ]
    }
  };
  const state = {
    room: null, player: null, token: null, nickname: "",
    story: [], turn: 1, mode: GAMES[0], style: STYLES[0],
    p1: "ผู้เล่น 1", p2: "ผู้เล่น 2", joined: false,
    pollTimer: null, seconds: 30, timer: null,
    score: [0, 0], usedPrompts: {}, lastRandom: ""
  };
  const setup = $("setup");
  const roomView = $("room");
  const say = (id, text) => {
    const el = $(id);
    if (el) el.textContent = text;
  };
  const configReady = () =>
    window.SUPABASE_URL && window.SUPABASE_ANON_KEY &&
    window.ROOM_API_URL && !window.SUPABASE_URL.includes("PASTE_");
  const errorText = code => ({
    room_not_found: "ไม่พบห้องนี้ ลองตรวจรหัสอีกครั้งนะ",
    room_full: "ห้องนี้มีผู้เล่นครบแล้ว หากเป็นผู้เล่นเดิมให้กู้คืนเซสชัน",
    not_authorized: "โทเคนไม่ถูกต้อง ลองกู้คืนเซสชันเดิม",
    not_your_turn: "ยังไม่ถึงตาของคุณนะ",
    waiting_for_player_two: "รอผู้เล่นคนที่ 2 เข้าห้องก่อน",
    message_length: "ข้อความต้องมี 1–500 ตัวอักษร",
    only_host_can_change_mode: "เฉพาะผู้สร้างห้องเท่านั้นที่เปลี่ยนเกมได้",
    server_error: "เซิร์ฟเวอร์มีปัญหาชั่วคราว ลองอีกครั้ง"
  }[code] || code || "เกิดข้อผิดพลาด");
  function packSettings(mode = state.mode, style = state.style) {
    return `${mode} • ${style}`.slice(0, 60);
  }
  function unpackSettings(value) {
    const parts = String(value || "").split(" • ");
    state.mode = GAMES.includes(parts[0]) ? parts[0] : GAMES[0];
    state.style = STYLES.includes(parts[1]) ? parts[1] : STYLES[0];
  }
  async function api(action, extra = {}) {
    if (!configReady()) throw new Error("ยังตั้งค่าการเชื่อมต่อไม่ครบ");
    const res = await fetch(window.ROOM_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: window.SUPABASE_ANON_KEY,
        Authorization: "Bearer " + window.SUPABASE_ANON_KEY
      },
      body: JSON.stringify({
        action, code: state.room?.code,
        player: state.player, token: state.token, ...extra
      })
    });
    const data = await res.json().catch(() => ({ error: "server_error" }));
    if (!res.ok) throw new Error(data.error || "server_error");
    return data;
  }
  function setMessage(text, target = "roomMsg") {
    say(target, text);
  }
  function showRoom() {
    setup?.classList.add("hidden");
    roomView?.classList.remove("hidden");
  }
  function saveSession() {
    try {
      localStorage.setItem("knmr_session", JSON.stringify({
        code: state.room?.code,
        player: state.player,
        token: state.token,
        nickname: state.nickname
      }));
    } catch (error) {
      console.warn("บันทึกเซสชันไม่ได้", error);
    }
  }
  function clearSession() {
    try {
      localStorage.removeItem("knmr_session");
    } catch {}
  }
  function randomPrompt() {
    const pool = GAME_INFO[state.mode]?.prompts || [];
    if (!pool.length) return "เริ่มเกมกันเลย!";
    if (!state.usedPrompts[state.mode]) state.usedPrompts[state.mode] = [];
    let available = pool.filter(p => !state.usedPrompts[state.mode].includes(p));
    if (!available.length) {
      state.usedPrompts[state.mode] = [];
      available = [...pool];
    }
    const prompt = available[Math.floor(Math.random() * available.length)];
    state.usedPrompts[state.mode].push(prompt);
    return prompt;
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
    state.joined = !!room.player2_name;
    state.story = Array.isArray(room.story) ? room.story : [];
    render();
    saveSession();
  }
  function renderStory() {
    const story = $("story");
    if (!story) return;
    story.replaceChildren();
    if (!state.story.length) {
      const empty = document.createElement("div");
      empty.className = "empty";
      empty.textContent = `เริ่มเกม ${state.mode} แล้วข้อความจะอยู่ตรงนี้ ✨`;
      story.append(empty);
      return;
    }
    state.story.forEach(item => {
      const bubble = document.createElement("div");
      bubble.className = "bubble" + (item.player === 2 ? " p2" : "");
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
    say("p2status", state.joined ? "เข้าร่วมห้องแล้ว 💗" : "กำลังรอเพื่อนเข้าห้อง");
    $("p1card")?.classList.toggle("active", state.turn === 1);
    $("p2card")?.classList.toggle("active", state.turn === 2);
    say("count", `${state.story.length} รายการ`);
    renderStory();
    const info = gameInfo();
    const myTurn = state.player === state.turn;
    const ready = state.joined;
    say("feedTitle", info.title || state.mode);
    say("draftLabel", "คำตอบหรือผลการเล่น");
    if ($("draft")) $("draft").placeholder = info.placeholder;
    if ($("sendBtn")) $("sendBtn").textContent = "ส่งคำตอบ 🎮";
    if ($("draft")) $("draft").disabled = !myTurn || !ready;
    if ($("sendBtn")) {
      $("sendBtn").disabled = !myTurn || !ready || !$("draft").value.trim();
    }
    if ($("promptBtn")) $("promptBtn").disabled = !myTurn || !ready;
    say("turnBanner",
      !ready && state.player === 1
        ? "สร้างห้องแล้ว ส่งรหัสให้เพื่อนเข้าร่วมก่อน 💗"
        : !myTurn
          ? `รอ${state.turn === 1 ? state.p1 : state.p2}เล่นก่อน...`
          : info.description
    );
    if ($("modeSelect")) $("modeSelect").value = state.mode;
    if ($("styleSelect")) $("styleSelect").value = state.style;
    if ($("modeSelect")) $("modeSelect").disabled = state.player !== 1;
    if ($("styleSelect")) $("styleSelect").disabled = state.player !== 1;
    document.querySelectorAll(".mode-card").forEach(card => {
      card.classList.toggle("selected", card.dataset.mode === state.mode);
      card.disabled = state.player !== 1;
    });
    if ($("randomModeBtn")) {
      $("randomModeBtn").disabled = state.player !== 1;
      $("randomModeBtn").textContent = "🎰 สุ่มเกม";
    }
    document.body.dataset.style = state.style;
    say("score1", String(state.score[0]));
    say("score2", String(state.score[1]));
    const drawPanel = $("drawPanel");
    if (drawPanel) drawPanel.classList.toggle("hidden", state.mode !== GAMES[0]);
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
    state.pollTimer = setInterval(() => refreshRoom(true), 1800);
  }
  async function restoreSession() {
    try {
      const saved = localStorage.getItem("knmr_session");
      if (!saved) return;
      const session = JSON.parse(saved);
      if (!session.code || !session.token || ![1, 2].includes(Number(session.player))) return;
      state.room = { code: session.code };
      state.player = Number(session.player);
      state.token = session.token;
      state.nickname = session.nickname || "";
      const data = await api("get");
      applyRoom(data.room);
      showRoom();
      startPolling();
      history.replaceState({}, "", "?room=" + encodeURIComponent(state.room.code));
    } catch (error) {
      console.warn("กู้คืนห้องไม่สำเร็จ", error);
      state.room = null;
      state.player = null;
      state.token = null;
      say("setupMsg", "กู้คืนห้องเดิมไม่ได้ ลองใส่รหัสห้องหรือเข้าห้องใหม่");
    }
  }
  async function createRoom() {
    if (!configReady()) return say("setupMsg", "กรุณาตรวจ config.js");
    state.nickname = $("nickname")?.value.trim() || "ผู้เล่น 1";
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
      history.replaceState({}, "", "?room=" + state.room.code);
      setMessage("สร้างห้องแล้ว ส่งรหัสให้เพื่อนเข้าร่วมได้เลย 💗");
    } catch (error) {
      say("setupMsg", errorText(error.message));
    }
  }
  async function joinRoom() {
    if (!configReady()) return say("setupMsg", "กรุณาตรวจ config.js");
    const code = ($("roomInput")?.value.trim() ||
      new URLSearchParams(location.search).get("room") || "").toUpperCase();
    if (!code) return say("setupMsg", "ใส่รหัสห้องก่อนนะ");
    state.nickname = $("nickname")?.value.trim() || "ผู้เล่น 2";
    try {
      const saved = JSON.parse(localStorage.getItem("knmr_session") || "null");
      // ถ้าเซสชันเดิมตรงกับห้องที่ใส่ ให้ใช้โทเคนเดิม ไม่ join ซ้ำ
      if (saved && saved.code === code && saved.token &&
          [1, 2].includes(Number(saved.player))) {
        state.room = { code };
        state.player = Number(saved.player);
        state.token = saved.token;
        const data = await api("get");
        applyRoom(data.room);
      } else {
        const data = await api("join", { code, name: state.nickname });
        state.player = data.player;
        state.token = data.token;
        applyRoom(data.room);
      }
      saveSession();
      showRoom();
      startPolling();
      history.replaceState({}, "", "?room=" + code);
    } catch (error) {
      say("setupMsg", errorText(error.message));
    }
  }
  async function sendStory() {
    const input = $("draft");
    const text = input?.value.trim();
    if (!text || state.player !== state.turn || !state.joined) return;
    try {
      const data = await api("send", { text });
      input.value = "";
      applyRoom(data.room);
      setMessage("ส่งแล้ว! 🎮");
    } catch (error) {
      setMessage(errorText(error.message));
      await refreshRoom(true);
    }
  }
  async function changeSettings() {
    if (!state.room || state.player !== 1) return;
    const newMode = $("modeSelect")?.value;
    const newStyle = $("styleSelect")?.value;
    if (!GAMES.includes(newMode)) return;
    state.mode = newMode;
    state.style = STYLES.includes(newStyle) ? newStyle : STYLES[0];
    render();
    try {
      const data = await api("mode", { mode: packSettings() });
      applyRoom(data.room);
      setMessage("เปลี่ยนเกมแล้ว ทั้งคู่เห็นเกมที่เลือก 💗");
    } catch (error) {
      setMessage(errorText(error.message));
      await refreshRoom(true);
    }
  }
  function randomGame() {
    if (state.player !== 1) return setMessage("ให้ผู้สร้างห้องเป็นคนสุ่มเกมนะ");
    const choices = GAMES.filter(game => game !== state.mode);
    $("modeSelect").value = choices[Math.floor(Math.random() * choices.length)];
    changeSettings();
  }
  function setupDrawingBoard() {
    const canvas = $("drawCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let drawing = false;
    function resize() {
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      const image = canvas.toDataURL();
      canvas.width = Math.max(1, Math.floor(rect.width * ratio));
      canvas.height = Math.max(1, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      ctx.lineWidth = 4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = "#244d72";
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
      img.src = image;
    }
    function point(event) {
      const rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }
    canvas.addEventListener("pointerdown", event => {
      if (state.mode !== GAMES[0] || !state.joined || state.player !== state.turn) return;
      drawing = true;
      canvas.setPointerCapture?.(event.pointerId);
      const p = point(event);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
    });
    canvas.addEventListener("pointermove", event => {
      if (!drawing) return;
      const p = point(event);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    });
    ["pointerup", "pointercancel", "pointerleave"].forEach(name => {
      canvas.addEventListener(name, () => { drawing = false; });
    });
    $("clearDrawBtn")?.addEventListener("click", () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    });
    $("sendDrawBtn")?.addEventListener("click", async () => {
      if (!state.joined || state.player !== state.turn) {
        return setMessage("ยังไม่ถึงตาวาดของคุณ");
      }
      const image = canvas.toDataURL("image/png");
      try {
        // ส่งภาพในรูปแบบข้อความเพื่อให้ผู้เล่นอีกคนเห็นในประวัติ
        const data = await api("send", {
          text: "[DRAW]" + image
        });
        applyRoom(data.room);
        setMessage("ส่งภาพแล้ว 🎨");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      } catch (error) {
        setMessage(errorText(error.message));
      }
    });
    resize();
    window.addEventListener("resize", resize);
  }
  $("createBtn")?.addEventListener("click", createRoom);
  $("joinBtn")?.addEventListener("click", joinRoom);
  $("sendBtn")?.addEventListener("click", sendStory);
  $("modeSelect")?.addEventListener("change", changeSettings);
  $("styleSelect")?.addEventListener("change", changeSettings);
  $("randomModeBtn")?.addEventListener("click", randomGame);
  $("draft")?.addEventListener("input", render);
  document.querySelectorAll(".mode-card").forEach(card => {
    card.addEventListener("click", () => {
      if (state.player !== 1 || !GAMES.includes(card.dataset.mode)) return;
      $("modeSelect").value = card.dataset.mode;
      changeSettings();
    });
  });
  $("promptBtn")?.addEventListener("click", () => {
    if (state.player !== state.turn || !state.joined) return;
    const prompt = randomPrompt();
    if (state.mode === GAMES[0]) {
      say("drawPrompt", "วาดสิ่งนี้ให้อีกฝ่ายทาย: " + prompt);
    } else if ($("draft")) {
      $("draft").value = prompt;
      render();
      $("draft").focus();
    }
  });
  $("copyBtn")?.addEventListener("click", async () => {
    if (!state.room?.code) return;
    const url = location.origin + location.pathname + "?room=" + state.room.code;
    try {
      await navigator.clipboard.writeText(url);
      setMessage("คัดลอกลิงก์แล้ว 💌");
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
    // ไม่ลบเซสชัน เพื่อให้กลับเข้าห้องเดิมได้
    roomView?.classList.add("hidden");
    setup?.classList.remove("hidden");
    history.replaceState({}, "", location.pathname);
    say("setupMsg", "ออกจากหน้าห้องแล้ว เซสชันเดิมยังเก็บไว้สำหรับกลับเข้าห้อง");
  });
  window.KNMR = {
    games: GAMES,
    gameInfo,
    randomPrompt,
    getState: () => ({
      mode: state.mode,
      style: state.style,
      player: state.player,
      turn: state.turn,
      score: [...state.score]
    })
  };
  setupDrawingBoard();
  if (!configReady()) {
    say("setupMsg", "ยังตั้งค่าการเชื่อมต่อไม่ครบ กรุณาตรวจ config.js");
  } else {
    restoreSession();
  }
})();
