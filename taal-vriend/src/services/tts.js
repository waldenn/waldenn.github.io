class TTSService {
  constructor() {
    this.currentUtterance = null;
    this.fallbackTimer = null;
    this.activeUtteranceId = 0;
    this.availableVoices = [];
    this.initVoices();
  }

  initVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const load = () => {
      try {
        this.availableVoices = window.speechSynthesis
          .getVoices()
          .filter((v) => v.lang && (v.lang.startsWith('nl') || v.lang.includes('NL')));
      } catch (e) {
        this.availableVoices = [];
      }
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
  }

  getDutchVoices() {
    if (
      this.availableVoices.length === 0 &&
      typeof window !== 'undefined' &&
      'speechSynthesis' in window
    ) {
      try {
        this.availableVoices = window.speechSynthesis
          .getVoices()
          .filter((v) => v.lang && (v.lang.startsWith('nl') || v.lang.includes('NL')));
      } catch (e) {
        this.availableVoices = [];
      }
    }
    return this.availableVoices;
  }

  stop() {
    this.activeUtteranceId++;
    if (this.fallbackTimer) {
      clearTimeout(this.fallbackTimer);
      clearInterval(this.fallbackTimer);
      this.fallbackTimer = null;
    }
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (this.currentUtterance) {
      // Detach handlers so canceled utterance doesn't fire stale events
      this.currentUtterance.onstart = null;
      this.currentUtterance.onend = null;
      this.currentUtterance.onerror = null;
      this.currentUtterance.onboundary = null;
      this.currentUtterance = null;
    }

    try {
      window.speechSynthesis.cancel();
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
    } catch (e) {
      // ignore
    }
  }

  speakWithWordHighlight(
    text,
    { targetElement = null, onWordHighlight = null, onFinish = null, rate = 1.0, voiceURI = '' } = {}
  ) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) {
      if (onFinish) onFinish();
      return;
    }

    // Stop any ongoing speech and increment active utterance ID
    this.stop();
    const myUtteranceId = ++this.activeUtteranceId;

    const cleanText = text.trim();
    const wordsList = cleanText.split(/\s+/).filter(Boolean);
    if (wordsList.length === 0) {
      if (onFinish) onFinish();
      return;
    }

    // Prepare target element DOM tokens if provided
    let tokenSpans = [];
    if (targetElement && targetElement.nodeType === 1) {
      targetElement.innerHTML = '';
      wordsList.forEach((word, idx) => {
        const span = document.createElement('span');
        span.className = 'tts-word-token';
        span.setAttribute('data-word-index', String(idx));
        span.textContent = word + (idx < wordsList.length - 1 ? ' ' : '');
        targetElement.appendChild(span);
        tokenSpans.push(span);
      });
    }

    const highlightWord = (idx) => {
      if (this.activeUtteranceId !== myUtteranceId) return;
      if (tokenSpans.length > 0) {
        tokenSpans.forEach((sp, i) => {
          sp.classList.toggle('tts-word-highlight', i === idx);
        });
      }
      if (onWordHighlight) {
        onWordHighlight(idx);
      }
    };

    const clearHighlights = () => {
      if (this.activeUtteranceId !== myUtteranceId) return;
      if (tokenSpans.length > 0) {
        tokenSpans.forEach((sp) => sp.classList.remove('tts-word-highlight'));
      }
      if (onWordHighlight) {
        onWordHighlight(-1);
      }
    };

    // Calculate dynamic word durations based on word length for smooth, natural pacing
    const effectiveRate = Math.max(0.5, Math.min(2.0, rate || 1.0));
    const wordWeights = wordsList.map((w) => Math.max(3, w.length));
    const totalWeight = wordWeights.reduce((a, b) => a + b, 0);
    // Baseline speech duration: ~65ms per weight unit divided by rate
    const totalEstDuration = Math.max(800, (totalWeight * 70) / effectiveRate);
    const wordDurations = wordWeights.map((weight) =>
      Math.max(180, Math.min(950, (weight / totalWeight) * totalEstDuration))
    );

    let currentWordIdx = 0;
    let timerRunning = false;

    const scheduleNextWord = () => {
      if (this.activeUtteranceId !== myUtteranceId) return;
      if (currentWordIdx >= wordsList.length - 1) return;

      const dur = wordDurations[currentWordIdx] || 300;
      this.fallbackTimer = setTimeout(() => {
        if (this.activeUtteranceId !== myUtteranceId) return;
        currentWordIdx++;
        highlightWord(currentWordIdx);
        scheduleNextWord();
      }, dur);
    };

    const startTimer = () => {
      if (timerRunning || this.activeUtteranceId !== myUtteranceId) return;
      timerRunning = true;
      highlightWord(currentWordIdx);
      scheduleNextWord();
    };

    // Chrome bug prevention: small 35ms delay after cancel before creating & speaking
    setTimeout(() => {
      if (this.activeUtteranceId !== myUtteranceId) return;

      try {
        if (window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        }
      } catch (e) {}

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'nl-NL';
      utterance.rate = effectiveRate;

      const dutchVoices = this.getDutchVoices();
      if (voiceURI && dutchVoices.length > 0) {
        const match = dutchVoices.find((v) => v.voiceURI === voiceURI);
        if (match) utterance.voice = match;
      }

      this.currentUtterance = utterance;
      window._currentUtterance = utterance;

      utterance.onstart = () => {
        if (this.activeUtteranceId !== myUtteranceId) return;
        currentWordIdx = 0;
        startTimer();
      };

      utterance.onboundary = (e) => {
        if (this.activeUtteranceId !== myUtteranceId) return;
        if (e.name === 'word' && wordsList.length > 0) {
          let cumulative = 0;
          let foundIdx = 0;
          for (let i = 0; i < wordsList.length; i++) {
            const len = wordsList[i].length + 1;
            if (e.charIndex >= cumulative && e.charIndex < cumulative + len) {
              foundIdx = i;
              break;
            }
            cumulative += len;
          }
          if (foundIdx !== currentWordIdx) {
            currentWordIdx = foundIdx;
            highlightWord(currentWordIdx);
            if (this.fallbackTimer) clearTimeout(this.fallbackTimer);
            scheduleNextWord();
          }
        }
      };

      const handleEnd = () => {
        if (this.activeUtteranceId !== myUtteranceId) return;
        if (this.fallbackTimer) {
          clearTimeout(this.fallbackTimer);
          this.fallbackTimer = null;
        }
        clearHighlights();
        this.currentUtterance = null;
        if (onFinish) onFinish();
      };

      utterance.onend = handleEnd;
      utterance.onerror = (err) => {
        // If interrupted because a new speech started, activeUtteranceId already changed
        if (this.activeUtteranceId !== myUtteranceId) return;
        handleEnd();
      };

      try {
        window.speechSynthesis.speak(utterance);
        // Fallback in case onstart does not fire within 120ms (Chrome quirk)
        setTimeout(() => {
          if (this.activeUtteranceId === myUtteranceId && !timerRunning) {
            startTimer();
          }
        }, 120);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
        handleEnd();
      }
    }, 35);
  }

  speak(text, options = {}) {
    this.speakWithWordHighlight(text, options);
  }

  speakText(text, options = {}) {
    this.speakWithWordHighlight(text, options);
  }
}

export const tts = new TTSService();
