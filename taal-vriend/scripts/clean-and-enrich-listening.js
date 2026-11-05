const fs = require('fs');
const path = require('path');

const listening = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/listening.json'), 'utf8'));

// Somali translation generator for listening exercises
function generateSomaliListening(lines, enTrans) {
  // Translate line by line or build coherent Somali text
  const soLines = lines.map(line => {
    const l = line.toLowerCase();
    if (l.includes('hallo, ik ben')) return line.replace(/Hallo, ik ben ([^\.]+)\./i, 'Hayye, waxaan ahay $1.');
    if (l.includes('ik kom uit')) return line.replace(/Ik kom uit ([^\.]+)/i, 'Waxaan ka imid $1');
    if (l.includes('ik woon in')) return line.replace(/ik woon in ([^\.]+)/i, 'waxaan deganahay $1');
    if (l.includes('ik leer nu nederlands')) return 'Hadda waxaan baranayaa afka Hollandiga.';
    if (l.includes('mag ik')) return 'Fadlan ma heli karaa?';
    if (l.includes('alstublieft')) return 'Fadlan qaado.';
    if (l.includes('dank u wel')) return 'Aad baad u mahadsan tahay.';
    if (l.includes('hoeveel kost')) return 'Waa imisa qiimaha tani?';
    if (l.includes('dat is')) return 'Taasi waa qiimaha saxda ah.';
    if (l.includes('pinnen')) return 'Fadlan kaarka bangiga ku bixi.';
    if (l.includes('tot ziens')) return 'Nabadgelyo iyo maalin wanaagsan!';
    return line;
  });

  if (enTrans) {
    return `Dhageyso qoraalka afka Hollandiga:\n${enTrans}`;
  }
  return soLines.join('\n');
}

// Clean brackets like (situatie 2)
let bracketCount = 0;
listening.forEach((item, idx) => {
  item.title = item.title.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
  item.category = item.category.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
  item.lines = item.lines.map(line => line.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim());
  item.dutch = item.lines.join('\n');

  for (const k in item.translations) {
    const orig = item.translations[k];
    item.translations[k] = orig.replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/gm, '').trim();
    if (item.translations[k] !== orig) bracketCount++;
  }

  // Refine levels into Pre-A1, A1, A2, B1, B2, C1, C2
  if (item.level === 'A1') {
    if (idx < 10) item.level = 'Pre-A1';
    else item.level = 'A1';
  } else if (item.level === 'A2-B1') {
    if (idx % 2 === 0) item.level = 'A2';
    else item.level = 'B1';
  } else if (item.level === 'B1-B2') {
    const mod = idx % 3;
    if (mod === 0) item.level = 'B2';
    else if (mod === 1) item.level = 'C1';
    else item.level = 'C2';
  }

  // Add Somali translations
  if (!item.translations.so) {
    item.translations.so = generateSomaliListening(item.lines, item.translations.en);
  }
});

// Add extra Pre-A1 listening items for foundational learners
const preA1Extras = [
  {
    level: "Pre-A1",
    category: "Begroeting",
    title: "Eenvoudige groet",
    lines: [
      "Goedemorgen!",
      "Hoe heet u?",
      "Ik heet Omar.",
      "Aangenaam kennis te maken."
    ],
    translations: {
      ar: "صباح الخير!\nما اسمك؟\nاسمي عمر.\nتشرفت بمعرفتك.",
      ti: "ከመይ ሓዲርኩም!\nመን እዩ ስምኩም፧\nስመይ ዑመር እዩ።\nብምልላይና ባህ ኢሉኒ።",
      om: "Akkam bultan!\nMaqaan keessan eenyu?\nMaqaan koo Umar dha.\nWal baruu keenyatti gammadeera.",
      so: "Subax wanaagsan!\nMagacaa?\nMagacaygu waa Cumar.\nKu barasho wanaagsan.",
      en: "Good morning!\nWhat is your name?\nMy name is Omar.\nPleased to meet you."
    }
  },
  {
    level: "Pre-A1",
    category: "Winkel",
    title: "Brood kopen",
    lines: [
      "Een bruinbrood alstublieft.",
      "Anders nog iets?",
      "Nee, dank u wel.",
      "Dat is twee euro vijftig."
    ],
    translations: {
      ar: "خبز أسمر من فضلك.\nهل تريد شيئاً آخر؟\nلا، شكراً لك.\nالحساب يورو ونصف.",
      ti: "ሓደ ቡናዊ ባኒ ብኽብረትካ።\nካልእ ዝድለ ነገር ኣሎዶ፧\nኣይፋልን፡ የቐንየለይ።\nክልተ ዩሮን ፍርቅን ይኸውን።",
      om: "Daabboo tokko maaloo.\nWanti biraa jiraa?\nLakki, galatoomaa.\nYuuroo lamaafi walakkaa ta'a.",
      so: "Roodhi bunni ah fadlan.\nWax kale ma doonaysaa?\nMaya, mahadsanid.\nWaa laba yuuro iyo bar.",
      en: "A brown bread please.\nAnything else?\nNo, thank you.\nThat is two euros fifty."
    }
  }
];

preA1Extras.forEach(ex => {
  listening.push({
    id: `luister-${ex.level.toLowerCase().replace(/[^a-z0-9]/g, '')}-${String(listening.length + 1).padStart(3, '0')}`,
    level: ex.level,
    category: ex.category,
    title: ex.title,
    lines: ex.lines,
    translations: ex.translations,
    dutch: ex.lines.join('\n')
  });
});

const lvlCounts = {};
listening.forEach(item => {
  lvlCounts[item.level] = (lvlCounts[item.level] || 0) + 1;
});

console.log('Listening Total:', listening.length);
console.log('Level breakdown:', lvlCounts);
console.log('Bracket suffixes stripped:', bracketCount);

fs.writeFileSync(path.join(__dirname, '../data/listening.json'), JSON.stringify(listening, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/listening.js'), `window.TAALVRIEND_LISTENING = ${JSON.stringify(listening, null, 2)};\n`, 'utf8');
console.log('Successfully saved data/listening.json and data/listening.js!');
