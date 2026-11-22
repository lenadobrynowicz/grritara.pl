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

  const photos = form.querySelector('input[name="photos"]');
  const selected = photos && photos.files ? photos.files.length : 0;
  const photoNote =
    selected > 0
      ? ` Wybrane zdjęcia (${selected}) zostały na tym urządzeniu i nie zostały nigdzie przesłane.`
      : " Nie dołączono zdjęć.";

  status.textContent =
    "Zapytanie nie zostało wysłane. Formularz nie ma jeszcze podłączonej obsługi, więc opis nie trafił na e-mail ani na telefon." +
    photoNote;
});
