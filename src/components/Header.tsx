import React, { useState, useEffect, useRef } from 'react';
import { Phone, Menu, X, ArrowUpRight, ArrowRight, Coffee, UtensilsCrossed, Briefcase } from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

export interface HeaderProps {
  currentView?: 'cafe' | 'jobs';
  onNavigate?: (view: 'cafe' | 'jobs', anchor?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentView = 'cafe', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(currentView === 'jobs' ? 'jobs' : 'cafe');
  const [steamBoost, setSteamBoost] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const currentHour = new Date().getHours();
  const isCurrentlyOpen = currentHour >= 9 && currentHour < 18;

  useEffect(() => {
    setActiveTab(currentView === 'jobs' ? 'jobs' : 'cafe');
  }, [currentView]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatically close mobile menu if resized to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 960) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Subtle porcelain chime using Web Audio API
  const playChime = (freq = 880) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          audioCtxRef.current = new AudioCtx();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      if (audioCtxRef.current) {
        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.45);
      }
    } catch {
      // Audio not supported or blocked by browser gesture policy
    }
  };

  const handleSteamClick = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setSteamBoost(true);
    playChime(980);
    setActiveTab('cafe');
    if (onNavigate) {
      onNavigate('cafe', '#cafe');
    } else {
      window.location.hash = '#cafe';
    }
    setTimeout(() => setSteamBoost(false), 2600);
  };

  return (
    <>
      <header className={`site-header-dock-wrap ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container dock-outer-container">

          {/* Main Floating Espresso-Dock Navigation */}
          <nav className="espresso-dock" aria-label="Café Praha Hauptnavigation">

            {/* 1. MENÜPUNKT GANZ LINKS: Café Praha Button (führt immer zur Startseite) */}
            <a
              href="#cafe"
              className="dock-brand-btn"
              onClick={handleSteamClick}
              aria-label="Café Praha Startseite"
              title="Café Praha – Zur Startseite"
            >
              <div className="cup-svg-box">
                <svg
                  viewBox="0 0 32 32"
                  width="28"
                  height="28"
                  className={`steaming-cup-svg ${steamBoost ? 'steam-boosted' : ''}`}
                >
                  {/* Aufsteigende organische SVG-Dampffäden */}
                  <path className="steam-path steam-1" d="M10,12 C9,9 12,7 10,4" />
                  <path className="steam-path steam-2" d="M15,13 C14,10 17,8 15,3" />
                  <path className="steam-path steam-3" d="M20,12 C19,9 22,7 20,4" />

                  {/* Kaffeetasse */}
                  <path
                    d="M7 14 H23 V22 C23 25.3 20.3 28 17 28 H13 C9.7 28 7 25.3 7 22 Z"
                    className="cup-body"
                  />
                  {/* Untertasse */}
                  <line x1="5" y1="29" x2="25" y2="29" className="cup-saucer-line" />
                  {/* Henkel */}
                  <path
                    d="M23 16 C25.5 16 26.5 18 26.5 19.5 C26.5 21 25.5 22.5 23 22.5"
                    className="cup-handle-path"
                  />
                </svg>
              </div>
              <span className="dock-brand-name">Café Praha</span>
            </a>

            {/* Desktop Navigation Links */}
            <ul className="dock-nav-items" role="menubar">

              {/* 2. MENÜPUNKT: Genussspezialitäten */}
              <li className="dock-item" role="none">
                <a
                  href="#genuss"
                  className={`dock-link ${activeTab === 'genuss' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('genuss');
                    playChime(740);
                    if (onNavigate) {
                      onNavigate('cafe', '#genuss');
                    } else {
                      window.location.hash = '#genuss';
                    }
                  }}
                  role="menuitem"
                >
                  <span className="bean-indicator" aria-hidden="true" />
                  <span>Genussspezialitäten</span>
                </a>
              </li>

              {/* 3. MENÜPUNKT: Jobs */}
              <li className="dock-item" role="none">
                <a
                  href="#jobs"
                  className={`dock-link ${activeTab === 'jobs' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab('jobs');
                    playChime(960);
                    if (onNavigate) {
                      onNavigate('jobs');
                    } else {
                      window.location.hash = '#jobs';
                    }
                  }}
                  role="menuitem"
                >
                  <span className="bean-indicator" aria-hidden="true" />
                  <span>Jobs</span>
                </a>
              </li>

            </ul>

            {/* Aktionen Rechts: Telefon & Reservieren */}
            <div className="dock-actions">
              <a
                href={`tel:${CAFE_INFO.contact.phone}`}
                className="dock-phone-btn"
                title="Rufen Sie uns direkt an"
                onClick={() => playChime(700)}
              >
                <Phone size={14} className="text-gold" />
                <span className="dock-phone-text">03583 7964364</span>
              </a>

              <a
                href="#reservierung"
                className="dock-cta-btn"
                title="Tisch im Café Praha online reservieren"
                onClick={(e) => {
                  e.preventDefault();
                  playChime(1040);
                  if (onNavigate) {
                    onNavigate('cafe', '#reservierung');
                  } else {
                    window.location.hash = '#reservierung';
                  }
                }}
              >
                <span>Reservieren</span>
                <ArrowUpRight size={15} />
              </a>

              {/* Mobile Burger Toggle */}
              <button
                className="dock-burger-btn"
                onClick={() => {
                  setMobileMenuOpen(!mobileMenuOpen);
                  playChime(600);
                }}
                aria-label={mobileMenuOpen ? 'Menü schließen' : 'Menü öffnen'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </nav>

        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Off-Canvas Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        {/* Subtle Ambient Background Warmth */}
        <div className="mobile-drawer-bg-glow" aria-hidden="true" />

        {/* Drawer Header */}
        <div className="mobile-drawer-header">
          <a
            href="#cafe"
            className="dock-brand-btn"
            style={{ padding: '0.4rem 0.8rem' }}
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              playChime(880);
              if (onNavigate) {
                onNavigate('cafe', '#cafe');
              } else {
                window.location.hash = '#cafe';
              }
            }}
          >
            <div className="cup-svg-box">
              <svg viewBox="0 0 32 32" width="24" height="24">
                <path className="steam-path steam-1" d="M10,12 C9,9 12,7 10,4" />
                <path className="steam-path steam-2" d="M15,13 C14,10 17,8 15,3" />
                <path className="steam-path steam-3" d="M20,12 C19,9 22,7 20,4" />
                <path d="M7 14 H23 V22 C23 25.3 20.3 28 17 28 H13 C9.7 28 7 25.3 7 22 Z" className="cup-body" />
                <line x1="5" y1="29" x2="25" y2="29" className="cup-saucer-line" />
                <path d="M23 16 C25.5 16 26.5 18 26.5 19.5 C26.5 21 25.5 22.5 23 22.5" className="cup-handle-path" />
              </svg>
            </div>
            <span className="dock-brand-name" style={{ fontSize: '1.2rem' }}>Café Praha</span>
          </a>

          <button
            className="mobile-drawer-close-btn"
            onClick={() => {
              setMobileMenuOpen(false);
              playChime(600);
            }}
            aria-label="Menü schließen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Scrollable Content */}
        <div className="mobile-drawer-body">
          {/* Sektion 1: Die 4 Menüpunkte (Edles Design ohne Textspielereien) */}
          <nav className="mobile-drawer-links" aria-label="Hauptmenü">
            {/* 1. Startseite */}
            <a
              href="#cafe"
              className={`mobile-nav-card mobile-stagger-1 ${activeTab === 'cafe' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                playChime(660);
                if (onNavigate) {
                  onNavigate('cafe', '#cafe');
                } else {
                  window.location.hash = '#cafe';
                }
              }}
            >
              <div className="mobile-nav-card-icon">
                <Coffee size={18} />
              </div>
              <span className="mobile-nav-card-title">Café Praha (Startseite)</span>
              <ArrowRight size={16} className="mobile-nav-card-arrow" aria-hidden="true" />
            </a>

            {/* 2. Genussspezialitäten */}
            <a
              href="#genuss"
              className={`mobile-nav-card mobile-stagger-2 ${activeTab === 'genuss' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                playChime(740);
                if (onNavigate) {
                  onNavigate('cafe', '#genuss');
                } else {
                  window.location.hash = '#genuss';
                }
              }}
            >
              <div className="mobile-nav-card-icon">
                <UtensilsCrossed size={18} />
              </div>
              <span className="mobile-nav-card-title">Genussspezialitäten</span>
              <ArrowRight size={16} className="mobile-nav-card-arrow" aria-hidden="true" />
            </a>

            {/* 3. Jobs */}
            <a
              href="#jobs"
              className={`mobile-nav-card mobile-stagger-3 ${activeTab === 'jobs' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                playChime(910);
                if (onNavigate) {
                  onNavigate('jobs');
                } else {
                  window.location.hash = '#jobs';
                }
              }}
            >
              <div className="mobile-nav-card-icon">
                <Briefcase size={18} />
              </div>
              <span className="mobile-nav-card-title">Jobs</span>
              <ArrowRight size={16} className="mobile-nav-card-arrow" aria-hidden="true" />
            </a>
          </nav>

          {/* Sektion 2: Öffnungszeiten & Live-Status (Fokus-Bereich) */}
          <div className="mobile-hours-card mobile-stagger-4">
            <div className="mobile-hours-header">
              <div className="mobile-hours-status">
                <span className={`live-dot ${isCurrentlyOpen ? 'open' : 'closed'}`} />
                <span className="live-status-label">
                  {isCurrentlyOpen ? 'Jetzt geöffnet' : 'Geschlossen'}
                </span>
                <span className="live-status-sub">
                  {isCurrentlyOpen ? '• bis 18:00 Uhr' : '• öffnet um 9:00 Uhr'}
                </span>
              </div>
            </div>
            <div className="mobile-hours-rows">
              <div className="mobile-hours-item">
                <span className="hours-kind">Café & Spezialitäten</span>
                <span className="hours-time">Täglich 9:00 – 18:00 Uhr</span>
              </div>
              <div className="mobile-hours-item">
                <span className="hours-kind">Frühstückszeit</span>
                <span className="hours-time">Mo–So 9:00 – 11:00 Uhr</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sektion 3: Reservierung & Kontakt (Fokus-Aktion) */}
        <div className="mobile-drawer-footer mobile-stagger-5">
          <a
            href="#reservierung"
            className="mobile-reserve-btn"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              playChime(1040);
              if (onNavigate) {
                onNavigate('cafe', '#reservierung');
              } else {
                window.location.hash = '#reservierung';
              }
            }}
            title="Tisch online reservieren"
          >
            <span className="mobile-reserve-shimmer" aria-hidden="true" />
            <span>Tisch online reservieren</span>
            <ArrowUpRight size={17} className="mobile-reserve-arrow" />
          </a>

          <a
            href={`tel:${CAFE_INFO.contact.phone}`}
            className="mobile-phone-btn"
            onClick={() => playChime(700)}
            title="Telefonisch anrufen"
          >
            <Phone size={15} className="text-gold phone-ringing-icon" />
            <span>Telefonisch reservieren: {CAFE_INFO.contact.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </>
  );
};
