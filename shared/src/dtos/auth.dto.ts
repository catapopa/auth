import { User } from '../entities';
import { UserRole } from '../enums';

export interface LoginDto {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: UserRole;
  firstName: string;
  lastName: string;
}
