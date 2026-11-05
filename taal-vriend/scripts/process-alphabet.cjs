const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/alphabet.json');
const dataJsonPath = path.join(__dirname, '../data/alphabet.json');
const dataJsPath = path.join(__dirname, '../data/alphabet.js');

const alphabet = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

alphabet.forEach(item => {
  if (item.examples && Array.isArray(item.examples)) {
    item.examples.forEach(ex => {
      if (!ex.translations) ex.translations = {};
      let syrWord = ex.translations.ar || '';
      // Levantine touches
      if (syrWord === 'التفاحة') syrWord = 'التفاحة';
      if (syrWord === 'الماء') syrWord = 'المي / الماء';
      if (syrWord === 'الخبز') syrWord = 'الخبز';
      if (syrWord === 'المنزل' || syrWord === 'البيت') syrWord = 'البيت';
      if (syrWord === 'السيارة') syrWord = 'السيارة';
      if (syrWord === 'الطفل') syrWord = 'الولد / الطفل';
      if (syrWord === 'النقود') syrWord = 'المصاري';
      if (syrWord === 'المستشفى') syrWord = 'المشفى';
      if (syrWord === 'الطبيب') syrWord = 'الدكتور / الحكيم';
      ex.translations.syr = syrWord;
    });
  }
});

fs.writeFileSync(srcPath, JSON.stringify(alphabet, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(alphabet, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_ALPHABET = ' + JSON.stringify(alphabet, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Updated 38 alphabet items with Syrian translations in JSON & JS');
