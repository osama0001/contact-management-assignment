import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { Contact } from '../../types/contact.type';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  contacts = input<Contact[]>([]);
  selectedContactId = input<number | null>(null);

  contactSelected = output<Contact>();

  searchQuery = signal('');

  filteredContacts = computed(() => {
    const query = this.searchQuery().toLowerCase();
    return this.contacts().filter(
      (c) => c.name.toLowerCase().includes(query) || c.role.toLowerCase().includes(query),
    );
  });

  onSearch(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.searchQuery.set(value);
  }

  onSelectContact(contact: Contact) {
    this.contactSelected.emit(contact);
  }
}
