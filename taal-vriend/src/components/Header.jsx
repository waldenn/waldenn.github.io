import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import TaalVriendLogo from './TaalVriendLogo';

export default function Header({ wordsCategoryCount }) {
  const {
    t,
    activeApp,
    currentAppInfo,
    setIsAppSwitcherOpen,
    counterInfo,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setIsCategoryModalOpen,
    cefrLevel,
    cycleCefrLevel,
    nativeLanguage,
    currentLangInfo,
    cycleNativeLanguage,
    isShuffle,
    toggleShuffle,
    setIsConfigModalOpen,
    setIsAboutModalOpen
  } = useApp();

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const isWords = activeApp === 'woorden';

  return (
    <header className="app-header">
      {/* 1. Brand Logo & App Switcher */}
      <div className="header-left">
        <button
          type="button"
          className="header-brand brand-logo-btn"
          aria-label={t('aboutTitle')}
          title={t('aboutTitle')}
          onClick={() => setIsAboutModalOpen(true)}
        >
          <div className="brand-logo-glow">
            <TaalVriendLogo size={36} />
          </div>
          <div className="brand-text">
            <span className="brand-title">TaalVriend</span>
          </div>
        </button>

        {/* App Switcher Pill Button */}
        <button
          id="appSwitcherBtn"
          className="header-pill-btn app-switcher-pill"
          title={t('chooseApp')}
          aria-label={t('chooseApp')}
          onClick={() => setIsAppSwitcherOpen(true)}
        >
          <span className="app-pill-icon" id="currentAppIcon">{currentAppInfo.icon}</span>
          <span id="currentAppName">
            {currentAppInfo.name}
            {nativeLanguage !== 'nl' && currentAppInfo.translations?.[nativeLanguage] && (
              <span className="app-pill-native"> ({currentAppInfo.translations[nativeLanguage]})</span>
            )}
          </span>
          <svg className="chevron-down" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        <div id="counterBadge" className="counter-badge" title={t('positionCounter')}>
          <span id="activeRowNumber">{counterInfo?.current || 1}</span> / <span id="totalRowsCount">{counterInfo?.total || 1}</span>
        </div>
      </div>

      {/* 2. Middle Controls (Search for Words App) */}
      <div className="header-center">
        {isWords && (
          <div className="search-box-container" id="headerSearchContainer">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              id="searchInput"
              className="search-input"
              placeholder={t('searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label={t('searchPlaceholder')}
            />
            {searchQuery && (
              <button
                id="searchClearBtn"
                className="search-clear-btn"
                title={t('clearSearch')}
                aria-label={t('clearSearch')}
                onClick={() => setSearchQuery('')}
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* 3. Right Quick Controls & Menus */}
      <div className="header-right">
        {/* Category Header Button (Words App only) */}
        {isWords && (
          <button
            id="categoryHeaderBtn"
            className="header-pill-btn"
            title={t('categories')}
            aria-label={t('categories')}
            onClick={() => setIsCategoryModalOpen(true)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span id="categoryHeaderName">
              {selectedCategory === 'all' ? t('allCategories') : selectedCategory}
            </span>
            {wordsCategoryCount !== undefined && (
              <span id="categoryCountBadge" className="badge-mini">{wordsCategoryCount}</span>
            )}
          </button>
        )}

        {/* CEFR Proficiency Level Quick Selector */}
        <button
          id="cefrHeaderBtn"
          className="header-pill-btn"
          title={t('cefrSetting')}
          aria-label={t('cefrSetting')}
          onClick={cycleCefrLevel}
        >
          <span id="cefrHeaderTag" className="badge-mini badge-cefr">{cefrLevel}</span>
          <span id="cefrHeaderName" className="cefr-lbl">{t('level')}</span>
        </button>

        {/* Native Language Quick Selector */}
        <button
          id="langQuickSelectBtn"
          className="header-pill-btn"
          title={t('nativeLangSetting')}
          aria-label={t('nativeLangSetting')}
          onClick={cycleNativeLanguage}
        >
          <span id="langQuickFlag">{currentLangInfo.flag}</span>
          <span id="langQuickName">{currentLangInfo.name}</span>
        </button>

        {/* Shuffle / Random Toggle (Words App only) */}
        {isWords && (
          <button
            id="shuffleHeaderBtn"
            className={`header-icon-btn ${isShuffle ? 'active' : ''}`}
            title={t('shuffle')}
            aria-label={t('shuffle')}
            onClick={toggleShuffle}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="16 3 21 3 21 8"></polyline>
              <line x1="4" y1="20" x2="21" y2="3"></line>
              <polyline points="21 16 21 21 16 21"></polyline>
              <line x1="15" y1="15" x2="21" y2="21"></line>
              <line x1="4" y1="4" x2="9" y2="9"></line>
            </svg>
          </button>
        )}

        {/* Fullscreen Button */}
        <button
          id="fullscreenBtn"
          className="header-icon-btn"
          title={t('fullscreen')}
          aria-label={t('fullscreen')}
          onClick={toggleFullscreen}
        >
          <span id="fullscreenIcon">
            {isFullscreen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
              </svg>
            )}
          </span>
        </button>

        {/* Config Menu Button */}
        <button
          id="configBtn"
          className="header-icon-btn"
          title={t('settings')}
          aria-label={t('settings')}
          onClick={() => setIsConfigModalOpen(true)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
