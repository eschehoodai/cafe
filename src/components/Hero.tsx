import React from 'react';
import { Phone, Calendar, Clock, MapPin, Coffee } from 'lucide-react';
import { HERO_DATA, CAFE_INFO } from '../data/cafeData';

export const Hero: React.FC = () => {
  return (
    <section id="cafe" className="hero-section">
      {/* Background Media Container (Cinematic Ambient Animation) */}
      <div className="hero-media-backdrop">
        {/* High-End Ambient Header with slow cinematic ambientZoom animation */}
        <div
          className="hero-ambient-poster"
          style={{
            backgroundImage: `url('${HERO_DATA.image || '/images/Header1.png'}')`,
            opacity: 1,
          }}
        />

        {/* Sophisticated Dark Coffee Gradient & Mesh Overlays */}
        <div className="hero-gradient-overlay" />
        <div className="hero-mesh-grid" />
      </div>

      {/* Main Content (Zentriert) */}
      <div className="container hero-content text-center">
        {/* Main Heading - Zentriert */}
        <h1 className="hero-title">
          Willkommen im <br />
          <span className="gold-gradient-text">Café Praha</span>
        </h1>

        {/* Zentraler Genuss- & Intro-Bereich */}
        <div className="hero-quote-card">
          <div className="quote-highlight">
            „{CAFE_INFO.claim}“
          </div>
          <p className="quote-subtext">
            Ihr traditionelles <strong>Kaffeehaus in Zittau</strong>: Wir verwöhnen Sie mit meisterhaften <strong>Kaffeespezialitäten</strong>, original tschechischen <strong>Chlebíčky</strong>, feiner böhmischer <strong>Backkunst &amp; Torten</strong>, handgemachtem <strong>Eis</strong> sowie herzhaftem <strong>Frühstück und Mittagstisch</strong> – serviert mit Prager Gastfreundschaft direkt an der Inneren Weberstraße.
          </p>
        </div>

        {/* 2 Aktions-Buttons: Telefonisch reservieren & Online buchen */}
        <div className="hero-actions-group">
          <a
            href={`tel:${CAFE_INFO.contact.phone}`}
            className="btn-primary"
            title="Tisch telefonisch reservieren"
          >
            <Phone size={18} />
            <span>Tisch reservieren: {CAFE_INFO.contact.phoneDisplay}</span>
          </a>

          <a
            href="#reservierung"
            className="btn-secondary"
            title="Tisch online buchen"
          >
            <Calendar size={18} className="text-gold" />
            <span>Online buchen</span>
          </a>
        </div>

        {/* Minimalistische Quick-Badges (Ende der Hero Section) */}
        <div className="hero-quick-badges">
          <div className="hero-minimal-badge">
            <Clock size={14} className="badge-ico" />
            <span className="badge-lbl">Öffnungszeiten:</span>
            <span className="badge-val">{CAFE_INFO.hours.regular}</span>
          </div>

          <div className="hero-minimal-badge">
            <Coffee size={14} className="badge-ico" />
            <span className="badge-lbl">Frühstück:</span>
            <span className="badge-val">Mo–So 9:00 – 11:00 Uhr</span>
          </div>

          <div className="hero-minimal-badge">
            <MapPin size={14} className="badge-ico" />
            <span className="badge-lbl">Standort:</span>
            <span className="badge-val">Innere Weberstraße 3 &amp; 8</span>
          </div>
        </div>
      </div>
    </section>
  );
};
