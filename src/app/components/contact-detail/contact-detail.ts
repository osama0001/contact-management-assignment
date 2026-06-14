import { Component, inject } from '@angular/core';
import { ContactsService } from '../../services/contacts.service';

@Component({
  selector: 'app-contact-detail',
  imports: [],
  templateUrl: './contact-detail.html',
  styleUrl: './contact-detail.scss',
})
export class ContactDetail {
  protected svc = inject(ContactsService);
}
