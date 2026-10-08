import React, { useState, useRef } from 'react';
import {
  Calendar,
  Phone,
  MapPin,
  ExternalLink,
  ChevronUp,
  Timer,
  ShoppingBag,
  Navigation,
  ArrowUpRight,
  ShieldCheck,
  FileText,
} from 'lucide-react';
import { CAFE_INFO, LEGAL_INFO, DIRECTIONS_INFO } from '../data/cafeData';
import { LegalModal, LegalTab } from './LegalModal';
import { Sparkles } from 'lucide-react';

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
            EBENE 2: HAUPT-FOOTER (4 SPALTEN IM ESPRESSO-DESIGN)
            =================================================================== */}
        <div className="main-footer-body">
          <div className="container">
            <div className="main-footer-grid">
              
              {/* SPALTE 1: BRAND, ÖFFNUNGSZEITEN & TOO GOOD TO GO */}
              <div className="footer-col footer-col-brand">
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

                {/* Grüner Badge der gesamten Öffnungszeiten */}
                <div className="footer-status-pill">
                  <span className="status-dot-pulse" aria-hidden="true" />
                  <span className="status-text">Täglich geöffnet von 09:00 – 18:00 Uhr</span>
                </div>

                {/* Too Good To Go Badge */}
                <div className="footer-tgtg-card">
                  <div className="tgtg-icon-bubble">
                    <ShoppingBag size={18} className="text-gold" />
                  </div>
                  <div className="tgtg-text-box">
                    <div className="tgtg-title">Too Good To Go Partner</div>
                    <p className="tgtg-desc">
                      Gutes Essen gehört auf den Teller! Sichern Sie sich unsere beliebte 
                      <strong> Überraschungstüte</strong> bequem über die App.
                    </p>
                  </div>
                </div>
              </div>

              {/* SPALTE 2: LAGE, ANFAHRT & ROUTENPLANER */}
              <div className="footer-col footer-col-location">
                <div className="col-header">
                  <MapPin size={19} className="text-gold" />
                  <h3 className="col-title">Lage &amp; Anreise</h3>
                </div>

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
                  <Navigation size={15} />
                  <span>Route in Google Maps öffnen</span>
                  <ExternalLink size={13} />
                </a>

                {/* Drei Wege zu uns */}
                <div className="directions-quick-list">
                  {DIRECTIONS_INFO.map((item, idx) => (
                    <div key={idx} className="direction-item">
                      <span className="direction-tag">{item.title}:</span>
                      <span className="direction-desc">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* SPALTE 3: DIREKTKONTAKT & RESERVIERUNG */}
              <div className="footer-col footer-col-contact">
                <div className="col-header">
                  <Calendar size={19} className="text-gold" />
                  <h3 className="col-title">Kontakt &amp; Reservierung</h3>
                </div>

                {/* Großes Telefon-Element */}
                <a
                  href={`tel:${CAFE_INFO.contact.phone}`}
                  className="footer-contact-card"
                  onClick={() => playChime(800)}
                  title="Jetzt telefonisch anfragen"
                >
                  <div className="contact-icon-box">
                    <Phone size={20} className="text-gold" />
                  </div>
                  <div>
                    <span className="contact-lbl">Telefonische Reservierung:</span>
                    <span className="contact-val">{CAFE_INFO.contact.phoneDisplay}</span>
                  </div>
                </a>

                {/* E-Mail Element */}
                <a
                  href={`mailto:${CAFE_INFO.contact.email}`}
                  className="footer-contact-card"
                  onClick={() => playChime(750)}
                  title="E-Mail schreiben"
                >
                  <div className="contact-icon-box">
                    <span className="email-at-symbol">@</span>
                  </div>
                  <div>
                    <span className="contact-lbl">E-Mail für Anfragen:</span>
                    <span className="contact-val">{CAFE_INFO.contact.email}</span>
                  </div>
                </a>

                {/* Kulanzhinweis mit Link zum Modal */}
                <div className="reservation-kulanz-notice">
                  <div className="kulanz-title">
                    <Timer size={14} className="text-gold" />
                    <span>10-Minuten-Kulanzfrist:</span>
                  </div>
                  <p className="kulanz-text">
                    Nach 10 Min. Verspätung wird der Tisch für wartende Gäste freigegeben. Bitte rufen Sie bei Verspätung kurz an.
                  </p>
                  <button
                    type="button"
                    className="kulanz-modal-trigger"
                    onClick={() => handleOpenLegal('reservierung')}
                  >
                    <span>Alle Reservierungsregeln einsehen</span>
                    <ArrowUpRight size={13} />
                  </button>
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
              
              {/* Copyright & Betreiberangaben */}
              <div className="sub-footer-left">
                <span className="copyright-line">
                  © {currentYear} <strong>Café Praha</strong> • Alle Rechte vorbehalten.
                </span>
                <span className="operator-line">
                  Betrieben von {LEGAL_INFO.company} • GF {LEGAL_INFO.managingDirector}
                </span>
              </div>

              {/* Rechtliche Navigationslinks (Öffnen Modal) */}
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
                  className="legal-link-btn"
                  style={{ color: 'var(--color-gold-bright)', borderColor: 'rgba(218, 165, 32, 0.4)' }}
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

              {/* Scroll to Top Button */}
              <div className="sub-footer-right">
                <button
                  type="button"
                  className="back-to-top-btn"
                  onClick={handleScrollToTop}
                  aria-label="Nach oben scrollen"
                  title="Zurück zum Seitenanfang"
                >
                  <span>Nach oben</span>
                  <ChevronUp size={16} />
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
