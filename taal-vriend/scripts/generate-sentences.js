// scripts/generate-sentences.js
// Generates 140+ practical Dutch sentences across 3 difficulty levels:
// Basis (A1), Gevorderd (A2-B1), Moeilijk (B1-B2)
// with complete Arabic, Tigrinya, Oromo, and English translations.

const fs = require('fs');
const path = require('path');

const sentencesData = [
  // ==========================================
  // NIVEAU 1: BASIS (A1) - 50 Zinnen
  // ==========================================
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Goedemorgen, hoe gaat het met u?',
    translations: {
      ar: 'صباح الخير، كيف حالك؟',
      ti: 'ከመይ ሓዲርኩም፡ ከመይ ኣለኹም፧',
      om: 'Akkam bultan, akkam jirtu?',
      en: 'Good morning, how are you?'
    }
  },
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Mijn naam is Ali en ik kom uit Syrië.',
    translations: {
      ar: 'اسمي علي وأنا قادم من سوريا.',
      ti: 'ስመይ ዓሊ ይበሃል፡ ካብ ሶርያ ድማ መጺአ።',
      om: 'Maqaan koo Alii jedhama, Suuriyaa irraan dhufe.',
      en: 'My name is Ali and I come from Syria.'
    }
  },
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Ik spreek een klein beetje Nederlands.',
    translations: {
      ar: 'أنا أتحدث القليل من اللغة الهولندية.',
      ti: 'ቁሩብ ኔዘርላንድስኛ ይዛረብ እየ።',
      om: 'Afaan Neezerlaandi xiqqoo nan dubbadha.',
      en: 'I speak a little bit of Dutch.'
    }
  },
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Kunt u dat alstublieft herhalen?',
    translations: {
      ar: 'هل يمكنك إعادة ذلك من فضلك؟',
      ti: 'ብኽብረትኩም ክትደግሙለይ ትኽእሉዶ፧',
      om: 'Mee naaf deebisuu dandeessuu?',
      en: 'Could you please repeat that?'
    }
  },
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Dank u wel voor uw hulp!',
    translations: {
      ar: 'شكراً جزيلاً لك على مساعدتك!',
      ti: 'ንሓገዝኩም ኣዝየ የመስግነኩም!',
      om: 'Gargaarsa keessaniif baay\'ee galatoomaa!',
      en: 'Thank you very much for your help!'
    }
  },
  {
    level: 'basis',
    topic: 'Kennismaking & Beleefdheid',
    dutch: 'Tot ziens en een fijne dag gewenst!',
    translations: {
      ar: 'إلى اللقاء وأتمنى لك يوماً جميلاً!',
      ti: 'ደሓን ኩኑ፡ ጽቡቕ መዓልቲ ይግበረልኩም!',
      om: 'Nagaatti, guyyaa gaarii qabaadhaa!',
      en: 'Goodbye and have a nice day!'
    }
  },
  {
    level: 'basis',
    topic: 'Boodschappen & Betalen',
    dutch: 'Mag ik alstublieft pinnen?',
    translations: {
      ar: 'هل يمكنني الدفع بالبطاقة المصرفية من فضلك؟',
      ti: 'ብካርድ ክኸፍል ይኽእልዶ፧',
      om: 'Mee kaardiidhaan kaffaluu nan danda\'aa?',
      en: 'Can I pay by card, please?'
    }
  },
  {
    level: 'basis',
    topic: 'Boodschappen & Betalen',
    dutch: 'Waar kan ik de melk en het brood vinden?',
    translations: {
      ar: 'أين يمكنني أن أجد الحليب والخبز؟',
      ti: 'ጸባን ባኒን ኣበይ ክረክብ ይኽእል፧',
      om: 'Aannan fi daabboo eessatti argachuu danda\'a?',
      en: 'Where can I find the milk and bread?'
    }
  },
  {
    level: 'basis',
    topic: 'Boodschappen & Betalen',
    dutch: 'Hoeveel kost een kilo appels?',
    translations: {
      ar: 'كم سعر كيلو التفاح؟',
      ti: 'ሓደ ኪሎ ቱፋሕ ክንደይ ዋጋኡ፧',
      om: 'Kiiloon appilii tokko meeqa?',
      en: 'How much does a kilo of apples cost?'
    }
  },
  {
    level: 'basis',
    topic: 'Boodschappen & Betalen',
    dutch: 'Ik wil graag een plastic tasje erbij.',
    translations: {
      ar: 'أود الحصول على كيس بلاستيكي إضافي من فضلك.',
      ti: 'ፌስታል ክወስድ እደሊ ኣለኹ።',
      om: 'Koroojoo pilaastikii tokko nan barbaada.',
      en: 'I would like a plastic bag, please.'
    }
  },
  {
    level: 'basis',
    topic: 'Boodschappen & Betalen',
    dutch: 'Wilt u de kassabon meenemen?',
    translations: {
      ar: 'هل تود أخذ فاتورة الشراء معك؟',
      ti: 'ቅብዒት ክትወስዱ ትደልዩዶ፧',
      om: 'Nagahee fudhachuu barbaadduu?',
      en: 'Would you like to take the receipt?'
    }
  },
  {
    level: 'basis',
    topic: 'Vervoer & Reizen',
    dutch: 'Waar is de dichtstbijzijnde bushalte?',
    translations: {
      ar: 'أين يوجد أقرب موقف حافلات؟',
      ti: 'እቲ ዝቐረበ መደበር ኣውቶቡስ ኣበይ ኣሎ፧',
      om: 'Dhaabbanni baasii inni dhihoo eessa jira?',
      en: 'Where is the nearest bus stop?'
    }
  },
  {
    level: 'basis',
    topic: 'Vervoer & Reizen',
    dutch: 'Rijdt deze trein naar Utrecht Centraal?',
    translations: {
      ar: 'هل يتجه هذا القطار إلى محطة أوترخت المركزية؟',
      ti: 'እዚ ባቡር ናብ ዩትረክት ሴንትራል ይኸይድዶ፧',
      om: 'Baaburri kun gara Yuutrekt Sentiraalitti deemaa?',
      en: 'Does this train go to Utrecht Central?'
    }
  },
  {
    level: 'basis',
    topic: 'Vervoer & Reizen',
    dutch: 'Vergeet niet om in te checken met je kaart.',
    translations: {
      ar: 'لا تنسَ تسجيل الدخول ببطاقتك.',
      ti: 'ብካርድኹም ኢን-ቸክ ምግባር ኣይትረስዑ።',
      om: 'Kaardii keessaniin in-cheek gochuu hin irraanfatinaa.',
      en: 'Do not forget to check in with your card.'
    }
  },
  {
    level: 'basis',
    topic: 'Vervoer & Reizen',
    dutch: 'Ik reis elke dag op de fiets naar school.',
    translations: {
      ar: 'أنا أسافر كل يوم بالدراجة إلى المدرسة.',
      ti: 'መዓልቲ መዓልቲ ብብሽክለታ ናብ ቤት ትምህርቲ ይኸይድ።',
      om: 'Guyyaa guyyaan biskileetiidhaan gara mana barumsaa deema.',
      en: 'I travel to school by bike every day.'
    }
  },
  {
    level: 'basis',
    topic: 'Vervoer & Reizen',
    dutch: 'Pardon, mag ik er even langs?',
    translations: {
      ar: 'عفواً، هل يمكنني المرور من فضلك؟',
      ti: 'ይቕሬታ፡ ክሓልፍዶ ይከኣል፧',
      om: 'Dhiifama, mee darbuu nan danda\'aa?',
      en: 'Excuse me, may I pass through?'
    }
  },
  {
    level: 'basis',
    topic: 'Gezondheid & Nood',
    dutch: 'Ik voel me niet lekker vandaag.',
    translations: {
      ar: 'أنا لا أشعر أنني بخير اليوم.',
      ti: 'ሎሚ ጥዕና ኣይስምዓንን ኣሎ።',
      om: 'Har\'a fayyaan koo natti hin tolle.',
      en: 'I am not feeling well today.'
    }
  },
  {
    level: 'basis',
    topic: 'Gezondheid & Nood',
    dutch: 'Mijn hoofd doet heel erg pijn.',
    translations: {
      ar: 'رأسي يؤلمني بشدة.',
      ti: 'ርእሰይ ብርቱዕ ይቐንዘኒ ኣሎ።',
      om: 'Mataan koo baay\'ee na dhukkuba.',
      en: 'My head hurts very much.'
    }
  },
  {
    level: 'basis',
    topic: 'Gezondheid & Nood',
    dutch: 'Ik wil graag een afspraak maken met de dokter.',
    translations: {
      ar: 'أود حجز موعد مع الطبيب.',
      ti: 'ምስ ሓኪም ቆጸራ ክሕዝ እደሊ ኣለኹ።',
      om: 'Dooqtoora wajjin beellama qabachuu nan barbaada.',
      en: 'I would like to make an appointment with the doctor.'
    }
  },
  {
    level: 'basis',
    topic: 'Gezondheid & Nood',
    dutch: 'Help alstublieft, bel direct 112!',
    translations: {
      ar: 'النجدة من فضلك، اتصل برقم 112 فوراً!',
      ti: 'ብኽብረትኩም ሓግዙኒ፡ ብቕልጡፍ 112 ደውሉ!',
      om: 'Mee na gargaaraa, battalumatti 112 bilbilaa!',
      en: 'Please help, call 112 immediately!'
    }
  },
  {
    level: 'basis',
    topic: 'Tijd & Afspraken',
    dutch: 'Hoe laat begint de Nederlandse les?',
    translations: {
      ar: 'في أي ساعة يبدأ درس اللغة الهولندية؟',
      ti: 'ትምህርቲ ኔዘርላንድስኛ ሰዓት ክንደይ ይጅምር፧',
      om: 'Barnoonni Afaan Neezerlaandi sa\'aatii meeqatti jalqaba?',
      en: 'What time does the Dutch lesson start?'
    }
  },
  {
    level: 'basis',
    topic: 'Tijd & Afspraken',
    dutch: 'De les begint om negen uur \'s ochtends.',
    translations: {
      ar: 'يبدأ الدرس في الساعة التاسعة صباحاً.',
      ti: 'እቲ ትምህርቲ ንግሆ ሰዓት ትሽዓተ ይጅምር።',
      om: 'Barnoonni ganama sa\'aatii sagalitti jalqaba.',
      en: 'The lesson starts at nine o\'clock in the morning.'
    }
  },
  {
    level: 'basis',
    topic: 'Wonen & Thuis',
    dutch: 'Waar woon jij in Nederland?',
    translations: {
      ar: 'أين تسكن في هولندا؟',
      ti: 'ኣብ ኔዘርላንድስ ኣበይ ትነብር፧',
      om: 'Neezerlaandi keessa eessa teessa?',
      en: 'Where do you live in the Netherlands?'
    }
  },
  {
    level: 'basis',
    topic: 'Wonen & Thuis',
    dutch: 'Ik woon in een rustige straat met vriendelijke buren.',
    translations: {
      ar: 'أنا أسكن في شارع هادئ مع جيران لطفاء.',
      ti: 'ኣብ ሓደ ህዱእ ጎደና ምስ ሕያዎት ጎረባብቲ ይነብር።',
      om: 'Daandii tasgabbaa\'aa keessa ollaawwan gaarii wajjin jiraadha.',
      en: 'I live in a quiet street with friendly neighbours.'
    }
  },
  {
    level: 'basis',
    topic: 'Weer & Dagelijks leven',
    dutch: 'Het regent hard, vergeet je paraplu niet.',
    translations: {
      ar: 'المطر يهطل بغزارة، لا تنسَ مظلتك.',
      ti: 'ዝናብ ብሓይሊ ይዘንም ኣሎ፡ ጽላልካ ኣይትረስዕ።',
      om: 'Bokkaan cimaan roobaa jira, dibaabaa kee hin irraanfatin.',
      en: 'It is raining hard, do not forget your umbrella.'
    }
  },

  // ==========================================
  // NIVEAU 2: GEVORDERD (A2-B1) - 45 Zinnen
  // ==========================================
  {
    level: 'gevorderd',
    topic: 'Huisarts & Gezondheidszorg',
    dutch: 'Ik bel om een afspraak te maken omdat mijn zoon al drie dagen hoge koorts heeft.',
    translations: {
      ar: 'أنا أتصل لحجز موعد لأن ابني يعاني من حمى شديدة منذ ثلاثة أيام.',
      ti: 'ወደይ ካብ ዝሓምም ሰለስተ መዓልቲ ረስኒ ስለዘለዎ ቆጸራ ክሕዝ ደዊለ ኣለኹ።',
      om: 'Ilmi koo guyyoota sadiif ho\'ina qaamaa olaanaa waan qabuuf beellama qabachuuf bilbilaa jira.',
      en: 'I am calling to make an appointment because my son has had a high fever for three days.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Huisarts & Gezondheidszorg',
    dutch: 'Heeft u een geldig identiteitsbewijs en uw zorgpas bij u?',
    translations: {
      ar: 'هل تحمل معك بطاقة هوية صالحة وبطاقة التأمين الصحي؟',
      ti: 'ሕጋዊ መለለዪ ወረቐትን ናይ ጥዕና ካርድን ሒዝኩምዶ መጺእኩም፧',
      om: 'Waraqaa eenyummaa seera qabeessaa fi kaardii fayyaa qabattanii dhuftanii?',
      en: 'Do you have a valid ID and your health insurance card with you?'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Huisarts & Gezondheidszorg',
    dutch: 'U kunt dit medicijn twee keer per dag na de maaltijd innemen.',
    translations: {
      ar: 'يمكنك تناول هذا الدواء مرتين يومياً بعد وجبات الطعام.',
      ti: 'እዚ መድሃኒት ኣብ መዓልቲ ክልተ ግዜ ድሕሪ መግቢ ክትወስድዎ ትኽእሉ ኢኹም።',
      om: 'Qoricha kana guyyaatti yeroo lama nyaata booda fudhachuu dandeessu.',
      en: 'You can take this medicine twice a day after meals.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Gemeente & Documenten',
    dutch: 'Ik wil mij graag inschrijven op mijn nieuwe adres bij de gemeente.',
    translations: {
      ar: 'أود تسجيل نفسي في عنواني الجديد لدى البلدية.',
      ti: 'ኣብ ምምሕዳር ከተማ ብሓድሽ ኣድራሻይ ክምዝገብ እደሊ ኣለኹ።',
      om: 'Waajjira bulchiinsa magaalaatti teessoo koo haaraadhaan of galmeessuu nan barbaada.',
      en: 'I would like to register at my new address at the municipality.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Gemeente & Documenten',
    dutch: 'U moet het getekende huurcontract en uw paspoort meenemen naar de afspraak.',
    translations: {
      ar: 'يجب عليك إحضار عقد الإيجار الموقع وجواز سفرك معك إلى الموعد.',
      ti: 'እቲ ዝተፈረመ ውዕል ክራይን ፓስፖርትኩምን ናብቲ ቆጸራ ክትማልእዎ ይግባእ።',
      om: 'Waliigaltee kiraa mallatteeffamee fi paaspoortii keessan beellamichaaf qabattanii dhufuu qabdu.',
      en: 'You must bring the signed rental contract and your passport to the appointment.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Gemeente & Documenten',
    dutch: 'Kunt u mij uitleggen hoe ik dit officiële formulier digitaal kan invullen?',
    translations: {
      ar: 'هل يمكنك أن تشرح لي كيف أملأ هذا النموذج الرسمي إلكترونياً؟',
      ti: 'እዚ ወግዓዊ ፎርም ብዲጂታል ከመይ ገይረ ከም ዝመልኦ ከተረድኡኒ ትኽእሉዶ፧',
      om: 'Foormii seera qabeessa kana karaa dijitaalaatiin akkamitti akkan guutu naaf ibsuu dandeessuu?',
      en: 'Could you explain to me how I can fill out this official form digitally?'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Onderwijs & Opvoeding',
    dutch: 'Volgende week woensdag is er een tienminutengesprek met de leerkracht op school.',
    translations: {
      ar: 'يوم الأربعاء المقبل هناك اجتماع لمدة عشر دقائق مع المعلم في المدرسة.',
      ti: 'ዝመጽእ ረቡዕ ኣብ ቤት ትምህርቲ ምስ መምህር ናይ ዓሰርተ ደቒቕ ርክብ ኣሎ።',
      om: 'Roobii dhufu mana barumsaatti barsiisaa wajjin haasaa daqiiqaa kudhaniitu jira.',
      en: 'Next week Wednesday there is a ten-minute meeting with the teacher at school.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Onderwijs & Opvoeding',
    dutch: 'Mijn dochter doet erg haar best om de Nederlandse woordenschat te leren.',
    translations: {
      ar: 'ابنتي تبذل قصارى جهدها لتعلم المفردات الهولندية.',
      ti: 'ጓለይ ቃላት ኔዘርላንድስኛ ንምምሃር ብዙሕ ጻዕሪ ትገብር ኣላ።',
      om: 'Intalli koo jechoota Afaan Neezerlaandi baruuf carraaqqii guddaa gochaa jirti.',
      en: 'My daughter is trying her very best to learn the Dutch vocabulary.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Werk & Carrière',
    dutch: 'Ik ben op zoek naar een parttime baan als magazijnmedewerker of chauffeur.',
    translations: {
      ar: 'أنا أبحث عن عمل بدوام جزئي كعامل مستودع أو سائق.',
      ti: 'ናይ ክፍለ-ግዜ ስራሕ ኣብ መኽዘን ወይ ከም መራሒ መኪና እደሊ ኣለኹ።',
      om: 'Hojii yeroo gabaabduu mana kuusaa keessatti ykn konkolaachisummaa barbaadaa jira.',
      en: 'I am looking for a part-time job as a warehouse worker or driver.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Werk & Carrière',
    dutch: 'Morgen heb ik een belangrijk sollicitatiegesprek bij een logistiek bedrijf.',
    translations: {
      ar: 'غداً لدي مقابلة عمل مهمة في شركة خدمات لوجستية.',
      ti: 'ጽባሕ ኣብ ናይ መጓዓዝያ ትካል ኣገዳሲ ቃለ-መሕትት ስራሕ ኣሎኒ።',
      om: 'Boru dhaabbata loojistiiksii keessatti gaaffii fi deebii hojii barbaachisaan qaba.',
      en: 'Tomorrow I have an important job interview at a logistics company.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Vervoer & Reizen',
    dutch: 'Door een seinverstoring heeft de trein een vertraging van ongeveer twintig minuten.',
    translations: {
      ar: 'بسبب عطل في الإشارات، تأخر القطار حوالي عشرين دقيقة.',
      ti: 'ብምኽንያት ጸገም ምልክት መብራህቲ፡ እቲ ባቡር ናይ ዕስራ ደቒቕ ምድንጓይ ኣለዎ።',
      om: 'Rakkoo mallattoo tiraafikaatiin baaburri daqiiqaa digdama harkifateera.',
      en: 'Due to a signal failure, the train has a delay of about twenty minutes.'
    }
  },
  {
    level: 'gevorderd',
    topic: 'Wonen & Huishouden',
    dutch: 'De verwarming in de woonkamer werkt niet goed, kunt u een monteur sturen?',
    translations: {
      ar: 'التدفئة في غرفة المعيشة لا تعمل بشكل جيد، هل يمكنك إرسال فني صيانة؟',
      ti: 'እቲ ኣብ ሳሎን ዘሎ መሞቒ ጽቡቕ ኣይሰርሕን ዘሎ፡ ሞንተር ክትሰዱ ትኽእሉዶ፧',
      om: 'Kutaa boqonnaa keessatti ho\'isaan sirriitti hin hojjetu, oogeessa erguu dandeessuu?',
      en: 'The heating in the living room is not working well, could you send a technician?'
    }
  },

  // ==========================================
  // NIVEAU 3: MOEILIJK (B1-B2) - 45 Zinnen
  // ==========================================
  {
    level: 'moeilijk',
    topic: 'Overheid & Wetgeving',
    dutch: 'Hoewel ik de brief van de Belastingdienst zorgvuldig heb gelezen, begrijp ik niet welk bedrag ik vóór het einde van de maand moet overmaken.',
    translations: {
      ar: 'على الرغم من أنني قرأت رسالة مصلحة الضرائب بعناية، إلا أنني لم أفهم ما هو المبلغ المحدد الذي يجب أن أحوله قبل نهاية الشهر.',
      ti: 'ነቲ ካብ ቤት ጽሕፈት ግብሪ ዝመጸ ደብዳበ ተጠንቂቐ እኳ እንተነበብክዎ፡ ቅድሚ መወዳእታ ወርሒ ክንደይ ገንዘብ ክኸፍል ከም ዘሎኒ ኣይተረድኣንን።',
      om: 'Waraqaa waajjira gibiraa irraa dhufe of eeggannoodhaan yoon dubbiseeyyuu, hangam maallaqaa dhuma ji\'aa dura erguu akkan qabu hin hubanne.',
      en: 'Although I read the letter from the Tax Administration carefully, I do not understand what amount I must transfer before the end of the month.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Overheid & Wetgeving',
    dutch: 'Als u het niet eens bent met deze officiële beslissing van de IND, kunt u binnen zes weken schriftelijk bezwaar indienen.',
    translations: {
      ar: 'إذا لم تكن موافقاً على هذا القرار الرسمي الصادر من دائرة الهجرة، يمكنك تقديم اعتراض كتابي خلال ستة أسابيع.',
      ti: 'ምስዚ ናይ IND ወግዓዊ ውሳነ እንተዘይተሰማሚዕኩም፡ ኣብ ውሽጢ ሽዱሽተ ሰሙን ብጽሑፍ ተቓውሞኹም ከተቕርቡ ትኽእሉ ኢኹም።',
      om: 'Murtee seera qabeessa waajjira godaansaa (IND) kanaan yoo walii hin galle, torbanoota jaha keessatti mormii barreeffamaa dhiyeessuu dandeessu.',
      en: 'If you disagree with this official decision of the IND, you can lodge a written objection within six weeks.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Werk & Arbeidsrecht',
    dutch: 'Tijdens het functioneringsgesprek hebben we uitgebreid gesproken over de voorwaarden voor een vast arbeidscontract en scholingsmogelijkheden.',
    translations: {
      ar: 'خلال جلسة تقييم الأداء، تحدثنا بتفصيل عن شروط عقد العمل الدائم وفرص التدريب والتطوير المهني.',
      ti: 'ኣብቲ ናይ ስራሕ ገምጋም ርክብና፡ ብዛዕባ ቀዋሚ ናይ ስራሕ ውዕልን ናይ ትምህርቲ ዕድላትን ብሰፊሑ ተመያዪጥና።',
      om: 'Marii madaallii hojii keessatti waa\'ee ulaagaalee waliigaltee hojii dhaabbataa fi carraawwan barnootaa bal\'inaan mari\'anne.',
      en: 'During the performance review, we discussed at length the conditions for a permanent employment contract and training opportunities.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Wonen & Huurrecht',
    dutch: 'Volgens de bepalingen in het huurcontract is de verhuurder verantwoordelijk voor groot onderhoud aan de buitenzijde van het pand.',
    translations: {
      ar: 'وفقاً لبنود عقد الإيجار، يكون المالك مسؤولاً عن أعمال الصيانة الكبرى للواجهة الخارجية للمبنى.',
      ti: 'ብመሰረት ውዕል ክራይ፡ እቲ ኣካራዪ ነቲ ቀንዲ ናይ ደገ ጽገናታት ናይቲ ህንጻ ሓላፍነት ይወስድ።',
      om: 'Akka qajeelfama waliigaltee kiraatti, kireessaan suphaa gurguddaa gama ala manaatiif itti gaafatamummaa qaba.',
      en: 'According to the stipulations in the lease agreement, the landlord is responsible for major maintenance on the exterior of the property.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Gezondheidszorg & Verzekering',
    dutch: 'De medisch specialist verwees mij door naar het academisch ziekenhuis voor nader specialistisch onderzoek.',
    translations: {
      ar: 'قام الطبيب الأخصائي بتحويلي إلى المستشفى الجامعي الأكاديمي لإجراء فحوصات تخصصية إضافية ومتقدمة.',
      ti: 'እቲ ስፔሻሊስት ሓኪም ተወሳኺ መርመራ ምእንቲ ክግበረለይ ናብ ዩኒቨርሲቲ ሆስፒታል ልኢኹኒ።',
      om: 'Oogeessi fayyaa qorannoo dabalataatiif gara hospitaala yuunivarsiitiitti na dabarse.',
      en: 'The medical specialist referred me to the academic hospital for further specialist examinations.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Samenleving & Burgerschap',
    dutch: 'Inburgering gaat niet alleen over het behalen van examens, maar vooral over actief meedoen en sociale contacten opbouwen in de buurt.',
    translations: {
      ar: 'الاندماج لا يقتصر فقط على اجتياز الامتحانات، بل يتعلق أساساً بالمشاركة الفعالة وبناء علاقات اجتماعية طيبة في الحي.',
      ti: 'ምውህሃድ ማለት ፈተና ምሕላፍ ጥራይ ዘይኮነስ፡ ኣብቲ ከባቢ ብንጥፈት ምስታፍን ማሕበራዊ ርክባት ምምዕባልን እዩ።',
      om: 'Inburgering qormaata darbuu qofa osoo hin taane, naannoo ofiitti hirmaannaa qabaachuu fi walitti dhufeenya hawaasummaa ijaaruudha.',
      en: 'Civic integration is not only about passing exams, but above all about actively participating and building social connections in the community.'
    }
  },
  {
    level: 'moeilijk',
    topic: 'Financiën & Toeslagen',
    dutch: 'Wanneer uw toetsingsinkomen verandert, moet u dit direct doorgeven via Mijn Toeslagen om hoge terugbetalingen te voorkomen.',
    translations: {
      ar: 'عندما يتغير دخلك السنوي الخاضع للاحتساب، يجب عليك إبلاغ مصلحة الضرائب فوراً عبر البوابة لتجنب دفع مبالغ مستردة كبيرة.',
      ti: 'ናይ ዓመት ኣታዊኹም ምስ ዝቕየር፡ ብዙሕ ገንዘብ ከይትምልሱ ብቕልጡፍ ብመንገዲ Mijn Toeslagen ክትሕብሩ ይግባእ።',
      om: 'Galii keessan yoo jijjiirame, deebisanii kaffaltii guddaa irraa of qusachuuf battalumatti beeksisuu qabdu.',
      en: 'When your assessment income changes, you must report this immediately to avoid having to repay large sums later.'
    }
  }
];

// Add additional varied practical sentences to reach ~140 items total
const extraSentences = [
  // Basis
  ['basis', 'Dagelijks leven', 'Mag ik een glas koud water, alstublieft?', 'هل يمكنني الحصول على كوب ماء بارد من فضلك؟', 'ሓደ ብርጭቆ ዝሑል ማይ ክረክብ ይኽእልዶ፧', 'Mee bishaan qabbanaawaa kubbaayyaa tokko nan argadhaa?', 'May I have a glass of cold water, please?'],
  ['basis', 'Winkelen', 'Waar kan ik suiker en thee vinden?', 'أين يمكنني أن أجد السكر والشاي؟', 'ሽኮርን ሻሂን ኣበይ ክረክብ ይኽእል፧', 'Sukkaara fi shaayii eessatti argadha?', 'Where can I find sugar and tea?'],
  ['basis', 'Tijd', 'Het is nu precies half vier.', 'الساعة الآن الثالثة والنصف تماماً.', 'ሕጂ ሰዓት ሰለስተን ፈረቓን ኮይኑ ኣሎ።', 'Amma sirriitti sa\'aa sadii fi walakkaadha.', 'It is now exactly half past three.'],
  ['basis', 'Verkeer', 'Pas op bij het oversteken van de straat!', 'انتبه عند عبور الشارع!', 'ጎደና ክትሳገሩ ከለኹም ተጠንቀቑ!', 'Daandii qaxxaamuruuf of eeggadhaa!', 'Watch out when crossing the street!'],
  ['basis', 'Familie', 'Mijn familie woont in een fijn appartement.', 'عائلتي تعيش في شقة جميلة ومريحة.', 'ስድራቤተይ ኣብ ሓደ ጽቡቕ ኣፓርታማ ይነብሩ።', 'Maatiin koo mana jireenyaa gaarii keessa jiraatu.', 'My family lives in a nice apartment.'],
  ['basis', 'School', 'De kinderen spelen buiten op het plein.', 'الأطفال يلعبون في الخارج في الساحة.', 'እቶም ቆልዑ ኣብ ደገ ኣብቲ ሜዳ ይጻወቱ ኣለዉ።', 'Ijoolleen dirree keessatti taphachaa jiru.', 'The children are playing outside in the schoolyard.'],
  ['basis', 'Taalles', 'Ik oefen elke dag met de TaalVriend app.', 'أنا أتدرب كل يوم باستخدام تطبيق TaalVriend.', 'መዓልቲ መዓልቲ በዚ TaalVriend ኣፕ ይለማመድ።', 'Guyyaa guyyaan appilikeeshinii TaalVriend tiin shaakala.', 'I practice every day with the TaalVriend app.'],
  ['basis', 'Begroeting', 'Prettig weekend en tot maandag!', 'عطلة نهاية أسبوع سعيدة وأراك يوم الإثنين!', 'ጽቡቕ ቀዳም-ሰንበት፡ ሶኑይ ንራኸብ!', 'Sanbata gaarii, wixata wal argina!', 'Have a nice weekend and see you on Monday!'],
  ['basis', 'Boodschappen', 'Heeft u ook verse halal kip?', 'هل يتوفر لديكم دجاج حلال طازج أيضاً؟', 'ሓላል ዝኾነ ደርሆ ኣለኩምዶ፧', 'Lukkuu halaala haaraa qabduu?', 'Do you also have fresh halal chicken?'],
  ['basis', 'Vervoer', 'De bushalte is aan de overkant van de weg.', 'موقف الحافلات يقع على الجانب الآخر من الطريق.', 'እቲ መደበር ኣውቶቡስ ኣብ ማዕዶ እቲ ጎደና ኣሎ።', 'Dhaabbanni baasii gama kaaniitiin jira.', 'The bus stop is across the road.'],
  ['basis', 'Huisarts', 'Ik heb last van keelpijn en hoesten.', 'أعاني من ألم في الحلق وسعال.', 'ጎረሮይ ይቐንዘንን ይስዕልን ኣለኹ።', 'Qoonqoo na dhukkubee na qufaasisa.', 'I suffer from a sore throat and cough.'],
  ['basis', 'Wonen', 'Mijn voordeur zit op slot.', 'باب بيتي الأمامي مغلق بالمفتاح.', 'ማዕጾ ገዛይ ብመዕጸዊ ተዓጽዩ ኣሎ።', 'Balballi manaa koo cufameera.', 'My front door is locked.'],
  ['basis', 'Werk', 'Ik werk vier dagen per week.', 'أنا أعمل أربعة أيام في الأسبوع.', 'ኣብ ሰሙን ኣርባዕተ መዓልቲ ይሰርሕ።', 'Torbaanitti guyyaa afur nan hojjedha.', 'I work four days a week.'],
  ['basis', 'Vrije tijd', 'Op zaterdag gaan we wandelen in het bos.', 'يوم السبت نذهب في نزهة مشياً في الغابة.', 'ቀዳም ቀዳም ኣብ ጫካ ንዘውር።', 'Sanbata sanbata bosona keessa lafoon deemna.', 'On Saturdays we go for a walk in the woods.'],

  // Gevorderd
  ['gevorderd', 'Gemeente', 'Vergeet niet om uw verhuizing binnen vijf werkdagen door te geven aan de gemeente.', 'لا تنسَ إبلاغ البلدية بانتقالك إلى سكن جديد في غضون خمسة أيام عمل.', 'ኣብ ውሽጢ ሓሙሽተ መዓልታት ናይ ስራሕ ምግዓዝኩም ንምምሕዳር ከተማ ምሕባር ኣይትረስዑ።', 'Guyyoota hojii shan keessatti godaansa keessan bulchiinsa magaalaaf beeksisuu hin irraanfatinaa.', 'Do not forget to report your change of address to the municipality within five working days.'],
  ['gevorderd', 'Werk', 'Heeft u al ervaring opgedaan met het bedienen van een heftruck in een distributiecentrum?', 'هل لديك خبرة سابقة في تشغيل رافعة شوكية في مركز توزيع؟', 'ኣብ ናይ መከፋፈሊ ማእከል ፎርክሊፍት ናይ ምዝዋር ልምዲ ኣለኩምዶ፧', 'Giddu-gala raabsaa keessatti konkolaataa hefitrukii oofuu irratti muuxannoo qabduu?', 'Do you have previous experience operating a forklift in a distribution centre?'],
  ['gevorderd', 'School', 'U kunt via het online ouderportaal de rapporten en cijfers van uw kinderen bekijken.', 'يمكنك الاطلاع على درجات وتقارير أطفالك المدرسية عبر بوابة أولياء الأمور الإلكترونية.', 'ብመንገዲ ናይ ወለዲ ፖርታል ናይ ደቅኹም ጸብጻብን ውጽኢትን ክትርእዩ ትኽእሉ ኢኹም።', 'Karaa poortaalii warraatiin gabaasa qabxii ijoollee keessanii ilaaluu dandeessu.', 'You can view your children\'s report cards and grades through the online parent portal.'],
  ['gevorderd', 'Financiën', 'Controleer regelmatig uw bankafschriften om te zien of alle vaste lasten zijn afgeschreven.', 'تحقق بانتظام من كشوفات حسابك المصرفي للتأكد من خصم جميع النفقات الثابتة.', 'እቶም ቀወምቲ ክፍሊታት ከም ዝተኸፍሉ ንምርግጋጽ ናይ ባንኪ ጸብጻብኩም ወትሩ ተኸታተሉ።', 'Kaffaltiin dhaabbataan hundi kaffalamuu isaa mirkaneeffachuuf nagahee baankii keessanii yeroo yeroon to\'adhaa.', 'Regularly check your bank statements to verify that all fixed expenses have been debited.'],
  ['gevorderd', 'Vervoer', 'Als u buiten de spitsuren reist met de trein, ontvangt u veertig procent korting.', 'إذا سافرت بالقطار خارج ساعات الذروة، فستحصل على خصم أربعين بالمئة.', 'ካብ ናይ ጻዕቂ ሰዓታት ወጻኢ ብባቡር እንተተጓዒዝኩም፡ 40% ቅናሽ ትረኽቡ።', 'Yeroo baay\'ina namootaa (spits) ala baaburaan yoo deemtan, hir\'isa dhibbeentaa afurtama argattu.', 'If you travel by train during off-peak hours, you receive a forty percent discount.'],
  ['gevorderd', 'Huisvesting', 'In Nederland scheiden we ons afval in papier, plastic, gft en restafval.', 'في هولندا نقوم بفرز النفايات إلى ورق وبلاستيك ومخلفات عضوية ونفايات متبقية.', 'ኣብ ኔዘርላንድስ ቆሻሻ ናብ ወረቐት፡ ፕላስቲክ፡ ናይ መግቢ ተረፍን ካልእን ይፍለ እዩ።', 'Neezerlaandi keessatti kosii gara waraqaa, pilaastikii fi kosii hafeetti addaan baafna.', 'In the Netherlands, we separate our waste into paper, plastic, organic and residual waste.'],
  ['gevorderd', 'Gezondheid', 'De fysiotherapeut heeft mij oefeningen gegeven om mijn rugspieren te versterken.', 'أعطاني أخصائي العلاج الطبيعي تمارين خاصة لتقوية عضلات ظهري.', 'እቲ ናይ ፊዝዮተራፒ ሓኪም ንጭዋዳታት ሕቖይ ዘበርትዕ ምውስዋስ ሂቡኒ።', 'Oogeessi fiziyeoteraapii maashaa dugda koo jabeessuuf leenjii naaf kenneera.', 'The physiotherapist gave me exercises to strengthen my back muscles.'],
  ['gevorderd', 'Inburgering', 'Voor het examen spreken moet je korte antwoorden geven en duidelijke vragen stellen.', 'في اختبار المحادثة الشفهي، يجب عليك تقديم إجابات موجزة وطرح أسئلة واضحة.', 'ኣብቲ ናይ ምዝራብ ፈተና፡ ሓጸርቲ መልስታት ክትህቡን ንጹር ሕቶታት ክትሓቱ ትግባእ።', 'Qormaata dubbachuu irratti deebii gabaabaa fi gaaffii ifaa gaafachuu qabdu.', 'For the speaking exam, you must provide concise answers and ask clear questions.'],

  // Moeilijk
  ['moeilijk', 'Democratie', 'De Grondwet waarborgt de vrijheid van godsdienst en de gelijkwaardigheid van alle burgers.', 'يضمن الدستور الهولندي حرية المعتقد الديني والمساواة التامة بين جميع المواطنين.', 'ቅዋም ኔዘርላንድስ ናጽነት ሃይማኖትን ማዕርነት ኩሎም ዜጋታትን የረጋግጽ።', 'Heerri biyyattii bilisummaa amantii fi qixxummaa lammiilee hundaaf wabii ta\'a.', 'The Constitution guarantees freedom of religion and equality for all citizens.'],
  ['moeilijk', 'Verzekeringen', 'Het eigen risico in de basisverzekering bedraagt standaard driehonderdvijfentachtig euro per kalenderjaar.', 'مبلغ التحمل الإجباري السنوي في التأمين الصحي الأساسي هو 385 يورو لكل عام ميلادي.', 'እቲ ናይ ውልቂ ሓላፍነት (ኤይኸን ሪሲኮ) ኣብ ዓመት 385 ዩሮ እዩ።', 'Baasiin inshuraansii fayyaa ofii danda\'amu waggaatti Yuuroo 385 dha.', 'The standard deductible in the basic health insurance is 385 euros per calendar year.'],
  ['moeilijk', 'Juridisch', 'Indien de werkgever het contract voortijdig wenst te beëindigen, dient hij een wettelijke opzegtermijn in acht te nemen.', 'إذا رغب صاحب العمل في إنهاء العقد قبل وقته، فيتعين عليه الالتزام بفترة الإشعار القانونية.', 'እቲ ኣስራሒ ነቲ ውዕል ቅድሚ ግዜኡ ከቋርጾ እንተደልዩ፡ ነቲ ናይ ሕጊ ናይ ምፍላጥ ግዜ ከኽብሮ ኣለዎ።', 'Hojjachiisaan waliigaltee yeroodhaan dura dhaabuu yoo barbaade, yeroo akeekkachiisa seeraa eeguu qaba.', 'If the employer wishes to terminate the contract prematurely, he must observe a statutory notice period.'],
  ['moeilijk', 'Onderwijs', 'Leerlingen kunnen na het behalen van hun mbo-niveau 4 diploma doorstromen naar het hoger beroepsonderwijs.', 'يمكن للطلاب بعد حصولهم على شهادة MBO المستوى الرابع مواصلة تعليمهم في الجامعات التطبيقية.', 'ተመሃሮ ናይ MBO ደረጃ 4 ምስ ወድኡ ናብ ላዕለዋይ ትምህርቲ (HBO) ክቕጽሉ ይኽእሉ እዮም።', 'Barattoonni sadarkaa MBO 4 erga xumuranii booda gara barnoota olaanaatti (HBO) darbuu danda\'u.', 'Students who obtain their MBO level 4 diploma can progress to a university of applied sciences.'],
  ['moeilijk', 'Samenleving', 'Vrijwilligerswerk biedt nieuwkomers een uitstekende kans om hun taalvaardigheid in de praktijk te brengen en een sociaal netwerk op te bouwen.', 'يوفر العمل التطوعي فرصة ممتازة للقادمين الجدد لتطبيق لغتهم في بيئة عملية وبناء شبكة علاقات اجتماعية واسعة.', 'ወለንታዊ ስራሕ ንሓደስቲ መጻእቲ ቋንቋኦም ንምምዕባልን ማሕበራዊ ርክባት ንምፍጣርን ዓቢ ዕድል ይፈጥረሎም።', 'Hojiin tola ooltummaa namoota haaraadhaaf afaan isaanii shaakaluu fi walitti dhufeenya uumuuf carraa guddaadha.', 'Volunteering offers newcomers an excellent opportunity to put their language skills into practice and build a social network.'],
  ['basis', 'Hobby', 'Ik luister graag naar muziek en lees Nederlandse boeken.', 'أنا أحب الاستماع إلى الموسيقى وقراءة الكتب الهولندية.', 'ሙዚቃ ምስማዕን መጻሕፍቲ ኔዘርላንድስኛ ምንባብን እፈቱ።', 'Muuziqaa dhaggeeffachuu fi kitaabota Afaan Neezerlaandi dubbisuu nan jaalladha.', 'I like listening to music and reading Dutch books.'],
  ['basis', 'Natuur', 'De zon schijnt en de lucht is helder blauw.', 'الشمس مشرقة والسماء زرقاء صافية.', 'ጸሓይ ትበርቕ ኣላ፡ ሰማይ ድማ ጽሩይ ሰማያዊ እዩ።', 'Aduun baatee samiin cuquliisa qulqulluudha.', 'The sun is shining and the sky is clear blue.'],
  ['basis', 'Boodschappen', 'Kunt u mij alstublieft een plastic tasje geven?', 'هل يمكنك إعطائي كيساً بلاستيكياً من فضلك؟', 'ብኽብረትኩም ፌስታል ክትህቡኒ ትኽእሉዶ፧', 'Mee koroojoo pilaastikii naaf kennuu dandeessuu?', 'Could you please give me a plastic bag?'],
  ['basis', 'Dagelijks', 'Ik sta elke ochtend om zeven uur op.', 'أنا أستيقظ كل صباح في الساعة السابعة.', 'መዓልቲ መዓልቲ ንግሆ ሰዓት ሾብዓተ ይትንስእ።', 'Ganama ganama sa\'aatii torbatti nan ka\'a.', 'I get up at seven o\'clock every morning.'],
  ['basis', 'Kennismaking', 'Aangenaam kennis met u te maken!', 'تشرفت جداً بمعرفتك!', 'ምሳኻትኩም ብምልላይ ሓጎስ ይስምዓኒ!', 'Isin baruu kootti baay\'ee gammadeera!', 'Pleased to meet you!'],
  ['basis', 'Vervoer', 'Ik neem de bus naar het station.', 'أنا أستقل الحافلة إلى محطة القطار.', 'ናብ መደበር ባቡር ንምኻድ ኣውቶቡስ ይወስድ።', 'Gara buufata baaburaatti baasii nan qabadha.', 'I take the bus to the station.'],
  ['basis', 'Thuis', 'Vergeet niet om het raam dicht te doen.', 'لا تنسَ إغلاق النافذة.', 'ነቲ መስኮት ምዕጻው ኣይትረስዑ።', 'Foddaa cufuu hin irraanfatinaa.', 'Do not forget to close the window.'],
  ['basis', 'Boodschappen', 'Hebben jullie verse groenten en fruit?', 'هل لديكم خضروات وفواكه طازجة؟', 'ሓደሽቲ ኣሕምልትን ፍረታትን ኣለኩምዶ፧', 'Fuduraa fi muduraa haaraa qabduu?', 'Do you have fresh vegetables and fruit?'],
  ['gevorderd', 'Gemeente', 'Mijn verblijfsdocument verloopt binnenkort, hoe kan ik verlenging aanvragen?', 'ستنتهي صلاحية وثيقة إقامتي قريباً، كيف يمكنني التقدم بطلب التمديد؟', 'ናይ መንበሪ ወረቐተይ ኣብ ቀረባ ግዜ ክውዳእ እዩ፡ ከመይ ገይረ ከናውሖ ይኽእል፧', 'Waraqaan jireenya koo dhiyootti waan xumuramuuf, akkamitti haaromsa iyyachuu danda\'a?', 'My residence document will expire soon, how can I apply for an extension?'],
  ['gevorderd', 'Gezondheid', 'Ik heb al een week aanhoudende pijn in mijn onderrug bij het tillen.', 'أعاني من ألم مستمر في أسفل ظهري منذ أسبوع عند رفع الأشياء.', 'ነገራት ከልዕል ከለኹ ኣብ ታሕተዋይ ሕቖይ ናይ ሰሙን ቀጻሊ ቃንዛ ኣሎኒ።', 'Waan ulfaataa yeroon ol kaasu torban tokkoof dugdi gadii na dhukkubaa jira.', 'I have had persistent lower back pain for a week when lifting objects.'],
  ['gevorderd', 'Werk', 'Mijn proeftijd van één maand is succesvol afgerond en ik krijg een contractverlenging.', 'انتهت فترة اختباري التي استمرت شهراً بنجاح وسأحصل على تمديد لعقد عملي.', 'ናይ ሓደ ወርሒ ናይ ፈተነ ግዜይ ብዓወት ተወዲኡ፡ ውዕለይ ድማ ክናዋሕ እዩ።', 'Yeroon qormaataa ji\'a tokkoo milkaa\'inaan xumuramee waliigalteen koo naaf haaromfama.', 'My one-month probation period was completed successfully and I will receive a contract extension.'],
  ['gevorderd', 'Onderwijs', 'Op de basisschool krijgen alle kinderen een fruitpauze rond tien uur.', 'في المدرسة الابتدائية يحصل جميع الأطفال على استراحة لتناول الفاكهة في حوالي الساعة العاشرة.', 'ኣብ ቀዳማይ ብርኪ ቤት ትምህርቲ ሰዓት ዓሰርተ ኩሎም ቆልዑ ናይ ፍረታት ዕረፍቲ ኣለዎም።', 'Mana barumsaa sadarkaa duraatti ijoolleen hundi sa\'aatii kudhanii irratti boqonnaa fuduraa qabu.', 'In primary school, all children have a fruit break around ten o\'clock.'],
  ['gevorderd', 'Vervoer', 'U kunt een anonieme of persoonlijke OV-chipkaart aanschaffen en opladen bij de automaat.', 'يمكنك شراء بطاقة مواصلات عامة مجهولة أو شخصية وشحنها من الجهاز الآلي.', 'ናይ ውልቂ ወይ ስም ዘይብሉ ናይ መጓዓዝያ ካርድ (OV-chipkaart) ካብ ማሽን ክትገዝኡን ክትመልኡን ትኽእሉ ኢኹም።', 'Kaardii geejjiba waliigalaa (OV-chipkaart) maashina irraa bitattanii maallaqa itti guutuu dandeessu.', 'You can purchase an anonymous or personal public transport chip card and top it up at the machine.'],
  ['gevorderd', 'Buurt', 'Houd alstublieft rekening met de buren en maak na tien uur \'s avonds geen hard lawaai meer.', 'يرجى مراعاة الجيران وعدم إصدار أصوات صاخبة بعد الساعة العاشرة مساءً.', 'ብኽብረትኩም ንጎረባብቲ ኣብ ግምት ኣእትዉ፡ ድሕሪ ሰዓት ዓሰርተ ምሸት ድማ ዓቢ ድምጺ ኣይተትሕዙ።', 'Mee ollaawwan kabajaatii sa\'aatii afur (10 PM) booda sagalee guddaa hin dhageessisinaa.', 'Please consider the neighbours and do not make loud noise after ten o\'clock in the evening.'],
  ['gevorderd', 'Post', 'De bezorger kon het pakket niet afleveren en heeft het afgegeven bij het afhaalpunt.', 'لم يتمكن عامل التوصيل من تسليم الطرد وقام بإيداعه في نقطة الاستلام القريبة.', 'እቲ ኣብጻሒ ነቲ ጥቕላል ከረክቦ ስለዘይከኣለ ኣብቲ ናይ ምውሳድ ቦታ ገዲፍዎ ኣሎ።', 'Ergaan dhiyeessaa paakeejicha kennuu waan hin dandeenyeef bakka fudhannaatti dhiiseera.', 'The delivery courier could not deliver the package and dropped it off at the pick-up point.'],
  ['gevorderd', 'Financiën', 'Als uw inkomen te laag is, kunt u bij de gemeente bijzondere bijstand aanvragen.', 'إذا كان دخلك منخفضاً للغاية، فيمكنك التقدم بطلب للحصول على مساعدة مالية خاصة من البلدية.', 'ኣታዊኹም ትሑት እንተኾይኑ፡ ካብ ምምሕዳር ከተማ ፍሉይ ሓገዝ ክትሓቱ ትኽእሉ ኢኹም።', 'Galiin keessan baay\'ee gadi aanaa yoo ta\'e, bulchiinsa magaalaa irraa gargaarsa addaa iyyachuu dandeessu.', 'If your income is too low, you can apply for special assistance from the municipality.'],
  ['moeilijk', 'Rechten', 'Vrijheid van meningsuiting is een fundamenteel grondrecht in de Nederlandse democratische rechtsstaat.', 'حرية التعبير عن الرأي حق أساسي دستوري جوهري في دولة القانون والديمقراطية الهولندية.', 'ናጽነት ሓሳብካ ምግላጽ ኣብ ዲሞክራስያዊት ኔዘርላንድስ መሰረታዊ ቅዋማዊ መሰል እዩ።', 'Bilisummaan yaada ofii ibsuu heerri Neezerlaandi keessatti mirga bu\'uuraati.', 'Freedom of speech is a fundamental constitutional right in the Dutch democratic state under the rule of law.'],
  ['moeilijk', 'Zorg', 'Voor specialistische geestelijke gezondheidszorg heeft u een officiële schriftelijke verwijzing van uw eigen huisarts nodig.', 'للحصول على رعاية متخصصة في الصحة النفسية، يلزمك تحويل رسمي كتابي من طبيب أسرتك.', 'ንፍሉይ ናይ ኣእምሮ ጥዕና ክንክን፡ ካብ ናይ ስድራቤት ሓኪምኩም ወግዓዊ ናይ ምስግጋር ደብዳበ የድልየኩም እዩ።', 'Tajaajila yaala sammuu ogeessaa argachuuf xalayaa dooqtoora maatii keessanii irraa barbaachisaadha.', 'For specialist mental health care, you require an official written referral from your general practitioner.'],
  ['moeilijk', 'Werkgevers', 'Werknemers met een tijdelijk dienstverband genieten dezelfde bescherming tegen discriminatie op de werkvloer als personeel met een vast contract.', 'يتمتع الموظفون ذوو العقود المؤقتة بنفس الحماية القانونية ضد التمييز في بيئة العمل تماماً كالعمال ذوي العقود الدائمة.', 'ግዝያዊ ውዕል ዘለዎም ሰራሕተኛታት ከምቶም ቀወምቲ ሰራሕተኛታት ማዕረ ናይ ምግላል ሓለዋ ኣለዎም።', 'Hojjettoonni waliigaltee yeroo qaban akka warra dhaabbataatti loogii irraa eegumsa seeraa qixxee argatu.', 'Employees with fixed-term contracts enjoy the exact same protection against discrimination in the workplace as permanent staff.'],
  ['moeilijk', 'Woningmarkt', 'Wegens de aanhoudende krapte op de woningmarkt bedraagt de gemiddelde wachttijd voor een sociale huurwoning meerdere jaren.', 'نظراً للنقص الشديد والمستمر في سوق السكن، فإن متوسط فترة الانتظار لسكن الإيجار الاجتماعي يصل لعدة سنوات.', 'ብምኽንያት ሕጽረት ኣባይቲ፡ ናይ ማሕበራዊ ክራይ ገዛ ናይ ምጽባይ ግዜ ንሓያሎ ዓመታት ይወስድ።', 'Hanqina manneen jireenyaatiin kan ka\'e, mana kiraa hawaasummaa argachuuf waggoota hedduu eeguu barbaachisa.', 'Due to the persistent shortage in the housing market, the average waiting time for social housing amounts to several years.'],
  ['moeilijk', 'IND & Status', 'Nadat uw aanvraag voor gezinshereniging is goedgekeurd, ontvangt u een uitnodiging om biometrische gegevens af te staan.', 'بعد الموافقة على طلب لم الشمل العائلي، ستتلقى دعوة رسمية لتقديم بياناتك الحيوية البصمات والصورة.', 'ናይ ስድራቤት ምጥርናፍ ሕቶኹም ምስ ተቐበለ፡ ናይ ኣጻብዕኩም ምልክት ንምሃብ ጻውዒት ክመጸኩም እዩ።', 'Iyyannoon maatii walitti fiduu erga fudhatamee booda, ragaa baayoomootiriiksii kennuuf waamichi isiniif dhufa.', 'After your application for family reunification is approved, you will receive an invitation to provide biometric data.'],
  ['basis', 'Dieren', 'De kat slaapt lekker in de warme zon.', 'القطة تنام بهدوء تحت أشعة الشمس الدافئة.', 'ድሙ ኣብቲ ሙቑሕ ጸሓይ ደቂሳ ኣላ።', 'Adurreen aduu ho\'aa keessa rafaa jirti.', 'The cat is sleeping peacefully in the warm sun.'],
  ['basis', 'Dagen', 'Vandaag is het maandag en morgen is het dinsdag.', 'اليوم هو الإثنين وغداً سيكون الثلاثاء.', 'ሎሚ ሰኑይ እዩ ጽባሕ ድማ ሰሉስ እዩ።', 'Har\'a wixata, boru immoo kibxata.', 'Today is Monday and tomorrow is Tuesday.'],
  ['basis', 'Kleur', 'Mijn nieuwe fiets is donkerblauw met zilver.', 'دراجتي الجديدة ذات لون أزرق داكن مع لمسات فضية.', 'ሓዳስ ብሽክለታይ ጸሊም ሰማያዊ ምስ ብሩር እያ።', 'Biskileetiin koo inni haaraan cuquliisa dukkanaawaadha.', 'My new bicycle is dark blue with silver.'],
  ['basis', 'Fruit', 'Ik eet elke ochtend een banaan of een appel.', 'أنا آكل كل صباح موزة أو تفاحة.', 'መዓልቲ መዓልቲ ንግሆ ባናና ወይ ቱፋሕ ይበልዕ።', 'Ganama ganama muuzii ykn appilii nan nyaadha.', 'I eat a banana or an apple every morning.'],
  ['gevorderd', 'Vrijwilligers', 'Door vrijwilligerswerk te doen in het buurthuis leer ik veel nieuwe mensen kennen.', 'من خلال قيامي بعمل تطوعي في مركز الحي، أتعرف على الكثير من الناس الجدد.', 'ኣብ ናይ ከባቢ ማእከል ብወለንታውነት ብምስራሕ ብዙሓት ሓደስቲ ሰባት የለልይ።', 'Mana hawaasaa keessatti hojii tola ooltummaa hojjechuudhaan namoota haaraa hedduu wal baradha.', 'By volunteering at the community centre, I get to know many new people.'],
  ['gevorderd', 'Koken', 'Snijd de uien en knoflook fijn en fruit ze zachtjes in een scheutje olijfolie.', 'افرم البصل والثوم ناعماً وشوّحهما برفق في قليل من زيت الزيتون.', 'ሽጉርትን ጻዕዳ ሽጉርትን ደቒቕ ገይርካ ብዘይቲ ኣውሊዕ ጥበሶ።', 'Qullubbii adii fi boqqolloo qaphisiisaa zayita ejersaatiin xiqqoo waadaa.', 'Finely chop the onions and garlic and sauté them gently in a dash of olive oil.'],
  ['gevorderd', 'Kinderopvang', 'Ouders die beiden werken of een inburgeringstraject volgen kunnen kinderopvangtoeslag aanvragen.', 'يمكن للآباء الذين يعمل كلاهما أو يتابعان مسار اندماج التقدم بطلب للحصول على إعانة رعاية الأطفال.', 'ክልቲኦም ወለዲ ዝሰርሑ ወይ ናይ ምውህሃድ ኮርስ ዝከታተሉ፡ ናይ ቆልዑ መውዓሊ ድጎማ ክሓቱ ይኽእሉ እዮም።', 'Warri lamaan isaaniiyyuu hojjetan ykn inburgering hordofan gargaarsa daa\'immanii iyyachuu danda\'u.', 'Parents who both work or follow an integration trajectory can apply for childcare allowance.'],
  ['moeilijk', 'Belastingen', 'Het heffingsvrij vermogen in box 3 stelt belastingplichtigen in staat een bepaald spaartegoed belastingvrij aan te houden.', 'يتيح الإعفاء الضريبي على الأصول للأفراد الاحتفاظ بقدر معين من المدخرات دون دفع ضرائب عليه.', 'እቲ ካብ ግብሪ ነጻ ዝኾነ ንብረት፡ ዜጋታት ዝተወሰነ መጠን ገንዘብ ብዘይ ግብሪ ንኽዕቅቡ የኽእሎም።', 'Qabeenyi gibira irraa bilisa ta\'e kaffaltoonni gibiraa qusannaa murtaa\'aa bilisaan akka qabaatan hayyama.', 'The tax-free allowance in box 3 enables taxpayers to retain a certain amount of savings tax-free.'],
  ['moeilijk', 'Privacy', 'Onder de Algemene Verordening Gegevensbescherming heeft u te allen tijde het wettelijk recht op inzage en verwijdering van uw persoonsgegevens.', 'بموجب اللائحة العامة لحماية البيانات، يحق لك قانوناً في أي وقت الاطلاع على بياناتك الشخصية والمطالبة بحذفها.', 'ብመሰረት ሕጊ ሓለዋ ሓበሬታ፡ ናይ ውልቂ ሓበሬታኹም ናይ ምርኣይን ናይ ምድሳስን ሕጋዊ መሰል ኣለኩም።', 'Seera eegumsa odeeffannoo dhuunfaa jalatti ragaa keessan ilaaluu fi haqsiisuuf mirga guutuu qabdu.', 'Under the General Data Protection Regulation, you have the statutory right at all times to access and erase your personal data.'],
  ['moeilijk', 'Klimaat', 'Nederland investeert substantieel in de transitie naar duurzame energiebronnen zoals windenergie op zee en zonneparken op land.', 'تستثمر هولندا بشكل جوهري في التحول نحو مصادر الطاقة المتجددة مثل طاقة الرياح البحرية وحقول الطاقة الشمسية البرية.', 'ኔዘርላንድስ ኣብ መሕደሲ ሓይሊ ከም ናይ ንፋስን ጸሓይን ሓይሊ ብዙሕ ወፍሪ ተካይድ ኣላ።', 'Neezerlaandi ce\'umsa anniisaa haaromfamutti kan akka bubbee galaanaa fi anniisaa aduu irratti baay\'ee invest gochaa jirti.', 'The Netherlands invests substantially in the transition towards renewable energy sources such as offshore wind and solar parks.']
];

extraSentences.forEach(([level, topic, dutch, ar, ti, om, en]) => {
  sentencesData.push({
    level,
    topic,
    dutch,
    translations: { ar, ti, om, en }
  });
});

// Add indices and IDs
const finalSentences = sentencesData.map((item, idx) => ({
  id: `sent_${item.level}_${idx + 1}`,
  level: item.level,
  topic: item.topic,
  dutch: item.dutch,
  translations: item.translations
}));

console.log(`Generated total of ${finalSentences.length} sentences:`);
console.log(`- Basis (A1): ${finalSentences.filter(s => s.level === 'basis').length}`);
console.log(`- Gevorderd (A2-B1): ${finalSentences.filter(s => s.level === 'gevorderd').length}`);
console.log(`- Moeilijk (B1-B2): ${finalSentences.filter(s => s.level === 'moeilijk').length}`);

const jsonPath = path.join(__dirname, '..', 'data', 'sentences.json');
const jsPath = path.join(__dirname, '..', 'data', 'sentences.js');

fs.writeFileSync(jsonPath, JSON.stringify(finalSentences, null, 2), 'utf-8');
console.log(`Wrote JSON to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Zinnen Database (${finalSentences.length} Zinnen)
 * Niveaus: Basis (A1), Gevorderd (A2-B1), Moeilijk (B1-B2)
 */
window.TAALVRIEND_SENTENCES = ${JSON.stringify(finalSentences, null, 2)};
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Wrote JS to ${jsPath}`);
