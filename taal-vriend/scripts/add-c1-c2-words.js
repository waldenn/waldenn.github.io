const fs = require('fs');
const path = require('path');

const wordsJsonPath = path.join(__dirname, '../data/words.json');
const wordsJsPath = path.join(__dirname, '../data/words.js');

const existingWords = JSON.parse(fs.readFileSync(wordsJsonPath, 'utf8'));

const makeSvg = (txt) => `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="#eff6ff" stroke="#3b82f6" stroke-width="4"/><text x="50" y="58" font-size="28" font-family="sans-serif" font-weight="bold" fill="#1d4ed8" text-anchor="middle">${txt}</text></svg>`;

const c1Words = [
  {
    word: 'de besluitvorming',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'De transparante besluitvorming binnen de organisatie versterkt het onderlinge vertrouwen.',
    simple_example: 'Samen beslissen.',
    translations: {
      ar: 'صنع القرار',
      ti: 'ውሳነ ምሃብ',
      om: 'Murtii kennuu',
      so: 'Go\'aan gaarid',
      en: 'decision-making'
    },
    example_translations: {
      ar: 'صنع القرار الشفاف داخل المؤسسة يعزز الثقة المتبادلة.',
      ti: 'ግሉጽ ኣሰራርሓ ውሳነ ኣብቲ ትካል ናይ ሓባር ምትእምማን የደልድል።',
      om: 'Adeemsi murtii ifa ta\'e dhaabbaticha keessatti wal-amanuu cimsa.',
      so: 'Go\'aan gaarista hufan ee ururka dhexdiisa waxay xoojisaa kalsoonida.',
      en: 'Transparent decision-making within the organization strengthens mutual trust.'
    }
  },
  {
    word: 'de doelmatigheid',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'De commissie onderzoekt de doelmatigheid van het nieuwe overheidsbeleid.',
    simple_example: 'Goed en nuttig werken.',
    translations: {
      ar: 'الكفاءة والفعالية',
      ti: 'ብቕዓት / ውጽኢታውነት',
      om: 'Ga\'umsa hojii',
      so: 'Waxtarnimo iyo hufnaan',
      en: 'efficiency / effectiveness'
    },
    example_translations: {
      ar: 'تحقق اللجنة في فعالية السياسة الحكومية الجديدة.',
      ti: 'እቲ ኮሚቴ ብቕዓት ናይቲ ሓድሽ ናይ መንግስቲ ፖሊሲ ይምርምር ኣሎ።',
      om: 'Komiitiin sun ga\'umsa imaammata mootummaa haaraa qorata.',
      so: 'Guddidu waxay baaraysaa waxtarka siyaasadda cusub ee dowladda.',
      en: 'The committee investigates the efficiency of the new government policy.'
    }
  },
  {
    word: 'de onderhandeling',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'Na langdurige onderhandelingen bereikten de partijen een bindend akkoord.',
    simple_example: 'Praten over afspraken.',
    translations: {
      ar: 'المفاوضات',
      ti: 'ድርድር',
      om: 'Marii fi waldhabdee hiikuu',
      so: 'Wada xaajood',
      en: 'negotiation'
    },
    example_translations: {
      ar: 'بعد مفاوضات طويلة توصلت الأطراف إلى اتفاق ملزم.',
      ti: 'ድሕሪ ነዊሕ ድርድር እቶም ወገናት ቀያዲ ስምምዕ ገይሮም።',
      om: 'Marii dheeraa booda qaamoleen lamaan waliigaltee irra ga\'an.',
      so: 'Wada xaajood dheer ka dib, dhinacyadu waxay gaareen heshiis qasab ah.',
      en: 'After lengthy negotiations, the parties reached a binding agreement.'
    }
  },
  {
    word: 'de overeenkomst',
    category: 'Gemeente & Documenten',
    level: 'C1',
    example: 'Beide partijen hebben de officiële overeenkomst vandaag ondertekend.',
    simple_example: 'Het contract.',
    translations: {
      ar: 'الاتفاقية / العقد',
      ti: 'ስምምዕ / ውዕል',
      om: 'Waliigaltee',
      so: 'Heshiis rasmi ah',
      en: 'agreement / contract'
    },
    example_translations: {
      ar: 'وقع كلا الطرفين على الاتفاقية الرسمية اليوم.',
      ti: 'ክልቲኦም ወገናት ነቲ ወግዓዊ ስምምዕ ሎሚ ፈሪሞምዎ።',
      om: 'Gareewwan lamaanuu waliigaltee iftoomina qabu har\'a mallatteessan.',
      so: 'Labada dhinacba waxay maanta saxiixeen heshiiska rasmiga ah.',
      en: 'Both parties signed the official agreement today.'
    }
  },
  {
    word: 'de integriteit',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'Integriteit staat centraal in de beroepscode van alle medewerkers.',
    simple_example: 'Eerlijk zijn.',
    translations: {
      ar: 'النزاهة والأمانة',
      ti: 'ቅንዕና / ተኣማንነት',
      om: 'Amanamtummaa',
      so: 'Daqiiqad iyo daacadnimo',
      en: 'integrity / honesty'
    },
    example_translations: {
      ar: 'النزاهة هي جوهر ميثاق الشرف المهني لجميع الموظفين.',
      ti: 'ቅንዕና ኣብ ናይ ሞያ ስነ-ምግባር ኩሎም ሰራሕተኛታት ማእከላይ ቦታ ኣለዎ።',
      om: 'Amanamtummaan qajeelfama ogummaa hojjettoota maraa keessatti isa ijoodha.',
      so: 'Daacadnimadu waa udub dhexaadka xeerka anshaxa ee dhammaan shaqaalaha.',
      en: 'Integrity is central to the professional code of all employees.'
    }
  },
  {
    word: 'de wetgeving',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'De nieuwe Europese wetgeving treedt volgend jaar officieel in werking.',
    simple_example: 'De officiële wetten.',
    translations: {
      ar: 'التشريع / القوانين',
      ti: 'ሕጊታት',
      om: 'Seera baasuu',
      so: 'Xeer-dejinta',
      en: 'legislation'
    },
    example_translations: {
      ar: 'التشريع الأوروبي الجديد سيدخل حيز التنفيذ رسمياً العام المقبل.',
      ti: 'እቲ ሓድሽ ናይ ኤውሮጳ ሕጊ ዝመጽእ ዓመት ኣብ ግብሪ ይውዕል።',
      om: 'Seerri haaraan Awurooppaa waggaa dhufu hojiirra oola.',
      so: 'Xeer-dejinta cusub ee Yurub waxay si rasmi ah u dhaqangeli doontaa sanadka dambe.',
      en: 'The new European legislation will officially enter into force next year.'
    }
  },
  {
    word: 'de grondwet',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'Artikel één van de Grondwet waarborgt gelijke behandeling van alle burgers.',
    simple_example: 'De belangrijkste wet van het land.',
    translations: {
      ar: 'الدستور',
      ti: 'ቅዋም / ቅዋመ-መንግስቲ',
      om: 'Heera mootummaa',
      so: 'Dastuurka qaranka',
      en: 'constitution'
    },
    example_translations: {
      ar: 'المادة الأولى من الدستور تضمن المعاملة المتساوية لجميع المواطنين.',
      ti: 'ዓንቀጽ ሓደ ናይቲ ቅዋም ማዕረ ኣተሓሕዛ ኩሎም ዜጋታት የረጋግጽ።',
      om: 'Keeyyanni tokkoffaa heera mootummaa qixxummaa lammiilee hunda mirkaneessa.',
      so: 'Qodobka koowaad ee dastuurku wuxuu xaqiijinayaa caddaalad loo siman yahay dhammaan muwaadiniinta.',
      en: 'Article one of the Constitution guarantees equal treatment of all citizens.'
    }
  },
  {
    word: 'de transparantie',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'De minister pleit voor maximale transparantie over de overheidsuitgaven.',
    simple_example: 'Open en duidelijk zijn.',
    translations: {
      ar: 'الشفافية والوضوح',
      ti: 'ግሉጽነት',
      om: 'Iftoomina',
      so: 'Hufnaan buuxda',
      en: 'transparency'
    },
    example_translations: {
      ar: 'يطالب الوزير بأقصى قدر من الشفافية بشأن نفقات الحكومة.',
      ti: 'እቲ ሚኒስተር ብዛዕባ ናይ መንግስቲ ወጻኢታት ዝለዓለ ግሉጽነት ክህሉ ይሓትት።',
      om: 'Ministirichi baasii mootummaa ilaalchisee iftoominni olaanaan akka jiraatu gaafata.',
      so: 'Wasiirku wuxuu ku baaqayaa hufnaan buuxda oo ku saabsan kharashyada dowladda.',
      en: 'The minister advocates maximum transparency regarding government expenditure.'
    }
  },
  {
    word: 'de innovatie',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'Investeren in duurzame innovatie stimuleert de economische groei.',
    simple_example: 'Nieuwe ideeën en techniek.',
    translations: {
      ar: 'الابتكار والتجديد',
      ti: 'ሓደሽቲ ምህዞታት',
      om: 'Kalaqa haaraa',
      so: 'Hal-abuurka cusub',
      en: 'innovation'
    },
    example_translations: {
      ar: 'الاستثمار في الابتكار المستدام يحفز النمو الاقتصادي.',
      ti: 'ኣብ ዘላቒ ምህዞታት ምውፋር ንቁጠባዊ ዕብየት የተባብዕ።',
      om: 'Kalaqa itti fufiinsa qabu irratti invast gochuun guddina dinagdee cimsa.',
      so: 'Maalgashiga hal-abuurka waara wuxuu dhiirrigeliyaa kobaca dhaqaalaha.',
      en: 'Investing in sustainable innovation stimulates economic growth.'
    }
  },
  {
    word: 'de biodiversiteit',
    category: 'Natuur & Weer',
    level: 'C1',
    example: 'Het behoud van biodiversiteit is cruciaal voor een gezond ecosysteem.',
    simple_example: 'Veel verschillende planten en dieren.',
    translations: {
      ar: 'التنوع البيولوجي',
      ti: 'ስነ-ህይወታዊ ብዙሕነት',
      om: 'Lubbu-qabeeyyii adda addaa',
      so: 'Kala duwanaanshaha noolaha',
      en: 'biodiversity'
    },
    example_translations: {
      ar: 'الحفاظ على التنوع البيولوجي أمر بالغ الأهمية لنظام بيئي صحي.',
      ti: 'ስነ-ህይወታዊ ብዙሕነት ምክልኻል ንጥዑይ ከባቢ ኣዝዩ ኣገዳሲ እዩ።',
      om: 'Lubbu-qabeeyyii eeguun naannoo fayyaalessaaf murteessaadha.',
      so: 'Iskudheelitirka noolaha kala duwan wuxuu muhiim u yahay nidaamka deegaanka.',
      en: 'Preserving biodiversity is crucial for a healthy ecosystem.'
    }
  },
  {
    word: 'het perspectief',
    category: 'Emoties & Gevoelens',
    level: 'C1',
    example: 'We moeten dit vraagstuk vanuit een ander perspectief benaderen.',
    simple_example: 'Hoe je naar iets kijkt.',
    translations: {
      ar: 'وجهة النظر / المنظور',
      ti: 'ኣመለኻኽታ / ርእይቶ',
      om: 'Ilaalcha',
      so: 'Aragti / qaabka wax loo eego',
      en: 'perspective / point of view'
    },
    example_translations: {
      ar: 'علينا أن نتناول هذه المسألة من وجهة نظر أخرى.',
      ti: 'ነዚ ጉዳይ ካብ ካልእ ኣመለኻኽታ ሪኢና ክንቀርቦ ኣለና።',
      om: 'Dhimma kana gama biraatiin ilaaluu qabna.',
      so: 'Waa inaan arrintan ka eegnaa dhinac kale oo cusub.',
      en: 'We need to approach this issue from another perspective.'
    }
  },
  {
    word: 'de consensus',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'Na uren overleg bereikten de raadsleden brede consensus over het voorstel.',
    simple_example: 'Iedereen is het eens.',
    translations: {
      ar: 'الإجماع والتوافق',
      ti: 'ስምምዕ ሓሳብ',
      om: 'Waliigaltee waliigalaa',
      so: 'Heshiis la isku raacsan yahay',
      en: 'consensus / broad agreement'
    },
    example_translations: {
      ar: 'بعد ساعات من المشاورات توصل أعضاء المجلس إلى توافق واسع حول الاقتراح.',
      ti: 'ድሕሪ ናይ ሰዓታት ምይይጥ ኣባላት ቤት ምኽሪ ሰፊሕ ስምምዕ ረኺቦም።',
      om: 'Marii sa\'aatii dheeraa booda miseensonni yaada dhiyaate irratti waliigalan.',
      so: 'Wadatashi saacado qaatay ka dib, xildhibaanadu waxay gaareen heshiis la isku wada raacay.',
      en: 'After hours of consultation, council members reached broad consensus on the proposal.'
    }
  },
  {
    word: 'de nuance',
    category: 'Onderwijs & School',
    level: 'C1',
    example: 'In een goed academisch debat is altijd ruimte voor nuance.',
    simple_example: 'Klein belangrijk verschil.',
    translations: {
      ar: 'الفارق الدقيق / التمييز',
      ti: 'ደቂቕ ፍልልይ',
      om: 'Garaagarummaa xiqqoo',
      so: 'Farqi yar oo micno weyn leh',
      en: 'nuance / subtle distinction'
    },
    example_translations: {
      ar: 'في النقاش الأكاديمي الجيد هناك دائماً مجال للفروق الدقيقة.',
      ti: 'ኣብ ጽቡቕ ናይ ትምህርቲ ክትዕ ኩሉ ግዜ ንደቂቕ ፍልልያት ቦታ ኣሎ።',
      om: 'Falmii barnootaa gaarii keessatti garaagarummaa xiqqoof bakki ni jiraata.',
      so: 'Doodda aqooneed ee fiican mar walba meel bay u leedahay farqiyada yaryar.',
      en: 'In a good academic debate, there is always room for nuance.'
    }
  },
  {
    word: 'de interactie',
    category: 'Onderwijs & School',
    level: 'C1',
    example: 'Actieve interactie tussen student en docent verhoogt het leerrendement.',
    simple_example: 'Samen praten en reageren.',
    translations: {
      ar: 'التفاعل والتواصل',
      ti: 'ምትእስሳር / ርክብ',
      om: 'Wal-qunnamtii fi waldhabdee',
      so: 'Isdhexgalka iyo wada shaqaynta',
      en: 'interaction'
    },
    example_translations: {
      ar: 'التفاعل النشط بين الطالب والمعلم يزيد من كفاءة التعلم.',
      ti: 'ንጡፍ ርክብ ኣብ መንጎ ተምሃራይን መምህርን ንውጽኢት ትምህርቲ የዕብዮ።',
      om: 'Wal-qunnamtiin barataa fi barsiisaa gidduu jiru bu\'aa barnootaa dabala.',
      so: 'Isdhexgalka firfircoon ee ardayga iyo macallinka wuxuu kordhiyaa tayada waxbarashada.',
      en: 'Active interaction between student and teacher increases learning outcomes.'
    }
  },
  {
    word: 'de solidariteit',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'Maatschappelijke solidariteit vormt het fundament van onze verzorgingsstaat.',
    simple_example: 'Elkaar helpen.',
    translations: {
      ar: 'التضامن والتكافل',
      ti: 'ምትሕግጋዝ / ሓድነት',
      om: 'Waliin dhaabbachuu',
      so: 'Is-garab-istaagga iyo wadajirka',
      en: 'solidarity'
    },
    example_translations: {
      ar: 'التضامن الاجتماعي يشكل أساس دولة الرفاه لدينا.',
      ti: 'ማሕበራዊ ምትሕግጋዝ መሰረት ናይቲ ናይ ድሕነት ስርዓትና እዩ።',
      om: 'Waliin dhaabbachuun hawaasaa bu\'uura mootummaa keenyaati.',
      so: 'Wadajirka bulshadu waa aasaaska nidaamka daryeelka bulshada.',
      en: 'Social solidarity forms the foundation of our welfare state.'
    }
  },
  {
    word: 'de professionalisering',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'Gerichte nascholing bevordert de verdere professionalisering van het team.',
    simple_example: 'Beter worden in je vak.',
    translations: {
      ar: 'التطوير المهني / الاحتراف',
      ti: 'ምዕባለ ሞያ',
      om: 'Ogummaa guddisuu',
      so: 'Horumarinta xirfadeed',
      en: 'professionalization'
    },
    example_translations: {
      ar: 'التدريب المستمر المستهدف يعزز التطوير المهني للفريق.',
      ti: 'ቀጻሊ ስልጠና ንሞያዊ ብቕዓት ናይቲ ጋንታ የዕብዮ።',
      om: 'Leenjiin itti fufiinsaa ga\'umsa garee sanaa dabala.',
      so: 'Tababarka joogtada ahi wuxuu kordhiyaa xirfadda kooxda.',
      en: 'Targeted further training promotes the further professionalization of the team.'
    }
  },
  {
    word: 'de rechtvaardigheid',
    category: 'Samenleving & Politiek',
    level: 'C1',
    example: 'Iedereen streeft naar een samenleving gebaseerd op sociale rechtvaardigheid.',
    simple_example: 'Eerlijk behandeld worden.',
    translations: {
      ar: 'العدالة والإنصاف',
      ti: 'ፍትሒ',
      om: 'Haqiqa fi haqqummaa',
      so: 'Caddaalad iyo sinnaan',
      en: 'justice / fairness'
    },
    example_translations: {
      ar: 'يسعى الجميع إلى مجتمع يقوم على العدالة الاجتماعية.',
      ti: 'ኩሉ ሰብ ኣብ ማሕበራዊ ፍትሒ ዝተመስረተ ሕብረተሰብ ክህሉ ይጽዕር።',
      om: 'Hunduu hawaasa haqa hawaasummaa irratti hundaa\'e barbaada.',
      so: 'Qof walba wuxuu rabaa bulsho ku dhisan caddaalad dhab ah.',
      en: 'Everyone strives for a society based on social justice.'
    }
  },
  {
    word: 'het leiderschap',
    category: 'Werk & Beroep',
    level: 'C1',
    example: 'Effectief leiderschap inspireert medewerkers om het beste uit zichzelf te halen.',
    simple_example: 'De baas zijn op een goede manier.',
    translations: {
      ar: 'القيادة الفعالة',
      ti: 'መሪሕነት',
      om: 'Hogganummaa',
      so: 'Hoggaamin wanaagsan',
      en: 'leadership'
    },
    example_translations: {
      ar: 'القيادة الفعالة تلهم الموظفين لتقديم أفضل ما لديهم.',
      ti: 'ውጽኢታዊ መሪሕነት ንሰራሕተኛታት ዝበለጸ ንክገብሩ የተባብዖም።',
      om: 'Hogganummaan gaariin hojjettoota kakaasa.',
      so: 'Hoggaaminta wanaagsani waxay dhiirrigelisaa shaqaalaha.',
      en: 'Effective leadership inspires employees to achieve their best.'
    }
  },
  {
    word: 'de communicatie',
    category: 'Post & Communicatie',
    level: 'C1',
    example: 'Heldere interne communicatie voorkomt misverstanden tussen afdelingen.',
    simple_example: 'Duidelijk praten en schrijven.',
    translations: {
      ar: 'التواصل الفعال',
      ti: 'ርክብ / ምልውዋጥ ሓሳብ',
      om: 'Qunnamtii',
      so: 'Xiriir iyo wada hadal',
      en: 'communication'
    },
    example_translations: {
      ar: 'التواصل الداخلي الواضح يمنع سوء الفهم بين الأقسام.',
      ti: 'ንጹር ናይ ውሽጢ ርክብ ኣብ መንጎ ክፍሊታት ምድንጋር ይከላኸል።',
      om: 'Qunnamtiin ifa ta\'e wal-hubannoo dhabuu hir\'isa.',
      so: 'Xiriirka hufan ee guduhu wuxuu ka hortagaa is-fahamwaaga.',
      en: 'Clear internal communication prevents misunderstandings between departments.'
    }
  },
  {
    word: 'de duurzaamheid',
    category: 'Natuur & Weer',
    level: 'C1',
    example: 'Duurzaamheid is een topprioriteit in het nieuwe gemeentelijke beleidsplan.',
    simple_example: 'Zuinig zijn op het milieu.',
    translations: {
      ar: 'الاستدامة البيئية',
      ti: 'ዘላቕነት',
      om: 'Itti fufiinsa gaarii',
      so: 'Waarnaan iyo ilaalinta deegaanka',
      en: 'sustainability'
    },
    example_translations: {
      ar: 'الاستدامة هي أولوية قصوى في خطة عمل البلدية الجديدة.',
      ti: 'ዘላቕነት ኣብቲ ናይ ምምሕዳር ሓድሽ ውጥን ቀዳምነት ኣለዎ።',
      om: 'Itti fufiinsi imaammata haaraa keessatti dursa argata.',
      so: 'Waarnida deegaanku waa mudnaanta koowaad ee qorshaha dowladda hoose.',
      en: 'Sustainability is a top priority in the new municipal policy plan.'
    }
  }
];

const c2Words = [
  {
    word: 'de rechtsstatelijkheid',
    category: 'Samenleving & Politiek',
    level: 'C2',
    example: 'De bescherming van de rechtsstatelijkheid vergt voortdurende waakzaamheid van burgers en rechters.',
    simple_example: 'De wet geldt voor iedereen gelijk.',
    translations: {
      ar: 'سيادة القانون والدولة القانونية',
      ti: 'ልዕልና ሕጊ',
      om: 'Olaantummaa seeraa',
      so: 'Saraynta sharciga iyo dawladnimada',
      en: 'rule of law / constitutionalism'
    },
    example_translations: {
      ar: 'حماية سيادة القانون تتطلب يقظة دائمة من المواطنين والقضاة.',
      ti: 'ልዕልና ሕጊ ምክልኻል ቀጻሊ ንቕሓት ናይ ዜጋታትን ፈረድትን ይሓትት።',
      om: 'Olaantummaa seeraa eeguun dammaqina lammiilee fi abbootii seeraa barbaada.',
      so: 'Ilaalinta saraynta sharcigu waxay u baahan tahay feejignaan joogto ah.',
      en: 'Protecting the rule of law requires continuous vigilance from citizens and judges.'
    }
  },
  {
    word: 'de soevereiniteit',
    category: 'Samenleving & Politiek',
    level: 'C2',
    example: 'Nationale soevereiniteit moet worden afgewogen tegen internationale verdragsverplichtingen.',
    simple_example: 'Zelf de baas zijn in je eigen land.',
    translations: {
      ar: 'السيادة الوطنية المستقلة',
      ti: 'ልኡላውነት',
      om: 'Bilisummaa guutuu',
      so: 'Qaranimada iyo madax-bannaanida',
      en: 'sovereignty'
    },
    example_translations: {
      ar: 'يجب الموازنة بين السيادة الوطنية والالتزامات الدولية.',
      ti: 'ሃገራዊ ልኡላውነት ምስ ኣህጉራዊ ግዴታታት ሚዛን ክሕለወሉ ኣለዎ።',
      om: 'Bilisummaan biyyaalessaa dirqamoota idil-addunyaa wajjin madaalamuu qaba.',
      so: 'Madax-bannaanida qaranka waa in lala miisaamaa ballamaha caalamiga ah.',
      en: 'National sovereignty must be weighed against international treaty obligations.'
    }
  },
  {
    word: 'de coherentie',
    category: 'Onderwijs & School',
    level: 'C2',
    example: 'De conceptuele coherentie van het proefschrift werd door alle commissieleden geprezen.',
    simple_example: 'Alles past logisch in elkaar.',
    translations: {
      ar: 'الترابط المنطقي والتماسك',
      ti: 'ምትእስሳር ሓሳባት',
      om: 'Wal-simiinsa yaadaa',
      so: 'Isku-xirnaan iyo isku-dheelitir macquul ah',
      en: 'coherence / logical consistency'
    },
    example_translations: {
      ar: 'أشاد جميع أعضاء اللجنة بالترابط المنطقي لرسالة الدكتوراه.',
      ti: 'ኩሎም ኣባላት ኮሚቴ ነቲ ናይቲ ምርምር ምትእስሳር ሓሳባት ነኣድዎም።',
      om: 'Miseensonni qorannichaa wal-simiinsa qorannoo sanaa dinqisiifatan.',
      so: 'Dhammaan xubnaha guddidu waxay bogaadiyeen isku-xirnaanta cilmi-baarista.',
      en: 'The conceptual coherence of the dissertation was praised by all committee members.'
    }
  },
  {
    word: 'de ambivalentie',
    category: 'Gevoelens & Emoties',
    level: 'C2',
    example: 'Haar houding ten aanzien van het controversiële voorstel kenmerkt zich door diepe ambivalentie.',
    simple_example: 'Tegenstrijdige gevoelens hebben.',
    translations: {
      ar: 'التناقض الوجداني / الازدواجية',
      ti: 'ድርብ ስምዒት',
      om: 'Shakkii fi yaada lama qabaachuu',
      so: 'Laba-kaclayn / laba-dareen is-diiddan',
      en: 'ambivalence / mixed feelings'
    },
    example_translations: {
      ar: 'يتسم موقفها تجاه الاقتراح المثير للجدل بازدواجية عميقة في المشاعر.',
      ti: 'ኣብቲ ዘከራኽር ሓሳብ ዘለዋ ኣረኣእያ ድርብ ስምዒት ዝመልኦ እዩ።',
      om: 'Ilaalchi isheen yaada dhiyaateef qabdu yaada wal-faallessuudha.',
      so: 'Mowqifkeeda ku aaddan soo jeedinta muranka dhalisay waxaa ka muuqda laba-dareen.',
      en: 'Her attitude towards the controversial proposal is characterized by deep ambivalence.'
    }
  },
  {
    word: 'het paradigma',
    category: 'Onderwijs & School',
    level: 'C2',
    example: 'Deze wetenschappelijke ontdekking veroorzaakte een fundamentele verschuiving in het heersende paradigma.',
    simple_example: 'Een vaste manier van denken.',
    translations: {
      ar: 'النموذج الفكري الأساسي',
      ti: 'መርኣያ ኣተሓሳስባ',
      om: 'Madaallii beekumsaa',
      so: 'Hab-fekerka aasaasiga ah',
      en: 'paradigm'
    },
    example_translations: {
      ar: 'أحدث هذا الاكتشاف العلمي تحولاً جذرياً في النموذج الفكري السائد.',
      ti: 'እዚ ስነ-ፍልጠታዊ ምህዞ ኣብቲ ዝነበረ ኣተሓሳስባ መሰረታዊ ለውጢ ኣምጺኡ።',
      om: 'Argannoon saayinsii kun ilaalcha duraanii irratti jijjiirama guddaa fide.',
      so: 'Daahfurkan sayniska ah wuxuu keenay isbeddel weyn hab-fekerka guud.',
      en: 'This scientific discovery caused a fundamental shift in the prevailing paradigm.'
    }
  },
  {
    word: 'de dichotomie',
    category: 'Onderwijs & School',
    level: 'C2',
    example: 'De auteur verwerpt de strikte dichotomie tussen theorie en alledaagse praktijk.',
    simple_example: 'Splitsing in twee tegenpolen.',
    translations: {
      ar: 'الانقسام الثنائي / الازدواجية',
      ti: 'ናብ ክልተ ምምቃል',
      om: 'Bakka lamatti qoodamuu',
      so: 'Kala qaybsanaanta laba qeybood',
      en: 'dichotomy'
    },
    example_translations: {
      ar: 'يرفض الكاتب الانقسام الصارم بين النظرية والممارسة اليومية.',
      ti: 'እቲ ጸሓፊ ኣብ መንጎ ክልሰ-ሓሳብን ግብራውን ዘሎ ጽኑዕ ምክፍፋል ይነጽጎ።',
      om: 'Barreesichi qoodama yaadaa fi hojii qabatamaa gidduu jiru hin fudhatu.',
      so: 'Qoraagu wuxuu diidayaa kala-soocidda adag ee u dhexeysa aragtida iyo ficilka.',
      en: 'The author rejects the strict dichotomy between theory and everyday practice.'
    }
  },
  {
    word: 'de contingentie',
    category: 'Onderwijs & School',
    level: 'C2',
    example: 'Historische gebeurtenissen worden dikwijls gekenmerkt door een hoge mate van contingentie.',
    simple_example: 'Iets wat toevallig zo is gelopen.',
    translations: {
      ar: 'المصادفة والاحتمالية التاريخية',
      ti: 'ኣጋጣሚ',
      om: 'Tasa ta\'uu',
      so: 'Fursad ama xaalad lama filaan ah',
      en: 'contingency / chance occurrence'
    },
    example_translations: {
      ar: 'غالباً ما تتسم الأحداث التاريخية بدرجة عالية من الاحتمالية والمصادفة.',
      ti: 'ታሪኻዊ ፍጻመታት መብዛሕትኡ ግዜ ብኣጋጣሚታት ዝተመልአ እዩ።',
      om: 'Taateewwan seenaa yeroo baay\'ee tasa mudatu.',
      so: 'Dhacdooyinka taariikhiga ah waxaa inta badan ku badan xaalado lama filaan ah.',
      en: 'Historical events are frequently characterized by a high degree of contingency.'
    }
  },
  {
    word: 'de complementariteit',
    category: 'Werk & Beroep',
    level: 'C2',
    example: 'De complementariteit van hun onderscheidende vaardigheden maakte het team bijzonder succesvol.',
    simple_example: 'Elkaar perfect aanvullen.',
    translations: {
      ar: 'التكامل والتتام',
      ti: 'ምምልላእ ክእለት',
      om: 'Wal-guutuu',
      so: 'Isku-dhammaystirka tayada',
      en: 'complementarity'
    },
    example_translations: {
      ar: 'إن تكامل مهاراتهم المتميزة جعل الفريق ناجحاً بشكل استثنائي.',
      ti: 'ናይ ክእለቶም ምምልላእ ነታ ጋንታ ኣዝያ ዕውትቲ ገይርዋ።',
      om: 'Dandeettii wal-guutu qabaachuun isaanii garee sana milkeesse.',
      so: 'Isku-dhammaystirka xirfadahooda kala duwan wuxuu kooxda ka dhigay mid guul gaarta.',
      en: 'The complementarity of their distinct skills made the team exceptionally successful.'
    }
  },
  {
    word: 'de deliberatie',
    category: 'Samenleving & Politiek',
    level: 'C2',
    example: 'Grondige democratische deliberatie is onontbeerlijk voor weloverwogen beleidsbeslissingen.',
    simple_example: 'Heel zorgvuldig overleggen.',
    translations: {
      ar: 'التداول والتشاور المعمق',
      ti: 'ዕቱብ ምኽሪ',
      om: 'Marii gad-fagoo',
      so: 'Wada tashi qoto dheer',
      en: 'deliberation'
    },
    example_translations: {
      ar: 'التداول الديمقراطي الشامل لا غنى عنه لاتخاذ قرارات سياسية مدروسة.',
      ti: 'ዕቱብ ዲሞክራስያዊ ምኽሪ ንጽቡቕ ውሳነታት ኣዝዩ ኣገዳሲ እዩ።',
      om: 'Marii dimokiraatawaa cimaan murtii gaarii dabarsuuf barbaachisaadha.',
      so: 'Wada tashi dimoqraadi ah oo qoto dheer waa lagama maarmaan go\'aamo sugan.',
      en: 'Thorough democratic deliberation is indispensable for well-considered policy decisions.'
    }
  },
  {
    word: 'de reciprociteit',
    category: 'Sociale Relaties',
    level: 'C2',
    example: 'Duurzame diplomatieke betrekkingen rusten op het onwrikbare principe van wederzijdse reciprociteit.',
    simple_example: 'Over en weer hetzelfde doen.',
    translations: {
      ar: 'المعاملة بالمثل والتبادلية',
      ti: 'ናይ ሓባር ምልውዋጥ / ምትእምማን',
      om: 'Wal-fakkaachuu gochaa',
      so: 'Is-dhaafsiga siman ee xiriirka',
      en: 'reciprocity / mutual exchange'
    },
    example_translations: {
      ar: 'ترتكز العلاقات الدبلوماسية الدائمة على مبدأ المعاملة بالمثل الثابت.',
      ti: 'ዘላቒ ዲፕሎማስያዊ ርክባት ኣብ ናይ ሓባር ምልውዋጥ ዝተመስረተ እዩ።',
      om: 'Qunnamtiin dippilomaasii wal-qixxummaa irratti hundaa\'a.',
      so: 'Xiriirka diblomaasiyadeed ee waara wuxuu ku tiirsan yahay is-dhaafsi siman.',
      en: 'Sustainable diplomatic relations rest on the unwavering principle of mutual reciprocity.'
    }
  }
];

// Helper to format word entries
let maxIdNum = 2000;
existingWords.forEach(w => {
  const match = (w.id || '').match(/w_\w+_(\d+)/);
  if (match) {
    const n = parseInt(match[1], 10);
    if (!isNaN(n) && n > maxIdNum) maxIdNum = n;
  }
});

const newEntries = [];
[...c1Words, ...c2Words].forEach(item => {
  // Check if already exists
  if (existingWords.some(w => w.word.toLowerCase() === item.word.toLowerCase())) {
    return;
  }
  maxIdNum++;
  const art = item.word.startsWith('de ') ? 'de' : (item.word.startsWith('het ') ? 'het' : '');
  const base = item.word.replace(/^(de|het)\s+/, '');
  newEntries.push({
    word: item.word,
    category: item.category,
    level: item.level,
    example: item.example,
    simple_example: item.simple_example,
    translations: item.translations,
    example_translations: item.example_translations,
    id: `w_${item.level.toLowerCase()}_${maxIdNum}`,
    article: art,
    base_word: base,
    svg: makeSvg(base.slice(0, 2).toUpperCase())
  });
});

console.log(`Adding ${newEntries.length} new C1/C2 words to words.json and words.js...`);
const combinedWords = [...existingWords, ...newEntries];
fs.writeFileSync(wordsJsonPath, JSON.stringify(combinedWords, null, 2), 'utf8');
fs.writeFileSync(wordsJsPath, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(combinedWords, null, 2) + ';\n', 'utf8');
console.log(`Done! Total words now: ${combinedWords.length}`);
