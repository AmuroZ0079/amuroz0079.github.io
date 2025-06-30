let lang = 'th';
const text = {
  th: {
    mainTitle: 'Countdown Timer',
    labelDatetime: 'เลือกวันเวลาเป้าหมาย:',
    startBtn: 'เริ่มนับถอยหลัง',
    embedTitle: 'Embed Code:',
    expired: 'หมดเวลาแล้ว!',
    units: ['วัน', 'ชม.', 'นาที', 'วิ']
  },
  en: {
    mainTitle: 'Countdown Timer',
    labelDatetime: 'Select Target Date & Time:',
    startBtn: 'Start Countdown',
    embedTitle: 'Embed Code:',
    expired: 'Time is up!',
    units: ['Day', 'Hr', 'Min', 'Sec']
  }
};

function toggleLang() {
  lang = lang === 'th' ? 'en' : 'th';
  document.getElementById('langBtn').innerText = lang === 'th' ? 'EN' : 'TH';
  document.getElementById('mainTitle').innerText = text[lang].mainTitle;
  document.getElementById('labelDatetime').innerText = text[lang].labelDatetime;
  document.getElementById('startBtn').innerText = text[lang].startBtn;
  document.getElementById('embedTitle').innerText = text[lang].embedTitle;
  // อัปเดต timer preview ถ้ามี
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  if (date && time) {
    const dateTime = date + 'T' + time;
    const targetTime = new Date(dateTime).toISOString();
    updateTimer(targetTime, document.getElementById("timer"));
    generateEmbedCode();
  }
}

function updateTimer(targetDate, element) {
  let alarmPlayed = false;
  function render() {
    const now = new Date();
    const diff = new Date(targetDate) - now;
    if (diff <= 0) {
      if (!alarmPlayed) {
        document.getElementById("alarmSound").play();
        alarmPlayed = true;
      }
      element.innerHTML = `<span class='expired'>${text[lang].expired}</span>`;
      clearInterval(interval);
      return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    const u = text[lang].units;

    const isNearEnd = diff < 60000; // น้อยกว่า 1 นาที
    const warningClass = isNearEnd ? 'warning' : '';

    element.innerHTML = `
      <span class="timer-unit pulse ${warningClass}">${days} ${u[0]}</span>
      <span class="timer-unit pulse ${warningClass}">${hours} ${u[1]}</span>
      <span class="timer-unit pulse ${warningClass}">${minutes} ${u[2]}</span>
      <span class="timer-unit pulse ${warningClass}">${seconds} ${u[3]}</span>
    `;
  }
  render();
  const interval = setInterval(render, 1000);
}


function generateEmbedCode() {
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  if (!date || !time) return alert(lang === 'th' ? "กรุณาเลือกวันและเวลา" : "Please select date and time");
  const dateTime = date + 'T' + time;
  const targetTime = new Date(dateTime).toISOString();
  const u = text[lang].units;
  const expired = text[lang].expired;
  const embedCode = `<iframe srcdoc='<!DOCTYPE html><html><head><link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&display=swap" rel="stylesheet"><style>:root{--gundam-blue:#1a237e;--gundam-red:#d32f2f;--gundam-yellow:#ffd700;--gundam-gray:#424242;--gundam-light:#e0e0e0}body{margin:0;font-family:Orbitron,sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;background:linear-gradient(135deg,var(--gundam-gray) 0%,#000 100%)}.timer-unit{display:inline-block;padding:15px 25px;margin:0 5px;background:linear-gradient(145deg,var(--gundam-blue),#000);border:2px solid var(--gundam-red);border-radius:10px;color:var(--gundam-light);text-shadow:0 0 5px var(--gundam-yellow);transition:all 0.3s ease;position:relative;overflow:hidden}.timer-unit::after{content:"";position:absolute;top:-4px;left:-4px;right:-4px;bottom:-4px;border-radius:12px;border:2px solid var(--gundam-yellow);opacity:0.15;pointer-events:none;box-shadow:0 0 20px 8px var(--gundam-yellow);animation:shine-border 2.5s linear infinite;z-index:0}@keyframes shine-border{0%{opacity:0.15}50%{opacity:0.35}100%{opacity:0.15}}@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.05)}100%{transform:scale(1)}}</style></head><body><div id="t"></div><script>let d=new Date("${targetTime}");let u=["${u[0]}","${u[1]}","${u[2]}","${u[3]}"];let expired="${expired}";function f(){let n=new Date(),x=d-n;if(x<=0){t.innerHTML="<span class=\'expired\'>"+expired+"</span>";return}let z=Math.floor;x/=1000;let s=z(x%60),m=z(x/60)%60,h=z(x/3600)%24,day=z(x/86400);t.innerHTML='<span class="timer-unit">'+day+' '+u[0]+'</span><span class="timer-unit">'+h+' '+u[1]+'</span><span class="timer-unit">'+m+' '+u[2]+'</span><span class="timer-unit">'+s+' '+u[3]+'</span>'; }setInterval(f,1000);f();<\/script></body></html>' style='width:100%;height:150px;border:none;'></iframe>`;
  document.getElementById("embedCode").value = embedCode;
  const previewEl = document.getElementById("timer");
  updateTimer(targetTime, previewEl);
} 