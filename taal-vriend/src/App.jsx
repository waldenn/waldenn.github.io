import React, { useEffect } from 'react';
import { useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppSwitcherModal from './components/AppSwitcherModal';
import CategoryModal from './components/CategoryModal';
import ConfigModal from './components/ConfigModal';
import AboutModal from './components/AboutModal';

import WoordenApp from './components/apps/WoordenApp';
import KlokApp from './components/apps/KlokApp';
import ZinnenApp from './components/apps/ZinnenApp';
import LuisterenApp from './components/apps/LuisterenApp';
import ReageerApp from './components/apps/ReageerApp';
import AlphabetApp from './components/apps/AlphabetApp';

export default function App() {
  const {
    activeApp,
    footerInfo,
    isAppSwitcherOpen,
    setIsAppSwitcherOpen,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isConfigModalOpen,
    setIsConfigModalOpen,
    isAboutModalOpen,
    setIsAboutModalOpen,
    toggleFullscreen
  } = useApp();

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      const isInput = activeTag === 'input' || activeTag === 'textarea' || activeTag === 'select';

      // ESC closes any modal
      if (e.key === 'Escape') {
        if (isAboutModalOpen) setIsAboutModalOpen(false);
        if (isAppSwitcherOpen) setIsAppSwitcherOpen(false);
        if (isCategoryModalOpen) setIsCategoryModalOpen(false);
        if (isConfigModalOpen) setIsConfigModalOpen(false);
        return;
      }

      // If user is typing in search or input, don't hijack keys
      if (isInput) return;

      // Fullscreen shortcut
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
        return;
      }

      // Config menu shortcut
      if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        setIsConfigModalOpen((prev) => !prev);
        return;
      }

      // Don't handle other shortcuts if any modal is open
      if (isAppSwitcherOpen || isCategoryModalOpen || isConfigModalOpen || isAboutModalOpen) return;

      // Space -> Speak
      if (e.code === 'Space' || e.key === ' ') {
        e.preventDefault();
        if (footerInfo.onSpeak) {
          footerInfo.onSpeak();
        }
        return;
      }

      // Next
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        if (footerInfo.onNext) {
          footerInfo.onNext();
        }
        return;
      }

      // Prev
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (footerInfo.onPrev) {
          footerInfo.onPrev();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    isAppSwitcherOpen,
    setIsAppSwitcherOpen,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    isConfigModalOpen,
    setIsConfigModalOpen,
    isAboutModalOpen,
    setIsAboutModalOpen,
    footerInfo,
    toggleFullscreen
  ]);

  return (
    <div className="app-container">
      <Header />

      {activeApp === 'woorden' && <WoordenApp />}
      {activeApp === 'klok' && <KlokApp />}
      {activeApp === 'zinnen' && <ZinnenApp />}
      {activeApp === 'luisteren' && <LuisterenApp />}
      {activeApp === 'reageer' && <ReageerApp />}
      {activeApp === 'alphabet' && <AlphabetApp />}

      <Footer />

      <AppSwitcherModal />
      <CategoryModal />
      <ConfigModal />
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </div>
  );
}
