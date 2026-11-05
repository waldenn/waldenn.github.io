import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { LANGUAGES, CEFR_LEVELS, CEFR_META } from '../../constants/languages';
import wordsData from '../../data/words.json';

const LEVEL_TABS = [
  { id: 'all', title: 'Alles' },
  ...CEFR_LEVELS.map(lvl => ({ id: lvl.id, title: lvl.name, colorClass: lvl.colorClass }))
];

export default function WoordenApp() {
  const {
    t,
    nativeLanguage,
    cefrLevel,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedWordLevel,
    setSelectedWordLevel,
    isShuffle,
    speakDutch,
    speakSentenceWithHighlight,
    setCounterInfo,
    setFooterInfo
  } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const rowRefs = useRef([]);
  const containerRef = useRef(null);

  // Level counts
  const levelCounts = useMemo(() => {
    const counts = { all: wordsData.length };
    LEVEL_TABS.forEach((tab) => {
      if (tab.id !== 'all') {
        counts[tab.id] = wordsData.filter((w) => w.level === tab.id).length;
      }
    });
    return counts;
  }, []);

  // Filtered words
  const filteredWords = useMemo(() => {
    let list = [...wordsData];

    // Filter by Level
    if (selectedWordLevel && selectedWordLevel !== 'all') {
      list = list.filter((w) => w.level === selectedWordLevel);
    }

    // Filter by Category with Fallback
    if (selectedCategory !== 'all') {
      const catFiltered = list.filter((w) => w.category === selectedCategory);
      if (catFiltered.length > 0) {
        list = catFiltered;
      } else {
        // Fallback to all if selected category has no words at this level
        setTimeout(() => setSelectedCategory('all'), 0);
      }
    }

    // Filter by Search Query
    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((w) => {
        const d = (w.word || '').toLowerCase();
        const tr = ((w.translations && w.translations[nativeLanguage]) || '').toLowerCase();
        const cat = (w.category || '').toLowerCase();
        return d.includes(q) || tr.includes(q) || cat.includes(q);
      });
    }

    // Shuffle if active
    if (isShuffle) {
      list = [...list].sort(() => Math.random() - 0.5);
    }

    return list;
  }, [selectedWordLevel, selectedCategory, searchQuery, nativeLanguage, isShuffle, setSelectedCategory]);

  // Reset or adjust index when filteredWords change
  useEffect(() => {
    setCurrentIndex((prev) => {
      if (prev >= filteredWords.length) {
        return Math.max(0, filteredWords.length - 1);
      }
      return prev;
    });
  }, [filteredWords.length]);

  // Center active row
  const scrollToActiveRow = useCallback((index) => {
    const el = rowRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  const speakCurrentWord = useCallback((indexToSpeak = currentIndex) => {
    if (filteredWords.length === 0) return;
    const word = filteredWords[indexToSpeak];
    if (word && word.word) {
      // Dutch word column needs no highlighting (font size is already 140% larger)
      speakDutch(word.word);
    }
  }, [filteredWords, currentIndex, speakDutch]);

  const goToNextWord = useCallback((autoSpeak = true) => {
    if (filteredWords.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev >= filteredWords.length - 1) return prev; // Stop at end, do not loop
      const nextIndex = prev + 1;
      scrollToActiveRow(nextIndex);
      if (autoSpeak) {
        speakCurrentWord(nextIndex);
      }
      return nextIndex;
    });
  }, [filteredWords.length, scrollToActiveRow, speakCurrentWord]);

  // When going back a row (Arrow Up / Prev), ALWAYS speak the word again per user request!
  const goToPrevWord = useCallback((autoSpeak = true) => {
    if (filteredWords.length === 0) return;
    setCurrentIndex((prev) => {
      if (prev <= 0) return 0; // Stop at start, do not loop
      const prevIndex = prev - 1;
      scrollToActiveRow(prevIndex);
      if (autoSpeak) {
        speakCurrentWord(prevIndex);
      }
      return prevIndex;
    });
  }, [filteredWords.length, scrollToActiveRow, speakCurrentWord]);

  // Update header counter and footer info
  useEffect(() => {
    const total = filteredWords.length;
    const current = total === 0 ? 0 : currentIndex + 1;
    setCounterInfo({ current, total });

    const catName = selectedCategory === 'all' ? 'Alle categorieën' : selectedCategory;
    setFooterInfo({
      text: `Woorden Leren • ${catName} (${total})`,
      onPrev: () => goToPrevWord(true), // Always speak word when moving back
      onNext: () => goToNextWord(true),
      onSpeak: () => speakCurrentWord(currentIndex),
      hideControls: false
    });
  }, [currentIndex, filteredWords.length, selectedCategory, setCounterInfo, setFooterInfo, goToPrevWord, goToNextWord, speakCurrentWord]);

  const handleRowClick = (index, e) => {
    const sentenceBox = e.target.closest('.col-sentence');
    setCurrentIndex(index);
    scrollToActiveRow(index);

    if (sentenceBox) {
      const wordObj = filteredWords[index];
      const isPreA1orA = ['Pre-A1', 'A1', 'A2'].includes(cefrLevel);
      let dutchSentence = wordObj.example || '';
      if (isPreA1orA && wordObj.simple_example) {
        dutchSentence = wordObj.simple_example;
      }
      const dutchEl = sentenceBox.querySelector('.word-sentence-dutch');
      if (dutchEl && dutchSentence) {
        speakSentenceWithHighlight(dutchSentence, dutchEl);
      } else if (dutchSentence) {
        speakDutch(dutchSentence);
      }
      return;
    }

    const word = filteredWords[index];
    if (word && word.word) {
      speakDutch(word.word);
    }
  };

  const isPreA1orA = ['Pre-A1', 'A1', 'A2'].includes(cefrLevel);
  const isRtl = LANGUAGES[nativeLanguage] && LANGUAGES[nativeLanguage].rtl;

  return (
    <section id="appWoordenView" className="app-view active" aria-label="Woorden Leren">
      {/* Level Tabs Bar */}
      <div className="sentences-level-bar words-level-bar">
        <div className="level-tabs-group" id="wordsLevelTabs">
          {LEVEL_TABS.map((tab) => {
            const isActive = selectedWordLevel === tab.id;
            const meta = CEFR_META[tab.id];
            return (
              <button
                key={tab.id}
                className={`level-tab-btn ${isActive ? 'active' : ''}`}
                onClick={() => setSelectedWordLevel(tab.id)}
              >
                {meta && <span className={`level-badge ${meta.colorClass}`}>{tab.id}</span>}
                <span className="tab-title">{tab.title}</span>
                <span className="tab-count">{levelCounts[tab.id]?.toLocaleString('nl-NL')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sticky Table Column Headers */}
      <div className="table-columns-header" role="row">
        <div className="th-col th-image" role="columnheader">{t('colImage')}</div>
        <div className="th-col th-dutch" role="columnheader">
          <span>{t('colDutchWord')}</span>
        </div>
        <div className="th-col th-trans" role="columnheader">
          <span>{t('colTranslation')}</span>
          <span id="thTransLangTag" className="th-lang-tag">
            {nativeLanguage.toUpperCase()}
          </span>
        </div>
        <div className="th-col th-sentence" role="columnheader">
          {t('colExample')}
        </div>
      </div>

      {/* Scrollable Stream of Word Rows */}
      <main
        ref={containerRef}
        id="wordsStreamContainer"
        className="words-stream-container"
        role="feed"
        aria-label="Woordenlijst met kolommen"
        tabIndex={0}
      >
        {filteredWords.length === 0 ? (
          <div className="empty-words-message">
            <div className="empty-icon">🔍</div>
            <h3>{t('noWordsFound')}</h3>
            <p>{t('noWordsFilterDesc')}</p>
            <button
              className="empty-reset-btn"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
            >
              {t('showAllWordsOfLevel')} ({selectedWordLevel === 'all' ? t('allLevels') : selectedWordLevel})
            </button>
          </div>
        ) : (
          filteredWords.map((wordObj, index) => {
            const isActive = index === currentIndex;
            const transText = (wordObj.translations && wordObj.translations[nativeLanguage]) || '—';

            let dutchSentence = wordObj.example || '';
            let transSentence =
              (wordObj.example_translations && wordObj.example_translations[nativeLanguage]) || '';

            if (isPreA1orA && wordObj.simple_example) {
              dutchSentence = wordObj.simple_example;
              if (
                wordObj.simple_example_translations &&
                wordObj.simple_example_translations[nativeLanguage]
              ) {
                transSentence = wordObj.simple_example_translations[nativeLanguage];
              }
            }

            return (
              <div
                key={wordObj.id || `${wordObj.word}-${index}`}
                ref={(el) => (rowRefs.current[index] = el)}
                className={`word-row ${isActive ? 'active active-row' : ''}`}
                role="row"
                tabIndex={0}
                onClick={(e) => handleRowClick(index, e)}
              >
                <div className="col-cell col-image">
                  <div
                    className="word-svg-thumb"
                    dangerouslySetInnerHTML={{ __html: wordObj.svg || '📷' }}
                  />
                </div>
                <div className="col-cell col-dutch">
                  <div className="dutch-word-content">
                    {wordObj.article && (
                      <span className={`dutch-article-badge ${wordObj.article}`}>
                        {wordObj.article}
                      </span>
                    )}
                    <span className="dutch-word-text">{wordObj.base_word || wordObj.word}</span>
                  </div>
                </div>
                <div className={`col-cell col-trans ${isRtl ? 'rtl-col' : ''}`}>
                  <span className="trans-word-text">{transText}</span>
                </div>
                <div className="col-cell col-sentence" title="Klik om de zin met cursor te horen">
                  <div className="sentence-interactive-box">
                    <div className="word-sentence-dutch">{dutchSentence}</div>
                    {transSentence && (
                      <div className={`word-sentence-trans ${isRtl ? 'rtl' : ''}`}>
                        {transSentence}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </section>
  );
}
