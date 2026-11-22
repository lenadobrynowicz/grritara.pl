// Pusty ciąg nie wstawia zdjęcia. Po sesji wpisz ścieżkę, np. "images/hero/instrument.jpg".
// Katalogi: images/hero, images/o-mnie, images/oferta, images/realizacje.
const media = {
  hero: "",
  about: "",
  services: {
    regulacja: "",
    progi: "",
    podstawowy: "",
    osprzet: "",
  },
  gallery: [],
};

function place(slot, src, alt, eager) {
  if (!slot || !src) return;

  const img = document.createElement("img");
  img.src = src;
  img.alt = alt || "";
  img.decoding = "async";
  if (eager) img.setAttribute("fetchpriority", "high");
  else img.loading = "lazy";

  slot.append(img);
  slot.hidden = false;
  slot.closest("[data-media-root]")?.classList.add("has-media");
}

document.querySelectorAll("[data-media]").forEach((slot) => {
  const key = slot.dataset.media;
  const alt = slot.dataset.alt || "";

  if (key === "hero") place(slot, media.hero, alt, true);
  else if (key === "about") place(slot, media.about, alt, false);
  else if (key.startsWith("service:")) place(slot, media.services[key.slice(8)], alt, false);
});

if (media.gallery.length) {
  const section = document.createElement("section");
  section.className = "section";
  section.id = "realizacje";
  section.innerHTML = '<div class="wrap"><h2>Realizacje</h2><div class="gallery-grid"></div></div>';
  const grid = section.querySelector(".gallery-grid");

  media.gallery.forEach((item) => {
    const src = typeof item === "string" ? item : item.src;
    if (!src) return;
    const img = document.createElement("img");
    img.src = src;
    img.alt = typeof item === "string" ? "Realizacja serwisu GRRITARA." : item.alt || "";
    img.loading = "lazy";
    img.decoding = "async";
    grid.append(img);
  });

  if (grid.children.length) {
    document.getElementById("kontakt").before(section);
  }
}
