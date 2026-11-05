const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/words.json');
const dataJsonPath = path.join(__dirname, '../data/words.json');
const dataJsPath = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

// Helper to convert Arabic translation to authentic Syrian Arabic
function arToSyrianWord(arText) {
  if (!arText) return '';
  let s = arText.trim();
  const dict = {
    'الماء': 'المي / الماء',
    'ماء': 'مي',
    'الخبز': 'الخبز',
    'السيارة': 'السيارة',
    'المنزل': 'البيت',
    'منزل': 'بيت',
    'النقود': 'المصاري',
    'نقود': 'مصاري',
    'المستشفى': 'المشفى',
    'مستشفى': 'مشفى',
    'الطبيب': 'الدكتور / الحكيم',
    'طبيب': 'دكتور',
    'الدراجة': 'البسكليت',
    'دراجة': 'بسكليت',
    'الحافلة': 'الباص',
    'حافلة': 'باص',
    'القطار': 'القطار',
    'الحقيبة': 'الشنطة',
    'حقيبة': 'شنطة',
    'النافذة': 'الشباك',
    'نافذة': 'شباك',
    'السرير': 'التخت',
    'سرير': 'تخت',
    'الكرسي': 'الكرسي',
    'الطاولة': 'الطاولة',
    'العمل': 'الشغل / العمل',
    'عمل': 'شغل',
    'المصعد': 'الأسانسير / المصعد',
    'القمامة': 'الزبالة / القمامة',
    'قمامة': 'زبالة',
    'الحذاء': 'الصباط / الحذاء',
    'حذاء': 'صباط',
    'المعطف': 'الجاكيت / المعطف',
    'معطف': 'جاكيت',
    'الوشاح': 'الشال / اللفحة',
    'وشاح': 'شال',
    'القبعة': 'الطاقية / الكسكيطة',
    'قبعة': 'طاقية',
    'الشاي': 'الشاي',
    'القهوة': 'القهوة',
    'السكر': 'السكر',
    'الملح': 'الملح',
    'الملعقة': 'المعلقة',
    'ملعقة': 'معلقة',
    'الشوكة': 'الشوكة',
    'السكين': 'السكين',
    'الصحن': 'الصحن',
    'القدر': 'الطنجرة',
    'قدر': 'طنجرة',
    'الموز': 'الموز',
    'البرتقال': 'البرتقال',
    'التفاح': 'التفاح',
    'اللحم': 'اللحمة',
    'لحم': 'لحمة',
    'الدجاج': 'الجّاج / الدجاج',
    'دجاج': 'جّاج',
    'السمك': 'السمك',
    'سمك': 'سمك',
    'الأرز': 'الرز',
    'أرز': 'رز',
    'البطاطس': 'البطاطا',
    'بطاطس': 'بطاطا',
    'الطماطم': 'البندورة',
    'طماطم': 'بندورة',
    'الخيار': 'الخيار',
    'البصل': 'البصل',
    'الثوم': 'التوم',
    'الحليب': 'الحليب'
  };

  if (dict[s]) return dict[s];

  s = s.replace(/الآن/g, 'هلأ');
  s = s.replace(/كثيراً/g, 'كتير');
  s = s.replace(/جداً/g, 'كتير');
  s = s.replace(/هنا/g, 'هون');
  s = s.replace(/هناك/g, 'هنيك');
  s = s.replace(/هذا/g, 'هاد');
  s = s.replace(/هذه/g, 'هاي');
  s = s.replace(/طبيب/g, 'دكتور');
  s = s.replace(/مستشفى/g, 'مشفى');
  s = s.replace(/نقود/g, 'مصاري');
  return s;
}

function makeSvg(color, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <rect width="240" height="240" rx="36" fill="${color}" fill-opacity="0.12"/>
  <text x="120" y="145" font-size="88" text-anchor="middle" font-family="'Segoe UI Emoji', AppleColorEmoji, sans-serif">${icon}</text>
</svg>`;
}

// 1. Extra Pre-A1 Words (Daily basics, food, objects, body, routine)
const extraPreA1 = [
  {
    word: 'de thee', lemma: 'thee', article: 'de', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'الشاي', syr: 'الشاي', ti: 'ሻሂ', om: 'Shaayii', so: 'shaah', en: 'tea' },
    example: 'Ik drink een kop warme thee.',
    simple_example: 'Warme thee.',
    svg: makeSvg('#F59E0B', '🍵')
  },
  {
    word: 'de koffie', lemma: 'koffie', article: 'de', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'القهوة', syr: 'القهوة', ti: 'ቡን', om: 'Buna', so: 'bun', en: 'coffee' },
    example: 'Wilt u koffie met melk?',
    simple_example: 'Een kop koffie.',
    svg: makeSvg('#78350F', '☕')
  },
  {
    word: 'het ei', lemma: 'ei', article: 'het', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'البيضة', syr: 'البيضة', ti: 'እንቋቝሖ', om: 'Hanqaaquu', so: 'ukun', en: 'egg' },
    example: 'Ik kook een ei voor het ontbijt.',
    simple_example: 'Een gekookt ei.',
    svg: makeSvg('#FBBF24', '🥚')
  },
  {
    word: 'de banaan', lemma: 'banaan', article: 'de', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'الموزة', syr: 'الموزة', ti: 'ባናና', om: 'Muuzii', so: 'moos', en: 'banana' },
    example: 'De banaan is geel en zoet.',
    simple_example: 'Een gele banaan.',
    svg: makeSvg('#F59E0B', '🍌')
  },
  {
    word: 'de lepel', lemma: 'lepel', article: 'de', category: 'Huis & Wonen', level: 'Pre-A1',
    translations: { ar: 'الملعقة', syr: 'المعلقة', ti: 'ማንካ', om: 'Fal\'aana', so: 'madiicad', en: 'spoon' },
    example: 'Ik eet de soep met een lepel.',
    simple_example: 'Een soeplepel.',
    svg: makeSvg('#6B7280', '🥄')
  },
  {
    word: 'de vork', lemma: 'vork', article: 'de', category: 'Huis & Wonen', level: 'Pre-A1',
    translations: { ar: 'الشوكة', syr: 'الشوكة', ti: 'ፋርኬታ', om: 'Shookkaa', so: 'fargeeto', en: 'fork' },
    example: 'De vork ligt naast het bord.',
    simple_example: 'Een vork.',
    svg: makeSvg('#6B7280', '🍴')
  },
  {
    word: 'het mes', lemma: 'mes', article: 'het', category: 'Huis & Wonen', level: 'Pre-A1',
    translations: { ar: 'السكين', syr: 'السكين', ti: 'ካራ', om: 'Haaduu', so: 'mindi', en: 'knife' },
    example: 'Pas op, het mes is scherp.',
    simple_example: 'Een scherp mes.',
    svg: makeSvg('#6B7280', '🔪')
  },
  {
    word: 'het bord', lemma: 'bord', article: 'het', category: 'Huis & Wonen', level: 'Pre-A1',
    translations: { ar: 'الصحن', syr: 'الصحن', ti: 'ጻሕሊ', om: 'Saahinii', so: 'saxan', en: 'plate' },
    example: 'Het eten ligt op het bord.',
    simple_example: 'Een diep bord.',
    svg: makeSvg('#3B82F6', '🍽️')
  },
  {
    word: 'de muts', lemma: 'muts', article: 'de', category: 'Kleding', level: 'Pre-A1',
    translations: { ar: 'القبعة الصوفية', syr: 'الطاقية الصوف', ti: 'ቆብዕ', om: 'Kofiyyaa', so: 'koofiyad', en: 'beanie / winter cap' },
    example: 'In de winter draag ik een warme muts.',
    simple_example: 'Een warme muts.',
    svg: makeSvg('#EC4899', '🧢')
  },
  {
    word: 'de sjaal', lemma: 'sjaal', article: 'de', category: 'Kleding', level: 'Pre-A1',
    translations: { ar: 'الوشاح', syr: 'الشال / اللفحة', ti: 'መጐልበቢ', om: 'Shaashii', so: 'maryo-luquska', en: 'scarf' },
    example: 'Mijn sjaal beschermt mij tegen de wind.',
    simple_example: 'Een wollen sjaal.',
    svg: makeSvg('#8B5CF6', '🧣')
  },
  {
    word: 'de schoen', lemma: 'schoen', article: 'de', category: 'Kleding', level: 'Pre-A1',
    translations: { ar: 'الحذاء', syr: 'الصباط / الحذاء', ti: 'ጫማ', om: 'Kophee', so: 'kabu', en: 'shoe' },
    example: 'Ik trek mijn schoenen aan.',
    simple_example: 'Twee schoenen.',
    svg: makeSvg('#10B981', '👞')
  },
  {
    word: 'de hand', lemma: 'hand', article: 'de', category: 'Lichaam & Gezondheid', level: 'Pre-A1',
    translations: { ar: 'اليد', syr: 'الإيد', ti: 'ኢድ', om: 'Harka', so: 'gacan', en: 'hand' },
    example: 'Was je handen met zeep.',
    simple_example: 'Een schone hand.',
    svg: makeSvg('#F59E0B', '✋')
  },
  {
    word: 'het oog', lemma: 'oog', article: 'het', category: 'Lichaam & Gezondheid', level: 'Pre-A1',
    translations: { ar: 'العين', syr: 'العين', ti: 'ዓይኒ', om: 'Ija', so: 'il', en: 'eye' },
    example: 'Sluit je ogen als je gaat slapen.',
    simple_example: 'Twee ogen.',
    svg: makeSvg('#3B82F6', '👁️')
  },
  {
    word: 'het oor', lemma: 'oor', article: 'het', category: 'Lichaam & Gezondheid', level: 'Pre-A1',
    translations: { ar: 'الأذن', syr: 'الدان / الأذن', ti: 'እዝኒ', om: 'Gurra', so: 'dheg', en: 'ear' },
    example: 'Ik luister met mijn oren.',
    simple_example: 'Een oor.',
    svg: makeSvg('#F59E0B', '👂')
  },
  {
    word: 'de mond', lemma: 'mond', article: 'de', category: 'Lichaam & Gezondheid', level: 'Pre-A1',
    translations: { ar: 'الفم', syr: 'التم / الفم', ti: 'ኣፍ', om: 'Afaan', so: 'af', en: 'mouth' },
    example: 'Open uw mond bij de dokter.',
    simple_example: 'Een mond.',
    svg: makeSvg('#EF4444', '👄')
  },
  {
    word: 'de neus', lemma: 'neus', article: 'de', category: 'Lichaam & Gezondheid', level: 'Pre-A1',
    translations: { ar: 'الأنف', syr: 'الأنف / المنخار', ti: 'ኣፍንጫ', om: 'Funyaan', so: 'san', en: 'nose' },
    example: 'Ik adem door mijn neus.',
    simple_example: 'Mijn neus.',
    svg: makeSvg('#F59E0B', '👃')
  }
];

// 2. Extra A1 Words (Everyday integration & practical needs)
const extraA1 = [
  {
    word: 'de apotheek', lemma: 'apotheek', article: 'de', category: 'Gezondheid', level: 'A1',
    translations: { ar: 'الصيدلية', syr: 'الصيدلية', ti: 'ፋርማሲ', om: 'Faarmaasii', so: 'farmashiyaha', en: 'pharmacy' },
    example: 'Ik haal mijn medicijnen bij de apotheek.',
    simple_example: 'Naar de apotheek.',
    svg: makeSvg('#10B981', '💊')
  },
  {
    word: 'het recept', lemma: 'recept', article: 'het', category: 'Gezondheid', level: 'A1',
    translations: { ar: 'الوصفة الطبية', syr: 'الوصفة / الراشيتة', ti: 'ወረቐት መድሃኒት', om: 'Ajaja qorichaa', so: 'warqadda daawada', en: 'prescription' },
    example: 'De dokter geeft mij een recept mee.',
    simple_example: 'Een doktersrecept.',
    svg: makeSvg('#3B82F6', '📄')
  },
  {
    word: 'de koorts', lemma: 'koorts', article: 'de', category: 'Gezondheid', level: 'A1',
    translations: { ar: 'الحمى / السخونة', syr: 'الحرارة / السخونة', ti: 'ረስኒ', om: 'Ho\'ina qaamaa', so: 'qandho', en: 'fever' },
    example: 'Het kind heeft hoge koorts.',
    simple_example: 'Hoge koorts.',
    svg: makeSvg('#EF4444', '🌡️')
  },
  {
    word: 'de halte', lemma: 'halte', article: 'de', category: 'Vervoer', level: 'A1',
    translations: { ar: 'الموقف', syr: 'الموقف / محطة الباص', ti: 'መደበር', om: 'Buufata', so: 'joogsiga baska', en: 'bus stop' },
    example: 'Ik wacht bij de bushalte.',
    simple_example: 'Bij de halte.',
    svg: makeSvg('#3B82F6', '🚏')
  },
  {
    word: 'de vertraging', lemma: 'vertraging', article: 'de', category: 'Vervoer', level: 'A1',
    translations: { ar: 'التأخير', syr: 'التأخير / التأخير بالموعد', ti: 'ምድንጓይ', om: 'Turuu', so: 'dib u dhac', en: 'delay' },
    example: 'De trein heeft vijf minuten vertraging.',
    simple_example: 'Vijf minuten vertraging.',
    svg: makeSvg('#F59E0B', '⏱️')
  },
  {
    word: 'de brievenbus', lemma: 'brievenbus', article: 'de', category: 'Post & Gemeente', level: 'A1',
    translations: { ar: 'صندوق البريد', syr: 'صندوق البريد', ti: 'ሳጹን ፖስታ', om: 'Saanduqa poostaa', so: 'sanduuqa boostada', en: 'mailbox' },
    example: 'Er ligt post in de brievenbus.',
    simple_example: 'Een rode brievenbus.',
    svg: makeSvg('#EF4444', '📮')
  },
  {
    word: 'de afspraak', lemma: 'afspraak', article: 'de', category: 'Sociaal & Maatschappij', level: 'A1',
    translations: { ar: 'الموعد', syr: 'الموعد', ti: 'ቈጸራ', om: 'Beellama', so: 'ballan', en: 'appointment' },
    example: 'Ik heb een afspraak bij de gemeente.',
    simple_example: 'Een belangrijke afspraak.',
    svg: makeSvg('#6366F1', '📅')
  },
  {
    word: 'de pauze', lemma: 'pauze', article: 'de', category: 'Werk & Beroep', level: 'A1',
    translations: { ar: 'الاستراحة', syr: 'الاستراحة / الفسحة', ti: 'ዕረፍቲ', om: 'Boqonnaa', so: 'nasasho', en: 'break' },
    example: 'In de pauze drinken we koffie.',
    simple_example: 'Kwartier pauze.',
    svg: makeSvg('#10B981', '☕')
  }
];

// 3. Extra C1 & C2 Words (Academic, professional, deep vocabulary)
const extraC1C2 = [
  {
    word: 'de verordening', lemma: 'verordening', article: 'de', category: 'Maatschappij & Recht', level: 'C1',
    translations: { ar: 'اللائحة التنظيمية / المرسوم', syr: 'المرسوم / اللائحة القانونية', ti: 'መምርሒ ሕጊ', om: 'Dambii seeraa', so: 'xeer nidaamiye', en: 'regulation / ordinance' },
    example: 'De gemeentelijke verordening stelt strikte geluidsnormen vast.',
    simple_example: 'Een wettelijke verordening.',
    svg: makeSvg('#3B82F6', '📜')
  },
  {
    word: 'de nuance', lemma: 'nuance', article: 'de', category: 'Communicatie', level: 'C1',
    translations: { ar: 'الفارق الدقيق / التدرج', syr: 'التفصيل الدقيق / النغمة الدقيقة', ti: 'ደቂቕ ፍልልይ', om: 'Garaagarummaa xiqqaachaa', so: 'faahfaahin xeel-dheer', en: 'nuance / subtle difference' },
    example: 'In dit complexe maatschappelijk debat ontbreekt vaak elke nuance.',
    simple_example: 'Subtiele nuance.',
    svg: makeSvg('#8B5CF6', '🎭')
  },
  {
    word: 'de cohesie', lemma: 'cohesie', article: 'de', category: 'Maatschappij & Politiek', level: 'C1',
    translations: { ar: 'التماسك / الترابط المجتمعي', syr: 'التماسك والترابط الاجتماعي', ti: 'ምትእስሳር / ሓድነት', om: 'Tokkummaa hawaasummaa', so: 'isku-xirnaanta bulshada', en: 'social cohesion' },
    example: 'Sociale cohesie versterkt de leefbaarheid in diverse stadswijken.',
    simple_example: 'Sociale cohesie.',
    svg: makeSvg('#10B981', '🤝')
  },
  {
    word: 'de welsprekendheid', lemma: 'welsprekendheid', article: 'de', category: 'Taal & Communicatie', level: 'C2',
    translations: { ar: 'الفصاحة / البلاغة', syr: 'الفصاحة وحلاوة اللسان', ti: 'ብልሓት ዘረባ', om: 'Dandeettii haasaa', so: 'aftahanimo heer sare ah', en: 'eloquence' },
    example: 'Met ongeëvenaarde welsprekendheid overtuigde de spreker de voltallige zaal.',
    simple_example: 'Zeldzame welsprekendheid.',
    svg: makeSvg('#F59E0B', '🎙️')
  },
  {
    word: 'de onafwendbaarheid', lemma: 'onafwendbaarheid', article: 'de', category: 'Filosofie & Beleid', level: 'C2',
    translations: { ar: 'الحتمية / أمر لا مفر منه', syr: 'الحتمية / شغلة ما منها مهرب', ti: 'ዘይተርፍ ኩነት', om: 'Waan hin hafne', so: 'wax aan laga fursan karin', en: 'inevitability' },
    example: 'Men realiseerde zich de onafwendbaarheid van ingrijpende maatschappelijke hervormingen.',
    simple_example: 'Historische onafwendbaarheid.',
    svg: makeSvg('#EC4899', '⏳')
  },
  {
    word: 'de ambiguïteit', lemma: 'ambiguïteit', article: 'de', category: 'Taalwetenschap', level: 'C2',
    translations: { ar: 'الغموض / ازدواجية المعنى', syr: 'الغموض وتعدد المعاني', ti: 'ዝተሓላለኸ ትርጉም', om: 'Hiika dacha qabaachuu', so: 'madmadow xagga macnaha ah', en: 'ambiguity' },
    example: 'De ambiguïteit van de wettekst leidde tot uiteenlopende gerechtelijke interpretaties.',
    simple_example: 'Wettelijke ambiguïteit.',
    svg: makeSvg('#6366F1', '🔍')
  }
];

// Append all extra words
const allExtra = [...extraPreA1, ...extraA1, ...extraC1C2];
const existingWords = new Set(words.map(w => (w.lemma || w.word).toLowerCase()));

let addedWordsCount = 0;
allExtra.forEach(item => {
  const key = item.lemma.toLowerCase();
  if (!existingWords.has(key)) {
    const id = `word_${item.lemma}_${Date.now()}_${addedWordsCount}`;
    words.push({
      id,
      word: item.word,
      lemma: item.lemma,
      article: item.article,
      category: item.category,
      level: item.level,
      translations: item.translations,
      example: item.example,
      simple_example: item.simple_example,
      simple_example_translations: {
        ar: item.translations.ar,
        syr: item.translations.syr,
        ti: item.translations.ti,
        om: item.translations.om,
        so: item.translations.so,
        en: item.translations.en
      },
      example_translations: {
        ar: item.translations.ar,
        syr: item.translations.syr,
        ti: item.translations.ti,
        om: item.translations.om,
        so: item.translations.so,
        en: item.translations.en
      },
      svg: item.svg
    });
    existingWords.add(key);
    addedWordsCount++;
  }
});

// Update all words to have syr translations
words.forEach(w => {
  if (!w.translations) w.translations = {};
  if (!w.translations.syr || w.translations.syr.trim() === '') {
    w.translations.syr = arToSyrianWord(w.translations.ar || '');
  }

  if (w.simple_example_translations) {
    if (!w.simple_example_translations.syr || w.simple_example_translations.syr.trim() === '') {
      w.simple_example_translations.syr = arToSyrianWord(w.simple_example_translations.ar || w.translations.syr);
    }
  }

  if (w.example_translations) {
    if (!w.example_translations.syr || w.example_translations.syr.trim() === '') {
      w.example_translations.syr = arToSyrianWord(w.example_translations.ar || w.translations.syr);
    }
  }
});

fs.writeFileSync(srcPath, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(words, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Added', addedWordsCount, 'new words. Total words now:', words.length, 'all with Syrian translations.');
