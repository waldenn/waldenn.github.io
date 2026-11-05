import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, CEFR_LEVELS, CEFR_META } from '../../constants/languages';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import respondData from '../../data/respond.json';

export default function ReageerApp() {
  const { t, nativeLanguage, cefrLevel, setCefrLevel, speakDutch, speakSentenceWithHighlight, setCounterInfo, setFooterInfo } = useApp();

  const [currentLevel, setCurrentLevel] = useState(cefrLevel || 'Pre-A1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQuestionRevealed, setIsQuestionRevealed] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  useEffect(() => {
    if (cefrLevel) setCurrentLevel(cefrLevel);
  }, [cefrLevel]);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts = {};
    CEFR_LEVELS.forEach((lvl) => {
      counts[lvl.id] = respondData.filter((r) => r.level === lvl.id).length;
    });
    return counts;
  }, []);

  // Filtered situations - randomized order of unique exercises per session
  const filteredList = useMemo(() => {
    let list = respondData.filter((r) => r.level === currentLevel);
    if (list.length === 0) list = respondData;
    const shuffled = [...list];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, [currentLevel]);

  useEffect(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsQuestionRevealed(false);
    setActiveWordIndex(-1);
  }, [currentLevel]);

  const currentItem = filteredList[currentIndex] || filteredList[0];
  const total = filteredList.length;

  const playAudioForIndex = useCallback((idx) => {
    const item = filteredList[idx] || currentItem;
    if (!item) return;
    const textToSpeak = item.audio_text || item.situation || '';
    if (!textToSpeak) return;

    setIsPlayingAudio(true);
    setIsQuestionRevealed(true);
    setActiveWordIndex(-1);

    speakSentenceWithHighlight(
      textToSpeak,
      (wIdx) => setActiveWordIndex(wIdx),
      () => {
        setActiveWordIndex(-1);
        setIsPlayingAudio(false);
      }
    );
  }, [filteredList, currentItem, speakSentenceWithHighlight]);

  const playAudio = useCallback(() => {
    playAudioForIndex(currentIndex);
  }, [playAudioForIndex, currentIndex]);

  const goToNext = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    setSelectedOption(null);
    const next = (currentIndex + 1) % total;
    setCurrentIndex(next);
    setActiveWordIndex(-1);
    if (autoSpeak) {
      setTimeout(() => playAudioForIndex(next), 60);
    }
  }, [total, currentIndex, playAudioForIndex]);

  const goToPrev = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    setSelectedOption(null);
    const prevIdx = (currentIndex - 1 + total) % total;
    setCurrentIndex(prevIdx);
    setActiveWordIndex(-1);
    if (autoSpeak) {
      setTimeout(() => playAudioForIndex(prevIdx), 60);
    }
  }, [total, currentIndex, playAudioForIndex]);

  const handleRandom = useCallback(() => {
    if (total === 0) return;
    setSelectedOption(null);
    const rand = Math.floor(Math.random() * total);
    setCurrentIndex(rand);
    setActiveWordIndex(-1);
    setTimeout(() => playAudioForIndex(rand), 60);
  }, [total, playAudioForIndex]);

  // Touch swiping navigation for mobile
  const swipeContainerRef = useSwipeNavigation({
    onSwipeLeft: () => goToNext(true),
    onSwipeRight: () => goToPrev(true),
    enabled: true
  });

  const handleSelectOption = useCallback((optIdx) => {
    setSelectedOption(optIdx);
  }, []);

  // Listen for keyboard 1-4 shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key, 10) - 1;
        if (currentItem && currentItem.options && idx < currentItem.options.length) {
          handleSelectOption(idx);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItem, handleSelectOption]);

  // Update header and footer
  useEffect(() => {
    setCounterInfo({ current: currentIndex + 1, total });
    setFooterInfo({
      text: `Luister en Reageer • ${currentLevel} (${currentIndex + 1}/${total})`,
      onPrev: goToPrev,
      onNext: goToNext,
      onSpeak: playAudio,
      hideControls: false
    });
  }, [currentIndex, total, currentLevel, setCounterInfo, setFooterInfo, goToPrev, goToNext, playAudio]);

  const isRtl = LANGUAGES[nativeLanguage] && LANGUAGES[nativeLanguage].rtl;
  const qTrans =
    (currentItem && currentItem.audio_translations && currentItem.audio_translations[nativeLanguage]) ||
    '';
  const nativeLangObj = LANGUAGES[nativeLanguage] || LANGUAGES.ar;

  const isAnswered = selectedOption !== null;
  const isCorrect = selectedOption === currentItem?.correct_index;

  const expNl = (currentItem && currentItem.explanations && currentItem.explanations.nl) || '';
  const expNative =
    (currentItem && currentItem.explanations && (currentItem.explanations[nativeLanguage] || currentItem.explanations.so || currentItem.explanations.en)) || expNl;

  return (
    <section id="appReageerView" className="app-view active" aria-label="Luister en Reageer">
      {/* Level Tabs Bar */}
      <div className="sentences-level-bar">
        <div className="level-tabs-group" id="reageerLevelTabs">
          {CEFR_LEVELS.map((lvl) => {
            const isActive = currentLevel === lvl.id;
            const meta = CEFR_META[lvl.id];
            return (
              <button
                key={lvl.id}
                className={`level-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentLevel(lvl.id);
                  setCefrLevel(lvl.id);
                }}
              >
                {meta && <span className={`level-badge ${meta.colorClass}`}>{lvl.id}</span>}
                <span className="tab-title">{lvl.name}</span>
                <span className="tab-count">{levelCounts[lvl.id] || 0}</span>
              </button>
            );
          })}
        </div>

        <button
          id="reageerRandomBtn"
          className="header-pill-btn"
          title={t('randomQuestion')}
          onClick={handleRandom}
        >
          <span>🎲</span>
          <span>{t('randomQuestion')}</span>
        </button>
      </div>

      {/* Main Stage Container (with Mobile Touch Swiping) */}
      <div ref={swipeContainerRef} className="reageer-stage-container">
        <div className="reageer-hero-card">
          <div className="reageer-card-meta">
            <div className="meta-left">
              <span id="reageerTopicBadge" className="sentence-topic-badge">
                {currentItem?.topic || 'Praktijksituatie'}
              </span>
              <span id="reageerSituationText" className="reageer-situation-text">
                {currentItem?.situation || ''}
              </span>
            </div>
            <span id="reageerCounterBadge" className="badge-subtle">
              {currentIndex + 1} {t('of')} {total}
            </span>
          </div>

          {/* Spoken Audio Prompt Box */}
          <div className="reageer-audio-box">
            <div
              className={`audio-animation-waves ${isPlayingAudio ? 'playing' : ''}`}
              id="reageerSoundWaves"
              aria-hidden="true"
            >
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>

            <div className="reageer-audio-controls">
              <button
                id="reageerPlayAudioBtn"
                className="listening-play-audio-btn"
                title={`${t('listenToQuestion')} (${t('spaceKey')})`}
                onClick={playAudio}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span id="reageerAudioBtnLabel">
                  {isPlayingAudio ? `${t('speak')}...` : t('listenToQuestion')}
                </span>
                <kbd className="btn-kbd">{t('spaceKey')}</kbd>
              </button>

              <button
                id="reageerToggleQBtn"
                className="header-pill-btn reageer-toggle-q-btn"
                title="Toon of verberg de tekst van de vraag"
                onClick={() => setIsQuestionRevealed((prev) => !prev)}
              >
                <span id="reageerToggleQIcon">{isQuestionRevealed ? '🙈' : '👁️'}</span>
                <span id="reageerToggleQLabel">
                  {isQuestionRevealed ? 'Verberg tekst' : 'Toon tekst & vertaling'}
                </span>
              </button>
            </div>

            {/* Optional Revealed Question Text */}
            {isQuestionRevealed && (
              <div id="reageerQuestionRevealed" className="reageer-question-revealed">
                <p id="reageerDutchQuestion" className="reageer-dutch-q">
                  {(currentItem?.audio_text || '').split(/\s+/).filter(Boolean).map((word, wIdx, arr) => (
                    <span
                      key={wIdx}
                      className={`tts-word-token ${wIdx === activeWordIndex ? 'tts-word-highlight' : ''}`}
                    >
                      {word}{wIdx < arr.length - 1 ? ' ' : ''}
                    </span>
                  ))}
                </p>
                {qTrans && (
                  <div className="reageer-trans-line">
                    <span id="reageerTransFlag">{nativeLangObj.flag}</span>
                    <p
                      id="reageerTransQuestion"
                      className="reageer-trans-q"
                      style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                    >
                      {qTrans}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Multiple Choice Options */}
          <div className="reageer-prompt-instruction">
            <span>{t('chooseAnswer')}</span>
          </div>
          <div id="reageerOptionsGrid" className="reageer-options-grid">
            {(currentItem?.options || []).map((optText, optIdx) => {
              let btnClass = 'reageer-option-btn';
              if (isAnswered) {
                if (optIdx === currentItem.correct_index) {
                  btnClass += ' correct';
                }
                if (optIdx === selectedOption && !isCorrect) {
                  btnClass += ' incorrect';
                }
              }

              return (
                <button
                  key={optIdx}
                  className={btnClass}
                  data-option-index={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                >
                  <span className="reageer-option-key">{optIdx + 1}</span>
                  <span className="reageer-option-text">{optText}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation Box */}
          {isAnswered && (
            <div
              id="reageerFeedbackBox"
              className={`reageer-feedback-card ${
                isCorrect ? 'correct-feedback' : 'incorrect-feedback'
              }`}
            >
              <div className="reageer-feedback-header">
                <span id="reageerFeedbackIcon" className="feedback-badge-icon">
                  {isCorrect ? '✅' : '❌'}
                </span>
                <h4 id="reageerFeedbackTitle">
                  {isCorrect ? t('correctFeedback') : t('tryAgainFeedback')}
                </h4>
              </div>
              <div className="reageer-explanation-content">
                <p id="reageerExplanationDutch" className="reageer-explanation-nl">
                  {expNl}
                </p>
                <div className="reageer-native-expl-box">
                  <span id="reageerExplLangFlag">{nativeLangObj.flag}</span>
                  <p
                    id="reageerExplanationNative"
                    className="reageer-explanation-native"
                    style={{ direction: isRtl ? 'rtl' : 'ltr' }}
                  >
                    {expNative}
                  </p>
                </div>
              </div>
              <div className="reageer-feedback-action">
                <button
                  id="reageerNextBtn"
                  className="footer-action-btn footer-btn-primary"
                  title={`${t('next')} (→)`}
                  onClick={() => goToNext(true)}
                >
                  <span>{t('next')}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
