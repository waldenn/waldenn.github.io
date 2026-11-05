import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, CEFR_LEVELS, CEFR_META } from '../../constants/languages';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import sentencesData from '../../data/sentences.json';

export default function ZinnenApp() {
  const { t, nativeLanguage, cefrLevel, setCefrLevel, speakDutch, speakSentenceWithHighlight, setCounterInfo, setFooterInfo } = useApp();

  const [currentLevel, setCurrentLevel] = useState(cefrLevel || 'Pre-A1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  // Sync with global cefrLevel if it changes from Header / Config
  useEffect(() => {
    if (cefrLevel) setCurrentLevel(cefrLevel);
  }, [cefrLevel]);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts = {};
    CEFR_LEVELS.forEach((lvl) => {
      counts[lvl.id] = sentencesData.filter((s) => s.level === lvl.id).length;
    });
    return counts;
  }, []);

  // Filtered sentences
  const filteredSentences = useMemo(() => {
    let list = sentencesData.filter((s) => s.level === currentLevel);
    if (list.length === 0) list = sentencesData;
    return list;
  }, [currentLevel]);

  // Reset index if level changes
  useEffect(() => {
    setCurrentIndex(0);
    setActiveWordIndex(-1);
  }, [currentLevel]);

  const currentSentence = filteredSentences[currentIndex] || filteredSentences[0];
  const total = filteredSentences.length;

  const speakActiveSentence = useCallback((indexToSpeak = currentIndex) => {
    const item = filteredSentences[indexToSpeak] || currentSentence;
    if (!item || !item.dutch) return;
    setActiveWordIndex(-1);
    speakSentenceWithHighlight(
      item.dutch,
      (idx) => setActiveWordIndex(idx),
      () => setActiveWordIndex(-1)
    );
  }, [filteredSentences, currentSentence, speakSentenceWithHighlight, currentIndex]);

  const goToNextSentence = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    const next = (currentIndex + 1) % total;
    setCurrentIndex(next);
    if (autoSpeak) {
      speakActiveSentence(next);
    }
  }, [total, currentIndex, speakActiveSentence]);

  const goToPrevSentence = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    const prevIdx = (currentIndex - 1 + total) % total;
    setCurrentIndex(prevIdx);
    if (autoSpeak) {
      speakActiveSentence(prevIdx);
    }
  }, [total, currentIndex, speakActiveSentence]);

  const handleRandom = useCallback(() => {
    if (total === 0) return;
    const rand = Math.floor(Math.random() * total);
    setCurrentIndex(rand);
    speakActiveSentence(rand);
  }, [total, speakActiveSentence]);

  // Touch swipe support for mobile
  const swipeContainerRef = useSwipeNavigation({
    onSwipeLeft: () => goToNextSentence(true),
    onSwipeRight: () => goToPrevSentence(true),
    enabled: true
  });

  // Update header and footer
  useEffect(() => {
    setCounterInfo({ current: currentIndex + 1, total });
    setFooterInfo({
      text: `Zinnen Oefenen • ${currentLevel} (${currentIndex + 1}/${total})`,
      onPrev: goToPrevSentence,
      onNext: goToNextSentence,
      onSpeak: speakActiveSentence,
      hideControls: false
    });
  }, [currentIndex, total, currentLevel, setCounterInfo, setFooterInfo, goToPrevSentence, goToNextSentence, speakActiveSentence]);

  const isRtl = LANGUAGES[nativeLanguage] && LANGUAGES[nativeLanguage].rtl;
  const transText =
    (currentSentence && currentSentence.translations && currentSentence.translations[nativeLanguage]) ||
    '—';
  const nativeLangObj = LANGUAGES[nativeLanguage] || LANGUAGES.ar;

  return (
    <section id="appZinnenView" className="app-view active" aria-label="Zinnen Lezen en Uitspreken">
      {/* Level Tabs Bar */}
      <div className="sentences-level-bar">
        <div className="level-tabs-group" id="sentencesLevelTabs">
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
          id="sentenceRandomBtn"
          className="header-pill-btn"
          title={t('randomSentence')}
          onClick={handleRandom}
        >
          <span>🎲</span>
          <span>{t('randomSentence')}</span>
        </button>
      </div>

      {/* Sentence Stage (Expansive, High Readability & Mobile Touch Swiping) */}
      <div ref={swipeContainerRef} className="sentence-stage-container sentence-stage-expanded">
        <div className="sentence-card-wrapper sentence-card-expansive">
          <div className="sentence-card-meta">
            <span id="sentenceTopicBadge" className="sentence-topic-badge">
              {currentSentence?.topic || 'Algemeen'}
            </span>
            <span id="sentenceCounterBadge" className="badge-subtle">
              {t('sentence')} {currentIndex + 1} {t('of')} {total}
            </span>
          </div>

          {/* Main Dutch Sentence Box */}
          <div
            className="sentence-dutch-box sentence-dutch-box-expansive"
            id="sentenceDutchBox"
            role="button"
            tabIndex={0}
            title="Klik om de uitspraak te horen (SPATIE)"
            onClick={() => speakActiveSentence()}
          >
            <h2 id="sentenceDutchText" className="sentence-dutch-text">
              {(currentSentence?.dutch || '').split(/\s+/).filter(Boolean).map((word, wIdx, arr) => (
                <span
                  key={wIdx}
                  className={`tts-word-token ${wIdx === activeWordIndex ? 'tts-word-highlight' : ''}`}
                >
                  {word}{wIdx < arr.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h2>
            <button
              id="sentenceSpeakBtn"
              className="sentence-audio-circle-btn"
              title="Beluister de uitspraak (SPATIE)"
              aria-label="Spreek zin uit"
              onClick={(e) => {
                e.stopPropagation();
                speakActiveSentence();
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>

          {/* Translation Box */}
          <div className="sentence-translation-card sentence-translation-expansive">
            <div className="trans-card-header">
              <span id="sentenceLangFlag">{nativeLangObj.flag}</span>
              <span id="sentenceLangName">{nativeLangObj.name} (Vertaling)</span>
            </div>
            <p
              id="sentenceTranslationText"
              className="sentence-trans-text"
              style={{ direction: isRtl ? 'rtl' : 'ltr' }}
            >
              {transText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
