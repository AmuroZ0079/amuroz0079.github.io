function startTimer() {
  const datetimeInput = document.getElementById('datetime').value;
  const selectedStyle = document.getElementById('styleSelect').value;

  if (!datetimeInput) {
    alert('Please select date and time');
    return;
  }

  // Get FlipDown customization options
  const flipdownOptions = getFlipDownOptions();
  
  generateEmbedCode(datetimeInput, selectedStyle, flipdownOptions);

  // Adjust iframe height based on FlipDown size
  let iframeHeight = '260';
  if (selectedStyle === 'flipdown' && flipdownOptions.size) {
    if (flipdownOptions.size === 'large') {
      iframeHeight = '320';
    } else if (flipdownOptions.size === 'small') {
      iframeHeight = '200';
    } else {
      iframeHeight = '260';
    }
  }

  const preview = document.getElementById("timerPreview");
  const optionsParam = selectedStyle === 'flipdown' ? `&options=${encodeURIComponent(JSON.stringify(flipdownOptions))}` : '';
  preview.innerHTML = `<iframe src="https://amuroz0079.github.io/countdown2/embed.html?datetime=${encodeURIComponent(datetimeInput)}&style=${encodeURIComponent(selectedStyle)}${optionsParam}" width="500" height="${iframeHeight}" style="border:none;"></iframe>`;
}

function generateEmbedCode(dateTime, style, options = {}) {
  const encodedDate = encodeURIComponent(dateTime);
  const encodedStyle = encodeURIComponent(style);
  const optionsParam = style === 'flipdown' && Object.keys(options).length > 0 ? `&options=${encodeURIComponent(JSON.stringify(options))}` : '';
  
  // Adjust embed iframe height based on FlipDown size
  let iframeHeight = '260';
  if (style === 'flipdown' && options.size) {
    if (options.size === 'large') {
      iframeHeight = '320';
    } else if (options.size === 'small') {
      iframeHeight = '200';
    } else {
      iframeHeight = '260';
    }
  }
  
  const iframe = `<iframe src="https://amuroz0079.github.io/countdown2/embed.html?datetime=${encodedDate}&style=${encodedStyle}${optionsParam}" width="500" height="${iframeHeight}" style="border:none;"></iframe>`;
  document.getElementById("embedCode").value = iframe;
}

function copyEmbed() {
  const code = document.getElementById("embedCode");
  code.select();
  code.setSelectionRange(0, 99999);
  document.execCommand("copy");
  alert("Embed code copied!");
}

function toggleCustomOptions() {
  const selectedStyle = document.getElementById('styleSelect').value;
  const flipdownOptions = document.getElementById('flipdownOptions');
  
  if (selectedStyle === 'flipdown') {
    flipdownOptions.style.display = 'block';
  } else {
    flipdownOptions.style.display = 'none';
  }
}

function getFlipDownOptions() {
  return {
    theme: document.getElementById('flipdownTheme').value,
    headings: document.getElementById('flipdownHeadings').checked,
    size: document.getElementById('flipdownSize').value,
    accentColor: document.getElementById('flipdownAccentColor').value,
    backgroundColor: document.getElementById('flipdownBackgroundColor').value,
    textColor: document.getElementById('flipdownTextColor').value,
    borderRadius: document.getElementById('flipdownBorderRadius').value
  };
}

// Update border radius display
document.addEventListener('DOMContentLoaded', function() {
  const radiusSlider = document.getElementById('flipdownBorderRadius');
  const radiusValue = document.getElementById('radiusValue');
  
  if (radiusSlider && radiusValue) {
    radiusSlider.addEventListener('input', function() {
      radiusValue.textContent = this.value + 'px';
    });
  }
});

function startRingCountdown(targetTime) {
  function update() {
    const now = new Date();
    const diff = Math.max(0, (targetTime - now) / 1000);

    const d = Math.floor(diff / (60 * 60 * 24));
    const h = Math.floor((diff / (60 * 60)) % 24);
    const m = Math.floor((diff / 60) % 60);
    const s = Math.floor(diff % 60);

    setRingProgress("ringDays", "labelDays", d, 30, "d");
    setRingProgress("ringHours", "labelHours", h, 24, "h");
    setRingProgress("ringMinutes", "labelMinutes", m, 60, "m");
    setRingProgress("ringSeconds", "labelSeconds", s, 60, "s");

    requestAnimationFrame(update);
  }

  update();
}

function setRingProgress(circleId, labelId, value, max, unit) {
  const circle = document.getElementById(circleId);
  const label = document.getElementById(labelId);

  if (!circle || !label) return;

  const radius = circle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  circle.style.strokeDasharray = `${circumference}`;
  const offset = circumference * (1 - value / max);
  circle.style.strokeDashoffset = offset;

  label.textContent = `${String(value).padStart(2, '0')}${unit}`;
}