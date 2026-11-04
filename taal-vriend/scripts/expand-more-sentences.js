const fs = require('fs');
const path = require('path');

const curList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sentences.json'), 'utf8'));
const existingDutch = new Set(curList.map(s => s.dutch.toLowerCase().trim()));

function addSentence(level, topic, dutch, ar, ti, om, en) {
  const norm = dutch.toLowerCase().trim();
  if (!existingDutch.has(norm)) {
    curList.push({
      id: `sent_${level}_${String(curList.length + 1).padStart(3, '0')}`,
      level: level,
      topic: topic,
      dutch: dutch.trim(),
      translations: {
        ar: ar.trim(),
        ti: ti.trim(),
        om: om.trim(),
        en: en.trim()
      }
    });
    existingDutch.add(norm);
  }
}

const moreBasis = [
  ["Weer", "Het regent vandaag erg hard, neem je paraplu mee.", "المطر يهطل بغزارة اليوم، خذ مظلتك معك عند الخروج.", "ሎሚ ኃያል ዝናብ ይዘንብ ኣሎ፡ ጽላልካ ምሳኻ ውሰድ።", "Har'a bokkaan baay'ee rooba, gaachana bokkaa qabadhu.", "It is raining very hard today, take your umbrella with you."],
  ["Weer", "In de herfst vallen de gele bladeren van de bomen.", "في فصل الخريف تتساقط أوراق الأشجار الصفراء على الأرض.", "ኣብ ቀውዒ እቶም ብጫ ኣቑጽልቲ ካብ ኣእዋም ይረግፉ።", "Baqqee keessa baallaan keelloo mukarraa harca'a.", "In autumn the yellow leaves fall from the trees."],
  ["Weer", "De zon schijnt warm aan de blauwe hemel.", "تشرق الشمس الدافئة في السماء الزرقاء الصافية اليوم.", "እታ ምውቕቲ ጸሓይ ኣብቲ ሰማያዊ ሰማይ ተብርቕ ኣላ።", "Aduun ho'ituun samii cuquliisaa keessaa baati.", "The sun is shining warm in the blue sky."],
  ["Weer", "Het waait flink, doe je dikke winterjas aan.", "الرياح تهب بقوة، ارتدِ معطفك الشتوي الثقيل للدفء.", "ኃያል ንፋስ ይነፍስ ኣሎ፡ እቲ ረጒድ ናይ ክረምቲ ጃኬትካ ልበሶ።", "Qilleensi cimaan jira, kootii gannaa furdaa uffadhu.", "It is blowing quite hard, put on your thick winter coat."],
  ["Sport", "Elke woensdagmiddag voetbalt mijn zoon bij de lokale club.", "يلعب ابني كرة القدم في النادي المحلي كل بعد ظهر أربعاء.", "ወደይ ኣብ ነፍሲ ወከፍ ረቡዕ ድሕሪ ቀትሪ ኣብ ከባቢኡ ዘሎ ክለብ ኩዕሶ እግሪ ይጻወት።", "Ilmi koo Roobii hunda galgala kilaba naannootti kubbaa miilaa taphata.", "Every Wednesday afternoon my son plays soccer at the local club."],
  ["Sport", "Ik ga vanavond een uur zwemmen in het overdekte zwembad.", "سأذهب الليلة للسباحة لمدة ساعة في المسبح الداخلي المغلق.", "ምሸት ኣብቲ ውሽጢ ዘሎ ናይ ምሕንባስ ቦታ ንሓደ ሰዓት ክሕንብስ እየ።", "Galgala sa'aatii tokkoof mana dhiqannaa keessatti nan daaka.", "I am going swimming for an hour in the indoor pool tonight."],
  ["Vrije tijd", "In het weekend wandelen we graag ontspannen door het bos.", "نحب المشي والاسترخاء عبر مسارات الغابة الهادئة في عطلة نهاية الأسبوع.", "ኣብ ቀዳመ-ሰንበት ብደስታ ኣብ ውሽጢ ጫካ ንዘዋወር።", "Dhuma torbaniitti bosona keessa bashannanuuf deemuu jaallanna.", "On the weekend we like to take a relaxing walk through the forest."],
  ["Vrije tijd", "Mijn dochter leest graag spannende boeken voor het slapengaan.", "تحب ابنتي قراءة الكتب المشوقة والقصص قبل الذهاب إلى النوم.", "ጓለይ ቅድሚ ምድቃሳ ባህ ዘብሉ መጻሕፍቲ ምንባብ ትፈቱ።", "Intalli koo osoo hin rafin dura kitaaba asoosamaa dubbisuu jaallatti.", "My daughter likes reading exciting books before going to bed."],
  ["Dieren", "De hond blaft vrolijk als zijn baasje thuiskomt.", "ينبح الكلب بمرح عندما يعود صاحبه إلى البيت.", "እቲ ከልቢ ዋናኡ ናብ ገዛ ክምለስ ከሎ ብሓጎስ ይነብሕ።", "Sareen yeroo abbaan manatti galu gammachuun iyyiti.", "The dog barks happily when its owner comes home."],
  ["Dieren", "Er zwemmen eenden en zwanen in de brede stadsgracht.", "تسبح البطوط وطيور البجع الأبيض في قناة المدينة المائية.", "ኣብቲ ናይ ከተማ ቦይ ደርሆ-ማይን ጻዕዳ ደርሆ-ማይን ይሕንብሱ ኣለዉ።", "Daakiyyootaafi daakiyyoo adadiin ujummoo magaalaa keessa daaku.", "Ducks and swans are swimming in the wide city canal."],
  ["Boodschappen", "Waar kan ik de verse halfvolle melk vinden?", "أين يمكنني أن أجد الحليب الطازج قليل الدسم في المتجر؟", "እቲ ፍርቂ-ስብሒ ዘለዎ ሓድሽ ጸባ ኣበይ ክረኽቦ እኽእል፧", "Aannan haaraa sanyiin isaa walakkaa eessatti argadha?", "Where can I find the fresh semi-skimmed milk?"],
  ["Boodschappen", "Ik betaal mijn boodschappen met een contactloze pinpas.", "أدفع ثمن مشترياتي باستخدام بطاقة الصراف اللاتلامسية السريعة.", "ነቲ ዝገዛእክዎ ኣቑሑ ብዘይትንኪ ናይ ባንክ ካርድ እኸፍሎ።", "Gabaa koo kaardii baankiitiin nan kaffala.", "I pay for my groceries with a contactless debit card."],
  ["Boodschappen", "Vergeet niet een stevige boodschappentas mee te nemen.", "لا تنس أخذ حقيبة تسوق قماشية قوية معك إلى السوبرماركت.", "ጽኑዕ ናይ ዕዳጋ ቦርሳ ምሳኻ ምውሳድ ከይትረስዕ።", "Boorsaa gabaa cimaa qabachuu hin dagatin.", "Do not forget to take a sturdy shopping bag with you."],
  ["Huis", "De sleutels van de voordeur liggen op het tafeltje in de gang.", "مفاتيح الباب الأمامي موضوعة على الطاولة الصغيرة في الممر.", "መፋትሕ ናይቲ ቀንዲ በሪ ኣብቲ ኣብ ኮሪደር ዘሎ ጠረጴዛ ተቐሚጦም ኣለዉ።", "Furtuun balbala duraa teessoo xiqqoo daandii seensaa irra jiru.", "The keys to the front door are on the small table in the hallway."],
  ["Huis", "Ik was de donkere kleding op veertig graden in de machine.", "أغسل الملابس الداكنة على درجة حرارة أربعين في الغسالة.", "ነቶም ጸለምቲ ክዳውንቲ ኣብ መሐጸቢት ማሽን ብኣርብዓ ዲግሪ እሓጽቦም።", "Uffata gurraacha digrii afurtamatti mishiinaan dhiqa.", "I wash dark clothes at forty degrees in the washing machine."]
];

const moreGevorderd = [
  ["Afval", "In deze gemeente scheiden we papier, gft-afval, plastic en restafval nauwkeurig.", "نقوم في هذه البلدية بفرز الورق وبقايا الطعام والبلاستيك والنفايات المتبقية بدقة.", "ኣብዛ ማዘጋጃ ቤት ወረቐት፡ ናይ መግቢ ትርፊ፡ ፕላስቲክን ጐሓፍን ብጥንቃቐ ንፈልዮም ኢና።", "Magaalaa kana keessatti waraqaa, kosiifi pilaastikii addaan baasna.", "In this municipality we separate paper, organic waste, plastic, and residual waste carefully."],
  ["Afval", "De groene rolemmer voor groente- en tuinafval wordt om de twee weken geleegd.", "يتم تفريغ الحاوية الخضراء المخصصة لبقايا الخضار ونفايات الحدائق كل أسبوعين.", "እቲ ናይ ኣሕምልትን ጀርዲንን ቀጠልያ ናይ ጐሓፍ ባዞ ኣብ ክልተ ሰሙን ይሕጸብን ይባረቕን።", "Baldiin magariisi kosii biqiltootaa torban lama hunda dhangalaafama.", "The green wheelie bin for vegetable and garden waste is emptied every two weeks."],
  ["Bibliotheek", "Bij de openbare bibliotheek kun je boeken lenen, rustig studeren en internetten.", "يمكنك في المكتبة العامة استعارة الكتب والدراسة في هدوء واستخدام الإنترنت مجاناً.", "ኣብ ህዝባዊ ቤተ-መጻሕፍቲ መጻሕፍቲ ክትልቃሕ፡ ብህድኣት ክተጽንዕን ኢንተርኔት ክትጥቀምን ትኽእል ኢኻ።", "Mana kitaabaa ummataa keessatti kitaaba liqeeffachuu fi qayyabachuun ni danda'ama.", "At the public library you can borrow books, study quietly, and access the internet."],
  ["Vrijwilligerswerk", "Veel nieuwkomers doen vrijwilligerswerk om hun Nederlands sneller te verbeteren.", "يقوم العديد من القادمين الجدد بعمل تطوعي لتحسين لغتهم الهولندية بشكل أسرع وأفضل.", "ብዙሓት ሓደሽቲ መጻእቲ ቋንቋ ሆላንድ ብቕልጡፍ ንምምሕያሽ ወለንታዊ ስራሕ ይሰርሑ።", "Namoonni haaraan afaan Daachi gabbifachuuf tola ooltummaa hojjatu.", "Many newcomers do volunteer work to improve their Dutch more quickly."],
  ["Vrijwilligerswerk", "Vrijwilligerswerk helpt je om een sociaal netwerk op te bouwen en werkervaring op te doen.", "يساعد العمل التطوعي في بناء شبكة علاقات اجتماعية واكتساب خبرة مهنية قيمة في هولندا.", "ወለንታዊ ስራሕ ማሕበራዊ ርክባት ንምፍጣርን ናይ ስራሕ ልምዲ ንምድላብን ይሕግዝ።", "Hojiin tola ooltummaa hiriyoota argachuufi muuxannoo hojii qabaachuuf gargaara.", "Volunteering helps you build a social network and gain work experience."],
  ["Verzekering", "Het is verstandig om een aansprakelijkheidsverzekering af te sluiten voor onvoorziene schade.", "من الحكمة إبرام تأمين المسؤولية المدنية لتغطية أي أضرار غير مقصودة قد تلحق بالآخرين.", "ዘይተሓሰበ ዕንወት ምስ ዘጋጥም ንምሽፋን ናይ ተሓታትነት መድሕን ምእታው ጥበባዊ እዩ።", "Miidhaa tasaaf inshuraansii itti gaafatamummaa galchuun gaarii dha.", "It is sensible to take out third-party liability insurance for unforeseen damages."],
  ["Bank", "De bank zal u nooit via sms of e-mail vragen om uw pincode of inloggegevens.", "لن يطلب منك البنك أبداً عبر رسالة نصية أو بريد إلكتروني إرسال الرقم السري أو بياناتك.", "እቲ ባንክ ብናይ ሓጺር ጽሑፍ ወይ ብኢመይል ናይ ሚስጢር ቁጽርኻ ወይ መእተዊኻ ፈጺሙ ኣይሓተካን እዩ።", "Baankiin koodii iccitii keessan imeyiliidhaan matumaa hin gaafatu.", "The bank will never ask for your PIN or login details via text message or email."],
  ["Onderwijs", "Na de basisschool gaan leerlingen naar het voortgezet onderwijs, zoals vmbo, havo of vwo.", "بعد المدرسة الابتدائية ينتقل الطلاب إلى التعليم الثانوي حسب مستواهم الأكاديمي والمهني.", "ድሕሪ ቀዳማይ ብርኪ ትምህርቲ ተምሃሮ ናብ ካልኣይ ብርኪ ትምህርቲ ይቕጽሉ።", "Mana barumsaa sadarkaa duraa booda barattoonni gara sadarkaa lammaffaatti darbu.", "After primary school, pupils progress to secondary education, such as VMBO, HAVO, or VWO."],
  ["Onderwijs", "Ouders worden van harte uitgenodigd om mee te helpen bij schoolreisjes en sportdagen.", "تتم دعوة أولياء الأمور بحرارة للمساعدة في تنظيم الرحلات المدرسية والأنشطة الرياضية.", "ወለዲ ኣብ ናይ ቤት ትምህርቲ ጉዕዞታትን ናይ ስፖርት መዓልታትን ንኽሕግዙ ብኽብሪ ይዕደሙ።", "Warri qophii imala barumsaafi guyyaa ispoortii irratti akka gargaaran afeeramu.", "Parents are cordially invited to assist with school trips and sports days."],
  ["Cultuur", "Tijdens Koningsdag kleurt heel Nederland oranje en zijn er overal vrijmarkten.", "خلال عيد الملك تتزين كل هولندا باللون البرتقالي وتقام الأسواق المفتوحة في الشوارع.", "ኣብ መዓልቲ ንጉስ ብምሉኣ ኔዘርላንድስ ብኣራንሺ ሕብሪ ትደምቕ፡ ኣብ ኩሉ ድማ ናጻ ዕዳጋታት ይካየድ።", "Ayyaana Mootichaa irratti biyyi Neezerlaandis halluu burtukaanaa uffatti.", "During King's Day the whole of the Netherlands turns orange and free flea markets are everywhere."]
];

const moreMoeilijk = [
  ["Inburgering", "De Wet inburgering verplicht nieuwkomers om binnen drie jaar het inburgeringsexamen te behalen.", "يلزم قانون الاندماج القادمين الجدد باجتياز امتحانات الاندماج بنجاح خلال مهلة ثلاث سنوات.", "ሕጊ ምውህሃድ ሓደሽቲ መጻእቲ ኣብ ውሽጢ ሰለስተ ዓመት ናይ ምውህሃድ ፈተና ንኽሓልፉ የገድዶም።", "Seerri seensa biyyaa namoonni haaraan waggaa sadii keessatti qormaata akka darban dirqisiisa.", "The Civic Integration Act obligates newcomers to pass the integration exam within three years."],
  ["Inburgering", "Het participatieverklaringstraject is een verplicht onderdeel van de inburgering in Nederland.", "يعد مسار إعلان المشاركة المجتمعية جزءاً إلزامياً وأساسياً من مسار الاندماج المدني في هولندا.", "ናይ ተሳትፎ መግለጺ መስርሕ ሓደ ካብቲ ግዴታዊ ክፋል ናይ ምውህሃድ መስርሕ እዩ።", "Ibsa hirmaannaa mallatteessuun qaama dirqamaa seensa biyyaa ti.", "The participation declaration trajectory is a mandatory component of civic integration in the Netherlands."],
  ["Rechtspraak", "Iedere burger heeft het grondwettelijke recht op een eerlijk proces voor een onafhankelijke rechter.", "لكل مواطن حق دستوري أصيل في محاكمة عادلة وعلنية أمام قاضٍ مستقل ومحايد.", "ነፍሲ ወከፍ ዜጋ ኣብ ቅድሚ ናጻ ዳኛ ፍትሓዊ ናይ ፍርዲ መስርሕ ናይ ምርካብ ቅዋማዊ መሰል ኣለዎ።", "Lammiin hundi fuuldura abbaa seeraa bilisaatti murtii haqa qabeessa argachuuf mirga heeraa qaba.", "Every citizen has the constitutional right to a fair trial before an independent judge."],
  ["Rechtspraak", "Wie de kosten van een advocaat niet zelf kan dragen, kan in aanmerking komen voor gesubsidieerde rechtsbijstand.", "من لا يستطيع تحمل أتعاب المحامي بنفسه يمكنه الاستفادة من المساعدة القانونية الحكومية المدعومة.", "ናይ ጠበቓ ወጻኢታት ባዕሉ ክኸፍል ዘይክእል ሰብ፡ ናይ መንግስቲ ደገፍ ሕጋዊ ረድኤት ክረክብ ይኽእል እዩ።", "Namni baasii abukaatoo kaffaluu hin dandeenye deeggarsa seeraa mootummaa argachuu danda'a.", "Anyone who cannot afford lawyer fees may qualify for subsidized legal aid."],
  ["Gezondheidszorg", "Patiënten hebben recht op inzage in hun eigen medisch dossier en kunnen om een afschrift verzoeken.", "يحق للمرضى الاطلاع الكامل على ملفاتهم الطبية الخاصة وطلب نسخة ورقية أو رقمية منها.", "ሕሙማን ናይ ባዕሎም ናይ ሕክምና መዝገብ ናይ ምርኣይን ቅዳሕ ናይ ምሕታትን መሰል ኣለዎም።", "Dhukkubsattoonni galmee yaala isaanii ilaaluufi koppii gaafachuuf mirga qabu.", "Patients have the right to inspect their own medical records and may request a copy."],
  ["Sociale Zekerheid", "De bijstandsuitkering geldt als het ultieme financiële vangnet voor wie geen andere inkomsten heeft.", "تعتبر إعانة المساعدة الاجتماعية شبكة الأمان المالي الأخيرة لمن لا يملكون أي دخل أو مورد بديل.", "ናይ ማሕበራዊ ረድኤት ክፍሊት ካልእ እቶት ንዘይብሎም ሰባት ከም ናይ መወዳእታ ናይ ገንዘብ መዕቆቢ ተባሂሉ ይቑጸር።", "Gargaarsi hawaasummaa namoota galii biraa hin qabneef eegumsa maallaqaa isa dhumaa ti.", "Social assistance benefits serve as the ultimate financial safety net for those without other income."],
  ["Arbeidsmarkt", "Gelijke behandeling op de arbeidsmarkt zonder onderscheid naar herkomst, religie of geslacht is wettelijk verankerd.", "المعاملة المتساوية في سوق العمل دون تمييز على أساس الأصل أو الدين أو الجنس مكفولة قانوناً.", "ኣብ ናይ ስራሕ ዕዳጋ ብዘይ ኣድልዎ ብመበቆል፡ ሃይማኖት ወይ ጾታ ማዕረ ኣተሓሕዛ ብሕጊ ዝተረጋገጸ እዩ።", "Bakka hojiitti garaagarummaa sabaa, amantiifi saalaan malee qixxummaan qacaramuun seeraan mirkanaa'eera.", "Equal treatment in the labor market regardless of origin, religion, or gender is enshrined in law."],
  ["Milieu", "Gemeenten stimuleren verduurzaming van woningen door middel van subsidies voor isolatie en warmtepompen.", "تشجع البلديات تحسين كفاءة الطاقة في المنازل من خلال منح إعانات مالية للعزل ومضخات الحرارة.", "ማዘጋጃ ቤታት ንናይ ምውዓይን ምውሳኽን ደገፍ ገንዘብ ብምሃብ ኣባይቲ ብቐጻልነት ንኽመሓየሹ ይድርኻ።", "Bulchiinsi magaalaa manneen haaromsuuf deeggarsa maallaqaa kenna.", "Municipalities encourage home sustainability through subsidies for insulation and heat pumps."],
  ["Onderwijs", "Middelbaar beroepsonderwijs combineert theorie op school met intensieve praktijkstages bij erkende leerbedrijven.", "يجمع التعليم المهني المتوسط بين الدراسة النظرية في المعهد والتدريب العملي المكثف في شركات معتمدة.", "ማእከላይ ናይ ሞያ ትምህርቲ ነቲ ኣብ ቤት ትምህርቲ ዝወሃብ ክልሰ-ሓሳብ ምስ ተግባራዊ ናይ ስራሕ ልምምድ የጠምሮ።", "Barnoonni ogummaa barumsa daree fi shaakala qabatamaa walitti mika.", "Secondary vocational education combines classroom theory with intensive practical internships at accredited companies."]
];

moreBasis.forEach(item => addSentence('basis', item[0], item[1], item[2], item[3], item[4], item[5]));
moreGevorderd.forEach(item => addSentence('gevorderd', item[0], item[1], item[2], item[3], item[4], item[5]));
moreMoeilijk.forEach(item => addSentence('moeilijk', item[0], item[1], item[2], item[3], item[4], item[5]));

// Re-index all IDs cleanly
const levelCounters = { basis: 0, gevorderd: 0, moeilijk: 0 };
curList.forEach(s => {
  levelCounters[s.level] = (levelCounters[s.level] || 0) + 1;
  s.id = `sent_${s.level}_${String(levelCounters[s.level]).padStart(3, '0')}`;
  s.dutch = s.dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
});

console.log(`===============================================`);
console.log(`FINAL SENTENCES TOTAL: ${curList.length}`);
console.log(`- Basis (A1): ${curList.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${curList.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${curList.filter(s => s.level === 'moeilijk').length}`);
const badSuffixes = curList.filter(s => /[\(\[\{]\d+[\)\]\}]/.test(s.dutch));
console.log(`Bad suffixes: ${badSuffixes.length}`);
console.log(`===============================================`);

fs.writeFileSync(path.join(__dirname, '../data/sentences.json'), JSON.stringify(curList, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/sentences.js'), `window.TAALVRIEND_SENTENCES = ${JSON.stringify(curList, null, 2)};\n`, 'utf-8');
console.log('Saved to data/sentences.json and data/sentences.js!');
