const fs = require('fs');

const SCENARIOS = [
  // ===================== Pre-A1 =====================
  {
    level: "Pre-A1",
    topic: "Begroetingen",
    situation: "Ontmoeting in de ochtend",
    situation_translations: { ar: "تحية الصباح", ti: "ናይ ንግሆ ሰላምታ", om: "Nagaa ganamaa", so: "Kulan subaxeed", en: "Morning greeting" },
    audio_text: "Goedemorgen! Hoe gaat het met u?",
    audio_translations: { ar: "صباح الخير! كيف حالك؟", ti: "ከመይ ሓዲርኩም! ከመይ ኣለኹም፧", om: "Akkam bulte! Akkam jirtu?", so: "Subax wanaagsan! Sidee tahay?", en: "Good morning! How are you?" },
    correct: "Goedemorgen! Goed, dank u wel.",
    wrong: ["Mijn jas is blauw.", "Het is koud vandaag.", "Ik heb een fiets."],
    exp_nl: "Bij een vriendelijke begroeting antwoord je beleefd met 'Goedemorgen! Goed, dank u wel.'",
    exp_ar: "عند التحية الصباحية تجيب بلطف: 'صباح الخير! بخير، شكراً لك.'",
    exp_so: "U jawaab: 'Subax wanaagsan! Waan fiicanahay, mahadsanid.'"
  },
  {
    level: "Pre-A1",
    topic: "Winkelen",
    situation: "Afrekenen bij de kassa",
    situation_translations: { ar: "الدفع عند الكاشير", ti: "ኣብ ካሳ ምኽፋል", om: "Kaffaltii kaasaa", so: "Afrekenen kassa", en: "Checkout payment" },
    audio_text: "Wilt u de kassabon meenemen?",
    audio_translations: { ar: "هل تريد إيصال الشراء؟", ti: "ናይ ክፍሊት ወረቐት ትደሊ ዲኻ፧", om: "Nagahee barbaadduu?", so: "Ma rabtaa rasiidka?", en: "Would you like the receipt?" },
    correct: "Nee dank u, hoeft niet.",
    wrong: ["Ik heet Mohammed.", "Het is drie uur.", "Ik woon in Utrecht."],
    exp_nl: "Als de caissière vraagt naar de bon, zeg je 'Ja graag' of 'Nee dank u, hoeft niet.'",
    exp_ar: "عند السؤال عن الفاتورة، تجيب: 'لا شكراً، لا داعي.'",
    exp_so: "U jawaab: 'Maya mahadsanid, uma baahni.'"
  },
  {
    level: "Pre-A1",
    topic: "Kennismaking",
    situation: "Je naam noemen",
    situation_translations: { ar: "ذكر اسمك", ti: "ስምካ ምግላጽ", om: "Maqaa ofii himuu", so: "Magacaaga oo aad sheegto", en: "Stating your name" },
    audio_text: "Wat is jouw voornaam?",
    audio_translations: { ar: "ما هو اسمك الأول؟", ti: "ቀዳማይ ስምካ መን እዩ፧", om: "Maqaan kee jalqabaa eenyu?", so: "Waa maxay magacaaga koowaad?", en: "What is your first name?" },
    correct: "Mijn voornaam is Sara.",
    wrong: ["Ik ben dertig jaar oud.", "Ik woon in een appartement.", "Ik spreek Nederlands."],
    exp_nl: "Op de vraag naar je voornaam noem je direct je eigen voornaam.",
    exp_ar: "عند السؤال عن اسمك الأول، تذكر اسمك مباشرة.",
    exp_so: "Sheeg magacaaga koowaad si toos ah."
  },
  {
    level: "Pre-A1",
    topic: "Betalen",
    situation: "Vraag naar betaalwijze",
    situation_translations: { ar: "طريقة الدفع", ti: "ኣገባብ ክፍሊት", om: "Akkaataa kaffaltii", so: "Habka lacag bixinta", en: "Payment method" },
    audio_text: "Wilt u pinnen of contant betalen?",
    audio_translations: { ar: "بطاقة بنكية أم كاش؟", ti: "ብካርድ ወይስ ብጥረ ገንዘብ፧", om: "Kaardiidhaan moo callaadhaan?", so: "Kaar mise lacag caddaan ah?", en: "Card or cash?" },
    correct: "Pinnen alstublieft.",
    wrong: ["Hier is mijn adres.", "Ik heb een afspraak.", "Het brood is vers."],
    exp_nl: "Kies eenvoudig tussen 'Pinnen alstublieft' of 'Contant alstublieft.'",
    exp_ar: "اختر ببساطة: 'بالبطاقة من فضلك.'",
    exp_so: "Dheh: 'Kaar fadlan.'"
  },
  {
    level: "Pre-A1",
    topic: "Prijzen",
    situation: "Prijs van een product",
    situation_translations: { ar: "سعر المنتج", ti: "ዋጋ ኣቕሓ", om: "Gatii oomishaa", so: "Qiimaha badeecada", en: "Product price" },
    audio_text: "Dit brood kost twee euro en vijftig cent.",
    audio_translations: { ar: "هذا الخبز يكلف يوروين وخمسين سنتاً.", ti: "እዚ ባኒ ክልተ ኤውሮን ሓምሳ ሳንቲምን ይኸውን።", om: "Daabboon kun Yuuroo lamaafi saantima shantama.", so: "Rootigan qiimihiisu waa laba Yuuro iyo konton senti.", en: "This bread costs two euros and fifty cents." },
    correct: "Prima, ik neem het graag mee.",
    wrong: ["Ik ga naar huis lopen.", "Mijn verjaardag is morgen.", "Het regent hard buiten."],
    exp_nl: "Je bevestigt dat je het brood voor deze prijs koopt.",
    exp_ar: "تؤكد موافقتك على السعر وشراء الخبز.",
    exp_so: "Xaqiiji inaad rabto rootiga."
  },
  {
    level: "Pre-A1",
    topic: "Taalbegrip",
    situation: "Aangeven of je Nederlands spreekt",
    situation_translations: { ar: "توضيح معرفتك بالهولندية", ti: "ቋንቋ ዳች ምፍላጥካ ምግላጽ", om: "Afaan Daajii beekuu ibsuu", so: "Sheegida heerka afkaaga Hollandeeska", en: "Stating your Dutch language ability" },
    audio_text: "Spreekt u al een beetje Nederlands?",
    audio_translations: { ar: "هل تتحدث الهولندية قليلاً؟", ti: "ቊሩብ ዳች ትዛረብ ዲኻ፧", om: "Afaan Daajii xiqqoo ni dubbattaa?", so: "Ma ku hadashaa afka Hollandeeska wax yar?", en: "Do you speak a little Dutch?" },
    correct: "Ja, een klein beetje. Ik zit op taalles.",
    wrong: ["Het is vandaag woensdag.", "Ik heb een rode fiets.", "De supermarkt is open."],
    exp_nl: "Geef eerlijk aan dat je de Nederlandse taal nog aan het leren bent.",
    exp_ar: "وضح بصدق أنك في مرحلة تعلم اللغة الهولندية.",
    exp_so: "U sheeg inaad wax yar taqaano oo aad fasal dhigato."
  },
  {
    level: "Pre-A1",
    topic: "Contactgegevens",
    situation: "Telefoonnummer doorgeven",
    situation_translations: { ar: "إعطاء رقم الهاتف", ti: "ቁጽሪ ስልኪ ምሃብ", om: "Lakkoofsa bilbilaa kennuu", so: "Bixinta lambarka taleefanka", en: "Giving phone number" },
    audio_text: "Wat is uw telefoonnummer?",
    audio_translations: { ar: "ما هو رقم هاتفك؟", ti: "ቁጽሪ ስልክኻ ክንደይ እዩ፧", om: "Lakkoofsi bilbila keessanii meeqa?", so: "Waa maxay lambarkaaga taleefanka?", en: "What is your telephone number?" },
    correct: "Mijn nummer is nul-zes, één-twee-drie, vier-vijf-zes.",
    wrong: ["Ik eet graag rijst met kip.", "Het ziekenhuis is dichtbij.", "Ik ben om zes uur klaar."],
    exp_nl: "Noem je telefoonnummer duidelijk en rustig op.",
    exp_ar: "اذكر أرقام هاتفك بهدوء ووضوح.",
    exp_so: "Sheeg lambarkaaga si tartiib ah."
  },
  {
    level: "Pre-A1",
    topic: "Afscheid",
    situation: "Afscheid aan het einde van de dag",
    situation_translations: { ar: "الوداع في نهاية اليوم", ti: "ምስናባት ኣብ መወዳእታ መዓልቲ", om: "Nagaatti jechuu", so: "Sagootinta fiidkii", en: "Farewell at the end of the day" },
    audio_text: "Fijne avond en tot de volgende keer!",
    audio_translations: { ar: "أمسية سعيدة وإلى اللقاء في المرة القادمة!", ti: "ጽቡቕ ምሸት ይግበረልኩም፣ ንመጽኢ ንራኸብ!", om: "Galgala gaarii, hanga yeroo biraatti!", so: "Fiid wanaagsan, ilaa markale!", en: "Have a good evening and see you next time!" },
    correct: "Dank u wel, hetzelfde en tot ziens!",
    wrong: ["Ik drink graag koude melk.", "Hier is mijn sleutel.", "Het boek is erg zwaar."],
    exp_nl: "Wens de ander ook een fijne avond terug.",
    exp_ar: "تمنى للشخص الآخر أمسية سعيدة أيضاً.",
    exp_so: "U rajey qofka kale fiid wanaagsan sidoo kale."
  },

  // ===================== A1 =====================
  {
    level: "A1",
    topic: "Supermarkt",
    situation: "Locatie van een product vragen",
    situation_translations: { ar: "السؤال عن مكان المنتج", ti: "ኣቕሓ ኣበይ ከም ዘሎ ምሕታት", om: "Bakka oomishaa gaafachuu", so: "Weydiinta goobta badeecada", en: "Asking product location" },
    audio_text: "Pardon, weet u waar de verse melk staat?",
    audio_translations: { ar: "عذراً، هل تعرف أين يوجد الحليب الطازج؟", ti: "ይቕሬታ፣ ጸባ ኣበይ ኣሎ፧", om: "Dhiifama, aannani eessa jira?", so: "Iga raali noqo, meeday caanihii?", en: "Excuse me, do you know where the fresh milk is?" },
    correct: "Ja, achterin in het grote koelschap aan de linkerkant.",
    wrong: ["Nee, ik heb geen fiets.", "Het kost drie euro.", "Mijn verjaardag is in juli."],
    exp_nl: "Je wijst de vrager de juiste gang en het koelschap aan.",
    exp_ar: "تدل السائل على المكان الصحيح في قسم التبريد.",
    exp_so: "U tilmaan qaboojiyaha dukaanka dambe."
  },
  {
    level: "A1",
    topic: "Huisarts",
    situation: "Afspraak maken bij de dokter",
    situation_translations: { ar: "حجز موعد عند الطبيب", ti: "ምስ ሓኪም ቆጸራ ምሓዝ", om: "Doktora waliin beellama qabachuu", so: "Ballan qabsashada dhakhtarka", en: "Making doctor appointment" },
    audio_text: "Kunt u vanmiddag om kwart over drie langskomen bij de huisarts?",
    audio_translations: { ar: "هل يمكنك الحضور اليوم في الثالثة والربع بعد الظهر؟", ti: "ሎሚ ድሕሪ ቐትሪ ሰዓት 3:15 ክትመጽእ ትኽእል ዲኻ፧", om: "Har'a waaree booda sa'a 9:15tti dhufuu dandeessuu?", so: "Ma imaan kartaa galabta seddexda iyo rubuc?", en: "Can you come by the doctor at quarter past three this afternoon?" },
    correct: "Ja, dat schikt prima. Kwart over drie staat genoteerd.",
    wrong: ["Ik lust geen paracetamol.", "Mijn broer heeft een blauwe auto.", "Het regent nu buiten."],
    exp_nl: "Bevestig het tijdstip vriendelijk zodat de afspraak vaststaat.",
    exp_ar: "أكد الموعد بدقة لتدوينه في الجدول.",
    exp_so: "Xaqiiji waqtiga ballanta si fiican."
  },
  {
    level: "A1",
    topic: "Station",
    situation: "Kaartje kopen op het treinstation",
    situation_translations: { ar: "شراء تذكرة قطار", ti: "ትኬት ባቡር ምግዛእ", om: "Tikaata baaburaa bitachuu", so: "Iibsashada tigidhka tareenka", en: "Buying train ticket" },
    audio_text: "Wilt u een enkele reis of een dagretour naar Utrecht?",
    audio_translations: { ar: "تذكرة ذهاب فقط أم ذهاب وعودة؟", ti: "ናይ ሓደ ወገን ድዩ ወይ መመላለሲ፧", om: "Gama tokko moo deebii waliin?", so: "Hal dhinac mise socod iyo soo noqosho?", en: "Single journey or day return?" },
    correct: "Een dagretour graag, ik reis vanavond weer terug.",
    wrong: ["De trein is erg lang.", "Spoor twee alstublieft.", "Ik heb een warme jas aan."],
    exp_nl: "Als je dezelfde dag terugkeert, kies je een dagretour.",
    exp_ar: "تختار تذكرة ذهاب وعودة إذا كنت ستعود في نفس اليوم.",
    exp_so: "Dooro 'dagretour' haddii aad caawa soo noqonayso."
  },
  {
    level: "A1",
    topic: "Apotheek",
    situation: "Instructies voor medicijnen",
    situation_translations: { ar: "تعليمات تناول الدواء", ti: "መብርሂ መድሃኒት", om: "Qajeelfama qorichaa", so: "Tilmaanta daawada", en: "Medication instructions" },
    audio_text: "U moet dit tabletje tweemaal daags innemen na de maaltijd. Is dat duidelijk?",
    audio_translations: { ar: "تناول هذا القرص مرتين يومياً بعد الأكل، هل هذا واضح؟", ti: "እዚ ከኒና መዓልታዊ ክልተ ግዜ ድሕሪ ምግቢ ክትወስዶ ኣሎካ፣ ንጹር ድዩ፧", om: "Kiniinii kana guyyaatti yeroo lama nyaata booda fudhadhu, ifaadhaa?", so: "Kaniinigan laba jeer maalintii cuntada kadib qaado, ma caddahay?", en: "Take this tablet twice daily after meals. Is that clear?" },
    correct: "Ja heel duidelijk, dank u wel voor de uitleg.",
    wrong: ["Ik ga morgen op vakantie.", "Het water is erg koud.", "Mijn schoenen zijn nieuw."],
    exp_nl: "Bevestig dat je de medische instructies hebt begrepen.",
    exp_ar: "أكد أنك فهمت تعليمات الصيدلي بدقة.",
    exp_so: "U sheeg inaad fahamtay tilmaamaha."
  },
  {
    level: "A1",
    topic: "Kleding",
    situation: "Pasvorm beoordelen in kledingzaak",
    situation_translations: { ar: "قياس الملابس", ti: "ክዳን ምልካዕ", om: "Uffata yaaluu", so: "Tijaabinta dharka", en: "Trying on clothes" },
    audio_text: "Zit deze trui goed of wilt u een maatje groter passen?",
    audio_translations: { ar: "هل المقاس مناسب أم تريد تجربة مقاس أكبر؟", ti: "እዚ ስወተር ጽቡቕ ኮይኑካ ዲዩ ወይስ ዝዓበየ ትደሊ፧", om: "Kofiyaan kun si qabateera moo hamma guddaa barbaadda?", so: "Funaanadani ma kugu habboon tahay mise cabbir weyn ayaad doonaysaa?", en: "Does this sweater fit well or would you like to try a size larger?" },
    correct: "Deze maat zit perfect, ik neem hem graag.",
    wrong: ["Mijn telefoon is leeg.", "Het is vandaag vrijdag.", "Ik werk in een bakkerij."],
    exp_nl: "Vertel de verkoopmedewerker of de maat goed zit.",
    exp_ar: "أخبر البائع أن المقاس ملائم تماماً.",
    exp_so: "U sheeg cabbirka inuu ku fadhiyo."
  },
  {
    level: "A1",
    topic: "Horeca",
    situation: "Drankje bestellen op terras",
    situation_translations: { ar: "طلب مشروب", ti: "መስተ ምእዛዝ", om: "Dhugaatii ajajuu", so: "Dalbashada cabitaanka", en: "Ordering a drink" },
    audio_text: "Goedemiddag, wat kan ik voor u inschenken?",
    audio_translations: { ar: "مساء الخير، ماذا أصب لك للشرب؟", ti: "ከመይ ውዒልኩም፣ እንታይ ክቐድሓልኩም፧", om: "Akkam ooltan, maal isiniif dhangalaasu?", so: "Galab wanaagsan, maxaan idiin shubaa?", en: "Good afternoon, what can I get you to drink?" },
    correct: "Graag een kopje koffie met melk en een glas koud water.",
    wrong: ["De rekening was twintig euro.", "Ik moet zo de bus halen.", "Het ziekenhuis is aan het einde van de straat."],
    exp_nl: "Geef vriendelijk je drankbestelling door.",
    exp_ar: "اطلب مشروبك بأدب: قهوة بالحليب وكوب ماء.",
    exp_so: "Dalbo cabitaanka aad rabto."
  },

  // ===================== A2 =====================
  {
    level: "A2",
    topic: "Werk",
    situation: "Ziek melden bij leidinggevende",
    situation_translations: { ar: "الإبلاغ عن المرض للمشرف", ti: "ምሕማምካ ንሓላፊኻ ምሕባር", om: "Dhukkubsachuu beeksisuu", so: "Xanuunka oo madaxa shaqada loo sheego", en: "Reporting sick to supervisor" },
    audio_text: "Hallo, met Jan. Ik hoor dat je ziek bent. Lukt het om morgen weer te werken?",
    audio_translations: { ar: "مرحباً، معك يان. سمعت أنك مريض، هل تستطيع العمل غداً؟", ti: "ሰላም ጃን እየ። ጽባሕ ክትሰርሕ ትኽእል ዲኻ፧", om: "Akkam, Yaaniin jira. Bor hojjechuu dandeessaa?", so: "Halo, waa Jan. Ma awoodi kartaa inaad berrito shaqeyso?", en: "Hello, Jan speaking. Will you be able to work tomorrow?" },
    correct: "Nee helaas, ik heb nog koorts. Ik bel morgenochtend even met een update.",
    wrong: ["Ja, ik neem twee broodjes mee.", "Ik heb gisteren mijn contract getekend.", "Het regent erg hard vandaag."],
    exp_nl: "Meld duidelijk dat je nog ziek bent en wanneer je weer contact opneemt.",
    exp_ar: "أخبر مديرك أنك لا تزال مريضاً وستتصل به صباحاً.",
    exp_so: "U sheeg inaad wali qandho leedahay oo aad berrito la soo hadli doonto."
  },
  {
    level: "A2",
    topic: "Wonen",
    situation: "Afspraak maken voor verwarmingsreparatie",
    situation_translations: { ar: "موعد صيانة التدفئة", ti: "ቆጸራ ጽገና ሙቐት", om: "Beellama suphaa ho'isaa", so: "Ballanta hagaajinta kuleyliyaha", en: "Boiler repair appointment" },
    audio_text: "Schikt het als de monteur morgenochtend om half tien langskomt voor de ketel?",
    audio_translations: { ar: "هل يناسبك قدوم الفني غداً التاسعة والنصف؟", ti: "እቲ ሰራሕተኛ ጽባሕ ንግሆ ሰዓት 9:30 እንተመጺኡ ይጥዕመካ ድዩ፧", om: "Ogeessi boru ganama sa'a 9:30 dhufuu danda'aa?", so: "Ma kugu habboon tahay berrito sagaal iyo badhka?", en: "Does tomorrow at 9:30 work for the boiler repair?" },
    correct: "Ja prima, dan ben ik thuis. Kunt u van tevoren even bellen?",
    wrong: ["De ketel is gemaakt van zilver.", "Mijn buurman heeft een hond.", "Ik vind de winter te koud."],
    exp_nl: "Bevestig de tijd en vraag beleefd of de monteur kort voor aankomst belt.",
    exp_ar: "أكد الموعد واطلب منه الاتصال قبل الحضور بقليل.",
    exp_so: "Xaqiiji waqtiga oo weydii inuu soo waco ka hor intaanu imaan."
  },
  {
    level: "A2",
    topic: "Gemeente",
    situation: "Paspoort ophalen of aanvragen",
    situation_translations: { ar: "طلب جواز السفر بالبلدية", ti: "ፓስፖርት ኣብ ምምሕዳር ከተማ ምሕታት", om: "Paaspoortii gaafachuu", so: "Codsashada baasaboorka", en: "Passport application" },
    audio_text: "Heeft u een recente pasfoto en uw oude paspoort bij u?",
    audio_translations: { ar: "هل معك صورة شخصية حديثة وجوازك القديم؟", ti: "ናይ ቀረባ ግዜ ስእልን ኣረጊት ፓስፖርትካን ሒዝካ መጺእካ ዲኻ፧", om: "Suuraa dhiyoo fi paaspoortii moofaa qabattee dhuftee?", so: "Ma wadataa sawir cusub iyo baasaboorkii hore?", en: "Do you have a recent photo and your old passport?" },
    correct: "Jazeker, hier zijn mijn oude paspoort en twee officiële pasfoto's.",
    wrong: ["Ik reis vaak met de bus.", "Het gemeentehuis is erg groot.", "Ik heb een nieuwe fiets gekocht."],
    exp_nl: "Toon de vereiste documenten netjes aan de baliemedewerker.",
    exp_ar: "قدم الوثائق المطلوبة للموظف المختص.",
    exp_so: "U dhiib dukumeentiyada loo baahan yahay."
  },
  {
    level: "A2",
    topic: "School",
    situation: "Kind ziek melden bij schooladministratie",
    situation_translations: { ar: "الإبلاغ عن غياب التلميذ", ti: "ምሕማም ተምሃራይ ምሕባር", om: "Barataa dhukkubsate beeksisuu", so: "U sheegida dugsiga in ardaygu xanuunsan yahay", en: "Reporting pupil sick to school" },
    audio_text: "Basisschool De Regenboog, goedemorgen. Met wie spreek ik?",
    audio_translations: { ar: "مدرسة ريخنبوه الابتدائية، صباح الخير، من المتحدث؟", ti: "ቤት ትምህርቲ ደ ሬገንቦኽ፣ ከመይ ሓዲርኩም፧ መን ይዛረብ ኣሎ፧", om: "Mana barumsaa De Regenboog, akkam bultan, eenyu faana dubbanna?", so: "Dugsiga De Regenboog, subax wanaagsan, yaa hadlaya?", en: "Primary school De Regenboog, good morning. Who is speaking?" },
    correct: "Goedemorgen, met de vader van Omar. Hij heeft koorts en kan vandaag niet komen.",
    wrong: ["De speeltuin is heel groot.", "Omar houdt van appelsap.", "De klok slaat twaalf."],
    exp_nl: "Stel jezelf voor als ouder en geef de reden van afwezigheid door.",
    exp_ar: "عرّف بنفسك كولي أمر وأخبرهم بسبب غياب طفلك.",
    exp_so: "Isku sheeg waalidka ardayga oo sheeg sababta maqnaanshaha."
  },
  {
    level: "A2",
    topic: "Buren",
    situation: "Pakketje voor de buren aannemen",
    situation_translations: { ar: "استلام طرد للجار", ti: "ፓኬት ንጎረቤት ምቕባል", om: "Waraqaa poostaa ollaa fudhachuu", so: "U qabashada xirmada deriska", en: "Accepting package for neighbors" },
    audio_text: "Goedemiddag! De buren op nummer 14 zijn niet thuis. Zou u dit pakketje voor hen willen aannemen?",
    audio_translations: { ar: "مساء الخير، جيرانك في رقم 14 ليسوا بالمنزل، هل يمكنك استلام الطرد؟", ti: "ጎረቤት ቁጽሪ 14 የለዉን፣ እዚ ፓኬት ክትቅበለሎም ትኽእል ዲኻ፧", om: "Ollaan lakkoofsa 14 hin jiran, poostaa kana isaaniif fudhachuu dandeessuu?", so: "Deriska lambarka 14 ma joogaan, ma u qaban kartaa xirmadan?", en: "Neighbors at number 14 are out. Could you take this package for them?" },
    correct: "Ja natuurlijk, geen probleem. Ik zet het in de gang en geef het vanavond.",
    wrong: ["Ik lust geen kaas.", "Mijn fiets staat in de schuur.", "Het is erg mistig buiten."],
    exp_nl: "Accepteer het verzoek vriendelijk en beloof het door te geven.",
    exp_ar: "وافق بلطف على استلام الطرد لجيرانك.",
    exp_so: "U ogolow si naxariis leh oo balanqaad inaad u dhiibayso."
  },

  // ===================== B1 =====================
  {
    level: "B1",
    topic: "Onderwijs",
    situation: "Oudergesprek over rapport",
    situation_translations: { ar: "اجتماع تقييم درجات التلميذ", ti: "ምይይጥ ብዛዕባ ጸብጻብ ትምህርቲ", om: "Marii gabaasa barnootaa", so: "Wada-hadalka dugsiga ee ilmaha", en: "Parent-teacher conference" },
    audio_text: "Uw dochter boekt veel vooruitgang met taal, maar rekenen vraagt extra oefening. Hoe pakt u dat thuis aan?",
    audio_translations: { ar: "ابنتكم تتقدم باللغة ولكن الحساب يتطلب تمريناً إضافياً، كيف تدربونها بالمنزل؟", ti: "ጓልኹም ኣብ ቋንቋ ጽቡቕ ትኸይድ ኣላ፣ ኣብ ቊጽሪ ግን ሓገዝ የድልያ። ኣብ ገዛ እንታይ ትገብሩ፧", om: "Intalli keessan afaaniin gaarii dha, garuu herreegi shaakala barbaada. Manatti akkamitti gootu?", so: "Gabadhaadu horumar fiican bay ka sameysay luqadda laakiin xisaabta ayaa layli u baahan. Guriga sideed u caawisaan?", en: "Your daughter progresses well in language, but math needs extra practice. How do you approach this at home?" },
    correct: "We oefenen dagelijks een kwartier samen en gebruiken sommenkaartjes. Heeft u nog specifieke tips?",
    wrong: ["De zomervakantie duurt zes weken.", "De speeltuin in de wijk is vernieuwd.", "Mijn horloge loopt vijf minuten achter."],
    exp_nl: "Beschrijf je thuisstudie constructief en vraag de leraar om gerichte suggesties.",
    exp_ar: "اشرح خطوات المتابعة بالمنزل واطلب نصائح محددة من المعلم.",
    exp_so: "Sharax sida aad guriga ugu caawiso oo weydii macallinka talooyin."
  },
  {
    level: "B1",
    topic: "Werk",
    situation: "Projecttaak verdelen bij een deadline",
    situation_translations: { ar: "توزيع مهام العمل", ti: "ምምቃል ዕዮታት ስራሕ", om: "Hojii qooddachuu", so: "Qeybsiga hawlaha shaqada", en: "Work task allocation" },
    audio_text: "Wie kan deze kwartaalrapportage afronden voor de directievergadering van aanstaande donderdag?",
    audio_translations: { ar: "من يستطيع إنهاء تقرير الربع السنوي قبل اجتماع الإدارة يوم الخميس؟", ti: "እዚ ናይ ርብዒ ዓመት ጸብጻብ ቅድሚ ሓሙስ ኣኼባ ኣመራርሓ መን ኪውድኦ ይኽእል፧", om: "Gabaasa kana walgahii hoogganaaf eenyutu xumura?", so: "Yaa warbixintan dhammaystiri kara ka hor kulanka maamulka?", en: "Who can finish this quarterly report before Thursday's board meeting?" },
    correct: "Ik kan het woensdagmiddag gereed hebben als Sarah mij de actuele verkoopcijfers aanlevert.",
    wrong: ["Het weer is nogal wisselvallig deze week.", "De koffiemachine op de gang is buiten gebruik.", "Ik eet tussen de middag een salade."],
    exp_nl: "Neem proactief verantwoordelijkheid met een realistische voorwaarde.",
    exp_ar: "بادر بتحمل المسؤولية واذكر الشرط اللازم لإنجاز التقرير في الموعد.",
    exp_so: "Qabo hawsha adoo sheegaya xogta aad uga baahan tahay saaxiibadaa."
  },
  {
    level: "B1",
    topic: "Klantenservice",
    situation: "Onjuiste abonnementsfactuur betwisten",
    situation_translations: { ar: "الاعتراض على فاتورة اشتراك خاطئة", ti: "ጌጋ ደረሰኝ ምእራም", om: "Kaffaltii dogoggoraa sirreessuu", so: "Saxidda qaansheegad khaldan", en: "Disputing incorrect subscription invoice" },
    audio_text: "U geeft aan dat er te veel kosten in rekening zijn gebracht. Heeft u uw abonneenummer bij de hand?",
    audio_translations: { ar: "ذكرت أنه تم احتساب مبالغ زائدة، هل رقم اشتراكك معك؟", ti: "ተወሳኺ ክፍሊት ተወሲዱ ኢልካና፣ ቁጽሪ ዓሚልካ ኣሎካ ዲዩ፧", om: "Kaffaltiin dabalataa kaffalame jettaniiru, lakkoofsa maamilaa qabduu?", so: "Waxaad sheegtay in lacag dheeraad ah lagaa jaray, ma haysataa lambarkaaga macaamiilka?", en: "You state excess costs were billed. Do you have your subscriber number handy?" },
    correct: "Jazeker, mijn abonneenummer is 54219. Het gefactureerde bedrag wijkt af van mijn contract.",
    wrong: ["Mijn computer start soms langzaam op.", "Ik kijk graag naar het journaal.", "De postbode bezorgt om twaalf uur."],
    exp_nl: "Geef zakelijk je klantgegevens en leg de afwijking helder uit.",
    exp_ar: "قدم رقم اشتراكك بوضوح واشرح الفارق بين الفاتورة والعقد.",
    exp_so: "U sheeg lambarkaaga macaamiilka iyo sababta ay qaldan tahay lacagtu."
  },

  // ===================== B2 =====================
  {
    level: "B2",
    topic: "Onderhandelen",
    situation: "Coulanceregeling na vertraging voorstellen",
    situation_translations: { ar: "اقتراح تسوية للعميل بسبب التأخير", ti: "ካሕሳ ምቕራብ", om: "Gufannaa hiikuu", so: "Soo jeedinta heshiis macaamiilka", en: "Proposing goodwill settlement after delay" },
    audio_text: "De klant is begrijpelijkerwijs ontstemd over de opgelopen vertraging. Welke coulanceregeling stellen we voor om de relatie te behouden?",
    audio_translations: { ar: "العميل مستاء ومحق في ذلك، ما التسوية الودية للحفاظ على العلاقة؟", ti: "እቲ ዓሚል ብምድንጓይ ተቖጢዑ ኣሎ፣ እንታይ ካሕሳ ንሃቦ፧", om: "Maamilli sababa tursiisaatiin aareera, furmaata maali dhiheessina?", so: "Macaamiilku wuu xanaaqsan yahay dib u dhaca darteed, maxaan ugu magdhawnaa?", en: "Client is understandably upset about the delay. What settlement do we propose to maintain relationship?" },
    correct: "Ik stel voor om de transportkosten volledig kwijt te schelden en tien procent korting op de volgende order te bieden.",
    wrong: ["We wachten rustig af tot de klant zelf een email stuurt.", "Iedereen maakt wel eens een foutje op vrijdagmiddag.", "We kunnen de telefoonlijn voor vandaag afsluiten."],
    exp_nl: "Formuleer een professionele en proportionele compensatie om de klanttevredenheid te herstellen.",
    exp_ar: "اقترح تعويضاً تجارياً مناسباً يحفظ استمرار التعاون مع العميل.",
    exp_so: "Soo jeedi magdhaw ku habboon oo macaamiilka lagu qanciyo."
  },
  {
    level: "B2",
    topic: "Arbeidsvoorwaarden",
    situation: "Verandering van thuiswerkbeleid bespreken",
    situation_translations: { ar: "مناقشة سياسة الحضور المكتبي", ti: "ፖሊሲ ምስራሕ ምይይጥ", om: "Qajeelfama hojii mari'achuu", so: "Dood ku saabsan imaanshaha xafiiska", en: "Discussing office attendance policy" },
    audio_text: "Het bestuur overweegt om werknemers te verplichten weer minimaal vier dagen per week naar kantoor te komen. Wat is jouw visie hierop?",
    audio_translations: { ar: "تفكر الإدارة في إلزام الموظفين بالحضور أربعة أيام أسبوعياً إلى المكتب. ما رأيك؟", ti: "ኣመራርሓ ሰራሕተኛታት ኣብ ሰሙን 4 መዓልቲ ናብ ቤት ጽሕፈት ክመጹ ይደሊ ኣሎ። ርእይቶኻ እንታይ እዩ፧", om: "Hoogganaan guyyoota waajjiraa afuritti guddisuu barbaada, yaadni kee maali?", so: "Maamulku wuxuu doonayaa in 4 maalmood xafiiska la yimaado. Maxay kula tahay?", en: "Management considers requiring staff in office 4 days a week. What is your perspective?" },
    correct: "Een hybride model van twee tot drie kantoordagen biedt meer flexibiliteit en behoudt tegelijkertijd de teamcohesie.",
    wrong: ["Ik ga liever met vakantie naar Zuid-Frankrijk.", "Mijn buurman werkt in de bouwsector.", "Kantoorstoelen zijn over het algemeen vrij comfortabel."],
    exp_nl: "Onderbouw een evenwichtig standpunt met steekhoudende argumenten over productiviteit en samenwerking.",
    exp_ar: "اطرح وجهة نظر متوازنة تبرز مزايا النموذج الهجين لإنتاجية الفريق.",
    exp_so: "Dhiibo fikir ku dhisan dheellitirka shaqada iyo nolosha gaarka ah."
  },

  // ===================== C1 =====================
  {
    level: "C1",
    topic: "Duurzaamheidsstrategie",
    situation: "Rendement van verduurzamingsinvesteringen evalueren",
    situation_translations: { ar: "تقييم العائد الاستثماري لمشاريع الاستدامة", ti: "ወፍሪ ጸዓት ምምዛን", om: "Investimantii madaalluu", so: "Qiimeynta maalgashiga cagaaran", en: "Evaluating sustainability ROI" },
    audio_text: "Hoe verhouden de initiële transitiekosten zich tot het langetermijnrendement van dit grootschalige verduurzamingsproject?",
    audio_translations: { ar: "كيف توازن التكاليف الأولية للتحول مع العائد طويل الأجل لمشروع الاستدامة هذا؟", ti: "እቲ ናይ መጀመርታ ወጻኢታት ምስ ናይ ነዊሕ እዋን ረብሓ ብኸመይ ይነጻጸር፧", om: "Baasiin duraa fi qusannaan yeroo dheeraa akkamitti walsimu?", so: "Sidee bay isugu dheellitiran yihiin kharashka bilowga iyo faa'iidada fog?", en: "How do initial transition costs compare to long-term returns of this sustainability project?" },
    correct: "Hoewel de kapitaalinvestering substantieel is, compenseren de structurele energiereductie en fiscale voordelen dit ruimschoots binnen zeven jaar.",
    wrong: ["Zonnepanelen zien er glimmend uit op een schuin dak.", "We moeten voor morgenmiddag nieuwe pennen bestellen.", "Ik heb gelezen dat het klimaat verandert."],
    exp_nl: "Gebruik genuanceerd economisch idioom om de balans tussen Capex en langetermijnrendement te duiden.",
    exp_ar: "استخدم لغة اقتصادية رفيعة تشرح الجدوى المالية للتحول المستدام.",
    exp_so: "Sharax sida maalgashigan muddada dheer u soo celinayo kharashkiisa."
  },

  // ===================== C2 =====================
  {
    level: "C2",
    topic: "Bestuursrecht & Ethiek",
    situation: "Discretionaire bevoegdheid bij geautomatiseerde besluitvorming",
    situation_translations: { ar: "السلطة التقديرية في القرارات الحكومية المؤتمتة", ti: "ግሉጽነት ኣብ ውሳነታት ኣልጎሪዝም", om: "Iftoomina murtii teeknooloojii", so: "Furfurnaanta go'aannada nidaamyada casriga ah", en: "Discretionary authority in automated decision making" },
    audio_text: "In hoeverre legitimeert technologische efficiëntie de inperking van discretionaire bevoegdheid bij ingrijpende overheidsbesluiten?",
    audio_translations: { ar: "إلى أي مدى تبرر الكفاءة التكنولوجية تقليص السلطة التقديرية في القرارات الحكومية؟", ti: "ቴክኖሎጂያዊ ቅልጣፈ ንሰብኣዊ ውሳነታት ክሳብ ክንደይ የጽድቖ፧", om: "Saffisni teeknooloojii murteewwan hamma maaliitti fudhatama qaba?", so: "Ilaa heerkee ayay wax ku oolnimada tignoolajiyadu xalaalayn kartaa xaddidaadda go'aanka aadanaha?", en: "To what extent does technological efficiency legitimize restricting discretionary authority in major public decisions?" },
    correct: "Efficiëntie mag nimmer ten koste gaan van de menselijke maat en het constitutionele recht op een transparante, individuele belangenafweging.",
    wrong: ["Computersystemen werken meestal met binaire nullen en enen.", "De printer op kantoor moet regelmatig worden herstart.", "Kantoormedewerkers drinken vaak koffie in de pauze."],
    exp_nl: "Formuleer een diepgaand staatsrechtelijk en ethisch standpunt in vlekkeloos, hoogwaardig Nederlands.",
    exp_ar: "قدم صياغة دستورية وفلسفية رفيعة المستوى تؤكد على سيادة العدالة الإنسانية فوق الآلة.",
    exp_so: "Ka dhiibo dood qotodheer oo ilaalinaysa caddaaladda iyo xuquuqda aasaasiga ah."
  }
];

function shuffleArray(arr) {
  const res = [...arr];
  for (let i = res.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [res[i], res[j]] = [res[j], res[i]];
  }
  return res;
}

// Convert into complete, randomized items with NO duplicates
const cleanItems = SCENARIOS.map((base, idx) => {
  const options = shuffleArray([base.correct, ...base.wrong]);
  const correctIdx = options.indexOf(base.correct);

  return {
    id: `resp_${base.level.toLowerCase().replace('-', '')}_${String(idx + 1).padStart(3, '0')}`,
    level: base.level,
    topic: base.topic,
    situation: base.situation,
    situation_translations: base.situation_translations,
    audio_text: base.audio_text,
    audio_translations: base.audio_translations,
    options: options,
    correct_index: correctIdx,
    explanations: {
      nl: base.exp_nl,
      ar: base.exp_ar,
      ti: base.exp_nl,
      om: base.exp_nl,
      so: base.exp_so,
      en: base.exp_nl
    }
  };
});

// Randomize order of items
const randomizedUniqueList = shuffleArray(cleanItems);

['data/respond.json', 'src/data/respond.json'].forEach(file => {
  fs.writeFileSync(file, JSON.stringify(randomizedUniqueList, null, 2), 'utf8');
  console.log(`Saved ${randomizedUniqueList.length} unique, randomized scenarios to ${file}`);
});
