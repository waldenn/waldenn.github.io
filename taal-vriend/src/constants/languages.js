export const LANGUAGES = {
  ar: { name: 'العربية', englishName: 'Standaard Arabisch', flag: '🇸🇦', rtl: true },
  syr: { name: 'السورية (شامي)', englishName: 'Syrisch', flag: '🇸🇾', rtl: true },
  ti: { name: 'ትግርኛ', englishName: 'Tigrinya', flag: '🇪🇷', rtl: false },
  om: { name: 'Afaan Oromoo', englishName: 'Oromo', flag: '🇪🇹', rtl: false },
  so: { name: 'Soomaali', englishName: 'Somalisch', flag: '🇸🇴', rtl: false },
  en: { name: 'English', englishName: 'Engels', flag: '🇬🇧', rtl: false }
};

export const APPS = {
  woorden: {
    id: 'woorden',
    name: 'Woorden Leren',
    translations: { ar: 'تعلم الكلمات', syr: 'تعلم الكلمات', ti: 'ቃላት ምምሃር', om: 'Jechoota Barachuu', so: 'Barashada Erayada', en: 'Learn Words' },
    icon: '📖',
    badge: '1.700+ Woorden',
    description: 'Reeks van regels met kolommen: beeld, lidwoord, Nederlandse woorden, vertalingen en vertaalde voorbeeldzinnen.'
  },
  zinnen: {
    id: 'zinnen',
    name: 'Zinnen Oefenen',
    translations: { ar: 'ممارسة الجمل', syr: 'تدريب على الجمل', ti: 'ምስላታትን ሓረጋትን ምልምማድ', om: 'Hima Shaakaluu', so: 'Barashada Jumladdaha', en: 'Practice Sentences' },
    icon: '💬',
    badge: '650+ Zinnen',
    description: 'Oefen praktische zinnen afgestemd op ERK-taalniveaus (Pre-A1 t/m C2) met vertalingen.'
  },
  luisteren: {
    id: 'luisteren',
    name: 'Luistervaardigheid',
    translations: { ar: 'مهارة الاستماع', syr: 'مهارة الاستماع والسمع', ti: 'ናይ ምስማዕ ክእለት', om: 'Dandeettii Dhaggeeffannaa', so: 'Fahamka Dhageysiga', en: 'Listening Comprehension' },
    icon: '🎧',
    badge: '150+ Teksten',
    description: 'Luister naar korte teksten (max 5 regels) zonder tekst direct te zien. Druk op SPATIE om te luisteren.'
  },
  reageer: {
    id: 'reageer',
    name: 'Luister en Reageer',
    translations: { ar: 'استمع وأجب', syr: 'اسمع وجاوب', ti: 'ስማዕን መልስን', om: 'Dhaggeeffadhuu Deebisi', so: 'Dhageyso oo Ka Jawaab', en: 'Listen & Respond' },
    icon: '🎯',
    badge: '700+ Vragen',
    description: 'Luister naar gesproken situaties en kies de beste Nederlandse reactie. Directe uitleg in moedertaal.'
  },
  klok: {
    id: 'klok',
    name: 'Klok Kijken',
    translations: { ar: 'قراءة الساعة', syr: 'قراءة الساعة', ti: 'ሰዓት ምፍላጥ', om: "Sa'aatii Ilaaluu", so: 'Akhrinta Saacadda', en: 'Telling Time' },
    icon: '⏰',
    badge: '144 Tijden',
    description: 'Oefen analoog klokkijken in intervallen van 5 minuten met interactieve onthulling.'
  },
  alphabet: {
    id: 'alphabet',
    name: 'Alfabet & Klanken',
    translations: { ar: 'الأبجدية والأصوات', syr: 'الأحرف والأصوات', ti: 'ፊደላትን ድምጽታትን', om: 'Qubee fi Sagalee', so: 'Xarfaha iyo Dhawaaqyada', en: 'Alphabet & Sounds' },
    icon: '🔤',
    badge: '38 Klanken & Letters',
    description: 'Ontdek letters en speciale Nederlandse klanken (ui, oe, eu, ij, etc.) met klikbare voorbeeldwoorden en vertalingen.'
  }
};

export const CEFR_LEVEL_IDS = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const CEFR_LEVELS = [
  { id: 'Pre-A1', name: 'Instap', label: 'Instap', desc: 'Absolute beginner (Eerste kennismaking & basis)', colorClass: 'orange', color: 'orange' },
  { id: 'A1', name: 'Basis', label: 'Basis', desc: 'Basisgebruiker (Alledaagse eenvoudige zinnen)', colorClass: 'green', color: 'green' },
  { id: 'A2', name: 'Praktijk', label: 'Praktijk', desc: 'Basisgebruiker gevorderd (Dagelijks leven, dokter, OV)', colorClass: 'blue', color: 'blue' },
  { id: 'B1', name: 'Gevorderd', label: 'Gevorderd', desc: 'Onafhankelijk (Werk, school, gemeente & brieven)', colorClass: 'teal', color: 'teal' },
  { id: 'B2', name: 'Zelfstandig', label: 'Zelfstandig', desc: 'Zelfstandig gevorderd (Recht, politiek & complexe zaken)', colorClass: 'purple', color: 'purple' },
  { id: 'C1', name: 'Vloeiend', label: 'Vloeiend', desc: 'Vaardig (Academisch, professioneel & nuance)', colorClass: 'indigo', color: 'indigo' },
  { id: 'C2', name: 'Meesterschap', label: 'Meesterschap', desc: 'Meesterschap (Volledige beheersing op moedertaalniveau)', colorClass: 'crimson', color: 'crimson' }
];

export const CEFR_META = {
  'Pre-A1': { id: 'Pre-A1', name: 'Instap', label: 'Instap', desc: 'Absolute beginner (Eerste kennismaking & basis)', colorClass: 'orange', color: 'orange' },
  'A1': { id: 'A1', name: 'Basis', label: 'Basis', desc: 'Basisgebruiker (Alledaagse eenvoudige zinnen)', colorClass: 'green', color: 'green' },
  'A2': { id: 'A2', name: 'Praktijk', label: 'Praktijk', desc: 'Basisgebruiker gevorderd (Dagelijks leven, dokter, OV)', colorClass: 'blue', color: 'blue' },
  'B1': { id: 'B1', name: 'Gevorderd', label: 'Gevorderd', desc: 'Onafhankelijk (Werk, school, gemeente & brieven)', colorClass: 'teal', color: 'teal' },
  'B2': { id: 'B2', name: 'Zelfstandig', label: 'Zelfstandig', desc: 'Zelfstandig gevorderd (Recht, politiek & complexe zaken)', colorClass: 'purple', color: 'purple' },
  'C1': { id: 'C1', name: 'Vloeiend', label: 'Vloeiend', desc: 'Vaardig (Academisch, professioneel & nuance)', colorClass: 'indigo', color: 'indigo' },
  'C2': { id: 'C2', name: 'Meesterschap', label: 'Meesterschap', desc: 'Meesterschap (Volledige beheersing op moedertaalniveau)', colorClass: 'crimson', color: 'crimson' }
};

export const AVAILABLE_FONTS = [
  { name: 'IBM Plex Sans Condensed (Standaard)', family: "'IBM Plex Sans Condensed', sans-serif" },
  { name: 'Engineered Compact Sans', family: "'Engineered Compact Sans', 'IBM Plex Sans Condensed', sans-serif" },
  { name: 'Outfit (Modern & Rond)', family: "'Outfit', sans-serif" },
  { name: 'Plus Jakarta Sans (Zeer helder)', family: "'Plus Jakarta Sans', sans-serif" },
  { name: 'Inter (Technisch & Neutraal)', family: "'Inter', sans-serif" },
  { name: 'Manrope (Zacht geometrisch)', family: "'Manrope', sans-serif" },
  { name: 'Noto Sans (Universeel)', family: "'Noto Sans', sans-serif" },
  { name: 'Capriola (Speels & Vriendelijk)', family: "'Capriola', sans-serif" },
  { name: 'Michroma (Futuristisch)', family: "'Michroma', sans-serif" },
  { name: 'Space Grotesk (Modern monospaced look)', family: "'Space Grotesk', sans-serif" },
  { name: 'Syne (Kunstzinnig & Uitgesproken)', family: "'Syne', sans-serif" },
  { name: 'Urbanist (Geometrisch strak)', family: "'Urbanist', sans-serif" },
  { name: 'Lekton (Typemachine-stijl)', family: "'Lekton', monospace" },
  { name: 'Lora (Klassiek & Warm)', family: "'Lora', serif" },
  { name: 'Cormorant Garamond (Traditioneel)', family: "'Cormorant Garamond', serif" },
  { name: 'Source Serif 4 (Leesbaar serif)', family: "'Source Serif 4', serif" },
  { name: 'DM Sans (Compact & Minimalistisch)', family: "'DM Sans', sans-serif" }
];
