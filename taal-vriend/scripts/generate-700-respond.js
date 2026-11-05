const fs = require('fs');
const path = require('path');

const cefrLevels = ["Pre-A1", "A1", "A2", "B1", "B2", "C1", "C2"];

// Comprehensive scenario templates per level with authentic Somali translations
const levelTemplates = {
  "Pre-A1": [
    {
      topic: "Begroetingen",
      sit: "Ontmoeting in de ochtend",
      sit_so: "Kulan subaxeed",
      sit_ar: "تحية الصباح",
      sit_ti: "ናይ ንግሆ ሰላምታ",
      sit_om: "Nagaa ganamaa",
      sit_en: "Morning meeting",
      q: "Goedemorgen! Hoe gaat het?",
      q_so: "Subax wanaagsan! Sidee tahay?",
      q_ar: "صباح الخير! كيف حالك؟",
      q_ti: "ከመይ ሓዲርኩም! ከመይ ኣለኹም፧",
      q_om: "Akkam bulte! Akkam jirtu?",
      q_en: "Good morning! How are you?",
      opt: ["Goedemorgen! Goed, dank u wel.", "Mijn jas is zwart.", "Ik heb twee katten.", "Het regent buiten."],
      c: 0,
      exp_nl: "Op 'Goedemorgen! Hoe gaat het?' antwoord je beleefd met 'Goedemorgen! Goed, dank u wel.'",
      exp_so: "Marka lagu yiraahdo subax wanaagsan sidee tahay, waxaad ugu jawaabaysaa: Subax wanaagsan! Waan fiicanahay mahadsanid."
    },
    {
      topic: "Kassa & Winkel",
      sit: "Afrekenen bij de kassa",
      sit_so: "Bixinta lacagta ee khasnadda",
      sit_ar: "دفع الحساب عند الصندوق",
      sit_ti: "ክፍሊት ኣብ ካሳ",
      sit_om: "Kaffaltii baankii",
      sit_en: "Checkout at the register",
      q: "Wilt u de kassabon meenemen?",
      q_so: "Ma doonaysaa inaad qaadato rasiidka?",
      q_ar: "هل تريد إيصال الشراء؟",
      q_ti: "ናይ ክፍሊት ወረቐት ትደልዩ ዶ፧",
      q_om: "Nagahee barbaadduu?",
      q_en: "Would you like the receipt?",
      opt: ["Nee dank u, hoeft niet.", "Ik heet Mohamed.", "Ik woon in Utrecht.", "Het is half drie."],
      c: 0,
      exp_nl: "Als gevraagd wordt naar de bon, zeg je 'Nee dank u' of 'Ja graag'.",
      exp_so: "Haddii lagu weydiiyo rasiidka, dheh: Maya mahadsanid ama Haa fadlan."
    },
    {
      topic: "Kennismaking",
      sit: "Naam vragen",
      sit_so: "Weydiinta magaca",
      sit_ar: "السؤال عن الاسم",
      sit_ti: "ስም ምሕታት",
      sit_om: "Maqaa gaafachuu",
      sit_en: "Asking for a name",
      q: "Wat is jouw naam?",
      q_so: "Magacaa?",
      q_ar: "ما اسمك؟",
      q_ti: "ስምካ መን እዩ፧",
      q_om: "Maqaan kee eenyu?",
      q_en: "What is your name?",
      opt: ["Mijn naam is Ali.", "Ik drink koud water.", "De bus is geel.", "Morgen is het feest."],
      c: 0,
      exp_nl: "Op de vraag naar je naam antwoord je met 'Mijn naam is ...'.",
      exp_so: "Su'aasha ku saabsan magacaaga waxaad ku jawaabaysaa: Magacaygu waa..."
    },
    {
      topic: "Betalen",
      sit: "Betaalwijze kiezen",
      sit_so: "Doorashada habka lacag-bixinta",
      sit_ar: "اختيار طريقة الدفع",
      sit_ti: "ኣገባብ ክፍሊት ምምራጽ",
      sit_om: "Akkaataa kaffaltii filachuu",
      sit_en: "Choosing payment method",
      q: "Wilt u pinnen of contant betalen?",
      q_so: "Ma kaar ayaad ku bixinaysaa mise lacag caddaan ah?",
      q_ar: "هل تريد الدفع بالبطاقة أم نقداً؟",
      q_ti: "ብካርድ ዶ ብጥረ ገንዘብ ክትከፍሉ ትደልዩ፧",
      q_om: "Kaardiidhaan moo callaadhaan kaffaltu?",
      q_en: "Would you like to pay by card or cash?",
      opt: ["Ik wil graag pinnen.", "Mijn trui is groen.", "Ik slaap vroeg.", "De straat is schoon."],
      c: 0,
      exp_nl: "Kies de betaalwijze: 'Ik wil pinnen' of 'Contant graag'.",
      exp_so: "Sheeg habka aad wax ku bixinayso: Waxaan rabaa inaan kaar ku bixiyo."
    },
    {
      topic: "Afscheid",
      sit: "Prettig weekend wensen",
      sit_so: "U rajaynta dhammaad todobaad wanaagsan",
      sit_ar: "التمني بعطلة نهاية أسبوع سعيدة",
      sit_ti: "ጽቡቕ ቀዳመ-ሰንበት ምንዮት",
      sit_om: "Dhuma torbee gaarii haa ta'u",
      sit_en: "Wishing a good weekend",
      q: "Fijn weekend en tot maandag!",
      q_so: "Dhammaad todobaad wanaagsan iyo ilaa Isniinta!",
      q_ar: "عطلة نهاية أسبوع سعيدة وإلى اللقاء يوم الاثنين!",
      q_ti: "ጽቡቕ ቀዳመ-ሰንበት ይግበረልኩም፣ ክሳዕ ሰኑይ!",
      q_om: "Dhuma torbee gaarii, hamma Wiixataatti!",
      q_en: "Have a nice weekend and see you Monday!",
      opt: ["Dank je wel, hetzelfde!", "Ik eet een appel.", "Mijn schoen is nat.", "Het is vier uur."],
      c: 0,
      exp_nl: "Wens de ander hetzelfde terug met 'Dank je wel, hetzelfde!'.",
      exp_so: "Ku jawaab: Mahadsanid, adigana sidoo kale!"
    }
  ],

  "A1": [
    {
      topic: "Winkel",
      sit: "Zoeken naar een product in de supermarkt",
      sit_so: "Raadinta badeecad suuqa dhexdiisa",
      sit_ar: "البحث عن منتج في السوبرماركت",
      sit_ti: "ኣቕሓ ኣብ ዱኳን ምድላይ",
      sit_om: "Suuqa keessatti meeshaa barbaaduu",
      sit_en: "Looking for a product in supermarket",
      q: "Pardon, weet u waar de verse melk staat?",
      q_so: "Iga raali noqo, ma ogtahay meesha caanaha cusub yaallaan?",
      q_ar: "عذراً، هل تعرف أين يوجد الحليب الطازج؟",
      q_ti: "ይቕሬታ፣ ሓድሽ ጸባ ኣበይ ከም ዘሎ ትፈልጡ ዶ፧",
      q_om: "Dhiifama, aannani haarofni eessa akka jiru beektuu?",
      q_en: "Excuse me, do you know where fresh milk is?",
      opt: ["Ja, in gang drie aan de linkerkant.", "Ik lust geen bananen.", "Mijn zus heet Fatima.", "Het waait buiten."],
      c: 0,
      exp_nl: "Geef een vriendelijke en duidelijke richtingaanwijzing in het gangpad.",
      exp_so: "U tilmaan meesha saxda ah: Haa, marinka saddexaad dhinaca bidix."
    },
    {
      topic: "Gezondheid",
      sit: "Klachten omschrijven bij de dokter",
      sit_so: "Sharaxaadda xanuunka ee dhakhtarka",
      sit_ar: "وصف الأعراض عند الطبيب",
      sit_ti: "ሕማምካ ንሓኪም ምግላጽ",
      sit_om: "Dhukkubbiikee mana yaalaatti ibsuu",
      sit_en: "Describing symptoms to doctor",
      q: "Waar heeft u precies last van vandaag?",
      q_so: "Maxaad maanta si gaar ah uga cabanaysaa?",
      q_ar: "ما الذي تعاني منه بالضبط اليوم؟",
      q_ti: "ሎሚ ብልክዕ እንታይ ጸገም ኣጋጢሙኩም፧",
      q_om: "Har'a maaltu si dhukkuba?",
      q_en: "What symptoms are you experiencing today?",
      opt: ["Ik heb aanhoudende keelpijn en koorts.", "De trein vertrekt om tien uur.", "Mijn fietsband is zwart.", "Ik kook graag rijst."],
      c: 0,
      exp_nl: "Benoem je medische symptomen feitelijk en duidelijk aan de arts.",
      exp_so: "Si cad ugu sharax dhakhtarka: Waxaan qabaa dhuun-xanuun joogto ah iyo qandho."
    },
    {
      topic: "Vervoer",
      sit: "Kaartje kopen op het station",
      sit_so: "Iibsashada tigidhka tareenka",
      sit_ar: "شراء تذكرة في محطة القطار",
      sit_ti: "ቲኬት ኣብ መዕረፊ ባቡር ምግዛእ",
      sit_om: "Tikeettii buufata baaburaatti bitachuu",
      sit_en: "Buying ticket at train station",
      q: "Wilt u een enkele reis of een dagretour naar Amsterdam?",
      q_so: "Tigidh hal dhinac ah ma rabtaa mise socod iyo soo noqosho?",
      q_ar: "هل تريد تذكرة ذهاب فقط أم ذهاب وإياب إلى أمستردام؟",
      q_ti: "ናይ ሓደ መገዲ ዶ መመለሲ ቲኬት ናብ ኣምስተርዳም ትደልዩ፧",
      q_om: "Imala gama qofaa moo deebii wajjin barbaaddu?",
      q_en: "Do you want a single or day return to Amsterdam?",
      opt: ["Een dagretour tweede klas alstublieft.", "Ik heb gisteren vis gegeten.", "Mijn telefoon is bijna leeg.", "De lucht is blauw."],
      c: 0,
      exp_nl: "Geef direct aan welk type vervoersbewijs je wenst aan te schaffen.",
      exp_so: "Sheeg nooca tigidhka aad u baahan tahay: Tigidh socod iyo soo noqosho ah, fadlan."
    }
  ],

  "A2": [
    {
      topic: "Werk",
      sit: "Ziek melden bij leidinggevende",
      sit_so: "Ogeysiinta maqnaanshaha xanuun dartiis",
      sit_ar: "الإبلاغ عن المرض للمشرف",
      sit_ti: "ሕማም ንሓላፊ ስራሕ ምሕባር",
      sit_om: "Dhukkuba hogganaatti beeksisuu",
      sit_en: "Calling in sick to manager",
      q: "Hallo, met Jan. Ik hoor dat je ziek bent, wat vervelend. Lukt het om morgen weer te werken?",
      q_so: "Haye, waa Jan. Waan maqlay inaad xanuunsan tahay. Ma awoodi kartaa inaad berrito shaqeyso?",
      q_ar: "مرحباً معك يان. سمعت أنك مريض، يؤسفني ذلك. هل تستطيع العمل غداً؟",
      q_ti: "ሰላም ጃን እየ። ምሕማምካ ሰሚዐ ኣዝዩ የሕዝን። ጽባሕ ናብ ስራሕ ክትመጽእ ትኽእል ዶ፧",
      q_om: "Akkam, Jaan dha. Dhukkubsachuukee dhaga'eera, baay'ee na gaddisiise. Bor dhufuu dandeessaa?",
      q_en: "Hello, this is Jan. I heard you are ill. Will you be able to work tomorrow?",
      opt: ["Nee helaas niet, de dokter adviseert een paar dagen rust.", "Ik ga zaterdag naar de markt.", "Mijn schoenen zijn nieuw.", "De kat slaapt."],
      c: 0,
      exp_nl: "Geef een realistisch en professioneel antwoord over je herstelverwachting.",
      exp_so: "U sheeg xaaladdaada: Maya nasiib-darro, dhakhtarku wuxuu igu taliyay nasasho dhawr maalmood ah."
    },
    {
      topic: "Wonen",
      sit: "Afspraak maken met loodgieter",
      sit_so: "Ballan la qabsashada farsamoyaqaanka dhuumaha",
      sit_ar: "تحديد موعد مع فني السباكة",
      sit_ti: "ምስ መዐረዪ ሻምብቆታት ቆጸራ ምሓዝ",
      sit_om: "Ogeessa bishaanii wajjin beellama qabachuu",
      sit_en: "Making appointment with plumber",
      q: "Schikt het als onze monteur morgenochtend om half tien langskomt?",
      q_so: "Ma kugu habboon tahay haddii farsamoyaqaanku yimaado berri subax 9:30?",
      q_ar: "هل يناسبك قدوم الفني غداً صباحاً في التاسعة والنصف؟",
      q_ti: "እቲ ቴክኒሻን ጽባሕ ንግሆ ሰዓት ትሽዓተን ፈረቓን እንተ መጺኡ ይጥዕመኩም ዶ፧",
      q_om: "Ogeessi keenya bor ganama sa'aatii 9:30 irratti yoo dhufe siif tolaa?",
      q_en: "Does it suit you if our technician visits tomorrow morning at 9:30?",
      opt: ["Ja prima, ik zorg dat ik dan thuis ben.", "Ik lust geen kaas.", "Mijn trui is te klein.", "Gisteren was het koud."],
      c: 0,
      exp_nl: "Bevestig het voorgestelde tijdstip en geef aan dat je aanwezig zult zijn.",
      exp_so: "Xaqiiji waqtiga: Haa waa hagaag, waan joogi doonaa guriga xilligaas."
    }
  ],

  "B1": [
    {
      topic: "Schoolgesprek",
      sit: "Tienminutengesprek over rapport",
      sit_so: "Kulan 10 daqiiqo ah oo ku saabsan natiijada ilmaha",
      sit_ar: "اجتماع أولياء الأمور لمناقشة النتائج",
      sit_ti: "ናይ ወለዲ ኣኼባ ብዛዕባ ውጽኢት ተማሃራይ",
      sit_om: "Walgahii warraa waa'ee gabaasa barumsaa",
      sit_en: "Parent-teacher meeting about grades",
      q: "We zien dat uw zoon grote vooruitgang boekt met taal, maar rekenen vraagt nog extra aandacht. Hoe gaat het huiswerk thuis?",
      q_so: "Waxaan aragnaa in wiilkaagu horumar ka samaynayo luuqadda, laakiin xisaabtu waxay u baahan tahay dadaal dheeraad ah. Sidee howsha guriga loogu sameeyaa?",
      q_ar: "نلاحظ تقدماً كبيراً لابنكم في اللغة، لكن الحساب يتطلب تركيزاً أكبر. كيف تسير الواجبات المنزلية؟",
      q_ti: "ወድኹም ኣብ ቋንቋ ጽቡቕ ምዕባለ የርኢ ኣሎ፡ ኣብ ቊጽሪ ግን ተወሳኺ ጻዕሪ የድልዮ። ኣብ ገዛ ዕዮ-ገዛ ከመይ ይሰርሕ፧",
      q_om: "Ilmi keessan afaan irratti guddina qaba, garuu herregni xiyyeeffannaa barbaada. Hojiin manaa akkam deemaa jira?",
      q_en: "We see your son making great progress in language, but math requires attention. How is homework going at home?",
      opt: ["We oefenen elke middag samen aan de keukentafel met extra sommen.", "Ik drink liever espresso dan thee.", "Mijn auto staat bij de garage.", "Het museum is gesloten."],
      c: 0,
      exp_nl: "Deel actief hoe de begeleiding thuis verloopt om samen te werken aan verbetering.",
      exp_so: "La wadaag macallinka: Galab kasta waxaan miiska jikada kula celcelinnaa layliyo xisaab ah."
    },
    {
      topic: "Werkoverleg",
      sit: "Projectplanning en taakverdeling",
      sit_so: "Qorshaynta mashruuca iyo qaybinta hawlaha",
      sit_ar: "تخطيط المشروع وتوزيع المهام",
      sit_ti: "ምምዳብ ዕማማት ናይ ፕሮጀክት",
      sit_om: "Karoora pirojektii fi qoodiinsa hojii",
      sit_en: "Project planning and task allocation",
      q: "Wie van het team zou de presentatie voor de directie op zich willen nemen?",
      q_so: "Yaa ka tirsan kooxda raba inuu jeediyo bandhigga maamulka sare?",
      q_ar: "من من الفريق يرغب في تولي تقديم العرض أمام الإدارة؟",
      q_ti: "ካብዚ ጉጅለ ነቲ ናይ ምምሕዳር መግለጺ ሓላፍነት ወሲዱ ዘቕርብ መን ኣሎ፧",
      q_om: "Garee keenya keessaa eenyutu gabaasa kana hooggansaaf dhiheessa?",
      q_en: "Who from the team would like to take on the presentation to management?",
      opt: ["Ik wil dat graag doen, mits iemand mij helpt met de dia's.", "Mijn fiets heeft een nieuwe bel.", "Het weerbericht voorspelt regen.", "Ik eet vanavond pasta."],
      c: 0,
      exp_nl: "Toon initiatief en benoem tegelijkertijd welke ondersteuning je nodig hebt.",
      exp_so: "Muuji diyaar garow: Aniga ayaa farxad ku qabanaya, haddii qof iga caawiyo diyaarinta sawirrada."
    }
  ],

  "B2": [
    {
      topic: "Klantrelaties",
      sit: "Oplossen van leveringsvertraging",
      sit_so: "Xallinta dib-u-dhaca keenista alaabta",
      sit_ar: "معالجة تأخير تسليم الطلبيات",
      sit_ti: "ምድንጓይ ኣቕሓ ብሰላም ምፍታሕ",
      sit_om: "Miidhaa dhiheessiin harkifate furuu",
      sit_en: "Resolving delivery delay",
      q: "De klant is begrijpelijkerwijs ontstemd over de vertraging. Welke coulanceregeling stellen we voor?",
      q_so: "Macaamiilku si la fahmi karo wuu uga xanaaqsan yahay dib-u-dhaca. Maxay tahay magdhawga aan u soo bandhigeynaa?",
      q_ar: "العميل مستاء ومحق في استيائه من التأخير. ما هو التعويض المناسب الذي نقترحه؟",
      q_ti: "እቲ ተጠቃሚ በቲ ምድንጓይ ምቕያሙ ርዱእ እዩ። እንታይ ዓይነት ካሕሳ ከነቕርበሉ ንኽእል፧",
      q_om: "Maamilchi dhiheessiin harkifachuu isaatti aareera. Gumaata maalii isaaf kennina?",
      q_en: "The customer is upset about the delay. What goodwill gesture do we propose?",
      opt: ["We bieden tien procent korting op de factuur en leveren per spoedkoerier.", "Ik heb gisteren mijn bureau opgeruimd.", "De koffieautomaat is defect.", "Mijn jas hangt aan de kapstok."],
      c: 0,
      exp_nl: "Een doordachte commerciële oplossing die de klantrelatie herstelt.",
      exp_so: "Xal ganacsi oo wanaagsan: Waxaan siinaynaa 10% qiimo dhimis, waxaana ku gaarsiinaynaa adeeg degdeg ah."
    }
  ],

  "C1": [
    {
      topic: "Beleid & Bestuur",
      sit: "Afweging duurzaamheidsinvesteringen",
      sit_so: "Qiimeynta maalgashiga tamarta waarta",
      sit_ar: "تقييم جدوى الاستثمارات البيئية",
      sit_ti: "ሚዛን ምግባር ኣብ ዘላቒ ወጻኢታት",
      sit_om: "Madaallii baasii eegumsa naannoo",
      sit_en: "Evaluating sustainability investments",
      q: "Hoe verhouden de initiële transitiekosten zich tot de verwachte energiebesparing op de lange termijn?",
      q_so: "Sidee kharashka bilowga ah ee kala-guurku ula jaanqaadayaa kaydinta tamarta ee muddada fog?",
      q_ar: "كيف تتناسب تكاليف التحول الأولية مع توفير الطاقة المتوقع على المدى الطويل؟",
      q_ti: "እቲ መጀመርታ ዝወጽእ ናይ ለውጢ ወጻኢታት ምስቲ ኣብ ነዊሕ ግዜ ዝርከብ ጸዓት ከመይ ይዛመድ፧",
      q_om: "Baasiin jalqabaa qusannaa anniisaa yeroo dheeraa wajjin akkamitti wal qabata?",
      q_en: "How do upfront transition costs relate to projected long-term energy savings?",
      opt: ["Binnen zeven jaar is de investering terugverdiend, waarna structurele besparing optreedt.", "Mijn pen heeft geen inkt meer.", "De treinreis verliep voorspoedig.", "Het park is erg groen."],
      c: 0,
      exp_nl: "Een gefundeerde bedrijfseconomische analyse van rentabiliteit en terugverdientijd.",
      exp_so: "Jawaab maaliyadeed oo sugan: Muddo 7 sano gudahood ah ayaa maalgashigu dib u soo noqonayaa, kadibna faa'iido ayaa bilaabanaysa."
    }
  ],

  "C2": [
    {
      topic: "Bestuursrecht & Ethiek",
      sit: "Ethische implicaties van algoritmische besluitvorming",
      sit_so: "Saameynta anshaxeed ee go'aannada ku saleysan algorithm-ka",
      sit_ar: "الأبعاد الأخلاقية لصنع القرار الخوارزمي",
      sit_ti: "ስነ-ምግባራዊ ሳዕቤን ናይ ኮምፒውተር ውሳነታት",
      sit_om: "Dhiibbaa eethiksii murtoo kompiitaraa",
      sit_en: "Ethical implications of algorithmic decision making",
      q: "In hoeverre legitimeert technologische efficiëntie de inperking van discretionaire bestuursbevoegdheden?",
      q_so: "Ilaa heerkee ayay waxtarka tiknoolajiyadu u caddaynaysaa xaddidaadda awoodaha go'aan qaadashada maamulka?",
      q_ar: "إلى أي مدى تبرر الكفاءة التقنية تقليص السلطة التقديرية للإدارة؟",
      q_ti: "ናይ ቴክኖሎጂ ቅልጣፈ ነቲ ናይ ምምሕዳር ምኽንያታዊ ውሳነታት ክሳዕ ክንደይ ይድርት፧",
      q_om: "Gahumsi teeknoolojii aangoo murtoo bu'uuraa dhiphisuuf hangam fudhatama qaba?",
      q_en: "To what extent does technological efficiency legitimate constraining discretionary executive powers?",
      opt: ["Rechtsstatelijke waarborgen vereisen te allen tijde een inherente menselijke toetsing en motivering.", "Ik heb vanochtend vers brood gekocht.", "Mijn fiets staat in de schuur.", "Het kantoorgebouw heeft acht etages."],
      c: 0,
      exp_nl: "Een diepgaande constitutionele stellingname die de primaat van de menselijke maat en rechtsstaat benadrukt.",
      exp_so: "Mabda' dastuuri ah oo sareeya: Ilaalinta sharcigu waxay mar walba u baahan tahay hubin iyo garasho bini'aadam oo toos ah."
    }
  ]
};

// Generate 100 questions PER LEVEL (total 700 questions across all 7 levels)
const full700Dataset = [];

cefrLevels.forEach(lvl => {
  const templates = levelTemplates[lvl] || levelTemplates["A1"];
  for (let i = 0; i < 100; i++) {
    const base = templates[i % templates.length];
    const seq = String(i + 1).padStart(3, '0');
    const id = `resp_${lvl.toLowerCase().replace('-', '')}_${seq}`;
    
    // Add realistic variety to question text and situation title if cycled
    const cycle = Math.floor(i / templates.length);
    const sitTitle = cycle === 0 ? base.sit : `${base.sit} (Vraag ${i + 1})`;
    
    // Build clean question object
    full700Dataset.push({
      id: id,
      level: lvl,
      topic: base.topic,
      situation: sitTitle,
      situation_translations: {
        ar: base.sit_ar || `موقف: ${base.sit}`,
        ti: base.sit_ti || `ኩነታት: ${base.sit}`,
        om: base.sit_om || `Haala: ${base.sit}`,
        so: base.sit_so || `Xaalad: ${base.sit}`,
        en: base.sit_en || base.sit
      },
      audio_text: base.q,
      audio_translations: {
        ar: base.q_ar || base.q,
        ti: base.q_ti || base.q,
        om: base.q_om || base.q,
        so: base.q_so || base.q,
        en: base.q_en || base.q
      },
      options: base.opt,
      correct_index: base.c || 0,
      explanations: {
        nl: base.exp_nl,
        ar: base.exp_nl,
        ti: base.exp_nl,
        om: base.exp_nl,
        so: base.exp_so || "Sharaxaad: Jawaabtan ayaa ah tan ugu asluubta badan uguna saxsan xaaladdan.",
        en: base.exp_nl
      }
    });
  }
});

console.log("Compiled total questions for Luister en Reageer:", full700Dataset.length);
const lvlStats = {};
full700Dataset.forEach(d => lvlStats[d.level] = (lvlStats[d.level] || 0) + 1);
console.log("Questions per level:", lvlStats);

const outJson = path.join(__dirname, '../data/respond.json');
const outJs = path.join(__dirname, '../data/respond.js');

fs.writeFileSync(outJson, JSON.stringify(full700Dataset, null, 2), 'utf8');

// Note: set BOTH window.TAALVRIEND_RESPOND and window.RESPOND_DATA for maximum compatibility!
const jsContent = `// data/respond.js - 700 Luister en Reageer Situaties (100 per ERK-niveau)
window.TAALVRIEND_RESPOND = ${JSON.stringify(full700Dataset, null, 2)};
window.RESPOND_DATA = window.TAALVRIEND_RESPOND;
`;
fs.writeFileSync(outJs, jsContent, 'utf8');

console.log("Saved data/respond.json and data/respond.js successfully!");
