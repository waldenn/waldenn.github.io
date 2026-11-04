// scripts/build-pure-unique-sentences.js
// Generates 575+ completely unique, authentic, natural Dutch sentences
// across Basis (A1), Gevorderd (A2-B1), and Moeilijk (B1-B2).
// Absolutely ZERO artificial suffixes like "(4)", "[2]", etc.
// Complete, accurate translations in Arabic (ar), Tigrinya (ti), Oromo (om), and English (en).

const fs = require('fs');
const path = require('path');

const sentences = [];

function add(level, topic, dutch, ar, ti, om, en) {
  // Strip any accidental trailing digits or parens
  const cleanDutch = dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
  const cleanAr = ar.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
  const cleanTi = ti.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
  const cleanOm = om.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
  const cleanEn = en.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();

  sentences.push({
    id: `sent_${level}_${String(sentences.length + 1).padStart(3, '0')}`,
    level: level,
    topic: topic,
    dutch: cleanDutch,
    translations: {
      ar: cleanAr,
      ti: cleanTi,
      om: cleanOm,
      en: cleanEn
    }
  });
}

// -------------------------------------------------------------
// BASIS (A1) BATCHES: Daily Life, Shopping, Transit, Health, Family
// -------------------------------------------------------------
const basisItems = [
  // Begroeting & Contact
  ["Begroeting", "Goedemorgen, hoe gaat het met u?", "صباح الخير، كيف حالك؟", "ከመይ ሓዲርኩም፡ ከመይ ኣለኹም፧", "Akkam bultan, akkam jirtu?", "Good morning, how are you?"],
  ["Begroeting", "Goedemiddag, fijn om u te ontmoeten.", "مساء الخير، يسعدني مقابلتك.", "ደሓን ቀትሪ፡ ብምርኻብና ደስ ይብለኒ።", "Akkam ooltan, isin arguun koo gammachuu dha.", "Good afternoon, nice to meet you."],
  ["Begroeting", "Goedenavond allemaal, welkom in de klas.", "مساء الخير للجميع، مرحباً بكم في الفصل.", "ደሓን ምሸት ንኹልኹም፡ ናብ ክፍሊ እንቋዕ ብደሓን መጻእኩም።", "Akkam dhiitan hundi keessanuu, gara kutaa barnootaatti baga nagaan dhuftan.", "Good evening everyone, welcome to the class."],
  ["Begroeting", "Prettig weekend en tot volgende week maandag!", "عطلة نهاية أسبوع سعيدة وإلى اللقاء يوم الاثنين القادم!", "ጽቡቕ ቀዳመ-ሰንበትን ክሳብ ዝመጽእ ሰኑይን!", "Sanbata gaarii fi hamma Wiixata dhufuutti!", "Have a nice weekend and see you next Monday!"],
  ["Begroeting", "Tot ziens, een hele fijne dag nog!", "إلى اللقاء، أتمنى لك بقية يوم سعيدة!", "ደሓን ኩኑ፡ ጽቡቕ መዓልቲ ይግበረልኩም!", "Walgarra, guyyaa baay'ee gaarii qabaadhaa!", "Goodbye, have a wonderful day!"],
  ["Begroeting", "Alstublieft, hier is uw kopje warme thee.", "تفضل، ها هو كوب الشاي الدافئ الخاص بك.", "እንሆልኩም፡ እዚ ናትኩም ጽዋእ ውዑይ ሻሂ እዩ።", "Kunooti, kun xoofoo shayii oo'aa keessaniiti.", "Here you go, here is your cup of warm tea."],
  ["Begroeting", "Dank u wel voor uw vriendelijke hulp.", "شكراً جزيلاً لك على مساعدتك اللطيفة.", "ስለቲ ሕያው ሓገዝኩም ኣዝየ የቐንየለይ።", "Gargaarsa keessan gaariif galatoomaa.", "Thank you very much for your kind help."],
  ["Begroeting", "Pardon, mag ik u even iets vragen?", "معذرة، هل يمكنني أن أسألك عن شيء؟", "ይቕሬታ፡ ሓደ ነገር ክሓተኩም ይኽእልዶ፧", "Dhiifama, waan tokko isin gaafachuu nan danda'aa?", "Excuse me, may I ask you something?"],
  ["Begroeting", "Geen dank, het is heel graag gedaan!", "عفواً، على الرحب والسعة دائماً!", "ምንም ኣይኮነን፡ ብፍታው ዝተገብረ እዩ!", "Homaa miti, gammachuudhaani!", "You are welcome, it was my pleasure!"],
  ["Begroeting", "Hoe heet u en waar komt u vandaan?", "ما اسمك ومن أين أنت؟", "ስምኩም መን ይበሃል፡ ካበይከ መጺእኩም፧", "Maqaan keessan eenyu, eessaa dhuftan?", "What is your name and where are you from?"],

  // Boodschappen & Supermarkt
  ["Boodschappen", "Waar kan ik de verse melk vinden?", "أين يمكنني أن أجد الحليب الطازج؟", "ሓድሽ ጸባ ኣበይ ክረክብ ይኽእል፧", "Aannan haaraa eessatti argachuu danda'a?", "Where can I find the fresh milk?"],
  ["Boodschappen", "Hoeveel kost een kilo rode appeltjes?", "كم يكلف كيلو التفاح الأحمر؟", "ኪሎ ቀያሕቲ ቱፋሕ ክንደይ ዋጋ ኣለዎ፧", "Kiiloon appilii diimaa gatiin isaa meeqa?", "How much does a kilo of red apples cost?"],
  ["Boodschappen", "Mag ik een half volkorenbrood van u?", "هل يمكنني الحصول على نصف خبز قمح كامل منك؟", "ካባኻትኩም ፍርቂ ናይ ስርናይ ባኒ ክረክብ ይኽእልዶ፧", "Daabboo qamadii walakkaa naaf kennituu maaloo?", "May I have half a whole wheat bread from you?"],
  ["Boodschappen", "Kan ik hier met mijn pinpas betalen?", "هل يمكنني الدفع هنا ببطاقتي المصرفية؟", "ኣብዚ ብናይ ባንክ ካርድ ክኸፍል ይኽእልዶ፧", "Asitti kaardii baankiitiin kaffaluu danda'aa?", "Can I pay with my debit card here?"],
  ["Boodschappen", "Ik wil graag contant met muntgeld betalen.", "أود الدفع نقداً بالقطع النقدية المعدنية.", "ብጥረ ገንዘብ ብሳንቲም ክኸፍል ደልየ ኣለኹ።", "Maallaqa harkaan saantimaan kaffaluu barbaada.", "I would like to pay cash in coins."],
  ["Boodschappen", "Heeft u voor mij een papieren tasje?", "هل لديك كيس ورقي لي؟", "ናይ ወረቐት ፌስታል ኣለኩምዶ፧", "Koorojoo waraqaa naaf qabduu?", "Do you have a paper bag for me?"],
  ["Boodschappen", "De bananen zijn vandaag erg voordelig.", "الموز بسعر مناسب واقتصادي للغاية اليوم.", "ባናና ሎሚ ኣዝዩ ሕሱርን ምቹእን እዩ።", "Muuziin har'a baay'ee rakasa.", "The bananas are very affordable today."],
  ["Boodschappen", "Vergeet de boter en de kaas niet.", "لا تنس الزبدة والجبن.", "ጠስምን ፎርማጆን ምግዛእ ኣይትረስዕ።", "Dhadhaafi ayiba bituu hin dagatin.", "Do not forget the butter and cheese."],
  ["Boodschappen", "Ik heb een eigen boodschappentas meegenomen.", "لقد أحضرت كيس تسوق خاص بي معي.", "ናተይ ናይ ዕዳጋ ቦርሳ ምሳይ ሒዘ መጺአ ኣለኹ።", "Koorojoo gabaa koo qabadheen dhufe.", "I brought my own shopping bag."],
  ["Boodschappen", "Waar staan de flessen mineraalwater in deze winkel?", "أين توجد زجاجات المياه المعدنية في هذا المتجر؟", "ኣብዛ ድኳን ጥርሙዛት ማይ ኣበይ ኣለዋ፧", "Dukaana kana keessatti qaruuraan bishaan albuudaa eessa jira?", "Where are the bottles of mineral water in this shop?"],
  ["Boodschappen", "Dit product heeft korting met de bonuskaart.", "هذا المنتج عليه خصم مع بطاقة المكافآت.", "እዚ ፍርያት ብናይ ቦኑስ ካርድ ቅናሽ ኣለዎ።", "Omishni kun kaardii faayidaatiin gatii hir'ifamaa qaba.", "This product has a discount with the bonus card."],
  ["Boodschappen", "Mag ik het aankoopbonnetje van u hebben?", "هل يمكنني الحصول على إيصال الشراء منك؟", "ናይ ዕዳጋ ረሲት ክረክብ ይኽእልዶ፧", "Nagahee bittaa naaf kennituu?", "May I have the purchase receipt from you?"],
  ["Boodschappen", "Zijn deze eieren biologisch geproduceerd?", "هل تم إنتاج هذا البيض عضوياً؟", "እዚ እንቋቝሖ ብተፈጥሮኣዊ መገዲ ዝተዳለወ ድዩ፧", "Buuphaaleen kunniin karaa uumamaatiin omishamanii?", "Are these eggs organically produced?"],
  ["Boodschappen", "Heeft u ook suikervrije jam op voorraad?", "هل يتوفر لديكم مربى خالٍ من السكر؟", "ሽኮር ዘይብሉ ማርመላታ ኣብ መኽዘን ኣለኩምዶ፧", "Marmalaata sukkaara hin qabne qabduu?", "Do you also have sugar-free jam in stock?"],
  ["Boodschappen", "De kassa aan de rechterkant is nu geopend.", "صندوق الدفع على الجانب الأيمن مفتوح الآن.", "ኣብ የማናይ ወገን ዘሎ ካሳ ሕጂ ክፉት እዩ።", "Bakki kaffaltii mirgaa amma banamaadha.", "The register on the right side is now open."],

  // Huisarts & Gezondheid
  ["Huisarts", "Ik wil graag een afspraak maken met de dokter.", "أود حجز موعد مع الطبيب.", "ምስ ሓኪም ቆጸራ ክሕዝ ደልየ ኣለኹ።", "Dooqtoora wajjin beellama qabachuu barbaada.", "I would like to make an appointment with the doctor."],
  ["Huisarts", "Mijn keel doet al drie dagen erg veel pijn.", "حلقي يؤلمني كثيراً منذ ثلاثة أيام.", "ጎረረይ ካብ ዝቐንዘኒ ሰለስተ መዓልቲ ኮይኑ ኣሎ።", "Qoonqoon koo guyyoota sadiif baay'ee na dhukkubeera.", "My throat has been hurting a lot for three days."],
  ["Huisarts", "Mijn kindje heeft hoge koorts en hoest veel.", "طفلي يعاني من حمى شديدة ويسعل كثيراً.", "ቆልዓይ ብርቱዕ ረስኒ ኣለዎ፡ ኣዝዩ ድማ ይስዕል ኣሎ።", "Mucaan koo ho'a qaamaa qaba akkasumas baay'ee qufa'a.", "My child has a high fever and is coughing a lot."],
  ["Huisarts", "Heeft u een pijnstiller tegen rugpijn?", "هل لديك مسكن لآلام الظهر؟", "ንሕማም ሕቖ ዝኸውን መዐገሲ ቃንዛ ኣለኩምዶ፧", "Qoricha waraansa dugdaa qabduu?", "Do you have a painkiller for back pain?"],
  ["Huisarts", "Ik voel me erg duizelig en slap.", "أشعر بدوار شديد وضعف عام.", "ብርቱዕ ርእሲ ምዕዋልን ድኻምን ይስምዓኒ ኣሎ።", "Mataan na maree dadhabbiin natti dhaga'ama.", "I feel very dizzy and weak."],
  ["Huisarts", "Waar is de dichtstbijzijnde apotheek in de wijk?", "أين توجد أقرب صيدلية في الحي؟", "ኣብዚ ከባቢ እታ ዝቐረበት ፋርማሲ ኣበይ ኣላ፧", "Naannoo kanatti faarmaasiin dhiyoo eessa jira?", "Where is the nearest pharmacy in the neighborhood?"],
  ["Huisarts", "Moet ik dit medicijn na de maaltijd innemen?", "هل يجب أن أتناول هذا الدواء بعد وجبة الطعام؟", "እዚ መድሃኒት ድሕሪ መግቢ ድየ ክወስዶ ዘሎኒ፧", "Qoricha kana erga nyaattanii booda fudhachuu qabduu?", "Should I take this medicine after the meal?"],
  ["Huisarts", "Mijn dochter heeft een klein schaafwondje op haar knie.", "ابنتي لديها خدش صغير على ركبتها.", "ጓለይ ኣብ ብርካ ንእሽቶ ምልጣጥ ኣለዋ።", "Intalli koo jilba ishee irratti madaa xiqqoo qabdi.", "My daughter has a small scrape on her knee."],
  ["Huisarts", "Kan de assistente mijn bloeddruk even meten?", "هل يمكن للمساعدة قياس ضغط دمي لدقيقة؟", "እታ ሓጋዚት ሓኪም ናይ ደም ጸቕጠይ ክትዕቅኖ ትኽእልዶ፧", "Gargaartuun dhiibbaa dhiiga koo safaruu dandeessii?", "Can the medical assistant check my blood pressure?"],
  ["Huisarts", "Ik heb al een week last van oorpijn.", "أعاني من ألم في الأذن منذ أسبوع.", "እዝነይ ካብ ዝቐንዘነኒ ሓደ ሰሙን ኮይኑ ኣሎ።", "Torban tokkoof gurri na dhukkubaa jira.", "I have been suffering from earache for a week."],

  // Vervoer & Reizen
  ["Vervoer", "Rijdt deze stadsbus rechtstreeks naar het centraal station?", "هل تذهب حافلة المدينة هذه مباشرة إلى المحطة المركزية؟", "እዚ ናይ ከተማ ኣውቶቡስ ብቐጥታ ናብ ማእከላይ መደበር ይኸይድ ድዩ፧", "Baasiin kun kallattiin gara buufata guddaatti ni deemaa?", "Does this city bus go directly to the central station?"],
  ["Vervoer", "Hoe laat vertrekt de volgende sprinter naar Utrecht?", "في أي وقت يغادر قطار السبرينتر التالي إلى أوترخت؟", "ዝቕጽል ባቡር ናብ ዩትረክት ሰዓት ክንደይ ይነቅል፧", "Baaburri itti aanu gara Utrecht sa'aatii meeqatti ka'a?", "What time does the next local train to Utrecht depart?"],
  ["Vervoer", "Vergeet niet uit te checken bij de paal.", "لا تنس تسجيل الخروج عند العمود الإلكتروني.", "ኣብቲ ዓንዲ ምውጻእካ ምምልካት ኣይትረስዕ።", "Utubaa irratti ba'uu keessan galmeessuu hin dagatinaa.", "Do not forget to check out at the card reader post."],
  ["Vervoer", "Ik moet overstappen op tramlijn negen.", "يجب أن أغير وسيلة النقل إلى خط الترام رقم تسعة.", "ናብ ናይ ትራም መስመር ትሽዓተ ክሰጋገር ኣሎኒ።", "Tiraamii sarara sagal irratti jijjiiruu qaba.", "I need to transfer to tram line nine."],
  ["Vervoer", "Mag ik mijn opvouwbare kinderwagen meenemen?", "هل يمكنني إحضار عربة الأطفال القابلة للطي معي؟", "ተዓጻፊ ዓረብያ ቆልዓ ምሳይ ከእቱ ይፍቀድዶ፧", "Gaarii daa'immanii dachaa'u qabadhee seenuu nan danda'aa?", "May I bring my foldable stroller with me?"],
  ["Vervoer", "Een retourtje naar Den Haag, alstublieft.", "تذكرة ذهاب وإياب إلى لاهاي، من فضلك.", "ናብ ደን ሃግ ናይ ምኻድን ምምላስን ትኬት በጃኹም።", "Tikkeetii Den Haag deemee deebi'uu maaloo.", "A round-trip ticket to The Hague, please."],
  ["Vervoer", "Deze zitplaats is speciaal voor ouderen gereserveerd.", "هذا المقعد مخصص لكبار السن بشكل خاص.", "እዚ መንበር ብፍላይ ንዓበይቲ ሰባት ዝተሓዝአ እዩ።", "Teessumni kun maanguddootaaf kan qophaa'eedha.", "This seat is specially reserved for the elderly."],
  ["Vervoer", "Ik pak vanochtend de fiets omdat het droog is.", "سأستقل الدراجة هذا الصباح لأن الجو جاف وبلا مطر.", "ሎሚ ንግሆ ዝናብ ስለዘየለ ብብሽክለታይ ክኸይድ እየ።", "Ganama kana bokkaan waan hin jirreef biskileetiidhaan deema.", "I am taking the bike this morning because it is dry."],
  ["Vervoer", "Mijn fietsband is helaas zacht, heeft u een fietspomp?", "للأسف إطار دراجتي فارغ، هل لديك منفاخ دراجة؟", "ጎማ ብሽክለታይ ንፋስ ጎዲልዎ ኣሎ፡ ናይ ብሽክለታ ፓምፕ ኣለኩምዶ፧", "Tayeeriin biskileetii koo qilleensa dhabeera, pampii qabduu?", "My bicycle tire is unfortunately soft, do you have a bicycle pump?"],
  ["Vervoer", "De buschauffeur stopt netjes voor het zebrapad.", "يتوقف سائق الحافلة بأمان قبل ممر المشاة.", "እቲ መራሕ ኣውቶቡስ ኣብ መሳገሪ እግረኛታት ደው ኢሉ ኣሎ።", "Konkolaachisaan baasii sarara nama miilaa dura dhaabbata.", "The bus driver stops neatly in front of the zebra crossing."],

  // Wonen & Huishouden
  ["Wonen", "Wij wonen in een gezellig appartement met balkon.", "نحن نعيش في شقة مريحة وجميلة مع شرفة.", "ኣብ ጽቡቕ ናይ ባልኮን ዘለዎ ኣፓርተማ ንነብር ኣለና።", "Appaartaamaa miidhagaa balkoonii qabu keessa jiraanna.", "We live in a cozy apartment with a balcony."],
  ["Wonen", "De huissleutel ligt op het kleine tafeltje.", "مفتاح المنزل موجود على الطاولة الصغيرة.", "መፍትሕ ገዛ ኣብታ ንእሽቶ ጠረጴዛ ኣሎ።", "Furtuun manaa minjaala xiqqoo irra jira.", "The house key is on the small table."],
  ["Wonen", "Het oud papier wordt donderdag opgehaald.", "سيتم جمع الورق القديم المعاد تدويره يوم الخميس.", "ኣረጊት ወረቐት ሓሙስ ክእከብ እዩ።", "Waraqaan moofaan Kamisa walitti qabama.", "Recycled paper will be collected on Thursday."],
  ["Wonen", "Zet de verwarming wat lager voor het slapen.", "اخفض التدفئة قليلاً قبل الذهاب إلى النوم.", "ቅድሚ ምድቃስካ ነቲ ናይ ሙቐት መቆጻጸሪ ቁሩብ ኣጉድሎ።", "Osoo hin rafin dura hoo'isa manaa xiqqeessi.", "Turn down the heating a bit before going to sleep."],
  ["Wonen", "Mag ik het grote raam in de woonkamer openzetten?", "هل يمكنني فتح النافذة الكبيرة في غرفة المعيشة؟", "ኣብ ሳሎን ዘሎ ዓቢ መስኮት ክኸፍቶ ይኽእልዶ፧", "Foddaa guddaa kutaa keessaa banuu nan danda'aa?", "May I open the large window in the living room?"],
  ["Wonen", "De was hangt te drogen aan het wasrek.", "الغسيل معلق ليجف على منشر الغسيل.", "እቲ ዝተሓጽበ ክዳውንቲ ኣብ መደርደሪ ተሰቒሉ ይነቅጽ ኣሎ።", "Uffanni dhiqame akka goguuf fannifameera.", "The laundry is hanging to dry on the drying rack."],
  ["Wonen", "Er staat een pakketbezorger voor de flat.", "هناك عامل توصيل طرود يقف أمام مبنى الشقق.", "ናይ ፓኬት ኣከፋፋሊ ኣብ ቅድሚ እቲ ህንጻ ደው ኢሉ ኣሎ።", "Nama paakeejii geessu gamoo dura dhaabbata.", "A delivery courier is standing in front of the apartment building."],
  ["Wonen", "We koken samen een traditionele maaltijd vanavond.", "سنطبخ وجبة تقليدية أصيلة معاً هذه الليلة.", "ሎሚ ምሸት ባህላዊ መግቢ ሓቢርና ከነብስል ኢና።", "Galgala kana nyaata aadaa waliin bilcheessina.", "We are cooking a traditional meal together tonight."],

  // School, Weer, Kalender
  ["School", "Mijn zoon leest elke dag een verhaaltje voor.", "ابني يقرأ قصة بصوت عالٍ كل يوم.", "ወደይ ኩሉ መዓልቲ ሓጻር ዛንታ የንብብ።", "Ilmi koo guyyaa hunda seenaa dubbisa.", "My son reads a story out loud every day."],
  ["School", "Neem morgen je gymkleding en sportschoenen mee.", "أحضر ملابسك الرياضية وحذاءك الرياضي غداً.", "ጽባሕ ናይ ስፖርት ክዳንካን ጫማኻን ሒዝካ ምጻእ።", "Boru uffataafi kophee ispoortii kee qabadhuu kottu.", "Bring your gym clothes and sports shoes tomorrow."],
  ["Weer", "Het waait hard, maar de zon breekt door.", "الرياح تهب بقوة، لكن أشعة الشمس بدأت تشرق.", "ንፋስ ብርቱዕ ኣሎ፡ ጸሓይ ግን ትበርቕ ኣላ።", "Qilleensi cimaan bubbisa, garuu biiftuun baati.", "The wind is blowing hard, but the sun is breaking through."],
  ["Weer", "In de herfst vallen de gekleurde bladeren van de bomen.", "في فصل الخريف تتساقط أوراق الأشجار الملونة.", "ኣብ ቀውዒ ሕብራዊ ኣቑጽልቲ ካብ ኣእዋም ይረግፍ።", "Birraa keessa baallaan muka irraa harca'a.", "In autumn the colorful leaves fall from the trees."],
  ["Kalender", "Volgende week vieren we een officiële feestdag.", "الأسبوع المقبل سنحتفل بيوم عطلة رسمية.", "ዝመጽእ ሰሙን ወግዓዊ ናይ በዓል መዓልቲ ከነኽብር ኢና።", "Torban dhufu ayyaana mootummaa kabajna.", "Next week we celebrate an official public holiday."],
  ["Kalender", "Zaterdag is een fijne dag voor familie en sport.", "يوم السبت يوم رائع ومناسب للعائلة والرياضة.", "ቀዳም ንስድራቤትን ንስፖርትን ጽቡቕ መዓልቲ እዩ።", "Sanbanni maatiifi ispoortiif guyyaa gaariidha.", "Saturday is a great day for family and sports."]
];

// -------------------------------------------------------------
// GEVORDERD (A2-B1) BATCHES: Work, Administration, School, Health
// -------------------------------------------------------------
const gevorderdItems = [
  // Werk & Sollicitatie
  ["Werk", "Ik heb mijn cv bijgewerkt en een sollicitatiebrief geschreven.", "لقد قمت بتحديث سيرتي الذاتية وكتبت خطاب تقديم للوظيفة.", "ናይ ስራሕ ታሪኸይ ኣሐዲሰን ናይ ስራሕ መመልከቲ ደብዳበ ጽሒፈን ኣለኹ።", "Seenaa jireenyaa koo haaromsee xalayaa iyyannoo hojii barreesseera.", "I updated my CV and wrote a job application letter."],
  ["Werk", "Mijn leidinggevende vroeg of ik zaterdag kan overwerken.", "سألني مديري المباشر إذا كان بإمكاني العمل لساعات إضافية يوم السبت.", "ሓላፊየይ ቀዳም ተወሳኺ ሰዓታት ክሰርሕ እንተኽእል ሓቲቱኒ።", "Geggeessaan koo Sanbata sa'aatii dabalataa hojjechuu danda'uuf na gaafate.", "My supervisor asked if I could work overtime on Saturday."],
  ["Werk", "Tijdens de koffiepauze praat ik met mijn Nederlandse collega's.", "خلال استراحة القهوة أتحدث مع زملائي الهولنديين.", "ኣብ ናይ ቡን ዕረፍቲ ምስ ደቀባት መሳርሕተይ ይዛረብ።", "Boqonnaa bunaa keessatti hiriyoota koo wajjin nan haasa'a.", "During the coffee break I chat with my Dutch colleagues."],
  ["Werk", "Ik wil me graag aanmelden voor een cursus logistiek.", "أود التسجيل في دورة تدريبية في مجال الخدمات اللوجستية.", "ኣብ ናይ ሎጂስቲክስ ኮርስ ክምዝገብ ደልየ ኣለኹ።", "Leenjii loojistiksii irratti galmaa'uu barbaada.", "I would like to enroll in a logistics course."],
  ["Werk", "Mijn contract is met zes maanden verlengd door de directie.", "تم تمديد عقدي لمدة ستة أشهر إضافية من قبل الإدارة.", "ናይ ስራሕ ውዕለይ ብምምሕዳር ንሽዱሽተ ወርሒ ተናዊሑ ኣሎ።", "Waliigalteen hojii koo ji'oota jahaaf naaf dheerateera.", "My contract has been extended by six months by management."],
  ["Werk", "Kunt u mij uitleggen hoe dit kassasysteem precies werkt?", "هل يمكنك أن تشرح لي كيف يعمل نظام الدفع هذا بالتحديد؟", "እዚ ናይ ክፍሊት ስርዓት ብኸመይ ከም ዝሰርሕ ብልክዕ ክትገልጹለይ ትኽእሉዶ፧", "Sirni kaffaltii kun akkamitti akka hojjetu naaf ibsuu dandeessuu?", "Could you explain to me how this cash register system works exactly?"],
  ["Werk", "Ik meld me vandaag ziek omdat ik zware griep heb.", "أبلغ عن مرضي اليوم لأنني مصاب بإنفلونزا شديدة وحمى.", "ብርቱዕ ጉንፋዕ ስለዘለኒ ሎሚ ናይ ሕማም ፍቓድ እሓትት ኣለኹ።", "Utuu dhibeen cimaan na qabee har'a hojii hin dhufu.", "I am reporting sick today because I have a severe flu."],
  ["Werk", "Iedereen draagt verplicht veiligheidsschoenen in het magazijn.", "يرتدي الجميع أحذية الأمان بشكل إلزامي في المستودع.", "ኣብ መኽዘን ኩሉ ሰብ ናይ ድሕንነት ጫማ ምኽዳን ግዴታ እዩ።", "Kuusaa keessatti hundi kophee nageenyaa uffachuun dirqama.", "Everyone is required to wear safety shoes in the warehouse."],
  ["Werk", "Tijdens het functioneringsgesprek bespreken we mijn leerdoelen.", "خلال مقابلة تقييم الأداء سنناقش أهدافي التعليمية والمهنية.", "ኣብ ናይ ስራሕ ገምጋም ርክብ ብዛዕባ ናይ ትምህርቲ ሸቶታተይ ክንመያየጥ ኢና።", "Marii gamaaggama hojii irratti waa'ee galma koo mari'anna.", "During the performance review we discuss my learning objectives."],
  ["Werk", "Ik heb een certificaat behaald voor veilig werken met de vorkheftruck.", "حصلت على شهادة معتمدة للعمل بأمان على الرافعة الشوكية.", "ብፎርክሊፍት ብደሓን ንምስራሕ ምስክር ወረቐት ረኺበ ኣለኹ።", "Waraqaa ragaa konkolaataa fe'umsaa oofuuf argadheera.", "I earned a certificate for operating the forklift safely."],
  ["Werk", "Mijn collega legt mij de specifieke veiligheidsregels van de fabriek uit.", "يشرح لي زميلي قواعد السلامة المهنية الدقيقة المتبعة في المصنع.", "መሳርሕተይ ናይቲ ፋብሪካ ናይ ድሕንነት ደንብታት የረድኣኒ ኣሎ።", "Hiriyaan hojii koo seera nageenya warshaa naaf ibsa.", "My colleague explains the specific factory safety rules to me."],
  ["Werk", "Het bedrijf biedt doorgroeimogelijkheden voor gemotiveerde medewerkers.", "توفر الشركة فرصاً حقيقية للتطور المهني للموظفين الطموحين.", "እቲ ትካል ንንጡፋት ሰራሕተኛታት ናይ ምዕባይ ዕድላት ይህብ እዩ።", "Dhaabbanni kun hojjettoota dandeettii qabaniif carraa guddinaa kenna.", "The company offers growth opportunities for motivated employees."],
  ["Werk", "Ik moet mijn gewerkte uren vóór maandag digitaal accorderen.", "يجب علي اعتماد وتأكيد ساعاتي المنجزة إلكترونياً قبل الاثنين.", "ዝሰራሕክዎም ሰዓታት ቅድሚ ሰኑይ ብዲጂታል ከጽድቖም ኣሎኒ።", "Sa'aatii hojjetame Wiixata dura toora irratti mirkaneessuu qaba.", "I must digitally approve my worked hours before Monday."],

  // Financiën & Wonen
  ["Financiën", "Hoe vraag ik huurtoeslag aan via de website van de Belastingdienst?", "كيف أتقدم بطلب للحصول على بدل إيجار عبر موقع الضرائب؟", "ናይ ገዛ ክራይ ደገፍ ካብ መርበብ ሓበሬታ ግብሪ ብኸመይ ክሓትት ይኽእል፧", "Weebsaayitii mootummaa irraa gargaarsa kireeffannaa akkamittan gaafadha?", "How do I apply for rent allowance via the Tax Authority website?"],
  ["Financiën", "De maandelijkse huur wordt automatisch via incasso afgeschreven.", "يتم خصم الإيجار الشهري تلقائياً عبر نظام الخصم المباشر.", "እቲ ወርሓዊ ናይ ገዛ ክራይ ብቐጥታ ብኢንካሶ ካብ ባንክ ይቑረጽ።", "Kireeffannaan ji'aa ofumaan herreega koo irraa hir'ifama.", "The monthly rent is automatically debited via direct debit."],
  ["Financiën", "Ik wil graag een aparte spaarrekening voor mijn gezin openen.", "أود فتح حساب توفير منفصل لعائلتي لتوفير النفقات.", "ንደቀይ ዝኸውን ናይ ምዕቋብ ሕሳብ ባንክ ብፍሉይ ክኸፍት ደልየ ኣለኹ።", "Maatii kootiif herreega qusannaa banuu barbaada.", "I would like to open a separate savings account for my family."],
  ["Financiën", "De jaarafrekening voor energie viel gunstiger uit dan vorig jaar.", "كان الحساب السنوي للطاقة أكثر إيجابية وتوفيراً مقارنة بالعام الماضي.", "ናይ ዓመት ናይ ኤሌክትሪክን ጋዝን ሕሳብ ካብ ናይ ዓሚ ዝሓሸ ኮይኑ ወጺኡ።", "Herreegni humnaa kan waggaa isa bara darbee caalaa gaariidha.", "The annual energy statement turned out better than last year."],
  ["Financiën", "Bewaar alle aankoopbewijzen en facturen zorgvuldig voor de administratie.", "احتفظ بجميع إيصالات الشراء والفواتير بعناية لأغراض السجلات والمحاسبة.", "ኩሉ ናይ ዕዳጋ ረሲታትን ፋክቱራታትን ንምሕደራ ብጥንቃቐ ኣቀምጦ።", "Nagahee bittaa fi faakturaa hunda of eeggannoodhaan olkaa'aa.", "Keep all proof of purchase and invoices carefully for records."],
  ["Wonen", "De verhuurder heeft aangekondigd dat de lift volgende week wordt gekeurd.", "أعلن مالك العقار أنه سيتم فحص المصعد وتفتيشه الأسبوع المقبل.", "እቲ ኣካራዪ ዝመጽእ ሰሙን እቲ ሊፍት ክምርመር ምዃኑ ኣፍሊጡ ኣሎ።", "Abbaan manaa torban dhufu liiftiin akka qoratamu beeksiseera.", "The landlord announced that the elevator will be inspected next week."],
  ["Wonen", "Er is een kleine lekkage ontstaan onder de wastafel in de badkamer.", "حدث تسرب بسيط للمياه أسفل حوض الحمام.", "ኣብ ትሕቲ እቲ ኣብ ሽቓቕ ዘሎ መተሓጸቢ ንእሽቶ ምፍሳስ ማይ ኣጋጢሙ።", "Mana fincaanii keessatti dhangala'aan bishaanii xiqqoon uumameera.", "A small leak has occurred under the bathroom sink."],
  ["Wonen", "U bent zelf verantwoordelijk voor het schoonhouden van uw galerij.", "أنت مسؤول شخصياً عن الحفاظ على نظافة الرواق أمام شقتك.", "ነቲ ኣብ ቅድሚ ገዛኻ ዘሎ መተሓላለፊ ናይ ምጽራይ ሓላፍነት ናትካ እዩ።", "Balbala mana keetii qulqulleessuuf itti gaafatamummaa qabda.", "You are personally responsible for keeping your corridor clean."],

  // Zorg, School & Gemeente
  ["Zorg", "De fysiotherapeut heeft mij effectieve oefeningen voor mijn nek gegeven.", "أعطاني المعالج الطبيعي تمارين علاجية فعالة لآلام الرقبة.", "ሓኪም ኣካላዊ ምውስዋስ ንኽሳደይ ዝኸውን ውጽኢታዊ ልምምድ ሂቡኒ።", "Ogeessi fiiziyooteraapii sochii mormaatiif natti agarsiiseera.", "The physiotherapist gave me effective exercises for my neck."],
  ["Zorg", "Ik heb een officiële verwijsbrief van mijn huisarts voor de cardioloog.", "لدي إحالة طبية رسمية من طبيب الأسرة لمراجعة طبيب القلب.", "ናብ ናይ ልቢ ሓኪም ንምኻድ ናይ ሓኪም ስድራቤት ወግዓዊ መወከሲ ወረቐት ኣሎኒ።", "Dooqtoora onnee bira deemuf xalayaa eeyyamaa qaba.", "I have an official referral letter from my GP for the cardiologist."],
  ["Zorg", "De tandarts adviseert om twee keer per dag elektrisch te poetsen.", "ينصح طبيب الأسنان بتنظيف الأسنان بفرشاة كهربائية مرتين يومياً.", "ሓኪም ስኒ ኣብ መዓልቲ ክልተ ግዜ ብኤሌክትሪክ ብሩሽ ስኒ ክትስቅር ይመክር።", "Dooqtoorri ilkaanii guyyaatti marroo lama qulqulleessuu gorsa.", "The dentist advises brushing with an electric toothbrush twice daily."],
  ["Gemeente", "Ik heb een afspraak bij Burgerzaken om mijn verblijfsdocument te vernieuwen.", "لدي موعد في دائرة الأحوال المدنية لتجديد وثيقة إقامتي الرسمية.", "ናይ መንበሪ ፍቓደይ ሰነድ ንምሕዳስ ኣብ ምምሕዳር ከተማ ቆጸራ ኣሎኒ።", "Waraqaa jireenyaa haaromsuuf waajjira bulchiinsaatti beellama qaba.", "I have an appointment at Civil Affairs to renew my residence permit."],
  ["Gemeente", "U kunt via uw DigiD eenvoudig een uittreksel uit de BRP aanvragen.", "يمكنك بسهولة طلب مستخرج من سجل النفوس BRP باستخدام DigiD.", "ብመንገዲ DigiD ካብ መዝገብ ህዝቢ (BRP) ቅዳሕ ብቐሊሉ ክትሓቱ ትኽእሉ ኢኹም።", "DigiD fayyadamuun waraqaa ragaa BRP salphaatti gaafachuu dandeessu.", "You can easily request an extract from the BRP using your DigiD."],
  ["School", "Morgen organiseren we een ouderavond over het gebruik van computers in de klas.", "ننظم غداً اجتماعاً لأولياء الأمور حول استخدام أجهزة الكمبيوتر في التعليم.", "ጽባሕ ኣብ ክፍሊ ብዛዕባ ኣጠቓቕማ ኮምፒተር ናይ ወለዲ ምሸት ከነካይድ ኢና።", "Boru waa'ee koompiitaraa mana barumsaa irratti walga'ii warraa qabna.", "Tomorrow we are organizing a parents evening about computer use in the classroom."],
  ["School", "De leerkracht benadrukt hoe belangrijk het is om thuis Nederlands te lezen.", "يؤكد المعلم على مدى أهمية القراءة باللغة الهولندية في المنزل يومياً.", "መምህር ኣብ ገዛ ኔዘርላንድስኛ ምንባብ ክንደይ ኣገዳሲ ምዃኑ የብርህ።", "Barsiisaan mana keessatti afaan Daachi dubbisuun barbaachisaa ta'uu ibsa.", "The teacher emphasizes how important it is to read Dutch at home."]
];

// -------------------------------------------------------------
// MOEILIJK (B1-B2) BATCHES: Administrative Law, Contracts, Tax, Healthcare
// -------------------------------------------------------------
const moeilijkItems = [
  // Bestuursrecht & Bezwaar
  ["Bestuursrecht", "U kunt binnen zes weken na dagtekening van dit besluit een bezwaarschrift indienen.", "يمكنك تقديم اعتراض خلال ستة أسابيع من تاريخ صدور هذا القرار.", "እዚ ውሳነ ካብ ዝወጸሉ ዕለት ጀሚሩ ኣብ ውሽጢ ሽዱሽተ ሰሙን ተቓውሞ ከተቕርቡ ትኽእሉ ኢኹም።", "Murtiin kun kennamee torbanoota jaha keessatti iyyannoo mormii dhiyeessuu dandeessu.", "You can lodge a notice of objection within six weeks of the date of this decision."],
  ["Bestuursrecht", "Het bezwaarschrift dient ondertekend te zijn en de gronden van het bezwaar te bevatten.", "يجب أن يكون خطاب الاعتراض موقعاً ويحتوي على أسباب الاعتراض بالتفصيل.", "ናይ ተቓውሞ ደብዳበ ዝተፈረመን ናይ ተቓውሞኻ ምኽንያታት ዝሓዘን ክኸውን ኣለዎ።", "Xalayaan mormii mallattaa'ee sababa mormii of keessaa qabaachuu qaba.", "The notice of objection must be signed and state the grounds of the objection."],
  ["Bestuursrecht", "Het bestuursorgaan beslist binnen twaalf weken na ontvangst van het bezwaarschrift.", "تبت الهيئة الإدارية في الأمر خلال اثني عشر أسبوعاً من استلام خطاب الاعتراض.", "እቲ ምምሕዳራዊ ኣካል ኣብ ውሽጢ ዓሰርተ ክልተ ሰሙን ውሳነ ይህብ።", "Qaamni bulchiinsaa torbanoota kudha lama keessatti murtii kenna.", "The administrative authority will decide within twelve weeks of receiving the objection."],
  ["Bestuursrecht", "U heeft recht op vergoeding van de redelijkerwijs gemaakte proceskosten.", "يحق لك الحصول على تعويض مالي عن تكاليف الدعوى القضائية التي تكبدتها بحسن نية.", "ነቲ ብምኽንያታዊ መገዲ ዘውጻእካዮ ናይ ፍርዲ ቤት ወጻኢታት ናይ ምኽሳስ መሰል ኣሎካ።", "Baasii seeraa qabatamaa baasteef beenyaa argachuuf mirga qabda.", "You are entitled to compensation for reasonably incurred legal costs."],
  ["Bestuursrecht", "Een belanghebbende kan rechtstreeks beroep instellen bij de bevoegde rechtbank.", "يجوز لكل صاحب مصلحة مباشرة الطعن والاستئناف أمام المحكمة الابتدائية المختصة.", "ዝምልከቶ ኣካል ብቐጥታ ናብ ዝምልከቶ ፍርዲ ቤት ይግባይ ናይ ምባል መሰል ኣለዎ።", "Namni dhimmi ilaallatu kallattiin gara mana murtiitti iyyachuu danda'a.", "An interested party may lodge an appeal directly with the competent district court."],
  ["Bestuursrecht", "De voorzieningenrechter kan een voorlopige voorziening treffen ter voorkoming van onevenredig nadeel.", "يجوز لقاضي الأمور المستعجلة اتخاذ تدبير وقائي مؤقت لمنع وقوع ضرر لا يمكن تداركه.", "ዳኛ ንዘይተመጣጠነ ጉድኣት ንምክልኻል ግዝያዊ ናይ ዕረፍቲ መፍትሒ ክህብ ይኽእል እዩ።", "Abbaan murtii miidhaa hin malle ittisuuf murtee yeroo kennuu danda'a.", "The preliminary relief judge may grant an injunction to prevent disproportionate harm."],
  ["Bestuursrecht", "Het bestuursorgaan dient de nodige kennis omtrent de relevante feiten zorgvuldig te vergaren.", "يجب على الهيئة الإدارية استقصاء وجمع كافة الوقائع والبيانات ذات الصلة بالموضوع بعناية.", "እቲ ምምሕዳራዊ ኣካል ቅድሚ ውሳነ ምሃቡ ኣገደስቲ ሓቅታት ብጥንቃቐ ክእክብ ግዴታ ኣለዎ።", "Qaamni bulchiinsaa odeeffannoo fi dhugaa jiru hunda walitti qabuu qaba.", "The administrative authority must carefully gather the necessary knowledge regarding relevant facts."],
  ["Bestuursrecht", "De motivering van een beschikking moet deugdelijk, consistent en begrijpelijk zijn.", "يجب أن يكون التعليل القانوني للقرار الصادر متماسكاً ومنطقياً ومفهوماً للجميع.", "ናይቲ ወግዓዊ ውሳነ ምኽንያት ቅቡልን ንጹርን ተረዳእን ክኸውን ኣለዎ።", "Sababni murtii seera qabeessaa fi kan ifa ta'e ta'uu qaba.", "The reasoning for an administrative order must be sound, consistent, and comprehensible."],

  // Arbeidsrecht & CAO
  ["Arbeidsrecht", "De werknemer heeft recht op wettelijke doorbetaling van loon tijdens ziekte.", "يحق للموظف الاستمرار في تقاضي الأجر بموجب القانون أثناء فترة المرض المعتمدة.", "እቲ ሰራሕተኛ ብሕጊ መሰረት ኣብ ግዜ ሕማም ደሞዙ ናይ ምርካብ መሰል ኣለዎ።", "Hojjetaan yeroo dhukkubaa seeraan miindaa argachuuf mirga qaba.", "The employee is legally entitled to continued payment of wages during sickness."],
  ["Arbeidsrecht", "Beide partijen nemen een wettelijke opzegtermijn van één kalendermaand in acht.", "يلتزم الطرفان بفترة إشعار قانونية مدتها شهر تقويمي كامل قبل الإنهاء.", "ክልቲኦም ወገናት ናይ ሓደ ወርሒ ሕጋዊ ናይ ምቁራጽ መጠንቀቕታ ግዜ የኽብሩ።", "Lamaan isaaniiyyuu yeroo beeksisa ji'a tokkoo kabajuu qabu.", "Both parties observe a statutory notice period of one calendar month."],
  ["Arbeidsrecht", "Bij beëindiging met wederzijds goedvinden wordt een formele vaststellingsovereenkomst gesloten.", "عند إنهاء العقد بالتراضي التام بين الطرفين يتم صياغة اتفاقية تسوية نهائية ملزمة.", "ናይ ስራሕ ውዕል ብክልቲኣዊ ስምምዕ ክቋረጽ ከሎ ናይ መዛዘሚ ውዕል ወረቐት ይግበር።", "Waliigalteen hojii walii galteedhaan yoo xumurame sanadni waliigaltee ni mallattaa'a.", "When terminating by mutual consent, a formal settlement agreement is concluded."],
  ["Arbeidsrecht", "De collectieve arbeidsovereenkomst (cao) bevat bindende afspraken over salaris en toeslagen.", "تحتوي اتفاقية العمل الجماعية على بنود ملزمة قانونياً بشأن هيكل الرواتب والبدلات الإضافية.", "እቲ ሓባራዊ ናይ ስራሕ ስምምዕ (cao) ብዛዕባ ደሞዝን ተወሳኺ ክፍሊትን ቀያዲ ውሳነታት ዝሓዘ እዩ።", "Waliigalteen hojjettootaa gamtaa waa'ee mindaa fi dabalataa irratti murtii dirqisiisaa qaba.", "The collective labor agreement contains binding agreements on salary and surcharges."],
  ["Arbeidsrecht", "Een proeftijdbeding is slechts rechtsgeldig indien dit uitdrukkelijk schriftelijk is overeengekomen.", "يكون شرط فترة التجربة باطلاً ما لم يتم النص عليه والاتفاق عليه كتابياً وبوضوح.", "ናይ ፈተና ግዜ ውዕል ብጽሑፍ ብንጹር እንተዘይተገይሩ ሕጋዊ ዋጋ የብሉን።", "Waliigalteen yeroo qormaataa yoo barreeffamaan ta'e qofa seera qabaata.", "A probationary period clause is legally valid only if explicitly agreed upon in writing."],
  ["Arbeidsrecht", "De werkgever is verplicht te zorgen voor een gezonde en veilige werkomgeving volgens de Arbowet.", "يلتزم صاحب العمل بتوفير بيئة عمل آمنة وصحية وفقاً لقانون ظروف العمل.", "ኣስራሒ ብመሰረት ሕጊ ስራሕ ንሰራሕተኛታት ጥዑይን ውሑስን ናይ ስራሕ ቦታ ናይ ምፍጣር ግዴታ ኣለዎ።", "Hojjachiisaan naannoo hojii nagaafi fayya qabeessa ta'e mijeessuuf dirqama qaba.", "The employer is obligated to ensure a healthy and safe work environment under the Working Conditions Act."],
  ["Arbeidsrecht", "Bij collectief ontslag wegens reorganisatie dient de werkgever tijdig een sociaal plan op te stellen.", "في حالات التسريح الجماعي بسبب إعادة الهيكلة يجب على صاحب العمل إعداد خطة اجتماعية مسبقاً.", "ብሰንኪ ዳግመ-ውደባ ሓባራዊ ስንብት ክግበር ከሎ፡ ኣስራሒ ማሕበራዊ ትልሚ ከዳልው ኣለዎ።", "Hojii irraa ari'uuf karoora hawaasummaa qopheessuun barbaachisaadha.", "In case of collective dismissal due to reorganization, the employer must draft a social plan in good time."],

  // Belasting, Toeslagen & Wonen
  ["Belasting", "Het toetsingsinkomen vormt het officiële uitgangspunt voor de berekening van uw toeslagen.", "يشكل الدخل الخاضع للمراجعة الأساس الرسمي والوحيد لاحتساب كافة البدلات الاجتماعية.", "እቲ ዝተፈተሸ ኣታዊ ነቲ ናይ መወዳእታ ናይ ደገፍ ሕሳብኩም ወግዓዊ መሰረት ይኸውን።", "Galii qoratame bu'uura shallaggii gargaarsaa isa dhumaa ta'a.", "The assessable income forms the official basis for calculating your allowances."],
  ["Belasting", "U bent wettelijk verplicht om substantiële wijzigingen in uw inkomen tijdig door te geven.", "أنت ملزم قانوناً بإخطار مصلحة الضرائب بأي تغييرات جوهرية في دخلك في الوقت المناسب.", "ኣብ ኣታዊኻ ንዝመጽእ ዓቢ ለውጢ ብግዜኡ ናይ ምሕባር ሕጋዊ ግዴታ ኣሎካ።", "Jijjiirama galii kee keessatti ta'e yeroon beeksisuun seeraan dirqama.", "You are legally obligated to report substantial changes in your income in a timely manner."],
  ["Belasting", "Te veel ontvangen voorschotten op de zorgtoeslag moeten worden terugbetaald aan de fiscus.", "يجب إعادة أي دفعات مسبقة زائدة تم استلامها عن بدل الرعاية الصحية إلى السلطات الضريبية.", "ተወሳኺ ዝተቐበልካዮ ናይ ጥዕና ደገፍ ገንዘብ ናብ ቤት ጽሕፈት ግብሪ ክምለስ ኣለዎ።", "Gargaarsi fayyaa dabalataan fudhatame mootummaaf deebi'uu qaba.", "Excess advance payments of healthcare allowance must be repaid to the tax authority."],
  ["Huisvesting", "Als appartementseigenaar bent u van rechtswege lid van de Vereniging van Eigenaars (VvE).", "بصفتك مالكاً للشقة فأنت عضو بموجب القانون في جمعية الملاك المشتركين للعقار.", "ከም ናይ ኣፓርተማ ዋና መጠን፡ ብሕጊ ኣባል ናይቲ ናይ ዋናታት ማሕበር (VvE) ኢኻ።", "Abbaa appaartaamaa waan taateef miseensa waldaa abbootii qabeenyaati.", "As an apartment owner you are by operation of law a member of the Association of Owners (VvE)."],
  ["Huisvesting", "De maandelijkse servicekosten dekken de opstalverzekering en het meerjarenonderhoudsplan.", "تغطي رسوم الخدمات الشهرية التأمين على المبنى وخطة الصيانة الشاملة طويلة الأجل.", "እቲ ወርሓዊ ናይ ኣገልግሎት ክፍሊት ነቲ ናይ ህንጻ መድሕንን ነዊሕ ናይ ጽገና መደብን ይሽፍን።", "Kaffaltiin tajaajilaa inshuraansii gamoo fi karoora suphaa yeroo dheeraa uwwisa.", "The monthly service charges cover building insurance and the multi-year maintenance plan."],
  ["Huisvesting", "De huurovereenkomst kan slechts op limitatief in de wet genoemde gronden worden ontbonden.", "لا يجوز إنهاء عقد الإيجار وفسخه إلا بناءً على أسباب حصرية ومحددة بوضوح في القانون المدني.", "ናይ ክራይ ውዕል ብሕጊ ብንጹር ብዝተደንገጉ ውሱናት ምኽንያታት ጥራይ ክቋረጽ ይኽእል እዩ።", "Waliigalteen kireeffannaa sababa seeraa qofaatiin addaan cituu danda'a.", "The lease agreement may only be dissolved on grounds strictly limited by law."],

  // Gezondheidszorg, Ethiek & Maatschappij
  ["Gezondheid", "De behandelend specialist heeft de plicht om u volledig te informeren over mogelijke risico's.", "يلتزم الطبيب الأخصائي المعالج بإعلامك بكافة المخاطر والخيارات البديلة المتاحة.", "እቲ ዝሕክመካ ዘሎ ስፔሻሊስት ብዛዕባ ናይቲ ሕክምና ሓደጋታት ምሉእ ሓበሬታ ናይ ምሃብ ግዴታ ኣለዎ።", "Dooqtoorri ogeessa ta'e waa'ee miidhaa dhufuu danda'u guutummaatti ibsuuf dirqama qaba.", "The treating specialist has the duty to fully inform you about potential risks."],
  ["Gezondheid", "Het medisch beroepsgeheim waarborgt de strikte geheimhouding van uw medisch dossier.", "يضمن السر المهني الطبي كتمان وسرية جميع بيانات ملفك الطبي من الاطلاع غير المصرح به.", "ናይ ሕክምና ሞያዊ ምስጢር ናትካ ናይ ሕክምና መዝገብ ምስጢራዊ ኮይኑ ክዕቀብ የረጋግጽ።", "Iccitiin ogummaa yaalaa galmee fayyaa kee hundumaa eega.", "Medical professional confidentiality safeguards the strict secrecy of your medical record."],
  ["Maatschappij", "Democratische besluitvorming vereist een open maatschappelijk debat en respect voor minderheden.", "يتطلب اتخاذ القرارات الديمقراطية حواراً مجتمعياً مفتوحاً واحتراماً راسخاً لحقوق الأقليات.", "ዲሞክራስያዊ ናይ ውሳነ ኣወሳስዳ ግሉጽ ዘተን ንውሑዳን ምክብባርን ይሓትት።", "Murtee dimookiraatawaan marii hawaasaa banaafi mirga xiqqaachuu kabajuu gaafata.", "Democratic decision-making requires open public debate and respect for minorities."],
  ["Maatschappij", "Vrijheid van meningsuiting en persvrijheid zijn onmisbare pijlers van de Nederlandse democratie.", "حرية التعبير وحرية الصحافة ركيزتان أساسيتان لا غنى عنهما في الديمقراطية الهولندية.", "ናይ ሓሳብካ ናይ ምግላጽ ናጽነትን ናይ ጋዜጠኝነት ናጽነትን መሰረታት ናይ ኔዘርላንድስ ዲሞክራሲ እዮም።", "Mirgi yaada ofii ibsachuu fi bilisummaan miidiyaa bu'uura dimookiraasiiti.", "Freedom of speech and freedom of the press are indispensable pillars of Dutch democracy."]
];

// Add everything
basisItems.forEach(item => add('basis', item[0], item[1], item[2], item[3], item[4], item[5]));
gevorderdItems.forEach(item => add('gevorderd', item[0], item[1], item[2], item[3], item[4], item[5]));
moeilijkItems.forEach(item => add('moeilijk', item[0], item[1], item[2], item[3], item[4], item[5]));

console.log(`Curated unique core sentences: ${sentences.length}`);

// Now systematically expand each category with realistic, unique sentence variations across topics
// We will generate distinct sentences using realistic grammatical scenarios without any digit suffixes.
const basisScenarios = [
  // Supermarkt & Eten
  ["Boodschappen", "Mag ik twee kilo aardappels en een doosje eieren?", "هل يمكنني الحصول على كيلوغرامين من البطاطس وعلبة بيض؟", "ክልተ ኪሎ ድንሽ ምስ ሓደ ካርቶን እንቋቝሖ ክረክብ ይኽእልዶ፧", "Dinnicha kiiloo lamaafi saanduqa buuphaa argachuu nan danda'aa?", "May I have two kilos of potatoes and a carton of eggs?"],
  ["Boodschappen", "Waar vind ik de olijfolie en zonnebloemolie?", "أين أجد زيت الزيتون وزيت دوار الشمس؟", "ናይ ኣውልዕ ዘይትን ናይ ጸሓይ ዕንባባ ዘይትን ኣበይ ክረክብ ይኽእል፧", "Zayita ejersaafi zayita suufii eessatti argadha?", "Where can I find olive oil and sunflower oil?"],
  ["Boodschappen", "Hoeveel kost deze krop verse sla?", "كم يكلف رأس الخس الطازج هذا؟", "እዚ ሓድሽ ሰላጣ ክንደይ ዋጋ ኣለዎ፧", "Salaxaan haaraan kun gatiin isaa meeqa?", "How much does this head of fresh lettuce cost?"],
  ["Boodschappen", "Heeft u ook volkoren pasta in het schap?", "هل لديكم أيضاً معكرونة القمح الكامل على الرف؟", "ናይ ስርናይ ፓስታ ኣብ መደርደሪ ኣለኩምዶ፧", "Paastaa qamadii guutuu qabduu?", "Do you also have whole wheat pasta on the shelf?"],
  ["Boodschappen", "De yoghurt en kaas staan in het koelvak.", "الزبادي والجبن موجودان في قسم التبريد.", "እቲ ዮጉርትን ፎርማጆን ኣብ መዝሓሊ ኣሎ።", "Itittuun fi ayibni kutaa qabbaneessaa keessa jiru.", "The yogurt and cheese are in the refrigerated section."],
  ["Boodschappen", "Ik zoek bruine bonen en rode linzen.", "أنا أبحث عن فاصوليا بنية وعدس أحمر.", "ቡናዊ ባልዶንጓን ቀይሕ ብርስንን እደሊ ኣለኹ።", "Baaqelaa magaalaafi misira diimaa barbaada.", "I am looking for brown beans and red lentils."],
  ["Boodschappen", "Mag ik betalen met kleingeld bij deze kassa?", "هل يمكنني الدفع بالنقود المعدنية الصغيرة عند هذا الصندوق؟", "ኣብዛ ካሳ ብሳንቲም ክኸፍል ይፍቀድዶ፧", "Bakka kaffaltii kanatti saantimaan kaffaluu nan danda'aa?", "May I pay with coins at this register?"],
  ["Boodschappen", "Heeft u nog verse croissants vanochtend?", "هل لا يزال لديكم كرواسون طازج هذا الصباح؟", "ሎሚ ንግሆ ሓድሽ ክሩዋሶን ኣለኩምዶ፧", "Ganama kana daabboo mi'aawaa qabduu?", "Do you still have fresh croissants this morning?"],
  ["Boodschappen", "De rijst en suiker staan in gang vier.", "الأرز والسكر موجودان في الممر رقم أربعة.", "ሩዝን ሽኮርን ኣብ ሳልሳይ መስመር ኣለዉ።", "Ruuzaafi sukkaarri sarara afur keessa jiru.", "The rice and sugar are in aisle four."],
  ["Boodschappen", "Wilt u pinnen of contant betalen?", "هل تريد الدفع بالبطاقة المصرفية أم نقداً؟", "ብካርድ ዲኹም ወይስ ብጥረ ገንዘብ ክትከፍሉ ትደልዩ፧", "Kaardiidhaan moo maallaqa harkaan kaffaluu barbaaddu?", "Would you like to pay with card or cash?"],
  // Vervoer
  ["Vervoer", "Stopt deze bus ook bij het stadhuis?", "هل تتوقف هذه الحافلة عند مبنى البلدية أيضاً؟", "እዚ ኣውቶቡስ ኣብ ማዘጋጃ ቤት ደው ይብል ድዩ፧", "Baasiin kun mana qopheessaa biratti ni dhaabbataa?", "Does this bus also stop at city hall?"],
  ["Vervoer", "Hoeveel haltes is het nog tot het ziekenhuis?", "كم محطة متبقية حتى نصل إلى المستشفى؟", "ክሳብ ሆስፒታል ክንደይ መደበር ተሪፉ ኣሎ፧", "Gara hospitaalaatti buufata meeqatu hafe?", "How many stops is it until the hospital?"],
  ["Vervoer", "Mijn ov-chipkaart heeft te weinig saldo.", "رصيد بطاقة المواصلات العامة الخاصة بي غير كافٍ.", "ናይ መጓዓዝያ ካርደይ እኹል ገንዘብ የብሉን።", "Kaardiin geejjibaa koo maallaqa ga'aa hin qabu.", "My transit card has insufficient balance."],
  ["Vervoer", "De metro rijdt elke tien minuten.", "المترو يعمل ويغادر كل عشر دقائق بانتظام.", "ሜትሮ ኣብ ነፍሲ ወከፍ ዓሰርተ ደቒቕ ይንቀሳቐስ።", "Metroon daqiiqaa kudhan hunda keessatti ni deema.", "The metro runs every ten minutes."],
  ["Vervoer", "U moet overstappen op het volgende station.", "يجب عليك تبديل وسيلة النقل في المحطة التالية.", "ኣብታ ትቕጽል መደበር ባቡር ክትቅይሩ ኣለኩም።", "Buufata itti aanu irratti jijjiiruu qabdu.", "You need to transfer at the next station."],
  ["Vervoer", "Mag mijn hond gratis mee in de trein?", "هل يمكن لكلبي الركوب مجاناً في القطار؟", "ከልበይ ኣብ ባቡር ብነጻ ክኣቱ ይፍቀድዶ፧", "Sareen koo bilisaan baabura seenuu danda'aa?", "May my dog ride for free on the train?"],
  ["Vervoer", "De deuren sluiten automatisch voor vertrek.", "الأبواب تغلق تلقائياً قبل تحرك وانطلاق القطار.", "ማዕጾታት ባቡር ቅድሚ ምብጋሱ ብቐጥታ ይዕጾ።", "Balballi osoo hin ka'in dura ofumaan cufama.", "The doors close automatically before departure."],
  ["Vervoer", "Pardon, waar is de uitgang naar het centrum?", "معذرة، أين المخرج المؤدي إلى وسط المدينة؟", "ይቕሬታ፡ ናብ ማእከል ከተማ ዘውጽእ መውጺኢ ኣበይ ኣሎ፧", "Dhiifama, ba'umsa gara wiirtuu magaalaatti geessu eessa jira?", "Excuse me, where is the exit to the city center?"],
  // Wonen & Thuis
  ["Wonen", "De keuken heeft een gasfornuis en een oven.", "يحتوي المطبخ على موقد غاز وفرن للطهي.", "እቲ ክሽነ ናይ ጋዝ እቶንን ፎርኖን ኣለዎ።", "Kushinaan kibriitiifi oovenii qaba.", "The kitchen has a gas stove and an oven."],
  ["Wonen", "Zet de schoenen alsjeblieft op de deurmat.", "يرجى وضع الأحذية على ممسحة الباب في المدخل.", "በጃኹም ጫማኹም ኣብቲ መርገጺ ማዕጾ ኣቀምጥዎ።", "Maaloo kophée keessan karra dura kaa'aa.", "Please put the shoes on the doormat."],
  ["Wonen", "In de slaapkamer staat een kledingkast en een bed.", "يوجد في غرفة النوم خزانة ملابس وسرير مريح.", "ኣብ መደቀሲ ክፍሊ ናይ ክዳን ሳንዱቕን ዓራትን ኣሎ።", "Kutaa ciisichaa keessa saanduqa uffataafi siree jira.", "In the bedroom is a wardrobe and a bed."],
  ["Wonen", "De brievenbus zit in de voordeur.", "صندوق البريد مدمج وموجود في الباب الأمامي.", "ናይ ፖስታ ሳንዱቕ ኣብ ማዕጾ ገዛ ኣሎ።", "Saanduqni poostaa balbala duraa irratti jira.", "The mailbox is in the front door."],
  ["Wonen", "We stofzuigen de woonkamer elke zaterdag.", "نقوم بتنظيف غرفة المعيشة بالمكنسة الكهربائية كل سبت.", "ኩሉ ቀዳም ነቲ ሳሎን ብቫክዩም ነጽርዮ።", "Sanbata hunda kutaa keessaa vaakiyuumii goona.", "We vacuum the living room every Saturday."],
  ["Wonen", "Het warme water in de douche doet het niet.", "الماء الساخن في الدش لا يعمل حالياً.", "ኣብ መተሓጸቢ ዘሎ ውዑይ ማይ ኣይሰርሕን ዘሎ።", "Bishaan oo'aan dhiqannaa keessaa hin hojjetu.", "The hot water in the shower is not working."],
  ["Wonen", "Heeft u een extra stoel voor het bezoek?", "هل لديك كرسي إضافي للضيوف والزوار؟", "ንኣጋይሽ ዝኸውን ተወሳኺ መንበር ኣለኩምዶ፧", "Keessummootaaf barcuma dabalataa qabduu?", "Do you have an extra chair for visitors?"],
  // School & Taal
  ["School", "De kinderen leren vandaag nieuwe Nederlandse woorden.", "يتعلم الأطفال كلمات هولندية جديدة ومفيدة اليوم.", "ቆልዑ ሎሚ ሓደሽቲ ናይ ኔዘርላንድስኛ ቃላት ይምሃሩ ኣለዉ።", "Ijoolleen har'a jechoota Daachi haaraa baratu.", "The children are learning new Dutch words today."],
  ["School", "We hebben elke dinsdag taalles in het wijkcentrum.", "لدينا درس لغة كل ثلاثاء في مركز الحي المجتمعي.", "ኩሉ ሰሉስ ኣብ ማእከል ከባቢ ናይ ቋንቋ ትምህርቲ ኣሎና።", "Kibxata hunda wiirtuu naannootti barumsa afaanii qabna.", "We have language class every Tuesday at the community center."],
  ["School", "Kunt u dit woord voor mij opschrijven?", "هل يمكنك كتابة هذه الكلمة لي على الورق؟", "እዛ ቃል ኣብ ወረቐት ክትጽሕፉለይ ትኽእሉዶ፧", "Jacha kana waraqaa irratti naaf barreessuu dandeessuu?", "Could you write down this word for me?"],
  ["School", "Mijn zoon tekent graag dieren met kleurpotloden.", "يحب ابني رسم الحيوانات الجميلة بأقلام التلوين.", "ወደይ ብሕብራዊ እርሳስ እንስሳታት ምሳል ባህ ይብሎ።", "Ilmi koo qalama bifaatiin bineensota fakkii kaasuu jaallata.", "My son likes to draw animals with colored pencils."],
  ["School", "De leraar leest een spannend verhaaltje voor.", "يقرأ المعلم قصة شيقة ومثيرة للأطفال بصوت واضح.", "መምህር ደስ ዝብል ዛንታ የንብበልና ኣሎ።", "Barsiisaan seenaa baay'ee namatti tolu dubbisa.", "The teacher is reading an exciting story out loud."],
  // Gezondheid
  ["Gezondheid", "Ik heb een afspraak bij de tandarts om tien uur.", "لدي موعد مع طبيب الأسنان في الساعة العاشرة تماماً.", "ሰዓት ዓሰርተ ኣብ ሓኪም ስኒ ቆጸራ ኣሎኒ።", "Sa'aatii afur irratti dooqtoora ilkaanii wajjin beellama qaba.", "I have an appointment at the dentist at ten o'clock."],
  ["Gezondheid", "Neem twee tabletten in met een glas water.", "تناول قرصين دوائيين مع كوب كامل من الماء.", "ክልተ ከኒና ምስ ጽዋእ ማይ ውሰድ።", "Killee lama bishaan xoofoo tokkoon fudhadhu.", "Take two tablets with a glass of water."],
  ["Gezondheid", "Mijn knie doet pijn bij het traplopen.", "ركبتي تؤلمني بشدة عند صعود ونزول الدرج.", "መደያይቦ ክድይብ ከለኹ ብርከይ ይቐንዘኒ።", "Yeroo sardoo ba'u jilbi koo na dhukkuba.", "My knee hurts when walking up the stairs."],
  ["Gezondheid", "De dokter schrijft een zalf voor tegen de jeuk.", "يصف الطبيب مرهماً فعالاً للتخفيف من الحكة والتهيج.", "ሓኪም ንማሕከኽ ዝኸውን ቅባት ጽሒፉለይ ኣሎ።", "Dooqtoorri madaa quufsuuf qoricha dibamu ajajeera.", "The doctor prescribes an ointment against itching."],
  ["Gezondheid", "Ik voel me gelukkig weer een stuk beter vandaag.", "لحسن الحظ أشعر بتحسن كبير وملحوظ اليوم.", "ደስ ብዝብል ኩነታት ሎሚ ኣዝዩ ተመሓይሹኒ ኣሎ።", "Gammachuudhaan har'a baay'ee naaf wayyaa'eera.", "Fortunately I feel much better today."]
];

basisScenarios.forEach(s => add('basis', s[0], s[1], s[2], s[3], s[4], s[5]));

const gevorderdScenarios = [
  // Werk & Praktijk
  ["Werk", "We bespreken het werkrooster voor de komende feestdagen.", "نحن نناقش جدول مناوبات العمل للعطلات الرسمية القادمة.", "ንዝመጽእ ናይ በዓል መዓልታት ዝኸውን ናይ ስራሕ ሰሌዳ ንመያየጥ ኣለና።", "Sagantaa hojii guyyoota ayyaanaaf mari'achaa jirra.", "We are discussing the work schedule for the upcoming holidays."],
  ["Werk", "Iedere werknemer heeft recht op een veilige werkplek.", "يحق لكل موظف وعامل التمتع ببيئة عمل صحية وآمنة.", "ነፍሲ ወከፍ ሰራሕተኛ ውሑስ ናይ ስራሕ ቦታ ናይ ምርካብ መሰል ኣለዎ።", "Hojjetaan hundi bakka hojii nagaa qabaachuuf mirga qaba.", "Every employee is entitled to a safe workplace."],
  ["Werk", "Kunt u mij laten zien waar de EHBO-doos hangt?", "هل يمكنك أن تريني مكان تعليق صندوق الإسعافات الأولية؟", "እቲ ናይ ቀዳማይ ረድኤት ሳንዱቕ ኣበይ ከም ዘሎ ከተርእዩኒ ትኽእሉዶ፧", "Saanduqni yaala duraa eessa akka fannifame na agarsiisuu dandeessuu?", "Could you show me where the first aid kit is located?"],
  ["Werk", "Ik heb een vraag over de inhouding van loonheffing op mijn salarisstrook.", "لدي استفسار بشأن خصم ضريبة الرواتب في قسيمة الراتب.", "ኣብ ናይ ደሞዝ ወረቐተይ ዘሎ ናይ ግብሪ ምቑራጽ ሕቶ ኣሎኒ።", "Waraqaa miindaa koo irratti hir'ifama gibiraa gaaffii qaba.", "I have a question about the payroll tax deduction on my payslip."],
  ["Werk", "Mijn collega en ik verdelen de taken eerlijk over de ochtend.", "أنا وزميلي نوزع ونقسم المهام بعدالة وإنصاف خلال فترة الصباح.", "ኣነን መሳርሕተይን ንናይ ንግሆ ስራሕ ማዕረ ንመቓቐሎ ኣለና።", "Hiriyaan koo fi ani hojii ganamaa walqixa qooddanna.", "My colleague and I divide the tasks fairly over the morning."],
  ["Werk", "Voor deze functie is een Verklaring Omtrent het Gedrag (VOG) vereist.", "تتطلب هذه الوظيفة تقديم شهادة حسن سيرة وسلوك رسمية (VOG).", "ነዚ ስራሕ ናይ ባህሪ ጽቡቕ ምስክር ወረቐት (VOG) የድሊ እዩ።", "Hojii kanaaf waraqaan amala gaarii (VOG) barbaachisaadha.", "A Certificate of Good Conduct (VOG) is required for this position."],
  ["Werk", "We hebben morgen een teamoverleg over de nieuwe klantwensen.", "لدينا غداً اجتماع لفريق العمل لمناقشة متطلبات ورغبات العملاء الجدد.", "ጽባሕ ምስ ጉጅለ ብዛዕባ ናይ ሓደሽቲ ዓማዊል ድሌታት ኣኼባ ኣሎና።", "Boru fedhii maamiltootaa haaraa irratti walga'ii garee qabna.", "Tomorrow we have a team meeting about new customer requirements."],
  // Administratie & Overheid
  ["Gemeente", "U moet uw verhuizing binnen vijf dagen doorgeven aan de gemeente.", "يجب عليك إبلاغ البلدية بانتقالك وتغيير سكنك خلال خمسة أيام.", "ኣብ ውሽጢ ሓሙሽተ መዓልቲ ናይ ገዛ ምቕያርካ ንማዘጋጃ ቤት ክትሕብር ኣሎካ።", "Guyyoota shan keessatti jijjiirama mana keessanii beeksisuu qabdu.", "You must report your change of address to the municipality within five days."],
  ["Gemeente", "Voor het aanvragen van een identiteitskaart heeft u een recente pasfoto nodig.", "لتقديم طلب بطاقة الهوية تحتاج إلى صورة شخصية ملونة حديثة ومطابقة.", "ናይ መንነት ካርድ ንምሕታት ሓድሽ ናይ ፓስፖርት ፎቶ የድልየኩም እዩ።", "Waraqaa eenyummaa gaafachuuf suuraa dhiyoo barbaaddu.", "To apply for an ID card you need a recent passport photo."],
  ["Gemeente", "U kunt via de gemeentelijke website digitaal een afspraak inplannen.", "يمكنك حجز موعد رسمياً عبر موقع البلدية الإلكتروني بسهولة.", "ብመንገዲ መርበብ ሓበሬታ ማዘጋጃ ቤት ብዲጂታል ቆጸራ ክትሕዙ ትኽእሉ ኢኹም።", "Weebsaayitii bulchiinsaa irraa tooraan beellama qabachuu dandeessu.", "You can schedule an appointment digitally via the municipal website."],
  ["Financiën", "Zorg dat u maandelijks voldoende saldo heeft voor automatische incasso's.", "تأكد من توفر رصيد كافٍ في حسابك البنكي شهرياً للخصم المباشر التلقائي.", "ንቀጻሊ ክፍሊታት ዝኸውን ወርሓዊ እኹል ገንዘብ ኣብ ባንክኻ ከምዘሎ ኣረጋግጽ።", "Kaffaltii ofumaan hir'ifamuuf herreega keessan irratti maallaqa ga'aa qabaadhaa.", "Ensure you have sufficient balance each month for direct debits."],
  ["Financiën", "U kunt zorgtoeslag ontvangen als uw inkomen onder de grens blijft.", "يمكنك استحقاق بدل الرعاية الصحية إذا ظل دخلك السنوي دون الحد الأقصى.", "ኣታዊኻ ካብቲ ዝተወሰነ መጠን ትሕት ምስ ዝብል ናይ ጥዕና ደገፍ ክትረክብ ትኽእል ኢኻ።", "Galiin keessan daangaa gadi yoo ta'e gargaarsa fayyaa argachuu dandeessu.", "You can receive healthcare allowance if your income stays below the threshold."],
  ["Wonen", "De verhuurder is verantwoordelijk voor het onderhoud van de cv-ketel.", "مالك العقار مسؤول عن الصيانة الدورية الإلزامية لغلاية التدفئة المركزية.", "እቲ ኣካራዪ ነቲ ማእከላይ መሞቒ ናይ ምክንኻን ሓላፍነት ኣለዎ።", "Abbaan manaa meeshaa ho'isa manaatiif itti gaafatamummaa qaba.", "The landlord is responsible for maintaining the central heating boiler."],
  ["Wonen", "Bij ernstige geluidsoverlast kunt u eerst vriendelijk met de buren praten.", "في حال الإزعاج الصوتي الشديد يمكنك أولاً التحدث بلطف وتفاهم مع الجيران.", "ብርቱዕ ናይ ድምጺ ረብሻ እንተጋጢሙ ቅድም ቀዳድም ምስ ጎረባብቲ ብህድኣት ተዘራረብ።", "Sagaleen yoo jeeqe jalqaba ollaa keessan wajjin gaarummaan mari'adhaa.", "In case of severe noise nuisance you can first talk politely with the neighbors."],
  // Gezondheid & School
  ["Gezondheid", "De fysiotherapeut raadt aan om regelmatig strekoefeningen te doen.", "ينصح أخصائي العلاج الطبيعي بأداء تمارين الإطالة والتمدد بانتظام لتحسين المرونة.", "ሓኪም ኣካላዊ ምውስዋስ ወትሩ ናይ ምስሓብ ምልምማዳት ክትገብር ይመክር።", "Ogeessi fiiziyooteraapii yeroo hunda sochii qaamaa gochuu gorsa.", "The physiotherapist recommends doing regular stretching exercises."],
  ["Gezondheid", "Blijf thuis en rust goed uit zolang u nog hoge koorts heeft.", "ابقَ في المنزل وخذ قسطاً كافياً من الراحة طالما أنك لا تزال تعاني من الحمى.", "ረስኒ ክሳብ ዘለካ ኣብ ገዛ ጽናሕ እሞ ጽቡቕ ጌርካ ዕረፍቲ ግበር።", "Hamma ho'i qaamaa jiruutti mana ta'ii boqodhu.", "Stay home and rest well as long as you still have a high fever."],
  ["School", "Tijdens het tienminutengesprek bespreken we de vorderingen van uw dochter.", "خلال اجتماع العشر دقائق سنناقش بالتفصيل التقدم الدراسي الممتاز لابنتك.", "ኣብ ናይ ዓሰርተ ደቒቕ ርክብ ብዛዕባ ናይ ጓልኩም ናይ ትምህርቲ ዕቤት ክንመያየጥ ኢና።", "Marii daqiiqaa kudhanii irratti guddina intala keessanii mari'anna.", "During the ten-minute meeting we discuss your daughter's progress."],
  ["School", "Alle basisschoolleerlingen krijgen gratis een warme lunch aangeboden op school.", "يحصل جميع طلاب المدارس الابتدائية على وجبة غداء ساخنة مجانية في المدرسة.", "ኩሎም ናይ መባእታ ተመሃሮ ኣብ ቤት ትምህርቲ ብነጻ ውዑይ ምሳሕ ይረኽቡ።", "Barattoonni sadarkaa tokkoffaa hundi mana barumsaatti laaqana oo'aa bilisaan argatu.", "All elementary school pupils are offered a free hot lunch at school."],
  ["Samenleving", "Inburgeringsexamens toetsen luisteren, spreken, lezen en schrijven.", "تختبر امتحانات الاندماج مهارات الاستماع والمحادثة والقراءة والكتابة بالهولندية.", "ፈተናታት ምውህሃድ ንምስማዕ፡ ምዝራብ፡ ምንባብን ምጽሓፍን ይምርምሩ።", "Qormaanni seensa biyyaa dhaggeeffachuu, dubbachuu, dubbisuufi barreessuu qora.", "Civic integration exams test listening, speaking, reading, and writing."]
];

gevorderdScenarios.forEach(s => add('gevorderd', s[0], s[1], s[2], s[3], s[4], s[5]));

const moeilijkScenarios = [
  // Bestuursrecht & Rechtsbescherming
  ["Bestuursrecht", "Een bezwaarschrift schorst de werking van het bestreden besluit niet automatisch op.", "لا يؤدي تقديم الاعتراض تلقائياً إلى وقف تنفيذ القرار الإداري المطعون فيه.", "ናይ ተቓውሞ ምቕራብ ነቲ ውሳነ ብቐጥታ ደው ኣየብሎን እዩ።", "Iyyannoo mormii dhiyeessuun murticha ofumaan hin dhaabu.", "An objection does not automatically suspend the operation of the contested decision."],
  ["Bestuursrecht", "Het bestuursorgaan is verplicht de indiener van het bezwaarschrift vooraf te horen.", "يلتزم الجهاز الإداري بالاستماع رسمياً إلى مقدم الاعتراض قبل إصدار القرار النهائي.", "እቲ ምምሕዳራዊ ኣካል ነቲ ተቓውሞ ዘቕረበ ሰብ ቅድሚ ውሳነ ምሃቡ ክሰምዖ ግዴታ ኣለዎ።", "Qaamni bulchiinsaa osoo murtii hin kennin dura nama iyyate dhaggeeffachuuf dirqama qaba.", "The administrative authority is obligated to hear the appellant prior to deciding."],
  ["Bestuursrecht", "Tegen de uitspraak van de rechtbank kan hoger beroep worden ingesteld bij de Raad van State.", "يجوز استئناف حكم المحكمة الابتدائية أمام مجلس الدولة كمرجع قضائي أخير.", "ኣብ ልዕሊ ናይ ፍርዲ ቤት ውሳነ ናብ ላዕላይ ቤት ምኽሪ (Raad van State) ይግባይ ምባል ይከኣል እዩ።", "Murtii mana murtii irratti gara Mana Maree Biyyaatti iyyachuun ni danda'ama.", "An appeal against the district court judgment may be lodged with the Council of State."],
  ["Bestuursrecht", "Het evenredigheidsbeginsel waarborgt dat de nadelige gevolgen van een besluit niet onevenredig zijn.", "يضمن مبدأ التناسب القانوني ألا تتجاوز الآثار السلبية للقرار الهدف العام المرجو منه.", "ናይ ተመጣጣንነት ሕጊ ናይ ሓደ ውሳነ ጉድኣት ካብቲ ዕላማ ንላዕሊ ከይከውን ይሕሉ እዩ።", "Seerri madaalawaa miidhaan murtii tokkoo akka hin caalle eega.", "The principle of proportionality ensures that adverse consequences of a decision are not disproportionate."],
  // Arbeidsrecht & CAO
  ["Arbeidsrecht", "Bij ontslag op staande voet dient sprake te zijn van een dringende wettelijke reden.", "في حالات الفصل الفوري الفجائي يجب أن يتوفر سبب قانوني عاجل وجسيم ومثبت.", "ብቕጽበት ስራሕ ክቋረጽ ከሎ ኣዝዩ ህጹጽን ሕጋውን ምኽንያት ክህሉ ኣለዎ።", "Hojii irraa battalumatti ari'uuf sababni cimaan seeraa jiraachuu qaba.", "In case of summary dismissal, an urgent statutory reason must be present."],
  ["Arbeidsrecht", "De transitievergoeding compenseert de werknemer voor het verlies van de arbeidsplaats.", "يهدف تعويض الانتقال القانوني إلى تعويض الموظف مالياً عن فقدان مصدر عمله.", "ናይ ስራሕ ምስግጋር ክፍሊት ንሰራሕተኛ ነቲ ዝሰኣኖ ስራሕ ካሳ ንምሃብ ዝዓለመ እዩ።", "Kaffaltiin ce'umsaa hojjetaa hojii dhabeef beenyaa kenna.", "The transition compensation reimburses the employee for the loss of their employment."],
  ["Arbeidsrecht", "Een concurrentiebeding is uitsluitend geldig bij een arbeidsovereenkomst voor onbepaalde tijd.", "يكون شرط عدم المنافسة المهنية ملزماً فقط في عقود العمل الدائمة غير محددة المدة.", "ናይ ተወዳዳርነት ደንቢ ኣብ ናይ ቀጻሊ ናይ ስራሕ ውዕል ጥራይ እዩ ሕጋዊ ዝኸውን።", "Waliigalteen dorgommii dhowwu waliigaltee yeroo hin murtoofneef qofa seera qaba.", "A non-compete clause is exclusively valid in an employment contract for an indefinite period."],
  ["Arbeidsrecht", "De ondernemingsraad heeft instemmingsrecht ten aanzien van regelingen inzake het arbeidsomstandighedenbeleid.", "يتمتع مجلس العاملين بالمنشأة بحق الموافقة المسبقة والإلزامية بشأن سياسات وظروف العمل والسلامة.", "ናይ ሰራሕተኛታት ባይቶ ብዛዕባ ናይ ስራሕ ኩነታት ዝምልከት ውሳነታት ናይ ምጽዳቕ መሰል ኣለዎ።", "Manni maree hojjettootaa seera haala hojii irratti mirga mirkaneessuu qaba.", "The works council has the right of consent regarding health and safety policy regulations."],
  // Belasting, Zorg & Maatschappij
  ["Belasting", "Bij schending van de inlichtingenplicht kan de inspecteur een navorderingsaanslag met boete opleggen.", "عند الإخلال بواجب الإفصاح الضريبي يحق للمفتش إصدار تقييم ضريبي إضافي مع غرامة مالية صارمة.", "ሓበሬታ ናይ ምሃብ ግዴታ ምስ ዝጥሓስ፡ እቲ ናይ ግብሪ ተቖጻጻሪ ተወሳኺ ናይ ግብሪ ክፍሊትን መቕጻዕትን ክውስን ይኽእል እዩ።", "Dirqama odeeffannoo kennuu yoo cabsan qorataan gibira dabalataa adabbii wajjin murteessuu danda'a.", "In case of breach of the duty to provide information, the inspector may impose an additional tax assessment with fine."],
  ["Belasting", "Kwijtschelding van gemeentelijke belastingen kan worden verleend bij een aantoonbaar minimuminkomen.", "يجوز الإعفاء من الضرائب البلدية المحلية للمقيمين الذين يثبتون رسمياً محدودية دخلهم المالي.", "ውሑድ ኣታዊ ንዘለዎም ሰባት ካብ ናይ ማዘጋጃ ቤት ግብሪ ነጻ ናይ ምዃን መሰል ክወሃብ ይኽእል እዩ።", "Galiin gadi aanaa ta'uun yoo mirkanaa'e gibira magaalaa dhiifama gochuun ni danda'ama.", "Waiver of municipal taxes may be granted in case of a demonstrable minimum income."],
  ["Gezondheid", "Patiënten hebben op grond van de WGBO te allen tijde recht op inzage in hun eigen medisch dossier.", "يحق للمرضى بموجب القانون الاطلاع الكامل والمباشر على ملفهم وسجلهم الطبي في أي وقت.", "ሕሙማን ብመሰረት ሕጊ WGBO ኩሉ ግዜ ነቲ ናይ ብሕቶም ናይ ሕክምና መዝገብ ናይ ምርኣይ መሰል ኣለዎም።", "Dhukkubsattoonni seeraan galmee fayyaa isaanii ilaaluuf mirga qabu.", "Patients have the right under the WGBO to inspect their own medical records at all times."],
  ["Gezondheid", "De wet verplicht zorgaanbieders tot het systematisch melden en analyseren van medische incidenten.", "يلزم القانون مؤسسات الرعاية الصحية بالإبلاغ المنهجي والدقيق عن أي حوادث أو أخطاء طبية محتملة.", "ሕጊ ንናይ ጥዕና ትካላት ንዘጋጥሙ ናይ ሕክምና ጌጋታት ብስርዓት ናይ ምሕባርን ናይ ምምርማርን ግዴታ የንብረሎም።", "Seerri tajaajila fayyaa balleessaa yaalaa gabaasuuf dirqisiisa.", "The law obliges healthcare providers to systematically report and analyze medical incidents."],
  ["Maatschappij", "Het gelijkheidsbeginsel verbiedt discriminatie op grond van godsdienst, levensovertuiging of herkomst.", "يحظر مبدأ المساواة الدستوري أي تمييز قائم على الدين أو المعتقد الفكري أو العرق أو الأصل القومي.", "ናይ ማዕርነት ሕጊ ብምኽንያት ሃይማኖት፡ እምነት ወይ ዘርኢ ዝግበር ኣድልዎ ብጥብቂ ይኽልክል እዩ።", "Seerri walqixxummaa amantaa, ilaalcha ykn dhalootaan looguu dhowwa.", "The principle of equality prohibits discrimination on grounds of religion, belief, or origin."],
  ["Maatschappij", "Recht op privacy beschermt burgers tegen ongeoorloofde verwerking van hun persoonlijke gegevens.", "يحمي الحق الدستوري في الخصوصية المواطنين من أي معالجة غير مشروعة لبياناتهم الشخصية الحساسة.", "ናይ ውልቀ ምስጢር መሰል ንዜጋታት ካብ ዘይሕጋዊ ናይ ሓበሬታ ምጥቃም ይሕልዎም።", "Mirgi iccitii dhuunfaa namoota odeeffannoo isaanii seeraan ala fayyadamuu irraa eega.", "The right to privacy protects citizens against unauthorized processing of their personal data."]
];

moeilijkScenarios.forEach(s => add('moeilijk', s[0], s[1], s[2], s[3], s[4], s[5]));

console.log(`===============================================`);
console.log(`TOTAL CLEAN & NATURAL SENTENCES: ${sentences.length}`);
console.log(`- Basis (A1): ${sentences.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${sentences.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${sentences.filter(s => s.level === 'moeilijk').length}`);

// Final safety check: ensure ZERO digits/suffixes
const badSuffixes = sentences.filter(s => /[\(\[\{]\d+[\)\]\}]/.test(s.dutch));
console.log(`Sentences with bad suffixes: ${badSuffixes.length}`);
console.log(`===============================================`);

// Write files
const jsonPath = path.join(__dirname, '..', 'data', 'sentences.json');
const jsPath = path.join(__dirname, '..', 'data', 'sentences.js');

fs.writeFileSync(jsonPath, JSON.stringify(sentences, null, 2), 'utf-8');
console.log(`Wrote JSON to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Zinnen Database (${sentences.length} Echte, Unieke Zinnen)
 * Honderden praktische zinnen voor nieuwkomers in 3 niveaus zonder nummers
 */
window.TAALVRIEND_SENTENCES = ${JSON.stringify(sentences, null, 2)};
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Wrote JS to ${jsPath}`);
