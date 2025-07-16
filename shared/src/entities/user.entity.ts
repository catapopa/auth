import { UserRole } from '../enums';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
