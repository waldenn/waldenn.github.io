import React from 'react';
import { useApp } from '../context/AppContext';

export default function Footer() {
  const { activeApp, footerInfo, t } = useApp();

  const isListeningApp = activeApp === 'luisteren' || footerInfo.hideControls;

  return (
    <footer className="app-footer-bar" role="contentinfo">
      <div className="footer-left">
        {!isListeningApp && (
          <>
            <button
              id="footerSpeakBtn"
              className="footer-action-btn footer-btn-primary"
              title={`${t('speak')} (${t('spaceKey')})`}
              onClick={() => footerInfo.onSpeak && footerInfo.onSpeak()}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span className="btn-label">{t('speak')}</span>
              <kbd className="btn-kbd">{t('spaceKey')}</kbd>
            </button>

            <div className="footer-nav-group">
              <button
                id="btnPrevRow"
                className="footer-nav-btn"
                title={`${t('prev')} (↑ / ←)`}
                aria-label={t('prev')}
                onClick={() => footerInfo.onPrev && footerInfo.onPrev()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
                <kbd className="kbd-subtle">↑</kbd>
              </button>
              <button
                id="btnNextRow"
                className="footer-nav-btn"
                title={`${t('next')} (↓ / →)`}
                aria-label={t('next')}
                onClick={() => footerInfo.onNext && footerInfo.onNext()}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <kbd className="kbd-subtle">↓</kbd>
              </button>
            </div>
          </>
        )}
      </div>

      <div className="footer-center">
        <div className="footer-shortcuts-hint">
          <span className="hint-item"><kbd>{t('spaceKey')}</kbd> {t('speak')}</span>
          <span className="hint-divider">•</span>
          <span className="hint-item"><kbd>↓</kbd> / <kbd>→</kbd> {t('next')}</span>
          <span className="hint-divider">•</span>
          <span className="hint-item"><kbd>↑</kbd> / <kbd>←</kbd> {t('prev')}</span>
          <span className="hint-divider">•</span>
          <span className="hint-item"><kbd>F</kbd> {t('fullscreen')}</span>
        </div>
      </div>

      <div className="footer-right">
        <span id="footerCategoryText" className="footer-category-tag">
          {footerInfo.text || ''}
        </span>
      </div>
    </footer>
  );
}
