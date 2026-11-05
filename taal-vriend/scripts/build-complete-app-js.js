const fs = require('fs');
const path = require('path');

const appJsContent = `// js/app.js - TaalVriend: Woorden, Zinnen, Luisteren, Reageren, Klok & Alfabet

(function() {
  'use strict';

  // Supported Native Languages (including Somali)
  const LANGUAGES = {
    ar: { name: 'العربية', englishName: 'Standaard Arabisch', flag: '🇸🇦', rtl: true },
    ti: { name: 'ትግርኛ', englishName: 'Tigrinya', flag: '🇪🇷', rtl: false },
    om: { name: 'Afaan Oromoo', englishName: 'Oromo', flag: '🇪🇹', rtl: false },
    so: { name: 'Soomaali', englishName: 'Somalisch', flag: '🇸🇴', rtl: false },
    en: { name: 'English', englishName: 'Engels', flag: '🇬🇧', rtl: false }
  };

  const APPS = {
    woorden: {
      name: 'Woorden Leren',
      translations: { ar: 'تعلم الكلمات', ti: 'ቃላት ምምሃር', om: 'Jechoota Barachuu', so: 'Barashada Erayada', en: 'Learn Words' },
      icon: '📖',
      badge: '1.500+ Woorden'
    },
    zinnen: {
      name: 'Zinnen Oefenen',
      translations: { ar: 'ممارسة الجمل', ti: 'ምስላታትን ሓረጋትን ምልምማድ', om: 'Hima Shaakaluu', so: 'Barashada Jumladdaha', en: 'Practice Sentences' },
      icon: '💬',
      badge: '390+ Zinnen'
    },
    luisteren: {
      name: 'Luistervaardigheid',
      translations: { ar: 'مهارة الاستماع', ti: 'ናይ ምስማዕ ክእለት', om: 'Dandeettii Dhaggeeffannaa', so: 'Fahamka Dhageysiga', en: 'Listening Comprehension' },
      icon: '🎧',
      badge: '120+ Teksten'
    },
    reageer: {
      name: 'Luister en Reageer',
      translations: { ar: 'استمع وأجب', ti: 'ስማዕን መልስን', om: 'Dhaggeeffadhuu Deebisi', so: 'Dhageyso oo Ka Jawaab', en: 'Listen & Respond' },
      icon: '🎯',
      badge: '700+ Vragen'
    },
    klok: {
      name: 'Klok Kijken',
      translations: { ar: 'قراءة الساعة', ti: 'ሰዓት ምፍላጥ', om: 'Sa\\'aatii Ilaaluu', so: 'Akhrinta Saacadda', en: 'Telling Time' },
      icon: '⏰',
      badge: '144 Tijden'
    },
    alphabet: {
      name: 'Alfabet & Klanken',
      translations: { ar: 'الأبجدية والأصوات', ti: 'ፊደላትን ድምጽታትን', om: 'Qubee fi Sagalee', so: 'Xarfaha iyo Dhawaaqyada', en: 'Alphabet & Sounds' },
      icon: '🔤',
      badge: '38 Klanken'
    }
  };

  const CEFR_LEVELS = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

  // State Management
  const state = {
    activeApp: localStorage.getItem('taalvriend_active_app') || 'woorden',

    // Words App State
    allWords: [],
    displayWords: [],
    currentWordIndex: 0,
    searchQuery: '',
    selectedCategory: 'all',
    selectedWordLevel: localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1',

    // Clock App State
    allClocks: [],
    filteredClocks: [],
    currentClockIndex: 0,
    isClockRevealed: false,

    // Sentences App State
    allSentences: [],
    filteredSentences: [],
    currentSentenceIndex: 0,
    currentSentenceLevel: localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1',

    // Alphabet App State
    allAlphabet: [],
    filteredAlphabet: [],
    currentAlphabetIndex: 0,
    selectedAlphabetType: 'all',

    // Listening App State
    allListening: [],
    filteredListening: [],
    currentListeningIndex: 0,
    currentListeningLevel: localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1',
    isListeningRevealed: false,
    isListeningPlaying: false,

    // Respond App State (Luister en Reageer)
    allRespond: [],
    filteredRespond: [],
    currentRespondIndex: 0,
    currentRespondLevel: localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1',
    isRespondQuestionRevealed: false,
    selectedRespondOption: null,

    // Shared State & Settings
    nativeLanguage: localStorage.getItem('taalvriend_lang') || 'ar',
    cefrLevel: localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1',
    fontFamily: localStorage.getItem('taalvriend_font_family') || "'IBM Plex Sans Condensed', sans-serif",
    baseFontSize: parseInt(localStorage.getItem('taalvriend_font_size'), 10) || 16,
    theme: localStorage.getItem('taalvriend_theme') || 'system',
    ttsVoiceURI: localStorage.getItem('taalvriend_voice_uri') || '',
    ttsRate: parseFloat(localStorage.getItem('taalvriend_rate')) || 1.0,
    isShuffle: localStorage.getItem('taalvriend_shuffle') === 'true',
    availableVoices: []
  };

  // DOM Elements
  const el = {
    // Header & Brand
    appSwitcherBtn: document.getElementById('appSwitcherBtn'),
    currentAppName: document.getElementById('currentAppName'),
    currentAppIcon: document.getElementById('currentAppIcon'),
    counterBadge: document.getElementById('counterBadge'),
    activeRowNumber: document.getElementById('activeRowNumber'),
    totalRowsCount: document.getElementById('totalRowsCount'),
    activeLanguageFlag: document.getElementById('activeLanguageFlag'),
    activeLanguageName: document.getElementById('activeLanguageName'),
    headerSearchContainer: document.getElementById('headerSearchContainer'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),
    categoryHeaderBtn: document.getElementById('categoryHeaderBtn'),
    categoryHeaderName: document.getElementById('categoryHeaderName'),
    categoryCountBadge: document.getElementById('categoryCountBadge'),
    cefrHeaderBtn: document.getElementById('cefrHeaderBtn'),
    cefrHeaderTag: document.getElementById('cefrHeaderTag'),
    langQuickSelectBtn: document.getElementById('langQuickSelectBtn'),
    langQuickFlag: document.getElementById('langQuickFlag'),
    langQuickName: document.getElementById('langQuickName'),
    shuffleHeaderBtn: document.getElementById('shuffleHeaderBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    configBtn: document.getElementById('configBtn'),

    // App Containers
    appWoordenView: document.getElementById('appWoordenView'),
    appKlokView: document.getElementById('appKlokView'),
    appZinnenView: document.getElementById('appZinnenView'),
    appAlphabetView: document.getElementById('appAlphabetView'),
    appLuisterView: document.getElementById('appLuisterView'),
    appReageerView: document.getElementById('appReageerView'),

    // Words App Elements
    wordsLevelTabs: document.querySelectorAll('#wordsLevelTabs .level-tab-btn'),
    wordsStreamContainer: document.getElementById('wordsStreamContainer'),
    thTransLangTag: document.getElementById('thTransLangTag'),

    // Clock App Elements
    clockSvgContainer: document.getElementById('clockSvgContainer'),
    clockDigitalBadge: document.getElementById('clockDigitalBadge'),
    clockDutchPhrase: document.getElementById('clockDutchPhrase'),
    clockSentenceBox: document.getElementById('clockSentenceBox'),
    clockSentenceText: document.getElementById('clockSentenceText'),
    clockTranslationText: document.getElementById('clockTranslationText'),
    clockLangFlag: document.getElementById('clockLangFlag'),
    clockLangName: document.getElementById('clockLangName'),
    clockMinuteChips: document.getElementById('clockMinuteChips'),
    clockRandomBtn: document.getElementById('clockRandomBtn'),
    clockSpeakBtn: document.getElementById('clockSpeakBtn'),
    clockCounterText: document.getElementById('clockCounterText'),
    clockMaskedPanel: document.getElementById('clockMaskedPanel'),
    clockRevealedPanel: document.getElementById('clockRevealedPanel'),
    clockRevealBtn: document.getElementById('clockRevealBtn'),

    // Sentences App Elements
    sentenceLevelBtns: document.querySelectorAll('#sentencesLevelTabs .level-tab-btn'),
    sentenceTopicBadge: document.getElementById('sentenceTopicBadge'),
    sentenceCounterBadge: document.getElementById('sentenceCounterBadge'),
    sentenceDutchText: document.getElementById('sentenceDutchText'),
    sentenceLangFlag: document.getElementById('sentenceLangFlag'),
    sentenceLangName: document.getElementById('sentenceLangName'),
    sentenceTranslationText: document.getElementById('sentenceTranslationText'),
    sentenceSpeakBtn: document.getElementById('sentenceSpeakBtn'),
    sentenceRandomBtn: document.getElementById('sentenceRandomBtn'),

    // Alphabet App Elements
    alphabetTypeFilters: document.querySelectorAll('#alphabetTypeFilters .level-tab-btn'),
    alphabetRandomBtn: document.getElementById('alphabetRandomBtn'),
    alphabetChipsRow: document.getElementById('alphabetChipsRow'),
    alphabetBigLetter: document.getElementById('alphabetBigLetter'),
    alphabetPhonetic: document.getElementById('alphabetPhonetic'),
    alphabetTypeBadge: document.getElementById('alphabetTypeBadge'),
    alphabetTipText: document.getElementById('alphabetTipText'),
    alphabetSpeakLetterBtn: document.getElementById('alphabetSpeakLetterBtn'),
    alphabetExamplesGrid: document.getElementById('alphabetExamplesGrid'),

    // Listening App Elements
    luisterLevelTabs: document.querySelectorAll('#luisterLevelTabs .level-tab-btn'),
    luisterRandomBtn: document.getElementById('luisterRandomBtn'),
    luisterCategoryBadge: document.getElementById('luisterCategoryBadge'),
    luisterTitleText: document.getElementById('luisterTitleText'),
    luisterCounterBadge: document.getElementById('luisterCounterBadge'),
    luisterSoundWaves: document.getElementById('luisterSoundWaves'),
    luisterPlayAudioBtn: document.getElementById('luisterPlayAudioBtn'),
    luisterPlayBtnLabel: document.getElementById('luisterPlayBtnLabel'),
    luisterMaskedBox: document.getElementById('luisterMaskedBox'),
    luisterRevealBtn: document.getElementById('luisterRevealBtn'),
    luisterRevealedBox: document.getElementById('luisterRevealedBox'),
    luisterDutchLines: document.getElementById('luisterDutchLines'),
    luisterLangFlag: document.getElementById('luisterLangFlag'),
    luisterLangName: document.getElementById('luisterLangName'),
    luisterTranslationLines: document.getElementById('luisterTranslationLines'),

    // Respond App Elements (Luister en Reageer)
    reageerLevelTabs: document.querySelectorAll('#reageerLevelTabs .level-tab-btn'),
    reageerRandomBtn: document.getElementById('reageerRandomBtn'),
    reageerTopicBadge: document.getElementById('reageerTopicBadge'),
    reageerSituationText: document.getElementById('reageerSituationText'),
    reageerCounterBadge: document.getElementById('reageerCounterBadge'),
    reageerSoundWaves: document.getElementById('reageerSoundWaves'),
    reageerPlayAudioBtn: document.getElementById('reageerPlayAudioBtn'),
    reageerAudioBtnLabel: document.getElementById('reageerAudioBtnLabel'),
    reageerToggleQBtn: document.getElementById('reageerToggleQBtn'),
    reageerToggleQLabel: document.getElementById('reageerToggleQLabel'),
    reageerQuestionRevealed: document.getElementById('reageerQuestionRevealed'),
    reageerDutchQuestion: document.getElementById('reageerDutchQuestion'),
    reageerTransFlag: document.getElementById('reageerTransFlag'),
    reageerTransQuestion: document.getElementById('reageerTransQuestion'),
    reageerOptionsGrid: document.getElementById('reageerOptionsGrid'),
    reageerFeedbackBox: document.getElementById('reageerFeedbackBox'),
    reageerFeedbackIcon: document.getElementById('reageerFeedbackIcon'),
    reageerFeedbackTitle: document.getElementById('reageerFeedbackTitle'),
    reageerExplanationDutch: document.getElementById('reageerExplanationDutch'),
    reageerExplLangFlag: document.getElementById('reageerExplLangFlag'),
    reageerExplanationNative: document.getElementById('reageerExplanationNative'),
    reageerNextBtn: document.getElementById('reageerNextBtn'),

    // Footer
    footerBar: document.querySelector('.app-footer'),
    footerLeft: document.querySelector('.footer-left'),
    footerSpeakBtn: document.getElementById('footerSpeakBtn'),
    btnPrevRow: document.getElementById('btnPrevRow'),
    btnNextRow: document.getElementById('btnNextRow'),
    footerCategoryText: document.getElementById('footerCategoryText'),

    // Modals
    appSwitcherModal: document.getElementById('appSwitcherModal'),
    appSwitcherCloseBtn: document.getElementById('appSwitcherCloseBtn'),
    appChoiceCards: document.querySelectorAll('.app-choice-card'),
    configModal: document.getElementById('configModal'),
    configCloseBtn: document.getElementById('configCloseBtn'),
    categoryModal: document.getElementById('categoryModal'),
    categoryCloseBtn: document.getElementById('categoryCloseBtn'),
    categoryFilterGrid: document.getElementById('categoryFilterGrid'),
    langRadioGroup: document.getElementById('langRadioGroup'),
    themeSelect: document.getElementById('themeSelect'),
    voiceSelect: document.getElementById('voiceSelect'),
    cefrSelect: document.getElementById('cefrSelect'),
    fontSelect: document.getElementById('fontSelect'),
    fontSizeSlider: document.getElementById('fontSizeSlider'),
    fontSizeVal: document.getElementById('fontSizeVal'),
    speechRateSlider: document.getElementById('speechRateSlider'),
    speechRateVal: document.getElementById('speechRateVal')
  };

  // ====================================================
  // TTS WITH ACTIVE WORD HIGHLIGHTING CURSOR
  // ====================================================
  function speakWithWordHighlight(text, containerEl, onFinish) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (err) {}

    let wordSpans = [];
    if (containerEl) {
      const wordsList = text.trim().split(/\\s+/);
      containerEl.innerHTML = '';
      wordsList.forEach((w, idx) => {
        const span = document.createElement('span');
        span.className = 'tts-word-token';
        span.setAttribute('data-word-index', idx);
        span.textContent = w + (idx < wordsList.length - 1 ? ' ' : '');
        containerEl.appendChild(span);
        wordSpans.push(span);
      });
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    utterance.rate = state.ttsRate || 1.0;

    if (state.ttsVoiceURI && state.availableVoices.length > 0) {
      const voice = state.availableVoices.find(v => v.voiceURI === state.ttsVoiceURI);
      if (voice) utterance.voice = voice;
    }

    // Retain global reference against GC bug in Chrome/Safari
    window._currentUtterance = utterance;

    function highlightWord(idx) {
      wordSpans.forEach((sp, i) => {
        sp.classList.toggle('tts-word-highlight', i === idx);
      });
    }

    let fallbackTimer = null;
    function clearAllHighlights() {
      wordSpans.forEach(sp => sp.classList.remove('tts-word-highlight'));
      if (fallbackTimer) clearInterval(fallbackTimer);
    }

    let receivedBoundary = false;
    utterance.onboundary = function(e) {
      if (e.name === 'word' && wordSpans.length > 0) {
        receivedBoundary = true;
        let cumulative = 0;
        let foundIdx = 0;
        for (let i = 0; i < wordSpans.length; i++) {
          const len = wordSpans[i].textContent.length;
          if (e.charIndex >= cumulative && e.charIndex < cumulative + len) {
            foundIdx = i;
            break;
          }
          cumulative += len;
        }
        highlightWord(foundIdx);
      }
    };

    utterance.onstart = function() {
      if (wordSpans.length > 0) {
        highlightWord(0);
        setTimeout(() => {
          if (!receivedBoundary && wordSpans.length > 1) {
            const wordDurationMs = Math.max(260, (60000 / (150 * utterance.rate)));
            let curr = 1;
            fallbackTimer = setInterval(() => {
              if (curr < wordSpans.length) {
                highlightWord(curr++);
              } else {
                clearInterval(fallbackTimer);
              }
            }, wordDurationMs);
          }
        }, 350);
      }
    };

    utterance.onend = function() {
      clearAllHighlights();
      if (onFinish) onFinish();
    };

    utterance.onerror = function() {
      clearAllHighlights();
      if (onFinish) onFinish();
    };

    window.speechSynthesis.speak(utterance);
  }

  function speakText(text, onFinish) {
    speakWithWordHighlight(text, null, onFinish);
  }

  // ====================================================
  // NAVIGATION & APP SWITCHING
  // ====================================================
  function switchApp(appName) {
    if (!APPS[appName]) return;
    state.activeApp = appName;
    localStorage.setItem('taalvriend_active_app', appName);

    // Update URL parameter (?app=...)
    const url = new URL(window.location.href);
    url.searchParams.set('app', appName);
    window.history.replaceState({}, '', url.toString());

    // Update Header Brand
    const appInfo = APPS[appName];
    if (el.currentAppName) el.currentAppName.textContent = appInfo.name;
    if (el.currentAppIcon) el.currentAppIcon.textContent = appInfo.icon;

    // Toggle View Sections
    const views = [
      { name: 'woorden', el: el.appWoordenView },
      { name: 'klok', el: el.appKlokView },
      { name: 'zinnen', el: el.appZinnenView },
      { name: 'alphabet', el: el.appAlphabetView },
      { name: 'luisteren', el: el.appLuisterView },
      { name: 'reageer', el: el.appReageerView }
    ];
    views.forEach(v => {
      if (v.el) {
        const isActive = v.name === appName;
        v.el.style.display = isActive ? 'flex' : 'none';
        v.el.classList.toggle('active', isActive);
      }
    });

    // Show/Hide Topbar Words-specific Controls
    const isWords = appName === 'woorden';
    if (el.headerSearchContainer) el.headerSearchContainer.style.display = isWords ? 'flex' : 'none';
    if (el.categoryHeaderBtn) el.categoryHeaderBtn.style.display = isWords ? 'flex' : 'none';
    if (el.shuffleHeaderBtn) el.shuffleHeaderBtn.style.display = isWords ? 'flex' : 'none';

    // In Luisteren app, hide footer navigation buttons per user request
    if (el.footerLeft) {
      el.footerLeft.style.display = appName === 'luisteren' ? 'none' : 'flex';
    }

    // Refresh context
    if (appName === 'woorden') {
      applyWordsFilters(false);
      highlightCurrentRow(true);
    } else if (appName === 'klok') {
      applyClockFilter(false);
    } else if (appName === 'zinnen') {
      applySentenceFilter(false);
    } else if (appName === 'alphabet') {
      applyAlphabetFilter(false);
    } else if (appName === 'luisteren') {
      applyListeningFilter(false);
    } else if (appName === 'reageer') {
      applyRespondFilter(false);
    }

    updateContextCounter();
  }

  function updateContextCounter() {
    if (state.activeApp === 'woorden') {
      const total = state.displayWords.length;
      const current = total === 0 ? 0 : state.currentWordIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.categoryCountBadge) el.categoryCountBadge.textContent = total;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Woorden Leren • \${state.selectedCategory === 'all' ? 'Alle categorieën' : state.selectedCategory} (\${total})\`;
      }
    } else if (state.activeApp === 'klok') {
      const total = state.filteredClocks.length;
      const current = total === 0 ? 0 : state.currentClockIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.clockCounterText) el.clockCounterText.textContent = \`Klok \${current} / \${total}\`;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Klok Kijken • 5-minuten intervallen (\${total})\`;
      }
    } else if (state.activeApp === 'zinnen') {
      const total = state.filteredSentences.length;
      const current = total === 0 ? 0 : state.currentSentenceIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.sentenceCounterBadge) el.sentenceCounterBadge.textContent = \`Zin \${current} van \${total}\`;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Zinnen Oefenen • Niveau \${state.currentSentenceLevel} (\${total})\`;
      }
    } else if (state.activeApp === 'alphabet') {
      const total = state.filteredAlphabet.length;
      const current = total === 0 ? 0 : state.currentAlphabetIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Alfabet & Klanken • Letter \${current} van \${total}\`;
      }
    } else if (state.activeApp === 'luisteren') {
      const total = state.filteredListening.length;
      const current = total === 0 ? 0 : state.currentListeningIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Luistervaardigheid • Niveau \${state.currentListeningLevel} (\${total} fragmenten)\`;
      }
    } else if (state.activeApp === 'reageer') {
      const total = state.filteredRespond.length;
      const current = total === 0 ? 0 : state.currentRespondIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.reageerCounterBadge) el.reageerCounterBadge.textContent = \`Vraag \${current} van \${total}\`;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = \`Luister en Reageer • Niveau \${state.currentRespondLevel} (\${total} situaties)\`;
      }
    }
  }

  // ====================================================
  // APP 1: WOORDEN LEREN
  // ====================================================
  function updateWordCounts() {
    const allCount = state.allWords.length;
    const cAll = document.getElementById('countWordsAll');
    if (cAll) cAll.textContent = \`\${allCount}\`;

    CEFR_LEVELS.forEach(lvl => {
      const count = state.allWords.filter(w => w.level === lvl).length;
      const domId = 'countWords' + lvl.replace(/[^a-zA-Z0-9]/g, '');
      const dom = document.getElementById(domId);
      if (dom) dom.textContent = \`\${count}\`;
    });
  }

  function populateCategoryModal() {
    if (!el.categoryFilterGrid) return;
    el.categoryFilterGrid.innerHTML = '';

    const categories = [...new Set(state.allWords.map(w => w.category).filter(Boolean))].sort();

    // All Categories card
    const allCard = document.createElement('button');
    allCard.className = \`category-choice-btn \${state.selectedCategory === 'all' ? 'active' : ''}\`;
    allCard.innerHTML = \`
      <div class="cat-choice-left">
        <span class="cat-choice-icon">📚</span>
        <span class="cat-choice-name">Alle categorieën</span>
      </div>
      <span class="cat-choice-count">\${state.allWords.length}</span>
    \`;
    allCard.addEventListener('click', () => {
      state.selectedCategory = 'all';
      if (el.categoryHeaderName) el.categoryHeaderName.textContent = 'Alle categorieën';
      closeAllModals();
      applyWordsFilters(true);
    });
    el.categoryFilterGrid.appendChild(allCard);

    // Individual category cards
    categories.forEach(cat => {
      const count = state.allWords.filter(w => w.category === cat).length;
      const card = document.createElement('button');
      card.className = \`category-choice-btn \${state.selectedCategory === cat ? 'active' : ''}\`;
      card.innerHTML = \`
        <div class="cat-choice-left">
          <span class="cat-choice-icon">📁</span>
          <span class="cat-choice-name">\${cat}</span>
        </div>
        <span class="cat-choice-count">\${count}</span>
      \`;
      card.addEventListener('click', () => {
        state.selectedCategory = cat;
        if (el.categoryHeaderName) el.categoryHeaderName.textContent = cat;
        closeAllModals();
        applyWordsFilters(true);
      });
      el.categoryFilterGrid.appendChild(card);
    });
  }

  function applyWordsFilters(resetIndex = false) {
    let list = [...state.allWords];

    // Filter by Level
    if (state.selectedWordLevel && state.selectedWordLevel !== 'all') {
      list = list.filter(w => w.level === state.selectedWordLevel);
    }

    // Filter by Category
    if (state.selectedCategory !== 'all') {
      const catFiltered = list.filter(w => w.category === state.selectedCategory);
      if (catFiltered.length > 0) {
        list = catFiltered;
      } else {
        // Fallback: Current category has no words at this level!
        // Reset category to 'all' so the word list is NEVER empty.
        state.selectedCategory = 'all';
        if (el.categoryHeaderName) el.categoryHeaderName.textContent = 'Alle categorieën';
      }
    }

    // Filter by Search Query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(w => {
        const d = (w.word || '').toLowerCase();
        const tr = ((w.translations && w.translations[state.nativeLanguage]) || '').toLowerCase();
        const cat = (w.category || '').toLowerCase();
        return d.includes(q) || tr.includes(q) || cat.includes(q);
      });
    }

    // Shuffle if enabled
    if (state.isShuffle) {
      list.sort(() => Math.random() - 0.5);
    }

    state.displayWords = list;

    if (resetIndex) {
      state.currentWordIndex = 0;
    } else if (state.currentWordIndex >= state.displayWords.length) {
      state.currentWordIndex = Math.max(0, state.displayWords.length - 1);
    }

    // Highlight Level Tabs
    if (el.wordsLevelTabs) {
      el.wordsLevelTabs.forEach(btn => {
        const lvl = btn.getAttribute('data-word-level');
        btn.classList.toggle('active', lvl === state.selectedWordLevel);
      });
    }

    renderWordsStream();
    updateContextCounter();
  }

  function renderWordsStream() {
    if (!el.wordsStreamContainer) return;
    el.wordsStreamContainer.innerHTML = '';

    if (state.displayWords.length === 0) {
      el.wordsStreamContainer.innerHTML = \`
        <div class="empty-words-message">
          <div class="empty-icon">🔍</div>
          <h3>Geen woorden gevonden</h3>
          <p>Er zijn geen woorden voor het actieve zoek- of categoriefilter.</p>
          <button class="empty-reset-btn" id="emptyResetFilterBtn">Toon alle woorden van niveau \${state.selectedWordLevel === 'all' ? 'alle niveaus' : state.selectedWordLevel}</button>
        </div>
      \`;
      const resetBtn = el.wordsStreamContainer.querySelector('#emptyResetFilterBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.searchQuery = '';
          state.selectedCategory = 'all';
          if (el.searchInput) el.searchInput.value = '';
          if (el.categoryHeaderName) el.categoryHeaderName.textContent = 'Alle categorieën';
          applyWordsFilters(true);
        });
      }
      return;
    }

    const fragment = document.createDocumentFragment();
    const isPreA1orA = ['Pre-A1', 'A1', 'A2'].includes(state.cefrLevel);

    state.displayWords.forEach((wordObj, index) => {
      const row = document.createElement('div');
      row.className = \`word-row \${index === state.currentWordIndex ? 'active active-row' : ''}\`;
      row.setAttribute('data-index', index);
      row.setAttribute('role', 'row');
      row.setAttribute('tabindex', '0');

      // Native translation
      const transText = (wordObj.translations && wordObj.translations[state.nativeLanguage]) || '—';
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;

      // Dutch example sentence & translation
      let dutchSentence = wordObj.example || '';
      let transSentence = (wordObj.example_translations && wordObj.example_translations[state.nativeLanguage]) || '';

      if (isPreA1orA && wordObj.simple_example) {
        dutchSentence = wordObj.simple_example;
        if (wordObj.simple_example_translations && wordObj.simple_example_translations[state.nativeLanguage]) {
          transSentence = wordObj.simple_example_translations[state.nativeLanguage];
        }
      }

      row.innerHTML = \`
        <div class="col-cell col-image">
          <div class="word-svg-thumb">\${wordObj.svg || '📷'}</div>
        </div>
        <div class="col-cell col-dutch">
          <div class="dutch-word-content">
            \${wordObj.article ? \`<span class="dutch-article-badge \${wordObj.article}">\${wordObj.article}</span>\` : ''}
            <span class="dutch-word-text">\${wordObj.base_word || wordObj.word}</span>
            <button class="row-speaker-btn" title="Spreek uit (SPATIE)" aria-label="Spreek \${wordObj.word} uit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            </button>
          </div>
        </div>
        <div class="col-cell col-trans \${isRtl ? 'rtl-col' : ''}">
          <span class="trans-word-text">\${transText}</span>
        </div>
        <div class="col-cell col-sentence" title="Klik om de zin met cursor te horen">
          <div class="sentence-interactive-box">
            <div class="word-sentence-dutch">\${dutchSentence}</div>
            \${transSentence ? \`<div class="word-sentence-trans \${isRtl ? 'rtl' : ''}">\${transSentence}</div>\` : ''}
          </div>
        </div>
      \`;

      // Click to select row & speak word
      row.addEventListener('click', (e) => {
        const sentenceBox = e.target.closest('.col-sentence');
        if (sentenceBox) {
          selectWordRow(index, false);
          const dutchSpan = sentenceBox.querySelector('.word-sentence-dutch');
          speakWithWordHighlight(dutchSentence, dutchSpan);
          return;
        }
        selectWordRow(index, true);
        speakCurrentWord();
      });

      fragment.appendChild(row);
    });

    el.wordsStreamContainer.appendChild(fragment);
  }

  function selectWordRow(index, shouldScroll = true) {
    if (index < 0 || index >= state.displayWords.length) return;
    state.currentWordIndex = index;
    highlightCurrentRow(shouldScroll);
    updateContextCounter();
  }

  function highlightCurrentRow(shouldScroll = true) {
    const rows = el.wordsStreamContainer.querySelectorAll('.word-row');
    rows.forEach((r, idx) => {
      const isActive = idx === state.currentWordIndex;
      r.classList.toggle('active', isActive);
      r.classList.toggle('active-row', isActive);
      if (isActive && shouldScroll) {
        r.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  function speakCurrentWord() {
    if (state.displayWords.length === 0) return;
    const wordObj = state.displayWords[state.currentWordIndex];
    if (wordObj && wordObj.word) {
      speakText(wordObj.word);
    }
  }

  function goToNextWord(autoSpeak = true) {
    if (state.displayWords.length === 0) return;
    if (state.currentWordIndex < state.displayWords.length - 1) {
      selectWordRow(state.currentWordIndex + 1, true);
    } else {
      selectWordRow(0, true);
    }
    if (autoSpeak) {
      speakCurrentWord();
    }
  }

  function goToPrevWord(autoSpeak = false) {
    if (state.displayWords.length === 0) return;
    if (state.currentWordIndex > 0) {
      selectWordRow(state.currentWordIndex - 1, true);
    } else {
      selectWordRow(state.displayWords.length - 1, true);
    }
    if (autoSpeak) {
      speakCurrentWord();
    }
  }

  // ====================================================
  // APP 2: KLOK KIJKEN (Interactive Reveal)
  // ====================================================
  function applyClockFilter(resetIndex = false) {
    state.filteredClocks = [...state.allClocks];

    if (resetIndex) {
      state.currentClockIndex = 0;
    } else if (state.currentClockIndex >= state.filteredClocks.length) {
      state.currentClockIndex = Math.max(0, state.filteredClocks.length - 1);
    }

    state.isClockRevealed = false;
    renderActiveClock();
    updateContextCounter();
  }

  function renderActiveClock() {
    if (state.filteredClocks.length === 0) return;
    const item = state.filteredClocks[state.currentClockIndex];
    if (!item) return;

    if (el.clockSvgContainer) el.clockSvgContainer.innerHTML = item.svg || '';
    if (el.clockDigitalBadge) {
      el.clockDigitalBadge.textContent = item.digitalTime || item.timeDigital || '12:00';
      el.clockDigitalBadge.style.display = state.isClockRevealed ? 'block' : 'none';
    }
    if (el.clockDutchPhrase) el.clockDutchPhrase.textContent = item.dutchPhrase || item.phrase || '';
    if (el.clockSentenceText) el.clockSentenceText.textContent = item.sentence || '';

    const transText = (item.translations && item.translations[state.nativeLanguage]) || '—';
    if (el.clockTranslationText) {
      el.clockTranslationText.textContent = transText;
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
      el.clockTranslationText.dir = isRtl ? 'rtl' : 'ltr';
    }

    if (el.clockMaskedPanel) el.clockMaskedPanel.style.display = state.isClockRevealed ? 'none' : 'flex';
    if (el.clockRevealedPanel) el.clockRevealedPanel.style.display = state.isClockRevealed ? 'flex' : 'none';

    // Highlight minute chip
    if (el.clockMinuteChips) {
      const chips = el.clockMinuteChips.querySelectorAll('.minute-chip');
      chips.forEach(chip => {
        const m = parseInt(chip.getAttribute('data-minute'), 10);
        chip.classList.toggle('active', m === item.minute || m === item.minutes);
      });
    }

    updateContextCounter();
  }

  function renderMinuteChips() {
    if (!el.clockMinuteChips) return;
    el.clockMinuteChips.innerHTML = '';

    const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
    minutes.forEach(m => {
      const chip = document.createElement('button');
      chip.className = 'minute-chip';
      chip.setAttribute('data-minute', m);
      chip.textContent = ':' + (m < 10 ? '0' + m : m);

      chip.addEventListener('click', () => {
        const idx = state.filteredClocks.findIndex(c => (c.minute === m || c.minutes === m));
        if (idx !== -1) {
          state.currentClockIndex = idx;
          state.isClockRevealed = false;
          renderActiveClock();
        }
      });

      el.clockMinuteChips.appendChild(chip);
    });
  }

  function revealClockTime() {
    state.isClockRevealed = true;
    renderActiveClock();
    const item = state.filteredClocks[state.currentClockIndex];
    if (item && item.sentence && el.clockSentenceText) {
      speakWithWordHighlight(item.sentence, el.clockSentenceText);
    }
  }

  function goToNextClock() {
    if (state.filteredClocks.length === 0) return;
    state.isClockRevealed = false;
    state.currentClockIndex = (state.currentClockIndex + 1) % state.filteredClocks.length;
    renderActiveClock();
  }

  function goToPrevClock() {
    if (state.filteredClocks.length === 0) return;
    state.isClockRevealed = false;
    state.currentClockIndex = (state.currentClockIndex - 1 + state.filteredClocks.length) % state.filteredClocks.length;
    renderActiveClock();
  }

  // ====================================================
  // APP 3: ZINNEN OEFENEN (ERK / CEFR Niveaus)
  // ====================================================
  function updateSentenceCounts() {
    CEFR_LEVELS.forEach(lvl => {
      const c = state.allSentences.filter(s => s.level === lvl).length;
      const idTag = 'countSent' + lvl.replace(/[^a-zA-Z0-9]/g, '');
      const dom = document.getElementById(idTag);
      if (dom) dom.textContent = \`\${c}\`;
    });
  }

  function applySentenceFilter(resetIndex = false) {
    let list = state.allSentences.filter(s => s.level === state.currentSentenceLevel);
    if (list.length === 0) list = state.allSentences;
    state.filteredSentences = list;

    if (resetIndex) {
      state.currentSentenceIndex = 0;
    } else if (state.currentSentenceIndex >= state.filteredSentences.length) {
      state.currentSentenceIndex = Math.max(0, state.filteredSentences.length - 1);
    }

    if (el.sentenceLevelBtns) {
      el.sentenceLevelBtns.forEach(btn => {
        const lvl = btn.getAttribute('data-sentence-level');
        btn.classList.toggle('active', lvl === state.currentSentenceLevel);
      });
    }

    renderActiveSentence();
    updateContextCounter();
  }

  function renderActiveSentence() {
    if (state.filteredSentences.length === 0) return;
    const item = state.filteredSentences[state.currentSentenceIndex];
    if (!item) return;

    if (el.sentenceTopicBadge) el.sentenceTopicBadge.textContent = item.topic || 'Algemeen';
    if (el.sentenceDutchText) el.sentenceDutchText.textContent = item.dutch || '';

    const transText = (item.translations && item.translations[state.nativeLanguage]) || '—';
    if (el.sentenceTranslationText) {
      el.sentenceTranslationText.textContent = transText;
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
      el.sentenceTranslationText.dir = isRtl ? 'rtl' : 'ltr';
    }

    updateContextCounter();
  }

  function speakSentenceText() {
    const item = state.filteredSentences[state.currentSentenceIndex];
    if (item && item.dutch && el.sentenceDutchText) {
      speakWithWordHighlight(item.dutch, el.sentenceDutchText);
    }
  }

  function goToNextSentence() {
    if (state.filteredSentences.length === 0) return;
    state.currentSentenceIndex = (state.currentSentenceIndex + 1) % state.filteredSentences.length;
    renderActiveSentence();
    speakSentenceText();
  }

  function goToPrevSentence() {
    if (state.filteredSentences.length === 0) return;
    state.currentSentenceIndex = (state.currentSentenceIndex - 1 + state.filteredSentences.length) % state.filteredSentences.length;
    renderActiveSentence();
    speakSentenceText();
  }

  // ====================================================
  // APP 4: LUISTER EN REAGEER (700 Interactieve Vragen)
  // ====================================================
  function updateRespondCounts() {
    CEFR_LEVELS.forEach(lvl => {
      const c = state.allRespond.filter(r => r.level === lvl).length;
      const idTag = 'countReageer' + lvl.replace(/[^a-zA-Z0-9]/g, '');
      const dom = document.getElementById(idTag);
      if (dom) dom.textContent = \`\${c}\`;
    });
  }

  function applyRespondFilter(resetIndex = false) {
    let list = state.allRespond.filter(r => r.level === state.currentRespondLevel);
    if (list.length === 0) list = state.allRespond;
    state.filteredRespond = list;

    if (resetIndex) {
      state.currentRespondIndex = 0;
    } else if (state.currentRespondIndex >= state.filteredRespond.length) {
      state.currentRespondIndex = Math.max(0, state.filteredRespond.length - 1);
    }

    if (el.reageerLevelTabs) {
      el.reageerLevelTabs.forEach(btn => {
        const lvl = btn.getAttribute('data-reageer-level');
        btn.classList.toggle('active', lvl === state.currentRespondLevel);
      });
    }

    state.isRespondQuestionRevealed = false;
    state.selectedRespondOption = null;
    renderActiveRespond();
    updateContextCounter();
  }

  function renderActiveRespond() {
    if (state.filteredRespond.length === 0) return;
    const item = state.filteredRespond[state.currentRespondIndex];
    if (!item) return;

    const langObj = LANGUAGES[state.nativeLanguage] || LANGUAGES.ar;
    const isRtl = langObj.rtl;

    if (el.reageerTopicBadge) el.reageerTopicBadge.textContent = item.topic || 'Praktijksituatie';
    if (el.reageerSituationText) el.reageerSituationText.textContent = item.situation || '';

    // Spoken Audio Question
    if (el.reageerDutchQuestion) el.reageerDutchQuestion.textContent = item.audio_text || '';
    const qTrans = (item.audio_translations && item.audio_translations[state.nativeLanguage]) || '';
    if (el.reageerTransQuestion) {
      el.reageerTransQuestion.textContent = qTrans;
      el.reageerTransQuestion.dir = isRtl ? 'rtl' : 'ltr';
    }

    if (el.reageerQuestionRevealed) {
      el.reageerQuestionRevealed.style.display = state.isRespondQuestionRevealed ? 'flex' : 'none';
    }
    if (el.reageerToggleQLabel) {
      el.reageerToggleQLabel.textContent = state.isRespondQuestionRevealed ? 'Verberg tekst' : 'Toon tekst & vertaling';
    }

    // Reset feedback box
    if (el.reageerFeedbackBox) {
      el.reageerFeedbackBox.style.display = 'none';
      el.reageerFeedbackBox.className = 'reageer-feedback-card';
    }

    // Render Options
    if (el.reageerOptionsGrid) {
      el.reageerOptionsGrid.innerHTML = '';
      (item.options || []).forEach((optText, optIdx) => {
        const btn = document.createElement('button');
        btn.className = 'reageer-option-btn';
        btn.setAttribute('data-option-index', optIdx);

        btn.innerHTML = \`
          <span class="reageer-option-key">\${optIdx + 1}</span>
          <span class="reageer-option-text">\${optText}</span>
        \`;

        btn.addEventListener('click', () => {
          handleSelectRespondOption(optIdx);
        });

        el.reageerOptionsGrid.appendChild(btn);
      });
    }

    updateContextCounter();
  }

  function handleSelectRespondOption(optIdx) {
    if (state.filteredRespond.length === 0) return;
    const item = state.filteredRespond[state.currentRespondIndex];
    if (!item) return;

    state.selectedRespondOption = optIdx;
    const isCorrect = optIdx === item.correct_index;
    const langObj = LANGUAGES[state.nativeLanguage] || LANGUAGES.ar;
    const isRtl = langObj.rtl;

    // Highlight Buttons
    const allBtns = el.reageerOptionsGrid.querySelectorAll('.reageer-option-btn');
    allBtns.forEach((btn, i) => {
      btn.classList.remove('selected', 'correct', 'incorrect');
      if (i === item.correct_index) {
        btn.classList.add('correct');
      }
      if (i === optIdx && !isCorrect) {
        btn.classList.add('incorrect');
      }
    });

    // Show Feedback Box
    if (el.reageerFeedbackBox) {
      el.reageerFeedbackBox.style.display = 'flex';
      el.reageerFeedbackBox.className = \`reageer-feedback-card \${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}\`;

      if (el.reageerFeedbackIcon) el.reageerFeedbackIcon.textContent = isCorrect ? '✅' : '❌';
      if (el.reageerFeedbackTitle) {
        el.reageerFeedbackTitle.textContent = isCorrect ? 'Uitstekend! Dat is de juiste reactie.' : 'Helaas, niet de juiste reactie.';
      }

      const expNl = (item.explanations && item.explanations.nl) || '';
      const expNative = (item.explanations && item.explanations[state.nativeLanguage]) || expNl;

      if (el.reageerExplanationDutch) el.reageerExplanationDutch.textContent = expNl;
      if (el.reageerExplanationNative) {
        el.reageerExplanationNative.textContent = expNative;
        el.reageerExplanationNative.dir = isRtl ? 'rtl' : 'ltr';
      }
    }
  }

  function playRespondAudio() {
    if (state.filteredRespond.length === 0) return;
    const item = state.filteredRespond[state.currentRespondIndex];
    if (!item) return;
    const textToSpeak = item.audio_text || item.situation || '';
    if (!textToSpeak) return;

    if (el.reageerSoundWaves) el.reageerSoundWaves.classList.add('playing');
    speakWithWordHighlight(textToSpeak, el.reageerDutchQuestion, () => {
      if (el.reageerSoundWaves) el.reageerSoundWaves.classList.remove('playing');
    });
  }

  function toggleRespondQuestion() {
    state.isRespondQuestionRevealed = !state.isRespondQuestionRevealed;
    if (el.reageerQuestionRevealed) {
      el.reageerQuestionRevealed.style.display = state.isRespondQuestionRevealed ? 'flex' : 'none';
    }
    if (el.reageerToggleQLabel) {
      el.reageerToggleQLabel.textContent = state.isRespondQuestionRevealed ? 'Verberg tekst' : 'Toon tekst & vertaling';
    }
  }

  function goToNextRespond() {
    if (state.filteredRespond.length === 0) return;
    state.currentRespondIndex = (state.currentRespondIndex + 1) % state.filteredRespond.length;
    state.isRespondQuestionRevealed = false;
    state.selectedRespondOption = null;
    renderActiveRespond();
    playRespondAudio();
  }

  function goToPrevRespond() {
    if (state.filteredRespond.length === 0) return;
    state.currentRespondIndex = (state.currentRespondIndex - 1 + state.filteredRespond.length) % state.filteredRespond.length;
    state.isRespondQuestionRevealed = false;
    state.selectedRespondOption = null;
    renderActiveRespond();
    playRespondAudio();
  }

  // ====================================================
  // APP 5: ALFABET & KLANKEN
  // ====================================================
  function applyAlphabetFilter(resetIndex = false) {
    let list = [...state.allAlphabet];
    if (state.selectedAlphabetType !== 'all') {
      list = list.filter(a => a.type === state.selectedAlphabetType);
    }
    state.filteredAlphabet = list;

    if (resetIndex) {
      state.currentAlphabetIndex = 0;
    } else if (state.currentAlphabetIndex >= state.filteredAlphabet.length) {
      state.currentAlphabetIndex = Math.max(0, state.filteredAlphabet.length - 1);
    }

    renderAlphabetChips();
    renderActiveAlphabetLetter();
    updateContextCounter();
  }

  function renderAlphabetChips() {
    if (!el.alphabetChipsRow) return;
    el.alphabetChipsRow.innerHTML = '';

    state.filteredAlphabet.forEach((item, index) => {
      const chip = document.createElement('button');
      chip.className = \`alphabet-chip \${index === state.currentAlphabetIndex ? 'active' : ''}\`;
      chip.textContent = item.letter;
      chip.addEventListener('click', () => {
        state.currentAlphabetIndex = index;
        renderActiveAlphabetLetter();
        speakCurrentAlphabetLetter();
      });
      el.alphabetChipsRow.appendChild(chip);
    });
  }

  function renderActiveAlphabetLetter() {
    if (state.filteredAlphabet.length === 0) return;
    const item = state.filteredAlphabet[state.currentAlphabetIndex];
    if (!item) return;

    if (el.alphabetBigLetter) el.alphabetBigLetter.textContent = \`\${item.letter} / \${item.letter.toLowerCase()}\`;
    if (el.alphabetPhonetic) el.alphabetPhonetic.textContent = item.phonetic || '';
    if (el.alphabetTypeBadge) el.alphabetTypeBadge.textContent = item.type === 'klinker' ? 'Klank' : 'Letter';
    const langObj = LANGUAGES[state.nativeLanguage] || LANGUAGES.ar;
    const isRtl = langObj.rtl;
    const nativeTip = (item.tip_translations && item.tip_translations[state.nativeLanguage]) || '';

    if (el.alphabetTipText) {
      el.alphabetTipText.innerHTML = \`
        <span class="alphabet-tip-dutch">\${item.tip || ''}</span>
        \${nativeTip ? \`<div class="alphabet-tip-trans-text \${isRtl ? 'rtl' : ''}"><span class="tip-flag">\${langObj.flag}</span> <span>\${nativeTip}</span></div>\` : ''}
      \`;
    }

    // Render Example Words with clear Native Translation Indicator
    if (el.alphabetExamplesGrid) {
      el.alphabetExamplesGrid.innerHTML = '';

      (item.examples || []).forEach(ex => {
        const card = document.createElement('div');
        card.className = 'alphabet-word-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');

        const transText = (ex.translations && ex.translations[state.nativeLanguage]) || '';

        card.innerHTML = \`
          <div class="alph-card-img">\${ex.svg || '📷'}</div>
          <div class="alph-card-info">
            <span class="alph-card-word">\${ex.word}</span>
            <div class="alph-card-trans-pill">
              <span class="alph-trans-flag">\${langObj.flag}</span>
              <span class="alph-trans-label">\${langObj.name}:</span>
              <span class="alph-trans-val \${isRtl ? 'rtl' : ''}">\${transText}</span>
            </div>
          </div>
          <span class="alph-card-audio" title="Klik om uit te spreken">🔊</span>
        \`;

        card.addEventListener('click', () => {
          speakText(ex.word);
        });

        el.alphabetExamplesGrid.appendChild(card);
      });
    }

    // Highlight chip
    const chips = el.alphabetChipsRow ? el.alphabetChipsRow.querySelectorAll('.alphabet-chip') : [];
    chips.forEach((ch, idx) => {
      ch.classList.toggle('active', idx === state.currentAlphabetIndex);
    });

    updateContextCounter();
  }

  function speakCurrentAlphabetLetter() {
    const item = state.filteredAlphabet[state.currentAlphabetIndex];
    if (item && item.sound) {
      speakText(item.sound);
    }
  }

  function goToNextAlphabet() {
    if (state.filteredAlphabet.length === 0) return;
    state.currentAlphabetIndex = (state.currentAlphabetIndex + 1) % state.filteredAlphabet.length;
    renderActiveAlphabetLetter();
    speakCurrentAlphabetLetter();
  }

  function goToPrevAlphabet() {
    if (state.filteredAlphabet.length === 0) return;
    state.currentAlphabetIndex = (state.currentAlphabetIndex - 1 + state.filteredAlphabet.length) % state.filteredAlphabet.length;
    renderActiveAlphabetLetter();
    speakCurrentAlphabetLetter();
  }

  // ====================================================
  // APP 6: LUISTERVAARDIGHEID (Dictee & Onthullen)
  // ====================================================
  function updateListeningCounts() {
    CEFR_LEVELS.forEach(lvl => {
      const c = state.allListening.filter(l => l.level === lvl).length;
      const idTag = 'countLuister' + lvl.replace(/[^a-zA-Z0-9]/g, '');
      const dom = document.getElementById(idTag);
      if (dom) dom.textContent = \`\${c}\`;
    });
  }

  function applyListeningFilter(resetIndex = false) {
    let list = state.allListening.filter(l => l.level === state.currentListeningLevel);
    if (list.length === 0) list = state.allListening;
    state.filteredListening = list;

    if (resetIndex) {
      state.currentListeningIndex = 0;
    } else if (state.currentListeningIndex >= state.filteredListening.length) {
      state.currentListeningIndex = Math.max(0, state.filteredListening.length - 1);
    }

    if (el.luisterLevelTabs) {
      el.luisterLevelTabs.forEach(btn => {
        const lvl = btn.getAttribute('data-luister-level');
        btn.classList.toggle('active', lvl === state.currentListeningLevel);
      });
    }

    state.isListeningRevealed = false;
    renderActiveListening();
    updateContextCounter();
  }

  function renderActiveListening() {
    if (state.filteredListening.length === 0) return;
    const item = state.filteredListening[state.currentListeningIndex];
    if (!item) return;

    if (el.luisterCategoryBadge) el.luisterCategoryBadge.textContent = item.category || 'Luisterfragment';
    if (el.luisterTitleText) el.luisterTitleText.textContent = item.title || '';
    if (el.luisterCounterBadge) {
      el.luisterCounterBadge.textContent = \`Fragment \${state.currentListeningIndex + 1} van \${state.filteredListening.length}\`;
    }

    if (el.luisterMaskedBox) el.luisterMaskedBox.style.display = state.isListeningRevealed ? 'none' : 'flex';
    if (el.luisterRevealedBox) el.luisterRevealedBox.style.display = state.isListeningRevealed ? 'flex' : 'none';

    // Render Dutch Lines
    if (el.luisterDutchLines) {
      el.luisterDutchLines.innerHTML = '';
      const lines = (item.text || '').split('\\n').filter(Boolean);
      lines.forEach(line => {
        const p = document.createElement('p');
        p.className = 'luister-line';
        p.textContent = line;
        el.luisterDutchLines.appendChild(p);
      });
    }

    // Render Native Translation Lines
    if (el.luisterTranslationLines) {
      el.luisterTranslationLines.innerHTML = '';
      const transText = (item.translations && item.translations[state.nativeLanguage]) || '';
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
      const transLines = transText.split('\\n').filter(Boolean);

      transLines.forEach(line => {
        const p = document.createElement('p');
        p.className = \`luister-trans-line \${isRtl ? 'rtl' : ''}\`;
        p.textContent = line;
        el.luisterTranslationLines.appendChild(p);
      });
    }

    updateContextCounter();
  }

  function playListeningAudio() {
    if (state.filteredListening.length === 0) return;
    const item = state.filteredListening[state.currentListeningIndex];
    if (!item || !item.text) return;

    if (el.luisterSoundWaves) el.luisterSoundWaves.classList.add('playing');
    speakText(item.text, () => {
      if (el.luisterSoundWaves) el.luisterSoundWaves.classList.remove('playing');
    });
  }

  function revealListeningText() {
    state.isListeningRevealed = true;
    renderActiveListening();
  }

  function goToNextListening() {
    if (state.filteredListening.length === 0) return;
    state.currentListeningIndex = (state.currentListeningIndex + 1) % state.filteredListening.length;
    state.isListeningRevealed = false;
    renderActiveListening();
    playListeningAudio();
  }

  function goToPrevListening() {
    if (state.filteredListening.length === 0) return;
    state.currentListeningIndex = (state.currentListeningIndex - 1 + state.filteredListening.length) % state.filteredListening.length;
    state.isListeningRevealed = false;
    renderActiveListening();
    playListeningAudio();
  }

  // ====================================================
  // GLOBAL ACTIONS & KEYBOARD ROUTING
  // ====================================================
  function speakCurrentContext() {
    if (state.activeApp === 'woorden') goToNextWord(true);
    else if (state.activeApp === 'klok') {
      if (!state.isClockRevealed) revealClockTime();
      else {
        const item = state.filteredClocks[state.currentClockIndex];
        if (item && item.sentence && el.clockSentenceText) {
          speakWithWordHighlight(item.sentence, el.clockSentenceText);
        }
      }
    }
    else if (state.activeApp === 'zinnen') speakSentenceText();
    else if (state.activeApp === 'alphabet') speakCurrentAlphabetLetter();
    else if (state.activeApp === 'luisteren') {
      if (!state.isListeningRevealed) revealListeningText();
      playListeningAudio();
    }
    else if (state.activeApp === 'reageer') playRespondAudio();
  }

  function goToNextContext() {
    if (state.activeApp === 'woorden') goToNextWord(false);
    else if (state.activeApp === 'klok') goToNextClock();
    else if (state.activeApp === 'zinnen') goToNextSentence();
    else if (state.activeApp === 'alphabet') goToNextAlphabet();
    else if (state.activeApp === 'luisteren') goToNextListening();
    else if (state.activeApp === 'reageer') goToNextRespond();
  }

  function goToPrevContext() {
    if (state.activeApp === 'woorden') goToPrevWord(false);
    else if (state.activeApp === 'klok') goToPrevClock();
    else if (state.activeApp === 'zinnen') goToPrevSentence();
    else if (state.activeApp === 'alphabet') goToPrevAlphabet();
    else if (state.activeApp === 'luisteren') goToPrevListening();
    else if (state.activeApp === 'reageer') goToPrevRespond();
  }

  // ====================================================
  // MODALS MANAGEMENT
  // ====================================================
  function closeAllModals() {
    if (el.appSwitcherModal) el.appSwitcherModal.classList.remove('open', 'active');
    if (el.configModal) el.configModal.classList.remove('open', 'active');
    if (el.categoryModal) el.categoryModal.classList.remove('open', 'active');
  }

  function openModal(modalEl) {
    closeAllModals();
    if (modalEl) {
      modalEl.classList.add('open');
      modalEl.classList.add('active');
    }
  }

  // ====================================================
  // SETTINGS & THEMING
  // ====================================================
  function applyNativeLanguage(langCode) {
    if (!LANGUAGES[langCode]) return;
    state.nativeLanguage = langCode;
    localStorage.setItem('taalvriend_lang', langCode);

    const lang = LANGUAGES[langCode];
    if (el.activeLanguageFlag) el.activeLanguageFlag.textContent = lang.flag;
    if (el.activeLanguageName) el.activeLanguageName.textContent = lang.name;
    if (el.langQuickFlag) el.langQuickFlag.textContent = lang.flag;
    if (el.langQuickName) el.langQuickName.textContent = lang.name;
    if (el.thTransLangTag) el.thTransLangTag.textContent = langCode.toUpperCase();

    // Update modal labels
    if (el.clockLangFlag) el.clockLangFlag.textContent = lang.flag;
    if (el.clockLangName) el.clockLangName.textContent = lang.name;
    if (el.sentenceLangFlag) el.sentenceLangFlag.textContent = lang.flag;
    if (el.sentenceLangName) el.sentenceLangName.textContent = \`\${lang.name} (Vertaling)\`;
    if (el.luisterLangFlag) el.luisterLangFlag.textContent = lang.flag;
    if (el.luisterLangName) el.luisterLangName.textContent = \`\${lang.name} (Vertaling)\`;
    if (el.reageerTransFlag) el.reageerTransFlag.textContent = lang.flag;
    if (el.reageerExplLangFlag) el.reageerExplLangFlag.textContent = lang.flag;

    renderAppSwitcherModal();

    // Re-render current app
    if (state.activeApp === 'woorden') renderWordsStream();
    else if (state.activeApp === 'klok') renderActiveClock();
    else if (state.activeApp === 'zinnen') renderActiveSentence();
    else if (state.activeApp === 'alphabet') renderActiveAlphabetLetter();
    else if (state.activeApp === 'luisteren') renderActiveListening();
    else if (state.activeApp === 'reageer') renderActiveRespond();
  }

  function cycleNativeLanguage() {
    const langKeys = Object.keys(LANGUAGES);
    const currIdx = langKeys.indexOf(state.nativeLanguage);
    const nextLang = langKeys[(currIdx + 1) % langKeys.length];
    applyNativeLanguage(nextLang);
  }

  function applyTheme(themeName) {
    let effective = themeName;
    if (themeName === 'system') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      effective = prefersDark ? 'dark' : 'light';
    }
    state.theme = themeName;
    localStorage.setItem('taalvriend_theme', themeName);
    document.documentElement.setAttribute('data-theme', effective);

    const themeBtns = document.querySelectorAll('.segment-btn[data-theme-val]');
    themeBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-val') === themeName);
    });
    if (el.themeSelect) el.themeSelect.value = themeName;
  }

  function applyFontFamily(font) {
    state.fontFamily = font;
    localStorage.setItem('taalvriend_font_family', font);
    document.documentElement.style.setProperty('--font-family', font);
  }

  function applyBaseFontSize(px) {
    state.baseFontSize = px;
    localStorage.setItem('taalvriend_font_size', px);
    document.documentElement.style.fontSize = \`\${px}px\`;
    document.documentElement.style.setProperty('--base-font-size', \`\${px}px\`);
    if (el.fontSizeVal) el.fontSizeVal.textContent = \`\${px}px\`;
    const badge = document.getElementById('fontSizeValBadge');
    if (badge) badge.textContent = \`\${px}px\`;
    if (el.fontSizeSlider) el.fontSizeSlider.value = px;
  }

  function applyCefrLevel(lvl) {
    if (!CEFR_LEVELS.includes(lvl)) return;
    state.cefrLevel = lvl;
    localStorage.setItem('taalvriend_cefr_level', lvl);

    if (el.cefrHeaderTag) el.cefrHeaderTag.textContent = lvl;
    if (el.cefrSelect) el.cefrSelect.value = lvl;

    state.currentSentenceLevel = lvl;
    state.currentListeningLevel = lvl;
    state.currentRespondLevel = lvl;
    state.selectedWordLevel = lvl;

    // If active category has no words at this level, reset category to 'all'
    if (state.selectedCategory !== 'all') {
      const hasWords = state.allWords.some(w => w.level === lvl && w.category === state.selectedCategory);
      if (!hasWords) {
        state.selectedCategory = 'all';
        if (el.categoryHeaderName) el.categoryHeaderName.textContent = 'Alle categorieën';
      }
    }

    if (state.activeApp === 'woorden') applyWordsFilters(true);
    else if (state.activeApp === 'zinnen') applySentenceFilter(true);
    else if (state.activeApp === 'luisteren') applyListeningFilter(true);
    else if (state.activeApp === 'reageer') applyRespondFilter(true);
  }

  function cycleCefrLevel() {
    const currIdx = CEFR_LEVELS.indexOf(state.cefrLevel);
    const nextIdx = (currIdx + 1) % CEFR_LEVELS.length;
    applyCefrLevel(CEFR_LEVELS[nextIdx]);
  }

  function renderAppSwitcherModal() {
    if (!el.appChoiceCards) return;
    el.appChoiceCards.forEach(card => {
      const appKey = card.getAttribute('data-app-id') || card.getAttribute('data-app-choice');
      const appDef = APPS[appKey];
      if (appDef) {
        const transSpan = card.querySelector('.app-choice-native, .app-trans-name');
        if (transSpan) {
          const nativeName = (appDef.translations && appDef.translations[state.nativeLanguage]) || appDef.name;
          transSpan.textContent = \`• \${nativeName}\`;
        }
      }
      card.classList.toggle('active', appKey === state.activeApp);
    });
  }

  // ====================================================
  // INIT & EVENT LISTENERS
  // ====================================================
  function initVoices() {
    if (!('speechSynthesis' in window)) return;
    const populate = () => {
      const voices = window.speechSynthesis.getVoices();
      state.availableVoices = voices;
      if (el.voiceSelect) {
        el.voiceSelect.innerHTML = '<option value="">Standaard Nederlandse stem</option>';
        const nlVoices = voices.filter(v => v.lang.startsWith('nl'));
        nlVoices.forEach(v => {
          const opt = document.createElement('option');
          opt.value = v.voiceURI;
          opt.textContent = \`\${v.name} (\${v.lang})\`;
          if (v.voiceURI === state.ttsVoiceURI) opt.selected = true;
          el.voiceSelect.appendChild(opt);
        });
      }
    };
    populate();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populate;
    }
  }

  function setupEventListeners() {
    // 1. App Switcher Button
    if (el.appSwitcherBtn) {
      el.appSwitcherBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        renderAppSwitcherModal();
        openModal(el.appSwitcherModal);
      });
    }
    if (el.appSwitcherCloseBtn) {
      el.appSwitcherCloseBtn.addEventListener('click', closeAllModals);
    }
    if (el.appChoiceCards) {
      el.appChoiceCards.forEach(card => {
        card.addEventListener('click', (e) => {
          const cardEl = e.currentTarget || card;
          const appName = cardEl.getAttribute('data-app-id') || cardEl.getAttribute('data-app-choice');
          closeAllModals();
          if (appName) {
            switchApp(appName);
          }
        });
      });
    }

    // 2. Category Header Button & Modal
    if (el.categoryHeaderBtn) {
      el.categoryHeaderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        populateCategoryModal();
        openModal(el.categoryModal);
      });
    }
    if (el.categoryCloseBtn) {
      el.categoryCloseBtn.addEventListener('click', closeAllModals);
    }

    // 3. Search Input & Clear Button
    if (el.searchInput) {
      el.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (el.searchClearBtn) {
          el.searchClearBtn.style.display = state.searchQuery ? 'flex' : 'none';
        }
        applyWordsFilters(true);
      });
    }
    if (el.searchClearBtn) {
      el.searchClearBtn.addEventListener('click', () => {
        if (el.searchInput) el.searchInput.value = '';
        state.searchQuery = '';
        el.searchClearBtn.style.display = 'none';
        applyWordsFilters(true);
        if (el.searchInput) el.searchInput.focus();
      });
    }

    // 4. CEFR Header Button
    if (el.cefrHeaderBtn) {
      el.cefrHeaderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleCefrLevel();
      });
    }
    if (el.cefrSelect) {
      el.cefrSelect.value = state.cefrLevel;
      el.cefrSelect.addEventListener('change', (e) => applyCefrLevel(e.target.value));
    }

    // 5. Language Quick Selector Button
    if (el.langQuickSelectBtn) {
      el.langQuickSelectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        cycleNativeLanguage();
      });
    }

    // 6. Shuffle Button in Header
    if (el.shuffleHeaderBtn) {
      el.shuffleHeaderBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.isShuffle = !state.isShuffle;
        localStorage.setItem('taalvriend_shuffle', state.isShuffle);
        el.shuffleHeaderBtn.classList.toggle('active', state.isShuffle);
        applyWordsFilters(true);
      });
    }

    // 7. Fullscreen Toggle
    if (el.fullscreenBtn) {
      el.fullscreenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // 8. Config / Settings Button & Modal
    if (el.configBtn) {
      el.configBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openModal(el.configModal);
      });
    }
    if (el.configCloseBtn) {
      el.configCloseBtn.addEventListener('click', closeAllModals);
    }

    // Close modals on background click
    window.addEventListener('click', (e) => {
      if (e.target === el.appSwitcherModal || e.target === el.configModal || e.target === el.categoryModal) {
        closeAllModals();
      }
    });

    // Language radio buttons in config
    if (el.langRadioGroup) {
      const radios = el.langRadioGroup.querySelectorAll('input[type="radio"]');
      radios.forEach(radio => {
        radio.checked = radio.value === state.nativeLanguage;
        radio.addEventListener('change', (e) => applyNativeLanguage(e.target.value));
      });
    }

    // Theme, Font & Size
    const themeBtns = document.querySelectorAll('.segment-btn[data-theme-val]');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        applyTheme(btn.getAttribute('data-theme-val'));
      });
    });
    if (el.themeSelect) {
      el.themeSelect.value = state.theme;
      el.themeSelect.addEventListener('change', (e) => applyTheme(e.target.value));
    }
    if (el.fontSelect) {
      el.fontSelect.value = state.fontFamily;
      el.fontSelect.addEventListener('change', (e) => applyFontFamily(e.target.value));
    }
    if (el.fontSizeSlider) {
      el.fontSizeSlider.value = state.baseFontSize;
      el.fontSizeSlider.addEventListener('input', (e) => applyBaseFontSize(parseInt(e.target.value, 10)));
    }
    if (el.speechRateSlider) {
      el.speechRateSlider.value = state.ttsRate;
      const updateSpeechVal = (val) => {
        const str = \`\${val.toFixed(1)}x\`;
        if (el.speechRateVal) el.speechRateVal.textContent = str;
        const badge = document.getElementById('speechRateValBadge');
        if (badge) badge.textContent = str;
      };
      updateSpeechVal(state.ttsRate);
      el.speechRateSlider.addEventListener('input', (e) => {
        state.ttsRate = parseFloat(e.target.value);
        localStorage.setItem('taalvriend_rate', state.ttsRate);
        updateSpeechVal(state.ttsRate);
      });
    }
    if (el.voiceSelect) {
      el.voiceSelect.addEventListener('change', (e) => {
        state.ttsVoiceURI = e.target.value;
        localStorage.setItem('taalvriend_voice_uri', state.ttsVoiceURI);
      });
    }

    // Words App: Level Tabs
    if (el.wordsLevelTabs) {
      el.wordsLevelTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          const newLevel = btn.getAttribute('data-word-level');
          state.selectedWordLevel = newLevel;

          // If a specific CEFR level was clicked, keep global CEFR level in sync
          if (CEFR_LEVELS.includes(newLevel)) {
            state.cefrLevel = newLevel;
            localStorage.setItem('taalvriend_cefr_level', newLevel);
            if (el.cefrHeaderTag) el.cefrHeaderTag.textContent = newLevel;
            if (el.cefrSelect) el.cefrSelect.value = newLevel;
            state.currentSentenceLevel = newLevel;
            state.currentListeningLevel = newLevel;
            state.currentRespondLevel = newLevel;
          }

          // If current category has no words at this level, auto-reset category to 'all'
          if (state.selectedCategory !== 'all') {
            const hasWords = state.allWords.some(w =>
              (newLevel === 'all' || w.level === newLevel) && w.category === state.selectedCategory
            );
            if (!hasWords) {
              state.selectedCategory = 'all';
              if (el.categoryHeaderName) el.categoryHeaderName.textContent = 'Alle categorieën';
            }
          }

          applyWordsFilters(true);
        });
      });
    }

    // Klok App Listeners
    if (el.clockRevealBtn) el.clockRevealBtn.addEventListener('click', revealClockTime);
    if (el.clockSvgContainer) el.clockSvgContainer.addEventListener('click', () => {
      if (!state.isClockRevealed) revealClockTime();
      else speakCurrentContext();
    });
    if (el.clockSpeakBtn) el.clockSpeakBtn.addEventListener('click', speakCurrentContext);
    if (el.clockRandomBtn) {
      el.clockRandomBtn.addEventListener('click', () => {
        if (state.filteredClocks.length === 0) return;
        state.currentClockIndex = Math.floor(Math.random() * state.filteredClocks.length);
        state.isClockRevealed = false;
        renderActiveClock();
      });
    }

    // Sentences App Listeners
    if (el.sentenceLevelBtns) {
      el.sentenceLevelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentSentenceLevel = btn.getAttribute('data-sentence-level');
          applySentenceFilter(true);
        });
      });
    }
    if (el.sentenceSpeakBtn) el.sentenceSpeakBtn.addEventListener('click', speakSentenceText);
    if (el.sentenceRandomBtn) {
      el.sentenceRandomBtn.addEventListener('click', () => {
        if (state.filteredSentences.length === 0) return;
        state.currentSentenceIndex = Math.floor(Math.random() * state.filteredSentences.length);
        renderActiveSentence();
        speakSentenceText();
      });
    }

    // Alphabet App Listeners
    if (el.alphabetTypeFilters) {
      el.alphabetTypeFilters.forEach(btn => {
        btn.addEventListener('click', () => {
          el.alphabetTypeFilters.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          state.selectedAlphabetType = btn.getAttribute('data-type');
          applyAlphabetFilter(true);
        });
      });
    }
    if (el.alphabetRandomBtn) {
      el.alphabetRandomBtn.addEventListener('click', () => {
        if (state.filteredAlphabet.length === 0) return;
        state.currentAlphabetIndex = Math.floor(Math.random() * state.filteredAlphabet.length);
        renderActiveAlphabetLetter();
        speakCurrentAlphabetLetter();
      });
    }
    if (el.alphabetSpeakLetterBtn) {
      el.alphabetSpeakLetterBtn.addEventListener('click', speakCurrentAlphabetLetter);
    }

    // Listening App Listeners
    if (el.luisterLevelTabs) {
      el.luisterLevelTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentListeningLevel = btn.getAttribute('data-luister-level');
          applyListeningFilter(true);
        });
      });
    }
    if (el.luisterRandomBtn) {
      el.luisterRandomBtn.addEventListener('click', () => {
        if (state.filteredListening.length === 0) return;
        state.currentListeningIndex = Math.floor(Math.random() * state.filteredListening.length);
        state.isListeningRevealed = false;
        renderActiveListening();
        playListeningAudio();
      });
    }
    if (el.luisterPlayAudioBtn) el.luisterPlayAudioBtn.addEventListener('click', playListeningAudio);
    if (el.luisterRevealBtn) el.luisterRevealBtn.addEventListener('click', revealListeningText);

    // Respond App Listeners
    if (el.reageerLevelTabs) {
      el.reageerLevelTabs.forEach(btn => {
        btn.addEventListener('click', () => {
          state.currentRespondLevel = btn.getAttribute('data-reageer-level');
          applyRespondFilter(true);
        });
      });
    }
    if (el.reageerRandomBtn) {
      el.reageerRandomBtn.addEventListener('click', () => {
        if (state.filteredRespond.length === 0) return;
        state.currentRespondIndex = Math.floor(Math.random() * state.filteredRespond.length);
        state.isRespondQuestionRevealed = false;
        state.selectedRespondOption = null;
        renderActiveRespond();
        playRespondAudio();
      });
    }
    if (el.reageerPlayAudioBtn) {
      el.reageerPlayAudioBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playRespondAudio();
      });
    }
    const reageerBox = document.querySelector('.reageer-audio-box');
    if (reageerBox) {
      reageerBox.addEventListener('click', (e) => {
        if (!e.target.closest('#reageerToggleQBtn')) {
          playRespondAudio();
        }
      });
    }
    if (el.reageerToggleQBtn) el.reageerToggleQBtn.addEventListener('click', toggleRespondQuestion);
    if (el.reageerNextBtn) el.reageerNextBtn.addEventListener('click', goToNextRespond);

    // Global Footer Buttons
    if (el.footerSpeakBtn) el.footerSpeakBtn.addEventListener('click', speakCurrentContext);
    if (el.btnPrevRow) el.btnPrevRow.addEventListener('click', goToPrevContext);
    if (el.btnNextRow) el.btnNextRow.addEventListener('click', goToNextContext);

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        speakCurrentContext();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextContext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevContext();
      } else if (['1', '2', '3', '4'].includes(e.key) && state.activeApp === 'reageer') {
        handleSelectRespondOption(parseInt(e.key, 10) - 1);
      } else if (e.key.toLowerCase() === 'f') {
        if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
        else document.exitFullscreen().catch(() => {});
      } else if (e.key.toLowerCase() === 'm') {
        if (el.configModal.classList.contains('open') || el.configModal.classList.contains('active')) {
          closeAllModals();
        } else {
          openModal(el.configModal);
        }
      } else if (e.key === 'Escape') {
        closeAllModals();
      }
    });
  }

  // ====================================================
  // STARTUP INITIALIZATION
  // ====================================================
  function init() {
    // 1. Load Data from global scope (100% offline & local file:// support)
    state.allWords = window.TAALVRIEND_WORDS || [];
    state.allClocks = window.TAALVRIEND_CLOCKS || [];
    state.allSentences = window.TAALVRIEND_SENTENCES || [];
    state.allAlphabet = window.TAALVRIEND_ALPHABET || [];
    state.allListening = window.TAALVRIEND_LISTENING || [];
    state.allRespond = window.TAALVRIEND_RESPOND || window.RESPOND_DATA || [];

    console.log(\`[TaalVriend] Loaded \${state.allWords.length} words, \${state.allClocks.length} clocks, \${state.allSentences.length} sentences, \${state.allAlphabet.length} alphabet, \${state.allListening.length} listening, \${state.allRespond.length} respond.\`);

    // 2. Apply saved preferences
    applyTheme(state.theme);
    applyFontFamily(state.fontFamily);
    applyBaseFontSize(state.baseFontSize);
    applyCefrLevel(state.cefrLevel);
    applyNativeLanguage(state.nativeLanguage);

    if (el.speechRateSlider) el.speechRateSlider.value = state.ttsRate;
    if (el.speechRateVal) el.speechRateVal.textContent = \`\${state.ttsRate.toFixed(1)}x\`;
    const rateBadge = document.getElementById('speechRateValBadge');
    if (rateBadge) rateBadge.textContent = \`\${state.ttsRate.toFixed(1)}x\`;
    if (el.shuffleHeaderBtn) el.shuffleHeaderBtn.classList.toggle('active', state.isShuffle);

    // 3. Initialize components
    updateWordCounts();
    updateSentenceCounts();
    updateListeningCounts();
    updateRespondCounts();
    renderMinuteChips();

    // 4. URL Parameter handling (?app=...)
    const urlParams = new URLSearchParams(window.location.search);
    const initialApp = urlParams.get('app');

    if (initialApp && APPS[initialApp]) {
      switchApp(initialApp);
    } else {
      switchApp('woorden');
      // If opened with no query parameter, show app selection modal directly
      if (!initialApp && el.appSwitcherModal) {
        renderAppSwitcherModal();
        openModal(el.appSwitcherModal);
      }
    }

    initVoices();
    setupEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
`;

fs.writeFileSync(path.join(__dirname, '../js/app.js'), appJsContent, 'utf8');
console.log('Successfully generated complete js/app.js with all topbar fixes!');
