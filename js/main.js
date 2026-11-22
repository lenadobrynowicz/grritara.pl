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
  if (event.key === "Escape") {
    setMenu(false);
  }
});

const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  status.textContent =
    "Wiadomość nie została wysłana. Formularz nie ma jeszcze podłączonej wysyłki, więc nic nie trafiło na skrzynkę ani na telefon.";
});
