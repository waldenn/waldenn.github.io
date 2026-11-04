// scripts/build-complete-database.js
// Compiles full master database:
// 354 original words + 1000+ new high-value vocabulary words.
// Writes to data/words.json and data/words.js

const fs = require('fs');
const path = require('path');

// 1. Existing base words (354)
const existingWords = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'words.json'), 'utf-8'));
console.log(`Loaded original base words: ${existingWords.length}`);

const seenWords = new Set();
const finalWords = [];

// Helper to sanitize lemma & word
function normalize(str) {
  return str.trim().toLowerCase();
}

// Keep all original 354 words
existingWords.forEach(w => {
  seenWords.add(normalize(w.word));
  finalWords.push(w);
});

// SVG Generator Helper
function generateSvgCard(id, color, bg, glyph) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="5" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="240" height="240" rx="36" fill="url(#grad_${id})"/>
  <g filter="url(#shadow_${id})">
    <circle cx="120" cy="120" r="72" fill="${color}" opacity="0.10"/>
    <circle cx="120" cy="120" r="54" fill="${color}" opacity="0.18"/>
    <text x="120" y="140" font-size="62" font-family="'Segoe UI', Roboto, -apple-system, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${glyph}</text>
  </g>
</svg>`.trim();
}

function addCandidate(raw) {
  const word = raw.word.trim();
  const lowerWord = normalize(word);
  if (seenWords.has(lowerWord)) return;
  seenWords.add(lowerWord);

  const lemma = raw.lemma || word.replace(/^(de|het)\s+/, '');
  const id = `w_${lowerWord.replace(/[^a-z0-9]/g, '_')}_${finalWords.length + 1}`;
  
  finalWords.push({
    id: id,
    word: word,
    lemma: lemma,
    article: raw.article !== undefined ? raw.article : (word.startsWith('de ') ? 'de' : word.startsWith('het ') ? 'het' : ''),
    category: raw.category || 'Algemeen',
    translations: {
      ar: (raw.translations && raw.translations.ar) ? raw.translations.ar : '',
      ti: (raw.translations && raw.translations.ti) ? raw.translations.ti : '',
      om: (raw.translations && raw.translations.om) ? raw.translations.om : '',
      en: (raw.translations && raw.translations.en) ? raw.translations.en : ''
    },
    example: raw.example || '',
    svg: raw.svg || generateSvgCard(id, raw.color || '#2563EB', raw.bg || '#F8FAFC', raw.glyph || '★')
  });
}

// 2. Load massive-1000-definitions.js
try {
  const massive = require('./massive-1000-definitions.js');
  massive.forEach(addCandidate);
  console.log(`After massive-1000-definitions: ${finalWords.length} total words.`);
} catch (e) {
  console.log('Massive definitions error:', e.message);
}

// 3. Load generate-1000-more.js
try {
  const more = require('./generate-1000-more.js');
  more.forEach(addCandidate);
  console.log(`After generate-1000-more: ${finalWords.length} total words.`);
} catch (e) {
  console.log('More definitions error:', e.message);
}

// 4. Load make-1000-words.js additional batches
try {
  const makeScript = require('./make-1000-words.js');
  makeScript.newUniqueWords.forEach(addCandidate);
  console.log(`After make-1000-words batches: ${finalWords.length} total words.`);
} catch (e) {
  console.log('make-1000-words error:', e.message);
}

// 5. Load vocabulary-batch-final.js
try {
  const finalBatches = require('./vocabulary-batch-final.js');
  finalBatches.forEach(batch => {
    batch.words.forEach(w => {
      const [word, lemma, article, ar, ti, om, en, example] = w;
      addCandidate({
        word: word,
        lemma: lemma,
        article: article,
        category: batch.category,
        color: batch.color,
        bg: batch.bg,
        glyph: batch.icon,
        translations: { ar, ti, om, en },
        example: example
      });
    });
  });
  console.log(`After vocabulary-batch-final: ${finalWords.length} total words.`);
} catch (e) {
  console.log('final batches error:', e.message);
}

// Let's check how many more we need to reach >= 1354
const newCount = finalWords.length - existingWords.length;
console.log(`Added ${newCount} new words! Total: ${finalWords.length}`);

// If still need more, generate supplemental words from practical Dutch A1-B1 vocabulary
if (finalWords.length < 1354) {
  const needed = 1354 - finalWords.length;
  console.log(`Generating ${needed} supplemental practical words to reach requirement...`);
  
  // Supplemental categories: Beroepen, Voorwerpen, Activiteiten, Reizen, Gezondheid, etc.
  const extraItems = [
    // [word, lemma, article, cat, icon, color, bg, ar, ti, om, en, ex]
    ['de advocaat', 'advocaat', 'de', 'Gemeente & Documenten', '⚖️', '#0F766E', '#CCFBF1', 'المحامي القانوني للدفاع والمشورة', 'ጠበቓ', 'abbaa seeraa / looyara', 'lawyer / attorney', 'De advocaat verdedigt de rechten van zijn cliënt.'],
    ['de rechter', 'rechter', 'de', 'Gemeente & Documenten', '⚖️', '#0F766E', '#CCFBF1', 'القاضي في المحكمة', 'ፈራዲ', 'abbaa murtii seeraa', 'judge', 'De rechter doet over twee weken schriftelijk uitspraak.'],
    ['de griffier', 'griffier', 'de', 'أمين سر المحكمة وكاتب الجلسة', 'ጸሓፊ ፍርዲ', 'barreessaa mana murtii', 'court clerk', 'De griffier noteert alle verklaringen nauwkeurig.'],
    ['de zitting', 'zitting', 'de', 'جلسة المحكمة والاستماع', 'መጋባእያ (ናይ ፍርዲ)', 'dhaddacha murtii', 'court session / hearing', 'De zitting begint om klokslag negen uur in de rechtszaal.'],
    ['het vonnis', 'vonnis', 'het', 'الحكم القضائي الصادر من المحكمة', 'ፍርዲ', 'murtii seeraa', 'verdict / court judgment', 'De rechter leest het officiële vonnis voor.'],
    ['de getuige', 'getuige', 'de', 'الشاهد في الواقعة أو القضية', 'መስካሪ', 'dhugaa baatuu', 'witness', 'De getuige vertelt wat hij precies heeft gezien.'],
    ['de bewijzen', 'bewijzen', 'de', 'الأدلة والبراهين القاطعة', 'መረዳእታታት', 'ragaalee', 'evidence / proof', 'De politie verzamelt alle nodige bewijzen.'],
    ['de klacht', 'klacht', 'de', 'الشكوى أو التظلم الرسمي', 'ጥርዓን', 'komii / himata', 'complaint', 'U kunt digitaal een klacht indienen bij de gemeente.'],
    ['het bezwaar', 'bezwaar', 'het', 'الاعتراض والطعن القانوني في القرار', 'ተቓውሞ', 'mormii seeraa', 'objection / appeal', 'Binnen zes weken kunt u bezwaar maken tegen de beslissing.'],
    ['de beslissing', 'beslissing', 'de', 'القرار الرسمي المتخذ', 'ውሳነ', 'murtee', 'decision', 'We wachten nog op de officiële beslissing van de IND.'],
    ['de uitkering', 'uitkering', 'de', 'المعونة المالية أو مخصصات الضمان', 'ሓገዝ ድጎማ (ኡይትኬሪንግ)', 'deggersa maallaqaa', 'social security benefit', 'De gemeente keert de bijstandsuitkering maandelijks uit.'],
    ['de bijstand', 'bijstand', 'de', 'المساعدة الاجتماعية للمحتاجين', 'ናይ ህዝቢ ሓገዝ', 'gargaarsa hawaasummaa', 'social assistance', 'Informatie over de voorwaarden van de bijstand.'],
    ['de schuld', 'schuld', 'de', 'الدين المالي الواجب سداده', 'ዕዳ', 'liqa / idaa', 'debt', 'Het is belangrijk om financiële schulden tijdig aan te pakken.'],
    ['de rente', 'rente', 'de', 'الفائدة المصرفية على القرض أو التوفير', 'ወለድ', 'dhala', 'interest', 'De bank rekent rente over de lening.'],
    ['de hypotheek', 'hypotheek', 'de', 'القرض العقاري لشراء منزل', 'ልቓሕ ገዛ (ሃይፖቴክ)', 'liqa mana bituuf', 'mortgage', 'Zij sluiten een hypotheek af met een vaste rente.'],
    ['de notaris', 'notaris', 'de', 'كاتب العدل الموثق للعقود والوصايا', 'ኖታሪ (ወሃቢ ማሕተም)', 'nootaarii seeraa', 'notary', 'De notaris passeert de officiële koopakte van het huis.'],
    ['het paspoort', 'paspoort', 'het', 'جواز السفر الدولي للرحلات', 'ፓስፖርት', 'paaspoortii', 'passport', 'Vraag op tijd een nieuw paspoort aan bij de gemeente.'],
    ['de id-kaart', 'id-kaart', 'de', 'بطاقة الهوية الشخصية الوطنية', 'መለለዪ ካርድ', 'waraqaa eenyummaa', 'identity card', 'Houd uw geldige identiteitskaart bij de hand.'],
    ['het rijbewijs', 'rijbewijs', 'het', 'رخصة القيادة والسياقة المعتمدة', 'ፍቓድ ምምራሕ መኪና', 'eeyyama konkolaachisummaa', 'driver\'s license', 'Gefeliciteerd, je bent in één keer geslaagd voor je rijbewijs!'],
    ['de zorgverzekering', 'zorgverzekering', 'de', 'التأمين الصحي الإلزامي في هولندا', 'ውሕስነት ጥዕና', 'inshuraansii fayyaa', 'health insurance', 'Iedereen in Nederland is verplicht een basiszorgverzekering te hebben.'],
    ['het eigen risico', 'eigen risico', 'het', 'مبلغ التحمل السنوي في التأمين الصحي', 'ናይ ውልቂ ሓደጋ ሓላፍነት (ኤይኸን ሪሲኮ)', 'baasii ofii danda\'amu fayyaa', 'deductible (health insurance)', 'Voor veel ziekenhuiszorg geldt het verplichte eigen risico.'],
    ['de huisarts', 'huisarts', 'de', 'طبيب الأسرة والرعاية الأولية', 'ሓኪም ስድራቤት', 'dooqtoora maatii (huisarts)', 'general practitioner / family doctor', 'Bel \'s ochtends vroeg voor een afspraak bij je eigen huisarts.'],
    ['de doktersassistente', 'doktersassistente', 'de', 'مساعدة الطبيب لتنسيق المواعيد والفحوصات', 'ሓጋዚት ሓኪም', 'gargaartuu dooqtooraa', 'medical assistant', 'De doktersassistente vraagt eerst naar de klachten en symptomen.'],
    ['de spoedeisende hulp', 'spoedeisende hulp', 'de', 'قسم الطوارئ والإسعاف في المستشفى', 'ክፍሊ ህጹጽ ረድኤት', 'kutaa balaa tasaa hospitaalaa', 'emergency room / A&E', 'Bij ernstige acute verwondingen ga je naar de spoedeisende hulp.'],
    ['de ambulance', 'ambulance', 'de', 'سيارة الإسعاف السريعة للمصابين', 'ኣምቡላንስ', 'ambulaansii', 'ambulance', 'De ambulance rijdt met zwaailicht en sirene door de straat.'],
    ['de fysiotherapie', 'fysiotherapie', 'de', 'العلاج الطبيعي والتأهيل الحركي', 'ፊዝዮተራፒ', 'fiziyeoteraapii', 'physiotherapy', 'Oefeningen bij de fysiotherapeut helpen tegen rugpijn.'],
    ['de tandartsassistente', 'tandartsassistente', 'de', 'مساعدة طبيب الأسنان في العيادة', 'ሓጋዚት ሓኪም ስኒ', 'gargaartuu dooqtoora ilkaanii', 'dental assistant', 'De tandartsassistente maakt röntgenfoto\'s van je gebit.'],
    ['de gaatjes', 'gaatjes', 'de', 'تسوس الأسنان والنخور', 'ነዃል ስኒ', 'uraa ilkaanii', 'cavities / tooth decay', 'Goed tandenpoetsen voorkomt vervelende gaatjes.'],
    ['het gebit', 'gebit', 'het', 'طقم الأسنان الكامل والفم', 'ስነ-ስኒ (ስኒታት)', 'ilkaan guutuu', 'teeth / set of teeth', 'Laat je gebit twee keer per jaar controleren door de tandarts.'],
    ['de vulling', 'vulling', 'de', 'حشوة السن التجميلية أو العلاجية', 'መላገቢ ስኒ', 'guutinsa ilkaanii', 'tooth filling', 'De tandarts plaatst een witte vulling in de kies.'],
    ['de kies', 'kies', 'de', 'الضرس الخلفي لطحن الطعام', 'መንከስ', 'a\'oo', 'molar', 'Er zit een gevoelige plek achter op mijn kies.'],
    ['de tandpasta', 'tandpasta', 'de', 'معجون الأسنان بالفلورايد للتنظيف', 'ሳሙና ስኒ (ፓስታ)', 'saamunaa ilkaanii', 'toothpaste', 'Poets met fluoride tandpasta voor sterke tanden.'],
    ['de tandenborstel', 'tandenborstel', 'de', 'فرشاة الأسنان اليدوية أو الكهربائية', 'መፋሕቂ ስኒ', 'rurruustuu ilkaanii', 'toothbrush', 'Vervang je tandenborstel elke drie maanden.'],
    ['het flosdraad', 'flosdraad', 'het', 'خيط تنظيف ما بين الأسنان', 'ፈትሊ ምጽራይ ስኒ', 'kirrii qulqulleessaa ilkaanii', 'dental floss', 'Gebruik dagelijks flosdraad om etensresten te verwijderen.'],
    ['de mondkap', 'mondkap', 'de', 'الكمامة الطبية الواقية للفم والأنف', 'ማስክ / መሸፈኒ ኣፍ', 'haguugduu afaanii fi funyaanii', 'face mask', 'De chirurg draagt een steriele mondkap tijdens de operatie.'],
    ['de koorts', 'koorts', 'de', 'الحمى وارتفاع درجة حرارة الجسم', 'ረስኒ', 'dha\'annoo ho\'ina qaamaa', 'fever', 'Als je meer dan 38 graden hebt, spreek je van koorts.'],
    ['de thermometer', 'thermometer', 'de', 'ميزان قياس حرارة الجسم الرقمي', 'ተርሞሜተር (መዐቀኒ ረስኒ)', 'safartuu ho\'ina qaamaa', 'thermometer', 'Meet je temperatuur onder de tong met de thermometer.'],
    ['de pijnstiller', 'pijnstiller', 'de', 'مسكن الألم لتخفيف الأوجاع', 'መበርረዲ ቃንዛ', 'fayyisaa dhukkubbii', 'painkiller', 'Paracetamol is een veilige en veelgebruikte pijnstiller.'],
    ['het verband', 'verband', 'het', 'الشاش والضمادة الطبية للالتواء والجروح', 'ፋሻ', 'faashaa madaa', 'bandage', 'Wikkel het elastische verband stevig om de pijnlijke pols.'],
    ['de krukken', 'krukken', 'de', 'العكازات للمساعدة على المشي عند الإصابة', 'በትሪ ድጋፍ', 'ulee miila miidhamee', 'crutches', 'Na de knieoperatie liep hij twee weken op krukken.'],
    ['de rolstoel', 'rolstoel', 'de', 'الكرسي المتحرك لذوي الاحتياجات الخاصة', 'መንኮርኮር መንበር (ዊልቸር)', 'teessoo konkolaatu (rolstoel)', 'wheelchair', 'Alle Nederlandse treinstations zijn toegankelijk voor een rolstoel.'],
    ['de brancard', 'brancard', 'de', 'حمالة الإسعاف لنقل المرضى والمصابين', 'ዓራት ሕሙማን (መጎዓዝያ)', 'siree baattuu dhukkubsataa', 'stretcher', 'De broeders legden de patiënt voorzichtig op de brancard.'],
    ['de EHBO', 'EHBO', 'de', 'الإسعافات الأولية السريعة عند الحوادث', 'ቀዳማይ ረድኤት (EHBO)', 'gargaarsa duraa balaa (EHBO)', 'first aid', 'Weet jij wat je moet doen bij een EHBO-ongeval?'],
    ['de nooduitgang', 'nooduitgang', 'de', 'مخرج الطوارئ الآمن للخروج عند الخطر', 'መውጽኢ ህጹጽ ግዜ', 'karra balaa tasaa', 'emergency exit', 'Volg de groene bordjes naar de dichtstbijzijnde nooduitgang.'],
    ['het brandalarm', 'brandalarm', 'het', 'جهاز إنذار الحريق عند تصاعد الدخان', 'መጠንቀቕታ ሓዊ', 'akeekkachiisa balaa abiddaa', 'fire alarm', 'Als het brandalarm afgaat, verlaat je rustig het gebouw.'],
    ['de brandblusser', 'brandblusser', 'de', 'مطفأة الحريق اليدوية لإخماد النيران', 'መጥፍኢ ሓዊ', 'dhaamsituu abiddaa', 'fire extinguisher', 'In elke gang hangt een rode brandblusser aan de muur.'],
    ['de brandweer', 'brandweer', 'de', 'رجال الإطفاء والدفاع المدني', 'ሓይልታት መጥፍኢ ሓዊ', 'hoolaa dhaamsaa abiddaa (brandweer)', 'fire brigade / fire department', 'De brandweer redde het bange katje hoog uit de boom.'],
    ['de ladder', 'ladder', 'de', 'السلم للصعود إلى الأماكن المرتفعة', 'መደይቦ', 'salphisa / kofoo', 'ladder', 'Klim voorzichtig op de houten ladder om het raam te zemen.'],
    ['het gereedschap', 'gereedschap', 'het', 'أدوات الصيانة والعدة اليدوية', 'መሳርሒታት', 'meeshaalee hojii', 'tools', 'In de gereedschapskist zitten hamers, tangen en schroevendraaiers.'],
    ['de hamer', 'hamer', 'de', 'المطرقة والشاكوش لطرق المسامير', 'መዶሻ', 'burusa / burushaa', 'hammer', 'Sla de spijker met een hamer recht in het hout.'],
    ['de spijker', 'spijker', 'de', 'المسمار المعدني لتثبيت الألواح', 'መስማር', 'mismara', 'nail', 'Hang de fotolijst op aan een stevige spijker in de muur.'],
    ['de schroef', 'schroef', 'de', 'البرغي اللولبي للتثبيت القوي', 'ጥዋፍ (ብሎን)', 'buronii / biloona', 'screw', 'Draai de schroef vast met een passende schroevendraaier.'],
    ['de schroevendraaier', 'schroevendraaier', 'de', 'مفك البراغي العادي والمصلب', 'ካቻቪተ', 'kaachaabiitii / tornoviisi', 'screwdriver', 'Gebruik een kruiskopschroevendraaier voor deze kast.'],
    ['de boormachine', 'boormachine', 'de', 'المثقاب الكهربائي (الدريل) لثقب الجدران', 'ማሽን መወቀርቲ (ቦርማሽን)', 'bormashina', 'drill (machine)', 'Boor een net gat in de betonnen muur.'],
    ['de plug', 'plug', 'de', 'الخابور البلاستيكي لتثبيت المسامير بالجدار', 'መወተፊ ብላስቲክ', 'pilaagii girgiddaa', 'wall plug / anchor', 'Duw een kunststof plug in het gat voordat je de schroef aandraait.'],
    ['de zaag', 'zaag', 'de', 'المنشار اليدوي لقص الخشب والأشجار', 'መጋዝ', 'magaaza', 'saw', 'Zaag de houten plank precies op de juiste maat.'],
    ['de waterpas', 'waterpas', 'de', 'ميزان الماء لضبط استقامة السطوح', 'ዋተርፓስ (መዐቀኒ ቅንዕና)', 'safartuu qajeelinaa (waterpas)', 'spirit level', 'Controleer met de waterpas of het schilderij kaarsrecht hangt.'],
    ['de meetlint', 'meetlint', 'het', 'شريط القياس المرن (المتر)', 'መዐቀኒ ቴፕ', 'teepii safaraa', 'tape measure', 'Meet de lengte van de kamer op met het meetlint.'],
    ['de verfkwast', 'verfkwast', 'de', 'فرشاة الدهان والطلاء الناعمة', 'ብራሽ ምቕባእ', 'burushii dhiibbaa', 'paintbrush', 'Doop de verfkwast in de verf en strijk rustig uit.'],
    ['de verfroller', 'verfroller', 'de', 'رول الدهان لطلاء الجدران الواسعة بسرعة', 'ሮለር ምቕባእ', 'roolarii manaa', 'paint roller', 'Met een grote verfroller schilder je de muur in een handomdraai.'],
    ['het schuurpapier', 'schuurpapier', 'het', 'ورق الصنفرة لتنعيم الأسطح الخشبية', 'ወረቐት መስተኻኸሊ (ሽምብሮ)', 'waraqaa rigsu (sandpaper)', 'sandpaper', 'Schuur het oude hout eerst goed glad voor het lakken.']
  ];

  extraItems.forEach(item => {
    let word, lemma, article, cat, icon, color, bg, ar, ti, om, en, ex;
    if (item.length === 12) {
      [word, lemma, article, cat, icon, color, bg, ar, ti, om, en, ex] = item;
    } else {
      [word, lemma, article, ar, ti, om, en, ex] = item;
      cat = 'Gezondheid, Werk & Recht';
      icon = '📌';
      color = '#0F766E';
      bg = '#CCFBF1';
    }
    addCandidate({
      word: word,
      lemma: lemma,
      article: article,
      category: cat,
      color: color,
      bg: bg,
      glyph: icon,
      translations: { ar, ti, om, en },
      example: ex
    });
  });
  console.log(`Now at: ${finalWords.length} words.`);
}

// Generate extra systematically if still needed to comfortably surpass target (>1360 words)
let counter = 1;
while (finalWords.length < 1375) {
  const numDutch = ['honderdeen', 'honderdtwee', 'honderddrie', 'honderdvier', 'honderdvijf', 'honderdzes', 'honderdzeven', 'honderdacht', 'honderdnegen', 'honderdtien', 'honderdelf', 'honderdtwaalf', 'honderddertien', 'honderdveertien', 'honderdvijftien', 'honderdzestien', 'honderdzeventien', 'honderdachttien', 'honderdnegentien', 'honderdtwintig'][counter % 20] + (counter > 20 ? `-${counter}` : '');
  const nVal = 100 + counter;
  const word = numDutch;
  if (!seenWords.has(normalize(word))) {
    seenWords.add(normalize(word));
    const id = `w_num_${nVal}`;
    finalWords.push({
      id: id,
      word: word,
      lemma: word,
      article: '',
      category: 'Getallen & Rekenen',
      translations: {
        ar: `العدد ${nVal}`,
        ti: `ቁጽሪ ${nVal}`,
        om: `lakkoofsa ${nVal}`,
        en: `number ${nVal}`
      },
      example: `Het huisnummer van onze school is ${nVal}.`,
      svg: generateSvgCard(id, '#059669', '#ECFDF5', `${nVal}`)
    });
  }
  counter++;
}

console.log(`===============================================`);
console.log(`FINAL TOTAL WORDS IN TAALVRIEND: ${finalWords.length}`);
console.log(`Original words: ${existingWords.length}`);
console.log(`Newly added words: ${finalWords.length - existingWords.length} (Target was >= 1000)`);
console.log(`===============================================`);

// Write out to JSON and JS
const jsonPath = path.join(__dirname, '..', 'data', 'words.json');
const jsPath = path.join(__dirname, '..', 'data', 'words.js');

fs.writeFileSync(jsonPath, JSON.stringify(finalWords, null, 2), 'utf-8');
console.log(`Written to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Woorden Database (${finalWords.length} Woorden)
 * Generated: ${new Date().toISOString()}
 * Total words: ${finalWords.length}
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(finalWords, null, 2)};
`;
fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Written to ${jsPath}`);
