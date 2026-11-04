// scripts/generate-words.js
// Generates the comprehensive 360+ word database for TaalVriend
// With rich, scalable vector SVG artwork tailored for fullscreen display

const fs = require('fs');
const path = require('path');

// Helper to generate precise clock SVGs
function makeClockSvg(hours, minutes) {
  const minAngle = minutes * 6;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  // Clock numbers
  let numbersMarkup = '';
  for (let n = 1; n <= 12; n++) {
    const angle = (n * 30 - 90) * (Math.PI / 180);
    const nx = 120 + 72 * Math.cos(angle);
    const ny = 120 + 72 * Math.sin(angle) + 6;
    numbersMarkup += `<text x="${nx}" y="${ny}" font-size="16" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" fill="#334155" text-anchor="middle">${n}</text>`;
  }

  // Minute tick marks
  let ticks = '';
  for (let i = 0; i < 60; i++) {
    if (i % 5 !== 0) {
      const a = i * 6;
      ticks += `<line x1="120" y1="28" x2="120" y2="33" stroke="#94A3B8" stroke-width="2" transform="rotate(${a} 120 120)"/>`;
    } else {
      const a = i * 6;
      ticks += `<line x1="120" y1="26" x2="120" y2="36" stroke="#475569" stroke-width="3" transform="rotate(${a} 120 120)"/>`;
    }
  }

  return `
    <!-- Outer ring -->
    <circle cx="120" cy="120" r="102" fill="#FFFFFF" stroke="#1E293B" stroke-width="10"/>
    <circle cx="120" cy="120" r="94" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2"/>
    ${ticks}
    ${numbersMarkup}
    <!-- Hour Hand -->
    <line x1="120" y1="120" x2="120" y2="70" stroke="#0F172A" stroke-width="8" stroke-linecap="round" transform="rotate(${hourAngle} 120 120)"/>
    <!-- Minute Hand -->
    <line x1="120" y1="120" x2="120" y2="44" stroke="#2563EB" stroke-width="5" stroke-linecap="round" transform="rotate(${minAngle} 120 120)"/>
    <!-- Center Pin -->
    <circle cx="120" cy="120" r="8" fill="#EF4444"/>
    <circle cx="120" cy="120" r="3" fill="#FFFFFF"/>
  `.trim();
}

// Master SVG Generator
function generateSvg(item) {
  const bg = item.bg || '#F8FAFC';
  const id = item.id;

  // ViewBox 240x240 with rounded frame
  const wrap = (content) => `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240" width="100%" height="100%">
  <defs>
    <linearGradient id="grad_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="${bg}" stop-opacity="1"/>
    </linearGradient>
    <filter id="shadow_${id}" x="-10%" y="-10%" width="125%" height="125%">
      <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.12"/>
    </filter>
  </defs>
  <rect width="240" height="240" rx="36" fill="url(#grad_${id})"/>
  <g filter="url(#shadow_${id})">
    ${content}
  </g>
</svg>`.trim();

  // If clock item
  if (item.category === 'Klok Kijken' && item.timeHours !== undefined) {
    return wrap(makeClockSvg(item.timeHours, item.timeMinutes));
  }

  // ==========================================
  // TRAFFIC SIGNS
  // ==========================================
  switch (id) {
    case 'stopbord':
      return wrap(`
        <polygon points="80,40 160,40 200,80 200,160 160,200 80,200 40,160 40,80" fill="#DC2626" stroke="#FFFFFF" stroke-width="6"/>
        <text x="120" y="132" font-size="34" font-family="'Arial Black', Impact, sans-serif" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="1">STOP</text>
      `);
    case 'voorrang_verlenen':
      return wrap(`
        <polygon points="120,195 40,55 200,55" fill="#FFFFFF" stroke="#DC2626" stroke-width="16" stroke-linejoin="round"/>
      `);
    case 'voorrangsweg':
      return wrap(`
        <polygon points="120,40 200,120 120,200 40,120" fill="#FFFFFF" stroke="#334155" stroke-width="4"/>
        <polygon points="120,58 182,120 120,182 58,120" fill="#FBBF24"/>
      `);
    case 'fietspad_bord':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#0284C7" stroke="#FFFFFF" stroke-width="6"/>
        <g transform="translate(42, 65) scale(0.78)" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="40" cy="95" r="28"/>
          <circle cx="150" cy="95" r="28"/>
          <polyline points="40,95 80,95 118,50 78,50 40,95"/>
          <line x1="80" y1="95" x2="72" y2="40"/>
          <line x1="60" y1="40" x2="84" y2="40" stroke-width="9"/>
          <line x1="118" y1="50" x2="150" y2="95"/>
          <line x1="118" y1="50" x2="124" y2="30"/>
          <line x1="110" y1="30" x2="136" y2="30" stroke-width="9"/>
        </g>
      `);
    case 'voetpad_bord':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#0284C7" stroke="#FFFFFF" stroke-width="6"/>
        <circle cx="100" cy="80" r="14" fill="#FFFFFF"/>
        <path d="M88 100 C88 95 112 95 112 100 L115 145 L102 145 L100 175 L92 175 L94 145 L85 145 Z" fill="#FFFFFF"/>
        <circle cx="140" cy="105" r="10" fill="#FFFFFF"/>
        <path d="M130 120 C130 116 150 116 150 120 L152 152 L142 152 L140 175 L134 175 L136 152 L128 152 Z" fill="#FFFFFF"/>
        <line x1="108" y1="120" x2="130" y2="128" stroke="#FFFFFF" stroke-width="4" stroke-linecap="round"/>
      `);
    case 'inrijverbod':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#DC2626" stroke="#FFFFFF" stroke-width="6"/>
        <rect x="55" y="106" width="130" height="28" rx="6" fill="#FFFFFF"/>
      `);
    case 'eenrichtingsweg':
      return wrap(`
        <rect x="45" y="45" width="150" height="150" rx="14" fill="#0284C7" stroke="#FFFFFF" stroke-width="5"/>
        <path d="M120 62 L160 106 L134 106 L134 178 L106 178 L106 106 L80 106 Z" fill="#FFFFFF"/>
      `);
    case 'rotonde_bord':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#0284C7" stroke="#FFFFFF" stroke-width="6"/>
        <g stroke="#FFFFFF" stroke-width="7" fill="none" stroke-linecap="round">
          <path d="M120 68 A52 52 0 0 1 165 146"/>
          <polyline points="152,148 165,148 168,135" fill="#FFFFFF"/>
          <path d="M165 146 A52 52 0 0 1 75 146"/>
          <polyline points="75,135 75,148 88,148" fill="#FFFFFF"/>
          <path d="M75 146 A52 52 0 0 1 120 68"/>
          <polyline points="120,78 120,65 108,68" fill="#FFFFFF"/>
        </g>
      `);
    case 'max_snelheid_30':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#FFFFFF" stroke="#DC2626" stroke-width="16"/>
        <text x="120" y="138" font-size="52" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#0F172A" text-anchor="middle">30</text>
      `);
    case 'max_snelheid_50':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#FFFFFF" stroke="#DC2626" stroke-width="16"/>
        <text x="120" y="138" font-size="52" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#0F172A" text-anchor="middle">50</text>
      `);
    case 'zebrapad_bord':
      return wrap(`
        <rect x="45" y="45" width="150" height="150" rx="14" fill="#0284C7" stroke="#FFFFFF" stroke-width="5"/>
        <polygon points="120,55 185,175 55,175" fill="#FFFFFF"/>
        <circle cx="120" cy="88" r="9" fill="#0F172A"/>
        <path d="M112 102 C112 98 128 98 128 102 L132 128 L118 132 L112 158 L104 158 L114 128 L108 128 Z" fill="#0F172A"/>
        <line x1="72" y1="168" x2="88" y2="168" stroke="#0F172A" stroke-width="4"/>
        <line x1="96" y1="168" x2="112" y2="168" stroke="#0F172A" stroke-width="4"/>
        <line x1="120" y1="168" x2="136" y2="168" stroke="#0F172A" stroke-width="4"/>
        <line x1="144" y1="168" x2="160" y2="168" stroke="#0F172A" stroke-width="4"/>
      `);
    case 'parkeren_bord':
      return wrap(`
        <rect x="45" y="45" width="150" height="150" rx="14" fill="#0284C7" stroke="#FFFFFF" stroke-width="5"/>
        <text x="120" y="152" font-size="108" font-family="'Arial Black', sans-serif" font-weight="900" fill="#FFFFFF" text-anchor="middle">P</text>
      `);
    case 'parkeerverbod':
      return wrap(`
        <circle cx="120" cy="120" r="82" fill="#0284C7" stroke="#DC2626" stroke-width="16"/>
        <line x1="62" y1="62" x2="178" y2="178" stroke="#DC2626" stroke-width="16" stroke-linecap="round"/>
      `);
    case 'drempel_bord':
      return wrap(`
        <polygon points="120,40 205,185 35,185" fill="#FFFFFF" stroke="#DC2626" stroke-width="16" stroke-linejoin="round"/>
        <path d="M75 160 C75 160 90 135 120 135 C150 135 165 160 165 160 Z" fill="#0F172A"/>
      `);

    // ==========================================
    // MEDICAL / GP / DENTIST
    // ==========================================
    case 'afspraak_maken':
      return wrap(`
        <rect x="55" y="60" width="130" height="120" rx="12" fill="#FFFFFF" stroke="#0284C7" stroke-width="5"/>
        <rect x="55" y="60" width="130" height="36" fill="#0284C7"/>
        <circle cx="85" cy="50" r="6" fill="#64748B"/>
        <circle cx="155" cy="50" r="6" fill="#64748B"/>
        <circle cx="120" cy="130" r="28" fill="#F0F9FF" stroke="#0284C7" stroke-width="4"/>
        <polyline points="120,115 120,130 135,130" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>
      `);
    case 'wachtkamer':
      return wrap(`
        <rect x="50" y="100" width="55" height="50" rx="6" fill="#3B82F6"/>
        <line x1="58" y1="150" x2="55" y2="185" stroke="#1E40AF" stroke-width="6"/>
        <line x1="97" y1="150" x2="100" y2="185" stroke="#1E40AF" stroke-width="6"/>
        <rect x="135" y="100" width="55" height="50" rx="6" fill="#3B82F6"/>
        <line x1="143" y1="150" x2="140" y2="185" stroke="#1E40AF" stroke-width="6"/>
        <line x1="182" y1="150" x2="185" y2="185" stroke="#1E40AF" stroke-width="6"/>
        <circle cx="120" cy="65" r="18" fill="#F8FAFC" stroke="#64748B" stroke-width="3"/>
        <polyline points="120,55 120,65 128,65" stroke="#0F172A" stroke-width="2"/>
      `);
    case 'bloeddruk_meten':
      return wrap(`
        <rect x="55" y="65" width="75" height="110" rx="10" fill="#F8FAFC" stroke="#64748B" stroke-width="4"/>
        <rect x="68" y="80" width="50" height="40" rx="4" fill="#0F172A"/>
        <text x="93" y="108" font-size="22" font-family="monospace" font-weight="bold" fill="#10B981" text-anchor="middle">120</text>
        <path d="M130 120 C160 120 160 85 180 85 L180 155 L150 155 Z" fill="#3B82F6" stroke="#1D4ED8" stroke-width="4"/>
        <circle cx="93" cy="150" r="8" fill="#EF4444"/>
      `);
    case 'bloed_prikken':
      return wrap(`
        <g transform="rotate(25 120 120)">
          <rect x="105" y="45" width="30" height="110" rx="15" fill="#E0F2FE" stroke="#0284C7" stroke-width="4"/>
          <path d="M105 105 L135 105 L135 140 C135 148 128 155 120 155 C112 155 105 148 105 140 Z" fill="#DC2626"/>
          <rect x="100" y="38" width="40" height="12" rx="3" fill="#64748B"/>
        </g>
        <path d="M75 160 C75 160 60 178 60 188 C60 196 67 202 75 202 C83 202 90 196 90 188 C90 178 75 160 75 160 Z" fill="#EF4444"/>
      `);
    case 'vaccinatie':
      return wrap(`
        <g transform="rotate(-45 120 120)">
          <rect x="110" y="70" width="20" height="80" rx="3" fill="#E0F2FE" stroke="#0284C7" stroke-width="3"/>
          <rect x="113" y="95" width="14" height="45" fill="#38BDF8"/>
          <line x1="120" y1="150" x2="120" y2="185" stroke="#94A3B8" stroke-width="3"/>
          <line x1="120" y1="70" x2="120" y2="35" stroke="#64748B" stroke-width="5"/>
          <rect x="105" y="30" width="30" height="8" rx="2" fill="#475569"/>
        </g>
      `);
    case 'spreekuur':
      return wrap(`
        <rect x="50" y="115" width="140" height="55" rx="6" fill="#B45309"/>
        <circle cx="120" cy="70" r="24" fill="#FED7AA"/>
        <path d="M96 115 C96 95 144 95 144 115" fill="#F8FAFC"/>
        <rect x="140" y="100" width="30" height="35" rx="3" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2"/>
        <line x1="145" y1="110" x2="165" y2="110" stroke="#0284C7" stroke-width="2"/>
        <line x1="145" y1="118" x2="165" y2="118" stroke="#0284C7" stroke-width="2"/>
      `);
    case 'doorverwijzing':
      return wrap(`
        <rect x="60" y="45" width="120" height="150" rx="8" fill="#FFFFFF" stroke="#0284C7" stroke-width="5"/>
        <rect x="75" y="60" width="90" height="18" fill="#E0F2FE" rx="3"/>
        <rect x="115" y="62" width="10" height="14" fill="#EF4444"/>
        <rect x="111" y="66" width="18" height="6" fill="#EF4444"/>
        <line x1="75" y1="95" x2="165" y2="95" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
        <line x1="75" y1="115" x2="165" y2="115" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
        <line x1="75" y1="135" x2="135" y2="135" stroke="#94A3B8" stroke-width="4" stroke-linecap="round"/>
        <path d="M130 160 L145 145 L160 160" fill="none" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
      `);
    case 'gaatje_vullen':
      return wrap(`
        <path d="M120 60 C90 60 78 85 78 120 C78 155 90 195 102 195 C114 195 114 155 120 155 C126 155 126 195 138 195 C150 195 162 155 162 120 C162 85 150 60 120 60 Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="5"/>
        <ellipse cx="108" cy="95" rx="14" ry="10" fill="#94A3B8"/>
        <ellipse cx="108" cy="95" rx="8" ry="5" fill="#FDE047"/>
      `);
    case 'kies_trekken':
      return wrap(`
        <path d="M120 85 C95 85 85 105 85 135 C85 165 95 195 105 195 C115 195 115 160 120 160 C125 160 125 195 135 195 C145 195 155 165 155 135 C155 105 145 85 120 85 Z" fill="#FFFFFF" stroke="#EF4444" stroke-width="4"/>
        <path d="M80 50 C80 80 110 85 110 85" stroke="#64748B" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M160 50 C160 80 130 85 130 85" stroke="#64748B" stroke-width="6" fill="none" stroke-linecap="round"/>
      `);
    case 'verdoving':
      return wrap(`
        <g transform="rotate(30 120 120)">
          <rect x="112" y="60" width="16" height="75" rx="3" fill="#E2E8F0" stroke="#0284C7" stroke-width="3"/>
          <line x1="120" y1="135" x2="120" y2="180" stroke="#64748B" stroke-width="3"/>
          <circle cx="120" cy="188" r="4" fill="#38BDF8"/>
          <line x1="120" y1="60" x2="120" y2="35" stroke="#0284C7" stroke-width="5"/>
          <circle cx="120" cy="30" r="10" fill="none" stroke="#0284C7" stroke-width="4"/>
        </g>
      `);
    case 'verpleegkundige':
      return wrap(`
        <circle cx="120" cy="85" r="30" fill="#FED7AA"/>
        <path d="M92 65 L148 65 L142 45 L98 45 Z" fill="#FFFFFF" stroke="#CBD5E1" stroke-width="2"/>
        <rect x="117" y="48" width="6" height="12" fill="#EF4444"/>
        <rect x="114" y="51" width="12" height="6" fill="#EF4444"/>
        <path d="M75 190 C75 145 95 130 120 130 C145 130 165 145 165 190 Z" fill="#0284C7"/>
        <path d="M100 130 C100 160 140 160 140 130" stroke="#FDE047" stroke-width="4" fill="none"/>
      `);
    case 'fysiotherapie':
      return wrap(`
        <ellipse cx="120" cy="65" rx="22" ry="12" fill="#3B82F6"/>
        <ellipse cx="120" cy="95" rx="25" ry="12" fill="#2563EB"/>
        <ellipse cx="120" cy="125" rx="28" ry="12" fill="#1D4ED8"/>
        <ellipse cx="120" cy="155" rx="26" ry="12" fill="#1E40AF"/>
        <polygon points="70,105 75,115 85,120 75,125 70,135 65,125 55,120 65,115" fill="#F59E0B"/>
        <polygon points="170,105 175,115 185,120 175,125 170,135 165,125 155,120 165,115" fill="#F59E0B"/>
      `);
    case 'oogarts':
      return wrap(`
        <ellipse cx="120" cy="115" rx="65" ry="40" fill="#FFFFFF" stroke="#0284C7" stroke-width="5"/>
        <circle cx="120" cy="115" r="26" fill="#0284C7"/>
        <circle cx="120" cy="115" r="13" fill="#0F172A"/>
        <circle cx="125" cy="110" r="4" fill="#FFFFFF"/>
        <polygon points="120,40 100,75 140,75" fill="#FDE047" opacity="0.6"/>
      `);

    // ==========================================
    // SOCIAL RELATIONS
    // ==========================================
    case 'getrouwd':
      return wrap(`
        <circle cx="95" cy="120" r="38" fill="none" stroke="#F59E0B" stroke-width="12"/>
        <circle cx="145" cy="120" r="38" fill="none" stroke="#F59E0B" stroke-width="12"/>
        <polygon points="95,65 102,75 112,82 102,89 95,99 88,89 78,82 88,75" fill="#38BDF8"/>
      `);
    case 'gescheiden':
      return wrap(`
        <path d="M70 120 C70 90 95 70 120 70" fill="none" stroke="#94A3B8" stroke-width="12" stroke-linecap="round"/>
        <path d="M70 120 C70 150 95 170 120 170" fill="none" stroke="#94A3B8" stroke-width="12" stroke-linecap="round"/>
        <line x1="120" y1="50" x2="120" y2="190" stroke="#EF4444" stroke-width="8" stroke-dasharray="10,8" stroke-linecap="round"/>
        <path d="M170 120 C170 90 145 70 120 70" fill="none" stroke="#94A3B8" stroke-width="12" stroke-linecap="round"/>
        <path d="M170 120 C170 150 145 170 120 170" fill="none" stroke="#94A3B8" stroke-width="12" stroke-linecap="round"/>
      `);
    case 'partner':
      return wrap(`
        <circle cx="85" cy="90" r="24" fill="#FED7AA"/>
        <path d="M55 175 C55 140 70 130 85 130 C100 130 115 140 115 175 Z" fill="#2563EB"/>
        <circle cx="155" cy="90" r="24" fill="#FED7AA"/>
        <path d="M125 175 C125 140 140 130 155 130 C170 130 185 140 185 175 Z" fill="#EC4899"/>
        <path d="M120 100 C110 85 90 95 120 125 C150 95 130 85 120 100 Z" fill="#EF4444"/>
      `);
    case 'samenwonen':
      return wrap(`
        <polygon points="120,45 50,105 190,105" fill="#EF4444"/>
        <rect x="65" y="105" width="110" height="85" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/>
        <rect x="90" y="125" width="60" height="40" rx="4" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>
        <circle cx="105" cy="142" r="8" fill="#F59E0B"/>
        <circle cx="135" cy="142" r="8" fill="#EC4899"/>
      `);
    case 'collega':
      return wrap(`
        <circle cx="80" cy="85" r="22" fill="#FED7AA"/>
        <path d="M55 160 C55 135 70 125 80 125 C90 125 105 135 105 160 Z" fill="#3B82F6"/>
        <circle cx="160" cy="85" r="22" fill="#FED7AA"/>
        <path d="M135 160 C135 135 150 125 160 125 C170 125 185 135 185 160 Z" fill="#10B981"/>
        <rect x="70" y="155" width="100" height="15" rx="3" fill="#64748B"/>
        <rect x="105" y="140" width="30" height="18" rx="2" fill="#0F172A"/>
      `);
    case 'verliefd':
      return wrap(`
        <path d="M120 85 C100 50 50 65 50 105 C50 145 120 195 120 195 C120 195 190 145 190 105 C190 65 140 50 120 85 Z" fill="#EF4444"/>
        <polygon points="50,45 55,55 65,60 55,65 50,75 45,65 35,60 45,55" fill="#FDE047"/>
        <polygon points="190,45 195,55 205,60 195,65 190,75 185,65 175,60 185,55" fill="#FDE047"/>
      `);
    case 'alleenstaand':
      return wrap(`
        <circle cx="120" cy="85" r="28" fill="#FED7AA"/>
        <path d="M85 180 C85 145 100 135 120 135 C140 135 155 145 155 180 Z" fill="#0284C7"/>
        <circle cx="170" cy="65" r="16" fill="#FBBF24"/>
      `);
    case 'kennismaken':
      return wrap(`
        <path d="M60 105 L100 120 L120 105 L140 120 L180 105" stroke="#B45309" stroke-width="14" stroke-linecap="round" fill="none"/>
        <path d="M85 135 L120 120 L155 135" stroke="#F59E0B" stroke-width="12" stroke-linecap="round" fill="none"/>
        <rect x="65" y="50" width="45" height="30" rx="8" fill="#3B82F6"/>
        <text x="87" y="70" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Hoi!</text>
        <rect x="130" y="50" width="50" height="30" rx="8" fill="#10B981"/>
        <text x="155" y="70" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">Hallo!</text>
      `);
    case 'op_bezoek':
      return wrap(`
        <rect x="60" y="50" width="120" height="150" rx="6" fill="#FEF3C7" stroke="#B45309" stroke-width="4"/>
        <rect x="75" y="65" width="50" height="135" fill="#B45309"/>
        <polygon points="125,65 170,80 170,200 125,200" fill="#FDE047"/>
        <circle cx="160" cy="140" r="4" fill="#B45309"/>
      `);
    case 'buren':
      return wrap(`
        <polygon points="80,75 40,110 120,110" fill="#EF4444"/>
        <rect x="50" y="110" width="60" height="65" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
        <polygon points="160,75 120,110 200,110" fill="#3B82F6"/>
        <rect x="130" y="110" width="60" height="65" fill="#F0F9FF" stroke="#0284C7" stroke-width="3"/>
        <line x1="110" y1="145" x2="130" y2="145" stroke="#78350F" stroke-width="4"/>
        <line x1="115" y1="135" x2="115" y2="175" stroke="#78350F" stroke-width="3"/>
        <line x1="125" y1="135" x2="125" y2="175" stroke="#78350F" stroke-width="3"/>
      `);
    case 'feliciteren':
      return wrap(`
        <rect x="70" y="110" width="100" height="80" rx="8" fill="#EC4899" stroke="#BE185D" stroke-width="4"/>
        <rect x="65" y="95" width="110" height="20" rx="4" fill="#F43F5E"/>
        <line x1="120" y1="95" x2="120" y2="190" stroke="#FDE047" stroke-width="12"/>
        <path d="M120 95 C100 65 75 75 95 95 C115 115 120 95 120 95" fill="#FDE047"/>
        <path d="M120 95 C140 65 165 75 145 95 C125 115 120 95 120 95" fill="#FDE047"/>
      `);
    case 'afspreken':
      return wrap(`
        <circle cx="120" cy="120" r="70" fill="#F8FAFC" stroke="#0284C7" stroke-width="6"/>
        <polyline points="120,70 120,120 155,120" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
        <rect x="60" y="145" width="25" height="28" rx="4" fill="#D97706"/>
        <rect x="155" y="145" width="25" height="28" rx="4" fill="#D97706"/>
      `);

    // ==========================================
    // EMOTIONS
    // ==========================================
    case 'trots':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <circle cx="95" cy="105" r="7" fill="#713F12"/>
        <circle cx="145" cy="105" r="7" fill="#713F12"/>
        <path d="M92 135 Q120 165 148 135" stroke="#713F12" stroke-width="7" stroke-linecap="round" fill="none"/>
        <circle cx="120" cy="195" r="16" fill="#F59E0B" stroke="#D97706" stroke-width="3"/>
        <text x="120" y="201" font-size="16" font-weight="900" fill="#FFFFFF" text-anchor="middle">1</text>
      `);
    case 'zenuwachtig':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <circle cx="95" cy="105" r="8" fill="#713F12"/>
        <circle cx="145" cy="105" r="8" fill="#713F12"/>
        <path d="M90 145 Q105 135 120 145 Q135 155 150 145" stroke="#713F12" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M165 85 C165 85 178 98 178 108 C178 115 172 120 165 120 C158 120 152 115 152 108 C152 98 165 85 165 85 Z" fill="#38BDF8"/>
      `);
    case 'opgelucht':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#ECFDF5" stroke="#10B981" stroke-width="6"/>
        <path d="M85 105 Q95 95 105 105" stroke="#065F46" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M135 105 Q145 95 155 105" stroke="#065F46" stroke-width="5" stroke-linecap="round" fill="none"/>
        <path d="M95 135 Q120 155 145 135" stroke="#065F46" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M160 145 Q180 140 195 150" stroke="#6EE7B7" stroke-width="4" stroke-linecap="round" fill="none"/>
      `);
    case 'eenzaam':
      return wrap(`
        <rect x="40" y="40" width="160" height="160" rx="20" fill="#0F172A"/>
        <circle cx="170" cy="75" r="18" fill="#FDE047"/>
        <circle cx="164" cy="71" r="16" fill="#0F172A"/>
        <circle cx="110" cy="140" r="14" fill="#94A3B8"/>
        <path d="M95 185 C95 165 125 165 125 185 Z" fill="#64748B"/>
      `);
    case 'enthousiast':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <polygon points="95,95 98,105 108,105 100,111 103,121 95,115 87,121 90,111 82,105 92,105" fill="#F59E0B"/>
        <polygon points="145,95 148,105 158,105 150,111 153,121 145,115 137,121 140,111 132,105 142,105" fill="#F59E0B"/>
        <path d="M90 135 Q120 175 150 135 Z" fill="#DC2626"/>
      `);
    case 'verlegen':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <circle cx="95" cy="108" r="6" fill="#713F12"/>
        <circle cx="145" cy="108" r="6" fill="#713F12"/>
        <circle cx="80" cy="122" r="12" fill="#F43F5E" opacity="0.45"/>
        <circle cx="160" cy="122" r="12" fill="#F43F5E" opacity="0.45"/>
        <path d="M105 138 Q120 148 135 138" stroke="#713F12" stroke-width="5" stroke-linecap="round" fill="none"/>
      `);
    case 'verrast':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <circle cx="95" cy="100" r="10" fill="#FFFFFF" stroke="#713F12" stroke-width="4"/>
        <circle cx="95" cy="100" r="4" fill="#713F12"/>
        <circle cx="145" cy="100" r="10" fill="#FFFFFF" stroke="#713F12" stroke-width="4"/>
        <circle cx="145" cy="100" r="4" fill="#713F12"/>
        <ellipse cx="120" cy="145" rx="14" ry="20" fill="#713F12"/>
      `);
    case 'teleurgesteld':
      return wrap(`
        <circle cx="120" cy="120" r="62" fill="#DBEAFE" stroke="#3B82F6" stroke-width="6"/>
        <path d="M85 105 L105 112" stroke="#1E3A8A" stroke-width="5" stroke-linecap="round"/>
        <path d="M155 105 L135 112" stroke="#1E3A8A" stroke-width="5" stroke-linecap="round"/>
        <path d="M95 152 Q120 135 145 152" stroke="#1E3A8A" stroke-width="6" stroke-linecap="round" fill="none"/>
      `);
    case 'dankbaar':
      return wrap(`
        <path d="M105 170 L105 85 C105 75 120 75 120 85 L120 170" fill="#FED7AA" stroke="#D97706" stroke-width="4"/>
        <path d="M135 170 L135 85 C135 75 120 75 120 85 L120 170" fill="#FED7AA" stroke="#D97706" stroke-width="4"/>
        <path d="M120 40 C110 25 90 35 120 60 C150 35 130 25 120 40 Z" fill="#EF4444"/>
      `);
    case 'heimwee':
      return wrap(`
        <rect x="40" y="40" width="160" height="160" rx="20" fill="#FFF7ED"/>
        <circle cx="120" cy="155" r="45" fill="#F97316"/>
        <line x1="40" y1="155" x2="200" y2="155" stroke="#0284C7" stroke-width="6"/>
        <path d="M100 95 Q115 80 130 95 Q145 80 160 95 Q130 105 100 95 Z" fill="#0F172A"/>
      `);
    case 'nieuwsgierig':
      return wrap(`
        <circle cx="105" cy="105" r="42" fill="none" stroke="#2563EB" stroke-width="12"/>
        <circle cx="105" cy="105" r="32" fill="#E0F2FE" opacity="0.6"/>
        <line x1="135" y1="135" x2="185" y2="185" stroke="#78350F" stroke-width="16" stroke-linecap="round"/>
        <circle cx="105" cy="105" r="12" fill="#0F172A"/>
        <circle cx="109" cy="101" r="4" fill="#FFFFFF"/>
      `);
    case 'geduldig':
      return wrap(`
        <polygon points="80,55 160,55 120,120 160,185 80,185 120,120" fill="#FEF3C7" stroke="#B45309" stroke-width="6"/>
        <rect x="70" y="45" width="100" height="12" rx="3" fill="#78350F"/>
        <rect x="70" y="183" width="100" height="12" rx="3" fill="#78350F"/>
        <polygon points="110,140 130,140 145,180 95,180" fill="#F59E0B"/>
      `);

    // ==========================================
    // POLITIEK & DEMOCRATIE
    // ==========================================
    case 'democratie':
      return wrap(`
        <rect x="60" y="90" width="120" height="95" rx="8" fill="#F8FAFC" stroke="#0284C7" stroke-width="5"/>
        <rect x="80" y="90" width="80" height="12" fill="#0284C7"/>
        <line x1="100" y1="90" x2="140" y2="90" stroke="#FFFFFF" stroke-width="4"/>
        <rect x="105" y="55" width="30" height="40" rx="3" fill="#FFFFFF" stroke="#DC2626" stroke-width="3"/>
        <polyline points="112,75 118,82 128,68" stroke="#10B981" stroke-width="3" fill="none"/>
      `);
    case 'stemmen_verkiezingen':
      return wrap(`
        <circle cx="95" cy="120" r="32" fill="#FFFFFF" stroke="#0F172A" stroke-width="4"/>
        <circle cx="95" cy="120" r="24" fill="#DC2626"/>
        <g transform="rotate(-40 150 100)">
          <rect x="135" y="40" width="22" height="90" rx="3" fill="#DC2626"/>
          <polygon points="135,130 157,130 146,155" fill="#FED7AA"/>
          <polygon points="143,148 149,148 146,155" fill="#DC2626"/>
        </g>
      `);
    case 'tweede_kamer':
      return wrap(`
        <path d="M50 160 A70 70 0 0 1 190 160" stroke="#0284C7" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M68 135 A52 52 0 0 1 172 135" stroke="#38BDF8" stroke-width="14" fill="none" stroke-linecap="round"/>
        <rect x="105" y="150" width="30" height="35" rx="4" fill="#B45309"/>
      `);
    case 'koning':
      return wrap(`
        <path d="M50 155 L65 95 L95 125 L120 75 L145 125 L175 95 L190 155 Z" fill="#FBBF24" stroke="#D97706" stroke-width="5"/>
        <rect x="45" y="155" width="150" height="22" rx="5" fill="#DC2626"/>
        <circle cx="75" cy="166" r="5" fill="#FFFFFF"/>
        <circle cx="120" cy="166" r="6" fill="#38BDF8"/>
        <circle cx="165" cy="166" r="5" fill="#FFFFFF"/>
      `);
    case 'grondwet':
      return wrap(`
        <rect x="60" y="45" width="120" height="150" rx="8" fill="#1E3A8A" stroke="#172554" stroke-width="5"/>
        <rect x="75" y="65" width="90" height="110" rx="4" fill="#FEF3C7"/>
        <text x="120" y="95" font-size="14" font-weight="900" fill="#1E3A8A" text-anchor="middle">GRONDWET</text>
        <line x1="85" y1="110" x2="155" y2="110" stroke="#B45309" stroke-width="2"/>
        <text x="120" y="130" font-size="16" font-weight="bold" fill="#DC2626" text-anchor="middle">Artikel 1</text>
        <line x1="85" y1="145" x2="155" y2="145" stroke="#94A3B8" stroke-width="2"/>
        <line x1="85" y1="155" x2="135" y2="155" stroke="#94A3B8" stroke-width="2"/>
      `);
    case 'vrijheid_meningsuiting':
      return wrap(`
        <polygon points="85,90 145,60 145,150 85,120" fill="#EF4444" stroke="#DC2626" stroke-width="4"/>
        <rect x="60" y="90" width="25" height="30" rx="3" fill="#64748B"/>
        <path d="M72 120 L75 160 L90 160 L85 120" fill="#475569"/>
        <path d="M160 85 C175 95 175 115 160 125" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
        <path d="M175 70 C200 90 200 120 175 140" fill="none" stroke="#F59E0B" stroke-width="5" stroke-linecap="round"/>
      `);
    case 'gelijkheid':
      return wrap(`
        <line x1="120" y1="45" x2="120" y2="185" stroke="#B45309" stroke-width="8" stroke-linecap="round"/>
        <line x1="60" y1="75" x2="180" y2="75" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <polyline points="60,75 45,120 75,120 60,75" stroke="#64748B" stroke-width="2" fill="none"/>
        <path d="M35 120 C35 140 85 140 85 120 Z" fill="#FBBF24"/>
        <polyline points="180,75 165,120 195,120 180,75" stroke="#64748B" stroke-width="2" fill="none"/>
        <path d="M155 120 C155 140 205 140 205 120 Z" fill="#FBBF24"/>
      `);
    case 'minister_president':
      return wrap(`
        <rect x="80" y="110" width="80" height="70" rx="6" fill="#334155"/>
        <rect x="100" y="90" width="40" height="20" rx="2" fill="#0284C7"/>
        <circle cx="120" cy="65" r="24" fill="#FED7AA"/>
        <line x1="105" y1="88" x2="115" y2="98" stroke="#0F172A" stroke-width="4"/>
        <line x1="135" y1="88" x2="125" y2="98" stroke="#0F172A" stroke-width="4"/>
      `);
    case 'burgemeester':
      return wrap(`
        <circle cx="120" cy="75" r="28" fill="#FED7AA"/>
        <path d="M75 180 C75 140 95 125 120 125 C145 125 165 140 165 180 Z" fill="#1E293B"/>
        <path d="M92 125 C92 165 148 165 148 125" fill="none" stroke="#F59E0B" stroke-width="5"/>
        <circle cx="120" cy="162" r="10" fill="#F59E0B"/>
      `);
    case 'wet':
      return wrap(`
        <g transform="rotate(-30 120 120)">
          <rect x="90" y="80" width="60" height="35" rx="5" fill="#78350F" stroke="#451A03" stroke-width="3"/>
          <rect x="85" y="75" width="70" height="8" rx="2" fill="#D97706"/>
          <rect x="85" y="112" width="70" height="8" rx="2" fill="#D97706"/>
          <line x1="120" y1="115" x2="120" y2="185" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
        </g>
        <rect x="80" y="170" width="80" height="15" rx="4" fill="#B45309"/>
      `);
    case 'demonstratie':
      return wrap(`
        <rect x="60" y="55" width="120" height="65" rx="6" fill="#FFFFFF" stroke="#0F172A" stroke-width="4"/>
        <line x1="120" y1="120" x2="120" y2="190" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
        <circle cx="120" cy="87" r="20" fill="none" stroke="#2563EB" stroke-width="4"/>
        <line x1="120" y1="67" x2="120" y2="107" stroke="#2563EB" stroke-width="4"/>
        <line x1="120" y1="87" x2="106" y2="101" stroke="#2563EB" stroke-width="4"/>
        <line x1="120" y1="87" x2="134" y2="101" stroke="#2563EB" stroke-width="4"/>
      `);

    // ==========================================
    // DRINKS
    // ==========================================
    case 'sinaasappelsap':
      return wrap(`
        <path d="M85 70 L95 180 C95 188 105 192 120 192 C135 192 145 188 145 180 L155 70 Z" fill="#FED7AA" stroke="#EA580C" stroke-width="4"/>
        <path d="M88 105 L95 178 C95 184 105 188 120 188 C135 188 145 184 145 178 L152 105 Z" fill="#F97316"/>
        <circle cx="155" cy="70" r="22" fill="#FB923C" stroke="#EA580C" stroke-width="3"/>
        <line x1="130" y1="35" x2="100" y2="140" stroke="#10B981" stroke-width="5" stroke-linecap="round"/>
      `);
    case 'appelsap':
      return wrap(`
        <path d="M85 70 L95 180 C95 188 105 192 120 192 C135 192 145 188 145 180 L155 70 Z" fill="#FEF9C3" stroke="#CA8A04" stroke-width="4"/>
        <path d="M88 105 L95 178 C95 184 105 188 120 188 C135 188 145 184 145 178 L152 105 Z" fill="#FACC15"/>
        <ellipse cx="140" cy="55" rx="14" ry="7" transform="rotate(-30 140 55)" fill="#10B981"/>
      `);
    case 'water_prik':
      return wrap(`
        <rect x="95" y="45" width="50" height="20" rx="3" fill="#0284C7"/>
        <path d="M95 65 C95 85 75 95 75 130 L75 185 C75 192 85 195 120 195 C155 195 165 192 165 185 L165 130 C165 95 145 85 145 65 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="5"/>
        <circle cx="105" cy="160" r="5" fill="#38BDF8"/>
        <circle cx="130" cy="145" r="7" fill="#38BDF8"/>
        <circle cx="115" cy="125" r="4" fill="#38BDF8"/>
        <circle cx="135" cy="175" r="5" fill="#38BDF8"/>
      `);
    case 'water_zonder_prik':
      return wrap(`
        <polygon points="80,70 160,70 148,180 92,180" fill="#E0F2FE" stroke="#0284C7" stroke-width="5"/>
        <path d="M85 110 L92 176 C92 180 100 184 120 184 C140 184 148 180 148 176 L155 110 Z" fill="#38BDF8"/>
      `);
    case 'muntthee':
      return wrap(`
        <rect x="75" y="75" width="85" height="105" rx="10" fill="#ECFDF5" stroke="#10B981" stroke-width="4"/>
        <path d="M160 95 C180 95 180 145 160 145" stroke="#10B981" stroke-width="8" stroke-linecap="round" fill="none"/>
        <ellipse cx="115" cy="130" rx="18" ry="9" transform="rotate(-35 115 130)" fill="#059669"/>
        <ellipse cx="125" cy="150" rx="18" ry="9" transform="rotate(25 125 150)" fill="#10B981"/>
        <path d="M100 65 C100 50 110 45 110 35" stroke="#CBD5E1" stroke-width="3" stroke-linecap="round" fill="none"/>
      `);
    case 'warme_chocomel':
      return wrap(`
        <rect x="70" y="85" width="90" height="95" rx="12" fill="#78350F" stroke="#451A03" stroke-width="4"/>
        <path d="M160 105 C185 105 185 155 160 155" stroke="#78350F" stroke-width="10" stroke-linecap="round" fill="none"/>
        <path d="M75 85 C75 55 100 50 115 50 C130 50 155 55 155 85 Z" fill="#FFFFFF"/>
        <circle cx="115" cy="50" r="10" fill="#DC2626"/>
      `);
    case 'koffie_verkeerd':
      return wrap(`
        <polygon points="80,65 160,65 148,180 92,180" fill="#FFFFFF" stroke="#64748B" stroke-width="4"/>
        <polygon points="86,110 154,110 148,178 92,178" fill="#FDE68A"/>
        <polygon points="88,135 152,135 148,178 92,178" fill="#78350F"/>
        <rect x="80" y="65" width="80" height="25" fill="#FFFFFF"/>
      `);
    case 'frisdrank':
      return wrap(`
        <rect x="80" y="65" width="80" height="120" rx="14" fill="#DC2626" stroke="#991B1B" stroke-width="4"/>
        <ellipse cx="120" cy="65" rx="40" ry="10" fill="#E2E8F0"/>
        <ellipse cx="120" cy="185" rx="40" ry="10" fill="#991B1B"/>
        <text x="120" y="132" font-size="20" font-family="'Impact', sans-serif" font-weight="900" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">COLA</text>
      `);

    // ==========================================
    // NUMBERS EXTENSION
    // ==========================================
    case 'elf':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">11</text>
      `);
    case 'twaalf':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">12</text>
      `);
    case 'dertien':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">13</text>
      `);
    case 'twintig':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">20</text>
      `);
    case 'dertig':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">30</text>
      `);
    case 'vijftig':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.12"/>
        <text x="120" y="145" font-size="78" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">50</text>
      `);
    case 'duizend':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#059669" opacity="0.12"/>
        <text x="120" y="142" font-size="54" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#059669" text-anchor="middle">1000</text>
      `);
    case 'eerste':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#F59E0B" opacity="0.15"/>
        <text x="120" y="142" font-size="64" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#D97706" text-anchor="middle">1e</text>
      `);
    case 'tweede':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.15"/>
        <text x="120" y="142" font-size="64" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">2e</text>
      `);
    case 'derde':
      return wrap(`
        <circle cx="120" cy="120" r="65" fill="#2563EB" opacity="0.15"/>
        <text x="120" y="142" font-size="64" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" fill="#2563EB" text-anchor="middle">3e</text>
      `);

    // ==========================================
    // ALL PREVIOUS WORDS FROM ORIGINAL LIST
    // ==========================================
    case 'appel':
      return wrap(`
        <circle cx="120" cy="135" r="62" fill="#EF4444"/>
        <circle cx="120" cy="135" r="56" fill="#DC2626"/>
        <path d="M112 78 C115 58 130 45 130 45" stroke="#78350F" stroke-width="8" stroke-linecap="round" fill="none"/>
        <ellipse cx="142" cy="62" rx="18" ry="9" transform="rotate(-30 142 62)" fill="#10B981"/>
        <ellipse cx="102" cy="112" rx="10" ry="22" fill="#ffffff" opacity="0.35" transform="rotate(-20 102 112)"/>
      `);
    case 'brood':
      return wrap(`
        <path d="M55 155 C55 95 95 78 120 78 C145 78 185 95 185 155 C185 170 172 174 120 174 C68 174 55 170 55 155 Z" fill="#D97706"/>
        <path d="M62 152 C62 100 98 86 120 86 C142 86 178 100 178 152 Z" fill="#FBBF24"/>
        <ellipse cx="94" cy="114" rx="5" ry="15" fill="#B45309" transform="rotate(25 94 114)"/>
        <ellipse cx="120" cy="110" rx="5" ry="15" fill="#B45309"/>
        <ellipse cx="146" cy="114" rx="5" ry="15" fill="#B45309" transform="rotate(-25 146 114)"/>
      `);
    case 'water':
      return wrap(`
        <path d="M72 82 L86 180 C87 186 96 192 120 192 C144 192 153 186 154 180 L168 82 Z" fill="#E0F2FE" stroke="#0284C7" stroke-width="5"/>
        <path d="M80 120 L86 176 C87 182 96 186 120 186 C144 186 153 182 154 176 L160 120 C144 126 130 116 120 122 C110 116 96 126 80 120 Z" fill="#0284C7"/>
        <path d="M120 40 C120 40 142 68 142 82 C142 94 132 104 120 104 C108 104 98 94 98 82 C98 68 120 40 120 40 Z" fill="#38BDF8"/>
      `);
    case 'melk':
      return wrap(`
        <rect x="85" y="90" width="70" height="100" rx="10" fill="#FFFFFF" stroke="#94A3B8" stroke-width="4"/>
        <polygon points="85,90 97,60 143,60 155,90" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/>
        <rect x="108" y="50" width="24" height="12" rx="4" fill="#2563EB"/>
        <rect x="85" y="125" width="70" height="35" fill="#38BDF8"/>
        <circle cx="120" cy="142" r="12" fill="#FFFFFF"/>
        <text x="120" y="146" font-size="12" font-family="sans-serif" font-weight="bold" fill="#0284C7" text-anchor="middle">MILK</text>
      `);
    case 'banaan':
      return wrap(`
        <path d="M60 165 C80 185 155 180 185 95 C185 95 165 125 130 142 C100 156 72 152 60 165 Z" fill="#FBBF24" stroke="#D97706" stroke-width="3"/>
        <path d="M58 165 C60 168 64 169 68 165" stroke="#78350F" stroke-width="5"/>
        <path d="M185 95 L194 84" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
      `);
    case 'kaas':
      return wrap(`
        <polygon points="60,160 180,160 168,100 60,136" fill="#FBBF24" stroke="#D97706" stroke-width="5"/>
        <circle cx="90" cy="144" r="8" fill="#D97706" opacity="0.65"/>
        <circle cx="132" cy="145" r="10" fill="#D97706" opacity="0.65"/>
        <circle cx="150" cy="118" r="6" fill="#D97706" opacity="0.65"/>
        <circle cx="114" cy="125" r="9" fill="#D97706" opacity="0.65"/>
      `);
    case 'ei':
      return wrap(`
        <ellipse cx="120" cy="130" rx="52" ry="68" fill="#FEF3C7" stroke="#F59E0B" stroke-width="5"/>
        <ellipse cx="106" cy="112" rx="10" ry="22" fill="#FFFFFF" opacity="0.6" transform="rotate(-15 106 112)"/>
      `);
    case 'thee':
      return wrap(`
        <rect x="75" y="100" width="85" height="78" rx="14" fill="#10B981"/>
        <path d="M160 112 C184 112 184 154 160 154" stroke="#10B981" stroke-width="10" stroke-linecap="round" fill="none"/>
        <ellipse cx="117" cy="100" rx="42" ry="10" fill="#D97706"/>
        <path d="M100 82 C100 70 108 64 108 52" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M125 82 C125 68 133 64 133 48" stroke="#94A3B8" stroke-width="4" stroke-linecap="round" fill="none"/>
        <rect x="70" y="174" width="95" height="10" rx="4" fill="#059669"/>
      `);
    case 'koffie':
      return wrap(`
        <rect x="75" y="100" width="85" height="78" rx="14" fill="#78350F"/>
        <path d="M160 112 C184 112 184 154 160 154" stroke="#78350F" stroke-width="10" stroke-linecap="round" fill="none"/>
        <ellipse cx="117" cy="100" rx="42" ry="10" fill="#451A03"/>
        <path d="M100 82 C100 70 108 64 108 52" stroke="#D97706" stroke-width="4" stroke-linecap="round" fill="none"/>
        <path d="M125 82 C125 68 133 64 133 48" stroke="#D97706" stroke-width="4" stroke-linecap="round" fill="none"/>
        <rect x="70" y="174" width="95" height="10" rx="4" fill="#451A03"/>
      `);
    case 'dokter':
      return wrap(`
        <circle cx="120" cy="85" r="32" fill="#FED7AA"/>
        <path d="M88 80 C88 56 152 56 152 80" fill="#334155"/>
        <path d="M72 190 C72 145 90 130 120 130 C150 130 168 145 168 190 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="4"/>
        <path d="M102 130 L120 155 L138 130" fill="#38BDF8"/>
        <path d="M98 140 C98 170 142 170 142 140" stroke="#475569" stroke-width="5" fill="none"/>
        <circle cx="120" cy="174" r="8" fill="#CBD5E1" stroke="#475569" stroke-width="3"/>
      `);
    case 'ziekenhuis':
      return wrap(`
        <rect x="65" y="70" width="110" height="120" rx="10" fill="#F8FAFC" stroke="#94A3B8" stroke-width="5"/>
        <rect x="105" y="145" width="30" height="45" fill="#64748B"/>
        <circle cx="120" cy="105" r="26" fill="#FEE2E2"/>
        <rect x="114" y="88" width="12" height="34" rx="2" fill="#EF4444"/>
        <rect x="103" y="99" width="34" height="12" rx="2" fill="#EF4444"/>
      `);
    case 'ambulance':
      return wrap(`
        <rect x="45" y="100" width="115" height="65" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <path d="M160 115 L185 115 L198 138 L198 165 L160 165 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <circle cx="85" cy="168" r="16" fill="#334155"/>
        <circle cx="85" cy="168" r="7" fill="#94A3B8"/>
        <circle cx="170" cy="168" r="16" fill="#334155"/>
        <circle cx="170" cy="168" r="7" fill="#94A3B8"/>
        <rect x="98" y="118" width="9" height="28" fill="#EF4444"/>
        <rect x="88.5" y="127.5" width="28" height="9" fill="#EF4444"/>
        <rect x="108" y="88" width="20" height="10" rx="3" fill="#2563EB"/>
      `);
    case 'huis':
      return wrap(`
        <polygon points="120,55 50,115 190,115" fill="#EF4444"/>
        <rect x="65" y="115" width="110" height="75" fill="#FEF3C7" stroke="#D97706" stroke-width="4"/>
        <rect x="105" y="142" width="30" height="48" fill="#B45309"/>
        <circle cx="128" cy="168" r="3.5" fill="#FDE68A"/>
        <rect x="75" y="128" width="22" height="22" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>
        <rect x="143" y="128" width="22" height="22" fill="#BAE6FD" stroke="#0284C7" stroke-width="3"/>
      `);
    case 'fiets':
      return wrap(`
        <circle cx="75" cy="145" r="32" fill="none" stroke="#2563EB" stroke-width="7"/>
        <circle cx="165" cy="145" r="32" fill="none" stroke="#2563EB" stroke-width="7"/>
        <polyline points="75,145 112,145 142,100 102,100 75,145" fill="none" stroke="#1D4ED8" stroke-width="6"/>
        <line x1="112" y1="145" x2="106" y2="90" stroke="#1D4ED8" stroke-width="6"/>
        <line x1="96" y1="90" x2="116" y2="90" stroke="#0F172A" stroke-width="7" stroke-linecap="round"/>
        <line x1="142" y1="100" x2="165" y2="145" stroke="#1D4ED8" stroke-width="6"/>
        <line x1="142" y1="100" x2="148" y2="82" stroke="#1D4ED8" stroke-width="6"/>
        <line x1="138" y1="82" x2="158" y2="82" stroke="#0F172A" stroke-width="7" stroke-linecap="round"/>
      `);
    case 'bus':
      return wrap(`
        <rect x="55" y="70" width="130" height="95" rx="14" fill="#F59E0B" stroke="#D97706" stroke-width="5"/>
        <rect x="68" y="82" width="28" height="26" rx="4" fill="#BAE6FD"/>
        <rect x="106" y="82" width="28" height="26" rx="4" fill="#BAE6FD"/>
        <rect x="144" y="82" width="28" height="26" rx="4" fill="#BAE6FD"/>
        <circle cx="90" cy="165" r="18" fill="#334155"/>
        <circle cx="155" cy="165" r="18" fill="#334155"/>
        <circle cx="90" cy="165" r="7" fill="#94A3B8"/>
        <circle cx="155" cy="165" r="7" fill="#94A3B8"/>
      `);
    case 'trein':
      return wrap(`
        <rect x="65" y="65" width="110" height="100" rx="18" fill="#0284C7" stroke="#0369A1" stroke-width="5"/>
        <rect x="78" y="80" width="84" height="38" rx="8" fill="#E0F2FE"/>
        <circle cx="90" cy="140" r="8" fill="#FEF08A"/>
        <circle cx="150" cy="140" r="8" fill="#FEF08A"/>
        <line x1="58" y1="178" x2="182" y2="178" stroke="#475569" stroke-width="7"/>
        <line x1="78" y1="178" x2="72" y2="190" stroke="#64748B" stroke-width="5"/>
        <line x1="162" y1="178" x2="168" y2="190" stroke="#64748B" stroke-width="5"/>
      `);
    case 'jas':
      return wrap(`
        <path d="M88 65 L120 84 L152 65 L190 100 L172 120 L160 108 L160 188 L80 188 L80 108 L68 120 L50 100 Z" fill="#2563EB" stroke="#1D4ED8" stroke-width="4"/>
        <line x1="120" y1="84" x2="120" y2="188" stroke="#1E40AF" stroke-width="4"/>
        <circle cx="114" cy="115" r="4" fill="#FDE047"/>
        <circle cx="114" cy="140" r="4" fill="#FDE047"/>
        <circle cx="114" cy="165" r="4" fill="#FDE047"/>
      `);

    // Standard fallback badge with dedicated theme color and iconic symbol
    default:
      const themeColor = item.color || '#2563EB';
      const textGlyph = item.glyph || '★';
      return wrap(`
        <circle cx="120" cy="120" r="75" fill="${themeColor}" opacity="0.10"/>
        <circle cx="120" cy="120" r="56" fill="${themeColor}" opacity="0.18"/>
        <text x="120" y="142" font-size="62" font-family="'Segoe UI', Roboto, system-ui, sans-serif" font-weight="bold" fill="${themeColor}" text-anchor="middle">${textGlyph}</text>
      `);
  }
}

// Load both datasets
const baseWords = require('./word-definitions.js');
const extWords = require('./extended-definitions.js');

const allRawWords = [...baseWords, ...extWords];
console.log(`Processing total of ${allRawWords.length} words...`);

const processedWords = allRawWords.map((item, index) => {
  const svg = generateSvg(item);
  return {
    id: item.id || `word_${index + 1}`,
    word: item.word,
    lemma: item.lemma || item.word.replace(/^(de|het)\s+/, ''),
    article: item.article !== undefined ? item.article : (item.word.startsWith('de ') ? 'de' : item.word.startsWith('het ') ? 'het' : ''),
    category: item.category,
    translations: item.translations,
    example: item.example || '',
    svg: svg
  };
});

// Write to files
const jsonPath = path.join(__dirname, '..', 'data', 'words.json');
const jsPath = path.join(__dirname, '..', 'data', 'words.js');

fs.writeFileSync(jsonPath, JSON.stringify(processedWords, null, 2), 'utf-8');
console.log(`Wrote JSON to ${jsonPath} (${processedWords.length} items)`);

const jsContent = `/**
 * TaalVriend Woorden Database
 * Generated: ${new Date().toISOString()}
 * Total words: ${processedWords.length}
 */
window.TAALVRIEND_WORDS = ${JSON.stringify(processedWords, null, 2)};
`;

fs.writeFileSync(jsPath, jsContent, 'utf-8');
console.log(`Wrote JS to ${jsPath}`);
