const fs = require('fs');
const path = require('path');

// Load existing words to reuse vocabulary & translations & svgs
const wordsDb = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/words.json'), 'utf8'));

// Build word lookup index by lemma/word
const wordIndex = {};
wordsDb.forEach(w => {
  const clean = (w.lemma || w.word.replace(/^(de|het|een)\s+/, '')).toLowerCase();
  if (!wordIndex[clean]) {
    wordIndex[clean] = w;
  }
});

// Helper to make an example word
function makeWord(wordWithArticle, translations, highlight) {
  const parts = wordWithArticle.split(' ');
  const article = parts.length > 1 ? parts[0] : '';
  const lemma = parts.length > 1 ? parts.slice(1).join(' ') : parts[0];
  const existing = wordIndex[lemma.toLowerCase()];
  
  return {
    word: wordWithArticle,
    lemma: lemma,
    article: article,
    highlight: highlight || lemma,
    translations: existing ? existing.translations : translations,
    svg: existing ? existing.svg : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="#3B82F6" opacity="0.15"/><text x="50" y="58" font-size="28" font-weight="bold" fill="#1D4ED8" text-anchor="middle">${highlight || lemma.slice(0, 2)}</text></svg>`
  };
}

const alphabetData = [
  // --- Klinkers & Tweeklanken (Essentieel voor NT2) ---
  {
    id: "klank-aa",
    type: "klinker",
    letter: "AA / aa",
    sound: "aa",
    phonetic: "[aː] - Lange aa",
    tip: "Mond wijd open, ontspannen tong. Klinkt als 'a' in 'vader'.",
    examples: [
      makeWord("de appel", { ar: "تفاحة", ti: "ቱፋሕ", om: "appilii", en: "apple" }, "a"),
      makeWord("de tafel", { ar: "طاولة", ti: "ጣውላ", om: "teessuma/minjaala", en: "table" }, "a"),
      makeWord("het haar", { ar: "شعر", ti: "ጸጉሪ", om: "rifeensa", en: "hair" }, "aa"),
      makeWord("de maan", { ar: "قمر", ti: "ወርሒ", om: "addee", en: "moon" }, "aa"),
      makeWord("de straat", { ar: "شارع", ti: "ጎደና", om: "daandii", en: "street" }, "aa")
    ]
  },
  {
    id: "klank-ee",
    type: "klinker",
    letter: "EE / ee",
    sound: "ee",
    phonetic: "[eː] - Lange ee",
    tip: "Mondhoeken opzij trekken (glimlachen), tong hoog voorin de mond.",
    examples: [
      makeWord("het been", { ar: "ساق", ti: "እግሪ", om: "miilla", en: "leg" }, "ee"),
      makeWord("het brood", { ar: "خبز", ti: "ባኒ", om: "daabboo", en: "bread" }, "ee"), // fallback
      makeWord("de thee", { ar: "شاي", ti: "ሻሂ", om: "shayii", en: "tea" }, "ee"),
      makeWord("de lepel", { ar: "ملعقة", ti: "ማንካ", om: "fal'aana", en: "spoon" }, "e"),
      makeWord("de trein", { ar: "قطار", ti: "ባቡር", om: "baabura", en: "train" }, "e")
    ]
  },
  {
    id: "klank-oo",
    type: "klinker",
    letter: "OO / oo",
    sound: "oo",
    phonetic: "[oː] - Lange oo",
    tip: "Rond je lippen stevig tot een cirkel, achterin de keel klinkend.",
    examples: [
      makeWord("het oog", { ar: "عين", ti: "ዓይኒ", om: "ija", en: "eye" }, "oo"),
      makeWord("de boom", { ar: "شجرة", ti: "ኦም", om: "muka", en: "tree" }, "oo"),
      makeWord("de boot", { ar: "قارب", ti: "ጃልባ", om: "bidiruu", en: "boat" }, "oo"),
      makeWord("de stoel", { ar: "كرسي", ti: "መንበር", om: "barcuma", en: "chair" }, "o"),
      makeWord("het rood", { ar: "أحمر", ti: "ቀይሕ", om: "diimaa", en: "red" }, "oo")
    ]
  },
  {
    id: "klank-uu",
    type: "klinker",
    letter: "UU / uu",
    sound: "uu",
    phonetic: "[y] - Lange uu",
    tip: "Tuit je lippen voor een 'oe', maar probeer een 'ie' te zeggen!",
    examples: [
      makeWord("het vuur", { ar: "نار", ti: "ሓዊ", om: "ibidda", en: "fire" }, "uu"),
      makeWord("de muur", { ar: "جدار", ti: "መንደቕ", om: "dallaya", en: "wall" }, "uu"),
      makeWord("de buur", { ar: "جار", ti: "ጎረቤት", om: "ollaa", en: "neighbor" }, "uu"),
      makeWord("de minuut", { ar: "دقيقة", ti: "ደቒቕ", om: "daqiiqaa", en: "minute" }, "u"),
      makeWord("de jurk", { ar: "فستان", ti: "ክዳን", om: "uffata", en: "dress" }, "u")
    ]
  },
  {
    id: "klank-ie",
    type: "tweeklank",
    letter: "IE / ie",
    sound: "ie",
    phonetic: "[i] - Klinker ie",
    tip: "Lange glimlach, lippen ontspannen plat, tong tegen boventanden.",
    examples: [
      makeWord("de fiets", { ar: "دراجة", ti: "ቢshared/ብስክሌት", om: "biskileetii", en: "bicycle" }, "ie"),
      makeWord("de brief", { ar: "رسالة", ti: "ደብዳበ", om: "xalayaa", en: "letter" }, "ie"),
      makeWord("de spiegel", { ar: "مرآة", ti: "መስትያት", om: "daawwitii", en: "mirror" }, "ie"),
      makeWord("drie", { ar: "ثلاثة", ti: "ሰለስተ", om: "sadii", en: "three" }, "ie"),
      makeWord("vliegen", { ar: "يطير", ti: "ምብራር", om: "barrisuu", en: "to fly" }, "ie")
    ]
  },
  {
    id: "klank-oe",
    type: "tweeklank",
    letter: "OE / oe",
    sound: "oe",
    phonetic: "[u] - Klinker oe",
    tip: "Lippen naar voren steken als een klein rondje. Klinkt als 'oe' in 'koe'.",
    examples: [
      makeWord("de koe", { ar: "بقرة", ti: "ላም", om: "sa'a", en: "cow" }, "oe"),
      makeWord("het boek", { ar: "كتاب", ti: "መጽሓፍ", om: "kitaaba", en: "book" }, "oe"),
      makeWord("de schoen", { ar: "حذاء", ti: "ጫማ", om: "kophee", en: "shoe" }, "oe"),
      makeWord("de soep", { ar: "شوربة", ti: "መረቕ", om: "shoorbaa", en: "soup" }, "oe"),
      makeWord("de stoel", { ar: "كرسي", ti: "መንበር", om: "barcuma", en: "chair" }, "oe")
    ]
  },
  {
    id: "klank-eu",
    type: "tweeklank",
    letter: "EU / eu",
    sound: "eu",
    phonetic: "[øː] - Klinker eu",
    tip: "Ronde lippen, zeg 'ee' terwijl je lippen een 'o' vormen.",
    examples: [
      makeWord("de neus", { ar: "أنف", ti: "ኣፍንጫ", om: "funyaan", en: "nose" }, "eu"),
      makeWord("de deur", { ar: "باب", ti: "ማዕጾ", om: "hulaa", en: "door" }, "eu"),
      makeWord("de keuken", { ar: "مطبخ", ti: "ክሽነ", om: "kushinaa", en: "kitchen" }, "eu"),
      makeWord("kleur", { ar: "لون", ti: "ሕብሪ", om: "bifa", en: "color" }, "eu"),
      makeWord("leuk", { ar: "لطيف / جميل", ti: "ጽቡቕ", om: "mi'aawaa", en: "nice/fun" }, "eu")
    ]
  },
  {
    id: "klank-ui",
    type: "tweeklank",
    letter: "UI / ui",
    sound: "ui",
    phonetic: "[œy] - Typisch Nederlandse tweeklank ui",
    tip: "Begin met ontspannen mond ('uh') en glijd soepel door naar 'ie'.",
    examples: [
      makeWord("het huis", { ar: "بيت", ti: "ገዛ", om: "mana", en: "house" }, "ui"),
      makeWord("de tuin", { ar: "حديقة", ti: "ጀርዲን", om: "iddoo abaaboo", en: "garden" }, "ui"),
      makeWord("de buik", { ar: "بطن", ti: "ከብዲ", om: "garaa", en: "belly" }, "ui"),
      makeWord("de ui", { ar: "بصل", ti: "ሽጉርቲ", om: "qullubbii", en: "onion" }, "ui"),
      makeWord("buiten", { ar: "خارج", ti: "ደገ", om: "ala", en: "outside" }, "ui")
    ]
  },
  {
    id: "klank-ei-ij",
    type: "tweeklank",
    letter: "EI / IJ",
    sound: "ei",
    phonetic: "[ɛi] - Korte ei / Lange ij (klinken hetzelfde!)",
    tip: "Klinken precies hetzelfde in het Nederlands! Begin met 'e' en glijd naar 'ie'.",
    examples: [
      makeWord("het ei", { ar: "بيضة", ti: "እንቋቝሖ", om: "killee", en: "egg" }, "ei"),
      makeWord("de trein", { ar: "قطار", ti: "ባቡር", om: "baabura", en: "train" }, "ei"),
      makeWord("de tijd", { ar: "وقت", ti: "ግዜ", om: "yeroo", en: "time" }, "ij"),
      makeWord("de ijs", { ar: "بوظة / ثلج", ti: "በረድ", om: "cabbii", en: "ice / ice cream" }, "ij"),
      makeWord("blij", { ar: "سعيد", ti: "ሕጉስ", om: "gammadaa", en: "happy" }, "ij")
    ]
  },
  {
    id: "klank-ou-au",
    type: "tweeklank",
    letter: "OU / AU",
    sound: "ou",
    phonetic: "[ɔu] - Klinken hetzelfde!",
    tip: "Begin met 'o' en rond je lippen door naar 'oe'.",
    examples: [
      makeWord("koud", { ar: "بارد", ti: "ዝሑል", om: "qorra", en: "cold" }, "ou"),
      makeWord("de auto", { ar: "سيارة", ti: "መኪና", om: "makiinaa", en: "car" }, "au"),
      makeWord("het zout", { ar: "ملح", ti: "ጨው", om: "soogidda", en: "salt" }, "ou"),
      makeWord("de vrouw", { ar: "امرأة", ti: "ሰበይቲ", om: "dubartii", en: "woman" }, "ou"),
      makeWord("blauw", { ar: "أزرق", ti: "ሰማያዊ", om: "cuquliisa", en: "blue" }, "au")
    ]
  },
  {
    id: "klank-ch-sch",
    type: "combinatie",
    letter: "CH / SCH",
    sound: "ch",
    phonetic: "[x] / [sx] - De zachte/harde keelklank",
    tip: "Schraap zachtjes achter in de keel, zoals bij de 'g'. SCH is 's' + 'ch'.",
    examples: [
      makeWord("de school", { ar: "مدرسة", ti: "ቤት ትምህርቲ", om: "mana barumsaa", en: "school" }, "sch"),
      makeWord("de schoen", { ar: "حذاء", ti: "ጫማ", om: "kophee", en: "shoe" }, "sch"),
      makeWord("het licht", { ar: "ضوء", ti: "ብርሃን", om: "ifa", en: "light" }, "ch"),
      makeWord("de nacht", { ar: "ليل", ti: "ለይቲ", om: "halkan", en: "night" }, "ch"),
      makeWord("schrijven", { ar: "يكتب", ti: "ምጽሓፍ", om: "barreessuu", en: "to write" }, "sch")
    ]
  },
  {
    id: "klank-ng-nk",
    type: "combinatie",
    letter: "NG / NK",
    sound: "eng",
    phonetic: "[ŋ] / [ŋk] - Neusklanken",
    tip: "Achterkant van de tong sluit de keel af, lucht gaat door de neus.",
    examples: [
      makeWord("de ring", { ar: "خاتم", ti: "ቀለቤት", om: "qubeelaa", en: "ring" }, "ng"),
      makeWord("de bank", { ar: "مصرف / مقعد", ti: "ባንክ / መንበር", om: "baankii / teessuma", en: "bank / couch" }, "nk"),
      makeWord("zingen", { ar: "يغني", ti: "ምዝማር", om: "sirbuu", en: "to sing" }, "ng"),
      makeWord("drinken", { ar: "يشرب", ti: "ምስታይ", om: "dhuguu", en: "to drink" }, "nk"),
      makeWord("de jongen", { ar: "ولد", ti: "ወዲ", om: "mucaa", en: "boy" }, "ng")
    ]
  },

  // --- De 26 letters van het Latijnse Alfabet (A t/m Z) ---
  {
    id: "letter-a",
    type: "letter",
    letter: "A / a",
    sound: "aa",
    phonetic: "[aː] of [ɑ]",
    tip: "De eerste letter. Klinkt kort in 'appel' en lang in 'tafel'.",
    examples: [
      makeWord("de appel", { ar: "تفاحة", ti: "ቱፋሕ", om: "appilii", en: "apple" }, "a"),
      makeWord("de auto", { ar: "سيارة", ti: "መኪና", om: "makiinaa", en: "car" }, "a"),
      makeWord("de arm", { ar: "ذراع", ti: "ቅልጽም", om: "irree", en: "arm" }, "a"),
      makeWord("de arts", { ar: "طبيب", ti: "ሓኪም", om: "doktoora", en: "doctor" }, "a")
    ]
  },
  {
    id: "letter-b",
    type: "letter",
    letter: "B / b",
    sound: "bee",
    phonetic: "[b]",
    tip: "Sluit beide lippen en open ze met een plofgeluid.",
    examples: [
      makeWord("het brood", { ar: "خبز", ti: "ባኒ", om: "daabboo", en: "bread" }, "b"),
      makeWord("de bal", { ar: "كرة", ti: "ኩዕሶ", om: "kubbaa", en: "ball" }, "b"),
      makeWord("het boek", { ar: "كتاب", ti: "መጽሓፍ", om: "kitaaba", en: "book" }, "b"),
      makeWord("de baby", { ar: "طفل رضيع", ti: "ሕጻን", om: "da'ima", en: "baby" }, "b")
    ]
  },
  {
    id: "letter-c",
    type: "letter",
    letter: "C / c",
    sound: "see",
    phonetic: "[s] of [k]",
    tip: "Klinkt als 's' voor e/i (cent), en als 'k' voor a/o/u (computer).",
    examples: [
      makeWord("de computer", { ar: "حاسوب", ti: "ኮምፒተር", om: "koompiitara", en: "computer" }, "c"),
      makeWord("het cafe", { ar: "مقهى", ti: "ካፈ", om: "kaaffee", en: "cafe" }, "c"),
      makeWord("de citroen", { ar: "ليمون", ti: "ለሚን", om: "lomiin", en: "lemon" }, "c"),
      makeWord("de cursus", { ar: "دورة تدريبية", ti: "ኮርስ", om: "koorsii", en: "course" }, "c")
    ]
  },
  {
    id: "letter-d",
    type: "letter",
    letter: "D / d",
    sound: "dee",
    phonetic: "[d]",
    tip: "Tongpunt tegen de bovenste tandwal. Aan het einde van een woord klinkt het als 't'!",
    examples: [
      makeWord("de deur", { ar: "باب", ti: "ማዕጾ", om: "hulaa", en: "door" }, "d"),
      makeWord("de dokter", { ar: "طبيب", ti: "ሓኪም", om: "doktoora", en: "doctor" }, "d"),
      makeWord("de dag", { ar: "يوم", ti: "መዓልቲ", om: "guyyaa", en: "day" }, "d"),
      makeWord("het dorp", { ar: "قرية", ti: "ገጠር", om: "baadiyyaa", en: "village" }, "d")
    ]
  },
  {
    id: "letter-e",
    type: "letter",
    letter: "E / e",
    sound: "ee",
    phonetic: "[eː], [ɛ] of [ə]",
    tip: "De meest voorkomende letter in het Nederlands. Kan 'ee', 'e' of 'uh' klinken.",
    examples: [
      makeWord("het ei", { ar: "بيضة", ti: "እንቋቝሖ", om: "killee", en: "egg" }, "e"),
      makeWord("eten", { ar: "يأكل", ti: "ምብላዕ", om: "nyaachuu", en: "to eat" }, "e"),
      makeWord("de emmer", { ar: "دلو", ti: "ሳልዲ", om: "baaldiya", en: "bucket" }, "e"),
      makeWord("de enkel", { ar: "كاحل", ti: "ኩposition/ዓካቶ", om: "kottee", en: "ankle" }, "e")
    ]
  },
  {
    id: "letter-f",
    type: "letter",
    letter: "F / f",
    sound: "ef",
    phonetic: "[f]",
    tip: "Boventanden zachtjes op de onderlip, blaas lucht naar buiten.",
    examples: [
      makeWord("de fiets", { ar: "دراجة", ti: "ብስክሌት", om: "biskileetii", en: "bicycle" }, "f"),
      makeWord("de fles", { ar: "زجاجة", ti: "ጥርሙዝ", om: "qaruuraa", en: "bottle" }, "f"),
      makeWord("de foto", { ar: "صورة", ti: "ስእሊ", om: "suuraa", en: "photo" }, "f"),
      makeWord("het feest", { ar: "حفلة", ti: "በዓል", om: "cidha", en: "party/holiday" }, "f")
    ]
  },
  {
    id: "letter-g",
    type: "letter",
    letter: "G / g",
    sound: "gee",
    phonetic: "[ɣ] of [x]",
    tip: "Beroemde Nederlandse keelklank. Schraap achterin de keel met lucht.",
    examples: [
      makeWord("het glas", { ar: "كوب", ti: "ብርጭቆ", om: "burcuqqoo", en: "glass" }, "g"),
      makeWord("het geld", { ar: "نقود", ti: "ገንዘብ", om: "maallaqa", en: "money" }, "g"),
      makeWord("groen", { ar: "أخضر", ti: "ቀጠልያ", om: "magariisa", en: "green" }, "g"),
      makeWord("goed", { ar: "جيد", ti: "ጽቡቕ", om: "gaarii", en: "good" }, "g")
    ]
  },
  {
    id: "letter-h",
    type: "letter",
    letter: "H / h",
    sound: "haa",
    phonetic: "[h]",
    tip: "Adem krachtig uit vanuit de longen met geopende mond.",
    examples: [
      makeWord("het huis", { ar: "بيت", ti: "ገዛ", om: "mana", en: "house" }, "h"),
      makeWord("de hond", { ar: "كلب", ti: "ከልቢ", om: "saree", en: "dog" }, "h"),
      makeWord("de hand", { ar: "يد", ti: "ኢድ", om: "harka", en: "hand" }, "h"),
      makeWord("het hart", { ar: "قلب", ti: "ልቢ", om: "onnee", en: "heart" }, "h")
    ]
  },
  {
    id: "letter-i",
    type: "letter",
    letter: "I / i",
    sound: "ie",
    phonetic: "[ɪ] of [i]",
    tip: "Kort en krachtig in 'vis', langere klinker in combinatie met 'e' (fiets).",
    examples: [
      makeWord("in", { ar: "في", ti: "ኣብ", om: "keessa", en: "in" }, "i"),
      makeWord("de inburgering", { ar: "الاندماج", ti: "ምውህሃድ", om: "sirna qulqullinaa", en: "integration" }, "i"),
      makeWord("het idee", { ar: "فكرة", ti: "ሓሳብ", om: "yaada", en: "idea" }, "i"),
      makeWord("de injectie", { ar: "حقنة", ti: "መርፍእ", om: "lilmoo", en: "injection" }, "i")
    ]
  },
  {
    id: "letter-j",
    type: "letter",
    letter: "J / j",
    sound: "jee",
    phonetic: "[j]",
    tip: "Klinkt als 'y' in 'yes', glijdt vloeiend over in de volgende klinker.",
    examples: [
      makeWord("de jas", { ar: "معطف", ti: "ኮት", om: "kootii", en: "jacket" }, "j"),
      makeWord("het jaar", { ar: "سنة", ti: "ዓመት", om: "waggaa", en: "year" }, "j"),
      makeWord("de jurk", { ar: "فستان", ti: "ክዳን", om: "uffata", en: "dress" }, "j"),
      makeWord("de jongen", { ar: "ولد", ti: "ወዲ", om: "mucaa", en: "boy" }, "j")
    ]
  },
  {
    id: "letter-k",
    type: "letter",
    letter: "K / k",
    sound: "kaa",
    phonetic: "[k]",
    tip: "Scherpe plofklank achter in het gehemelte.",
    examples: [
      makeWord("de kat", { ar: "قطة", ti: "ድሙ", om: "adurre", en: "cat" }, "k"),
      makeWord("de kaas", { ar: "جبن", ti: "ፎርማጆ", om: "ayiba", en: "cheese" }, "k"),
      makeWord("het kind", { ar: "طفل", ti: "ቆልዓ", om: "da'ima", en: "child" }, "k"),
      makeWord("de kamer", { ar: "غرفة", ti: "ክፍሊ", om: "kutaa", en: "room" }, "k")
    ]
  },
  {
    id: "letter-l",
    type: "letter",
    letter: "L / l",
    sound: "el",
    phonetic: "[l]",
    tip: "Tongpunt plat tegen de bovenste tandrand, stembanden trillen.",
    examples: [
      makeWord("de lepel", { ar: "ملعقة", ti: "ማንካ", om: "fal'aana", en: "spoon" }, "l"),
      makeWord("de lamp", { ar: "مصباح", ti: "ላምባ", om: "ifa", en: "lamp" }, "l"),
      makeWord("de leraar", { ar: "معلم", ti: "መምህር", om: "barsiisaa", en: "teacher" }, "l"),
      makeWord("het land", { ar: "بلد", ti: "ሃገር", om: "biyya", en: "country" }, "l")
    ]
  },
  {
    id: "letter-m",
    type: "letter",
    letter: "M / m",
    sound: "em",
    phonetic: "[m]",
    tip: "Lippen gesloten op elkaar, geluid trilt door de neus.",
    examples: [
      makeWord("de man", { ar: "رجل", ti: "ሰብኣይ", om: "nama/dhiira", en: "man" }, "m"),
      makeWord("de moeder", { ar: "أم", ti: "ኣደ", om: "haadha", en: "mother" }, "m"),
      makeWord("de melk", { ar: "حليب", ti: "ጸባ", om: "aannan", en: "milk" }, "m"),
      makeWord("de mond", { ar: "فم", ti: "ኣፍ", om: "afaan", en: "mouth" }, "m")
    ]
  },
  {
    id: "letter-n",
    type: "letter",
    letter: "N / n",
    sound: "en",
    phonetic: "[n]",
    tip: "Tongpunt tegen de bovenkant van de mond, lucht door de neus.",
    examples: [
      makeWord("de neus", { ar: "أنف", ti: "ኣፍንጫ", om: "funyaan", en: "nose" }, "n"),
      makeWord("de nacht", { ar: "ليل", ti: "ለይቲ", om: "halkan", en: "night" }, "n"),
      makeWord("het nummer", { ar: "رقم", ti: "ቁጽሪ", om: "lakkoofsa", en: "number" }, "n"),
      makeWord("de naam", { ar: "اسم", ti: "ስም", om: "maqaa", en: "name" }, "n")
    ]
  },
  {
    id: "letter-o",
    type: "letter",
    letter: "O / o",
    sound: "oo",
    phonetic: "[oː] of [ɔ]",
    tip: "Kort in 'kop', lang in 'rood'. Lippen rond maken.",
    examples: [
      makeWord("het oog", { ar: "عين", ti: "ዓይኒ", om: "ija", en: "eye" }, "o"),
      makeWord("het oor", { ar: "أذن", ti: "እዝኒ", om: "gurra", en: "ear" }, "o"),
      makeWord("de oma", { ar: "جدة", ti: "ዓባይ", om: "akkoo", en: "grandmother" }, "o"),
      makeWord("de opa", { ar: "جد", ti: "ኣያ", om: "akaakayyuu", en: "grandfather" }, "o")
    ]
  },
  {
    id: "letter-p",
    type: "letter",
    letter: "P / p",
    sound: "pee",
    phonetic: "[p]",
    tip: "Korte plofklank met beide lippen zonder stemgeluid.",
    examples: [
      makeWord("de pan", { ar: "مقلاة", ti: "ድስቲ", om: "distii", en: "pan" }, "p"),
      makeWord("het paspoort", { ar: "جواز سفر", ti: "ፓስፖርት", om: "paaspoortii", en: "passport" }, "p"),
      makeWord("de pen", { ar: "قلم", ti: "ብርዒ", om: "qalama", en: "pen" }, "p"),
      makeWord("de politie", { ar: "شرطة", ti: "ፖሊስ", om: "poolisii", en: "police" }, "p")
    ]
  },
  {
    id: "letter-q",
    type: "letter",
    letter: "Q / q",
    sound: "kuu",
    phonetic: "[k]",
    tip: "Komt bijna altijd samen met 'u' voor (klinkt als 'kw').",
    examples: [
      makeWord("de quiz", { ar: "مسابقة", ti: "ፈተና / ሕቶታት", om: "gaaffii fi deebii", en: "quiz" }, "q"),
      makeWord("de qua", { ar: "بخصوص", ti: "ብዛዕባ", om: "waa'ee", en: "as for" }, "q"),
      makeWord("het quotient", { ar: "حاصل القسمة", ti: "ውጽኢት", om: "bu'aa", en: "quotient" }, "q"),
      makeWord("de etiquette", { ar: "آداب السلوك", ti: "ስነ-ስርዓት", om: "naamusaa", en: "etiquette" }, "q")
    ]
  },
  {
    id: "letter-r",
    type: "letter",
    letter: "R / r",
    sound: "er",
    phonetic: "[r] of [ʁ]",
    tip: "Huig-r achter in de keel of rollende r met de tongpunt.",
    examples: [
      makeWord("de regen", { ar: "مطر", ti: "ዝናብ", om: "bokkaa", en: "rain" }, "r"),
      makeWord("het raam", { ar: "نافذة", ti: "መስኮት", om: "foddaa", en: "window" }, "r"),
      makeWord("rood", { ar: "أحمر", ti: "ቀይሕ", om: "diimaa", en: "red" }, "r"),
      makeWord("de ring", { ar: "خاتم", ti: "ቀለቤት", om: "qubeelaa", en: "ring" }, "r")
    ]
  },
  {
    id: "letter-s",
    type: "letter",
    letter: "S / s",
    sound: "es",
    phonetic: "[s]",
    tip: "Sissend geluid tussen tongpunt en boventanden.",
    examples: [
      makeWord("de soep", { ar: "شوربة", ti: "መረቕ", om: "shorbaa", en: "soup" }, "s"),
      makeWord("de sleutel", { ar: "مفتاح", ti: "መፍትሕ", om: "furtuu", en: "key" }, "s"),
      makeWord("de stoel", { ar: "كرسي", ti: "መንበር", om: "barcuma", en: "chair" }, "s"),
      makeWord("de stad", { ar: "مدينة", ti: "ከተማ", om: "magaalaa", en: "city" }, "s")
    ]
  },
  {
    id: "letter-t",
    type: "letter",
    letter: "T / t",
    sound: "tee",
    phonetic: "[t]",
    tip: "Tongpunt krachtig tegen de voortanden.",
    examples: [
      makeWord("de tafel", { ar: "طاولة", ti: "ጣውላ", om: "minjaala", en: "table" }, "t"),
      makeWord("de thee", { ar: "شاي", ti: "ሻሂ", om: "shayii", en: "tea" }, "t"),
      makeWord("de tand", { ar: "سن", ti: "ስኒ", om: "ilkaan", en: "tooth" }, "t"),
      makeWord("de trein", { ar: "قطار", ti: "ባቡር", om: "baabura", en: "train" }, "t")
    ]
  },
  {
    id: "letter-u",
    type: "letter",
    letter: "U / u",
    sound: "uu",
    phonetic: "[y] of [ʏ]",
    tip: "Kort in 'bus', lang in 'uur'. Rond je lippen strak.",
    examples: [
      makeWord("de bus", { ar: "حافلة", ti: "ኣውቶቡስ", om: "baasii", en: "bus" }, "u"),
      makeWord("het uur", { ar: "ساعة", ti: "ሰዓት", om: "sa'aatii", en: "hour" }, "u"),
      makeWord("de ui", { ar: "بصل", ti: "ሽጉርቲ", om: "qullubbii", en: "onion" }, "u"),
      makeWord("de uitgang", { ar: "مخرج", ti: "መውጺኢ", om: "ba'umsa", en: "exit" }, "u")
    ]
  },
  {
    id: "letter-v",
    type: "letter",
    letter: "V / v",
    sound: "vee",
    phonetic: "[v]",
    tip: "Klinkt zacht, trillend tussen boventanden en onderlip (tussen F en W).",
    examples: [
      makeWord("de vork", { ar: "شوكة", ti: "ፋርከታ", om: "shukkaa", en: "fork" }, "v"),
      makeWord("de vis", { ar: "سمك", ti: "ዓሳ", om: "qurxummii", en: "fish" }, "v"),
      makeWord("de vader", { ar: "أب", ti: "ኣቦ", om: "abbaa", en: "father" }, "v"),
      makeWord("de vriend", { ar: "صديق", ti: "ዓርኪ", om: "hiriyaa", en: "friend" }, "v")
    ]
  },
  {
    id: "letter-w",
    type: "letter",
    letter: "W / w",
    sound: "wee",
    phonetic: "[ʋ]",
    tip: "Typisch Nederlands: onderlip raakt boventanden heel lichtjes aan.",
    examples: [
      makeWord("het water", { ar: "ماء", ti: "ማይ", om: "bishaan", en: "water" }, "w"),
      makeWord("het werk", { ar: "عمل", ti: "ስራሕ", om: "hojii", en: "work" }, "w"),
      makeWord("de weg", { ar: "طريق", ti: "መንገዲ", om: "karaa", en: "road" }, "w"),
      makeWord("de winter", { ar: "شتاء", ti: "ክረምቲ", om: "ganna", en: "winter" }, "w")
    ]
  },
  {
    id: "letter-x",
    type: "letter",
    letter: "X / x",
    sound: "iks",
    phonetic: "[ks]",
    tip: "Combinatie van 'k' en 's'.",
    examples: [
      makeWord("de taxi", { ar: "تاكسي", ti: "ታክሲ", om: "taaksii", en: "taxi" }, "x"),
      makeWord("de xylofoon", { ar: "إكسيليفون", ti: "ሳይሎፎን", om: "zaayilofoonii", en: "xylophone" }, "x"),
      makeWord("het examen", { ar: "امتحان", ti: "ፈተና", om: "qormaata", en: "exam" }, "x"),
      makeWord("de box", { ar: "صندوق", ti: "ሳጹን", om: "saanduqa", en: "box" }, "x")
    ]
  },
  {
    id: "letter-y",
    type: "letter",
    letter: "Y / y",
    sound: "Griekse ij",
    phonetic: "[i] of [j]",
    tip: "Vaak 'Griekse ij' genoemd. Klinkt als 'ie' (baby) of 'j' (yoghurt).",
    examples: [
      makeWord("de yoghurt", { ar: "زبادي", ti: "ዮጉርት", om: "itittu", en: "yogurt" }, "y"),
      makeWord("de baby", { ar: "طفل رضيع", ti: "ሕጻን", om: "da'ima", en: "baby" }, "y"),
      makeWord("de hobby", { ar: "هواية", ti: "ትርፊ ግዜ ስራሕ", om: "fedhii", en: "hobby" }, "y"),
      makeWord("de gymnastiek", { ar: "جمباز", ti: "ጅምናስቲክ", om: "jimnaastikii", en: "gymnastics" }, "y")
    ]
  },
  {
    id: "letter-z",
    type: "letter",
    letter: "Z / z",
    sound: "zet",
    phonetic: "[z]",
    tip: "Trillende 's' met stembanden, zoals het zoemen van een bij.",
    examples: [
      makeWord("de zon", { ar: "شمس", ti: "ጸሓይ", om: "biiftuu", en: "sun" }, "z"),
      makeWord("de zee", { ar: "بحر", ti: "ባሕሪ", om: "galaana", en: "sea" }, "z"),
      makeWord("het zout", { ar: "ملح", ti: "ጨው", om: "soogidda", en: "salt" }, "z"),
      makeWord("het ziekenhuis", { ar: "مستشفى", ti: "ሆስፒታል", om: "hospitaala", en: "hospital" }, "z")
    ]
  }
];

fs.writeFileSync(path.join(__dirname, '../data/alphabet.json'), JSON.stringify(alphabetData, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/alphabet.js'), `window.TAALVRIEND_ALPHABET = ${JSON.stringify(alphabetData, null, 2)};\n`);

console.log(`Successfully generated Alphabet data with ${alphabetData.length} letters & sounds!`);
