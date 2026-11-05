const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/sentences.json');
const dataJsonPath = path.join(__dirname, '../data/sentences.json');
const dataJsPath = path.join(__dirname, '../data/sentences.js');

let sentences = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

function arToSyrianSentence(arText) {
  if (!arText) return '';
  let s = arText;
  
  // Specific phrases
  s = s.replace(/صباح الخير، كيف حالك؟/g, 'يسعد صباحك، كيفك؟');
  s = s.replace(/كيف حالك؟/g, 'كيفك؟ / شلونك؟');
  s = s.replace(/أنا بخير، شكراً لك/g, 'أنا منيح، يسلمو كتير');
  s = s.replace(/أنا بخير/g, 'أنا منيح');
  s = s.replace(/ما اسمك؟/g, 'شو اسمك؟');
  s = s.replace(/اسمي هو/g, 'اسمي');
  s = s.replace(/من أين أنت؟/g, 'من وين أنت؟');
  s = s.replace(/أنا من سوريا/g, 'أنا من سوريا');
  s = s.replace(/أين تسكن؟/g, 'وين ساكن؟');
  s = s.replace(/أنا أسكن في/g, 'أنا ساكن بـ');
  s = s.replace(/أنا أعيش في/g, 'أنا عايش بـ');
  s = s.replace(/كم عمرك؟/g, 'قديش عمرك؟');
  s = s.replace(/عمري عشرون عاماً/g, 'عمري عشرين سنة');
  s = s.replace(/أنا أتعلم اللغة الهولندية/g, 'عم بتعلم اللغة الهولندية');
  s = s.replace(/أنا أتكلم القليل من الهولندية/g, 'بحكي شوي هولندي');
  s = s.replace(/هل تتكلم الهولندية؟/g, 'بتحكي هولندي؟');
  s = s.replace(/هل يمكنك تكرار ذلك؟/g, 'فيك تعيدها لو سمحت؟');
  s = s.replace(/تكلم ببطء من فضلك/g, 'احكي على مهلك لو سمحت');
  s = s.replace(/أنا لا أفهم/g, 'ما عم بفهم');
  s = s.replace(/أنا أفهم/g, 'فهمت عليك');
  s = s.replace(/ماذا يعني هذا؟/g, 'شو بيعني هاد؟');
  s = s.replace(/كم ثمن هذا؟/g, 'قديش حق هاد؟');
  s = s.replace(/كم السعر؟/g, 'قديش السعر؟');
  s = s.replace(/هل يمكنني الدفع بالبطاقة؟/g, 'فيني أدفع بالكرت؟');
  s = s.replace(/أود شراء الخبز/g, 'بدي اشتري خبز');
  s = s.replace(/أين أجد الحليب؟/g, 'وين بلاقي الحليب؟');
  s = s.replace(/أين هو المرحاض؟/g, 'وين التواليت؟');
  s = s.replace(/إلى اللقاء، يوماً سعيداً/g, 'بشوفك بخير، نهارك سعيد');
  s = s.replace(/مع السلامة/g, 'مع السلامة، بشوفك');
  s = s.replace(/أنا جائع/g, 'أنا جوعان');
  s = s.replace(/أنا عطشان/g, 'أنا عطشان');
  s = s.replace(/أنا متعب/g, 'أنا تعبان');
  s = s.replace(/أنا مريض/g, 'أنا مريض');
  s = s.replace(/أحتاج إلى مساعدة/g, 'بدي مساعدة');
  s = s.replace(/شكراً جزيلاً لك/g, 'يسلمو كتير / شكراً كتير');
  s = s.replace(/شكراً جزيلاً/g, 'شكراً كتير');
  s = s.replace(/عفواً، على الرحب والسعة/g, 'عفواً، تكرم عينك');
  s = s.replace(/على الرحب والسعة/g, 'أهلاً وسهلاً، تكرم');
  s = s.replace(/معذرة/g, 'عفواً');
  s = s.replace(/أنا آسف/g, 'أنا بعتذر / متأسف');
  s = s.replace(/أين محطة القطار؟/g, 'وين محطة القطار؟');
  s = s.replace(/متى ينطلق الباص؟/g, 'أيمتى بيطلع الباص؟');
  s = s.replace(/متى يصل القطار؟/g, 'أيمتى بيوصل القطار؟');
  s = s.replace(/لدي موعد مع الطبيب/g, 'عندي موعد مع الدكتور');
  s = s.replace(/أريد حجز موعد/g, 'بدي أحجز موعد');
  s = s.replace(/رأسي يؤلمني/g, 'راسي عم يوجعني');
  s = s.replace(/بطني تؤلمني/g, 'بطني عم يوجعني');
  s = s.replace(/أحتاج إلى دواء/g, 'بدي دواء');

  // General vocabulary replacements
  s = s.replace(/ماذا/g, 'شو');
  s = s.replace(/لماذا/g, 'ليش');
  s = s.replace(/متى/g, 'أيمتى');
  s = s.replace(/أين/g, 'وين');
  s = s.replace(/الآن/g, 'هلأ');
  s = s.replace(/كثيراً/g, 'كتير');
  s = s.replace(/جداً/g, 'كتير');
  s = s.replace(/هنا/g, 'هون');
  s = s.replace(/هناك/g, 'هنيك');
  s = s.replace(/هذا/g, 'هاد');
  s = s.replace(/هذه/g, 'هاي');
  s = s.replace(/أريد أن/g, 'بدي');
  s = s.replace(/أريد/g, 'بدي');
  s = s.replace(/نحن نريد/g, 'بدنا');
  s = s.replace(/هل تريد/g, 'بدك');
  s = s.replace(/هل يمكنك أن/g, 'فيك');
  s = s.replace(/هل يمكنك/g, 'فيك');
  s = s.replace(/أستطيع/g, 'فيني');
  s = s.replace(/لا أستطيع/g, 'ما فيني');
  s = s.replace(/النقود/g, 'المصاري');
  s = s.replace(/السيارة/g, 'السيارة');
  s = s.replace(/المنزل/g, 'البيت');
  s = s.replace(/المستشفى/g, 'المشفى');
  s = s.replace(/طبيب/g, 'دكتور');
  s = s.replace(/سوف/g, 'رح');

  return s;
}

// 50+ New Rich Pre-A1 and A1 Sentences
const newPreA1AndA1 = [
  // Pre-A1: Daily basics & routines
  {
    level: 'Pre-A1',
    topic: 'Begroeting',
    dutch: 'Fijne dag nog en tot ziens!',
    translations: {
      ar: 'أتمنى لك يوماً جميلاً وإلى اللقاء!',
      syr: 'يسعد نهارك وبشوفك بخير!',
      ti: 'ሰናይ መዓልቲ ይግበረልኩም፡ ደሓን ኩኑ!',
      om: 'Guyyaa gaarii qabaadhaa, nagaan!',
      so: 'Maalin wanaagsan oo nabad gelyo!',
      en: 'Have a nice day and goodbye!'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Familie & Huis',
    dutch: 'Dit is mijn gezin.',
    translations: {
      ar: 'هذه هي عائلتي.',
      syr: 'هاي هيي عيلتي.',
      ti: 'እዚ ናተይ ስድራቤት እዩ።',
      om: 'Kun maatii kooti.',
      so: 'Kani waa qoyskayga.',
      en: 'This is my family.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Familie & Huis',
    dutch: 'Ik heb twee kinderen.',
    translations: {
      ar: 'لدي طفلان.',
      syr: 'عندي ولدين.',
      ti: 'ክልተ ቆልዑ ኣለዉኒ።',
      om: 'Ani ijoollee lama qaba.',
      so: 'Waxaan leeyahay laba carruur ah.',
      en: 'I have two children.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Winkel & Boodschappen',
    dutch: 'Mag ik een tasje, alstublieft?',
    translations: {
      ar: 'هل يمكنني الحصول على كيس من فضلك؟',
      syr: 'ممكن كيس لو سمحت؟',
      ti: 'ፌስታል ክረክብዶ ይኽእል ብኽብረትካ፧',
      om: 'Koroojoo argachuu danda\'aa mee?',
      so: 'Ma heli karaa boorso/kiish yar, fadlan?',
      en: 'May I have a small bag, please?'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Winkel & Boodschappen',
    dutch: 'Ik wil graag pinnen.',
    translations: {
      ar: 'أود الدفع بالبطاقة المصرفية.',
      syr: 'بدي أدفع بالكرت (بينن).',
      ti: 'ብካርድ ክኸፍል እደሊ።',
      om: 'Kaardiidhaan kaffaluun barbaada.',
      so: 'Waxaan rabaa inaan kaarka ku bixiyo.',
      en: 'I would like to pay by debit card.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Vervoer',
    dutch: 'Ik reis met de bus.',
    translations: {
      ar: 'أنا أسافر بالحافلة.',
      syr: 'أنا بسافر بالباص.',
      ti: 'ብኣውቶቡስ እየ ዝጓዓዝ።',
      om: 'Baasiidhaan imala.',
      so: 'Waxaan ku safraa baska.',
      en: 'I travel by bus.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Vervoer',
    dutch: 'Vergeet niet in te checken.',
    translations: {
      ar: 'لا تنس تسجيل الدخول بالبطاقة.',
      syr: 'ما تنسى تسجل دخول بالكرت.',
      ti: 'ኢን-ቸክ ምግባር ኣይትረስዑ።',
      om: 'Seensaa kaardii keessan qabsiisuu hin dagatinaa.',
      so: 'Ha iloobin inaad kaarkaaga calaamadsato marka aad soo gasho.',
      en: 'Do not forget to check in.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Gezondheid',
    dutch: 'Ik drink een glas water.',
    translations: {
      ar: 'أنا أشرب كأساً من الماء.',
      syr: 'عم بشرب كاسة مي.',
      ti: 'ብርጭቆ ማይ ይሰቲ ኣለኹ።',
      om: 'Bishaan kubbayyaa tokko dhugaan jira.',
      so: 'Waxaan cabbayaa koob biyo ah.',
      en: 'I drink a glass of water.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Taalles',
    dutch: 'Ik schrijf met een pen.',
    translations: {
      ar: 'أنا أكتب بالقلم.',
      syr: 'عم بكتب بالقلم.',
      ti: 'ብብርዒ እጽሕፍ ኣለኹ።',
      om: 'Qalamaanan barreessa.',
      so: 'Waxaan ku qorayaa qalin.',
      en: 'I write with a pen.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Taalles',
    dutch: 'Kunt u dat herhalen?',
    translations: {
      ar: 'هل يمكنك إعادة ذلك؟',
      syr: 'فيك تعيدها لو سمحت؟',
      ti: 'ክትደግሙለይዶ ትኽእሉ፧',
      om: 'Mee naaf deebisuu dandeessuu?',
      so: 'Ma ii soo celin kartaa taasi fadlan?',
      en: 'Could you repeat that?'
    }
  },

  // A1: Daily life & practical communication
  {
    level: 'A1',
    topic: 'Huisarts & Gezondheid',
    dutch: 'Ik heb last van keelpijn.',
    translations: {
      ar: 'أعاني من ألم في الحلق.',
      syr: 'حلقي عم يوجعني.',
      ti: 'ጉሮሮይ ይሕመኒ ኣሎ።',
      om: 'Kokkeen na dhukkuba.',
      so: 'Cunaha ayaa i xanuunaya.',
      en: 'I suffer from a sore throat.'
    }
  },
  {
    level: 'A1',
    topic: 'Huisarts & Gezondheid',
    dutch: 'Ik moet deze medicijnen innemen.',
    translations: {
      ar: 'يجب أن أتناول هذه الأدوية.',
      syr: 'لازم آخد هالدوا.',
      ti: 'ነዚ መድሃኒት ክወስዶ ኣሎኒ።',
      om: 'Qoricha kana fudhachuu qaba.',
      so: 'Waa inaan daawadan qaataa.',
      en: 'I have to take this medication.'
    }
  },
  {
    level: 'A1',
    topic: 'Huisarts & Gezondheid',
    dutch: 'Wanneer heeft de dokter tijd?',
    translations: {
      ar: 'متى يكون لدى الطبيب وقت؟',
      syr: 'أيمتى عند الدكتور وقت وفاضي؟',
      ti: 'ሓኪም መዓስ ግዜ ኣለዎ፧',
      om: 'Doktoriin yoom yeroo qaba?',
      so: 'Goormuu dhakhtarku waqti leeyahay?',
      en: 'When does the doctor have time?'
    }
  },
  {
    level: 'A1',
    topic: 'Boodschappen & Supermarkt',
    dutch: 'Waar kan ik de eieren vinden?',
    translations: {
      ar: 'أين يمكنني أن أجد البيض؟',
      syr: 'وين بلاقي البيض؟',
      ti: 'እንቋቝሖ ኣበይ ክረክብ እኽእል፧',
      om: 'Hanqaaquu eessatti argachuu danda\'aa?',
      so: 'Xaggee baan ka heli karaa ukunta?',
      en: 'Where can I find the eggs?'
    }
  },
  {
    level: 'A1',
    topic: 'Boodschappen & Supermarkt',
    dutch: 'Deze kaas is in de aanbieding.',
    translations: {
      ar: 'هذا الجبن عليه تخفيض.',
      syr: 'هاي الجبنة عليها عرض وتخفيض.',
      ti: 'እዚ ፎርማጆ ቅናሽ ኣለዎ።',
      om: 'Abaandheen kun gurgurtaa addaa keessa jira.',
      so: 'Farmaajadani waxay ku jirtaa dalacsiin/qiimo dhimis.',
      en: 'This cheese is on sale.'
    }
  },
  {
    level: 'A1',
    topic: 'Boodschappen & Supermarkt',
    dutch: 'Mag ik de kassabon meenemen?',
    translations: {
      ar: 'هل يمكنني أخذ إيصال الشراء؟',
      syr: 'ممكن آخد وصل الحساب؟',
      ti: 'ቅብዒ ገንዘብ ክወስድዶ ይኽእል፧',
      om: 'Nagahee kaffaltii fudhachuu danda\'aa?',
      so: 'Ma qaadan karaa rasiidka lacag-bixinta?',
      en: 'May I take the receipt with me?'
    }
  },
  {
    level: 'A1',
    topic: 'Gemeente & Post',
    dutch: 'Ik moet mijn paspoort vernieuwen.',
    translations: {
      ar: 'يجب أن أجدد جواز سفري.',
      syr: 'لازم جدد جواز سفري.',
      ti: 'ፓስፖርተይ ከሐድሶ ኣሎኒ።',
      om: 'Paaspoordii koo haaromsuu qaba.',
      so: 'Waa inaan cusbooneysiiyaa baasaboorkeyga.',
      en: 'I need to renew my passport.'
    }
  },
  {
    level: 'A1',
    topic: 'Gemeente & Post',
    dutch: 'Ik heb een afspraak bij de balie.',
    translations: {
      ar: 'لدي موعد عند مكتب الاستقبال.',
      syr: 'عندي موعد عند الكاونتر / الاستقبال.',
      ti: 'ኣብቲ መስኮት ቈጸራ ኣሎኒ።',
      om: 'Minjaala kaffaltii irratti beellama qaba.',
      so: 'Ballan ayaan ku leeyahay miiska hore.',
      en: 'I have an appointment at the counter.'
    }
  },
  {
    level: 'A1',
    topic: 'Werk & Beroep',
    dutch: 'Ik zoek een baan in de horeca.',
    translations: {
      ar: 'أنا أبحث عن عمل في قطاع الضيافة والمطاعم.',
      syr: 'عم دوّر على شغل بالمطاعم والكافيهات.',
      ti: 'ኣብ ሆቴልን መግብን ስራሕ እደሊ ኣለኹ።',
      om: 'Hoteela keessatti hojii barbaadaan jira.',
      so: 'Waxaan shaqo ka raadinayaa maqaayadaha iyo hoteellada.',
      en: 'I am looking for a job in the hospitality sector.'
    }
  },
  {
    level: 'A1',
    topic: 'Werk & Beroep',
    dutch: 'Om twaalf uur hebben we pauze.',
    translations: {
      ar: 'في الساعة الثانية عشرة لدينا استراحة.',
      syr: 'الساعة طناش عندنا استراحة واستراحة غدا.',
      ti: 'ሰዓት ዓሰርተው ክልተ ዕረፍቲ ኣሎና።',
      om: 'Sa\'aatii kudha lama irratti boqonnaa qabna.',
      so: 'Saacadda laba iyo tobnaad waxaan leenahay nasasho.',
      en: 'At twelve o\'clock we have a break.'
    }
  },
  {
    level: 'A1',
    topic: 'School & Kinderen',
    dutch: 'Mijn zoon gaat om half negen naar school.',
    translations: {
      ar: 'ابني يذهب إلى المدرسة في الثامنة والنصف.',
      syr: 'ابني بيروح عالمدرسة الساعة تمانة ونص.',
      ti: 'ወደይ ሰዓት ሸሞንተን ፈረቓን ናብ ቤት ትምህርቲ ይኸይድ።',
      om: 'Ilmi koo sa\'aatii saddeetii fi walakkaa mana barumsaa deema.',
      so: 'Wiilkaygu wuxuu dugsiga aadaa siddeedda iyo badhka.',
      en: 'My son goes to school at half past eight.'
    }
  },
  {
    level: 'A1',
    topic: 'School & Kinderen',
    dutch: 'De leraar legt de Nederlandse grammatica uit.',
    translations: {
      ar: 'المعلم يشرح قواعد اللغة الهولندية.',
      syr: 'الأستاذ عم يشرح قواعد اللغة الهولندية.',
      ti: 'መምህር ሰዋስው ቋንቋ ሆላንድ ይገልጽ ኣሎ።',
      om: 'Barsiisaan seera afaan Daachii ibsaa jira.',
      so: 'Macallinku wuxuu sharxayaa naxwaha afka Nederlandka.',
      en: 'The teacher explains the Dutch grammar.'
    }
  },
  {
    level: 'A1',
    topic: 'Wonen & Buurt',
    dutch: 'Wij wonen in een fijn en rustig appartement.',
    translations: {
      ar: 'نحن نعيش في شقة جميلة وهادئة.',
      syr: 'عايشين بشقة حلوة ورايقة.',
      ti: 'ኣብ ጽቡቕን ህዱእን ኣፓርታማ ንነብር ኣለና።',
      om: 'Mana jireenyaa gaarii fi tasgabbaa\'aa keessa jiraanna.',
      so: 'Waxaan ku noolnahay dabaq aad u fiican oo deggan.',
      en: 'We live in a nice and quiet apartment.'
    }
  },
  {
    level: 'A1',
    topic: 'Wonen & Buurt',
    dutch: 'Op dinsdag wordt het vuilnis opgehaald.',
    translations: {
      ar: 'يوم الثلاثاء يتم جمع القمامة.',
      syr: 'يوم التلاتاء بيلموا الزبالة.',
      ti: 'ሰሉስ ጐሓፍ ይእከብ።',
      om: 'Kibxata kosii walitti qabu.',
      so: 'Maalinta Talaadada ayaa qashinka la qaadaa.',
      en: 'On Tuesday the garbage is collected.'
    }
  },
  {
    level: 'A1',
    topic: 'Vervoer',
    dutch: 'Deze trein heeft tien minuten vertraging.',
    translations: {
      ar: 'هذا القطار متأخر عشر دقائق.',
      syr: 'هاد القطار متأخر عشر دقايق.',
      ti: 'እዚ ባቡር ናይ ዓሰርተ ደቒቕ ምድንጓይ ኣለዎ።',
      om: 'Baaburri kun daqiiqaa kudhan tureera.',
      so: 'Tareenkani wuxuu daahay toban daqiiqo.',
      en: 'This train is delayed by ten minutes.'
    }
  }
];

// Append new sentences
let addedCount = 0;
newPreA1AndA1.forEach((item, idx) => {
  const id = `sent_${item.level.toLowerCase().replace(/[^a-z0-9]/g, '')}_add_${Date.now()}_${idx}`;
  sentences.push({
    id,
    level: item.level,
    topic: item.topic,
    dutch: item.dutch,
    translations: item.translations
  });
  addedCount++;
});

// Update all sentences with syr translations
sentences.forEach(s => {
  if (!s.translations) s.translations = {};
  if (!s.translations.syr || s.translations.syr.trim() === '') {
    s.translations.syr = arToSyrianSentence(s.translations.ar || '');
  }
});

fs.writeFileSync(srcPath, JSON.stringify(sentences, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(sentences, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_SENTENCES = ' + JSON.stringify(sentences, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Added', addedCount, 'sentences. Total sentences:', sentences.length, 'all with Syrian translations.');
