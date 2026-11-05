import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../constants/languages';
import clocksData from '../../data/clocks.json';

const MINUTES = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];

export default function KlokApp() {
  const { t, nativeLanguage, speakDutch, speakSentenceWithHighlight, setCounterInfo, setFooterInfo } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [activePhraseWordIndex, setActivePhraseWordIndex] = useState(-1);
  const [activeSentenceWordIndex, setActiveSentenceWordIndex] = useState(-1);

  const currentClock = clocksData[currentIndex] || clocksData[0];
  const total = clocksData.length;

  useEffect(() => {
    setActivePhraseWordIndex(-1);
    setActiveSentenceWordIndex(-1);
  }, [currentIndex]);

  const speakPhrase = useCallback(() => {
    const phrase = currentClock.dutchPhrase || currentClock.phrase;
    if (phrase) {
      setActivePhraseWordIndex(-1);
      setActiveSentenceWordIndex(-1);
      speakSentenceWithHighlight(
        phrase,
        (idx) => setActivePhraseWordIndex(idx),
        () => setActivePhraseWordIndex(-1)
      );
    }
  }, [currentClock, speakSentenceWithHighlight]);

  const revealClockTime = useCallback(() => {
    setIsRevealed(true);
    if (currentClock && currentClock.sentence) {
      setActivePhraseWordIndex(-1);
      setActiveSentenceWordIndex(-1);
      speakSentenceWithHighlight(
        currentClock.sentence,
        (idx) => setActiveSentenceWordIndex(idx),
        () => setActiveSentenceWordIndex(-1)
      );
    }
  }, [currentClock, speakSentenceWithHighlight]);

  const handleSpeakOrReveal = useCallback(() => {
    if (!isRevealed) {
      revealClockTime();
    } else {
      if (currentClock && currentClock.sentence) {
        setActivePhraseWordIndex(-1);
        setActiveSentenceWordIndex(-1);
        speakSentenceWithHighlight(
          currentClock.sentence,
          (idx) => setActiveSentenceWordIndex(idx),
          () => setActiveSentenceWordIndex(-1)
        );
      }
    }
  }, [isRevealed, revealClockTime, currentClock, speakSentenceWithHighlight]);

  const goToNextClock = useCallback(() => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const goToPrevClock = useCallback(() => {
    setIsRevealed(false);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleRandom = useCallback(() => {
    setIsRevealed(false);
    const rand = Math.floor(Math.random() * total);
    setCurrentIndex(rand);
  }, [total]);

  // Update header and footer
  useEffect(() => {
    setCounterInfo({ current: currentIndex + 1, total });
    setFooterInfo({
      text: `Klok Kijken • Tijd ${currentIndex + 1} van ${total}`,
      onPrev: goToPrevClock,
      onNext: goToNextClock,
      onSpeak: handleSpeakOrReveal,
      hideControls: false
    });
  }, [currentIndex, total, isRevealed, setCounterInfo, setFooterInfo, goToPrevClock, goToNextClock, handleSpeakOrReveal]);

  const handleMinuteJump = (m) => {
    const idx = clocksData.findIndex((c) => c.minute === m || c.minutes === m);
    if (idx !== -1) {
      setIsRevealed(false);
      setCurrentIndex(idx);
    }
  };

  const isRtl = LANGUAGES[nativeLanguage] && LANGUAGES[nativeLanguage].rtl;
  const transText = (currentClock && currentClock.translations && currentClock.translations[nativeLanguage]) || '—';
  const nativeLangObj = LANGUAGES[nativeLanguage] || LANGUAGES.ar;

  const currentMinute = currentClock ? (currentClock.minute ?? currentClock.minutes) : 0;

  return (
    <section id="appKlokView" className="app-view active" aria-label="Klok Kijken">
      {/* Klok Toolbar */}
      <div className="clock-toolbar">
        <div className="clock-toolbar-left">
          <button id="clockRandomBtn" className="header-pill-btn" title={t('randomTime')} onClick={handleRandom}>
            <span>🎲</span>
            <span>{t('randomTime')}</span>
          </button>
        </div>

        <div className="clock-toolbar-right">
          <span id="clockCounterText" className="badge-subtle">
            {t('clock')} {currentIndex + 1} / {total}
          </span>
        </div>
      </div>

      {/* Main Clock Learning Card Stage */}
      <div className="clock-stage-container">
        <div className="clock-hero-card">
          {/* Left: Analog Clock */}
          <div className="clock-visual-wrapper">
            <div
              id="clockSvgContainer"
              className="clock-svg-box"
              role="button"
              tabIndex={0}
              title={t('revealTimeAudio')}
              onClick={handleSpeakOrReveal}
              dangerouslySetInnerHTML={{ __html: currentClock.svg || '' }}
            />
          </div>

          {/* Right: Info Panel */}
          <div className="clock-info-panel">
            {!isRevealed ? (
              <div id="clockMaskedPanel" className="clock-masked-panel">
                <div className="clock-mystery-icon">⏰ ❓</div>
                <h3 className="clock-mystery-title">{t('whatTimeIsIt')}</h3>
                <p className="clock-mystery-desc">
                  {t('lookAtClockHands')}
                </p>
                <button
                  id="clockRevealBtn"
                  className="footer-action-btn footer-btn-primary"
                  title={`${t('revealTimeAudio')} (${t('spaceKey')})`}
                  onClick={revealClockTime}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  <span>{t('revealTimeAudio')}</span>
                  <kbd className="btn-kbd">{t('spaceKey')}</kbd>
                </button>
              </div>
            ) : (
              <div id="clockRevealedPanel" className="clock-revealed-panel">
                <div className="clock-phrase-header">
                  <span className="clock-topic-badge">{t('dutchTime')}</span>
                  <button
                    id="clockSpeakBtn"
                    className="clock-audio-btn"
                    title={`${t('listen')} (${t('spaceKey')})`}
                    onClick={handleSpeakOrReveal}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                    </svg>
                    <span>{t('listen')} ({t('spaceKey')})</span>
                  </button>
                </div>

                <div
                  id="clockDutchPhrase"
                  className="clock-dutch-phrase"
                  role="button"
                  tabIndex={0}
                  title="Klik om de tijd uit te spreken"
                  onClick={speakPhrase}
                  style={{ cursor: 'pointer' }}
                >
                  {(currentClock.dutchPhrase || currentClock.phrase || '').split(/\s+/).filter(Boolean).map((word, wIdx, arr) => (
                    <span
                      key={wIdx}
                      className={`tts-word-token ${wIdx === activePhraseWordIndex ? 'tts-word-highlight' : ''}`}
                    >
                      {word}{wIdx < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </div>

                <div
                  id="clockSentenceBox"
                  className="clock-sentence-card"
                  role="button"
                  tabIndex={0}
                  title="Klik om de zin uit te spreken"
                  onClick={handleSpeakOrReveal}
                >
                  <span className="sentence-icon">💬</span>
                  <p id="clockSentenceText" className="clock-sentence-text">
                    {(currentClock.sentence || '').split(/\s+/).filter(Boolean).map((word, wIdx, arr) => (
                      <span
                        key={wIdx}
                        className={`tts-word-token ${wIdx === activeSentenceWordIndex ? 'tts-word-highlight' : ''}`}
                      >
                        {word}{wIdx < arr.length - 1 ? ' ' : ''}
                      </span>
                    ))}
                  </p>
                </div>

                <div className="clock-translation-box">
                  <div className="trans-header-badge">
                    <span id="clockLangFlag">{nativeLangObj.flag}</span>
                    <span id="clockLangName">{nativeLangObj.name}</span>
                  </div>
                  <p
                    id="clockTranslationText"
                    className="clock-translation-text"
                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                  >
                    {transText}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 5-Minute Quick Jump Chips */}
        <div className="clock-minutes-strip">
          <span className="strip-label">{t('chooseMinute')}</span>
          <div id="clockMinuteChips" className="minute-chips-row">
            {MINUTES.map((m) => {
              const isChipActive = currentMinute === m;
              return (
                <button
                  key={m}
                  className={`minute-chip ${isChipActive ? 'active' : ''}`}
                  onClick={() => handleMinuteJump(m)}
                >
                  :{m < 10 ? '0' + m : m}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
