export interface Contact {
  id: number;
  name: string;
  role: string;
  avatar?: string;
  status: 'online' | 'offline' | 'busy';
}
