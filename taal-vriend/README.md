# TaalVriend 🇳🇱

Een 100% offline, local-first Nederlandse taal app speciaal ontworpen voor vluchtelingen en nieuwkomers om speels en effectief Nederlandse woorden, klokkijken, zinnen, het alfabet en luistervaardigheid te leren.

---

## 📱 Vijf Geïntegreerde Applicaties (App-Switcher & Deep Links)

Via de **App-Switcher** knop in de menubalk (of direct via de URL-parameter `?app=...`) wissel je met één klik tussen 5 krachtige leermodi:

- `?app=woorden` ➔ **Woorden Leren**
- `?app=klok` ➔ **Klok Kijken**
- `?app=zinnen` ➔ **Zinnen Oefenen**
- `?app=alphabet` (of `?app=alfabet`) ➔ **Alfabet & Klanken**
- `?app=luisteren` ➔ **Luistervaardigheid**

De actieve app wordt automatisch in de adresbalk bijgehouden via `history.replaceState`.

---

### 1. 📖 Woorden Leren (1.450+ Woorden)
- **Kolommen-weergave**:
  - **Beeld**: Scalable vector illustratie (SVG)
  - **Nederlands Woord**: Extra breed en prominent weergegeven, compleet met lidwoord-badge (`de` / `het`)
  - **Moedertaal Vertaling**: Arabisch (met automatische RTL), Tigrinya (Ge'ez), Oromo of Engels
  - **Voorbeeldzin**: **Klikbaar!** Klik direct op de voorbeeldzin om deze te laten uitspreken
- **Nieuwe Gespecialiseerde Categorieën**:
  - 🚲 **Fietsonderdelen** (stuur, zadel, ketting, trapper, ventiel, remmen, spatbord, fietspomp, etc.)
  - 🍳 **Keukengerei** (braadpan, pollepel, vergiet, dunschiller, garde, snijplank, etc.)
  - 🧂 **Standaard ingrediënten** (olijfolie, knoflook, zwarte peper, bloem, suiker, gist, kaneel, etc.)
  - 🍲 **Bekende maaltijden** (stamppot, boerenkool, erwtensoep, pannenkoek, haring, appeltaart, etc.)
  - 🫀 **Lichaamsdelen** (knie, elleboog, enkel, schouder, voorhoofd, hiel, duim, etc.)
  - 📅 **Dagen van de week**, 📆 **Maanden van het jaar**, 🎆 **Officiële feestdagen**
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt het actieve woord uit via de Nederlandse spraakstem
  - `↓` / `↑`: Naar de volgende of vorige regel

---

### 2. ⏰ Klok Kijken (144 Tijden in 5-Minuten Intervallen)
- **144 Kloksituaties** (alle 12 uren in intervallen van 5 minuten):
  - Analoge klok SVG met exacte stand van de uur- en minutenwijzers
  - Digitale tijdbadge (bijv. `03:25`)
  - Nederlandse tijdsuitdrukking in grote letters (bijv. `vijf voor half vier`, `tien over half een`)
  - Volledige zin: *"Het is nu vijf voor half vier."*
  - Moedertaalvertaling in Arabisch, Tigrinya, Oromo en Engels
  - 5-minuten snelkeuzeknoppen (`:00`, `:05`, `:10`, ..., `:55`) en filter per uur
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt de klokzin uit
  - `←` / `→` of `↑` / `↓`: Naar de vorige of volgende kloksituatie
  - Willekeurige tijd knop (`🎲`)

---

### 3. 💬 Zinnen Oefenen (470+ Zinnen)
- **470 Praktische Zinnen** verdeeld over 3 moeilijkheidsgraden:
  - 🟢 **Basis (A1)**: 160 zinnen (Begroetingen, boodschappen, dagelijks leven, eenvoudige vragen)
  - 🔵 **Gevorderd (A2-B1)**: 160 zinnen (Huisarts, school van kinderen, gemeente, OV, werk en wonen)
  - 🟣 **Moeilijk (B1-B2)**: 150 zinnen (Officiële brieven, IND, Belastingdienst, huurcontracten, bestuursrecht)
- **Grote leesbare tekst** met audio-uitspraak en moedertaalvertaling.
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt de getoonde zin uit
  - `←` / `→` of `↑` / `↓`: Bladeren door zinnen in het gekozen niveau
  - Willekeurige zin knop (`🎲`)

---

### 4. 🔤 Alfabet & Klanken (38 Klanken & Letters)
- **Klankuitspraak & Fonetiek**:
  - Alle 26 letters van het Latijnse alfabet (A t/m Z)
  - Specifieke Nederlandse klinkers en tweeklanken: **AA, EE, OO, UU, OE, IE, EU, UI, EI/IJ, OU/AU, CH/SCH, NG/NK**
  - Fonetische weergave (bijv. `[œy]`) en praktische beginnerstips voor de mondstand
- **Interactieve Voorbeeldwoorden**:
  - Toont 4 tot 6 voorbeeldwoorden waarin de letter/klank voorkomt
  - De letter/klank wordt in het woord visueel geaccentueerd
  - **Moedertaalvertaling naast elk woord** in de actieve taal van de gebruiker (Arabisch, Tigrinya, Oromo, Engels)
  - **Klik op een willekeurig woord** om direct de Nederlandse uitspraak van dat woord te horen!
- **Navigatie & Audio**:
  - `SPATIE`: Spreekt de actieve letterklank uit
  - `←` / `→` of `↑` / `↓`: Naar de vorige of volgende letter
  - Horizontale snelkeuze strip voor alle letters

---

### 5. 🎧 Luistervaardigheid (119 Luisterteksten)
- **Interactieve Dictee & Luisterbegrip**:
  - De gebruiker hoort een audiofragment (maximaal 5 regels) uitgesproken worden
  - **De tekst is aanvankelijk verborgen / afgeschermd**: De gebruiker traint eerst het gehoor zonder mee te lezen
  - Druk op de **`SPATIE-toets`** (of klik op de knop) om zowel de **volledige Nederlandse tekst** als de **moedertaalvertaling** direct in beeld te onthullen
  - Druk nogmaals op `SPATIE` om het audiofragment te herhalen
- **3 Niveaus**:
  - 🟢 **A1 (Basis)**: Korte alledaagse situaties (bij de bakker, supermarkt, halte, buren)
  - 🔵 **A2-B1 (Gevorderd)**: Omroepberichten op stations, telefonische afspraken, ziekte melden, oudergesprekken
  - 🟣 **B1-B2 (Moeilijk)**: Belastingbrieven, werkoverleg, reorganisatie, KNM-examen, gemeentelijke aanslagen
- Geanimeerde geluidsgolven tijdens het afspelen van de audio

---

## ⌨️ Toetsenbordbediening (Globaal)

| Toets | Actie |
| :--- | :--- |
| **`SPATIE`** | Laat horen / spreekt uit / onthult luistertekst & vertaling |
| **`↓` of `→`** | Volgende woord / situatie / zin / letter / luisteroefening |
| **`↑` of `←`** | Vorige woord / situatie / zin / letter / luisteroefening |
| **`F`** | Volledig scherm in- of uitschakelen |
| **`M`** | Configuratiemenu openen (stem, snelheid, moedertaal, thema) |
| **`ESC`** | Modals en pop-ups sluiten |

---

## 🌍 Offline & Local-First Architectuur

- **Geen Python of server vereist**: Open [`index.html`](file:///Users/a/dev/taal-vriend/index.html) direct in elke moderne webbrowser (`file:///`).
- **Dubbele Databestanden**: Elk dataset is dubbel opgeslagen als `.json` en als `.js` (`window.TAALVRIEND_*`) zodat het 100% lokaal functioneert zonder CORS-blokkades.
- **Service Worker (`sw.js`)**: Volledige offline PWA-functionaliteit met cache pre-loading.
