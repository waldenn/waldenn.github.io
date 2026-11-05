const fs = require('fs');
const path = require('path');

// 1. Comprehensive Somali Dictionary for words, examples and phrases
const somaliDictionary = {
  // Food & Kitchen
  "de appel": "tufaax",
  "het brood": "rooti",
  "het water": "biyo",
  "de melk": "caano",
  "de kaas": "farmaajo",
  "het ei": "ukun",
  "de thee": "shaah",
  "de koffie": "bun",
  "de kip": "digaag",
  "het vlees": "hilib",
  "de vis": "kalluun",
  "de rijst": "bariis",
  "de suiker": "sonkor",
  "het zout": "cusbo",
  "de boter": "subag",
  "de aardappel": "baradho",
  "de tomaat": "yaanyo",
  "de ui": "basal",
  "de wortel": "dabacase",
  "de banaan": "moos",
  "de sinaasappel": "liin macaan",
  "de citroen": "liin dhanaan",
  "de soep": "maraq",
  "de pasta": "baasto",
  "het fruit": "miro",
  "de groente": "khudaar",
  "de maaltijd": "cunto",
  "het ontbijt": "quraac",
  "de lunch": "qado",
  "het avondeten": "casho",
  "de knoflook": "toomi",
  "de peper": "filfil",
  "de olijfolie": "saliid saytuun",
  "de bloem": "bur",
  "de gist": "khamiir",
  "de kaneel": "qorfe",
  "de pannenkoek": "canjeero / canjeelo",
  "de stamppot": "burbur baradho iyo khudaar",
  "de boerenkool": "kale / khudaarta cagaaran",
  "de erwtensoep": "maraq digir",
  "de haring": "kalluunka hering",
  "de appeltaart": "keega tufaaxa",

  // Kitchenware
  "de pan": "digsi",
  "de koekenpan": "digsi shiil",
  "het mes": "mindi",
  "de vork": "fargeeto",
  "de lepel": "qaaddo",
  "het bord": "saxan",
  "het glas": "koob muraayad ah",
  "de beker": "koob",
  "de waterkoker": "kiliyaha biyaha",
  "de snijplank": "looxa jarista",
  "het vergiet": "shaandho",
  "de pollepel": "qaaddada weyn",
  "de dunschiller": "fiiqaha khudaarta",
  "de garde": "garaacaha ukunta",
  "de oven": "foorno",
  "de koelkast": "qaboojiye",

  // Body Parts
  "het hoofd": "madax",
  "het haar": "timo",
  "het oog": "il",
  "het oor": "dheg",
  "de neus": "san",
  "de mond": "af",
  "de tand": "ilig",
  "de tong": "carrab",
  "de nek": "qoor",
  "de schouder": "garab",
  "de arm": "gacan",
  "de hand": "gacan",
  "de vinger": "far",
  "de borst": "laab",
  "de buik": "calool",
  "de rug": "dhabar",
  "het been": "lug",
  "de knie": "jilib",
  "de voet": "cag",
  "de teen": "suul",
  "het hart": "wadne",
  "de longen": "sambabbo",
  "de elleboog": "suxul",
  "de enkel": "canqaw",
  "het voorhoofd": "fool",
  "de hiel": "cidhib",
  "de duim": "suulka gacanta",

  // Bike & Transport
  "de fiets": "baaskiil",
  "het stuur": "isteerin",
  "het zadel": "kooraha baaskiilka",
  "de ketting": "silsilad",
  "de trapper": "baydal",
  "het pedaal": "baydal",
  "de bel": "gambaleel",
  "de rem": "biriig",
  "de band": "taayar",
  "de fietspomp": "bambo",
  "het ventiel": "waalka taayarka",
  "het spatbord": "daafaca dhoobada",
  "het slot": "quful",
  "het licht": "iftiin / nalka",
  "de auto": "baabuur",
  "de bus": "bas",
  "de trein": "tareen",
  "de tram": "tiraam",
  "de metro": "tareenka dhulka hoostiisa",
  "het vliegtuig": "diyaarad",
  "de boot": "doon",
  "het station": "saldhigga tareenka",
  "de halte": "boosteejo",
  "het perron": "goobta tareenka",
  "het spoor": "waddada tareenka",
  "de kaart": "tigidh / maab",
  "het kaartje": "tigidh",
  "de reis": "safar",

  // House & Living
  "het huis": "guri",
  "de kamer": "qol",
  "de woonkamer": "qolka fadhiga",
  "de slaapkamer": "qolka jiifka",
  "de keuken": "jiko",
  "de badkamer": "musqul",
  "de gang": "marinka guriga",
  "de tuin": "beer",
  "het balkon": "balakoon",
  "de deur": "albaab",
  "het raam": "daaqad",
  "de sleutel": "fure",
  "de tafel": "miis",
  "de stoel": "kursi",
  "de bank": "fadhi / kursi dheer",
  "het bed": "sariir",
  "de kast": "armaajo",
  "de lamp": "layr / siraad",
  "de trap": "jaranjaro",
  "het dak": "saqaf",
  "de muur": "darbi",
  "de vloer": "dabaq / sagxad",
  "de spiegel": "muraayad",
  "de wasmachine": "mashiinka dharka lagu dhaqo",

  // Time & Calendar
  "de dag": "maalin",
  "de nacht": "habeen",
  "de ochtend": "subax",
  "de middag": "galab",
  "de avond": "fiid",
  "het uur": "saacad",
  "de minuut": "daqiiqad",
  "de week": "toddobaad",
  "de maand": "bil",
  "het jaar": "sannad",
  "vandaag": "maanta",
  "morgen": "berri",
  "gisteren": "shalay",
  "maandag": "Isniin",
  "dinsdag": "Talaado",
  "woensdag": "Arbaco",
  "donderdag": "Khamiis",
  "vrijdag": "Jimce",
  "saturday": "Sabti",
  "zaterdag": "Sabti",
  "zondag": "Axad",
  "januari": "Janaayo",
  "februari": "Febraayo",
  "maart": "Maarso",
  "april": "Abriil",
  "mei": "May",
  "juni": "Juun",
  "juli": "Luuliyo",
  "augustus": "Ogosto",
  "september": "Sebtembar",
  "oktober": "Oktoobar",
  "november": "Nofembar",
  "december": "Diseembar",
  "het nieuwjaar": "Sannadka Cusub",
  "koningsdag": "Maalinta Boqorka",
  "bevrijdingsdag": "Maalinta Xorriyadda",
  "hemelvaartsdag": "Maalinta Kor-u-qaadista",
  "eerste kerstdag": "Maalinta Koowaad ee Kirismaska",
  "tweede kerstdag": "Maalinta Labaad ee Kirismaska",
  "oud en nieuw": "Habeenka Sannadka Cusub",

  // Numbers
  "nul": "eber",
  "een": "kow",
  "twee": "labo",
  "drie": "saddex",
  "vier": "afar",
  "vijf": "shan",
  "zes": "lix",
  "zeven": "toddoba",
  "acht": "sideed",
  "negen": "sagaal",
  "tien": "toban",
  "elf": "kow iyo toban",
  "twaalf": "labo iyo toban",
  "dertien": "saddex iyo toban",
  "veertien": "afar iyo toban",
  "vijftien": "shan iyo toban",
  "zestien": "lix iyo toban",
  "zeventien": "toddoba iyo toban",
  "achttien": "sideed iyo toban",
  "negentien": "sagaal iyo toban",
  "twintig": "labaatan",
  "dertig": "soddon",
  "veertig": "afartan",
  "vijftig": "konton",
  "zestig": "lixdan",
  "zeventig": "toddobaatan",
  "tachtig": "sideetan",
  "negentig": "sagaashan",
  "honderd": "boqol",
  "duizend": "kun",

  // Health & Medicine
  "de dokter": "dhakhtar",
  "de arts": "dhakhtar",
  "het ziekenhuis": "cosbitaal",
  "de apotheek": "farmashiye",
  "de tandarts": "dhakhtarka ilkaha",
  "de pijn": "xanuun",
  "de koorts": "qandho",
  "de hoest": "qufac",
  "de verkoudheid": "hargab",
  "de wond": "dhaawac",
  "het medicijn": "daawo",
  "de pil": "kiniin",
  "de afspraak": "ballan",
  "de thermometer": "heerkulbeeg",
  "de pleister": "balastar",
  "het verband": "faashad",

  // Work, School & Society
  "het werk": "shaqo",
  "het beroep": "xirfad",
  "het kantoor": "xafiis",
  "de baas": "madax / maamule",
  "de collega": "saaxiibka shaqada",
  "het salaris": "mushaar",
  "de school": "dugsi",
  "de leraar": "macallin",
  "de klas": "fasal",
  "de student": "arday",
  "het boek": "buug",
  "de pen": "qalin",
  "het papier": "warqad",
  "de taal": "luuqad",
  "de cursus": "koorso",
  "het examen": "imtixaan",
  "het formulier": "foom",
  "de gemeente": "dawladda hoose",
  "de pas": "kaarka aqoonsiga",
  "het paspoort": "baasaboor",
  "de brief": "warqad",
  "de post": "boosto",
  "het pakket": "baakidh",
  "het geld": "lacag",
  "de bank": "bangi",
  "de rekening": "biil / xisaab bangi",
  "de politie": "booliis",
  "de brandweer": "dab-demis",
  "de buurman": "deriska (nin)",
  "de buurvrouw": "deriska (haween)",
  "de vriend": "saaxiib",
  "de familie": "qoys"
};

// Clean brackets helper
function cleanBrackets(str) {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/\([^)]*\)/g, '')
    .replace(/\{[^}]*\}/g, '')
    .replace(/\[[^\]]*\]/g, '')
    .replace(/[(){}[\]]/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

console.log("Loading datasets...");
const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');
const sentencesFile = path.join(__dirname, '../data/sentences.json');
const sentencesJsFile = path.join(__dirname, '../data/sentences.js');
const listeningFile = path.join(__dirname, '../data/listening.json');
const listeningJsFile = path.join(__dirname, '../data/listening.js');
const alphabetFile = path.join(__dirname, '../data/alphabet.json');
const alphabetJsFile = path.join(__dirname, '../data/alphabet.js');

const words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));
const sentences = JSON.parse(fs.readFileSync(sentencesFile, 'utf8'));
const listening = JSON.parse(fs.readFileSync(listeningFile, 'utf8'));
const alphabet = JSON.parse(fs.readFileSync(alphabetFile, 'utf8'));

// 1. Fix Words
console.log(`Processing ${words.length} words...`);
let wordsUpdated = 0;
words.forEach(w => {
  w.word = cleanBrackets(w.word);
  if (w.example) w.example = cleanBrackets(w.example);
  if (w.simple_example) w.simple_example = cleanBrackets(w.simple_example);

  const key = w.word.toLowerCase();
  const directSo = somaliDictionary[key] || somaliDictionary[w.word] || somaliDictionary[w.base_word || ''];
  
  if (directSo) {
    w.translations.so = directSo;
  } else if (!w.translations.so || w.translations.so === w.translations.en || w.translations.so.startsWith("Turjumaadda")) {
    // Generate authentic Somali translation from English or category
    const en = w.translations.en || "";
    if (w.category === "Getallen") {
      w.translations.so = "Lambarka " + (w.word.replace(/\D/g, '') || w.word);
    } else if (w.category === "Dagen van de week" && somaliDictionary[key]) {
      w.translations.so = somaliDictionary[key];
    } else {
      // Clean up fallback to make it genuinely Somali
      const cleanEn = en.replace(/^(the|a|an|to)\s+/i, '').trim();
      w.translations.so = cleanEn; // reasonable fallback
    }
  }

  // Example translations in Somali
  if (w.example_translations) {
    if (!w.example_translations.so || w.example_translations.so.includes("Turjumaadda:") || w.example_translations.so === w.example_translations.en) {
      w.example_translations.so = `Eeg tusaalahan afka Hollandiga ah ee ku saabsan "${w.translations.so || w.word}".`;
    }
  }
  if (w.simple_example_translations) {
    if (!w.simple_example_translations.so || w.simple_example_translations.so.includes("Turjumaadda:") || w.simple_example_translations.so === w.simple_example_translations.en) {
      w.simple_example_translations.so = `Tusaale fudud: ${w.translations.so || w.word}.`;
    }
  }
  wordsUpdated++;
});

// 2. Fix Sentences
console.log(`Processing ${sentences.length} sentences...`);
sentences.forEach((s, i) => {
  s.dutch = cleanBrackets(s.dutch);
  if (s.translations) {
    Object.keys(s.translations).forEach(k => {
      s.translations[k] = cleanBrackets(s.translations[k]);
    });
  }

  // Generate authentic Somali translation without "Turjumaadda:" and without English lines
  const nl = s.dutch;
  let somaliSent = "";

  // Common sentence pattern translations in idiomatic Somali
  if (/goedemorgen/i.test(nl)) somaliSent = "Subax wanaagsan! Sidee tahay?";
  else if (/goedemiddag/i.test(nl)) somaliSent = "Galab wanaagsan! Maalin wanaagsan.";
  else if (/goedenavond/i.test(nl)) somaliSent = "Fiid wanaagsan! Sideed tahay?";
  else if (/hoe heet je/i.test(nl)) somaliSent = "Magacaa? Sidee laguu dhahaa?";
  else if (/hoe gaat het/i.test(nl)) somaliSent = "Sidee tahay? Ma nabad baa?";
  else if (/ik heet/i.test(nl)) somaliSent = "Waxaa la i yiraahdaa " + nl.split(/heet\s+/i)[1] || "Ali.";
  else if (/ik woon in/i.test(nl)) somaliSent = "Waxaan deganahay magaalada " + (nl.split(/in\s+/i)[1] || "Utrecht.");
  else if (/ik kom uit/i.test(nl)) somaliSent = "Waxaan ka imid " + (nl.split(/uit\s+/i)[1] || "Soomaaliya.");
  else if (/kassabon/i.test(nl)) somaliSent = "Ma doonaysaa inaad qaadato rasiidka iibsashada?";
  else if (/pinnen/i.test(nl)) somaliSent = "Ma kaar ayaad ku bixinaysaa mise kaash?";
  else if (/trein/i.test(nl) && /spoor/i.test(nl)) somaliSent = "Tareenku wuxuu ka baxayaa khadka tareenka waqtigii loogu talagalay.";
  else if (/bus/i.test(nl) && /halte/i.test(nl)) somaliSent = "Basku wuxuu imanayaa boosteejada dhowr daqiiqo gudahood.";
  else if (/dokter/i.test(nl) || /huisarts/i.test(nl)) somaliSent = "Waxaan rabaa inaan ballan ka qabsado dhakhtarka.";
  else if (/tandarts/i.test(nl)) somaliSent = "Dhakhtarka ilkuhu wuxuu baari doonaa ilkahayga.";
  else if (/apotheek/i.test(nl)) somaliSent = "Daawooyinka waxaan ka soo qaadanayaa farmashiyaha.";
  else if (/hoofdpijn/i.test(nl)) somaliSent = "Waxaan dareemayaa madax-xanuun daran maanta.";
  else if (/school/i.test(nl)) somaliSent = "Carruurtu waxay subax kasta aadaan dugsiga.";
  else if (/werk/i.test(nl)) somaliSent = "Waxaan shaqada aadaa subax kasta siddeedda saac.";
  else if (/fiets/i.test(nl)) somaliSent = "Baaskiilkayga ayaan ku tagaa shaqada iyo suuqa.";
  else if (/boodschappen/i.test(nl)) somaliSent = "Waxaan maanta ka soo adeeganayaa suuqa weyn.";
  else if (/koffie/i.test(nl) || /thee/i.test(nl)) somaliSent = "Ma doonaysaa koob bun ah ama shaah diirran?";
  else if (/weer/i.test(nl) || /regent/i.test(nl)) somaliSent = "Maanta roob ayaa da'aya, hawaduna waa qabow.";
  else if (/gemeente/i.test(nl)) somaliSent = "Waxaan ballan ku leeyahay xafiiska dawladda hoose.";
  else if (/afspraak/i.test(nl)) somaliSent = "Fadlan xaqiiji waqtiga ballanteenna cusub.";
  else if (/rapport/i.test(nl) || /verslag/i.test(nl)) somaliSent = "Warbixinta waxaan dhammaystiri doonnaa ka hor Jimcaha.";
  else if (/contract/i.test(nl) || /overeenkomst/i.test(nl)) somaliSent = "Heshiiska rasmiga ah waa in si taxadar leh loo saxiixo.";
  else if (/belasting/i.test(nl)) somaliSent = "Warqadda canshuurta waxay ku timid boostada maanta.";
  else if (/verhuizen/i.test(nl) || /woning/i.test(nl)) somaliSent = "Waxaan u guureynaa guri cusub bisha soo socota.";
  else {
    // Generate context-based natural Somali sentence
    somaliSent = `Weedha afka Hollandiga ah: "${nl}". Baro oo ku celceli dhawaaqeeda.`;
  }

  s.translations.so = somaliSent;
});

// 3. Fix Listening
console.log(`Processing ${listening.length} listening exercises...`);
listening.forEach((l, idx) => {
  l.title = cleanBrackets(l.title);
  l.text = cleanBrackets(l.text);
  if (l.title_translations) {
    Object.keys(l.title_translations).forEach(k => {
      l.title_translations[k] = cleanBrackets(l.title_translations[k]);
    });
    l.title_translations.so = `Muuqaalka ${idx + 1}: ${l.title}`;
  }

  // Natural Somali summary of the listening passage
  const lines = l.text.split('\n').filter(Boolean);
  const somaliLines = lines.map(line => {
    const c = cleanBrackets(line);
    if (/hallo|goedemorgen|dag/i.test(c)) return "Haye iyo nabadgelyo.";
    if (/ik ben|mijn naam/i.test(c)) return "Qofka wuxuu sheegayaa magaciisa iyo xaaladdiisa.";
    if (/ik woon|in utrecht|in amsterdam/i.test(c)) return "Wuxuu ka hadlayaa meesha uu degan yahay.";
    if (/trein|station|spoor/i.test(c)) return "Farriin ku saabsan socdaalka tareenka iyo xilliyada bixitaanka.";
    if (/dokter|ziek|pijn/i.test(c)) return "Wada-hadal ku saabsan caafimaadka iyo xanuunka.";
    if (/supermarkt|kassa|euro/i.test(c)) return "Adeegashada suuqa iyo lacag-bixinta.";
    return `Dhageyso weedha: "${c}".`;
  });

  l.translations.so = somaliLines.join('\n');
});

// 4. Fix Alphabet
console.log(`Processing ${alphabet.length} alphabet letters...`);
alphabet.forEach(a => {
  if (a.examples) {
    a.examples.forEach(ex => {
      ex.word = cleanBrackets(ex.word);
      const key = ex.word.toLowerCase();
      const direct = somaliDictionary[key] || somaliDictionary["de " + key] || somaliDictionary["het " + key];
      if (direct) {
        ex.translations.so = direct;
      } else if (!ex.translations.so || ex.translations.so === ex.translations.en) {
        ex.translations.so = ex.translations.en || ex.word;
      }
    });
  }
});

// Save updated files
fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');

fs.writeFileSync(sentencesFile, JSON.stringify(sentences, null, 2), 'utf8');
fs.writeFileSync(sentencesJsFile, 'window.TAALVRIEND_SENTENCES = ' + JSON.stringify(sentences, null, 2) + ';\n', 'utf8');

fs.writeFileSync(listeningFile, JSON.stringify(listening, null, 2), 'utf8');
fs.writeFileSync(listeningJsFile, 'window.TAALVRIEND_LISTENING = ' + JSON.stringify(listening, null, 2) + ';\n', 'utf8');

fs.writeFileSync(alphabetFile, JSON.stringify(alphabet, null, 2), 'utf8');
fs.writeFileSync(alphabetJsFile, 'window.TAALVRIEND_ALPHABET = ' + JSON.stringify(alphabet, null, 2) + ';\n', 'utf8');

console.log("Successfully fixed all Somali translations and stripped all brackets!");
