const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/words.json');
const dataJsonPath = path.join(__dirname, '../data/words.json');
const dataJsPath = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(srcPath, 'utf8'));
const existing = new Set(words.map(w => (w.lemma || w.word).toLowerCase()));

function makeSvg(color, icon) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <rect width="240" height="240" rx="36" fill="${color}" fill-opacity="0.12"/>
  <text x="120" y="145" font-size="88" text-anchor="middle" font-family="'Segoe UI Emoji', AppleColorEmoji, sans-serif">${icon}</text>
</svg>`;
}

const newItems = [
  // --- PRE-A1 DAILY NOUNS ---
  {
    word: 'de pasta', lemma: 'pasta', article: 'de', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'المعكرونة', syr: 'المعكرونة', ti: 'ፓስታ', om: 'Paastaa', so: 'baasto', en: 'pasta' },
    example: 'We eten vanavond pasta met tomatensaus.',
    simple_example: 'Lekkere pasta.',
    svg: makeSvg('#F59E0B', '🍝')
  },
  {
    word: 'het sap', lemma: 'sap', article: 'het', category: 'Eten & Drinken', level: 'Pre-A1',
    translations: { ar: 'العصير', syr: 'العصير', ti: 'ጽማቝ', om: 'Cuunfaa', so: 'casiir', en: 'juice' },
    example: 'Ik drink een glas koud sinaasappelsap.',
    simple_example: 'Zoet sap.',
    svg: makeSvg('#FB923C', '🧃')
  },
  {
    word: 'de beker', lemma: 'beker', article: 'de', category: 'Huis & Keuken', level: 'Pre-A1',
    translations: { ar: 'الكوب', syr: 'الكاسة / المج', ti: 'ኩባያ', om: 'Kubbayyaa', so: 'koob', en: 'mug / cup' },
    example: 'De beker staat op de keukentafel.',
    simple_example: 'Een warme beker melk.',
    svg: makeSvg('#3B82F6', '🥛')
  },
  {
    word: 'de fles', lemma: 'fles', article: 'de', category: 'Huis & Keuken', level: 'Pre-A1',
    translations: { ar: 'القنينة / الزجاجة', syr: 'القنينة', ti: 'ጥርሙዝ', om: 'Qaruuraa', so: 'dhalo', en: 'bottle' },
    example: 'Er zit vers water in de fles.',
    simple_example: 'Een fles water.',
    svg: makeSvg('#06B6D4', '🍾')
  },
  {
    word: 'de pot', lemma: 'pot', article: 'de', category: 'Huis & Keuken', level: 'Pre-A1',
    translations: { ar: 'المرطبان / الوعاء', syr: 'المرطبان', ti: 'ዕትሮ', om: 'Qodaa', so: 'dhalo/weel', en: 'jar / pot' },
    example: 'De pot pindakaas is bijna leeg.',
    simple_example: 'Een glazen pot.',
    svg: makeSvg('#D97706', '🍯')
  },
  {
    word: 'de shampoo', lemma: 'shampoo', article: 'de', category: 'Verzorging', level: 'Pre-A1',
    translations: { ar: 'الشامبو', syr: 'الشامبو', ti: 'ሻምፖ', om: 'Shaampuu', so: 'shaambo', en: 'shampoo' },
    example: 'Ik was mijn haar met zachte shampoo.',
    simple_example: 'Fles shampoo.',
    svg: makeSvg('#8B5CF6', '🧴')
  },
  {
    word: 'de kam', lemma: 'kam', article: 'de', category: 'Verzorging', level: 'Pre-A1',
    translations: { ar: 'المشط', syr: 'المشط', ti: 'መመሸጢ', om: 'Filtoo', so: 'feedho', en: 'comb' },
    example: 'Ik kam mijn haren voor de spiegel.',
    simple_example: 'Een houten kam.',
    svg: makeSvg('#10B981', '🪮')
  },
  {
    word: 'de borstel', lemma: 'borstel', article: 'de', category: 'Verzorging', level: 'Pre-A1',
    translations: { ar: 'الفرشاة', syr: 'الفرشاية', ti: 'ብሩሽ', om: 'Birooshii', so: 'buraash', en: 'brush' },
    example: 'Poets je tanden goed met de borstel.',
    simple_example: 'Een tandenborstel.',
    svg: makeSvg('#EC4899', '🪥')
  },
  {
    word: 'de stekker', lemma: 'stekker', article: 'de', category: 'Elektronica', level: 'Pre-A1',
    translations: { ar: 'القابس الكهربائي', syr: 'الفيش / القابس', ti: 'ፕላግ', om: 'Istakkarii', so: 'fur / fiish', en: 'plug' },
    example: 'Steek de stekker in het stopcontact.',
    simple_example: 'Een stekker.',
    svg: makeSvg('#6B7280', '🔌')
  },
  {
    word: 'de oplader', lemma: 'oplader', article: 'de', category: 'Elektronica', level: 'Pre-A1',
    translations: { ar: 'الشاحن', syr: 'الشاحن', ti: 'ቻርጀር', om: 'Chaarjara', so: 'jaarjare', en: 'charger' },
    example: 'Waar is de oplader van mijn telefoon?',
    simple_example: 'Telefoon oplader.',
    svg: makeSvg('#10B981', '🔋')
  },
  {
    word: 'het scherm', lemma: 'scherm', article: 'het', category: 'Elektronica', level: 'Pre-A1',
    translations: { ar: 'الشاشة', syr: 'الشاشة', ti: 'ስክሪን', om: 'Iskiriinii', so: 'shaashad', en: 'screen' },
    example: 'Kijk naar het grote scherm in de klas.',
    simple_example: 'Een helder scherm.',
    svg: makeSvg('#3B82F6', '🖥️')
  },
  {
    word: 'het toetsenbord', lemma: 'toetsenbord', article: 'het', category: 'Elektronica', level: 'Pre-A1',
    translations: { ar: 'لوحة المفاتيح', syr: 'الكيبورد / لوحة المفاتيح', ti: 'ኪቦርድ', om: 'Kiiboordii', so: 'kiiboodh', en: 'keyboard' },
    example: 'Ik typ Nederlandse woorden op het toetsenbord.',
    simple_example: 'Computer toetsenbord.',
    svg: makeSvg('#6366F1', '⌨️')
  },
  {
    word: 'het papier', lemma: 'papier', article: 'het', category: 'School & Kantoor', level: 'Pre-A1',
    translations: { ar: 'الورق', syr: 'الورق', ti: 'ወረቐት', om: 'Waraqaa', so: 'warqad', en: 'paper' },
    example: 'Schrijf je naam op het witte papier.',
    simple_example: 'Een vel papier.',
    svg: makeSvg('#9CA3AF', '📄')
  },
  {
    word: 'de portemonnee', lemma: 'portemonnee', article: 'de', category: 'Geld & Betalen', level: 'Pre-A1',
    translations: { ar: 'المحفظة', syr: 'الجزدان / المحفظة', ti: 'ቦርሳ ገንዘብ', om: 'Korsii', so: 'boorsada lacagta', en: 'wallet' },
    example: 'Mijn pinpas zit in mijn portemonnee.',
    simple_example: 'Een kleine portemonnee.',
    svg: makeSvg('#8B5CF6', '👛')
  },
  {
    word: 'de pantoffel', lemma: 'pantoffel', article: 'de', category: 'Kleding', level: 'Pre-A1',
    translations: { ar: 'خف المنزل / الشباشب', syr: 'البابوج / المشاية', ti: 'ሻሓጢት ገዛ', om: 'Kophee manaa', so: 'dacas / dacaska guriga', en: 'slipper' },
    example: 'Thuis loop ik op warme pantoffels.',
    simple_example: 'Zachte pantoffels.',
    svg: makeSvg('#F43F5E', '🥿')
  },
  {
    word: 'de maan', lemma: 'maan', article: 'de', category: 'Natuur & Weer', level: 'Pre-A1',
    translations: { ar: 'القمر', syr: 'القمر', ti: 'ወርሒ', om: 'Baati / Ji\'a', so: 'dayax', en: 'moon' },
    example: '\'s Nachts schijnt de volle maan.',
    simple_example: 'Een ronde maan.',
    svg: makeSvg('#FBBF24', '🌙')
  },
  {
    word: 'de kou', lemma: 'kou', article: 'de', category: 'Natuur & Weer', level: 'Pre-A1',
    translations: { ar: 'البرد / الصقيع', syr: 'البرد', ti: 'ቁሪ', om: 'Qorra', so: 'qabow', en: 'cold' },
    example: 'Trek een dikke jas aan tegen de kou.',
    simple_example: 'Veel kou.',
    svg: makeSvg('#06B6D4', '❄️')
  },
  {
    word: 'de warmte', lemma: 'warmte', article: 'de', category: 'Natuur & Weer', level: 'Pre-A1',
    translations: { ar: 'الدفء / الحرارة', syr: 'الدفا / الحرارة', ti: 'ዋዒ', om: 'Ho\'a', so: 'kuleyl / diirimaad', en: 'warmth' },
    example: 'De kachel geeft fijne warmte in huis.',
    simple_example: 'Aangename warmte.',
    svg: makeSvg('#EF4444', '🔥')
  },
  {
    word: 'de dag', lemma: 'dag', article: 'de', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'اليوم / النهار', syr: 'اليوم / النهار', ti: 'መዓልቲ', om: 'Guyyaa', so: 'maalin', en: 'day' },
    example: 'Vandaag is een fijne zonnige dag.',
    simple_example: 'Een mooie dag.',
    svg: makeSvg('#F59E0B', '☀️')
  },
  {
    word: 'het jaar', lemma: 'jaar', article: 'het', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'السنة / العام', syr: 'السنة', ti: 'ዓመት', om: 'Waggaa', so: 'sano', en: 'year' },
    example: 'Ik woon nu één jaar in Nederland.',
    simple_example: 'Een nieuw jaar.',
    svg: makeSvg('#10B981', '📅')
  },
  {
    word: 'de maand', lemma: 'maand', article: 'de', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'الشهر', syr: 'الشهر', ti: 'ወርሒ', om: 'Ji\'a', so: 'bil', en: 'month' },
    example: 'Volgende maand begint mijn cursus.',
    simple_example: 'Deze maand.',
    svg: makeSvg('#3B82F6', '🗓️')
  },
  {
    word: 'het uur', lemma: 'uur', article: 'het', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'الساعة (الوقت)', syr: 'الساعة', ti: 'ሰዓት', om: 'Sa\'aatii', so: 'saacad', en: 'hour' },
    example: 'De Nederlandse les duurt twee uur.',
    simple_example: 'Eén uur.',
    svg: makeSvg('#6366F1', '⏱️')
  },
  {
    word: 'de minuut', lemma: 'minuut', article: 'de', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'الدقيقة', syr: 'الدقيقة', ti: 'ደቒቕ', om: 'Daqiiqaa', so: 'daqiiqad', en: 'minute' },
    example: 'Wacht even vijf minuten op mij.',
    simple_example: 'Tien minuten.',
    svg: makeSvg('#EC4899', '⏲️')
  },
  {
    word: 'de seconde', lemma: 'seconde', article: 'de', category: 'Tijd', level: 'Pre-A1',
    translations: { ar: 'الثانية', syr: 'الثانية', ti: 'ካልኢት', om: 'Sekondii', so: 'ilbiriqsi', en: 'second' },
    example: 'Er zitten zestig seconden in een minuut.',
    simple_example: 'Eén seconde.',
    svg: makeSvg('#F43F5E', '⚡')
  },

  // --- A1 HOUSEHOLD & STORE NOUNS ---
  {
    word: 'de theelepel', lemma: 'theelepel', article: 'de', category: 'Huis & Keuken', level: 'A1',
    translations: { ar: 'ملعقة الشاي', syr: 'معلقة الشاي الصغيرة', ti: 'ናይ ሻሂ ማንካ', om: 'Fal\'aana shaayii', so: 'qaadada shaaha', en: 'teaspoon' },
    example: 'Ik roer de suiker met een theelepel.',
    simple_example: 'Een kleine theelepel.',
    svg: makeSvg('#9CA3AF', '🥄')
  },
  {
    word: 'de waterkoker', lemma: 'waterkoker', article: 'de', category: 'Huis & Keuken', level: 'A1',
    translations: { ar: 'غلاية الماء', syr: 'غلاية المي / الكاتل', ti: 'መፍልሒ ማይ', om: 'Danfisa bishaanii', so: 'kettle / kiliyaha biyaha', en: 'electric kettle' },
    example: 'Zet de waterkoker aan voor een kop thee.',
    simple_example: 'Een snelle waterkoker.',
    svg: makeSvg('#06B6D4', '🫖')
  },
  {
    word: 'de magnetron', lemma: 'magnetron', article: 'de', category: 'Huis & Keuken', level: 'A1',
    translations: { ar: 'الميكروويف', syr: 'الميكروويف', ti: 'ማይክሮዌቭ', om: 'Maayikirooweevii', so: 'makaraweef', en: 'microwave' },
    example: 'Ik warm het eten op in de magnetron.',
    simple_example: 'Eten in de magnetron.',
    svg: makeSvg('#6366F1', '📻')
  },
  {
    word: 'de stofzuiger', lemma: 'stofzuiger', article: 'de', category: 'Huis & Wonen', level: 'A1',
    translations: { ar: 'المكنسة الكهربائية', syr: 'المكنسة الكهربا', ti: 'ናይ ኤሌክትሪክ መኮስተሪ', om: 'Qulqulleessituu kosii', so: 'mashiinka boodhka', en: 'vacuum cleaner' },
    example: 'Op zaterdagochtend gebruik ik de stofzuiger.',
    simple_example: 'De vloer stofzuigen.',
    svg: makeSvg('#10B981', '🧹')
  },
  {
    word: 'het wasmiddel', lemma: 'wasmiddel', article: 'het', category: 'Huis & Wonen', level: 'A1',
    translations: { ar: 'مسحوق الغسيل', syr: 'دواء الغسيل / مسحوق الغسيل', ti: 'ናይ ምሕጻብ ሳሙና', om: 'Saamunaa uffataa', so: 'saabuunta dharka', en: 'laundry detergent' },
    example: 'Doe het wasmiddel in de wasmachine.',
    simple_example: 'Vloeibaar wasmiddel.',
    svg: makeSvg('#3B82F6', '🧼')
  },
  {
    word: 'het wasrek', lemma: 'wasrek', article: 'het', category: 'Huis & Wonen', level: 'A1',
    translations: { ar: 'منشر الغسيل', syr: 'منشر الغسيل', ti: 'መደርደሪ ክዳውንቲ', om: 'Sirna uffata gogsuu', so: 'qalajiyaha dharka', en: 'drying rack' },
    example: 'De natte kleren hangen aan het wasrek.',
    simple_example: 'Kleren op het wasrek.',
    svg: makeSvg('#F59E0B', '🧺')
  },
  {
    word: 'de vuilnisbak', lemma: 'vuilnisbak', article: 'de', category: 'Huis & Wonen', level: 'A1',
    translations: { ar: 'سلة المهملات', syr: 'سلة الزبالة / المهملات', ti: 'ሳጹን ጐሓፍ', om: 'Qodaa kosii', so: 'baaldiga qashinka', en: 'trash can' },
    example: 'Gooi het lege pakje in de vuilnisbak.',
    simple_example: 'Een schone vuilnisbak.',
    svg: makeSvg('#6B7280', '🗑️')
  },
  {
    word: 'de kassa', lemma: 'kassa', article: 'de', category: 'Winkelen', level: 'A1',
    translations: { ar: 'صندوق الدفع / الكاشير', syr: 'الكاشير / الكاسا', ti: 'ቦታ ክፍሊት', om: 'Bakka kaffaltii', so: 'khasnadda lacag-bixinta', en: 'checkout / cash register' },
    example: 'Ik reken mijn boodschappen af bij de kassa.',
    simple_example: 'Bij kassa drie.',
    svg: makeSvg('#10B981', '🛒')
  },
  {
    word: 'de winkelwagen', lemma: 'winkelwagen', article: 'de', category: 'Winkelen', level: 'A1',
    translations: { ar: 'عربة التسوق', syr: 'عربة التسوق (الشاريو)', ti: 'ዓረብያ ዕዳጋ', om: 'Gaarii bittowwan', so: 'gaariga suuqa', en: 'shopping cart' },
    example: 'Doe een muntje in de winkelwagen.',
    simple_example: 'Een volle winkelwagen.',
    svg: makeSvg('#EF4444', '🛒')
  },
  {
    word: 'het winkelmandje', lemma: 'winkelmandje', article: 'het', category: 'Winkelen', level: 'A1',
    translations: { ar: 'سلة التسوق الصغيرة', syr: 'سلة التسوق باليد', ti: 'ናይ ኢድ ቅርጫት', om: 'Qodaa harkaa bittowwan', so: 'dambiisha suuqa', en: 'shopping basket' },
    example: 'Voor een paar spulletjes neem ik een winkelmandje.',
    simple_example: 'Een rood winkelmandje.',
    svg: makeSvg('#F59E0B', '🧺')
  },

  // --- C1 & C2 ADVANCED ACADEMIC NOUNS ---
  {
    word: 'de beleidsnota', lemma: 'beleidsnota', article: 'de', category: 'Bestuur & Politiek', level: 'C1',
    translations: { ar: 'المذكرة التوجيهية / وثيقة السياسات', syr: 'وثيقة السياسات الحكومية', ti: 'ናይ ፖሊሲ ሰነድ', om: 'Qajeelcha imaammataa', so: 'warqadda siyaasadda', en: 'policy memorandum' },
    example: 'De minister presenteerde een integrale beleidsnota aan de Kamer.',
    simple_example: 'De nieuwe beleidsnota.',
    svg: makeSvg('#3B82F6', '📑')
  },
  {
    word: 'de kaderovereenkomst', lemma: 'kaderovereenkomst', article: 'de', category: 'Recht & Economie', level: 'C1',
    translations: { ar: 'الاتفاقية الإطارية', syr: 'الاتفاق الإطاري', ti: 'መዋቕራዊ ስምምዕ', om: 'Waliigaltee bu\'uuraa', so: 'heshiis qaab-dhismeed', en: 'framework agreement' },
    example: 'Beide partijen ondertekenden een meerjarige kaderovereenkomst.',
    simple_example: 'Een bindende kaderovereenkomst.',
    svg: makeSvg('#6366F1', '🤝')
  },
  {
    word: 'de duurzaamheidstransitie', lemma: 'duurzaamheidstransitie', article: 'de', category: 'Milieu & Samenleving', level: 'C1',
    translations: { ar: 'التحول نحو الاستدامة', syr: 'التحول للطاقة المستدامة والبيئة', ti: 'ቀጻልነት ዘለዎ ምስግጋር', om: 'Ce\'umsa itti fufiinsa qabu', so: 'u-gudubka waaritaanka deegaanka', en: 'sustainability transition' },
    example: 'De versnelling van de duurzaamheidstransitie vereist forse innovaties.',
    simple_example: 'De duurzaamheidstransitie.',
    svg: makeSvg('#10B981', '🌱')
  },
  {
    word: 'de rechtmatigheid', lemma: 'rechtmatigheid', article: 'de', category: 'Recht & Wetgeving', level: 'C1',
    translations: { ar: 'المشروعية القانونية', syr: 'الشرعية والقانونية', ti: 'ሕጋውነት', om: 'Seera qabeessummaa', so: 'sharcinnimada / xalaalnimada', en: 'lawfulness / legality' },
    example: 'De rechter toetste de formele rechtmatigheid van het bestuursbesluit.',
    simple_example: 'De formele rechtmatigheid.',
    svg: makeSvg('#8B5CF6', '⚖️')
  },
  {
    word: 'de doelmatigheid', lemma: 'doelmatigheid', article: 'de', category: 'Bestuur & Beleid', level: 'C1',
    translations: { ar: 'الكفاءة والفعالية التوجيهية', syr: 'الفعالية والجدوى', ti: 'ውጽኢታውነት', om: 'Galma gahiinsaa', so: 'waxtarka iyo waxtarnimada', en: 'effectiveness / efficiency' },
    example: 'De Rekenkamer onderzocht de financiële doelmatigheid van het project.',
    simple_example: 'Bewezen doelmatigheid.',
    svg: makeSvg('#EC4899', '🎯')
  },
  {
    word: 'de paradigmaverschuiving', lemma: 'paradigmaverschuiving', article: 'de', category: 'Wetenschap & Filosofie', level: 'C2',
    translations: { ar: 'تغير النموذج الفكري الجذري', syr: 'النقلة النوعية الجذرية بالتفكير', ti: 'መሰረታዊ ለውጢ ኣተሓሳስባ', om: 'Jijjiirama ilaalcha bu\'uuraa', so: 'isbeddel weyn oo dhanka aragtida ah', en: 'paradigm shift' },
    example: 'Deze ontdekking veroorzaakte een fundamentele paradigmaverschuiving in de fysica.',
    simple_example: 'Een wetenschappelijke paradigmaverschuiving.',
    svg: makeSvg('#F43F5E', '🌌')
  },
  {
    word: 'de kwintessens', lemma: 'kwintessens', article: 'de', category: 'Taal & Filosofie', level: 'C2',
    translations: { ar: 'الجوهر الخالص / اللب الأساسي', syr: 'الجوهر وخلاصة الشي', ti: 'ቐንዲ ፍረ ነገር', om: 'Waan hunda caalaa barbaachisaa', so: 'nuxurka ugu muhiimsan', en: 'quintessence' },
    example: 'De kwintessens van het betoog lag besloten in de slotconclusie.',
    simple_example: 'De zuivere kwintessens.',
    svg: makeSvg('#D97706', '💎')
  },
  {
    word: 'de discretie', lemma: 'discretie', article: 'de', category: 'Ethiek & Beroep', level: 'C2',
    translations: { ar: 'الكتمان والسرية المهنية', syr: 'السرية التامة والكتمان', ti: 'ምስጢር ምዕቃብ', om: 'Iccitii eeguu', so: 'sir-hayeennimo iyo kalsooni', en: 'discretion / confidentiality' },
    example: 'In dergelijke delicate kwesties wordt absolute discretie betracht.',
    simple_example: 'Uiterste discretie.',
    svg: makeSvg('#475569', '🤫')
  }
];

let added = 0;
newItems.forEach((item, idx) => {
  const key = item.lemma.toLowerCase();
  if (!existing.has(key)) {
    const id = `word_${item.lemma}_add_${Date.now()}_${idx}`;
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
      simple_example_translations: { ...item.translations },
      example_translations: { ...item.translations },
      svg: item.svg
    });
    existing.add(key);
    added++;
  }
});

fs.writeFileSync(srcPath, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(words, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Successfully added', added, 'new vocabulary items. Total words now:', words.length);
