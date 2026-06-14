import { describe, it, expect } from 'vitest';
import { mapContactFromDTO, mapEmailAddressFromDTO } from './contact.mapper';
import { ContactDTO, EmailAddressDTO } from './contact.model';

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockContactDTO: ContactDTO = {
  id: '1',
  fullName: 'Johanna Stevens',
  firstName: 'Johanna',
  lastName: 'Stevens',
  avatar: 'https://example.com/avatar.jpg',
  jobTitle: 'UI/UX Designer',
  status: true,
  bio: 'Some bio text',
  address: '123 Main Street',
  dial: '4878',
  meeting: 'https://meet.example.com/johanna',
  phones: [{ number: '439-582-1578', primary: true }],
  social: { facebook: 'https://facebook.com/johanna' },
  createdAt: '2026-06-14T10:00:00.000Z',
};

const mockEmailAddressDTO: EmailAddressDTO = {
  id: '1',
  contactId: '1',
  primaryEmail: 'johanna@gmail.com',
  secondaryEmail: 'johanna@whiteui.store',
  createdAt: '2026-06-14T10:00:00.000Z',
};

// ── mapContactFromDTO ──────────────────────────────────────────────────────

describe('mapContactFromDTO', () => {
  it('maps all base fields correctly', () => {
    const result = mapContactFromDTO(mockContactDTO);

    expect(result.id).toBe('1');
    expect(result.fullName).toBe('Johanna Stevens');
    expect(result.firstName).toBe('Johanna');
    expect(result.lastName).toBe('Stevens');
    expect(result.avatar).toBe('https://example.com/avatar.jpg');
    expect(result.jobTitle).toBe('UI/UX Designer');
    expect(result.bio).toBe('Some bio text');
    expect(result.address).toBe('123 Main Street');
    expect(result.dial).toBe('4878');
    expect(result.meeting).toBe('https://meet.example.com/johanna');
  });

  it('maps status true to "online"', () => {
    const result = mapContactFromDTO({ ...mockContactDTO, status: true });
    expect(result.status).toBe('online');
  });

  it('maps status false to "offline"', () => {
    const result = mapContactFromDTO({ ...mockContactDTO, status: false });
    expect(result.status).toBe('offline');
  });

  it('converts createdAt string to a Date object', () => {
    const result = mapContactFromDTO(mockContactDTO);
    expect(result.createdAt).toBeInstanceOf(Date);
    expect(result.createdAt.getFullYear()).toBe(2026);
  });

  it('maps phones array correctly', () => {
    const result = mapContactFromDTO(mockContactDTO);
    expect(result.phones).toHaveLength(1);
    expect(result.phones[0].number).toBe('439-582-1578');
    expect(result.phones[0].primary).toBe(true);
  });

  it('maps social object correctly', () => {
    const result = mapContactFromDTO(mockContactDTO);
    expect(result.social.facebook).toBe('https://facebook.com/johanna');
  });

  it('defaults phones to empty array when undefined', () => {
    const result = mapContactFromDTO({ ...mockContactDTO, phones: undefined as any });
    expect(result.phones).toEqual([]);
  });

  it('defaults social to empty object when undefined', () => {
    const result = mapContactFromDTO({ ...mockContactDTO, social: undefined as any });
    expect(result.social).toEqual({});
  });
});

// ── mapEmailAddressFromDTO ─────────────────────────────────────────────────

describe('mapEmailAddressFromDTO', () => {
  it('maps primary and secondary email correctly', () => {
    const result = mapEmailAddressFromDTO(mockEmailAddressDTO);
    expect(result.primary).toBe('johanna@gmail.com');
    expect(result.secondary).toBe('johanna@whiteui.store');
  });
});
