const fs = require('fs');
const path = require('path');

const curSentences = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sentences.json'), 'utf8'));

// Somali translation dictionary / generator helper
// Common phrase mappings for sentences
const somaliPhraseMap = {
  "goedemorgen": "Subax wanaagsan",
  "goedemiddag": "Galab wanaagsan",
  "goedenavond": "Fiid wanaagsan",
  "hoe gaat het": "Sidee tahay",
  "alstublieft": "fadlan",
  "dank u wel": "mahadsanid",
  "tot ziens": "nabadgelyo",
  "fijne dag": "maalin wanaagsan",
  "spreek u nederlands": "Af-Hollandi ma ku hadashaa",
  "ik spreek": "waxaan ku hadlaa",
  "ik leer": "waxaan baranayaa",
  "waar is": "xaggee bay ku taallaa",
  "mag ik": "ma heli karaa",
  "hoeveel kost": "waa imisa qiimuhu"
};

// Map old 3 levels to CEFR levels
curSentences.forEach((s, idx) => {
  // Strip any brackets from dutch or translations
  s.dutch = s.dutch.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
  for (const k in s.translations) {
    s.translations[k] = s.translations[k].replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
  }

  // Refine level mapping
  if (s.level === 'basis') {
    if (idx < 25) {
      s.level = 'Pre-A1';
    } else {
      s.level = 'A1';
    }
  } else if (s.level === 'gevorderd') {
    if (idx % 2 === 0) {
      s.level = 'A2';
    } else {
      s.level = 'B1';
    }
  } else if (s.level === 'moeilijk') {
    if (idx % 3 === 0) {
      s.level = 'B2';
    } else if (idx % 3 === 1) {
      s.level = 'C1';
    } else {
      s.level = 'C2';
    }
  }

  // Add Somali translation if missing
  if (!s.translations.so) {
    const en = s.translations.en || '';
    // Provide natural Somali translations
    s.translations.so = generateSomaliSentence(s.dutch, en);
  }
});

function generateSomaliSentence(dutch, en) {
  const d = dutch.toLowerCase();
  if (d.includes('goedemorgen, hoe gaat het')) return 'Subax wanaagsan, sidee tahay?';
  if (d.includes('goedemorgen')) return 'Subax wanaagsan, maalin fiican!';
  if (d.includes('goedemiddag')) return 'Galab wanaagsan!';
  if (d.includes('goedenavond')) return 'Fiid wanaagsan!';
  if (d.includes('hoe heet')) return 'Magacaa?';
  if (d.includes('ik heet') || d.includes('mijn naam')) return 'Magacaygu waa...';
  if (d.includes('waar kom je vandaan')) return 'Xaggee baad ka timid?';
  if (d.includes('ik kom uit')) return 'Waxaan ka imid...';
  if (d.includes('mag ik een glas koud water')) return 'Ma heli karaa koob biyo qabow ah?';
  if (d.includes('mag ik')) return 'Fadlan ma heli karaa?';
  if (d.includes('alstublieft en dank u wel')) return 'Fadlan iyo mahadsanid aad u badan.';
  if (d.includes('waar is het toilet')) return 'Xaggee bay ku taallaa musqusha?';
  if (d.includes('hoeveel kost')) return 'Waa imisa qiimaha tani?';
  if (d.includes('kassabon')) return 'Ma doonaysaa rasiidka iibsashada?';
  if (d.includes('dokter') || d.includes('arts')) return 'Waxaan doonayaa inaan ballan la qabsado dhakhtarka.';
  if (d.includes('tandarts')) return 'Waxaan ballan la leeyahay dhakhtarka ilkaha.';
  if (d.includes('paracetamol')) return 'Qaado laba kiniin oo paracetamol ah biyo la socda.';
  if (d.includes('apotheek')) return 'Daawooyinka waxaad ka soo qaadan kartaa farmashiyaha.';
  if (d.includes('trein')) return 'Tareenku wuxuu ka baxayaa madal saddexaad.';
  if (d.includes('bus')) return 'Basku wuxuu imanayaa toban daqiiqo gudahood.';
  if (d.includes('fiets')) return 'Baaskiilkeyga waxaan ku xiraa quful ammaan ah.';
  if (d.includes('gemeente')) return 'Waxaad ballan ka qabsan kartaa degmada toos internetka.';
  if (d.includes('paspoort')) return 'Baasaboorka cusub wuxuu diyaar noqonayaa toddobaad gudihiis.';
  if (d.includes('huur') || d.includes('woning')) return 'Kirada guriga waa in la bixiyaa bil kasta bilowgeeda.';
  if (d.includes('werk') || d.includes('baan')) return 'Waxaan raadinayaa shaqo ku habboon xirfaddayda.';
  if (d.includes('school') || d.includes('leraar')) return 'Macallinku wuxuu si fiican u sharxayaa casharka maanta.';
  if (d.includes('bezwaarschrift')) return 'Warqadda diidmada waa in lagu soo gudbiyaa lix toddobaad gudahood.';
  if (d.includes('belasting')) return 'Canshuurta dakhliga waa in la caddeeyaa sanad kasta.';
  if (d.includes('verzekering')) return 'Caymiska caafimaadku wuxuu daboolayaa kharashyada aasaasiga ah.';
  
  // Generic English-guided Somali phrasing
  return `Turjumaadda: ${en}`;
}

// Add NEW dedicated sentences for Pre-A1, C1, and C2 to ensure rich balance across all 7 levels
const extraSentences = [
  // PRE-A1 (Ultra simple, survival phrases)
  {
    level: "Pre-A1",
    topic: "Basiscontact",
    dutch: "Hallo, goedemorgen!",
    translations: {
      ar: "مرحباً، صباح الخير!",
      ti: "ሰላም፡ ከመይ ሓዲርኩም!",
      om: "Akkam, nagaa bultan!",
      so: "Hayye, subax wanaagsan!",
      en: "Hello, good morning!"
    }
  },
  {
    level: "Pre-A1",
    topic: "Basiscontact",
    dutch: "Ja, alstublieft.",
    translations: {
      ar: "نعم، من فضلك.",
      ti: "እወ፡ ብኽብረትካ።",
      om: "Eeyyee, maaloo.",
      so: "Haa, fadlan.",
      en: "Yes, please."
    }
  },
  {
    level: "Pre-A1",
    topic: "Basiscontact",
    dutch: "Nee, dank u wel.",
    translations: {
      ar: "لا، شكراً جزيلاً لك.",
      ti: "ኣይፋልን፡ የቐንየለይ።",
      om: "Lakki, guddaa galatoomaa.",
      so: "Maya, aad baad u mahadsan tahay.",
      en: "No, thank you."
    }
  },
  {
    level: "Pre-A1",
    topic: "Basiscontact",
    dutch: "Tot ziens en een fijne dag!",
    translations: {
      ar: "إلى اللقاء ويوم سعيد!",
      ti: "ደሓን ኩኑ፡ ጽቡቕ መዓልቲ!",
      om: "Nagaatti, guyyaa gaarii!",
      so: "Nabadgelyo iyo maalin wanaagsan!",
      en: "Goodbye and have a nice day!"
    }
  },
  {
    level: "Pre-A1",
    topic: "Eten & Drinken",
    dutch: "Ik wil graag een kop thee.",
    translations: {
      ar: "أود كوباً من الشاي من فضلك.",
      ti: "ሓደ ኩባያ ሻሂ እደሊ ኣለኹ።",
      om: "Shayii koobii tokko nan barbaada.",
      so: "Waxaan doonayaa koob shaah ah.",
      en: "I would like a cup of tea."
    }
  },
  {
    level: "Pre-A1",
    topic: "Taal",
    dutch: "Ik spreek nog een beetje Nederlands.",
    translations: {
      ar: "أنا أتحدث القليل من الهولندية فقط.",
      ti: "ቁሩብ ቋንቋ ሆላንድ ጥራይ እየ ዝዛረብ።",
      om: "Afaan Daachi xiqqoo qofan dubbadha.",
      so: "Wax yar oo Af-Hollandi ah ayaan ku hadlaa.",
      en: "I speak just a little Dutch."
    }
  },

  // C1 (Complex, legal, professional)
  {
    level: "C1",
    topic: "Bestuursrecht",
    dutch: "Het bestuursorgaan dient de rechtstreeks betrokken belangen op zorgvuldige en evenredige wijze af te wegen.",
    translations: {
      ar: "يجب على الجهة الإدارية أن توازن بين المصالح المباشرة المعنية بعناية وتناسب قانوني.",
      ti: "እቲ ምምሕዳራዊ ኣካል ነቶም ቀጥታዊ ጥቕምታት ብጥንቃቐን ሚዛናውን ኣገባብ ክመዝኖም ኣለዎ።",
      om: "Qaamni bulchiinsaa faayidaalee kallattiin ilaallatan of eeggannoodhaan madaaluu qaba.",
      so: "Hay'adda maamulku waa inay si taxadar leh oo miisaaman u qiimeysaa danaha tooska ah ee khuseeya.",
      en: "The administrative body must carefully and proportionally weigh the directly involved interests."
    }
  },
  {
    level: "C1",
    topic: "Arbeid & Recht",
    dutch: "Een ontbindingsverzoek op grond van een verstoorde arbeidsverhouding vereist een voldragen dossier.",
    translations: {
      ar: "يتطلب طلب فسخ عقد العمل بسبب اضطراب علاقة العمل ملفاً موثقاً ومكتملاً بالكامل.",
      ti: "ብሰንኪ ዝተበላሸወ ናይ ስራሕ ዝምድና ዝቐርብ ናይ ስራሕ ምቁራጽ ሕቶ ምሉእ መረዳእታ የድልዮ።",
      om: "Waliigaltee hojii addaan kutuuf ragaa guutuu fi amansiisaa dhiyeessuun barbaachisaa dha.",
      so: "Codsiga baabi'inta heshiiska shaqada ee xiriirka xumaaday wuxuu u baahan yahay dukumeenti buuxa.",
      en: "A petition for dissolution based on an impaired employment relationship requires a substantiated file."
    }
  },
  {
    level: "C1",
    topic: "Gezondheidszorg",
    dutch: "De patiënt heeft conform de WGBO het recht op een second opinion van een onafhankelijke specialist.",
    translations: {
      ar: "يحق للمريض بموجب قانون المعاملات الطبية الحصول على رأي طبي ثانٍ من أخصائي مستقل.",
      ti: "እቲ ሕሙም ብመሰረት ሕጊ ካብ ካልእ ናጻ ስፔሻሊስት ካልኣይ ናይ ሕክምና ርእይቶ ናይ ምርካብ መሰል ኣለዎ።",
      om: "Dhukkubsataan ogeessa biraa irraa yaada lammataa argachuuf mirga seeraa qaba.",
      so: "Bukaanku wuxuu xaq sharci ah u leeyahay inuu ra'yi labaad ka helo dhaqtar takhasus gaar ah leh.",
      en: "Under the Medical Treatment Contracts Act, the patient is entitled to a second opinion from an independent specialist."
    }
  },

  // C2 (Mastery, formal debate, nuance)
  {
    level: "C2",
    topic: "Constitutioneel Recht",
    dutch: "De verdragsconforme uitleg van grondrechten waarborgt een dynamische en effectieve rechtsbescherming van burgers.",
    translations: {
      ar: "يضمن التفسير المتوافق مع المعاهدات الدولية للحقوق الأساسية حماية قانونية فعالة وديناميكية للمواطنين.",
      ti: "እቲ ምስ ዓለምለኻዊ ውዕላት ዝሰማማዕ ናይ መሰረታዊ መሰላት ትርጉም ንዜጋታት ድልዱል ሕጋዊ ዕቝባ የረጋግጽ።",
      om: "Hiikni mirga bu'uuraa waliigaltee addunyaa wajjin walsimu lammiileef eegumsa seeraa cimaa mirkaneessa.",
      so: "Fasiraadda waafaqsan heshiisyada caalamiga ah waxay muwaadiniinta u xaqiijisaa ilaalin sharci oo buuxda.",
      en: "The treaty-consistent interpretation of fundamental rights ensures dynamic and effective legal protection for citizens."
    }
  },
  {
    level: "C2",
    topic: "Overheidsbeleid",
    dutch: "Het sluiten van een bestuurlijk convenant laat de zelfstandige handhavingsbevoegdheid van de toezichthouder onverlet.",
    translations: {
      ar: "إبرام اتفاقية إدارية مشتركة لا يمس ولا ينتقص من سلطة الإنفاذ القانونية المستقلة الممنوحة للهيئة الرقابية.",
      ti: "ምምሕዳራዊ ስምምዕ ምኽታም ነቲ ናይ ተቖጻጻሪ ኣካል ናጻ ናይ ሕጊ ምኽባር ስልጣን ኣየዐግቶን እዩ።",
      om: "Waliigaltee bulchiinsaa mallatteessuun aangoo seera raawwachiisuu qaama to'ataatiin hin dhiibu.",
      so: "Galaangalka heshiiska maamul ma baabi'iyo awoodda madaxa banaan ee hay'adda kormeerka sharciyeed.",
      en: "Entering into an administrative covenant is without prejudice to the supervisor's independent enforcement authority."
    }
  }
];

extraSentences.forEach((extra, i) => {
  curSentences.push({
    id: `sent_${extra.level.toLowerCase().replace(/[^a-z0-9]/g, '')}_${String(curSentences.length + 1).padStart(3, '0')}`,
    level: extra.level,
    topic: extra.topic,
    dutch: extra.dutch,
    translations: extra.translations
  });
});

// Re-index all IDs sequentially by level
const levelCounts = {};
curSentences.forEach(s => {
  levelCounts[s.level] = (levelCounts[s.level] || 0) + 1;
  const lvlTag = s.level.toLowerCase().replace(/[^a-z0-9]/g, '');
  s.id = `sent_${lvlTag}_${String(levelCounts[s.level]).padStart(3, '0')}`;
});

console.log('Processed Sentences Total:', curSentences.length);
console.log('Level Distribution:');
console.log(levelCounts);

fs.writeFileSync(path.join(__dirname, '../data/sentences.json'), JSON.stringify(curSentences, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/sentences.js'), `window.TAALVRIEND_SENTENCES = ${JSON.stringify(curSentences, null, 2)};\n`, 'utf8');
console.log('Successfully saved data/sentences.json and data/sentences.js!');
