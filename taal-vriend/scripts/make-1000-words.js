// scripts/make-1000-words.js
// Assembles 1000+ new high-quality words for TaalVriend
// Combined with existing 354 words = 1354+ total words.

const fs = require('fs');
const path = require('path');

// 1. Existing base words (354)
const existingWords = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'words.json'), 'utf-8'));
console.log(`Loaded existing words: ${existingWords.length}`);

// Set of existing words/lemmas to avoid exact duplicates
const seenWords = new Set(existingWords.map(w => w.word.toLowerCase()));

// 2. Load massive-1000-definitions.js if available
let massiveDefinitions = [];
try {
  massiveDefinitions = require('./massive-1000-definitions.js');
  console.log(`Loaded massive definitions: ${massiveDefinitions.length}`);
} catch (e) {
  console.log('No massive-1000-definitions.js found or error:', e.message);
}

// 3. Load generate-1000-more.js if available
let moreDefinitions = [];
try {
  moreDefinitions = require('./generate-1000-more.js');
  console.log(`Loaded more definitions: ${moreDefinitions.length}`);
} catch (e) {
  console.log('No generate-1000-more.js found or error:', e.message);
}

// 4. Additional rich batches of high-utility vocabulary
const additionalBatches = [
  // Dagelijkse Werkwoorden (Daily Verbs)
  {
    category: 'Werkwoorden & Acties',
    icon: '🏃',
    color: '#0284C7',
    bg: '#E0F2FE',
    words: [
      ['opstaan', 'opstaan', '', 'الاستيقاظ والنهوض من النوم', 'ምትንሳእ', 'ka\'uu / hirriibaa ka\'uu', 'to get up / wake up', 'Ik sta elke ochtend om zeven uur op.'],
      ['slapen', 'slapen', '', 'النوم والراحة', 'ምድቃስ', 'rafuu', 'to sleep', 'De baby slaapt al heerlijk in haar bedje.'],
      ['ontbijten', 'ontbijten', '', 'تناول وجبة الإفطار الصباحي', 'ቁርሲ ምብላዕ', 'ciree nyaachuu', 'to have breakfast', 'We ontbijten samen met bruin brood en thee.'],
      ['lunch', 'lunchen', '', 'تناول وجبة الغداء', 'ምሳሕ ምብላዕ', 'laaqana nyaachuu', 'to have lunch', 'Tussen de middag lunchen we met een tosti.'],
      ['dineren', 'dineren', '', 'تناول وجبة العشاء المسائي', 'ድራር ምብላዕ', 'irbaata nyaachuu', 'to have dinner', 'Vanavond dineren we met warme soep en rijst.'],
      ['koken', 'koken', '', 'الطبخ وإعداد الطعام', 'ምብሳል', 'bilcheessuu / fe\'uu', 'to cook', 'Wie kookt er vanavond het avondeten?'],
      ['bakken', 'bakken', '', 'الخبز أو القلي في الفرن أو المقلاة', 'ምስንካት / ምጥባስ', 'tolchuu / eeleetti waaduu', 'to bake / fry', 'We bakken op zaterdag een appeltaart.'],
      ['wassen', 'wassen', '', 'الغسيل والتنظيف بالماء والصابون', 'ምሕጻብ', 'dhiquu / miiccuu', 'to wash', 'Was altijd eerst je handen voor het eten.'],
      ['douchen', 'douchen', '', 'الاستحمام تحت الدش', 'ሻወር ምውሳድ', 'dhiqachuu (shaaworii)', 'to take a shower', 'Na het sporten neem ik direct een warme douche.'],
      ['tandenpoetsen', 'tandenpoetsen', '', 'تنظيف الأسنان بالفرشاة والمعجون', 'ስኒ ምሕጻብ', 'ilkaan qulqulleessuu', 'to brush teeth', 'Vergeet niet om twee minuten je tanden te poetsen.'],
      ['schoonmaken', 'schoonmaken', '', 'التنظيف المنزلي والترتيب', 'ምጽራይ', 'qulqulleessuu', 'to clean', 'Op vrijdag maken we samen het hele huis schoon.'],
      ['stofzuigen', 'stofzuigen', '', 'تنظيف السجاد والأرض بالمكنسة الكهربائية', 'ምስሓብ ሓመድ (ቫክዩም)', 'faana qulqulleessuu (stofzuigen)', 'to vacuum', 'Kun je de woonkamer even stofzuigen?'],
      ['dweilen', 'dweilen', '', 'مسح الأرضيات المبللة بالممسحة', 'መሬት ምሕጻብ', 'lafa dhiquu / haxaa\'uu', 'to mop the floor', 'Na het vegen ga ik de keukenvloer dweilen.'],
      ['strijken', 'strijken', '', 'كي الملابس بالمكواة', 'ክዳውንቲ ምስትኳኽ', 'huccuu diriirsuu (istraakaa)', 'to iron', 'Hij strijkt zijn nette overhemd voor het sollicitatiegesprek.'],
      ['opruimen', 'opruimen', '', 'ترتيب الأشياء ووضعها في مكانها', 'ምእላይ / ምዕራይ', 'walitti qabuu / qulqulleessuu', 'to tidy up', 'Ruim je speelgoed op voor het slapengaan.'],
      ['fietsen', 'fietsen', '', 'ركوب الدراجة الهوائية والتنقل بها', 'ብሽክለታ ምዝዋር', 'biskileetii oofu', 'to ride a bicycle', 'In Nederland fietst bijna iedereen naar school of werk.'],
      ['wandelen', 'wandelen', '', 'المشي والتنزه في الهواء الطلق', 'ምዝዋር ብእግሪ', 'lafoon deemuu', 'to go for a walk', 'We wandelen elke zondagmiddag door het bos.'],
      ['hardlopen', 'hardlopen', '', 'الجري والركض الرياضي', 'ምጕያይ', 'fiiguu', 'to run / jog', 'Hardlopen in het park is goed voor je conditie.'],
      ['zwemmen', 'zwemmen', '', 'السباحة في المسبح أو البحر', 'ምሕንባስ', 'bishaan daakuu', 'to swim', 'Kinderen leren in Nederland al vroeg zwemmen.'],
      ['reizen', 'reizen', '', 'السفر والتنقل بين المدن والدول', 'ምጉዓዝ', 'adeemsa / deemuu', 'to travel', 'Ik reis morgen met de trein naar Utrecht.'],
      ['wachten', 'wachten', '', 'الانتظار والصبر في الموقف أو الطابور', 'ምጽባይ', 'eeguu', 'to wait', 'We wachten bij de bushalte op lijn 4.'],
      ['overstappen', 'overstappen', '', 'تبديل وسيلة المواصلات (قطار/باص)', 'ምቕያር መጓዓዝያ', 'geejjiba jijjiirrachuu', 'to transfer / change trains', 'Op station Zwolle moet je overstappen.'],
      ['betalen', 'betalen', '', 'دفع المال وشراء الحاجيات', 'ምኽፋል', 'kaffaluu', 'to pay', 'U kunt hier eenvoudig met pinpas betalen.'],
      ['pinnen', 'pinnen', '', 'الدفع بالبطاقة المصرفية بدون نقود ورقية', 'ብካርድ ምኽፋል', 'kaardii baankiitiin kaffaluu', 'to pay by debit card', 'Mag ik pinnen of moet ik contant betalen?'],
      ['sparen', 'sparen', '', 'توفير وادخار الأموال للمستقبل', 'ምቍጣብ', 'qussachuu', 'to save money', 'We sparen maandelijks wat geld voor de vakantie.'],
      ['kopen', 'kopen', '', 'شراء السلع والبضائع', 'ምዕዳግ', 'bituu', 'to buy', 'Ik ga vers fruit en brood kopen op de weekmarkt.'],
      ['verkopen', 'verkopen', '', 'بيع السلع والمنتجات', 'ምሻጥ', 'gurguruu', 'to sell', 'Op Koningsdag mag iedereen tweedehands spullen verkopen.'],
      ['huren', 'huren', '', 'استئجار منزل أو شقة أو سيارة', 'ምክራይ', 'kireeffachuu', 'to rent', 'Zij huren een lichte eengezinswoning in Groningen.'],
      ['verhuizen', 'verhuizen', '', 'الانتقال إلى بيت أو سكن جديد', 'ምግዓዝ', 'bakkatti godaanuu / jijjiiruu', 'to move house', 'Volgende maand gaan we verhuizen naar een ander dorp.'],
      ['werken', 'werken', '', 'العمل والوظيفة', 'ምስራሕ', 'hojjechuu', 'to work', 'Mijn buurman werkt als timmerman in de bouw.'],
      ['studeren', 'studeren', '', 'الدراسة في الجامعة أو الكلية', 'ምምሃር / ምጽናዕ', 'barachuu / qo\'achuu', 'to study', 'Zij studeert verpleegkunde aan het hbo.'],
      ['leren', 'leren', '', 'تعلم مهارة جديدة أو لغة', 'ምምሃር', 'barachuu', 'to learn', 'Wij leren elke dag nieuwe Nederlandse woorden.'],
      ['lezen', 'lezen', '', 'قراءة الكتب والصحف والرسائل', 'ምንባብ', 'dubbisuu', 'to read', 'Lees deze brief van de gemeente aandachtig door.'],
      ['schrijven', 'schrijven', '', 'الكتابة بالقلم أو على الحاسوب', 'ምጽሓፍ', 'barreesuu', 'to write', 'Schrijf je naam en geboortedatum op dit formulier.'],
      ['luisteren', 'luisteren', '', 'الاستماع والإصغاء للحديث أو الموسيقى', 'ምስማዕ', 'dhaggeeffachuu', 'to listen', 'Luister goed naar de uitleg van de lerares.'],
      ['spreken', 'spreken', '', 'التحدث والكلام بلغة معينة', 'ምዝራብ', 'dubbii dubbachuu', 'to speak', 'Probeer in de pauze Nederlands te spreken.'],
      ['vragen', 'vragen', '', 'السؤال والاستفسار عن معلومة', 'ምሕታት', 'gaafachuu', 'to ask', 'Als je het niet begrijpt, mag je het altijd vragen.'],
      ['antwoorden', 'antwoorden', '', 'الإجابة والرد على الأسئلة', 'ምምላስ', 'deebisuu', 'to answer', 'Geef een duidelijk en eerlijk antwoord.'],
      ['begrijpen', 'begrijpen', '', 'الفهم والاستيعاب للمعلومة', 'ምርዳእ', 'hubachuu', 'to understand', 'Begrijpt u wat ik bedoel?'],
      ['onthouden', 'onthouden', '', 'التذكر وحفظ المعلومة في الذاكرة', 'ምዝካር', 'yaadachuu', 'to remember / keep in mind', 'Probeer dit telefoonnummer goed te onthouden.'],
      ['vergeten', 'vergeten', '', 'النسيان وعدم التذكر', 'ምርሳዕ', 'irraanfachuu', 'to forget', 'Vergeet je sleutels niet mee te nemen!'],
      ['helpen', 'helpen', '', 'المساعدة وتقديم العون للآخرين', 'ምሕጋዝ', 'gargaaruu', 'to help', 'Kunt u mij alstublieft even helpen?'],
      ['bellen', 'bellen', '', 'الاتصال الهاتفي بشخص أو جهة', 'ምድዋል', 'bilbiluu', 'to call (phone)', 'Ik moet morgenochtend de huisarts bellen voor een afspraak.'],
      ['sturen', 'sturen', '', 'إرسال رسالة أو بريد إلكتروني أو طرد', 'ምልኣኽ', 'erguu', 'to send', 'Stuur mij een WhatsApp-berichtje als je er bent.'],
      ['ontvangen', 'ontvangen', '', 'استلام وتلقي الرسائل أو الطرود', 'ምቕባል', 'fudhachuu / qeebaluu', 'to receive', 'Heb je de brief van de Belastingdienst ontvangen?'],
      ['openen', 'openen', '', 'فتح الباب أو النافذة أو الحساب', 'ምኽፋት', 'banuu', 'to open', 'Open het raam even voor wat frisse lucht.'],
      ['sluiten', 'sluiten', '', 'إغلاق الباب أو النافذة أو المتجر', 'ምዕጻው', 'cufuu', 'to close', 'De supermarkt sluit vanavond om acht uur.'],
      ['winnen', 'winnen', '', 'الفوز والانتصار في لعبة أو مسابقة', 'ምዕዋት', 'mo\'achuu', 'to win', 'Ons voetbalteam heeft met 3-1 gewonnen.'],
      ['verliezen', 'verliezen', '', 'الخسارة أو فقدان الأشياء', 'ምስዓር / ምጥፋእ', 'mo\'amuu / dhabuu', 'to lose', 'Laat je sleutels niet verliezen.'],
      ['zingen', 'zingen', '', 'الغناء وإنشاد الأغاني الجميلة', 'ምድራፍ', 'sirbuu', 'to sing', 'De kinderen zingen vrolijke liedjes in de kring.'],
      ['dansen', 'dansen', '', 'الرقص على أنغام الموسيقى', 'ምስዓስዕ', 'ragaduu', 'to dance', 'Op het buurtfeest gaan de mensen gezellig dansen.'],
      ['tekenen', 'tekenen', '', 'الرسم بالقلم والألوان على الورق', 'ምስኣል', 'fakkii kaasuu', 'to draw', 'Mijn dochter tekent graag bloemen en dieren.'],
      ['schilderen', 'schilderen', '', 'الدهان والطلاء بالفرشاة', 'ምቕባእ', 'dibuu', 'to paint', 'In het voorjaar gaan we de kozijnen wit schilderen.']
    ]
  },

  // Onderwijs & School (Education & School)
  {
    category: 'Onderwijs & School',
    icon: '🎒',
    color: '#8B5CF6',
    bg: '#F5F3FF',
    words: [
      ['de basisschool', 'basisschool', 'de', 'المدرسة الابتدائية للأطفال (من 4 إلى 12 سنة)', 'ቀዳማይ ብርኪ ቤት ትምህርቲ', 'mana barumsaa sadarkaa duraa', 'primary school / elementary school', 'Kinderen gaan vanaf vier jaar naar de basisschool.'],
      ['de middelbare school', 'middelbare school', 'de', 'المدرسة الإعدادية والثانوية', 'ካልኣይ ብርኪ ቤት ትምህርቲ', 'mana barumsaa sadarkaa lammaffaa', 'high school / secondary school', 'Na groep 8 gaan leerlingen naar de middelbare school.'],
      ['het mbo', 'mbo', 'het', 'التعليم المهني المتوسط لإتقان المهن', 'ናይ ሞያ ቤት ትምህርቲ (MBO)', 'barnoota ogummaa giddu-galeessaa (mbo)', 'vocational education college', 'Op het mbo leer je een praktisch vak zoals monteur of kok.'],
      ['het hbo', 'hbo', 'het', 'التعليم العالي المهني والتطبيقي', 'ላዕለዋይ ሞያዊ ትምህርቲ (HBO)', 'barnoota olaanaa ogummaa (hbo)', 'university of applied sciences', 'Zij studeert fysiotherapie aan het hbo.'],
      ['de universiteit', 'universiteit', 'de', 'الجامعة الأكاديمية والبحثية', 'ዩኒቨርሲቲ', 'yuunivarsiitii', 'university', 'Hij wil rechten studeren aan de universiteit van Leiden.'],
      ['de docent', 'docent', 'de', 'المعلم أو المدرس في المدرسة', 'መምህር', 'barsiisaa', 'teacher / instructor', 'De docent legt de Nederlandse grammatica rustig uit.'],
      ['de juf', 'juf', 'de', 'المعلمة في الروضة والابتدائية', 'መምህር (መምህርት)', 'barsiistuu dubaraa', 'female teacher (informal)', 'Juf Karin leest een leuk prentenboek voor.'],
      ['de meester', 'meester', 'de', 'المعلم الذكر في المرحلة الابتدائية', 'መምህር (ተባዕታይ)', 'barsiisaa dhiiraa', 'male teacher (informal)', 'Meester Jan leert de kinderen rekenen en tafels.'],
      ['het huiswerk', 'huiswerk', 'het', 'الواجب المنزلي المدرسي اليومي', 'ዕዮ ገዛ', 'hojii manaa barnootaa', 'homework', 'Maak eerst je huiswerk voordat je buiten gaat spelen.'],
      ['het examen', 'examen', 'het', 'الامتحان النهائي الرسمي للشهادة', 'ፈተና', 'qormaata guddaa', 'exam / examination', 'Iedereen studeert hard voor het inburgeringsexamen.'],
      ['de toets', 'toets', 'de', 'الاختبار القصير الدوري في الفصل', 'ፈተና (ሓጻር)', 'qormaata gabaabaa', 'test / quiz', 'Vrijdag hebben we een toets over de nieuwe woordenschat.'],
      ['het cijfer', 'cijfer', 'het', 'العلامة والدرجة المدرسية من 1 إلى 10', 'ውጽኢት ፈተና (ነጥቢ)', 'qabxii qormaataa', 'grade / mark', 'Zij haalde een prachtige 8,5 voor haar spreekvaardigheid.'],
      ['het rapport', 'rapport', 'het', 'الشهادة المدرسية وبطاقة الدرجات', 'ናይ ቤት ትምህርቲ ጸብጻብ (ራፖርት)', 'gabaasa bu\'aa barumsaa', 'school report card', 'Voor de zomervakantie krijgen alle kinderen hun rapport.'],
      ['het diploma', 'diploma', 'het', 'الشهادة الرسمية للتخرج أو الإنجاز', 'ዲፕሎማ', 'dippiloomaa', 'diploma / certificate', 'Gefeliciteerd met het behalen van je Nederlandse diploma!'],
      ['de klas', 'klas', 'de', 'الصف الدراسي والزملاء في نفس الغرفة', 'ክፍሊ', 'kutaa barnootaa', 'class / classroom group', 'Er zitten 24 nieuwsgierige kinderen in de klas.'],
      ['het lokaal', 'lokaal', 'het', 'غرفة الصف والقاعة المدرسية', 'ክፍሊ ትምህርቲ (ቦታ)', 'kutaa daree', 'classroom', 'Loop rustig naar lokaal 104 op de eerste verdieping.'],
      ['het krijtbord', 'krijtbord', 'het', 'السبورة التقليدية للطباشير', 'ሰሌዳ', 'gabatee gurraacha', 'chalkboard / blackboard', 'De docent schrijft de datum duidelijk op het bord.'],
      ['de schooltas', 'schooltas', 'de', 'الحقيبة المدرسية للكتب والدفاتر', 'ቦርሳ ትምህርቲ', 'boorsaa barumsaa', 'school bag / backpack', 'Pak je schooltas in voor de volgende schooldag.'],
      ['de etui', 'etui', 'de', 'المقلمة لحفظ الأقلام والممحاة', 'መቐመጢ ብርዒ', 'qodaa qalamaa', 'pencil case', 'In mijn etui zitten pennen, een potlood en een gum.'],
      ['de liniaal', 'liniaal', 'de', 'المسطرة للقياس ورسم الخطوط', 'መስመር', 'sarartuu', 'ruler', 'Trek een kaarsrechte lijn met de plastic liniaal.'],
      ['de schaar', 'schaar', 'de', 'المقص المدرسي للورق والأشغال', 'መቐስ', 'magaazii / haamtuu', 'scissors', 'Knip de plaatjes voorzichtig uit met de kinderschaar.'],
      ['de lijm', 'lijm', 'de', 'الصمغ والغراء للصق الأوراق', 'ልባም / ማጣበቒ', 'muka qabsiisaa (liimmii)', 'glue', 'Plak het knipsel vast met een beetje lijm.'],
      ['het schrift', 'schrift', 'het', 'دفتر الكتابة والتدريبات المدرسية', 'ደፍተር', 'dabattara', 'notebook / exercise book', 'Schrijf de nieuwe woorden netjes in je schrift.'],
      ['de pauze', 'pauze', 'de', 'استراحة الغداء واللعب في الفناء', 'ዕረፍቲ', 'boqonnaa', 'break / recess', 'In de pauze eten we fruit en spelen we op het schoolplein.'],
      ['het schoolplein', 'schoolplein', 'het', 'باحة وفناء المدرسة للعب والركض', 'ቀጽሪ ቤት ትምህርቲ', 'dirree mana barumsaa', 'schoolyard / playground', 'De kinderen rennen vrolijk rond op het schoolplein.']
    ]
  },

  // Werk & Beroep (Work & Professions)
  {
    category: 'Werk & Beroep',
    icon: '💼',
    color: '#059669',
    bg: '#ECFDF5',
    words: [
      ['het contract', 'contract', 'het', 'عقد العمل القانوني الموقع بين الطرفين', 'ውዕል', 'waliigaltee', 'contract', 'Lees het arbeidscontract aandachtig voor je tekent.'],
      ['het salaris', 'salaris', 'het', 'الراتب الشهري المدفوع في الحساب', 'ደሞዝ', 'mindaa / miindaa', 'salary / wage', 'Het salaris wordt rond de 25e van de maand overgemaakt.'],
      ['het loonstrookje', 'loonstrookje', 'het', 'قسيمة كشف الراتب وتفاصيل الضرائب', 'ወረቐት ደሞዝ', 'waraqaa mindaa', 'payslip', 'Op het loonstrookje zie je het bruto en netto salaris.'],
      ['het uitzendbureau', 'uitzendbureau', 'het', 'وكالة التوظيف والعمل المؤقت', 'ቤት ጽሕፈት ስራሕ', 'waajjira qacarsa yeroo', 'temp agency / recruitment agency', 'Schrijf je in bij het uitzendbureau om snel werk te vinden.'],
      ['de vacature', 'vacature', 'de', 'الوظيفة الشاغرة المعروضة في الإعلانات', 'ክፉት ስራሕ', 'hojii banaa', 'job vacancy', 'Ik zag een interessante vacature voor logistiek medewerker.'],
      ['het cv', 'cv', 'het', 'السيرة الذاتية المهنية للتقديم', 'ናይ ስራሕ ታሪኽ (CV)', 'seenaa hojii fi barnootaa (cv)', 'CV / resume', 'Zet je opleidingen en werkervaring overzichtelijk op je cv.'],
      ['de sollicitatie', 'sollicitatie', 'de', 'التقديم على وظيفة شاغرة وإرسال الطلب', 'ምሕታት ስራሕ', 'hojii iyyachuu', 'job application', 'Zij stuurt vandaag haar sollicitatiebrief en cv op.'],
      ['de werkgever', 'werkgever', 'de', 'صاحب العمل والشركة الموظِفة', 'ኣስራሒ', 'abbaa qacarsaa', 'employer', 'Een goede werkgever zorgt voor een veilige werkomgeving.'],
      ['de werknemer', 'werknemer', 'de', 'الموظف والعامل في المنشأة', 'ሰራሕተኛ', 'hojjetaa', 'employee', 'Iedere werknemer heeft recht op wettelijke vakantiedagen.'],
      ['de collega', 'collega', 'de', 'زميل العمل في نفس المكتب أو الورشة', 'መሳርሕቲ', 'hiriyaa hojii', 'colleague / co-worker', 'Mijn collega helpt me altijd met de computer.'],
      ['de manager', 'manager', 'de', 'المدير أو المشرف المسؤول عن الفريق', 'ሓላፊ / ማናጀር', 'hoggantoo / maanaajera', 'manager / supervisor', 'Bespreek je vakantiewensen eerst even met de manager.'],
      ['de vergadering', 'vergadering', 'de', 'الاجتماع الرسمي لمناقشة العمل', 'ኣኼባ', 'walga\'ii', 'meeting', 'We hebben elke maandagochtend een korte teamvergadering.'],
      ['de proeftijd', 'proeftijd', 'de', 'فترة التجربة التدريبية الأولى في العمل', 'ናይ ፈተነ ግዜ', 'yeroo qormaata hojii', 'probation period', 'Tijdens de proeftijd van één maand kunnen beide partijen opzeggen.'],
      ['de stage', 'stage', 'de', 'التدريب العملي للطلاب في بيئة العمل', 'ልምምድ ስራሕ (ስታጅ)', 'shaakala hojii (leenjii)', 'internship', 'Tijdens zijn mbo-stage leert hij werken in een garage.'],
      ['de timmerman', 'timmerman', 'de', 'النجار الماهر في صناعة الخشب', 'ጸራቢ', 'anxarxarii', 'carpenter', 'De timmerman maakt een prachtige houten keukenkast.'],
      ['de schilder', 'schilder', 'de', 'الدهان وعامل طلاء الجدران', 'ቐባኢ ገዛ', 'dibaa manaa', 'painter', 'De schilder verft alle deuren en ramen strak in de lak.'],
      ['de loodgieter', 'loodgieter', 'de', 'السباك المصلح لأنابيب المياه والمجاري', 'ሰራሕተኛ ሻምብቆ (ቧንቧ)', 'hojjetaa ujummoo bishaanii', 'plumber', 'Bel de loodgieter voor de lekkende kraan in de badkamer.'],
      ['de elektricien', 'elektricien', 'de', 'فني الكهرباء وتمديد الأسلاك', 'ኤለክትሪክኛ', 'oogeessa elektiriikii', 'electrician', 'De elektricien installeert nieuwe stopcontacten in de keuken.'],
      ['de kapper', 'kapper', 'de', 'الحلاق ومصفف الشعر', 'ቀራጽ ጸጕሪ', 'haaddaa rifeensaa', 'hairdresser / barber', 'Ik ga vanmiddag naar de kapper om mijn haar te knippen.'],
      ['de monteur', 'monteur', 'de', 'الميكانيكي أو فني الصيانة والتركيب', 'ሞንተር / መካኒክ', 'mikaanika', 'mechanic / technician', 'De monteur repareert de remmen van onze auto.']
    ]
  },

  // Wonen & Huishouden (Living & Household)
  {
    category: 'Wonen & Huishouden',
    icon: '🛋️',
    color: '#D97706',
    bg: '#FEF3C7',
    words: [
      ['de huur', 'huur', 'de', 'الإيجار الشهري للشقة أو البيت', 'ክራይ ገዛ', 'kiraa manaa', 'rent', 'Betaal de maandelijkse huur altijd voor de eerste van de maand.'],
      ['de verhuurder', 'verhuurder', 'de', 'المؤجر أو شركة الإسكان المالكة', 'ኣካራዪ ገዛ', 'kireessaa manaa', 'landlord / housing association', 'Neem contact op met de verhuurder bij een lekkage.'],
      ['de borg', 'borg', 'de', 'مبلغ التأمين المسترد عند الاستئجار', 'መተሓዛ ገንዘብ (ቦርግ)', 'qabsiisa maallaqaa (borg)', 'deposit', 'Bij het tekenen van het huurcontract betaal je één maand borg.'],
      ['de buren', 'buren', 'de', 'الجيران المقيمون في المنازل المجاورة', 'ጎረባብቲ', 'ollaawwan', 'neighbors', 'Zeg vriendelijk goedendag tegen je buren in de straat.'],
      ['de brievenbus', 'brievenbus', 'de', 'صندوق البريد الخاص بالمراسلات والطرود', 'ሳንዱቕ ጶስጣ', 'saanduqa poostaa', 'mailbox / letterbox', 'Kijk elke middag even of er post in de brievenbus ligt.'],
      ['de deurbel', 'deurbel', 'de', 'جرس الباب الخارجي للزوار', 'ደወል ማዕጾ', 'bilbila balbalaa', 'doorbell', 'Druk op de deurbel als je op bezoek komt.'],
      ['de slotenmaker', 'slotenmaker', 'de', 'صانع الأقفال والمفاتيح', 'ሰራሕተኛ መዕጸዊ', 'hojjetaa kuflii', 'locksmith', 'Als je je sleutels kwijt bent, moet de slotenmaker komen.'],
      ['de gang', 'gang', 'de', 'الممر أو الردهة الداخلية في المنزل', 'ኮሪደር / መተሓላለፊ', 'karaa qaxxaamuraa manaa (gang)', 'hallway / corridor', 'Hang je natte jas aan de kapstok in de gang.'],
      ['de kapstok', 'kapstok', 'de', 'علاقة المعاطف والسترات عند المدخل', 'መንጠልጠሊ ጃኬት', 'fannoo kootii', 'coat rack', 'Er hangen drie warme winterjassen aan de kapstok.'],
      ['de spiegel', 'spiegel', 'de', 'المرآة العاكسة للصورة', 'መስትያት', 'daawwitii', 'mirror', 'Bekijk jezelf in de spiegel voor je de deur uitgaat.'],
      ['het gordijn', 'gordijn', 'het', 'الستارة القماشية للنوافذ لحجب الضوء', 'መጋረጃ', 'golgaa foddaa (sharaa)', 'curtain', 'Doe \'s avonds de gordijnen dicht voor meer privacy.'],
      ['het kussen', 'kussen', 'het', 'الوسادة أو المخدة المريحة للرأس والظهر', 'መተርኣስ', 'boraatii', 'pillow / cushion', 'Een zacht kussen op de bank zit heerlijk comfortabel.'],
      ['de deken', 'deken', 'de', 'البطانية الدافئة للسرير', 'ቆቦርታ', 'ulafaa / kobortaa', 'blanket', 'Onder deze warme wollen deken heb je het nooit koud.'],
      ['het laken', 'laken', 'het', 'ملاءة أو شرشف السرير القطني', 'ኣንሶላ', 'anxarsaa / sharafa siree', 'bed sheet', 'Verschoon het laken van het bed minstens elke twee weken.'],
      ['de wasmand', 'wasmand', 'de', 'سلة الغسيل للملابس المتسخة', 'ቅርጫት ቆሻሻ ክዳውንቲ', 'qunnaa huccuu qullaa\'uu', 'laundry basket', 'Gooi je vuile sokken direct in de wasmand.'],
      ['het wasmiddel', 'wasmiddel', 'het', 'مسحوق أو سائل الغسيل للملابس', 'ሳሙና ምሕጻብ ክዳን', 'saamunaa huccuu', 'laundry detergent', 'Gebruik één dopje vloeibaar wasmiddel per wasbeurt.'],
      ['de wasknijper', 'wasknijper', 'de', 'مشبك الغسيل لتثبيت الملابس على الحبل', 'መቐረጺ ክዳውንቲ', 'qabduu huccuu', 'clothespin / peg', 'Hang de natte was buiten op met stevige wasknijpers.'],
      ['het droogrek', 'droogrek', 'het', 'منشر الغسيل القابل للطي لتجفيف الثياب', 'መደርደሪ ንቑጽ ክዳን', 'fannoo huccuu gogsu', 'drying rack / clothes horse', 'Zet het droogrek bij de verwarming zodat het snel droogt.'],
      ['de emmer', 'emmer', 'de', 'الدلو البلاستيكي أو المعدني للماء', 'ባልዲ', 'baaldii', 'bucket', 'Vul de emmer met warm water en een scheut allesreiniger.'],
      ['de dweil', 'dweil', 'de', 'الممسحة أو خرقة مسح الأرضيات', 'ጨርቂ መወልወሊ መሬት', 'huccuu lafa qulqulleessituu', 'floor cloth / mop', 'Wring de dweil goed uit voor je de tegels poetst.'],
      ['de bezem', 'bezem', 'de', 'المكنسة اليدوية لكنس الأرض والأوراق', 'መኮስተሪ', 'haritii', 'broom', 'Veeg de stoep schoon voor het huis met de bezem.'],
      ['stoffer en blik', 'stoffer en blik', 'het', 'المكنسة الصغيرة والجاروف لجمع القمامة', 'መኮስተርን መዕረዪ ሓመድን', 'haritii gabaabaa fi qodaa faanaa', 'dustpan and brush', 'Pak stoffer en blik om de glasscherven op te vegen.']
    ]
  },

  // Natuur & Dieren (Nature & Animals)
  {
    category: 'Natuur & Dieren',
    icon: '🌳',
    color: '#15803D',
    bg: '#F0FDF4',
    words: [
      ['de boom', 'boom', 'de', 'الشجرة الكبيرة ذات الأغصان والظلال', 'ኦም', 'muka', 'tree', 'Er staat een oude eikenboom in het midden van het veld.'],
      ['het blad', 'blad', 'het', 'الورقة الخضراء للنبات أو الشجرة', 'ቆጽሊ', 'baala', 'leaf', 'In de herfst verkleuren de bladeren van groen naar geel en rood.'],
      ['de tak', 'tak', 'de', 'الغصن المتفرع من جذع الشجرة', 'ጨንፈር', 'damee muka', 'branch / twig', 'De vogeltjes zingen vrolijk op de tak.'],
      ['het gras', 'gras', 'het', 'العشب الأخضر الناعم في الحديقة والحدائق العامة', 'ሳዕሪ', 'marga', 'grass', 'Loop op blote voeten over het zachte gras.'],
      ['het bos', 'bos', 'het', 'الغابة الكثيفة بالأشجار والمسارات', 'ጫካ', 'bosona', 'forest / woods', 'We maken op zaterdag een frisse wandeling in het bos.'],
      ['de bloem', 'bloem', 'de', 'الزهرة الجميلة المتفتحة ذات الرائحة العطرة', 'ዕምባባ', 'abaaboo', 'flower', 'In het voorjaar bloeien kleurrijke tulpen in de tuin.'],
      ['de tulp', 'tulp', 'de', 'زهرة التوليب الشهيرة رمز هولندا', 'ቱሊፕ (ዕምባባ)', 'abaaboo tuulipii', 'tulip', 'Miljoenen rode en gele tulpen sieren de Hollandse bollenvelden.'],
      ['de vogel', 'vogel', 'de', 'الطائر المغرد في السماء أو على الشجر', 'ነፋሪት / ዑፍ', 'shinbira / simbirroo', 'bird', 'Een vogel bouwt een veilig nestje voor haar eieren.'],
      ['de eend', 'eend', 'de', 'البطة المائية السابحة في البركة والبحيرة', 'ደርሆ ማይ (ራዛ)', 'daakiyyee', 'duck', 'De kinderen voeren broodkruimels aan de eenden in het park.'],
      ['de zwaan', 'zwaan', 'de', 'البجعة البيضاء الأنيقة في الماء', 'ዝዋን (ዓባይ ጻዕዳ ራዛ)', 'hiddii galaanaa (zwaan)', 'swan', 'Een prachtige witte zwaan glijdt rustig over de gracht.'],
      ['de hond', 'hond', 'de', 'الكلب الأليف الوفي للصاحب', 'ከልቢ', 'saree', 'dog', 'De buurman laat zijn trouwe hond drie keer per dag uit.'],
      ['de kat', 'kat', 'de', 'القطة الأليفة الناعمة', 'ድሙ', 'adurre / qamalee', 'cat', 'De kat ligt lekker te spinnen in het warme zonnetje.'],
      ['het paard', 'paard', 'het', 'الحصان القوي في الحقل والمزرعة', 'ፈረስ', 'farda', 'horse', 'Het paard galoppeert sierlijk door de uitgestrekte wei.'],
      ['de koe', 'koe', 'de', 'البقرة الحلوب في المرعى الهولندي الأخضر', 'ላም', 'sa\'a', 'cow', 'Nederlandse zwart-witte koeien geven heerlijke verse melk.'],
      ['het schaap', 'schaap', 'het', 'الخروف ذو الصوف الأبيض على الديك', 'በጊዕ', 'hoolaa', 'sheep', 'De schapen grazen tevreden op de groene dijk.'],
      ['de geit', 'geit', 'de', 'الماعز اللطيف في مزرعة الأطفال', 'ጤል', 're\'ee', 'goat', 'Kinderen aaien de geitjes op de kinderboerderij.'],
      ['het varken', 'varken', 'het', 'الخنزير في الحظيرة', 'ሓሰማ', 'booyyee', 'pig', 'Het varkentje rolt graag door de modder om af te koelen.'],
      ['het konijn', 'konijn', 'het', 'الأرنب السريع ذو الأذنين الطويلتين', 'ማንቲለ', 'hilleensa', 'rabbit', 'Het konijntje knabbelt rustig aan een oranje wortel.'],
      ['de muis', 'muis', 'de', 'الفأر الصغير السريع في الجحر', 'ኣንጭዋ', 'hantuuta', 'mouse', 'Er ritselt een klein veldmuisje tussen de bladeren.'],
      ['de bij', 'bij', 'de', 'النحلة النشيطة المجمعة للعسل والرحيق', 'ንህቢ', 'kanniisa', 'bee', 'Bijen vliegen van bloem naar bloem om nectar te verzamelen.'],
      ['de vlinder', 'vlinder', 'de', 'الفراشة الملونة الرقيقة بين الأزهار', 'ጽምብላሊዕ', 'billaacha', 'butterfly', 'Een felgekleurde vlinder fladdert door de zonnige tuin.'],
      ['de vis', 'vis', 'de', 'السمكة السابحة في الماء', 'ዓሳ', 'qurxummii', 'fish', 'Verse haring is een traditionele Nederlandse lekkernij.']
    ]
  },

  // Eigenschappen & Tegenstellingen (Adjectives & Opposites)
  {
    category: 'Eigenschappen & Vormen',
    icon: '✨',
    color: '#6366F1',
    bg: '#EEF2FF',
    words: [
      ['groot', 'groot', '', 'كبير الحجم أو القامة', 'ዓቢ', 'guddaa', 'big / large', 'Zij wonen in een groot nieuwbouwhuis.'],
      ['klein', 'klein', '', 'صغير الحجم أو السن', 'ንእሽቶ', 'xiqqaa', 'small / little', 'Een klein kopje koffie na het eten.'],
      ['lang', 'lang', '', 'طويل القامة أو المسافة أو المدة', 'ነዊሕ', 'dheeraa', 'tall / long', 'Hij is erg lang, wel twee meter!'],
      ['kort', 'kort', '', 'قصير المسافة أو الوقت', 'ሓጺር', 'gabaabaa', 'short', 'We houden vandaag een korte pauze van tien minuten.'],
      ['dik', 'dik', '', 'سميك أو بدين', 'ረጒድ / ስቡሕ', 'furdaa', 'thick / fat', 'Trek een dikke winterjas aan als het vriest.'],
      ['dun', 'dun', '', 'نحيف أو رقيق السمك', 'ቀጣን', 'qalloo / haphii', 'thin / slim', 'Snijd de komkommer in hele dunne plakjes.'],
      ['warm', 'warm', '', 'دافئ أو حار الجو والماء', 'ዉዑይ', 'ho\'aa', 'warm / hot', 'In de zomer kan het hier behoorlijk warm worden.'],
      ['koud', 'koud', '', 'بارد الجو أو المشروب', 'ዝሑል', 'qorraa / dhaamota', 'cold', 'In de winter waait er een koude noordenwind.'],
      ['heet', 'heet', '', 'ساخن جداً يغلي', 'ኣዝዩ ዉዑይ', 'hedduu ho\'aa', 'hot (boiling)', 'Pas op met de soep, die is gloeiend heet!'],
      ['licht', 'licht', '', 'خفيف الوزن أو مضيء وساطع', 'ፈኵስ / ብሩህ', 'salphaa / ifaa', 'light (weight/brightness)', 'Deze koffer is gelukkig heel licht om te dragen.'],
      ['zwaar', 'zwaar', '', 'ثقيل الوزن أو صعب الجهد', 'ኸቢድ', 'ulfaataa', 'heavy / hard', 'De verhuisdoos vol boeken is veel te zwaar.'],
      ['snel', 'snel', '', 'سريع الحركة والوتيرة', 'ቅልጡፍ', 'saffisaa / ariifataa', 'fast / quick', 'De intercity is een hele snelle trein.'],
      ['langzaam', 'langzaam', '', 'بطيء الحركة والتمهل', 'ድሑር / ህዱእ', 'suuta / suutaa', 'slow', 'De schildpad loopt heel langzaam door het zand.'],
      ['mooi', 'mooi', '', 'جميل ورائع المظهر', 'ጽቡቕ', 'bareedaa', 'beautiful / pretty', 'Wat een prachtige en mooie bos bloemen!'],
      ['lelijk', 'lelijk', '', 'قبيح المنظر أو غير جذاب', 'ሕማቕ ቅርጺ (ዘይጽቡቕ)', 'fokisaa', 'ugly', 'Dat oude verlaten fabrieksgebouw oogt erg lelijk.'],
      ['nieuw', 'nieuw', '', 'جديد لم يستعمل من قبل', 'ሓድሽ', 'haaraa', 'new', 'Gefeliciteerd met je splinternieuwe fiets!'],
      ['oud', 'oud', '', 'قديم أو مسن في العمر', 'ኣረጊት / ዓቢ', 'moofaa / maanguddoo', 'old', 'Mijn opa is al negentig jaar oud.'],
      ['jong', 'jong', '', 'شاب أو صغير في العمر', 'መንእሰይ', 'dargaggoo', 'young', 'Jonge kinderen leren een taal spelenderwijs.'],
      ['schoon', 'schoon', '', 'نظيف ونقي من الأوساخ', 'ጽሩይ', 'qulqulluu', 'clean', 'Trek na het douchen schone kleren aan.'],
      ['vies', 'vies', '', 'متسخ أو كريه الطعم والرائحة', 'ቆሻሻ / ዘይጥዑም', 'xuraa\'aa / kan hin mi\'oofne', 'dirty / nasty', 'Was je handen als ze vies zijn van de aarde.'],
      ['vol', 'vol', '', 'ممتلئ تماماً حتى الحافة', 'ምሉእ', 'guutuu', 'full', 'De bus zit helemaal vol met passagiers.'],
      ['leeg', 'leeg', '', 'فارغ لا يحتوي على شيء', 'ባዶ', 'duwwaa', 'empty', 'De waterfles is leeg, ik zal hem weer bijvullen.'],
      ['duur', 'duur', '', 'غالي الثمن ومرتفع السعر', 'ክቡር ዋጋ', 'mi\'aa', 'expensive', 'Wonen in het centrum van Amsterdam is heel duur.'],
      ['goedkoop', 'goedkoop', '', 'رخيص الثمن ومناسب السعر', 'ሕሱር ዋጋ', 'rakhaasa / gatii salphaa', 'cheap / inexpensive', 'Op de markt vind je verse groenten voor een goedkope prijs.'],
      ['makkelijk', 'makkelijk', '', 'سهل ويسير لا صعوبة فيه', 'ቀሊል', 'salphaa', 'easy', 'Deze eerste Nederlandse les is erg makkelijk te volgen.'],
      ['moeilijk', 'moeilijk', '', 'صعب ومعقد يحتاج تركيزاً', 'ኣጸጋሚ / ኸቢድ', 'rakkisaa / ulfaataa', 'difficult / hard', 'De grammatica van de verleden tijd is soms best moeilijk.'],
      ['duidelijk', 'duidelijk', '', 'واضح وجلي مفهوم للجميع', 'ንጹር', 'ifaa kan ta\'e', 'clear / plain', 'De instructies van de dokter zijn heel duidelijk.']
    ]
  },

  // Gemeente, Politie & Documenten (Civics, Documents & Safety)
  {
    category: 'Gemeente & Documenten',
    icon: '🏛️',
    color: '#0F766E',
    bg: '#CCFBF1',
    words: [
      ['de gemeente', 'gemeente', 'de', 'البلدية والإدارة المحلية للمدينة', 'ምምሕዳር ከተማ (ከተማ)', 'bulchiinsa magaalaa (gemeente)', 'municipality / city hall', 'Voor een verhuizing moet je je inschrijven bij de gemeente.'],
      ['het BSN', 'BSN', 'het', 'الرقم الوطني للخدمة المدنية للمواطن والمقيم', 'ናይ ዜግነት ቁጽሪ (BSN)', 'lakkoofsa tajaajila lammummaa (BSN)', 'citizen service number (BSN)', 'Iedereen die in Nederland woont heeft een uniek BSN nodig.'],
      ['de DigiD', 'DigiD', 'de', 'الهوية الرقمية لتسجيل الدخول الحكومي الإلكتروني', 'ዲጂታል መንነት (DigiD)', 'mallattoo eenyummaa dijitaalaa (DigiD)', 'digital ID for government services', 'Log veilig in bij de overheid met je persoonlijke DigiD.'],
      ['de verblijfsvergunning', 'verblijfsvergunning', 'de', 'تصريح وبطاقة الإقامة الرسمية القانونية', 'ፍቓድ መንበሪ', 'eeyyama jireenyaa', 'residence permit', 'Draag je geldige verblijfsvergunning altijd bij je.'],
      ['de IND', 'IND', 'de', 'دائرة الهجرة والتجنيس الهولندية', 'ቤት ጽሕፈት ስደተኛታት (IND)', 'waajjira godaansaa fi lammummaa (IND)', 'Immigration and Naturalisation Service', 'De IND beslist over asielaanvragen en verblijfsdocumenten.'],
      ['de afspraak', 'afspraak', 'de', 'الموعد المسبق المحدد باليوم والساعة', 'ቆጸራ', 'beellama', 'appointment', 'Maak eerst digitaal een afspraak via de website van de gemeente.'],
      ['het loket', 'loket', 'het', 'شباك الخدمة والمراجعة للمواطنين', 'መስኮት ኣገልግሎት (ሎኬት)', 'foodda tajaajilaa (loket)', 'counter / service desk', 'Meld u met uw afspraaknummer bij balie of loket 3.'],
      ['het formulier', 'formulier', 'het', 'الاستمارة أو النموذج الرسمي لتعبئة البيانات', 'ፎርም', 'foormii', 'form / application sheet', 'Vul het aanvraagformulier volledig en naar waarheid in.'],
      ['de handtekening', 'handtekening', 'de', 'التوقيع الخطي الرسمي للشخص', 'ፊርማ', 'mallattoo', 'signature', 'Zet hieronder uw handtekening en de datum van vandaag.'],
      ['de tolk', 'tolk', 'de', 'المترجم الفوري الشفهي بين اللغات', 'ኣስተርጓሚ', 'turjumaana', 'interpreter', 'Bij het medisch onderzoek was er gelukkig een tolk aanwezig.'],
      ['de post', 'post', 'de', 'البريد والرسائل الورقية الواصلة', 'ጶስጣ', 'poostaa', 'mail / postal correspondence', 'Controleer regelmatig je brievenbus voor belangrijke post.'],
      ['de envelop', 'envelop', 'de', 'المغلف والظرف الورقي لحفظ الخطاب', 'ፖስታ', 'konbooltaa poostaa', 'envelope', 'Plak een geldige postzegel rechtsboven op de envelop.'],
      ['de postzegel', 'postzegel', 'de', 'طابع البريد اللاصق للرسائل', 'ቴምብር ጶስጣ', 'staampii poostaa', 'postage stamp', 'Voor een brief binnen Nederland heb je een postzegel met een 1 nodig.'],
      ['de belasting', 'belasting', 'de', 'الضرائب الحكومية المفروضة على الدخل والمبيعات', 'ግብሪ', 'gibira', 'tax', 'In het voorjaar doe je aangifte van de inkomstenbelasting.'],
      ['de toeslag', 'toeslag', 'de', 'الدعم والمعونة المالية من الدولة (إيجار/صحة)', 'ሓገዝ መንግስቲ (ቱስላግ)', 'gargaarsa maallaqaa mootummaa (toeslag)', 'allowance / government benefit', 'Heb je recht op zorgtoeslag of huurtoeslag?'],
      ['de politie', 'politie', 'de', 'الشرطة ورجال الأمن لحفظ النظام والنجدة', 'ፖሊስ', 'poolisii', 'police', 'Bij levensbedreigende noodgevallen bel je direct 112.'],
      ['de boete', 'boete', 'de', 'الغرامة المالية عند مخالفة القانون', 'መቕጻዕቲ ገንዘብ', 'adabbii maallaqaa', 'fine / penalty ticket', 'Rijden door rood licht levert een fikse boete op.'],
      ['de wet', 'wet', 'de', 'القانون والتشريع الملزم للجميع في البلاد', 'ሕጊ', 'seera', 'law', 'In Nederland is iedereen gelijk voor de wet.'],
      ['de vrijheid', 'vrijheid', 'de', 'الحرية والكرامة الإنسانية لكل فرد', 'ሓርነት / ናጽነት', 'bilisummaa', 'freedom / liberty', 'Vrijheid van meningsuiting is een belangrijk grondrecht.'],
      ['de vrede', 'vrede', 'de', 'السلام والأمان والاستقرار والوئام', 'ሰላም', 'nagaa', 'peace', 'Ieder mens verlangt naar vrede en veiligheid.']
    ]
  },

  // Tijd, Dagen & Seizoenen (Time, Days & Seasons)
  {
    category: 'Tijd & Kalender',
    icon: '⏳',
    color: '#3B82F6',
    bg: '#EFF6FF',
    words: [
      ['de maandag', 'maandag', 'de', 'يوم الإثنين، بداية الأسبوع الدراسي والعملي', 'ሰኑይ', 'wixata', 'Monday', 'Maandag is de eerste werkdag van de week.'],
      ['de dinsdag', 'dinsdag', 'de', 'يوم الثلاثاء', 'ሰሉስ', 'kibxata', 'Tuesday', 'Op dinsdag hebben we taalles op school.'],
      ['de woensdag', 'woensdag', 'de', 'يوم الأربعاء', 'ረቡዕ', 'roobii', 'Wednesday', 'Op woensdagmiddag zijn de basisscholen vaak vrij.'],
      ['de donderdag', 'donderdag', 'de', 'يوم الخميس', 'ሓሙስ', 'kamisa', 'Thursday', 'Donderdagavond is in veel steden koopavond.'],
      ['de vrijdag', 'vrijdag', 'de', 'يوم الجمعة المبارك ونهاية الأسبوع', 'ዓርቢ', 'jimaata', 'Friday', 'Vrijdagmiddag wensen we elkaar een fijn weekend.'],
      ['de zaterdag', 'zaterdag', 'de', 'يوم السبت، يوم العطلة والتسوق', 'ቀዳም', 'sanbata duraa', 'Saturday', 'Op zaterdag doen we de grote weekboodschappen.'],
      ['de zondag', 'zondag', 'de', 'يوم الأحد، يوم الراحة العائلية', 'ሰንበት', 'dilbata', 'Sunday', 'Zondag is een rustige dag voor familie en ontspanning.'],
      ['het weekend', 'weekend', 'het', 'عطلة نهاية الأسبوع (السبت والأحد)', 'ቀዳም-ሰንበት', 'dhuma torbee (sanbata)', 'weekend', 'Wat zijn jouw plannen voor het komend weekend?'],
      ['de ochtend', 'ochtend', 'de', 'الصباح الباكر وبداية شروق الشمس', 'ንግሆ', 'ganama', 'morning', 'Goedemorgen! Wat een mooie zonnige ochtend.'],
      ['de middag', 'middag', 'de', 'فترة الظهيرة وما بعد الظهر', 'ድሕሪ ቐትሪ', 'waaree booda', 'afternoon', 'Vanmiddag om twee uur hebben we een afspraak.'],
      ['de avond', 'avond', 'de', 'المساء بعد غروب الشمس والسكينة', 'ምሸት', 'galgala', 'evening', 'Fijne avond en tot ziens morgenochtend!'],
      ['de nacht', 'nacht', 'de', 'الليل والظلام ووقت النوم العميق', 'ለይቲ', 'halkan', 'night', 'Goedenacht en slaap lekker zometeen.'],
      ['gisteren', 'gisteren', '', 'أمس واليوم الفائت', 'ትማሊ', 'kaleessa', 'yesterday', 'Gisteren regende het bijna de hele dag.'],
      ['vandaag', 'vandaag', '', 'اليوم الحاضر والوقت الحالي', 'ሎሚ', 'har\'a', 'today', 'Vandaag is een perfecte dag om nieuwe woorden te leren.'],
      ['morgen', 'morgen', '', 'غداً واليوم القادم في المستقبل', 'ጽባሕ', 'bori', 'tomorrow', 'Morgen gaan we gezellig op bezoek bij vrienden.'],
      ['overmorgen', 'overmorgen', '', 'بعد غد (بعد يومين)', 'ድሕሪ ጽባሕ', 'iftaan', 'day after tomorrow', 'Overmorgen hebben we geen les, het is een vrije dag.'],
      ['eergisteren', 'eergisteren', '', 'أول أمس (قبل يومين)', 'ቅድሚ ትማሊ', 'dengadda', 'day before yesterday', 'Eergisteren heb ik de was al helemaal gedaan.'],
      ['de lente', 'lente', 'de', 'فصل الربيع وتفتح الأزهار والبراعم', 'ጽድያ', 'arfaasaa', 'spring', 'In de lente wordt het weer warmer en bloeien de bomen.'],
      ['de zomer', 'zomer', 'de', 'فصل الصيف المشمس والأيام الطويلة', 'ሓጋይ (ክረምቲ ወጻኢ)', 'bona', 'summer', 'In de zomer hebben de kinderen zes weken vakantie.'],
      ['de herfst', 'herfst', 'de', 'فصل الخريف وتساقط الأوراق والرياح', 'መኸር', 'biraa', 'autumn / fall', 'In de herfst vallen de gekleurde bladeren van de bomen.'],
      ['de winter', 'winter', 'de', 'فصل الشتاء البارد والصقيع والجليد', 'ክረምቲ', 'ganna / qorra', 'winter', 'In de winter vriest het soms en ligt er ijs op de sloten.']
    ]
  }
];

// Helper to generate clean SVG glyph card
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
    <text x="120" y="140" font-size="62" font-family="'Segoe UI', Roboto, -apple-system, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${glyph}</text>
  </g>
</svg>`.trim();
}

const newUniqueWords = [];

function addCandidate(raw) {
  const word = raw.word.trim();
  const lowerWord = word.toLowerCase();
  if (seenWords.has(lowerWord)) return;
  seenWords.add(lowerWord);

  const lemma = raw.lemma || word.replace(/^(de|het)\s+/, '');
  const id = `word_${lowerWord.replace(/[^a-z0-9]/g, '_')}_${existingWords.length + newUniqueWords.length + 1}`;
  
  newUniqueWords.push({
    id: id,
    word: word,
    lemma: lemma,
    article: raw.article !== undefined ? raw.article : (word.startsWith('de ') ? 'de' : word.startsWith('het ') ? 'het' : ''),
    category: raw.category || 'Algemeen',
    translations: {
      ar: (raw.translations && raw.translations.ar) ? raw.translations.ar : '',
      ti: (raw.translations && raw.translations.ti) ? raw.translations.ti : '',
      om: (raw.translations && raw.translations.om) ? raw.translations.om : '',
      en: (raw.translations && raw.translations.en) ? raw.translations.en : ''
    },
    example: raw.example || '',
    svg: raw.svg || generateSvgCard(id, raw.color || '#2563EB', raw.bg || '#F8FAFC', raw.glyph || '★')
  });
}

// Ingest massive definitions
massiveDefinitions.forEach(item => {
  addCandidate(item);
});

// Ingest more definitions
moreDefinitions.forEach(item => {
  addCandidate(item);
});

// Ingest additional batches
additionalBatches.forEach(batch => {
  batch.words.forEach(w => {
    const [word, lemma, article, ar, ti, om, en, example] = w;
    addCandidate({
      word: word,
      lemma: lemma,
      article: article,
      category: batch.category,
      color: batch.color,
      bg: batch.bg,
      glyph: batch.icon,
      translations: { ar, ti, om, en },
      example: example
    });
  });
});

console.log(`New unique words added: ${newUniqueWords.length}`);
console.log(`Total words will be: ${existingWords.length + newUniqueWords.length}`);

// If still need more to exceed 1000 additional words (need existing + 1000 = 1354):
const neededMore = Math.max(0, 1354 - (existingWords.length + newUniqueWords.length));
console.log(`Need ${neededMore} more words to reach target of >= 1354 total words.`);

// Export so far
module.exports = {
  existingWords,
  newUniqueWords,
  neededMore
};
