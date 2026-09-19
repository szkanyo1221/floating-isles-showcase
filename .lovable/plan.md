# Integrarea celor 4 fotografii noi în galeria Insule Plutitoare

## Obiectiv
Adăugarea celor patru fotografii reale în galeria existentă, păstrând designul actual, ordinea vizuală, lightbox-ul și performanța site-ului.

## Implementare
1. **Pregătirea fotografiilor**
   - Păstrez culorile și încadrarea originale, fără filtre sau retușuri.
   - Generez pentru fiecare fotografie variante WebP responsive la 480, 960 și maximum 1600 px, fără mărirea imaginilor verticale peste rezoluția sursă.
   - Creez miniaturi blur foarte mici pentru încărcare progresivă.
   - Folosesc denumiri SEO descriptive în limba română.

2. **Integrarea în galeria existentă**
   - Extind manifestul actual cu cele patru imagini, dimensiunile reale și texte ALT naturale.
   - Le poziționez ca un grup coerent de proiect urban matur, alternând cadrele verticale și orizontale pentru un ritm echilibrat în masonry.
   - Nu creez categorii noi: cele patru cadre aparțin aceluiași proiect și numărul nu justifică filtre suplimentare.
   - Păstrez galeria, animațiile discrete și lightbox-ul existente; navigarea, tastatura, gesturile tactile și revenirea la poziția din pagină rămân funcționale.

3. **SEO și performanță**
   - Textele ALT vor descrie concret insula vegetală, vegetația acvatică, canalul urban și reflexiile, fără repetarea artificială a cuvintelor-cheie.
   - Păstrez `srcset`, `sizes`, lazy loading, decoding asincron, dimensiuni explicite și datele `ImageGallery` deja generate automat.
   - Actualizez atât copia de producție de la rădăcina proiectului, cât și copia folosită de previzualizarea locală, astfel încât structura actuală de publicare să rămână intactă.

4. **Verificare finală**
   - Verific toate cele 14 imagini, încărcarea variantelor responsive și absența fișierelor lipsă.
   - Testez galeria și lightbox-ul pe desktop, tabletă și telefon, inclusiv navigarea înainte/înapoi, închiderea și lipsa derulării orizontale.
   - Verific aspectul vizual prin capturi reale și controlez erorile de încărcare, consolă și build.
   - Confirm că paginile existente și celelalte funcționalități nu au fost afectate.

## Ordinea și textele propuse
- `insula-vegetala-plutitoare-canal-urban-bucuresti` — „Insulă vegetală plutitoare cu vegetație acvatică matură, integrată într-un canal urban din București”
- `insula-plutitoare-vegetatie-matura-reflexie-oras` — „Insulă plutitoare cu vegetație matură și reflexie în apă, într-un peisaj urban”
- `insula-vegetala-plutitoare-plante-acvatice-canal` — „Insulă vegetală plutitoare cu plante acvatice dense, amplasată într-un canal”
- `insula-plutitoare-proiect-urban-reflexie` — „Insulă plutitoare matură reflectată în apă, într-un proiect urban de integrare ecologică”
