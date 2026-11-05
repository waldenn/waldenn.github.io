const fs = require('fs');
const path = require('path');

const wordsFile = path.join(__dirname, '../data/words.json');
const wordsJsFile = path.join(__dirname, '../data/words.js');

let words = JSON.parse(fs.readFileSync(wordsFile, 'utf8'));

// Numbers 21 to 100
const nums = [
  { w: "eenentwintig", s: "21", ar: "واحد وعشرون", ti: "ዕስራን ሓደን", om: "Digdamii tokko", so: "labaatan iyo kow", en: "twenty-one" },
  { w: "tweeëntwintig", s: "22", ar: "اثنان وعشرون", ti: "ዕስራን ክልተን", om: "Digdamii lama", so: "labaatan iyo labo", en: "twenty-two" },
  { w: "drieëntwintig", s: "23", ar: "ثلاثة وعشرون", ti: "ዕስራን ሰለስተን", om: "Digdamii sadii", so: "labaatan iyo saddex", en: "twenty-three" },
  { w: "vierentwintig", s: "24", ar: "أربعة وعشرون", ti: "ዕስራን ኣርባዕተን", om: "Digdamii afur", so: "labaatan iyo afar", en: "twenty-four" },
  { w: "vijfentwintig", s: "25", ar: "خمسة وعشرون", ti: "ዕስራን ሓሙሽተን", om: "Digdamii shan", so: "labaatan iyo shan", en: "twenty-five" },
  { w: "zesentwintig", s: "26", ar: "ستة وعشرون", ti: "ዕስራን ሽዱሽተን", om: "Digdamii jaa", so: "labaatan iyo lix", en: "twenty-six" },
  { w: "zevenentwintig", s: "27", ar: "سبعة وعشرون", ti: "ዕስራን ሸውዓተን", om: "Digdamii torba", so: "labaatan iyo toddoba", en: "twenty-seven" },
  { w: "achtentwintig", s: "28", ar: "ثمانية وعشرون", ti: "ዕስራን ሸሞንተን", om: "Digdamii saddeet", so: "labaatan iyo sideed", en: "twenty-eight" },
  { w: "negenentwintig", s: "29", ar: "تسعة وعشرون", ti: "ዕስራን ትሽዓተን", om: "Digdamii sagal", so: "labaatan iyo sagaal", en: "twenty-nine" },
  { w: "dertig", s: "30", ar: "ثلاثون", ti: "ሰላሳ", om: "Soddoma", so: "soddon", en: "thirty" },
  { w: "veertig", s: "40", ar: "أربعون", ti: "ኣርብዓ", om: "Afurtama", so: "afartan", en: "forty" },
  { w: "vijftig", s: "50", ar: "خمسون", ti: "ሓምሳ", om: "Shantama", so: "konton", en: "fifty" },
  { w: "zestig", s: "60", ar: "ستون", ti: "ሱሳ", om: "Jaatama", so: "lixdan", en: "sixty" },
  { w: "zeventig", s: "70", ar: "سبعون", ti: "ሰብዓ", om: "Torbaatama", so: "toddobaatan", en: "seventy" },
  { w: "tachtig", s: "80", ar: "ثمانون", ti: "ሰማንያ", om: "Saddeettama", so: "sideetan", en: "eighty" },
  { w: "negentig", s: "90", ar: "تسعون", ti: "ተስዓ", om: "Sagaltama", so: "sagaashan", en: "ninety" },
  { w: "honderd", s: "100", ar: "مئة", ti: "ሚእቲ", om: "Dhibba", so: "boqol", en: "one hundred" }
];

nums.forEach((item, idx) => {
  const found = words.find(w => w.word.toLowerCase() === item.w);
  if (found) {
    found.level = "Pre-A1";
    found.translations.so = item.so;
  } else {
    words.push({
      id: `w_num_prea1_${idx + 1}`,
      word: item.w,
      article: "",
      base_word: item.w,
      category: "Getallen",
      level: "Pre-A1",
      example: `Het getal ${item.w}.`,
      simple_example: item.s,
      translations: { ar: item.ar, ti: item.ti, om: item.om, so: item.so, en: item.en },
      example_translations: { ar: item.ar, ti: item.ti, om: item.om, so: item.so, en: item.en },
      simple_example_translations: { ar: item.ar, ti: item.ti, om: item.om, so: item.so, en: item.en },
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" class="word-svg-icon"><circle cx="50" cy="50" r="44" fill="#3b82f615" stroke="#3b82f6" stroke-width="4"/><text x="50" y="60" font-size="28" font-family="sans-serif" font-weight="bold" fill="#3b82f6" text-anchor="middle">${item.s}</text></svg>`
    });
  }
});

const preA1Final = words.filter(w => w.level === "Pre-A1").length;
console.log(`Pre-A1 count now: ${preA1Final}`);

fs.writeFileSync(wordsFile, JSON.stringify(words, null, 2), 'utf8');
fs.writeFileSync(wordsJsFile, 'window.TAALVRIEND_WORDS = ' + JSON.stringify(words, null, 2) + ';\n', 'utf8');
