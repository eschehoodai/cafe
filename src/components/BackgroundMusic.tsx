import React, { useEffect, useRef } from 'react';

/**
 * Headless Background Music Component:
 * - Kein sichtbarer Mediaplayer / kein UI-Element
 * - Ultra-aggressiver Autoplay-Start im Hintergrund
 * - Globales Abfangen jeder Nutzerinteraktion (Klick, Touch, Scroll, Taste) für Sofort-Start
 * - Ultra-aggressives Pausieren bei Tab-Verlassen (visibilitychange, blur, pagehide, Watchdog)
 * - Automatisches Fortsetzen beim Zurückkehren in den Tab
 */
export const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wasPlayingBeforeBlurRef = useRef<boolean>(true);

  useEffect(() => {
    // Erstelle und konfiguriere das Audio-Element
    const audio = new Audio('/backgroundmusic.mp3');
    audioRef.current = audio;
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0.5; // Angenehme, klare Hintergrundlautstärke

    // Hilfsfunktion: Versuche aggressiv abzuspielen
    const tryPlay = () => {
      if (!audio) return;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            wasPlayingBeforeBlurRef.current = true;
          })
          .catch(() => {
            // Browser Autoplay Policy blockiert noch bis zur ersten Nutzergeste
          });
      }
    };

    // 1. Sofortiger Startversuch direkt beim Laden
    tryPlay();

    // 2. Aggressive Interaktions-Trigger:
    // Jeder Klick, Touch, Scroll, Tastendruck oder Mausbewegung startet die Musik sofort
    const interactionEvents: (keyof WindowEventMap)[] = [
      'click',
      'touchstart',
      'touchend',
      'pointerdown',
      'mousedown',
      'keydown',
      'scroll',
      'wheel',
    ];

    const handleUserInteraction = () => {
      if (audio.paused && !document.hidden) {
        tryPlay();
      }
    };

    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleUserInteraction, { capture: true, passive: true });
    });

    // 3. Ultra-aggressives Stoppen beim Verlassen des Tabs oder Fensters
    const stopImmediately = () => {
      if (!audio.paused) {
        wasPlayingBeforeBlurRef.current = true;
        audio.pause();
      }
    };

    const resumeIfVisible = () => {
      if (wasPlayingBeforeBlurRef.current && !document.hidden) {
        tryPlay();
      }
    };

    // Tab-Sichtbarkeit (Wechsel zu anderem Tab oder Minimieren)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopImmediately();
      } else {
        resumeIfVisible();
      }
    };

    // Fenster verliert Fokus (z.B. Klick auf anderes Programm oder Taskleiste)
    const handleWindowBlur = () => {
      stopImmediately();
    };

    // Fenster erhält Fokus zurück
    const handleWindowFocus = () => {
      if (!document.hidden) {
        resumeIfVisible();
      }
    };

    // Seite wird verlassen / entladen
    const handlePageHide = () => {
      stopImmediately();
    };

    // Registrierung aller Ereignisse in der Capture-Phase für schnellste Reaktion
    document.addEventListener('visibilitychange', handleVisibilityChange, true);
    window.addEventListener('blur', handleWindowBlur, true);
    window.addEventListener('focus', handleWindowFocus, true);
    window.addEventListener('pagehide', handlePageHide, true);
    window.addEventListener('beforeunload', stopImmediately, true);

    // 4. Watchdog-Intervall (prüft alle 150ms als Backup gegen jegliche Audio-Lecks bei verdecktem Tab)
    const watchdogInterval = window.setInterval(() => {
      if (document.hidden && !audio.paused) {
        stopImmediately();
      }
    }, 150);

    return () => {
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleUserInteraction, { capture: true });
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange, true);
      window.removeEventListener('blur', handleWindowBlur, true);
      window.removeEventListener('focus', handleWindowFocus, true);
      window.removeEventListener('pagehide', handlePageHide, true);
      window.removeEventListener('beforeunload', stopImmediately, true);
      clearInterval(watchdogInterval);

      audio.pause();
      audio.src = '';
    };
  }, []);

  // Rendert keinerlei UI – vollständig unsichtbar im Hintergrund
  return null;
};
