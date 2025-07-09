## Project Structure

The authentication app is a monorepo with shared TypeScript code:

```
/Users/cpopa/Projects/auth/
├── README.md                    # Main project documentation
├── client/                      # Angular frontend
├── server/                      # NestJS backend
└── shared/                      # Shared TypeScript package
```

## Shared Package (`@auth/shared`)

The shared package contains only the minimal, truly shared code used by both frontend and backend:

### Structure

```
shared/
├── src/
│   ├── enums/
│   │   ├── user-role.enum.ts   # UserRole enum
│   │   └── index.ts
│   ├── entities/
│   │   ├── user.entity.ts      # User interface
│   │   └── index.ts
│   ├── dtos/
│   │   ├── user.dto.ts         # CreateUserDto, UpdateUserDto
│   │   ├── auth.dto.ts         # LoginDto, LoginResponse
│   │   └── index.ts
│   ├── interfaces/
│   │   ├── api.interface.ts    # ApiResponse, ApiError
│   │   ├── auth.interface.ts   # JwtPayload
│   │   └── index.ts
│   └── index.ts                # Main exports
├── package.json
├── tsconfig.json
├── .gitignore
└── README.md
```

### Exported Types and Interfaces

1. **Enums**

   - `UserRole`: User role enumeration (ADMIN, USER)

2. **Entities**

   - `User`: Base user interface with id, email, names, role, status, timestamps

3. **DTOs**

   - `CreateUserDto`: Data for creating new users
   - `UpdateUserDto`: Data for updating existing users
   - `LoginDto`: Login credentials
   - `LoginResponse`: Response after successful login

4. **Interfaces**
   - `ApiResponse<T>`: Standard API response wrapper
   - `ApiError`: Error response structure
   - `JwtPayload`: JWT token payload structure

## Frontend Integration (`client/`)

The Angular frontend imports shared types from `@auth/shared`:

```typescript
// client/src/app/models/auth.models.ts
import {
  UserRole,
  User,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  LoginResponse,
} from "@auth/shared";

// Frontend-specific interface for NgRx state management
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Re-export for convenience
export { UserRole } from "@auth/shared";
export type {
  User,
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  LoginResponse,
} from "@auth/shared";
```

## Backend Integration (`server/`)

The NestJS backend extends shared interfaces with validation decorators and TypeORM decorators:

### Entity

```typescript
// server/src/users/user.entity.ts
import { UserRole, User as IUser } from "@auth/shared";

@Entity("users")
export class User implements Omit<IUser, "createdAt" | "updatedAt"> {
  // TypeORM decorators + shared interface implementation
}
```

### DTOs

```typescript
// server/src/users/user.dto.ts
import { UserRole, CreateUserDto as ICreateUserDto } from "@auth/shared";

export class CreateUserDto implements ICreateUserDto {
  @IsEmail()
  email: string;
  // Validation decorators + shared interface implementation
}
```

## Benefits Achieved

1. **Type Safety**: Shared interfaces ensure type consistency between frontend and backend
2. **DRY Principle**: Common models, DTOs, and enums are defined once
3. **Maintainability**: Changes to shared types automatically propagate to both apps
4. **Minimal Overhead**: Only truly shared code is in the shared package
5. **Flexible Architecture**: Each app can extend shared types with app-specific features

## Installation

Each app automatically installs the shared package as a local dependency:

```bash
# Automatically installed during the refactoring
cd client && npm install ../shared
cd server && npm install ../shared
```
