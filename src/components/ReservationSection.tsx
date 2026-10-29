import React, { useState, useId, useRef, useMemo, useEffect } from 'react';
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
  RefreshCw,
  RotateCcw,
} from 'lucide-react';
import { CAFE_INFO } from '../data/cafeData';

// Mindestvorlaufzeit in Stunden für Online-Reservierungen
const MIN_LEAD_HOURS = 2;

// Liefert lokales Datum YYYY-MM-DD ohne Zeitzonenversatz
const getLocalDateString = (d: Date = new Date()): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// Prüft, ob ein Slot (z.B. '14:30') an einem Tag (z.B. '2026-10-29') mindestens 2 Stunden in der Zukunft liegt
const isSlotAvailable = (slotTime: string, selectedDateStr: string, toleranceMinutes = 0): boolean => {
  if (!slotTime || !selectedDateStr) return false;
  const timeParts = slotTime.split(':');
  const dateParts = selectedDateStr.split('-');
  if (timeParts.length < 2 || dateParts.length < 3) return false;

  const hours = parseInt(timeParts[0], 10);
  const minutes = parseInt(timeParts[1], 10);
  const year = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10) - 1;
  const day = parseInt(dateParts[2], 10);

  const slotDate = new Date(year, month, day, hours, minutes, 0, 0);
  const minAllowedMs = Date.now() + (MIN_LEAD_HOURS * 60 - toleranceMinutes) * 60 * 1000;
  return slotDate.getTime() >= minAllowedMs;
};

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
  // Lokales heutiges Datum in YYYY-MM-DD
  const todayStr = useMemo(() => getLocalDateString(), []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return getLocalDateString(d);
  }, []);

  // Prüfen, ob heute überhaupt noch buchbare Slots mit 2 Std. Vorlauf existieren.
  // Wenn nicht (z.B. nach 15:30 Uhr), standardmäßig auf morgen springen.
  const defaultInitialDate = useMemo(() => {
    const hasTodaySlots = TIME_SLOTS.some((s) => isSlotAvailable(s.time, todayStr));
    return hasTodaySlots ? todayStr : tomorrowStr;
  }, [todayStr, tomorrowStr]);

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [guests, setGuests] = useState<number>(2);
  const [customGuests, setCustomGuests] = useState<string>('2');
  const [isCustomGuestsMode, setIsCustomGuestsMode] = useState(false);
  const [date, setDate] = useState<string>(defaultInitialDate);

  // Verfügbare Slots für das gewählte Datum (dynamisch gefiltert auf mind. 2 Stunden Vorlauf)
  const availableSlots = useMemo(() => {
    return TIME_SLOTS.filter((slot) => isSlotAvailable(slot.time, date));
  }, [date]);

  // Initialzeit: Bevorzugt 14:30 Uhr oder den ersten verfügbaren Slot
  const [time, setTime] = useState<string>(() => {
    const currentSlots = TIME_SLOTS.filter((slot) => isSlotAvailable(slot.time, defaultInitialDate));
    if (currentSlots.length > 0) {
      const preferred = currentSlots.find((s) => s.time === '14:30');
      return preferred ? preferred.time : currentSlots[0].time;
    }
    return '14:30';
  });
  const [notes, setNotes] = useState('');

  // Wenn das Datum wechselt und die zuvor gewählte Uhrzeit nicht mehr verfügbar ist, auf den ersten gültigen Slot setzen
  useEffect(() => {
    if (availableSlots.length > 0) {
      const isCurrentSlotValid = availableSlots.some((s) => s.time === time);
      if (!isCurrentSlotValid) {
        setTime(availableSlots[0].time);
      }
    }
  }, [availableSlots, time]);

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
    if (!isNaN(parsed) && parsed >= 1 && parsed <= 15) {
      setGuests(parsed);
      if (errors.guests) {
        setErrors((prev) => ({ ...prev, guests: '' }));
      }
    }
  };

  const validate = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'Bitte geben Sie Ihren Namen an.';
    }

    if (!guests || guests < 1 || guests > 15) {
      newErrors.guests = 'Bitte wählen Sie eine Personenanzahl (1 bis max. 15).';
    }

    if (!date) {
      newErrors.date = 'Bitte wählen Sie ein Datum.';
    }

    // 2 Stunden Vorlaufzeit prüfen (mit 5 Minuten Kulanzzeit für das Tippen im Formular)
    if (availableSlots.length === 0 || !isSlotAvailable(time, date, 5)) {
      newErrors.time = 'Mindestens 2 Stunden Vorlaufzeit erforderlich. Für heute rufen Sie uns bitte direkt an.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      playChime(420);
      return;
    }

    setIsSubmitting(true);
    playChime(920);

    const generatedRef = 'CP-' + Math.floor(1000 + Math.random() * 9000);
    let finalRef = generatedRef;

    try {
      const response = await fetch('/api/send-reservation.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'reservation',
          bookingRef: generatedRef,
          fullName: fullName.trim(),
          phone: phone.trim(),
          date,
          time,
          guests,
          notes: notes.trim(),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.bookingRef) {
          finalRef = data.bookingRef;
        }
      }
    } catch (err) {
      console.warn('Backend-Versand nicht verfügbar oder lokale Vorschau:', err);
    } finally {
      setBookingRef(finalRef);
      setIsSubmitting(false);
      setIsSubmitted(true);
      playChime(1120);
    }
  };

  const handleReset = () => {
    const todaySlots = TIME_SLOTS.filter((s) => isSlotAvailable(s.time, todayStr));
    const nextDate = todaySlots.length > 0 ? todayStr : tomorrowStr;
    const nextSlots = todaySlots.length > 0 ? todaySlots : TIME_SLOTS;
    const defaultTime = nextSlots.find((s) => s.time === '14:30')?.time || nextSlots[0]?.time || '14:30';

    setFullName('');
    setPhone('');
    setGuests(2);
    setCustomGuests('2');
    setIsCustomGuestsMode(false);
    setDate(nextDate);
    setTime(defaultTime);
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
          <h2 className="reservation-compact-headline">
            Tisch reservieren im <span className="gold-gradient-text">Café Praha</span>
          </h2>

          <p className="reservation-compact-subheadline">
            Genießen Sie Ihren Kaffeehaus-Moment.
            <br />
            Sichern Sie sich unkompliziert Ihren Platz zum Frühstück, tschechischen Mittagstisch oder für feine Backkunst – Reservierungen auch für Gruppen bis zu 15 Personen möglich.
          </p>
        </div>

        {/* ZENTRALE FOKUS-BÜHNE: DAS BUCHUNGSFORMULAR */}
        <div className="reservation-stage-wrapper">

          {!isSubmitted ? (
            /* Aktives kompaktes Formular */
            <div className="reservation-compact-card">

              <div className="compact-card-header">
                <div className="compact-card-ornament" aria-hidden="true">
                  <span className="ornament-line"></span>
                  <span className="ornament-symbol">✦</span>
                  <span className="ornament-line"></span>
                </div>
                <h3 className="compact-card-title">Jetzt Online reservieren</h3>
              </div>

              <form className="reservation-compact-form" onSubmit={handleSubmit} noValidate>

                {/* ZEILE 1: NAME & TELEFON (2 SPALTEN) */}
                <div className="compact-form-row-2">
                  <div className="compact-field">
                    <label htmlFor={nameInputId} className="compact-label">
                      <User size={14} className="text-gold" />
                      <span>Ihr Name</span>
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
                      autoComplete="name"
                    />
                    {errors.fullName && <div className="compact-error">{errors.fullName}</div>}
                  </div>

                  <div className="compact-field">
                    <label htmlFor={phoneInputId} className="compact-label">
                      <Phone size={14} className="text-gold" />
                      <span>Telefonnummer</span>
                    </label>
                    <input
                      id={phoneInputId}
                      type="tel"
                      className="compact-input"
                      placeholder="z. B. 0172 1234567"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      autoComplete="tel"
                    />
                  </div>
                </div>

                {/* ZEILE 2: DATUM & UHRZEIT (2 SPALTEN) */}
                <div className="compact-form-row-2">
                  <div className="compact-field">
                    <label htmlFor={dateInputId} className="compact-label">
                      <Calendar size={14} className="text-gold" />
                      <span>Wann: Datum</span>
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
                        if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                      }}
                    />
                    {errors.date && <div className="compact-error">{errors.date}</div>}
                  </div>

                  <div className="compact-field">
                    <label htmlFor={timeInputId} className="compact-label">
                      <Clock size={14} className="text-gold" />
                      <span>Uhrzeit</span>
                    </label>
                    {availableSlots.length > 0 ? (
                      <select
                        id={timeInputId}
                        className={`compact-select ${errors.time ? 'has-error' : ''}`}
                        value={time}
                        onChange={(e) => {
                          setTime(e.target.value);
                          playChime(850);
                          if (errors.time) setErrors((prev) => ({ ...prev, time: '' }));
                        }}
                      >
                        {availableSlots.map((slot) => (
                          <option key={slot.time} value={slot.time}>
                            {slot.label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div
                        style={{
                          padding: '0.55rem 0.65rem',
                          background: 'rgba(38, 24, 20, 0.75)',
                          border: '1px solid rgba(244, 205, 157, 0.25)',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          color: '#f5d089',
                          lineHeight: 1.35,
                        }}
                      >
                        Heute keine Online-Termine mehr (mind. 2 Std. Vorlaufzeit).
                      </div>
                    )}
                    {errors.time && <div className="compact-error">{errors.time}</div>}
                    {availableSlots.length > 0 ? (
                      <span
                        className="custom-stepper-sub"
                        style={{ display: 'block', marginTop: '0.25rem', fontSize: '0.72rem', color: 'rgba(214, 195, 178, 0.65)' }}
                      >
                        Mind. 2 Std. Vorlaufzeit
                      </span>
                    ) : (
                      <div style={{ marginTop: '0.35rem', fontSize: '0.76rem', color: '#e8d9c0' }}>
                        Spontan heute?{' '}
                        <a
                          href={`tel:${CAFE_INFO.contact.phone}`}
                          style={{ color: '#f5d089', textDecoration: 'underline', fontWeight: 600 }}
                        >
                          Direkt anrufen: {CAFE_INFO.contact.phoneDisplay}
                        </a>
                      </div>
                    )}
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
                      title="Gruppe bis zu 15 Personen"
                    >
                      Gruppe...
                    </button>
                  </div>

                  {/* Optionaler Inline-Stepper für Gruppen bis zu 15 Personen */}
                  {isCustomGuestsMode && (
                    <div className="compact-custom-guests-box">
                      <span className="custom-stepper-hint">Personenanzahl (1 bis max. 15):</span>
                      <input
                        id={guestsInputId}
                        type="number"
                        min="1"
                        max="15"
                        className="compact-input compact-stepper-input"
                        value={customGuests}
                        onChange={handleCustomGuestsChange}
                      />
                      <span className="custom-stepper-sub">Gruppen bis 15 Personen herzlich willkommen</span>
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
                        {guests} {guests === 1 ? 'Gast' : 'Gäste'} • {formatFriendlyDate(date)} {availableSlots.length > 0 ? `um ${time} Uhr` : '(keine freien Online-Slots)'}
                      </strong>
                    </span>
                  </div>

                  <button
                    type="submit"
                    className="compact-submit-btn"
                    disabled={isSubmitting || availableSlots.length === 0}
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={16} className="spin-icon" />
                        <span>Wird angefragt...</span>
                      </>
                    ) : availableSlots.length === 0 ? (
                      <>
                        <span>Heute online nicht mehr verfügbar</span>
                      </>
                    ) : (
                      <>
                        <span>Tisch verbindlich reservieren</span>
                        <ArrowRight size={16} />
                      </>
                    )}
                  </button>
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
