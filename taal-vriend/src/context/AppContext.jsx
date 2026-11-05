import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LANGUAGES, APPS, CEFR_LEVELS } from '../constants/languages';
import { UI_TRANSLATIONS, getUIText, getDualUIText } from '../constants/translations';
import { tts } from '../services/tts';

const AppContext = createContext();

export function AppProvider({ children }) {
  // 1. Initial State from URL / localStorage
  const getInitialApp = () => {
    if (typeof window === 'undefined') return 'woorden';
    const params = new URLSearchParams(window.location.search);
    const paramApp = params.get('app');
    if (paramApp && APPS[paramApp]) return paramApp;
    const saved = localStorage.getItem('taalvriend_active_app');
    if (saved && APPS[saved]) return saved;
    return 'woorden';
  };

  const [activeApp, setActiveAppState] = useState(getInitialApp);
  const [nativeLanguage, setNativeLanguageState] = useState(() => {
    return localStorage.getItem('taalvriend_lang') || 'ar';
  });
  const [cefrLevel, setCefrLevelState] = useState(() => {
    return localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1';
  });
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('taalvriend_theme') || 'system';
  });
  const [fontFamily, setFontFamilyState] = useState(() => {
    return localStorage.getItem('taalvriend_font_family') || "'IBM Plex Sans Condensed', sans-serif";
  });
  const [baseFontSize, setBaseFontSizeState] = useState(() => {
    return parseInt(localStorage.getItem('taalvriend_font_size'), 10) || 16;
  });
  const [ttsVoiceURI, setTtsVoiceURIState] = useState(() => {
    return localStorage.getItem('taalvriend_voice_uri') || '';
  });
  const [ttsRate, setTtsRateState] = useState(() => {
    return parseFloat(localStorage.getItem('taalvriend_rate')) || 1.0;
  });
  const [isShuffle, setIsShuffleState] = useState(() => {
    return localStorage.getItem('taalvriend_shuffle') === 'true';
  });

  // Available Dutch voices
  const [availableVoices, setAvailableVoices] = useState(() => tts.getDutchVoices());

  useEffect(() => {
    const updateVoices = () => {
      setAvailableVoices(tts.getDutchVoices());
    };
    updateVoices();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  // Words App specific filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedWordLevel, setSelectedWordLevel] = useState(() => {
    return localStorage.getItem('taalvriend_cefr_level') || 'Pre-A1';
  });

  // Global Counter state for header badge (Position / Total)
  const [counterInfo, setCounterInfo] = useState({ current: 1, total: 1 });

  // Modals state
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    return !params.get('app'); // Open app switcher modal if no ?app= parameter
  });
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isConfigModalOpen, setIsConfigModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Footer context state
  const [footerInfo, setFooterInfo] = useState({ text: '' });
  const [footerHandlers, setFooterHandlers] = useState({
    onPrev: null,
    onNext: null,
    onSpeak: null
  });

  // Theme effect
  useEffect(() => {
    let effective = theme;
    if (theme === 'system') {
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      effective = prefersDark ? 'dark' : 'light';
    }
    document.documentElement.setAttribute('data-theme', effective);
    localStorage.setItem('taalvriend_theme', theme);
  }, [theme]);

  // Font effect
  useEffect(() => {
    document.documentElement.style.setProperty('--font-family', fontFamily);
    localStorage.setItem('taalvriend_font_family', fontFamily);
  }, [fontFamily]);

  // Font size effect
  useEffect(() => {
    document.documentElement.style.fontSize = `${baseFontSize}px`;
    document.documentElement.style.setProperty('--base-font-size', `${baseFontSize}px`);
    localStorage.setItem('taalvriend_font_size', baseFontSize);
  }, [baseFontSize]);

  // Switch App
  const switchApp = useCallback((appName) => {
    if (!APPS[appName]) return;
    setActiveAppState(appName);
    localStorage.setItem('taalvriend_active_app', appName);

    // Update URL parameter
    const url = new URL(window.location.href);
    url.searchParams.set('app', appName);
    window.history.replaceState({}, '', url.toString());

    // Close modals
    setIsAppSwitcherOpen(false);
    setIsCategoryModalOpen(false);
    setIsConfigModalOpen(false);
    tts.stop();
  }, []);

  // Language Change
  const setNativeLanguage = useCallback((langCode) => {
    if (!LANGUAGES[langCode]) return;
    setNativeLanguageState(langCode);
    localStorage.setItem('taalvriend_lang', langCode);
  }, []);

  const cycleNativeLanguage = useCallback(() => {
    const langKeys = Object.keys(LANGUAGES);
    const currIdx = langKeys.indexOf(nativeLanguage);
    const nextLang = langKeys[(currIdx + 1) % langKeys.length];
    setNativeLanguage(nextLang);
  }, [nativeLanguage, setNativeLanguage]);

  // CEFR Level Change
  const setCefrLevel = useCallback((lvl) => {
    const validLevel = typeof lvl === 'string' ? lvl : lvl?.id;
    if (!validLevel) return;
    setCefrLevelState(validLevel);
    setSelectedWordLevel(validLevel);
    localStorage.setItem('taalvriend_cefr_level', validLevel);
  }, []);

  const cycleCefrLevel = useCallback(() => {
    const levelIds = ['Pre-A1', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
    const currIdx = levelIds.indexOf(cefrLevel);
    const nextIdx = (currIdx + 1) % levelIds.length;
    setCefrLevel(levelIds[nextIdx]);
  }, [cefrLevel, setCefrLevel]);

  // Settings
  const setTheme = useCallback((t) => setThemeState(t), []);
  const setFontFamily = useCallback((f) => setFontFamilyState(f), []);
  const setBaseFontSize = useCallback((s) => setBaseFontSizeState(s), []);
  const setTtsVoiceURI = useCallback((v) => {
    setTtsVoiceURIState(v);
    localStorage.setItem('taalvriend_voice_uri', v);
  }, []);
  const setTtsRate = useCallback((r) => {
    setTtsRateState(r);
    localStorage.setItem('taalvriend_rate', r);
  }, []);
  const toggleShuffle = useCallback(() => {
    setIsShuffleState(prev => {
      const next = !prev;
      localStorage.setItem('taalvriend_shuffle', String(next));
      return next;
    });
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }, []);

  // Helper to speak text with current app voice and rate settings + word highlighting
  const speakDutch = useCallback((text, targetOrFinish, onFinish) => {
    let targetElement = null;
    let finishCb = onFinish;
    if (typeof targetOrFinish === 'function') {
      finishCb = targetOrFinish;
    } else if (targetOrFinish && (targetOrFinish.nodeType === 1 || targetOrFinish.current)) {
      targetElement = targetOrFinish.current || targetOrFinish;
    }
    tts.speakWithWordHighlight(text, { 
      targetElement, 
      onFinish: finishCb, 
      rate: ttsRate, 
      voiceURI: ttsVoiceURI 
    });
  }, [ttsRate, ttsVoiceURI]);

  const speakSentenceWithHighlight = useCallback((text, targetElementOrOnHighlight, onFinish) => {
    let targetElement = null;
    let onWordHighlight = null;
    if (typeof targetElementOrOnHighlight === 'function') {
      onWordHighlight = targetElementOrOnHighlight;
    } else if (targetElementOrOnHighlight && (targetElementOrOnHighlight.nodeType === 1 || targetElementOrOnHighlight.current)) {
      targetElement = targetElementOrOnHighlight.current || targetElementOrOnHighlight;
    }
    tts.speakWithWordHighlight(text, { 
      targetElement,
      onWordHighlight,
      onFinish, 
      rate: ttsRate, 
      voiceURI: ttsVoiceURI 
    });
  }, [ttsRate, ttsVoiceURI]);

  // Close all modals
  const closeAllModals = useCallback(() => {
    setIsAppSwitcherOpen(false);
    setIsCategoryModalOpen(false);
    setIsConfigModalOpen(false);
    setIsAboutModalOpen(false);
  }, []);

  // Dual-language Translation helper: mainly in Dutch with native language beside it
  const t = useCallback((key) => {
    return getDualUIText(key, nativeLanguage);
  }, [nativeLanguage]);

  // Pure native translation helper
  const tPure = useCallback((key) => {
    return getUIText(key, nativeLanguage);
  }, [nativeLanguage]);

  return (
    <AppContext.Provider value={{
      t,
      tPure,
      // App Navigation
      activeApp,
      setActiveApp: switchApp,
      switchApp,
      currentAppInfo: APPS[activeApp] || APPS.woorden,

      // Settings
      nativeLanguage,
      setNativeLanguage,
      cycleNativeLanguage,
      currentLangInfo: LANGUAGES[nativeLanguage] || LANGUAGES.ar,
      isRtl: LANGUAGES[nativeLanguage]?.rtl || false,

      cefrLevel,
      setCefrLevel,
      cycleCefrLevel,

      theme,
      setTheme,
      fontFamily,
      setFontFamily,
      baseFontSize,
      setBaseFontSize,
      ttsVoiceURI,
      setTtsVoiceURI,
      ttsRate,
      setTtsRate,
      isShuffle,
      toggleShuffle,
      toggleFullscreen,

      // Words specific
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedWordLevel,
      setSelectedWordLevel,

      // Counter state
      counterInfo,
      setCounterInfo,

      // Modals
      isAppSwitcherOpen,
      setIsAppSwitcherOpen,
      isCategoryModalOpen,
      setIsCategoryModalOpen,
      isConfigModalOpen,
      setIsConfigModalOpen,
      isAboutModalOpen,
      setIsAboutModalOpen,
      closeAllModals,

      // Footer
      footerInfo,
      setFooterInfo,
      footerHandlers,
      setFooterHandlers,

      // TTS
      availableVoices,
      speakDutch,
      speakText: speakDutch,
      speakWithWordHighlight: speakSentenceWithHighlight,
      speakSentenceWithHighlight,
      stopSpeech: () => tts.stop()
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
