import React, { useEffect } from 'react';
import { X, ShieldCheck, FileText, CalendarClock, Phone, Building, Scale } from 'lucide-react';
import { LEGAL_INFO, CAFE_INFO } from '../data/cafeData';

export type LegalTab = 'impressum' | 'datenschutz' | 'reservierung';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onClose: () => void;
  onSelectTab: (tab: LegalTab) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onClose,
  onSelectTab,
}) => {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="legal-modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="legal-modal-title"
    >
      <div
        className="legal-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="legal-modal-header">
          <div className="legal-tabs-nav" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'impressum'}
              className={`legal-tab-btn ${activeTab === 'impressum' ? 'active' : ''}`}
              onClick={() => onSelectTab('impressum')}
            >
              <FileText size={16} />
              <span>Impressum</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'datenschutz'}
              className={`legal-tab-btn ${activeTab === 'datenschutz' ? 'active' : ''}`}
              onClick={() => onSelectTab('datenschutz')}
            >
              <ShieldCheck size={16} />
              <span>Datenschutz</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reservierung'}
              className={`legal-tab-btn ${activeTab === 'reservierung' ? 'active' : ''}`}
              onClick={() => onSelectTab('reservierung')}
            >
              <CalendarClock size={16} />
              <span>Reservierungsregeln</span>
            </button>
          </div>

          <button
            type="button"
            className="legal-close-btn"
            onClick={onClose}
            aria-label="Modal schließen"
            title="Schließen"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="legal-modal-body">
          {/* TAB 1: IMPRESSUM */}
          {activeTab === 'impressum' && (
            <div className="legal-tab-content">
              <h2 id="legal-modal-title" className="legal-title">
                Impressum &amp; Rechtliche Angaben
              </h2>
              <p className="legal-lead">
                Angaben gemäß § 5 Telemediengesetz (TMG) für das Café Praha in Zittau:
              </p>

              <div className="legal-grid">
                <div className="legal-box">
                  <div className="legal-box-header">
                    <Building size={18} className="text-gold" />
                    <strong>Betreiberin der Website &amp; des Cafés</strong>
                  </div>
                  <p className="legal-val-strong">{LEGAL_INFO.company}</p>
                  <p className="legal-val-sub">Firmensitz: {LEGAL_INFO.address}</p>
                  <p className="legal-val-sub">
                    Betriebsstätte Café Praha: {LEGAL_INFO.venueAddress}
                  </p>
                </div>

                <div className="legal-box">
                  <div className="legal-box-header">
                    <Scale size={18} className="text-gold" />
                    <strong>Register &amp; Vertretung</strong>
                  </div>
                  <p><strong>Geschäftsführer:</strong> {LEGAL_INFO.managingDirector}</p>
                  <p><strong>Registergericht:</strong> {LEGAL_INFO.commercialRegister}</p>
                  <p><strong>Umsatzsteuer-ID:</strong> {LEGAL_INFO.taxId}</p>
                </div>
              </div>

              <div className="legal-box" style={{ marginTop: '1rem' }}>
                <div className="legal-box-header">
                  <Phone size={18} className="text-gold" />
                  <strong>Kontakt &amp; Erreichbarkeit</strong>
                </div>
                <div className="contact-pairs">
                  <p>
                    <strong>Telefon Café:</strong>{' '}
                    <a href={`tel:${CAFE_INFO.contact.phone}`} className="gold-link">
                      {CAFE_INFO.contact.phoneDisplay}
                    </a>
                  </p>
                  <p>
                    <strong>E-Mail Anfragen:</strong>{' '}
                    <a href={`mailto:${CAFE_INFO.contact.email}`} className="gold-link">
                      {CAFE_INFO.contact.email}
                    </a>
                  </p>
                  <p>
                    <strong>E-Mail Geschäftsleitung:</strong>{' '}
                    <a href={`mailto:${LEGAL_INFO.managementEmail}`} className="gold-link">
                      {LEGAL_INFO.managementEmail}
                    </a>
                  </p>
                </div>
              </div>

              <div className="legal-disclaimer">
                <h4>Verbraucherstreitbeilegung &amp; Universalschlichtungsstelle</h4>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gold-link"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: DATENSCHUTZ */}
          {activeTab === 'datenschutz' && (
            <div className="legal-tab-content">
              <h2 id="legal-modal-title" className="legal-title">
                Datenschutzerklärung (DSGVO)
              </h2>
              <p className="legal-lead">
                Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Nachfolgend informieren wir Sie über Art, Umfang und Zweck der Erhebung und Verwendung Ihrer Daten.
              </p>

              <div className="legal-section-block">
                <h3>1. Verantwortliche Stelle</h3>
                <p>
                  Verantwortlich für die Datenverarbeitung auf dieser Website ist die{' '}
                  <strong>{LEGAL_INFO.company}</strong>, {LEGAL_INFO.address}. E-Mail:{' '}
                  <a href={`mailto:${CAFE_INFO.contact.email}`} className="gold-link">
                    {CAFE_INFO.contact.email}
                  </a>.
                </p>
              </div>

              <div className="legal-section-block">
                <h3>2. Tischreservierung &amp; Kontaktformular</h3>
                <p>
                  Wenn Sie uns über das Reservierungsformular eine Tischbuchungsanfrage senden, erfassen wir folgende Angaben:
                </p>
                <ul className="legal-bullets">
                  <li><strong>Vor- und Nachname:</strong> Zur Zuordnung der Tischbelegung.</li>
                  <li><strong>Telefonnummer:</strong> Für eventuelle Rückfragen oder Abstimmungen bei Verspätungen.</li>
                  <li><strong>Anzahl der Gäste, Datum &amp; Uhrzeit:</strong> Zur Planung der Raumkapazitäten.</li>
                  <li><strong>Freiwillige Anmerkungen:</strong> Spezielle Wünsche (z.B. Kinderstuhl, Geburtstag).</li>
                </ul>
                <p>
                  Die Verarbeitung erfolgt auf Grundlage von <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Erfüllung vorvertraglicher Maßnahmen). Die Daten werden ausschließlich für die Abwicklung Ihrer Reservierung genutzt und nach Abschluss vertraulich gelöscht bzw. archiviert.
                </p>
              </div>

              <div className="legal-section-block">
                <h3>3. Server-Log-Dateien</h3>
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien (Browsertyp, Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage). Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Grundlage ist Art. 6 Abs. 1 lit. f DSGVO.
                </p>
              </div>

              <div className="legal-section-block">
                <h3>4. Ihre Rechte</h3>
                <p>
                  Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung und ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wenden Sie sich hierzu jederzeit an die im Impressum angegebene Adresse.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: RESERVIERUNGSBEDINGUNGEN */}
          {activeTab === 'reservierung' && (
            <div className="legal-tab-content">
              <h2 id="legal-modal-title" className="legal-title">
                Reservierungsrichtlinien &amp; Kulanzregel
              </h2>
              <p className="legal-lead">
                Damit alle Gäste die Prager Gemütlichkeit und unsere frischen Spezialitäten ohne lange Wartezeiten genießen können, gelten folgende Vereinbarungen:
              </p>

              <div className="legal-highlight-card">
                <div className="highlight-card-header">
                  <CalendarClock size={22} className="text-gold" />
                  <strong>Die 10-Minuten-Kulanzregel</strong>
                </div>
                <p>
                  Ihr reservierter Tisch wird ab der vereinbarten Uhrzeit für Sie freigehalten. Sollte sich Ihre Ankunft verzögern, bitten wir Sie um eine kurze telefonische Rückmeldung unter{' '}
                  <a href={`tel:${CAFE_INFO.contact.phone}`} className="gold-link">
                    {CAFE_INFO.contact.phoneDisplay}
                  </a>.
                </p>
                <div className="highlight-alert-box">
                  ⏱️ <strong>Wichtiger Hinweis:</strong> Nach einer Verspätung von mehr als <strong>10 Minuten ohne vorherige Benachrichtigung</strong> behalten wir uns vor, den Tisch für andere wartende Gäste freizugeben.
                </div>
              </div>

              <div className="legal-section-block">
                <h3>Gruppengröße &amp; Feierlichkeiten</h3>
                <p>
                  Über unser Online-Formular sowie telefonisch nehmen wir Reservierungen bis zu einer Gruppengröße von maximal <strong>25 Personen</strong> entgegen. Für größere Gesellschaften oder exklusive Veranstaltungen sprechen Sie uns bitte persönlich für ein individuelles Catering an.
                </p>
              </div>

              <div className="legal-section-block">
                <h3>Frühstück &amp; Mittagstisch</h3>
                <p>
                  Frühstück servieren wir täglich von <strong>09:00 bis 11:00 Uhr</strong>. Gerne können Sie vorab reservieren, um sich Ihr knuspriges Café Praha Sandwich oder Rührei zu sichern. Der böhmische Mittagstisch ist ab dem <strong>01.10.</strong> wieder frisch im Angebot.
                </p>
              </div>

              <div className="legal-section-block">
                <h3>Stornierung</h3>
                <p>
                  Sollte Ihnen etwas dazwischenkommen, freuen wir uns über einen kurzen Anruf oder eine kurze E-Mail zur Absage. Das hilft unserem Team bei der Vorbereitung.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="legal-modal-footer">
          <span className="legal-footer-note">
            Café Praha Zittau • {LEGAL_INFO.company}
          </span>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
          >
            Verstanden &amp; Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
