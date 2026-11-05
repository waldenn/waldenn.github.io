import React from 'react';
import { useApp } from '../context/AppContext';
import TaalVriendLogo from './TaalVriendLogo';

export default function AboutModal({ isOpen, onClose }) {
  const { switchApp, t, nativeLanguage } = useApp();

  if (!isOpen) return null;

  const handleOpenApp = (appId) => {
    switchApp(appId);
    onClose();
  };

  return (
    <div
      id="aboutModal"
      className="modal-overlay active"
      role="dialog"
      aria-modal="true"
      aria-labelledby="aboutModalTitle"
      onClick={(e) => {
        if (e.target.id === 'aboutModal') onClose();
      }}
    >
      <div className="modal-box modal-box-large about-modal-box">
        <div className="modal-header">
          <div className="about-modal-header-brand">
            <div className="about-logo-badge">
              <TaalVriendLogo size={34} />
            </div>
            <div>
              <h2 id="aboutModalTitle" style={{ margin: 0, fontSize: '1.35rem', fontWeight: 800 }}>TaalVriend</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Jouw interactieve Nederlandse taalcoach</span>
            </div>
          </div>
          <button
            className="modal-close-btn"
            title="Sluiten"
            aria-label="Sluit informatievenster"
            onClick={onClose}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="modal-body about-modal-body" style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          {/* Mission intro */}
          <div className="about-hero-banner">
            <p className="about-mission-text">
              <strong>TaalVriend</strong> is een 100% offline, privacy-vriendelijke webapplicatie die speciaal is ontworpen voor nieuwkomers, inburgeraars en taalstudenten om snel, speels en zelfstandig Nederlands te leren op ERK-niveaus <strong>Pre-A1 tot en met C2</strong>.
            </p>
          </div>

          {/* 6 Apps Showcase */}
          <section className="about-section">
            <h3 className="about-subheading">📚 {t('learningModules')}</h3>
            <div className="about-apps-grid">
              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Woorden Leren"
                onClick={() => handleOpenApp('woorden')}
              >
                <span className="about-card-icon">📖</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Woorden Leren</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>1.540+ essentiële Nederlandse woorden met lidwoorden, afbeeldingen, vertalingen en vertaalde voorbeeldzinnen met actieve uitspraakcursor.</p>
                </div>
              </div>

              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Zinnen Oefenen"
                onClick={() => handleOpenApp('zinnen')}
              >
                <span className="about-card-icon">💬</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Zinnen Oefenen</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>590+ praktische zinnen in alledaagse situaties (boodschappen, huisarts, gemeente, werk) ingedeeld per ERK-taalniveau.</p>
                </div>
              </div>

              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Luistervaardigheid"
                onClick={() => handleOpenApp('luisteren')}
              >
                <span className="about-card-icon">🎧</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Luistervaardigheid</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>120+ gesproken luisterfragmenten. Luister eerst aandachtig met geluidsgolven en onthul de Nederlandse tekst en vertaling met de spatiebalk.</p>
                </div>
              </div>

              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Luister en Reageer"
                onClick={() => handleOpenApp('reageer')}
              >
                <span className="about-card-icon">🎯</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Luister en Reageer</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>700 interactieve meerkeuzevragen in realistische praktijksituaties. Kies met toetsen 1-4 en ontvang directe uitleg in je moedertaal.</p>
                </div>
              </div>

              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Klok Kijken"
                onClick={() => handleOpenApp('klok')}
              >
                <span className="about-card-icon">⏰</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Klok Kijken</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>144 kloktijden in 5-minuten intervallen. Bekijk eerst de analoge klokwijzers en onthul vervolgens de juiste uitspraak en schrijfwijze (zoals <em>één uur</em>).</p>
                </div>
              </div>

              <div
                className="about-app-card"
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer' }}
                title="Open Alfabet & Klanken"
                onClick={() => handleOpenApp('alphabet')}
              >
                <span className="about-card-icon">🔤</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                    <h4>Alfabet & Klanken</h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>Open →</span>
                  </div>
                  <p>38 Nederlandse letters en typische klanken (zoals <em>ui, oe, eu, ij</em>) met vertaalde mondtechniek en klikbare voorbeeldkaarten.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Languages Supported */}
          <section className="about-section">
            <h3 className="about-subheading">🌍 Beschikbare Moedertalen</h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-sentence)', marginBottom: '10px' }}>
              Alle woorden, zinnen en feedback zijn volledig vertaald in 5 talen:
            </p>
            <div className="about-lang-pills">
              <span className="about-lang-pill">🇸🇦 العربية (Standaard Arabisch)</span>
              <span className="about-lang-pill">🇪🇷 ትግርኛ (Tigrinya)</span>
              <span className="about-lang-pill">🇪🇹 Afaan Oromoo (Oromo)</span>
              <span className="about-lang-pill">🇸🇴 Soomaali (Somalisch)</span>
              <span className="about-lang-pill">🇬🇧 English (Engels)</span>
            </div>
          </section>

          {/* Shortcuts Guide */}
          <section className="about-section">
            <h3 className="about-subheading">⌨️ Handige Sneltoetsen</h3>
            <div className="about-shortcuts-list">
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">SPATIE</kbd>
                <span>Uitspreken / onthullen / volgend woord in Woorden-app</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">↑</kbd> of <kbd className="btn-kbd">←</kbd>
                <span>Vorige regel / zin / situatie (spreekt ook direct uit)</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">↓</kbd> of <kbd className="btn-kbd">→</kbd>
                <span>Volgende regel / zin / situatie</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">1</kbd> <kbd className="btn-kbd">2</kbd> <kbd className="btn-kbd">3</kbd> <kbd className="btn-kbd">4</kbd>
                <span>Beantwoord vraag in de Reageer-app</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">F</kbd>
                <span>Volledig scherm in-/uitschakelen</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">M</kbd>
                <span>Configuratiemenu openen (taal, thema, stem, snelheid)</span>
              </div>
              <div className="about-shortcut-row">
                <kbd className="btn-kbd">ESC</kbd>
                <span>Sluit elk open menu of venster</span>
              </div>
            </div>
          </section>

          {/* Privacy & Offline */}
          <section className="about-section about-privacy-card">
            <h4>🔒 {t('offlinePrivacyTitle')}</h4>
            <p>{t('offlinePrivacyDesc')}</p>
          </section>

          <div style={{ textAlign: 'center', marginTop: '16px' }}>
            <button className="footer-action-btn footer-btn-primary" style={{ margin: '0 auto' }} onClick={onClose}>
              <span>{t('closeUnderstood')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
