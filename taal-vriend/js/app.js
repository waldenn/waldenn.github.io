// js/app.js - TaalVriend: Woorden, Klok Kijken, Zinnen, Alfabet & Luistervaardigheid

(function() {
  'use strict';

  // Supported Native Languages
  const LANGUAGES = {
    ar: { name: 'العربية', englishName: 'Standaard Arabisch', flag: '🇸🇦', rtl: true },
    ti: { name: 'ትግርኛ', englishName: 'Tigrinya', flag: '🇪🇷', rtl: false },
    om: { name: 'Afaan Oromoo', englishName: 'Oromo', flag: '🇪🇹', rtl: false },
    en: { name: 'English', englishName: 'Engels', flag: '🇬🇧', rtl: false }
  };

  const APPS = {
    woorden: { name: 'Woorden Leren', icon: '📖', badge: '1.450+ Woorden' },
    klok: { name: 'Klok Kijken', icon: '⏰', badge: '144 Tijden' },
    zinnen: { name: 'Zinnen Oefenen', icon: '💬', badge: '470+ Zinnen' },
    alphabet: { name: 'Alfabet & Klanken', icon: '🔤', badge: '38 Klanken' },
    luisteren: { name: 'Luistervaardigheid', icon: '🎧', badge: '119 Oefeningen' }
  };

  // State Management
  const state = {
    activeApp: localStorage.getItem('taalvriend_active_app') || 'woorden',

    // Words App State
    allWords: [],
    filteredWords: [],
    displayWords: [],
    currentWordIndex: 0,
    selectedCategory: localStorage.getItem('taalvriend_cat') || 'all',
    searchQuery: '',

    // Clock App State
    allClocks: [],
    filteredClocks: [],
    currentClockIndex: 0,
    selectedClockHour: 'all',

    // Sentences App State
    allSentences: [],
    currentSentenceLevel: 'basis',
    filteredSentences: [],
    currentSentenceIndex: 0,

    // Alphabet App State
    allAlphabet: [],
    filteredAlphabet: [],
    currentAlphabetIndex: 0,
    selectedAlphabetType: 'all',

    // Listening App State
    allListening: [],
    filteredListening: [],
    currentListeningIndex: 0,
    currentListeningLevel: 'A1',
    isListeningRevealed: false,
    isListeningPlaying: false,

    // Shared State
    nativeLanguage: localStorage.getItem('taalvriend_lang') || 'ar',
    theme: localStorage.getItem('taalvriend_theme') || 'system',
    ttsVoiceURI: localStorage.getItem('taalvriend_voice_uri') || '',
    ttsRate: parseFloat(localStorage.getItem('taalvriend_rate')) || 0.85,
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
    headerSearchContainer: document.getElementById('headerSearchContainer'),
    searchInput: document.getElementById('searchInput'),
    searchClearBtn: document.getElementById('searchClearBtn'),

    // Header buttons
    categoryHeaderBtn: document.getElementById('categoryHeaderBtn'),
    categoryHeaderName: document.getElementById('categoryHeaderName'),
    categoryCountBadge: document.getElementById('categoryCountBadge'),
    langQuickSelectBtn: document.getElementById('langQuickSelectBtn'),
    langQuickFlag: document.getElementById('langQuickFlag'),
    langQuickName: document.getElementById('langQuickName'),
    shuffleHeaderBtn: document.getElementById('shuffleHeaderBtn'),
    fullscreenBtn: document.getElementById('fullscreenBtn'),
    fullscreenIcon: document.getElementById('fullscreenIcon'),
    configBtn: document.getElementById('configBtn'),

    // App Views
    appWoordenView: document.getElementById('appWoordenView'),
    appKlokView: document.getElementById('appKlokView'),
    appZinnenView: document.getElementById('appZinnenView'),
    appAlphabetView: document.getElementById('appAlphabetView'),
    appLuisterView: document.getElementById('appLuisterView'),

    // Words App Elements
    wordsStreamContainer: document.getElementById('wordsStreamContainer'),
    thTransLangTag: document.getElementById('thTransLangTag'),

    // Clock App Elements
    clockHourFilter: document.getElementById('clockHourFilter'),
    clockRandomBtn: document.getElementById('clockRandomBtn'),
    clockCounterText: document.getElementById('clockCounterText'),
    clockSvgContainer: document.getElementById('clockSvgContainer'),
    clockDigitalBadge: document.getElementById('clockDigitalBadge'),
    clockDutchPhrase: document.getElementById('clockDutchPhrase'),
    clockSentenceBox: document.getElementById('clockSentenceBox'),
    clockSentenceText: document.getElementById('clockSentenceText'),
    clockTranslationText: document.getElementById('clockTranslationText'),
    clockLangFlag: document.getElementById('clockLangFlag'),
    clockLangName: document.getElementById('clockLangName'),
    clockSpeakBtn: document.getElementById('clockSpeakBtn'),
    clockPrevBtn: document.getElementById('clockPrevBtn'),
    clockNextBtn: document.getElementById('clockNextBtn'),
    clockMinuteChips: document.getElementById('clockMinuteChips'),

    // Sentences App Elements
    levelTabBtns: document.querySelectorAll('.sentences-level-bar .level-tab-btn'),
    countBasis: document.getElementById('countBasis'),
    countGevorderd: document.getElementById('countGevorderd'),
    countMoeilijk: document.getElementById('countMoeilijk'),
    sentenceRandomBtn: document.getElementById('sentenceRandomBtn'),
    sentenceTopicBadge: document.getElementById('sentenceTopicBadge'),
    sentenceCounterBadge: document.getElementById('sentenceCounterBadge'),
    sentenceDutchText: document.getElementById('sentenceDutchText'),
    sentenceSpeakBtn: document.getElementById('sentenceSpeakBtn'),
    sentenceTranslationText: document.getElementById('sentenceTranslationText'),
    sentenceLangFlag: document.getElementById('sentenceLangFlag'),
    sentenceLangName: document.getElementById('sentenceLangName'),
    sentencePrevBtn: document.getElementById('sentencePrevBtn'),
    sentenceNextBtn: document.getElementById('sentenceNextBtn'),
    sentenceMainSpeakBtn: document.getElementById('sentenceMainSpeakBtn'),

    // Alphabet App Elements
    alphabetTypeFilters: document.querySelectorAll('#alphabetTypeFilters .level-tab-btn'),
    countAlphabetAll: document.getElementById('countAlphabetAll'),
    countAlphabetVowels: document.getElementById('countAlphabetVowels'),
    countAlphabetLetters: document.getElementById('countAlphabetLetters'),
    alphabetRandomBtn: document.getElementById('alphabetRandomBtn'),
    alphabetChipsRow: document.getElementById('alphabetChipsRow'),
    alphabetBigLetter: document.getElementById('alphabetBigLetter'),
    alphabetPhonetic: document.getElementById('alphabetPhonetic'),
    alphabetTypeBadge: document.getElementById('alphabetTypeBadge'),
    alphabetSpeakLetterBtn: document.getElementById('alphabetSpeakLetterBtn'),
    alphabetTipText: document.getElementById('alphabetTipText'),
    alphabetExamplesGrid: document.getElementById('alphabetExamplesGrid'),
    alphabetPrevBtn: document.getElementById('alphabetPrevBtn'),
    alphabetNextBtn: document.getElementById('alphabetNextBtn'),

    // Listening App Elements
    luisterLevelBtns: document.querySelectorAll('#luisterLevelTabs .level-tab-btn'),
    countLuisterA1: document.getElementById('countLuisterA1'),
    countLuisterA2: document.getElementById('countLuisterA2'),
    countLuisterB1: document.getElementById('countLuisterB1'),
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
    luisterRepeatBtn: document.getElementById('luisterRepeatBtn'),
    luisterDutchLines: document.getElementById('luisterDutchLines'),
    luisterLangFlag: document.getElementById('luisterLangFlag'),
    luisterLangName: document.getElementById('luisterLangName'),
    luisterTranslationLines: document.getElementById('luisterTranslationLines'),
    luisterPrevBtn: document.getElementById('luisterPrevBtn'),
    luisterNextBtn: document.getElementById('luisterNextBtn'),
    luisterToggleOrSpeakBtn: document.getElementById('luisterToggleOrSpeakBtn'),
    luisterMainBtnText: document.getElementById('luisterMainBtnText'),

    // Footer
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

    // Settings fields
    themeSegments: document.querySelectorAll('.segment-btn[data-theme-val]'),
    langCardButtons: document.querySelectorAll('.lang-card-btn'),
    voiceSelect: document.getElementById('voiceSelect'),
    speechRateSelect: document.getElementById('speechRateSelect'),
    testVoiceBtn: document.getElementById('testVoiceBtn'),
    fullscreenToggle: document.getElementById('fullscreenToggle')
  };

  // ====================================================
  // INITIALIZATION
  // ====================================================
  function init() {
    // Read URL parameter "?app=..."
    const urlParams = new URLSearchParams(window.location.search);
    const appQuery = (urlParams.get('app') || '').toLowerCase().trim();
    if (appQuery) {
      if (appQuery === 'alfabet' || appQuery === 'alphabet') {
        state.activeApp = 'alphabet';
      } else if (appQuery === 'luister' || appQuery === 'luisteren') {
        state.activeApp = 'luisteren';
      } else if (APPS[appQuery]) {
        state.activeApp = appQuery;
      }
    }

    initTheme();
    initVoices();
    loadAllDatabases();
    setupEventListeners();
    updateLanguageUI();
    registerServiceWorker();
  }

  // ====================================================
  // DATA LOADING (Local-first & Offline)
  // ====================================================
  function loadAllDatabases() {
    // 1. Words Database
    if (window.TAALVRIEND_WORDS && Array.isArray(window.TAALVRIEND_WORDS)) {
      state.allWords = [...window.TAALVRIEND_WORDS];
      onWordsLoaded();
    } else {
      fetch('data/words.json')
        .then(res => res.json())
        .then(data => {
          state.allWords = data;
          onWordsLoaded();
        })
        .catch(err => console.warn('Could not load words.json:', err));
    }

    // 2. Clocks Database
    if (window.TAALVRIEND_CLOCKS && Array.isArray(window.TAALVRIEND_CLOCKS)) {
      state.allClocks = [...window.TAALVRIEND_CLOCKS];
      onClocksLoaded();
    } else {
      fetch('data/clocks.json')
        .then(res => res.json())
        .then(data => {
          state.allClocks = data;
          onClocksLoaded();
        })
        .catch(err => console.warn('Could not load clocks.json:', err));
    }

    // 3. Sentences Database
    if (window.TAALVRIEND_SENTENCES && Array.isArray(window.TAALVRIEND_SENTENCES)) {
      state.allSentences = [...window.TAALVRIEND_SENTENCES];
      onSentencesLoaded();
    } else {
      fetch('data/sentences.json')
        .then(res => res.json())
        .then(data => {
          state.allSentences = data;
          onSentencesLoaded();
        })
        .catch(err => console.warn('Could not load sentences.json:', err));
    }

    // 4. Alphabet Database
    if (window.TAALVRIEND_ALPHABET && Array.isArray(window.TAALVRIEND_ALPHABET)) {
      state.allAlphabet = [...window.TAALVRIEND_ALPHABET];
      onAlphabetLoaded();
    } else {
      fetch('data/alphabet.json')
        .then(res => res.json())
        .then(data => {
          state.allAlphabet = data;
          onAlphabetLoaded();
        })
        .catch(err => console.warn('Could not load alphabet.json:', err));
    }

    // 5. Listening Database
    if (window.TAALVRIEND_LISTENING && Array.isArray(window.TAALVRIEND_LISTENING)) {
      state.allListening = [...window.TAALVRIEND_LISTENING];
      onListeningLoaded();
    } else {
      fetch('data/listening.json')
        .then(res => res.json())
        .then(data => {
          state.allListening = data;
          onListeningLoaded();
        })
        .catch(err => console.warn('Could not load listening.json:', err));
    }

    // Set initial active app
    switchApp(state.activeApp, false);
  }

  function onWordsLoaded() {
    applyWordsFilters(true);
    updateCategoryModalGrid();
  }

  function onClocksLoaded() {
    applyClockFilter(true);
    renderMinuteChips();
  }

  function onSentencesLoaded() {
    updateSentenceCounts();
    applySentenceFilter(true);
  }

  function onAlphabetLoaded() {
    updateAlphabetCounts();
    applyAlphabetFilter(true);
  }

  function onListeningLoaded() {
    updateListeningCounts();
    applyListeningFilter(true);
  }

  // ====================================================
  // APP SWITCHER MANAGEMENT & URL SYNC
  // ====================================================
  function switchApp(appName, speak = false) {
    if (appName === 'alfabet') appName = 'alphabet';
    if (appName === 'luister') appName = 'luisteren';
    if (!APPS[appName]) appName = 'woorden';
    state.activeApp = appName;
    localStorage.setItem('taalvriend_active_app', appName);

    // Sync URL parameter "?app=..."
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('app', appName);
      window.history.replaceState(null, '', url.toString());
    } catch (e) {
      // In case URL API fails in legacy environments
    }

    // Update Menubar Button
    const appInfo = APPS[appName];
    if (el.currentAppName) el.currentAppName.textContent = appInfo.name;
    if (el.currentAppIcon) el.currentAppIcon.textContent = appInfo.icon;

    // Update Views Visibility
    if (el.appWoordenView) el.appWoordenView.style.display = appName === 'woorden' ? 'flex' : 'none';
    if (el.appKlokView) el.appKlokView.style.display = appName === 'klok' ? 'flex' : 'none';
    if (el.appZinnenView) el.appZinnenView.style.display = appName === 'zinnen' ? 'flex' : 'none';
    if (el.appAlphabetView) el.appAlphabetView.style.display = appName === 'alphabet' ? 'flex' : 'none';
    if (el.appLuisterView) el.appLuisterView.style.display = appName === 'luisteren' ? 'flex' : 'none';

    // Toggle Words-specific Header items
    if (el.headerSearchContainer) el.headerSearchContainer.style.display = appName === 'woorden' ? 'flex' : 'none';
    if (el.categoryHeaderBtn) el.categoryHeaderBtn.style.display = appName === 'woorden' ? 'flex' : 'none';

    // Update modal cards active state
    if (el.appChoiceCards) {
      el.appChoiceCards.forEach(card => {
        const id = card.getAttribute('data-app-id');
        card.classList.toggle('active', id === appName);
      });
    }

    // Refresh context-specific counter in header & footer
    updateContextCounter();

    if (speak) {
      speakCurrentContext();
    }
  }

  function updateContextCounter() {
    if (state.activeApp === 'woorden') {
      const total = state.displayWords.length;
      const current = total === 0 ? 0 : state.currentWordIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.footerCategoryText) {
        const catName = state.selectedCategory === 'all' ? 'Alle categorieën' : state.selectedCategory;
        el.footerCategoryText.textContent = `Woorden Leren • ${catName} (${total})`;
      }
    } else if (state.activeApp === 'klok') {
      const total = state.filteredClocks.length;
      const current = total === 0 ? 0 : state.currentClockIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.clockCounterText) el.clockCounterText.textContent = `Klok ${current} / ${total}`;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = `Klok Kijken • 5-minuten intervallen (${total})`;
      }
    } else if (state.activeApp === 'zinnen') {
      const total = state.filteredSentences.length;
      const current = total === 0 ? 0 : state.currentSentenceIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.sentenceCounterBadge) el.sentenceCounterBadge.textContent = `Zin ${current} van ${total}`;
      if (el.footerCategoryText) {
        const lvlName = state.currentSentenceLevel.charAt(0).toUpperCase() + state.currentSentenceLevel.slice(1);
        el.footerCategoryText.textContent = `Zinnen Oefenen • Niveau ${lvlName} (${total})`;
      }
    } else if (state.activeApp === 'alphabet') {
      const total = state.filteredAlphabet.length;
      const current = total === 0 ? 0 : state.currentAlphabetIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = `Alfabet & Klanken • Letter ${current} van ${total}`;
      }
    } else if (state.activeApp === 'luisteren') {
      const total = state.filteredListening.length;
      const current = total === 0 ? 0 : state.currentListeningIndex + 1;
      if (el.activeRowNumber) el.activeRowNumber.textContent = current;
      if (el.totalRowsCount) el.totalRowsCount.textContent = total;
      if (el.footerCategoryText) {
        el.footerCategoryText.textContent = `Luistervaardigheid • Niveau ${state.currentListeningLevel} (${total} fragmenten)`;
      }
    }
  }

  // ====================================================
  // APP 1: WOORDEN LEREN
  // ====================================================
  function applyWordsFilters(resetIndex = false) {
    let list = [...state.allWords];

    // Category Filter
    if (state.selectedCategory !== 'all') {
      list = list.filter(w => w.category === state.selectedCategory);
    }

    // Search Filter
    if (state.searchQuery.trim()) {
      const q = state.searchQuery.toLowerCase().trim();
      list = list.filter(w => {
        const dutchMatch = (w.word && w.word.toLowerCase().includes(q)) || (w.lemma && w.lemma.toLowerCase().includes(q));
        const catMatch = w.category && w.category.toLowerCase().includes(q);
        const transMatch = w.translations && Object.values(w.translations).some(t => t && t.toLowerCase().includes(q));
        return dutchMatch || catMatch || transMatch;
      });
    }

    state.filteredWords = list;

    // Shuffle if enabled
    if (state.isShuffle) {
      state.displayWords = shuffleArray([...state.filteredWords]);
    } else {
      state.displayWords = [...state.filteredWords];
    }

    if (resetIndex) {
      state.currentWordIndex = 0;
    } else if (state.currentWordIndex >= state.displayWords.length) {
      state.currentWordIndex = Math.max(0, state.displayWords.length - 1);
    }

    renderWordRows();
    updateHeaderCategoryUI();
    updateContextCounter();
  }

  function renderWordRows() {
    if (!el.wordsStreamContainer) return;
    el.wordsStreamContainer.innerHTML = '';

    if (state.displayWords.length === 0) {
      el.wordsStreamContainer.innerHTML = `
        <div class="empty-state">
          <span class="empty-icon">🔍</span>
          <p>Geen woorden gevonden voor deze zoekopdracht of categorie.</p>
        </div>
      `;
      return;
    }

    const fragment = document.createDocumentFragment();

    state.displayWords.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `word-row ${index === state.currentWordIndex ? 'active' : ''}`;
      row.setAttribute('role', 'row');
      row.setAttribute('data-index', index);
      row.setAttribute('tabindex', '0');

      // 1. Column Image
      const colImage = document.createElement('div');
      colImage.className = 'col-image';
      colImage.setAttribute('role', 'cell');

      const imgWrapper = document.createElement('div');
      imgWrapper.className = 'word-row-image-wrapper';
      imgWrapper.innerHTML = item.svg || '<div class="no-img">📷</div>';
      colImage.appendChild(imgWrapper);

      // 2. Column Dutch Word (Main & prominent column)
      const colDutch = document.createElement('div');
      colDutch.className = 'col-dutch';
      colDutch.setAttribute('role', 'cell');

      const article = item.article ? `<span class="word-article-tag article-${item.article}">${item.article}</span>` : '';
      const lemma = item.lemma || item.word.replace(/^(de|het|een)\s+/, '');
      colDutch.innerHTML = `
        <div class="dutch-word-content">
          ${article}
          <span class="dutch-lemma">${lemma}</span>
        </div>
      `;

      // 3. Column Translation
      const colTrans = document.createElement('div');
      colTrans.className = 'col-trans';
      colTrans.setAttribute('role', 'cell');

      const transText = (item.translations && item.translations[state.nativeLanguage]) || '—';
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
      colTrans.innerHTML = `
        <div class="trans-word-wrapper ${isRtl ? 'rtl' : ''}">
          <span class="native-text">${transText}</span>
        </div>
      `;

      // 4. Column Example Sentence (Click to speak)
      const colSentence = document.createElement('div');
      colSentence.className = 'col-sentence';
      colSentence.setAttribute('role', 'cell');

      const sentenceText = item.example || `Dit is ${item.word}.`;
      colSentence.innerHTML = `
        <div class="sentence-clickable-box" title="Klik om de voorbeeldzin uit te spreken">
          <span class="sentence-speaker-icon">🔊</span>
          <p class="sentence-text">${sentenceText}</p>
        </div>
      `;

      // Event listener: click sentence to speak sentence
      const sentenceClickable = colSentence.querySelector('.sentence-clickable-box');
      if (sentenceClickable) {
        sentenceClickable.addEventListener('click', (e) => {
          e.stopPropagation();
          selectWordRow(index, false);
          speakText(sentenceText);
        });
      }

      // Event listener: click row to select & speak word
      row.addEventListener('click', () => {
        selectWordRow(index, true);
      });

      row.appendChild(colImage);
      row.appendChild(colDutch);
      row.appendChild(colTrans);
      row.appendChild(colSentence);

      fragment.appendChild(row);
    });

    el.wordsStreamContainer.appendChild(fragment);
    scrollToActiveWord();
  }

  function selectWordRow(index, speak = true) {
    if (index < 0 || index >= state.displayWords.length) return;
    state.currentWordIndex = index;

    const allRows = el.wordsStreamContainer.querySelectorAll('.word-row');
    allRows.forEach((r, i) => {
      r.classList.toggle('active', i === index);
    });

    updateContextCounter();
    scrollToActiveWord();

    if (speak) {
      speakActiveWord();
    }
  }

  function scrollToActiveWord() {
    const activeRow = el.wordsStreamContainer.querySelector(`.word-row[data-index="${state.currentWordIndex}"]`);
    if (activeRow) {
      activeRow.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }

  function speakActiveWord() {
    const wordObj = state.displayWords[state.currentWordIndex];
    if (wordObj) {
      speakText(wordObj.word);
    }
  }

  function goToNextWord() {
    if (state.displayWords.length === 0) return;
    if (state.currentWordIndex < state.displayWords.length - 1) {
      selectWordRow(state.currentWordIndex + 1, true);
    } else {
      selectWordRow(0, true);
    }
  }

  function goToPrevWord() {
    if (state.displayWords.length === 0) return;
    if (state.currentWordIndex > 0) {
      selectWordRow(state.currentWordIndex - 1, true);
    } else {
      selectWordRow(state.displayWords.length - 1, true);
    }
  }

  // ====================================================
  // APP 2: KLOK KIJKEN (5-Minuten Intervallen)
  // ====================================================
  function applyClockFilter(resetIndex = false) {
    let list = [...state.allClocks];

    if (state.selectedClockHour !== 'all') {
      const h = parseInt(state.selectedClockHour, 10);
      list = list.filter(c => c.hour === h);
    }

    if (state.isShuffle) {
      state.filteredClocks = shuffleArray([...list]);
    } else {
      state.filteredClocks = list;
    }

    if (resetIndex) {
      state.currentClockIndex = 0;
    } else if (state.currentClockIndex >= state.filteredClocks.length) {
      state.currentClockIndex = Math.max(0, state.filteredClocks.length - 1);
    }

    renderActiveClock();
    updateContextCounter();
  }

  function renderActiveClock() {
    if (state.filteredClocks.length === 0) return;
    const item = state.filteredClocks[state.currentClockIndex];
    if (!item) return;

    if (el.clockSvgContainer) el.clockSvgContainer.innerHTML = item.svg || '';
    if (el.clockDigitalBadge) el.clockDigitalBadge.textContent = item.digitalTime || '12:00';
    if (el.clockDutchPhrase) el.clockDutchPhrase.textContent = item.dutchPhrase || '';
    if (el.clockSentenceText) el.clockSentenceText.textContent = item.sentence || '';

    const transText = (item.translations && item.translations[state.nativeLanguage]) || '—';
    if (el.clockTranslationText) {
      el.clockTranslationText.textContent = transText;
      const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
      el.clockTranslationText.dir = isRtl ? 'rtl' : 'ltr';
    }

    // Highlight minute chip
    if (el.clockMinuteChips) {
      const chips = el.clockMinuteChips.querySelectorAll('.minute-chip');
      chips.forEach(chip => {
        const m = parseInt(chip.getAttribute('data-minute'), 10);
        chip.classList.toggle('active', m === item.minute);
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
        // Find first clock item with this minute in current filtered list
        const idx = state.filteredClocks.findIndex(c => c.minute === m);
        if (idx !== -1) {
          state.currentClockIndex = idx;
          renderActiveClock();
          speakClockSentence();
        }
      });

      el.clockMinuteChips.appendChild(chip);
    });
  }

  function speakClockSentence() {
    const item = state.filteredClocks[state.currentClockIndex];
    if (item && item.sentence) {
      speakText(item.sentence);
    }
  }

  function goToNextClock() {
    if (state.filteredClocks.length === 0) return;
    state.currentClockIndex = (state.currentClockIndex + 1) % state.filteredClocks.length;
    renderActiveClock();
    speakClockSentence();
  }

  function goToPrevClock() {
    if (state.filteredClocks.length === 0) return;
    state.currentClockIndex = (state.currentClockIndex - 1 + state.filteredClocks.length) % state.filteredClocks.length;
    renderActiveClock();
    speakClockSentence();
  }

  // ====================================================
  // APP 3: ZINNEN OEFENEN (3 Niveaus)
  // ====================================================
  function updateSentenceCounts() {
    const bCount = state.allSentences.filter(s => s.level === 'basis').length;
    const gCount = state.allSentences.filter(s => s.level === 'gevorderd').length;
    const mCount = state.allSentences.filter(s => s.level === 'moeilijk').length;

    if (el.countBasis) el.countBasis.textContent = `${bCount} zinnen`;
    if (el.countGevorderd) el.countGevorderd.textContent = `${gCount} zinnen`;
    if (el.countMoeilijk) el.countMoeilijk.textContent = `${mCount} zinnen`;
  }

  function applySentenceFilter(resetIndex = false) {
    let list = state.allSentences.filter(s => s.level === state.currentSentenceLevel);

    if (state.isShuffle) {
      state.filteredSentences = shuffleArray([...list]);
    } else {
      state.filteredSentences = list;
    }

    if (resetIndex) {
      state.currentSentenceIndex = 0;
    } else if (state.currentSentenceIndex >= state.filteredSentences.length) {
      state.currentSentenceIndex = Math.max(0, state.filteredSentences.length - 1);
    }

    renderActiveSentence();
    updateContextCounter();
  }

  function renderActiveSentence() {
    if (state.filteredSentences.length === 0) return;
    const item = state.filteredSentences[state.currentSentenceIndex];
    if (!item) return;

    if (el.sentenceTopicBadge) el.sentenceTopicBadge.textContent = item.topic || 'Praktische zin';
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
    if (item && item.dutch) {
      speakText(item.dutch);
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
  // APP 4: ALFABET & KLANKEN
  // ====================================================
  function updateAlphabetCounts() {
    const total = state.allAlphabet.length;
    const vowels = state.allAlphabet.filter(a => a.type === 'klinker' || a.type === 'tweeklank' || a.type === 'combinatie').length;
    const letters = state.allAlphabet.filter(a => a.type === 'letter').length;

    if (el.countAlphabetAll) el.countAlphabetAll.textContent = total;
    if (el.countAlphabetVowels) el.countAlphabetVowels.textContent = vowels;
    if (el.countAlphabetLetters) el.countAlphabetLetters.textContent = letters;
  }

  function applyAlphabetFilter(resetIndex = false) {
    let list = [...state.allAlphabet];
    if (state.selectedAlphabetType === 'klinker') {
      list = list.filter(a => a.type === 'klinker' || a.type === 'tweeklank' || a.type === 'combinatie');
    } else if (state.selectedAlphabetType === 'letter') {
      list = list.filter(a => a.type === 'letter');
    }

    state.filteredAlphabet = list;

    if (resetIndex) {
      state.currentAlphabetIndex = 0;
    } else if (state.currentAlphabetIndex >= state.filteredAlphabet.length) {
      state.currentAlphabetIndex = Math.max(0, state.filteredAlphabet.length - 1);
    }

    renderAlphabetChips();
    renderAlphabetHero();
    updateContextCounter();
  }

  function renderAlphabetChips() {
    if (!el.alphabetChipsRow) return;
    el.alphabetChipsRow.innerHTML = '';

    state.filteredAlphabet.forEach((item, index) => {
      const chip = document.createElement('button');
      chip.className = `alphabet-chip ${index === state.currentAlphabetIndex ? 'active' : ''}`;
      chip.textContent = item.letter.split('/')[0].trim();
      chip.title = item.letter;

      chip.addEventListener('click', () => {
        state.currentAlphabetIndex = index;
        renderAlphabetChips();
        renderAlphabetHero();
        speakCurrentAlphabetLetter();
      });

      el.alphabetChipsRow.appendChild(chip);
    });

    // Scroll active chip into view
    const activeChip = el.alphabetChipsRow.querySelector('.alphabet-chip.active');
    if (activeChip) {
      activeChip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }

  function renderAlphabetHero() {
    if (state.filteredAlphabet.length === 0) return;
    const item = state.filteredAlphabet[state.currentAlphabetIndex];
    if (!item) return;

    if (el.alphabetBigLetter) el.alphabetBigLetter.textContent = item.letter;
    if (el.alphabetPhonetic) el.alphabetPhonetic.textContent = item.phonetic;
    if (el.alphabetTypeBadge) {
      const typeLabels = {
        letter: 'Basis Letter',
        klinker: 'Lange Klinker',
        tweeklank: 'Tweeklank (Diftong)',
        combinatie: 'Klankcombinatie'
      };
      el.alphabetTypeBadge.textContent = typeLabels[item.type] || 'Klank';
    }
    if (el.alphabetTipText) el.alphabetTipText.textContent = item.tip;

    // Render interactive example words
    if (el.alphabetExamplesGrid) {
      el.alphabetExamplesGrid.innerHTML = '';
      const fragment = document.createDocumentFragment();

      (item.examples || []).forEach(ex => {
        const card = document.createElement('div');
        card.className = 'alphabet-word-card';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.title = `Klik om "${ex.word}" uit te spreken`;

        // SVG icon
        const iconBox = document.createElement('div');
        iconBox.className = 'alphabet-word-icon';
        iconBox.innerHTML = ex.svg || '<div class="no-img">🔤</div>';

        // Word details & highlight
        const details = document.createElement('div');
        details.className = 'alphabet-word-details';

        // Highlight matching letter substring
        const wordText = ex.word;
        const hl = ex.highlight || '';
        let highlightedHtml = wordText;
        if (hl && wordText.toLowerCase().includes(hl.toLowerCase())) {
          const regex = new RegExp(`(${hl})`, 'i');
          highlightedHtml = wordText.replace(regex, '<span class="letter-match">$1</span>');
        }

        const trans = (ex.translations && ex.translations[state.nativeLanguage]) || '—';
        const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;

        details.innerHTML = `
          <div class="alphabet-word-title">${highlightedHtml}</div>
          <div class="alphabet-word-trans ${isRtl ? 'rtl' : ''}">${trans}</div>
        `;

        // Speaker icon
        const speaker = document.createElement('span');
        speaker.className = 'alphabet-word-speak-icon';
        speaker.innerHTML = `
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        `;

        card.appendChild(iconBox);
        card.appendChild(details);
        card.appendChild(speaker);

        // Click word to speak it!
        card.addEventListener('click', () => {
          speakText(ex.word);
        });

        fragment.appendChild(card);
      });

      el.alphabetExamplesGrid.appendChild(fragment);
    }

    updateContextCounter();
  }

  function speakCurrentAlphabetLetter() {
    const item = state.filteredAlphabet[state.currentAlphabetIndex];
    if (item) {
      speakText(item.sound || item.letter.split('/')[0].trim());
    }
  }

  function goToNextAlphabet() {
    if (state.filteredAlphabet.length === 0) return;
    state.currentAlphabetIndex = (state.currentAlphabetIndex + 1) % state.filteredAlphabet.length;
    renderAlphabetChips();
    renderAlphabetHero();
    speakCurrentAlphabetLetter();
  }

  function goToPrevAlphabet() {
    if (state.filteredAlphabet.length === 0) return;
    state.currentAlphabetIndex = (state.currentAlphabetIndex - 1 + state.filteredAlphabet.length) % state.filteredAlphabet.length;
    renderAlphabetChips();
    renderAlphabetHero();
    speakCurrentAlphabetLetter();
  }

  // ====================================================
  // APP 5: LUISTERVAARDIGHEID (Max 5 regels, reveal met SPATIE)
  // ====================================================
  function updateListeningCounts() {
    const a1 = state.allListening.filter(l => l.level === 'A1').length;
    const a2 = state.allListening.filter(l => l.level === 'A2-B1').length;
    const b1 = state.allListening.filter(l => l.level === 'B1-B2').length;

    if (el.countLuisterA1) el.countLuisterA1.textContent = `${a1} teksten`;
    if (el.countLuisterA2) el.countLuisterA2.textContent = `${a2} teksten`;
    if (el.countLuisterB1) el.countLuisterB1.textContent = `${b1} teksten`;
  }

  function applyListeningFilter(resetIndex = false) {
    let list = state.allListening.filter(l => l.level === state.currentListeningLevel);

    if (state.isShuffle) {
      state.filteredListening = shuffleArray([...list]);
    } else {
      state.filteredListening = list;
    }

    if (resetIndex) {
      state.currentListeningIndex = 0;
    } else if (state.currentListeningIndex >= state.filteredListening.length) {
      state.currentListeningIndex = Math.max(0, state.filteredListening.length - 1);
    }

    state.isListeningRevealed = false;
    renderListeningCard();
    updateContextCounter();
  }

  function renderListeningCard() {
    if (state.filteredListening.length === 0) return;
    const item = state.filteredListening[state.currentListeningIndex];
    if (!item) return;

    if (el.luisterCategoryBadge) el.luisterCategoryBadge.textContent = item.category || 'Luisteren';
    if (el.luisterTitleText) el.luisterTitleText.textContent = item.title || 'Luisteroefening';
    if (el.luisterCounterBadge) {
      el.luisterCounterBadge.textContent = `Fragment ${state.currentListeningIndex + 1} van ${state.filteredListening.length}`;
    }

    // Toggle Masked vs Revealed containers
    if (!state.isListeningRevealed) {
      if (el.luisterMaskedBox) el.luisterMaskedBox.style.display = 'flex';
      if (el.luisterRevealedBox) el.luisterRevealedBox.style.display = 'none';
      if (el.luisterMainBtnText) el.luisterMainBtnText.textContent = 'Onthul tekst (SPATIE)';
    } else {
      if (el.luisterMaskedBox) el.luisterMaskedBox.style.display = 'none';
      if (el.luisterRevealedBox) el.luisterRevealedBox.style.display = 'flex';
      if (el.luisterMainBtnText) el.luisterMainBtnText.textContent = 'Herhaal audio (SPATIE)';

      // Render Dutch lines (max 5 lines)
      if (el.luisterDutchLines) {
        el.luisterDutchLines.innerHTML = '';
        (item.lines || [item.dutch]).forEach(line => {
          const p = document.createElement('p');
          p.className = 'listening-line';
          p.textContent = line;
          el.luisterDutchLines.appendChild(p);
        });
      }

      // Render native translation lines
      if (el.luisterTranslationLines) {
        el.luisterTranslationLines.innerHTML = '';
        const transText = (item.translations && item.translations[state.nativeLanguage]) || '—';
        const isRtl = LANGUAGES[state.nativeLanguage] && LANGUAGES[state.nativeLanguage].rtl;
        const transLines = transText.split('\n');

        transLines.forEach(tLine => {
          const p = document.createElement('p');
          p.className = `listening-trans-line ${isRtl ? 'rtl' : ''}`;
          p.dir = isRtl ? 'rtl' : 'ltr';
          p.textContent = tLine;
          el.luisterTranslationLines.appendChild(p);
        });
      }
    }

    updateContextCounter();
  }

  function speakListeningAudio() {
    const item = state.filteredListening[state.currentListeningIndex];
    if (!item) return;

    const heroCard = document.querySelector('.listening-hero-card');
    if (heroCard) heroCard.classList.add('playing');

    speakText(item.dutch, () => {
      if (heroCard) heroCard.classList.remove('playing');
    });
  }

  function revealListeningExercise() {
    state.isListeningRevealed = true;
    renderListeningCard();
    speakListeningAudio();
  }

  function goToNextListening() {
    if (state.filteredListening.length === 0) return;
    state.currentListeningIndex = (state.currentListeningIndex + 1) % state.filteredListening.length;
    state.isListeningRevealed = false;
    renderListeningCard();
    speakListeningAudio();
  }

  function goToPrevListening() {
    if (state.filteredListening.length === 0) return;
    state.currentListeningIndex = (state.currentListeningIndex - 1 + state.filteredListening.length) % state.filteredListening.length;
    state.isListeningRevealed = false;
    renderListeningCard();
    speakListeningAudio();
  }

  // ====================================================
  // CONTEXT-AWARE ACTIONS (Keyboard & Footer)
  // ====================================================
  function speakCurrentContext() {
    if (state.activeApp === 'woorden') {
      speakActiveWord();
    } else if (state.activeApp === 'klok') {
      speakClockSentence();
    } else if (state.activeApp === 'zinnen') {
      speakSentenceText();
    } else if (state.activeApp === 'alphabet') {
      speakCurrentAlphabetLetter();
    } else if (state.activeApp === 'luisteren') {
      if (!state.isListeningRevealed) {
        revealListeningExercise();
      } else {
        speakListeningAudio();
      }
    }
  }

  function goToNextContext() {
    if (state.activeApp === 'woorden') goToNextWord();
    else if (state.activeApp === 'klok') goToNextClock();
    else if (state.activeApp === 'zinnen') goToNextSentence();
    else if (state.activeApp === 'alphabet') goToNextAlphabet();
    else if (state.activeApp === 'luisteren') goToNextListening();
  }

  function goToPrevContext() {
    if (state.activeApp === 'woorden') goToPrevWord();
    else if (state.activeApp === 'klok') goToPrevClock();
    else if (state.activeApp === 'zinnen') goToPrevSentence();
    else if (state.activeApp === 'alphabet') goToPrevAlphabet();
    else if (state.activeApp === 'luisteren') goToPrevListening();
  }

  // ====================================================
  // SPEECH SYNTHESIS (TTS)
  // ====================================================
  function initVoices() {
    if (!('speechSynthesis' in window)) return;

    function populate() {
      const all = window.speechSynthesis.getVoices();
      state.availableVoices = all.filter(v => v.lang.startsWith('nl'));

      if (el.voiceSelect) {
        el.voiceSelect.innerHTML = '';
        if (state.availableVoices.length === 0) {
          const opt = document.createElement('option');
          opt.value = '';
          opt.textContent = 'Standaard Nederlandse Systeemstem';
          el.voiceSelect.appendChild(opt);
        } else {
          state.availableVoices.forEach(v => {
            const opt = document.createElement('option');
            opt.value = v.voiceURI;
            opt.textContent = `${v.name} (${v.lang})`;
            if (v.voiceURI === state.ttsVoiceURI) opt.selected = true;
            el.voiceSelect.appendChild(opt);
          });
        }
      }
    }

    populate();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populate;
    }
  }

  function speakText(text, onComplete) {
    if (!('speechSynthesis' in window) || !text) {
      if (typeof onComplete === 'function') onComplete();
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'nl-NL';
    utterance.rate = state.ttsRate || 0.85;

    if (state.ttsVoiceURI && state.availableVoices.length > 0) {
      const voice = state.availableVoices.find(v => v.voiceURI === state.ttsVoiceURI);
      if (voice) utterance.voice = voice;
    }

    utterance.onend = () => {
      if (typeof onComplete === 'function') onComplete();
    };

    utterance.onerror = () => {
      if (typeof onComplete === 'function') onComplete();
    };

    window.speechSynthesis.speak(utterance);
  }

  // ====================================================
  // UI & CATEGORY HELPERS
  // ====================================================
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function updateHeaderCategoryUI() {
    const catName = state.selectedCategory === 'all' ? 'Alle categorieën' : state.selectedCategory;
    if (el.categoryHeaderName) el.categoryHeaderName.textContent = catName;
    if (el.categoryCountBadge) el.categoryCountBadge.textContent = state.displayWords.length;
  }

  function updateLanguageUI() {
    const lang = LANGUAGES[state.nativeLanguage] || LANGUAGES.ar;
    if (el.langQuickFlag) el.langQuickFlag.textContent = lang.flag;
    if (el.langQuickName) el.langQuickName.textContent = lang.name;
    if (el.thTransLangTag) el.thTransLangTag.textContent = state.nativeLanguage.toUpperCase();

    if (el.clockLangFlag) el.clockLangFlag.textContent = lang.flag;
    if (el.clockLangName) el.clockLangName.textContent = lang.name;

    if (el.sentenceLangFlag) el.sentenceLangFlag.textContent = lang.flag;
    if (el.sentenceLangName) el.sentenceLangName.textContent = `${lang.name} (Vertaling)`;

    if (el.luisterLangFlag) el.luisterLangFlag.textContent = lang.flag;
    if (el.luisterLangName) el.luisterLangName.textContent = `${lang.name} (Vertaling)`;

    el.langCardButtons.forEach(btn => {
      const code = btn.getAttribute('data-lang-code');
      btn.classList.toggle('active', code === state.nativeLanguage);
    });
  }

  function updateCategoryModalGrid() {
    if (!el.categoryFilterGrid) return;

    const catCounts = { all: state.allWords.length };
    state.allWords.forEach(w => {
      catCounts[w.category] = (catCounts[w.category] || 0) + 1;
    });

    const categories = Object.keys(catCounts).filter(c => c !== 'all').sort();
    categories.unshift('all');

    el.categoryFilterGrid.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `category-choice-btn ${cat === state.selectedCategory ? 'active' : ''}`;
      const title = cat === 'all' ? '🌟 Alle categorieën' : cat;
      const count = catCounts[cat] || 0;

      btn.innerHTML = `
        <span>${title}</span>
        <span class="choice-count">${count}</span>
      `;

      btn.addEventListener('click', () => {
        state.selectedCategory = cat;
        localStorage.setItem('taalvriend_cat', cat);
        closeModals();
        applyWordsFilters(true);
      });

      el.categoryFilterGrid.appendChild(btn);
    });
  }

  // ====================================================
  // THEME & FULLSCREEN
  // ====================================================
  function initTheme() {
    applyTheme(state.theme);
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (state.theme === 'system') applyTheme('system');
    });
    updateThemeUI();
  }

  function applyTheme(theme) {
    state.theme = theme;
    localStorage.setItem('taalvriend_theme', theme);
    let effective = theme;
    if (theme === 'system') {
      effective = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effective);
    updateThemeUI();
  }

  function updateThemeUI() {
    el.themeSegments.forEach(btn => {
      const val = btn.getAttribute('data-theme-val');
      btn.classList.toggle('active', val === state.theme);
    });
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.warn(err.message));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  function updateFullscreenUI() {
    const isFs = !!document.fullscreenElement;
    if (el.fullscreenToggle) el.fullscreenToggle.checked = isFs;
    if (el.fullscreenIcon) {
      el.fullscreenIcon.innerHTML = isFs ? `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
        </svg>
      ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
        </svg>
      `;
    }
  }

  document.addEventListener('fullscreenchange', updateFullscreenUI);

  // ====================================================
  // EVENT LISTENERS & ROUTING
  // ====================================================
  function setupEventListeners() {
    // App Switcher Modal trigger
    if (el.appSwitcherBtn) {
      el.appSwitcherBtn.addEventListener('click', () => openModal(el.appSwitcherModal));
    }
    if (el.appSwitcherCloseBtn) {
      el.appSwitcherCloseBtn.addEventListener('click', closeModals);
    }

    // App Switcher Cards
    el.appChoiceCards.forEach(card => {
      card.addEventListener('click', () => {
        const appId = card.getAttribute('data-app-id');
        switchApp(appId, false);
        closeModals();
      });
    });

    // Global Keyboard Listeners
    window.addEventListener('keydown', (e) => {
      if (document.activeElement === el.searchInput) {
        if (e.key === 'Escape') {
          el.searchInput.value = '';
          state.searchQuery = '';
          el.searchClearBtn.style.display = 'none';
          el.searchInput.blur();
          applyWordsFilters(false);
        }
        return;
      }

      if (e.key === 'Escape') {
        closeModals();
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        speakCurrentContext();
      } else if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextContext();
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevContext();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        speakCurrentContext();
      } else if (e.key === 'f' || e.key === 'F') {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          toggleFullscreen();
        }
      } else if (e.key === 'm' || e.key === 'M') {
        if (!e.ctrlKey && !e.metaKey) {
          e.preventDefault();
          openModal(el.configModal);
        }
      }
    });

    // Search Input
    if (el.searchInput) {
      el.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        if (el.searchClearBtn) el.searchClearBtn.style.display = state.searchQuery ? 'flex' : 'none';
        applyWordsFilters(true);
      });
    }

    if (el.searchClearBtn) {
      el.searchClearBtn.addEventListener('click', () => {
        el.searchInput.value = '';
        state.searchQuery = '';
        el.searchClearBtn.style.display = 'none';
        applyWordsFilters(true);
      });
    }

    // Bottom Action Buttons
    if (el.footerSpeakBtn) el.footerSpeakBtn.addEventListener('click', speakCurrentContext);
    if (el.btnNextRow) el.btnNextRow.addEventListener('click', goToNextContext);
    if (el.btnPrevRow) el.btnPrevRow.addEventListener('click', goToPrevContext);

    // Shuffle Toggle
    if (el.shuffleHeaderBtn) {
      el.shuffleHeaderBtn.classList.toggle('active', state.isShuffle);
      el.shuffleHeaderBtn.addEventListener('click', toggleShuffle);
    }

    function toggleShuffle() {
      state.isShuffle = !state.isShuffle;
      localStorage.setItem('taalvriend_shuffle', state.isShuffle);
      if (el.shuffleHeaderBtn) el.shuffleHeaderBtn.classList.toggle('active', state.isShuffle);

      if (state.activeApp === 'woorden') applyWordsFilters(true);
      else if (state.activeApp === 'klok') applyClockFilter(true);
      else if (state.activeApp === 'zinnen') applySentenceFilter(true);
      else if (state.activeApp === 'alphabet') applyAlphabetFilter(true);
      else if (state.activeApp === 'luisteren') applyListeningFilter(true);
    }

    // Quick Language Switcher
    if (el.langQuickSelectBtn) {
      el.langQuickSelectBtn.addEventListener('click', () => {
        const langKeys = Object.keys(LANGUAGES);
        const curIdx = langKeys.indexOf(state.nativeLanguage);
        const nextLang = langKeys[(curIdx + 1) % langKeys.length];
        setNativeLanguage(nextLang);
      });
    }

    el.langCardButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const langCode = btn.getAttribute('data-lang-code');
        setNativeLanguage(langCode);
        closeModals();
      });
    });

    function setNativeLanguage(langCode) {
      state.nativeLanguage = langCode;
      localStorage.setItem('taalvriend_lang', langCode);
      updateLanguageUI();
      if (state.activeApp === 'woorden') renderWordRows();
      else if (state.activeApp === 'klok') renderActiveClock();
      else if (state.activeApp === 'zinnen') renderActiveSentence();
      else if (state.activeApp === 'alphabet') renderAlphabetHero();
      else if (state.activeApp === 'luisteren') renderListeningCard();
    }

    // Categories Button
    if (el.categoryHeaderBtn) {
      el.categoryHeaderBtn.addEventListener('click', () => openModal(el.categoryModal));
    }
    if (el.categoryCloseBtn) el.categoryCloseBtn.addEventListener('click', closeModals);

    // Config Modal
    if (el.configBtn) el.configBtn.addEventListener('click', () => openModal(el.configModal));
    if (el.configCloseBtn) el.configCloseBtn.addEventListener('click', closeModals);
    if (el.fullscreenBtn) el.fullscreenBtn.addEventListener('click', toggleFullscreen);
    if (el.fullscreenToggle) el.fullscreenToggle.addEventListener('change', toggleFullscreen);

    el.themeSegments.forEach(btn => {
      btn.addEventListener('click', () => applyTheme(btn.getAttribute('data-theme-val')));
    });

    if (el.voiceSelect) {
      el.voiceSelect.addEventListener('change', (e) => {
        state.ttsVoiceURI = e.target.value;
        localStorage.setItem('taalvriend_voice_uri', state.ttsVoiceURI);
      });
    }

    if (el.speechRateSelect) {
      el.speechRateSelect.value = state.ttsRate.toString();
      el.speechRateSelect.addEventListener('change', (e) => {
        state.ttsRate = parseFloat(e.target.value);
        localStorage.setItem('taalvriend_rate', state.ttsRate);
      });
    }

    if (el.testVoiceBtn) {
      el.testVoiceBtn.addEventListener('click', () => {
        speakText('Hallo! Dit is een test van de Nederlandse stem in TaalVriend.');
      });
    }

    // --- KLOK APP LISTENERS ---
    if (el.clockHourFilter) {
      el.clockHourFilter.addEventListener('change', (e) => {
        state.selectedClockHour = e.target.value;
        applyClockFilter(true);
      });
    }

    if (el.clockRandomBtn) {
      el.clockRandomBtn.addEventListener('click', () => {
        if (state.filteredClocks.length > 0) {
          state.currentClockIndex = Math.floor(Math.random() * state.filteredClocks.length);
          renderActiveClock();
          speakClockSentence();
        }
      });
    }

    if (el.clockSpeakBtn) el.clockSpeakBtn.addEventListener('click', speakClockSentence);
    if (el.clockSentenceBox) el.clockSentenceBox.addEventListener('click', speakClockSentence);
    if (el.clockNextBtn) el.clockNextBtn.addEventListener('click', goToNextClock);
    if (el.clockPrevBtn) el.clockPrevBtn.addEventListener('click', goToPrevClock);

    // --- ZINNEN APP LISTENERS ---
    el.levelTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.levelTabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentSentenceLevel = btn.getAttribute('data-level');
        applySentenceFilter(true);
      });
    });

    if (el.sentenceSpeakBtn) el.sentenceSpeakBtn.addEventListener('click', speakSentenceText);
    if (el.sentenceMainSpeakBtn) el.sentenceMainSpeakBtn.addEventListener('click', speakSentenceText);
    if (el.sentenceNextBtn) el.sentenceNextBtn.addEventListener('click', goToNextSentence);
    if (el.sentencePrevBtn) el.sentencePrevBtn.addEventListener('click', goToPrevSentence);

    if (el.sentenceRandomBtn) {
      el.sentenceRandomBtn.addEventListener('click', () => {
        if (state.filteredSentences.length > 0) {
          state.currentSentenceIndex = Math.floor(Math.random() * state.filteredSentences.length);
          renderActiveSentence();
          speakSentenceText();
        }
      });
    }

    // --- ALPHABET APP LISTENERS ---
    el.alphabetTypeFilters.forEach(btn => {
      btn.addEventListener('click', () => {
        el.alphabetTypeFilters.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedAlphabetType = btn.getAttribute('data-type');
        applyAlphabetFilter(true);
      });
    });

    if (el.alphabetRandomBtn) {
      el.alphabetRandomBtn.addEventListener('click', () => {
        if (state.filteredAlphabet.length > 0) {
          state.currentAlphabetIndex = Math.floor(Math.random() * state.filteredAlphabet.length);
          renderAlphabetChips();
          renderAlphabetHero();
          speakCurrentAlphabetLetter();
        }
      });
    }

    if (el.alphabetSpeakLetterBtn) el.alphabetSpeakLetterBtn.addEventListener('click', speakCurrentAlphabetLetter);
    if (el.alphabetNextBtn) el.alphabetNextBtn.addEventListener('click', goToNextAlphabet);
    if (el.alphabetPrevBtn) el.alphabetPrevBtn.addEventListener('click', goToPrevAlphabet);

    // --- LISTENING APP LISTENERS ---
    el.luisterLevelBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        el.luisterLevelBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.currentListeningLevel = btn.getAttribute('data-luister-level');
        applyListeningFilter(true);
      });
    });

    if (el.luisterRandomBtn) {
      el.luisterRandomBtn.addEventListener('click', () => {
        if (state.filteredListening.length > 0) {
          state.currentListeningIndex = Math.floor(Math.random() * state.filteredListening.length);
          state.isListeningRevealed = false;
          renderListeningCard();
          speakListeningAudio();
        }
      });
    }

    if (el.luisterPlayAudioBtn) el.luisterPlayAudioBtn.addEventListener('click', speakListeningAudio);
    if (el.luisterRevealBtn) el.luisterRevealBtn.addEventListener('click', revealListeningExercise);
    if (el.luisterRepeatBtn) el.luisterRepeatBtn.addEventListener('click', speakListeningAudio);
    if (el.luisterToggleOrSpeakBtn) el.luisterToggleOrSpeakBtn.addEventListener('click', () => {
      if (!state.isListeningRevealed) {
        revealListeningExercise();
      } else {
        speakListeningAudio();
      }
    });

    if (el.luisterNextBtn) el.luisterNextBtn.addEventListener('click', goToNextListening);
    if (el.luisterPrevBtn) el.luisterPrevBtn.addEventListener('click', goToPrevListening);

    // Close on backdrop click
    [el.appSwitcherModal, el.configModal, el.categoryModal].forEach(modal => {
      if (modal) {
        modal.addEventListener('click', (e) => {
          if (e.target === modal) closeModals();
        });
      }
    });
  }

  function openModal(modal) {
    if (!modal) return;
    closeModals();
    modal.classList.add('active');
  }

  function closeModals() {
    [el.appSwitcherModal, el.configModal, el.categoryModal].forEach(m => {
      if (m) m.classList.remove('active');
    });
  }

  // ====================================================
  // SERVICE WORKER
  // ====================================================
  function registerServiceWorker() {
    if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(reg => console.log('ServiceWorker registered:', reg.scope))
          .catch(err => console.log('ServiceWorker error:', err));
      });
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
