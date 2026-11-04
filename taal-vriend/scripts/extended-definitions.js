// scripts/extended-definitions.js
// 100+ new words covering requested themes:
// Verkeersborden, Klok Kijken, Huisarts & Tandarts, Sociale Relaties, Emoties, Politiek, Dranken, Getallen

module.exports = [
  // ==========================================
  // 13. VERKEERSBORDEN (Traffic Signs) - 14 words
  // ==========================================
  {
    id: 'stopbord',
    word: 'het stopbord',
    lemma: 'stopbord',
    article: 'het',
    category: 'Verkeersborden',
    translations: {
      ar: 'إشارة قف',
      ti: 'ናይ ደው በል ምልክት',
      om: 'mallattoo dhaabbadhu',
      en: 'the stop sign'
    },
    example: 'Bij het stopbord moet je altijd helemaal stoppen.',
    bg: '#FEF2F2'
  },
  {
    id: 'voorrang_verlenen',
    word: 'voorrang verlenen (haaientanden)',
    lemma: 'voorrang verlenen',
    article: '',
    category: 'Verkeersborden',
    translations: {
      ar: 'إعطاء الأولوية (أسنان القرش)',
      ti: 'ቀዳምነት ሃብ (ናይ ዓሳ ስኒ)',
      om: 'dursa kennuu (haayentaanden)',
      en: 'give way / yield (shark teeth)'
    },
    example: 'Witte driehoeken op de weg betekenen: voorrang verlenen.',
    bg: '#FEF2F2'
  },
  {
    id: 'voorrangsweg',
    word: 'de voorrangsweg',
    lemma: 'voorrangsweg',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'طريق ذو أولوية',
      ti: 'ናይ ቀዳምነት መንገዲ',
      om: 'karaa dursa qabu',
      en: 'the priority road'
    },
    example: 'Op een voorrangsweg heb jij voorrang op zijstraten.',
    bg: '#FEFCE8'
  },
  {
    id: 'fietspad_bord',
    word: 'het fietspad (bord)',
    lemma: 'fietspad',
    article: 'het',
    category: 'Verkeersborden',
    translations: {
      ar: 'مسار الدراجات الإلزامي',
      ti: 'መንገዲ ብሽክለታ',
      om: 'daandii biskileetii',
      en: 'the cycle path sign'
    },
    example: 'Een blauw rond bord met een witte fiets.',
    bg: '#EFF6FF'
  },
  {
    id: 'voetpad_bord',
    word: 'het voetpad / voetgangerszone',
    lemma: 'voetpad',
    article: 'het',
    category: 'Verkeersborden',
    translations: {
      ar: 'ممر المشاة الإلزامي',
      ti: 'መንገዲ ኣጋር',
      om: 'daandii miilaa',
      en: 'the pedestrian path sign'
    },
    example: 'Hier mogen alleen mensen lopen, geen fietsen of auto\'s.',
    bg: '#EFF6FF'
  },
  {
    id: 'inrijverbod',
    word: 'verboden in te rijden',
    lemma: 'verboden in te rijden',
    article: '',
    category: 'Verkeersborden',
    translations: {
      ar: 'ممنوع الدخول لجميع المركبات',
      ti: 'ምእታው ክልኩል ንኹሉ መካይን',
      om: 'seensii konkolaataaf dhowrgaa',
      en: 'no entry for vehicular traffic'
    },
    example: 'Een rood rond bord met een witte horizontale balk.',
    bg: '#FEF2F2'
  },
  {
    id: 'eenrichtingsweg',
    word: 'de eenrichtingsweg',
    lemma: 'eenrichtingsweg',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'طريق باتجاه واحد',
      ti: 'ሓደ ኣንፈት መንገዲ',
      om: 'karaa kallattii tokkoo',
      en: 'the one-way street'
    },
    example: 'Je mag deze straat maar van één kant inrijden.',
    bg: '#EFF6FF'
  },
  {
    id: 'rotonde_bord',
    word: 'de rotonde',
    lemma: 'rotonde',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'الدوار / المرور الدائري',
      ti: 'ሮቶንዳ / ዙርያ መንገዲ',
      om: 'rotoondaa / karaa naannoo',
      en: 'the roundabout'
    },
    example: 'Verkeer op de rotonde heeft meestal voorrang.',
    bg: '#EFF6FF'
  },
  {
    id: 'max_snelheid_30',
    word: 'maximumsnelheid 30 km/u',
    lemma: 'maximumsnelheid 30 km/u',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'السرعة القصوى 30 كم/س',
      ti: 'ዝለዓለ ፍጥነት 30 ኪ.ሜ/ሰ',
      om: 'safisa olaanaa km/h 30',
      en: 'speed limit 30 km/h'
    },
    example: 'In veel woonwijken mag je maximaal 30 rijden.',
    bg: '#FEF2F2'
  },
  {
    id: 'max_snelheid_50',
    word: 'maximumsnelheid 50 km/u',
    lemma: 'maximumsnelheid 50 km/u',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'السرعة القصوى 50 كم/س',
      ti: 'ዝለዓለ ፍጥነት 50 ኪ.ሜ/ሰ',
      om: 'safisa olaanaa km/h 50',
      en: 'speed limit 50 km/h'
    },
    example: 'Binnen de bebouwde kom is de snelheid meestal 50.',
    bg: '#FEF2F2'
  },
  {
    id: 'zebrapad_bord',
    word: 'het zebrapad (verkeersbord)',
    lemma: 'zebrapad',
    article: 'het',
    category: 'Verkeersborden',
    translations: {
      ar: 'شاخصة ممر المشاة',
      ti: 'ምልክት መሻገሪ ኣጋር',
      om: 'mallattoo sarara ce\'umsaa',
      en: 'pedestrian crossing sign'
    },
    example: 'Voetgangers op het zebrapad hebben voorrang.',
    bg: '#EFF6FF'
  },
  {
    id: 'parkeren_bord',
    word: 'het parkeerbord (P)',
    lemma: 'parkeerbord',
    article: 'het',
    category: 'Verkeersborden',
    translations: {
      ar: 'موقف سيارات مسموح',
      ti: 'መዕረፊ መካይን (ፓርኪንግ)',
      om: 'bakka konkolaataa dhaaban (P)',
      en: 'parking area sign'
    },
    example: 'Hier mag je de auto parkeren.',
    bg: '#EFF6FF'
  },
  {
    id: 'parkeerverbod',
    word: 'verboden te parkeren',
    lemma: 'verboden te parkeren',
    article: '',
    category: 'Verkeersborden',
    translations: {
      ar: 'ممنوع الوقوف والانتظار',
      ti: 'ፓርኪንግ ክልኩል',
      om: 'dhaabuun dhowrgaa',
      en: 'no parking sign'
    },
    example: 'Ronde blauwe schijf met een rode schuine streep.',
    bg: '#FEF2F2'
  },
  {
    id: 'drempel_bord',
    word: 'de verkeersdrempel',
    lemma: 'verkeersdrempel',
    article: 'de',
    category: 'Verkeersborden',
    translations: {
      ar: 'مطب تخفيف السرعة',
      ti: 'መጉደሊ ፍጥነት (ድሬምፐል)',
      om: 'hordofaa safisaa (drempel)',
      en: 'speed bump'
    },
    example: 'Rijd langzaam over de drempel.',
    bg: '#FEF2F2'
  },

  // ==========================================
  // 14. KLOK KIJKEN (Dutch Time Telling) - 14 words
  // ==========================================
  {
    id: 'tijd_3_00',
    word: 'drie uur (3:00)',
    lemma: 'drie uur',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 0,
    translations: {
      ar: 'الساعة الثالثة تماماً (٣:٠٠)',
      ti: 'ሰዓት ሰለስተ ኰይኑ (3:00)',
      om: 'sa\'aatii sadii guutuu (3:00)',
      en: 'three o\'clock (3:00)'
    },
    example: 'De school gaat om drie uur uit.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_05',
    word: 'vijf over drie (3:05)',
    lemma: 'vijf over drie',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 5,
    translations: {
      ar: 'الثالثة وخمس دقائق (٣:٠٥)',
      ti: 'ሰለስተን ሓሙሽተ ደቒቕን (3:05)',
      om: 'sadii fi daqiiqaa shan (3:05)',
      en: 'five past three (3:05)'
    },
    example: 'Het is vijf over drie, de bus komt zo.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_10',
    word: 'tien over drie (3:10)',
    lemma: 'tien over drie',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 10,
    translations: {
      ar: 'الثالثة وعشر دقائق (٣:١٠)',
      ti: 'ሰለስተን ዓሰርተ ደቒቕን (3:10)',
      om: 'sadii fi daqiiqaa kudhan (3:10)',
      en: 'ten past three (3:10)'
    },
    example: 'We vertrekken om tien over drie.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_15',
    word: 'kwart over drie (3:15)',
    lemma: 'kwart over drie',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 15,
    translations: {
      ar: 'الثالثة والربع (٣:١٥)',
      ti: 'ሰለስተን ርብዕን (3:15)',
      om: 'sadii fi kurmaana (3:15)',
      en: 'quarter past three (3:15)'
    },
    example: 'De dokter heeft om kwart over drie tijd.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_20',
    word: 'tien voor half vier (3:20)',
    lemma: 'tien voor half vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 20,
    translations: {
      ar: 'عشر دقائق قبل نصف الرابعة (٣:٢٠)',
      ti: 'ዓሰርተ ደቒቕ ቅድሚ ፈረቓ ኣርባዕተ (3:20)',
      om: 'kudhan hir\'uu walakkaa afurii (3:20)',
      en: 'twenty past three / ten to half four (3:20)'
    },
    example: 'In het Nederlands zeggen we: tien voor half vier.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_25',
    word: 'vijf voor half vier (3:25)',
    lemma: 'vijf voor half vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 25,
    translations: {
      ar: 'خمس دقائق قبل نصف الرابعة (٣:٢٥)',
      ti: 'ሓሙሽተ ደቒቕ ቅድሚ ፈረቓ ኣርባዕተ (3:25)',
      om: 'shan hir\'uu walakkaa afurii (3:25)',
      en: 'twenty-five past three / five to half four (3:25)'
    },
    example: 'Nog vijf minuten tot half vier.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_30',
    word: 'half vier (3:30)',
    lemma: 'half vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 30,
    translations: {
      ar: 'نصف الرابعة (الثالثة والنصف 3:30)',
      ti: 'ፈረቓ ኣርባዕተ (ሰለስተን ፈረቓን 3:30)',
      om: 'walakkaa afurii (sadii fi walakkaa 3:30)',
      en: 'half four in Dutch / half past three (3:30)'
    },
    example: 'Let op: half vier is 3:30 (een half uur VOOR vier uur)!',
    bg: '#FFFBEB'
  },
  {
    id: 'tijd_3_35',
    word: 'vijf over half vier (3:35)',
    lemma: 'vijf over half vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 35,
    translations: {
      ar: 'خمس دقائق بعد نصف الرابعة (٣:٣٥)',
      ti: 'ሓሙሽተ ደቒቕ ድሕሪ ፈረቓ ኣርባዕተ (3:35)',
      om: 'shan darbee walakkaa afurii (3:35)',
      en: 'five past half four / 3:35'
    },
    example: 'Het is vijf over half vier.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_40',
    word: 'tien over half vier (3:40)',
    lemma: 'tien over half vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 40,
    translations: {
      ar: 'عشر دقائق بعد نصف الرابعة (٣:٤٠)',
      ti: 'ዓሰርተ ደቒቕ ድሕሪ ፈረቓ ኣርባዕተ (3:40)',
      om: 'kudhan darbee walakkaa afurii (3:40)',
      en: 'ten past half four / twenty to four (3:40)'
    },
    example: 'Om tien over half vier drinken we thee.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_45',
    word: 'kwart voor vier (3:45)',
    lemma: 'kwart voor vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 45,
    translations: {
      ar: 'الرابعة إلا ربعاً (٣:٤٥)',
      ti: 'ርብዒ ጎደል ንኣርባዕተ (3:45)',
      om: 'kurmaanni hir\'uu afur (3:45)',
      en: 'quarter to four (3:45)'
    },
    example: 'Over een kwartier is het vier uur.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_50',
    word: 'tien voor vier (3:50)',
    lemma: 'tien voor vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 50,
    translations: {
      ar: 'الرابعة إلا عشر دقائق (٣:٥٠)',
      ti: 'ዓሰርተ ደቒቕ ጎደል ንኣርባዕተ (3:50)',
      om: 'daqiiqaa kudhan hir\'uu afur (3:50)',
      en: 'ten to four (3:50)'
    },
    example: 'Nog tien minuten tot de trein vertrekt.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_3_55',
    word: 'vijf voor vier (3:55)',
    lemma: 'vijf voor vier',
    article: '',
    category: 'Klok Kijken',
    timeHours: 3,
    timeMinutes: 55,
    translations: {
      ar: 'الرابعة إلا خمس دقائق (٣:٥٥)',
      ti: 'ሓሙሽተ ደቒቕ ጎደል ንኣርባዕተ (3:55)',
      om: 'daqiiqaa shan hir\'uu afur (3:55)',
      en: 'five to four (3:55)'
    },
    example: 'Bijna vier uur!',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_4_00',
    word: 'vier uur (4:00)',
    lemma: 'vier uur',
    article: '',
    category: 'Klok Kijken',
    timeHours: 4,
    timeMinutes: 0,
    translations: {
      ar: 'الساعة الرابعة تماماً (٤:٠٠)',
      ti: 'ሰዓት ኣርባዕተ ኰይኑ (4:00)',
      om: 'sa\'aatii afur guutuu (4:00)',
      en: 'four o\'clock (4:00)'
    },
    example: 'Om vier uur hebben we pauze.',
    bg: '#F8FAFC'
  },
  {
    id: 'tijd_12_00',
    word: 'twaalf uur \'s middags (12:00)',
    lemma: 'twaalf uur',
    article: '',
    category: 'Klok Kijken',
    timeHours: 12,
    timeMinutes: 0,
    translations: {
      ar: 'الثانية عشرة ظهراً (١٢:٠٠)',
      ti: 'ሰዓት ዓሰርተው ክልተ ናይ ቀትሪ (12:00)',
      om: 'sa\'aatii kudha lama guyyaa (12:00)',
      en: 'twelve o\'clock (noon)'
    },
    example: 'Om twaalf uur eten we lunch.',
    bg: '#FEFCE8'
  },

  // ==========================================
  // 15. HUISARTS & TANDARTS - 13 words
  // ==========================================
  {
    id: 'afspraak_maken',
    word: 'een afspraak maken',
    lemma: 'afspraak maken',
    article: '',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'حجز موعد عند الطبيب',
      ti: 'ቆጸራ ምሓዝ ምስ ሓኪም',
      om: 'beellama hakiimaa qabachuu',
      en: 'making an appointment'
    },
    example: 'Ik bel \'s ochtends vroeg om een afspraak te maken.',
    bg: '#EFF6FF'
  },
  {
    id: 'wachtkamer',
    word: 'de wachtkamer',
    lemma: 'wachtkamer',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'غرفة الانتظار',
      ti: 'ክፍሊ መጸበዪ',
      om: 'kutaa eeggannaa',
      en: 'the waiting room'
    },
    example: 'Neemt u alstublieft plaats in de wachtkamer.',
    bg: '#F8FAFC'
  },
  {
    id: 'bloeddruk_meten',
    word: 'de bloeddruk meten',
    lemma: 'bloeddruk meten',
    article: '',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'قياس ضغط الدم',
      ti: 'ጸቕጢ ደም ምዕቃን',
      om: 'dhiibbaa dhiigaa safaruu',
      en: 'measuring blood pressure'
    },
    example: 'De dokter meet mijn bloeddruk.',
    bg: '#FEF2F2'
  },
  {
    id: 'bloed_prikken',
    word: 'bloed prikken',
    lemma: 'bloed prikken',
    article: '',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'سحب الدم للفحص المخبري',
      ti: 'ደም ምምርማር',
      om: 'qorannoo dhiigaa gochuu',
      en: 'blood test / blood draw'
    },
    example: 'Ik moet nuchter bloed laten prikken.',
    bg: '#FEF2F2'
  },
  {
    id: 'vaccinatie',
    word: 'de vaccinatie / prik',
    lemma: 'vaccinatie',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'التطعيم / اللقاح',
      ti: 'ክታበት / መርፍእ',
      om: 'talaallii',
      en: 'the vaccine / injection'
    },
    example: 'De baby krijgt een vaccinatie bij het consultatiebureau.',
    bg: '#EFF6FF'
  },
  {
    id: 'spreekuur',
    word: 'het spreekuur',
    lemma: 'spreekuur',
    article: 'het',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'ساعات الاستشارة الطبية',
      ti: 'ሰዓት ምይይጥ ምስ ሓኪም',
      om: 'sa\'aatii yaalaa',
      en: 'consultation hour'
    },
    example: 'Het telefonisch spreekuur is tussen 8 en 9 uur.',
    bg: '#F0FDF4'
  },
  {
    id: 'doorverwijzing',
    word: 'de doorverwijzing',
    lemma: 'doorverwijzing',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'خطاب الإحالة إلى المستشفى',
      ti: 'ናይ ሪፈር ወረቐት',
      om: 'waraqaa darbiinsa yaalaa',
      en: 'referral letter'
    },
    example: 'De huisarts geeft een doorverwijzing naar het ziekenhuis.',
    bg: '#EFF6FF'
  },
  {
    id: 'gaatje_vullen',
    word: 'een gaatje vullen',
    lemma: 'gaatje vullen',
    article: '',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'حشو السن / الضرس',
      ti: 'ጥርስ ምዕጻው (ሕክምና ስኒ)',
      om: 'ilkaan qorichaan guutuu',
      en: 'filling a cavity'
    },
    example: 'De tandarts gaat het gaatje vullen.',
    bg: '#F0F9FF'
  },
  {
    id: 'kies_trekken',
    word: 'een kies trekken',
    lemma: 'kies trekken',
    article: '',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'خلع الضرس',
      ti: 'መንከስ ምምንቋር',
      om: 'ilkaan buqqisuu',
      en: 'tooth extraction'
    },
    example: 'De tandarts moet een ontstoken kies trekken.',
    bg: '#FEF2F2'
  },
  {
    id: 'verdoving',
    word: 'de verdoving',
    lemma: 'verdoving',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'التخدير / البنج الموضعي',
      ti: 'መደንዘዚ',
      om: 'hadoodsaa',
      en: 'anesthesia / numbing'
    },
    example: 'Met een verdoving voel je geen pijn tijdens de behandeling.',
    bg: '#EFF6FF'
  },
  {
    id: 'verpleegkundige',
    word: 'de verpleegkundige',
    lemma: 'verpleegkundige',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'الممرض / الممرضة',
      ti: 'ነርስ / መተሓካሚ',
      om: 'narsii / ogeessa yaalii',
      en: 'the nurse'
    },
    example: 'De verpleegkundige verzorgt de wond.',
    bg: '#F0FDF4'
  },
  {
    id: 'fysiotherapie',
    word: 'de fysiotherapie',
    lemma: 'fysiotherapie',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'العلاج الطبيعي (الفيزيو)',
      ti: 'ፊዝዮተራፒ',
      om: 'yaala fiziooteraapii',
      en: 'the physiotherapy'
    },
    example: 'De fysio helpt bij spier- en rugpijn.',
    bg: '#ECFDF5'
  },
  {
    id: 'oogarts',
    word: 'de oogarts',
    lemma: 'oogarts',
    article: 'de',
    category: 'Huisarts & Tandarts',
    translations: {
      ar: 'طبيب العيون',
      ti: 'ሓኪም ዓይኒ',
      om: 'ogeessa yaala ijaa',
      en: 'the ophthalmologist / eye doctor'
    },
    example: 'De oogarts controleert mijn zicht.',
    bg: '#F0F9FF'
  },

  // ==========================================
  // 16. SOCIALE RELATIES - 12 words
  // ==========================================
  {
    id: 'getrouwd',
    word: 'getrouwd (het huwelijk)',
    lemma: 'getrouwd',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'متزوج / عقد القران',
      ti: 'ምርዑው / መርዓ',
      om: 'kan fuudhe/heerumte',
      en: 'married / marriage'
    },
    example: 'Zij zijn al tien jaar getrouwd.',
    bg: '#FEF3C7'
  },
  {
    id: 'gescheiden',
    word: 'gescheiden',
    lemma: 'gescheiden',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'مطلق',
      ti: 'ዝተፋትሐ',
      om: 'kan hiike/hiiktee',
      en: 'divorced'
    },
    example: 'Zijn ouders zijn gescheiden.',
    bg: '#F8FAFC'
  },
  {
    id: 'partner',
    word: 'de partner',
    lemma: 'partner',
    article: 'de',
    category: 'Sociale Relaties',
    translations: {
      ar: 'الشريك / شريك الحياة',
      ti: 'መሻርኽቲ ህይወት / መጻምዲ',
      om: 'hiriyaa gaa\'elaa / shariika',
      en: 'the partner'
    },
    example: 'Dit is mijn partner.',
    bg: '#FDF2F8'
  },
  {
    id: 'samenwonen',
    word: 'samenwonen',
    lemma: 'samenwonen',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'العيش معاً في نفس المنزل',
      ti: 'ሓቢርካ ምንባር',
      om: 'waliin jiraachuu',
      en: 'living together'
    },
    example: 'Zij wonen samen in een flat.',
    bg: '#FEF2F2'
  },
  {
    id: 'collega',
    word: 'de collega',
    lemma: 'collega',
    article: 'de',
    category: 'Sociale Relaties',
    translations: {
      ar: 'زميل العمل',
      ti: 'መሳርሕቲ',
      om: 'hiriyaa hojii',
      en: 'the coworker / colleague'
    },
    example: 'Mijn collega helpt mij met de taken.',
    bg: '#EFF6FF'
  },
  {
    id: 'verliefd',
    word: 'verliefd',
    lemma: 'verliefd',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'مغرم / واقع في الحب',
      ti: 'ፍቕሪ ዝሓዞ',
      om: 'kan jaallate/jaallatte',
      en: 'in love'
    },
    example: 'Zij zijn smoorverliefd op elkaar.',
    bg: '#FDF2F8'
  },
  {
    id: 'alleenstaand',
    word: 'alleenstaand (single)',
    lemma: 'alleenstaand',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'أعزب / يعيش بمفرده',
      ti: 'ንበይኑ ዝነብር',
      om: 'kophaa kan jiraatu',
      en: 'single / living alone'
    },
    example: 'Zij is een alleenstaande moeder.',
    bg: '#F8FAFC'
  },
  {
    id: 'kennismaken',
    word: 'kennismaken',
    lemma: 'kennismaken',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'التعارف / تقديم النفس',
      ti: 'ምልላይ',
      om: 'wal baruu',
      en: 'getting acquainted / introducing oneself'
    },
    example: 'Aangenaam kennis te maken!',
    bg: '#ECFDF5'
  },
  {
    id: 'op_bezoek',
    word: 'op bezoek gaan',
    lemma: 'op bezoek gaan',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'الذهاب في زيارة / الضيافة',
      ti: 'ምብጻሕ',
      om: 'daawwachuu / mana namaa deemuu',
      en: 'visiting someone'
    },
    example: 'We gaan zaterdag op bezoek bij vrienden.',
    bg: '#FEF3C7'
  },
  {
    id: 'buren',
    word: 'de buren',
    lemma: 'buren',
    article: 'de',
    category: 'Sociale Relaties',
    translations: {
      ar: 'الجيران',
      ti: 'ጎረባብቲ',
      om: 'olloo',
      en: 'the neighbors'
    },
    example: 'Onze buren zijn heel vriendelijk.',
    bg: '#ECFDF5'
  },
  {
    id: 'feliciteren',
    word: 'feliciteren',
    lemma: 'feliciteren',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'التهنئة / يهنئ',
      ti: 'እንቋዕ ሓጎሰካ ምባል',
      om: 'baga gammaddan jechuu',
      en: 'to congratulate'
    },
    example: 'Van harte gefeliciteerd met je verjaardag!',
    bg: '#FEFCE8'
  },
  {
    id: 'afspreken',
    word: 'afspreken (ontmoeten)',
    lemma: 'afspreken',
    article: '',
    category: 'Sociale Relaties',
    translations: {
      ar: 'الاتفاق على موعد للقاء',
      ti: 'ምቛጽር ንምርኻብ',
      om: 'waliin beellama qabaachuu',
      en: 'to meet up'
    },
    example: 'Zullen we morgen om twee uur afspreken?',
    bg: '#EFF6FF'
  },

  // ==========================================
  // 17. EMOTIES & GEVOELENS (Uitbreiding) - 12 words
  // ==========================================
  {
    id: 'trots',
    word: 'trots',
    lemma: 'trots',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'فخور / يشعر بالفخر',
      ti: 'ኩርዓት ዝተሰምዖ',
      om: 'kan boonuu',
      en: 'proud'
    },
    example: 'Ik ben trots dat ik al zoveel Nederlands spreek.',
    bg: '#FEFCE8'
  },
  {
    id: 'zenuwachtig',
    word: 'zenuwachtig / gespannen',
    lemma: 'zenuwachtig',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'متوتر / قلق',
      ti: 'ጭኑቕ / ዝተሸገረ',
      om: 'dhiphataa',
      en: 'nervous / tense'
    },
    example: 'Voor het examen was ik erg zenuwachtig.',
    bg: '#FFF7ED'
  },
  {
    id: 'opgelucht',
    word: 'opgelucht',
    lemma: 'opgelucht',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'مرتاح بعد زوال القلق',
      ti: 'ዝተሃደአ / ዕረፍቲ ዝተሰምዖ',
      om: 'kan boqote',
      en: 'relieved'
    },
    example: 'Wat een opluchting, alles is goed afgelopen!',
    bg: '#ECFDF5'
  },
  {
    id: 'eenzaam',
    word: 'eenzaam',
    lemma: 'eenzaam',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'وحيد / يشعر بالوحدة',
      ti: 'ጽምዋ ዝተሰምዖ',
      om: 'kophaa kan ta\'e',
      en: 'lonely'
    },
    example: 'In het begin voelde hij zich soms eenzaam.',
    bg: '#EFF6FF'
  },
  {
    id: 'enthousiast',
    word: 'enthousiast',
    lemma: 'enthousiast',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'متحمس / مفعم بالحيوية',
      ti: 'ውዕዉዕ / ድሉው',
      om: 'kaka\'umsa qabaachuu',
      en: 'enthusiastic'
    },
    example: 'De studenten zijn erg enthousiast over de cursus.',
    bg: '#FEFCE8'
  },
  {
    id: 'verlegen',
    word: 'verlegen',
    lemma: 'verlegen',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'خجول / يستحي',
      ti: 'ሓፋር',
      om: 'saalfataa',
      en: 'shy'
    },
    example: 'Het kindje is nog een beetje verlegen.',
    bg: '#FDF2F8'
  },
  {
    id: 'verrast',
    word: 'verrast',
    lemma: 'verrast',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'متفاجئ / مندهش',
      ti: 'ዝተገረመ',
      om: 'kan dinqisiifate',
      en: 'surprised'
    },
    example: 'Ik was blij verrast met het mooie cadeau.',
    bg: '#EFF6FF'
  },
  {
    id: 'teleurgesteld',
    word: 'teleurgesteld',
    lemma: 'teleurgesteld',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'خائب الأمل / محبط',
      ti: 'ተስፋ ዝቖረጸ',
      om: 'kan abdii kute',
      en: 'disappointed'
    },
    example: 'Hij was teleurgesteld dat de trein niet reed.',
    bg: '#F8FAFC'
  },
  {
    id: 'dankbaar',
    word: 'dankbaar',
    lemma: 'dankbaar',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'ممتن / شاكر',
      ti: 'ኣመስጋኒ',
      om: 'galateeffataa',
      en: 'grateful'
    },
    example: 'We zijn dankbaar voor alle hulp.',
    bg: '#ECFDF5'
  },
  {
    id: 'heimwee',
    word: 'de heimwee',
    lemma: 'heimwee',
    article: 'de',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'الحنين إلى الوطن والأهل',
      ti: 'ናፍቖት ዓዲ',
      om: 'yaaddoo biyya ofii',
      en: 'homesickness'
    },
    example: 'Soms heb ik een beetje heimwee naar mijn geboorteland.',
    bg: '#EFF6FF'
  },
  {
    id: 'nieuwsgierig',
    word: 'nieuwsgierig',
    lemma: 'nieuwsgierig',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'فضولي / محب للمعرفة',
      ti: 'ፈታው ፍልጠት',
      om: 'fedhii baruu qabaachuu',
      en: 'curious'
    },
    example: 'Kinderen zijn van nature heel nieuwsgierig.',
    bg: '#FEFCE8'
  },
  {
    id: 'geduldig',
    word: 'geduldig',
    lemma: 'geduldig',
    article: '',
    category: 'Communicatie & Gevoelens',
    translations: {
      ar: 'صبور',
      ti: 'ዕጉስ',
      om: 'obsaa',
      en: 'patient'
    },
    example: 'De docent legt alles rustig en geduldig uit.',
    bg: '#F0FDF4'
  },

  // ==========================================
  // 18. POLITIEK & DEMOCRATIE IN NEDERLAND - 11 words
  // ==========================================
  {
    id: 'democratie',
    word: 'de democratie',
    lemma: 'democratie',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'الديمقراطية',
      ti: 'ዲሞክራሲ',
      om: 'diimokiraasii',
      en: 'democracy'
    },
    example: 'Nederland is een parlementaire democratie.',
    bg: '#EFF6FF'
  },
  {
    id: 'stemmen_verkiezingen',
    word: 'het stemmen (de verkiezingen)',
    lemma: 'stemmen',
    article: 'het',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'التصويت / الانتخابات بالصندوق والقلم الأحمر',
      ti: 'ድምጺ ምሃብ / ምርጫ',
      om: 'sagalee kennuu / filannoo',
      en: 'voting / elections'
    },
    example: 'In Nederland stem je met een rood potlood.',
    bg: '#FEF2F2'
  },
  {
    id: 'tweede_kamer',
    word: 'de Tweede Kamer (het parlement)',
    lemma: 'Tweede Kamer',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'مجلس النواب الهولندي (البرلمان)',
      ti: 'ቤት ምኽሪ ነዘርላንድ (ፓርላማ)',
      om: 'mana marii bakka bu\'ootaa',
      en: 'House of Representatives (Parliament)'
    },
    example: 'De Tweede Kamer telt 150 volksvertegenwoordigers.',
    bg: '#EFF6FF'
  },
  {
    id: 'koning',
    word: 'de koning (Willem-Alexander)',
    lemma: 'koning',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'الملك (رئيس الدولة الدستوري)',
      ti: 'ንጉስ',
      om: 'mootii',
      en: 'the king'
    },
    example: 'Koning Willem-Alexander is het staatshoofd.',
    bg: '#FFF7ED'
  },
  {
    id: 'grondwet',
    word: 'de grondwet (Artikel 1)',
    lemma: 'grondwet',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'الدستور (المادة الأولى: منع التمييز)',
      ti: 'ቅዋም / ሕገ-መንግስቲ',
      om: 'heera mootummaa',
      en: 'the constitution'
    },
    example: 'Artikel 1 van de grondwet verbiedt discriminatie.',
    bg: '#EFF6FF'
  },
  {
    id: 'vrijheid_meningsuiting',
    word: 'de vrijheid van meningsuiting',
    lemma: 'vrijheid van meningsuiting',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'حرية التعبير والرأي',
      ti: 'ናጽነት ሓሳብካ ምግላጽ',
      om: 'mirga yaada ofii ibsachuu',
      en: 'freedom of speech'
    },
    example: 'Iedereen heeft het recht zijn mening te uiten.',
    bg: '#EFF6FF'
  },
  {
    id: 'gelijkheid',
    word: 'de gelijkheid',
    lemma: 'gelijkheid',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'المساواة بين جميع الناس',
      ti: 'ማዕርነት',
      om: 'walqixxummaa',
      en: 'equality'
    },
    example: 'Mannen en vrouwen zijn gelijk voor de wet.',
    bg: '#ECFDF5'
  },
  {
    id: 'minister_president',
    word: 'de minister-president (premier)',
    lemma: 'minister-president',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'رئيس الوزراء',
      ti: 'ቀዳማይ ሚኒስተር',
      om: 'muummicha ministeeraa',
      en: 'the Prime Minister'
    },
    example: 'De premier leidt de regering.',
    bg: '#EFF6FF'
  },
  {
    id: 'burgemeester',
    word: 'de burgemeester',
    lemma: 'burgemeester',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'عمدة المدينة / رئيس البلدية',
      ti: 'ከንቲባ',
      om: 'kantiibaa',
      en: 'the mayor'
    },
    example: 'De burgemeester is het hoofd van de gemeente.',
    bg: '#F8FAFC'
  },
  {
    id: 'wet',
    word: 'de wet',
    lemma: 'wet',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'القانون',
      ti: 'ሕጊ',
      om: 'seera',
      en: 'the law'
    },
    example: 'Iedereen moet zich aan de wet houden.',
    bg: '#FFFBEB'
  },
  {
    id: 'demonstratie',
    word: 'de demonstratie / het protest',
    lemma: 'demonstratie',
    article: 'de',
    category: 'Politiek & Democratie',
    translations: {
      ar: 'المظاهرة السلمية / الاحتجاج',
      ti: 'ሰላማዊ ሰልፊ',
      om: 'hiriira nagaa',
      en: 'demonstration / protest'
    },
    example: 'Demonstreren is een grondrecht in Nederland.',
    bg: '#FEF2F2'
  },

  // ==========================================
  // 19. DRANKEN - 8 words
  // ==========================================
  {
    id: 'sinaasappelsap',
    word: 'het sinaasappelsap (jus d\'orange)',
    lemma: 'sinaasappelsap',
    article: 'het',
    category: 'Dranken',
    translations: {
      ar: 'عصير البرتقال الطازج',
      ti: 'ጽማቝ ኣራንሺ',
      om: 'cuunfaa burtukaanaa',
      en: 'orange juice'
    },
    example: 'Een vers geperst glas sinaasappelsap.',
    bg: '#FFF7ED'
  },
  {
    id: 'appelsap',
    word: 'het appelsap',
    lemma: 'appelsap',
    article: 'het',
    category: 'Dranken',
    translations: {
      ar: 'عصير التفاح',
      ti: 'ጽማቝ ቱፋሕ',
      om: 'cuunfaa appilii',
      en: 'apple juice'
    },
    example: 'Kinderen drinken graag appelsap.',
    bg: '#FEFCE8'
  },
  {
    id: 'water_prik',
    word: 'het water met prik (bruiswater)',
    lemma: 'water met prik',
    article: 'het',
    category: 'Dranken',
    translations: {
      ar: 'ماء غازي فوار',
      ti: 'ጋዝ ዘለዎ ማይ',
      om: 'bishaan gaazii qabu',
      en: 'sparkling water'
    },
    example: 'Wilt u water met of zonder prik?',
    bg: '#F0F9FF'
  },
  {
    id: 'water_zonder_prik',
    word: 'het water zonder prik (plat water)',
    lemma: 'water zonder prik',
    article: 'het',
    category: 'Dranken',
    translations: {
      ar: 'ماء طبيعي بدون غاز',
      ti: 'ዘይተጋዘወ ማይ',
      om: 'bishaan gaazii hin qabne',
      en: 'still water'
    },
    example: 'Een karaf koud water zonder prik.',
    bg: '#F0F9FF'
  },
  {
    id: 'muntthee',
    word: 'de verse muntthee',
    lemma: 'muntthee',
    article: 'de',
    category: 'Dranken',
    translations: {
      ar: 'شاي النعناع الطازج',
      ti: 'ሻሂ ምስ ናዕናዕ',
      om: 'shaayii qullubbii adii/naana\'aa',
      en: 'fresh mint tea'
    },
    example: 'Verse muntthee met een lepeltje honing.',
    bg: '#ECFDF5'
  },
  {
    id: 'warme_chocomel',
    word: 'de warme chocolademelk',
    lemma: 'warme chocolademelk',
    article: 'de',
    category: 'Dranken',
    translations: {
      ar: 'حليب الشوكولاتة الساخن مع الكريمة',
      ti: 'ውዑይ ቸኮላታ ጸባ',
      om: 'aannan chokoleettii hoo\'aa',
      en: 'hot chocolate milk'
    },
    example: 'Warme chocolademelk met slagroom in de winter.',
    bg: '#FFFBEB'
  },
  {
    id: 'koffie_verkeerd',
    word: 'de koffie verkeerd (cappuccino)',
    lemma: 'koffie verkeerd',
    article: 'de',
    category: 'Dranken',
    translations: {
      ar: 'قهوة بالحليب الكثير (لاتيه)',
      ti: 'ቡን ምስ ብዙሕ ጸባ',
      om: 'buna aannan baay\'ee qabu',
      en: 'latte / coffee with lots of milk'
    },
    example: 'In een koffie verkeerd zit meer melk dan koffie.',
    bg: '#FFFBEB'
  },
  {
    id: 'frisdrank',
    word: 'de frisdrank (cola / fanta)',
    lemma: 'frisdrank',
    article: 'de',
    category: 'Dranken',
    translations: {
      ar: 'المشروبات الغازية (كولا)',
      ti: 'ልስሉስ መስተ',
      om: 'dhugaatii lallaafaa',
      en: 'soft drink / soda'
    },
    example: 'Een blikje koude frisdrank.',
    bg: '#FEF2F2'
  },

  // ==========================================
  // 20. GETALLEN (Uitbreiding) - 10 words
  // ==========================================
  {
    id: 'elf',
    word: 'elf (11)',
    lemma: 'elf',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'أحد عشر (١١)',
      ti: 'ዓሰርተው ሓደ (11)',
      om: 'kudha tokko (11)',
      en: 'eleven (11)'
    },
    example: 'Er zitten elf spelers in een voetbalteam.',
    bg: '#EFF6FF'
  },
  {
    id: 'twaalf',
    word: 'twaalf (12)',
    lemma: 'twaalf',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'اثنا عشر (١٢)',
      ti: 'ዓሰርተው ክልተ (12)',
      om: 'kudha lama (12)',
      en: 'twelve (12)'
    },
    example: 'Een jaar heeft twaalf maanden.',
    bg: '#EFF6FF'
  },
  {
    id: 'dertien',
    word: 'dertien (13)',
    lemma: 'dertien',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'ثلاثة عشر (١٣)',
      ti: 'ዓሰርተው ሰለስተ (13)',
      om: 'kudha sadii (13)',
      en: 'thirteen (13)'
    },
    example: 'Dertien euro en vijftig cent.',
    bg: '#EFF6FF'
  },
  {
    id: 'twintig',
    word: 'twintig (20)',
    lemma: 'twintig',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'عشرون (٢٠)',
      ti: 'ዕስራ (20)',
      om: 'digdama (20)',
      en: 'twenty (20)'
    },
    example: 'Een briefje van twintig euro.',
    bg: '#EFF6FF'
  },
  {
    id: 'dertig',
    word: 'dertig (30)',
    lemma: 'dertig',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'ثلاثون (٣٠)',
      ti: 'ሰላሳ (30)',
      om: 'soddoma (30)',
      en: 'thirty (30)'
    },
    example: 'Dertig dagen in de maand april.',
    bg: '#EFF6FF'
  },
  {
    id: 'vijftig',
    word: 'vijftig (50)',
    lemma: 'vijftig',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'خمسون (٥٠)',
      ti: 'ሓምሳ (50)',
      om: 'shantama (50)',
      en: 'fifty (50)'
    },
    example: 'Vijftig kilometer per uur.',
    bg: '#EFF6FF'
  },
  {
    id: 'duizend',
    word: 'duizend (1000)',
    lemma: 'duizend',
    article: '',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'ألف (١٠٠٠)',
      ti: 'ሽሕ (1000)',
      om: 'kuma (1000)',
      en: 'one thousand (1000)'
    },
    example: 'Duizend dank voor uw goede hulp!',
    bg: '#ECFDF5'
  },
  {
    id: 'eerste',
    word: 'de eerste (1e)',
    lemma: 'eerste',
    article: 'de',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'الأول (المرتبة الأولى)',
      ti: 'ቀዳማይ (1ይ)',
      om: 'tokkoffaa (1ffaa)',
      en: 'the first (1st)'
    },
    example: 'De eerste dag van de maand.',
    bg: '#FEFCE8'
  },
  {
    id: 'tweede',
    word: 'de tweede (2e)',
    lemma: 'tweede',
    article: 'de',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'الثاني',
      ti: 'ካልኣይ (2ይ)',
      om: 'lammaffaa (2ffaa)',
      en: 'the second (2nd)'
    },
    example: 'Het kantoor is op de tweede verdieping.',
    bg: '#EFF6FF'
  },
  {
    id: 'derde',
    word: 'de derde (3e)',
    lemma: 'derde',
    article: 'de',
    category: 'Getallen & Kleuren',
    translations: {
      ar: 'الثالث',
      ti: 'ሳልሳይ (3ይ)',
      om: 'sadaffaa (3ffaa)',
      en: 'the third (3rd)'
    },
    example: 'Neem de derde afslag op de rotonde.',
    bg: '#EFF6FF'
  }
];
