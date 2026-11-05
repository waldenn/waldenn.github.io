const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/data/respond.json');
const dataJsonPath = path.join(__dirname, '../data/respond.json');
const dataJsPath = path.join(__dirname, '../data/respond.js');

const respond = JSON.parse(fs.readFileSync(srcPath, 'utf8'));

function arToSyrianGeneral(arText) {
  if (!arText) return '';
  let s = arText;
  s = s.replace(/ماذا تريد/g, 'شو بدك');
  s = s.replace(/أين/g, 'وين');
  s = s.replace(/متى/g, 'أيمتى');
  s = s.replace(/لماذا/g, 'ليش');
  s = s.replace(/كيف حالك/g, 'كيفك');
  s = s.replace(/هل يمكنك/g, 'فيك');
  s = s.replace(/هل تستطيع/g, 'فيك');
  s = s.replace(/لا أستطيع/g, 'ما فيني');
  s = s.replace(/أستطيع/g, 'فيني');
  s = s.replace(/أريد/g, 'بدي');
  s = s.replace(/هل تريد/g, 'بدك');
  s = s.replace(/نعم/g, 'إي');
  s = s.replace(/الآن/g, 'هلأ');
  s = s.replace(/كثيراً/g, 'كتير');
  s = s.replace(/جداً/g, 'كتير');
  s = s.replace(/هنا/g, 'هون');
  s = s.replace(/هناك/g, 'هنيك');
  s = s.replace(/هذا/g, 'هاد');
  s = s.replace(/هذه/g, 'هاي');
  s = s.replace(/سوف/g, 'رح');
  s = s.replace(/سأقوم/g, 'رح قوم');
  s = s.replace(/قدم/g, 'قدّم');
  return s;
}

respond.forEach(r => {
  if (!r.audio_translations) r.audio_translations = {};
  if (!r.situation_translations) r.situation_translations = {};
  if (!r.explanations) r.explanations = {};

  r.audio_translations.syr = arToSyrianGeneral(r.audio_translations.ar || '');
  r.situation_translations.syr = arToSyrianGeneral(r.situation_translations.ar || r.situation || '');
  r.explanations.syr = arToSyrianGeneral(r.explanations.ar || r.explanations.nl || '');
});

fs.writeFileSync(srcPath, JSON.stringify(respond, null, 2), 'utf8');
fs.writeFileSync(dataJsonPath, JSON.stringify(respond, null, 2), 'utf8');
const jsContent = 'window.TAALVRIEND_RESPOND = ' + JSON.stringify(respond, null, 2) + ';\n';
fs.writeFileSync(dataJsPath, jsContent, 'utf8');

console.log('Updated', respond.length, 'respond items with Syrian translations in JSON & JS');
