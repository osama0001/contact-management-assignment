import { Contact, ContactDTO, EmailAddress, EmailAddressDTO } from './contact.model';

export function mapContactFromDTO(dto: ContactDTO): Contact {
  return {
    id: dto.id,
    fullName: dto.fullName,
    firstName: dto.firstName,
    lastName: dto.lastName,
    avatar: dto.avatar,
    jobTitle: dto.jobTitle,
    status: dto.status ? 'online' : 'offline',
    address: dto.address,
    dial: dto.dial,
    meeting: dto.meeting,
    bio: dto.bio,
    phones: dto.phones ?? [],
    social: dto.social ?? {},
    createdAt: new Date(dto.createdAt),
  };
}

export function mapEmailAddressFromDTO(dto: EmailAddressDTO): EmailAddress {
  return {
    primary: dto.primaryEmail,
    secondary: dto.secondaryEmail,
  };
}
