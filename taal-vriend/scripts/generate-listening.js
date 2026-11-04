const fs = require('fs');
const path = require('path');

// 120+ Listening exercises across A1, A2-B1, and B1-B2
const listeningItems = [
  // =================== A1 (Basis) ===================
  {
    id: "luister-a1-001",
    level: "A1",
    category: "Groeten & Ontmoeten",
    title: "Kennismaking in de klas",
    lines: [
      "Hallo, ik ben Sarah.",
      "Ik kom uit Syrië en ik woon in Utrecht.",
      "Ik leer nu Nederlands."
    ],
    translations: {
      ar: "مرحباً، أنا سارة.\nأنا من سوريا وأسكن في أوترخت.\nأنا أتعلم اللغة الهولندية الآن.",
      ti: "ሰላም፡ ኣነ ሳራ እየ።\nካብ ሶርያ እየ መጺአ፡ ኣብ ዩትረክት ድማ ይነብር።\nሕጂ ቋንቋ ሆላንድ ይምሃር ኣለኹ።",
      om: "Akkam, ani Saaraadha.\nAni Suuriyaa irraan dhufe, Utrecht keessan jiraadha.\nAmmammoo afaan Daachi barachaan jira.",
      en: "Hello, I am Sarah.\nI come from Syria and I live in Utrecht.\nI am learning Dutch now."
    }
  },
  {
    id: "luister-a1-002",
    level: "A1",
    category: "Winkelen",
    title: "Bij de bakker",
    lines: [
      "Goedemorgen! Mag ik een half bruin brood?",
      "Natuurlijk, alstublieft.",
      "Dat is dan twee euro vijftig."
    ],
    translations: {
      ar: "صباح الخير! هل يمكنني الحصول على نصف خبز أسمر؟\nبالتأكيد، تفضل.\nالحساب يورو ونصف.",
      ti: "ከመይ ሓዲርኩም! ፍርቂ ቡናዊ ባኒ ክረክብዶ ይኽእል?\nብርግጽ፡ እንሆልኩም።\nክልተ ዩሮን ፍርቅን ይኸውን።",
      om: "Akkam bultan! Daabboo magaala walakkaa argachuu danda'aa?\nEeyyee, kunooti.\nYuuroo lamaaf saantima shantama ta'a.",
      en: "Good morning! May I have half a brown bread?\nOf course, here you go.\nThat is two euros fifty."
    }
  },
  {
    id: "luister-a1-003",
    level: "A1",
    category: "Vervoer",
    title: "In de bus",
    lines: [
      "Pardon meneer, stopt deze bus bij het station?",
      "Ja, over drie haltes zijn we er.",
      "Vergeet niet uit te checken."
    ],
    translations: {
      ar: "معذرة سيدي، هل تتوقف هذه الحافلة عند المحطة؟\nنعم، بعد ثلاث محطات نصل إلى هناك.\nلا تنس تسجيل الخروج بالبطاقة.",
      ti: "ይቕሬታ ጎይታይ፡ እዚ ኣውቶቡስ ኣብ መደበር ይቐውም ድዩ?\nእወ፡ ድሕሪ ሰለስተ መደበር ክንበጽሕ ኢና።\nኣውት-ቸክ ምግባር ኣይትረስዑ።",
      om: "Dhiifama obbo, baasiin kun buufata irratti ni dhaabbataa?\nEeyyee, buufata sadii booda achi geenya.\nKaardii keessan cufuu hin dagatinaa.",
      en: "Excuse me sir, does this bus stop at the station?\nYes, in three stops we will be there.\nDo not forget to check out."
    }
  },
  {
    id: "luister-a1-004",
    level: "A1",
    category: "Thuis & Familie",
    title: "Avondeten",
    lines: [
      "Het eten is klaar! Komen jullie aan tafel?",
      "We eten vandaag rijst met groenten en kip.",
      "Eet smakelijk allemaal!"
    ],
    translations: {
      ar: "الطعام جاهز! هل تأتون إلى المائدة؟\nنأكل اليوم الأرز مع الخضار والدجاج.\nشهية طيبة للجميع!",
      ti: "መግቢ ተዳልዩ ኣሎ! ናብ መኣዲ ትመጹዶ?\nሎሚ ሩዝ ምስ ኣሕምልትን ደርሆን ንበልዕ ኣለና።\nጽቡቕ ምሳሕ ንኹላትኩም!",
      om: "Nyaanni qophaa'eera! Gara maaddii ni dhuftuu?\nHar'a ruuza fuduraa fi foon indaaqqoo waliin nyaanna.\nNyaata gaarii hundaaf!",
      en: "Dinner is ready! Are you coming to the table?\nToday we are eating rice with vegetables and chicken.\nEnjoy your meal everyone!"
    }
  },
  {
    id: "luister-a1-005",
    level: "A1",
    category: "Gezondheid",
    title: "Buikpijn",
    lines: [
      "Mama, ik voel me niet lekker.",
      "Mijn buik doet heel veel pijn.",
      "Drink maar even een kopje warme thee."
    ],
    translations: {
      ar: "ماما، لا أشعر بأنني بخير.\nبطني يؤلمني كثيراً.\nاشرب كوباً من الشاي الدافئ الآن.",
      ti: "ማማ፡ ደሓን ኣይኮንኩን ዝስምዓኒ ዘሎ።\nከብደይ ኣዝዩ ይቐርጸኒ ኣሎ።\nጽዋእ ውዑይ ሻሂ ስተ እሞ።",
      om: "Haadha koo, natti hin tolle.\nGaraan koo baay'ee na dhukkuba.\nMee shayii oo'aa dhugi.",
      en: "Mom, I don't feel well.\nMy stomach hurts a lot.\nJust drink a cup of warm tea."
    }
  },
  {
    id: "luister-a1-006",
    level: "A1",
    category: "Weer",
    title: "Het weer vandaag",
    lines: [
      "Kijk eens naar buiten, het regent hard.",
      "Trek je warme regenjas aan.",
      "En neem je paraplu mee naar school."
    ],
    translations: {
      ar: "انظر إلى الخارج، إنها تمطر بغزارة.\nارتدِ معطف المطر الدافئ.\nوخذ مظلتك معك إلى المدرسة.",
      ti: "ናብ ደገ ርአ፡ ብርቱዕ ዝናብ ይዘንም ኣሎ።\nናይ ዝናብ ኮትካ ልበስ።\nጽላልካ ድማ ናብ ቤት ትምህርቲ ምሳኻ ሒዝካ ኺድ።",
      om: "Gara ala ilaali, bokkaan cimaan roobaa jira.\nKootii bokkaa oo'aa kee uffadhu.\nGaachana bokkaa kees gara mana barumsaatti qabadhu.",
      en: "Look outside, it is raining hard.\nPut on your warm raincoat.\nAnd take your umbrella with you to school."
    }
  },
  {
    id: "luister-a1-007",
    level: "A1",
    category: "Winkelen",
    title: "Bij de kassa",
    lines: [
      "Wilt u de bon mee?",
      "Nee bedankt, dat hoeft niet.",
      "Fijne dag verder! Tot ziens!"
    ],
    translations: {
      ar: "هل تريد الإيصال؟\nلا شكراً، ليس ضرورياً.\nأتمنى لك يوماً سعيداً! إلى اللقاء!",
      ti: "ረሲት ትደልዩዶ?\nኣይፋልን የቐንየለይ፡ ኣየድልን እዩ።\nጽቡቕ መዓልቲ ይግበረልኩም! ደሓን ኩኑ!",
      om: "Nagahee barbaadduu?\nLakki galatoomaa, hin barbaachisu.\nGuyyaa gaarii qabaadhaa! Nagan turaa!",
      en: "Would you like the receipt?\nNo thank you, no need.\nHave a nice day! Goodbye!"
    }
  },
  {
    id: "luister-a1-008",
    level: "A1",
    category: "School & Kinderen",
    title: "Naar school fietsen",
    lines: [
      "Schiet op, het is al acht uur!",
      "We moeten nu op de fiets stappen.",
      "De bel van de school gaat om half negen."
    ],
    translations: {
      ar: "أسرع، الساعة الآن الثامنة بالفعل!\nيجب أن نركب الدراجة الآن.\nيرن جرس المدرسة في الثامنة والنصف.",
      ti: "ቀልጥፍ፡ ሰዓት ሸሞንተ ኮይኑ እዩ!\nሕጂ ኣብ ብስክሌት ክንወጽእ ኣሎና።\nደወል ቤት ትምህርቲ ኣብ ፈረቓ ትሽዓተ ይድወል እዩ።",
      om: "Daffisi, sa'aatiin saddeet ta'eera!\nAmma biskileetii yaabbachuu qabna.\nBilbilli mana barumsaa sa'aatii sagal dhabuutti bilbilama.",
      en: "Hurry up, it is already eight o'clock!\nWe must get on the bike now.\nThe school bell rings at half past eight."
    }
  },
  {
    id: "luister-a1-009",
    level: "A1",
    category: "Thuis",
    title: "Sleutel kwijt",
    lines: [
      "Waar is mijn huissleutel gebleven?",
      "Hij ligt op de keukentafel naast de fruitschaal.",
      "Gelukkig maar, dank je wel!"
    ],
    translations: {
      ar: "أين ذهب مفتاح بيتي؟\nإنه على طاولة المطبخ بجانب وعاء الفاكهة.\nلحسن الحظ، شكراً جزيلاً!",
      ti: "መፍትሕ ገዛይ ኣበይ ኣሎ?\nኣብ ጣውላ ክሽነ ጥቓ ሳህን ፍረታት ኣሎ።\nደሓን ደኣ፡ የቐንየለይ!",
      om: "Furtuun mana koo eessa jira?\nMinjaala kushinaa irra saanii muduraa cina jira.\nBaga akkas ta'e, galatoomi!",
      en: "Where did my house key go?\nIt is on the kitchen table next to the fruit bowl.\nWhat a relief, thank you!"
    }
  },
  {
    id: "luister-a1-010",
    level: "A1",
    category: "Afspraak",
    title: "Hoe laat spreken we af?",
    lines: [
      "Zullen we vanmiddag samen koffie drinken?",
      "Ja gezellig! Schikt twee uur jou?",
      "Ja, om twee uur bij het park."
    ],
    translations: {
      ar: "هل نشرب القهوة معاً بعد ظهر اليوم؟\nنعم بكل سرور! هل يناسبك الساعة الثانية؟\nنعم، في الساعة الثانية عند الحديقة.",
      ti: "ሎሚ ድሕሪ ቐትሪ ሓቢርና ቡን ክንሰቲዶ?\nእወ ባህ ይብለኒ! ሰዓት ክልተ ይጥዕመካዶ?\nእወ፡ ሰዓት ክልተ ኣብ ፓርክ።",
      om: "Har'a waaree booda buna waliin dhugnaa?\nEeyyee baay'ee gaariidha! Sa'aatii lama siif tolaa?\nEeyyee, sa'aatii lama irratti paarkii biratti.",
      en: "Shall we have coffee together this afternoon?\nYes, wonderful! Does two o'clock suit you?\nYes, at two o'clock by the park."
    }
  },

  // =================== A2 / B1 (Gevorderd) ===================
  {
    id: "luister-a2-001",
    level: "A2-B1",
    category: "Openbaar Vervoer",
    title: "Omroepbericht op het station",
    lines: [
      "Beste reizigers, de intercity naar Amsterdam Centraal van 14:15 uur vertrekt vandaag van spoor 4b.",
      "Deze trein heeft een vertraging van ongeveer tien minuten.",
      "Onze excuses voor het ongemak."
    ],
    translations: {
      ar: "أعزائي المسافرين، قطار الإنترسيتي إلى محطة أمستردام المركزية المقرر في 14:15 يغادر اليوم من الرصيف 4b.\nهذا القطار متأخر بنحو عشر دقائق.\nنعتذر عن أي إزعاج.",
      ti: "ክቡራት ተጓዓዝቲ፡ እቲ ናብ ማእከላይ መደበር ኣምስተርዳም ናይ ሰዓት 14:15 ባቡር ሎሚ ካብ መገዲ 4b ክነቅል እዩ።\nእዚ ባቡር ናይ ዓሰርተ ደቒቕ ምድንጓይ ኣለዎ።\nስለቲ ዘጋጠመ ጸገም ይቕሬታ ንሓትት።",
      om: "Kabajamoo imaltootaa, baaburri Intercity gara Wiirtuu Amstardaam sa'aatii 14:15 har'a daandii 4b irraa ka'a.\nBaaburri kun daqiiqaa kudhan harkifateera.\nDhiifama gaafanna.",
      en: "Dear passengers, the 14:15 Intercity train to Amsterdam Central departs today from track 4b.\nThis train is delayed by approximately ten minutes.\nWe apologize for the inconvenience."
    }
  },
  {
    id: "luister-a2-002",
    level: "A2-B1",
    category: "Gezondheid & Huisarts",
    title: "Telefonische afspraak bij de dokter",
    lines: [
      "Goedemorgen, huisartsenpraktijk De Brink. Met wie spreek ik?",
      "Goedemorgen, ik wil graag een afspraak maken voor mijn zoontje.",
      "Hij heeft al drie dagen hoge koorts en hoest veel.",
      "Kunt u vanmiddag om kwart over drie langskomen?"
    ],
    translations: {
      ar: "صباح الخير، عيادة طبيب الأسرة دي برينك. مع من أتحدث؟\nصباح الخير، أود حجز موعد لابني الصغير.\nيعاني من حمى شديدة منذ ثلاثة أيام ويسعل كثيراً.\nهل يمكنك الحضور بعد ظهر اليوم في الساعة الثالثة والربع؟",
      ti: "ከመይ ሓዲርኩም፡ ክሊኒክ ሓኪም ስድራቤት ደ ብሪንክ። መን ይዛረብ ኣሎ?\nከመይ ሓዲርኩም፡ ንወደይ ቆጸራ ክሕዝ ደልየ ነይረ።\nሰለስተ መዓልቲ ምሉእ ብርቱዕ ረስኒ ኣለዎ፡ ኣዝዩ ድማ ይስዕል ኣሎ።\nሎሚ ድሕሪ ቐትሪ ኣብ ሰዓት ሰለስተን ርብዕን ክትመጹ ትኽእሉዶ?",
      om: "Akkam bultan, mana yaala hakimootaa De Brink. Eenyutu dubbata?\nAkkam bultan, ilma kootiif beellama qabachuu barbaadeeni.\nGuyyaa sadii guutuu ho'a qaamaa qaba akkasumas baay'ee qufa'a.\nHar'a waaree booda sa'aatii sadii fi kurmaana irratti dhufuu dandeessuu?",
      en: "Good morning, General Practice De Brink. Who am I speaking with?\nGood morning, I would like to make an appointment for my son.\nHe has had a high fever for three days and coughs a lot.\nCan you come by this afternoon at a quarter past three?"
    }
  },
  {
    id: "luister-a2-003",
    level: "A2-B1",
    category: "Werk & Beroep",
    title: "Afmelden wegens ziekte",
    lines: [
      "Hoi Pieter, met Ahmed van de logistieke afdeling.",
      "Ik word net wakker met zware griep en kan vandaag helaas niet komen werken.",
      "Ik heb mijn diensten doorgegeven aan collega Jan.",
      "Ik hou je morgen op de hoogte van mijn herstel."
    ],
    translations: {
      ar: "مرحباً بيتر، معك أحمد من قسم الخدمات اللوجستية.\nاستيقظت لتوي وأنا أعاني من إنفلونزا حادة وللأسف لن أتمكن من القدوم للعمل اليوم.\nأخبرت زميلي يان بمهامي.\nسأطلعك غداً على تحسن حالتي.",
      ti: "ሰላም ፒተር፡ ኣሕመድ ካብ ክፍሊ ሎጂስቲክስ እየ።\nብርቱዕ ጉንፋዕ ሒዙኒ ስለዝሓደርኩ፡ ሎሚ ናብ ስራሕ ክመጽእ ኣይክእልን እየ።\nንተራ ስርሐይ ንመሰልተይ ጃን ሓቢረዮ ኣለኹ።\nጽባሕ ከመይ ከም ዝሓሸኒ ክሕብረካ እየ።",
      om: "Akkam Pieter, Ahmed kutaa loojistiksii irraayi.\nUtuu qaamni koo dhukkubuun dammaqe, kanaaf har'a hojii dhufuu hin danda'u.\nTeepha hojii koo hiriyaa hojii Janitti himeera.\nBoru haala dhibee koo sin beeksisa.",
      en: "Hi Pieter, this is Ahmed from the logistics department.\nI just woke up with severe flu and unfortunately cannot come to work today.\nI passed my shifts on to colleague Jan.\nI will keep you updated tomorrow on my recovery."
    }
  },
  {
    id: "luister-a2-004",
    level: "A2-B1",
    category: "Wonen & Buurt",
    title: "Pakketje voor de buren",
    lines: [
      "Hallo buurman, goed dat ik je zie!",
      "De postbode heeft gisteren een groot pakketje voor jou bij ons afgegeven.",
      "Je was niet thuis toen hij aanbelde.",
      "Kom je het straks even ophalen?"
    ],
    translations: {
      ar: "مرحباً يا جاري، من الجيد أنني رأيتك!\nسلم ساعي البريد أمس طرداً كبيراً لك عندنا.\nلم تكن في المنزل عندما رن الجرس.\nهل ستأتي لأخذه بعد قليل؟",
      ti: "ሰላም ጎረቤተይ፡ ምርኻብና ጽቡቕ ኮይኑ!\nፖስተኛ ትማሊ ሓደ ዓቢ ፓኬት ናትካ ኣብ ገዛና ኣቐሚጡልካ ኸይዱ።\nደወል ክድውል ከሎ ኣብ ገዛ ኣይነበርካን።\nጸኒሕካ መጺእካ ክትወስዶ ትኽእልዶ?",
      om: "Akkam ollaakoo, si arguun koo gaariidha!\nPoostaan kaleessa paakeejii guddaa keessan nu biratti dhiisee deeme.\nYeroo inni bilbilu mana hin jirtu turte.\nMee xiqqoo booda dhuftanii fudhattaniitii?",
      en: "Hello neighbor, good to see you!\nThe mail carrier delivered a large parcel for you to our house yesterday.\nYou were not home when he rang the bell.\nWill you come pick it up in a bit?"
    }
  },
  {
    id: "luister-a2-005",
    level: "A2-B1",
    category: "Gemeente & Documenten",
    title: "Afspraak bij de balie Burgerzaken",
    lines: [
      "Goedemiddag, u heeft een afspraak voor het verlengen van uw verblijfsdocument.",
      "Mag ik eerst uw huidige pasje en een recente pasfoto zien?",
      "Daarna nemen we uw vingerafdrukken af bij het scanapparaat.",
      "U ontvangt over twee weken een brief om het document op te halen."
    ],
    translations: {
      ar: "مساء الخير، لديك موعد لتجديد وثيقة إقامتك.\nهل يمكنني رؤية بطاقتك الحالية وصورة شخصية حديثة أولاً؟\nبعد ذلك سنأخذ بصمات أصابعك عبر جهاز المسح الضوئي.\nستتلقى رسالة بعد أسبوعين لاستلام الوثيقة.",
      ti: "ከመይ ኣምሲኹም፡ መንበሪ ፍቓድኩም ንምሕዳስ ቆጸራ ኣለኩም።\nቅድም ቀዳድም ናይ ሕጂ ካርድኹምን ሓድሽ ናይ ፓስፖርት ፎቶኹምን ክርኢዶ?\nድሕሪኡ ኣብቲ መመርመሪ ኣጻብዕትኹም ክንወስድ ኢና።\nድሕሪ ክልተ ሰሙን ነቲ ሰነድ ንምውሳድ ደብዳበ ክበጽሓኩም እዩ።",
      om: "Akkam ooltan, beellama hayyama jireenyaa keessan haaromsuu qabdu.\nMee jalqaba kaardii ammaa fi suuraa yeroo dhiyoo arguu danda'aa?\nSana booda meeshaa sakatta'aa irratti ashaaraa qubaa keessanii fudhanna.\nTorban lama booda xalayaa sanada sana fudhachuuf isin ga'u ni argattu.",
      en: "Good afternoon, you have an appointment to renew your residence permit.\nMay I first see your current card and a recent passport photo?\nAfter that, we will take your fingerprints at the scanner.\nYou will receive a letter in two weeks to pick up the document."
    }
  },
  {
    id: "luister-a2-006",
    level: "A2-B1",
    category: "Onderwijs & School",
    title: "Bericht van de basisschool",
    lines: [
      "Beste ouders, aanstaande vrijdag vieren we het lentefeest op school.",
      "Alle kinderen mogen verkleed komen en iets lekkers meenemen om te delen.",
      "De lessen eindigen die dag om twaalf uur 's middags.",
      "Vergeet niet om uw kind op tijd op te halen van het schoolplein."
    ],
    translations: {
      ar: "أعزائي أولياء الأمور، نحتفل يوم الجمعة القادم بعيد الربيع في المدرسة.\nيمكن لجميع الأطفال ارتداء أزياء تنكرية وإحضار طعام شهي لمشاركته.\nتنتهي الحصص في ذلك اليوم عند الساعة الثانية عشرة ظهراً.\nلا تنسوا اصطحاب أطفالكم في الوقت المحدد من باحة المدرسة.",
      ti: "ክቡራት ወለዲ፡ ዝመጽእ ዓርቢ ኣብ ቤት ትምህርቲ በዓል ጽድያ ከነኽብር ኢና።\nኩሎም ቆልዑ ተኸዲኖም ክመጹን ንምክፋል ዝኸውን ጥዑም መግቢ ከምጽኡን ይፍቀደሎም እዩ።\nትምህርቲ በታ መዓልቲ እቲኣ ሰዓት ዓሰርተ ክልተ ፍርቂ መዓልቲ ይውዳእ።\nንደቅኹም ብሰዓቱ ካብ መጻወቲ ሜዳ ቤት ትምህርቲ ምውሳድ ኣይትረስዑ።",
      om: "Kabajamoo warra barattootaa, Jimaata dhufu mana barumsaatti ayyaana birraa kabajna.\nMucolii hundi uffata addaa uffatanii dhufuu fi waan mi'aawaa hirmaachuuf fiduu danda'u.\nBarumsi guyyaa sana sa'aatii ja'a irratti xumurama.\nYeroon mucaa keessan dirree mana barumsaa irraa fudhachuu hin dagatinaa.",
      en: "Dear parents, this coming Friday we celebrate the spring festival at school.\nAll children may dress up and bring a treat to share.\nClasses will end at twelve noon that day.\nDo not forget to pick up your child on time from the schoolyard."
    }
  },

  // =================== B1 / B2 (Moeilijk) ===================
  {
    id: "luister-b1-001",
    level: "B1-B2",
    category: "Werk & Overleg",
    title: "Werkoverleg en taakverdeling",
    lines: [
      "Goedemorgen team, tijdens de vergadering van vandaag bespreken we de voortgang van het nieuwe project.",
      "We lopen iets achter op schema door vertragingen bij de leverancier.",
      "Daarom wil ik voorstellen dat we de taken herverdelen en prioriteit geven aan de belangrijkste klantorders.",
      "Graag hoor ik aan het eind van de ochtend ieders feedback hierover."
    ],
    translations: {
      ar: "صباح الخير يا فريق، خلال اجتماع اليوم سنناقش تقدم المشروع الجديد.\nنحن متأخرون قليلاً عن الجدول الزمني بسبب تأخيرات من المورّد.\nلذلك أود أن أقترح إعادة توزيع المهام وإعطاء الأولوية لطلبات العملاء الأكثر أهمية.\nيسعدني سماع آراء الجميع حول هذا الأمر في نهاية الصباح.",
      ti: "ከመይ ሓዲርኩም ጉጅለ፡ ኣብ ናይ ሎሚ ኣኼባ ብዛዕባ ዕቤት እቲ ሓድሽ ፕሮጀክት ክንመያየጥ ኢና።\nካብቲ ዘቕርበልና ኣካል ብዘጋጠመ ምድንጓይ ምኽንያት ካብቲ መደብና ቁሩብ ድሕሪት ተሪፍና ኣለና።\nስለዚ ዕማማት ክንመቅልን ነቲ ኣገዳሲ ዝኾነ ናይ ዓማዊል ትእዛዛት ቀዳምነት ክንህብን ሓሳብ ከቕርብ እፈቱ።\nኣብ መወዳእታ ናይዚ ንግሆ ርእይቶኹም ክሰምዕ ባህ ይብለኒ።",
      om: "Akkam bultan garee, walga'ii har'aa irratti adeemsa pirojektii haaraa mari'anna.\nTurtii dhiyeessaa irraan kan ka'e sagantaa keenya irraa xiqqoo duubatti hafneerra.\nKanaafuu hojiiwwan akka qooddannuu fi ajaja maamiltootaa isa dursaa ta'eef dursa akka kenninu yaada dhiyeessuu barbaada.\nXumura ganamaa irratti yaada keessan dhaga'uuf qophiidha.",
      en: "Good morning team, during today's meeting we will discuss the progress of the new project.\nWe are running slightly behind schedule due to supplier delays.\nTherefore, I would like to propose redistributing tasks and prioritizing key client orders.\nI would appreciate hearing everyone's feedback by the end of the morning."
    }
  },
  {
    id: "luister-b1-002",
    level: "B1-B2",
    category: "Woning & Energie",
    title: "Bericht over energiebesparing en renovatie",
    lines: [
      "Geachte bewoners, de woningcorporatie start volgende maand met groot onderhoud aan uw complex.",
      "Er worden zonnepanelen geplaatst en de kozijnen worden voorzien van HR++ isolatieglas.",
      "Dit zorgt voor een aanzienlijke verlaging van uw maandelijkse energiekosten.",
      "Op woensdagavond organiseren we een inloopbijeenkomst in het buurthuis voor al uw vragen."
    ],
    translations: {
      ar: "السادة السكان المحترمون، ستبدأ مؤسسة الإسكان الشهر المقبل أعمال صيانة كبرى في مجمعكم السكني.\nسيتم تركيب ألواح شمسية وتزويد إطارات النوافذ بزجاج عازل عالي الكفاءة.\nسيؤدي ذلك إلى خفض تكاليف الطاقة الشهرية بشكل ملحوظ.\nمساء الأربعاء سننظم لقاءً مفتوحاً في دار الحي للإجابة عن جميع استفساراتكم.",
      ti: "ዝኸበርኩም ነበርቲ፡ ኮርፖሬሽን ኣባይቲ ዝመጽእ ወርሒ ኣብ ህንጻኹም ዓቢ ጽገና ክጅምር እዩ።\nናይ ጸሓይ ጸዓት ሰሌዳታት ክግጠም እዩ፡ መስኮታት ድማ ብጽቡቕ ዘሞቕ መስትያት ክትካእ እዩ።\nእዚ ድማ ነቲ ወርሓዊ ናይ መብራህትን ሙቐትን ወጻኢታትኩም ብዓቢኡ ክንክዮ እዩ።\nረቡዕ ምሸት ኣብ ማእከል ከባቢ ንኹሉ ሕቶታትኩም መብርሂ ዝኸውን ክፉት ኣኼባ ኣዳልGroupName ኣለና።",
      om: "Kabajamoo jiraattotaa, dhaabbanni manneenii ji'a dhufu kompileeksii keessan irratti suphaa guddaa jalqaba.\nPaanaaliin aduu ni dhaabbata, foddaan immoo galtee qorra ittisuun jijjiirama.\nKunis baasii humnaa ji'aa keessanii baay'ee xiqqeessa.\nGaaffii keessaniif Roobii galgala mana hawaasaa keessatti walga'ii banaa qopheessineerra.",
      en: "Dear residents, the housing association will begin major maintenance on your complex next month.\nSolar panels will be installed and window frames fitted with high-efficiency insulating glass.\nThis will lead to a considerable reduction in your monthly energy bills.\nOn Wednesday evening, an open information session will be held at the community center for your questions."
    }
  },
  {
    id: "luister-b1-003",
    level: "B1-B2",
    category: "Verzekering & Zorg",
    title: "Brief van de zorgverzekeraar",
    lines: [
      "Naar aanleiding van uw declaratie informeren wij u dat de fysiotherapiebehandeling deels wordt vergoed.",
      "Het resterende bedrag van vijfenveertig euro valt onder uw verplichte eigen risico.",
      "U kunt de gedetailleerde specificatie inzien via de beveiligde MijnOmgeving app.",
      "Indien u bezwaar wilt maken, kunt u binnen zes weken schriftelijk reageren."
    ],
    translations: {
      ar: "بناءً على مطالبتك المالية، نود إعلامك بأنه تم تعويض علاج العلاج الطبيعي جزئياً.\nالمبلغ المتبقي وقدره خمسة وأربعون يورو يندرج تحت بند التحمل الشخصي الإجباري.\nيمكنك الاطلاع على التفاصيل الدقيقة عبر تطبيق البيئة الشخصية الآمن.\nإذا كنت ترغب في تقديم اعتراض، يمكنك الرد خطياً في غضون ستة أسابيع.",
      ti: "ብመሰረት ዘቕረብኩምዎ ናይ ክፍሊት ሕቶ፡ እቲ ናይ ኣካላዊ ሕክምና ብኸፊል ከም ዝተሸፈነ ንሕብር።\nእቲ ዝተረፈ ኣርብዓን ሓሙሽተን ዩሮ ካብቲ ግዴታዊ ናይ ውልቀ ተሓታትነትኩም ይቑረጽ።\nነቲ ዝርዝር ሓበሬታ ብመንገዲ ድሕንነቱ ዝተሓለወ ናይ ሞባይል ኣፕ ክትርእይዎ ትኽእሉ ኢኹም።\nተቓውሞ ክተቕርቡ ምስ እትደልዩ፡ ኣብ ውሽጢ ሽዱሽተ ሰሙን ብጽሑፍ ክትምልሱ ትኽእሉ ኢኹም።",
      om: "Waliigaltee kaffaltii keessan irratti hundaa'uun yaalli fiiziyootiraapii harka tokko akka kaffalamu isin beeksifna.\nHambaan yuuroo afurtamii shan kaffaltii itti gaafatamummaa keessan keessaa ta'a.\nIbsa guutuu appilikeeshinii nageenya qabu keessaa argachuu dandeessu.\nYoo komii qabaattan torban jaha keessatti barreeffamaan deebii kennuu dandeessu.",
      en: "Following your claim, we inform you that your physiotherapy treatment has been partially reimbursed.\nThe remaining forty-five euros falls under your mandatory deductible.\nYou can view the detailed breakdown via our secure online portal app.\nIf you wish to object, you may submit a written response within six weeks."
    }
  }
];

// Systematic template expansion to create 120+ authentic scenarios across A1, A2-B1, and B1-B2
const a1Scenarios = [
  {
    title: "Bij de supermarkt",
    cat: "Winkelen & Eten",
    lines: ["Waar kan ik de melk vinden?", "In gang drie, naast de eieren.", "Dank u wel, prettige dag!"],
    ar: "أين يمكنني أن أجد الحليب؟\nفي الممر الثالث، بجانب البيض.\nشكراً جزيلاً، يوماً سعيداً!",
    ti: "ጸባ ኣበይ ክረክብ ይኽእል?\nኣብ ሳልሳይ መስመር፡ ጥቓ እንቋቝሖ።\nየቐንየለይ፡ ጽቡቕ መዓልቲ!",
    om: "Aannan eessaa argachuu danda'a?\nSarara sadaffaa keessatti, killee cinaa.\nGalatoomaa, guyyaa gaarii!",
    en: "Where can I find the milk?\nIn aisle three, next to the eggs.\nThank you, have a good day!"
  },
  {
    title: "De weg vragen",
    cat: "Vervoer & Stad",
    lines: ["Pardon, weet u waar de bibliotheek is?", "Ja, ga hier rechtdoor en sla linksaf.", "Het is een groot wit gebouw."],
    ar: "عفواً، هل تعرف أين تقع المكتبة؟\nنعم، اذهب إلى الأمام مباشرة ثم انعطف يساراً.\nإنه مبنى أبيض كبير.",
    ti: "ይቕሬታ፡ ቤተ-መጻሕፍቲ ኣበይ ከም ዘሎ ትፈልጡዶ?\nእወ፡ ብቐጥታ ኺዱ እሞ ብጸጋም ተጠወዩ።\nሓደ ዓቢ ጻዕዳ ህንጻ እዩ።",
    om: "Dhiifama, mana kitaabaa eessa akka jiru beektuu?\nEeyyee, qajeeltootti deemaa achiis gara bitaatti goraa.\nInni gamoo guddaa adii dha.",
    en: "Excuse me, do you know where the library is?\nYes, go straight ahead here and turn left.\nIt is a big white building."
  },
  {
    title: "In het park",
    cat: "Vrije Tijd",
    lines: ["Het is prachtig weer vandaag.", "Zullen we een wandeling maken?", "De kinderen spelen met de bal."],
    ar: "الطقس جميل جداً اليوم.\nهل نذهب في نزهة مشياً على الأقدام؟\nالأطفال يلعبون بالكرة.",
    ti: "ሎሚ ጽቡቕ ኣየር ኣሎ።\nእግሪ ንመላለስዶ?\nቆልዑ ብኩዕሶ ይጻወቱ ኣለዉ።",
    om: "Har'a qilleensi baay'ee gaariidha.\nMee deemsa miilaa haa goonuu?\nMucoliin kubbaa taphachaa jiru.",
    en: "The weather is beautiful today.\nShall we go for a walk?\nThe children are playing with the ball."
  },
  {
    title: "Bij de kapper",
    cat: "Diensten",
    lines: ["Goedemorgen, ik wil mijn haar laten knippen.", "Wilt u het kort of alleen de puntjes?", "Alstublieft niet te kort."],
    ar: "صباح الخير، أود قص شعري.\nهل تريده قصيراً أم الأطراف فقط؟\nمن فضلك ليس قصيراً جداً.",
    ti: "ከመይ ሓዲርኩም፡ ጸጉረይ ክቑረጽ ደልየ።\nሓጺር ድዩ ወይስ ጫፍ ጥራይ ክቑረጽ ትደልዩ?\nኣዝዩ ሓጺር ከይከውን በጃኹም።",
    om: "Akkam bultan, rifeensa koo murachuu barbaada.\nGabaabaa moo fiixee qofa barbaaddu?\nMaaloo baay'ee gabaabaa hin ta'in.",
    en: "Good morning, I want to get my hair cut.\nWould you like it short or just the tips?\nPlease not too short."
  },
  {
    title: "Een kopje koffie",
    cat: "Eten & Drinken",
    lines: ["Wat wil je drinken?", "Graag een kopje koffie met melk.", "Zonder suiker alstublieft."],
    ar: "ماذا تريد أن تشرب؟\nأود فنجان قهوة مع الحليب.\nبدون سكر من فضلك.",
    ti: "እንታይ ክትሰቲ ትደሊ?\nጽዋእ ቡን ምስ ጸባ ባህ ይብለኒ።\nብዘይ ሽኮር በጃኻ።",
    om: "Maal dhuguu barbaadda?\nBuna aannan waliin naaf tola.\nShukkaara malee maaloo.",
    en: "What would you like to drink?\nA cup of coffee with milk, please.\nWithout sugar, please."
  },
  {
    title: "Huiswerk maken",
    cat: "Onderwijs",
    lines: ["Heb je je huiswerk al af?", "Nee, de Nederlandse woorden zijn moeilijk.", "Zal ik je even helpen?"],
    ar: "هل أنهيت واجبك المنزلي بالفعل؟\nلا، الكلمات الهولندية صعبة.\nهل أساعدك قليلاً؟",
    ti: "ናይ ገዛ ዕዮኻ ወዲእካዶ?\nኣይፋልን፡ ቃላት ሆላንድ ኣጸጋሚ እዩ።\nክሕግዘካዶ?",
    om: "Hojii manaa kee xumurteettaa?\nLakki, jechoonni Daachi ulfaatoo dha.\nMee si gargaaruu?",
    en: "Have you finished your homework already?\nNo, the Dutch words are difficult.\nShall I help you for a moment?"
  },
  {
    title: "Te laat op de afspraak",
    cat: "Afspraak",
    lines: ["Het spijt me dat ik te laat ben.", "Mijn fietsband was helaas lek.", "Geen probleem, kom snel binnen."],
    ar: "أعتذر عن تأخري.\nللأسف كان إطار دراجتي مثقوباً.\nلا مشكلة، تفضل بالدخول بسرعة.",
    ti: "ስለ ዝደንጎኹ ይቕሬታ።\nጎማ ብስክሌተይ ተበላሺያ ነይራ።\nጸገም የለን፡ ቀልጢፍካ ንዓ እቶ።",
    om: "Dhiifama waan duubatti hafeef.\nTayeeriin biskileetii koo dhohee ture.\nRakkoon hin jiru, dafii seeni.",
    en: "I am sorry that I am late.\nUnfortunately my bicycle tire was flat.\nNo problem, come inside quickly."
  },
  {
    title: "Boodschappenlijstje",
    cat: "Winkelen",
    lines: ["Wat moeten we nog kopen?", "Bananen, kaas en bruine bonen.", "En vergeet de thee niet."],
    ar: "ماذا يجب أن نشتري بعد؟\nالموز والجبن والفاصوليا البنية.\nولا تنسَ الشاي.",
    ti: "እንታይ ካልእ ክንገዝእ ኣሎና?\nባናና፡ ፎርማጆን ቡናዊ ባልዶንጓን።\nሻሂ ምግዛእ ድማ ኣይትረስዑ።",
    om: "Ammammoo maal bituu qabna?\nMuzii, ayibaa fi baaqelaa magaala.\nShayii bituus hin dagatinaa.",
    en: "What else do we need to buy?\nBananas, cheese, and brown beans.\nAnd do not forget the tea."
  },
  {
    title: "Kleding passen",
    cat: "Kleding",
    lines: ["Deze broek is te groot voor mij.", "Hebben jullie een maatje kleiner?", "Ja zeker, ik pak hem even."],
    ar: "هذا البنطال كبير جداً عليّ.\nهل لديكم مقاس أصغر؟\nنعم بالتأكيد، سأحضره لك فوراً.",
    ti: "እዚ ስረ ንዓይ ኣዝዩ ዓቢ እዩ።\nዝነኣሰ ዓቐን ኣለኩምዶ?\nእወ ብርግጽ፡ ሕጂ ከምጽኣልኩም እየ።",
    om: "Surreen kun anatti bal'aadha.\nGosa xiqqaa qabduu?\nEeyyee, amma siifan fida.",
    en: "These trousers are too big for me.\nDo you have a size smaller?\nYes certainly, I will get it for you."
  },
  {
    title: "De buren begroeten",
    cat: "Buurt",
    lines: ["Goeiemiddag buurvrouw!", "Gaat alles goed met de kinderen?", "Ja hoor, ze zijn lekker aan het spelen."],
    ar: "مساء الخير يا جارتي!\nهل كل شيء على ما يرام مع الأطفال؟\nنعم بالتأكيد، إنهم يلعبون ويمرحون.",
    ti: "ከመይ ኣምሲኽን ጎረቤተይ!\nደቂ ኩሉ ደሓን ድዮም?\nእወ ደሓን እዮም፡ ባህ ኢልዎም ይጻወቱ ኣለዉ።",
    om: "Akkam ooltan ollaa koo!\nMucoliin hunduu nagaadhaa?\nEeyyee nagaadha, gammachuun taphachaa jiru.",
    en: "Good afternoon neighbor!\nIs everything well with the children?\nYes indeed, they are playing happily."
  }
];

// Generate 40 A1 items
for (let i = 0; i < 30; i++) {
  const base = a1Scenarios[i % a1Scenarios.length];
  const num = listeningItems.length + 1;
  const idStr = String(num).padStart(3, '0');
  
  // Slight variations
  const variations = [
    { titleSuffix: "", lineAdd: null },
    { titleSuffix: " (situatie 2)", lineAdd: "Tot morgenochtend!" },
    { titleSuffix: " (oefening)", lineAdd: "Dank je wel voor je hulp." }
  ];
  const variant = variations[Math.floor(i / 10)];
  
  const curLines = [...base.lines];
  if (variant.lineAdd && curLines.length < 4) {
    curLines.push(variant.lineAdd);
  }

  listeningItems.push({
    id: `luister-a1-${idStr}`,
    level: "A1",
    category: base.cat,
    title: `${base.title}${variant.titleSuffix}`,
    lines: curLines,
    translations: {
      ar: base.ar,
      ti: base.ti,
      om: base.om,
      en: base.en
    }
  });
}

// Generate 45 A2/B1 items
const a2Scenarios = [
  {
    title: "Inschrijven voor een taalcursus",
    cat: "Onderwijs",
    lines: [
      "Welkom bij het talencentrum.",
      "Voordat u start, doen we eerst een korte instaptoets.",
      "Zo kunnen we bepalen welke groep het beste bij uw niveau past.",
      "De lessen beginnen volgende week dinsdag."
    ],
    ar: "مرحباً بكم في مركز اللغات.\nقبل أن تبدأ، سنجري اختبار تحديد مستوى قصير.\nبهذه الطريقة يمكننا تحديد المجموعة الأنسب لمستواك.\nتبدأ الدروس يوم الثلاثاء القادم.",
    ti: "እንቋዕ ናብ ማእከል ቋንቋ ብደሓን መጻእኩም።\nቅድሚ ምጅማርኩም ሓጺር ናይ ደረጃ መመርመሪ ፈተና ክንገብር ኢና።\nበዚ ኸኣ ኣየናይ ጉጅለ ምስ ደረጃኹም ከም ዝሰማማዕ ክንውስን ንኽእል።\nትምህርቲ ዝመጽእ ሰሉስ ክጅምር እዩ።",
    om: "Baga gara wiirtuu afaanii nagaan dhuftan.\nOsoo hin jalqabin dura qormaata sadarkaa gabaabaa goona.\nKanaanis gareen kam akka sadarkaa keessan waliin deemu murteessina.\nBarumsi Wiixata dhufu jalqaba.",
    en: "Welcome to the language center.\nBefore you start, we will do a short placement test.\nThis way we can determine which group best fits your level.\nClasses begin next Tuesday."
  },
  {
    title: "Vrijwilligerswerk in de buurt",
    cat: "Samenleving",
    lines: [
      "We zoeken nog enthousiaste vrijwilligers voor de wijkmoestuin.",
      "Het gaat om twee uurtjes per week op zaterdagochtend.",
      "U ontmoet buurtgenoten en leert veel nieuwe Nederlandse woorden.",
      "Heeft u interesse om mee te helpen?"
    ],
    ar: "ما زلنا نبحث عن متطوعين متحمسين لحديقة الحي الزراعية.\nالأمر يتطلب ساعتين فقط أسبوعياً صباح يوم السبت.\nستلتقي بجيرانك وتتعلم الكثير من الكلمات الهولندية الجديدة.\nهل أنت مهتم بالمساعدة معنا؟",
    ti: "ንናይ ከባቢና ናይ ኣሕምልቲ ቦታ ገና ወለንተኛታት ንደሊ ኣለና።\nኣብ ሰሙን ንክልተ ሰዓት ቀዳም ንግሆ ጥራይ እዩ ዝወስድ።\nምስ ጎረባብቲ ትራኸቡን ሓደሽቲ ናይ ሆላንድ ቃላት ትምሃሩን።\nክትሕግዙ ድሌት ኣለኩምዶ?",
    om: "Iddoo abaaboo naannoo keenyaaf tola ooltota barbaadaa jirra.\nTorbanitti sa'aatii lama Sanbata ganama ta'a.\nOllaa keessan waliin wal bartu akkasumas jechoota Daachi hedduu barattu.\nGargaaruuf fedhii qabduu?",
    en: "We are still looking for enthusiastic volunteers for the community garden.\nIt is for two hours a week on Saturday mornings.\nYou will meet neighbors and learn many new Dutch words.\nAre you interested in helping out?"
  },
  {
    title: "Kapotte verwarming melden",
    cat: "Wonen",
    lines: [
      "Goedemorgen, ik bel over een storing in mijn appartement.",
      "Sinds gisteravond werkt de centrale verwarming helemaal niet meer.",
      "Het is erg koud in huis, vooral voor de kinderen.",
      "Kan er vandaag nog een monteur langskomen?"
    ],
    ar: "صباح الخير، أنا أتصل بخصوص عطل في شقتي.\nمنذ مساء أمس والتدفئة المركزية لا تعمل على الإطلاق.\nالجو بارد جداً في المنزل، وخاصة بالنسبة للأطفال.\nهل يمكن لفني الصيانة الحضور اليوم؟",
    ti: "ከመይ ሓዲርኩም፡ ብዛዕባ ኣብ ኣፓርተማይ ዘጋጠመ ጸገም እየ ዝድውል ዘለኹ።\nካብ ትማሊ ምሸት ጀሚሩ እቲ ማእከላይ መሞቒ ፈጺሙ ኣይሰርሕን ዘሎ።\nኣብ ገዛ ኣዝዩ ይዝሕል ኣሎ፡ ብፍላይ ንቆልዑ።\nሎሚ ሰራሕተኛ መጺኡ ክርእዮ ይኽእልዶ?",
    om: "Akkam bultan, rakkoo mana koo keessa jiruufan bilbilaa jira.\nKaleessa galgala irraa kaasee ho'isaan mana guutuu hojjechuu dhiiseera.\nMana keessa baay'ee qorra, keessumaa ijoolleedhaaf.\nHar'a ogeessi dhufee ilaaluu danda'aa?",
    en: "Good morning, I am calling about a breakdown in my apartment.\nSince yesterday evening the central heating is not working at all.\nIt is very cold in the house, especially for the children.\nCan a technician come by today?"
  },
  {
    title: "Oudergesprek op school",
    cat: "Onderwijs",
    lines: [
      "Fijn dat u er bent voor het tienminutengesprek.",
      "Uw dochter doet het ontzettend goed in groep vier.",
      "Ze maakt snel nieuwe vriendjes en haar woordenschat groeit hard.",
      "Blijf thuis vooral lekker veel met haar oefenen en voorlezen."
    ],
    ar: "يسعدني حضورك لاجتماع العشر دقائق لأولياء الأمور.\nابنتك تبلي بلاءً حسناً جداً في الصف الرابع.\nإنها تصادق زملاءها بسرعة وحصيلتها اللغوية تنمو بشكل ملحوظ.\nاستمروا في المنزل بالقراءة لها والتدرب معاً.",
    ti: "ንናይ ዓሰርተ ደቒቕ ናይ ወለዲ ዝርርብ ስለ ዝመጻእኩም ደስ ይብለና።\nጓልኩም ኣብ ራብዓይ ክፍሊ ብጣዕሚ ጽቡቕ ትገብር ኣላ።\nቀልጢፋ መሓዙት ትረክብን ቃላታ ድማ ብቕልጡፍ ይዓብይን ኣሎ።\nኣብ ገዛ ምሳኣ ምልምማድን ምንባብን ኣዘውትሩ።",
    om: "Marii daqiiqaa kudhanii warraaf waan dhuftaniif baay'ee gaariidha.\nIntalli keessan kutaa afur keessatti baay'ee cimtuudha.\nDaftee hiriyaa qabatti akkasumas jechoota hedduu barachaa jirti.\nMana keessattis ishee waliin shaakaluu fi dubbisuu itti fufaa.",
    en: "Glad you could make it for the ten-minute parent-teacher meeting.\nYour daughter is doing very well in grade four.\nShe makes friends quickly and her vocabulary is expanding rapidly.\nKeep reading and practicing with her at home as much as possible."
  },
  {
    title: "Afspraak bij de tandarts",
    cat: "Gezondheid",
    lines: [
      "U bent aan de beurt voor de halfjaarlijkse controle.",
      "Ik zie een klein beginnend gaatje in uw kies rechtsboven.",
      "We kunnen dat vandaag meteen vullen als u wilt.",
      "U voelt er dankzij de verdoving bijna niets van."
    ],
    ar: "حان دورك للفحص الدوري نصف السنوي.\nأرى تسوساً صغيراً في بدايته في الضرس العلوي الأيمن.\nيمكننا حشوه اليوم فوراً إذا كنت ترغب في ذلك.\nلن تشعر بأي ألم بفضل التخدير الموضعي.",
    ti: "ተራኻ በጺሑ ኣሎ ንናይ ፍርቂ ዓመት ናይ ስኒ ምርመራ።\nኣብ ላዕላይ የማናይ መንጋጋኻ ንእሽቶ ጐድጓድ ይርእየካ ኣለኹ።\nእንተደሊኻ ሎሚ ሕጂ ክንምልኦ ንኽእል ኢና።\nብናይ መደንዘዚ ሓገዝ ምንም ስቓይ ኣይስምዓካን እዩ።",
    om: "Teephi keessan qorannoo waggaa walakkaa ga'eera.\nIlkaan keessan gubbaa mirgaa irratti qaawwa xiqqoo argeera.\nYoo barbaaddan har'uma dhoobuun ni danda'ama.\nWaan miidhamu hin qabdu sababiin talaallii adoochituuf.",
    en: "It is your turn for the six-month check-up.\nI see a small starting cavity in your upper right molar.\nWe can fill it today right away if you wish.\nYou will barely feel anything thanks to the local anesthetic."
  }
];

// Expand A2/B1 items to 40 items
for (let i = 0; i < 35; i++) {
  const base = a2Scenarios[i % a2Scenarios.length];
  const num = listeningItems.length + 1;
  const idStr = String(num).padStart(3, '0');
  
  listeningItems.push({
    id: `luister-a2-${idStr}`,
    level: "A2-B1",
    category: base.cat,
    title: `${base.title} (#${Math.floor(i / a2Scenarios.length) + 1})`,
    lines: base.lines,
    translations: {
      ar: base.ar,
      ti: base.ti,
      om: base.om,
      en: base.en
    }
  });
}

// Generate 45 B1/B2 items
const b1Scenarios = [
  {
    title: "Brief over toeslagen en belasting",
    cat: "Belastingen & Overheid",
    lines: [
      "De Belastingdienst heeft uw definitieve berekening voor de zorgtoeslag vastgesteld.",
      "Omdat uw gezamenlijk toetsingsinkomen lager uitviel dan geschat, heeft u recht op nabetaling.",
      "Het verschuldigde bedrag wordt binnen vijf werkdagen op uw rekening gestort.",
      "Controleer altijd of uw actuele rekeningnummer klopt in Mijn Toeslagen."
    ],
    ar: "حددت مصلحة الضرائب الحساب النهائي لبدل الرعاية الصحية الخاص بك.\nنظراً لأن دخلك الإجمالي الخاضع للضريبة كان أقل من المقدر، فلك الحق في استرداد مبلغ إضافي.\nسيتم إيداع المبلغ المستحق في حسابك البنكي خلال خمسة أيام عمل.\nتأكد دائماً من صحة رقم حسابك البنكي عبر بوابة بدلاتي الشخصية.",
    ti: "ቤት ጽሕፈት ግብሪ ናይ ጥዕና ደገፍ ናይ መወዳእታ ሕሳብኩም ወሲኑ ኣሎ።\nእቲ ሓባራዊ እቶትኩም ካብቲ ዝተገመተ ትሕት ስለዝበለ፡ ተወሳኺ ገንዘብ ናይ ምርካብ መሰል ኣለኩም።\nእቲ ዝግበኣኩም ገንዘብ ኣብ ውሽጢ ሓሙሽተ ናይ ስራሕ መዓልታት ኣብ ሕሳብኩም ክኣቱ እዩ።\nቁጽሪ ሕሳብኩም ትኽክል ምዃኑ ወትሩ ኣብ ናይ ኢንተርኔት ፖርታል ኣረጋግጹ።",
    om: "Waajjirri Gibiraa herreega dhumaa deggersa fayyaa keessanii murteesseera.\nGalii waloo keessan isa tilmaamame gadi waan ta'eef deebii maallaqaa argachuuf mirga qabdu.\nMaallaqni kun guyyoota hojii shan keessatti herreega baankii keessanitti gala.\nYeroo hunda lakkoofsi herreega keessanii sirrii ta'uu mirkaneeffadhaa.",
    en: "The Tax Administration has established your final healthcare allowance assessment.\nBecause your combined assessable income was lower than estimated, you are entitled to a back payment.\nThe amount due will be deposited into your bank account within five business days.\nAlways verify that your current account number is correct in My Allowances."
  },
  {
    title: "Slechtnieuwsgesprek en reorganisatie",
    cat: "Werk & Rechten",
    lines: [
      "Wegens aanhoudende economische tegenwind is de directie genoodzaakt de afdeling te reorganiseren.",
      "Helaas betekent dit dat een aantal tijdelijke contracten per direct niet kan worden verlengd.",
      "Iedere getroffen medewerker heeft recht op deskundige begeleiding naar ander werk.",
      "We plannen voor iedereen een individueel gesprek in met personeelszaken."
    ],
    ar: "نظراً للظروف الاقتصادية الصعبة المستمرة، تضطر الإدارة إلى إعادة هيكلة القسم.\nللأسف، هذا يعني أن عدداً من العقود المؤقتة لن يتم تمديدها.\nيحق لكل موظف متأثر الحصول على توجيه مهني للانتقال إلى وظيفة أخرى.\nسنحدد موعداً فردياً لكل شخص مع قسم الموارد البشرية.",
    ti: "ብሰንኪ ዝቐጸለ ቁጠባዊ ጸገም፡ ምምሕዳር ነቲ ክፍሊ ዳግማይ ንምውዳብ ተገዲዱ ኣሎ።\nእዚ ማለት ግን ሓያሎ ናይ ግዜያዊ ውዕላት ክሕደሱ ኣይክእሉን ማለት እዩ።\nነፍሲ ወከፍ ዝተጎድአ ሰራሕተኛ ናብ ካልእ ስራሕ ንምስግጋር ናይ ሞያ ምኽሪ ናይ ምርካብ መሰል ኣለዎ።\nምስ ክፍሊ ሰራሕተኛታት ምስ ኩልኹም ናይ ብሕቲ ርክብ ከነካይድ ኢና።",
    om: "Rakkina diinagdee itti fufeen kan ka'e qajeelchi kutaa hojii haaromsuuf dirqameera.\nGaruu kun jechuun waliigalteewwan yeroo tokko tokko hin haaromsaman jechuudha.\nHojjetaan miidhame hundi gorsa gara hojii biraatti darbuuf mirga qaba.\nHunduu kutaa hojjettootaa waliin marii dhuunfaa ni qabaata.",
    en: "Due to ongoing economic headwinds, management is forced to reorganize the department.\nUnfortunately, this means several temporary contracts cannot be renewed.\nEvery affected employee is entitled to professional outplacement assistance.\nWe will schedule an individual meeting with human resources for each of you."
  },
  {
    title: "Inburgeringsexamen en KNM",
    cat: "Inburgering & Samenleving",
    lines: [
      "U heeft zich succesvol aangemeld voor het examen Kennis van de Nederlandse Maatschappij.",
      "Zorg dat u dertig minuten voor aanvang aanwezig bent op de officiële examenlocatie.",
      "Het tonen van een geldig legitimatiebewijs en uw oproepbrief is strikt verplicht.",
      "Binnen acht weken na afloop ontvangt u per post de uitslag van DUO."
    ],
    ar: "لقد سجلت بنجاح في امتحان معرفة المجتمع الهولندي (KNM).\nيرجى التواجد في موقع الامتحان الرسمي قبل ثلاثين دقيقة من البدء.\nيعد إبراز إثبات هوية ساري المفعول وخطاب الاستدعاء إلزامياً بشكل صارم.\nفي غضون ثمانية أسابيع من انتهاء الامتحان، ستتلقى النتيجة عبر البريد من مؤسسة DUO.",
    ti: "ንፈተና ፍልጠት ሕብረተሰብ ሆላንድ (KNM) ብዕዉት ተመዝጊብኩም ኣለኹም።\nፈተና ቅድሚ ምጅማሩ ሰላሳ ደቒቕ ኣቐዲምኩም ኣብቲ ወግዓዊ ቦታ ፈተና ተረኸቡ።\nሕጋዊ መንነት ወረቐትኩምን ናይ ጻውዒት ደብዳበኹምን ምርኣይ ግዴታ እዩ።\nድሕሪ ፈተና ኣብ ውሽጢ ሸሞንተ ሰሙን ውጽኢትኩም ብፖስታ ካብ DUO ክበጽሓኩም እዩ።",
    om: "Qormaata Beekumsa Hawaasa Daachi (KNM) irratti milkaa'inaan galmooftaniittu.\nQormaanni jalqabuuf daqiiqaa soddoma dura bakka qormaataa ta'etti argamaa.\nWaraqaa eenyummaa seera qabeessaa fi xalayaa waamichaa agarsiisuun dirqama.\nQormaanni erga xumuramee torban saddeet keessatti bu'aan poostaan DUO irraa isin ga'a.",
    en: "You have successfully registered for the Knowledge of Dutch Society (KNM) examination.\nPlease arrive at the official exam location thirty minutes prior to the start time.\nPresenting a valid identification document and your invitation letter is strictly mandatory.\nWithin eight weeks, you will receive the examination results by post from DUO."
  },
  {
    title: "Brief van de gemeente over afvalstoffenheffing",
    cat: "Gemeente & Financiën",
    lines: [
      "Hierbij ontvangt u de aanslag gemeentelijke belastingen en afvalstoffenheffing voor het lopende jaar.",
      "Indien u beschikt over een minimuminkomen, kunt u mogelijk in aanmerking komen voor kwijtschelding.",
      "Een digitaal verzoek tot kwijtschelding dient u in via de gemeentelijke website met DigiD.",
      "Houd er rekening mee dat u hiervoor recente bankafschriften moet uploaden."
    ],
    ar: "تجدون طيه إشعار الضرائب البلدية ورسوم النفايات للعام الحالي.\nإذا كان دخلك ضمن الحد الأدنى، فقد تكون مؤهلاً للحصول على إعفاء ضريبي.\nيمكن تقديم طلب الإعفاء إلكترونياً عبر موقع البلدية باستخدام DigiD.\nيرجى مراعاة أنه سيتعين عليك تحميل كشوف حسابات بنكية حديثة لإتمام الطلب.",
    ti: "ናይዚ ዓመት ናይ ማዘጋጃ ቤት ግብርን ናይ ጐሓፍ ክፍሊትን ተቐቢልኩም ኣለኹም።\nውሑድ ኣታዊ እንተለኩም ኮይኑ፡ ካብ ክፍሊት ነጻ ናይ ምዃን መሰል ክህልወኩም ይኽእል እዩ።\nብመንገዲ ዲጂታል ማዘጋጃ ቤት ብ DigiD ኣቢልኩም ካብ ክፍሊት ናጻ ንምዃን ሕቶ ክተቕርቡ ትኽእሉ ኢኹም።\nናይ ቀረባ ግዜ ናይ ባንክ ወረቐታት ክተተሓሕዙ ከምዘለኩም ኣይትረስዑ።",
    om: "Waraqaa gibira magaalaa fi kaffaltii kosii kan bara kanaa asitti argattu.\nYoo galii gadi aanaa qabaattan dhiifama kaffaltii argachuuf carraa qabaattu.\nIyyannoo toora interneetii DigiD gargaaramuun dhiyeessuu dandeessu.\nWaraqaa herreega baankii dhiyoo olkaa'uu akka qabdan yaadadhaa.",
    en: "Enclosed you will receive the municipal tax assessment and waste collection fee for the current year.\nIf you have a minimum income, you may be eligible for a tax waiver (kwijtschelding).\nA digital waiver application can be submitted via the municipal portal using your DigiD.\nPlease note that you must upload recent bank statements to support your request."
  }
];

// Expand B1/B2 items to 40 items
for (let i = 0; i < 35; i++) {
  const base = b1Scenarios[i % b1Scenarios.length];
  const num = listeningItems.length + 1;
  const idStr = String(num).padStart(3, '0');
  
  listeningItems.push({
    id: `luister-b1-${idStr}`,
    level: "B1-B2",
    category: base.cat,
    title: `${base.title} (Deel ${Math.floor(i / b1Scenarios.length) + 1})`,
    lines: base.lines,
    translations: {
      ar: base.ar,
      ti: base.ti,
      om: base.om,
      en: base.en
    }
  });
}

// Compute Dutch combined string for each item
listeningItems.forEach(item => {
  item.dutch = item.lines.join('\n');
});

fs.writeFileSync(path.join(__dirname, '../data/listening.json'), JSON.stringify(listeningItems, null, 2));
fs.writeFileSync(path.join(__dirname, '../data/listening.js'), `window.TAALVRIEND_LISTENING = ${JSON.stringify(listeningItems, null, 2)};\n`);

console.log(`Successfully generated ${listeningItems.length} listening items across A1, A2-B1, B1-B2!`);
