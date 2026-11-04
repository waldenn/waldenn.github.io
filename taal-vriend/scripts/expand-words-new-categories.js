// scripts/expand-words-new-categories.js
// Adds 100s of words including 5 new dedicated categories:
// 1. Fietsonderdelen
// 2. Keukengerei
// 3. Standaard ingrediënten
// 4. Bekende maaltijden
// 5. Lichaamsdelen

const fs = require('fs');
const path = require('path');

const existingWords = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'words.json'), 'utf-8'));
console.log(`Current words before expansion: ${existingWords.length}`);

// Existing word set to avoid duplicate lemmas
const seenWords = new Set(existingWords.map(w => w.word.toLowerCase().trim()));

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
    <text x="120" y="140" font-size="54" font-family="'Segoe UI', Roboto, -apple-system, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${glyph}</text>
  </g>
</svg>`.trim();
}

const newCategoryBatches = [
  // 1. Fietsonderdelen (Bicycle Parts)
  {
    category: 'Fietsonderdelen',
    icon: '🚲',
    color: '#0284C7',
    bg: '#E0F2FE',
    words: [
      ['het zadel', 'zadel', 'het', 'مقعد الدراجة الهوائية', 'ኮረሻ ብሽክለታ', 'teessoo biskileetii', 'bicycle saddle', 'Zet het zadel op de juiste hoogte zodat je knieën niet pijn doen.'],
      ['het stuur', 'stuur', 'het', 'مقود الدراجة الهوائية', 'መሪሕ ብሽክለታ', 'isteeriingii biskileetii', 'handlebars', 'Houd altijd twee handen stevig aan het stuur.'],
      ['de fietsbel', 'fietsbel', 'de', 'جرس الدراجة للتنبيه', 'ደወል ብሽክለታ', 'bilbila biskileetii', 'bicycle bell', 'Bel even vriendelijk als je iemand wilt inhalen op het fietspad.'],
      ['de handrem', 'handrem', 'de', 'فرامل اليد على المقود', 'ፍሬን ኢድ', 'firiinii harka biskileetii', 'handbrake', 'Knijp rustig in de handremmen om geleidelijk te stoppen.'],
      ['de terugtraprem', 'terugtraprem', 'de', 'فرامل الدواسة الخلفية بالقدم', 'ፍሬን እግሪ ብሽክለታ', 'firiinii miilaa biskileetii', 'coaster brake / pedal brake', 'Met een terugtraprem rem je door naar achteren te trappen.'],
      ['de ketting', 'ketting', 'de', 'سلسلة الدراجة (الجنزير)', 'ሰንሰለት ብሽክለታ', 'sansalata biskileetii', 'bicycle chain', 'Smeer de ketting regelmatig in met een druppeltje kettingolie.'],
      ['de kettingkast', 'kettingkast', 'de', 'غطاء حماية سلسلة الدراجة', 'መሸፈኒ ሰንሰለት', 'qadaada sansalataa', 'chain guard / chaincase', 'De kettingkast beschermt je broekspijp tegen smeer.'],
      ['de trapper', 'trapper', 'de', 'دواسة الدراجة لتحريك القدمين', 'መድገፊ እግሪ (ፔዳል)', 'miiltoo biskileetii (pedal)', 'pedal', 'Zet je voet op de trapper en duw stevig naar beneden.'],
      ['de fietsband', 'fietsband', 'de', 'إطار عجلة الدراجة الهوائية', 'ጎማ ብሽክለታ', 'gommaa biskileetii', 'bicycle tyre / tire', 'Controleer of er genoeg lucht in de fietsband zit.'],
      ['de binnenband', 'binnenband', 'de', 'الأنبوب الداخلي المطاطي للإطار', 'ውሽጣዊ ጎማ (ካሜራ)', 'kaameraa gommaa keessaa', 'inner tube', 'Als je een lekke band hebt, moet de binnenband geplakt worden.'],
      ['de buitenband', 'buitenband', 'de', 'الإطار الخارجي المطاطي القوي', 'ደገዋይ ጎማ', 'gommaa alaa', 'outer tyre', 'Een buitenband met goed profiel voorkomt uitglijden bij regen.'],
      ['het ventiel', 'ventiel', 'het', 'صمام ضخ الهواء في الإطار', 'ቫልቭ (መምልኢ ንፋስ)', 'vaalveettii biskileetii', 'valve', 'Draai het dopje van het ventiel voor je de band oppompt.'],
      ['de fietspomp', 'fietspomp', 'de', 'منفاخ إطارات الدراجة اليدوي', 'መምልኢ ንፋስ (ፓምፕ)', 'afuuftuu gommaa biskileetii', 'bicycle pump', 'Zet de fietspomp recht op het ventiel en pomp de band hard op.'],
      ['de bandenplakset', 'bandenplakset', 'de', 'طقم أدوات ترقيع الإطارات المثقوبة', 'መሳርሒ ምልጋብ ጎማ', 'meeshaa gommaa suphan', 'puncture repair kit', 'Met een bandenplakset plak je zelf een gaatje in de band.'],
      ['het voorwiel', 'voorwiel', 'het', 'العجلة الأمامية للدراجة', 'ናይ ቅድሚት መንኰርኰር', 'gommaa fuulduraa', 'front wheel', 'Het voorwiel draait soepel in de voorvork.'],
      ['het achterwiel', 'achterwiel', 'het', 'العجلة الخلفية للدراجة', 'ናይ ድሕሪት መንኰርኰር', 'gommaa duubaa', 'rear wheel', 'Het achterwiel wordt aangedreven door de ketting.'],
      ['de spaken', 'spaken', 'de', 'أسلاك العجلة المعدنية الدقيقة', 'ሽቦታት መንኰርኰር (ስፖክ)', 'sibiila gommaa (spokes)', 'spokes', 'Zorg dat er geen spaken loszitten in het wiel.'],
      ['het ventieldopje', 'ventieldopje', 'het', 'غطاء صمام الهواء البلاستيكي', 'መኽደኒ ቫልቭ', 'qadaada vaalveettii', 'valve cap', 'Draai het ventieldopje weer stevig vast tegen vuil.'],
      ['de koplamp', 'koplamp', 'de', 'المصباح الأمامي الأبيض للدراجة', 'ናይ ቅድሚት መብራህቲ', 'ifa fuulduraa biskileetii', 'headlight / front light', 'Zet in het donker altijd je witte koplamp aan.'],
      ['het achterlicht', 'achterlicht', 'het', 'المصباح الخلفي الأحمر للدراجة', 'ናይ ድሕሪት መብራህቲ', 'ifa duubaa biskileetii', 'rear light / tail light', 'Een rood achterlicht zorgt dat automobilisten je goed zien.'],
      ['de bagagedrager', 'bagagedrager', 'de', 'حامل الحقائب والأمتعة الخلفي للدراجة', 'መቐመጢ ኣቕሓ (ባጋጅ)', 'baattuu qodaa biskileetii', 'luggage carrier / rack', 'Zet je boodschappentas stevig vast op de bagagedrager.'],
      ['de snelbinders', 'snelbinders', 'de', 'أحزمة الشد المطاطية على حامل الدراجة', 'ላስቲክ መእሰሪ ባጋጅ', 'haada gommaa biskileetii', 'bungee cords / luggage straps', 'Klem je rugzak vast onder de stevige snelbinders.'],
      ['het spatbord', 'spatbord', 'het', 'واقي الطين والرذاذ فوق العجلة', 'መከላኸሊ ጭቃ', 'ittistuu dhoqqee (spatbord)', 'mudguard / fender', 'Het spatbord voorkomt dat modder op je kleren spat.'],
      ['de standaard', 'standaard', 'de', 'حامل الدراجة للوقوف الثابت', 'መተከሊ ብሽክለታ (ስታንድ)', 'dhaabdusaa biskileetii', 'kickstand / bike stand', 'Klap de standaard uit als je de fiets parkeert.'],
      ['het fietsslot', 'fietsslot', 'het', 'قفل الدراجة الأساسي للتأمين', 'መዕጸዊ ብሽክለታ', 'kuflii biskileetii', 'bicycle lock', 'Vergrendel je fiets altijd met een ringslot én kettingslot.'],
      ['het kettingslot', 'kettingslot', 'het', 'قفل الجنزير الفولاذي القوي', 'ናይ ሰንሰለት መዕጸዊ', 'kuflii sansalataa', 'chain lock', 'Maak het kettingslot vast aan een stevige fietspaal.'],
      ['de versnelling', 'versnelling', 'de', 'مغير السرعات والتروس للدراجة', 'መቐየሪ ፍጥነት (ጊር)', 'jijjiirtuu saffisaa (gear)', 'gears', 'Schakel naar een lichte versnelling bij tegenwind of heuvels.'],
      ['de fietsmand', 'fietsmand', 'de', 'سلة الدراجة الأمامية للبقالة', 'ቅርጫት ብሽክለታ', 'qunnaa biskileetii', 'bicycle basket', 'Leg je handtas veilig in de fietsmand voorop.'],
      ['de fietstas', 'fietstas', 'de', 'حقيبة الدراجة المزدوجة الجانبية', 'ቦርሳ ብሽክለታ', 'koroojoo biskileetii', 'pannier / bike bag', 'In de dubbele fietstassen passen heel veel weekboodschappen.'],
      ['de dynamo', 'dynamo', 'de', 'مولد كهرباء الأضواء من دوران العجلة', 'ዲናሞ', 'daaynaamoo', 'dynamo / bottle generator', 'De dynamo levert stroom aan de lampen tijdens het trappen.']
    ]
  },

  // 2. Keukengerei (Kitchen Utensils & Cookware)
  {
    category: 'Keukengerei',
    icon: '🍳',
    color: '#EA580C',
    bg: '#FFF7ED',
    words: [
      ['de koekenpan', 'koekenpan', 'de', 'مقلاة التحمير المسطحة للبيض واللحوم', 'መጥበሲት (ፓዴላ)', 'eelee waaddii', 'frying pan / skillet', 'Bak een spiegelei in de hete koekenpan met wat boter.'],
      ['de kookpan', 'kookpan', 'de', 'قدر الطهي العالي للشوربة والماء', 'ድስቲ መብሰሊ', 'distii bilcheessituu', 'saucepan / cooking pot', 'Kook de pasta in een ruime kookpan vol water.'],
      ['de steelpan', 'steelpan', 'de', 'وعاء طهي صغير ذو مقبض طويل للصلصة', 'ንእሽቶ ድስቲ ብኢድ', 'distii xiqqoo qabannoo qabdu', 'small saucepan', 'Warm de tomatensaus zachtjes op in een steelpannetje.'],
      ['de braadpan', 'braadpan', 'de', 'قدر التحمير الثقيل للحساء واللحم', 'ዓባይ ድስቲ ምብሳል', 'distii guddaa foonii', 'casserole pot / Dutch oven', 'Laat het stoofvlees drie uur sudderen in de gietijzeren braadpan.'],
      ['de deksel', 'deksel', 'de', 'غطاء القدر لمنع تبخر البخار', 'መኽደኒ ድስቲ', 'qadaada distii', 'pot lid', 'Zet de deksel op de pan zodat het water sneller kookt.'],
      ['het schilmesje', 'schilmesje', 'het', 'سكين التقشير الصغيرة الحادة', 'ንእሽቶ ካራ መላጸ', 'billaa quncaaftuu xiqqoo', 'paring knife', 'Schil de aardappels met een scherp schilmesje.'],
      ['het koksmes', 'koksmes', 'het', 'سكين الطاهي الكبيرة لتقطيع الخضار واللحوم', 'ዓቢ ካራ ክሽነ', 'billaa guddaa nyaataa', 'chef\'s knife', 'Snijd het vlees en de groenten in blokjes met het koksmes.'],
      ['de snijplank', 'snijplank', 'de', 'لوح التقطيع الخشبي أو البلاستيكي', 'ጣውላ መክተፊ', 'gabatee murannaa foonii fi fuduraa', 'chopping board / cutting board', 'Gebruik een aparte snijplank voor rauw vlees en voor groenten.'],
      ['de pollepel', 'pollepel', 'de', 'ملعقة الطهي الخشبية الكبيرة للتقليب', 'ማንካ ዕንጨይቲ', 'fal\'aana mukaa guddaa', 'wooden spoon', 'Roer de warme soep rustig door met de houten pollepel.'],
      ['de spatel', 'spatel', 'de', 'ملعقة التقليب المسطحة العريضة', 'ስፓቱላ / መገልበጢ', 'ispachulaa', 'spatula / turner', 'Draai de pannenkoek voorzichtig om met een spatel.'],
      ['de garde', 'garde', 'de', 'مضرب البيض والكريمة اليدوي (الخفاقة)', 'መውቅዒ እንቋቝሖ', 'raasaa buuphaa (garde)', 'whisk', 'Klop de eieren en melk luchtig los met de garde.'],
      ['de rasp', 'rasp', 'de', 'المبشرة اليدوية للجبن والجزر', 'መፋሕቂ ፎርማጆ', 'rurruustuu ayibaa fi kaarotii', 'grater', 'Rasp een flinke portie oude kaas over de ovenschotel.'],
      ['het vergiet', 'vergiet', 'het', 'المصفاة الكبيرة المثقوبة للخضار والمعكرونة', 'መንፊት መጽረዪ', 'gingilchaa / qulleessituu paastaa', 'colander / strainer', 'Giet de gekookte macaroni voorzichtig af in het vergiet.'],
      ['de maatbeker', 'maatbeker', 'de', 'كوب القياس المعياري للسوائل والطحين', 'መዐቀኒ ብርጭቆ', 'kubbaayyaa safaraa', 'measuring jug', 'Meet 250 milliliter melk nauwkeurig af in de maatbeker.'],
      ['de keukenweegschaal', 'keukenweegschaal', 'de', 'ميزان المطبخ الرقمي الدقيق', 'ሚዛን ክሽነ', 'miizaana kushinaa', 'kitchen scale', 'Weeg vijfhonderd gram bloem af op de keukenweegschaal.'],
      ['de blikopener', 'blikopener', 'de', 'فتاحة العلب المعدنية والكونسروة', 'መኽፈቲ ቆርቆሮ', 'bantuu qodaa qorqoorroo', 'can opener', 'Open het blikje gepelde tomaten met de blikopener.'],
      ['de flesopener', 'flesopener', 'de', 'فتاحة أغطية الزجاجات المعدنية', 'መኽፈቲ ጥርሙዝ', 'bantuu qaruuraa', 'bottle opener', 'Waar ligt de flesopener in de keukenla?'],
      ['de kurkentrekker', 'kurkentrekker', 'de', 'فتاحة السدادات الفلينية للزجاجات', 'መውጽኢ ቡሽ ጥርሙዝ', 'baaftuu buushii qaruuraa', 'corkscrew', 'Trek de kurk voorzichtig uit de fles met de kurkentrekker.'],
      ['de knoflookpers', 'knoflookpers', 'de', 'هراسة وعصارة الثوم السريعة', 'መጭመቒ ጻዕዳ ሽጉርቲ', 'cuunftuu qullubbii adii', 'garlic press', 'Knijp een teentje knoflook fijn met de knoflookpers.'],
      ['de dunschiller', 'dunschiller', 'de', 'مقشرة الخضار والبطاطس السريعة', 'መላጺት ድንሽ', 'quncaaftuu dinnichaa', 'vegetable peeler', 'Met de dunschiller schil je komkommers en wortels heel dun.'],
      ['de deegroller', 'deegroller', 'de', 'شوبك فرد العجين الخشبي', 'መዘርግሒ ሊቃዕቲ', 'dheeressituu daakuu (deegroller)', 'rolling pin', 'Rol het taartdeeg gelijkmatig uit op het aanrecht met de deegroller.'],
      ['de ovenschaal', 'ovenschaal', 'de', 'صينية الفرن الزجاجية المقاومة للحرارة', 'ጻሕሊ ፎርኖ', 'gabatee oovenii', 'baking dish / oven dish', 'Vet de glazen ovenschaal in met een beetje zonnebloemolie.'],
      ['de bakplaat', 'bakplaat', 'de', 'لوح الفرن المعدني المسطح للخبز', 'ሳህን ፎርኖ (ባክፕላት)', 'sibiila oovenii bal\'aa', 'baking sheet / oven tray', 'Leg de koekjes op het bakpapier op de bakplaat.'],
      ['het bakpapier', 'bakpapier', 'het', 'ورق الخبز المقاوم للحرارة والالتصاق', 'ወረቐት ፎርኖ', 'waraqaa oovenii', 'baking parchment / baking paper', 'Met bakpapier plakt de cake niet vast aan de bakvorm.'],
      ['het schort', 'schort', 'het', 'مريلة المطبخ لحماية الملابس', 'ክዳን ክሽነ (ሽርጢ)', 'shuruxii kushinaa', 'apron', 'Doe een keukenschort om zodat je trui schoon blijft tijdens het bakken.'],
      ['de ovenwant', 'ovenwant', 'de', 'قفاز الفرن العازل لحرارة الأطباق الساخنة', 'ጓንቲ ፎርኖ', 'guwaantii oovenii', 'oven mitt / glove', 'Pak de gloeiend hete schaal altijd vast met een dikke ovenwant.'],
      ['de onderzetter', 'onderzetter', 'de', 'قاعدة عازلة لحماية الطاولة من الأواني الساخنة', 'መቐመጢ ውዑይ ድስቲ', 'teessuma distii ho\'aa', 'coaster / trivet', 'Zet de hete pan op een kurken onderzetter op tafel.'],
      ['de afwasborstel', 'afwasborstel', 'de', 'فرشاة جلي الصحون بمقبض', 'መሕጸቢ ኣቕሓ (ብራሽ)', 'burushii mi\'a dhiqu', 'washing-up brush', 'Schrob de borden schoon met heet water en de afwasborstel.'],
      ['het afwasmiddel', 'afwasmiddel', 'het', 'سائل غسيل الأطباق والصحون الرغوي', 'ሳሙና ምሕጻብ ኣቕሓ', 'saamunaa qodaa dhiqu', 'washing-up liquid / dish soap', 'Een paar druppels afwasmiddel ontvetten de pannen direct.'],
      ['de theedoek', 'theedoek', 'de', 'منشفة قطنية لتجفيف الأطباق والصحون', 'ጨርቂ መድረቒ ኣቕሓ', 'huccuu qodaa gogsu', 'tea towel / dish towel', 'Droog de glazen en pannen glanzend af met een schone theedoek.']
    ]
  },

  // 3. Standaard ingrediënten (Pantry & Basic Ingredients)
  {
    category: 'Standaard ingrediënten',
    icon: '🧂',
    color: '#D97706',
    bg: '#FEF3C7',
    words: [
      ['het zout', 'zout', 'het', 'الملح الأبيض لتتبيل الطعام', 'ጨው', 'soogidda', 'salt', 'Voeg een snufje zout toe aan het kookwater van de rijst.'],
      ['de zwarte peper', 'zwarte peper', 'de', 'الفلفل الأسود المطحون للنكهة الحارة', 'ጸሊም በርበረ', 'barbaree gurraacha', 'black pepper', 'Breng de soep op smaak met zwarte peper.'],
      ['de olijfolie', 'olijfolie', 'de', 'زيت الزيتون البكر الممتاز للطهي والسلطة', 'ዘይቲ ኣውሊዕ', 'zayita ejersaa', 'olive oil', 'Bak de groenten in een scheutje gezonde olijfolie.'],
      ['de zonnebloemolie', 'zonnebloemolie', 'de', 'زيت عباد الشمس الخفيف للقلي', 'ዘይቲ ጸሓይ (ዘይቲ ምብሳል)', 'zayita biqilaa', 'sunflower oil', 'Zonnebloemolie is ideaal om heet in te bakken en frituren.'],
      ['de kristalsuiker', 'kristalsuiker', 'de', 'السكر الأبيض الحبيبي للتحلية', 'ሽኮር', 'sukkaara adii', 'granulated sugar', 'Doe een theelepel kristalsuiker in de hete muntthee.'],
      ['de bloem', 'bloem', 'de', 'طحين القمح الأبيض للخبز والمعجنات', 'ሓርጭ ስርናይ (ብሉም)', 'daakuu qamadii', 'flour', 'Voor het pannenkoekenbeslag heb je 250 gram bloem nodig.'],
      ['de gist', 'gist', 'de', 'الخميرة الحية لتخمير العجين والخبز', 'ማይ ብሑቕ (ጊስት)', 'raawwii daakuu (gistii)', 'yeast', 'Gist zorgt ervoor dat het brooddeeg mooi gaat rijzen.'],
      ['het bakpoeder', 'bakpoeder', 'het', 'مسحوق الخَبز (البيكنج باودر) للكيك', 'ባክፖውደር (መተንፈሲ)', 'baakpoolvarii (bakpoeder)', 'baking powder', 'Voeg één zakje bakpoeder toe voor een luchtige cake.'],
      ['de boter', 'boter', 'de', 'الزبدة الطبيعية الغنية للدهن والخبز', 'ጠስሚ / ልባብ', 'dhadhaa', 'butter', 'Smeer een dun laagje roomboter op het verse brood.'],
      ['de margarine', 'margarine', 'de', 'الزبدة النباتية للطبخ والدهن', 'ማርጋሪን (ናይ ኣሕምልቲ ጠስሚ)', 'margaariinii', 'margarine', 'Bak de uitjes goudbruin in vloeibare margarine.'],
      ['de eieren', 'eieren', 'de', 'البيض الطازج للطبخ والحلويات', 'እንቋቝሖ', 'buuphaalee', 'eggs', 'Klop twee verse scharreleieren los in een kommetje.'],
      ['de volle melk', 'volle melk', 'de', 'الحليب كامل الدسم الطازج', 'ምሉእ ጸባ', 'aannan guutuu', 'whole milk', 'Kinderen drinken graag een beker koude volle melk bij het ontbijt.'],
      ['de knoflook', 'knoflook', 'de', 'فصوص الثوم العطري لنكهة الطعام', 'ጻዕዳ ሽጉርቲ', 'qullubbii adii', 'garlic', 'Hak twee teentjes knoflook fijn voor de pastasaus.'],
      ['de gele ui', 'gele ui', 'de', 'البصل الأصفر الأساسي في معظم الأكلات', 'ብጫ ሽጉርቲ', 'qullubbii keelloo', 'yellow onion', 'Snipper een grote gele ui en bak hem glazig in de pan.'],
      ['de azijn', 'azijn', 'de', 'الخل الحامض للسلطات والتخليل', 'ኣቸቶ (መጺጽ)', 'khattii / asheeta', 'vinegar', 'Meng azijn met olijfolie voor een frisse sladressig.'],
      ['de mosterd', 'mosterd', 'de', 'الخردل الحار للجبن والصلصات', 'ሰናፍጭ (ሞስተርድ)', 'senaphichaa (mosterd)', 'mustard', 'Nederlandse kaas smaakt heerlijk met een beetje scherpe mosterd.'],
      ['de mayonaise', 'mayonaise', 'de', 'صلصة المايونيز الغنية الكريمية', 'ማዮነዝ', 'maayoneezii', 'mayonnaise', 'Een bakje goudgele friet met een flinke klodder mayonaise.'],
      ['de tomatenpuree', 'tomatenpuree', 'de', 'معجون الطماطم المركز للطبخ', 'ሳልሳ ኮሚደረ', 'salaaxaa timaatimaa', 'tomato paste / puree', 'Voeg een eetlepel tomatenpuree toe voor een diepe rode kleur.'],
      ['het bouillonblokje', 'bouillonblokje', 'het', 'مكعب مرقة الخضار أو اللحم الجاف', 'ናይ መረቕ ኩብ (ቡዮን)', 'muka marqaa (bouillon)', 'stock cube / bouillon cube', 'Los één bouillonblokje op in een halve liter kokend heet water.'],
      ['de witte rijst', 'witte rijst', 'de', 'الأرز الأبيض الأساسي المغذي', 'ጻዕዳ ሩዝ', 'ruuza adii', 'white rice', 'Serveer de groentestoof met geurige witte rijst.'],
      ['de kaneel', 'kaneel', 'de', 'القرفة المطحونة الحلوة للمخبوزات', 'ቀረፋ', 'qarafaa', 'cinnamon', 'Strooi wat gemalen kaneel en suiker over de appeltaart.'],
      ['de oregano', 'oregano', 'de', 'الزعتر البري المجفف للبيتزا والصلصة', 'ኦሪጋኖ (ናይ ፒዛ ቆጽሊ)', 'origaanoo', 'oregano', 'Gedroogde oregano ruikt heerlijk op zelfgemaakte pizza.'],
      ['het paprikapoeder', 'paprikapoeder', 'het', 'مسحوق الفلفل الحلو الأحمر المطحون', 'ናይ በርበረ ዱቄት (ፓፕሪካ)', 'daakuu barbaree diimaa', 'paprika powder', 'Paprikapoeder geeft een mooie milde rode kleur en smaak.'],
      ['de kurkuma', 'kurkuma', 'de', 'الكركم الأصفر الصحي للتوابل والأرز', 'ዕርድ (ኩርኩማ)', 'hardii / kurkumaa', 'turmeric', 'Kurkuma kleurt de rijst helder geel en is heel gezond.'],
      ['de gember', 'gember', 'de', 'الزنجبيل الطازج الحار المنعش', 'ዝንጅብል', 'jinjibila', 'ginger', 'Rasp een stukje verse gember voor in de warme thee.']
    ]
  },

  // 4. Bekende maaltijden (Popular & Traditional Meals)
  {
    category: 'Bekende maaltijden',
    icon: '🍲',
    color: '#16A34A',
    bg: '#F0FDF4',
    words: [
      ['de stamppot', 'stamppot', 'de', 'طبق الستامبوت التقليدي (بطاطس مهروسة مع خضار)', 'ስታምፖት (ዝተጨፍለቐ ድንሽ ምስ ሓምሊ)', 'istaampotii (dinnicha daakamee)', 'mashed potato hotchpotch / stamppot', 'Stamppot is het bekendste traditionele wintergerecht in Nederland.'],
      ['de boerenkool', 'boerenkool', 'de', 'ستامبوت الكرنب المجعد مع السجق المدخن', 'ስታምፖት ቦረንኮል ምስ ቋንጣ ቋጸሮ', 'istaampotii boorenkool', 'kale mash with smoked sausage', 'Boerenkool met worst eten Nederlanders als het buiten vriest.'],
      ['de hutspot', 'hutspot', 'de', 'ستامبوت الجزر والبصل والبطاطس المهروسة', 'ሁትስፖት (ድንሽ፡ ካሮት፡ ሽጉርቲ)', 'huutspotii (dinnicha fi kaarotii)', 'mashed potatoes, carrots and onions', 'Hutspot met runderlapjes is een klassieke maaltijd in Leiden.'],
      ['de erwtensoep', 'erwtensoep', 'de', 'شوربة البازلاء الهولندية الثقيلة (سنيرت)', 'ናይ ዓተር ሾርባ (ስነርት)', 'shorbaa ataraa (snert)', 'split pea soup / snert', 'Een kom dampende erwtensoep smaakt heerlijk na het schaatsen.'],
      ['de pannenkoeken', 'pannenkoeken', 'de', 'الفطائر الرقيقة الكبيرة مع شراب السكر', 'ፓንከክ (ፓነንኮክ)', 'paankeekii / paanenkok', 'pancakes', 'Grote pannenkoeken met appel, kaas of zoete stroop.'],
      ['de poffertjes', 'poffertjes', 'de', 'فطائر صغيرة منتفخة ساخنة مع زبدة وسكر بودرة', 'ፖፈርቸስ (ንኣሽቱ ምቁር ፓንከክ)', 'pooferchees (paankeekii xixiqqoo)', 'mini fluffy pancakes / poffertjes', 'Op de kermis eet je een bordje warme poffertjes met poedersuiker.'],
      ['de haring', 'haring', 'de', 'سمك الرنجة الهولندي النيئ مع البصل المفروم', 'ዓሳ ሃሪንግ ምስ ሽጉርቲ', 'qurxummii haariingii', 'raw herring with onions', 'Eet de nieuwe haring traditioneel bij de staart met uitjes.'],
      ['de kibbeling', 'kibbeling', 'de', 'قطع سمك أبيض مقلية مقرمشة مع صوص الثوم', 'ኪበሊንግ (ዝተጠብሰ ዓሳ)', 'kibbeliingii (qurxummii waadame)', 'deep-fried battered fish bites', 'Bij de viskraam bestellen we een portie warme kibbeling met knoflooksaus.'],
      ['het broodje kroket', 'broodje kroket', 'het', 'شطيرة الكروكيت المقرمشة مع الخردل', 'በርገር ክሮኬት ምስ ሰናፍጭ', 'daabboo kirokeetii', 'croquette in a bread roll', 'Een krokant broodje kroket met mosterd is een favoriete lunch.'],
      ['de bitterballen', 'bitterballen', 'de', 'كرات اللحم المقلية المقرمشة الساخنة مع الخردل', 'ቢተርባለን (ክቢ ጥቡስ ስጋ)', 'biiterbaalen (kubbaa foonii waadame)', 'bitterballen / Dutch meat snacks', 'Bitterballen zijn de populairste warme snack bij de borrel.'],
      ['de nasi goreng', 'nasi goreng', 'de', 'الأرز الإندونيسي المقلي بالتوابل والخضار', 'ናሲ ጎረንግ (ዝተጠብሰ ሩዝ)', 'naasii goorengii (ruuza waadame)', 'Indonesian fried rice', 'Nasi goreng met een gebakken ei, saté en knapperige kroepoek.'],
      ['de bami goreng', 'bami goreng', 'de', 'المعكرونة الإندونيسية المقلية بالخضار واللحم', 'ባሚ ጎረንግ (ዝተጠብሰ ፓስታ)', 'baamii goorengii (baamii waadame)', 'Indonesian fried noodles', 'Bami goreng is een geliefde maaltijd in Nederlandse keukens.'],
      ['de saté met pindasaus', 'saté met pindasaus', 'de', 'أسياخ لحم الدجاج المشوي بصلصة الفول السوداني', 'ሳተ ምስ ናይ ዓተር ሳልሳ', 'saatee mi\'a gogaa qodaan', 'satay skewers with peanut sauce', 'Malse kipsaté overgoten met warme romige pindasaus.'],
      ['de tomatensoep', 'tomatensoep', 'de', 'شوربة الطماطم الدافئة بكرات اللحم الصغيرة', 'ሾርባ ኮሚደረ', 'shorbaa timaatimaa', 'tomato soup', 'Verse tomatensoep met soepballetjes en knapperige soepstengels.'],
      ['de groentesoep', 'groentesoep', 'de', 'شوربة الخضار الصافية المفيدة مع اللحم', 'ሾርባ ኣሕምልቲ', 'shorbaa fuduraa', 'vegetable soup', 'Een gezonde kom groentesoep boordevol prei, wortel en selderij.'],
      ['de lasagne', 'lasagne', 'de', 'المعكرونة الإيطالية المخبوزة في الفرن بطبقات الجبن', 'ላዛኛ (ዝተሰንከተ ፓስታ)', 'laazaanyaa', 'lasagna', 'Een rijke lasagne met gehakt, bechamelsaus en gegratineerde kaas.'],
      ['de couscous', 'couscous', 'de', 'الكسكسي الشمال أفريقي بالخضار والحمص', 'ኩስኩስ ምስ ኣሕምልቲ', 'kuskusii', 'couscous', 'Gestoomde couscous met malse lamsbout en zachte pompoen.'],
      ['de appeltaart', 'appeltaart', 'de', 'فطيرة التفاح الهولندية التقليدية بالقرفة', 'ቶርታ ቱፋሕ (ኣፕልታርት)', 'keekii appilii (appeltaart)', 'Dutch apple pie', 'Een punt warme appeltaart met een grote toef verse slagroom.']
    ]
  },

  // 5. Lichaamsdelen (Human Body Parts)
  {
    category: 'Lichaamsdelen',
    icon: '👤',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    words: [
      ['het hoofd', 'hoofd', 'het', 'الرأس والعقل', 'ርእሲ', 'mataa', 'head', 'Draag een fietshelm om je hoofd goed te beschermen.'],
      ['het haar', 'haar', 'het', 'شعر الرأس', 'ጸጕሪ', 'rifeensa', 'hair', 'Zij heeft lang donker krullend haar.'],
      ['het oog', 'oog', 'het', 'العين للبصر والرؤية', 'ዓይኒ', 'ija', 'eye', 'Doe je ogen dicht en luister aandachtig naar de muziek.'],
      ['de ogen', 'ogen', 'de', 'العيون الاثنتان للرؤية', 'ኣዒንቲ', 'ijoollee (ijja lamaan)', 'eyes', 'Hij heeft vriendelijke bruine ogen.'],
      ['het oor', 'oor', 'het', 'الأذن للسمع والإصغاء', 'እዝኒ', 'gurra', 'ear', 'Mijn rechteroor zit een beetje verstopt.'],
      ['de oren', 'oren', 'de', 'الأذنان الاثنتان للسمع', 'ኣእዛን', 'gurroota', 'ears', 'Met je oren luister je naar de uitspraak van woorden.'],
      ['de neus', 'neus', 'de', 'الأنف للشم والتنفس', 'ኣፍንጫ', 'funyaan', 'nose', 'Snuit je neus voorzichtig in een papieren zakdoekje.'],
      ['de mond', 'mond', 'de', 'الفم للتحدث وتناول الطعام', 'ኣፍ', 'afaan', 'mouth', 'Doe je mond wijd open zodat de tandarts kan kijken.'],
      ['de tand', 'tand', 'de', 'السن الأبيض للمضغ في الفم', 'ስኒ', 'ilkaan', 'tooth', 'Poets elke tand zorgvuldig met fluoride tandpasta.'],
      ['de tanden', 'tanden', 'de', 'الأسنان الكاملة في الفم', 'ኣስنان', 'ilkaanoota', 'teeth', 'Witte en gezonde tanden door tweemaal daags te poetsen.'],
      ['de kies', 'kies', 'de', 'الضرس الخلفي لطحن الطعام الصلب', 'መንከስ', 'a\'oo (ilkaan duubaa)', 'molar', 'Er zit een klein gaatje in mijn achterste kies.'],
      ['de lip', 'lip', 'de', 'الشفة العليا أو السفلى', 'ከንፈር', 'hidhii', 'lip', 'Bij vrieskou smeer ik lippenzalf op mijn droge lippen.'],
      ['de tong', 'tong', 'de', 'اللسان للتذوق والكلام', 'መልሓስ', 'arraba', 'tongue', 'Steek je tong even uit voor het medisch onderzoek.'],
      ['de wang', 'wang', 'de', 'الخد وجانب الوجه اللطيف', 'ጉንጪ', 'maddii', 'cheek', 'De kinderen kregen een warme zoen op hun wang.'],
      ['de kin', 'kin', 'de', 'الذقن وأسفل الوجه', 'መንከስ / ጭሕሚ ቦታ', 'areeda / gollisa', 'chin', 'Hij wreef peinzend over zijn kin.'],
      ['de keel', 'keel', 'de', 'الحلق والحنجرة للبلع', 'ጎረሮ', 'qoonqoo', 'throat', 'Warme kamillethee met honing verzacht een pijnlijke keel.'],
      ['de nek', 'nek', 'de', 'العنق ومؤخرة الرقبة', 'ክሳድ', 'morma', 'neck', 'Mijn nek voelt stijf na een lange werkdag achter de computer.'],
      ['de schouder', 'schouder', 'de', 'الكتف وأعلى الذراع', 'መንከብ', 'ceekuu', 'shoulder', 'Draag de zware schooltas op twee schouders tegelijk.'],
      ['de arm', 'arm', 'de', 'الذراع الكاملة من الكتف إلى اليد', 'ክንድ', 'harka', 'arm', 'Hij brak gelukkig zijn arm niet bij de val van de trap.'],
      ['de elleboog', 'elleboog', 'de', 'المرفق والكوع بين الساعد والعضد', 'ብርኪ ኢድ', 'ciqilee', 'elbow', 'Stoot niet met je elleboog tegen de rand van de tafel.'],
      ['de pols', 'pols', 'de', 'المعصم ورسغ اليد المتحرك', 'መገጣጠሚ ኢድ (ፖልስ)', 'kudhaama harka', 'wrist', 'De dokter voelt aan de pols hoe snel het hart klopt.'],
      ['de hand', 'hand', 'de', 'اليد والأصابع للإمساك والكتابة', 'ኢድ', 'harka (harkaa)', 'hand', 'Was je handen altijd grondig met water en zeep voor het eten.'],
      ['de handen', 'handen', 'de', 'اليدان الاثنتان للإمساك والعمل', 'ኣእዳው', 'harkoota', 'hands', 'Klap vrolijk in je handen met het kinderliedje mee.'],
      ['de vinger', 'vinger', 'de', 'إصبع اليد للمس والإشارة', 'ኣጻብዕ', 'quba harka', 'finger', 'Steek je vinger op in de klas als je een vraag wilt stellen.'],
      ['de vingers', 'vingers', 'de', 'أصابع اليد العشرة للعمل الدقيق', 'ኣጻብዕቲ', 'quboota harka', 'fingers', 'Mijn vingers zijn koud van het fietsen zonder handschoenen.'],
      ['de duim', 'duim', 'de', 'الإبهام، الإصبع الأكبر في اليد', 'ዓባይ ኣጻብዕ', 'quba guddaa', 'thumb', 'Steek je duim omhoog als alles helemaal naar wens is.'],
      ['de borst', 'borst', 'de', 'الصدر والقفص الصدري للرئتين', 'ደረት', 'qoma', 'chest', 'Haal diep adem zodat de arts naar je longen kan luisteren.'],
      ['de buik', 'buik', 'de', 'البطن والمعدة لهضم الطعام', 'ከብዲ', 'garaa', 'belly / abdomen', 'Ik heb buikpijn omdat ik te snel en te veel gegeten heb.'],
      ['de rug', 'rug', 'de', 'الظهر والعمود الفقري لحمل القامة', 'ሕቖ', 'dugda', 'back', 'Zit rechtop op je bureaustoel om je rug te ontlasten.'],
      ['de heup', 'heup', 'de', 'الورك وعظام الحوض', 'ሕቋ / ሳዕሪራ', 'mudhii / sarbaa', 'hip', 'Zet het fietszadel precies op de hoogte van je heup.'],
      ['het been', 'been', 'het', 'الساق والرجل كاملة للمشي والركض', 'እግሪ', 'miila', 'leg', 'Mijn linkerbeen voelt erg moe na de lange fietstocht.'],
      ['de benen', 'benen', 'de', 'الساقان والرجلان الاثنتان للحركة', 'ኣእጋር', 'miilota', 'legs', 'Strek je benen even na twee uur stilzitten in de trein.'],
      ['de knie', 'knie', 'de', 'الركبة ومفصل الساق الأوسط', 'ብርኪ', 'jilba', 'knee', 'Het kindje viel op het asfalt en bezeerde zijn knie.'],
      ['de enkel', 'enkel', 'de', 'الكاحل ومفصل القدم مع الساق', 'ዓካከሊት', 'komee / moggolee', 'ankle', 'Ik heb mijn enkel verzwikt tijdens het voetballen op het veld.'],
      ['de voet', 'voet', 'de', 'القدم للمشي وارتداء الأحذية', 'እግሪ (መከየዲ)', 'faana miilaa', 'foot', 'Veeg je voeten goed af op de deurmat bij binnenkomst.'],
      ['de voeten', 'voeten', 'de', 'القدمان الاثنتان للمشي والحركة', 'ኣእጋር (መከየዲ)', 'faanota miilaa', 'feet', 'Trek warme wollen sokken aan tegen koude voeten in bed.'],
      ['de teen', 'teen', 'de', 'إصبع القدم للحفظ التوازن', 'ኣጻብዕ እግሪ', 'quba miilaa', 'toe', 'Stoot niet met je blote teen tegen de tafelpoot.'],
      ['de tenen', 'tenen', 'de', 'أصابع القدمين العشرة', 'ኣጻብዕቲ እግሪ', 'quboota miilaa', 'toes', 'Beweeg je tenen even om de doorbloeding te stimuleren.'],
      ['het hart', 'hart', 'het', 'القلب النابض في الصدر لضخ الدم', 'ልቢ', 'onnee', 'heart', 'Een gezond hart klopt ongeveer zeventig keer per minuut in rust.'],
      ['de longen', 'longen', 'de', 'الرئتان في الصدر للتنفس والأكسجين', 'ሳንቡእ', 'somba', 'lungs', 'Frisse buitenlucht inademen is heel gezond voor je longen.']
    ]
  }
];

const addedWords = [];

newCategoryBatches.forEach(batch => {
  batch.words.forEach(w => {
    const [word, lemma, article, ar, ti, om, en, ex] = w;
    const lowerKey = word.toLowerCase().trim();
    if (!seenWords.has(lowerKey)) {
      seenWords.add(lowerKey);
      const id = `exp_${lemma.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${existingWords.length + addedWords.length + 1}`;
      addedWords.push({
        id: id,
        word: word,
        lemma: lemma,
        article: article,
        category: batch.category,
        translations: { ar, ti, om, en },
        example: ex,
        svg: generateSvgCard(id, batch.color, batch.bg, batch.icon)
      });
    }
  });
});

console.log(`Added ${addedWords.length} new words across the 5 requested categories!`);

// Combine master
const masterWords = [...existingWords, ...addedWords];
console.log(`TOTAL MASTER WORDS: ${masterWords.length}`);

// Write files
const jsonPath = path.join(__dirname, '..', 'data', 'words.json');
const jsPath = path.join(__dirname, '..', 'data', 'words.js');

fs.writeFileSync(jsonPath, JSON.stringify(masterWords, null, 2), 'utf-8');
console.log(`Wrote JSON to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Woorden Database (${masterWords.length} Woorden)
 * Inclusief nieuwe categorieën: Fietsonderdelen, Keukengerei, Standaard ingrediënten, Bekende maaltijden, Lichaamsdelen
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(masterWords, null, 2)};
`;
fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Wrote JS to ${jsPath}`);
