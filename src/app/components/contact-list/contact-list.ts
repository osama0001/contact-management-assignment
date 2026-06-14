import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { Contact } from '../../types/contact.model';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-list',
  imports: [CommonModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss',
})
export class ContactList {
  protected svc = inject(ContactsService);

  onSearch(event: Event): void {
    this.svc.setSearch((event.target as HTMLInputElement).value);
  }

  onSelect(contact: Contact): void {
    this.svc.selectContact(contact);
  }
}
