import { Service, signal, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Contact, ContactDTO, EmailAddress, EmailAddressDTO } from '../types/contact.model';
import { mapContactFromDTO, mapEmailAddressFromDTO } from '../types/contact.mapper';

const API_URL = 'https://6a2da49a2edd4cb330d1567b.mockapi.io/api/contacts';

@Service()
export class ContactsService {
  // ── UI State ───────────────────────────────────────────────────────────────
  readonly selectedContact = signal<Contact | null>(null);
  readonly searchQuery = signal<string>('');

  // ── Contacts List ──────────────────────────────────────────────────────────
  private readonly _listResource = httpResource<ContactDTO[]>(() => API_URL, { defaultValue: [] });

  readonly contacts = computed(() => this._listResource.value().map(mapContactFromDTO));

  readonly isLoading = this._listResource.isLoading;
  readonly hasError = this._listResource.error;

  /** Filters contacts by fullName or jobTitle against the current search query */
  readonly filteredContacts = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    if (!query) return this.contacts();
    return this.contacts().filter(
      (c) => c.fullName.toLowerCase().includes(query) || c.jobTitle.toLowerCase().includes(query),
    );
  });

  // ── Selected Contact Detail ────────────────────────────────────────────────
  /** Refetches automatically when selectedContact changes */
  private readonly _detailResource = httpResource<ContactDTO>(
    () => {
      const contact = this.selectedContact();
      if (!contact) return undefined;
      return `${API_URL}/${contact.id}`;
    },
    { defaultValue: undefined },
  );

  readonly selectedContactDetail = computed(() => {
    const dto = this._detailResource.value();
    return dto ? mapContactFromDTO(dto) : null;
  });

  readonly isDetailLoading = this._detailResource.isLoading;
  readonly hasDetailError = this._detailResource.error;

  // ── Selected Contact Email Addresses ───────────────────────────────────────
  /** Fetches email addresses separately as per API contract */
  private readonly _emailsResource = httpResource<EmailAddressDTO[]>(
    () => {
      const contact = this.selectedContact();
      if (!contact) return undefined;
      return `${API_URL}/${contact.id}/email_addresses`;
    },
    { defaultValue: [] },
  );

  readonly selectedContactEmails = computed<EmailAddress | null>(() => {
    const results = this._emailsResource.value();
    if (!results?.length) return null;
    return mapEmailAddressFromDTO(results[0]);
  });

  readonly isEmailsLoading = this._emailsResource.isLoading;
  readonly hasEmailsError = this._emailsResource.error;

  // ── Loading/Error Aggregates ───────────────────────────────────────────────
  /** True while either the detail or email addresses request is in flight */
  readonly isDetailPageLoading = computed(
    () => this._detailResource.isLoading() || this._emailsResource.isLoading(),
  );

  // ── Actions ────────────────────────────────────────────────────────────────
  selectContact(contact: Contact): void {
    this.selectedContact.set(contact);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
