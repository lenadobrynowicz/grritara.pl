# GRRITARA.PL

Osobna strona serwisu, naprawy i regulacji gitar. Nie jest częścią projektu Golden Rain Records: ma własny folder, własne repozytorium Git i będzie miała własne wdrożenie.

Wygląd nawiązuje do [goldenrainrecords.pl](https://goldenrainrecords.pl) tylko kolorem, ciemnym tłem i charakterem przycisków. Nie współdzieli z tamtą stroną plików, zależności ani hostingu.

## Struktura

```
grritara/
  index.html          strona serwisu (jedna podstrona, sekcje)
  css/fonts.css       lokalne fonty
  css/styles.css      wygląd
  js/main.js          menu i formularz
  fonts/              Space Grotesk i Manrope (SIL Open Font License)
  images/hero/        zdjęcie banera
  images/gallery/     zdjęcia realizacji
  images/pracownia/   zdjęcie pracowni
  favicon.svg
  robots.txt
  sitemap.xml
```

Teksty, ceny i dane kontaktowe są w `index.html`. Szukaj komentarzy `CENA`, `KONTAKT` i `Podmiana zdjęcia`.

## Technologie

Czysty HTML, CSS i JavaScript, bez frameworka i bez Node.js. Fonty leżą lokalnie w `fonts/`. Jedna strona statyczna ładuje się szybko, a później można ją wystawić jako zwykłe pliki.

## Uruchomienie lokalnie

W tym folderze:

```powershell
py -m http.server 4173
```

Potem otwórz [http://localhost:4173](http://localhost:4173).

## Osobne repozytorium GitHub

Repozytorium lokalne jest na gałęzi `main`. Jest jeden commit, a `origin` wskazuje na https://github.com/lenadobrynowicz/grritara.pl.git. To własne repozytorium strony GRRITARA.

Kolejne zmiany wysyłasz tak:

```powershell
git add .
git commit -m "Opis zmiany."
git push
```

Domena i hosting nie są skonfigurowane. Pliki są statyczne, więc później można je wystawić niezależnie, na przykład z GitHub Pages albo innego hostingu plików. To będzie osobna decyzja od strony Golden Rain Records.

## Lekcje i warsztaty

Nie ma jeszcze tych podstron. Gdy przyjdzie na nie czas:

1. Dodaj `lekcje.html` i `warsztaty.html` obok `index.html`.
2. Skopiuj nagłówek i stopkę, podmień treść.
3. Dopisz linki w nawigacji w `index.html` oraz w nowych plikach.
4. Dopisz adresy do `sitemap.xml`.

W stopce jest tylko informacja, że te działy są w przygotowaniu. Nie prowadzą do pustych stron.

## Zdjęcia

Podmień plik SVG na własne zdjęcie i zmień `src` w `index.html`, na przykład:

`images/gallery/regulacja-gryf.jpg`

Proporcje: baner pionowy około 4:5 na komputerze, galeria i pracownia 4:3. Obrazki skalują się same (`object-fit: cover`).

Nie wstawiaj zdjęć stockowych jako dokumentacji realizacji.

## Czcionka

Propozycja na ten etap, nie ostateczne logo: **Space Grotesk** w napisie GRRITARA.PL i w nagłówkach, **Manrope** w tekście. Symbol graficzny można dodać później w `<span class="brand-symbol">`.

## Do uzupełnienia przed publikacją

- ulica lokalu w Szczecinie, jeśli ma być publikowana
- własne zdjęcia: `images/hero/instrument.jpg`, `images/gallery/instrument.jpg`, `progi-detal.jpg`, `przed.jpg`, `po.jpg`
- prawdziwa wysyłka formularza (przycisk nic nie wysyła, także zdjęć)
- kod weryfikacyjny Google Search Console w komentarzu w `index.html`
- domena i hosting
