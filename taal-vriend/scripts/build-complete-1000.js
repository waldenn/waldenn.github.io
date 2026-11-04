// scripts/build-complete-1000.js
// Adds 1,000 additional words across 18 essential newcomer categories with
// Arabic, Tigrinya, Oromo, and English translations, accurate examples, and SVG graphics.

const fs = require('fs');
const path = require('path');

// We will load the base 354 words
const baseWords = require('./word-definitions.js');
const extWords = require('./extended-definitions.js');

console.log(`Base words: ${baseWords.length}, Extended words: ${extWords.length} (total: ${baseWords.length + extWords.length})`);

// Categories and their data
const categoriesData = [
  // 1. ZORG & MEDISCH (Health & Care) - 70 words
  {
    cat: 'Gezondheid & Nood',
    icon: '🩺',
    color: '#EF4444',
    bg: '#FEF2F2',
    words: [
      ['de keel', 'keel', 'de', 'الحلق / الحنجرة', 'ጎረሮ', 'qoonqoo', 'throat', 'Mijn keel doet pijn bij het slikken.'],
      ['de neus', 'neus', 'de', 'الأنف', 'ኣፍንጫ', 'funyaan', 'nose', 'Snuit je neus met een papieren zakdoekje.'],
      ['de vinger', 'vinger', 'de', 'الإصبع', 'ኣጻብዕ', 'quba', 'finger', 'Er zit een splinter in mijn vinger.'],
      ['de duim', 'duim', 'de', 'الإبهام', 'ዓባይ ኣጻብዕ', 'quba guddaa', 'thumb', 'Steek je duim omhoog als alles goed is.'],
      ['de knie', 'knie', 'de', 'الركبة', 'ብርኪ', 'jilba', 'knee', 'Ik ben gevallen en heb pijn aan mijn knie.'],
      ['de enkel', 'enkel', 'de', 'الكاحل', 'ዓካከሊት', 'komee / moggolee', 'ankle', 'Mijn enkel is dik en pijnlijk.'],
      ['de schouder', 'schouder', 'de', 'الكتف', 'መንከብ', 'ceekuu / ceeka', 'shoulder', 'Mijn schouder voelt stijf en gespannen aan.'],
      ['de elleboog', 'elleboog', 'de', 'المرفق / الكوع', 'ብርኪ ኢድ', 'ciqilee', 'elbow', 'Stoot niet met je elleboog tegen de tafel.'],
      ['het bloed', 'bloed', 'het', 'الدم', 'ደም', 'dhiiga', 'blood', 'De dokter neemt wat bloed af voor onderzoek.'],
      ['de wond', 'wond', 'de', 'الجرح', 'ቍስሊ', 'madaa', 'wound', 'Ontsmet de wond met een beetje jodium.'],
      ['de hoest', 'hoest', 'de', 'السعال / الكحة', 'ሰዓል', 'qufaa', 'cough', 'Hij heeft al een week last van een zware hoest.'],
      ['de verkoudheid', 'verkoudheid', 'de', 'النزلة البردية / الزكام', 'ጉንፋን', 'utaalloo / qufa', 'cold / flu', 'Warme thee helpt bij een verkoudheid.'],
      ['de ontsteking', 'ontsteking', 'de', 'الالتهاب', 'ረኽሲ', 'dhibee / foolii madaa', 'inflammation / infection', 'De ontsteking wordt behandeld met antibiotica.'],
      ['de allergie', 'allergie', 'de', 'الحساسية', 'ኣለርጂ', 'alerjii', 'allergy', 'Ik heb een allergie voor noten en pollen.'],
      ['de maag', 'maag', 'de', 'المعدة', 'ከብዲ', 'garaacha', 'stomach', 'Eet niet te snel, dat is slecht voor je maag.'],
      ['de longen', 'longen', 'de', 'الرئتان', 'ሳንቡእ', 'somba', 'lungs', 'Adem diep in zodat de dokter naar je longen kan luisteren.'],
      ['de spier', 'spier', 'de', 'العضلة', 'ጭዋዳ', 'mushaa', 'muscle', 'Spierpijn na een flinke fietstocht.'],
      ['het bot', 'bot', 'het', 'العظم', 'ዓጽሚ', 'lafee', 'bone', 'Gelukkig is er geen bot gebroken bij de val.'],
      ['de zalf', 'zalf', 'de', 'المرهم / الكريم الطبي', 'ቅባእ መድሃኒት', 'dhadhaa qorichaa', 'ointment / medical cream', 'Smeer deze verzachtende zalf op de droge huid.'],
      ['de pleisters', 'pleisters', 'de', 'لواصق الجروح', 'ፕላስተራት', 'pilaastaroota', 'plasters / band-aids', 'Doe een pleister op het sneetje.'],
      ['de rolstoel', 'rolstoel', 'de', 'الكرسي المتحرك', 'መንበር ተሽከርካሪ', 'teessoo marsoo', 'wheelchair', 'Het ziekenhuis heeft leenrolstoelen bij de receptie.'],
      ['de krukken', 'krukken', 'de', 'العكازات الطبية', 'ምርኩዝ', 'ulee miilaa (krukken)', 'crutches', 'Zij loopt tijdelijk met krukken na de operatie.'],
      ['de griepprik', 'griepprik', 'de', 'حقنة الإنفلونزا الموسمية', 'መርፍእ ጉንፋን', 'talaallii utaalloo', 'flu vaccination', 'Haal in het najaar de griepprik bij de huisarts.'],
      ['het consultatiebureau', 'consultatiebureau', 'het', 'مركز رعاية الأمومة والطفولة', 'ክሊኒክ ቆልዑ', 'waajjira eegumsa fayyaa daa’immanii', 'child health clinic', 'We gaan met de baby naar het consultatiebureau.'],
      ['de zwangerschap', 'zwangerschap', 'de', 'الحمل', 'ጥንሲ', 'ulfa', 'pregnancy', 'Een gezonde zwangerschap van negen maanden.'],
      ['de verloskundige', 'verloskundige', 'de', 'القبالة / المولدة', 'መወልዲት', 'deessiftuu', 'midwife', 'De verloskundige begeleidt de bevalling thuis of in het ziekenhuis.'],
      ['de tandpijn', 'tandpijn', 'de', 'ألم الأسنان والضروس', 'ሕማም ስኒ', 'dhukkubbii ilkaanii', 'toothache', 'Met acute tandpijn kun je direct bellen naar de spoedtandarts.'],
      ['de tanden', 'tanden', 'de', 'الأسنان', 'ኣስنان', 'ilkawwan', 'teeth', 'Poets je tanden twee keer per dag zorgvuldig.'],
      ['de tong', 'tong', 'de', 'اللسان', 'መልሓስ', 'arraba', 'tongue', 'Steek je tong even uit voor inspectie.'],
      ['de keelontsteking', 'keelontsteking', 'de', 'التهاب الحلق واللوزتين', 'ረኽሲ ጎረሮ', 'dhibee qoonqoo', 'throat infection', 'Veel water drinken verzacht de keelontsteking.'],
      ['de huisartsenpost', 'huisartsenpost', 'de', 'مركز أطباء الرعاية العاجلة المسائي', 'ህጹጽ ረድኤት ሓኪም', 'buufata yaalaa yeroo ariifachiisaa', 'out-of-hours GP clinic', '\'s Avonds en in het weekend bel je naar de huisartsenpost.'],
      ['de spoedeisende hulp (SEH)', 'spoedeisende hulp', 'de', 'قسم الطوارئ والحوادث بالمستشفى', 'ክፍሊ ህጹጽ ረድኤት ሆስፒታል', 'kutaa balaa hospitaalaa', 'emergency room / A&E', 'Bij ernstige ongevallen ga je naar de spoedeisende hulp.'],
      ['de paracetamol', 'paracetamol', 'de', 'مسكن الألم باراسيتامول', 'ፓራሰታሞል', 'paracetamol', 'paracetamol', 'Paracetamol is zonder recept verkrijgbaar bij de drogist.'],
      ['de ibuprofen', 'ibuprofen', 'de', 'مسكن ومضاد الالتهاب إيبوبروفين', 'ኢቡፕሮፌን', 'ibuprofen', 'ibuprofen', 'Ibuprofen helpt bij zwelling en hevige pijn.'],
      ['de neusspray', 'neusspray', 'de', 'بخاخ احتقان الأنف', 'ስፕረይ ኣፍንጫ', 'ispireeyii funyaanii', 'nasal spray', 'Gebruik een zoutoplossing neusspray voor kinderen.'],
      ['de hoestdrank', 'hoestdrank', 'de', 'شراب تهدئة السعال', 'መስተ ሰዓል', 'dhugaatii qufaa', 'cough syrup', 'Een lepel hoestdrank voor het naar bed gaan.'],
      ['de oogdruppels', 'oogdruppels', 'de', 'قطرات العين المرطبة والمعالجة', 'ነጠብጣብ ዓይኒ', 'cobbiisa ijaa', 'eye drops', 'Twee druppels in elk oog tegen de droogte.'],
      ['de bijsluiter', 'bijsluiter', 'de', 'النشرة الدوائية المرفقة بالعلبة', 'መብርሂ ወረቐት መድሃኒት', 'waraqaa ibsa qorichaa', 'patient information leaflet', 'Lees voor gebruik altijd aandachtig de bijsluiter.'],
      ['de dosering', 'dosering', 'de', 'الجرعة الدوائية المحددة بدقة', 'መጠን መድሃኒት', 'hanga qorichaa', 'dosage', 'Houd je aan de dosering die op het etiket staat.'],
      ['de bijwerking', 'bijwerking', 'de', 'الأثر الجانبي للدواء', 'ጎድናዊ ሳዕቤን', 'miidhaa cinaa qorichaa', 'side effect', 'Moeheid kan een bijwerking van dit tabletje zijn.'],
      ['de duizeligheid', 'duizeligheid', 'de', 'الدوخة والدوار وعدم التوازن', 'ምዝዋር ርእሲ', 'maraammartoo mataa', 'dizziness', 'Ga rustig zitten wanneer je duizeligheid ervaart.'],
      ['de misselijkheid', 'misselijkheid', 'de', 'الشعور بالغثيان في المعدة', 'ምዕላው ከብዲ', 'ol deebisaa / bal\'ama', 'nausea', 'Frisse lucht inademen helpt tegen lichte misselijkheid.'],
      ['het overgeven', 'overgeven', 'het', 'القيء والاستفراغ', 'ምትፋእ', 'hoqqisiisuu', 'vomiting', 'Drink kleine slokjes water na het overgeven.'],
      ['de diarree', 'diarree', 'de', 'الإسهال الشديد', 'ውጽኣት', 'garaa kaasaa', 'diarrhea', 'ORS helpt uitdroging bij diarree te voorkomen.'],
      ['de verstopping', 'verstopping', 'de', 'الإمساك وصعوبة الإخراج', 'ድርቀት ከብዲ', 'garaa goguu', 'constipation', 'Voldoende water en vezelrijk eten verhelpen verstopping.'],
      ['de kramp', 'kramp', 'de', 'التشنج والشد العضلي المؤلم', 'ጭንቀት ጭዋዳ', 'hiddii maashaa', 'muscle cramp', 'Strek je been langzaam om de kramp te verminderen.'],
      ['de jeuk', 'jeuk', 'de', 'الحكة الجلدية المزعجة', 'ሕከኽ', 'hooqsisa', 'itching / itch', 'Een verzachtende mentholgel stilt de vervelende jeuk.'],
      ['de uitslag', 'uitslag', 'de', 'الطفح الجلدي والبقع الحمراء', 'ሽፍታ ቆርበት', 'finnaan gogaa', 'skin rash', 'De baby heeft rode uitslag op de wangetjes.'],
      ['de bult', 'bult', 'de', 'التورم والنتوء نتيجة الاصطدام', 'ሕበጥ', 'dhiita\'uu', 'swelling / bump', 'Leg een koud washandje op de bult.'],
      ['de blauwe plek', 'blauwe plek', 'de', 'الكدمة وتغير لون الجلد', 'ስንባጥ', 'kintoo dhiigaa', 'bruise', 'Na een paar dagen kleurt de blauwe plek geelgroen.'],
      ['de bloeddruk', 'bloeddruk', 'de', 'ضغط الدم في الشرايين', 'ጸቕጢ ደም', 'dhiibbaa dhiigaa', 'blood pressure', 'Mijn bloeddruk is gelukkig helemaal normaal.'],
      ['de hartslag', 'hartslag', 'de', 'نبضات ودقات القلب', 'ድራኸ ልቢ', 'rukuttaa onnee', 'heartbeat / pulse', 'De dokter telt de hartslag aan de pols.'],
      ['de ademhaling', 'ademhaling', 'de', 'التنفس والشهيق والزفير', 'ምትንፋስ', 'hafuura baafachuu', 'breathing / respiration', 'Let op een rustige en diepe ademhaling.'],
      ['de rust', 'rust', 'de', 'الراحة والاسترخاء التام', 'ዕረፍቲ', 'boqonnaa', 'rest', 'Bij griep is een paar dagen bedrust het beste medicijn.'],
      ['de slaap', 'slaap', 'de', 'النوم الكافي ليلاً', 'ድቃስ', 'hirriiba', 'sleep', 'Acht uur goede slaap herstelt lichaam en geest.'],
      ['de conditie', 'conditie', 'de', 'اللياقة البدنية والصحية', 'ጥዕናዊ ቅዋም', 'qophii qaamaa', 'physical condition / fitness', 'Regelmatig wandelen verbetert je algemene conditie.'],
      ['de operatie', 'operatie', 'de', 'العملية الجراحية في المستشفى', 'ኦፐሬሽን / መጥባሕቲ', 'yaala baqaqsanii hodhuu', 'surgery / operation', 'De operatie is voorspoedig en vlekkeloos verlopen.'],
      ['de narcose', 'narcose', 'de', 'التخدير الكلي العام أثناء العملية', 'ናርኮሲስ / ምድቃስ', 'hadoodsa guutuu', 'general anesthesia', 'Tijdens de narcose slaap je diep en merk je niets.'],
      ['het litteken', 'litteken', 'het', 'أثر الجرح أو الندبة الدائمة', 'ሰምቢእ', 'madaa qorqodde', 'scar', 'Het litteken geneest mooi en wordt steeds lichter.'],
      ['de hechtingen', 'hechtingen', 'de', 'الغرز الطبية لإغلاق الجرح', 'ስፌት ቍስሊ', 'hodhaa madaa', 'stitches / sutures', 'Over tien dagen mag de verpleegkundige de hechtingen verwijderen.'],
      ['het gips', 'gips', 'het', 'الجبس الطبي لتثبيت العظام المكسورة', 'ጀሶ', 'jippisii', 'plaster cast', 'Mijn arm zit zes weken in het gips.'],
      ['de fysiotherapeut', 'fysiotherapeut', 'de', 'أخصائي العلاج الطبيعي والتأهيل', 'ፊዝዮተራፒስት', 'ogeessa fiziooteraapii', 'physiotherapist', 'De fysiotherapeut leert mij oefeningen voor mijn rug.'],
      ['de psycholoog', 'psycholoog', 'de', 'الأخصائي النفسي للمساعدة الذهنية', 'ስነ-ኣእምሮ ሓኪም', 'ogeessa yaala sammuu', 'psychologist', 'Een psycholoog kan helpen bij stress en nare herinneringen.'],
      ['de GGZ (geestelijke gezondheidszorg)', 'GGZ', 'de', 'خدمات الصحة النفسية والعقلية', 'ክንክን ኣእምሮኣዊ ጥዕና', 'eegumsa fayyaa sammuu (GGZ)', 'mental health care', 'De huisarts kan een verwijzing schrijven voor de GGZ.'],
      ['de mondzorg', 'mondzorg', 'de', 'العناية بصحة ونظافة الفم والأسنان', 'ክንክን ኣፍን ስንን', 'kunuunsa afaanii fi ilkaanii', 'oral and dental care', 'Goede mondzorg voorkomt gaatjes en tandsteen.'],
      ['het tandvlees', 'tandvlees', 'het', 'اللثة المحيطة بالأسنان', 'ግድፊ ስኒ', 'irree ilkaanii', 'gums', 'Gezond tandvlees bloedt niet bij het poetsen.'],
      ['de beugel', 'beugel', 'de', 'تقويم الأسنان الطبي للمراهقين', 'መዐረዪ ስኒ (ብሬስ)', 'sirreessituu ilkaanii (beugel)', 'dental braces', 'Mijn zoon draagt een beugel om zijn tanden recht te zetten.'],
      ['de controle', 'controle', 'de', 'الفحص الدوري والمراجعة المنتظمة', 'ምርመራ / ክትትል', 'sakatta\'a qorannoo', 'check-up / regular check', 'Ieder halfjaar gaan we op controle bij de tandarts.'],
      ['de spoed', 'spoed', 'de', 'الحالة الطارئة والمستعجلة جداً', 'ህጹጽነት', 'ariifachiisaa', 'emergency / urgency', 'Bel bij acute spoed altijd direct 112.']
    ]
  },

  // 2. WONEN, MEUBELS & HUISVESTING (Housing & Living) - 60 words
  {
    cat: 'Wonen & Huis',
    icon: '🛋️',
    color: '#0284C7',
    bg: '#F0F9FF',
    words: [
      ['de woonkamer', 'woonkamer', 'de', 'غرفة الجلوس والصالون الرئيسي', 'ሳሎን', 'kutaa saaloonaa', 'living room', 'In de woonkamer staat een fijne driezitsbank.'],
      ['de slaapkamer', 'slaapkamer', 'de', 'غرفة النوم الهادئة', 'ክፍሊ መደቀሲ', 'kutaa hirriibaa', 'bedroom', 'De slaapkamer heeft twee grote ramen voor frisse lucht.'],
      ['de badkamer', 'badkamer', 'de', 'الحمام المنزلي المجهز للاستحمام', 'ክፍሊ ሽቓቕን ሕጽቦን', 'kutaa dhiqannaa', 'bathroom', 'Er hangen zachte handdoeken aan het rek in de badkamer.'],
      ['de gang', 'gang', 'de', 'الردهة والممر الداخلي للمنزل', 'ኮሪደር', 'koridarii / balbala keessaa', 'hallway / entrance hall', 'Trek je vieze schoenen uit bij de kapstok in de gang.'],
      ['het balkon', 'balkon', 'het', 'الشرفة المطلة على الخارج (البلكونة)', 'ባልኮን', 'balkoonii', 'balcony', '\'s Zomers kweken we verse muntplantjes op het balkon.'],
      ['de tuin', 'tuin', 'de', 'الحديقة الخارجية الملحقة بالمنزل', 'ጀርዲን ገዛ', 'iddoo asheetaa / maasii', 'garden / backyard', 'De kinderen kunnen heerlijk buiten spelen in de tuin.'],
      ['de zolder', 'zolder', 'de', 'السندرة والعلية العلوية للتخزين', 'ናሕሲ', 'baaxii manaa', 'attic', 'Oude winterkleding bewaren we in dozen op zolder.'],
      ['de kelder', 'kelder', 'de', 'القبو السفلي البارد تحت الأرض', 'ምድርቤት', 'kutaa lafa jalaa', 'basement / cellar', 'In de kelder is een koele opslagruimte voor voorraad.'],
      ['het dak', 'dak', 'het', 'السقف الخارجي والقرميد الحامي للمبنى', 'ናሕሲ', 'baaxii / qorqoorroo', 'roof', 'De dakdekker inspecteert de pannen op het dak.'],
      ['de muur', 'muur', 'de', 'الجدار والحائط الداخلي أو الخارجي', 'መንደቕ', 'girgiddaa', 'wall', 'We schilderen de muur in een lichte en warme tint.'],
      ['de vloer', 'vloer', 'de', 'أرضية الغرفة المصنوعة من الخشب أو البلاط', 'መሬት ገዛ', 'lafa manaa', 'floor', 'De houten vloer is gemakkelijk schoon te houden.'],
      ['het plafond', 'plafond', 'het', 'السقف الداخلي العلوي للغرفة', 'ላዕለዋይ ናሕሲ', 'gubbaa kutaa', 'ceiling', 'Aan het plafond hangt een zuinige led-lamp.'],
      ['het slot', 'slot', 'het', 'قفل الباب المتين للحماية والأمان', 'መዕጸዊ', 'kuflii', 'door lock', 'Vergeet niet het slot op de voordeur om te draaien.'],
      ['de deurbel', 'deurbel', 'de', 'جرس الباب الخارجي للتنبيه', 'ደወል ማዕጾ', 'bilbila balbalaa', 'doorbell', 'Als de deurbel gaat, kijkt papa wie er voor staat.'],
      ['de brievenbus', 'brievenbus', 'de', 'صندوق البريد الرسمي بالباب', 'ሳንዱቕ ፖስታ', 'saanduqa poostaa', 'letterbox / mailbox', 'Controleer dagelijks de brievenbus op post van instanties.'],
      ['het gordijn', 'gordijn', 'het', 'الستارة القماشية لحجب الرؤية والضوء', 'ጋረጃ', 'golgaa', 'curtain / drapes', 'Sluit \'s avonds de gordijnen voor privacy en warmte.'],
      ['het tapijt', 'tapijt', 'het', 'السجادة المفروشة على الأرضية', 'ምንጻፍ', 'karpheetii / afata', 'carpet / rug', 'Een dik tapijt voelt heerlijk zacht aan je blote voeten.'],
      ['de bank', 'bank', 'de', 'الكنبة والأريكة المريحة للجلوس', 'ሶፋ', 'soofaa', 'couch / sofa', 'We zitten gezellig op de bank thee te drinken.'],
      ['de fauteuil', 'fauteuil', 'de', 'الكرسي المفرد الوثير ذو المساند', 'ፍሉይ መንበር', 'barcuma boqonnaa', 'armchair', 'Opa leest graag zijn boek in de comfortabele fauteuil.'],
      ['de kledingkast', 'kledingkast', 'de', 'دولاب وخزانة تعليق الملابس', 'ኣርማድዮ ክዳውንቲ', 'armooyii uffataa', 'wardrobe / clothes closet', 'Hang de schone overhemden netjes op hangers in de kast.'],
      ['de boekenplank', 'boekenplank', 'de', 'الرف الجداري لترتيب الكتب والمجلدات', 'ረፍ መጻሕፍቲ', 'raafii kitaabaa', 'bookshelf', 'Op de boekenplank staan woordenboeken en leerboeken.'],
      ['de spiegelkast', 'spiegelkast', 'de', 'خزانة الحمام ذات المرآة الشفافة', 'ኣርማድዮ መስትያት', 'armooyii daawwitii', 'mirrored bathroom cabinet', 'Tandenborstels en tandpasta bewaar je in de spiegelkast.'],
      ['het gasfornuis', 'gasfornuis', 'het', 'طباخ وموقد الغاز السريع', 'ፎርነሎ ጋዝ', 'stoovii gaazii', 'gas stove / hob', 'Zet de vlam van het gasfornuis wat lager.'],
      ['de oven', 'oven', 'de', 'فرن الخبز والتحمير الكهربائي', 'እቶን / ፎርኖ', 'eelee / oovenii', 'oven', 'De geur van vers brood komt rechtstreeks uit de oven.'],
      ['de magnetron', 'magnetron', 'de', 'جهاز تسخين الطعام السريع (الميكروويف)', 'ማይክሮዌቭ', 'maaykirooweevii', 'microwave', 'In twee minuten warmt de soep op in de magnetron.'],
      ['de waterkoker', 'waterkoker', 'de', 'غلاية تسخين الماء السريعة', 'መፍልሒ ማይ', 'kettilii bishaanii', 'kettle', 'Zet de waterkoker aan voor een lekkere kop muntthee.'],
      ['het koffiezetapparaat', 'koffiezetapparaat', 'het', 'ماكينة تحضير القهوة الطازجة', 'ማሽን ቡን', 'maashinii bunaa', 'coffee maker', 'Het koffiezetapparaat pruttelt heerlijk in de ochtend.'],
      ['de vriezer', 'vriezer', 'de', 'المجمدة والفريزر لحفظ الأغذية', 'ፍሪዘር', 'firiizarii', 'freezer', 'Diepvriesgroenten bewaren we onderin de vriezer.'],
      ['de vaatwasser', 'vaatwasser', 'de', 'غسالة الصحون والأواني الأوتوماتيكية', 'ማሽን ሕጽቦ ሳሕኒ', 'maashinii saaxinii', 'dishwasher', 'Ruim de schone borden uit de vaatwasser.'],
      ['de gootsteen', 'gootsteen', 'de', 'حوض المطبخ المصنوع من المعدن', 'መሕጸቢ ሳሕኒ', 'siinkii kushinaa', 'kitchen sink', 'Was het fruit zorgvuldig af onder de kraan van de gootsteen.'],
      ['de kraan', 'kraan', 'de', 'صنبور المياه العذبة الصالحة للشرب', 'ቧንቧ', 'bombaa', 'tap / faucet', 'Nederlands kraanwater is van uitstekende kwaliteit.'],
      ['de afwasborstel', 'afwasborstel', 'de', 'فرشاة تنظيف الصحون اليدوية', 'መቦረሺ ሳሕኒ', 'burushii saaxinii', 'washing-up brush', 'Met een afwasborstel poets je de pannen gemakkelijk schoon.'],
      ['het afwasmiddel', 'afwasmiddel', 'het', 'سائل رغوة تنظيف الأطباق', 'ሳሙና ሳሕኒ', 'saamunaa dhiqannaa saaxinii', 'washing-up liquid', 'Een paar druppels afwasmiddel ontvetten het water.'],
      ['de spons', 'spons', 'de', 'إسفنجة المسح والتنظيف الرغوية', 'ስፖንጅ', 'ispoonjii', 'cleaning sponge', 'Veeg het keukenblad schoon met een vochtige spons.'],
      ['de theedoek', 'theedoek', 'de', 'فوطة تجفيف الأواني القطنية', 'ፎጣ ሳሕኒ', 'fooxaa saaxinii', 'tea towel / drying cloth', 'Droog het bestek af met een schone theedoek.'],
      ['de stofzuiger', 'stofzuiger', 'de', 'مكنسة الكهرباء لشفط الأتربة', 'ስቶፍዛውገር', 'istofzuugerii', 'vacuum cleaner', 'Stofzuig de slaapkamers minstens eenmaal per week.'],
      ['de dweil', 'dweil', 'de', 'ممسحة الأرضيات الرطبة بالماء', 'መድረዚ መሬት', 'haxooftuu lafaa', 'floor mop', 'Dweil de tegelvloer na het koken voor een frisse geur.'],
      ['de wasmand', 'wasmand', 'de', 'سلة تجميع الملابس غير النظيفة', 'ሳንዱቕ ሕጽቦ', 'gundoo uffataa', 'laundry basket', 'Verzamel alle vuile was in de wasmand in de badkamer.'],
      ['het wasmiddel', 'wasmiddel', 'het', 'مسحوق وسائل غسيل الملابس', 'ሳሙና ማሽን', 'saamunaa uffataa', 'washing powder / detergent', 'Kies het juiste wasmiddel voor bonte of witte kleding.'],
      ['het wasrek', 'wasrek', 'het', 'منشر تجفيف الملابس القابل للطي', 'መሰጥሒ ክዳን', 'manqaraara uffataa', 'clothes drying horse', 'Klap het wasrek uit bij het open raam.'],
      ['het strijkijzer', 'strijkijzer', 'het', 'مكواة البخار لتمليس التجاعيد', 'ካውያ', 'kaawiyaa', 'steam iron', 'Zet het strijkijzer op de juiste warmtestand.'],
      ['de strijkplank', 'strijkplank', 'de', 'طاولة الكي ذات الغطاء المبطن', 'ጣውላ ካውያ', 'minjaala kaawiyaa', 'ironing board', 'Zet de strijkplank stevig neer voor je begint.'],
      ['de vuilniszak', 'vuilniszak', 'de', 'كيس جمع القمامة البلاستيكي المتين', 'ፌስታል ጐሓፍ', 'festo qulqullinaa', 'refuse sack / bin bag', 'Knoop de volle vuilniszak goed dicht.'],
      ['het afval scheiden', 'afval scheiden', 'het', 'فرز وتصنيف النفايات لإعادة التدوير', 'ምፍላይ ጐሓፍ', 'kosi gargar baasuu', 'sorting household waste', 'In Nederland scheiden we papier, gft, plastic en glas.'],
      ['de container', 'container', 'de', 'حاوية القمامة الكبيرة على عجلات', 'ኮንተይነር ጐሓፍ', 'konteenara kosii', 'wheelie bin / container', 'Zet de container op de juiste dag aan de straatrand.'],
      ['de huur', 'huur', 'de', 'قيمة الإيجار الشهري للسكن', 'ክራይ ገዛ', 'kiraa manaa', 'monthly rent', 'Betaal de huur altijd voor de eerste van de nieuwe maand.'],
      ['de verhuurder', 'verhuurder', 'de', 'صاحب العقار أو شركة الإسكان المؤجرة', 'ኣከራዪ', 'kireessaa', 'landlord / housing provider', 'Meld eventuele lekkages direct aan de verhuurder.'],
      ['de huurtoeslag', 'huurtoeslag', 'de', 'الدعم الحكومي للمساعدة في دفع الإيجار', 'ሓገዝ ክራይ (ቶስላግ)', 'gargaarsa kiraa manaa', 'housing benefit allowance', 'Met een laag inkomen kom je vaak in aanmerking voor huurtoeslag.'],
      ['de energiekosten', 'energiekosten', 'de', 'تكلفة وفاتورة استهلاك الغاز والكهرباء', 'ክፍሊት ጋዝን መብራህትን', 'baasii anniisaa', 'energy bills / heating costs', 'Bespaar op energiekosten door ramen niet onnodig open te laten met de kachel aan.'],
      ['de meterstand', 'meterstand', 'de', 'الأرقام الظاهرة على عداد الطاقة والماء', 'ቁጽሪ ሜተር', 'lakkoofsa meetiraa', 'meter reading', 'Geef ieder jaar online de meterstand door.'],
      ['de radiator', 'radiator', 'de', 'مدفأة التدفئة المركزية الجدارية', 'ራድያተር (መሞቒ)', 'raadiyaatara manaa', 'radiator', 'Draai de knop van de radiator open voor meer warmte.'],
      ['de thermostaat', 'thermostaat', 'de', 'جهاز التحكم الآلي بدرجة حرارة المنزل', 'ተርሞስታት', 'to\'ataa hoo\'aa (thermostaat)', 'room thermostat', 'Zet de thermostaat \'s nachts op 15 graden.'],
      ['de stekker', 'stekker', 'de', 'القابس الكهربائي للوصل بالتيار', 'ስቴክር (መተሓላለፊ መብራህቲ)', 'isteekara elektiriikii', 'plug (electrical)', 'Steek de stekker stevig in het stopcontact.'],
      ['het stopcontact', 'stopcontact', 'het', 'مأخذ ومقبس الكهرباء في الحائط', 'መውጽኢ ኤሌክትሪክ', 'saakkeettii girgiddaa', 'wall socket / power point', 'Houd kleine kinderen uit de buurt van het stopcontact.'],
      ['de verlengkabel', 'verlengkabel', 'de', 'سلك التوصيل الكهربائي الإضافي الممدود', 'መናውሒ ገመድ', 'keeibilii dheeressaa', 'extension lead / cable', 'Gebruik een verlengkabel met aarding voor veilige stroom.'],
      ['de schakelaar', 'schakelaar', 'de', 'مفتاح تشغيل وإطفاء الإنارة', 'መወልዒ መብራህቲ', 'bantuu ifaa (switch)', 'light switch', 'Druk op de schakelaar bij de deuropening.'],
      ['de gloeilamp / ledlamp', 'ledlamp', 'de', 'المصباح الموفر للطاقة الكهربائية', 'ላምፓ ሌድ', 'balbii ifaa (LED)', 'LED light bulb', 'Draai een nieuwe ledlamp in het armatuur.'],
      ['de zaklamp', 'zaklamp', 'de', 'كشاف الجيب اليدوي للطوارئ', 'ናይ ኢድ መብራህቲ', 'toorchii harka', 'torch / flashlight', 'Leg een zaklamp op een makkelijk bereikbare plek klaar.'],
      ['de batterij', 'batterij', 'de', 'البطارية الجافة لتشغيل الأجهزة', 'ባትሪ', 'baatiri', 'battery', 'Lever lege batterijen altijd in bij de speciale bak in de supermarkt.'],
      ['de rookmelder', 'rookmelder', 'de', 'جهاز الإنذار المبكر لكشف الدخان والحرائق', 'መጠንቀቕታ ትኪ', 'akeektuu aaraa (rookmelder)', 'smoke alarm / detector', 'Een werkende rookmelder op iedere verdieping is wettelijk verplicht.']
    ]
  },

  // 3. WERK, BEROEPEN & SOLLICITEREN (Work, Career & Income) - 60 words
  {
    cat: 'Werk & School',
    icon: '💼',
    color: '#D97706',
    bg: '#FFFBEB',
    words: [
      ['de vacature', 'vacature', 'de', 'فرصة العمل والوظيفة الشاغرة المعروضة', 'ክፉት ስራሕ', 'bakka hojii duwwaa', 'job vacancy / opening', 'Reageer snel op een geschikte vacature.'],
      ['het cv (curriculum vitae)', 'cv', 'het', 'ملف السيرة الذاتية المهنية والدراسية', 'ሲቪ (ናይ ህይወት ታሪክ ስራሕ)', 'seenaa hojii (CV)', 'curriculum vitae / resume', 'Zorg dat je contactgegevens duidelijk bovenaan je cv staan.'],
      ['de sollicitatiebrief', 'sollicitatiebrief', 'de', 'خطاب التقدم للوظيفة ورسالة الدافع', 'ደብዳበ ምሕታት ስራሕ', 'xalayaa iyyannoo hojii', 'application / motivation letter', 'Laat iemand je sollicitatiebrief controleren op spelling.'],
      ['het sollicitatiegesprek', 'sollicitatiegesprek', 'het', 'المقابلة الوظيفية الشخصية مع صاحب العمل', 'ቃለ-መሕትት ስራሕ', 'gaafannoo hojii (intarviiwii)', 'job interview', 'Kom altijd ruim op tijd voor een sollicitatiegesprek.'],
      ['het uitzendbureau', 'uitzendbureau', 'het', 'شركة التوظيف المؤقت والوساطة للوظائف', 'ቤት ጽሕፈት ስራሕ', 'dhaabbata qacarrii yeroo (uitzendbureau)', 'employment / temp agency', 'Het uitzendbureau zoekt werk dat aansluit bij jouw ervaring.'],
      ['de proeftijd', 'proeftijd', 'de', 'مدة التجربة الأولى لتقييم أداء الموظف', 'ናይ ፈተነ ግዜ', 'yeroo qormaataa', 'probationary period', 'In de proeftijd mag je op ieder moment stoppen of worden ontslagen.'],
      ['het salaris', 'salaris', 'het', 'الراتب المالي مقابل العمل المنجز', 'ደሞዝ', 'mindaa', 'salary / wage', 'Het salaris wordt aan het einde van de kalendermaand overgemaakt.'],
      ['de loonstrook', 'loonstrook', 'de', 'قسيمة الراتب الشهرية المفصلة للضرائب', 'ወረቐት ደሞዝ', 'waraqaa mindaa (loonstrook)', 'pay slip', 'Op de loonstrook zie je precies hoeveel belasting is afgedragen.'],
      ['het minimumloon', 'minimumloon', 'het', 'الحد الأدنى للأجر المضمون بموجب القانون', 'ዝተሓተ ደሞዝ', 'mindaa baay\'ee gad aanaa', 'statutory minimum wage', 'Het wettelijk minimumloon wordt tweemaal per jaar aangepast.'],
      ['het vakantiegeld', 'vakantiegeld', 'het', 'مكافأة الإجازة الصيفية السنوية (8%)', 'ገንዘብ ዕረፍቲ', 'maallaqa boqonnaa', 'holiday allowance', 'In de maand mei keren werkgevers vakantiegeld uit.'],
      ['de werkgever', 'werkgever', 'de', 'الجهة الموظفة أو المدير المباشر', 'ኣስራሒ', 'qacaraa', 'employer', 'Een goede werkgever zorgt voor een veilige werkomgeving.'],
      ['de werknemer', 'werknemer', 'de', 'الموظف والعامل المتعاقد للقيام بالعمل', 'ሰራሕተኛ', 'hojjataa', 'employee / worker', 'Elke werknemer heeft recht op vakantiedagen.'],
      ['de leidinggevende', 'leidinggevende', 'de', 'المشرف ورئيس الفريق المباشر', 'ሓላፊ ስራሕ', 'hooggana hojii', 'supervisor / manager', 'Meld je bij ziekte altijd vóór werktijd bij je leidinggevende.'],
      ['de parttime baan', 'parttime baan', 'de', 'وظيفة بدوام جزئي ومحدد الساعات', 'ናይ ክፍለ-ግዜ ስራሕ', 'hojii yeroo gartokkee', 'part-time job', 'Veel mensen combineren een parttime baan met een studie.'],
      ['de fulltime baan', 'fulltime baan', 'de', 'وظيفة بدوام كامل بمعدل 36 إلى 40 ساعة', 'ናይ ምሉእ ግዜ ስራሕ', 'hojii guutuu yeroo', 'full-time job', 'Met een fulltime baan werk je meestal vijf dagen per week.'],
      ['de vrijwilliger', 'vrijwilliger', 'de', 'الشخص المتطوع لخدمة المجتمع بدون مقابل', 'ወለንተና', 'fedheessaa', 'volunteer', 'Als vrijwilliger leer je veel nieuwe mensen kennen.'],
      ['het vrijwilligerswerk', 'vrijwilligerswerk', 'het', 'العمل التطوعي الخيري والاجتماعي', 'ወለንተናዊ ስራሕ', 'hojii tola ooltummaa', 'volunteer work', 'Vrijwilligerswerk doen is een uitstekende manier om de taal te oefenen.'],
      ['de stage', 'stage', 'de', 'فترة التدريب العملي والتأهيل للطلاب', 'ልምምድ ስራሕ', 'shaakala hojii (stage)', 'internship / work placement', 'Tijdens de stage breng je de theorie in de praktijk.'],
      ['de stagiair', 'stagiair', 'de', 'المتدرب في فترة التدريب العملي', 'ተመሃራይ ልምምድ', 'shaakalaa hojii', 'intern / trainee', 'De stagiair kijkt mee met ervaren vakmensen.'],
      ['het ontslag', 'ontslag', 'het', 'إنهاء عقد العمل والمغادرة للوظيفة', 'ስንብት ስራሕ', 'hojii irraa geggeeffamuu', 'dismissal / termination', 'Bij ontslag met wederzijds goedvinden wordt een vaststellingsovereenkomst getekend.'],
      ['de opzegtermijn', 'opzegtermijn', 'de', 'المدة الزمنية الواجبة للإشعار قبل المغادرة', 'ግዜ መፍለጢ ስንብት', 'yeroo beeksisa dhiisuu', 'notice period', 'Houd rekening met de wettelijke opzegtermijn van één maand.'],
      ['de ziekmelding', 'ziekmelding', 'de', 'الإبلاغ الرسمي عن الغياب بسبب المرض', 'ምሕባር ሕማም ንኣስራሒ', 'dhibee beeksisuu', 'sick leave report', 'Doe de ziekmelding telefonisch bij je teamleider.'],
      ['de bedrijfsarts', 'bedrijfsarts', 'de', 'طبيب العمل المكلف بمتابعة الموظف المريض', 'ሓኪም ትካል ስራሕ', 'hakiima dhaabbata hojii', 'occupational physician / company doctor', 'De bedrijfsarts overlegt wanneer je weer voorzichtig kunt re-integreren.'],
      ['de werkkleding', 'werkkleding', 'de', 'الملابس المخصصة والمحمية لطبيعة العمل', 'ክዳን ስራሕ', 'uffata hojii', 'work clothes / uniform', 'De werkgever verstrekt schone werkkleding.'],
      ['de veiligheid', 'veiligheid', 'de', 'الأمان والسلامة المهنية من الحوادث', 'ድሕንነት', 'nageenya / eegumsa', 'occupational safety', 'Veiligheid op de werkvloer heeft altijd de hoogste prioriteit.'],
      ['het contract voor onbepaalde tijd', 'vast contract', 'het', 'عقد العمل الدائم غير محدد المدة (عقد ثابت)', 'ቀዋሚ ውዕል ስራሕ', 'waliigaltee hojii dhaabbataa', 'permanent employment contract', 'Een vast contract biedt veel financiële zekerheid.'],
      ['het tijdelijk contract', 'tijdelijk contract', 'het', 'عقد العمل المؤقت محدد الأجل (سنة مثلاً)', 'ግዝያዊ ውዕል ስራሕ', 'waliigaltee hojii yeroo', 'temporary contract', 'Na afloop kan een tijdelijk contract worden verlengd.'],
      ['de vakantiedagen', 'vakantiedagen', 'de', 'أيام الإجازة السنوية المدفوعة الأجر', 'መዓልታት ዕረፍቲ', 'guyyoota boqonnaa kaffaltii qaban', 'paid annual leave days', 'Vraag je vakantiedagen ruim van tevoren aan.'],
      ['de overuren', 'overuren', 'de', 'ساعات العمل الإضافية الزائدة عن الدوام', 'ተወሳኺ ሰዓታት ስራሕ', 'sa\'aatii dabalataa (overtime)', 'overtime hours', 'Overuren worden extra uitbetaald of gecompenseerd in vrije tijd.'],
      ['de pensioenopbouw', 'pensioenopbouw', 'de', 'تجميع مخصصات راتب التقاعد المستقبلي', 'ምጥርቃም ጡረታ', 'qusannaa sooramaa', 'pension accrual', 'Iedere maand draag je een percentage af voor je pensioen.'],
      ['de timmerman', 'timmerman', 'de', 'النجار الماهر بالأعمال الخشبية', 'ነዳፊ ዕንጨይቲ', 'anaaxii', 'carpenter', 'De timmerman bouwt houten meubels en kozijnen.'],
      ['de schilder', 'schilder', 'de', 'دهان الجدران والواجهات الحرفي', 'ቀባኢ ገዛ', 'dibaa manaa', 'painter and decorator', 'De schilder brengt een strakke laklaag aan op de deuren.'],
      ['de loodgieter', 'loodgieter', 'de', 'فني إصلاح أنابيب الصرف والتمديدات', 'ሰራሕተኛ ቧንቧ', 'hojjataa bishaanii (plumber)', 'plumber', 'De loodgieter verhelpt de verstopping in de afvoer.'],
      ['de elektricien', 'elektricien', 'de', 'فني تركيب وتمديد شبكات الكهرباء', 'ሰራሕተኛ ኤሌክትሪክ', 'elektiriishiyeenii', 'electrician', 'Schakel een erkende elektricien in voor veilige bedrading.'],
      ['de automonteur', 'automonteur', 'de', 'فني إصلاح وفحص وصيانة السيارات', 'መካኒክ መኪና', 'makaanika konkolaataa', 'car mechanic', 'De automonteur vervangt de remblokken van de wagen.'],
      ['de bakker', 'bakker', 'de', 'الخباز الحرفي الماهر في المخبز', 'ጋጋሪ ባኒ', 'tolchaa daabboo', 'baker', 'De warme bakker verkoopt krokant vers brood.'],
      ['de slager', 'slager', 'de', 'القصاب والجزار المحترف في الملحمة', 'ቀራጺ ስጋ', 'qalaa foonii', 'butcher', 'Vraag bij de slager om mager rundvlees.'],
      ['de kapper', 'kapper', 'de', 'حلاق ومصفف الشعر للرجال والنساء', 'ቀራጽ ጸጉሪ', 'haaddaa rifeensaa', 'hairdresser / barber', 'Mijn haar is te lang, ik maak een afspraak bij de kapper.'],
      ['de schoonmaker', 'schoonmaker', 'de', 'عامل النظافة المتخصص بالترتيب', 'መጽረዪ', 'qulqulleessaa', 'cleaner / housekeeper', 'De schoonmaker zorgt dat de klaslokalen iedere dag schoon zijn.'],
      ['de chauffeur', 'chauffeur', 'de', 'السائق المرخص للسيارات أو الحافلات', 'ዘዋሪ መኪና', 'konkolaachisaa', 'driver / chauffeur', 'De buschauffeur helpt de reiziger met de rolstoel.'],
      ['de bezorger', 'bezorger', 'de', 'عامل توصيل الطلبات والطرود السريع', 'መብጻሒ ኣቑሑ', 'ergaa geessaa', 'delivery courier / driver', 'De bezorger scant het etiket voor aflevering.'],
      ['de kok', 'kok', 'de', 'الطاهي والمعد للوجبات في المطعم', 'ሰራሕተኛ ክሽነ', 'ogeessa nyaataa / kuka', 'cook / chef', 'De kok bereidt verse soep met lokale kruiden.'],
      ['de ober', 'ober', 'de', 'النوادل ومقدم الطلبات والوجبات', 'ኣሰላፊ መግቢ', 'keessummeessaa', 'waiter / server', 'De vriendelijke ober noteert de bestelling.'],
      ['de beveiliger', 'beveiliger', 'de', 'حارس ومنظم الأمن في المنشآت', 'ሓላዊ ድሕንነት', 'eegduu nageenyaa', 'security officer', 'Toon je bezoekerspas aan de beveiliger bij de ingang.'],
      ['de magazijnmedewerker', 'magazijnmedewerker', 'de', 'عامل رص وترتيب البضائع في المستودع', 'ሰራሕተኛ መኽዘን', 'hojjataa kuusaa', 'warehouse operator', 'Als magazijnmedewerker verwerk je inkomende goederen.'],
      ['de heftruck', 'heftruck', 'de', 'آلية الرافعة الشوكية لنقل الحمولات', 'ሄፍቱሩክ', 'haftirookii', 'forklift truck', 'Rijd voorzichtig met de beladen heftruck.'],
      ['de werkschoenen', 'werkschoenen', 'de', 'الأحذية الواقية ذات الحماية الفولاذية', 'ናይ ስራሕ ሳእኒ ድሕንነት', 'kophee eegumsa hojii', 'safety boots / work shoes', 'Stalen neuzen in werkschoenen beschermen je tenen tegen zware vallende voorwerpen.'],
      ['het veiligheidshesje', 'veiligheidshesje', 'het', 'الصدرية الفسفورية العاكسة للرؤية', 'ጃኬት ድሕንነት', 'jaakkeettii iftuu eegumsaa', 'high-visibility vest', 'Trek op de bouw altijd direct een veiligheidshesje aan.'],
      ['de helm', 'helm', 'de', 'خوذة حماية الرأس الصدمية', 'ቆቢዕ ሓጺን', 'koofiyyaa sibiilaa', 'safety helmet / hard hat', 'Draag een goedgekeurde helm op de steiger.'],
      ['de gereedschapskist', 'gereedschapskist', 'de', 'صندوق حفظ وتنظيم أدوات الصيانة', 'ሳንዱቕ መሳርሒታት', 'saanduqa meeshaalee', 'toolbox', 'Bewaar schroevendraaiers en hamers overzichtelijk in de gereedschapskist.'],
      ['de werkbank', 'werkbank', 'de', 'طاولة العمل الثابتة في الورشة', 'ጣውላ ስራሕ', 'minjaala hojii', 'workbench', 'Klem het hout stevig vast op de werkbank.'],
      ['het certificaat', 'certificaat', 'het', 'شهادة التدريب والترخيص المعتمدة', 'ሰርቲፊኬት', 'sartafikeettii', 'certificate / qualification', 'Met een VCA-certificaat bewijs je kennis van veilige werkomstandigheden.'],
      ['het VCA-diploma', 'VCA-diploma', 'het', 'شهادة السلامة والصحة المهنية المعتمدة (VCA)', 'ዲፕሎማ ድሕንነት ስራሕ (ቪሲኤ)', 'dippiloomaa nageenya hojii (VCA)', 'VCA safety certificate', 'Veel bouw- en techniekbedrijven vragen om een VCA-diploma.'],
      ['de pauzeruimte', 'pauzeruimte', 'de', 'قاعة الاستراحة وتناول القهوة للعمال', 'ክፍሊ ዕረፍቲ', 'kutaa boqonnaa', 'break room / staff room', 'Tijdens de koffiepauze ontmoeten we elkaar in de pauzeruimte.'],
      ['het rooster', 'rooster', 'het', 'جدول وتوزيع مواعيد وساعات العمل', 'ሰሌዳ ስራሕ', 'tarree yeroo hojii', 'work schedule / rota', 'Volgende week staat mijn naam op het ochtendrooster.'],
      ['de ploegendienst', 'ploegendienst', 'de', 'العمل بنظام النوبات والمناوبات المتتابعة', 'ተራ ስራሕ (ሽፍት)', 'hojii dabaree (shift)', 'shift work', 'Bij ploegendienst werk je afwisselend ochtend-, avond- of nachtdiensten.'],
      ['de toeslag voor onregelmatige uren', 'ORT', 'de', 'البدل المالي الإضافي لساعات العمل الصعبة', 'ተወሳኺ ክፍሊት ናይ ምሸት/ቀዳም', 'kaffaltii dabalataa yeroo addaa (ORT)', 'irregular hours allowance (ORT)', '\'s Avonds en in het weekend ontvang je een mooie extra toeslag.'],
      ['de vakbond', 'vakbond', 'de', 'نقابة العمال المدافعة عن الحقوق المهنية', 'ማሕበር ሰራሕተኛታት', 'gamtaa hojjettootaa (vakbond)', 'trade union', 'De vakbond onderhandelt over betere arbeidsvoorwaarden in de cao.'],
      ['de cao (collectieve arbeidsovereenkomst)', 'cao', 'de', 'اتفاقية العمل الجماعية الملزمة للقطاع', 'ሓባራዊ ውዕል ስራሕ (ሲኤኦ)', 'waliigaltee hojii gamtaa (CAO)', 'collective labour agreement', 'In de cao staan afspraken over minimumloon, verlof en pensioen.']
    ]
  }
];

// Let's create an automated word builder to systematically fill up to 1000 items with rich linguistic coverage
const targetTotalNew = 1000;
const allExtraDefinitions = [];

// Push handcrafted first
categoriesData.forEach(cat => {
  cat.words.forEach(w => {
    const [word, lemma, article, ar, ti, om, en, example] = w;
    allExtraDefinitions.push({
      id: `w1k_${lemma.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${allExtraDefinitions.length + 1}`,
      word: word,
      lemma: lemma,
      article: article,
      category: cat.cat,
      color: cat.color,
      bg: cat.bg,
      glyph: cat.icon,
      translations: {
        ar: ar,
        ti: ti,
        om: om,
        en: en
      },
      example: example
    });
  });
});

console.log(`Pushed ${allExtraDefinitions.length} handcrafted core words.`);

// Add additional extensive vocabulary batches covering:
// - Onderwijs & Opgroeien
// - Verkeer & OV
// - Kleding & Maten
// - Natuur & Weer
// - Tijd & Kalender
// - Getallen & Rekenen
// - Eten & Boodschappen
// - Communicatie & Beleefdheid
// - Rechten & Democratie
// - Dieren & Boerderij
// - Sport & Vrije tijd
// - Dagelijkse voorwerpen

const moreBatches = require('./more-vocabulary-data.js');
console.log(`Loaded ${moreBatches.length} items from more-vocabulary-data.`);

moreBatches.forEach(item => {
  allExtraDefinitions.push({
    id: `w1k_${item.lemma.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${allExtraDefinitions.length + 1}`,
    word: item.word,
    lemma: item.lemma,
    article: item.article || '',
    category: item.category,
    color: item.color || '#2563EB',
    bg: item.bg || '#F8FAFC',
    glyph: item.glyph || '★',
    translations: item.translations,
    example: item.example || ''
  });
});

console.log(`Total new words assembled: ${allExtraDefinitions.length}`);

// Combine all: baseWords + extWords + allExtraDefinitions
const totalCombined = [...baseWords, ...extWords, ...allExtraDefinitions];
console.log(`TOTAL WORDS IN APP: ${totalCombined.length}`);

// Generate SVG helper for each word
function generateSvgForWord(item) {
  // If item already has custom SVG generator in scripts/generate-words.js, reuse or wrap
  const bg = item.bg || '#F8FAFC';
  const color = item.color || '#2563EB';
  const glyph = item.glyph || '★';
  const id = item.id;

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="240" height="240" rx="36" fill="url(#grad_${id})"/>
  <g filter="url(#shadow_${id})">
    <circle cx="120" cy="120" r="75" fill="${color}" opacity="0.10"/>
    <circle cx="120" cy="120" r="56" fill="${color}" opacity="0.18"/>
    <text x="120" y="142" font-size="62" font-family="'Segoe UI', Roboto, system-ui, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${glyph}</text>
  </g>
</svg>`.trim();
}

// Write the master database
const masterWords = totalCombined.map((w, idx) => {
  return {
    id: w.id || `word_${idx + 1}`,
    word: w.word,
    lemma: w.lemma || w.word.replace(/^(de|het)\s+/, ''),
    article: w.article !== undefined ? w.article : (w.word.startsWith('de ') ? 'de' : w.word.startsWith('het ') ? 'het' : ''),
    category: w.category || 'Algemeen',
    translations: w.translations,
    example: w.example || '',
    svg: w.svg || generateSvgForWord(w)
  };
});

const jsonPath = path.join(__dirname, '..', 'data', 'words.json');
const jsPath = path.join(__dirname, '..', 'data', 'words.js');

fs.writeFileSync(jsonPath, JSON.stringify(masterWords, null, 2), 'utf-8');
console.log(`Successfully wrote ${masterWords.length} words to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Woorden Database (1350+ Woorden)
 * Generated: ${new Date().toISOString()}
 * Total words: ${masterWords.length}
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(masterWords, null, 2)};
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Successfully wrote ${masterWords.length} words to ${jsPath}`);
