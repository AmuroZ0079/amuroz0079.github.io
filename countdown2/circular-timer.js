// แทนที่ function startCircularTimer ใน embed.html
function startCircularTimer(targetTime) {
  const circle = document.getElementById("progressCircle");
  const label = document.getElementById("circularTime");

  const total = (targetTime - new Date()) / 1000;
  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  let remaining = total;

  function update() {
    const now = new Date();
    remaining = (targetTime - now) / 1000;

    if (remaining <= 0) {
      label.textContent = "00:00";
      circle.style.strokeDashoffset = circumference;
      return;
    }

    const d = Math.floor(remaining / (60 * 60 * 24));
    const h = Math.floor((remaining / (60 * 60)) % 24);
    const m = Math.floor((remaining / 60) % 60);
    const s = Math.floor(remaining % 60);

    // แสดงแบบเข้าใจง่าย - เหมือนใน circular-timer.js
    if (d > 0) {
      label.textContent = `${d}d ${String(h).padStart(2, '0')}h`;
    } else {
      label.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    const offset = circumference * (1 - remaining / total);
    circle.style.strokeDashoffset = offset;

    requestAnimationFrame(update);
  }

  update();
}


function updateRing(targetTime) {
  const now = new Date();
  const total = (targetTime - now) / 1000;

  const d = Math.floor(total / (60 * 60 * 24));
  const h = Math.floor((total / (60 * 60)) % 24);
  const m = Math.floor((total / 60) % 60);
  const s = Math.floor(total % 60);

  const circle = (id, value, max) => {
    const el = document.getElementById(id);
    const radius = el.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - value / max);
    el.style.strokeDasharray = circumference;
    el.style.strokeDashoffset = offset;
  };

  // ปรับแต่ละวง
  circle("ringDays", d, 30); // max 30 วัน
  circle("ringHours", h, 24);
  circle("ringMinutes", m, 60);
  circle("ringSeconds", s, 60);

  // อัปเดต label
  document.getElementById("labelDays").textContent = `${d}d`;
  document.getElementById("labelHours").textContent = `${String(h).padStart(2, '0')}h`;
  document.getElementById("labelMinutes").textContent = `${String(m).padStart(2, '0')}m`;
  document.getElementById("labelSeconds").textContent = `${String(s).padStart(2, '0')}s`;

  requestAnimationFrame(() => updateRing(targetTime));
}
