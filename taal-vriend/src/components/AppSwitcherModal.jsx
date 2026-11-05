import React from 'react';
import { useApp } from '../context/AppContext';
import { APPS } from '../constants/languages';

const APP_ORDER = ['woorden', 'zinnen', 'luisteren', 'reageer', 'klok', 'alphabet'];

export default function AppSwitcherModal() {
  const { isAppSwitcherOpen, setIsAppSwitcherOpen, activeApp, setActiveApp, nativeLanguage, t } = useApp();

  if (!isAppSwitcherOpen) return null;

  const handleSelectApp = (appId) => {
    setActiveApp(appId);
    setIsAppSwitcherOpen(false);
  };

  return (
    <div
      id="appSwitcherModal"
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="appSwitcherTitle"
      onClick={(e) => {
        if (e.target.id === 'appSwitcherModal') setIsAppSwitcherOpen(false);
      }}
    >
      <div className="modal-box modal-box-large">
        <div className="modal-header">
          <h2 id="appSwitcherTitle">{t('chooseApp')}</h2>
          <button
            id="appSwitcherCloseBtn"
            className="modal-close-btn"
            title={t('closeBtn')}
            aria-label={t('closeBtn')}
            onClick={() => setIsAppSwitcherOpen(false)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="modal-body">
          <p className="config-help">Kies wat je vandaag wilt oefenen:</p>
          <div className="app-switcher-grid">
            {APP_ORDER.map((appId) => {
              const app = APPS[appId];
              const nativeName = app.translations[nativeLanguage] || '';
              const isActive = activeApp === appId;
              const colorClass =
                appId === 'woorden'
                  ? 'words-color'
                  : appId === 'zinnen'
                  ? 'sentences-color'
                  : appId === 'luisteren'
                  ? 'listening-color'
                  : appId === 'reageer'
                  ? 'respond-color'
                  : appId === 'klok'
                  ? 'clock-color'
                  : 'alphabet-color';

              return (
                <button
                  key={appId}
                  className={`app-choice-card ${isActive ? 'active' : ''}`}
                  data-app-id={appId}
                  onClick={() => handleSelectApp(appId)}
                >
                  <div className={`app-choice-icon-box ${colorClass}`}>
                    <span>{app.icon}</span>
                  </div>
                  <div className="app-choice-content">
                    <div className="app-choice-top">
                      <h3>
                        {app.name}{' '}
                        {nativeName && (
                          <span className="app-choice-native">({nativeName})</span>
                        )}
                      </h3>
                      <span className="app-choice-badge">{app.badge}</span>
                    </div>
                    <p>{app.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
