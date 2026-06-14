// ── Contacts API (/contacts) ───────────────────────────────────────────────

export interface ContactDTO {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  jobTitle: string;
  status: boolean;
  address: string;
  dial: string;
  meeting: string;
  bio: string;
  phones: PhoneDTO[];
  social: SocialDTO;
  createdAt: string;
}

export interface PhoneDTO {
  number: string;
  primary: boolean;
}

export interface SocialDTO {
  facebook?: string;
  pinterest?: string;
  twitter?: string;
  linkedin?: string;
  google?: string;
}

// ── Email Addresses API  ───────────────────

export interface EmailAddressDTO {
  id: string;
  contactId: string;
  primaryEmail: string;
  secondaryEmail: string;
  createdAt: string;
}

// ── Domain Models  ─────────────────────────────────────

export interface Contact {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  avatar: string;
  jobTitle: string;
  status: 'online' | 'offline';
  address: string;
  dial: string;
  meeting: string;
  bio: string;
  phones: Phone[];
  social: Social;
  createdAt: Date;
}

export interface EmailAddress {
  primary: string;
  secondary: string;
}

export interface Phone {
  number: string;
  primary: boolean;
}

export interface Social {
  facebook?: string;
  pinterest?: string;
  twitter?: string;
  linkedin?: string;
  google?: string;
}
