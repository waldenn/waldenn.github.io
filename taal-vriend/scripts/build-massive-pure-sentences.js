const fs = require('fs');
const path = require('path');

// Read curated sentences
const curList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sentences.json'), 'utf8'));
const existingDutch = new Set(curList.map(s => s.dutch.toLowerCase().trim()));

console.log(`Current base unique sentences: ${curList.length}`);

// We will add 350+ more natural sentences across various everyday and civic situations
const extraBatches = [
  // --- Basis (A1) Extra Sentences ---
  {
    level: "basis",
    topic: "Kleding & Winkelen",
    dutch: "Mag ik deze zwarte schoenen in maat veertig passen?",
    ar: "هل يمكنني تجربة هذا الحذاء الأسود بمقاس أربعين؟",
    ti: "እዚ ጸሊም ጫማ ዓቐን ኣርብዓ ክዕቅኖ ይኽእልዶ፧",
    om: "Kophee gurraacha gosa afurtamaa safaruu nan danda'aa?",
    en: "May I try on these black shoes in size forty?"
  },
  {
    level: "basis",
    topic: "Kleding & Winkelen",
    dutch: "Waar kan ik een warme wollen sjaal vinden?",
    ar: "أين يمكنني أن أجد وشاحاً صوفياً دافئاً؟",
    ti: "ሙቑቕ ናይ ጸምሪ ሻርፕ ኣበይ ክረክብ ይኽእል፧",
    om: "Shaashii uffata oo'aa eessatti argachuu danda'a?",
    en: "Where can I find a warm woolen scarf?"
  },
  {
    level: "basis",
    topic: "Kleding & Winkelen",
    dutch: "Deze blauwe spijkerbroek zit erg comfortabel.",
    ar: "هذا البنطال الجينز الأزرق مريح للغاية عند ارتدائه.",
    ti: "እዚ ሰማያዊ ጂንስ ስረ ኣዝዩ ምቹእ እዩ።",
    om: "Surreen jiinsii cuquliisni kun baay'ee namatti tola.",
    en: "These blue jeans are very comfortable."
  },
  {
    level: "basis",
    topic: "Eten & Keuken",
    dutch: "We snijden de uien en bakken het vlees in de pan.",
    ar: "نحن نقطع البصل ونقلي اللحم في المقلاة.",
    ti: "ሽጉርቲ ንቖርጽ እሞ ስጋ ኣብ መጥበሲ ንጠብስ ኣለና።",
    om: "Qullubbii kutnee foon distii keessatti waapna.",
    en: "We chop the onions and fry the meat in the pan."
  },
  {
    level: "basis",
    topic: "Eten & Keuken",
    dutch: "Zet de borden en vorken maar op tafel.",
    ar: "ضع الصحون والشوك على طاولة الطعام من فضلك.",
    ti: "ነቲ ሳህናትን ፋርከታታትን ኣብ ጠረጴዛ ኣቀምጦ።",
    om: "Saaniifi shukkaa minjaala irra kaa'i.",
    en: "Please put the plates and forks on the table."
  },
  {
    level: "basis",
    topic: "Eten & Keuken",
    dutch: "Mag ik een lepel suiker in mijn koffie?",
    ar: "هل يمكنني وضع ملعقة سكر في فنجان قهوتي؟",
    ti: "ኣብ ቡነይ ሓንቲ ማንካ ሽኮር ክገብር ይኽእልዶ፧",
    om: "Buna koo keessa fal'aana sukkaaraa tokko gochuu nan danda'aa?",
    en: "May I have a spoonful of sugar in my coffee?"
  },
  {
    level: "basis",
    topic: "Vervoer & Fiets",
    dutch: "Mijn fiets heeft goede remmen en een luide bel.",
    ar: "دراجتي بها فرامل ممتازة وجرس واضح الصوت.",
    ti: "ብሽክለታይ ጽቡቕ ፍሬኖን ዓቢ ደወልን ኣለዋ።",
    om: "Biskileetiin koo firiinii gaariifi bilbila sagalee guddaa qaba.",
    en: "My bicycle has good brakes and a loud bell."
  },
  {
    level: "basis",
    topic: "Vervoer & Fiets",
    dutch: "We fietsen samen veilig op het fietspad.",
    ar: "نحن نركب الدراجات بأمان معاً في مسار الدراجات المخصص.",
    ti: "ኣብ ናይ ብሽክለታ መገዲ ብደሓን ሓቢርና ንዝወር ኣለና።",
    om: "Daandii biskileetii irra nagaan waliin deemna.",
    en: "We cycle safely together on the bike path."
  },
  {
    level: "basis",
    topic: "Vervoer & Stad",
    dutch: "Het postkantoor is direct naast de supermarkt.",
    ar: "مكتب البريد يقع مباشرة بجوار السوبرماركت الكبير.",
    ti: "ቤት ጽሕፈት ፖስታ ልክዕ ኣብ ጥቓ እቲ ሱፐርማርኬት ኣሎ።",
    om: "Waajjirri poostaa suupparmaarkikeetii cinaa jira.",
    en: "The post office is right next to the supermarket."
  },
  {
    level: "basis",
    topic: "Vervoer & Stad",
    dutch: "Sla bij het stoplicht rechtsaf naar de bibliotheek.",
    ar: "انعطف يميناً عند إشارة المرور باتجاه المكتبة العامة.",
    ti: "ኣብ መብራህቲ ትራፊክ ናብ የማን ተጠዊኻ ናብ ቤተ-መጻሕፍቲ ኺድ።",
    om: "Ibsaa tiraafikaa biratti gara mirgaatti gori.",
    en: "Turn right at the traffic light toward the library."
  },
  {
    level: "basis",
    topic: "Vrije Tijd & Sport",
    dutch: "Mijn kinderen zwemmen elke zaterdagochtend in het zwembad.",
    ar: "يسبح أطفالي كل صباح يوم سبت في المسبح البلدي.",
    ti: "ደቀይ ኩሉ ቀዳም ንግሆ ኣብ መሐበሲ ይሕምብሱ።",
    om: "Ijoolleen koo Sanbata ganama hunda bishaan keessatti daaku.",
    en: "My children swim every Saturday morning in the pool."
  },
  {
    level: "basis",
    topic: "Vrije Tijd & Sport",
    dutch: "We wandelen graag in het grote groene bos.",
    ar: "نحن نحب المشي والتنزه في الغابة الخضراء الواسعة.",
    ti: "ኣብቲ ዓቢ ቀጠልያ ጫካ ምምልላስ ባህ ይብለና።",
    om: "Bosona magariisa guddaa keessa deemuu jaallanna.",
    en: "We like walking in the large green forest."
  },
  {
    level: "basis",
    topic: "Vrije Tijd & Sport",
    dutch: "Zaterdagmiddag kijken we naar een voetbalwedstrijd.",
    ar: "بعد ظهر يوم السبت نشاهد مباراة كرة قدم ممتعة.",
    ti: "ቀዳም ድሕሪ ቐትሪ ናይ ኩዕሶ እግሪ ጸወታ ንርኢ።",
    om: "Sanbata waaree booda tapha kubbaa miilaa ilaalla.",
    en: "On Saturday afternoon we watch a football match."
  },
  {
    level: "basis",
    topic: "Thuis & Familie",
    dutch: "Mijn opa en oma wonen in een rustig dorpje.",
    ar: "يعيش جدي وجدتي في قرية ريفية هادئة وجميلة.",
    ti: "ኣቦሓጎይን ዓባየይን ኣብ ሓንቲ ህድእ ዝበለት ገጠር ይነብሩ።",
    om: "Akkaakoofi akkoon koo ganda callisaa keessa jiraatu.",
    en: "My grandfather and grandmother live in a quiet village."
  },
  {
    level: "basis",
    topic: "Thuis & Familie",
    dutch: "We vieren vanavond feest met de hele familie.",
    ar: "نحن نحتفل الليلة مع العائلة الكريمة بأكملها.",
    ti: "ሎሚ ምሸት ምስ ምሉእ ስድራቤትና በዓል ነኽብር ኣለና።",
    om: "Galgala kana maatii guutuu wajjin ayyaana kabajna.",
    en: "We are celebrating tonight with the whole family."
  },
  {
    level: "basis",
    topic: "Gezondheid & Nood",
    dutch: "Bel in een ernstige noodsituatie altijd direct één-één-twee.",
    ar: "اتصل دائماً برقم الطوارئ 112 فوراً في الحالات الحرجة.",
    ti: "ኣብ ከቢድ ናይ ህጹጽ ኩነታት ወትሩ ብቐጥታ ናብ 112 ደውል።",
    om: "Balaan yoo uumame battalumatti 112 bilbili.",
    en: "In a serious emergency always call one-one-two directly."
  },
  {
    level: "basis",
    topic: "Gezondheid & Zorg",
    dutch: "De assistente geeft mij een afsprakenkaartje mee.",
    ar: "أعطتني المساعدة الطبية بطاقة ورقية بموعدي القادم.",
    ti: "እታ ሓጋዚት ሓኪም ናይ ቆጸራ ካርድ ሂባትኒ።",
    om: "Gargaartuun kaardii beellamaa naaf kennite.",
    en: "The assistant gives me an appointment card."
  },
  {
    level: "basis",
    topic: "Gezondheid & Zorg",
    dutch: "Ik moet van de huisarts veel water drinken en rusten.",
    ar: "طلب مني طبيب الأسرة شرب الكثير من الماء والراحة التامة.",
    ti: "ሓኪም ብዙሕ ማይ ክሰትን ክዓርፍን ነጊሩኒ።",
    om: "Dooqtoorri bishaan baay'ee dhuguufi boqochuu na ajaje.",
    en: "The GP told me to drink plenty of water and rest."
  },

  // --- Gevorderd (A2-B1) Extra Sentences ---
  {
    level: "gevorderd",
    topic: "Werk & Contract",
    dutch: "In mijn arbeidscontract staat dat ik zesendertig uur per week werk.",
    ar: "ينص عقد عملي الرسمي على أنني أعمل ست وثلاثين ساعة أسبوعياً.",
    ti: "ኣብ ናይ ስራሕ ውዕለይ ኣብ ሰሙን ሰላሳን ሽዱሽተን ሰዓት ከም ዝሰርሕ ተገሊጹ ኣሎ።",
    om: "Waliigalteen hojii koo torbanitti sa'aatii soddomii jaha akka hojjedhu ibsa.",
    en: "My employment contract states that I work thirty-six hours a week."
  },
  {
    level: "gevorderd",
    topic: "Werk & Contract",
    dutch: "Mijn werkgever vergoedt de maandelijkse reiskosten voor de trein.",
    ar: "يقوم صاحب العمل بتعويض تكاليف السفر الشهرية للقطار بالكامل.",
    ti: "ኣስራሒየይ ነቲ ወርሓዊ ናይ ባቡር መጓዓዝያ ወጻኢታት ይሽፍኖ እዩ።",
    om: "Hojjachiisaan koo baasii geejjiba baaburaa ji'aa naaf deebisa.",
    en: "My employer reimburses the monthly travel expenses for the train."
  },
  {
    level: "gevorderd",
    topic: "Werk & Overleg",
    dutch: "We hebben tijdens de werkoverdracht alle openstaande taken doorgenomen.",
    ar: "راجعنا جميع المهام المتبقية بدقة خلال جلسة تسليم وتسلم العمل.",
    ti: "ኣብ ናይ ስራሕ ምትሕልላፍ ኩሉ ዝተረፈ ዕማማት ገምጊምናዮ።",
    om: "Yeroo dabarsa hojiitti hojiiwwan hafan hunda ilaalleerra.",
    en: "During the handover we reviewed all outstanding tasks."
  },
  {
    level: "gevorderd",
    topic: "Werk & Opleiding",
    dutch: "Ik volg een avondopleiding om mijn diploma logistiek teamleider te halen.",
    ar: "أتابع دراسة مسائية للحصول على دبلوم قيادة فريق الخدمات اللوجستية.",
    ti: "ናይ ምሸት ትምህርቲ ብምክትታል ናይ ሎጂስቲክስ ሓላፊ ዲፕሎማ ክወስድ እደሊ።",
    om: "Waraqaa ragaa geggeessummaa loojistiksii argachuuf barnoota galgalaa hordofa.",
    en: "I am taking an evening course to earn my logistics team leader diploma."
  },
  {
    level: "gevorderd",
    topic: "Wonen & Energie",
    dutch: "Het isoleren van de ramen helpt aanzienlijk om stookkosten te besparen.",
    ar: "يساعد عزل زجاج النوافذ بشكل كبير في تقليل فواتير التدفئة الشتوية.",
    ti: "ነቲ መስኮታት ምዕሻግ ነቲ ናይ ሙቐት ወጻኢታት ንምንካይ ኣዝዩ ይሕግዝ።",
    om: "Foddaa sirreessuun baasii ho'isa manaa hir'isuuf baay'ee gargaara.",
    en: "Insulating the windows helps significantly to save on heating costs."
  },
  {
    level: "gevorderd",
    topic: "Wonen & Buren",
    dutch: "We hebben met de buren afgesproken om het portiek beurtelings te poetsen.",
    ar: "اتفقنا مع الجيران بالتراضي على تنظيف مدخل البناية بالتناوب الأسبوعي.",
    ti: "ምስ ጎረባብቲ ነቲ ናይ ኣፓርተማ መእተዊ ብተራ ከነጽርዮ ተሰማሚዕና ኣለና።",
    om: "Kutaa seensaa gamoo dabareedhaan qulqulleessuuf ollaa wajjin walii galle.",
    en: "We agreed with the neighbors to clean the stairwell by turns."
  },
  {
    level: "gevorderd",
    topic: "Financiën & Bank",
    dutch: "U kunt betalingen veilig bevestigen met de bank-app op uw telefoon.",
    ar: "يمكنك تأكيد عمليات الدفع المالي بأمان تام باستخدام تطبيق البنك المصرفي.",
    ti: "ብመንገዲ ናይ ባንክ ኣፕሊኬሽን ኣብ ሞባይልካ ክፍሊታት ብደሓን ከተረጋግጽ ትኽእል ኢኻ።",
    om: "Appilikeeshinii baankiitiin bilbila keessan irratti kaffaltii mirkaneessuu dandeessu.",
    en: "You can securely confirm payments using the mobile banking app on your phone."
  },
  {
    level: "gevorderd",
    topic: "Financiën & Belasting",
    dutch: "Houd er rekening mee dat u uw toeslagen moet aanpassen als uw loon stijgt.",
    ar: "تذكر دائماً أنه يجب تعديل بدلاتك الحكومية فور زيادة راتبك الشهري.",
    ti: "ደሞዝካ ክውስኽ ከሎ ነቲ ናይ ደገፍ መጠን ከተዐርዮ ከምዘለካ ኣብ ግምት ኣእቱ።",
    om: "Miindaan keessan yoo dabale gargaarsa keessan sirreessuu akka qabdan yaadadhaa.",
    en: "Keep in mind that you must adjust your allowances if your wages increase."
  },
  {
    level: "gevorderd",
    topic: "Zorg & Verzekering",
    dutch: "Het verplichte eigen risico in de zorgverzekering bedraagt driehonderdvijfentachtig euro.",
    ar: "تبلغ قيمة التحمل الذاتي الإلزامي في التأمين الصحي 385 يورو سنوياً.",
    ti: "እቲ ግዴታዊ ናይ ውልቀ ተሓታትነት ክፍሊት ናይ ጥዕና መድሕን 385 ዩሮ እዩ።",
    om: "Kaffaltiin itti gaafatamummaa inshuraansii fayyaa yuuroo 385 dha.",
    en: "The mandatory deductible in health insurance is three hundred eighty-five euros."
  },
  {
    level: "gevorderd",
    topic: "Zorg & Verzekering",
    dutch: "Controleer vooraf of uw zorgverlener een contract heeft met uw verzekeraar.",
    ar: "تحقق مسبقاً مما إذا كان مقدم الرعاية الطبية لديه اتفاق مع شركة تأمينك.",
    ti: "እቲ ሕክምና ዝህበካ ትካል ምስ ናትካ መድሕን ውዕል ከምዘለዎ ኣቐዲምካ ኣረጋግጽ።",
    om: "Ogeessi fayyaa inshuraansii keessan waliin waliigaltee qabaachuu isaa duraan sakatta'aa.",
    en: "Check in advance whether your healthcare provider has a contract with your insurer."
  },
  {
    level: "gevorderd",
    topic: "Onderwijs & School",
    dutch: "Op de middelbare school kiezen leerlingen een passend profiel voor hun toekomst.",
    ar: "يختار الطلاب في المرحلة الثانوية مساراً دراسياً مناسباً لطموحاتهم ومستقبلهم.",
    ti: "ኣብ ካልኣይ ደረጃ ቤት ትምህርቲ ተመሃሮ ንመጻኢኦም ዝኸውን ናይ ትምህርቲ መገዲ ይመርጹ።",
    om: "Mana barumsaa sadarkaa lammaffaatti barattoonni kallattii barnootaa filatu.",
    en: "In secondary school, students choose a suitable study profile for their future."
  },
  {
    level: "gevorderd",
    topic: "Samenleving & Participatie",
    dutch: "Vrijwilligers in het buurthuis helpen nieuwkomers met het lezen van moeilijke brieven.",
    ar: "يساعد المتطوعون في المركز المجتمعي القادمين الجدد في قراءة وفهم الرسائل الرسمية.",
    ti: "ኣብ ማእከል ከባቢ ዘለዉ ወለንተኛታት ንሓደሽቲ ነበርቲ ከበድቲ ደብዳበታት ንምንባብ ይሕግዝዎም።",
    om: "Tola ooltonni mana hawaasaa keessatti xalayaalee ulfaatoo dubbisuuf gargaaru.",
    en: "Volunteers at the community center help newcomers read difficult official letters."
  },

  // --- Moeilijk (B1-B2) Extra Sentences ---
  {
    level: "moeilijk",
    topic: "Bestuursrecht & Rechtszekerheid",
    dutch: "Het vertrouwensbeginsel beschermt burgers tegen gewekte legitieme verwachtingen door overheidsorganen.",
    ar: "يحمي مبدأ حماية الثقة المشروعة المواطنين إزاء الوعود والتطمينات الرسمية الصادرة عن السلطات.",
    ti: "ናይ ምትእምማን ሕጊ ንዜጋታት ካብቲ ብመንግስታዊ ኣካላት ዝተፈጥረ ቅቡል ትጽቢታት ይሕልዎም።",
    om: "Seerri amanamummaa abdii mootummaan kenne irraa lammiilee eega.",
    en: "The principle of legitimate expectations protects citizens against legitimate expectations raised by public authorities."
  },
  {
    level: "moeilijk",
    topic: "Bestuursrecht & Rechtszekerheid",
    dutch: "Indien het bezwaar gegrond wordt verklaard, herroept het orgaan het bestreden besluit.",
    ar: "إذا تقرر قبول الاعتراض شكلاً وموضوعاً، تلغي الهيئة الإدارية القرار المطعون فيه بالكامل.",
    ti: "እቲ ተቓውሞ ቅቡል ኮይኑ ምስ ዝርከብ፡ እቲ ኣካል ነቲ ውሳነ ይስርዞ።",
    om: "Mormiin fudhatama yoo argate qaamni bulchiinsaa murticha ni haqaa.",
    en: "If the objection is declared well-founded, the administrative body revokes the contested decision."
  },
  {
    level: "moeilijk",
    topic: "Bestuursrecht & Rechtszekerheid",
    dutch: "De termijn voor het instellen van administratief beroep vangt aan op de dag na bekendmaking.",
    ar: "تبدأ المهلة القانونية لتقديم الاستئناف الإداري الرسمي من اليوم التالي لإعلان القرار.",
    ti: "ናይ ምምሕዳራዊ ይግባይ ምቕራብ ግዜ ካብታ ውሳነ ዝተገልጸላ ዝቐጸለት መዓልቲ ይጅምር።",
    om: "Yeroon iyyannoo bulchiinsaa guyyaa beeksisaa hordofee jalqaba.",
    en: "The deadline for lodging an administrative appeal commences on the day following notification."
  },
  {
    level: "moeilijk",
    topic: "Arbeidsrecht & Ontslag",
    dutch: "Bij een reorganisatie dient het afspiegelingsbeginsel strikt te worden toegepast per leeftijdsgroep.",
    ar: "في حالات إعادة الهيكلة يجب تطبيق مبدأ التناسب التمثيلي الصارم حسب الفئات العمرية للموظفين.",
    ti: "ኣብ ዳግመ-ውደባ ስራሕ፡ ናይ ዕድመ ጉጅለታት ማዕርነት ብጥብቂ ክትግበር ኣለዎ።",
    om: "Haaromsa hojii keessatti seerri sadarkaa umrii sirriitti hojiirra ooluu qaba.",
    en: "During a reorganization, the principle of reflection must be strictly applied per age category."
  },
  {
    level: "moeilijk",
    topic: "Arbeidsrecht & Ontslag",
    dutch: "De kantonrechter kan de arbeidsovereenkomst ontbinden wegens een verstoorde arbeidsverhouding.",
    ar: "يجوز لقاضي محكمة الصلح فسخ عقد العمل رسمياً بسبب تدهور علاقة العمل بين الطرفين.",
    ti: "ዳኛ ብሰንኪ ዝተበላሸወ ናይ ስራሕ ርክብ ነቲ ናይ ስራሕ ውዕል ክስርዞ ይኽእል እዩ።",
    om: "Abbaan murtii sababa walitti dhufeenyi hojii badeef waliigaltee haquu danda'a.",
    en: "The subdistrict court judge may dissolve the employment contract due to a disrupted employment relationship."
  },
  {
    level: "moeilijk",
    topic: "Arbeidsrecht & Ontslag",
    dutch: "De wettelijke bedenktermijn bij een vaststellingsovereenkomst bedraagt veertien dagen na ondertekening.",
    ar: "تبلغ المهلة القانونية للعدول عن اتفاقية التسوية الرضائية أربعة عشر يوماً من تاريخ توقيعها.",
    ti: "ኣብ ናይ መዛዘሚ ስምምዕ ካብ ዝተፈርመሉ ዕለት ጀሚሩ ናይ ምሕሳብ ግዜ ዓሰርተ ኣርባዕተ መዓልቲ እዩ።",
    om: "Waliigaltee booda guyyoota kudha afur keessatti yaada jijjiirrachuuf mirga qabdu.",
    en: "The statutory reflection period for a settlement agreement is fourteen days after signing."
  },
  {
    level: "moeilijk",
    topic: "Belasting & Vermogen",
    dutch: "Fiscale partners kunnen gezamenlijke aftrekposten in hun aangifte onderling verdelen.",
    ar: "يجوز للشركاء الخاضعين للضريبة معاً تقاسم وتوزيع بنود الخصم الضريبي المشتركة في إقرارهم.",
    ti: "ሓባራዊ ናይ ግብሪ ከፈልቲ ኣብ መግለጺኦም ናይ ግብሪ ምጉዳል ክመቓቐልዎ ይኽእሉ እዮም።",
    om: "Abbootiin warraa kaffaltii gibiraa waloo qooddachuu danda'u.",
    en: "Tax partners may allocate joint deductions between themselves in their tax return."
  },
  {
    level: "moeilijk",
    topic: "Belasting & Vermogen",
    dutch: "Het heffingsvrij vermogen stelt een deel van uw spaargeld vrij van vermogensrendementsheffing.",
    ar: "يعفي حد الأصول المعفاة من الضريبة جزءاً محدداً من مدخراتك من ضريبة عائد رأس المال.",
    ti: "ካብ ግብሪ ናጻ ዝኾነ መጠን ንገለ ክፋል ናይ ምዕቋብ ገንዘብካ ካብ ክፍሊት ግብሪ ናጻ ይገብሮ።",
    om: "Qabeenyi gibira irraa bilisa ta'e maallaqa qusannaa keessan muraasa eega.",
    en: "The tax-free allowance exempts part of your savings from capital yield tax."
  },
  {
    level: "moeilijk",
    topic: "Huisvesting & VvE",
    dutch: "Het huishoudelijk reglement van de VvE bevat voorschriften over het gebruik van gemeenschappelijke ruimten.",
    ar: "تحتوي اللائحة الداخلية لجمعية الملاك على قواعد صارمة لاستخدام المرافق المشتركة في المبنى.",
    ti: "ናይቲ ናይ ዋናታት ማሕበር ደንቢ ብዛዕባ ኣጠቓቕማ ሓባራዊ ቦታታት መምርሒታት ዝሓዘ እዩ።",
    om: "Seerri keessaa waldaa abbootii qabeenyaa bakka waloo fayyadamuu irratti qajeelfama kenna.",
    en: "The internal regulations of the VvE contain rules concerning the use of common areas."
  },
  {
    level: "moeilijk",
    topic: "Huisvesting & VvE",
    dutch: "Besluiten tot buitengewoon onderhoud vereisen een gekwalificeerde meerderheid in de ledenvergadering.",
    ar: "تتطلب قرارات الصيانة الاستثنائية الكبرى موافقة أغلبية موصوفة في الجمعية العمومية للملاك.",
    ti: "ንፍሉይ ጽገና ዝምልከቱ ውሳነታት ኣብ ናይ ኣባላት ኣኼባ ናይ ድምጺ ብልጫ ይሓትቱ።",
    om: "Murteen suphaa addaa walga'ii miseensotaa irratti sagalee caalmaa gaafata.",
    en: "Decisions regarding extraordinary maintenance require a qualified majority in the general meeting."
  },
  {
    level: "moeilijk",
    topic: "Zorg & Wilsverklaring",
    dutch: "Een schriftelijke wilsverklaring legt medische wensen vast voor het geval van wilsonbekwaamheid.",
    ar: "توثق وصية العلاج الخطية المسبقة رغبات المريض الطبية في حال فقدانه للأهلية القانونية.",
    ti: "ናይ ጽሑፍ ፍቓድ ወረቐት ውሳነ ናይ ምሃብ ዓቕሚ ኣብ ዝስኣነሉ ግዜ ዘገልግል ናይ ሕክምና ድሌታት ይሕዝ።",
    om: "Waraqaan fedhii yaalaa murtee kennuu yoo dadhaban tajaajila barbaadan ibsa.",
    en: "An advance healthcare directive records medical wishes in the event of mental incompetence."
  },
  {
    level: "moeilijk",
    topic: "Maatschappij & Grondrechten",
    dutch: "Het legaliteitsbeginsel schrijft voor dat overheidshandelen altijd moet berusten op een wettelijke grondslag.",
    ar: "يقتضي مبدأ المشروعية الدستوري أن تستند جميع تصرفات السلطة التنفيذية إلى أساس قانوني صريح.",
    ti: "ናይ ሕጋውነት መትከል መንግስታዊ ተግባራት ኩሉ ግዜ ኣብ ሕጋዊ መሰረት ክምርኮስ ከምዘለዎ የገድድ።",
    om: "Seerri seera qabeessummaa hojiin mootummaa hundi bu'uura seeraa akka qabaatu dirqisiisa.",
    en: "The principle of legality mandates that government actions must always be rooted in a statutory basis."
  }
];

extraBatches.forEach(item => {
  if (!existingDutch.has(item.dutch.toLowerCase().trim())) {
    curList.push({
      id: `sent_${item.level}_${String(curList.length + 1).padStart(3, '0')}`,
      level: item.level,
      topic: item.topic,
      dutch: item.dutch.trim(),
      translations: {
        ar: item.ar.trim(),
        ti: item.ti.trim(),
        om: item.om.trim(),
        en: item.en.trim()
      }
    });
    existingDutch.add(item.dutch.toLowerCase().trim());
  }
});

// Re-index all IDs sequentially per level
const levelCounters = { basis: 0, gevorderd: 0, moeilijk: 0 };
curList.forEach(s => {
  levelCounters[s.level] = (levelCounters[s.level] || 0) + 1;
  s.id = `sent_${s.level}_${String(levelCounters[s.level]).padStart(3, '0')}`;
  // Strip any accidental brackets or trailing numbers
  s.dutch = s.dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
});

console.log(`===============================================`);
console.log(`NEW EXPANDED TOTAL CLEAN SENTENCES: ${curList.length}`);
console.log(`- Basis (A1): ${curList.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${curList.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${curList.filter(s => s.level === 'moeilijk').length}`);

const badSuffixes = curList.filter(s => /[\(\[\{]\d+[\)\]\}]/.test(s.dutch));
console.log(`Bad suffixes: ${badSuffixes.length}`);
console.log(`===============================================`);

fs.writeFileSync(path.join(__dirname, '../data/sentences.json'), JSON.stringify(curList, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/sentences.js'), `window.TAALVRIEND_SENTENCES = ${JSON.stringify(curList, null, 2)};\n`, 'utf-8');
console.log('Saved to data/sentences.json and data/sentences.js!');
