const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

// SVG generator
function makeSvg(color = '#10b981', text = 'NL') {
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="${color}15" stroke="${color}" stroke-width="4"/><text x="50" y="58" font-size="26" font-family="sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${text}</text></svg>`;
}

const newPreA1Items = [
  // Eten & Fruit
  { w: "de peer", c: "Eten & Voeding", s: "Een sappige groene peer.", ar: "الإجاص / الكمثرى", ti: "ኮምሽራ", om: "Piyerii", so: "canbaha baabiyaha / beer", en: "pear" },
  { w: "de aardbei", c: "Eten & Voeding", s: "Een zoete rode aardbei.", ar: "الفراولة", ti: "ፍራውላ", om: "Istrooberii", so: "faroole", en: "strawberry" },
  { w: "de druif", c: "Eten & Voeding", s: "Blauwe en witte druiven.", ar: "العنب", ti: "ወይኒ", om: "Woynii", so: "canab", en: "grape" },
  { w: "de citroen", c: "Eten & Voeding", s: "Een gele zure citroen.", ar: "الليمون", ti: "ለሚን", om: "Loomii", so: "liin dhanaan", en: "lemon" },
  { w: "de komkommer", c: "Eten & Voeding", s: "Frisse groene komkommer.", ar: "الخيار", ti: "ኪያር", om: "Kiyaara", so: "qajaar", en: "cucumber" },
  { w: "de sla", c: "Eten & Voeding", s: "Groene sla in de kom.", ar: "الخس", ti: "ሳላጣ", om: "Salaaxaa", so: "salaad", en: "lettuce" },
  { w: "het koekje", c: "Eten & Voeding", s: "Een koekje bij de koffie.", ar: "البسكويت", ti: "ብስኮቲ", om: "Biskitii", so: "buskud", en: "cookie" },
  { w: "de taart", c: "Eten & Voeding", s: "Een taart voor de verjaardag.", ar: "الكعكة / التورتة", ti: "ቶርታ", om: "Keekii", so: "keeg / doolshe", en: "cake" },
  { w: "het ijsje", c: "Eten & Voeding", s: "Een koud ijsje in de zomer.", ar: "المثلجات / الآيس كريم", ti: "ጀላቶ", om: "Aayiskiriimii", so: "jalaato / jallaato", en: "ice cream" },
  { w: "de chocolade", c: "Eten & Voeding", s: "Een reep pure chocolade.", ar: "الشوكولاتة", ti: "ቾኮላታ", om: "Shookoleetaa", so: "shukulaato", en: "chocolate" },

  // Dieren
  { w: "de hond", c: "Dieren & Natuur", s: "De hond blaft vrolijk.", ar: "الكلب", ti: "ከልቢ", om: "Saree", so: "ey", en: "dog" },
  { w: "de kat", c: "Dieren & Natuur", s: "De kat drinkt melk.", ar: "القطة", ti: "ድሙ", om: "Adurree", so: "bisad / mukulaal", en: "cat" },
  { w: "de vogel", c: "Dieren & Natuur", s: "De vogel zingt in de boom.", ar: "الطائر", ti: "ዕፍሪት / ዑፍ", om: "Simbirra", so: "shimbiro", en: "bird" },
  { w: "de koe", c: "Dieren & Natuur", s: "De koe staat in de wei.", ar: "البقرة", ti: "ላም", om: "Sa'a", so: "sac", en: "cow" },
  { w: "het paard", c: "Dieren & Natuur", s: "Het paard rent snel.", ar: "الحصان", ti: "ፈረስ", om: "Farda", so: "faras", en: "horse" },
  { w: "het schaap", c: "Dieren & Natuur", s: "Een schaap heeft warme wol.", ar: "الخروف", ti: "በጊዕ", om: "Hoolaa", so: "lax / idil", en: "sheep" },
  { w: "de eend", c: "Dieren & Natuur", s: "De eend zwemt in het water.", ar: "البطة", ti: "ደርሆ ማይ", om: "Dhaq-dhaqoo", so: "shinbiro-biyood / boolo", en: "duck" },
  { w: "het konijn", c: "Dieren & Natuur", s: "Het konijn eet een wortel.", ar: "الأرنب", ti: "ማንቲለ", om: "Hilleensa", so: "bakayle", en: "rabbit" },
  { w: "de muis", c: "Dieren & Natuur", s: "De kleine muis zoekt kaas.", ar: "الفأر", ti: "ኣንጭዋ", om: "Hantuuta", so: "dooli", en: "mouse" },
  { w: "de vis", c: "Dieren & Natuur", s: "De vis zwemt in de kom.", ar: "السمكة", ti: "ዓሳ", om: "Qurxummii", so: "kalluun", en: "fish" },

  // School & Spullen
  { w: "het potlood", c: "School & Studie", s: "Tekenen met een potlood.", ar: "قلم الرصاص", ti: "ርሳስ", om: "Qalama erbiisaa", so: "qalin qori", en: "pencil" },
  { w: "de gum", c: "School & Studie", s: "Uitgummen met een gum.", ar: "الممحاة", ti: "ላስቲክ መደምሰሲ", om: "Haqxuu", so: "tirtire", en: "eraser" },
  { w: "de schaar", c: "School & Studie", s: "Papier knippen met een schaar.", ar: "المقص", ti: "መቐስ", om: "Magaazii / Qoffo", so: "maqas", en: "scissors" },
  { w: "het schrift", c: "School & Studie", s: "Schrijf je naam in het schrift.", ar: "الدفتر", ti: "ደፍተር", om: "Daftara", so: "buugga qoraalka", en: "notebook" },
  { w: "de computer", c: "School & Studie", s: "Typen op de computer.", ar: "الكمبيوتر", ti: "ኮምፒተር", om: "Koompitara", so: "kombuyuutar", en: "computer" },
  { w: "de muis", c: "School & Studie", s: "Klik met de muis.", ar: "فأرة الحاسوب", ti: "ናይ ኮምፒተር ማውስ", om: "Maawusii", so: "jiirka kombuyuutarka", en: "computer mouse" },
  { w: "het scherm", c: "School & Studie", s: "Kijk naar het scherm.", ar: "الشاشة", ti: "ስክሪን", om: "Agarsiiftuu", so: "shaashad", en: "screen" },

  // Huishouden & Badkamer
  { w: "de zeep", c: "Wonen & Huishouden", s: "Was je handen met zeep.", ar: "الصابون", ti: "ሳሙና", om: "Saamunaa", so: "saabuun", en: "soap" },
  { w: "de handdoek", c: "Wonen & Huishouden", s: "Droog je af met de handdoek.", ar: "المنشفة", ti: "ፉጣ", om: "Footaa", so: "shukumaan", en: "towel" },
  { w: "de kam", c: "Wonen & Huishouden", s: "Kam je haar met een kam.", ar: "المشط", ti: "መመሸጢ", om: "Filtooftuu", so: "shanlo", en: "comb" },
  { w: "de tandenborstel", c: "Wonen & Huishouden", s: "Poetsen met de tandenborstel.", ar: "فرشاة الأسنان", ti: "መፋሕ ስኒ", om: "Burushii ilkaanii", so: "buraashka ilkaha", en: "toothbrush" },
  { w: "de tandpasta", c: "Wonen & Huishouden", s: "Tandpasta op de borstel doen.", ar: "معجون الأسنان", ti: "ናይ ስኒ ሳሙና", om: "Dawaa ilkaanii", so: "daawada ilkaha", en: "toothpaste" },
  { w: "de douche", c: "Wonen & Huishouden", s: "Lekker warm onder de douche.", ar: "الدش / الاستحمام", ti: "ዱሽ", om: "Dhuushii", so: "qubeys / qubays", en: "shower" },
  { w: "het toilet", c: "Wonen & Huishouden", s: "Waar is het toilet?", ar: "المرحاض", ti: "ሽቓቕ", om: "Mana fincaanii", so: "musqul", en: "toilet" },
  { w: "de spiegel", c: "Wonen & Huishouden", s: "Kijk in de spiegel.", ar: "المرآة", ti: "መስትያት", om: "Daawwitii", so: "muraayad", en: "mirror" },
  { w: "de emmer", c: "Wonen & Huishouden", s: "Een emmer vol met water.", ar: "الدلو / السطل", ti: "ሳልዲ", om: "Balkaatiina", so: "baaldi", en: "bucket" },

  // Meer Lichaamsdelen
  { w: "de vinger", c: "Lichaamsdelen", s: "Wijs aan met je vinger.", ar: "الإصبع", ti: "ኣጻብዕቲ", om: "Quba", so: "far", en: "finger" },
  { w: "de duim", c: "Lichaamsdelen", s: "Steek je duim omhoog.", ar: "الإبهام", ti: "ዓባይ ዓባይ", om: "Quba abbaa", so: "suul", en: "thumb" },
  { w: "de knie", c: "Lichaamsdelen", s: "Buig je knieën voorzichtig.", ar: "الركبة", ti: "ብርኪ", om: "Jilba", so: "jilib", en: "knee" },
  { w: "de schouder", c: "Lichaamsdelen", s: "Beweeg je schouders.", ar: "الكتف", ti: "መንከብ", om: "Ceeku", so: "garab", en: "shoulder" },
  { w: "de nek", c: "Lichaamsdelen", s: "Een warme sjaal om de nek.", ar: "الرقبة", ti: "ክሳድ", om: "Mormaa", so: "qoor", en: "neck" },
  { w: "de keel", c: "Lichaamsdelen", s: "Ik heb last van mijn keel.", ar: "الحلق", ti: "ጎረሮ", om: "Qoonqoo", so: "dhuun", en: "throat" },
  { w: "het hart", c: "Lichaamsdelen", s: "Mijn hart klopt rustig.", ar: "القلب", ti: "ልቢ", om: "Onnee", so: "wadne", en: "heart" },

  // Dagen van de week (Pre-A1)
  { w: "maandag", c: "Dagen van de week", s: "Maandag begint de week.", ar: "الاثنين", ti: "ሰኑይ", om: "Wiixata", so: "Isniin", en: "Monday" },
  { w: "dinsdag", c: "Dagen van de week", s: "Dinsdag ga ik sporten.", ar: "الثلاثاء", ti: "ሰሉስ", om: "Kibxata", so: "Talaado", en: "Tuesday" },
  { w: "woensdag", c: "Dagen van de week", s: "Woensdagmiddag vrij.", ar: "الأربعاء", ti: "ረቡዕ", om: "Roobii", so: "Arbaco", en: "Wednesday" },
  { w: "donderdag", c: "Dagen van de week", s: "Donderdag ga ik naar school.", ar: "الخميس", ti: "ሓሙስ", om: "Kamisa", so: "Khamiis", en: "Thursday" },
  { w: "vrijdag", c: "Dagen van de week", s: "Vrijdag is een mooie dag.", ar: "الجمعة", ti: "ዓርቢ", om: "Jimaata", so: "Jimce", en: "Friday" },
  { w: "zaterdag", c: "Dagen van de week", s: "Zaterdag naar de markt.", ar: "السبت", ti: "ቀዳም", om: "Sanbata duraa", so: "Sabti", en: "Saturday" },
  { w: "zondag", c: "Dagen van de week", s: "Zondag is een rustdag.", ar: "الأحد", ti: "ሰንበት", om: "Dilbata", so: "Axad", en: "Sunday" },

  // Weer & Seizoenen
  { w: "de sneeuw", c: "Natuur & Weer", s: "Witte sneeuw op straat.", ar: "الثلج", ti: "በረድ", om: "Cabbii", so: "baraf", en: "snow" },
  { w: "het ijs", c: "Natuur & Weer", s: "Koud ijs op het water.", ar: "الجليد", ti: "በረድ", om: "Cabbiin cimaa", so: "baraf qabow", en: "ice" },
  { w: "de wolk", c: "Natuur & Weer", s: "Een witte wolk aan de lucht.", ar: "الغيمة", ti: "ደበና", om: "Duumessa", so: "daruur", en: "cloud" },
  { w: "de maan", c: "Natuur & Weer", s: "De maan schijnt in de nacht.", ar: "القمر", ti: "ወርሒ", om: "Ji'a", so: "dayax", en: "moon" },
  { w: "de ster", c: "Natuur & Weer", s: "Een fonkelende ster aan de hemel.", ar: "النجم", ti: "ኮኾብ", om: "Urjii", so: "xiddig", en: "star" },
  { w: "de lucht", c: "Natuur & Weer", s: "Kijk omhoog naar de blauwe lucht.", ar: "السماء", ti: "ሰማይ", om: "Samii", so: "cirka / samada", en: "sky" },

  // Meer eenvoudige handelingen
  { w: "rennen", c: "Handelingen", s: "De kinderen rennen naar huis.", ar: "يركض", ti: "ምጉያይ", om: "Fiiguu", so: "orod", en: "to run" },
  { w: "wassen", c: "Handelingen", s: "Was je handen met water en zeep.", ar: "يغسل", ti: "ምሕጻብ", om: "Dhiqachuu", so: "dhaqid", en: "to wash" },
  { w: "koken", c: "Handelingen", s: "Wij koken rijst en soep.", ar: "يطبخ", ti: "ምብሳል", om: "Bilcheessuu", so: "karin", en: "to cook" },
  { w: "kopen", c: "Handelingen", s: "Brood kopen bij de bakker.", ar: "يشتري", ti: "ምግዛእ", om: "Bitachuu", so: "iibsi", en: "to buy" },
  { w: "lezen", c: "Handelingen", s: "Een verhaaltje lezen.", ar: "يقرأ", ti: "ምንባብ", om: "Dubbisuu", so: "akhris", en: "to read" },
  { w: "schrijven", c: "Handelingen", s: "Schrijf je naam op papier.", ar: "يكتب", ti: "ምጽሓፍ", om: "Barreessuu", so: "qoris", en: "to write" },
  { w: "lachen", c: "Handelingen", s: "De kinderen lachen vrolijk.", ar: "يضحك", ti: "ምስሓቕ", om: "Kolfuu", so: "qosol", en: "to laugh" }
];

let added = 0;
newPreA1Items.forEach((item, idx) => {
  const wordKey = item.w.toLowerCase().trim();
  const baseKey = item.w.replace(/^(de|het)\s+/, '').trim().toLowerCase();

  const found = words.find(x => x.word.toLowerCase().trim() === wordKey || (x.base_word && x.base_word.toLowerCase().trim() === baseKey));
  if (found) {
    found.level = "Pre-A1";
    found.simple_example = item.s;
    found.translations.so = item.so;
  } else {
    const isDe = item.w.startsWith("de ");
    const isHet = item.w.startsWith("het ");
    const article = isDe ? "de" : (isHet ? "het" : "");
    const baseWord = item.w.replace(/^(de|het)\s+/, "");

    words.push({
      id: `w_prea1_batch2_${idx + 1}`,
      word: item.w,
      article: article,
      base_word: baseWord,
      category: item.c,
      level: "Pre-A1",
      example: item.s,
      simple_example: item.s,
      translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: item.so,
        en: item.en
      },
      example_translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: `Tusaale: ${item.so}`,
        en: item.en
      },
      simple_example_translations: {
        ar: item.ar,
        ti: item.ti,
        om: item.om,
        so: `Tusaale: ${item.so}`,
        en: item.en
      },
      svg: makeSvg('#3b82f6', baseWord.slice(0, 2).toUpperCase())
    });
    added++;
  }
});

const preA1Final = words.filter(w => w.level === "Pre-A1").length;
console.log(`Pre-A1 words count now: ${preA1Final} (added ${added} new entries)`);

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');
console.log("Saved words.json and words.js successfully!");
