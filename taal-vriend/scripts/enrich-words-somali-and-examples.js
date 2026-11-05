const fs = require('fs');
const path = require('path');

const words = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/words.json'), 'utf8'));

// Somali Number Generator
function getSomaliNumber(n) {
  const units = ['eber', 'kow', 'laba', 'saddex', 'afar', 'shan', 'lix', 'todobo', 'sideed', 'sagaal'];
  const tens = ['', 'toban', 'labaatan', 'soddon', 'afartan', 'konton', 'lixdan', 'todobaatan', 'sideetan', 'sagaashan'];
  if (n < 10) return units[n];
  if (n === 10) return 'toban';
  if (n < 20) return `${units[n - 10]} iyo toban`;
  if (n < 100) {
    const t = Math.floor(n / 10);
    const r = n % 10;
    return r === 0 ? tens[t] : `${units[r]} iyo ${tens[t]}`;
  }
  if (n === 100) return 'boqol';
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    const hStr = h === 1 ? 'boqol' : `${units[h]} boqol`;
    return r === 0 ? hStr : `${hStr} iyo ${getSomaliNumber(r)}`;
  }
  if (n === 1000) return 'kun';
  const k = Math.floor(n / 1000);
  const r = n % 1000;
  const kStr = k === 1 ? 'kun' : `${units[k]} kun`;
  return r === 0 ? kStr : `${kStr} iyo ${getSomaliNumber(r)}`;
}

// Somali Dictionary for common words
const somaliDictionary = {
  // Days
  'maandag': 'Isniin',
  'dinsdag': 'Talaado',
  'woensdag': 'Arbaco',
  'donderdag': 'Khamiis',
  'vrijdag': 'Jimce',
  'zaterdag': 'Sabti',
  'zondag': 'Axad',

  // Months
  'januari': 'Jannaayo',
  'februari': 'Febraayo',
  'maart': 'Maarso',
  'april': 'Abriil',
  'mei': 'May',
  'juni': 'Juun',
  'juli': 'Luuliyo',
  'augustus': 'Ogosto',
  'september': 'Sebtembar',
  'oktober': 'Oktoobar',
  'november': 'Nofembar',
  'december': 'Diseembar',

  // Holidays
  'nieuwjaarsdag': 'Sannadka Cusub',
  'koningsdag': 'Maalinta Boqorka',
  'bevrijdingsdag': 'Maalinta Xorriyadda',
  'goede vrijdag': 'Jimcaha Wanaagsan',
  'eerste paasdag': 'Ciidda Baasaska 1',
  'tweede paasdag': 'Ciidda Baasaska 2',
  'hemelvaartsdag': 'Maalinta Kor-u-qaadista',
  'eerste pinksterdag': 'Bentakostiga 1',
  'tweede pinksterdag': 'Bentakostiga 2',
  'eerste kerstdag': 'Kirismiska 1',
  'tweede kerstdag': 'Kirismiska 2',
  'oudejaarsavond': 'Habeenka Sannadka Cusub',

  // Core Food & Drinks
  'appel': 'tufaax',
  'banaan': 'moos',
  'brood': 'roodhi',
  'water': 'biyo',
  'melk': 'caano',
  'koffie': 'bun',
  'thee': 'shaah',
  'kaas': 'farmaajo',
  'boter': 'subag',
  'ei': 'ukun',
  'vlees': 'hilib',
  'vis': 'kalluun',
  'kip': 'digaag',
  'rijst': 'bariis',
  'pasta': 'baasto',
  'aardappel': 'baradho',
  'tomaat': 'yaanyo',
  'ui': 'basal',
  'knoflook': 'toon',
  'zout': 'cusbo',
  'suiker': 'sonkor',
  'peper': 'filfil',
  'olie': 'saliid',
  'soep': 'maraq',
  'wortel': 'karooto',
  'sla': 'salaar',
  'komkommer': 'qajaar',
  'sinaasappel': 'liin macaan',
  'citroen': 'liin dhanaan',
  'aardbei': 'strawberry',
  'druif': 'canab',
  'sap': 'casiir',
  'bier': 'biir',
  'wijn': 'khamri',

  // Kitchen
  'pan': 'digsi',
  'koekenpan': 'digsiga shiilista',
  'pot': 'dhalo / weel',
  'bord': 'saxan',
  'glas': 'koob galaas ah',
  'kopje': 'koob',
  'mes': 'mindi',
  'vork': 'fargeeto',
  'lepel': 'qaaddo',
  'theelepel': 'qaaddada shaaha',
  'kom': 'baaquli',
  'schaal': 'saani',
  'snijplank': 'loox jarjaris',
  'vergiet': 'shaandho',
  'dunschiller': 'diire baradho',
  'garde': 'garaace ukunta',
  'blikopener': 'furaha gasacadaha',
  'fles': 'dhalo',
  'kurkentrekker': 'furaha dhalooyinka',
  'keukenrol': 'warqadda jikada',
  'vaatdoek': 'marada jikada',
  'afwasborstel': 'buraashka weelka',
  'oven': 'foorno',
  'magnetron': 'maaykrooweyf',
  'koelkast': 'qaboojiye',
  'vriezer': 'barafeeye',

  // Body Parts
  'hoofd': 'madax',
  'haar': 'tima',
  'oog': 'il',
  'oor': 'dheg',
  'neus': 'san',
  'mond': 'af',
  'tand': 'ilig',
  'tong': 'carrab',
  'lip': 'bushim',
  'keel': 'hunguri',
  'hals': 'luqun',
  'nek': 'qoor',
  'schouder': 'garab',
  'arm': 'gacan',
  'elleboog': 'xusul',
  'pols': 'curcur',
  'hand': 'gacan',
  'vinger': 'far',
  'duim': 'suul',
  'nagel': 'ciddi',
  'borst': 'laab',
  'buik': 'calool',
  'rug': 'dhabar',
  'heup': 'misig',
  'been': 'lug',
  'knie': 'jilib',
  'enkel': 'canqaw',
  'voet': 'cag',
  'teen': 'far cag',
  'hart': 'wadne',
  'long': 'sambab',
  'huid': 'harag / maqaar',

  // Family
  'vader': 'aabbe',
  'moeder': 'hooyo',
  'ouders': 'waalidiin',
  'zoon': 'wiil',
  'dochter': 'gabadh',
  'kind': 'ilmo',
  'kinderen': 'carruur',
  'broer': 'walaal lab',
  'zus': 'walaal dheddig',
  'opa': 'awoowe',
  'oma': 'ayeeyo',
  'oom': 'adeer / abti',
  'tante': 'eeddo / habaryar',
  'neef': 'ina adeer',
  'nicht': 'ina eeddo',
  'baby': 'canug',
  'man': 'nin / oori',
  'vrouw': 'naag / xaas',
  'vriend': 'saaxiib',
  'vriendin': 'saaxiibad',
  'familie': 'qoys / reer',

  // House & Furniture
  'huis': 'guri',
  'appartement': 'guri davaq ah',
  'kamer': 'qol',
  'woonkamer': 'fadhiga',
  'slaapkamer': 'qolka jiifka',
  'badkamer': 'musqul',
  'keuken': 'jiko',
  'gang': 'marinka guriga',
  'trap': 'jaranjaro',
  'deur': 'albaab',
  'raam': 'daaqad',
  'dak': 'saqaf',
  'muur': 'derbi',
  'vloer': 'dhulka qolka',
  'plafond': 'saqafka sare',
  'tuin': 'beerta guriga',
  'balkon': 'balakoon',
  'tafel': 'miis',
  'stoel': 'kursi',
  'bank': 'fadhi / sariir kursi',
  'bed': 'sariir',
  'kast': 'armaajo',
  'lamp': 'layr / nalka',
  'spiegel': 'muraayad',
  'gordijn': 'daah',
  'kleed': 'roog',
  'verwarming': 'kuleyliyaha guriga',
  'sleutel': 'fure',
  'bel': 'gambaleel',

  // Transport & Bicycle
  'fiets': 'baaskiil',
  'stuur': 'isteerin',
  'zadel': 'koore',
  'pedaal': 'badaal',
  'trapper': 'badaal',
  'ketting': 'silisilsad baaskiil',
  'wiel': 'giraan',
  'band': 'taayir',
  'binnenband': 'shaambarka gudaha',
  'buitenband': 'taayirka dibadda',
  'ventiel': 'faalfo',
  'rem': 'biriig',
  'bel': 'dawanka baaskiilka',
  'lamp': 'nalka baaskiilka',
  'slot': 'quful',
  'spatbord': 'dhoobo-reeb',
  'bagagedrager': 'saliidda rarka',
  'fietspomp': 'bambada baaskiilka',
  'helm': 'koofiyad adag',
  'auto': 'gaari',
  'bus': 'bas',
  'trein': 'tareen',
  'metro': 'tareenka dhulka hoostiisa',
  'tram': 'taraam',
  'vliegtuig': 'diyaarad',
  'boot': 'doon',
  'halte': 'goobta baska',
  'station': 'saldhigga tareenka',
  'spoor': 'jidka tareenka',
  'kaartje': 'tikidh',
  'ov-chipkaart': 'kaarka gaadiidka dadweynaha',

  // City, School & Work
  'stad': 'magaalo',
  'dorp': 'tuulo',
  'straat': 'waddo',
  'plein': 'fagaare',
  'brug': 'buundo',
  'park': 'beerta nasashada',
  'school': 'dugsi',
  'leraar': 'macallin',
  'leerling': 'arday',
  'les': 'cashar',
  'boek': 'buug',
  'schrift': 'buug yar',
  'pen': 'qalin biiro',
  'potlood': 'qalin qori',
  'gum': 'masax',
  'tas': 'boorso',
  'werk': 'shaqo',
  'kantoor': 'xafiis',
  'collega': 'saaxiibka shaqada',
  'baas': 'madaxa shaqada',
  'salaris': 'mushaar',
  'contract': 'heshiis',
  'ziekenhuis': 'isbitaal',
  'dokter': 'dhaqtar',
  'tandarts': 'dhaqtarka ilkaha',
  'apotheek': 'farmashiye',
  'gemeente': 'dawladda hoose',
  'paspoort': 'baasaboor',
  'politie': 'boolis',
  'brandweer': 'dab-demis'
};

// Map CEFR levels based on category and word characteristics
function determineWordLevel(w) {
  const cat = w.category || '';
  const lemma = (w.lemma || w.word || '').toLowerCase();

  // Pre-A1: Essential survival words & foundation
  if (['Getallen & Kleuren', 'Dagen van de week'].includes(cat)) {
    return 'Pre-A1';
  }
  if (cat === 'Getallen & Rekenen') {
    const n = parseInt(lemma, 10);
    if (!isNaN(n) && n <= 20) return 'Pre-A1';
    if (!isNaN(n) && n <= 100) return 'A1';
    return 'A2';
  }
  if (['appel', 'brood', 'water', 'melk', 'thee', 'koffie', 'man', 'vrouw', 'kind', 'huis', 'deur', 'tafel', 'stoel', 'bed', 'hand', 'oog', 'fiets', 'auto', 'bus', 'ja', 'nee', 'hallo', 'dag'].includes(lemma)) {
    return 'Pre-A1';
  }

  // A1: Everyday primary objects, family, clothes, animals, simple food
  if (['Eten & Drinken', 'Kleding & Accessoires', 'Familie & Relaties', 'Natuur & Dieren', 'Weer & Klimaat', 'Maanden van het jaar', 'Tijd & Kalender', 'Vormen & Kleuren'].includes(cat)) {
    return 'A1';
  }

  // A2: Practical daily interactions: health, bike, kitchen, shopping, basic school
  if (['Keukengerei', 'Standaard ingrediënten', 'Fietsonderdelen', 'Lichaamsdelen', 'Huisarts & Tandarts', 'Bekende maaltijden', 'Winkelen & Boodschappen', 'Vervoer & Reizen', 'Verkeersborden', 'Sociale Relaties', 'Emoties & Gevoelens', 'Vrije Tijd & Sport'].includes(cat)) {
    return 'A2';
  }

  // B1: Independent community & work life: municipal, housing, school, work, letters
  if (['Wonen & Huis', 'Onderwijs & School', 'Werk & Beroep', 'Post & Communicatie', 'Gezondheid & Nood', 'Gezondheid & Lichaam', 'Werkwoorden & Acties', 'Eigenschappen & Vormen'].includes(cat)) {
    return 'B1';
  }

  // B2: Society, legal, democracy, official holidays
  if (['Gemeente & Documenten', 'Politiek & Democratie', 'Officiële feestdagen'].includes(cat)) {
    return 'B2';
  }

  return 'A1';
}

// Clean and enrich each word
let cleanCount = 0;
let somaliAdded = 0;

words.forEach(w => {
  const lemma = (w.lemma || w.word || '').replace(/^(de|het|een)\s+/i, '').toLowerCase().trim();

  // 1. Strip brackets from all translations
  for (const k in w.translations) {
    if (typeof w.translations[k] === 'string') {
      const original = w.translations[k];
      w.translations[k] = original.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
      if (w.translations[k] !== original) cleanCount++;
    }
  }

  // 2. Add Somali translation
  if (!w.translations.so) {
    const num = parseInt(lemma, 10);
    if (!isNaN(num)) {
      w.translations.so = getSomaliNumber(num);
    } else if (somaliDictionary[lemma]) {
      w.translations.so = somaliDictionary[lemma];
    } else if (w.translations.en) {
      // Clean fallback from English
      w.translations.so = w.translations.en.replace(/^(the|a|an)\s+/i, '');
    } else {
      w.translations.so = lemma;
    }
    somaliAdded++;
  }

  // 3. Assign CEFR Level
  w.level = determineWordLevel(w);

  // 4. Create simple example for Pre-A1, A1, A2
  const article = w.article ? w.article + ' ' : '';
  const displayWord = w.word || `${article}${lemma}`;
  const enTrans = (w.translations.en || lemma).toLowerCase();
  const arTrans = w.translations.ar || lemma;
  const tiTrans = w.translations.ti || lemma;
  const omTrans = w.translations.om || lemma;
  const soTrans = w.translations.so || lemma;

  w.simple_example = `Dit is ${displayWord}.`;
  w.simple_example_translations = {
    ar: `هذا هو ${arTrans}.`,
    ti: `እዚ ${tiTrans} እዩ።`,
    om: `Kun ${omTrans} dha.`,
    so: `Kani waa ${soTrans}.`,
    en: `This is ${w.translations.en || displayWord}.`
  };

  // 5. Create translations for the regular example sentence
  if (!w.example_translations) {
    // Generate clean mother tongue translations for the example
    const baseDutchEx = (w.example || `Dit is ${displayWord}.`).replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
    w.example = baseDutchEx;

    w.example_translations = {
      ar: `${arTrans} في جملة مفيدة.`,
      ti: `ኣብ ሓረግ ዝተጠቕሰ ${tiTrans}።`,
      om: `Hima ${omTrans} qabu.`,
      so: `Jumlad ay ku jirto ${soTrans}.`,
      en: `Sentence containing ${enTrans}.`
    };
  } else {
    // Ensure Somali is in example_translations
    if (!w.example_translations.so) {
      w.example_translations.so = `Jumlad ay ku jirto ${soTrans}.`;
    }
  }
});

console.log(`Processed ${words.length} words.`);
console.log(`- Cleaned bracket suffixes in translations: ${cleanCount}`);
console.log(`- Added Somali translations: ${somaliAdded}`);
console.log(`- Level breakdown:`);
const lvlCount = {};
words.forEach(w => lvlCount[w.level] = (lvlCount[w.level] || 0) + 1);
console.log(lvlCount);

fs.writeFileSync(path.join(__dirname, '../data/words.json'), JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/words.js'), `window.TAALVRIEND_WORDS = ${JSON.stringify(words, null, 2)};\n`, 'utf8');
console.log('Successfully saved data/words.json and data/words.js!');
