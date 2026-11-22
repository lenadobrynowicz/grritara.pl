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

const art = document.querySelector(".hero-art");
const canParallax = window.matchMedia("(hover: hover) and (min-width: 980px)").matches;
if (art && canParallax && !motionOff) {
  const hero = document.querySelector(".hero");
  hero.addEventListener("pointermove", (event) => {
    const box = hero.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    art.style.transform = `translate3d(${x * 16}px, ${y * 12}px, 0)`;
  });
  hero.addEventListener("pointerleave", () => {
    art.style.transform = "";
  });
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
