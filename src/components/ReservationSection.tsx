import React, { useState, useId, useRef } from 'react';
import {
  Calendar,
  Clock,
  Users,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  CalendarCheck,
  RefreshCw,
  Timer,
  Coffee,
  RotateCcw,
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

// Available time slots during Café Praha opening hours (09:00 - 18:00)
const TIME_SLOTS = [
  { time: '09:00', label: '09:00 Uhr (Frühstück)' },
  { time: '09:30', label: '09:30 Uhr (Frühstück)' },
  { time: '10:00', label: '10:00 Uhr (Frühstück)' },
  { time: '10:30', label: '10:30 Uhr (Frühstück)' },
  { time: '11:00', label: '11:00 Uhr' },
  { time: '11:30', label: '11:30 Uhr' },
  { time: '12:00', label: '12:00 Uhr' },
  { time: '12:30', label: '12:30 Uhr' },
  { time: '13:00', label: '13:00 Uhr' },
  { time: '13:30', label: '13:30 Uhr' },
  { time: '14:00', label: '14:00 Uhr' },
  { time: '14:30', label: '14:30 Uhr' },
  { time: '15:00', label: '15:00 Uhr' },
  { time: '15:30', label: '15:30 Uhr' },
  { time: '16:00', label: '16:00 Uhr' },
  { time: '16:30', label: '16:30 Uhr' },
  { time: '17:00', label: '17:00 Uhr' },
  { time: '17:30', label: '17:30 Uhr' },
];

const PRESET_GUEST_COUNTS = [1, 2, 3, 4, 5, 6, 8];

export const ReservationSection: React.FC = () => {
  // Today's date in YYYY-MM-DD
  const todayStr = new Date().toISOString().split('T')[0];

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState<number>(2);
  const [customGuests, setCustomGuests] = useState<string>('2');
  const [isCustomGuestsMode, setIsCustomGuestsMode] = useState(false);
  const [date, setDate] = useState<string>(todayStr);
  const [time, setTime] = useState<string>('14:30');
  const [notes, setNotes] = useState('');

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const nameInputId = useId();
  const phoneInputId = useId();
  const dateInputId = useId();
  const timeInputId = useId();
  const guestsInputId = useId();
  const notesInputId = useId();

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Subtle porcelain chime
  const playChime = (freq = 840) => {
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
      // Audio not available
    }
  };

  const handleGuestPresetClick = (num: number) => {
    setGuests(num);
    setCustomGuests(String(num));
    setIsCustomGuestsMode(false);
    playChime(760 + num * 25);
    if (errors.guests) {
      setErrors((prev) => ({ ...prev, guests: '' }));
    }
  };

  const handleCustomGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomGuests(val);
    const parsed = parseInt(val, 10);
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 25) {
      setGuests(parsed);
      if (errors.guests) {
        setErrors((prev) => ({ ...prev, guests: '' }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Bitte geben Sie Ihren Namen an (mind. 2 Zeichen).';
    }

    const cleanPhone = phone.replace(/[\s\-\/\(\)]/g, '');
    if (!cleanPhone || cleanPhone.length < 6) {
      newErrors.phone = 'Bitte geben Sie eine gültige Telefonnummer an.';
    }

    if (!date) {
      newErrors.date = 'Bitte wählen Sie ein Reservierungsdatum.';
    } else if (date < todayStr) {
      newErrors.date = 'Das Datum darf nicht in der Vergangenheit liegen.';
    }

    if (guests < 1 || guests > 25) {
      newErrors.guests = 'Reservierungen sind für 1 bis max. 25 Personen möglich.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      playChime(420);
      return;
    }

    setIsSubmitting(true);
    playChime(920);

    setTimeout(() => {
      const randomRef = 'CP-' + Math.floor(1000 + Math.random() * 9000);
      setBookingRef(randomRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
      playChime(1120);
    }, 750);
  };

  const handleReset = () => {
    setFullName('');
    setPhone('');
    setGuests(2);
    setCustomGuests('2');
    setIsCustomGuestsMode(false);
    setDate(todayStr);
    setTime('14:30');
    setNotes('');
    setErrors({});
    setIsSubmitted(false);
    setBookingRef('');
    playChime(700);
  };

  const formatFriendlyDate = (dateVal: string) => {
    try {
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
        return d.toLocaleDateString('de-DE', {
          weekday: 'short',
          day: '2-digit',
          month: 'short',
        });
      }
    } catch {
      // Fallback
    }
    return dateVal;
  };

  return (
    <section id="reservierung" className="reservation-compact-section" aria-label="Tischreservierung">
      <div className="container">

        {/* KOMPAKTER SECTION HEADER */}
        <div className="reservation-compact-header text-center">
          <div className="badge-pill reservation-badge">
            <Sparkles size={13} className="text-gold" />
            <span>Tischreservierung • Café Praha Zittau</span>
          </div>

          <h2 className="reservation-compact-headline">
            Tisch reservieren im <span className="gold-gradient-text">Café Praha</span>
          </h2>

          <p className="reservation-compact-subheadline">
            Genießen Sie Ihren Kaffeehaus-Moment – sichern Sie sich unkompliziert Ihren Platz
            zum Frühstück, tschechischen Mittagstisch oder für feine Backkunst.
          </p>

          {/* DREI SCHLANKE TRUST-PILLS (KOMPRIMIERTE INFOS) */}
          <div className="reservation-trust-pills">
            <div className="trust-pill-item">
              <Timer size={14} className="text-gold" />
              <span>10 Min. Kulanzfrist</span>
            </div>
            <div className="trust-pill-item">
              <Users size={14} className="text-gold" />
              <span>Gruppen bis 25 Personen</span>
            </div>
            <div className="trust-pill-item">
              <Coffee size={14} className="text-gold" />
              <span>Täglich 9:00 – 18:00 Uhr</span>
            </div>
          </div>
        </div>

        {/* ZENTRALE FOKUS-BÜHNE: DAS BUCHUNGSFORMULAR */}
        <div className="reservation-stage-wrapper">

          {!isSubmitted ? (
            /* Aktives kompaktes Formular */
            <div className="reservation-compact-card">

              <div className="compact-card-header">
                <div className="compact-card-title-wrap">
                  <div className="compact-card-icon">
                    <CalendarCheck size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="compact-card-title">Online reservieren</h3>
                    <p className="compact-card-subtitle">Kostenlos, unverbindlich & in unter 1 Minute angefragt</p>
                  </div>
                </div>
              </div>

              <form className="reservation-compact-form" onSubmit={handleSubmit} noValidate>

                {/* ZEILE 1: NAME & TELEFON (2 SPALTEN) */}
                <div className="compact-form-row-2">
                  <div className="compact-field">
                    <label htmlFor={nameInputId} className="compact-label">
                      <User size={14} className="text-gold" />
                      <span>Ihr Name <span className="req">*</span></span>
                    </label>
                    <input
                      id={nameInputId}
                      type="text"
                      className={`compact-input ${errors.fullName ? 'has-error' : ''}`}
                      placeholder="Vor- und Nachname"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: '' }));
                      }}
                      required
                      autoComplete="name"
                    />
                    {errors.fullName && <div className="compact-error">{errors.fullName}</div>}
                  </div>

                  <div className="compact-field">
                    <label htmlFor={phoneInputId} className="compact-label">
                      <Phone size={14} className="text-gold" />
                      <span>Telefonnummer für Bestätigung <span className="req">*</span></span>
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      className={`compact-input ${errors.phone ? 'has-error' : ''}`}
                      placeholder="z. B. 0172 1234567"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                      }}
                      required
                      autoComplete="tel"
                    />
                    {errors.phone && <div className="compact-error">{errors.phone}</div>}
                  </div>
                </div>

                {/* ZEILE 2: DATUM & UHRZEIT (2 SPALTEN) */}
                <div className="compact-form-row-2">
                  <div className="compact-field">
                    <label htmlFor={dateInputId} className="compact-label">
                      <Calendar size={14} className="text-gold" />
                      <span>Wann: Datum <span className="req">*</span></span>
                    </label>
                    <input
                      id={dateInputId}
                      type="date"
                      min={todayStr}
                      className={`compact-input ${errors.date ? 'has-error' : ''}`}
                      value={date}
                      onChange={(e) => {
                        setDate(e.target.value);
                        playChime(820);
                        if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
                      }}
                      required
                    />
                    {errors.date && <div className="compact-error">{errors.date}</div>}
                  </div>

                  <div className="compact-field">
                    <label htmlFor={timeInputId} className="compact-label">
                      <Clock size={14} className="text-gold" />
                      <span>Uhrzeit <span className="req">*</span></span>
                    </label>
                    <select
                      id={timeInputId}
                      className="compact-select"
                      value={time}
                      onChange={(e) => {
                        setTime(e.target.value);
                        playChime(850);
                      }}
                    >
                      {TIME_SLOTS.map((slot) => (
                        <option key={slot.time} value={slot.time}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* ZEILE 3: GÄSTEANZAHL (PILL-LEISTE) */}
                <div className="compact-field">
                  <div className="compact-label-split">
                    <span className="compact-label" style={{ marginBottom: 0 }}>
                      <Users size={14} className="text-gold" />
                      <span>Anzahl der Gäste:</span>
                    </span>
                    <span className="compact-badge-guests">
                      {guests} {guests === 1 ? 'Person' : 'Personen'}
                    </span>
                  </div>

                  <div className="compact-pills-wrap">
                    {PRESET_GUEST_COUNTS.map((num) => (
                      <button
                        key={num}
                        type="button"
                        className={`compact-pill-btn ${guests === num && !isCustomGuestsMode ? 'active' : ''}`}
                        onClick={() => handleGuestPresetClick(num)}
                      >
                        {num} {num === 1 ? 'Gast' : 'Gäste'}
                      </button>
                    ))}

                    <button
                      type="button"
                      className={`compact-pill-btn ${isCustomGuestsMode ? 'active' : ''}`}
                      onClick={() => {
                        setIsCustomGuestsMode(true);
                        playChime(950);
                      }}
                      title="Große Gruppe bis zu 25 Personen"
                    >
                      Gruppe...
                    </button>
                  </div>

                  {/* Optionaler Inline-Stepper für Gruppen */}
                  {isCustomGuestsMode && (
                    <div className="compact-custom-guests-box">
                      <span className="custom-stepper-hint">Personenanzahl (1 bis max. 25):</span>
                      <input
                        id={guestsInputId}
                        type="number"
                        min="1"
                        max="25"
                        className="compact-input compact-stepper-input"
                        value={customGuests}
                        onChange={handleCustomGuestsChange}
                      />
                      <span className="custom-stepper-sub">Gruppen bis 25 Personen herzlich willkommen</span>
                    </div>
                  )}

                  {errors.guests && <div className="compact-error">{errors.guests}</div>}
                </div>

                {/* ZEILE 4: WÜNSCHE & ANMERKUNGEN (SCHLANK) */}
                <div className="compact-field">
                  <label htmlFor={notesInputId} className="compact-label">
                    <MessageSquare size={14} className="text-gold" />
                    <span>Besondere Wünsche (optional):</span>
                  </label>
                  <textarea
                    id={notesInputId}
                    className="compact-textarea"
                    rows={2}
                    placeholder="Z. B. Fensterplatz, Kinderstuhl, ruhiger Tisch oder Tortenvorbestellung..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                {/* ZEILE 5: AKTIONEN & LIVE-ZUSAMMENFASSUNG */}
                <div className="compact-action-row">
                  <div className="compact-live-summary">
                    <Sparkles size={15} className="text-gold" />
                    <span className="summary-text">
                      Auswahl:{' '}
                      <strong>
                        {guests} {guests === 1 ? 'Gast' : 'Gäste'} • {formatFriendlyDate(date)} um {time} Uhr
                      </strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="compact-submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="spin-icon" />
                        <span>Wird angefragt...</span>
                      </>
                    ) : (
                      <>
                        <span>Tisch verbindlich reservieren</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
                </div>

                <div className="compact-privacy-note">
                  🔒 Keine Registrierung nötig. Ihre Daten dienen ausschließlich der Reservierungsbestätigung.
                </div>

              </form>

            </div>
          ) : (
            /* Kompakter Erfolgs-Zustand */
            <div className="reservation-compact-success text-center">
              <div className="success-icon-wrap">
                <CheckCircle2 size={50} className="text-gold" />
              </div>

              <span className="badge-pill" style={{ margin: '0 auto 0.6rem' }}>
                Reservierungsanfrage erhalten
              </span>

              <h3 className="compact-success-title">
                Děkujeme, <span className="text-gold">{fullName}</span>!
              </h3>

              <p className="compact-success-lead">
                Ihre Reservierung für <strong>{guests} {guests === 1 ? 'Person' : 'Personen'}</strong> am{' '}
                <strong>{formatFriendlyDate(date)} um {time} Uhr</strong> ist sicher bei uns eingegangen.
              </p>

              <div className="compact-ref-box">
                <span className="ref-label">Buchungs-Referenz:</span>
                <span className="ref-val">{bookingRef}</span>
              </div>

              <p className="compact-success-kulanz">
                ⏱ <strong>10-Minuten-Kulanz:</strong> Sollten Sie sich verspäten, halten wir Ihren Tisch
                10 Minuten für Sie frei. Bitte geben Sie uns bei Verzögerung kurz telefonisch Bescheid.
              </p>

              <div className="compact-success-actions">
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleReset}
                >
                  <RotateCcw size={15} />
                  <span>Weitere Reservierung vornehmen</span>
                </button>

                <a
                  href={`tel:${CAFE_INFO.contact.phone}`}
                  className="btn-secondary"
                  onClick={() => playChime(760)}
                >
                  <Phone size={15} className="text-gold" />
                  <span>Rückfrage: {CAFE_INFO.contact.phoneDisplay}</span>
                </a>
              </div>
            </div>
          )}

          {/* SCHLANKE SPONTAN-LEISTE DIREKT UNTER DER KARTE */}
          <div className="reservation-spontan-bar">
            <span className="spontan-text">
              Sehr kurzfristig oder heute noch einen Tisch sichern?
            </span>
            <a
              href={`tel:${CAFE_INFO.contact.phone}`}
              className="spontan-phone-link"
              onClick={() => playChime(780)}
            >
              <Phone size={14} className="text-gold" />
              <span>Direkt anrufen: {CAFE_INFO.contact.phoneDisplay}</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
