const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#nav-menu");

function setMenu(open) {
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
}

toggle.addEventListener("click", () => {
  setMenu(!menu.classList.contains("is-open"));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (menu.classList.contains("is-open")) {
    setMenu(false);
    toggle.focus();
    return;
  }

  const fold = event.target.closest(".fold");
  const button = fold && fold.querySelector(".more-toggle[aria-expanded='true']");
  if (!button) return;

  const panel = document.getElementById(button.getAttribute("aria-controls"));
  button.setAttribute("aria-expanded", "false");
  panel.classList.remove("is-open");
  panel.setAttribute("aria-hidden", "true");
  button.focus();
});

const motionOff = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("motion");

if (!motionOff && "IntersectionObserver" in window) {
  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      seen.unobserve(entry.target);
    });
  }, { threshold: 0.18 });

  document.querySelectorAll(".reveal, .section, .axis").forEach((node) => seen.observe(node));
} else {
  document.querySelectorAll(".reveal, .section, .axis").forEach((node) => node.classList.add("is-in"));
}

const strings = document.querySelectorAll(".g-string");
let audioCtx = null;
let activeVoice = null;
let nextSoundAt = 0;

function stringWave(amplitude, phase) {
  const mid = 16;
  let path = `M0 ${mid}`;
  const steps = 28;
  for (let i = 1; i <= steps; i += 1) {
    const along = i / steps;
    const x = 640 * along;
    const envelope = Math.sin(along * Math.PI);
    const y = mid + Math.sin(along * Math.PI * 2 + phase) * amplitude * envelope;
    path += ` L${x.toFixed(1)} ${y.toFixed(2)}`;
  }
  return path;
}

function pluckString(button) {
  const path = button.querySelector(".wave");
  button.classList.add("is-lit");
  window.setTimeout(() => button.classList.remove("is-lit"), 700);
  if (!path || motionOff) return;

  const started = performance.now();
  function frame(now) {
    const progress = Math.min(1, (now - started) / 640);
    const amplitude = Math.sin(progress * Math.PI) * (1 - progress) * 7.5;
    path.setAttribute("d", stringWave(amplitude, progress * Math.PI * 7));
    if (progress < 1) requestAnimationFrame(frame);
    else path.setAttribute("d", "M0 16 H640");
  }
  requestAnimationFrame(frame);
}

function pluckedBuffer(frequency) {
  const sampleRate = audioCtx.sampleRate;
  const period = Math.max(2, Math.round(sampleRate / frequency));
  const duration = 1.7;
  const length = Math.floor(sampleRate * duration);
  const buffer = audioCtx.createBuffer(1, length, sampleRate);
  const data = buffer.getChannelData(0);
  const noise = new Float32Array(period);
  for (let i = 0; i < period; i += 1) {
    noise[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / period);
  }
  let previous = 0;
  const decay = Math.min(0.996, 0.978 + 8 / frequency);
  for (let i = 0; i < length; i += 1) {
    const current = noise[i % period];
    const filtered = decay * ((current + previous) * 0.5);
    noise[i % period] = filtered;
    previous = current;
    data[i] = filtered;
  }
  return buffer;
}

function playString(button) {
  pluckString(button);
  const now = performance.now();
  if (now < nextSoundAt) return;
  nextSoundAt = now + 170;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return;
  if (!audioCtx) audioCtx = new AudioContext();
  if (audioCtx.state === "suspended") audioCtx.resume();

  if (activeVoice) {
    activeVoice.gain.gain.cancelScheduledValues(audioCtx.currentTime);
    activeVoice.gain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.02);
    activeVoice.source.stop(audioCtx.currentTime + 0.06);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = pluckedBuffer(Number(button.dataset.freq));
  const tone = audioCtx.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2400;
  const gain = audioCtx.createGain();
  const level = Math.min(0.34, 0.16 + 18 / Number(button.dataset.freq));
  gain.gain.setValueAtTime(level, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.65);
  source.connect(tone);
  tone.connect(gain);
  gain.connect(audioCtx.destination);
  source.start();
  source.stop(audioCtx.currentTime + 1.7);
  activeVoice = { source, gain };
}

strings.forEach((button) => {
  button.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    playString(button);
  });
  button.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse") return;
    playString(button);
  });
  button.addEventListener("click", (event) => {
    if (event.detail !== 0) return;
    playString(button);
  });
});

const marquee = document.querySelector(".marquee");
const track = marquee && marquee.querySelector(".marquee-track");
const sequence = track && track.querySelector("p");

if (marquee && track && sequence) {
  const unit = sequence.cloneNode(true);

  function fillMarquee() {
    const view = marquee.clientWidth;
    const set = document.createElement("div");
    set.className = "marquee-set";
    set.append(unit.cloneNode(true));
    track.replaceChildren(set);

    let copies = 1;
    while (set.offsetWidth < view + 8 && copies < 40) {
      set.append(unit.cloneNode(true));
      copies += 1;
    }

    track.append(set.cloneNode(true));
    track.style.animationDuration = `${28 * copies}s`;
  }

  fillMarquee();
  window.addEventListener("resize", fillMarquee);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fillMarquee);
  }
}

document.querySelectorAll(".more-toggle").forEach((button) => {
  const panel = document.getElementById(button.getAttribute("aria-controls"));
  panel.setAttribute("aria-hidden", "true");

  button.addEventListener("click", () => {
    const next = button.getAttribute("aria-expanded") !== "true";
    button.setAttribute("aria-expanded", String(next));
    panel.classList.toggle("is-open", next);
    panel.setAttribute("aria-hidden", String(!next));
  });
});
