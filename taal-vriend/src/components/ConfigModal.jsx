import React from 'react';
import { useApp } from '../context/AppContext';
import { LANGUAGES, CEFR_LEVELS, AVAILABLE_FONTS } from '../constants/languages';

export default function ConfigModal() {
  const {
    t,
    isConfigModalOpen,
    setIsConfigModalOpen,
    nativeLanguage,
    setNativeLanguage,
    cefrLevel,
    setCefrLevel,
    fontFamily,
    setFontFamily,
    baseFontSize,
    setBaseFontSize,
    theme,
    setTheme,
    ttsVoiceURI,
    setTtsVoiceURI,
    ttsRate,
    setTtsRate,
    availableVoices,
    speakDutch
  } = useApp();

  if (!isConfigModalOpen) return null;

  const handleTestVoice = () => {
    speakDutch('Hallo! Dit is een voorbeeld van de Nederlandse spraakstem in TaalVriend.');
  };

  return (
    <div
      id="configModal"
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="configModalTitle"
      onClick={(e) => {
        if (e.target.id === 'configModal') setIsConfigModalOpen(false);
      }}
    >
      <div className="modal-box">
        <div className="modal-header">
          <h2 id="configModalTitle">{t('settingsTitle')}</h2>
          <button
            id="configCloseBtn"
            className="modal-close-btn"
            title={t('closeBtn')}
            aria-label={t('closeBtn')}
            onClick={() => setIsConfigModalOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body">
          {/* 1. Moedertaal Keuze */}
          <section className="config-section">
            <label className="config-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              {t('nativeLangSetting')}
            </label>
            <div className="lang-grid">
              {Object.entries(LANGUAGES).map(([code, lang]) => (
                <button
                  key={code}
                  className={`lang-card-btn ${nativeLanguage === code ? 'active' : ''}`}
                  onClick={() => setNativeLanguage(code)}
                >
                  <span className="lang-card-flag">{lang.flag}</span>
                  <div className="lang-card-info">
                    <h4>{lang.name}</h4>
                    <span>{lang.englishName}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* 2. CEFR Proficiency Level */}
          <section className="config-section">
            <label className="config-label" htmlFor="cefrSelect">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              {t('cefrSetting')}
            </label>
            <p className="config-help">
              Kies jouw huidige niveau. Alle apps (woorden, zinnen, luisteren, reageren) passen zich hierop aan:
            </p>
            <div className="select-wrapper">
              <select
                id="cefrSelect"
                className="custom-select"
                value={cefrLevel}
                onChange={(e) => setCefrLevel(e.target.value)}
              >
                {CEFR_LEVELS.map((lvl) => (
                  <option key={lvl.id} value={lvl.id}>
                    {lvl.id} • {lvl.name} ({lvl.desc})
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </section>

          {/* 3. Lettertype */}
          <section className="config-section">
            <label className="config-label" htmlFor="fontSelect">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
              {t('fontFamilySetting')} (Google Fonts)
            </label>
            <div className="select-wrapper">
              <select
                id="fontSelect"
                className="custom-select"
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
              >
                {AVAILABLE_FONTS.map((font) => (
                  <option key={font.name} value={font.family}>
                    {font.name}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </section>

          {/* 4. Lettergrootte */}
          <section className="config-section">
            <label className="config-label" htmlFor="fontSizeSlider">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 19V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"></path>
              </svg>
              {t('fontSizeSetting')}
            </label>
            <div className="slider-control-group">
              <div className="slider-header-row">
                <span className="slider-min-lbl">14px</span>
                <span id="fontSizeValBadge" className="badge-pill">{baseFontSize}px</span>
                <span className="slider-max-lbl">32px</span>
              </div>
              <input
                type="range"
                id="fontSizeSlider"
                min="14"
                max="32"
                step="1"
                value={baseFontSize}
                onChange={(e) => setBaseFontSize(Number(e.target.value))}
                className="custom-range-slider"
                aria-label={t('fontSizeSetting')}
              />
            </div>
          </section>

          {/* 5. Thema Keuze */}
          <section className="config-section">
            <label className="config-label">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
              {t('themeSetting')}
            </label>
            <div className="segmented-control">
              <button
                className={`segment-btn ${theme === 'light' ? 'active' : ''}`}
                onClick={() => setTheme('light')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                </svg>
                <span>{t('themeLight')}</span>
              </button>
              <button
                className={`segment-btn ${theme === 'dark' ? 'active' : ''}`}
                onClick={() => setTheme('dark')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <span>{t('themeDark')}</span>
              </button>
              <button
                className={`segment-btn ${theme === 'system' ? 'active' : ''}`}
                onClick={() => setTheme('system')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
                <span>{t('themeSystem')}</span>
              </button>
            </div>
          </section>

          {/* 6. TTS Stem */}
          <section className="config-section">
            <label className="config-label" htmlFor="voiceSelect">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              {t('voiceSetting')}
            </label>
            <div className="select-wrapper">
              <select
                id="voiceSelect"
                className="custom-select"
                value={ttsVoiceURI}
                onChange={(e) => setTtsVoiceURI(e.target.value)}
              >
                {availableVoices.length === 0 ? (
                  <option value="">Standaard browserstem (Nederlands)</option>
                ) : (
                  availableVoices.map((v) => (
                    <option key={v.voiceURI} value={v.voiceURI}>
                      {v.name} ({v.lang})
                    </option>
                  ))
                )}
              </select>
              <div className="select-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <div className="voice-test-row">
              <button id="testVoiceBtn" className="btn-secondary" type="button" onClick={handleTestVoice}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
                <span>{t('listen')}</span>
              </button>
            </div>
          </section>

          {/* 7. TTS Rate */}
          <section className="config-section">
            <label className="config-label" htmlFor="speechRateSlider">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              {t('speechRateSetting')}
            </label>
            <div className="slider-control-group">
              <div className="slider-header-row">
                <span className="slider-min-lbl">0.5x (Zeer rustig)</span>
                <span id="speechRateValBadge" className="badge-pill">
                  <span id="speechRateVal">{ttsRate.toFixed(1)}x</span>
                </span>
                <span className="slider-max-lbl">1.5x (Vlot)</span>
              </div>
              <input
                type="range"
                id="speechRateSlider"
                min="0.5"
                max="1.5"
                step="0.1"
                value={ttsRate}
                onChange={(e) => setTtsRate(parseFloat(e.target.value))}
                className="custom-range-slider"
                aria-label="Spraaksnelheid slider"
              />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
