import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { GenussLounge } from './components/GenussLounge';
import { ReservationSection } from './components/ReservationSection';
import { JobsPage } from './components/JobsPage';
import { Footer } from './components/Footer';
import { LegalModal, LegalTab } from './components/LegalModal';
import { BackgroundMusic } from './components/BackgroundMusic';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'cafe' | 'jobs'>(() => {
    return window.location.hash === '#jobs' ? 'jobs' : 'cafe';
  });

  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('datenschutz');

  // Synchronize view with URL hash (supports browser back/forward and direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#jobs') {
        setCurrentView('jobs');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setCurrentView('cafe');
        if (hash && hash !== '#cafe') {
          setTimeout(() => {
            const el = document.querySelector(hash);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
            }
          }, 60);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (view: 'cafe' | 'jobs', anchor?: string) => {
    setCurrentView(view);
    if (view === 'jobs') {
      window.location.hash = '#jobs';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = anchor || '#cafe';
      if (anchor && anchor !== '#cafe') {
        setTimeout(() => {
          const el = document.querySelector(anchor);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleOpenLegal = (tab: LegalTab) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  return (
    <div className="app-root">
      {/* 1. Header & Navigation (mit synchronisiertem View & Audio-Chime) */}
      <Header currentView={currentView} onNavigate={handleNavigate} />

      <main>
        {currentView === 'jobs' ? (
          /* Rubrik Jobs: Eigene Seite mit minimalistischem Bewerbungsformular */
          <JobsPage
            onBack={() => handleNavigate('cafe', '#cafe')}
            onOpenLegal={handleOpenLegal}
          />
        ) : (
          /* Hauptseite Café Praha */
          <>
            {/* 1. Hero Section mit Video-Background & Platzhalter (Schritt 1) */}
            <Hero />

            {/* 2. Genussspezialitäten Lounge (Konzept 3 - Schritt 2) */}
            <GenussLounge />

            {/* 3. Section: Buchungs- & Reservierungsformular (Schritt 3) */}
            <ReservationSection />
          </>
        )}
      </main>

      {/* 4. Footer & Rechtliches mit Fokus auf Infos & Reservierung */}
      <Footer onNavigate={handleNavigate} />

      {/* Barrierefreies Legal-Modal für Datenschutz aus dem Bewerbungsformular */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
        onSelectTab={(tab) => setLegalModalTab(tab)}
      />

      {/* 5. Kaffeehaus-Hintergrundmusik mit aggressivem Tab-Departure Stop & Autoplay */}
      <BackgroundMusic />
    </div>
  );
};

export default App;
