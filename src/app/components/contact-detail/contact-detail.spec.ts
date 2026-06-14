import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactDetail } from './contact-detail';
import { signal } from '@angular/core';
import { Contact, EmailAddress } from '../../types/contact.model';
import { ContactsService } from '../../services/contacts.service';

// ── Fixtures ───────────────────────────────────────────────────────────────

const mockContact: Contact = {
  id: '1',
  fullName: 'Johanna Stevens',
  firstName: 'Johanna',
  lastName: 'Stevens',
  avatar: 'https://example.com/avatar.jpg',
  jobTitle: 'UI/UX Designer',
  status: 'online',
  bio: 'When I first got into advertising...',
  address: '123 Main Street',
  dial: 'j.stevens@ymsg.com',
  meeting: 'https://meet.example.com/j.stevens',
  phones: [
    { number: '439-582-1578', primary: true },
    { number: '621-770-7689', primary: false },
  ],
  social: {
    facebook: 'https://facebook.com',
    linkedin: 'https://linkedin.com',
  },
  createdAt: new Date(),
};

const mockEmails: EmailAddress = {
  primary: 'johanna@gmail.com',
  secondary: 'johanna@whiteui.store',
};

// ── Mock Service ───────────────────────────────────────────────────────────

const mockService = {
  selectedContactDetail: signal<Contact | null>(null),
  selectedContactEmails: signal<EmailAddress | null>(null),
  isDetailPageLoading: signal(false),
  hasDetailError: signal(undefined),
};

// ── Component Tests ────────────────────────────────────────────────────────

describe('ContactDetail', () => {
  let fixture: ComponentFixture<ContactDetail>;
  let component: ContactDetail;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactDetail],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContactsService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ── Empty State ──────────────────────────────────────────────────────────

  it('should show empty state when no contact is selected', () => {
    mockService.selectedContactDetail.set(null);
    fixture.detectChanges();
    const empty = fixture.nativeElement.querySelector('.state-centered');
    expect(empty).toBeTruthy();
  });

  // ── Loading State ────────────────────────────────────────────────────────

  it('should show loading state when detail is loading', () => {
    mockService.isDetailPageLoading.set(true);
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector('.spinning');
    expect(loading).toBeTruthy();
  });

  // ── Contact Detail ───────────────────────────────────────────────────────

  it('should display contact fullName when selected', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const name = fixture.nativeElement.querySelector('h2');
    expect(name.textContent.trim()).toBe('Johanna Stevens');
  });

  it('should display contact jobTitle', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const jobTitle = fixture.nativeElement.querySelector('.job-title');
    expect(jobTitle.textContent.trim()).toBe('UI/UX Designer');
  });

  it('should display bio text', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const bio = fixture.nativeElement.querySelector('.row-value');
    expect(bio.textContent.trim()).toContain('advertising');
  });

  it('should display avatar with correct src', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const avatar = fixture.nativeElement.querySelector('.avatar');
    expect(avatar.getAttribute('src')).toBe('https://example.com/avatar.jpg');
  });

  // ── Emails ───────────────────────────────────────────────────────────────

  it('should display primary email', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.selectedContactEmails.set(mockEmails);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('johanna@gmail.com');
  });

  it('should display secondary email', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.selectedContactEmails.set(mockEmails);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('johanna@whiteui.store');
  });

  // ── Phone ────────────────────────────────────────────────────────────────

  it('should display phone numbers', () => {
    mockService.selectedContactDetail.set(mockContact);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const content = fixture.nativeElement.textContent;
    expect(content).toContain('439-582-1578');
    expect(content).toContain('621-770-7689');
  });

  // ── Error State ──────────────────────────────────────────────────────────

  it('should show error state when detail fails to load', () => {
    mockService.hasDetailError.set(new Error('Failed') as any);
    mockService.isDetailPageLoading.set(false);
    fixture.detectChanges();
    const error = fixture.nativeElement.querySelector('.error');
    expect(error).toBeTruthy();
  });
});
