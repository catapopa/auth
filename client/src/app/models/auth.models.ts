import {
  UserRole,
  User,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  LoginResponse,
} from '@auth/shared';

// Frontend-specific interface for NgRx state management
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Re-export shared types and values for convenience
export { UserRole } from '@auth/shared';
export type {
  User,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  LoginResponse,
} from '@auth/shared';
