// scripts/generate-clocks.js
// Generates 144 clock situations (all 12 hours x 12 5-minute intervals)
// with analog clock SVG, exact Dutch phrasing ("voor half", "over half", etc.),
// complete sentence ("Het is nu ..."), and full translations in Arabic, Tigrinya, Oromo, English.

const fs = require('fs');
const path = require('path');

const dutchHours = ['twaalf', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'];
const arHours = ['الثانية عشرة', 'الواحدة', 'الثانية', 'الثالثة', 'الرابعة', 'الخامسة', 'السادسة', 'السابعة', 'الثامنة', 'التاسعة', 'العاشرة', 'الحادية عشرة', 'الثانية عشرة'];
const tiHours = ['ዓሰርተ ክልተ', 'ሓደ', 'ክልተ', 'ሰለስተ', 'ኣርባዕተ', 'ሓሙሽተ', 'ሽዱሽተ', 'ሸውዓተ', 'ሸሞንተ', 'ትሽዓተ', 'ዓሰርተ', 'ዓሰርተ ሓደ', 'ዓሰርተ ክልተ'];
const omHours = ['kudha lama', 'tokko', 'lama', 'sadii', 'afur', 'shan', 'ja\'a', 'torba', 'saddeet', 'sagal', 'kudhan', 'kudha tokko', 'kudha lama'];
const enHours = ['twelve', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];

function makeClockSvg(hours, minutes) {
  const minAngle = minutes * 6;
  const hourAngle = ((hours % 12) * 30) + (minutes * 0.5);

  let numbersMarkup = '';
  for (let n = 1; n <= 12; n++) {
    const angle = (n * 30 - 90) * (Math.PI / 180);
    const nx = 120 + 72 * Math.cos(angle);
    const ny = 120 + 72 * Math.sin(angle) + 6;
    numbersMarkup += `<text x="${nx.toFixed(1)}" y="${ny.toFixed(1)}" font-size="16" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" fill="#334155" text-anchor="middle">${n}</text>`;
  }

  let ticks = '';
  for (let i = 0; i < 60; i++) {
    const a = i * 6;
    if (i % 5 !== 0) {
      ticks += `<line x1="120" y1="28" x2="120" y2="33" stroke="#CBD5E1" stroke-width="2" transform="rotate(${a} 120 120)"/>`;
    } else {
      ticks += `<line x1="120" y1="26" x2="120" y2="36" stroke="#475569" stroke-width="3.5" transform="rotate(${a} 120 120)"/>`;
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <filter id="clockShadow" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>
  <g filter="url(#clockShadow)">
    <circle cx="120" cy="120" r="102" fill="#FFFFFF" stroke="#1E293B" stroke-width="9"/>
    <circle cx="120" cy="120" r="95" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="1.5"/>
    ${ticks}
    ${numbersMarkup}
    <!-- Hour Hand -->
    <line x1="120" y1="120" x2="120" y2="68" stroke="#0F172A" stroke-width="8" stroke-linecap="round" transform="rotate(${hourAngle.toFixed(1)} 120 120)"/>
    <!-- Minute Hand -->
    <line x1="120" y1="120" x2="120" y2="42" stroke="#2563EB" stroke-width="5" stroke-linecap="round" transform="rotate(${minAngle.toFixed(1)} 120 120)"/>
    <!-- Center Pin -->
    <circle cx="120" cy="120" r="7.5" fill="#EF4444"/>
    <circle cx="120" cy="120" r="3" fill="#FFFFFF"/>
  </g>
</svg>`.trim();
}

function getClockInfo(h, m) {
  const currentH = h % 12 === 0 ? 12 : h % 12;
  const nextH = (currentH % 12) + 1;

  const curDutch = dutchHours[currentH];
  const nextDutch = dutchHours[nextH];

  const curAr = arHours[currentH];
  const nextAr = arHours[nextH];

  const curTi = tiHours[currentH];
  const nextTi = tiHours[nextH];

  const curOm = omHours[currentH];
  const nextOm = omHours[nextH];

  const curEn = enHours[currentH];
  const nextEn = enHours[nextH];

  let phrase = '';
  let arTrans = '';
  let tiTrans = '';
  let omTrans = '';
  let enTrans = '';

  switch (m) {
    case 0:
      phrase = `${curDutch} uur`;
      arTrans = `الساعة ${curAr} تماماً`;
      tiTrans = `ሰዓት ${curTi}`;
      omTrans = `sa\'a ${curOm}`;
      enTrans = `${curEn} o'clock`;
      break;
    case 5:
      phrase = `vijf over ${curDutch}`;
      arTrans = `الساعة ${curAr} وخمس دقائق`;
      tiTrans = `${curTi}ን ሓሙሽተ ደቂቕን`;
      omTrans = `${curOm} fi daqiiqaa shan`;
      enTrans = `five past ${curEn}`;
      break;
    case 10:
      phrase = `tien over ${curDutch}`;
      arTrans = `الساعة ${curAr} وعشر دقائق`;
      tiTrans = `${curTi}ን ዓሰርተ ደቂቕን`;
      omTrans = `${curOm} fi daqiiqaa kudhan`;
      enTrans = `ten past ${curEn}`;
      break;
    case 15:
      phrase = `kwart over ${curDutch}`;
      arTrans = `الساعة ${curAr} والربع`;
      tiTrans = `${curTi}ን ርብዕን`;
      omTrans = `${curOm} fi kurmaana`;
      enTrans = `quarter past ${curEn}`;
      break;
    case 20:
      phrase = `tien voor half ${nextDutch}`;
      arTrans = `الساعة ${curAr} وعشرون دقيقة (عشر دقائق قبل النصف)`;
      tiTrans = `ንፍርቂ ${nextTi} ዓሰርተ ደቂቕ ጎደል`;
      omTrans = `walakkaa ${nextOm} ta\'uuf daqiiqaa kudhan hafe`;
      enTrans = `twenty past ${curEn} (ten to half ${nextEn})`;
      break;
    case 25:
      phrase = `vijf voor half ${nextDutch}`;
      arTrans = `الساعة ${curAr} وخمس وعشرون دقيقة (خمس دقائق قبل النصف)`;
      tiTrans = `ንፍርቂ ${nextTi} ሓሙሽተ ደቂቕ ጎደል`;
      omTrans = `walakkaa ${nextOm} ta\'uuf daqiiqaa shan hafe`;
      enTrans = `twenty-five past ${curEn} (five to half ${nextEn})`;
      break;
    case 30:
      phrase = `half ${nextDutch}`;
      arTrans = `الساعة ${nextAr} إلا النصف (النصف)`;
      tiTrans = `ፍርቂ ${nextTi}`;
      omTrans = `walakkaa ${nextOm}`;
      enTrans = `half past ${curEn}`;
      break;
    case 35:
      phrase = `vijf over half ${nextDutch}`;
      arTrans = `الساعة النصف وخمس دقائق`;
      tiTrans = `ካብ ፍርቂ ${nextTi} ሓሙሽተ ደቂቕ ሓሊፉ`;
      omTrans = `walakkaa ${nextOm} irra daqiiqaa shan darbe`;
      enTrans = `twenty-five to ${nextEn} (five past half ${nextEn})`;
      break;
    case 40:
      phrase = `tien over half ${nextDutch}`;
      arTrans = `الساعة النصف وعشر دقائق`;
      tiTrans = `ካብ ፍርቂ ${nextTi} ዓሰርተ ደቂቕ ሓሊፉ`;
      omTrans = `walakkaa ${nextOm} irra daqiiqaa kudhan darbe`;
      enTrans = `twenty to ${nextEn} (ten past half ${nextEn})`;
      break;
    case 45:
      phrase = `kwart voor ${nextDutch}`;
      arTrans = `الساعة ${nextAr} إلا ربعاً`;
      tiTrans = `ንሰዓት ${nextTi} ርብዒ ጎደል`;
      omTrans = `${nextOm} ta\'uuf kurmaanni hafe`;
      enTrans = `quarter to ${nextEn}`;
      break;
    case 50:
      phrase = `tien voor ${nextDutch}`;
      arTrans = `الساعة ${nextAr} إلا عشر دقائق`;
      tiTrans = `ንሰዓት ${nextTi} ዓሰርተ ደቂቕ ጎደል`;
      omTrans = `${nextOm} ta\'uuf daqiiqaa kudhan hafe`;
      enTrans = `ten to ${nextEn}`;
      break;
    case 55:
      phrase = `vijf voor ${nextDutch}`;
      arTrans = `الساعة ${nextAr} إلا خمس دقائق`;
      tiTrans = `ንሰዓት ${nextTi} ሓሙሽተ ደቂቕ ጎደል`;
      omTrans = `${nextOm} ta\'uuf daqiiqaa shan hafe`;
      enTrans = `five to ${nextEn}`;
      break;
  }

  const sentence = `Het is nu ${phrase}.`;
  const timeDigital = `${String(currentH).padStart(2, '0')}:${String(m).padStart(2, '0')}`;

  return {
    phrase,
    sentence,
    timeDigital,
    translations: {
      ar: `${arTrans}. (${sentence})`,
      ti: `${tiTrans}። (${sentence})`,
      om: `${omTrans}. (${sentence})`,
      en: `It is now ${enTrans}.`
    }
  };
}

const clockItems = [];
const minutesIntervals = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

for (let h = 1; h <= 12; h++) {
  for (const m of minutesIntervals) {
    const info = getClockInfo(h, m);
    const id = `clock_${String(h).padStart(2, '0')}_${String(m).padStart(2, '0')}`;
    clockItems.push({
      id: id,
      hours: h,
      minutes: m,
      timeDigital: info.timeDigital,
      phrase: info.phrase,
      sentence: info.sentence,
      translations: info.translations,
      svg: makeClockSvg(h, m)
    });
  }
}

console.log(`Generated ${clockItems.length} clock situations.`);

const jsonPath = path.join(__dirname, '..', 'data', 'clocks.json');
const jsPath = path.join(__dirname, '..', 'data', 'clocks.js');

fs.writeFileSync(jsonPath, JSON.stringify(clockItems, null, 2), 'utf-8');
console.log(`Wrote JSON to ${jsonPath}`);

const jsContent = `/**
 * TaalVriend Klok Kijken Database (${clockItems.length} Situaties)
 * 5-Minuten Intervallen (Analoog & Digitaal)
 */
window.TAALVRIEND_CLOCKS = ${JSON.stringify(clockItems, null, 2)};
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Wrote JS to ${jsPath}`);
