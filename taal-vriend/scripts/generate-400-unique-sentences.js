const fs = require('fs');
const path = require('path');

const curList = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/sentences.json'), 'utf8'));
const existingDutch = new Set(curList.map(s => s.dutch.toLowerCase().trim()));

function addExtra(level, topic, dutch, ar, ti, om, en) {
  if (!existingDutch.has(dutch.toLowerCase().trim())) {
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
    existingDutch.add(dutch.toLowerCase().trim());
  }
}

// Basis (A1) Extra
const basisList = [
  ["Eten", "Ik smeer roomboter en aardbeienjam op mijn beschuit.", "أدهن الزبدة ومربى الفراولة على البسكويت الهش.", "ኣብቲ ቅጫይ ጠስምን ናይ ፍረታት ማርመላታን እለኽዮ።", "Dhadhaafi marmalaata dhoobee nyaadha.", "I spread butter and strawberry jam on my rusk."],
  ["Eten", "We drinken samen een warme chocolademelk.", "نشرب معاً كوباً من الحليب الساخن بالشوكولاتة.", "ሓቢርና ውዑይ ናይ ቾኮላት ጸባ ንሰቲ ኣለና።", "Waliin aannan chookoleetii oo'aa dhugna.", "We drink a hot chocolate milk together."],
  ["Eten", "In de soep zitten wortels, prei en gehaktballetjes.", "يحتوي الحساء على الجزر والكراث وكرات اللحم اللذيذة.", "እቲ መረቕ ካሮት፡ ካሮትን ናይ ስጋ ኲዕሶታትን ኣለዎ።", "Shorbaa keessa kaarotii fi foon marameetu jira.", "In the soup are carrots, leeks, and meatballs."],
  ["Eten", "Mijn dochter lust geen gekookte bloemkool.", "ابنتي لا تحب أكل القرنبيط المسلوق.", "ጓለይ ዝተፈልሐ ቆስጣ ኣይትፈቱን እያ።", "Intalli koo raafuu bilchaate hin jaallattu.", "My daughter does not like boiled cauliflower."],
  ["Eten", "Het fruit ligt in een grote schaal op het aanrecht.", "الفواكه موضوعة في وعاء كبير على طاولة المطبخ.", "እቲ ፍረታት ኣብ ክሽነ ኣብ ዓቢ ሳህን ተቐሚጡ ኣሎ።", "Muduraan saanii guddaa irra kushinaa keessa jira.", "The fruit is in a large bowl on the kitchen counter."],
  ["Winkelen", "Deze trui kost slechts vijftien euro in de uitverkoop.", "هذه السترة تكلف خمسة عشر يورو فقط في التخفيضات.", "እዚ ሹራብ ኣብ ቅናሽ ዓሰርተ ሓሙሽተ ዩሮ ጥራይ እዩ።", "Kootiin kun gabaa hir'ifamaa keessatti yuuroo kudha shan qofa.", "This sweater costs only fifteen euros on sale."],
  ["Winkelen", "Ik zoek een zachte handdoek voor in de badkamer.", "أنا أبحث عن منشفة قطنية ناعمة للحمام.", "ንመተሓጸቢ ሽቓቕ ዝኸውን ልስሉስ ፍታ እደሊ ኣለኹ።", "Mantaa lallaafaa kutaa dhiqannaaf barbaada.", "I am looking for a soft towel for the bathroom."],
  ["Winkelen", "Kunt u mij vertellen waar de paskamer is?", "هل يمكنك إخباري بمكان غرفة قياس الملابس؟", "ክዳን መዕቀኒ ክፍሊ ኣበይ ከም ዘሎ ክትነግሩኒ ትኽእሉዶ፧", "Kutaan uffata itti safaran eessa akka jiru natti himtuu?", "Could you tell me where the fitting room is?"],
  ["Winkelen", "We kopen een nieuwe lamp voor de kinderkamer.", "نحن نشتري مصباحاً جديداً لغرفة الأطفال الجميلة.", "ንክፍሊ ቆልዑ ሓድሽ መብራህቲ ንገዝእ ኣለና።", "Kutaa ijoolleetiif ibsaa haaraa binna.", "We are buying a new lamp for the children's room."],
  ["Winkelen", "Ik heb een cadeautje gekocht voor mijn buurvrouw.", "اشتريت هدية لطيفة لجارتي بمناسبة عيدها.", "ንጎረቤተይ ንእሽቶ ህያብ ገዚአላ ኣለኹ።", "Ollaa kootiif kennaa xiqqoo biteera.", "I bought a little gift for my neighbor."],
  ["Huis & Tuin", "De bloemen in onze tuin beginnen mooi te bloeien.", "بدأت الزهور في حديقتنا تتفتح بشكل رائع وجميل.", "ኣብ ጀርዲንና ዘለዉ ዕንባባታት ጽቡቕ ገይሮም ይዕምብቡ ኣለዉ።", "Abaaboon naannoo mana keenyaa baay'ee miidhagee ba'a.", "The flowers in our garden are beginning to bloom nicely."],
  ["Huis & Tuin", "Ik veeg het terras met een bezem schoon.", "أنا أكنس الشرفة الخارجية بالمكنسة وأنظفها جيداً.", "ነቲ ደገ ብመኮስተር ገይረ የጽርዮ ኣለኹ።", "Harataadhaan qulqulleessaa jira.", "I am sweeping the terrace clean with a broom."],
  ["Huis & Tuin", "We planten tomaten en kruiden in houten bakken.", "نزرع الطماطم والأعشاب العطرية في صناديق خشبية.", "ኣብ ናይ ዕጨይቲ ሳጹናት ኮሚደረን ቀመማትን ንተክል ኣለና።", "Saanduqa mukaatti timaatimaafi qoricha nyaataa dhaabna.", "We plant tomatoes and herbs in wooden planter boxes."],
  ["Huis & Tuin", "Vergeet niet de planten water te geven als het warm is.", "لا تنس سقي النباتات بالماء عندما يكون الجو دافئاً.", "ሙቐት ክኸውን ከሎ ነቶም ኣትክልቲ ማይ ምስታይ ኣይትረስዕ።", "Yeroo hoo'u biqiltootaaf bishaan kennuu hin dagatin.", "Do not forget to water the plants when it is warm."],
  ["Vervoer", "De stoptrein stopt op elk klein tussengelegen station.", "يتوقف القطار المحلي البطيء في كل محطة صغيرة على طول المسار.", "እቲ ባቡር ኣብ ነፍሲ ወከፍ ንእሽቶ መደበር ደው ይብል እዩ።", "Baaburri buufataalee xixiqqoo hunda irratti dhaabbata.", "The local train stops at every small intermediate station."],
  ["Vervoer", "Kijk goed uit naar het fietspad bij het oversteken van de weg.", "انتبه جيداً لمسار الدراجات عند عبور الطريق الرئيسي.", "መንገዲ ክትሰግር ከለኻ ንናይ ብሽክለታ መገዲ ብጥንቃቐ ተዓዘብ።", "Karaa yeroo ceetu daandii biskileetiitiif of eeggadhu.", "Watch out for the bicycle path when crossing the road."],
  ["Vervoer", "Mijn zoon heeft zijn fietshelm op zijn hoofd gezet.", "وضع ابني خوذة الدراجة الواقية على رأسه بأمان.", "ወደይ ናይ ድሕንነት ቆቢዕ ብሽክለታ ኣብ ርእሱ ገይሩ ኣሎ።", "Ilmi koo koofiyyaa nageenya biskileetii mataa irra kaawwate.", "My son put his bicycle helmet on his head."],
  ["Vervoer", "De pont vaart elke tien minuten naar de overkant.", "تتحرك العبارة كل عشر دقائق لنقل الركاب إلى الضفة المقابلة.", "እታ ጃልባ ኣብ ነፍሲ ወከፍ ዓሰርተ ደቒቕ ሰባት ተመላልስ።", "Bidiruun daqiiqaa kudhan hunda keessatti ceesisa.", "The ferry sails to the other side every ten minutes."],
  ["Gezondheid", "Poets je tanden 's ochtends en 's avonds voor het slapen.", "نظف أسنانك بالفرشاة والمعجون في الصباح وقبل النوم.", "ስንኻ ንግሆን ምሸት ቅድሚ ምድቃስካን ብብሩሽ ተሓጸቦ።", "Ganamaafi galgala osoo hin rafin dura ilkaan kee qulqulleessi.", "Brush your teeth in the morning and evening before sleeping."],
  ["Gezondheid", "Ik voel me gelukkig weer fit na een week rust.", "لحسن الحظ أشعر بالنشاط والصحة مجدداً بعد أسبوع من الراحة.", "ድሕሪ ናይ ሓደ ሰሙን ዕረፍቲ ሕጂ ድሓን ኮይኑ ይስምዓኒ ኣሎ።", "Boqonnaa torban tokkoo booda fayyaan koo naaf deebi'eera.", "Fortunately I feel fit again after a week of rest."],
  ["Gezondheid", "Drink een kop warme kamillethee met honing voor je keel.", "اشرب كوباً دافئاً من شاي البابونج مع العسل لتهدئة حلقك.", "ንጎረረኻ ዝኸውን ውዑይ ናይ ካሞሚል ሻሂ ምስ መዓር ስተ።", "Qoonqoo keetiif shayii oo'aa damma wajjin dhugi.", "Drink a cup of warm chamomile tea with honey for your throat."],
  ["School", "Mijn dochter leent elke twee weken prentenboeken uit de bibliotheek.", "تستعير ابنتي كتب الصور الممتعة من المكتبة كل أسبوعين.", "ጓለይ ኣብ ክልተ ሰሙን ካብ ቤተ-መጻሕፍቲ ናይ ስእሊ መጻሕፍቲ ትልቃሕ።", "Intalli koo torban lama hunda mana kitaabaa irraa kitaaba liqeeffatti.", "My daughter borrows picture books from the library every two weeks."],
  ["School", "De gymles vindt plaats in de grote sportzaal naast de school.", "يقام درس الرياضة في الصالة الرياضية الكبيرة بجوار المدرسة.", "ናይ ስፖርት ትምህርቲ ኣብ ጥቓ ቤት ትምህርቲ ኣብ ዘሎ ዓቢ ኣዳራሽ ይካየድ።", "Barnoonni ispoortii galma guddaa mana barumsaa cinaatti ta'a.", "Physical education takes place in the large sports hall next to the school."]
];
basisList.forEach(item => addExtra('basis', item[0], item[1], item[2], item[3], item[4], item[5]));

// Gevorderd (A2-B1) Extra
const gevorderdList = [
  ["Werk", "In het magazijn sorteren we de binnengekomen goederen op postcode.", "نقوم في المستودع بفرز البضائع الواردة حسب الرمز البريدي للعملاء.", "ኣብ መኽዘን ነቶም ዝመጹ ኣቑሑት ብናይ ፖስታ ኮድ ንመቓቕሎም ኣለና።", "Kuusaa keessatti meeshaalee dhufan koodii poostaatiin qoodna.", "In the warehouse we sort incoming goods by postal code."],
  ["Werk", "De veiligheidshelm en veiligheidsbril zijn verplicht op de bouwplaats.", "ارتداء خوذة ونظارات الأمان إلزامي تماماً في موقع البناء والتشييد.", "ኣብ ናይ ህንጻ ስራሕ ቦታ ናይ ድሕንነት ቆቢዕን መነጸርን ምግባር ግዴታ እዩ።", "Bakka ijaarsaa irratti koofiyyaa fi daawwitii nageenyaa uffachuun dirqama.", "Hard hats and safety goggles are mandatory on the construction site."],
  ["Werk", "Tijdens de lunchpauze eten we samen met de collega's in de kantine.", "نتناول طعام الغداء مع الزملاء في كافتيريا الشركة أثناء الاستراحة.", "ኣብ ናይ ምሳሕ ዕረፍቲ ምስ መሳርሕትና ኣብ ካንቲን ንበልዕ።", "Yeroo boqonnaa kaafteeriyaa keessatti hiriyaa hojii wajjin nyaanna.", "During lunch break we eat together with colleagues in the cafeteria."],
  ["Werk", "Ik heb een certificaat behaald voor het veilig bedienen van de reachtruck.", "حصلت على شهادة معتمدة لتشغيل رافعة الشاحنات بأمان واحترافية.", "ናይ ረችትራክ ማሽን ብደሓን ንምዝዋር ምስክር ወረቐት ረኺበ ኣለኹ።", "Konkolaataa fe'umsaa oofuuf waraqaa ragaa fudhadheera.", "I obtained a certificate for safely operating the reach truck."],
  ["Financiën", "U kunt via internetbankieren eenvoudig geld overmaken naar een ander rekeningnummer.", "يمكنك تحويل الأموال بسهولة إلى حساب بنكي آخر عبر تطبيق الإنترنت.", "ብመንገዲ ናይ ኢንተርኔት ባንክ ናብ ካልእ ሕሳብ ቁጽሪ ብቐሊሉ ገንዘብ ከተመሓላልፍ ትኽእል ኢኻ።", "Interneetii baankiitiin salphaatti maallaqa dabarsuu dandeessu.", "You can easily transfer money to another account number via online banking."],
  ["Financiën", "De gemeente biedt bijzondere bijstand voor onverwachte noodzakelijke kosten.", "تقدم البلدية مساعدة اجتماعية خاصة لتغطية النفقات الضرورية غير المتوقعة.", "ማዘጋጃ ቤት ንዘይተጸበኻዮም ኣገደስቲ ወጻኢታት ፍሉይ ገንዘባዊ ደገፍ ይህብ እዩ።", "Bulchiinsi magaalaa baasii tasaatiif gargaarsa addaa kenna.", "The municipality provides special assistance for unexpected essential costs."],
  ["Wonen", "De woningbouwvereniging voert periodiek inspecties uit aan rookgasafvoeren.", "تجري مؤسسة الإسكان تفتيشاً وفحصاً دورياً لمداخن العادم وسلامة الغاز.", "ማሕበር ኣባይቲ ንናይ ትኪ መውጺኢ ሻምቧታት ብቐጻሊ ትምርምሮ እያ።", "Waldaan manneenii ujummoo aaraa yeroo yeroon sakatta'a.", "The housing association periodically carries out inspections on flue gas drains."],
  ["Wonen", "Zorg dat de galerij en de vluchtwegen altijd vrij blijven van obstakels.", "احرص على خلو ممرات الهروب والمداخل دائماً من أي عوائق أو أغراض شخصية.", "እቲ መተሓላለፍን ናይ ህጹጽ መውጺኢ መገድታትን ወትሩ ካብ ዕንቅፋት ነጻ ክኸውን ኣለዎ።", "Karaaleen ba'umsaa yeroo hunda qulqulluu ta'uu qabu.", "Make sure the corridor and escape routes always remain free of obstacles."],
  ["Gemeente", "U moet bij verhuizing binnen dezelfde gemeente uw adreswijziging digitaal doorgeven.", "يجب عليك إبلاغ البلدية رقمياً بتغيير عنوانك حتى لو كان في نفس المدينة.", "ኣብ ውሽጢ ሓንቲ ማዘጋጃ ቤት ክትቀያየር ከለኻ ነቲ ናይ ኣድራሻ ለውጢ ብዲጂታል ኣፍልጥ።", "Magaalaa tokko keessatti yoo jijjiirtanis teessoo haaraa tooraan beeksisaa.", "When moving within the same municipality, you must report your address change digitally."],
  ["Zorg", "De huisartsenpost is uitsluitend bedoeld voor spoedeisende klachten in de avond en het weekend.", "عيادة الطوارئ المسائية مخصصة فقط للحالات الصحية الحرجة والطارئة بعد الدوام.", "ናይ ምሸት ሓኪም ስድራቤት ንህጹጽ ናይ ሕማም ጉዳያት ጥራይ ዝውዕል እዩ።", "Kiliinikiin galgalaa dhukkuboota tasaatiif qofa kan oolu dha.", "The out-of-hours GP service is exclusively intended for urgent complaints in evenings and weekends."],
  ["School", "Ouders kunnen via het online schoolportaal de absentie van hun kind doorgeven.", "يمكن للوالدين إبلاغ المدرسة بغياب طفلهم بسهولة عبر البوابة الإلكترونية للمدرسة.", "ወለዲ ብመንገዲ ናይቲ ቤት ትምህርቲ ኢንተርኔት ፖርታል ናይ ውላዶም ምብኳር ክሕብሩ ይኽእሉ እዮም።", "Warri intarneetii mana barumsaatiin hafuu mucaa isaanii beeksisuu danda'u.", "Parents can report their child's absence through the online school portal."]
];
gevorderdList.forEach(item => addExtra('gevorderd', item[0], item[1], item[2], item[3], item[4], item[5]));

// Moeilijk (B1-B2) Extra
const moeilijkList = [
  ["Bestuursrecht", "Een verzoek om handhaving dient te voldoen aan de formele wettelijke vereisten van de Algemene wet bestuursrecht.", "يجب أن يستوفي طلب إنفاذ القانون المتطلبات الإجرائية الصارمة المنصوص عليها في القانون الإداري.", "ናይ ሕጊ ተፈጻምነት ሕቶ ምስቲ ናይ ምምሕዳር ሕጊ ቅጥዕታት ዝሰማማዕ ክኸውን ኣለዎ።", "Iyyannoon seera raawwachiisuu seera bulchiinsaa wajjin wal simuu qaba.", "An enforcement request must comply with the formal statutory requirements of the General Administrative Law Act."],
  ["Bestuursrecht", "Indiening van een beroepschrift per e-mail is slechts toegestaan indien het bestuursorgaan die weg expliciet heeft geopend.", "لا يجوز تقديم الاستئناف عبر البريد الإلكتروني إلا إذا فتحت الهيئة الإدارية هذا المسار صراحة.", "ብኢመይል ይግባይ ምቕራብ ዝፍቀድ እቲ ምምሕዳራዊ ኣካል ነዚ መገዲ ብንጹር እንተፈቒድዎ ጥራይ እዩ።", "Iyyannoo imeyiliidhaan dhiyeessuun kan danda'amu qaamni bulchiinsaa yoo eeyyame qofa.", "Submitting an appeal by email is permitted only if the administrative body has explicitly opened that channel."],
  ["Arbeidsrecht", "De werkgever dient een deugdelijk re-integratiedossier op te bouwen gedurende de periode van arbeidsongeschiktheid.", "يلزم صاحب العمل بإنشاء وتوثيق ملف إعادة إدماج مهني متكامل ومحكم طوال فترة عجز الموظف.", "ኣስራሒ ኣብ ግዜ ናይ ስራሕ ስንክልና ግቡእ ናይ ዳግመ-ምስግጋር መዝገብ ክሕዝ ግዴታ ኣለዎ።", "Hojjachiisaan yeroo dhukkubaa hojjetichaa galmee sirrii qopheessuuf dirqama qaba.", "The employer must compile a sound reintegration file during the period of incapacity for work."],
  ["Arbeidsrecht", "Bij het berekenen van de transitievergoeding tellen eerdere dienstjaren bij dezelfde werkgever onverkort mee.", "تحسب سنوات الخدمة السابقة لدى نفس صاحب العمل بالكامل عند تقدير تعويض الانتقال القانوني.", "ናይ ምስግጋር ካሳ ክሕሰብ ከሎ ኣብቲ ኣስራሒ ዝተሰርሑ ናይ ቀደም ዓመታት ምሉእ ብምሉእ ይቑጸሩ።", "Kaffaltii ce'umsaa shallaguuf waggoonni duraa hojjataman guutummaatti lakkaa'amu.", "When calculating the transition payment, prior years of service with the same employer count in full."],
  ["Belasting", "Bij het vaststellen van de definitieve aanslag inkomstenbelasting kunnen eerdere voorlopige aanslagen worden verrekend.", "تتم تسوية وخصم التقييمات الضريبية المؤقتة السابقة عند إصدار الإشعار النهائي لضريبة الدخل السنوية.", "ናይ መወዳእታ ናይ እቶት ግብሪ ክፍሊት ክውሰን ከሎ፡ እቶም ናይ ቀደም ግዝያዊ ክፍሊታት ይተዓራረቑ እዮም።", "Murtii gibiraa isa dhumaa irratti kaffaltiin duraan kaffalame ni herreegama.", "When establishing the final income tax assessment, prior provisional assessments can be settled."],
  ["Huisvesting", "De verhuurder mag de toegang tot het gehuurde niet zonder uitdrukkelijke voorafgaande toestemming van de huurder betreden.", "يحظر على مالك العقار دخول الشقة المستأجرة دون موافقة خطية صريحة ومسبقة من المستأجر.", "ኣካራዪ ብዘይ ናይቲ ተኻራዪ ንጹር ፍቓድ ናብቲ ዝተኻረዮ ገዛ ክኣቱ ኣይፍቀደሉን እዩ።", "Abbaan manaa eeyyama kireeffataa malee mana kireeffame seenuu hin danda'u.", "The landlord may not enter the rented premises without the tenant's express prior consent."],
  ["Gezondheid", "Zorgverleners zijn gehouden aan de wettelijke bewaarplicht van medische dossiers voor ten minste twintig jaar.", "يلزم القانون مؤسسات الرعاية الصحية بالاحتفاظ بالملفات الطبية للمرضى لمدة لا تقل عن عشرين عاماً.", "ናይ ጥዕና ትካላት ንናይ ሕሙማን መዝገባት እንተወሓደ ንዕስራ ዓመት ናይ ምዕቃብ ሕጋዊ ግዴታ ኣለዎም።", "Tajaajilli fayyaa galmee yaalaa waggoota digdamaaf olkaa'uuf dirqama qaba.", "Healthcare providers are bound by the statutory duty to preserve medical records for at least twenty years."],
  ["Maatschappij", "Het Europees Verdrag voor de Rechten van de Mens biedt burgers directe bescherming tegen willekeur van de overheid.", "توفر الاتفاقية الأوروبية لحقوق الإنسان حماية قانونية مباشرة للمواطنين ضد أي تعسف حكومي محتمل.", "ናይ ኤውሮጳ ናይ ሰብኣዊ መሰላት ውዕል ንዜጋታት ካብ ናይ መንግስቲ ዘይሕጋዊ ጭቆና ቀጥታዊ ዕቝባ ይህብ።", "Waliigalteen mirga namoomaa Awurooppaa lammiilee miidhaa mootummaa irraa eega.", "The European Convention on Human Rights provides citizens with direct protection against arbitrary government action."]
];
moeilijkList.forEach(item => addExtra('moeilijk', item[0], item[1], item[2], item[3], item[4], item[5]));

// Re-index all IDs sequentially per level
const levelCounters = { basis: 0, gevorderd: 0, moeilijk: 0 };
curList.forEach(s => {
  levelCounters[s.level] = (levelCounters[s.level] || 0) + 1;
  s.id = `sent_${s.level}_${String(levelCounters[s.level]).padStart(3, '0')}`;
  // Strip any accidental brackets or trailing numbers
  s.dutch = s.dutch.replace(/\s*[\(\[\{]\d+[\)\]\}]\s*$/, '').trim();
});

console.log(`===============================================`);
console.log(`MASSIVE CLEAN & UNIQUE SENTENCES TOTAL: ${curList.length}`);
console.log(`- Basis (A1): ${curList.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${curList.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${curList.filter(s => s.level === 'moeilijk').length}`);
const badSuffixes = curList.filter(s => /[\(\[\{]\d+[\)\]\}]/.test(s.dutch));
console.log(`Bad suffixes: ${badSuffixes.length}`);
console.log(`===============================================`);

fs.writeFileSync(path.join(__dirname, '../data/sentences.json'), JSON.stringify(curList, null, 2), 'utf-8');
fs.writeFileSync(path.join(__dirname, '../data/sentences.js'), `window.TAALVRIEND_SENTENCES = ${JSON.stringify(curList, null, 2)};\n`, 'utf-8');
console.log('Saved to data/sentences.json and data/sentences.js!');
