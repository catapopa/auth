# @auth/shared

Shared types, interfaces, DTOs, constants, and utilities for the authentication application.

## 📁 Structure

```
src/
├── enums/                     # Enumeration types
│   ├── user.enum.ts          # User role enumeration
│   ├── user-status.enum.ts   # User status enumeration
│   ├── http-status.enum.ts   # HTTP status codes
│   └── index.ts              # Export all enums
├── entities/                  # Domain entities
│   ├── user.entity.ts        # User entity interface
│   └── index.ts              # Export all entities
├── dtos/                      # Data Transfer Objects
│   ├── user.dto.ts           # User-related DTOs
│   ├── auth.dto.ts           # Authentication DTOs
│   └── index.ts              # Export all DTOs
├── interfaces/                # Common interfaces
│   ├── api.interface.ts      # API response interfaces
│   ├── auth.interface.ts     # Authentication interfaces
│   └── index.ts              # Export all interfaces
├── constants/                 # Application constants
│   ├── validation.constants.ts # Validation rules
│   ├── api.constants.ts      # API endpoints
│   ├── permissions.constants.ts # Role permissions
│   └── index.ts              # Export all constants
├── types/                     # Utility types
│   ├── common.types.ts       # Common type definitions
│   └── index.ts              # Export all types
├── utils/                     # Utility functions
│   ├── auth.utils.ts         # Authentication utilities
│   ├── user.utils.ts         # User utilities
│   ├── validation.utils.ts   # Validation utilities
│   └── index.ts              # Export all utils
└── index.ts                   # Main export file
```

## 🚀 Usage

### Install

```bash
npm install @auth/shared
```

### Import

```typescript
// Import specific items
import { UserRole, User, CreateUserDto } from "@auth/shared";

// Import utilities
import { hasPermission, formatUserName, isValidEmail } from "@auth/shared";

// Import constants
import { API_ENDPOINTS, VALIDATION_RULES } from "@auth/shared";
```

## 📋 Available Exports

### Enums

- `UserRole` - Admin, User roles
- `UserStatus` - Active, Inactive, Pending, Suspended
- `HttpStatus` - HTTP status codes

### Entities

- `User` - User entity interface
- `UserProfile` - User profile interface

### DTOs

- `CreateUserDto` - Create user data transfer object
- `UpdateUserDto` - Update user data transfer object
- `LoginDto` - Login credentials
- `LoginResponse` - Login response with token and user
- `ChangePasswordDto` - Change password request

### Interfaces

- `ApiResponse<T>` - Standard API response wrapper
- `PaginatedResponse<T>` - Paginated response wrapper
- `ApiError` - Error response interface
- `JwtPayload` - JWT token payload
- `AuthState` - Authentication state

### Constants

- `VALIDATION_RULES` - Email, password, name validation rules
- `API_ENDPOINTS` - All API endpoint paths
- `PERMISSIONS` - Role-based permissions mapping
- `ROLE_HIERARCHY` - Role hierarchy levels

### Types

- `Permission` - Available permission strings
- `FormMode` - Form modes (create, edit, view)
- `PaginationParams` - Pagination parameters
- `UserFilters` - User filtering options

### Utilities

- `hasPermission(role, permission)` - Check role permissions
- `isAdmin(role)` - Check if user is admin
- `hasHigherRole(role1, role2)` - Compare role hierarchy
- `formatUserName(user)` - Format user's full name
- `getUserInitials(user)` - Get user initials
- `maskEmail(email)` - Mask email for display
- `isValidEmail(email)` - Validate email format
- `isValidPassword(password)` - Validate password
- `getPasswordStrength(password)` - Get password strength score

## 🔧 Development

### Build

```bash
npm run build
```

### Watch Mode

```bash
npm run watch
```

### Clean

```bash
npm run clean
```

## 📝 Examples

### Permission Checking

```typescript
import { UserRole, hasPermission } from "@auth/shared";

const canCreateUsers = hasPermission(UserRole.ADMIN, "users:create"); // true
const canDeleteUsers = hasPermission(UserRole.USER, "users:delete"); // false
```

### User Utilities

```typescript
import { formatUserName, getUserInitials, maskEmail } from "@auth/shared";

const user = { firstName: "John", lastName: "Doe" };
const fullName = formatUserName(user); // "John Doe"
const initials = getUserInitials(user); // "JD"
const masked = maskEmail("john.doe@example.com"); // "j*****e@example.com"
```

### Validation

```typescript
import {
  isValidEmail,
  getPasswordStrength,
  VALIDATION_RULES,
} from "@auth/shared";

const email = "user@example.com";
const isValid = isValidEmail(email); // true

const password = "StrongP@ss123";
const strength = getPasswordStrength(password); // 4 (strong)

const minPasswordLength = VALIDATION_RULES.PASSWORD.MIN_LENGTH; // 6
```

## 🤝 Contributing

When adding new shared code:

1. **Choose the right folder** based on the type of code
2. **Follow naming conventions** (kebab-case for files, PascalCase for types)
3. **Export from index.ts** in the appropriate folder
4. **Add to main index.ts** if needed
5. **Update this README** with new exports

## 📄 License

MIT
