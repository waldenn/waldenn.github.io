const fs = require('fs');

const SCENARIOS = [
  // --- PRE-A1 ---
  {
    level: "Pre-A1",
    topic: "Begroetingen",
    situation: "Ontmoeting in de ochtend",
    situation_translations: { ar: "تحية الصباح", ti: "ናይ ንግሆ ሰላምታ", om: "Nagaa ganamaa", so: "Kulan subaxeed", en: "Morning greeting" },
    audio_text: "Goedemorgen! Hoe gaat het?",
    audio_translations: { ar: "صباح الخير! كيف حالك؟", ti: "ከመይ ሓዲርኩም! ከመይ ኣለኹም፧", om: "Akkam bulte! Akkam jirtu?", so: "Subax wanaagsan! Sidee tahay?", en: "Good morning! How are you?" },
    correct: "Goedemorgen! Goed, dank u wel.",
    wrong: ["Mijn jas is zwart.", "Het regent buiten.", "Ik heb twee katten."],
    exp_nl: "Als iemand je 'Goedemorgen! Hoe gaat het?' wenst, antwoord je beleefd met 'Goedemorgen! Goed, dank u wel.'",
    exp_ar: "عندما يقول لك شخص 'صباح الخير! كيف حالك؟' ترد بلباقة: 'صباح الخير! بخير، شكراً لك.'",
    exp_so: "Marka qof ku dhaho 'Subax wanaagsan! Sidee tahay?', waxaad ugu jawaabtaa: 'Subax wanaagsan! Waan fiicanahay, mahadsanid.'"
  },
  {
    level: "Pre-A1",
    topic: "Winkelen",
    situation: "Afrekenen bij de kassa",
    situation_translations: { ar: "الدفع عند صندوق المحاسبة", ti: "ኣብ ካሳ ምኽፋል", om: "Kaffaltii kaasaa", so: "Lacag-bixinta khasnada", en: "Paying at checkout" },
    audio_text: "Wilt u de kassabon meenemen?",
    audio_translations: { ar: "هل ترغب في أخذ الإيصال؟", ti: "ናይ ክፍሊት ወረቐት ክትወስድ ትደሊ ዲኻ፧", om: "Nagahee fudhachuu barbaadduu?", so: "Ma rabtaa inaad qaadato rasiidka?", en: "Would you like the receipt?" },
    correct: "Nee, dank u wel, hoeft niet.",
    wrong: ["Ik heet Ahmed.", "Het is drie uur.", "Ik woon in Rotterdam."],
    exp_nl: "De caissière vraagt of je de bon wilt. Je antwoordt met 'Ja, graag' of 'Nee, dank u wel, hoeft niet.'",
    exp_ar: "تسألك المحاسبة إذا كنت تريد الإيصال. تجيب بـ 'لا، شكراً لك، لا داعي.'",
    exp_so: "Khasnajiiga ayaa ku weydiinaya rasiidka. Waxaad ku jawaabaysaa 'Maya, mahadsanid, uma baahni.'"
  },
  {
    level: "Pre-A1",
    topic: "Kennismaking",
    situation: "Je naam vertellen",
    situation_translations: { ar: "التعريف بالاسم", ti: "ስምካ ምግላጽ", om: "Maqaa ofii himuu", so: "Magacaaga oo aad sheegto", en: "Stating your name" },
    audio_text: "Wat is jouw naam?",
    audio_translations: { ar: "ما اسمك؟", ti: "መን እዩ ስምካ፧", om: "Maqaan kee eenyu?", so: "Magacaa?", en: "What is your name?" },
    correct: "Mijn naam is Fatima.",
    wrong: ["Ik ben dertig jaar.", "Ik kom uit Syrië.", "Ik spreek een beetje Nederlands."],
    exp_nl: "Op de vraag 'Wat is jouw naam?' antwoord je met 'Mijn naam is...' of 'Ik ben...'.",
    exp_ar: "عند السؤال 'ما اسمك؟' تبدأ الإجابة بـ 'اسمي هو...'",
    exp_so: "Marka su'aashu tahay 'Magacaa?', waxaad ku jawaabtaa 'Magacaygu waa...'"
  },
  {
    level: "Pre-A1",
    topic: "Betalen",
    situation: "Betaalwijze kiezen in de winkel",
    situation_translations: { ar: "اختيار طريقة الدفع", ti: "ኣገባብ ክፍሊት ምምራጽ", om: "Akkaataa kaffaltii filachuu", so: "Doorashada qaabka lacag-bixinta", en: "Choosing payment method" },
    audio_text: "Wilt u pinnen of contant betalen?",
    audio_translations: { ar: "هل تريد الدفع بالبطاقة أم نقداً؟", ti: "ብካርድ ዲኻ ወይ ብጥረ ገንዘብ ክትከፍል ትደሊ፧", om: "Kaardiidhaan moo callaadhaan kaffaluu barbaaddu?", so: "Ma kaar ayaad ku bixinaysaa mise lacag caddaan ah?", en: "Would you like to pay by card or cash?" },
    correct: "Ik wil graag pinnen, alstublieft.",
    wrong: ["Alstublieft, hier is mijn paspoort.", "Ik kom morgen terug.", "Ik lust geen koffie."],
    exp_nl: "Als gevraagd wordt naar je betaalwijze, kies je 'Pinnen graag' of 'Contant graag'.",
    exp_ar: "عند الاختيار بين الدفع بالبطاقة أو نقداً، تقول: 'بالبطاقة من فضلك.'",
    exp_so: "Dooro 'Kaar fadlan' ama 'Lacag caddaan ah fadlan'."
  },
  {
    level: "Pre-A1",
    topic: "Afscheid",
    situation: "Prettig weekend wensen op vrijdag",
    situation_translations: { ar: "التمنيات بعطلة نهاية أسبوع سعيدة", ti: "ጽቡቕ ቀዳመ-ሰንበት ምምናይ", om: "Ayyaana dhuma torbanii gaarii hawwuu", so: "U rajeynta dhammaad toddobaad wanaagsan", en: "Wishing a nice weekend" },
    audio_text: "Fijn weekend en tot maandag!",
    audio_translations: { ar: "عطلة نهاية أسبوع سعيدة وإلى اللقاء يوم الاثنين!", ti: "ጽቡቕ ቀዳመ-ሰንበት ይግበረልኩም፣ ሰኑይ ንራኸብ!", om: "Dhuma torbanii gaarii, hanga wiixataatti!", so: "Dhammaad toddobaad wanaagsan, ilaa Isniinta!", en: "Have a nice weekend and see you Monday!" },
    correct: "Dank u wel, hetzelfde!",
    wrong: ["Nee, het is dinsdag.", "Ik neem twee broden mee.", "Pardon, waar is de uitgang?"],
    exp_nl: "Wanneer iemand je een fijn weekend wenst, zeg je vriendelijk 'Dank u wel, hetzelfde!'.",
    exp_ar: "عند تمني عطلة سعيدة، الجواب اللطيف هو 'شكراً لك، ولك أيضاً!'.",
    exp_so: "U jawaab 'Mahadsanid, adigana sidoo kale!'"
  },
  {
    level: "Pre-A1",
    topic: "Beleefdheid",
    situation: "Iemand bedanken voor hulp",
    situation_translations: { ar: "شكر شخص على المساعدة", ti: "ንሓገዝ ምምስጋን", om: "Gargaarsaaf galateeffachuu", so: "U mahadcelinta qof ku caawiyay", en: "Thanking someone for help" },
    audio_text: "Alsjeblieft, hier is je tas.",
    audio_translations: { ar: "تفضل، ها هي حقيبتك.", ti: "እንካ፣ ቦርሳኻ እንሆ።", om: "Kunoo, boorsaan kee kana.", so: "Waa kan, boorsadaadii waa tan.", en: "Here you go, here is your bag." },
    correct: "Dank u wel!",
    wrong: ["Tot ziens morgen.", "Ik heet Ali.", "Hoe laat is het?"],
    exp_nl: "Als iemand je iets overhandigt met 'Alsjeblieft', zeg je 'Dank je wel' of 'Dank u wel'.",
    exp_ar: "عندما يعطيك شخص شيئاً قائلاً 'تفضل'، ترد بـ 'شكراً جزيلاً!'.",
    exp_so: "Marka wax lagu siiyo waxaad dhahdaa 'Mahadsanid!'."
  },
  {
    level: "Pre-A1",
    topic: "Kennismaking",
    situation: "Vragen waar je vandaan komt",
    situation_translations: { ar: "السؤال عن بلد الأصل", ti: "ካበይ ከም ዝመጻእካ ምሕታት", om: "Biyya dhalootaa gaafachuu", so: "Weydiinta meesha aad ka timid", en: "Asking where you are from" },
    audio_text: "Waar kom je vandaan?",
    audio_translations: { ar: "من أين أنت؟", ti: "ካበይ መጺእካ፧", om: "Eessaa dhufte?", so: "Xaggee ka timid?", en: "Where do you come from?" },
    correct: "Ik kom uit Syrië.",
    wrong: ["Ik ben om vier uur klaar.", "Ja, graag een tasje.", "Mijn fiets staat buiten."],
    exp_nl: "Op de vraag 'Waar kom je vandaan?' noem je het land waar je geboren bent.",
    exp_ar: "عند السؤال عن بلد المنشأ، تذكر اسم بلدك: 'أنا من سوريا.'",
    exp_so: "Ka jawaab adoo sheegaya dalkaaga: 'Waxaan ka imid...'"
  },
  {
    level: "Pre-A1",
    topic: "Winkelen",
    situation: "Een tasje nodig bij de boodschappen",
    situation_translations: { ar: "طلب كيس تسوق", ti: "ፌስታል ምሕታት", om: "Koroojoo gaafachuu", so: "Weydiinta bacda wax lagu qaato", en: "Asking for a shopping bag" },
    audio_text: "Wilt u er een tasje bij?",
    audio_translations: { ar: "هل تريد كيساً مع المشتريات؟", ti: "ፌስታል ክትወስድ ትደሊ ዲኻ፧", om: "Koroojoo barbaadduu?", so: "Ma rabtaa bac?", en: "Would you like a bag with that?" },
    correct: "Ja graag, alstublieft.",
    wrong: ["Ik woon in Utrecht.", "Ik spreek Arabisch.", "Goedemorgen meneer."],
    exp_nl: "Als je een tasje nodig hebt, antwoord je: 'Ja graag, alstublieft.'",
    exp_ar: "إذا كنت بحاجة إلى كيس، تقول: 'نعم من فضلك.'",
    exp_so: "Haddii aad u baahan tahay bac dhaha: 'Haa fadlan.'"
  },

  // --- A1 ---
  {
    level: "A1",
    topic: "Supermarkt",
    situation: "Zoeken naar een product in de winkel",
    situation_translations: { ar: "البحث عن منتج في المتجر", ti: "ኣብ ድኳን ኣቕሓ ምድላይ", om: "Suuqii keessatti oomisha barbaaduu", so: "Raadinta badeecad dukaanka dhexdiisa", en: "Finding a product in store" },
    audio_text: "Pardon, weet u waar de verse melk staat?",
    audio_translations: { ar: "عذراً، هل تعرف أين يوجد الحليب الطازج؟", ti: "ይቕሬታ፣ ጸባ ኣበይ ከም ዘሎ ትፈልጥ ዲኻ፧", om: "Dhiifama, aannani eessa akka jiru beektuu?", so: "Iga raali noqo, ma ogtahay meesha caanaha yaallaan?", en: "Excuse me, do you know where the fresh milk is?" },
    correct: "Ja, in het koelschap achterin de winkel.",
    wrong: ["Nee, ik heb geen fiets.", "Het kost drie euro per kilo.", "Mijn verjaardag is in juli."],
    exp_nl: "De vraagsteller zoekt de melk. Je wijst de juiste locatie aan: achterin in het koelschap.",
    exp_ar: "السائل يبحث عن الحليب، تدله على المكان: في الثلاجة في الجزء الخلفي من المتجر.",
    exp_so: "Qofka wuxuu raadinayaa caano, u tilmaan qaboojiyaha dukaanka dambe."
  },
  {
    level: "A1",
    topic: "Huisarts",
    situation: "Klachten omschrijven bij de dokter",
    situation_translations: { ar: "وصف الشكوى عند الطبيب", ti: "ሕማምካ ንሓኪም ምግላጽ", om: "Dhukkubbi ofii doktoraatti himuu", so: "Sharaxaadda xanuunka dhakhtarka hortiisa", en: "Describing symptoms to doctor" },
    audio_text: "Waar heeft u precies last van vandaag?",
    audio_translations: { ar: "من ماذا تعاني بالضبط اليوم؟", ti: "ሎሚ ብልክዕ እንታይ ሓሚምካ፧", om: "Har'a maaltu si dhukkuba?", so: "Maxaa ku haya maanta?", en: "What seems to be the problem today?" },
    correct: "Ik heb sinds gisteren erge keelpijn en koorts.",
    wrong: ["Ik woon al twee jaar in Nederland.", "Mijn afspraak was om twee uur.", "Ik eet graag groenten en fruit."],
    exp_nl: "Bij de dokter omschrijf je je fysieke klachten: keelpijn en koorts.",
    exp_ar: "عند الطبيب تصف الأعراض المرضية: 'لدي ألم شديد في الحلق وحمى منذ الأمس.'",
    exp_so: "U sharax dhakhtarka xanuunkaaga: cunno xanuun iyo qandho."
  },
  {
    level: "A1",
    topic: "Openbaar Vervoer",
    situation: "Kaartje kopen op het station",
    situation_translations: { ar: "شراء تذكرة في محطة القطار", ti: "ኣብ መደበር ባቡር ትኬት ምግዛእ", om: "Tikaata buufata baaburaatti bitachuu", so: "Iibsashada tigidhka xarunta tareenka", en: "Buying a ticket at train station" },
    audio_text: "Wilt u een enkele reis of een dagretour naar Amsterdam?",
    audio_translations: { ar: "هل تريد تذكرة ذهاب فقط أم ذهاب وإياب إلى أمستردام؟", ti: "ናይ ሓደ ወገን ትኬት ድዩ ወይ መመላለሲ ትደሊ፧", om: "Imala gama tokkoo moo deebii waliin barbaaddu?", so: "Ma hal dhinac ayaad rabtaa mise socod iyo soo laabasho?", en: "Would you like a single or day return to Amsterdam?" },
    correct: "Een dagretour graag, ik kom vanavond weer terug.",
    wrong: ["Spreekt u ook Engels?", "Spoor vier alstublieft.", "Het is erg koud vandaag."],
    exp_nl: "Als je dezelfde dag terugreist, kies je voor een 'dagretour'.",
    exp_ar: "إذا كنت ستعود في نفس اليوم، تختار تذكرة ذهاب وإياب 'dagretour'.",
    exp_so: "Dooro 'dagretour' haddii aad caawa soo noqonayso."
  },
  {
    level: "A1",
    topic: "Apotheek",
    situation: "Medicijnen ophalen bij de apotheek",
    situation_translations: { ar: "استلام الأدوية من الصيدلية", ti: "መድሃኒት ካብ ፋርማሲ ምውሳድ", om: "Qoricha faarmasii irraa fudhachuu", so: "Qaadashada daawada farmashiyaha", en: "Picking up medicine at pharmacy" },
    audio_text: "Heeft u al eerder dit medicijn gebruikt?",
    audio_translations: { ar: "هل استخدمت هذا الدواء من قبل؟", ti: "ቅድሚ ሕጂ እዚ መድሃኒት ተጠቒምካሉ ትፈልጥ ዲኻ፧", om: "Qoricha kana kanaan dura fayyadamtee beektaa?", so: "Miyaad hore u isticmaashay daawadan?", en: "Have you used this medication before?" },
    correct: "Nee, dit is de eerste keer. Kunt u de werking uitleggen?",
    wrong: ["Ik ga met de bus naar huis.", "Het recept is van vorige week.", "Mijn achternaam is Bakker."],
    exp_nl: "De apotheker wil weten of je instructies nodig hebt over het medicijngebruik.",
    exp_ar: "يسألك الصيدلي إذا كنت تعرف الدواء، فتجيب بوضوح وتطلب الشرح إذا كانت أول مرة.",
    exp_so: "U sheeg haddii ay tahay markii kuugu horeysay si lagugu sharaxo."
  },
  {
    level: "A1",
    topic: "Horeca",
    situation: "Bestellen in een café",
    situation_translations: { ar: "الطلب في المقهى", ti: "ኣብ ካፌ ትእዛዝ ምሃብ", om: "Manni bunaatti ajajuu", so: "Dalbashada maqaayada", en: "Ordering in a cafe" },
    audio_text: "Goedemiddag, wat kan ik voor u inschenken?",
    audio_translations: { ar: "مساء الخير، ماذا أصب لك للشرب؟", ti: "ከመይ ውዒልኩም፣ እንታይ ክቐድሓልኩም፧", om: "Akkam ooltan, maal isiniif dhangalaasu?", so: "Galab wanaagsan, maxaan idiin shubaa?", en: "Good afternoon, what can I get you to drink?" },
    correct: "Graag een kopje koffie met melk en een glas water.",
    wrong: ["De rekening was veertig euro.", "Ik moet de trein halen.", "Waar is het ziekenhuis?"],
    exp_nl: "De ober vraagt wat je wilt drinken. Je noemt je gewenste drankje.",
    exp_ar: "يسأل النادل عما تود شربه، فتطلب قهوة أو ماء بلطف.",
    exp_so: "U sheeg cabitaanka aad rabto: koob bun ah iyo biyo."
  },

  // --- A2 ---
  {
    level: "A2",
    topic: "Werk",
    situation: "Ziek melden bij leidinggevende",
    situation_translations: { ar: "الإبلاغ عن المرض للمدير", ti: "ምሕማምካ ንሓላፊኻ ምሕባር", om: "Dhukkuba ofii hooggansaatti beeksisuu", so: "U sheegista xanuunka madaxaaga shaqada", en: "Calling in sick to supervisor" },
    audio_text: "Hallo, met Jan. Ik hoor dat je ziek bent, wat vervelend. Lukt het om morgen weer te werken?",
    audio_translations: { ar: "مرحباً، معك يان. سمعت أنك مريض، هذا مؤسف. هل يمكنك العمل غداً؟", ti: "ሰላም ጃን እየ። ምሕማምካ ሰሚዐ፣ ዘሕዝን እዩ። ጽባሕ ክትሰርሕ ትኽእል ዲኻ፧", om: "Akkam, Yaaniin jira. Akka dhukkubsatte dhaga'eera. Bor hojjechuuf siif mijataa?", so: "Halo, waa Jan. Waxaan maqlay inaad xanuunsan tahay. Ma awoodaa inaad berrito shaqayso?", en: "Hello, Jan speaking. I heard you are ill. Will you be able to work tomorrow?" },
    correct: "Nee helaas, ik lig nog met koorts in bed. Ik bel morgenochtend even om een update te geven.",
    wrong: ["Ja, ik neem twee pizza's mee naar het kantoor.", "Ik heb gisteren mijn contract getekend.", "De trein vertrekt vanaf spoor twee."],
    exp_nl: "Bij een ziekmelding geef je duidelijk aan dat je nog rust nodig hebt en spreek je af wanneer je opnieuw contact opneemt.",
    exp_ar: "عند الإبلاغ بالمرض، توضح أنك ما زلت متعباً وتعد بالاتصال صباح الغد لإعطاء مستجدات.",
    exp_so: "Xaaladaada si cad u sheeg oo ballanqaad inaad subaxda dambe la soo xiriiri doonto."
  },
  {
    level: "A2",
    topic: "Wonen",
    situation: "Afspraak maken met een monteur",
    situation_translations: { ar: "تحديد موعد مع فني الصيانة", ti: "ምስ መካኒክ ቆጸራ ምሓዝ", om: "Ogeessa suphaa waliin beellama qabachuu", so: "Ballan la qabsashada farsamoyahan", en: "Scheduling a technician visit" },
    audio_text: "Schikt het als onze monteur morgenochtend om half tien langskomt voor de verwarming?",
    audio_translations: { ar: "هل يناسبك قدوم الفني غداً صباحاً الساعة التاسعة والنصف لفحص التدفئة؟", ti: "እቲ ሰራሕተኛ ጽባሕ ንግሆ ሰዓት ትሽዓተን ፈረቓን እንተመጺኡ ይጥዕመካ ድዩ፧", om: "Ogeessi keenya boru ganama sa'a sadii fi walakkaatti dhufuu danda'aa?", so: "Ma kugu habboon tahay haddii farsamoyahanku berrito sagaal iyo badhka yimaado?", en: "Does it suit you if our technician comes tomorrow morning at nine-thirty for the heating?" },
    correct: "Ja prima, dan ben ik thuis. Kunt u van tevoren even bellen?",
    wrong: ["Nee, de verwarming is gemaakt van hout.", "Ik heb drie kinderen op school.", "Kunt u me de weg naar de bushalte wijzen?"],
    exp_nl: "Je bevestigt dat het tijdstip schikt en vraagt beleefd of de monteur kort vooraf belt.",
    exp_ar: "تؤكد الموعد وتطلب منه الاتصال قبل وصوله بفترة وجيزة.",
    exp_so: "Aqbal waqtiga una sheeg inaad guriga joogi doonto."
  },
  {
    level: "A2",
    topic: "Gemeente",
    situation: "Verhuizing doorgeven bij de gemeente",
    situation_translations: { ar: "تسجيل تغيير السكن في البلدية", ti: "ምቕያር ኣድራሻ ንምምሕዳር ከተማ ምሕባር", om: "Jijjiirraa mana jireenyaa beeksisuu", so: "U sheegista guuritaanka degmada", en: "Registering address change at city hall" },
    audio_text: "Heeft u het getekende huurcontract van uw nieuwe woning bij u?",
    audio_translations: { ar: "هل معك عقد الإيجار الموقع للمنزل الجديد؟", ti: "ናይቲ ሓዲሽ ገዛኻ ናይ ኪራይ ውዕል ሒዝካ መጺእካ ዲኻ፧", om: "Waliigaltee kireeffannaa mana haaraa qabattee dhuftee?", so: "Ma wadataa heshiiska kirada ee la saxiixay?", en: "Do you have the signed lease agreement for your new home with you?" },
    correct: "Ja, hier is het originele contract en mijn legitimatiebewijs.",
    wrong: ["Ik ga met de fiets naar het werk.", "Het weerbericht voorspelt regen.", "De bibliotheek is op zondag gesloten."],
    exp_nl: "Bij inschrijving op een nieuw adres toon je het getekende contract en legitimatie.",
    exp_ar: "عند التسجيل في البلدية، تبرز عقد الإيجار الموقع وبطاقة الهوية الشخصية.",
    exp_so: "U dhiib heshiiska kirada iyo aqoonsigaaga saxda ah."
  },
  {
    level: "A2",
    topic: "Buren",
    situation: "Pakketje aannemen voor de buren",
    situation_translations: { ar: "استلام طرد بريدي للجيران", ti: "ፓኬት ንጎረቤት ምቕባል", om: "Waraqaa poostaa ollaa fudhachuu", so: "U qabashada baakada deriska", en: "Accepting a package for neighbors" },
    audio_text: "Goedemiddag! De buren op nummer 14 zijn niet thuis. Zou u dit pakketje voor hen kunnen aannemen?",
    audio_translations: { ar: "مساء الخير! الجيران في رقم 14 ليسوا بالمنزل، هل يمكنك استلام هذا الطرد لهم؟", ti: "ጎረቤት ቁጽሪ 14 የለዉን፣ እዚ ፓኬት ክትቅበለሎም ትኽእል ዲኻ፧", om: "Ollaan lakkoofsa 14 hin jiran, poostaa kana isaaniif fudhachuu dandeessuu?", so: "Galab wanaagsan, deriska lambarka 14 ma joogaan, ma u qaban kartaa baakadan?", en: "Good afternoon! The neighbors at number 14 are not home. Could you accept this package for them?" },
    correct: "Ja hoor, geen probleem, ik geef het straks aan hen.",
    wrong: ["Nee, ik weet niet hoe laat het is.", "Mijn jas hangt aan de kapstok.", "Ik heb geen honger."],
    exp_nl: "Als goede buur neem je het pakketje aan en beloof je het later te overhandigen.",
    exp_ar: "توافق بلطف على استلام الطرد وتعد بتسليمه لهم لاحقاً.",
    exp_so: "U ogolow si naxariis leh oo dhaha waan u dhiibayaa dambe."
  },

  // --- B1 ---
  {
    level: "B1",
    topic: "Onderwijs",
    situation: "Tienminutengesprek over het rapport van je kind",
    situation_translations: { ar: "اجتماع تقييم درجات الطفل في المدرسة", ti: "ናይ 10 ደቒቕ ናይ ትምህርቲ ጸብጻብ ምይይጥ", om: "Marii gabaasa barnoota daa'imaa", so: "Wada-hadalka dugsiga ee natiijada ilmaha", en: "Parent-teacher meeting about grades" },
    audio_text: "We zien dat uw zoon grote vooruitgang boekt met taal, maar rekenen vraagt nog wat extra aandacht. Hoe oefenen jullie thuis?",
    audio_translations: { ar: "نرى أن ابنكم يحرز تقدماً كبيراً في اللغة، لكن الحساب يتطلب مزيداً من الانتباه. كيف تتدربون في المنزل؟", ti: "ወድኹም ኣብ ቋንቋ ብሉጽ ምዕባለ የርኢ ኣሎ፣ ኣብ ቊጽሪ ግን ሓገዝ የድልዮ። ኣብ ገዛ ብኸመይ ትለማመዱ፧", om: "Ilmi keessan afaaniin baay'ee cimeera, herregaan garuu xiyyeeffannoo barbaada. Manatti akkamitti shaakaltu?", so: "Waxaan aragnaa in wiilkaagu horumar ka samaynayo luqadda, laakiin xisaabta waxay u baahan tahay fiiro gaar ah. Sideed ugu laylisaan guriga?", en: "We see your son is making great progress with language, but math needs a little extra attention. How do you practice at home?" },
    correct: "We oefenen dagelijks een kwartier met rekenapps en sommen op papier. Heeft u tips voor geschikt materiaal?",
    wrong: ["De buschauffeur reed veel te snel vanmorgen.", "We gaan in de zomervakantie twee weken kamperen.", "Ik vind dat de school veel te vroeg begint."],
    exp_nl: "Je legt constructief uit hoe je thuis oefent en vraagt de leerkracht proactief om advies.",
    exp_ar: "تشرح بأسلوب بنّاء روتين التدريب المنزلي وتطلب نصائح إضافية من المعلم.",
    exp_so: "Sharax sida aad guriga ugu caawiso oo weydii macallinka tusaalooyin kale."
  },
  {
    level: "B1",
    topic: "Collega's",
    situation: "Projectplanning en taakverdeling op het werk",
    situation_translations: { ar: "تخطيط المشروع وتوزيع المهام في العمل", ti: "ምምቃል ዕዮታት ኣብ ስራሕ", om: "Karoora pirojektii fi qoodiinsa hojii", so: "Qorsheynta mashruuca iyo qeybsiga shaqada", en: "Project planning and task division at work" },
    audio_text: "Wie van het team zou de presentatie voor de directie volgende week op zich willen nemen?",
    audio_translations: { ar: "من من الفريق يرغب في تولي تقديم العرض للإدارة الأسبوع المقبل؟", ti: "ካብዚ ጉጅለ ጽባሕ ንሓለፍቲ መብርሂ ኪህብ ዚደሊ መን ኣሎ፧", om: "Garee kana keessaa eenyutu dhiheessa hoogganaaf dhiheessa?", so: "Yaa kooxda ka mid ah oo doonaya inuu soo bandhigo mashruuca maamulka toddobaadka dambe?", en: "Who from the team would like to take on the presentation for management next week?" },
    correct: "Ik kan de presentatie voorbereiden als Thomas me helpt met de financiële grafieken.",
    wrong: ["Ik ga liever vroeg naar bed vanavond.", "Het koffiezetapparaat op de gang is kapot.", "Waarom is er geen gratis fruit in de kantine?"],
    exp_nl: "Je toont initiatief en stelt een realistische samenwerking voor met een collega.",
    exp_ar: "تبادر بتحمل المسؤولية وتقترح التعاون مع زميل لضمان جودة الأرقام.",
    exp_so: "Muuji diyaar garow shaqo oo soo jeedi wada-shaqeyn macquul ah."
  },
  {
    level: "B1",
    topic: "Klantenservice",
    situation: "Klacht over een defect apparaat",
    situation_translations: { ar: "شكوى بخصوص جهاز معطل", ti: "ጥርዓን ብዛዕባ ዝተበላሸወ ናውቲ", om: "Koomii meeshaa balleessaa irratti", so: "Cabasho ku saabsan qalab ciladoobay", en: "Complaint about defective device" },
    audio_text: "U geeft aan dat het apparaat niet meer oplaadt. Heeft u het originele aankoopbewijs binnen de garantietermijn?",
    audio_translations: { ar: "ذكرت أن الجهاز لم يعد يشحن، هل لديك إيصال الشراء الأصلي خلال فترة الضمان؟", ti: "እቲ ናውቲ ቻርጅ ኣይገብርን ኣሎ ኢልካና፣ ናይ ውሕስነት ወረቐት ኣሎካ ዲዩ፧", om: "Meeshaan chaarjii hin fudhatu jettaniitu, waraqaa ragaa bitannaa fi wabiin qabduu?", so: "Waxaad sheegtay inuusan qalabku shaqaynayn, ma haysataa rasiidkii muddada damaanadda?", en: "You state the device no longer charges. Do you have the original proof of purchase within warranty?" },
    correct: "Jazeker, ik heb de factuur en garantiebewijs van drie maanden geleden hier bij me.",
    wrong: ["Mijn broer werkt ook in een winkel.", "De verpakking was erg kleurrijk.", "Ik vind elektronica soms ingewikkeld."],
    exp_nl: "Je toont direct de benodigde aankoop- en garantiedocumenten.",
    exp_ar: "تؤكد امتلاكك للفاتورة والضمان لتسهيل إجراءات الاستبدال أو الصيانة.",
    exp_so: "U dhiib rasiidka iyo damaanada si degdeg ah."
  },

  // --- B2 ---
  {
    level: "B2",
    topic: "Onderhandelen",
    situation: "Oplossen van leveringsvertraging",
    situation_translations: { ar: "حل تأخير في تسليم البضائع", ti: "ምድንጓይ ኣቕሑት ምፍታሕ", om: "Dhimma tajaajila dabarsuu keessatti gufannaa hiikuu", so: "Xallinta dib u dhaca alaab keenista", en: "Resolving supply chain delay" },
    audio_text: "De klant is begrijpelijkerwijs ontstemd over de vertraging. Welke coulanceregeling stellen we voor?",
    audio_translations: { ar: "العميل مستاء ومحق في ذلك بسبب التأخير. ما هو التعويض الودي الذي نقترحه؟", ti: "እቲ ዓሚል ብምድንጓይ ተቖጢዑ ኣሎ። እንታይ ካሕሳ ክንህቦ ንኽእል፧", om: "Maamilli sababa tursiisaatiin aareera. Furmaata maali dhiheessina?", so: "Macaamiilku wuu ka xanaaqay dib u dhaca. Maxaan ugu magdhawnaa?", en: "The customer is understandably upset about the delay. What goodwill gesture do we propose?" },
    correct: "Ik stel voor om de verzendkosten kwijt te schelden en tien procent korting op de volgende order te bieden.",
    wrong: ["We wachten rustig af tot de klant zelf een email stuurt.", "Iedereen maakt wel eens een foutje op vrijdagmiddag.", "We kunnen de telefoonlijn voor vandaag afsluiten."],
    exp_nl: "Op B2-niveau formuleer je een professionele en proportionele compensatie om de klantrelatie te behouden.",
    exp_ar: "تقترح حلاً مهنياً مناسباً لتعويض العميل والحفاظ على العلاقة التجارية.",
    exp_so: "Soo jeedi xal ganacsi oo lagu qanciyo macaamiilka."
  },
  {
    level: "B2",
    topic: "Beleid",
    situation: "Verandering van thuiswerkbeleid bespreken",
    situation_translations: { ar: "مناقشة سياسة العمل من المنزل", ti: "ፖሊሲ ካብ ገዛ ምስራሕ ምይይጥ", om: "Qajeelfama mana ta'anii hojjechuu mari'achuu", so: "Ka doodista siyaasadda guriga ka shaqeynta", en: "Discussing remote work policy" },
    audio_text: "Het bestuur overweegt om werknemers te verplichten weer minimaal vier dagen per week naar kantoor te komen. Wat is jouw visie hierop?",
    audio_translations: { ar: "تفكر الإدارة في إلزام الموظفين بالحضور أربعة أيام على الأقل أسبوعياً إلى المكتب. ما رأيك؟", ti: "ኣመራርሓ ሰራሕተኛታት ኣብ ሰሙን 4 መዓልቲ ናብ ቤት ጽሕፈት ክመጹ ይደሊ ኣሎ። ርእይቶኻ እንታይ እዩ፧", om: "Boordiin hojjettoonni torbanitti guyyaa afur waajjiratti akka argaman barbaada. Yaadni kee maali?", so: "Maamulku wuxuu doonayaa in 4 maalmood xafiiska la yimaado. Maxay kula tahay?", en: "Management is considering requiring employees to come to the office at least four days a week. What is your view?" },
    correct: "Een hybride model van twee tot drie dagen biedt betere flexibiliteit en behoudt toch de teamcohesie en productiviteit.",
    wrong: ["Ik ga liever met vakantie naar Zuid-Frankrijk.", "Mijn buurman werkt in de bouw.", "Kantoorstoelen zijn over het algemeen vrij comfortabel."],
    exp_nl: "Je onderbouwt een evenwichtig standpunt met steekhoudende argumenten over flexibiliteit en teamcohesie.",
    exp_ar: "تطرح وجهة نظر متوازنة تدعم النموذج الهجين مع تبرير الفوائد للإنتاجية وروح الفريق.",
    exp_so: "Ka dhiibo arti dheellitiran oo ku saleysan shaqada iyo qoyska."
  },

  // --- C1 ---
  {
    level: "C1",
    topic: "Strategie",
    situation: "Afweging van duurzaamheidsinvesteringen",
    situation_translations: { ar: "تقييم استثمارات الاستدامة طويلة الأجل", ti: "ስትራተጂያዊ ምምዛን ቀጻልነት ዘለዎ ወፍሪ", om: "Madaallii investimantii itti fufiinsa qabuu", so: "Qiimeynta maalgashiga waara", en: "Evaluating sustainability investments" },
    audio_text: "Hoe verhouden de initiële transitiekosten zich tot het langetermijnrendement van dit verduurzamingsproject?",
    audio_translations: { ar: "كيف توازن التكاليف الأولية للتحول مع العائد طويل الأجل لمشروع الاستدامة هذا؟", ti: "እቲ ናይ መጀመርታ ወጻኢታት ምስቲ ንነዊሕ እዋን ዝርከብ ረብሓ ብኸመይ ይነጻጸር፧", om: "Baasiin jalqabaa fi faayidaan yeroo dheeraa pirojektii kanaa akkamitti walsima?", so: "Sidee bay isugu dheellitiran yihiin kharashka bilowga iyo faa'iidada fog?", en: "How do initial transition costs compare to the long-term return on this sustainability project?" },
    correct: "Hoewel de kapitaalinvestering substantieel is, compenseren de verwachte energiebesparing en verminderde CO2-heffingen dit binnen zeven jaar ruimschoots.",
    wrong: ["Zonnepanelen zien er meestal glimmend uit op een schuin dak.", "We moeten voor morgenmiddag nieuwe pennen bestellen.", "Ik heb gelezen dat het klimaat soms verandert."],
    exp_nl: "Op C1-niveau gebruik je genuanceerde vaktermen om een financiële analyse helder te verwoorden.",
    exp_ar: "تستخدم مفردات مالية واقتصادية متقدمة لتبرير الجدوى الاستثمارية على المدى الطويل.",
    exp_so: "U sharax xisaab ahaan sida maalgashigu isu bixinayo muddo kooban gudaheed."
  },

  // --- C2 ---
  {
    level: "C2",
    topic: "Ethiek & Technologie",
    situation: "Ethische implicaties van algoritmische besluitvorming",
    situation_translations: { ar: "الآثار الأخلاقية للقرارات الخوارزمية", ti: "ስነ-ምግባራዊ ሳዕቤን ናይ ኣልጎሪዝም ውሳነታት", om: "Dhimma naamusaa murtii teeknooloojii irratti", so: "Saameynta akhlaaqeed ee go'aannada tignoolajiyada", en: "Ethical implications of algorithmic decisions" },
    audio_text: "In hoeverre legitimeert technologische efficiëntie de inperking van discretionaire bevoegdheid bij overheidsbesluiten?",
    audio_translations: { ar: "إلى أي مدى تبرر الكفاءة التكنولوجية تقليص السلطة التقديرية في القرارات الحكومية؟", ti: "ቴክኖሎጅያዊ ቅልጣፈ ንሰብኣዊ ውሳነታት ኣብ ምምሕዳር መንግስቲ ክሳብ ክንደይ የጽድቖ፧", om: "Saffisni teeknooloojii murteewwan mootummaa keessatti hamma maaliitti fudhatama qaba?", so: "Ilaa heerkee ayay wax ku oolnimada tignoolajiyadu xalaalayn kartaa xaddidaadda go'aanka aadanaha?", en: "To what extent does technological efficiency legitimize the restriction of discretionary power in government decisions?" },
    correct: "Efficiëntie mag nimmer ten koste gaan van de menselijke maat en het constitutionele recht op een transparante, individuele belangenafweging.",
    wrong: ["Computers werken over het algemeen met binaire nullen en enen.", "We kunnen de printer het beste opnieuw opstarten.", "Het kantoorpersoneel drinkt graag espresso in de pauze."],
    exp_nl: "Op C2-niveau formuleer je een hoogwaardig filosofisch-juridisch betoog met perfecte beheersing van het idioom.",
    exp_ar: "تقدم صياغة قانونية وفلسفية رفيعة المستوى تؤكد على سيادة العدالة الدستورية والكرامة الإنسانية فوق الآلة.",
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

// Build 100% unique items per level by generating distinct communicative scenarios
const ALL_UNIQUE_ITEMS = [];

SCENARIOS.forEach((base, sIdx) => {
  const options = shuffleArray([base.correct, ...base.wrong]);
  const correctIndex = options.indexOf(base.correct);

  ALL_UNIQUE_ITEMS.push({
    id: `resp_${base.level.toLowerCase().replace('-', '')}_${String(sIdx + 1).padStart(3, '0')}`,
    level: base.level,
    topic: base.topic,
    situation: base.situation,
    situation_translations: base.situation_translations,
    audio_text: base.audio_text,
    audio_translations: base.audio_translations,
    options: options,
    correct_index: correctIndex,
    explanations: {
      nl: base.exp_nl,
      ar: base.exp_ar,
      ti: base.exp_nl,
      om: base.exp_nl,
      so: base.exp_so,
      en: base.exp_nl
    }
  });
});

console.log('Total unique scenarios created:', ALL_UNIQUE_ITEMS.length);

// Save to data/respond.json and src/data/respond.json
['data/respond.json', 'src/data/respond.json'].forEach(file => {
  fs.writeFileSync(file, JSON.stringify(ALL_UNIQUE_ITEMS, null, 2), 'utf8');
  console.log('Wrote unique items to', file);
});
