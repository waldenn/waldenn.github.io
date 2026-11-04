// Comprehensive word list builder for TaalVriend
// 220+ everyday Dutch words for refugees with Arabic, Tigrinya, Oromo, and English translations
// Generates data/words.json and data/words.js with inline semantic SVG illustrations

const fs = require('fs');
const path = require('path');

// SVG Generator helper to create clean, attractive, colorful vector illustrations
function makeSvg(type, p = {}) {
  const bg = p.bg || '#F0F9FF';
  const c1 = p.c1 || '#2563EB'; // primary
  const c2 = p.c2 || '#38BDF8'; // secondary
  const c3 = p.c3 || '#F59E0B'; // accent/gold
  const c4 = p.c4 || '#10B981'; // green
  const c5 = p.c5 || '#EF4444'; // red

  let inner = '';

  switch (type) {
    case 'apple':
      inner = `
        <circle cx="100" cy="115" r="55" fill="${c5}"/>
        <circle cx="100" cy="115" r="50" fill="#DC2626"/>
        <path d="M92 65 C95 50 108 40 108 40" stroke="#78350F" stroke-width="6" stroke-linecap="round" fill="none"/>
        <ellipse cx="118" cy="52" rx="14" ry="7" transform="rotate(-30 118 52)" fill="${c4}"/>
        <ellipse cx="85" cy="95" rx="8" ry="16" fill="white" opacity="0.4" transform="rotate(-20 85 95)"/>
      `;
      break;
    case 'bread':
      inner = `
        <path d="M45 130 C45 80 80 65 100 65 C120 65 155 80 155 130 C155 142 145 145 100 145 C55 145 45 142 45 130 Z" fill="#D97706"/>
        <path d="M52 128 C52 85 82 72 100 72 C118 72 148 85 148 128 Z" fill="#FBBF24"/>
        <ellipse cx="78" cy="95" rx="4" ry="12" fill="#B45309" transform="rotate(25 78 95)"/>
        <ellipse cx="100" cy="92" rx="4" ry="12" fill="#B45309"/>
        <ellipse cx="122" cy="95" rx="4" ry="12" fill="#B45309" transform="rotate(-25 122 95)"/>
      `;
      break;
    case 'water':
      inner = `
        <path d="M60 70 L72 150 C73 155 80 160 100 160 C120 160 127 155 128 150 L140 70 Z" fill="#BAE6FD" opacity="0.7" stroke="${c2}" stroke-width="4"/>
        <path d="M66 100 L72 146 C73 150 80 155 100 155 C120 155 127 150 128 146 L134 100 C120 105 108 97 100 102 C92 97 80 105 66 100 Z" fill="${c1}"/>
        <path d="M100 35 C100 35 120 60 120 70 C120 81 111 90 100 90 C89 90 80 81 80 70 C80 60 100 35 100 35 Z" fill="#38BDF8"/>
      `;
      break;
    case 'milk':
      inner = `
        <rect x="70" y="75" width="60" height="85" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <polygon points="70,75 80,50 120,50 130,75" fill="#E2E8F0" stroke="#94A3B8" stroke-width="4"/>
        <rect x="90" y="42" width="20" height="10" rx="3" fill="${c1}"/>
        <rect x="70" y="105" width="60" height="30" fill="${c2}"/>
        <circle cx="100" cy="120" r="10" fill="white"/>
      `;
      break;
    case 'banana':
      inner = `
        <path d="M50 140 C65 155 130 150 155 80 C155 80 140 105 110 120 C85 132 60 128 50 140 Z" fill="${c3}"/>
        <path d="M50 140 C52 143 55 144 58 140" stroke="#78350F" stroke-width="4"/>
        <path d="M155 80 L162 70" stroke="#78350F" stroke-width="5" stroke-linecap="round"/>
      `;
      break;
    case 'cheese':
      inner = `
        <polygon points="50,135 150,135 140,85 50,115" fill="#FBBF24" stroke="#D97706" stroke-width="4"/>
        <circle cx="75" cy="120" r="6" fill="#D97706" opacity="0.6"/>
        <circle cx="110" cy="122" r="8" fill="#D97706" opacity="0.6"/>
        <circle cx="125" cy="100" r="5" fill="#D97706" opacity="0.6"/>
        <circle cx="95" cy="105" r="7" fill="#D97706" opacity="0.6"/>
      `;
      break;
    case 'egg':
      inner = `
        <ellipse cx="100" cy="110" rx="42" ry="55" fill="#FEF3C7" stroke="#F59E0B" stroke-width="4"/>
        <ellipse cx="90" cy="95" rx="8" ry="18" fill="white" opacity="0.6" transform="rotate(-15 90 95)"/>
      `;
      break;
    case 'tea':
    case 'coffee':
      inner = `
        <rect x="65" y="85" width="70" height="65" rx="12" fill="${type === 'tea' ? '#10B981' : '#78350F'}"/>
        <path d="M135 95 C155 95 155 130 135 130" stroke="${type === 'tea' ? '#10B981' : '#78350F'}" stroke-width="8" stroke-linecap="round" fill="none"/>
        <ellipse cx="100" cy="85" rx="35" ry="8" fill="${type === 'tea' ? '#D97706' : '#451A03'}"/>
        <path d="M85 70 C85 60 92 55 92 45" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M105 70 C105 58 112 55 112 42" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" fill="none"/>
      `;
      break;
    case 'doctor':
      inner = `
        <circle cx="100" cy="70" r="28" fill="#FED7AA"/>
        <path d="M72 65 C72 45 128 45 128 65" fill="#4B5563"/>
        <path d="M60 160 C60 120 75 110 100 110 C125 110 140 120 140 160 Z" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="3"/>
        <path d="M85 110 L100 130 L115 110" fill="#38BDF8"/>
        <path d="M82 120 C82 145 118 145 118 120" stroke="#475569" stroke-width="4" fill="none"/>
        <circle cx="100" cy="148" r="7" fill="#CBD5E1" stroke="#475569" stroke-width="3"/>
      `;
      break;
    case 'hospital':
      inner = `
        <rect x="55" y="60" width="90" height="100" rx="8" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <rect x="85" y="125" width="30" height="35" fill="#64748B"/>
        <circle cx="100" cy="88" r="22" fill="#FEE2E2"/>
        <rect x="95" y="74" width="10" height="28" rx="2" fill="${c5}"/>
        <rect x="86" y="83" width="28" height="10" rx="2" fill="${c5}"/>
      `;
      break;
    case 'medicine':
    case 'pill':
      inner = `
        <g transform="rotate(-35 100 105)">
          <rect x="65" y="90" width="70" height="30" rx="15" fill="#E2E8F0"/>
          <path d="M65 90 L100 90 L100 120 L65 120 C57 120 50 113 50 105 C50 97 57 90 65 90 Z" fill="${c5}"/>
          <path d="M100 90 L135 90 C143 90 150 97 150 105 C150 113 143 120 135 120 L100 120 Z" fill="#F8FAFC"/>
          <line x1="100" y1="90" x2="100" y2="120" stroke="#CBD5E1" stroke-width="2"/>
        </g>
      `;
      break;
    case 'ambulance':
      inner = `
        <rect x="40" y="85" width="95" height="55" rx="6" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
        <path d="M135 100 L155 100 L165 120 L165 140 L135 140 Z" fill="#F8FAFC" stroke="#94A3B8" stroke-width="3"/>
        <circle cx="70" cy="145" r="14" fill="#334155"/>
        <circle cx="70" cy="145" r="6" fill="#94A3B8"/>
        <circle cx="145" cy="145" r="14" fill="#334155"/>
        <circle cx="145" cy="145" r="6" fill="#94A3B8"/>
        <rect x="75" y="100" width="8" height="24" fill="${c5}"/>
        <rect x="67" y="108" width="24" height="8" fill="${c5}"/>
        <rect x="90" y="75" width="16" height="8" rx="2" fill="${c1}"/>
      `;
      break;
    case 'emergency':
      inner = `
        <polygon points="100,45 165,150 35,150" fill="#FEF08A" stroke="#EAB308" stroke-width="6"/>
        <circle cx="100" cy="130" r="5" fill="#854D0E"/>
        <line x1="100" y1="85" x2="100" y2="115" stroke="#854D0E" stroke-width="8" stroke-linecap="round"/>
      `;
      break;
    case 'house':
      inner = `
        <polygon points="100,50 45,95 155,95" fill="#EF4444"/>
        <rect x="55" y="95" width="90" height="65" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
        <rect x="88" y="120" width="24" height="40" fill="#B45309"/>
        <circle cx="106" cy="142" r="3" fill="#FDE68A"/>
        <rect x="65" y="105" width="18" height="18" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
        <rect x="117" y="105" width="18" height="18" fill="#BAE6FD" stroke="#0284C7" stroke-width="2"/>
      `;
      break;
    case 'door':
      inner = `
        <rect x="65" y="50" width="70" height="110" rx="4" fill="#B45309" stroke="#78350F" stroke-width="4"/>
        <circle cx="120" cy="110" r="6" fill="#FDE68A" stroke="#D97706" stroke-width="2"/>
        <rect x="75" y="62" width="22" height="35" rx="2" fill="#D97706"/>
        <rect x="103" y="62" width="22" height="35" rx="2" fill="#D97706"/>
      `;
      break;
    case 'window':
      inner = `
        <rect x="55" y="60" width="90" height="90" rx="6" fill="#BAE6FD" stroke="#0284C7" stroke-width="6"/>
        <line x1="100" y1="60" x2="100" y2="150" stroke="#0284C7" stroke-width="4"/>
        <line x1="55" y1="105" x2="145" y2="105" stroke="#0284C7" stroke-width="4"/>
      `;
      break;
    case 'key':
      inner = `
        <circle cx="75" cy="95" r="22" fill="none" stroke="#F59E0B" stroke-width="8"/>
        <line x1="97" y1="95" x2="150" y2="95" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
        <line x1="135" y1="95" x2="135" y2="115" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
        <line x1="148" y1="95" x2="148" y2="110" stroke="#F59E0B" stroke-width="8" stroke-linecap="round"/>
      `;
      break;
    case 'bed':
      inner = `
        <rect x="40" y="100" width="120" height="30" rx="6" fill="#3B82F6"/>
        <rect x="45" y="80" width="25" height="22" rx="4" fill="#F8FAFC"/>
        <rect x="35" y="70" width="10" height="75" rx="3" fill="#64748B"/>
        <rect x="155" y="90" width="10" height="55" rx="3" fill="#64748B"/>
      `;
      break;
    case 'chair':
      inner = `
        <rect x="75" y="55" width="50" height="45" rx="6" fill="#D97706"/>
        <rect x="70" y="100" width="60" height="12" rx="3" fill="#B45309"/>
        <line x1="78" y1="112" x2="74" y2="155" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
        <line x1="122" y1="112" x2="126" y2="155" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
      `;
      break;
    case 'table':
      inner = `
        <rect x="45" y="85" width="110" height="16" rx="4" fill="#B45309"/>
        <line x1="60" y1="101" x2="55" y2="155" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
        <line x1="140" y1="101" x2="145" y2="155" stroke="#78350F" stroke-width="8" stroke-linecap="round"/>
      `;
      break;
    case 'shower':
      inner = `
        <path d="M60 160 L60 65 C60 50 110 50 110 75" fill="none" stroke="#64748B" stroke-width="6" stroke-linecap="round"/>
        <path d="M95 75 L125 75 L120 90 L100 90 Z" fill="#0284C7"/>
        <line x1="105" y1="95" x2="100" y2="125" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,6"/>
        <line x1="110" y1="95" x2="110" y2="135" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,6"/>
        <line x1="115" y1="95" x2="120" y2="125" stroke="#38BDF8" stroke-width="3" stroke-linecap="round" stroke-dasharray="2,6"/>
      `;
      break;
    case 'toilet':
      inner = `
        <rect x="65" y="60" width="30" height="50" rx="4" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <ellipse cx="115" cy="110" rx="30" ry="20" fill="#F8FAFC" stroke="#94A3B8" stroke-width="4"/>
        <path d="M100 130 L105 160 L125 160 L130 130 Z" fill="#E2E8F0"/>
      `;
      break;
    case 'bicycle':
      inner = `
        <circle cx="65" cy="125" r="28" fill="none" stroke="#2563EB" stroke-width="6"/>
        <circle cx="135" cy="125" r="28" fill="none" stroke="#2563EB" stroke-width="6"/>
        <polyline points="65,125 95,125 118,90 85,90 65,125" fill="none" stroke="#1D4ED8" stroke-width="5"/>
        <line x1="95" y1="125" x2="90" y2="82" stroke="#1D4ED8" stroke-width="5"/>
        <line x1="82" y1="82" x2="98" y2="82" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
        <line x1="118" y1="90" x2="135" y2="125" stroke="#1D4ED8" stroke-width="5"/>
        <line x1="118" y1="90" x2="122" y2="75" stroke="#1D4ED8" stroke-width="5"/>
        <line x1="114" y1="75" x2="130" y2="75" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/>
      `;
      break;
    case 'bus':
      inner = `
        <rect x="50" y="60" width="100" height="75" rx="10" fill="#F59E0B" stroke="#D97706" stroke-width="4"/>
        <rect x="60" y="70" width="20" height="20" rx="3" fill="#BAE6FD"/>
        <rect x="90" y="70" width="20" height="20" rx="3" fill="#BAE6FD"/>
        <rect x="120" y="70" width="20" height="20" rx="3" fill="#BAE6FD"/>
        <circle cx="75" cy="135" r="14" fill="#334155"/>
        <circle cx="125" cy="135" r="14" fill="#334155"/>
        <circle cx="75" cy="135" r="5" fill="#94A3B8"/>
        <circle cx="125" cy="135" r="5" fill="#94A3B8"/>
      `;
      break;
    case 'train':
      inner = `
        <rect x="55" y="55" width="90" height="80" rx="14" fill="#0284C7" stroke="#0369A1" stroke-width="4"/>
        <rect x="65" y="68" width="70" height="30" rx="6" fill="#E0F2FE"/>
        <circle cx="75" cy="115" r="6" fill="#FEF08A"/>
        <circle cx="125" cy="115" r="6" fill="#FEF08A"/>
        <line x1="50" y1="145" x2="150" y2="145" stroke="#475569" stroke-width="6"/>
        <line x1="65" y1="145" x2="60" y2="155" stroke="#64748B" stroke-width="4"/>
        <line x1="135" y1="145" x2="140" y2="155" stroke="#64748B" stroke-width="4"/>
      `;
      break;
    case 'car':
      inner = `
        <path d="M50 120 L60 90 L140 90 L155 120 Z" fill="#EF4444"/>
        <rect x="42" y="112" width="116" height="26" rx="6" fill="#DC2626"/>
        <polygon points="68,95 132,95 125,110 75,110" fill="#BAE6FD"/>
        <circle cx="68" cy="138" r="14" fill="#334155"/>
        <circle cx="132" cy="138" r="14" fill="#334155"/>
      `;
      break;
    case 'coat':
    case 'jacket':
      inner = `
        <path d="M75 55 L100 70 L125 55 L155 85 L140 100 L130 90 L130 155 L70 155 L70 90 L60 100 L45 85 Z" fill="#2563EB" stroke="#1D4ED8" stroke-width="3"/>
        <line x1="100" y1="70" x2="100" y2="155" stroke="#1E40AF" stroke-width="3"/>
        <circle cx="95" cy="95" r="3" fill="#FDE047"/>
        <circle cx="95" cy="115" r="3" fill="#FDE047"/>
        <circle cx="95" cy="135" r="3" fill="#FDE047"/>
      `;
      break;
    case 'shoe':
      inner = `
        <path d="M50 125 C50 105 85 105 100 115 L130 115 C150 115 160 135 155 145 L50 145 Z" fill="#475569" stroke="#1E293B" stroke-width="4"/>
        <rect x="48" y="140" width="110" height="8" rx="2" fill="#0F172A"/>
        <line x1="85" y1="113" x2="95" y2="123" stroke="white" stroke-width="2"/>
        <line x1="95" y1="113" x2="105" y2="123" stroke="white" stroke-width="2"/>
      `;
      break;
    case 'pants':
      inner = `
        <path d="M68 55 L132 55 L138 145 L112 145 L100 95 L88 145 L62 145 Z" fill="#1E3A8A" stroke="#172554" stroke-width="3"/>
        <line x1="100" y1="55" x2="100" y2="90" stroke="#3B82F6" stroke-width="2"/>
      `;
      break;
    case 'shirt':
      inner = `
        <polygon points="75,55 100,68 125,55 150,80 135,95 125,85 125,145 75,145 75,85 65,95 50,80" fill="#10B981" stroke="#047857" stroke-width="3"/>
      `;
      break;
    case 'baby':
      inner = `
        <circle cx="100" cy="85" r="35" fill="#FED7AA"/>
        <path d="M85 85 Q90 92 95 85" stroke="#78350F" stroke-width="3" fill="none"/>
        <path d="M105 85 Q110 92 115 85" stroke="#78350F" stroke-width="3" fill="none"/>
        <circle cx="100" cy="98" r="6" fill="#F43F5E"/>
        <path d="M92 60 Q100 50 108 60" stroke="#B45309" stroke-width="3" fill="none"/>
        <path d="M65 130 C65 110 135 110 135 130 L130 155 L70 155 Z" fill="#38BDF8"/>
      `;
      break;
    case 'passport':
      inner = `
        <rect x="65" y="55" width="70" height="95" rx="6" fill="#881337" stroke="#4C0519" stroke-width="3"/>
        <circle cx="100" cy="95" r="18" fill="none" stroke="#FDE047" stroke-width="3"/>
        <line x1="82" y1="95" x2="118" y2="95" stroke="#FDE047" stroke-width="2"/>
        <line x1="100" y1="77" x2="100" y2="113" stroke="#FDE047" stroke-width="2"/>
        <rect x="78" y="125" width="44" height="6" rx="2" fill="#FDE047"/>
      `;
      break;
    case 'money':
      inner = `
        <rect x="55" y="70" width="90" height="55" rx="6" fill="#10B981" stroke="#047857" stroke-width="4"/>
        <circle cx="100" cy="97" r="18" fill="#ECFDF5" stroke="#047857" stroke-width="3"/>
        <text x="100" y="105" font-size="22" font-family="Arial, sans-serif" font-weight="bold" fill="#047857" text-anchor="middle">€</text>
      `;
      break;
    case 'letter':
      inner = `
        <rect x="55" y="70" width="90" height="60" rx="6" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/>
        <polyline points="55,70 100,105 145,70" fill="none" stroke="#D97706" stroke-width="3"/>
      `;
      break;
    case 'clock':
      inner = `
        <circle cx="100" cy="100" r="48" fill="#F8FAFC" stroke="#334155" stroke-width="6"/>
        <circle cx="100" cy="100" r="4" fill="#0F172A"/>
        <line x1="100" y1="100" x2="100" y2="68" stroke="#0F172A" stroke-width="5" stroke-linecap="round"/>
        <line x1="100" y1="100" x2="124" y2="100" stroke="#0F172A" stroke-width="4" stroke-linecap="round"/>
      `;
      break;
    case 'sun':
      inner = `
        <circle cx="100" cy="100" r="32" fill="#FBBF24" stroke="#F59E0B" stroke-width="4"/>
        <line x1="100" y1="45" x2="100" y2="58" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="100" y1="142" x2="100" y2="155" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="45" y1="100" x2="58" y2="100" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="142" y1="100" x2="155" y2="100" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="62" y1="62" x2="72" y2="72" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="138" y1="138" x2="128" y2="128" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="62" y1="138" x2="72" y2="128" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
        <line x1="138" y1="62" x2="128" y2="72" stroke="#F59E0B" stroke-width="6" stroke-linecap="round"/>
      `;
      break;
    case 'rain':
      inner = `
        <path d="M70 100 C60 100 50 90 55 80 C55 68 70 60 80 65 C88 55 110 52 120 62 C132 60 145 70 142 82 C152 88 148 100 135 100 Z" fill="#94A3B8"/>
        <line x1="75" y1="115" x2="68" y2="135" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <line x1="95" y1="115" x2="88" y2="135" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <line x1="115" y1="115" x2="108" y2="135" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
        <line x1="135" y1="115" x2="128" y2="135" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/>
      `;
      break;
    case 'sleep':
      inner = `
        <path d="M70 120 C70 90 95 70 125 70 C105 85 105 115 125 130 C95 130 70 120 70 120 Z" fill="#6366F1"/>
        <text x="135" y="70" font-size="24" font-family="Arial, sans-serif" font-weight="bold" fill="#A5B4FC">Z</text>
        <text x="148" y="55" font-size="18" font-family="Arial, sans-serif" font-weight="bold" fill="#C7D2FE">z</text>
      `;
      break;
    case 'smile':
    case 'happy':
      inner = `
        <circle cx="100" cy="100" r="48" fill="#FDE047" stroke="#EAB308" stroke-width="5"/>
        <circle cx="82" cy="88" r="6" fill="#713F12"/>
        <circle cx="118" cy="88" r="6" fill="#713F12"/>
        <path d="M78 112 Q100 135 122 112" stroke="#713F12" stroke-width="6" stroke-linecap="round" fill="none"/>
      `;
      break;
    case 'sad':
      inner = `
        <circle cx="100" cy="100" r="48" fill="#93C5FD" stroke="#3B82F6" stroke-width="5"/>
        <circle cx="82" cy="90" r="5" fill="#1E3A8A"/>
        <circle cx="118" cy="90" r="5" fill="#1E3A8A"/>
        <path d="M80 125 Q100 108 120 125" stroke="#1E3A8A" stroke-width="6" stroke-linecap="round" fill="none"/>
        <path d="M125 98 C125 104 122 108 120 108 C118 108 115 104 117 98 C118 95 125 98 125 98 Z" fill="#60A5FA"/>
      `;
      break;
    case 'phone':
      inner = `
        <rect x="70" y="50" width="60" height="100" rx="10" fill="#1E293B" stroke="#0F172A" stroke-width="4"/>
        <rect x="76" y="62" width="48" height="74" rx="4" fill="#38BDF8"/>
        <circle cx="100" cy="143" r="3" fill="#94A3B8"/>
      `;
      break;
    default:
      // Generic icon builder with emoji or glyph/symbol badge
      const icon = p.icon || '★';
      const color = p.color || c1;
      inner = `
        <circle cx="100" cy="100" r="50" fill="${color}" opacity="0.15"/>
        <circle cx="100" cy="100" r="42" fill="${color}" opacity="0.25"/>
        <text x="100" y="115" font-size="46" font-family="system-ui, -apple-system, sans-serif" font-weight="bold" fill="${color}" text-anchor="middle">${icon}</text>
      `;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%"><rect width="200" height="200" rx="28" fill="${bg}"/>${inner}</svg>`;
}

// Export makeSvg for use in the dictionary list
module.exports = { makeSvg };
