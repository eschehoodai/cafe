import React, { useState, useRef } from 'react';
import {
  ArrowLeft,
  Coffee,
  CheckCircle2,
  Clock,
  Heart,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from 'lucide-react';
import {
  JOB_DATA,
  JOB_EMPLOYMENT_OPTIONS,
  CAFE_INFO,
} from '../data/cafeData';
import { JobEmploymentType, JobApplicationData } from '../types';

interface JobsPageProps {
  onBack: () => void;
  onOpenLegal?: (tab: 'impressum' | 'datenschutz' | 'reservierung') => void;
}

export const JobsPage: React.FC<JobsPageProps> = ({ onBack, onOpenLegal }) => {
  const [formData, setFormData] = useState<JobApplicationData>({
    employmentType: 'teilzeit',
    fullName: '',
    phone: '',
    email: '',
    message: '',
    privacyAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Subtle acoustic porcelain chime
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
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.38);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.38);
      }
    } catch {
      // Audio fallback
    }
  };

  const handleEmploymentSelect = (type: JobEmploymentType) => {
    playChime(820);
    setFormData((prev) => ({ ...prev, employmentType: type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim()) {
      setErrorMessage('Bitte gib deinen Namen an.');
      return;
    }
    if (!formData.phone.trim() && !formData.email.trim()) {
      setErrorMessage('Bitte gib mindestens deine Telefonnummer oder E-Mail-Adresse an.');
      return;
    }
    if (!formData.privacyAccepted) {
      setErrorMessage('Bitte bestätige kurz die Datenschutzerklärung.');
      return;
    }

    setIsSubmitting(true);
    playChime(960);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      playChime(1120);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 700);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      employmentType: 'teilzeit',
      fullName: '',
      phone: '',
      email: '',
      message: '',
      privacyAccepted: false,
    });
  };

  return (
    <div className="jobs-compact-page" id="jobs-page">
      {/* 1. TOP BAR */}
      <div className="container jobs-top-bar">
        <button
          type="button"
          className="jobs-back-btn"
          onClick={() => {
            playChime(720);
            onBack();
          }}
          title="Zurück zum Café Praha Hauptmenü"
        >
          <ArrowLeft size={16} />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="jobs-quick-pill">
          <span className="live-pulse-dot" />
          <span>Blitz-Bewerbung in 30 Sekunden</span>
        </div>
      </div>

      <div className="container">
        {isSubmitted ? (
          /* SUCCESS STATE */
          <div className="jobs-compact-success">
            <div className="success-icon-wrap">
              <CheckCircle2 size={56} className="text-gold" />
            </div>

            <span className="badge-pill" style={{ margin: '0 auto 0.75rem' }}>
              Bewerbung erhalten
            </span>

            <h2 className="success-title">
              Děkujeme, <span className="text-gold">{formData.fullName}</span>!
            </h2>

            <p className="success-lead">
              Deine Schnellbewerbung ist direkt bei uns im Café Praha angekommen.
            </p>

            <div className="success-summary">
              <div className="summary-item">
                <span className="summary-label">Bereich:</span>
                <span className="summary-val">{JOB_DATA.roleTitle}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Modell:</span>
                <span className="summary-val">
                  {JOB_EMPLOYMENT_OPTIONS.find((o) => o.id === formData.employmentType)?.label}
                </span>
              </div>
              {formData.phone && (
                <div className="summary-item">
                  <span className="summary-label">Telefon:</span>
                  <span className="summary-val">{formData.phone}</span>
                </div>
              )}
              {formData.email && (
                <div className="summary-item">
                  <span className="summary-label">E-Mail:</span>
                  <span className="summary-val">{formData.email}</span>
                </div>
              )}
            </div>

            <div className="success-next-box">
              <Coffee size={20} className="text-gold" />
              <p>
                Lucas Koch und unser Team melden sich innerhalb von <strong>24–48 Stunden</strong> bei dir.
                Oder komm einfach spontan auf einen Kaffee bei uns an der{' '}
                <strong>Inneren Weberstraße 3 & 8</strong> vorbei!
              </p>
            </div>

            <div className="success-btns">
              <button
                type="button"
                className="btn-primary"
                onClick={() => {
                  playChime(880);
                  onBack();
                }}
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <button
                type="button"
                className="btn-secondary"
                onClick={() => {
                  playChime(760);
                  handleReset();
                }}
              >
                <span>Weitere Bewerbung absenden</span>
              </button>
            </div>
          </div>
        ) : (
          /* KOMPRIMIERTE SCHNELLBEWERBUNGS-BÜHNE */
          <div className="jobs-compact-layout">
            
            {/* LINKER KOMPAKTER INFO-BEREICH */}
            <div className="jobs-compact-sidebar">
              
              {/* Authentisches Teamfoto */}
              <div className="sidebar-image-card">
                <img
                  src={JOB_DATA.image}
                  alt={JOB_DATA.imageAlt}
                  className="sidebar-team-img"
                  loading="lazy"
                />
                <div className="sidebar-image-overlay">
                  <span className="sidebar-badge">
                    <Sparkles size={13} />
                    <span>Café Praha sucht dich</span>
                  </span>
                </div>
              </div>

              {/* Der eine umfassende Bereich */}
              <div className="sidebar-role-card">
                <span className="sidebar-kicker">Unser Aufgabenbereich</span>
                <h3 className="sidebar-role-title">{JOB_DATA.roleTitle}</h3>
                <p className="sidebar-role-desc">{JOB_DATA.roleScope}</p>

                {/* 3 Key-Facts */}
                <div className="sidebar-facts-list">
                  <div className="sidebar-fact-row">
                    <Clock size={16} className="text-gold" />
                    <span><strong>Tagsüber geöffnet:</strong> 09:00 – 18:00 Uhr (keine Nachtschichten)</span>
                  </div>
                  <div className="sidebar-fact-row">
                    <Coffee size={16} className="text-gold" />
                    <span><strong>Genuss inklusive:</strong> Freier Kaffee & Mitarbeiterrabatt</span>
                  </div>
                  <div className="sidebar-fact-row">
                    <Heart size={16} className="text-gold" />
                    <span><strong>Familiäres Team:</strong> Quereinsteiger herzlich willkommen</span>
                  </div>
                </div>
              </div>

              {/* Direkter Kontakt */}
              <div className="sidebar-direct-contact">
                <span className="direct-title">Lieber gleich persönlich?</span>
                <p className="direct-desc">
                  Komm einfach spontan vorbei oder ruf uns direkt an:
                </p>
                <a
                  href={`tel:${CAFE_INFO.contact.phone}`}
                  className="direct-phone-btn"
                  onClick={() => playChime(700)}
                >
                  <Phone size={14} className="text-gold" />
                  <span>{CAFE_INFO.contact.phoneDisplay}</span>
                </a>
              </div>

            </div>

            {/* RECHTER HAUPTBEREICH: DAS FOKUSSIERTE SCHNELLBEWERBUNGSFORMULAR */}
            <div className="jobs-compact-main">
              <div className="schnell-form-card">
                
                {/* Formular Header */}
                <div className="schnell-form-header">
                  <div className="badge-pill schnell-badge">
                    <Sparkles size={13} className="text-gold" />
                    <span>Schnellbewerbung ohne Bürokratie</span>
                  </div>
                  <h1 className="schnell-title">Werde Teil unseres Café-Teams</h1>
                  <p className="schnell-subtitle">
                    Kein Anschreiben, kein Lebenslauf nötig. Sag uns einfach kurz, wie wir dich
                    erreichen können – wir freuen uns auf dich!
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="schnell-form" noValidate>
                  
                  {/* 1. ARBEITSZEITMODELL */}
                  <div className="schnell-field-group">
                    <label className="schnell-label">
                      <span>1. Gewünschtes Arbeitszeitmodell:</span>
                    </label>
                    <div className="schnell-pills-row">
                      {JOB_EMPLOYMENT_OPTIONS.map((opt) => {
                        const isSelected = formData.employmentType === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            className={`schnell-pill ${isSelected ? 'active' : ''}`}
                            onClick={() => handleEmploymentSelect(opt.id)}
                          >
                            <span>{opt.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. PERSÖNLICHE ANGABEN */}
                  <div className="schnell-field-group">
                    <label className="schnell-label" htmlFor="schnell-name">
                      <span>2. Deine Kontaktdaten:</span>
                    </label>

                    <div className="schnell-inputs-stack">
                      <input
                        type="text"
                        id="schnell-name"
                        className="schnell-input"
                        placeholder="Vor- und Nachname *"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                      />

                      <div className="schnell-grid-2">
                        <input
                          type="tel"
                          id="schnell-phone"
                          className="schnell-input"
                          placeholder="Telefon / WhatsApp *"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />

                        <input
                          type="email"
                          id="schnell-email"
                          className="schnell-input"
                          placeholder="E-Mail-Adresse"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <span className="schnell-hint">
                      * Wir melden uns unkompliziert per Anruf oder WhatsApp für ein erstes Kennenlernen.
                    </span>
                  </div>

                  {/* 3. KURZE NACHRICHT (OPTIONAL) */}
                  <div className="schnell-field-group">
                    <label className="schnell-label" htmlFor="schnell-message">
                      <span>3. Kurze Nachricht (optional):</span>
                    </label>
                    <textarea
                      id="schnell-message"
                      className="schnell-textarea"
                      rows={2}
                      placeholder="Z. B.: Ab wann könntest du starten? Hast du schon Gastro-Erfahrung?"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  {/* 4. DATENSCHUTZ CHECKBOX */}
                  <div className="schnell-privacy-row">
                    <label className="schnell-privacy-label" htmlFor="schnell-privacy">
                      <input
                        type="checkbox"
                        id="schnell-privacy"
                        className="schnell-checkbox"
                        checked={formData.privacyAccepted}
                        onChange={(e) =>
                          setFormData({ ...formData, privacyAccepted: e.target.checked })
                        }
                      />
                      <span className="schnell-privacy-text">
                        Ich willige ein, dass meine Angaben zur Bearbeitung meiner Bewerbung
                        verarbeitet werden.{' '}
                        {onOpenLegal && (
                          <button
                            type="button"
                            className="schnell-legal-link"
                            onClick={(e) => {
                              e.preventDefault();
                              onOpenLegal('datenschutz');
                            }}
                          >
                            Datenschutz
                          </button>
                        )}
                      </span>
                    </label>
                  </div>

                  {/* FEHLERMELDUNG */}
                  {errorMessage && (
                    <div className="schnell-error-banner" role="alert">
                      <X size={15} />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* ABSENDE-BUTTON */}
                  <button
                    type="submit"
                    className="schnell-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="btn-spinner-wrap">
                        <span className="spinner-dot" />
                        <span>Bewerbung wird gesendet...</span>
                      </span>
                    ) : (
                      <>
                        <span>Schnellbewerbung absenden</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  <div className="schnell-footer-note">
                    <ShieldCheck size={14} className="text-gold" />
                    <span>Dauert keine 30 Sekunden • Schnelle Rückmeldung innerhalb 48h</span>
                  </div>

                </form>

              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
};
