export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export interface CafeInfo {
  name: string;
  claim: string;
  quoteTitle: string;
  quoteAuthor: string;
  quoteSong: string;
  quoteText: string;
  address: {
    street: string;
    city: string;
    zip: string;
    note: string;
  };
  contact: {
    phone: string;
    phoneDisplay: string;
    email: string;
  };
  hours: {
    regular: string;
    breakfast: string;
  };
  reservationNote: string;
}

export interface GenussGalleryItem {
  src: string;
  label: string;
}

export interface GenussCategory {
  id: string;
  label: string;
  shortLabel: string;
  iconName: string;
  eyebrow: string;
  title: string;
  desc: string;
  quote?: string;
  specialNotice?: {
    text: string;
    type?: 'gold' | 'alert' | 'info';
  };
  badge: string;
  image: string;
  features: string[];
  tags: string[];
  galleryLabel?: string;
  galleryImages?: GenussGalleryItem[];
}

export interface LegalInfo {
  company: string;
  address: string;
  taxId: string;
  commercialRegister: string;
  managingDirector: string;
  managementEmail: string;
  venueAddress: string;
}

export type JobEmploymentType = 'vollzeit' | 'teilzeit' | 'minijob' | 'aushilfe';

export interface JobRole {
  id: string;
  title: string;
  shortDesc: string;
  iconName: 'coffee' | 'cake' | 'sandwich' | 'sparkles';
  badge: string;
  tasks: string[];
}

export interface JobBenefit {
  iconName: 'sun' | 'coffee' | 'heart' | 'mapPin' | 'users' | 'sparkles';
  title: string;
  desc: string;
}

export interface JobApplicationData {
  employmentType: JobEmploymentType;
  fullName: string;
  phone: string;
  email: string;
  message: string;
  privacyAccepted: boolean;
}




