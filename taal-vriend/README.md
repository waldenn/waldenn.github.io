# TaalVriend 🇳🇱

Een 100% offline, local-first Nederlandse taal app speciaal ontworpen voor vluchtelingen en nieuwkomers om speels en effectief Nederlandse woorden, klokkijken, zinnen, het alfabet, luistervaardigheid en interactieve reactiesituaties te leren.

---

## 📱 Zes Geïntegreerde Applicaties (App-Switcher & Deep Links)

Via de **App-Switcher** knop in de menubalk (of direct via de URL-parameter `?app=...`) wissel je met één klik tussen 6 krachtige leermodi.
In het app-keuzemenu wordt de naam van elke applicatie ook getoond in de actieve moedertaal van de gebruiker.
Als TaalVriend geopend wordt **zonder `?app` parameter**, wordt het keuzemenu automatisch direct getoond.

Volgorde in het app-keuzemenu:
1. `?app=woorden` ➔ **Woorden Leren** (1.517+ woorden, inclusief 250 Pre-A1 woorden en ERK-tabs)
2. `?app=zinnen` ➔ **Zinnen Oefenen** (390+ zinnen zonder haakjes of codes)
3. `?app=luisteren` ➔ **Luistervaardigheid** (121 fragmenten)
4. `?app=reageer` ➔ **Luister en Reageer** (700+ interactieve praktijksituaties: 100 per niveau)
5. `?app=klok` ➔ **Klok Kijken** (144 tijden in 5-minuten intervallen)
6. `?app=alphabet` (of `?app=alfabet`) ➔ **Alfabet & Klanken** (38 letters & klanken met duidelijke moedertaal-badge)

De actieve app wordt automatisch in de adresbalk bijgehouden via `history.replaceState`.

---

### 1. 📖 Woorden Leren (1.517+ Woorden over 7 Niveaus)
- **Niveau-selectie (ERK/CEFR Tabs)**:
  - Filter direct op taalniveau: **Alles** (1.517), **Pre-A1** (250 basiswoorden), **A1** (182), **A2** (592), **B1** (356), **B2** (113), **C1** (14) en **C2** (10), compleet met live tellers.
- **Uitgebreide Pre-A1 Woordenschat (250 Woorden)**:
  - Speciaal voor absolute beginners: kleuren, getallen (1 t/m 100), familieleden, basis eten en drinken, bestek en keukenspullen, kleding, meubels, lichaamsdelen, eenvoudige dieren, schoolspullen en basis handelingen (eten, drinken, slapen, lopen, kijken, wassen, koken, lachen).
  - Elk woord bevat een ultrakorte, begrijpelijke voorbeeldzin met moedertaalvertaling.
- **Kolommen-weergave**:
  - **Beeld**: Scalable vector illustratie (SVG)
  - **Nederlands Woord**: Extra breed en prominent weergegeven, compleet met lidwoord-badge (`de` / `het`)
  - **Moedertaal Vertaling**: Authentiek Somalisch (Af-Soomaali), Arabisch (met automatische RTL), Tigrinya (Ge'ez), Oromo of Engels
  - **Voorbeeldzin met Moedertaalvertaling**:
    - Toont zowel de Nederlandse voorbeeldzin als de vertaling in de moedertaal er direct onder.
    - **Niveau-afhankelijk**: Voor gebruikers met niveau **Pre-A1**, **A1** of **A2** worden aanzienlijk eenvoudigere voorbeeldzinnen getoond.
    - **TTS Woord-cursor Highlighting**: Klik op de voorbeeldzin en zie de cursor woord voor woord meelopen tijdens de Nederlandse uitspraak!
- **Altijd gecentreerde actieve regel**:
  - De geselecteerde rij scrollt automatisch soepel naar het exacte midden van het scherm (`block: 'center'`), zowel bij klikken als bij pijltjestoetsen, zodat de gebruiker nooit handmatig hoeft mee te scrollen.
- **Gespecialiseerde Categorieën**:
  - 🚲 **Fietsonderdelen**, 🍳 **Keukengerei**, 🧂 **Standaard ingrediënten**, 🍲 **Bekende maaltijden**, 🫀 **Lichaamsdelen**
  - 📅 **Dagen van de week**, 📆 **Maanden van het jaar**, 🎆 **Officiële feestdagen**
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt het actieve woord uit via de Nederlandse spraakstem
  - `↓` / `↑`: Naar de volgende of vorige regel

---

### 2. 💬 Zinnen Oefenen (390+ Zinnen over 7 Niveaus)
- **390 Praktische Zinnen** verdeeld over alle 7 ERK/CEFR niveaus:
  - 🟠 **Pre-A1**: Elementaire basiszinnen
  - 🟢 **A1**: Alledaagse basiszinnen (begroetingen, boodschappen, familie)
  - 🔵 **A2**: Praktische situaties (huisarts, school, OV, wonen)
  - 🟦 **B1**: Werkoverleg, instanties, afspraken
  - 🟪 **B2**: Professionele context, nuance en meningsvorming
  - 🟫 **C1**: Complexe maatschappelijke en formele thema's
  - 🟥 **C2**: Academische en verfijnde idiomatische uitingen
- **Expansieve weergave**: Optimaal gebruik van het schermoppervlak met grote, rustige typografie.
- **100% Schone Teksten**: Volledig ontdaan van haakjes, annotaties of suffixen.
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt de getoonde zin uit
  - `←` / `→` of `↑` / `↓`: Bladeren door zinnen in het gekozen niveau
  - Willekeurige zin knop (`🎲`)

---

### 3. 🎧 Luistervaardigheid (121 Luisterteksten over 7 Niveaus)
- **Interactieve Dictee & Luisterbegrip**:
  - De gebruiker hoort een audiofragment (maximaal 5 regels) uitgesproken worden
  - **Tekst afgeschermd**: De gebruiker traint eerst het gehoor zonder afleidende tekst
  - Druk op de **`SPATIE-toets`** (of klik op de onthulknop) om zowel de **volledige Nederlandse tekst** als de **moedertaalvertaling** direct in beeld te brengen
  - Geanimeerde geluidsgolven tijdens de weergave
- **7 ERK/CEFR Niveaus**: Pre-A1, A1, A2, B1, B2, C1, C2.

---

### 4. 🎯 Luister en Reageer (700+ Vragen over 7 Niveaus: 100 per niveau) - *Nieuw!*
- **700 Interactieve Praktijksituaties**:
  - Precies 100 vragen per ERK-niveau: Pre-A1, A1, A2, B1, B2, C1 en C2.
  - De speler luistert naar een gesproken Nederlandse zin of vraag (met actieve woordcursor) in herkenbare situaties (supermarkt, dokter, school, werk, gemeente, OV, buren, etc.).
  - Keuze uit 4 antwoordopties (te bedienen via muisklik of toetsen `1`, `2`, `3`, `4`).
  - Directe feedback (✅ of ❌) met heldere toelichting in zowel het **Nederlands** als de **moedertaal** (inclusief echt Somalisch).
  - Volledige toetsenbordnavigatie (`SPATIE` voor audio, pijltjestoetsen voor volgende/vorige).

---

### 5. ⏰ Klok Kijken (144 Tijden met Raadmodus)
- **Zelf eerst de tijd raden**:
  - De gebruiker ziet eerst uitsluitend de visuele analoge klok.
  - Pas na een druk op de **`SPATIE-toets`** (of een klik op de kaart) worden de tijdsaanduiding en digitale tijd onthuld en wordt de tijd uitgesproken met woordcursor.
- **144 Kloksituaties** (alle 12 uren in intervallen van 5 minuten).
- Volledige vertalingen in alle 5 ondersteunde moedertalen (geen "Kies een uur" knop meer aanwezig).

---

### 6. 🔤 Alfabet & Klanken (38 Klanken & Letters)
- **Klankuitspraak & Fonetiek**:
  - Alle 26 letters (A t/m Z) plus Nederlandse tweeklanken: AA, EE, OO, UU, OE, IE, EU, UI, EI/IJ, OU/AU, CH/SCH, NG/NK.
- **Interactieve Voorbeeldwoorden met Duidelijke Moedertaal-badge**:
  - Elk voorbeeldwoord bevat een opvallende badge met vlag, taalnaam en vertaling (bijv. `🇸🇴 Soomaali: tufaax` of `🇸🇦 العربية: تفاحة`), zodat cursisten direct begrijpen wat de vertaling is.
  - Klik op een willekeurig woord om direct de uitspraak te horen.

---

## ⚙️ Geavanceerde Instellingen & Personalisatie

In het configuratiemenu (`⚙️`) zijn uitgebreide aanpassingen beschikbaar:

1. **Moedertaal Keuze**:
   - 🇸🇦 Standaard Arabisch (met RTL-tekstrichting)
   - 🇪🇷 Tigrinya (Ge'ez schrift)
   - 🇪🇹 Oromo (Afaan Oromoo)
   - 🇸🇴 Somalisch (Soomaali)
   - 🇬🇧 Engels (English)
2. **ERK / CEFR Taalniveau**:
   - Keuze uit `Pre-A1`, `A1`, `A2`, `B1`, `B2`, `C1`, `C2`
   - Past de moeilijkheidsgraad aan in de Woorden-, Zinnen-, Luister- en Reageer-apps
   - Snelkeuzeknop ook direct in de navigatiebalk
3. **Spraaksnelheid Regelaar**:
   - Schuifregelaar van **0.5x tot 1.5x** in stappen van **0.1x**
4. **Lettertype Kiezen (17 Google Fonts)**:
   - *Standaard:* **IBM Plex Sans Condensed**
   - Engineered Compact Sans, Outfit, Plus Jakarta Sans, Inter, Manrope, Noto Sans, Capriola, Michroma, Space Grotesk, Syne, Urbanist, Lekton, Lora, Cormorant Garamond, Source Serif 4, DM Sans
5. **Basis Lettergrootte**:
   - Schuifregelaar om de globale basislettergrootte traploos te vergroten of verkleinen
6. **Thema**:
   - Licht, Donker of Systeemthema
7. **Stemselectie**:
   - Keuze uit beschikbare Nederlandse TTS-stemmen in het besturingssysteem/browser

---

## 📱 Responsief Design & Mobielvriendelijk (Geen Horizontale Scroll)

- **Strict Viewport Containment**:
  - `box-sizing: border-box`, `max-width: 100%`, `min-width: 0` op alle containers
  - Horizontale overloop op mobiele telefoons is structureel opgelost zonder content af te snijden
  - Vloeiende card-weergave op kleine schermen
  - 100% offline & local-first (ook compatibel met direct openen via `file:///index.html`)
