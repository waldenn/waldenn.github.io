const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/clocks.json');
const dataJsonPath = path.join(__dirname, '../data/clocks.json');
const dataJsPath = path.join(__dirname, '../data/clocks.js');

const clocks = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

function arToSyrianClock(arText) {
  if (!arText) return '';
  let s = arText;
  s = s.replace(/الساعة الواحدة/g, 'الساعة وحدة');
  s = s.replace(/الساعة الثانية عشرة/g, 'الساعة طناش');
  s = s.replace(/الساعة الحادية عشرة/g, 'الساعة حداش');
  s = s.replace(/الساعة العاشرة/g, 'الساعة عشرة');
  s = s.replace(/الساعة التاسعة/g, 'الساعة تسعة');
  s = s.replace(/الساعة الثامنة/g, 'الساعة تمانة');
  s = s.replace(/الساعة السابعة/g, 'الساعة سبعة');
  s = s.replace(/الساعة السادسة/g, 'الساعة ستة');
  s = s.replace(/الساعة الخامسة/g, 'الساعة خمسة');
  s = s.replace(/الساعة الرابعة/g, 'الساعة أربعة');
  s = s.replace(/الساعة الثالثة/g, 'الساعة تلاتة');
  s = s.replace(/الساعة الثانية/g, 'الساعة تنتين');

  s = s.replace(/والنصف/g, 'ونص');
  s = s.replace(/والربع/g, 'وربع');
  s = s.replace(/وثلث/g, 'وتلت');
  s = s.replace(/إلا ربعاً/g, 'إلا ربع');
  s = s.replace(/إلا ثلثاً/g, 'إلا تلت');
  s = s.replace(/وعشر دقائق/g, 'وعشر دقايق');
  s = s.replace(/إلا عشر دقائق/g, 'إلا عشر دقايق');
  s = s.replace(/وخمس دقائق/g, 'وخمس دقايق');
  s = s.replace(/إلا خمس دقائق/g, 'إلا خمس دقايق');
  s = s.replace(/عشر دقائق قبل النصف/g, 'عشر دقايق قبل النص');
  s = s.replace(/خمس دقائق قبل النصف/g, 'خمس دقايق قبل النص');
  s = s.replace(/خمس دقائق بعد النصف/g, 'خمس دقايق بعد النص');
  s = s.replace(/عشر دقائق بعد النصف/g, 'عشر دقايق بعد النص');
  return s;
}

clocks.forEach(c => {
  if (!c.translations) c.translations = {};
  c.translations.syr = arToSyrianClock(c.translations.ar || '');
});

fs.writeFileSync(srcPath, JSON.stringify(clocks, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(clocks, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_CLOCKS = ' + JSON.stringify(clocks, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Updated 144 clocks with Syrian Arabic translations in JSON & JS');
