import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, CEFR_LEVELS, CEFR_META } from '../../constants/languages';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import listeningData from '../../data/listening.json';

export default function LuisterenApp() {
  const { t, nativeLanguage, cefrLevel, setCefrLevel, speakDutch, speakSentenceWithHighlight, setCounterInfo, setFooterInfo } = useApp();

  const [currentLevel, setCurrentLevel] = useState(cefrLevel || 'Pre-A1');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);

  useEffect(() => {
    if (cefrLevel) setCurrentLevel(cefrLevel);
  }, [cefrLevel]);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts = {};
    CEFR_LEVELS.forEach((lvl) => {
      counts[lvl.id] = listeningData.filter((item) => item.level === lvl.id).length;
    });
    return counts;
  }, []);

  // Filtered list
  const filteredList = useMemo(() => {
    let list = listeningData.filter((item) => item.level === currentLevel);
    if (list.length === 0) list = listeningData;
    return list;
  }, [currentLevel]);

  useEffect(() => {
    setCurrentIndex(0);
    setIsRevealed(false);
    setActiveWordIndex(-1);
  }, [currentLevel]);

  const currentItem = filteredList[currentIndex] || filteredList[0];
  const total = filteredList.length;

  const dutchText = useMemo(() => {
    if (!currentItem) return '';
    return currentItem.dutch || (Array.isArray(currentItem.lines) ? currentItem.lines.join('\n') : currentItem.text || '');
  }, [currentItem]);

  const dutchLines = useMemo(() => {
    return (dutchText || '').split('\n').filter(Boolean);
  }, [dutchText]);

  const linesWithWords = useMemo(() => {
    let offset = 0;
    return dutchLines.map((line) => {
      const words = line.split(/\s+/).filter(Boolean);
      const startIdx = offset;
      offset += words.length;
      return { line, words, startIdx };
    });
  }, [dutchLines]);

  const transText = useMemo(() => {
    if (!currentItem || !currentItem.translations) return '';
    return currentItem.translations[nativeLanguage] || currentItem.translations.en || '';
  }, [currentItem, nativeLanguage]);

  const transLines = useMemo(() => {
    return (transText || '').split('\n').filter(Boolean);
  }, [transText]);

  const playAudioForIndex = useCallback((idx) => {
    const item = filteredList[idx] || currentItem;
    if (!item) return;
    const txt = item.dutch || (Array.isArray(item.lines) ? item.lines.join('\n') : item.text || '');
    if (!txt) return;

    setIsPlayingAudio(true);
    setActiveWordIndex(-1);

    speakSentenceWithHighlight(
      txt,
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

  const revealText = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const goToNext = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    const next = (currentIndex + 1) % total;
    setCurrentIndex(next);
    setIsRevealed(false);
    setActiveWordIndex(-1);
    if (autoSpeak) {
      setTimeout(() => playAudioForIndex(next), 50);
    }
  }, [total, currentIndex, playAudioForIndex]);

  const goToPrev = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    const prevIdx = (currentIndex - 1 + total) % total;
    setCurrentIndex(prevIdx);
    setIsRevealed(false);
    setActiveWordIndex(-1);
    if (autoSpeak) {
      setTimeout(() => playAudioForIndex(prevIdx), 50);
    }
  }, [total, currentIndex, playAudioForIndex]);

  const handleRandom = useCallback(() => {
    if (total === 0) return;
    const rand = Math.floor(Math.random() * total);
    setCurrentIndex(rand);
    setIsRevealed(false);
    setActiveWordIndex(-1);
    setTimeout(() => playAudioForIndex(rand), 50);
  }, [total, playAudioForIndex]);

  // Touch swiping support for mobile
  const swipeContainerRef = useSwipeNavigation({
    onSwipeLeft: () => goToNext(true),
    onSwipeRight: () => goToPrev(true),
    enabled: true
  });

  // Space key action in LuisterenApp: listen first without revealing text
  const handleSpaceAction = useCallback(() => {
    playAudio();
  }, [playAudio]);

  // Header & Footer sync
  useEffect(() => {
    setCounterInfo({ current: currentIndex + 1, total });
    setFooterInfo({
      text: `Luistervaardigheid • ${currentLevel} (${currentIndex + 1}/${total})`,
      onPrev: goToPrev,
      onNext: goToNext,
      onSpeak: handleSpaceAction,
      hideControls: true // Hidden per user specification
    });
  }, [currentIndex, total, currentLevel, isRevealed, setCounterInfo, setFooterInfo, goToPrev, goToNext, handleSpaceAction]);

  const isRtl = LANGUAGES[nativeLanguage] && LANGUAGES[nativeLanguage].rtl;
  const nativeLangObj = LANGUAGES[nativeLanguage] || LANGUAGES.ar;

  return (
    <section id="appLuisterView" className="app-view active" aria-label="Luistervaardigheid">
      {/* Level Tabs Bar */}
      <div className="sentences-level-bar">
        <div className="level-tabs-group" id="luisterLevelTabs">
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

        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="header-pill-btn" title={t('prev')} onClick={() => goToPrev(true)}>
            <span>← {t('prev')}</span>
          </button>
          <button className="header-pill-btn" title={t('next')} onClick={() => goToNext(true)}>
            <span>{t('next')} →</span>
          </button>
          <button
            id="luisterRandomBtn"
            className="header-pill-btn"
            title={t('randomText')}
            onClick={handleRandom}
          >
            <span>🎲</span>
            <span>{t('randomText')}</span>
          </button>
        </div>
      </div>

      {/* Main Listening Exercise Card (with Mobile Touch Swiping) */}
      <div ref={swipeContainerRef} className="listening-stage-container">
        <div className="listening-hero-card">
          <div className="listening-card-meta">
            <div className="meta-left">
              <span id="luisterCategoryBadge" className="sentence-topic-badge">
                {currentItem?.category || 'Luisterfragment'}
              </span>
              <h3 id="luisterTitleText" className="listening-title-text">
                {currentItem?.title || ''}
              </h3>
            </div>
            <span id="luisterCounterBadge" className="badge-subtle">
              {currentIndex + 1} {t('of')} {total}
            </span>
          </div>

          {/* Spoken Audio Prompt & Sound Waves Area */}
          <div className="listening-audio-prompt-box">
            <div
              className={`audio-animation-waves ${isPlayingAudio ? 'playing' : ''}`}
              id="luisterSoundWaves"
              aria-hidden="true"
            >
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
              <span className="wave-bar"></span>
            </div>

            <button
              id="luisterPlayAudioBtn"
              className="listening-play-audio-btn"
              title={`${t('listen')} (${t('spaceKey')})`}
              onClick={playAudio}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span id="luisterPlayBtnLabel">
                {isPlayingAudio ? `${t('speak')}...` : t('listenAudioBtn')}
              </span>
              <kbd className="btn-kbd">{t('spaceKey')}</kbd>
            </button>
          </div>

          {/* Masked Container (Before reveal) */}
          {!isRevealed ? (
            <div id="luisterMaskedBox" className="listening-masked-container">
              <div className="masked-lock-icon">🔒</div>
              <h4>{t('listenInstruction')}</h4>
              <button
                id="luisterRevealBtn"
                className="footer-action-btn footer-btn-primary"
                title={`${t('revealTextBtn')} (${t('spaceKey')})`}
                onClick={revealText}
              >
                <span>👁️ {t('revealTextBtn')}</span>
                <kbd className="btn-kbd">{t('spaceKey')}</kbd>
              </button>
            </div>
          ) : (
            /* Revealed Container (After user presses reveal or SPATIE) */
            <div id="luisterRevealedBox" className="listening-revealed-container">
              <div className="revealed-header">
                <span className="revealed-label">Nederlandse Tekst</span>
              </div>

              <div id="luisterDutchLines" className="listening-dutch-lines">
                {linesWithWords.map((lineItem, lIdx) => (
                  <p key={lIdx} className="luister-line">
                    {lineItem.words.map((word, wIdx) => {
                      const globalIdx = lineItem.startIdx + wIdx;
                      return (
                        <span
                          key={wIdx}
                          className={`tts-word-token ${globalIdx === activeWordIndex ? 'tts-word-highlight' : ''}`}
                        >
                          {word}{' '}
                        </span>
                      );
                    })}
                  </p>
                ))}
              </div>

              {/* Revealed Native Translation */}
              <div className="listening-translation-box">
                <div className="trans-card-header">
                  <span id="luisterLangFlag">{nativeLangObj.flag}</span>
                  <span id="luisterLangName">{nativeLangObj.name} (Vertaling)</span>
                </div>
                <div id="luisterTranslationLines" className="listening-trans-lines">
                  {transLines.map((line, idx) => (
                    <p key={idx} className={`luister-trans-line ${isRtl ? 'rtl' : ''}`}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
