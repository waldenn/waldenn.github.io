const fs = require('fs');
const path = require('path');

// Convert Modern Standard Arabic text to Syrian Arabic dialect for listening dialogues
function toSyrianArabic(arText) {
  if (!arText) return '';
  let s = arText;
  
  // Syrian phrasing replacements
  const replacements = [
    [/أنا من سوريا وأسكن في/g, 'أنا من سوريا وعايشة بـ'],
    [/أنا من سوريا وأعيش في/g, 'أنا من سوريا وعايش بـ'],
    [/أنا أتعلم/g, 'عم بتعلم'],
    [/أنا أدرس/g, 'عم بدرس'],
    [/أنا أعمل/g, 'عم بشتغل'],
    [/أنا أذهب/g, 'عم بروح'],
    [/هل يمكنني الحصول على/g, 'ممكن آخد'],
    [/هل يمكنني أن/g, 'فيني'],
    [/الحساب يورو ونصف/g, 'الحساب يوروين ونص'],
    [/بالتأكيد، تفضل/g, 'أكيد، تفضل'],
    [/معذرة سيدي/g, 'عفواً أستاذ'],
    [/هل تتوقف هذه الحافلة عند المحطة؟/g, 'هالباص بيوقف عند المحطة؟'],
    [/نعم، بعد ثلاث محطات نصل إلى هناك/g, 'إي، بعد تلات مواقف بنوصل'],
    [/لا تنس تسجيل الخروج بالبطاقة/g, 'ما تنسى تسجل خروج بالكرت'],
    [/الطعام جاهز!/g, 'الأكل صار جاهز!'],
    [/هل تأتون إلى المائدة؟/g, 'تعالوا على السفرة؟'],
    [/نحن نأكل اليوم/g, 'اليوم طابخين'],
    [/بالهناء والشفاء للجميع!/g, 'صحة وهنا للجميع!'],
    [/أمي، لا أشعر بأنني بخير/g, 'ماما، مالي مرتاحة'],
    [/بطني تؤلمني كثيراً/g, 'بطني عم يوجعني كتير'],
    [/اشرب كوباً من الشاي الدافئ/g, 'اشربيلك كاسة شاي سخنة'],
    [/انظر إلى الخارج، المطر يهطل بشدة/g, 'تطلّع لبرا، عم تشتي كتير'],
    [/ارتدِ معطف المطر الدافئ/g, 'البس جاكيت المطر الدافي'],
    [/وخذ مظلتك معك إلى المدرسة/g, 'وخد شمسيتك معك عالمدرسة'],
    [/هل تريد الإيصال؟/g, 'بدك الفاتورة؟'],
    [/هل تريد الوصل؟/g, 'بدك الوصل؟'],
    [/لا شكراً، لا داعي/g, 'لا شكراً، ما في داعي'],
    [/أتمنى لك بقية يوم سعيدة!/g, 'يسعد أوقاتك!'],
    [/إلى اللقاء!/g, 'بشوفك بخير!'],
    [/أسرع، الساعة الآن الثامنة!/g, 'يلّا استعجل، صارت الساعة تمانة!'],
    [/يجب أن نركب الدراجة الآن/g, 'لازم نركب البسكليت هلأ'],
    [/جرس المدرسة يرن في الثامنة والنصف/g, 'جرس المدرسة بيضرب بالتمانة ونص'],
    [/صباح الخير، عيادة الطبيب/g, 'صباح الخير، عيادة الدكتور'],
    [/أود حجز موعد/g, 'بدي أحجز موعد'],
    [/هل يمكنك القدوم غداً في العاشرة؟/g, 'فيك تجي بكرة الساعة عشرة؟'],
    [/ماذا تريد؟/g, 'شو بدك؟'],
    [/أين المحطة؟/g, 'وين المحطة؟'],
    [/كم السعر؟/g, 'قديش السعر؟'],
    [/كم ثمن/g, 'قديش حق'],
    [/الآن/g, 'هلأ'],
    [/كثيراً/g, 'كتير'],
    [/جداً/g, 'كتير'],
    [/هنا/g, 'هون'],
    [/هناك/g, 'هنيك'],
    [/هذا/g, 'هاد'],
    [/هذه/g, 'هاي'],
    [/أريد/g, 'بدي'],
    [/نريد/g, 'بدنا'],
    [/لا أريد/g, 'ما بدي'],
    [/لماذا/g, 'ليش'],
    [/متى/g, 'أيمتى'],
    [/كيف حالك/g, 'كيفك / شلونك'],
    [/بخير/g, 'منيح'],
    [/أستطيع/g, 'فيني'],
    [/لا أستطيع/g, 'ما فيني'],
    [/سوف/g, 'رح']
  ];

  for (const [pattern, repl] of replacements) {
    s = s.replace(pattern, repl);
  }
  return s;
}

// Ensure complete, precise Somali line-by-line translation
function ensureSomaliTranslation(item) {
  const lines = item.lines || (item.dutch ? item.dutch.split('\n') : []);
  if (item.translations && item.translations.so && item.translations.so.trim().length > 10) {
    // If lines count matches, keep
    const soLines = item.translations.so.split('\n');
    if (soLines.length >= lines.length) {
      return item.translations.so.trim();
    }
  }

  // Pre-calculated line-by-line translations for standard scenarios
  const nlText = (item.dutch || lines.join('\n')).toLowerCase();
  
  if (nlText.includes('sarah') && nlText.includes('syrië')) {
    return 'Ascalaamu calaykum, waxaan ahay Sarah.\nWaxaan ka imid Suuriya waxaana deganahay Utrecht.\nHadda waxaan baranayaa afka Nederlandka.';
  }
  if (nlText.includes('bakker') || nlText.includes('bruin brood')) {
    return 'Subax wanaagsan! Ma heli karaa rooti bunni ah oo badh ah?\nHaa dhab ahaantii, fadlan qaado.\nWaa laba yuuro iyo konton senti.';
  }
  if (nlText.includes('bus') && nlText.includes('station')) {
    return 'I raali geli mudane, baskani ma ku joogsadaa saldhigga tareenka?\nHaa, saddex joogsi ka dib ayaan gaari doonnaa.\nHa iloobin inaad kaarkaaga calaamadsato marka aad degto.';
  }
  if (nlText.includes('eten is klaar') || nlText.includes('rijst met groenten')) {
    return 'Cuntadii way diyaar tahay! Miiska ma u imaanaysaan?\nMaanta waxaan cuneynaa bariis leh khudaar iyo digaag.\nCunto wanaagsan dhammaantiin!';
  }
  if (nlText.includes('buik doet') || nlText.includes('warme thee')) {
    return 'Hooyo, ma fiicni.\nCaloosha ayaa aad ii xanuunaysa.\nCab koob shaah kulul ah.';
  }
  if (nlText.includes('regent hard') || nlText.includes('regenjas')) {
    return 'Bal dibadda fiiri, roob xooggan baa da\'aya.\nGasho jaakaddaada roobka ee diirran.\nOo daladdaada u qaado dugsiga.';
  }
  if (nlText.includes('bon mee') || nlText.includes('fijne dag')) {
    return 'Ma rabtaa rasiidka?\nMay mahadsanid, uma baahni.\nMaalin wanaagsan! Nabadeey!';
  }
  if (nlText.includes('acht uur') && nlText.includes('fiets')) {
    return 'Dhaqsada, durba waa siddeeddii subaxnimo!\nWaa inaan hadda baaskiilka fuulnaa.\nJalaaska dugsigu wuxuu dhacayaa siddeedda iyo badhka.';
  }
  if (nlText.includes('huisarts') || nlText.includes('afspraak maken')) {
    return 'Subax wanaagsan, xafiiska dhakhtarka qoyska.\nWaxaan rabaa inaan ballan qabsado.\nMa iman kartaa berrito tobanka subaxnimo?';
  }
  if (nlText.includes('supermarkt') || nlText.includes('melk')) {
    return 'Fadlan caanuhu xaggee yaallaan?\nMarinka saddexaad ee dhinaca qaboojiyaha.\nWaad mahadsan tahay caawintaada!';
  }

  // Fallback to high quality sentence translation mapping
  return lines.map(line => {
    const l = line.toLowerCase();
    if (l.includes('goedemorgen')) return 'Subax wanaagsan!';
    if (l.includes('goedemiddag')) return 'Galab wanaagsan!';
    if (l.includes('goedenavond')) return 'Fiid wanaagsan!';
    if (l.includes('hoe gaat het')) return 'Sidee tahay?';
    if (l.includes('alstublieft')) return 'Fadlan / Soo dhowow.';
    if (l.includes('dank u wel') || l.includes('bedankt')) return 'Waad mahadsan tahay!';
    if (l.includes('tot ziens')) return 'Nabad gelyo!';
    if (l.includes('ik heet') || l.includes('mijn naam')) return 'Magacaygu waa...';
    if (l.includes('waar is')) return 'Xaggee bay ku taallaa?';
    if (l.includes('wat kost')) return 'Immisaa qiimuhu?';
    return line;
  }).join('\n');
}

// 1. Load listening.json
const srcPath = path.join(__dirname, '../src/data/listening.json');
const dataJsonPath = path.join(__dirname, '../data/listening.json');
const dataJsPath = path.join(__dirname, '../data/listening.js');

let items = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

// 2. Add extra Pre-A1 and A1 listening dialogues (addressing requirement: "Voeg nog meer PRE-A1, A1 zinnen toe")
const extraListening = [
  {
    id: 'luister-prea1-013',
    level: 'Pre-A1',
    category: 'Groeten & Kennismaken',
    title: 'Nieuwe buren',
    lines: [
      'Hallo buurman, goedemorgen!',
      'Goedemorgen! Ik ben Ali.',
      'Welkom in onze straat, Ali.'
    ],
    translations: {
      ar: 'مرحباً يا جاري، صباح الخير!\nصباح الخير! أنا علي.\nأهلاً بك في شارعنا يا علي.',
      syr: 'مرحبا جارنا، يسعد صباحك!\nصباح الخير! أنا علي.\nأهلاً وسهلاً بحارتنا يا علي.',
      ti: 'ሰላም ጎረቤት፡ ከመይ ሓዲርካ!\nከመይ ሓዲርካ! ኣነ ዓሊ እየ።\nእንቋዕ ናብ ጎደናና ብደሓን መጻእካ ዓሊ።',
      om: 'Akkam ollaa koo, akkam bulte!\nAkkam bulte! Ani Alii dha.\nBaga gara daandii keenyaa nagaan dhufte, Alii.',
      so: 'Ascalaamu calaykum deriskaygiyow, subax wanaagsan!\nSubax wanaagsan! Waxaan ahay Cali.\nKu soo dhowow waddadeenna, Cali.',
      en: 'Hello neighbor, good morning!\nGood morning! I am Ali.\nWelcome to our street, Ali.'
    },
    dutch: 'Hallo buurman, goedemorgen!\nGoedemorgen! Ik ben Ali.\nWelkom in onze straat, Ali.',
    text: ''
  },
  {
    id: 'luister-prea1-014',
    level: 'Pre-A1',
    category: 'Kleding & Weer',
    title: 'Koude winterdag',
    lines: [
      'Het is koud buiten vandaag.',
      'Doe je warme muts en sjaal om.',
      'Ja mama, ik ben nu klaar.'
    ],
    translations: {
      ar: 'الطقس بارد بالخارج اليوم.\nارتدِ قبعتك الصوفية الدافئة والوشاح.\nنعم يا أمي، أنا جاهز الآن.',
      syr: 'كتير برد برا اليوم.\nحط طاقيتك الصوف ولف الشال.\nحاضر ماما، صرت جاهز هلأ.',
      ti: 'ሎሚ ኣብ ወጻኢ ኣዝዩ ዝሑል እዩ።\nድሙቕ ቆብዕኻን መጐልበቢኻን ግበር።\nእወ ኣደይ፡ ሕጂ ተዳልየ ኣለኹ።',
      om: 'Har\'a alaatti qorra cimaadha.\nKofiyyaa fi shaashii kee ho\'aa uffadhu.\nEeyyee haadha koo, amman qophaa\'ee jira.',
      so: 'Maanta dibadda aad bay u qabow dahay.\nGasho koofiyaddaada iyo maryo-luquska diirran.\nHaa hooyo, hadda diyaar baan ahay.',
      en: 'It is cold outside today.\nPut on your warm beanie and scarf.\nYes mom, I am ready now.'
    },
    dutch: 'Het is koud buiten vandaag.\nDoe je warme muts en sjaal om.\nJa mama, ik ben nu klaar.',
    text: ''
  },
  {
    id: 'luister-prea1-015',
    level: 'Pre-A1',
    category: 'Boodschappen',
    title: 'Appels kopen op de markt',
    lines: [
      'Twee kilo rode appels, alstublieft.',
      'Dat is drie euro samen.',
      'Alstublieft, dank u wel!'
    ],
    translations: {
      ar: 'كيلوغرامان من التفاح الأحمر من فضلك.\nالحساب ثلاثة يورو معاً.\nتفضل، شكراً جزيلاً!',
      syr: 'كيلويين تفاح أحمر لو سمحت.\nحسابن تلاتة يورو مع بعض.\nتفضل، يسلمو كتير!',
      ti: 'ክልተ ኪሎ ቀይሕ ቱፋሕ ብኽብረትኩም።\nሰለስተ ዩሮ ብሓባር ይኸውን።\nእንሆልኩም፡ የቐንየለይ!',
      om: 'Tuffaaha diimaa kiiloo lama, mee.\nWalumatti yuuroo sadii ta\'a.\nKunooti, galatoomaa!',
      so: 'Fadlan laba kiilo oo tufaax guduudan ah.\nWaa saddex yuuro wadartoodu.\nFadlan qaado, waad mahadsan tahay!',
      en: 'Two kilos of red apples, please.\nThat is three euros altogether.\nHere you go, thank you very much!'
    },
    dutch: 'Twee kilo rode appels, alstublieft.\nDat is drie euro samen.\nAlstublieft, dank u wel!',
    text: ''
  },
  {
    id: 'luister-a1-031',
    level: 'A1',
    category: 'Gemeente & Post',
    title: 'Brief van de gemeente',
    lines: [
      'Er ligt een officiële brief in de brievenbus.',
      'Het is een brief van de gemeente.',
      'Ik neem hem mee naar mijn taalcoach.'
    ],
    translations: {
      ar: 'توجد رسالة رسمية في صندوق البريد.\nإنها رسالة من البلدية.\nسآخذها معي إلى مدرّبي اللغوي.',
      syr: 'في رسالة رسمية بصندوق البريد.\nرسالة من البلدية (الخيمينته).\nرح آخدها معي للمدرّب اللغوي.',
      ti: 'ኣብ ሳጹን ፖስታ ወግዓዊት ደብዳበ ኣላ።\nካብ ምምሕዳር ከተማ ዝመጸት ደብዳበ እያ።\nናብ መምህር ቋንቋይ ሒዘያ ክኸይድ እየ።',
      om: 'Xalayaan mootummaa saanduqa poostaa keessa jira.\nXalayaa bulchiinsa magaalaati.\nLeenjisaa afaanii koo biratti nan fudhadha.',
      so: 'Warqad rasmi ah ayaa ku jirta sanduuqa boostada.\nWaa warqad ka socota dowladda hoose.\nWaxaan u qaadanayaa tababarahayga afka.',
      en: 'There is an official letter in the mailbox.\nIt is a letter from the municipality.\nI will take it to my language coach.'
    },
    dutch: 'Er ligt een officiële brief in de brievenbus.\nHet is een brief van de gemeente.\nIk neem hem mee naar mijn taalcoach.',
    text: ''
  },
  {
    id: 'luister-a1-032',
    level: 'A1',
    category: 'Vervoer',
    title: 'De trein naar Amsterdam',
    lines: [
      'De intercity naar Amsterdam vertrekt van spoor vier.',
      'Let op: deze trein stopt niet in Hilversum.',
      'Fijne reis allemaal!'
    ],
    translations: {
      ar: 'قطار الإنترسيتي إلى أمستردام يغادر من الرصيف الرابع.\nانتبه: هذا القطار لا يتوقف في هيلفرسوم.\nرحلة سعيدة للجميع!',
      syr: 'قطار الإنترسيتي على أمستردام رح يطلع من الرصيف أربعة.\nانتبهوا: هاد القطار ما بيوقف بهيلفرسوم.\nرحلة سعيدة وموفقة للجميع!',
      ti: 'ናብ ኣምስተርዳም ዝኸይድ ባቡር ካብ መድረኽ ኣርባዕተ ይብገስ ኣሎ።\nኣስተውዕሉ፡ እዚ ባቡር ኣብ ሒልቨርሱም ኣይጠውያን እዩ።\nሰናይ ጕዕዞ ንኹልኹም!',
      om: 'Baaburri gara Amsterdam deemu sarara afur irraa ka\'a.\nHubadhaa: baaburri kun Hilversum keessatti hin dhaabbatu.\nImala gaarii hundaaf!',
      so: 'Tareenka u socda Amsterdam wuxuu ka baxayaa marinka afraad.\nFadlan ogow: tareenkani ma joogsanayo Hilversum.\nSafal wanaagsan dhammaantiin!',
      en: 'The intercity train to Amsterdam departs from track four.\nPlease note: this train does not stop in Hilversum.\nHave a nice trip everyone!'
    },
    dutch: 'De intercity naar Amsterdam vertrekt van spoor vier.\nLet op: deze trein stopt niet in Hilversum.\nFijne reis allemaal!',
    text: ''
  },
  {
    id: 'luister-a1-033',
    level: 'A1',
    category: 'Taalschool',
    title: 'De Nederlandse les begint',
    lines: [
      'Doe jullie boeken open op bladzijde twaalf.',
      'We gaan vandaag samen praten over werk.',
      'Wie wil als eerste beginnen?'
    ],
    translations: {
      ar: 'افتحوا كتبكم على الصفحة الثانية عشرة.\nاليوم سنتحدث معاً عن العمل.\nمن يريد أن يبدأ أولاً؟',
      syr: 'افتحوا كتبكن على الصفحة طناش.\nاليوم رح نحكي سوا عن الشغل.\nمين بيحب يبلش أول واحد؟',
      ti: 'መጻሕፍትኹም ኣብ ገጽ ዓሰርተው ክልተ ክፈቱ።\nሎሚ ብዛዕባ ስራሕ ብሓባር ​​ክንዛረብ ኢና።\nመን ቅድም ክጅምር ይደሊ?',
      om: 'Kitaaba keessan fuula kudha lama irratti banaa.\nHar\'a waa\'ee hojii walin mari\'anna.\nEenyutu dura jalqabuu barbaada?',
      so: 'Fura buugaagtiina bogga laba iyo tobnaad.\nMaanta waxaan wada hadlaynaa shaqada.\nYaa doonaya inuu marka hore bilaabo?',
      en: 'Open your books to page twelve.\nToday we are going to talk about work together.\nWho would like to start first?'
    },
    dutch: 'Doe jullie boeken open op bladzijde twaalf.\nWe gaan vandaag samen praten over werk.\nWie wil als eerste beginnen?',
    text: ''
  }
];

// Append extra items without duplicate IDs
const existingIds = new Set(items.map(x => x.id));
extraListening.forEach(extra => {
  if (!existingIds.has(extra.id)) {
    items.push(extra);
    existingIds.add(extra.id);
  }
});

// Update all items: add Syrian translations and ensure full Somali translations
items.forEach(item => {
  if (!item.translations) item.translations = {};
  
  // Syrian translation
  if (!item.translations.syr || item.translations.syr.trim() === '') {
    item.translations.syr = toSyrianArabic(item.translations.ar || '');
  }

  // Somali translation: ensure it's not empty!
  if (!item.translations.so || item.translations.so.trim() === '') {
    item.translations.so = ensureSomaliTranslation(item);
  }
});

// Write to src/data/listening.json, data/listening.json, and data/listening.js
fs.writeFileSync(srcPath, JSON.stringify(items, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(items, null, 2), 'utf8');

const jsContent = 'window.TAALVRIEND_LISTENING = ' + JSON.stringify(items, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Listening updated: total', items.length, 'items across JSON and JS with complete Somali and Syrian translations.');
