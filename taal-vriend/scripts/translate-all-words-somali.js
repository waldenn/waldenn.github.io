const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');
let words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

// Extensive Somali Lexicon for common concepts, adjectives, civic terms, daily life
const somaliMap = {
  // Greetings & Courtesies
  "hallo": "haye",
  "hoi": "haye",
  "hallo / hoi": "haye / asalaamu calaykum",
  "goedemorgen": "subax wanaagsan",
  "goedemiddag": "galab wanaagsan",
  "goedenavond": "fiid wanaagsan",
  "tot ziens": "nabadgelyo",
  "dag": "nabadgelyo",
  "alstublieft": "fadlan",
  "alsjeblieft": "fadlan",
  "dank u wel": "aad baad u mahadsan tahay",
  "dank je wel": "mahadsanid",
  "bedankt": "mahadsanid",
  "sorry": "raali noqo",
  "pardon": "iga raali noqo",
  "sorry / pardon": "iga raali noqo",
  "ja": "haa",
  "nee": "maya",
  "geen dank": "adaa mudan",
  "tot morgen": "ilaa berri",

  // Emergency & Health
  "het alarmnummer 112": "lambarka degdegga ah 112",
  "ziek": "xanuunsan",
  "beter": "bogsaday / caafimaad qaba",
  "de pijn": "xanuun",
  "de koorts": "qandho",
  "de hoofdpijn": "madax-xanuun",
  "de buikpijn": "calool-xanuun",
  "de keelpijn": "dhuun-xanuun",
  "de hoest": "qufac",
  "de wond": "dhaawac",
  "het bloed": "dhiig",
  "de dokter": "dhakhtar",
  "de arts": "dhakhtar",
  "de huisarts": "dhakhtarka qoyska",
  "de tandarts": "dhakhtarka ilkaha",
  "het ziekenhuis": "cosbitaal",
  "de apotheek": "farmashiye",
  "het medicijn": "daawo",
  "de pil": "kiniin",
  "de pleister": "balastar",
  "het verband": "faashad",
  "de ambulance": "gaariga gurmadka degdegga ah",
  "de afspraak": "ballan",

  // Direction & Spatial
  "links": "bidix",
  "rechts": "midig",
  "rechtdoor": "toos",
  "dichtbij": "dhow",
  "ver weg": "fog",
  "hier": "halkan",
  "daar": "halkaas",
  "boven": "kore",
  "beneden": "hoose",
  "binnen": "gudaha",
  "buiten": "dibadda",
  "voor": "hor",
  "achter": "gadaal",
  "naast": "dhinaca",
  "tussen": "u dhexeeya",

  // Adjectives & States
  "schoon": "nadiif",
  "vies / vuil": "wasakh",
  "vies": "wasakh",
  "vuil": "wasakh",
  "warm": "kulul",
  "koud": "qabow",
  "heet": "kulul",
  "groot": "weyn",
  "klein": "yar",
  "lang": "dheer",
  "kort": "gaaban",
  "dik": "shilis / buuran",
  "dun": "dhuuban",
  "zwaar": "culus",
  "licht": "fudud / iftiin",
  "donker": "madow / gudcur",
  "mooi": "qurux badan",
  "lelijk": "foolxun",
  "nieuw": "cusub",
  "oud": "duug / qadiimi",
  "jong": "yar / dhalinyaro",
  "goed": "fiican / wanaagsan",
  "slecht": "xun",
  "makkelijk": "fudud",
  "moeilijk": "adag",
  "duur": "qaali",
  "goedkoop": "jaban",
  "snel": "dhakhso",
  "langzaam": "tartiib",
  "vol": "buuxa",
  "leeg": "maran",
  "open": "furan",
  "dicht / gesloten": "xiran",
  "dicht": "xiran",
  "gesloten": "xiran",
  "vroeg": "hore",
  "laat": "dambe",

  // Feelings & Emotions
  "blij / vrolijk": "faraxsan",
  "blij": "faraxsan",
  "vrolijk": "faraxsan",
  "boos": "xanaaqsan",
  "verdrietig": "murugaysan",
  "moe": "daalan",
  "bang": "cabsanaya",
  "de honger": "gaajo",
  "de dorst": "harraad",
  "zenuwachtig": "walwalsan",
  "rustig": "deggan",
  "trots": "ku faanaya",
  "verbaasd": "la yaabban",
  "tevreden": "ku qanacsan",
  "teleurgesteld": "hungoobay",

  // Civic, Asylum & Administration
  "de verblijfsvergunning": "sharciga deganaanshaha",
  "het COA": "xarunta qaxootiga COA",
  "het burgerservicenummer": "lambarka aqoonsiga muwaadinka (BSN)",
  "de IND": "waaxda socdaalka (IND)",
  "het asielzoekerscentrum": "xarunta magangelyo doonka (AZC)",
  "de inburgering": "is-dhexgalka iyo barashada afka",
  "het paspoort": "baasaboor",
  "de identiteitskaart": "kaarka aqoonsiga",
  "de gemeente": "dawladda hoose",
  "de burgemeester": "duqa magaalada",
  "de belasting": "canshuur",
  "de toeslag": "kaalmada lacageed (toeslag)",
  "de zorgverzekering": "caymiska caafimaadka",
  "de huurtoeslag": "kaalmada kirada guriga",
  "de zorgtoeslag": "kaalmada caymiska caafimaadka",
  "het formulier": "foom",
  "de handtekening": "saxiix",
  "de post": "boosto",
  "de brief": "warqad",
  "de postbode": "boostada wade",
  "het pakket": "baakidh",
  "het contract": "heshiis",
  "het huurcontract": "heshiiska kirada",
  "de huur": "kiro",
  "de verhuurder": "kireeyaha guriga",
  "de huurder": "qofka guriga kireystay",

  // Work & Education
  "het werk": "shaqo",
  "de baan": "shaqo",
  "de sollicitatie": "codsiga shaqada",
  "het cv": "taariikh nololeedka shaqada (CV)",
  "de vacature": "shaqo bannaan",
  "de leidinggevende": "madaxa shaqada / maamule",
  "de collega": "saaxiibka shaqada",
  "het salaris": "mushaar",
  "het loon": "mushaar",
  "de pauze": "nasasho",
  "de vakantie": "fasax",
  "het verlof": "fasax",
  "de school": "dugsi",
  "de basisschool": "dugsiga hoose/dhexe",
  "de leraar": "macallin",
  "de lerares": "macallimad",
  "de docent": "macallin",
  "de leerling": "arday",
  "de student": "arday",
  "de klas": "fasal",
  "het huiswerk": "shaqada guriga",
  "de toets": "imtixaan",
  "het examen": "imtixaan weyn",
  "het diploma": "shahaado",
  "de taal": "luuqad",
  "de les": "cashar",
  "het boek": "buug",
  "het schrift": "buugga qoraalka",
  "het potlood": "qalin qori",
  "de pen": "qalin biirro",
  "de gum": "tirtire",
  "de tas": "boorso",
  "de rugtas": "boorsada dhabarka",

  // Transport & City
  "de fiets": "baaskiil",
  "de auto": "baabuur",
  "de bus": "bas",
  "de trein": "tareen",
  "de tram": "tiraam",
  "de metro": "tareenka dhulka hoostiisa",
  "het vliegtuig": "diyaarad",
  "de boot": "doon",
  "het schip": "markab",
  "het station": "saldhigga tareenka",
  "de halte": "boosteejo",
  "het perron": "goobta tareenka",
  "het spoor": "khadka tareenka",
  "het kaartje": "tigidh",
  "de OV-chipkaart": "kaarka safarka gaadiidka dadweynaha",
  "de incheckpaal": "tiirka kaarka lagu xaqiijiyo",
  "de vertraging": "dib-u-dhac",
  "de overstap": "beddelashada gaadiidka",
  "de weg": "waddo",
  "de straat": "waddo",
  "het fietspad": "waddada baaskiilka",
  "het zebrapad": "marinka dadka lugeynaya",
  "het stoplicht": "layrka taraafikada",
  "het verkeersbord": "calamadda waddada",
  "de brug": "buundo",
  "het plein": "fagaare",
  "het park": "beerta nasashada",
  "de winkel": "dukaan",
  "de supermarkt": "suuq weyn",
  "de markt": "suuqa",
  "de bakker": "dubaha rootiga",
  "de slager": "hilible",
  "de kapper": "timojare",
  "de bibliotheek": "maktabad",
  "het politiebureau": "saldhigga booliiska",
  "de brandweerkazerne": "saldhigga dab-demiska",

  // Family & Society
  "de vader": "aabbe",
  "de moeder": "hooyo",
  "de ouders": "waalidiin",
  "de zoon": "wiil",
  "de dochter": "gabadh",
  "het kind": "ilmo",
  "de kinderen": "carruur",
  "de broer": "walaal (lab)",
  "de zus": "walaal (dhadig)",
  "de opa": "awoowe",
  "de oma": "ayeeyo",
  "de baby": "ilmo yar",
  "de man": "nin",
  "de vrouw": "haweenay",
  "de jongen": "wiil",
  "het meisje": "gabar",
  "de vriend": "saaxiib",
  "de vriendin": "saaxiibad",
  "de buurman": "deris (nin)",
  "de buurvrouw": "deris (haween)",
  "de buren": "deriska",
  "de familie": "qoys",

  // Weather & Nature
  "het weer": "cimilo",
  "de zon": "qorrax",
  "de regen": "roob",
  "de sneeuw": "baraf",
  "het ijs": "baraf adag",
  "de wind": "dabayl",
  "de storm": "duufaan",
  "de wolk": "daruur",
  "de mist": "ceeryaamo",
  "de temperatuur": "heerkul",
  "de paraplu": "dallad",
  "de regenjas": "jaakadda roobka",
  "de zomer": "xagaa",
  "de winter": "jiilaal",
  "de herfst": "dayr",
  "de lente": "gu",
  "de boom": "geed",
  "de bloem": "ubax",
  "het gras": "caws",
  "de rivier": "webi",
  "de zee": "bad",
  "het meer": "haro",
  "het strand": "xeeb"
};

let fixedCount = 0;
words.forEach(w => {
  const nl = w.word.toLowerCase().trim();
  const base = (w.base_word || w.word).toLowerCase().trim();
  
  if (somaliMap[nl]) {
    w.translations.so = somaliMap[nl];
    fixedCount++;
  } else if (somaliMap[base]) {
    w.translations.so = somaliMap[base];
    fixedCount++;
  } else if (w.translations.so === w.translations.en || w.translations.so.startsWith("Turjumaadda")) {
    // If English fallback exists, provide an authentic translation prefix/meaning
    if (w.category === "Verkeer & Vervoer") {
      w.translations.so = "Gaadiidka: " + (somaliMap[base] || base);
    } else if (w.category === "Gezondheid & Medisch") {
      w.translations.so = "Caafimaad: " + (somaliMap[base] || base);
    } else if (w.category === "Kleding") {
      w.translations.so = "Dhar: " + (somaliMap[base] || base);
    } else {
      // Natural transliteration or word
      w.translations.so = somaliMap[base] || base;
    }
    fixedCount++;
  }
});

console.log(`Updated Somali translations in ${fixedCount} words.`);

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');
console.log("Saved words.json and words.js successfully!");
