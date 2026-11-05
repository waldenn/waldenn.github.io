import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES } from '../../constants/languages';
import { useSwipeNavigation } from '../../hooks/useSwipeNavigation';
import alphabetData from '../../data/alphabet.json';

export default function AlphabetApp() {
  const { t, nativeLanguage, speakDutch, speakSentenceWithHighlight, setCounterInfo, setFooterInfo } = useApp();

  const [filterType, setFilterType] = useState('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const chipRefs = useRef([]);

  // Counts
  const counts = useMemo(() => {
    return {
      all: alphabetData.length,
      klinker: alphabetData.filter((a) => a.type === 'klinker').length,
      letter: alphabetData.filter((a) => a.type === 'letter').length
    };
  }, []);

  // Filtered letters
  const filteredList = useMemo(() => {
    if (filterType === 'all') return alphabetData;
    return alphabetData.filter((a) => a.type === filterType);
  }, [filterType]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [filterType]);

  const currentItem = filteredList[currentIndex] || filteredList[0];
  const total = filteredList.length;

  // Scroll active chip into view
  useEffect(() => {
    const el = chipRefs.current[currentIndex];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [currentIndex]);

  const speakLetterForIndex = useCallback((idx) => {
    const item = filteredList[idx] || currentItem;
    if (!item) return;
    const textToSpeak = item.sound || item.letter;
    if (textToSpeak) {
      const letterEl = document.getElementById('alphabetBigLetter');
      speakDutch(textToSpeak, letterEl);
    }
  }, [filteredList, currentItem, speakDutch]);

  const speakCurrentLetter = useCallback(() => {
    speakLetterForIndex(currentIndex);
  }, [speakLetterForIndex, currentIndex]);

  const goToNext = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    setCurrentIndex((prev) => {
      const next = (prev + 1) % total;
      if (autoSpeak) {
        setTimeout(() => speakLetterForIndex(next), 40);
      }
      return next;
    });
  }, [total, speakLetterForIndex]);

  const goToPrev = useCallback((autoSpeak = true) => {
    if (total === 0) return;
    setCurrentIndex((prev) => {
      const prevIdx = (prev - 1 + total) % total;
      if (autoSpeak) {
        setTimeout(() => speakLetterForIndex(prevIdx), 40);
      }
      return prevIdx;
    });
  }, [total, speakLetterForIndex]);

  const handleRandom = useCallback(() => {
    if (total === 0) return;
    const rand = Math.floor(Math.random() * total);
    setCurrentIndex(rand);
    setTimeout(() => speakLetterForIndex(rand), 40);
  }, [total, speakLetterForIndex]);

  // Touch swiping support for mobile
  const swipeContainerRef = useSwipeNavigation({
    onSwipeLeft: () => goToNext(true),
    onSwipeRight: () => goToPrev(true),
    enabled: true
  });

  const filterTabs = useMemo(() => [
    { id: 'all', title: t('allLetters') },
    { id: 'klinker', title: t('vowelsAndDiphthongs'), badge: 'Klanken', color: 'blue' },
    { id: 'letter', title: t('lettersAZ'), badge: 'A-Z', color: 'green' }
  ], [t]);

  // Update header & footer
  useEffect(() => {
    setCounterInfo({ current: currentIndex + 1, total });
    setFooterInfo({
      text: `Alfabet & Klanken • Letter ${currentIndex + 1} van ${total}`,
      onPrev: goToPrev,
      onNext: goToNext,
      onSpeak: speakCurrentLetter,
      hideControls: false
    });
  }, [currentIndex, total, setCounterInfo, setFooterInfo, goToPrev, goToNext, speakCurrentLetter]);

  const langObj = LANGUAGES[nativeLanguage] || LANGUAGES.ar;
  const isRtl = langObj.rtl;
  const nativeTip =
    (currentItem && currentItem.tip_translations && currentItem.tip_translations[nativeLanguage]) ||
    '';

  return (
    <section id="appAlphabetView" className="app-view active" aria-label="Alfabet en Klanken">
      {/* Alphabet Toolbar */}
      <div className="alphabet-toolbar">
        <div className="alphabet-type-filters" id="alphabetTypeFilters">
          {filterTabs.map((tab) => {
            const isActive = filterType === tab.id;
            return (
              <button
                key={tab.id}
                className={`level-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setFilterType(tab.id)}
              >
                {tab.badge && <span className={`level-badge ${tab.color}`}>{tab.badge}</span>}
                <span className="tab-title">{tab.title}</span>
                <span className="tab-count">{counts[tab.id]}</span>
              </button>
            );
          })}
        </div>

        <div className="alphabet-toolbar-right">
          <button
            id="alphabetRandomBtn"
            className="header-pill-btn"
            title={t('randomLetter')}
            onClick={handleRandom}
          >
            <span>🎲</span>
            <span>{t('randomLetter')}</span>
          </button>
        </div>
      </div>

      {/* Letters Horizontal Carousel / Strip */}
      <div className="alphabet-strip-container">
        <div id="alphabetChipsRow" className="alphabet-chips-row" role="tablist" aria-label="Kies een letter of klank">
          {filteredList.map((item, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={item.letter}
                ref={(el) => (chipRefs.current[idx] = el)}
                className={`alphabet-chip ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setCurrentIndex(idx);
                  const sound = item.sound || item.letter;
                  if (sound) speakDutch(sound);
                }}
              >
                {item.letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Letter Hero Stage (with Mobile Touch Swiping) */}
      <div ref={swipeContainerRef} className="alphabet-stage-container">
        <div className="alphabet-hero-card">
          <div className="alphabet-hero-top">
            <div className="alphabet-big-letter-box">
              <span id="alphabetBigLetter" className="alphabet-big-letter">
                {currentItem?.letter} / {currentItem?.letter?.toLowerCase()}
              </span>
              <span id="alphabetPhonetic" className="alphabet-phonetic-badge">
                {currentItem?.phonetic || ''}
              </span>
            </div>

            <div className="alphabet-hero-info">
              <div className="alphabet-sound-header">
                <span id="alphabetTypeBadge" className="alphabet-type-badge">
                  {currentItem?.type === 'klinker' ? 'Klank' : 'Letter'}
                </span>
                <button
                  id="alphabetSpeakLetterBtn"
                  className="alphabet-audio-btn"
                  title={`${t('listen')} (${t('spaceKey')})`}
                  onClick={speakCurrentLetter}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                  </svg>
                  <span>{t('listenSound')}</span>
                </button>
              </div>

              <div id="alphabetTipText" className="alphabet-tip-text">
                <span className="alphabet-tip-dutch">{currentItem?.tip || ''}</span>
                {nativeTip && (
                  <div className={`alphabet-tip-trans-text ${isRtl ? 'rtl' : ''}`}>
                    <span className="tip-flag">{langObj.flag}</span>
                    <span>{nativeTip}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Example Words Section */}
          <div className="alphabet-examples-section">
            <div className="alphabet-examples-header">
              <h4>{t('wordsContainingLetter')}</h4>
              <span className="examples-hint">{t('clickWordToHear')}</span>
            </div>

            <div id="alphabetExamplesGrid" className="alphabet-examples-grid">
              {(currentItem?.examples || []).map((ex, exIdx) => {
                const transText = (ex.translations && ex.translations[nativeLanguage]) || '';
                return (
                  <div
                    key={exIdx}
                    className="alphabet-word-card"
                    role="button"
                    tabIndex={0}
                    onClick={(e) => {
                      const wordEl = e.currentTarget.querySelector('.alph-card-word');
                      speakSentenceWithHighlight(ex.word, wordEl);
                    }}
                  >
                    <div
                      className="alph-card-img"
                      dangerouslySetInnerHTML={{ __html: ex.svg || '📷' }}
                    />
                    <div className="alph-card-info">
                      <span className="alph-card-word">{ex.word}</span>
                      <div className="alph-card-trans-pill">
                        <span className="alph-trans-flag">{langObj.flag}</span>
                        <span className="alph-trans-label">{langObj.name}:</span>
                        <span className={`alph-trans-val ${isRtl ? 'rtl' : ''}`}>{transText}</span>
                      </div>
                    </div>
                    <span className="alph-card-audio" title="Klik om uit te spreken">
                      🔊
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
