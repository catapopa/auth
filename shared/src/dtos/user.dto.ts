import { UserRole } from '../enums';

export interface CreateUserDto {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  role?: UserRole;
  isActive?: boolean;
}

export interface UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  password?: string;
  role?: UserRole;
  isActive?: boolean;
}
