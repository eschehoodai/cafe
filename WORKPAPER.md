# Workpaper: Relaunch Café Praha (React + TSX)

Dieses Workpaper dient als architektonischer Leitfaden und detaillierter Umsetzungsplan für den Neubau der Website von **Café Praha** (Zittau). Der Aufbau erfolgt streng **Section für Section**, mit modernster React/TSX-Architektur, zeitlosem böhmischem Charme und höchster visueller Qualität.

---

## 1. Projektübersicht & Vision

- **Projektname:** Café Praha Web-Erlebnis
- **Stack:** React 19, TypeScript (TSX), Vite, Modern Vanilla CSS (Design-Tokens, CSS-Variables, BEM-inspiriert)
- **Design-Philosophie:** 
  - Eine harmonische Verbindung aus traditionellem Prager Kaffeehaus-Flair und moderner Premium-Webästhetik.
  - Warme, einladende Farbpalette: Dunkler samtiger Espresso, warmer Karamell-/Goldton (`#c59b67`, `#f4cd9d`), sanfte Crèmetöne und tiefes Schiefergrau.
  - Flüssige Mikro-Interaktionen, edle Serifentypografie (*Playfair Display*) für Überschriften und hochgradig lesbare Sans-Serif (*Outfit* / *Plus Jakarta Sans*) für Mengentexte.
  - **Video-Background-Ready:** Hero-Section mit Unterstützung für ein hochauflösendes MP4-Führungsvideo im Hintergrund inklusive nahtlosem visuellen Platzhalter und elegantem Fallback.

---

## 2. Vorhandenes Medien-Inventar (Assets)

In der Workspace-Struktur stehen folgende Original-Assets bereits lokal zur Verfügung:

### Bilder Startseite & Genussangebot (`/index/`):
1. `cafe.jpg` (Innenansicht / Kaffeehaus-Atmosphäre)
2. `kaffeespezialitaeten_im_cafe_praha_von_klassisch_bis_aussergewoehnlich.jpg` (Kaffee-Highlights)
3. `schleck_das_glueck_eisbecher_cafe_praha.jpg` (Eisbecher-Kreationen)
4. `eierkuchen_oase_mit_vanilleeis_im_cafe_praha.jpg` (Eierkuchen-Oase)
5. `blumig_fruchtige_genussmomente_im_cafe_praha_in_zittau.jpg` (Kuchen / Törtchen)
6. `darf_es_ein_stueck_glueck_aus_dem_cafe_praha_sein.jpg` (Tschechisches Gebäck)
7. `kleine_schnecken_fuer_grosse_gluecksmomente_im_cafe_praha.jpg` (Böhmische Schnecken)
8. `suesse_kunstwerke_im_cafe_praha_in_zittau_geniessen.jpg` (Torten-Kunst)
9. `suesse_verfuehrung_in_jeder_schicht_und_unter_jeder_haube_cafe_praha_zittau.jpg` (Schichttorten)
10. `der_geschmack_tschechiens_auf_einer_kleinen_schnitte_in_zittau.jpg` (Traditionelle Chlebíčky)
11. `cafe_praha_sandwich_klassiker_mit_ei_und_schinken.jpg` (Frühstücks-Sandwich)
12. `typisch_tschechisches_mittagessen_im_cafe_praha_zittau.jpg` (Böhmischer Mittagstisch)

### Bilder Catering & Karriere (`/catering/` & Root):
1. `cafe_praha_kreiert_feinste_haeppchen_fuer_jedes_event.jpg` (Catering-Platten / Chlebíčky)
2. `cafe_praha_wartet_auf_dich.png` (Team & Job-Kultur)
3. `ueberraschungstuete.png` (Too Good To Go / Nachhaltigkeit)

---

## 3. Section-für-Section Umsetzungs-Roadmap

Gemäß Kundenwunsch wird die Seite schrittweise und modular entwickelt:

| Schritt | Modul / Section | Beschreibung & Funktionalität | Status |
|---|---|---|---|
| **01** | **Setup & Foundation** | Vite + React + TSX, CSS Design-Tokens, Google Fonts, Responsive Container | Fertiggestellt |
| **02** | **Dokumentations-Paper** | Workpaper (dieses Dokument) + Text-Paper (alle Textinhalte) | Fertiggestellt |
| **03** | **Header & Navigation** | Sticky Glassmorphism Header, Logo, Menü-Links (Café, Catering, Events, Überraschungstüte, Jobs), Quick-Action Buttons (Anruf, Mail), Mobile Burger Menu | Schritt 1 (Live) |
| **04** | **Hero Section** | Eleganter Willkommensgruß ("Ein Stückchen Zucker mehr"), Video-Background-Container mit Platzhalter & Overlay, Call-to-Actions ("Genussangebot entdecken", "Tisch reservieren"), Quick-Facts | Schritt 1 (Live) |
| **05** | **Genuss-Übersicht (Lounge)** | Konzept 3 (Interaktive Genuss-Lounge): Spotlight-Bühne für alle 6 Spezialitäten, Floating Category Dock, Stepper-Arrows, Kuchengalerie-Wechsler & mobile Swipe-Optimierung | Schritt 2 (Live) |
| **06** | **Buchungs- & Reservierungsformular** | Interaktives 2-Spalten Reservierungsmodul (`#reservierung`): Name, Tel, Gästeanzahl, Kalender, Wünsche, Kulanzregel-Hinweis, Success-State | Schritt 3 (Live) |
| **07** | **Footer & Rechtliches** | Pre-Footer VIP-Buchungsbanner, 4 Themensäulen (Öffnungszeiten, Anfahrt/Lage, Kontakt/Genuss, Too Good To Go), LegalModal (Impressum & Datenschutz), Back-to-Top | Schritt 4 (Live) |
| **08** | **Catering & Events** | Individuelle Angebote für Firmen & Familienfeiern | Geplant |
| **09** | **Überraschungstüte** | Too Good To Go Einbindung & Engagement gegen Lebensmittelverschwendung | Geplant |
| **10** | **Jobs / Team** | Kultur im Kaffeehaus, aktuelle Vakanzen & unkomplizierte Bewerbung | Fertiggestellt (Live) |


---

## 4. Spezifikation: Schritt 1 (Header + Hero Section)

### 4.1 Header & Navigation:
- **Logo:** Stilvoller Schriftzug „Café Praha“ mit böhmischer Lilie/Kaffeebohnen-Monogramm oder SVG-Vektor.
- **Navigationslinks:**
  - *Café* (Sprungmarke zu den Spezialitäten / Hero)
  - *Catering*
  - *Veranstaltungen*
  - *Überraschungstüte*
  - *Jobs*
- **Aktionsknöpfe:**
  - Direktanruf: `tel:+4935837964364`
  - Tisch anfragen / Mail: `mailto:kontakt@cafepraha.de`
- **Mobile Experience:** Voll responsives Off-Canvas- / Dropdown-Menü mit weichen Übergängen und Touch-Optimierung.

### 4.2 Hero Section mit Video-Background:
- **Hintergrund-Architektur:**
  - `<video>`-Tag mit `autoplay`, `loop`, `muted`, `playsInline`.
  - Dynamischer Video-Pfad konfigurierbar (z.B. `/video/cafe-praha-tour.mp4`).
  - **Platzhalter / Ambient-State:** Bis das finale MP4 hochgeladen wird, greift ein edler Ambient-Video-/Bild-Layer mit stimmungsvoller Belichtung, dezentem Zoom-Effekt (Ken-Burns) und warmem Vignette-Overlay.
  - Halbtransparentes Dark-Coffee-Gradient-Overlay zur Gewährleistung maximaler Text-Kontraste nach WCAG-Standards.
- **Hero-Content:**
  - Elegante Badge: *Traditionelle böhmische Spezialitäten & Kaffeehauskultur in Zittau*
  - Haupttitel: **Willkommen im Café Praha**
  - Poetisches Zitat: *„Manchmal braucht es nur ein bisschen mehr Süße, um das Beste aus jedem Tag zu machen.“* – inspiriert von Karel Gott
  - Subtitel: *„Ein Moment der Ruhe, ein guter Kaffee und ein Stück Glück“*
  - Primärer CTA: `Genussangebot entdecken`
  - Sekundärer CTA: `Tisch reservieren (03583 7964364)`
  - Quick-Status-Badge: `Täglich geöffnet von 09:00 – 18:00 Uhr | Frühstück 09:00 – 11:00 Uhr`

---

## 5. Qualitätskriterien & Best Practices

1. **Aesthetische Exzellenz:** Keine schlichten MVP-Styles. Hochwertiges Layout mit Glassmorphismus (`backdrop-filter: blur`), weichen Schatten (`box-shadow`), feinen goldenen Rahmenlinien und stimmiger Typografie.
2. **Performance:** Bildoptimierung, verzögertes Nachladen, sauberes Bundle.
3. **Barrierefreiheit (a11y):** Korrekte Kontraste, ARIA-Labels für Navigation und Buttons, funktionierende Tastaturnavigation.
4. **Erweiterbarkeit:** Modulare Komponentenstruktur in `src/components/`, sodass jede weitere Section nahtlos eingeklinkt werden kann.

---

## 6. Spezifikation: Schritt 2 (Genussspezialitäten Lounge - Konzept 3)

### 6.1 Architektur & Interaktion (`src/components/GenussLounge.tsx`):
- **Kategorie-Dock:** Horizontales Floating-Dock mit Schnellzugriff auf alle 6 Genusswelten (Kaffee, Chlebíčky, Kuchen & Gebäck, Frühstück, Eis, Mittagstisch).
- **Cinematic Stage:** 
  - Großzügige 2-Spalten-Spotlight-Bühne mit weichen Übergängen (`fade-in` / `fade-out`, Skalierung).
  - Links: Großes Genussfoto mit Vignette, Qualitäts-Badge oben, Tag-Pills unten und einer interaktiven 5-Bilder-Galerieleiste bei Kuchen & Gebäck.
  - Rechts: Exakte Originaltexte, Kategorie-Zitate, Feature-Bulletpoints mit goldenen Checkmarks, Zeit- und Saison-Hinweise (z.B. Frühstück 9–11 Uhr, Mittagstisch ab 01.10.) sowie Tisch-Reservierungs-CTA.
- **Mobile-Verhalten:** Automatisches Stacking, Touch-optimiertes Dock mit horizontalem Scrollen und bequeme Pfeil-Navigation (Stepper).
- **Test-Labor:** Weiterhin verfügbar unter `/genuss-test.html` zum direkten Vergleichen der 3 Konzepte.

---

## 7. Spezifikation: Schritt 3 (Buchungs- & Reservierungsformular)

### 7.1 Architektur & Interaktion (`src/components/ReservationSection.tsx`):
- **Sektions-ID:** `#reservierung` – Direkt ansteuerbar aus Navigation, Hero und Footer.
- **Komprimierte, zentrierte Fokus-Bühne (Höhenreduktion um ~55%):**
  - *Header:* Kompakte Headline + 3 Trust-Pills (*10 Min. Kulanzfrist*, *Gruppen bis 25 Personen*, *Täglich 9:00 – 18:00 Uhr*).
  - *Zentrales Formular:*
    - Zeile 1: Name & Telefonnummer für Bestätigung (2 Spalten).
    - Zeile 2: Datum & Uhrzeit mit direkter Slotauswahl (2 Spalten).
    - Zeile 3: Gäste-Schnellauswahl via 1-Klick-Pills (1–8 Gäste + Inline-Stepper bis 25).
    - Zeile 4: Wünsche & Anmerkungen (kompakter 2-Zeiler).
    - Zeile 5: Aktionszeile mit Live-Zusammenfassung und prominenter Gold-CTA (*„Tisch verbindlich reservieren“*).
  - *Spontan-Leiste darunter:* Direkter telefonischer Anruf für tagesgleiche Spontanbesuche (*03583 7964364*).
  - *Erfolgs-State:* Kompaktes *„Děkujeme!“* mit Referenznummer und Kulanz-Hinweis.


---

## 8. Spezifikation: Schritt 4 (Footer & Rechtliches mit Buchungsfokus)

### 8.1 Architektur & Ebenen (`src/components/Footer.tsx` & `src/components/LegalModal.tsx`):
- **Ebene 1: Pre-Footer „Reservierungs-Kompass“:**
  - Markanter Callout-Banner mit goldenem Umgebungslicht.
  - Primär-CTA: *„Tisch online reservieren“* mit sanftem Scroll zur `#reservierung`-Sektion, Fokus auf das Namensfeld und optischem `.pulse-glow`-Hervorhebungseffekt auf das Formular.
  - Sekundär-CTA: *„Spontan reservieren: 03583 7964364“* als direkter `tel:`-Link.
  - Vertrauens-Pills für 25 Personen, 10-Minuten-Kulanzregel und kostenfreie Online-Anfrage.
- **Ebene 2: Haupt-Footer (4 Themensäulen):**
  - *Spalte 1:* Café Praha Markenzeichen mit animiertem Dampf-SVG, Karel Gott Zitat & *Too Good To Go* Nachhaltigkeits-Badge (Überraschungstüte).
  - *Spalte 2:* Öffnungszeiten mit dezent pulsierender Live-Statusampel (grün-gold) und Frühstückshinweisen.
  - *Spalte 3:* Lage & Anreise (Innere Weberstraße 3 & 8, 02763 Zittau), Google Maps Routenplaner-Button und Tipps für Fußgänger, PKW und Radfahrer.
  - *Spalte 4:* Direktkontakt, Telefon- und Mailkarten, 10-Minuten-Kulanzregel-Box und Schnellzugriff auf Genusswelten.
- **Ebene 3: Sub-Footer & Barrierefreies Legal-Modal:**
  - Betreiberangaben (*Fashion Queen Zittau HDK UG (haftungsbeschränkt)*, GF Lucas Koch, HRB 42023 Dresden, USt-ID DE348958772).
  - Interaktives `LegalModal.tsx` mit Reitern für *Impressum*, *Datenschutz* und *Reservierungsregeln* – kein Verlassen der Seite oder 404-Fehler.
  - *„Nach oben“*-Button mit sanfter Rückkehr an den Seitenanfang und Porzellan-Chime via Web Audio API.

---

## 9. Spezifikation: Schritt 5 (Jobs-Seite als komprimierte Schnellbewerbung)

### 9.1 Architektur & Interaktion (`src/components/JobsPage.tsx`):
- **Hash-Routing (`#jobs`):**
  - Direkte Verlinkung via `cafepraha.de/#jobs` möglich.
  - Nahtloser Wechsel zwischen Startseite (`'cafe'`) und Schnellbewerbung (`'jobs'`) ohne Seiten-Reload.
  - Volle Unterstützung von Browser-Historie (`hashchange`) und sanfter Scroll-to-Top Übergang.
- **Kompakte Struktur mit alleinigem Fokus auf das Formular:**
  - Zurück-Button: *„← Zurück zur Startseite“* & Statuspill *„Blitz-Bewerbung in 30 Sekunden“*.
  - **Ein einheitlicher Aufgabenbereich:** *Mitarbeiter im Café Praha (Service, Barista & Theke)* – alle Aufgaben greifen ineinander.
  - **Sidebar:** Kompakte Vorschau des Team-Fotos (`cafe_praha_wartet_auf_dich.png`), 3 Key-Facts (09:00–18:00 Uhr, keine Nachtschichten; freier Kaffeegenuss; Quereinsteiger willkommen) und Direktkontakt.
  - **Fokussiertes Schnellbewerbungs-Formular:**
    1. Schnellauswahl Arbeitszeitmodell (*Vollzeit, Teilzeit, Minijob, Aushilfe*)
    2. Name (Pflichtfeld)
    3. Telefon/WhatsApp (Pflichtfeld) & E-Mail
    4. Kurze Nachricht (optional, 1–2 Zeilen)
    5. **Kein Datei-Upload** – Hürdenfreie Blitz-Bewerbung in unter 30 Sekunden.
    6. Datenschutz-Einwilligung (1 Klick)
    7. CTA-Button: *„Schnellbewerbung absenden →“*
  - **Kompakter Success-State:** Sofortige Bestätigung (*„Děkujeme!“*) mit Zusammenfassung und Rückkehr-Option.



