const fs = require('fs');
const path = require('path');

const alphabet = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/alphabet.json'), 'utf8'));
const words = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/words.json'), 'utf8'));

// Build dictionary from words.json
const wordToSomali = {};
words.forEach(w => {
  const lemma = (w.lemma || w.word || '').replace(/^(de|het|een)\s+/i, '').toLowerCase().trim();
  if (w.translations && w.translations.so) {
    wordToSomali[lemma] = w.translations.so;
  }
});

alphabet.forEach(item => {
  item.examples.forEach(ex => {
    // Strip brackets
    for (const k in ex.translations) {
      if (typeof ex.translations[k] === 'string') {
        ex.translations[k] = ex.translations[k].replace(/\s*[\(\[\{][^\)\]\}]*[\)\]\}]\s*$/, '').trim();
      }
    }
    const lemma = (ex.lemma || ex.word || '').replace(/^(de|het|een)\s+/i, '').toLowerCase().trim();
    if (!ex.translations.so) {
      ex.translations.so = wordToSomali[lemma] || (ex.translations.en ? ex.translations.en.replace(/^(the|a|an)\s+/i, '') : lemma);
    }
  });
});

fs.writeFileSync(path.join(__dirname, '../data/alphabet.json'), JSON.stringify(alphabet, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/alphabet.js'), `window.TAALVRIEND_ALPHABET = ${JSON.stringify(alphabet, null, 2)};\n`, 'utf8');

console.log('Successfully cleaned and enriched alphabet with Somali translations!');
