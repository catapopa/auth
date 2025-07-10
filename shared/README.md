# Shared Package

TypeScript types and DTOs shared between frontend and backend.

## 📦 Usage

This package is automatically built by the root start scripts.

Manual build:

```bash
npm install
npm run build
```

## 📁 Exports

- **DTOs**: `LoginDto`, `CreateUserDto`, `UpdateUserDto`
- **Entities**: `User` interface
- **Enums**: `UserRole` (ADMIN, USER)

All types are automatically available in both client and server projects.

- `User` - User entity interface

### DTOs

- `LoginDto` - Login request
- `LoginResponse` - Login response with token
- `CreateUserDto` - Create user request
- `UpdateUserDto` - Update user request
- `JwtPayload` - JWT token payload

## 🔄 Usage

```typescript
// In frontend or backend
import { User, UserRole, LoginDto } from '@auth/shared';

const user: User = {
  id: 1,
  email: 'user@example.com',
  role: UserRole.USER,
  // ...
};
```

## 🚀 Build

```bash
npm run build    # Compile TypeScript
npm run dev      # Watch mode
```

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

### Entity

```typescript
// server/src/users/user.entity.ts
import { UserRole, User as IUser } from '@auth/shared';

@Entity('users')
export class User implements Omit<IUser, 'createdAt' | 'updatedAt'> {
  // TypeORM decorators + shared interface implementation
}
```

### DTOs

```typescript
// server/src/users/user.dto.ts
import { UserRole, CreateUserDto as ICreateUserDto } from '@auth/shared';

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
