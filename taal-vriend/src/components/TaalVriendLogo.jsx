import React from 'react';

export default function TaalVriendLogo({ size = 34, className = 'taalvriend-header-logo' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="tvLogoGradMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="55%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="tvLogoGradAcc" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Speech Bubble Base */}
      <path
        d="M24 4C13.5 4 5 11.6 5 21C5 25.8 7.3 30.1 11.1 33.1L9 41L18 36.8C19.9 37.6 21.9 38 24 38C34.5 38 43 30.4 43 21C43 11.6 34.5 4 24 4Z"
        fill="url(#tvLogoGradMain)"
      />
      {/* Open Book Wings Inside Bubble */}
      <path
        d="M15 16C18.5 14.5 22 15.5 24 17C26 15.5 29.5 14.5 33 16V27C29.5 25.5 26 26.5 24 28C22 26.5 18.5 25.5 15 27V16Z"
        fill="#ffffff"
        fillOpacity="0.96"
      />
      {/* Book Spine Center Line */}
      <line x1="24" y1="17" x2="24" y2="28" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" />
      {/* Voice Wave Accent Dot */}
      <circle cx="34" cy="11" r="3.5" fill="url(#tvLogoGradAcc)" stroke="#ffffff" strokeWidth="1.5" />
    </svg>
  );
}
