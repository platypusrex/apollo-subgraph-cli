import type { User } from '../types/generated';

const users: User[] = [
  { id: 1, name: 'Linus' },
  { id: 2, name: 'Ada' },
  { id: 3, name: 'Tim' },
  { id: 4, name: 'Steve' },
  { id: 5, name: 'Sergei' },
  { id: 6, name: 'Ken' },
];

export const userData = new Map<number, User>(
  users.map(({ id, ...rest }) => [id, { id, ...rest }])
);
