// scripts/rebuild-clean-words.js
// Cleans up word database:
// - Re-implements numbers accurately (0-100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000, 1000000)
// - Merges requested categories (Verkeer & Reizen + Vervoer & Reizen, Wonen & Huis + Wonen & Huishouden, etc.)
// - Adds new categories: Dagen van de week, Maanden van het jaar, Officiële feestdagen
// - Writes to data/words.json and data/words.js

const fs = require('fs');
const path = require('path');

// 1. Accurate linguistic Dutch number converter
function numberToDutch(n) {
  const units = ['', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen',
                 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
  const tens = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];

  if (n === 0) return 'nul';
  if (n < 20) return units[n];
  if (n < 100) {
    const u = n % 10;
    const t = Math.floor(n / 10);
    if (u === 0) return tens[t];
    const en = (u === 2 || u === 3) ? 'ën' : 'en';
    return units[u] + en + tens[t];
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    const hPrefix = h === 1 ? 'honderd' : units[h] + 'honderd';
    if (r === 0) return hPrefix;
    return hPrefix + numberToDutch(r);
  }
  if (n === 1000) return 'duizend';
  if (n === 10000) return 'tienduizend';
  if (n === 100000) return 'honderdduizend';
  if (n === 1000000) return 'één miljoen';
  return String(n);
}

// SVG Generator Helper
function generateSvgCard(id, color, bg, glyph) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="240" height="240" rx="36" fill="url(#grad_${id})"/>
  <g filter="url(#shadow_${id})">
    <circle cx="120" cy="120" r="72" fill="${color}" opacity="0.10"/>
    <circle cx="120" cy="120" r="54" fill="${color}" opacity="0.18"/>
    <text x="120" y="140" font-size="52" font-family="'Segoe UI', Roboto, -apple-system, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${glyph}</text>
  </g>
</svg>`.trim();
}

// 2. Load existing words
const currentWords = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'words.json'), 'utf-8'));
console.log(`Initial total words: ${currentWords.length}`);

// Filter out buggy numbers generated previously (e.g. 'honderdtwee-21', or words starting with 'w_num_')
const nonBuggyWords = currentWords.filter(w => {
  if (w.id.startsWith('w_num_')) return false;
  if (w.word.match(/honderd[a-z]+-\d+/)) return false;
  return true;
});
console.log(`Words after removing buggy numbers: ${nonBuggyWords.length}`);

// 3. Category consolidation map
const categoryMap = {
  'Verkeer & Reizen': 'Vervoer & Reizen',
  'Vervoer & Onderweg': 'Vervoer & Reizen',
  'Wonen & Huishouden': 'Wonen & Huis',
  'Werk & Beroepen': 'Werk & Beroep',
  'Werkwoorden': 'Werkwoorden & Acties',
  'Kleding': 'Kleding & Accessoires',
  'Familie & Mensen': 'Familie & Relaties',
  'Dieren & Natuur': 'Natuur & Dieren',
  'Supermarkt & Voeding': 'Winkelen & Boodschappen',
  'School, Taal & Inburgering': 'Onderwijs & School',
  'Documenten & Zaken': 'Gemeente & Documenten',
  'Overheid, Post & Zaken': 'Post & Communicatie',
  'Tijd & Weer': 'Weer & Klimaat',
  'Communicatie & Gevoelens': 'Emoties & Gevoelens',
  'Emoties & Gevoel': 'Emoties & Gevoelens',
  'Gezondheid, Werk & Recht': 'Gemeente & Documenten'
};

nonBuggyWords.forEach(w => {
  if (categoryMap[w.category]) {
    w.category = categoryMap[w.category];
  }
});

// 4. Generate clean, linguistically accurate numbers (0 through 100, plus 200, 300, 400, 500, 600, 700, 800, 900, 1000, 10000, 1000000)
const numbersToAdd = [];
const numSet = new Set();

// 0 to 300 (covering all everyday numbers, addresses, room numbers, etc.)
for (let i = 0; i <= 300; i++) {
  numSet.add(i);
}
// Selected larger key numbers
[400, 500, 600, 700, 800, 900, 1000, 10000, 100000, 1000000].forEach(n => numSet.add(n));

// Helper for Arabic numbers
const arNumberWords = {
  0: 'صفر', 1: 'واحد', 2: 'اثنان', 3: 'ثلاثة', 4: 'أربعة', 5: 'خمسة', 6: 'ستة', 7: 'سبعة', 8: 'ثمانية', 9: 'تسعة',
  10: 'عشرة', 11: 'أحد عشر', 12: 'اثنا عشر', 13: 'ثلاثة عشر', 14: 'أربعة عشر', 15: 'خمسة عشر',
  16: 'ستة عشر', 17: 'سبعة عشر', 18: 'ثمانية عشر', 19: 'تسعة عشر', 20: 'عشرون', 30: 'ثلاثون',
  40: 'أربعون', 50: 'خمسون', 60: 'ستون', 70: 'سبعون', 80: 'ثمانون', 90: 'تسعون', 100: 'مئة',
  200: 'مئتان', 300: 'ثلاثمئة', 400: 'أربعمئة', 500: 'خمسمئة', 600: 'ستمئة', 700: 'سبعمئة',
  800: 'ثمانمئة', 900: 'تسعمئة', 1000: 'ألف', 10000: 'عشرة آلاف', 100000: 'مئة ألف', 1000000: 'مليون'
};

// Helper for Tigrinya numbers
const tiNumberWords = {
  0: 'ባዶ', 1: 'ሓደ', 2: 'ክልተ', 3: 'ሰለስተ', 4: 'ኣርባዕተ', 5: 'ሓሙሽተ', 6: 'ሽዱሽተ', 7: 'ሸውዓተ', 8: 'ሸሞንተ', 9: 'ትሽዓተ',
  10: 'ዓሰርተ', 11: 'ዓሰርተ ሓደ', 12: 'ዓሰርተ ክልተ', 13: 'ዓሰርተ ሰለስተ', 14: 'ዓሰርተ ኣርባዕተ', 15: 'ዓሰርተ ሓሙሽተ',
  16: 'ዓሰርተ ሽዱሽተ', 17: 'ዓሰርተ ሸውዓተ', 18: 'ዓሰርተ ሸሞንተ', 19: 'ዓሰርተ ትሽዓተ', 20: 'ዕስራ', 30: 'ሰላሳ',
  40: 'ኣርብዓ', 50: 'ሓምሳ', 60: 'ስሳ', 70: 'ሰብዓ', 80: 'ሰማንያ', 90: 'ተስዓ', 100: 'ሚኢቲ',
  200: 'ክልተ ሚኢቲ', 300: 'ሰለስተ ሚኢቲ', 400: 'ኣርባዕተ ሚኢቲ', 500: 'ሓሙሽተ ሚኢቲ', 600: 'ሽዱሽተ ሚኢቲ',
  700: 'ሸውዓተ ሚኢቲ', 800: 'ሸሞንተ ሚኢቲ', 900: 'ትሽዓተ ሚኢቲ', 1000: 'ሽሕ', 10000: 'ዓሰርተ ሽሕ', 100000: 'ሚኢቲ ሽሕ', 1000000: 'ሚልዮን'
};

// Helper for Oromo numbers
const omNumberWords = {
  0: 'zeeroo', 1: 'tokko', 2: 'lama', 3: 'sadii', 4: 'afur', 5: 'shan', 6: 'ja\'a', 7: 'torba', 8: 'saddeet', 9: 'sagal',
  10: 'kudhan', 11: 'kudha tokko', 12: 'kudha lama', 13: 'kudha sadii', 14: 'kudha afur', 15: 'kudha shan',
  16: 'kudha ja\'a', 17: 'kudha torba', 18: 'kudha saddeet', 19: 'kudha sagal', 20: 'digdama', 30: 'soddoma',
  40: 'afurtama', 50: 'shantama', 60: 'jaatama', 70: 'torbaatama', 80: 'saddeettama', 90: 'sagalbaatama', 100: 'dhibba',
  200: 'dhibba lama', 300: 'dhibba sadii', 400: 'dhibba afur', 500: 'dhibba shan', 600: 'dhibba ja\'a',
  700: 'dhibba torba', 800: 'dhibba saddeet', 900: 'dhibba sagal', 1000: 'kuma', 10000: 'kuma kudhan', 100000: 'kuma dhibba', 1000000: 'miliyoona'
};

const existingNumberWords = new Set();
// Clean out existing Getallen & Rekenen or Getallen & Kleuren exact matches so we replace with pristine versions
const finalNonNumberWords = nonBuggyWords.filter(w => {
  if (w.category === 'Getallen & Rekenen' || w.category === 'Getallen & Kleuren') {
    // Keep colors or non-digits (like plus, min, procent, cirkel)
    if (['rood', 'blauw', 'geel', 'groen', 'zwart', 'wit', 'oranje', 'paars', 'bruin', 'grijs', 'roze', 'plus', 'min', 'procent', 'de helft', 'het kwart', 'optellen', 'aftrekken'].some(k => w.word.includes(k))) {
      return true;
    }
    return false;
  }
  return true;
});

console.log(`Non-number base words kept: ${finalNonNumberWords.length}`);

// Generate accurate numbers
Array.from(numSet).sort((a, b) => a - b).forEach(n => {
  const dutchWord = numberToDutch(n);
  const id = `num_${n}`;
  const arWord = arNumberWords[n] || `الرقم ${n}`;
  const tiWord = tiNumberWords[n] || `ቁጽሪ ${n}`;
  const omWord = omNumberWords[n] || `lakkoofsa ${n}`;
  const enWord = n === 0 ? 'zero' : n === 1000000 ? 'one million' : `${n}`;

  numbersToAdd.push({
    id: id,
    word: dutchWord,
    lemma: dutchWord,
    article: '',
    category: 'Getallen & Rekenen',
    translations: {
      ar: `${arWord} (${n})`,
      ti: `${tiWord} (${n})`,
      om: `${omWord} (${n})`,
      en: `${enWord} (${n})`
    },
    example: n === 0 ? 'Nul graden is het vriespunt van water.' :
             n === 1 ? 'Er staat één mooie boom in de tuin.' :
             `Het busnummer is ${n}.`,
    svg: generateSvgCard(id, '#059669', '#ECFDF5', `${n}`)
  });
});

console.log(`Generated ${numbersToAdd.length} pristine numbers.`);

// 5. NEW CATEGORIES:
// - Dagen van de week (10 words)
// - Maanden van het jaar (14 words)
// - Officiële feestdagen (15 words)

const dagenVanDeWeek = [
  ['de maandag', 'maandag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الإثنين (أول أيام أسبوع العمل والدراسة)', 'ሰኑይ', 'wixata', 'Monday', 'Maandag is de eerste werkdag van de week.'],
  ['de dinsdag', 'dinsdag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الثلاثاء', 'ሰሉስ', 'kibxata', 'Tuesday', 'Op dinsdag hebben we taalles op school.'],
  ['de woensdag', 'woensdag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الأربعاء (نصف الأسبوع)', 'ረቡዕ', 'roobii', 'Wednesday', 'Op woensdagmiddag zijn veel basisscholen vrij.'],
  ['de donderdag', 'donderdag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الخميس', 'ሓሙስ', 'kamisa', 'Thursday', 'Donderdagavond is het koopavond in het centrum.'],
  ['de vrijdag', 'vrijdag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الجمعة المبارك ونهاية أسبوع العمل', 'ዓርቢ', 'jimaata', 'Friday', 'Vrijdagmiddag wensen we elkaar een fijn weekend.'],
  ['de zaterdag', 'zaterdag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم السبت (أول أيام عطلة نهاية الأسبوع)', 'ቀዳም', 'sanbata duraa', 'Saturday', 'Op zaterdag doen we de grote weekboodschappen.'],
  ['de zondag', 'zondag', 'de', 'Dagen van de week', '📅', '#2563EB', '#EFF6FF', 'يوم الأحد (يوم الراحة العائلية)', 'ሰንበት', 'dilbata', 'Sunday', 'Zondag is een rustige dag voor familie en ontspanning.'],
  ['het weekend', 'weekend', 'het', 'Dagen van de week', '🎉', '#2563EB', '#EFF6FF', 'عطلة نهاية الأسبوع (السبت والأحد)', 'ቀዳም-ሰንበት', 'dhuma torbee (sanbata)', 'weekend', 'Fijn weekend en geniet van je vrije tijd!'],
  ['de werkdag', 'werkdag', 'de', 'Dagen van de week', '💼', '#2563EB', '#EFF6FF', 'يوم العمل الرسمي (من الإثنين إلى الجمعة)', 'መዓልቲ ስራሕ', 'guyyaa hojii', 'working day / weekday', 'Een normale werkdag telt acht uur.'],
  ['de rustdag', 'rustdag', 'de', 'Dagen van de week', '☕', '#2563EB', '#EFF6FF', 'يوم الراحة والاستجمام', 'መዓልቲ ዕረፍቲ', 'guyyaa boqonnaa', 'rest day / day off', 'Na vijf dagen werken is een rustdag heel fijn.']
];

const maandenVanHetJaar = [
  ['januari', 'januari', '', 'Maanden van het jaar', '❄️', '#0284C7', '#E0F2FE', 'يناير (الشهر الأول في السنة الميلادية)', 'ጥሪ (ጃንዋሪ)', 'ammanjii (janwaarii)', 'January', 'In januari vieren we het begin van het nieuwe jaar.'],
  ['februari', 'februari', '', 'Maanden van het jaar', '❄️', '#0284C7', '#E0F2FE', 'فبراير (الشهر الثاني، 28 أو 29 يوماً)', 'ለካቲት (ፌብሩዋሪ)', 'guraandhala (feebruwaarii)', 'February', 'Februari is de kortste maand van het jaar.'],
  ['maart', 'maart', '', 'Maanden van het jaar', '🌱', '#059669', '#ECFDF5', 'مارس (الشهر الثالث وبداية الربيع)', 'መጋቢት (ማርች)', 'bitootessa (maart)', 'March', 'In maart begint de lente en worden de dagen langer.'],
  ['april', 'april', '', 'Maanden van het jaar', '🌷', '#059669', '#ECFDF5', 'أبريل (الشهر الرابع وشهر أزهار التوليب)', 'ሚያዝያ (ኤፕሪል)', 'elba (eepriil)', 'April', 'In april viert heel Nederland feestelijk Koningsdag.'],
  ['mei', 'mei', '', 'Maanden van het jaar', '🌸', '#059669', '#ECFDF5', 'مايو (الشهر الخامس وشهر الحرية)', 'ግንቦት (ሜይ)', 'caamsaa (meeyii)', 'May', 'Op 5 mei vieren we in Nederland Bevrijdingsdag.'],
  ['juni', 'juni', '', 'Maanden van het jaar', '☀️', '#D97706', '#FEF3C7', 'يونيو (الشهر السادس وبداية الصيف)', 'ሰነ (ጁን)', 'waxabajjii (juunii)', 'June', 'Eind juni begint officieel de zomer.'],
  ['juli', 'juli', '', 'Maanden van het jaar', '🏖️', '#D97706', '#FEF3C7', 'يوليو (الشهر السابع وشهر العطلات الصيفية)', 'ሓምለ (ጁላይ)', 'aadaolessa (julaay)', 'July', 'In juli hebben de schoolkinderen zomervakantie.'],
  ['augustus', 'augustus', '', 'Maanden van het jaar', '☀️', '#D97706', '#FEF3C7', 'أغسطس (الشهر الثامن الأكثر دفئاً)', 'ነሓሰ (ኦገስት)', 'hagayya (ogost)', 'August', 'Augustus is vaak de warmste maand in Nederland.'],
  ['september', 'september', '', 'Maanden van het jaar', '🍁', '#D97706', '#FEF3C7', 'سبتمبر (الشهر التاسع وبداية الخريف والمدارس)', 'መስከረም (ሰፕተምበር)', 'fuulbana (september)', 'September', 'In september gaan de scholen weer open na de vakantie.'],
  ['oktober', 'oktober', '', 'Maanden van het jaar', '🍂', '#B45309', '#FEF3C7', 'أكتوبر (الشهر العاشر وسقوط أوراق الأشجار)', 'ጥቅምቲ (ኦክቶበር)', 'onkololeessa (oktoober)', 'October', 'In oktober verkleuren de bladeren prachtig geel en rood.'],
  ['november', 'november', '', 'Maanden van het jaar', '🌧️', '#475569', '#F1F5F9', 'نوفمبر (الشهر الحادي عشر البارد والماطر)', 'ሕዳር (ኖቨምበር)', 'sadaasa (novembeer)', 'November', 'In november regent het vaker en wordt het vroeg donker.'],
  ['december', 'december', '', 'Maanden van het jaar', '🎄', '#475569', '#F1F5F9', 'ديسمبر (الشهر الثاني عشر والأخير في السنة)', 'ታሕሳስ (ዲሰምበር)', 'muddee (disembeer)', 'December', 'In december vieren mensen Sinterklaas en Kerstmis.'],
  ['het kwartaal', 'kwartaal', 'het', 'Maanden van het jaar', '📊', '#0284C7', '#E0F2FE', 'الربع السنوي (فترة ثلاثة أشهر متتالية)', 'ርብዒ ዓመት (ኩዋርታል)', 'kurmaana waggaa (kwartaala)', 'quarter (three months)', 'Een jaar is verdeeld in vier kwartalen.'],
  ['het schrikkeljaar', 'schrikkeljaar', 'het', 'Maanden van het jaar', '📆', '#0284C7', '#E0F2FE', 'السنة الكبيسة (366 يوماً كل 4 سنوات)', 'ሰገረ-ዓመት (ሊፕ ይር)', 'waggaa dabalataa (schrikkeljaar)', 'leap year', 'In een schrikkeljaar telt februari 29 dagen in plaats van 28.']
];

const officieleFeestdagen = [
  ['Nieuwjaarsdag', 'Nieuwjaarsdag', '', 'Officiële feestdagen', '🎆', '#8B5CF6', '#F5F3FF', 'رأس السنة الميلادية (1 يناير)', 'መዓልቲ ሓድሽ ዓመት', 'guyyaa waggaa haaraa', 'New Year\'s Day', 'Op Nieuwjaarsdag wenst iedereen elkaar een gelukkig nieuwjaar.'],
  ['Goede Vrijdag', 'Goede Vrijdag', '', 'Officiële feestdagen', '🕊️', '#8B5CF6', '#F5F3FF', 'الجمعة العظيمة (قبل عيد الفصح)', 'ስቅለት (ጽቡቕ ዓርቢ)', 'jimaata gaarii (Goede Vrijdag)', 'Good Friday', 'Goede Vrijdag valt altijd op de vrijdag voor Pasen.'],
  ['Pasen', 'Pasen', '', 'Officiële feestdagen', '🐣', '#8B5CF6', '#F5F3FF', 'عيد الفصح والقيامة المسيحي', 'ፋሲካ', 'faasikaa (paasii)', 'Easter', 'Met Pasen zoeken kinderen geschilderde eieren in de tuin.'],
  ['Tweede Paasdag', 'Tweede Paasdag', '', 'Officiële feestdagen', '🌷', '#8B5CF6', '#F5F3FF', 'ثاني أيام عيد الفصح (إثنين الفصح)', 'ካልኣይ መዓልቲ ፋሲካ', 'guyyaa lammaffaa faasikaa', 'Easter Monday', 'Tweede Paasdag is in Nederland een officiële vrije dag.'],
  ['Koningsdag', 'Koningsdag', '', 'Officiële feestdagen', '👑', '#F97316', '#FFF7ED', 'يوم الملك الوطني الهولندي (27 أبريل)', 'መዓልቲ ንጉስ (ኮኒንግስዳግ)', 'guyyaa mootichaa (Koningsdag)', 'King\'s Day (27 April)', 'Op Koningsdag kleurt heel Nederland oranje en zijn er vrijmarkten.'],
  ['Dodenherdenking', 'Dodenherdenking', '', 'Officiële feestdagen', '🕯️', '#1E293B', '#F8FAFC', 'يوم ذكرى ضحايا الحروب (4 مايو، دقيقتان صمت)', 'መዘከርታ ሙዉታት (4 ግንቦት)', 'guyyaa yaadannoo warra du\'anii', 'Remembrance of the Dead (4 May)', 'Op 4 mei om acht uur \'s avonds is Nederland twee minuten stil.'],
  ['Bevrijdingsdag', 'Bevrijdingsdag', '', 'Officiële feestdagen', '✌️', '#2563EB', '#EFF6FF', 'عيد التحرير الوطني واستعادة الحرية (5 مايو)', 'መዓልቲ ሓርነት (5 ግንቦት)', 'guyyaa bilisummaa (5 May)', 'Liberation Day (5 May)', 'Op 5 mei vieren we de vrijheid en democratie in Nederland.'],
  ['Hemelvaartsdag', 'Hemelvaartsdag', '', 'Officiële feestdagen', '☁️', '#8B5CF6', '#F5F3FF', 'عيد الصعود المسيحي (خميس الصعود)', 'ዕርገት', 'guyyaa olba\'iinsaa', 'Ascension Day', 'Hemelvaartsdag valt altijd op een donderdag, 40 dagen na Pasen.'],
  ['Pinksteren', 'Pinksteren', '', 'Officiële feestdagen', '🕊️', '#8B5CF6', '#F5F3FF', 'عيد العنصرة (خمسين يوماً بعد الفصح)', 'ጰራቅሊጦስ (ጰንጠቆስጢ)', 'guyyaa afuura qulqulluu (Pinksteren)', 'Pentecost / Whitsun', 'Pinksteren markeert de komst van de Heilige Geest.'],
  ['Tweede Pinksterdag', 'Tweede Pinksterdag', '', 'Officiële feestdagen', '🌿', '#8B5CF6', '#F5F3FF', 'ثاني أيام عيد العنصرة (إثنين العنصرة)', 'ካልኣይ መዓልቲ ጰንጠቆስጢ', 'guyyaa lammaffaa pinkistarii', 'Whit Monday', 'Op Tweede Pinksterdag hebben de meeste mensen een vrije dag.'],
  ['Keti Koti', 'Keti Koti', '', 'Officiële feestdagen', '⛓️', '#10B981', '#ECFDF5', 'يوم كيتي كوتي (ذكرى إلغاء العبودية في 1 يوليو)', 'ኬቲ ኮቲ (መዓልቲ ምብቃዕ ባርነት)', 'guyyaa xumura garbummaa (Keti Koti)', 'Keti Koti (Abolition of Slavery)', 'Keti Koti betekent \'ketenen verbroken\' en viert de afschaffing van de slavernij.'],
  ['Sinterklaas', 'Sinterklaas', '', 'Officiële feestdagen', '🎁', '#DC2626', '#FEF2F2', 'عيد القديس نيقولاوس الشعبي للأطفال (5 ديسمبر)', 'ሲንተርክላስ (በዓል ህያባት ቆልዑ)', 'ayyaana qulqulluu Niikoolaas (Sinterklaas)', 'Saint Nicholas (5 December)', 'Sinterklaas brengt pakjes en chocoladeletters aan alle kinderen.'],
  ['Kerstmis', 'Kerstmis', '', 'Officiële feestdagen', '🎄', '#059669', '#ECFDF5', 'عيد الميلاد المجيد (أول أيام الكريسماس 25 ديسمبر)', 'ልደት (ከርስመስ)', 'ayyaana dhaloota qorichaa (Kerstmis)', 'Christmas (25 December)', 'Met Kerstmis dineren families gezellig samen bij de kerstboom.'],
  ['Tweede Kerstdag', 'Tweede Kerstdag', '', 'Officiële feestdagen', '🌟', '#059669', '#ECFDF5', 'ثاني أيام عيد الميلاد (26 ديسمبر)', 'ካልኣይ መዓልቲ ልደት', 'guyyaa lammaffaa keersimaasii', 'Boxing Day (26 December)', 'Tweede Kerstdag is in Nederland een officiële feestdag.'],
  ['Oudejaarsavond', 'Oudejaarsavond', '', 'Officiële feestdagen', '🎆', '#8B5CF6', '#F5F3FF', 'ليلة رأس السنة ووداع العام القديم (31 ديسمبر)', 'ምሸት መፋነው ዓመት', 'galgala dhuma waggaa', 'New Year\'s Eve (31 December)', 'Op Oudejaarsavond eten we traditionele oliebollen en steken we vuurwerk af.']
];

const newCategoryItems = [];
[...dagenVanDeWeek, ...maandenVanHetJaar, ...officieleFeestdagen].forEach(item => {
  const [word, lemma, article, cat, icon, color, bg, ar, ti, om, en, ex] = item;
  const id = `newcat_${lemma.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
  newCategoryItems.push({
    id: id,
    word: word,
    lemma: lemma,
    article: article,
    category: cat,
    translations: { ar, ti, om, en },
    example: ex,
    svg: generateSvgCard(id, color, bg, icon)
  });
});

console.log(`Generated ${newCategoryItems.length} items for new categories.`);

// Combine all:
const masterCleanList = [
  ...finalNonNumberWords,
  ...numbersToAdd,
  ...newCategoryItems
];

// Deduplicate by word
const seen = new Set();
const finalDeduplicated = [];

masterCleanList.forEach(w => {
  const key = w.word.toLowerCase().trim();
  if (!seen.has(key)) {
    seen.add(key);
    finalDeduplicated.push(w);
  }
});

console.log(`===============================================`);
console.log(`TOTAL CLEAN MASTER WORDS: ${finalDeduplicated.length}`);
console.log(`===============================================`);

// Write out to JSON and JS
const jsonPath = path.join(__dirname, '..', 'data', 'words.json');
const jsPath = path.join(__dirname, '..', 'data', 'words.js');

fs.writeFileSync(jsonPath, JSON.stringify(finalDeduplicated, null, 2), 'utf-8');
console.log(`Written to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Woorden Database (${finalDeduplicated.length} Woorden)
 * Generated: ${new Date().toISOString()}
 * Total words: ${finalDeduplicated.length}
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(finalDeduplicated, null, 2)};
`;
fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Written to ${jsPath}`);
