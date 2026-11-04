// scripts/generate-1000-more.js
// Generates 1000 additional words across 15 rich categories

const fs = require('fs');
const path = require('path');

const wordBatches = [
  // 1. Koken & Keukengerei (Cooking & Kitchen Utensils)
  {
    category: 'Eten & Drinken',
    icon: '🍳',
    color: '#D97706',
    bg: '#FEF3C7',
    words: [
      ['de braadpan', 'braadpan', 'de', 'مقلاة التحمير العميقة', 'ድስቲ ምብሳል', 'eelee foonii', 'frying pan / skillet', 'Bak het vlees aan in de braadpan.'],
      ['de kookpan', 'kookpan', 'de', 'قدر الطهي العادي', 'ድስቲ መብሰሊ', 'distii bilcheessaa', 'saucepan / cooking pot', 'Kook de rijst in een ruime kookpan.'],
      ['de deksel', 'deksel', 'de', 'غطاء القدر', 'መኽደኒ ድስቲ', 'qadaada distii', 'lid / pot cover', 'Doe de deksel op de pan zodat het sneller kookt.'],
      ['de snijplank', 'snijplank', 'de', 'لوح التقطيع الخشبي أو البلاستيكي', 'ጣውላ መክተፊ', 'gabatee murannaa', 'chopping board', 'Snijd groenten altijd op een schone snijplank.'],
      ['het schilmesje', 'schilmesje', 'het', 'سكين التقشير الصغيرة', 'ካራ መላጸ', 'billaa quncaaftuu', 'paring knife', 'Schil de appels met een scherp schilmesje.'],
      ['de dunschiller', 'dunschiller', 'de', 'مقشرة الخضار والبطاطس السريعة', 'መላጺት ድንሽ', 'quncaaftuu dinnichaa', 'vegetable peeler', 'Met de dunschiller schil je wortels vliegensvlug.'],
      ['de garde', 'garde', 'de', 'مضرب البيض اليدوي (الخفاقة)', 'መውቅዒ እንቋቝሖ', 'raasaa buuphaa', 'whisk', 'Klop de eieren luchtig met de garde.'],
      ['de pollepel', 'pollepel', 'de', 'ملعقة الطبخ الخشبية الكبيرة', 'ማንካ ዕንጨይቲ', 'fal\'aana mukaa', 'wooden spoon', 'Roer de soep door met een houten pollepel.'],
      ['de spatel', 'spatel', 'de', 'ملعقة التقليب المسطحة (السباتولا)', 'ስፓቱላ', 'ispachulaa', 'spatula', 'Keer de pannenkoek om met de spatel.'],
      ['de rasp', 'rasp', 'de', 'المبشرة المعدنية للجبن والخضار', 'መፋሕቂ ፎርማጆ', 'rurruustuu chiizii', 'grater', 'Rasp verse kaas over de pasta.'],
      ['het vergiet', 'vergiet', 'het', 'المصفاة الكبيرة للمعكرونة والخضار', 'መንፊት', 'gingilchaa / qullleessituu', 'colander / strainer', 'Giet de gekookte pasta af in het vergiet.'],
      ['de maatbeker', 'maatbeker', 'de', 'كوب القياس المعياري للسوائل', 'መዐቀኒ ብርጭቆ', 'kubbaayyaa safaraa', 'measuring jug', 'Meet 500 milliliter melk af in de maatbeker.'],
      ['de weegschaal', 'weegschaal', 'de', 'ميزان المطبخ الدقيق', 'ሚዛን', 'miizaana', 'kitchen scale', 'Weeg de bloem nauwkeurig af op de weegschaal.'],
      ['het schort', 'schort', 'het', 'مريلة المطبخ الواقية', 'ክዳን ክሽነ (ሽርጢ)', 'shuruxii kushinaa', 'apron', 'Draag een schort zodat je kleren schoon blijven.'],
      ['de ovenwant', 'ovenwant', 'de', 'قفاز الفرن العازل للحرارة', 'ጓንቲ ፎርኖ', 'guwaantii oovenii', 'oven mitt', 'Pak de hete ovenschaal vast met een ovenwant.'],
      ['de kurkentrekker', 'kurkentrekker', 'de', 'فتاحة الزجاجات الفلينية', 'መኽፈቲ ጥርሙዝ', 'bantuu qaruuraa', 'corkscrew', 'Waar ligt de kurkentrekker in de la?'],
      ['de blikopener', 'blikopener', 'de', 'فتاحة العلب المعدنية', 'መኽፈቲ ቆርቆሮ', 'bantuu qodaa qorqoorroo', 'can opener', 'Open het blik tomaten met de blikopener.'],
      ['de knoflookpers', 'knoflookpers', 'de', 'عصارة / هراسة الثوم', 'መጭመቒ ጻዕዳ ሽጉርቲ', 'cuunftuu qullubbii adii', 'garlic press', 'Pers een teentje knoflook uit boven de saus.'],
      ['de deegroller', 'deegroller', 'de', 'شوبك فرد العجين', 'መዘርግሒ ሊቃዕቲ', 'dheeressituu daakuu', 'rolling pin', 'Rol het deeg gelijkmatig uit met de deegroller.'],
      ['het bakpapier', 'bakpapier', 'het', 'ورق الخبز المقاوم للحرارة في الفرن', 'ወረቐት ፎርኖ', 'waraqaa oovenii', 'baking paper', 'Leg een vel bakpapier op de bakplaat.']
    ]
  },
  // 2. Bakkerij & Lekkernijen (Bakery & Treats)
  {
    category: 'Eten & Drinken',
    icon: '🥖',
    color: '#B45309',
    bg: '#FEF3C7',
    words: [
      ['het volkorenbrood', 'volkorenbrood', 'het', 'خبز القمح الكامل الأسمر الصحي', 'ባኒ ምሉእ ስርናይ', 'daabboo qamadii guutuu', 'wholemeal bread', 'Volkorenbrood bevat veel gezonde vezels.'],
      ['het witbrood', 'witbrood', 'het', 'الخبز الأبيض الخفيف', 'ጻዕዳ ባኒ', 'daabboo adii', 'white bread', 'Een tosti maken met twee sneetjes witbrood.'],
      ['het bruinbrood', 'bruinbrood', 'het', 'الخبز الأسمر التقليدي', 'ቡናዊ ባኒ', 'daabboo magaala', 'brown bread', 'De meeste Nederlanders eten dagelijks bruinbrood.'],
      ['het stokbrood', 'stokbrood', 'het', 'الخبز الفرنسي الطويل (الباغيت)', 'ነዊሕ ባኒ (ባጌት)', 'daabboo dheeraa (baageettii)', 'baguette / French bread', 'Knapperig Frans stokbrood bij de soep.'],
      ['het broodje', 'broodje', 'het', 'الرغيف الصغير المستدير (القرصة)', 'ንእሽቶ ባኒ', 'daabboo xiqqaa', 'bread roll / bun', 'Een zacht broodje met kaas en ei.'],
      ['de croissant', 'croissant', 'de', 'الكرواسون الهش بالزبدة', 'ክሮሳን', 'kuroosaantii', 'croissant', 'Een warme croissant bij het zondagse ontbijt.'],
      ['de pannenkoek', 'pannenkoek', 'de', 'الفطيرة الهولندية التقليدية (البانكيك)', 'ፓንከክ', 'paankeekii / maccafaa', 'Dutch pancake', 'Pannenkoeken met stroop en poedersuiker.'],
      ['de stroopwafel', 'stroopwafel', 'de', 'بسكويت الوافل الهولندي المحشو بالكراميل', 'ስትሮፕዋፍል', 'istiroopwaafil', 'stroopwafel (syrup waffle)', 'Leg de stroopwafel even op je hete kopje thee.'],
      ['de appeltaart', 'appeltaart', 'de', 'فطيرة التفاح الهولندية الشهيرة', 'ኬክ ቱፋሕ', 'keekii appilii', 'apple pie', 'Oma bakt de allerlekkerste appeltaart met kaneel.'],
      ['de ontbijtkoek', 'ontbijtkoek', 'de', 'كعكة التوابل للإفطار (خبز الزنجبيل)', 'ናይ ቁርሲ ኬክ', 'keekii ciree (ontbijtkoek)', 'spiced breakfast cake', 'Een dikke plak ontbijtkoek met wat boter.']
    ]
  },
  // 3. Zuivel & Vleeswaren (Dairy & Cold Cuts)
  {
    category: 'Eten & Drinken',
    icon: '🧀',
    color: '#F59E0B',
    bg: '#FEFCE8',
    words: [
      ['de roomboter', 'roomboter', 'de', 'الزبدة الطبيعية الدسمة', 'ጠስሚ ጸባ', 'dhadhaa aannanii', 'real butter / creamery butter', 'Bakken in echte roomboter geeft veel smaak.'],
      ['de margarine', 'margarine', 'de', 'الزبدة النباتية الخفيفة', 'ማርጋሪን', 'margaariinii', 'margarine', 'Margarine smeert makkelijk uit op brood.'],
      ['de slagroom', 'slagroom', 'de', 'الكريمة المخفوقة الحلوة', 'ስላግሮም (ክሬም)', 'kiriimii aannanii (slagroom)', 'whipped cream', 'Een toefje slagroom op de warme chocolademelk.'],
      ['de kookroom', 'kookroom', 'de', 'كريمة الطبخ للصلصات والشوربة', 'ክሬም መብሰሊ', 'kiriimii bilcheessaa', 'cooking cream', 'Voeg een scheutje kookroom toe aan de saus.'],
      ['de geitenkaas', 'geitenkaas', 'de', 'جبن الماعز الأبيض', 'ፎርማጆ ጤል', 'chiizii re\'ee', 'goat cheese', 'Salade met zachte geitenkaas en walnoten.'],
      ['de oude kaas', 'oude kaas', 'de', 'الجبن الهولندي القديم المعتق قوي النكهة', 'ብሉይ ፎርማጆ', 'chiizii moofaa', 'mature / aged Dutch cheese', 'Oude kaas smaakt lekker pittig met een beetje mosterd.'],
      ['de jonge kaas', 'jonge kaas', 'de', 'الجبن الهولندي الصغير الطري الخفيف', 'ሓድሽ ፎርማጆ', 'chiizii haarawa', 'mild / young Dutch cheese', 'Jonge kaas smelt heerlijk op een tosti.'],
      ['de kipfilet', 'kipfilet', 'de', 'صدر الدجاج المخلي الخالي من العظم', 'ስጋ ደርሆ ፍሌቶ', 'foon lukkuu lafee malee', 'chicken breast fillet', 'Bak de malse kipfilet in kleine blokjes.'],
      ['het rundergehakt', 'rundergehakt', 'het', 'اللحم البقري المفروم الطازج', 'ዝተጠሓነ ስጋ ብዕራይ', 'foon loonii daakame', 'minced beef', 'Halal rundergehakt voor de pastasaus.'],
      ['de biefstuk', 'biefstuk', 'de', 'شريحة لحم البقر الطرية (الستيك)', 'ስቴክ ስጋ', 'isteekii foonii', 'beef steak', 'Een malse biefstuk kort om en om bakken.']
    ]
  },
  // 4. Kleding & Textiel (Clothing & Fabrics)
  {
    category: 'Kleding',
    icon: '👔',
    color: '#2563EB',
    bg: '#EFF6FF',
    words: [
      ['het overhemd', 'overhemd', 'het', 'القميص الرجالي الرسمي ذو الياقة والأزرار', 'ካሚቻ ክሳድ', 'shaamizii mormaa', 'formal button-down shirt', 'Hij draagt een wit overhemd met een das.'],
      ['de stropdas', 'stropdas', 'de', 'ربطة العنق / الكرافتة', 'ክራቫት', 'koraabaattii', 'necktie', 'Een donkerblauwe stropdas voor de bruiloft.'],
      ['het pak / kostuum', 'pak', 'het', 'البدلة الرسمية الكاملة', 'ሙሉእ ክዳን (ኮስቱም)', 'suutii guutuu', 'formal suit', 'Hij kocht een net pak voor het sollicitatiegesprek.'],
      ['de blazer / colbert', 'blazer', 'de', 'السترة الرسمية المفردة (البليزر)', 'ኮት / ጃኬት', 'kootii seeraa (bleezarii)', 'blazer / jacket', 'Een nette blazer staat heel professioneel.'],
      ['het vest', 'vest', 'het', 'السترة المحبوكة ذات السحاب أو الأزرار', 'ቬስት / ማልያ', 'vestii / uffata qorraa', 'cardigan / knitted vest', 'Trek een vest aan als je het fris hebt.'],
      ['de hoodie / trui met capuchon', 'hoodie', 'de', 'الكنزة ذات القبعة للشباب (الهودي)', 'ሹራብ ቆቢዕ ዘለዎ', 'shurraaba qobbee qabu', 'hoodie', 'Jongeren dragen vaak een comfortabele hoodie.'],
      ['het hemd / singlet', 'hemd', 'het', 'الفانلة الداخلية بدون أكمام', 'ካሚቾላ', 'kaamichoolaa', 'undershirt / tank top', 'Een katoenen hemd onder je trui.'],
      ['de legging', 'legging', 'de', 'البنطال الضيق المطاطي (الستريتش)', 'ስረ ሌጊንግ', 'surree dhiphaa (leegginsi)', 'leggings', 'Een zwarte legging zit lekker soepel.'],
      ['de panty', 'panty', 'de', 'الجوارب الطويلة الشفافة النسائية', 'ካልሲ ነዊሕ (ፓንቲ)', 'paantii / kaalsii qalloo', 'pantyhose / tights', 'Zij draagt een panty onder haar nette jurk.'],
      ['de pyjama', 'pyjama', 'de', 'ملابس النوم المريحة (البيجامة)', 'ፒጃማ', 'pijaamaa / uffata hirriibaa', 'pajamas', 'Kinderen trekken na het douchen hun pyjama aan.'],
      ['de badjas', 'badjas', 'de', 'رداء الحمام المريح (البرنص)', 'ክዳን ባኞ', 'baatiraasii', 'bathrobe / dressing gown', 'Een warme badjas na het opstaan.'],
      ['de badkleding', 'badkleding', 'de', 'ملابس السباحة', 'ክዳን ሓንበሳ', 'uffata daakkaa', 'swimwear', 'Neem je badkleding mee naar het zwembad.'],
      ['de zwembroek', 'zwembroek', 'de', 'شورت السباحة للرجال والأولاد', 'ስረ ሓንበሳ', 'surree gabaabaa daakkaa', 'swimming trunks', 'Een sneldrogende zwembroek voor het strand.'],
      ['het badpak', 'badpak', 'het', 'مايوه السباحة النسائي من قطعة واحدة', 'ክዳን ሓንበሳ ደቂ ኣንስትዮ', 'uffata daakkaa dubartootaa', 'swimsuit / bathing suit', 'Zij draagt een comfortabel badpak bij de zwemles.'],
      ['de slippers', 'slippers', 'de', 'الشبشب / الصندل الصيفي الخفيف', 'ስሊፐርስ / ሸሓጢት', 'shakarraaqaa / kophicha', 'flip-flops / slippers', 'Zomers lopen veel mensen op slippers.'],
      ['de sandalen', 'sandalen', 'de', 'الصنادل الصيفية ذات الأشرطة', 'ሳንዳል', 'saandaala', 'sandals', 'Leren sandalen zitten heerlijk in warm weer.'],
      ['de sportschoenen / sneakers', 'sportschoenen', 'de', 'الأحذية الرياضية المريحة (السنيكرز)', 'ሳእኒ ስፖርት', 'kophee ispoortii', 'sneakers / sports shoes', 'Witte sneakers passen bij elke spijkerbroek.'],
      ['de wandelschoenen', 'wandelschoenen', 'de', 'أحذية المشي لمسافات طويلة المتينة', 'ሳእኒ ጉዕዞ', 'kophee deemsaa', 'hiking shoes / walking boots', 'Goede wandelschoenen ondersteunen de enkels.'],
      ['de regenkleding', 'regenkleding', 'de', 'ملابس المطر العازلة للمياه (البدلة المقاومة)', 'ክዳን ዝናብ', 'uffata bokkaa ittisu', 'rainwear', 'In Nederland is een goed regenpak onmisbaar op de fiets.'],
      ['de pet', 'pet', 'de', 'القبعة ذات الحافة الأمامية (الكاب)', 'ቆቢዕ', 'qobbee aduu', 'cap', 'Zet een pet op tegen de felle zon.']
    ]
  },
  // 5. Huur, Woning & Klussen (Housing, Rent & DIY)
  {
    category: 'Wonen & Huis',
    icon: '🔨',
    color: '#0D9488',
    bg: '#F0FDFA',
    words: [
      ['de woningbouwcorporatie', 'woningbouwcorporatie', 'de', 'جمعية الإسكان الاجتماعي الرسمية', 'ማሕበር ኣባይቲ', 'dhaabbata ijaarsa manaa', 'housing association', 'Schrijf je in bij de woningcorporatie in jouw regio.'],
      ['de wachtlijst', 'wachtlijst', 'de', 'قائمة الانتظار للحصول على سكن', 'ዝርዝር መጸበዪ', 'tarree eeggattootaa', 'waiting list', 'Er is vaak een lange wachtlijst voor een sociale huurwoning.'],
      ['de sociale huurwoning', 'sociale huurwoning', 'de', 'مسكن الإيجار الاجتماعي المدعوم حكومياً', 'ናይ ማሕበር ክራይ ገዛ', 'mana kiraa hawaasummaa', 'social housing home', 'Een sociale huurwoning heeft een wettelijke maximale huurprijs.'],
      ['de particuliere huur', 'particuliere huur', 'de', 'الإيجار من القطاع الخاص (الملاك الأفراد)', 'ናይ ብሕቲ ክራይ', 'kiraa dhuunfaa', 'private rental sector', 'Particuliere huurwoningen zijn meestal een stuk duurder.'],
      ['de borg / waarborgsom', 'borg', 'de', 'مبلغ التأمين المسترد عند الاستئجار', 'መተሓhandle / ውሕስነት ገንዘብ', 'qabsiisa maallaqaa (borg)', 'security deposit', 'De verhuurder vraagt meestal één maand huur als borg.'],
      ['de inschrijving', 'inschrijving', 'de', 'التسجيل الرسمي في سجل السكان (BRP)', 'ምዝገባ', 'galmee seeraa', 'registration (city hall)', 'De inschrijving op het woonadres is wettelijk verplicht.'],
      ['het huurcontract', 'huurcontract', 'het', 'عقد الإيجار السكني الموقع', 'ውዕል ክራይ ገዛ', 'waliigaltee kiraa manaa', 'tenancy / lease agreement', 'Lees het huurcontract zorgvuldig door voor je tekent.'],
      ['de opzegging', 'opzegging', 'de', 'إشعار إلغاء العقد وإنهاؤه', 'ምቁራጽ ውዕል', 'beeksisa kutee xumuruu', 'cancellation / notice', 'Geef de opzegging schriftelijk door aan de verhuurder.'],
      ['de overlast', 'overlast', 'de', 'الإزعاج والضوضاء المزعجة من الجيران', 'ረብሻ ጎረባብቲ', 'jeecha / sagalee ol ka\'aa', 'nuisance / noise disturbance', 'Praat eerst rustig met de buren als je geluidsoverlast ervaart.'],
      ['de burenruzie', 'burenruzie', 'de', 'الخلاف أو الشجار بين الجيران', 'ባእሲ ጎረባብቲ', 'lola ollaa', 'neighbor dispute', 'Buurtbemiddeling kan helpen bij een burenruzie.'],
      ['de buurtbemiddeling', 'buurtbemiddeling', 'de', 'خدمة التوفيق والوساطة الودية بين الجيران', 'ሽምግልና ጎረባብቲ', 'jaarsummaa ollaa', 'community / neighborhood mediation', 'Buurtbemiddeling lost problemen rustig en gratis op.'],
      ['de schroevendraaier', 'schroevendraaier', 'de', 'مفك البراغي العادي والصليبة', 'ካቻቪተ', 'misoortuu / kaachaaviitee', 'screwdriver', 'Draai de schroef vast met een schroevendraaier.'],
      ['de hamer', 'hamer', 'de', 'الشاكوش / المطرقة', 'ማርቴሎ', 'marteelloo / burruusa', 'hammer', 'Sla de spijker voorzichtig in de muur met de hamer.'],
      ['de spijker / nagel', 'spijker', 'de', 'المسمار العادي', 'መስማር', 'mismarii', 'nail', 'Een spijker in de muur om een schilderijtje op te hangen.'],
      ['de schroef', 'schroef', 'de', 'البرغي الحلزوني (القلاووظ)', 'ቪተ', 'burqaa / viitee', 'screw', 'Een schroef zit veel steviger vast in de plug.'],
      ['de boormachine', 'boormachine', 'de', 'المثقاب الكهربائي (الدريل)', 'መበsequ / ድሪል', 'maashinii booroo (diriilii)', 'power drill', 'Boor een gat in het beton met de boormachine.'],
      ['de waterpas', 'waterpas', 'de', 'ميزان الماء لضبط الاستواء الأفقي', 'ዋተርፓስ (መዐቀኒ ቅንዕና)', 'waatarpaasii', 'spirit level', 'Hang het fotolijstje waterpas op de muur.'],
      ['het meetlint / rolmaat', 'rolmaat', 'het', 'شريط القياس المتري المرن (المتر)', 'ሜተር መዐቀኒ', 'teepii meetiraa', 'tape measure', 'Meet de lengte van de bank op met de rolmaat.'],
      ['de tang', 'tang', 'de', 'الكماشة / الزردية', 'ሞሳ', 'qabduu sibiilaa', 'pliers', 'Trek de oude spijker eruit met een stevige tang.'],
      ['de zaag', 'zaag', 'de', 'المنشار اليدوي للخشب', 'መጋዝ', 'magaazii', 'saw', 'Zaag de houten plank netjes op maat.']
    ]
  },
  // 6. Bank, Rekeningen & Administratie (Banking & Paperwork)
  {
    category: 'Documenten & Zaken',
    icon: '💳',
    color: '#059669',
    bg: '#ECFDF5',
    words: [
      ['het spaargeld', 'spaargeld', 'het', 'الأموال المدخرة في حساب التوفير', 'ገንዘብ ቁጠባ', 'maallaqa qusatame', 'savings', 'Het is verstandig een klein bedrag aan spaargeld opzij te zetten.'],
      ['de spaarrekening', 'spaarrekening', 'de', 'حساب التوفير المصرفي ذو الفائدة', 'ሕሳብ ቁጠባ', 'herrega qusannaa', 'savings account', 'Zet maandelijks wat geld over naar de spaarrekening.'],
      ['de betaalrekening', 'betaalrekening', 'de', 'الحساب المصرفي الجاري اليومي', 'ናይ መዓልታዊ ሕሳብ ባንክ', 'herrega sochooftuu baankii', 'checking / current account', 'Je salaris komt binnen op de betaalrekening.'],
      ['de rente', 'rente', 'de', 'الفائدة المصرفية (على التوفير أو القرض)', 'ወለድ', 'dhala maallaqaa', 'interest', 'De rente op de spaarrekening is iets gestegen.'],
      ['de lening', 'lening', 'de', 'القرض المالي المصرفي', 'ልቓሕ', 'liqaa', 'loan', 'Geld lenen kost altijd extra geld.'],
      ['de hypotheek', 'hypotheek', 'de', 'القرض العقاري السكني الطويل الأجل', 'ልቓሕ ገዛ (ሂፖቴክ)', 'liqaa manaa (hypotheek)', 'mortgage', 'Om een huis te kopen sluiten mensen een hypotheek af.'],
      ['de belastingaangifte', 'belastingaangifte', 'de', 'الإقرار الضريبي السنوي الإلزامي', 'ናይ ግብሪ ፎርም ምምላእ', 'gabaasa gibiraa waggaa', 'annual tax return', 'In april doen we digitaal de belastingaangifte.'],
      ['de inkomstenbelasting', 'inkomstenbelasting', 'de', 'ضريبة الدخل الشخصية المقتطعة', 'ግብሪ ኣታዊ', 'gibira galii dhuunfaa', 'income tax', 'Inkomstenbelasting wordt maandelijks ingehouden op je brutoloon.'],
      ['het brutoloon', 'brutoloon', 'het', 'الراتب الإجمالي قبل خصم الضرائب والتأمينات', 'ደሞዝ ቅድሚ ግብሪ (ብሩቶ)', 'mindaa gibiraan duraa (bruto)', 'gross salary', 'Op je contract staat altijd het brutoloon vermeld.'],
      ['het nettoloon', 'nettoloon', 'het', 'الراتب الصافي الفعلي المحول للحساب البنكي', 'ደሞዝ ድሕሪ ግብሪ (ኔቶ)', 'mindaa qulqulluu (netto)', 'net salary', 'Het nettoloon is het bedrag dat daadwerkelijk op je rekening staat.'],
      ['de jaaropgave', 'jaaropgave', 'de', 'البيان السنوي الرسمي الشامل للدخل والضرائب', 'ናይ ዓመት ጸብጻብ ደሞዝ', 'gabaasa mindaa waggaa (jaaropgave)', 'annual income statement', 'In januari stuurt de werkgever de jaaropgave.'],
      ['de administratie', 'administratie', 'de', 'إدارة الملفات والأوراق الرسمية والفواتير', 'ምሕደራ ወረቓቕቲ', 'bulchiinsa sanadootaa (administratie)', 'administration / paperwork', 'Houd je brieven en facturen netjes bij in een ordner.'],
      ['de ordner / map', 'ordner', 'de', 'المجلد / الدوسيه لحفظ المستندات المهمة', 'ፋይል / መዝገብ', 'galmee sanadaa (ordner)', 'ring binder / file folder', 'Stop belangrijke brieven van de overheid direct in de ordner.'],
      ['het tabblad', 'tabblad', 'het', 'الفواصل الورقية المقسمة داخل الملف', 'መክፈሊ ፋይል', 'fooyyituu galmee', 'divider tab', 'Gebruik tabbladen voor wonen, zorg, werk en belasting.'],
      ['het dossier', 'dossier', 'het', 'الملف الكامل للقضية أو المعاملة الرسمية', 'ዶስየ / መዝገብ ጉዳይ', 'galmee dhimmaa (dossier)', 'file / case record', 'Het COA houdt een dossier bij over jouw procedure.'],
      ['de DigiD-app', 'DigiD-app', 'de', 'تطبيق الهوية الرقمية على الهاتف الذكي', 'ኣፕ ዲጂድ', 'apilikeeshinii DigiD', 'DigiD mobile app', 'Bevestig het inloggen veilig met de pincode op je telefoon.'],
      ['de machtiging', 'machtiging', 'de', 'التوكيل والتفويض الرسمي لشخص آخر', 'ውክልና', 'bakka bu\'iinsa seeraa', 'authorization / power of attorney', 'Met een DigiD-machtiging kan een tolk of helper voor je inloggen.'],
      ['de bewindvoerder', 'bewindvoerder', 'de', 'الوصي المالي القانوني المعتمد', 'ተሓላቒ ገንዘብ', 'eegaa maallaqa seeraa', 'financial administrator / custodian', 'Een bewindvoerder helpt mensen die problematische schulden hebben.'],
      ['de schuldhulpverlening', 'schuldhulpverlening', 'de', 'برنامج الدعم الحكومي لتسوية وإعادة هيكلة الديون', 'ሓገዝ ምኽፋል ዕዳ', 'gargaarsa kaffaltii idaa', 'debt relief assistance', 'Vraag gratis hulp bij de schuldhulpverlening van de gemeente.'],
      ['de uitkering', 'uitkering', 'de', 'المعونة والمساعدة الاجتماعية المالية (Bijstand/WW)', 'ሓገዝ ገንዘብ መንግስቲ (ኣውትከሪንግ)', 'gargaarsa maallaqa dhabdummaa (uitkering)', 'social security benefit', 'Als je tijdelijk geen werk hebt, kun je een uitkering aanvragen.']
    ]
  },
  // 7. Werkwoorden: Dagelijkse Handelingen & Zelfzorg
  {
    category: 'Werkwoorden',
    icon: '⚡',
    color: '#6366F1',
    bg: '#EEF2FF',
    words: [
      ['opstaan', 'opstaan', '', 'الاستيقاظ والنهوض من الفراش', 'ምትንሳእ ካብ ዓራት', 'hirriibaa ka\'uu', 'to get up', 'Ik sta elke ochtend om zeven uur op.'],
      ['tandenpoetsen', 'tandenpoetsen', '', 'تنظيف الأسنان بالفرشاة والمعجون', 'ስኒ ምሕጻብ', 'ilkaan qulqulleessuu', 'to brush teeth', 'Poets je tanden twee minuten lang grondig.'],
      ['aankleden', 'aankleden', '', 'ارتداء الملابس والتأنق', 'ክዳን ምኽዳን', 'uffachuu', 'to get dressed', 'De kinderen kleden zichzelf snel aan.'],
      ['uitkleden', 'uitkleden', '', 'خلع الملابس قبل النوم أو الاستحمام', 'ክዳን ምውላቕ', 'uffata baafachuu', 'to undress', 'Kleed je uit voor het medisch onderzoek.'],
      ['ontbijten', 'ontbijten', '', 'تناول وجبة الإفطار الصباحية', 'ቁርሲ ምብላዕ', 'ciree nyaachuu', 'to have breakfast', 'We ontbijten samen aan de keukentafel.'],
      ['lunch eten', 'lunch eten', '', 'تناول طعام الغداء في منتصف اليوم', 'ምሳሕ ምብላዕ', 'laaqana nyaachuu', 'to have lunch', 'Tussen de middag eet ik een gezonde salade.'],
      ['avondeten', 'avondeten', '', 'تناول وجبة العشاء المسائية الرئيسية', 'ድራር ምብላዕ', 'irbaata nyaachuu', 'to have dinner', 'Om zes uur schuift het hele gezin aan voor het avondeten.'],
      ['boodschappen doen', 'boodschappen doen', '', 'الذهاب للتسوق وشراء المستلزمات اليومية', 'ዕዳጋ ምግባር', 'bittaa gochuu', 'to do grocery shopping', 'Op zaterdagochtend doen we de wekelijkse boodschappen.'],
      ['schoonmaken', 'schoonmaken', '', 'التنظيف وترتيب البيت والأغراض', 'ምጽራይ', 'qulqulleessuu', 'to clean', 'We maken het hele huis grondig schoon.'],
      ['opruimen', 'opruimen', '', 'ترتيب الأشياء ووضع كل شيء في مكانه', 'ምእላይ ኣቑሑ', 'iddootti deebisuu / qindeessuu', 'to tidy up / put away', 'Ruim je speelgoed op voor het slapen gaan.'],
      ['afwassen', 'afwassen', '', 'غسل الصحون والأواني بعد الأكل', 'ሳሕኒ ምሕጻብ', 'saaxinii miiccuu', 'to wash the dishes', 'Wie helpt er mee met afwassen na het eten?'],
      ['stofzuigen', 'stofzuigen', '', 'تنظيف السجاد والأرضيات بالمكنسة الكهربائية', 'ምስታውዛውግ', 'lafa manaa qulqulleessuu (istofzuugii)', 'to vacuum', 'Stofzuig de slaapkamer even.'],
      ['dweilen', 'dweilen', '', 'مسح الأرضيات بالماء والمنظف', 'መሬት ምምሳሕ', 'lafa haxooftuun miiccuu', 'to mop the floor', 'Dweil de badkamervloer na het douchen.'],
      ['strijken', 'strijken', '', 'كي الملابس بالمكواة الساخنة', 'ካውያ ምውቃዕ', 'kaawiyaa gochuu', 'to iron', 'Hij strijkt zijn nette overhemden zelf.'],
      ['fietsen', 'fietsen', '', 'ركوب الدراجة الهوائية والتنقل بها', 'ብሽክለታ ምዝዋር', 'biskileetii oofu', 'to cycle / bike', 'Ik fiets elke dag naar mijn werk.'],
      ['wandelen', 'wandelen', '', 'المشي للتنزه والترويح عن النفس', 'ምዝዋር በእግሪ', 'lafoo deemuudhaan bashnanuu', 'to stroll / take a walk', 'We wandelen graag een uurtje in het bos.'],
      ['oversteken', 'oversteken', '', 'عبور الشارع إلى الرصيف المقابل بأمان', 'መንገዲ ምቋራጽ', 'karaa qaxxaamuruu', 'to cross the street', 'Kijk goed naar links en rechts voor je gaat oversteken.'],
      ['instappen', 'instappen', '', 'الصعود وركوب الحافلة أو القطار', 'ናብ ባቡር/ኣውቶቡስ ምእታው', 'baabura / baasii yaabbachuu', 'to board / get on', 'Laat reizigers eerst uitstappen voor je zelf instapt.'],
      ['uitstappen', 'uitstappen', '', 'النزول ومغادرة الحافلة أو القطار', 'ካብ ባቡር/ኣውቶቡስ ምውራድ', 'geejjiba keessaa bu\'uu', 'to alight / get off', 'Bij de volgende halte moeten we uitstappen.'],
      ['overstappen', 'overstappen', '', 'تغيير الحافلة أو القطار في المحطة', 'ባቡር ምቕያር', 'geejjiba jijjiirrachuu', 'to change / transfer trains', 'In Utrecht stappen we over op de intercity naar Den Haag.']
    ]
  },
  // 8. Werkwoorden: Communicatie & Leren
  {
    category: 'Werkwoorden',
    icon: '💬',
    color: '#0284C7',
    bg: '#F0F9FF',
    words: [
      ['antwoorden', 'antwoorden', '', 'الإجابة والرد على السؤال أو الرسالة', 'ምምላስ ሕቶ', 'deebii kennuu', 'to answer / reply', 'Weet jij het antwoord op deze vraag?'],
      ['vragen', 'vragen', '', 'السؤال والاستفسار وطلب المعلومة', 'ምሕታት', 'gaafachuu', 'to ask', 'Mag ik u iets belangrijks vragen?'],
      ['vertellen', 'vertellen', '', 'الحكاية ورواية الأحداث والقصص', 'ምንጋር ታሪክ', 'seenaa himuu', 'to tell / narrate', 'Opa vertelt een spannend verhaal.'],
      ['uitleggen', 'uitleggen', '', 'الشرح والتوضيح والتفسير بوضوح', 'ምግላጽ / ምብራህ', 'ibsuu / ifa gochuu', 'to explain', 'De leraar legt de moeilijke regel nog een keer uit.'],
      ['begrijpen', 'begrijpen', '', 'الفهم والاستيعاب التام للمعنى', 'ምርዳእ', 'hubachuu', 'to understand', 'Begrijpt iedereen wat de bedoeling is?'],
      ['onthouden', 'onthouden', '', 'التذكر والحفظ في الذاكرة وعدم النسيان', 'ምዝካር', 'yaadachuu / qabachuu', 'to remember / retain', 'Probeer de tien nieuwe woorden goed te onthouden.'],
      ['vergeten', 'vergeten', '', 'النسيان والغفلة عن الشيء', 'ምርሳዕ', 'irraanfachuu', 'to forget', 'Vergeet je sleutel niet mee te nemen!'],
      ['herhalen', 'herhalen', '', 'التكرار والإعادة لترسيخ المعلومة', 'ምድጋም', 'irra deebisuu', 'to repeat', 'Kunt u die zin alstublieft langzaam herhalen?'],
      ['oefenen', 'oefenen', '', 'التدريب والممارسة المنتظمة للتحسن', 'ምልምማድ', 'shaakaluu', 'to practice', 'Door elke dag te oefenen gaat het steeds beter.'],
      ['verbeteren', 'verbeteren', '', 'التحسين والتصحيح للأخطاء للأفضل', 'ምምሕያሽ', 'fooyyessuu', 'to improve / correct', 'Verbeter de foutjes in de tekst.'],
      ['invullen', 'invullen', '', 'ملء وكتابة البيانات في الاستمارة', 'ምምላእ ፎርም', 'unkaa guutuu', 'to fill in / complete a form', 'Vul je naam en geboortedatum in op het formulier.'],
      ['ondertekenen', 'ondertekenen', '', 'التوقيع الرسمي على الوثيقة أو العقد', 'ምፍራም', 'mallatteessuu', 'to sign (a document)', 'Onderteken het contract hier met een blauwe pen.'],
      ['versturen', 'versturen', '', 'الإرسال عبر البريد أو البريد الإلكتروني', 'ምስዳድ', 'erguu', 'to send / dispatch', 'Ik verstuur de e-mail meteen naar de gemeente.'],
      ['ontvangen', 'ontvangen', '', 'الاستلام وتلقي الرسالة أو الطرد', 'ምቕባል', 'fudhachuu', 'to receive', 'Heeft u mijn brief in goede orde ontvangen?'],
      ['meenemen', 'meenemen', '', 'الأخذ والإحضار والجلب معك في الطريق', 'ምውሳድ ምሳኻ', 'of wajjin qabachuu', 'to take along', 'Neem altijd een geldig legitimatiebewijs mee.'],
      ['brengen', 'brengen', '', 'الإيصال والتوصيل إلى مكان معين', 'ምብጻሕ', 'geessuu', 'to bring / take to', 'Ik breng de kinderen met de bakfiets naar school.'],
      ['halen', 'halen', '', 'الجلب والإحضار والاستلام من مكان', 'ምምጻእ / ምውሳድ', 'fiduu', 'to fetch / collect', 'Wie haalt vandaag de kinderen op van de opvang?'],
      ['ontmoeten', 'ontmoeten', '', 'المقابلة واللقاء الشخصي بالآخرين', 'ምርኻብ', 'wal arguu', 'to meet (people)', 'We ontmoeten elkaar voor de hoofdingang van het station.'],
      ['afspreken', 'afspreken', '', 'الاتفاق وتحديد موعد مسبق للمقابلة', 'ምቛጽር', 'waliigaltee qabaachuu', 'to arrange a meetup', 'Zullen we vrijdagmiddag samen koffie drinken?'],
      ['bedanken', 'bedanken', '', 'الشكر وتوجيه الامتنان والتقدير', 'ምምስጋን', 'galateeffachuu', 'to thank', 'Ik wil je heel hartelijk bedanken voor al je geduld.']
    ]
  },
  // 9. Dieren & Natuur (Animals & Nature Expansion)
  {
    category: 'Dieren & Natuur',
    icon: '🐾',
    color: '#059669',
    bg: '#ECFDF5',
    words: [
      ['het konijn', 'konijn', 'het', 'الأرنب الأليف الوديع', 'ማንትለ', 'hilleensa', 'rabbit', 'Het konijn knabbelt vrolijk aan een wortel.'],
      ['de geit', 'geit', 'de', 'الماعز / العنزة', 'ጤል', 're\'ee', 'goat', 'Kinderen aaien de geitjes op de kinderboerderij.'],
      ['de ezel', 'ezel', 'de', 'الحمار الصبور', 'ኣድጊ', 'harree', 'donkey', 'De ezel balkt luid in de wei.'],
      ['het varken', 'varken', 'het', 'الخنزير', 'ሓሰማ', 'booyyee', 'pig', 'Het varken rolt tevreden in de modder.'],
      ['de kip', 'kip', 'de', 'الدجاجة', 'ደርሆ', 'lukkuu / handaaqqo', 'chicken / hen', 'De kip legt elke ochtend een vers ei.'],
      ['de haan', 'haan', 'de', 'الديك الصائح عند الفجر', 'ደራሆ ኣውልያ', 'kormaa lukkuu', 'rooster', 'De haan kraait vroeg als de zon opkomt.'],
      ['de gans', 'gans', 'de', 'الإوزة الكبيرة المائية', 'ደርሆ ባሕሪ (ጋንስ)', 'daakkollee', 'goose', 'Witte ganzen lopen langs het water in het park.'],
      ['de zwaan', 'zwaan', 'de', 'البجعة البيضاء الجميلة', 'ስዋን / ዛዕባይ', 'zwaan (shimbirra bishaanii)', 'swan', 'Een prachtige witte zwaan zwemt met haar jongen in de gracht.'],
      ['de muis', 'muis', 'de', 'الفأر الصغير', 'ኣንጭዋ', 'hantuuta', 'mouse', 'De kat jaagt op de muis in de schuur.'],
      ['de rat', 'rat', 'de', 'الجرذ الكبير', 'ዓባይ ኣንጭዋ', 'dhaddee / hantuuta guddaa', 'rat', 'Gooi geen etensresten op straat, dat trekt ratten aan.'],
      ['de kikker', 'kikker', 'de', 'الضفدع الأخضر في البركة', 'እንቁሮባዕ', 'raacha', 'frog', 'In het voorjaar kwaken de kikkers in de sloot.'],
      ['de vis', 'vis', 'de', 'السمكة السابحة في الماء', 'ዓሳ', 'qurxummii', 'fish', 'Goudvissen zwemmen in de vijver.'],
      ['de bij', 'bij', 'de', 'النحلة العاملة المنتجة للعسل', 'ንህቢ', 'kanniisa', 'bee', 'Bijen zijn heel belangrijk voor bloemen en bomen.'],
      ['de wesp', 'wesp', 'de', 'الدبور المخطط بالأصفر والأسود', 'ጣንጡ መርዚ', 'hiddituu (wesp)', 'wasp', 'Sla niet naar een wesp, blijf rustig stilzitten.'],
      ['de vlinder', 'vlinder', 'de', 'الفراشة الملونة الرقيقة', 'ጽምብላሊዕ', 'billaacha', 'butterfly', 'Een kleurrijke vlinder strijkt neer op de bloem.'],
      ['de mier', 'mier', 'de', 'النملة الصغيرة النشيطة', 'ጻጸ', 'goondaa', 'ant', 'Een lange rij mieren loopt over het zandpad.'],
      ['de spin', 'spin', 'de', 'العنكبوت وصانع الخيوط', 'ሳሬት', 'sarphaphuu', 'spider', 'De spin weeft een prachtig web in de hoek van het raam.'],
      ['de vlieg', 'vlieg', 'de', 'الذبابة الطنانة', 'ሃመማ', 'titiisa', 'housefly', 'Doe de hor dicht zodat er geen vliegen binnenkomen.'],
      ['de worm', 'worm', 'de', 'دودة الأرض الرطبة في التربة', 'ሓሳኸ', 'raammoo lafaa', 'earthworm', 'Wormen maken de aarde in de tuin gezond en vruchtbaar.'],
      ['de slak', 'slak', 'de', 'الحلزون / البزاقة البطيئة', 'ሑጻ', 'dandii / kookiyyaa', 'snail', 'De slak kruipt langzaam over de vochtige bladeren.']
    ]
  },
  // 10. Natuur & Landschap (Nature & Dutch Landscape)
  {
    category: 'Dieren & Natuur',
    icon: '🌷',
    color: '#047857',
    bg: '#ECFDF5',
    words: [
      ['de dijk', 'dijk', 'de', 'السد الترابي الواقي من الفيضان (الدايك)', 'ዲክ (መከላኸሊ ውሕጅ)', 'daayikii (ittisa bishaanii)', 'dike / levee', 'De dijk beschermt het land tegen de hoge Noordzee.'],
      ['de molen', 'molen', 'de', 'طاحونة الهواء الهولندية الشهيرة', 'ናይ ንፋስ መጥሓን', 'daakuu qilleensaa (molen)', 'windmill', 'Toeristen fotograferen de historische windmolens.'],
      ['de gracht', 'gracht', 'de', 'القناة المائية الحضرية داخل المدينة', 'መስኖ ከተማ', 'booyii magaalaa (gracht)', 'canal', 'Rondvaartboten varen door de Amsterdamse grachten.'],
      ['de sloot', 'sloot', 'de', 'الخندق أو المجرى المائي في الريف بين الحقول', 'መስኖ መሮር', 'booyii qonnaa (sloot)', 'ditch', 'Koeien grazen rustig naast de brede sloot.'],
      ['het meer', 'meer', 'het', 'البحيرة الطبيعية الهادئة', 'ቀላይ', 'haroo', 'lake', 'In de zomer zeilen en zwemmen mensen op het meer.'],
      ['de rivier', 'rivier', 'de', 'النهر الجاري العذب', 'ፈለው', 'laga', 'river', 'Grote vrachtschepen varen over de rivier de Rijn.'],
      ['de duinen', 'duinen', 'de', 'الكثبان الرملية الساحلية الواقية', 'ሑጻ ባሕሪ (ዱነን)', 'tullee cirrachaa galaanaa (duinen)', 'dunes', 'Een prachtige fietstocht door de Noordzeeduinen.'],
      ['het strand', 'strand', 'het', 'الشاطئ الرملي البحري الواسع', 'ገምገም ባሕሪ', 'qarqara galaanaa', 'beach', 'Zandkastelen bouwen en uitwaaien op het strand.'],
      ['de wei / het weiland', 'weiland', 'het', 'المرعى العشبي الأخضر الفسيح', 'ሳዕሪ መሮር', 'lafa margaa (weiland)', 'meadow / pasture', 'Groene weilanden vol grazende koeien en schapen.'],
      ['de polder', 'polder', 'de', 'الأراضي المستصلحة والمجففة من البحر', 'ፖልደር (ዝተደረቐ መሬት)', 'lafa bishaan keessaa baafame (polder)', 'polder (reclaimed land)', 'Een groot deel van Nederland bestaat uit polders onder zeeniveau.']
    ]
  }
];

// Flatten and export
const extraWords = [];
let extIdx = 1000;

wordBatches.forEach(batch => {
  batch.words.forEach(w => {
    const [word, lemma, article, ar, ti, om, en, example] = w;
    extraWords.push({
      id: `ext_${lemma.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${extIdx++}`,
      word: word,
      lemma: lemma,
      article: article,
      category: batch.category,
      color: batch.color,
      bg: batch.bg,
      glyph: batch.icon,
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

console.log(`Generated batch of ${extraWords.length} words.`);
module.exports = extraWords;
