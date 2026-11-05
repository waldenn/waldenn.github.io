const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/sentences.json');
const dataJsonPath = path.join(__dirname, '../data/sentences.json');
const dataJsPath = path.join(__dirname, '../data/sentences.js');

let sentences = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

const batch2 = [
  // Pre-A1
  {
    level: 'Pre-A1',
    topic: 'Kleding',
    dutch: 'Ik draag een warme jas.',
    translations: {
      ar: 'أنا أرتدي معطفاً دافئاً.',
      syr: 'لابس جاكيت دافي.',
      ti: 'ሙቑቕ ጃኬት ለቢሰ ኣለኹ።',
      om: 'Jaakkeettii ho\'aa uffadheera.',
      so: 'Waxaan xidhannahay jaakad diirran.',
      en: 'I wear a warm coat.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Kleding',
    dutch: 'Mijn schoenen zijn nieuw.',
    translations: {
      ar: 'حذائي جديد.',
      syr: 'صباطي جديد.',
      ti: 'ጫማይ ሓዲሽ እዩ።',
      om: 'Kopheen koo haaraadha.',
      so: 'Kabahaygu waa cusub yihiin.',
      en: 'My shoes are new.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Huis & Keuken',
    dutch: 'De lepel ligt op tafel.',
    translations: {
      ar: 'الملعقة على الطاولة.',
      syr: 'المعلقة ع الطاولة.',
      ti: 'ማንካ ኣብ ጠረጴዛ ኣላ።',
      om: 'Fal\'aanni minjaala irra jira.',
      so: 'Madiicadu waxay saaran tahay miiska.',
      en: 'The spoon is on the table.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Huis & Keuken',
    dutch: 'Ik kook soep in de pan.',
    translations: {
      ar: 'أنا أطبخ الحساء في القدر.',
      syr: 'عم بطبخ شوربة بالطنجرة.',
      ti: 'ኣብ ድስቲ ሾርባ የብስል ኣለኹ።',
      om: 'Distii keessatti shoorbaa affeelaan jira.',
      so: 'Maraq ayaan ku karinayaa digsiga.',
      en: 'I cook soup in the pot.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Eten & Drinken',
    dutch: 'Mag ik een glas thee met suiker?',
    translations: {
      ar: 'هل يمكنني الحصول على كأس شاي مع سكر؟',
      syr: 'ممكن كاسة شاي مع سكر لو سمحت؟',
      ti: 'ሻሂ ምስ ሽኮር ክረክብዶ ይኽእል፧',
      om: 'Shaayii sukkaara qabu argachuu danda\'aa mee?',
      so: 'Ma heli karaa koob shaah ah oo sonkor leh?',
      en: 'May I have a glass of tea with sugar?'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Boodschappen',
    dutch: 'Ik koop vers fruit op de markt.',
    translations: {
      ar: 'أشتري الفواكه الطازجة من السوق.',
      syr: 'بشتري فواكه طازة من السوق.',
      ti: 'ካብ ዕዳጋ ሓዲሽ ፍረታት እገዝእ።',
      om: 'Gabaa irraa kuduraa haaraa bitadha.',
      so: 'Waxaan suuqa ka soo iibsadaa miro daray ah.',
      en: 'I buy fresh fruit at the market.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Tijd & Cijfers',
    dutch: 'Het is vandaag maandag.',
    translations: {
      ar: 'اليوم هو الاثنين.',
      syr: 'اليوم التنين.',
      ti: 'ሎሚ ሰኑይ እዩ።',
      om: 'Har\'a wixata.',
      so: 'Maanta waa Isniin.',
      en: 'Today is Monday.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Tijd & Cijfers',
    dutch: 'Ik sta om zeven uur op.',
    translations: {
      ar: 'أستيقظ في الساعة السابعة.',
      syr: 'بفيق الساعة سبعة الصبح.',
      ti: 'ሰዓት ሸውዓተ ካብ ዓራት ይትንሥእ።',
      om: 'Sa\'aatii torba irratti ka\'a.',
      so: 'Waxaan toosaa saacadda toddobaad.',
      en: 'I get up at seven o\'clock.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Vervoer',
    dutch: 'De fiets staat bij de deur.',
    translations: {
      ar: 'الدراجة بجانب الباب.',
      syr: 'البسكليت واقف جنب الباب.',
      ti: 'ብስክሌት ኣብ ጥቓ ማዕጾ ኣላ።',
      om: 'Biskileetiin balbala dura jira.',
      so: 'Baaskiilku wuxuu yaallaa albaabka agtiisa.',
      en: 'The bicycle is by the door.'
    }
  },
  {
    level: 'Pre-A1',
    topic: 'Persoonlijk',
    dutch: 'Ik spreek een beetje Nederlands.',
    translations: {
      ar: 'أنا أتكلم القليل من الهولندية.',
      syr: 'بحكي شوي هولندي.',
      ti: 'ቁሩብ ቋንቋ ሆላንድ ይዛረብ እየ።',
      om: 'Afaan Daachii xiqqoo nan dubbadha.',
      so: 'Waxaan ku hadlaa wax yar oo af-Nederlandees ah.',
      en: 'I speak a little Dutch.'
    }
  },
  // A1: Practical communication
  {
    level: 'A1',
    topic: 'Wonen & Huur',
    dutch: 'Elke maand betaal ik de huur op tijd.',
    translations: {
      ar: 'أدفع الإيجار في وقته كل شهر.',
      syr: 'كل شهر بدفع الآجار بوقته المحدد.',
      ti: 'ኣብ ነፍሲ ወከፍ ወርሒ ክራይ ብግዜ ይኸፍል።',
      om: 'Ji\'a ji\'aan kiree manaa yeroon kaffala.',
      so: 'Bil kasta waxaan kirada ku bixiyaa waqtigeeda.',
      en: 'Every month I pay the rent on time.'
    }
  },
  {
    level: 'A1',
    topic: 'Wonen & Huur',
    dutch: 'De verwarming in de slaapkamer is koud.',
    translations: {
      ar: 'التدفئة في غرفة النوم باردة ولا تعمل.',
      syr: 'الشوفاج بغرفة النوم بارد وما عم يدفي.',
      ti: 'ኣብ መደቀሲ ክፍሊ ዘሎ መሞቒ ዝሑል እዩ።',
      om: 'Qilleensi ho\'isaa kutaalee ciisichaa qorraadha.',
      so: 'Kuleyliyaha qolka jiifka waa qabow.',
      en: 'The heating in the bedroom is cold.'
    }
  },
  {
    level: 'A1',
    topic: 'Gezondheid & Apotheek',
    dutch: 'Ik haal mijn oogdruppels bij de apotheek.',
    translations: {
      ar: 'أستلم قطرات العين من الصيدلية.',
      syr: 'رح جيب قطرة العين من الصيدلية.',
      ti: 'ናይ ዓይኒ ነጠብጣብ ካብ ፋርማሲ ይወስድ ኣለኹ።',
      om: 'Qoricha ijaa faarmaasii irraa nan fudhadha.',
      so: 'Dhibcaha indhaha waxaan ka soo qaataa farmashiyaha.',
      en: 'I pick up my eye drops at the pharmacy.'
    }
  },
  {
    level: 'A1',
    topic: 'Gezondheid & Apotheek',
    dutch: 'De huisarts heeft mij bloedonderzoek geadviseerd.',
    translations: {
      ar: 'نصحني طبيب الأسرة بإجراء فحص للدم.',
      syr: 'الدكتور نصحني أعمل فحص دم.',
      ti: 'ሓኪም ስድራቤት ናይ ደም መርመራ ክገብር መኺሩኒ።',
      om: 'Doktoriin qorannoo dhiigaa akka godhadhu natti hime.',
      so: 'Dhakhtarku wuxuu igu taliyay inaan dhiig iska baaro.',
      en: 'The family doctor advised me to have a blood test.'
    }
  },
  {
    level: 'A1',
    topic: 'Werk & Solliciteren',
    dutch: 'Ik heb morgen een sollicitatiegesprek.',
    translations: {
      ar: 'لدي غداً مقابلة عمل.',
      syr: 'بكرة عندي مقابلة شغل.',
      ti: 'ጽባሕ ናይ ስራሕ ቃለ መሕትት ኣሎኒ።',
      om: 'Bori gaaffii fi deebii hojii qaba.',
      so: 'Berrito waxaan leeyahay wareysi shaqo.',
      en: 'I have a job interview tomorrow.'
    }
  },
  {
    level: 'A1',
    topic: 'Werk & Solliciteren',
    dutch: 'Mijn collega helpt mij met het computersysteem.',
    translations: {
      ar: 'زميلي في العمل يساعدني في نظام الكمبيوتر.',
      syr: 'رفيقي بالشغل عم يساعدني بنظام الكمبيوتر.',
      ti: 'መሳርሕተይ ብዛዕባ ናይ ኮምፒተር ሲስተም ይሕግዘኒ ኣሎ።',
      om: 'Hiriyaan hojii koo sirna kompiitaraa na gargaara.',
      so: 'Saaxiibkayga shaqada ayaa iga caawinaya nidaamka kumbuyuutarka.',
      en: 'My colleague helps me with the computer system.'
    }
  },
  {
    level: 'A1',
    topic: 'Taalschool & Inburgering',
    dutch: 'Ik maak elke avond trouw mijn huiswerk.',
    translations: {
      ar: 'أقوم بعمل واجبي المنزلي بانتظام كل مساء.',
      syr: 'كل يوم المسا بكتب وظايفي بانتظام.',
      ti: 'ነፍሲ ወከፍ ምሸት ናይ ቤት ትምህርቲ ዕዮይ እሰርሕ።',
      om: 'Galgala hunda hojii manaa koo sirriin hojjedha.',
      so: 'Habeen kasta waxaan si fiican u sameeyaa casharrada guriga.',
      en: 'I faithfully do my homework every evening.'
    }
  },
  {
    level: 'A1',
    topic: 'Taalschool & Inburgering',
    dutch: 'Ik wil slagen voor het inburgeringsexamen.',
    translations: {
      ar: 'أريد النجاح في امتحان الاندماج الوطني.',
      syr: 'بدي أنجح بفحص الاندماج (الإنبوخرينغ).',
      ti: 'ፈተና ምውህሃድ ክሓልፍ እደሊ ኣለኹ።',
      om: 'Qormaata madaqsuu darbuun barbaada.',
      so: 'Waxaan rabaa inaan ku guuleysto imtixaanka is-dhexgalka.',
      en: 'I want to pass the civic integration exam.'
    }
  },
  {
    level: 'A1',
    topic: 'Vervoer & Reizen',
    dutch: 'Ik laad mijn OV-chipkaart op bij de automaat.',
    translations: {
      ar: 'أشحن بطاقة المواصلات من الماكينة الآلية.',
      syr: 'عم شحن كرت المواصلات (الأوفيه كارت) من الماكينة.',
      ti: 'ካርድ መጓዓዝያ ካብ ማሽን የሐድሶ ኣለኹ።',
      om: 'Kaardii imalaa maashina irraa maallaqa itti guuta.',
      so: 'Waxaan kaarka gaadiidka lacag kaga shubayaa mashiinka.',
      en: 'I top up my public transport card at the machine.'
    }
  },
  {
    level: 'A1',
    topic: 'Vervoer & Reizen',
    dutch: 'De buschauffeur is heel vriendelijk.',
    translations: {
      ar: 'سائق الحافلة لطيف وودود للغاية.',
      syr: 'شوفير الباص كتير لطيف ومحترم.',
      ti: 'ዘዋሪ ኣውቶቡስ ኣዝዩ ሕያዋይ እዩ።',
      om: 'Konkolaachisaan baasii baay\'ee nama jaallata.',
      so: 'Wadaha baska aad buu u naxariis badan yahay.',
      en: 'The bus driver is very friendly.'
    }
  }
];

batch2.forEach((item, idx) => {
  const id = `sent_${item.level.toLowerCase().replace(/[^a-z0-9]/g, '')}_b2_${Date.now()}_${idx}`;
  sentences.push({
    id,
    level: item.level,
    topic: item.topic,
    dutch: item.dutch,
    translations: item.translations
  });
});

fs.writeFileSync(srcPath, JSON.stringify(sentences, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(sentences, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_SENTENCES = ' + JSON.stringify(sentences, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Total sentences now:', sentences.length);
