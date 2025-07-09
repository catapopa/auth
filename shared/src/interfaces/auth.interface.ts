import { UserRole } from "../enums";

export interface JwtPayload {
  email: string;
  sub: number;
  role: UserRole;
  firstName: string;
  lastName: string;
  iat?: number;
  exp?: number;
}
