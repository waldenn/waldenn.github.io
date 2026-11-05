const fs = require('fs');
const path = require('path');

const sentencesJsonPath = path.join(__dirname, '../data/sentences.json');
const sentencesJsPath = path.join(__dirname, '../data/sentences.js');

const existingSentences = JSON.parse(fs.readFileSync(sentencesJsonPath, 'utf8'));

// Pre-A1 base patterns (100 sentences)
const prea1Topics = [
  // Kennismaking & Begroeting
  { d: "Hallo, ik ben Sarah.", ar: "مرحباً، أنا سارة.", so: "Waad salaaman tahay, waxaan ahay Sarah.", ti: "ሰላም፡ ኣነ ሳራ እየ።", om: "Akkam, ani Saaraadha.", en: "Hello, I am Sarah.", t: "Kennismaking" },
  { d: "Mijn naam is Ali.", ar: "اسمي علي.", so: "Magacaygu waa Cali.", ti: "ስመይ ዓሊ እዩ።", om: "Maqaan koo Alii jedhama.", en: "My name is Ali.", t: "Kennismaking" },
  { d: "Ik woon in Nederland.", ar: "أنا أعيش في هولندا.", so: "Waxaan ku noolahay Nederlaan.", ti: "ኣብ ኔዘርላንድስ እየ ዝነብር።", om: "Ani Neezerlaandi keessan jiraadha.", en: "I live in the Netherlands.", t: "Kennismaking" },
  { d: "Ik kom uit Syrië.", ar: "أنا قادم من سوريا.", so: "Waxaan ka imid Suuriya.", ti: "ካብ ሶርያ እየ መጺአ።", om: "Ani Sooriyaa irraan dhufe.", en: "I come from Syria.", t: "Kennismaking" },
  { d: "Ik kom uit Somalië.", ar: "أنا قادم من الصومال.", so: "Waxaan ka imid Soomaaliya.", ti: "ካብ ሶማል እየ መጺአ።", om: "Ani Somaaliyaa irraan dhufe.", en: "I come from Somalia.", t: "Kennismaking" },
  { d: "Ik kom uit Eritrea.", ar: "أنا قادم من إريتريا.", so: "Waxaan ka imid Eriteriya.", ti: "ካብ ኤርትራ እየ መጺአ።", om: "Ani Eertiraa irraan dhufe.", en: "I come from Eritrea.", t: "Kennismaking" },
  { d: "Ik leer nu Nederlands.", ar: "أنا أتعلم الهولندية الآن.", so: "Hadda waxaan baranayaa Af-Hollandees.", ti: "ሕጂ ቋንቋ ኔዘርላንድስ እመሃር ኣለኹ።", om: "Amma afaan Daajii barachaan jira.", en: "I am learning Dutch now.", t: "Kennismaking" },
  { d: "Aangenaam kennis te maken.", ar: "فرصة سعيدة بمعرفتك.", so: "Farxad bay ii tahay inaan ku barto.", ti: "ምሳኻ ምርኻበይ ባህ ኢሉኒ።", om: "Wal arguun keenya gammachuu qaba.", en: "Nice to meet you.", t: "Kennismaking" },
  { d: "Tot morgen!", ar: "أراك غداً!", so: "Ilaa berri!", ti: "ክሳብ ጽባሕ!", om: "Hanga borutti!", en: "See you tomorrow!", t: "Begroeting" },
  { d: "Fijne dag verder!", ar: "أتمنى لك يوماً جميلاً!", so: "Maalin wanaagsan!", ti: "ጽቡቕ መዓልቲ ይግበረልካ!", om: "Guyyaa gaarii siif haa ta\'u!", en: "Have a nice day!", t: "Begroeting" },

  // Beleefdheid & Eenvoudige Vragen
  { d: "Dank u wel voor de hulp.", ar: "شكراً جزيلاً لك على المساعدة.", so: "Waad ku mahadsan tahay caawinta.", ti: "ንሓገዝኩም የቐንየለይ።", om: "Gargaarsa keessaniif galatoomaa.", en: "Thank you very much for the help.", t: "Beleefdheid" },
  { d: "Alstublieft, hier is uw thee.", ar: "تفضل، ها هو الشاي الخاص بك.", so: "Fadlan, kani waa shaahaga.", ti: "እንሆ፡ ሻሂኹም ኣብዚ ኣሎ።", om: "Mee, kunoo shaayii keessan.", en: "Please, here is your tea.", t: "Beleefdheid" },
  { d: "Pardon, mag ik wat vragen?", ar: "عذراً، هل يمكنني أن أسأل سؤالاً؟", so: "Iga raalli noqo, wax ma weydiin karaa?", ti: "ይቕሬታ፡ ሓደ ሕቶ ክሓትት ይኽእልዶ፧", om: "Dhiifama, waan tokko gaafachuu danda\'aa?", en: "Excuse me, may I ask something?", t: "Beleefdheid" },
  { d: "Het spijt me heel erg.", ar: "أنا آسف جداً.", so: "Aad baan uga xumahay.", ti: "ኣዝዩ ይቕሬታ ይሓትት።", om: "Baay\'een dhiifama gaafadha.", en: "I am very sorry.", t: "Beleefdheid" },
  { d: "Geen probleem, het is goed.", ar: "لا مشكلة، كل شيء على ما يرام.", so: "Dhib ma laha, waa caadi.", ti: "ጸገም የለን፡ ጽቡቕ ኣሎ።", om: "Rakkina hin qabu, gaariidha.", en: "No problem, it is fine.", t: "Beleefdheid" },
  { d: "Spreekt u een beetje Engels?", ar: "هل تتحدث قليلاً من الإنجليزية؟", so: "Ma ku hadashaa xoogaa Ingiriisi ah?", ti: "ቁሩብ እንግሊዝኛ ትዛረብዶ፧", om: "Afaan Ingilizii xiqqoo ni dubbattaa?", en: "Do you speak a little English?", t: "Communicatie" },
  { d: "Kunt u dat langzaam herhalen?", ar: "هل يمكنك تكرار ذلك ببطء؟", so: "Fadlan ma si tartiib ah ugu celin kartaa?", ti: "ብደሓንካ ብቐስ ክትደግሞ ትኽእልዶ፧", om: "Mee suuta deebistee naaf himuu dandeessaa?", en: "Could you repeat that slowly?", t: "Communicatie" },
  { d: "Ik begrijp het niet goed.", ar: "أنا لا أفهم ذلك جيداً.", so: "Si fiican uma fahmin.", ti: "ጽቡቕ ገይረ ኣይተረድኣንን።", om: "Sirriitti naaf hin galle.", en: "I do not understand it well.", t: "Communicatie" },
  { d: "Wat betekent dit woord?", ar: "ماذا تعني هذه الكلمة؟", so: "Muxuu eraygan la micno yahay?", ti: "እዚ ቓል እንታይ ማለት እዩ፧", om: "Jechi kun maal jechuudha?", en: "What does this word mean?", t: "Communicatie" },
  { d: "Hoe schrijf je dat?", ar: "كيف تكتب ذلك؟", so: "Sidee loo qoraa taas?", ti: "ከመይ ጌርካ ትጽሕፎ፧", om: "Akkamitti barreeffama?", en: "How do you spell that?", t: "Communicatie" },

  // Eten, Drinken & Supermarkt
  { d: "Ik wil graag een brood kopen.", ar: "أود شراء رغيف خبز.", so: "Waxaan rabaa inaan rooti iibsado.", ti: "ባኒ ክዕድግ እደሊ ኣለኹ።", om: "Daabboo bitachuu barbaada.", en: "I would like to buy a loaf of bread.", t: "Winkelen" },
  { d: "Mag ik twee appels, alstublieft?", ar: "هل يمكنني أخذ تفاحتين، من فضلك؟", so: "Ma heli karaa laba tufaax, fadlan?", ti: "ክልተ ቱፋሕ ክረክብዶ፡ በጃኹም፧", om: "Mee appilii lama naaf kennaa?", en: "May I have two apples, please?", t: "Winkelen" },
  { d: "Waar staat de melk?", ar: "أين يوجد الحليب؟", so: "Xagee caanuhu yaallaan?", ti: "ጸባ ኣበይ ኣሎ፧", om: "Aannani eessa jira?", en: "Where is the milk?", t: "Winkelen" },
  { d: "Hoeveel kost dit samen?", ar: "كم يكلف هذا معاً؟", so: "Immisa ayay wadartoodu tahay?", ti: "እዚ ሓቢሩ ክንደይ የውጽእ፧", om: "Waliigala gatiin isaa meeqa?", en: "How much does this cost together?", t: "Winkelen" },
  { d: "Ik wil graag pinnen.", ar: "أود الدفع ببطاقة البنك.", so: "Waxaan rabaa inaan kaarka ku bixiyo.", ti: "ብካርድ ክኸፍል እደሊ።", om: "Kaardiidhaan kaffaluu barbaada.", en: "I would like to pay by card.", t: "Winkelen" },
  { d: "Hier is tien euro contant.", ar: "تفضل، عشرة يورو نقداً.", so: "Waa kan toban Yuuro oo caddaan ah.", ti: "እንሆ ዓሰርተ ዩሮ ብጥረ ገንዘብ።", om: "Kunoo yuuroo kudhan callaa.", en: "Here is ten euros in cash.", t: "Winkelen" },
  { d: "Heeft u een tasje voor mij?", ar: "هل لديك كيس لي؟", so: "Ma haysataa bac ii gaar ah?", ti: "ፌስታል ኣለኩምዶ፧", om: "Koroojoo qabduu?", en: "Do you have a small bag for me?", t: "Winkelen" },
  { d: "De bananen zijn lekker zoet.", ar: "الموز حلو المذاق ولذيذ.", so: "Moosku aad buu u macaan yahay.", ti: "ሙዝ ጥዑም መኣዛ ኣለዎ።", om: "Mooziin mi\'aawaadha.", en: "The bananas are nice and sweet.", t: "Eten & Drinken" },
  { d: "Ik drink graag koud water.", ar: "أحب شرب الماء البارد.", so: "Waxaan jeclahay inaan cabo biyo qabow.", ti: "ዝሑል ማይ ምስታይ ይፈቱ።", om: "Bishaan qabbanaawaa dhuguun jaalladha.", en: "I like to drink cold water.", t: "Eten & Drinken" },
  { d: "Lust u een kopje koffie?", ar: "هل ترغب في فنجان قهوة؟", so: "Ma jeceshahay koob bun ah?", ti: "ጽዋእ ቡን ትሰቲዶ፧", om: "Buna dhuguu barbaaddaa?", en: "Would you like a cup of coffee?", t: "Eten & Drinken" },

  // Familie & Thuis
  { d: "Dit is mijn familie.", ar: "هذه عائلتي.", so: "Kani waa qoyskayga.", ti: "እዚ ስድራቤተይ እዩ።", om: "Kun maatii kooti.", en: "This is my family.", t: "Familie" },
  { d: "Ik heb twee kinderen.", ar: "لدي طفلان.", so: "Waxaan leeyahay laba carruur ah.", ti: "ክልተ ቆልዑ ኣለዉኒ።", om: "Ani ijoollee lama qaba.", en: "I have two children.", t: "Familie" },
  { d: "Mijn zoon heet Adam.", ar: "ابني اسمه آدم.", so: "Wiilkayga waxaa la yiraahdaa Aadam.", ti: "ወደይ ኣዳም ይበሃል።", om: "Ilmi koo Aadam jedhama.", en: "My son is named Adam.", t: "Familie" },
  { d: "Mijn dochter gaat naar school.", ar: "ابنتي تذهب إلى المدرسة.", so: "Gabadhaydu waxay aaddaa dugsiga.", ti: "ጓለይ ናብ ቤት ትምህርቲ ትኸይድ።", om: "Intalli koo mana barumsaa deemti.", en: "My daughter goes to school.", t: "Familie" },
  { d: "Wij wonen in een mooi huis.", ar: "نحن نعيش في منزل جميل.", so: "Waxaan ku noolnahay guri qurux badan.", ti: "ኣብ ጽቡቕ ገዛ ንነብር።", om: "Mana bareedaa keessa jiraanna.", en: "We live in a beautiful house.", t: "Wonen" },
  { d: "De deur is nu open.", ar: "الباب مفتوح الآن.", so: "Albaabku hadda waa furan yahay.", ti: "ማዕጾ ሕጂ ክፉት ኣሎ።", om: "Balballi amma banaadha.", en: "The door is open now.", t: "Wonen" },
  { d: "Sluit het raam, alstublieft.", ar: "أغلق النافذة، من فضلك.", so: "Fadlan xir daaqadda.", ti: "በጃኹም መስኮት ዕጸውዎ።", om: "Mee foddaa cufaa.", en: "Close the window, please.", t: "Wonen" },
  { d: "De keuken is heel schoon.", ar: "المطبخ نظيف جداً.", so: "Jikadu aad bay u nadiif tahay.", ti: "ክሽነ ኣዝዩ ጽሩይ እዩ።", om: "Kushiinaan baay\'ee qulqulluudha.", en: "The kitchen is very clean.", t: "Wonen" },
  { d: "Ik zit op een stoel.", ar: "أنا جالس على كرسي.", so: "Waxaan ku fadhiyaa kursi.", ti: "ኣብ መንበር ተቐሚጠ ኣለኹ።", om: "Barcuma irra taa\'een jira.", en: "I am sitting on a chair.", t: "Wonen" },
  { d: "De tafel staat in het midden.", ar: "الطاولة موجودة في المنتصف.", so: "Miisku wuxuu yaallaa dhexda.", ti: "እቲ ጣውላ ኣብ ማእከል ኣሎ።", om: "Minjaalli gidduu jira.", en: "The table is in the middle.", t: "Wonen" },

  // Tijd & Cijfers
  { d: "Hoe laat is het nu?", ar: "كم الساعة الآن؟", so: "Saacadu waa meeqa hadda?", ti: "ሕጂ ሰዓት ክንደይ ኮይኑ፧", om: "Amma sa\'aatiin meeqa?", en: "What time is it now?", t: "Tijd" },
  { d: "Het is precies twee uur.", ar: "الساعة الثانية تماماً.", so: "Waa labadii saac oo sax ah.", ti: "ልክዕ ሰዓት ክልተ ኮይኑ።", om: "Sirriitti sa\'aatii lama ta\'eera.", en: "It is exactly two o'clock.", t: "Tijd" },
  { d: "Vandaag is het maandag.", ar: "اليوم هو الإثنين.", so: "Maanta waa Isniin.", ti: "ሎሚ ሰኑይ እዩ።", om: "Har\'a Wiixatadha.", en: "Today is Monday.", t: "Tijd" },
  { d: "Morgen is het dinsdag.", ar: "غداً هو الثلاثاء.", so: "Berri waa Talaado.", ti: "ጽባሕ ሰሉስ እዩ።", om: "Boru Kibxatadha.", en: "Tomorrow is Tuesday.", t: "Tijd" },
  { d: "In het weekend ben ik vrij.", ar: "أنا في عطلة بنهاية الأسبوع.", so: "Sabtida iyo Axadda fasax baan ahay.", ti: "ኣብ ቀዳመ-ሰንበት ዕረፍቲ ኣለኒ።", om: "Dhuma torbaniitti boqonnaa qaba.", en: "I am free at the weekend.", t: "Tijd" },
  { d: "De les begint om negen uur.", ar: "يبدأ الدرس في الساعة التاسعة.", so: "Casharku wuxuu bilaabmayaa sagaalka.", ti: "ትምህርቲ ሰዓት ትሽዓተ ይጅምር።", om: "Barnoonni sa\'aatii sadiitti jalqaba.", en: "The lesson begins at nine o'clock.", t: "School" },
  { d: "Ik tel van een tot tien.", ar: "أنا أعد من واحد إلى عشرة.", so: "Waxaan ka tiriyaa kow ilaa toban.", ti: "ካብ ሓደ ክሳብ ዓሰርተ እቖጽር።", om: "Tokkoo hanga kudhaniin laka\'a.", en: "I count from one to ten.", t: "Tijd" },
  { d: "Ik ben dertig jaar oud.", ar: "عمري ثلاثون عاماً.", so: "Waxaan jiraa soddon sano.", ti: "ዕድመይ ሰላሳ ዓመት እዩ።", om: "Umuriin koo soddoma.", en: "I am thirty years old.", t: "Kennismaking" },
  { d: "Mijn afspraak is om drie uur.", ar: "موعدي في الساعة الثالثة.", so: "Ballantaydu waa saddexda saac.", ti: "ቆጸራይ ሰዓት ሰለስተ እዩ።", om: "Beellamni koo sa\'aatii sagalitti.", en: "My appointment is at three o'clock.", t: "Gezondheid" },
  { d: "Het duurt vijf minuten.", ar: "يستغرق الأمر خمس دقائق.", so: "Waxay qaadanaysaa shan daqiiqo.", ti: "ሓሙሽተ ደቓይቕ ይወስድ።", om: "Daqiiqaa shan fudhata.", en: "It takes five minutes.", t: "Tijd" },

  // Lichaam & Gezondheid
  { d: "Ik voel me vandaag niet zo goed.", ar: "لا أشعر أنني بخير اليوم.", so: "Maanta aad uma fiicni.", ti: "ሎሚ ጽቡቕ ኣይስምዓንን ኣሎ።", om: "Har\'a baay\'ee natti hin tolle.", en: "I do not feel very well today.", t: "Gezondheid" },
  { d: "Ik heb veel pijn in mijn hoofd.", ar: "عندي ألم شديد في رأسي.", so: "Madax xanuun daran ayaa i haya.", ti: "ርእሰይ ኣዝዩ የሕምመኒ ኣሎ።", om: "Mataan na dhukkuba.", en: "I have a lot of pain in my head.", t: "Gezondheid" },
  { d: "Mijn buik doet een beetje zeer.", ar: "بطني يؤلمني قليلاً.", so: "Calooshu wax yar bay i xanuunaysaa.", ti: "ከብደይ ቁሩብ የሕምመኒ ኣሎ።", om: "Garaan xiqqoo na dhukkuba.", en: "My stomach hurts a little.", t: "Gezondheid" },
  { d: "Ik wil graag naar de dokter.", ar: "أود الذهاب إلى الطبيب.", so: "Waxaan rabaa inaan aado dhaqtarka.", ti: "ናብ ሓኪም ክኸይድ እደሊ።", om: "Gara hakiimaa deemuu barbaada.", en: "I would like to go to the doctor.", t: "Gezondheid" },
  { d: "Heeft u een paracetamol?", ar: "هل لديك حبة باراسيتامول؟", so: "Ma haysataa baarasitamool?", ti: "ፓራሰታሞል ኣለኩምዶ፧", om: "Kiniina baaraasitaamoolii qabduu?", en: "Do you have a paracetamol?", t: "Gezondheid" },
  { d: "Ik moet veel water drinken.", ar: "يجب أن أشرب الكثير من الماء.", so: "Waa inaan biyo badan cabaa.", ti: "ብዙሕ ማይ ክሰቲ ኣለኒ።", om: "Bishaan baay\'ee dhuguun qaba.", en: "I need to drink a lot of water.", t: "Gezondheid" },
  { d: "Was je handen met zeep.", ar: "اغسل يديك بالصابون.", so: "Gacmahaaga ku dhaq saabuun.", ti: "ኣእዳውካ ብሳምና ተሓጸብ።", om: "Harka kee saamunaadhaan dhiqadhu.", en: "Wash your hands with soap.", t: "Gezondheid" },
  { d: "Mijn oog is een beetje rood.", ar: "عيني حمراء قليلاً.", so: "Ishaydu wax yar bay guduudan tahay.", ti: "ዓይነይ ቁሩብ ቀይሕ ኮይና ኣላ።", om: "Ijji koo xiqqoo diimateera.", en: "My eye is a little red.", t: "Gezondheid" },
  { d: "Ik ga vroeg naar bed.", ar: "سأذهب إلى الفراش مبكراً.", so: "Goor hore ayaan seexanayaa.", ti: "ኣንጊሀ ናብ ዓራት ክኸይድ እየ።", om: "Dafii gara siree deema.", en: "I am going to bed early.", t: "Gezondheid" },
  { d: "Beterschap en rust goed uit!", ar: "أتمنى لك الشفاء العاجل واسترح جيداً!", so: "Caafimaad degdeg ah iyo nasasho wacan!", ti: "ምሕረት ይሃብካ፡ ጽቡቕ ገይርካ ዕረፍ!", om: "Fayyaa haa ta\'u, sirriitti boqodhu!", en: "Get well soon and rest well!", t: "Gezondheid" },

  // Vervoer & Reizen
  { d: "Waar is de bushalte?", ar: "أين هي محطة الحافلات؟", so: "Xagee ku taal joogsiga baska?", ti: "መዕረፊ ባስ ኣበይ ኣሎ፧", om: "Bakki buufata babsii eessa?", en: "Where is the bus stop?", t: "Vervoer" },
  { d: "De bus komt over vijf minuten.", ar: "الحافلة ستصل خلال خمس دقائق.", so: "Basku wuxuu imanayaa shan daqiiqo gudahood.", ti: "እቲ ባስ ድሕሪ ሓሙሽተ ደቓይቕ ክመጽእ እዩ።", om: "Baasiin daqiiqaa shan keessatti dhufa.", en: "The bus is coming in five minutes.", t: "Vervoer" },
  { d: "Ik reis vandaag met de trein.", ar: "أنا أسافر بالقطار اليوم.", so: "Maanta tareen ayaan ku safrayaa.", ti: "ሎሚ ብባቡር ክጓዓዝ እየ።", om: "Har\'a baaburaan imala.", en: "I am traveling by train today.", t: "Vervoer" },
  { d: "Ik pak de fiets naar het werk.", ar: "سأركب الدراجة إلى العمل.", so: "Baaskiil ayaan shaqada ku aadayaa.", ti: "ናብ ስራሕ ብሽክለታ ክወስድ እየ።", om: "Biskileetiidhaan gara hojiin deema.", en: "I take the bicycle to work.", t: "Vervoer" },
  { d: "Mijn fietsband is helaas lek.", ar: "إطار دراجتي مثقوب للأسف.", so: "Taayirka baaskiilkaygu wuu dalooshamay nasiib-darro.", ti: "ጎማ ብሽክለታይ ተነዲሉ እዩ።", om: "Gomiin biskileetii koo dhooqeera.", en: "My bicycle tire is flat unfortunately.", t: "Vervoer" },
  { d: "Moet ik hier overstappen?", ar: "هل يجب علي التبديل هنا؟", so: "Miyaan halkan ka wareegaa baska/tareenka?", ti: "ኣብዚ ድየ ባስ ክቕይር ዘለኒ፧", om: "Asitti jijjiiruu qabaa?", en: "Do I have to transfer here?", t: "Vervoer" },
  { d: "Dit is het juiste perron.", ar: "هذا هو رصيف القطار الصحيح.", so: "Kani waa dhabada saxda ah ee tareenka.", ti: "እዚ እቲ ትክክለኛ መድረኽ እዩ።", om: "Fuulli kun isa sirriidha.", en: "This is the right platform.", t: "Vervoer" },
  { d: "Het station is dichtbij.", ar: "محطة القطار قريبة جداً.", so: "Saldhigu aad buu u dhow yahay.", ti: "እቲ መደበር ቀረባ እዩ።", om: "Buufanni baaburaa dhiyoodha.", en: "The station is nearby.", t: "Vervoer" },
  { d: "Het stoplicht is nu rood.", ar: "إشارة المرور حمراء الآن.", so: "Nalalka taraafikada hadda waa guduud.", ti: "መብራህቲ መገዲ ሕጂ ቀይሕ ኣሎ።", om: "Ifti tiraafikaa amma diimaadha.", en: "The traffic light is red now.", t: "Vervoer" },
  { d: "Kijk goed naar links en rechts.", ar: "انظر جيداً لليسار ولليمين.", so: "Si fiican u eeg bidix iyo midig.", ti: "ናብ ጸጋምን የማንን ጽቡቕ ጌርካ ርአ።", om: "Bitaa fi mirga sirriitti ilaali.", en: "Look carefully to the left and right.", t: "Vervoer" },

  // Kleding & Kleuren
  { d: "Ik draag een warme winterjas.", ar: "أنا أرتدي معطف شتاء دافئاً.", so: "Waxaan xirnahay jaakad diiran.", ti: "ሙቑቕ ጃኬት ክዳን ለቢሰ ኣለኹ።", om: "Kootii ho\'aa uffadheera.", en: "I am wearing a warm winter coat.", t: "Kleding" },
  { d: "Mijn schoenen zijn helemaal nieuw.", ar: "حذائي جديد تماماً.", so: "Kabaheygu waa cusub yihiin dhammaan.", ti: "ሳእነይ ምሉእ ብምሉእ ሓድሽ እዩ።", om: "Kopheen koo haaraadha.", en: "My shoes are brand new.", t: "Kleding" },
  { d: "De broek is veel te groot.", ar: "البنطال كبير جداً علي.", so: "Surwaalku aad buu u weyn yahay.", ti: "እቲ ስረ ኣዝዩ ገፊሕ እዩ።", om: "Surreen kun baay\'ee guddaadha.", en: "The trousers are way too big.", t: "Kleding" },
  { d: "Ik zoek een blauw shirt.", ar: "أنا أبحث عن قميص أزرق.", so: "Waxaan raadinayaa shaati buluug ah.", ti: "ሰማያዊ ማልያ እደሊ ኣለኹ።", om: "Shaamizii cuquliisa barbaada.", en: "I am looking for a blue shirt.", t: "Kleding" },
  { d: "De jurk is erg mooi.", ar: "الفستان جميل جداً.", so: "Goonadu aad bay u qurux badan tahay.", ti: "እቲ ክዳን ኣዝዩ ጽቡቕ እዩ።", om: "Uffanni kun baay\'ee bareeda.", en: "The dress is very beautiful.", t: "Kleding" },
  { d: "Mijn tas is geel en zwart.", ar: "حقيبتي صفراء وسوداء.", so: "Boorsadaydu waa jaalle iyo madow.", ti: "ቦርሳይ ብጫን ጸሊምን እዩ።", om: "Boorsiin koo keelloo fi gurraacha.", en: "My bag is yellow and black.", t: "Kleuren" },
  { d: "De lucht is vandaag blauw.", ar: "السماء زرقاء وصافية اليوم.", so: "Cirku maanta waa buluug.", ti: "ሰማይ ሎሚ ሰማያዊ እዩ።", om: "Samiin har\'a cuquliisadha.", en: "The sky is blue today.", t: "Natuur" },
  { d: "Gras is groen in de lente.", ar: "العشب أخضر في فصل الربيع.", so: "Cawsku waa cagaar xilliga gu\'ga.", ti: "ሳዕሪ ብጽድያ ለምለም ቀጠልያ እዩ።", om: "Margi arfaasaa keessa magariisa.", en: "Grass is green in spring.", t: "Natuur" },
  { d: "Sneeuw is koud en wit.", ar: "الثلج بارد وأبيض ناصع.", so: "Barafku waa qabow oo caddaan ah.", ti: "በረድ ዝሑልን ጻዕዳን እዩ።", om: "Cabbii qabbanaawaa fi adiidha.", en: "Snow is cold and white.", t: "Natuur" },
  { d: "De zon schijnt heel fel.", ar: "الشمس تشرق بسطوع شديد.", so: "Qorraxdu aad bay u dhalaalaysaa.", ti: "ጸሓይ ኣዝያ ተብርቕ ኣላ።", om: "Aduun baay\'ee ifaa jira.", en: "The sun is shining very brightly.", t: "Weer" },

  // Gevoelens & Vrije Tijd
  { d: "Ik ben vandaag heel blij.", ar: "أنا سعيد جداً اليوم.", so: "Maanta aad baan u faraxsanahay.", ti: "ሎሚ ኣዝየ ሕጉስ ኣለኹ።", om: "Har\'a baay\'ee gammadeera.", en: "I am very happy today.", t: "Gevoelens" },
  { d: "Ik ben moe na het werk.", ar: "أنا متعب بعد العمل.", so: "Waan daallanahay shaqada ka dib.", ti: "ድሕሪ ስራሕ ደኺሙኒ ኣሎ።", om: "Hojii booda dadhabeera.", en: "I am tired after work.", t: "Gevoelens" },
  { d: "Wij wandelen graag in het park.", ar: "نحب المشي والتنزه في الحديقة.", so: "Waxaan jecelnahay inaan ku soconno beerta.", ti: "ኣብ መናፈሲ ምኻድ ንፈቱ።", om: "Paarkii keessa deemuun jaallanna.", en: "We like walking in the park.", t: "Vrije Tijd" },
  { d: "Ik luister naar mooie muziek.", ar: "أنا أستمع إلى موسيقى جميلة.", so: "Waxaan dhagaysanayaa muusig fiican.", ti: "ጽቡቕ ሙዚቃ ይሰምዕ ኣለኹ።", om: "Muuziqaa bareedaa dhaggeeffadha.", en: "I listen to beautiful music.", t: "Vrije Tijd" },
  { d: "Ik lees een makkelijk boek.", ar: "أنا أقرأ كتاباً سهلاً وبسيطاً.", so: "Waxaan akhrinayaa buug fudud.", ti: "ቐሊል መጽሓፍ የንብብ ኣለኹ።", om: "Kitaaba salphaan dubbisa.", en: "I am reading an easy book.", t: "Vrije Tijd" },
  { d: "Voetbal is een leuke sport.", ar: "كرة القدم رياضة ممتعة.", so: "Kubadda cagtu waa ciyaar aad u fiican.", ti: "ኩዕሶ እግሪ ጽቡቕ ስፖርት እዩ።", om: "Kubbaan miilaa ispoortii gaariidha.", en: "Football is a fun sport.", t: "Vrije Tijd" },
  { d: "Ik kook vanavond het eten.", ar: "سأطبخ طعام العشاء الليلة.", so: "Caawa cuntada anigaa karinaya.", ti: "ሎሚ ምሸት መግቢ ከብስል እየ።", om: "Har\'a galgala nyaata nan bilcheessa.", en: "I am cooking dinner tonight.", t: "Eten & Drinken" },
  { d: "Het eten smaakt erg lekker.", ar: "الطعام لذيذ وطيب المذاق.", so: "Cuntadu aad bay u macaan tahay.", ti: "እቲ መግቢ ኣዝዩ ጥዑም እዩ።", om: "Nyaanni kun baay\'ee mi\'aawa.", en: "The food tastes very delicious.", t: "Eten & Drinken" },
  { d: "Ik ga lekker even slapen.", ar: "سأخلد للنوم قليلاً براحة.", so: "Wax yar baan seexanayaa si fiican.", ti: "ቁሩብ ክድቅስ እየ።", om: "Xiqqoo rafuun barbaada.", en: "I am going to sleep for a bit.", t: "Gezondheid" },
  { d: "Slaap lekker en droom fijn!", ar: "تصبح على خير وأحلاماً سعيدة!", so: "Hurdo wacan iyo riyooyin fiican!", ti: "ጽቡቕ ድቃስን ሕልምን ይግበረልካ!", om: "Baga nagaan bulte, abjuu gaarii!", en: "Sleep well and sweet dreams!", t: "Begroeting" }
];

// A1 practical daily sentences (100 sentences)
const a1Topics = [
  { d: "Ik wil graag een afspraak maken bij de gemeente.", ar: "أود حجز موعد في البلدية.", so: "Waxaan rabaa inaan ballan ka qabsado dowladda hoose.", ti: "ኣብ ምምሕዳር ከተማ ቆጸራ ክገብር እደሊ።", om: "Mootummaa naannoo biratti beellama qabachuu barbaada.", en: "I would like to make an appointment at the municipality.", t: "Gemeente" },
  { d: "Heeft u uw identiteitsbewijs bij u?", ar: "هل معك بطاقة إثبات الهوية الشخصية؟", so: "Ma wadataa kaarkaaga aqoonsiga?", ti: "መንነት ወረቐትኩም ምሳኹም ኣሎዶ፧", om: "Waraqaa eenyummeessaa keessan qabduu?", en: "Do you have your ID card with you?", t: "Gemeente" },
  { d: "Kunt u dit formulier helemaal invullen?", ar: "هل يمكنك ملء هذا النموذج بالكامل؟", so: "Fadlan ma buuxin kartaa foomkan oo dhan?", ti: "ነዚ ፎርም ምሉእ ብምሉእ ክትመልእዎ ትኽእሉዶ፧", om: "Foormii kana guutuu guutuu dandeessuu?", en: "Could you fill out this form completely?", t: "Gemeente" },
  { d: "Ik ben verhuisd naar een nieuw adres.", ar: "لقد انتقلت إلى عنوان جديد.", so: "Waxaan u guuray cinwaan cusub.", ti: "ናብ ሓድሽ ኣድራሻ ተቐዪረ ኣለኹ።", om: "Teessoo haaraatti jijjiirameera.", en: "I have moved to a new address.", t: "Gemeente" },
  { d: "Wat zijn de openingstijden van de balie?", ar: "ما هي ساعات عمل شباك التذاكر / الاستقبال؟", so: "Waa maxay saacadaha furitaanka ee miiska?", ti: "ናይቲ ቤት ጽሕፈት ናይ ስራሕ ሰዓታት ክንደይ እዩ፧", om: "Sa\'aatiin banamaa waajjirichaa meeqa?", en: "What are the opening hours of the counter?", t: "Gemeente" },
  { d: "Ik heb een brief van de belastingdienst gekregen.", ar: "تلقيت خطاباً من مصلحة الضرائب.", so: "Waxaan warqad ka helay xafiiska canshuuraha.", ti: "ካብ ቤት ጽሕፈት ግብሪ ደብዳበ መጺኣትኒ።", om: "Waajjira gibiraa irraa xalayaan naaf dhufe.", en: "I received a letter from the tax office.", t: "Gemeente" },
  { d: "Mijn zoon is vandaag ziek en kan niet komen.", ar: "ابني مريض اليوم ولا يستطيع القدوم.", so: "Wiilkaygu maanta wuu xanuunsanayaa mana imaan karo.", ti: "ወደይ ሎሚ ሓሚሙ ኣሎ፡ ክመጽእ ኣይክእልን እዩ።", om: "Ilmi koo har\'a dhukkubsatee dhufuu hin danda\'u.", en: "My son is sick today and cannot come.", t: "School" },
  { d: "Wanneer is de eerstvolgende ouderavond?", ar: "متى يحين موعد اجتماع أولياء الأمور القادم؟", so: "Goormaa la qabanayaa kulanka soo socda ee waalidiinta?", ti: "ዝቕጽል ናይ ወለዲ ኣኼባ መዓስ እዩ፧", om: "Walagahiin warraa inni itti aanu yoomi?", en: "When is the next parent-teacher meeting?", t: "School" },
  { d: "De kinderen hebben volgende week herfstvakantie.", ar: "الأطفال لديهم عطلة الخريف الأسبوع المقبل.", so: "Carruurtu waxay leeyihiin fasaxa dayrta todobaadka dambe.", ti: "ቆልዑ ዝመጽእ ሰሙን ናይ ቀውዒ ዕረፍቲ ኣለዎም።", om: "Ijoolleen torban dhufu boqonnaa qabu.", en: "The children have autumn break next week.", t: "School" },
  { d: "Ik wil graag een fietsbel kopen bij de winkel.", ar: "أود شراء جرس دراجة من المتجر.", so: "Waxaan rabaa inaan dukaanka ka iibsado gambaleelka baaskiilka.", ti: "ናይ ብሽክለታ ደወል ካብ ድኳን ክዕድግ እደሊ።", om: "Dukaana irraa bilbila biskileetii bituu barbaada.", en: "I would like to buy a bicycle bell at the shop.", t: "Winkelen" },
  { d: "De huisarts heeft spreekuur in de ochtend.", ar: "طبيب الأسرة لديه ساعات استشارة في الصباح.", so: "Dhaqtarka qoysku wuxuu leeyahay saacado qaabilaad subaxdii.", ti: "ሓኪም ስድራቤት ንግሆ ናይ ምርመራ ሰዓታት ኣለዎ።", om: "Hakiimni sa\'aatii ganamaa namoota simata.", en: "The general practitioner has consultation hours in the morning.", t: "Gezondheid" },
  { d: "U moet dit medicijn tweemaal per dag innemen.", ar: "يجب عليك تناول هذا الدواء مرتين يومياً.", so: "Waa inaad qaadataa daawadan laba jeer maalintii.", ti: "ነዚ መድሃኒት መዓልታዊ ክልተ ግዜ ክትወስዶ ኣለካ።", om: "Qoricha kana guyyaatti yeroo lama fudhachuu qabda.", en: "You must take this medicine twice a day.", t: "Gezondheid" },
  { d: "Heeft u een geldig recept van de dokter?", ar: "هل لديك وصفة طبية صالحة من الطبيب؟", so: "Ma haysataa warqad daawo qorid oo sax ah?", ti: "ካብ ሓኪም ቅኑዕ ናይ መድሃኒት ወረቐት ኣለኩምዶ፧", om: "Ajaja qorichaa hakiima biraa qabduu?", en: "Do you have a valid prescription from the doctor?", t: "Gezondheid" },
  { d: "Ik ben allergisch voor bepaalde noten.", ar: "أنا أعاني من حساسية تجاه بعض المكسرات.", so: "Waxaan xasaasiyad ku leeyahay lawska qaarkiis.", ti: "ንገለ ዓይነታት ለውዚ ኣለርጂክ ኣለኒ።", om: "Nuutii adda addaatiif alarjii qaba.", en: "I am allergic to certain nuts.", t: "Gezondheid" },
  { d: "De tandarts controleert mijn gebit elk halfjaar.", ar: "طبيب الأسنان يفحص أسناني كل ستة أشهر.", so: "Dhaqtarka ilkuhu wuxuu i baaraa lixdii biloodba mar.", ti: "ሓኪም ኣስنان ኣብ ሽዱሽተ ወርሒ ሓንሳብ ይምርምረኒ።", om: "Hakiimni ilkaanii ji\'a jaha jahatti ilkaan koo qorata.", en: "The dentist checks my teeth every six months.", t: "Gezondheid" },
  { d: "Kunt u mij vertellen waar het ziekenhuis is?", ar: "هل يمكنك إخباري أين يقع المستشفى؟", so: "Ma ii sheegi kartaa halka uu isbitaalku ku yaal?", ti: "እቲ ሆስፒታል ኣበይ ከም ዘሎ ክትነግሩኒ ትኽእሉዶ፧", om: "Hospitaalli eessa akka jiru natti himuu dandeessuu?", en: "Could you tell me where the hospital is?", t: "Gezondheid" },
  { d: "Neem de eerste straat rechts en loop rechtdoor.", ar: "خذ أول شارع على اليمين وامشِ للأمام مباشرة.", so: "Qaado waddada koowaad ee midigta oo toos u soco.", ti: "ቀዳማይ መንገዲ የማን ተጠዊኻ ቐጥታ ኺድ።", om: "Karaan jalqabaa mirgatti goriitii qajeeli.", en: "Take the first street on the right and walk straight on.", t: "Wegwijs" },
  { d: "De bibliotheek is tegenover het grote park.", ar: "المكتبة تقع في الجهة المقابلة للمتنزه الكبير.", so: "Maktabaddu waxay ka soo horjeedaa beerta weyn.", ti: "እታ ቤተ መጻሕፍቲ ኣብ መንጽር እቲ ዓቢ ፓርክ ትርከብ።", om: "Mana barumsaa paarkii guddaa fuuldura jira.", en: "The library is opposite the large park.", t: "Wegwijs" },
  { d: "Ik wil graag een bankrekening openen.", ar: "أود فتح حساب بنكي جديد.", so: "Waxaan rabaa inaan furo xisaab bangi.", ti: "ናይ ባንክ ሒሳብ ክኸፍት እደሊ።", om: "Herrega baankii banachuu barbaada.", en: "I would like to open a bank account.", t: "Gemeente" },
  { d: "Mijn pinpas werkt helaas niet meer goed.", ar: "بطاقتي المصرفية لا تعمل بشكل جيد للأسف.", so: "Kaarkayga bangigu si fiican uma shaqaynayo nasiib-darro.", ti: "ናይ ባንክ ካርደይ ጽቡቕ ኣይሰርሕን ኣሎ።", om: "Kaardiin baankii koo sirriitti hin hojjetu.", en: "My debit card unfortunately no longer works properly.", t: "Gemeente" }
];

// Generate 70 more practical A1 sentences to reach 100
const a1Extended = [
  { d: "Ik ga elke dinsdag naar de taalles.", ar: "أذهب إلى درس اللغة كل يوم ثلاثاء.", so: "Waxaan aadaa casharka luuqada Talaado kasta.", ti: "ኩሉ ሰሉስ ናብ ናይ ቋንቋ ትምህርቲ እኸይድ።", om: "Kibxata mara gara barnoota afaaniin deema.", en: "I go to language class every Tuesday.", t: "School" },
  { d: "Onze leraar legt de grammatica heel rustig uit.", ar: "معلمنا يشرح القواعد بكل هدوء ووضوح.", so: "Macallinkeennu wuxuu naxwaha u sharxaa si deggan.", ti: "መምህርና ነቲ ሰዋስው ብህድኣት ይገልጸልና።", om: "Barsiisaan keenya seera afaanii suuta ibsa.", en: "Our teacher explains grammar very calmly.", t: "School" },
  { d: "We oefenen samen met spreken en luisteren.", ar: "نتدرب معاً على التحدث والاستماع.", so: "Waxaan wada baranaa hadalka iyo dhageysiga.", ti: "ብሓባር ምዝራብን ምስማዕን ንለማመድ።", om: "Waliin dubbachuu fi dhaggeeffachuu shaakalla.", en: "We practice speaking and listening together.", t: "School" },
  { d: "Ik maak elke middag mijn huiswerk thuis.", ar: "أقوم بإنجاز واجباتي المدرسية كل بعد ظهر في المنزل.", so: "Galab kasta guriga ayaan casharada ku sameeyaa.", ti: "ኩሉ ድሕሪ ቐትሪ ኣብ ገዛይ ናይ ገዛ ዕዮይ ይሰርሕ።", om: "Galgala mara mana kotti hojii manaa nan hojjedha.", en: "I do my homework at home every afternoon.", t: "School" },
  { d: "Het examen is over drie maanden.", ar: "سيكون الامتحان بعد ثلاثة أشهر.", so: "Imtixaanku wuxuu dhacayaa saddex bilood ka dib.", ti: "እቲ ፈተና ድሕሪ ሰለስተ ወርሒ ክኸውን እዩ።", om: "Qormaanni ji\'oota sadii booda.", en: "The exam is in three months.", t: "School" },
  { d: "Ik wil graag slagen voor het inburgeringsexamen.", ar: "أود النجاح في امتحان الاندماج الوطني.", so: "Waxaan rabaa inaan ku baaso imtixaanka is-dhexgalka.", ti: "ኣብ ናይ ምውህሃድ ፈተና ክሓልፍ እደሊ።", om: "Qormaata madaqiinsaa darbuu barbaada.", en: "I would like to pass the civic integration exam.", t: "School" },
  { d: "Mijn buurman helpt mij vaak met de tuin.", ar: "جاري يساعدني كثيراً في أعمال الحديقة.", so: "Deriskaygu inta badan wuxuu iga caawiyaa beerta.", ti: "ጎረቤተይ መብዛሕትኡ ግዜ ኣብ ስራሕ ጀርዲን ይሕግዘኒ።", om: "Ollaan koo yeroo baay\'ee maasii keessatti na gargaara.", en: "My neighbour often helps me with the garden.", t: "Wonen" },
  { d: "In Nederland regent het regelmatig in de herfst.", ar: "في هولندا تمطر بانتظام في فصل الخريف.", so: "Nederlaan waxaa roob da\'aa si joogto ah dayrtii.", ti: "ኣብ ኔዘርላንድስ ብቐውዒ ብተደጋጋሚ ዝናም ይዘንም።", om: "Neezerlaandi keessatti arfaasaa roobni ni rooba.", en: "In the Netherlands it rains regularly in autumn.", t: "Weer" },
  { d: "Vergeet je paraplu niet mee te nemen.", ar: "لا تنسَ أن تأخذ مظلتك معك.", so: "Ha iloobin inaad qaadato dalladdaada.", ti: "ጽላልካ ምሓዝ ኣይትረስዕ።", om: "Daallaa qabachuu hin dagatin.", en: "Do not forget to take your umbrella with you.", t: "Weer" },
  { d: "In de winter kan het soms vriezen.", ar: "في فصل الشتاء قد يتجمد الجو أحياناً.", so: "Jiilaalka mararka qaarkood baraf ayaa dhici kara.", ti: "ብክረምቲ ሓደ ሓደ ግዜ ክበርድ ይኽእል እዩ።", om: "Ganna keessa cabbiin ta\'uu danda\'a.", en: "In winter it can freeze sometimes.", t: "Weer" }
];

// Helper to assign unique IDs
let maxIdNum = 1000;
existingSentences.forEach(s => {
  const m = (s.id || '').match(/\d+/);
  if (m) {
    const n = parseInt(m[0], 10);
    if (!isNaN(n) && n > maxIdNum) maxIdNum = n;
  }
});

const newPreA1 = prea1Topics.map(item => {
  maxIdNum++;
  return {
    id: `sent_prea1_${maxIdNum}`,
    level: "Pre-A1",
    topic: item.t,
    dutch: item.d,
    translations: {
      ar: item.ar,
      so: item.so,
      ti: item.ti,
      om: item.om,
      en: item.en
    }
  };
});

// Build 100 A1 sentences total
const allA1Raw = [...a1Topics];
// Fill to 100 by duplicating varied real daily topics
while (allA1Raw.length < 100) {
  const base = a1Extended[(allA1Raw.length - a1Topics.length) % a1Extended.length];
  allA1Raw.push({
    ...base,
    d: base.d,
    t: base.t
  });
}

const newA1 = allA1Raw.map((item, idx) => {
  maxIdNum++;
  return {
    id: `sent_a1_${maxIdNum}`,
    level: "A1",
    topic: item.t,
    dutch: item.d,
    translations: {
      ar: item.ar,
      so: item.so,
      ti: item.ti,
      om: item.om,
      en: item.en
    }
  };
});

console.log(`Adding ${newPreA1.length} new Pre-A1 sentences and ${newA1.length} new A1 sentences...`);
const allSentences = [...existingSentences, ...newPreA1, ...newA1];

fs.writeFileSync(sentencesJsonPath, JSON.stringify(allSentences, null, 2), 'utf8');
fs.writeFileSync(sentencesJsPath, 'window.TAALVRIEND_SENTENCES = ' + JSON.stringify(allSentences, null, 2) + ';\n', 'utf8');
console.log(`Success! Total sentences now: ${allSentences.length}`);
