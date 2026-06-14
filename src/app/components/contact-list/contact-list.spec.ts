import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ContactList } from './contact-list';
import { signal, computed } from '@angular/core';
import { Contact } from '../../types/contact.model';
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
  bio: 'Some bio',
  address: '123 Main Street',
  dial: '4878',
  meeting: 'https://meet.example.com',
  phones: [],
  social: {},
  createdAt: new Date(),
};

// ── Mock Service ───────────────────────────────────────────────────────────

const mockService = {
  filteredContacts: signal<Contact[]>([mockContact]),
  selectedContact: signal<Contact | null>(null),
  isLoading: signal(false),
  hasError: signal(undefined),
  setSearch: vi.fn(),
  selectContact: vi.fn(),
};

// ── Component Tests ────────────────────────────────────────────────────────

describe('ContactList', () => {
  let fixture: ComponentFixture<ContactList>;
  let component: ContactList;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ContactsService, useValue: mockService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render contact list items', () => {
    const items = fixture.nativeElement.querySelectorAll('.contact-item');
    expect(items.length).toBe(1);
  });

  it('should display contact fullName', () => {
    const name = fixture.nativeElement.querySelector('.contact-name');
    expect(name.textContent.trim()).toBe('Johanna Stevens');
  });

  it('should display contact jobTitle', () => {
    const role = fixture.nativeElement.querySelector('.contact-role');
    expect(role.textContent.trim()).toBe('UI/UX Designer');
  });

  it('should call setSearch when input changes', () => {
    const input = fixture.nativeElement.querySelector('input');
    input.value = 'johanna';
    input.dispatchEvent(new Event('input'));
    expect(mockService.setSearch).toHaveBeenCalledWith('johanna');
  });

  it('should call selectContact when contact item is clicked', () => {
    const item = fixture.nativeElement.querySelector('.contact-item');
    item.click();
    expect(mockService.selectContact).toHaveBeenCalledWith(mockContact);
  });

  it('should apply active class to selected contact', () => {
    mockService.selectedContact.set(mockContact);
    fixture.detectChanges();
    const item = fixture.nativeElement.querySelector('.contact-item');
    expect(item.classList.contains('active')).toBe(true);
  });

  it('should show online status dot for online contact', () => {
    const dot = fixture.nativeElement.querySelector('.status-dot');
    expect(dot.classList.contains('online')).toBe(true);
  });

  it('should show empty state when no contacts match', () => {
    mockService.isLoading.set(false);
    mockService.hasError.set(undefined as any);
    mockService.filteredContacts.set([]);
    fixture.detectChanges();

    const items = fixture.nativeElement.querySelectorAll('.contact-item');
    expect(items.length).toBe(0);
  });

  it('should show loading state', () => {
    mockService.isLoading.set(true);
    fixture.detectChanges();
    const loading = fixture.nativeElement.querySelector('.state-message');
    expect(loading).toBeTruthy();
  });
});
