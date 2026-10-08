import { NavItem, CafeInfo, GenussCategory, JobEmploymentType } from '../types';

export interface SpecialtyPreviewItem {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'genuss', label: 'Genussspezialitäten', href: '#genuss' },
  { id: 'jobs', label: 'Jobs', href: '#jobs' },
];

export const SPECIALTY_PREVIEWS: SpecialtyPreviewItem[] = [
  {
    id: 'kaffee',
    title: 'Prager Röstungen',
    desc: 'Vom samtigen Espresso bis zur traditionellen Wiener Melange mit feiner Milchschaumhaube.',
    image: '/images/genuss/rosenblueten-latte-macchiato-kaffeespezialitaet-cafe-praha.webp',
    href: '#genuss',
  },
  {
    id: 'chlebicky',
    title: 'Böhmische Chlebíčky',
    desc: 'Tradition auf der Schnitte: Belegt mit Prager Schinken, Eiersalat, Gurke & Kartoffelsalat.',
    image: '/images/genuss/chlebicky-baguettes-snackvitrine-theke-cafe-praha.webp',
    href: '#genuss',
  },
  {
    id: 'backkunst',
    title: 'Süße Kunstwerke',
    desc: 'Hausgebackene böhmische Schnecken, Schichttorten und Eierkuchen-Oase.',
    image: '/images/genuss/tschechische-kuchenvitrine-vetrnik-torten-cafe-praha.webp',
    href: '#genuss',
  },
  {
    id: 'fruehstueck',
    title: 'Frühstück (9–11 Uhr)',
    desc: 'Cremiges Rührei, reichhaltige Teller und das beliebte knusprige Café Praha Sandwich.',
    image: '/images/genuss/cafe-praha-sandwich-baguette-spiegelei-bacon-nahaufnahme.webp',
    href: '#genuss',
  },
];


export const CAFE_INFO: CafeInfo = {
  name: 'Café Praha',
  claim: 'Ein Moment der Ruhe, ein guter Kaffee und ein Stück Glück',
  quoteTitle: 'Kávu si osladím',
  quoteAuthor: 'Karel Gott',
  quoteSong: 'Ein Stückchen Zucker mehr',
  quoteText: 'Manchmal braucht es nur ein bisschen mehr Süße, um das Beste aus jedem Tag zu machen.',
  address: {
    street: 'Innere Weberstraße 3 & 8',
    zip: '02763',
    city: 'Zittau',
    note: 'Im malerischen, historischen Stadtkern von Zittau – folgen Sie einfach dem Kaffeeduft.',
  },
  contact: {
    phone: '+4935837964364',
    phoneDisplay: '+49 (0) 3583 7964364',
    email: 'kontakt@cafepraha.de',
  },
  hours: {
    regular: 'Täglich von 9:00 – 18:00 Uhr',
    breakfast: 'Mo–So von 9:00 – 11:00 Uhr (oder auf Reservierung)',
  },
  reservationNote: 'Gruppenreservierungen bis max. 25 Personen möglich. Nach 10-minütiger Verspätung wird der Tisch für andere Gäste freigegeben.',
};

export const HERO_DATA = {
  badge: 'Böhmische Spezialitäten & Kaffeekultur im Dreiländereck',
  titleHighlight: 'Café Praha',
  titleSubtitle: 'Ein Hauch von Prag mitten in Zittau',
  intro:
    'Manchmal sind es die kleinen, aber feinen Dinge, die den Alltag aufhellen – ein Lächeln, ein freundliches Wort oder ein Moment der Ruhe. Und natürlich: ein Stück köstlicher, frisch gebackener Leckerei.',
  subIntro:
    'Im Café Praha glauben wir, dass wahre Lebensfreude durch diese „Extraportionen“ entsteht – die kleinen Genüsse, die selbst graue Tage in strahlende Farben tauchen.',
  atmosphereNote:
    'Bei uns genießen Sie weit mehr als nur ein Getränk oder ein Gebäckstück. Tauchen Sie ein in eine Atmosphäre voller Herzlichkeit und Gemütlichkeit und lassen Sie sich von unseren Köstlichkeiten verführen, die das Leben versüßen.',
  image: '/images/Header1.png',
  video: {
    src: '/video/cafe-praha-tour.mp4',
    poster: '/images/Header1.png',
    tourTitle: 'Virtuelle Kaffeehaus-Führung',
    placeholderNotice: 'Führungsvideo im Upload – Platzhalter aktiv',
  },
  quickFeatures: [
    { label: 'Öffnungszeiten', value: 'Täglich 9:00 – 18:00' },
    { label: 'Frühstück', value: 'Mo–So 9:00 – 11:00' },
    { label: 'Spezialität', value: 'Chlebíčky & böhmische Torten' },
    { label: 'Lage', value: 'Innere Weberstraße 3 & 8' },
  ],
};

export const GENUSS_CATEGORIES: GenussCategory[] = [
  {
    id: 'kaffee',
    label: 'Kaffeespezialitäten',
    shortLabel: 'Kaffee',
    iconName: 'coffee',
    eyebrow: 'Kategorie 1 von 6 • Prager Röstkunst',
    title: 'Kaffeespezialitäten im Café Praha – von klassisch bis außergewöhnlich',
    desc: 'Ob klassischer Cappuccino, kräftiger Espresso oder ein kunstvoller Latte Macchiato mit besonderer Geschmacksnote wie samtigem Lavendel – wir servieren Ihnen Kaffee, so wie Sie ihn lieben.',
    quote: '„Manchmal braucht es nur ein bisschen mehr Süße, um das Beste aus jedem Tag zu machen.“ – Karel Gott',
    badge: '☕ Handgeröstet & Vollmundig',
    image: '/images/genuss/lavendel-latte-spezialitaet-kaffeekunst-cafe-praha-zittau.webp',
    features: [
      'Klassischer Cappuccino, samtiger Espresso & aromatischer Latte Macchiato',
      'Exklusives Highlight: Samtiger Lavendel-Latte & kreative Röstkunst',
      'Eiskaffee mit frischer Minze auf unserer sonnigen Außenterrasse',
    ],
    tags: ['Lavendel-Latte', 'Latte Macchiato', 'Eiskaffee', 'Espresso'],
    galleryLabel: 'Kaffeespezialitäten & Signature Drinks:',
    galleryImages: [
      { src: '/images/genuss/lavendel-latte-spezialitaet-kaffeekunst-cafe-praha-zittau.webp', label: 'Violetter Lavendel-Latte' },
      { src: '/images/genuss/eiskaffee-latte-macchiato-aussensitzbereich-cafe-praha.webp', label: 'Eiskaffee & Latte auf der Terrasse' },
      { src: '/images/genuss/latte-macchiato-aperitif-kaffeehaus-atmosphaere-cafe-praha.webp', label: 'Latte Macchiato & Aperitif' },
    ],
    specialNotice: {
      text: 'Täglich frisch zubereitet mit samtiger Crema',
      type: 'gold',
    },
  },
  {
    id: 'chlebicky',
    label: 'Baguettes & Chlebíčky',
    shortLabel: 'Chlebíčky',
    iconName: 'sandwich',
    eyebrow: 'Kategorie 2 von 6 • Böhmische Tradition',
    title: 'Der Geschmack Tschechiens – auf einer kleinen Schnitte in Zittau',
    desc: 'Ein Café mit tschechischem Flair ohne Chlebíčky? Undenkbar! Die beliebten belegten Brote sind ein Klassiker bei uns – frisch, raffiniert und in verschiedenen Varianten erhältlich. Dazu bieten wir frisch belegte Baguettes mit Hähnchen, Schinken, Käse, Ei oder Salami – perfekt für den herzhaften Genuss zwischendurch.',
    quote: '„Ob mit Eiersalat, Schinken, Käse oder würziger Debreziner – sie sind ein Muss für Kenner und Neugierige gleichermaßen.“',
    badge: '🥪 Tschechischer Nationalstolz',
    image: '/images/genuss/chlebicky-baguettes-snackvitrine-theke-cafe-praha.webp',
    features: [
      'Original Chlebíčky mit Eiersalat, Schinken, Käse oder Debreziner',
      'Frisch belegte Baguettes & Wraps für den schnellen, herzhaften Hunger',
      'Ideal auch als geschätztes Catering für Feiern & Events',
    ],
    tags: ['Chlebíčky', 'Eiersalat', 'Prager Schinken', 'Debreziner', 'Frische Baguettes'],
    galleryLabel: 'Chlebíčky & Baguette-Spezialitäten:',
    galleryImages: [
      { src: '/images/genuss/chlebicky-baguettes-snackvitrine-theke-cafe-praha.webp', label: 'Frische Snackvitrine' },
      { src: '/images/genuss/chlebicky-catering-platte-belegte-brote-cafe-praha.webp', label: 'Chlebíčky Schinken & Ei' },
      { src: '/images/index/der_geschmack_tschechiens_auf_einer_kleinen_schnitte_in_zittau.jpg', label: 'Tradition auf der Schnitte' },
      { src: '/images/genuss/theke-vitrine-chlebicky-kuchen-cafe-praha-zittau.webp', label: 'Thekenfront im Café' },
    ],
    specialNotice: {
      text: 'Täglich frisch belegt an unserer Theke',
      type: 'gold',
    },
  },
  {
    id: 'kuchen',
    label: 'Kuchen & Gebäck',
    shortLabel: 'Kuchen & Gebäck',
    iconName: 'cake',
    eyebrow: 'Kategorie 3 von 6 • Tschechische Backkunst',
    title: 'Süße Kunstwerke & Stücke vom Glück in Zittau',
    desc: 'Unsere Kuchentheke gleicht einer süßen Schatztruhe: zartschmelzende Torten, luftig-leichte Cremeschnitten, feine Blätterteiggebäcke und knusprige Nusskörbchen warten darauf, entdeckt zu werden. Klassiker wie die sahnige Florida-Torte, Větrník (Windbeutel), die legendäre Sachertorte oder die unwiderstehlichen Pariser Waffelröllchen laden zum Genießen ein.',
    quote: '„Süße Verführung in jeder Schicht und unter jeder Haube – blumig-fruchtige Genussmomente & kleine Schnecken für große Glücksmomente.“',
    badge: '🍰 Meisterhafte Konditorkunst',
    image: '/images/genuss/tschechische-kuchenvitrine-vetrnik-torten-cafe-praha.webp',
    features: [
      'Florida-Torte, Sachertorte mit Bourbon-Vanilleeis & Pariser Waffelröllchen',
      'Original Větrník, Kokoska, Rumkugeln & böhmische Schnecken',
      'Täglich wechselnde Vielfalt meisterhafter Backwaren in der Glasvitrine',
    ],
    tags: ['Větrník', 'Sachertorte mit Eis', 'Pariser Waffelröllchen', 'Böhmische Schnecken', 'Florida-Torte'],
    galleryLabel: 'Böhmische Meisterwerke & Torten:',
    galleryImages: [
      { src: '/images/genuss/tschechische-kuchenvitrine-vetrnik-torten-cafe-praha.webp', label: 'Kuchenvitrine & Větrník' },
      { src: '/images/genuss/schokoladentorte-mit-vanilleeis-feingebaeck-cafe-praha.webp', label: 'Schokoladentorte mit Vanilleeis' },
      { src: '/images/index/suesse_kunstwerke_im_cafe_praha_in_zittau_geniessen.jpg', label: 'Süße Kunstwerke' },
      { src: '/images/index/blumig_fruchtige_genussmomente_im_cafe_praha_in_zittau.jpg', label: 'Blumig-fruchtige Momente' },
      { src: '/images/index/kleine_schnecken_fuer_grosse_gluecksmomente_im_cafe_praha.jpg', label: 'Böhmische Schnecken' },
      { src: '/images/index/suesse_verfuehrung_in_jeder_schicht_und_unter_jeder_haube_cafe_praha_zittau.jpg', label: 'Süße Verführung' },
    ],
    specialNotice: {
      text: 'Hausgemachte Spezialitäten nach böhmischen Rezepten',
      type: 'gold',
    },
  },
  {
    id: 'fruehstueck',
    label: 'Frühstück & Sandwich',
    shortLabel: 'Frühstück',
    iconName: 'sun',
    eyebrow: 'Kategorie 4 von 6 • Morgendlicher Zauber',
    title: 'Der Café-Praha-Sandwich-Klassiker & Verwöhnfrühstück',
    desc: 'Ein guter Tag beginnt mit einem Frühstück, das keine Wünsche offenlässt. Ob Sie es klassisch, herzhaft oder süß mögen – im Café Praha starten Sie mit einer Auswahl, die Genuss und Gemütlichkeit verbindet. Frisch zubereitet: Cremiges Rührei, krosses Spiegelei, süße Teller mit Croissants & Donuts oder unser legendäres Café Praha Sandwich.',
    quote: '„Beliebt und einzigartig: Unser Café Praha Sandwich – eine unwiderstehliche Kombination aus knusprigem Brot, herzhaftem Belag und fein abgestimmten Zutaten.“',
    badge: '🍳 Mo–So von 9:00 – 11:00 Uhr',
    image: '/images/genuss/cafe-praha-sandwich-baguette-spiegelei-bacon-nahaufnahme.webp',
    features: [
      'Unser Signature-Hit: Das knusprige Café Praha Sandwich mit flüssigem Ei & Bacon',
      'Reichhaltiger Brunch-Teller mit frischem Obst (Melone, Trauben), Brötchen & Saft',
      'Süßer Verwöhnteller mit ofenfrischen Croissants, Schoko-Donuts & Aufstrichen',
    ],
    tags: ['Frühstück 9–11 Uhr', 'Café Praha Sandwich', 'Süßer Frühstücksteller', 'Brunch-Arrangement'],
    galleryLabel: 'Frühstücks- & Brunch-Vielfalt:',
    galleryImages: [
      { src: '/images/genuss/cafe-praha-sandwich-baguette-spiegelei-bacon-nahaufnahme.webp', label: 'Café Praha Sandwich' },
      { src: '/images/genuss/fruehstuecks-sandwich-spiegelei-brunch-teller-cafe-praha.webp', label: 'Brunch & Sandwich Arrangement' },
      { src: '/images/genuss/suesser-fruehstuecksteller-croissants-donuts-cafe-praha.webp', label: 'Süßer Frühstücksteller & Obst' },
      { src: '/images/index/cafe_praha_sandwich_klassiker_mit_ei_und_schinken.jpg', label: 'Sandwich-Klassiker' },
    ],
    specialNotice: {
      text: 'Mo–So von 9:00 – 11:00 Uhr oder auf Vorreservierung',
      type: 'gold',
    },
  },
  {
    id: 'eis',
    label: 'Eis & Eierkuchen',
    shortLabel: 'Eis & Eierkuchen',
    iconName: 'iceCream',
    eyebrow: 'Kategorie 5 von 6 • Kühle Momente & Eierkuchen-Oase',
    title: 'Schleck das Glück – Handwerkliche Eistheke & Eierkuchen-Oase',
    desc: 'Ein Löffel voll cremiger Vanille, das zarte Schmelzen von Schokolade auf der Zunge oder aufregende Eissorten wie Rum-Traube, Johannisbeere-Lavendel oder Mokka-Mandel – Eis ist mehr als nur eine kühle Leckerei, es ist ein kleiner Moment des Glücks. Dazu verführt unsere warme Eierkuchen-Oase mit knusprigen Palatschinken.',
    quote: '„Eine Eierkuchen-Oase mit Schokoeis & Vanilleeis erwartet dich im Café Praha – und für den schnellen Genuss gibt es Eis natürlich auch auf die Hand.“',
    badge: '🍨 10 Handgemachte Eissorten',
    image: '/images/genuss/eistheke-sorten-handgemachtes-eis-cafe-praha-zittau.webp',
    features: [
      'Große Eistheke mit 10 handwerklichen Sorten von Rum-Traube bis Orange-Basilikum',
      'Warme Eierkuchen-Oase: Fein gefaltete Palatschinken mit Schokoeis & Sahne',
      'Kreative Eisbecher: Schoko-Traum, Waldbeer-Trauben-Becher & bunter Kinder-Eisbecher',
    ],
    tags: ['Eistheke 10 Sorten', 'Eierkuchen-Oase', 'Schleck das Glück', 'Kinder-Eisbecher', 'Eis auf die Hand'],
    galleryLabel: 'Eiskreationen & Eierkuchen-Oase:',
    galleryImages: [
      { src: '/images/genuss/eistheke-sorten-handgemachtes-eis-cafe-praha-zittau.webp', label: 'Handwerkliche Eistheke' },
      { src: '/images/genuss/eierkuchen-oase-palatschinken-schokoeis-cafe-praha.webp', label: 'Eierkuchen-Oase' },
      { src: '/images/genuss/eisbecher-schokolade-waldbeere-schleck-das-glueck-cafe-praha.webp', label: 'Schoko- & Waldbeer-Becher' },
      { src: '/images/genuss/schleck-das-glueck-eisbecher-sahne-waffeln-cafe-praha.webp', label: 'Schleck das Glück' },
      { src: '/images/genuss/kinder-eisbecher-smarties-gummibaerchen-cafe-praha.webp', label: 'Bunter Kinder-Eisbecher' },
    ],
    specialNotice: {
      text: 'Regelmäßig neue und saisonale Eissorten',
      type: 'gold',
    },
  },
  {
    id: 'mittag',
    label: 'Mittagstisch',
    shortLabel: 'Mittagstisch',
    iconName: 'soup',
    eyebrow: 'Kategorie 6 von 6 • Deftige böhmische Küche',
    title: 'Typisch tschechisches Mittagessen im Café Praha in Zittau',
    desc: 'Wir servieren wöchentlich wechselnde tschechische Spezialitäten – traditionell, herzhaft und voller Geschmack. Lassen Sie sich überraschen und entdecken Sie neue Lieblingsgerichte aus der böhmischen Küche.',
    quote: '„Ab dem 01.10. wieder im Angebot – wechselnde böhmische Klassiker, frisch zubereitet mit viel Herzblut.“',
    badge: '🍲 Ab 01.10. wieder im Angebot',
    image: '/images/index/typisch_tschechisches_mittagessen_im_cafe_praha_zittau.jpg',
    features: [
      'Wöchentlich wechselnde böhmische Traditionsgerichte',
      'Herzhafte Knödel, sämige Soßen & zartes Fleisch nach Originalrezept',
      'Ab 01.10. wieder im Angebot – Tischreservierung empfohlen',
    ],
    tags: ['Ab 01.10. wieder im Angebot', 'Wöchentlich wechselnd', 'Böhmische Küche'],
    galleryLabel: 'Böhmische Küche & Genussmomente:',
    galleryImages: [
      { src: '/images/index/typisch_tschechisches_mittagessen_im_cafe_praha_zittau.jpg', label: 'Böhmischer Mittagstisch' },
      { src: '/images/genuss/chlebicky-baguettes-snackvitrine-theke-cafe-praha.webp', label: 'Herzhafte Snacks & Wraps' },
      { src: '/images/genuss/theke-vitrine-chlebicky-kuchen-cafe-praha-zittau.webp', label: 'Frisch an der Theke' },
    ],
    specialNotice: {
      text: 'Ab dem 01.10. wieder frisch im Angebot!',
      type: 'alert',
    },
  },
];

export const LEGAL_INFO = {
  company: 'Fashion Queen Zittau HDK UG (haftungsbeschränkt)',
  address: 'Salomonstraße 1, 02826 Görlitz',
  taxId: 'DE348958772',
  commercialRegister: 'Amtsgericht Dresden HRB 42023',
  managingDirector: 'Lucas Koch',
  managementEmail: 'finanzen@fashionqueenzittau.de',
  venueAddress: 'Innere Weberstraße 3 & 8, 02763 Zittau',
};

export const DIRECTIONS_INFO = [
  {
    mode: 'foot',
    title: 'Zu Fuß',
    desc: 'Ein entspannter Spaziergang durch die Zittauer Altstadt führt direkt zu uns.',
  },
  {
    mode: 'car',
    title: 'Mit dem Auto',
    desc: 'Parkmöglichkeiten in unmittelbarer Nähe im historischen Zentrum vorhanden.',
  },
  {
    mode: 'bike',
    title: 'Mit dem Fahrrad',
    desc: 'Fahrradstellplätze direkt vor Ort vorhanden – ideal für Genusstouren.',
  },
];

export const FOOTER_GENUSS_LINKS = [
  { label: 'Prager Kaffeekunst', href: '#genuss' },
  { label: 'Böhmische Chlebíčky', href: '#genuss' },
  { label: 'Hausgebackene Kuchen', href: '#genuss' },
  { label: 'Frühstück (9–11 Uhr)', href: '#genuss' },
  { label: 'Eis & Eierkuchen-Oase', href: '#genuss' },
  { label: 'Mittagstisch (ab 01.10.)', href: '#genuss' },
  { label: 'Online Tisch reservieren', href: '#reservierung' },
];

export const JOB_EMPLOYMENT_OPTIONS: { id: JobEmploymentType; label: string }[] = [
  { id: 'vollzeit', label: 'Vollzeit' },
  { id: 'teilzeit', label: 'Teilzeit' },
  { id: 'minijob', label: 'Minijob (538 €)' },
  { id: 'aushilfe', label: 'Aushilfe / Student' },
];

export const JOB_DATA = {
  badge: 'Schnellbewerbung • Café Praha Zittau',
  title: 'Werde Teil unseres Café Praha Teams',
  subtitle: 'Ein vielseitiger Bereich: Service, Barista & Theke greifen bei uns harmonisch ineinander.',
  roleTitle: 'Mitarbeiter im Café Praha (Service, Barista & Theke)',
  roleScope:
    'In unserem Kaffeehaus packen alle Hand in Hand an: Herzlicher Gästeservice, Zubereitung aromatischer Kaffeespezialitäten an der Siebträgermaschine, Betreuung der Kuchen- und Eistheke sowie das frische Anrichten traditioneller Chlebíčky.',
  keyFacts: [
    { label: 'Arbeitszeiten', text: 'Täglich 09:00 – 18:00 Uhr – keine Nacht- oder Spätschichten' },
    { label: 'Kaffeekultur', text: 'Freier Kaffeegenuss während der Schicht & attraktiver Mitarbeiterrabatt' },
    { label: 'Einstieg', text: 'Quereinsteiger oder Gastronomie-Erfahrung – wir arbeiten dich herzlich ein' },
  ],
  image: '/images/catering/cafe_praha_wartet_auf_dich.png',
  imageAlt: 'Café Praha wartet auf dich – Kuchentheke und Silhouette',
  coffeeInvitation:
    'Lieber gleich persönlich vorstellen? Komm einfach auf einen Kaffee vorbei oder ruf uns an!',
  phoneDisplay: '+49 (0) 3583 7964364',
  phoneCall: '+4935837964364',
  email: 'kontakt@cafepraha.de',
};




