# Auth Management App

JWT authentication system with Angular + NestJS.

## 🚀 Quick Start

```bash
git clone <repo-url>
cd auth

# Option 1: Docker (recommended)
./start-docker.sh

# Option 2: Local PostgreSQL
./start-local.sh
```

Open `http://localhost:4200` and login with:

- **Email**: `admin@example.com`
- **Password**: `Admin@2024#Secure!`

## Project Structure

```
auth/
├── client/          # Angular frontend
├── server/          # NestJS backend
├── shared/          # Shared TypeScript types
├── start-docker.sh  # Start with Docker
└── start-local.sh   # Start with local PostgreSQL
```

## Features

- JWT authentication with role-based access
- User management (CRUD for admins)
- Responsive UI with PrimeNG
- TypeScript shared types across frontend/backend
- PostgreSQL with TypeORM migrations

## Tech Stack

**Frontend**: Angular 19, NgRx, PrimeNG  
**Backend**: NestJS, TypeORM, PostgreSQL  
**Auth**: JWT tokens, bcrypt password hashing
