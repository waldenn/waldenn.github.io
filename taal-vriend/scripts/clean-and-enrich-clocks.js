const fs = require('fs');
const path = require('path');

const clocks = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/clocks.json'), 'utf8'));

// Somali hour numbers
const soHours = {
  1: 'kowdii',
  2: 'labadii',
  3: 'saddexdii',
  4: 'afartii',
  5: 'shantii',
  6: 'lixdii',
  7: 'todobadii',
  8: 'sideeddii',
  9: 'sagaashii',
  10: 'tobankii',
  11: 'kow iyo tobankii',
  12: 'laba iyo tobankii'
};

function getSomaliTime(hours, minutes) {
  const h = hours;
  const nextH = h === 12 ? 1 : h + 1;
  const hName = soHours[h];
  const nextHName = soHours[nextH];

  switch (minutes) {
    case 0:
      return `Waa ${hName} saac oo sax ah.`;
    case 5:
      return `Waa ${hName} saac iyo shan daqiiqo.`;
    case 10:
      return `Waa ${hName} saac iyo toban daqiiqo.`;
    case 15:
      return `Waa ${hName} saac iyo rubuc.`;
    case 20:
      return `Waa ${hName} saac iyo labaatan daqiiqo.`;
    case 25:
      return `Waa shan iyo labaatan daqiiqo oo ${hName} saac ah.`;
    case 30:
      return `Waa ${hName} saac iyo badh.`;
    case 35:
      return `Waa shan iyo labaatan daqiiqo ka dhiman ${nextHName} saac.`;
    case 40:
      return `Waa labaatan daqiiqo ka dhiman ${nextHName} saac.`;
    case 45:
      return `Waa rubuc ka dhiman ${nextHName} saac.`;
    case 50:
      return `Waa toban daqiiqo ka dhiman ${nextHName} saac.`;
    case 55:
      return `Waa shan daqiiqo ka dhiman ${nextHName} saac.`;
    default:
      return `Waa ${hName} saac iyo ${minutes} daqiiqo.`;
  }
}

clocks.forEach(c => {
  // Strip any (Het is nu...) or brackets from existing translations
  for (const k in c.translations) {
    c.translations[k] = c.translations[k].replace(/\s*\([^\)]*\)\s*$/, '').trim();
  }
  // Add Somali translation
  c.translations.so = getSomaliTime(c.hours, c.minutes);
});

fs.writeFileSync(path.join(__dirname, '../data/clocks.json'), JSON.stringify(clocks, null, 2), 'utf8');
fs.writeFileSync(path.join(__dirname, '../data/clocks.js'), `window.TAALVRIEND_CLOCKS = ${JSON.stringify(clocks, null, 2)};\n`, 'utf8');

console.log('Successfully enriched and cleaned 144 clocks with Somali & stripped brackets!');
