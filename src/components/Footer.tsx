import React, { useState, useRef } from 'react';
import {
  Phone,
  MapPin,
  ExternalLink,
  ChevronUp,
  Timer,
  ShoppingBag,
  Navigation,
  ShieldCheck,
  FileText,
  Sparkles,
  Calendar,
} from 'lucide-react';
import { CAFE_INFO, LEGAL_INFO, DIRECTIONS_INFO } from '../data/cafeData';
import { LegalModal, LegalTab } from './LegalModal';

export interface FooterProps {
  onNavigate?: (view: 'cafe' | 'jobs', anchor?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTab>('impressum');
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Subtle porcelain chime
  const playChime = (freq = 880) => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
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
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleOpenLegal = (tab: LegalTab) => {
    playChime(760);
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleScrollToTop = () => {
    playChime(1040);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=Café+Praha+Innere+Weberstraße+3+8+02763+Zittau`;

  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="site-footer" id="footer" aria-label="Café Praha Fußbereich">

        {/* ===================================================================
            EBENE 1: ZENTRALE MARKEN-BÜHNE (BRAND STAGE)
            =================================================================== */}
        <div className="footer-brand-stage">
          <div className="container">
            <div className="footer-brand-stage-inner">
              <a
                href="#cafe"
                className="footer-brand-header"
                onClick={(e) => {
                  e.preventDefault();
                  playChime(880);
                  if (onNavigate) {
                    onNavigate('cafe', '#cafe');
                  } else {
                    window.location.hash = '#cafe';
                  }
                }}
                title="Café Praha – Startseite"
              >
                <div className="footer-cup-icon">
                  <svg viewBox="0 0 32 32" width="28" height="28" className="steaming-cup-svg">
                    <path className="steam-path steam-1" d="M10,12 C9,9 12,7 10,4" />
                    <path className="steam-path steam-2" d="M15,13 C14,10 17,8 15,3" />
                    <path className="steam-path steam-3" d="M20,12 C19,9 22,7 20,4" />
                    <path
                      d="M7 14 H23 V22 C23 25.3 20.3 28 17 28 H13 C9.7 28 7 25.3 7 22 Z"
                      className="cup-body"
                    />
                    <line x1="5" y1="29" x2="25" y2="29" className="cup-saucer-line" />
                    <path
                      d="M23 16 C25.5 16 26.5 18 26.5 19.5 C26.5 21 25.5 22.5 23 22.5"
                      className="cup-handle-path"
                    />
                  </svg>
                </div>
                <div className="brand-titles">
                  <span className="brand-title-main">Café Praha</span>
                  <span className="brand-title-sub">Zittau • Böhmische Kaffeehauskultur</span>
                </div>
              </a>

              {/* Edles zentriertes Ornament */}
              <div className="footer-center-ornament" aria-hidden="true">
                <span className="ornament-line" />
                <span className="ornament-symbol">✦</span>
                <span className="ornament-line" />
              </div>

              {/* Zentrierter Öffnungszeiten-Badge */}
              <div className="footer-status-pill">
                <span className="status-dot-pulse" aria-hidden="true" />
                <span className="status-text">Täglich geöffnet von 09:00 – 18:00 Uhr</span>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            EBENE 2: HAUPT-FOOTER (3 AUSBALANCIERTE, ZENTRIERTE SÄULEN)
            =================================================================== */}
        <div className="main-footer-body">
          <div className="container">
            <div className="main-footer-grid">
              
              {/* SÄULE 1: KONTAKT & RESERVIERUNG */}
              <div className="footer-col footer-col-card">
                <div className="col-header">
                  <Phone size={18} className="text-gold" />
                  <h3 className="col-title">Kontakt &amp; Reservierung</h3>
                </div>

                <div className="footer-col-content">
                  {/* Telefon-Card */}
                  <a
                    href={`tel:${CAFE_INFO.contact.phone}`}
                    className="footer-contact-card"
                    onClick={() => playChime(800)}
                    title="Jetzt telefonisch anfragen"
                  >
                    <div className="contact-icon-box">
                      <Phone size={18} className="text-gold" />
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-lbl">Telefonische Reservierung:</span>
                      <span className="contact-val">{CAFE_INFO.contact.phoneDisplay}</span>
                    </div>
                  </a>

                  {/* E-Mail-Card */}
                  <a
                    href={`mailto:${CAFE_INFO.contact.email}`}
                    className="footer-contact-card"
                    onClick={() => playChime(750)}
                    title="E-Mail schreiben"
                  >
                    <div className="contact-icon-box">
                      <span className="email-at-symbol">@</span>
                    </div>
                    <div className="contact-info-text">
                      <span className="contact-lbl">E-Mail für Anfragen:</span>
                      <span className="contact-val">{CAFE_INFO.contact.email}</span>
                    </div>
                  </a>

                  {/* Schnellsprung zum Online-Formular */}
                  <a
                    href="#reservierung"
                    className="footer-action-link"
                    onClick={() => playChime(900)}
                    title="Zum Online-Reservierungsformular"
                  >
                    <Calendar size={14} className="text-gold" />
                    <span>Tisch online buchen</span>
                  </a>
                </div>
              </div>

              {/* SÄULE 2: LAGE & ANREISE */}
              <div className="footer-col footer-col-card">
                <div className="col-header">
                  <MapPin size={18} className="text-gold" />
                  <h3 className="col-title">Lage &amp; Anreise</h3>
                </div>

                <div className="footer-col-content">
                  <address className="footer-address">
                    <strong>Café Praha</strong><br />
                    {CAFE_INFO.address.street}<br />
                    {CAFE_INFO.address.zip} {CAFE_INFO.address.city}<br />
                    <span className="address-note">Im historischen Altstadtkern von Zittau</span>
                  </address>

                  {/* Google Maps Routenplaner Button */}
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-maps-link"
                    onClick={() => playChime(700)}
                  >
                    <Navigation size={14} />
                    <span>Route in Google Maps</span>
                    <ExternalLink size={12} />
                  </a>

                  {/* Anfahrts-Pillen / Chips */}
                  <div className="directions-quick-list">
                    {DIRECTIONS_INFO.map((item, idx) => (
                      <div key={idx} className="direction-item">
                        <span className="direction-tag">{item.title}:</span>
                        <span className="direction-desc">{item.desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SÄULE 3: GENUSS & NACHHALTIGKEIT */}
              <div className="footer-col footer-col-card">
                <div className="col-header">
                  <ShoppingBag size={18} className="text-gold" />
                  <h3 className="col-title">Genuss &amp; Partner</h3>
                </div>

                <div className="footer-col-content">
                  {/* Too Good To Go Badge */}
                  <div className="footer-tgtg-card">
                    <div className="tgtg-icon-bubble">
                      <ShoppingBag size={18} className="text-gold" />
                    </div>
                    <div className="tgtg-text-box">
                      <div className="tgtg-title">Too Good To Go Partner</div>
                      <p className="tgtg-desc">
                        Gutes Essen gehört auf den Teller! Sichern Sie sich unsere beliebte{' '}
                        <strong>Überraschungstüte</strong> bequem über die App.
                      </p>
                    </div>
                  </div>

                  {/* Genuss-Botschaft / Claim Box */}
                  <div className="footer-quote-box">
                    <p className="footer-quote-text">
                      „{CAFE_INFO.claim}“
                    </p>
                    <span className="footer-quote-cite">
                      Feine böhmische Gastfreundschaft &amp; Backkunst
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ===================================================================
            EBENE 3: SUB-FOOTER MIT RECHTLICHEM ABSCHLUSS & BACK-TO-TOP
            =================================================================== */}
        <div className="sub-footer-bar">
          <div className="container">
            <div className="sub-footer-inner">
              
              {/* Rechtliche Navigationslinks (Zentriert) */}
              <div className="sub-footer-legal-links">
                <button
                  type="button"
                  className="legal-link-btn"
                  onClick={() => handleOpenLegal('impressum')}
                >
                  <FileText size={14} />
                  <span>Impressum</span>
                </button>

                <button
                  type="button"
                  className="legal-link-btn"
                  onClick={() => handleOpenLegal('datenschutz')}
                >
                  <ShieldCheck size={14} />
                  <span>Datenschutz</span>
                </button>

                <button
                  type="button"
                  className="legal-link-btn"
                  onClick={() => handleOpenLegal('reservierung')}
                >
                  <Timer size={14} />
                  <span>Reservierungsbedingungen</span>
                </button>

                <button
                  type="button"
                  className="legal-link-btn jobs-highlight-btn"
                  onClick={() => {
                    playChime(920);
                    if (onNavigate) {
                      onNavigate('jobs');
                    } else {
                      window.location.hash = '#jobs';
                    }
                  }}
                >
                  <Sparkles size={14} />
                  <span>Jobs &amp; Karriere</span>
                </button>
              </div>

              {/* Copyright & Betreiberangaben (Zentriert) */}
              <div className="sub-footer-center-meta">
                <span className="copyright-line">
                  © {currentYear} <strong>Café Praha</strong> • Alle Rechte vorbehalten.
                </span>
                <span className="operator-line">
                  Betrieben von {LEGAL_INFO.company} • GF {LEGAL_INFO.managingDirector}
                </span>
              </div>

              {/* Scroll to Top Button (Zentriert) */}
              <div className="sub-footer-top-wrap">
                <button
                  type="button"
                  className="back-to-top-btn"
                  onClick={handleScrollToTop}
                  aria-label="Nach oben scrollen"
                  title="Zurück zum Seitenanfang"
                >
                  <ChevronUp size={15} />
                  <span>Nach oben</span>
                </button>
              </div>

            </div>
          </div>
        </div>

      </footer>

      {/* Interaktives Legal-Modal (Impressum, Datenschutz & Reservierungsregeln) */}
      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalModalTab}
        onClose={() => setLegalModalOpen(false)}
        onSelectTab={(tab) => {
          playChime(720);
          setLegalModalTab(tab);
        }}
      />
    </>
  );
};
