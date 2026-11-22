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
