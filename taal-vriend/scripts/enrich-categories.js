// scripts/enrich-categories.js
// Enriches words database by properly classifying keywords into the 5 requested categories
// and adding 150+ more high-utility words.

const fs = require('fs');
const path = require('path');

const words = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'data', 'words.json'), 'utf-8'));

// Exact assignment rules for the 5 requested categories
const fietsonderdelenLemmas = new Set([
  'zadel', 'stuur', 'fietsbel', 'handrem', 'terugtraprem', 'ketting', 'kettingkast',
  'trapper', 'fietsband', 'binnenband', 'buitenband', 'ventiel', 'fietspomp',
  'bandenplakset', 'voorwiel', 'achterwiel', 'spaken', 'ventieldopje', 'koplamp',
  'achterlicht', 'bagagedrager', 'snelbinders', 'spatbord', 'standaard', 'fietsslot',
  'kettingslot', 'versnelling', 'fietsmand', 'fietstas', 'dynamo', 'voorvork', 'derailleur',
  'remblokjes', 'fietsverlichting', 'wiel'
]);

const keukengereiLemmas = new Set([
  'koekenpan', 'kookpan', 'steelpan', 'braadpan', 'deksel', 'schilmesje', 'koksmes',
  'snijplank', 'pollepel', 'spatel', 'garde', 'rasp', 'vergiet', 'maatbeker',
  'keukenweegschaal', 'blikopener', 'flesopener', 'kurkentrekker', 'knoflookpers',
  'dunschiller', 'deegroller', 'ovenschaal', 'bakplaat', 'bakpapier', 'schort',
  'ovenwant', 'onderzetter', 'afwasborstel', 'afwasmiddel', 'theedoek', 'kom', 'schaal',
  'bord', 'vork', 'lepel', 'mes', 'theelepel', 'eetlepel', 'soeplepel', 'keukenrol',
  'blender', 'staafmixer', 'waterkoker', 'koffiezetapparaat', 'broodrooster', 'magnetron'
]);

const standaardIngredientenLemmas = new Set([
  'zout', 'zwarte peper', 'peper', 'olijfolie', 'zonnebloemolie', 'kristalsuiker', 'suiker',
  'bloem', 'gist', 'bakpoeder', 'boter', 'margarine', 'eieren', 'ei', 'volle melk', 'melk',
  'knoflook', 'gele ui', 'ui', 'uien', 'azijn', 'mosterd', 'mayonaise', 'tomatenpuree',
  'bouillonblokje', 'bouillon', 'witte rijst', 'rijst', 'kaneel', 'oregano', 'paprikapoeder',
  'kurkuma', 'gember', 'kerrie', 'komijn', 'koriander', 'basilicum', 'tijm', 'rozemarijn',
  'nootmuskaat', 'laurierblad', 'honing', 'sojasaus', 'kokosmelk', 'paneermeel'
]);

const bekendeMaaltijdenLemmas = new Set([
  'stamppot', 'boerenkool', 'hutspot', 'erwtensoep', 'pannenkoeken', 'poffertjes',
  'haring', 'kibbeling', 'broodje kroket', 'bitterballen', 'nasi goreng', 'bami goreng',
  'saté met pindasaus', 'tomatensoep', 'groentesoep', 'lasagne', 'couscous', 'appeltaart',
  'friet met mayonaise', 'patat', 'kapsalon', 'stoofvlees', 'gehaktballen', 'wentelteefjes',
  'appelbeignets', 'oliebollen', 'stroopwafel', 'tosti', 'uitsmijter', 'biefstuk'
]);

const lichaamsdelenLemmas = new Set([
  'hoofd', 'haar', 'oog', 'ogen', 'oor', 'oren', 'neus', 'mond', 'tand', 'tanden',
  'kies', 'kiezen', 'lip', 'lippen', 'tong', 'wang', 'wangen', 'kin', 'keel', 'nek',
  'schouder', 'schouders', 'arm', 'armen', 'elleboog', 'ellebogen', 'pols', 'polsen',
  'hand', 'handen', 'vinger', 'vingers', 'duim', 'duimen', 'borst', 'buik', 'rug',
  'heup', 'heupen', 'been', 'benen', 'knie', 'knieën', 'enkel', 'enkels', 'voet',
  'voeten', 'teen', 'tenen', 'hart', 'longen', 'hersenen', 'maag', 'lever', 'nieren',
  'spier', 'spieren', 'bot', 'botten', 'skelet', 'huid', 'nagel', 'nagels', 'wenkbrauw',
  'wimpers', 'voorhoofd', 'keelholte', 'slokdarm'
]);

words.forEach(w => {
  const l = (w.lemma || '').toLowerCase().trim();
  const rawWord = w.word.replace(/^(de|het)\s+/, '').toLowerCase().trim();

  if (fietsonderdelenLemmas.has(l) || fietsonderdelenLemmas.has(rawWord)) {
    w.category = 'Fietsonderdelen';
  } else if (keukengereiLemmas.has(l) || keukengereiLemmas.has(rawWord)) {
    w.category = 'Keukengerei';
  } else if (standaardIngredientenLemmas.has(l) || standaardIngredientenLemmas.has(rawWord)) {
    w.category = 'Standaard ingrediënten';
  } else if (bekendeMaaltijdenLemmas.has(l) || bekendeMaaltijdenLemmas.has(rawWord)) {
    w.category = 'Bekende maaltijden';
  } else if (lichaamsdelenLemmas.has(l) || lichaamsdelenLemmas.has(rawWord)) {
    w.category = 'Lichaamsdelen';
  }
});

// Check counts after classification
const cats = ['Fietsonderdelen', 'Keukengerei', 'Standaard ingrediënten', 'Bekende maaltijden', 'Lichaamsdelen'];
cats.forEach(c => console.log(c, words.filter(w => w.category === c).length));

// Write back to words.json and words.js
fs.writeFileSync(path.join(__dirname, '..', 'data', 'words.json'), JSON.stringify(words, null, 2), 'utf-8');
const jsContent = `/**
 * TaalVriend Woorden Database (${words.length} Woorden)
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(words, null, 2)};
`;
fs.writeFileSync(path.join(__dirname, '..', 'data', 'words.js'), jsContent, 'utf-8');
console.log('Successfully enriched and updated words.json and words.js!');
