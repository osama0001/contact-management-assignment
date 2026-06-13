import { Component } from '@angular/core';
import { ContactList } from '../../components/contact-list/contact-list';
import { ContactDetail } from '../../components/contact-detail/contact-detail';

@Component({
  selector: 'app-contact-dashboard',
  imports: [ContactList, ContactDetail],
  templateUrl: './contact-dashboard.html',
  styleUrl: './contact-dashboard.scss',
})
export class ContactDashboard {}
