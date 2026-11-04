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

// BATCH 1: BASIS (A1) - Real-life conversations & daily life
const basisNew = [
  // Eten & Drinken
  ["Eten", "Mag ik een glas koud water met ijsblokjes?", "هل يمكنني الحصول على كوب ماء بارد مع مكعبات الثلج؟", "ዝሑል ማይ ምስ በረድ ክረክብ እኽእልዶ፧", "Bishaan qabbanaawaa cabbii wajjin argachuu nan danda'aa?", "May I have a glass of cold water with ice cubes?"],
  ["Eten", "Wij eten vanavond pannenkoeken met stroop.", "سنتناول الليلة الفطائر الهولندية مع العسل الأسود.", "ምሸት ናይ ሆላንድ ፓንኬክ ምስ ሽሮፕ ንበልዕ።", "Har'a galgala paankeekii dhangala'aa wajjin nyaanna.", "We are eating pancakes with syrup tonight."],
  ["Eten", "De rijst kookt in tien minuten gaar op het fornuis.", "ينضج الأرز خلال عشر دقائق على الموقد.", "እቲ ሩዝ ኣብ ውሽጢ ዓሰርተ ደቒቕ ኣብ እቶን ይበስል።", "Ruuziin daqiiqaa kudhan keessatti ibidda irratti bilchaata.", "The rice cooks tender on the stove in ten minutes."],
  ["Eten", "Wil je een beetje melk en suiker in je koffie?", "هل تريد القليل من الحليب والسكر في قهوتك؟", "ኣብ ቡንካ ቁሩብ ጸባን ሽኮርን ትደሊ ዲኻ፧", "Buna kee keessatti aannaniifi sukkaara ni barbaaddaa?", "Do you want some milk and sugar in your coffee?"],
  ["Eten", "Ik snijd de komkommer en de rode paprika in plakjes.", "أنا أقطع الخيار والفلفل الحلو الأحمر إلى شرائح رقيقة.", "ነቲ ኪያርን ቀይሕ በርበረን ብቀጠንቲ ቁራጻት እቆርጾ ኣለኹ።", "Qooccoofi qaraasuu diimaa ciccireera.", "I slice the cucumber and the red bell pepper into slices."],
  ["Eten", "De bakker bakt elke ochtend vers bruinbrood.", "يخبز الخباز خبز القمح الكامل الطازج كل صباح باكر.", "እቲ ጋጋሪ ንግሆ ንግሆ ሓድሽ ቡናዊ ባኒ ይጋግር።", "Tolchaan daabboo ganama hunda daabboo haaraa tolcha.", "The baker bakes fresh whole wheat bread every morning."],
  ["Eten", "Zout en zwarte peper staan op het midden van de tafel.", "الملح والفلفل الأسود موضوعان في وسط طاولة الطعام.", "ጨውን ጸሊም በርበረን ኣብ ማእከል ጠረጴዛ ተቐሚጦም ኣለዉ።", "Soogiddaafi qaraasuun gurraachi gidduu maaddiitti jiru.", "Salt and black pepper are in the middle of the table."],
  ["Eten", "Deze appel smaakt lekker zoet en sappig.", "هذه التفاحة لذيذة جداً وحلوة ومليئة بالعصير.", "እዚ ቱፋሕ ጥዑምን ልስሉስን መጺጹን እዩ።", "Hojjaan kun baay'ee mi'aawaa fi mi'eessituu qaba.", "This apple tastes delightfully sweet and juicy."],

  // Familie & Thuis
  ["Familie", "Mijn jongste broer woont en studeert in Utrecht.", "أخي الأصغر يعيش ويدرس حالياً في مدينة أوترخت.", "እቲ ዝነኣሰ ሓወይ ኣብ ዩትረክት ይነብርን ይምሃርን ኣሎ።", "Obboleessi koo inni quxusuun magaalaa Utrecht keessa barata.", "My youngest brother lives and studies in Utrecht."],
  ["Familie", "Mijn grootmoeder viert vandaag haar tachtigste verjaardag.", "تحتفل جدتي اليوم بعيد ميلادها الثمانين وسط العائلة.", "ዓባየይ ሎሚ መበል ሰማንያ ዓመት ልደታ ተኽብር ኣላ።", "Akkoon koo har'a waggaa saddeettamaffaa dhaloota ishee kabajji.", "My grandmother is celebrating her eightieth birthday today."],
  ["Familie", "De baby slaapt al twee uur rustig in de wieg.", "الرضيع نائم بهدوء في سريره الصغير منذ ساعتين.", "እቲ ህጻን ኣብ ዓራት ቆልዑ ንኽልተ ሰዓት ብሰላም ይድቅስ ኣሎ።", "Daa'imni sa'aatii lamaaf siree isaa keessatti nagaan rafaa jira.", "The baby has been sleeping peacefully in the crib for two hours."],
  ["Familie", "Mijn oom en tante komen zaterdag gezellig op bezoek.", "سيأتي عمي وعمتي لزيارتنا بكل سرور يوم السبت.", "ሓወቦይን ኣሞይን ቀዳም ንምብጻሕ ክመጹና እዮም።", "Wasiilli kootiifi adaadaan koo Sanbata nu gaafachuuf dhufu.", "My uncle and aunt are visiting pleasantly on Saturday."],
  ["Familie", "We kijken vanavond met het hele gezin naar het nieuws.", "نشاهد الأخبار الليلة مع جميع أفراد العائلة معاً.", "ምሸት ምስ ብምሉኦም ኣባላት ስድራቤት ዜና ንዕዘብ።", "Galgala maatii guutuu wajjin oduu ilaalla.", "Tonight we watch the news together with the whole family."],

  // Wonen & Huishouden
  ["Wonen", "Ik doe het gordijn dicht als het buiten donker wordt.", "أغلق الستارة عندما يحل الظلام في الخارج.", "ደገ ጸልማት ክኸውን ከሎ ነቲ መጋረጃ እዓጽዎ።", "Yeroo alaan dukkanaa'u golgaa balbala cufa.", "I close the curtain when it gets dark outside."],
  ["Wonen", "De afwasmachine is klaar en moet worden leeggeruimd.", "غسالة الصحون انتهت ويجب تفريغ الأطباق النظيفة منها.", "እታ መሐጸቢት ሳሕኒ ወዲኣ እያ፡ ኣቑሑት ክወጸላ ኣለዎ።", "Mishiinni mi'a dhiqu hojii xumureera, duukaa baasuun barbaachisaa dha.", "The dishwasher is finished and needs to be emptied."],
  ["Wonen", "Leg de schone handdoeken op de bovenste plank in de kast.", "ضع المناشف النظيفة على الرف العلوي في الخزانة.", "ነቶም ጽሩያት ፍታታት ኣብቲ ላዕላይ ሸልፍ ናይቲ ኣልማሪ ኣንብሮም።", "Mantaa qulqulluu saanduqa uffataa keessa gubbaa kaa'aa.", "Put the clean towels on the top shelf in the closet."],
  ["Wonen", "De deurbel gaat, er staat iemand voor de ingang.", "جرس الباب يرن، هناك شخص واقف أمام المدخل الرئيسي.", "ደወል በሪ ይድውል ኣሎ፡ ኣብ ኣፍደገ ሰብ ኣሎ።", "Bilbilli balbalaa ni iyyisiisa, namatu balbala dura dhaabbata.", "The doorbell rings, someone is standing at the entrance."],
  ["Wonen", "Ik zet de verwarming een beetje hoger omdat het koud is.", "سأرفع التدفئة قليلاً لأن الجو بارد داخل الغرفة.", "ቁሪ ስለ ዝኾነ ነቲ መሞቒ ቁሩብ ንላዕሊ እውስኾ ኣለኹ።", "Qabbana waan ta'eef ho'iftuu xiqqoo ol nan guddisa.", "I turn the heating up a little because it is cold."],

  // Vervoer & Verkeer
  ["Vervoer", "De buschauffeur stempelt of scant onze vervoerbewijzen.", "يقوم سائق الحافلة بفحص تذاكر الركاب الإلكترونية عند الصعود.", "እቲ ዘዋሪ ኣውቶቡስ ነቲ ናይ መጓዓዝያ ትኬትና ይምርምሮ።", "Konkolaachisaan baasii tikkeettii keenya sakatta'a.", "The bus driver stamps or scans our transit tickets."],
  ["Vervoer", "Er staat een lange file van tien kilometer op de snelweg.", "يوجد ازدحام مروري بطول عشرة كيلومترات على الطريق السريع.", "ኣብ ዓቢ መገዲ ናይ ዓሰርተ ኪሎሜተር ናይ ማካይን ሰልፊ ኣሎ።", "Daandii ariifataa irratti hiriirri konkolaataa kiilomeetira 10 dheeratu jira.", "There is a long traffic jam of ten kilometers on the highway."],
  ["Vervoer", "Ik pomp de banden van mijn fiets op voor vertrek.", "أقوم بضخ الهواء في إطارات دراجتي الهوائية قبل الانطلاق.", "ቅድሚ ምብጋሰይ ንናይ ብሽክለታይ ጎማታት ንፋስ እመልኣሎም።", "Osoo hin ka'in dura gommaa biskileetii koo qilleensa itti guuta.", "I pump up the tires of my bicycle before departure."],
  ["Vervoer", "Vergeet niet uit te checken met je OV-chipkaart.", "لا تنس تسجيل الخروج ببطاقة المواصلات العامة عند الوصول.", "ብናይ ህዝባዊ መጓዓዝያ ካርድኻ ቸክ-ኣውት ምግባር ከይትረስዕ።", "Kaardii geejjiba ummataatiin ba'uu kee hin dagatin.", "Do not forget to check out with your public transport card."],
  ["Vervoer", "De metro rijdt elke vier minuten naar het centrum.", "يتحرك قطار الأنفاق كل أربع دقائق باتجاه وسط المدينة.", "እቲ ሜትሮ ኣብ ነፍሲ ወከፍ ኣርባዕተ ደቒቕ ናብ ማእከል ከተማ ይጓዓዝ።", "Baaburri lafa jalaa daqiiqaa afur hundaatti gara giddu gala magaalaatti deema.", "The metro runs to the city center every four minutes."],

  // Gezondheid
  ["Gezondheid", "Ik heb een afspraak bij de tandarts om kwart over drie.", "لدي موعد مع طبيب الأسنان في الساعة الثالثة والربع عصراً.", "ምስ ናይ ስኒ ሓኪም ሰዓት ሰለስተን ርብዕን ቀጠሮ ኣሎኒ።", "Dhaabbata yaala ilkaaniitti sa'aatii sadiifi kurmaana irratti beellama qaba.", "I have an appointment at the dentist at a quarter past three."],
  ["Gezondheid", "Neem twee tabletten paracetamol in met een glas water.", "تناول قرصين من الباراسيتامول مع كوب كامل من الماء.", "ክልተ ከኒና ፓራሲታሞል ምስ ሓደ ብኬሪ ማይ ውሰድ።", "Qoricha paaraasiitaamoolii kiniinii lama bishaan wajjin liqimsaa.", "Take two paracetamol tablets with a glass of water."],
  ["Gezondheid", "Ik ben verkouden en heb veel last van keelpijn.", "أنا مصاب بالزكام وأعاني من ألم مستمر في الحلق.", "ጉንፋን ሒዙኒ ኣሎ፡ ጎረረይ እውን ይቐርጸኒ ኣሎ።", "Qufaan na qabeera, qoonqoon koos baay'ee na dhukkuba.", "I have a cold and suffer a lot from a sore throat."],
  ["Gezondheid", "De dokter luistert met een stethoscoop naar mijn longen.", "يستمع الطبيب إلى صوت رئتي باستخدام السماعة الطبية.", "እቲ ሓኪም ብመስማዕቲ ኣቢሉ ንናይ ሳምቡአይ ድምጺ ይሰምዖ ኣሎ።", "Dooktorri meeshaa dhaggeeffannaatiin somba koo dhaggeeffata.", "The doctor listens to my lungs with a stethoscope."],
  ["Gezondheid", "Wandel elke dag dertig minuten voor een goede conditie.", "امشِ يومياً لمدة ثلاثين دقيقة للحفاظ على صحة ولياقة بدنية جيدة.", "ንጥዑይ ጥዕና ኣብ መዓልቲ ሰላሳ ደቒቕ ተመላለስ።", "Fayyaa gaariif guyyaa hunda daqiiqaa soddoma deemaa.", "Walk thirty minutes every day for good fitness."],

  // School & Werk
  ["School", "De leerlingen schrijven hun antwoorden in hun werkboek.", "يكتب الطلاب إجاباتهم بعناية في كراسة التمارين المدرسية.", "እቶም ተምሃሮ መልሶም ኣብ ናይ ስራሕ መጽሓፎም ይጽሕፍዎ ኣለዉ።", "Barattoonni deebii isaanii kitaaba hojii keessatti barreessu.", "The pupils write their answers in their workbook."],
  ["School", "De leraar legt de Nederlandse grammatica stap voor stap uit.", "يشرح المعلم قواعد اللغة الهولندية خطوة بخطوة للجميع.", "እቲ መምህር ነቲ ናይ ኔዘርላንድስ ሰዋስው በብደረጃ የብርሆ ኣሎ።", "Barsiisaan seera afaan Daachi suuta suutaan ibsa.", "The teacher explains the Dutch grammar step by step."],
  ["Werk", "Mijn collega stuurt mij een digitaal verslag via e-mail.", "أرسل لي زميلي تقريراً رقمياً مفصلاً عبر البريد الإلكتروني.", "መሳርሕተይ ብኢመይል ናይ ጽሑፍ ጸብጻብ ሰዲዱለይ ኣሎ።", "Hiriyaan hojii koo gabaasa imeyiliin naaf ergeera.", "My colleague sends me a digital report via email."],
  ["Werk", "We beginnen elke ochtend om half negen met een overleg.", "نبدأ العمل كل صباح في الثامنة والنصف باجتماع تخطيطي.", "ንግሆ ኩሉ ግዜ ሰዓት ሸሞንተን ፈረቓን ብናይ ስራሕ ኣኼባ ንጅምር።", "Ganama sa'aatii lamaafi walakkaa walgahii hojiitiin jalqabna.", "We start every morning at half past eight with a consultation meeting."],
  ["Werk", "Ik zet mijn handtekening onder het tijdelijke arbeidscontract.", "أضع توقيعي على عقد العمل المؤقت المبرم مع المؤسسة.", "ኣብቲ ናይ ግዝያዊ ስራሕ ውዕል ፌርማይ ኣንብረሉ ኣለኹ።", "Waliigaltee hojii yeroo irratti mallattoo koo nan kaa'a.", "I put my signature at the bottom of the temporary employment contract."]
];

// BATCH 2: GEVORDERD (A2-B1) - Daily practical life, social interactions, work & civic integration
const gevorderdNew = [
  // Burgerzaken & Gemeente
  ["Gemeente", "U moet een geldig legitimatiebewijs meenemen naar de balieafspraak.", "يجب عليك إحضار وثيقة إثبات شخصية سارية إلى موعدك في مكتب الاستقبال.", "ናብ ናይ ማዘጋጃ ቤት ቀጠሮኻ ሕጋዊ መንነት መረጋገጺ ወረቐት ክትማላእ ኣለካ።", "Beellama bulchiinsaaf waraqaa eenyummaa seera qabeessa qabattanii dhiyaadhaa.", "You must bring a valid identity document to the counter appointment."],
  ["Gemeente", "Voor het aanvragen van een paspoort moeten recente pasfoto's worden ingeleverd.", "لتقديم طلب جواز السفر يجب تسليم صور شخصية حديثة ومطابقة للمعايير.", "ፓስፖርት ንምሕታት ቀረባ እዋን ዝተላዕለ ፓስፖርት ስእልታት ክተረክብ ኣለካ።", "Paaspoortii gaafachuuf suuraa dhiyoo fudhatame dhiyeessuun barbaachisaa dha.", "Recent passport photos must be submitted when applying for a passport."],
  ["Gemeente", "De gemeente stuurt binnen vier weken een officiële schriftelijke beslissing.", "سترسل البلدية قراراً رسمياً مكتوباً في غضون أربعة أسابيع من تاريخ الطلب.", "ማዘጋጃ ቤት ኣብ ውሽጢ ኣርባዕተ ሰሙን ወግዓዊ ናይ ጽሑፍ ውሳነ ክሰድድ እዩ።", "Bulchiinsi magaalaa torban afur keessatti murtii barreeffamaa erga.", "The municipality sends an official written decision within four weeks."],
  ["Gemeente", "U kunt grofvuil gratis laten ophalen na online aanmelding.", "يمكنك حجز موعد مجاني لجمع النفايات كبيرة الحجم عبر موقع البلدية.", "ዓበይቲ ጐሓፍ ብኢንተርኔት ድሕሪ ምምዝጋብ ብነጻ ከም ዝውሰድ ክትገብር ትኽእል ኢኻ።", "Kosiilee gurguddoo tooraan galmeessitanii tolaan akka fudhatamu gochuu dandeessu.", "You can have bulky waste collected for free after registering online."],

  // Wonen & Energie
  ["Wonen", "Het is verstandig om regelmatig de ramen te openen om vocht te voorkomen.", "من الحكمة فتح النوافذ بانتظام لتهوية المنزل ومنع تراكم الرطوبة.", "ጠሊ ከይፍጠር ወትሩ መስኮት ከፊትካ ንፋስ ምእታው ጥበባዊ እዩ።", "Jiidha hambisuuf yeroo yeroon foddaa banuun gaarii dha.", "It is wise to open the windows regularly to prevent moisture build-up."],
  ["Wonen", "De jaarlijkse eindafrekening voor gas en elektriciteit volgt in januari.", "ستصدر الفاتورة السنوية النهائية للغاز والكهرباء في شهر يناير القادم.", "ናይ ጋዝን መብራህትን ዓመታዊ ናይ ክፍሊት ጸብጻብ ኣብ ወርሒ ጥሪ ክመጽእ እዩ።", "Herregni xumuraa waggaa kan gaasii fi elektiriikii Amajjii keessa dhufa.", "The annual settlement for gas and electricity follows in January."],
  ["Wonen", "Huurders kunnen huurtoeslag aanvragen als hun inkomen onder de grens ligt.", "يمكن للمستأجرين التقديم على إعانة الإيجار إذا كان دخلهم تحت الحد المسموح.", "እቶቶም ትሑት ዝኾነ ተኻረይቲ ናይ ክራይ ደገፍ ገንዘብ ክሓቱ ይኽእሉ እዮም።", "Kireeffattoonni galii xiqqaa qaban gargaarsa kiree manaa gaafachuu danda'u.", "Tenants can apply for rent benefit if their income is below the threshold."],
  ["Wonen", "Bij lekkage dient u direct de beheerder of verhuurder telefonisch te waarschuwen.", "في حالة حدوث تسرب للمياه يجب إخطار المشرف أو المالك فوراً عبر الهاتف.", "ማይ ምፍሳስ ምስ ዘጋጥም ነቲ ኣካራዪ ብስልኪ ብቕልጡፍ ከተፍልጦ ይግባእ።", "Bishaan yoo dhangala'e yeruma sana abbaa manaa bilbilaan beeksisaa.", "In case of leakage you should immediately notify the property manager by phone."],

  // Werk & Opleiding
  ["Werk", "Werknemers hebben in Nederland recht op minimaal vier weken betaalde vakantie per jaar.", "يحق للموظفين في هولندا الحصول على إجازة مدفوعة الأجر لمدة أربعة أسابيع سنوياً.", "ሰራሕተኛታት ኣብ ኔዘርላንድስ ኣብ ዓመት እንተወሓደ ናይ ኣርባዕተ ሰሙን ክፍሊት ዘለዎ ዕረፍቲ መሰል ኣለዎም።", "Hojjattoonni waggaatti yoo xiqqaate boqonnaa torban afurii kan kaffaltii qabu argachuuf mirga qabu.", "Employees in the Netherlands are entitled to at least four weeks of paid leave per year."],
  ["Werk", "Tijdens de proeftijd kunnen zowel werknemer als werkgever de overeenkomst direct opzeggen.", "خلال فترة التجربة يحق لكل من الموظف وصاحب العمل إنهاء العقد فوراً دون إنذار.", "ኣብ ናይ ፈተነ እዋን ሰራሕተኛን ኣስራሕን ነቲ ውዕል ብቕጽበት ከቋርጽዎ መሰል ኣለዎም።", "Yeroo qormaataa keessatti gama lachuunuu waliigaltee battalatti addaan kutuu danda'u.", "During the probation period, both employee and employer can terminate the agreement immediately."],
  ["Werk", "Het UWV ondersteunt werkzoekenden bij het vinden van een passende baan of omscholing.", "تساعد وكالة التأمين على العمل الباحثين عن عمل في العثور على وظيفة مناسبة أو إعادة التدريب.", "ትካል ዩደብሊውቪ ንደለይቲ ስራሕ ዝሰማማዕ ስራሕ ንኽረኽቡ ወይ ሞያ ንኽቐይሩ ይሕግዞም እዩ።", "UWV namoota hojii barbaadan hojii mijataa ykn leenjii haaraa akka argatan deeggara.", "The UWV supports job seekers in finding suitable employment or retraining."],
  ["School", "Kinderen van vijf tot zestien jaar vallen in Nederland onder de leerplichtwet.", "يخضع الأطفال من سن خمس إلى ست عشرة سنة في هولندا لقانون التعليم الإلزامي الصارم.", "ካብ ሓሙሽተ ክሳብ ዓሰርተ ሽዱሽተ ዓመት ዝዕድሚኦም ቆልዑ ኣብ ኔዘርላንድስ ግዴታ ትምህርቲ ኣለዎም።", "Ijoolleen waggaa shan hanga kudha jahaa seera barumsa dirqamaa jala jiru.", "Children aged five to sixteen in the Netherlands are subject to compulsory schooling laws."],
  ["School", "Tijdens het tienminutengesprek bespreken de ouders de schoolresultaten met de docent.", "خلال اجتماع العشر دقائق يناقش الوالدان مع المعلم مستوى ونتائج الطفل الدراسية.", "ኣብቲ ናይ ዓሰርተ ደቒቕ ርክብ ወለዲ ምስ መምህር ብዛዕባ ናይ ትምህርቲ ውጽኢት ይዘራረቡ።", "Walgahii daqiiqaa kudhanii irratti warri bu'aa barnootaa barsiisaa wajjin mari'atu.", "During the ten-minute meeting, parents discuss school performance with the teacher."],

  // Zorg & Welzijn
  ["Zorg", "De basiszorgverzekering dekt de meeste kosten van de huisarts en ziekenhuisopname.", "يغطي التأمين الصحي الأساسي معظم تكاليف زيارة طبيب العائلة ودخول المستشفيات.", "እቲ መሰረታዊ ናይ ጥዕና መድሕን መብዛሕትኡ ናይ ሓኪም ስድራቤትን ሆስፒታልን ወጻኢታት ይሸፍን።", "Inshuraansiin fayyaa bu'uuraa baasii doktooraafi hospitaalaa baay'ee uwwisa.", "Basic health insurance covers most costs of the GP and hospital admission."],
  ["Zorg", "Voor specialistische zorg in het ziekenhuis heeft u een officiële verwijsbrief nodig.", "تحتاج إلى خطاب تحويل رسمي من طبيب الأسرة لمراجعة أخصائي في المستشفى.", "ኣብ ሆስፒታል ንፍሉይ ናይ ስፔሻሊስት ሕክምና ወግዓዊ ናይ መተሓላለፊ ደብዳበ የድልየካ እዩ።", "Hospitaala keessatti yaala ogeessa addaa argachuuf waraqaa dabarsaa barbaaddu.", "For specialist care in the hospital, you need an official referral letter."],
  ["Zorg", "U betaalt jaarlijks een eigen risico voordat bepaalde medische kosten worden vergoed.", "يدفع المؤمن عليه مبلغ التحمل الإجباري سنوياً قبل تعويض بعض التكاليف الطبية.", "ገሊኦም ናይ ሕክምና ወጻኢታት ቅድሚ ምምላሶም ዓመታዊ ናይ ገዛእ ርእስኻ ግዴታ ትኸፍል ኢኻ።", "Baasiin yaalaa tokko tokko kaffalamuun dura baasii ofii waggaa kaffaluu qabdu.", "You pay an annual deductible before certain medical expenses are reimbursed."],
  ["Zorg", "De apotheek stuurt een sms wanneer uw medicijnen klaarliggen bij het afhaalpunt.", "ترسل الصيدلية رسالة نصية قصيرة عندما تكون أدويتك جاهزة للاستلام من النافذة.", "መድሃኒትካ ኣብ ናይ ምውሳድ ቦታ ድሉው ምስ ኰነ እቲ ቤት-መድሃኒት ናይ ሓጺር ጽሑፍ መልእኽቲ ይሰድድ።", "Mana qorichaa irraa qorichi keessan qophii ta'uu isaa ergaan bilbilaa ni dhufa.", "The pharmacy sends an SMS when your medicines are ready at the pick-up counter."]
];

// BATCH 3: MOEILIJK (B1-B2) - Legal rights, official correspondence, social structures & nuanced topics
const moeilijkNew = [
  // Juridisch & Bestuur
  ["Bestuursrecht", "Een bezwaarschrift moet binnen een wettelijke termijn van zes weken worden ingediend.", "يجب تقديم لائحة الاعتراض الإداري خلال مهلة قانونية لا تتجاوز ستة أسابيع كاملة.", "ናይ ተቓውሞ ጥርዓን ኣብ ውሽጢ ሕጋዊ ናይ ሽዱሽተ ሰሙን ግዜ ክቐርብ ኣለዎ።", "Waraqaan mormii yeroo seeraan murtaa'e torban jaha keessatti dhiyaachuu qaba.", "A notice of objection must be submitted within a statutory period of six weeks."],
  ["Bestuursrecht", "Het bestuursorgaan is verplicht de indiener te horen alvorens op het bezwaar te beslissen.", "تلتزم الجهة الإدارية بالاستماع إلى صاحب الاعتراض حضورياً قبل اتخاذ قرار نهائي في الطلب.", "እቲ ምምሕዳራዊ ትካል ነቲ ጥርዓን ዘቕረበ ሰብ ቅድሚ ምውሳኑ ቃሉ ክሰምዕ ግዴታ ኣለዎ።", "Qaamni bulchiinsaa murtii kennuun dura nama iyyate sana dhaggeeffachuuf dirqama qaba.", "The administrative body is obligated to hear the applicant before deciding on the objection."],
  ["Bestuursrecht", "Indien de wettelijke beslistermijn wordt overschreden, kan de burger een dwangsom vorderen.", "إذا تأخرت الإدارة في اتخاذ القرار وتجاوزت المدة القانونية، يمكن للمواطن المطالبة بغرامة تأخير مالية.", "እቲ ሕጋዊ ናይ ምውሳን ግዜ እንተሓሊፉ፡ እቲ ዜጋ ናይ ምድንጓይ ካሳ ገንዘብ ክሓትት ይኽእል እዩ።", "Yeroon murtii seeraa yoo darbe, lammiin kaffaltii adabbii guyyaa gaafachuu danda'a.", "If the statutory decision period is exceeded, the citizen may claim penalty payments."],

  // Arbeid & Verzekeringen
  ["Arbeidsrecht", "Werknemers zijn beschermd tegen willekeurig ontslag via het preventieve ontslagstelsel.", "يحظى الموظفون بالحماية القانونية ضد الفصل التعسفي بفضل نظام التصريح المسبق لإنهاء الخدمة.", "ሰራሕተኛታት ብናይ ቅድመ-ምቁራጽ ፍቓድ ስርዓት ኣቢሎም ካብ ዘይፍትሓዊ ምብራር ውሑሳት እዮም።", "Hojjattoonni sirna eeyyama dursatiin hojii irraa ari'amuu seeraan alaa irraa eegamaniiru.", "Employees are protected against arbitrary dismissal through the preventive dismissal system."],
  ["Arbeidsrecht", "Een nulurencontract biedt flexibiliteit, maar brengt ook financiële onzekerheid met zich mee.", "يوفر عقد العمل بنظام الساعات الصفرية مرونة للمنشأة، لكنه يتسبب في عدم استقرار مالي للعامل.", "ውዕል ናይ ባዶ ሰዓታት ተዓጻጻፍነት ይህብ፡ ግን ድማ ናይ ገንዘብ ዘይርጉእነት የስዕብ።", "Waliigalteen sa'aatii zeroo baay'ee jijjiiramaa dha, garuu maallaqaan amansiisaa miti.", "A zero-hour contract offers flexibility, but also brings financial uncertainty with it."],
  ["Arbeidsrecht", "Tijdens ziekte is de werkgever verplicht het loon gedurende maximaal twee jaar door te betalen.", "يلتزم صاحب العمل بمواصلة دفع نسبة من راتب الموظف المريض لمدة تصل إلى عامين كحد أقصى.", "ኣብ ግዜ ሕማም እቲ ኣስራሒ ንሰራሕተኛ ክሳብ ክልተ ዓመት ደሞዙ ናይ ምኽፋል ግዴታ ኣለዎ።", "Yeroo dhukkubaa hojjachiisaan hanga waggaa lamaatti mindaa kaffaluuf dirqama qaba.", "During illness, the employer is obligated to continue paying wages for up to two years."],

  // Wonen & Samenleving
  ["Huisvesting", "Woningcorporaties wijzen sociale huurwoningen toe op basis van inschrijfduur en urgentie.", "تقوم جمعيات الإسكان بتوزيع المساكن الاجتماعية المدعومة بناءً على فترة التسجيل وأولويات الاستحقاق.", "ማሕበራት ኣባይቲ ነተን ማሕበራዊ ኣባይቲ ብናይ ምዝገባ ንውሓትን ህጹጽነትን መሰረት ይዕድላ።", "Waldaan manneenii manneen kiree hawaasummaa yeroo galmee fi ariitii irratti hundaa'uun kenna.", "Housing associations allocate social housing based on registration period and urgency."],
  ["Huisvesting", "Bij ernstige geluidsoverlast kunnen buurtbewoners een melding doen bij de wijkagent.", "في حالات الضجيج السكني الحاد والمزعج، يمكن للجيران إبلاغ ضابط شرطة الحي الميداني رسمياً.", "ከቢድ ናይ ድምጺ ረብሻ ምስ ዝህሉ ነበርቲ ከባቢ ናብ ናይቲ ከባቢ ፖሊስ ክሕብሩ ይኽእሉ እዮም።", "Iyyi garmalee yoo jiraate ollaan poolisii naannootti beeksisuu danda'u.", "In case of severe noise disturbance, local residents can file a report with the neighborhood police."],

  // Maatschappij, Belastingen & Financiën
  ["Financiën", "Het toeslagenstelsel helpt burgers met lage inkomens de kosten van zorg en huur te dragen.", "يساعد نظام البدلات الحكومية أصحاب الدخل المحدود في تغطية نفقات التأمين الصحي والإيجار.", "ናይ ሓገዝ ገንዘብ ስርዓት ንትሑት እቶት ዘለዎም ዜጋታት ናይ ክራይን ጥዕናን ወጻኢታት ንኽሸፍኑ ይሕግዝ።", "Sirni deeggarsa maallaqaa lammiilee galii xiqqaa qaban baasii inshuraansii fi kiree manaa deeggara.", "The allowances system helps low-income citizens cover the costs of healthcare and rent."],
  ["Belasting", "Zelfstandigen zonder personeel moeten elk kwartaal btw-aangifte doen bij de Belastingdienst.", "يلتزم أصحاب المهن الحرة غير الموظفين لعمال بتقديم إقرار ضريبة القيمة المضافة كل ربع سنة.", "ብሕቶም ዝሰርሑ ናጻ ሰራሕተኛታት ኣብ ነፍሲ ወከፍ ሰለስተ ወርሒ ናይ ቫት ግብሪ ጸብጻብ ከቕርቡ ኣለዎም።", "Hojjettoonni dhuunfaa ji'oota sadii hundaatti taaksii dabalata gatii beeksisuu qabu.", "Self-employed professionals without staff must submit a VAT declaration to the Tax Authority every quarter."],
  ["Maatschappij", "Democratische besluitvorming vereist een open dialoog tussen burgers en gekozen volksvertegenwoordigers.", "يتطلب صنع القرار الديمقراطي حواراً بناءً وشفافاً بين المواطنين وممثليهم المنتخبين في البرلمان.", "ዲሞክራስያዊ ውሳነ ምሕላፍ ኣብ መንጎ ዜጋታትን ዝተመርጹ ወከልቲ ህዝብን ቅሉዕ ዘተ የድልዮ።", "Murtii dimookiraatawaan lammiilee fi bakka bu'oota filataman gidduutti marii bilisaa barbaada.", "Democratic decision-making requires open dialogue between citizens and elected representatives."]
];

basisNew.forEach(item => addSentence('basis', item[0], item[1], item[2], item[3], item[4], item[5]));
gevorderdNew.forEach(item => addSentence('gevorderd', item[0], item[1], item[2], item[3], item[4], item[5]));
moeilijkNew.forEach(item => addSentence('moeilijk', item[0], item[1], item[2], item[3], item[4], item[5]));

// Re-index all IDs cleanly
const levelCounters = { basis: 0, gevorderd: 0, moeilijk: 0 };
curList.forEach(s => {
  levelCounters[s.level] = (levelCounters[s.level] || 0) + 1;
  s.id = `sent_${s.level}_${String(levelCounters[s.level]).padStart(3, '0')}`;
  // Strip any accidental brackets or trailing numbers
  s.dutch = s.dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
});

console.log(`===============================================`);
console.log(`EXPANDED SENTENCES TOTAL: ${curList.length}`);
console.log(`- Basis (A1): ${curList.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${curList.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${curList.filter(s => s.level === 'moeilijk').length}`);
const badSuffixes = curList.filter(s => /[\(\[\{]\d+[\)\]\}]/.test(s.dutch));
console.log(`Bad suffixes: ${badSuffixes.length}`);
console.log(`===============================================`);

fs.writeFileSync(path.join(__dirname, '../data/sentences.json'), JSON.stringify(curList, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/sentences.js'), `window.TAALVRIEND_SENTENCES = ${JSON.stringify(curList, null, 2)};\n`, 'utf-8');
console.log('Saved to data/sentences.json and data/sentences.js!');
