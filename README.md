# Full-Stack Authentication Application

A modern authentication system built with Angular and NestJS, featuring JWT authentication, role-based access control, and user management capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.0.0
- npm >= 8.0.0
- PostgreSQL (or Docker)

### Installation & Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repo-url>
   cd auth
   npm run install:all
   ```

2. **Setup environment**
   ```bash
   cp .env.example .env
   # Edit .env with your database URL and JWT secret
   ```

3. **Start with Docker (Recommended)**
   ```bash
   ./start-docker.sh
   ```

4. **Or start with local PostgreSQL**
   ```bash
   ./start-local.sh
   ```

5. **Access the application**
   - Frontend: `http://localhost:4200`
   - Backend API: `http://localhost:3000`
   - Login with: `admin@example.com` / `Admin@2024#Secure!`

## 📁 Project Structure

```
auth/
├── client/                 # Angular 19 frontend
│   ├── src/app/
│   │   ├── core/          # Guards, interceptors, services
│   │   ├── features/      # Feature modules (auth, dashboard)
│   │   └── environments/  # Environment configurations
│   └── angular.json
├── server/                 # NestJS backend
│   ├── src/
│   │   ├── auth/          # Authentication module
│   │   ├── modules/       # Feature modules (users)
│   │   ├── common/        # Shared utilities
│   │   └── config/        # App configuration
│   └── data-source.ts
├── shared/                 # Shared TypeScript types & DTOs
│   └── src/
│       ├── dtos/          # Data Transfer Objects
│       ├── entities/      # Entity definitions
│       └── enums/         # Shared enumerations
├── .env.example           # Environment template
├── docker-compose.yml     # Docker services
├── railway.toml           # Railway deployment config
├── start-docker.sh        # Quick Docker setup
├── start-local.sh         # Local development setup
├── SETUP.md               # Detailed setup guide
└── README.md
```

## ✨ Features

- **Authentication**: JWT-based authentication with refresh tokens
- **Authorization**: Role-based access control (Admin/User)
- **User Management**: Full CRUD operations for user accounts
- **Security**: Password hashing with bcrypt, input validation
- **UI/UX**: Responsive design with PrimeNG components
- **State Management**: NgRx for frontend state management
- **Database**: PostgreSQL with TypeORM migrations
- **Type Safety**: Shared TypeScript types across frontend/backend

## 🛠️ Tech Stack

**Frontend**
- Angular 19 with standalone components
- NgRx for state management
- PrimeNG UI components
- TypeScript with strict mode

**Backend**
- NestJS with TypeScript
- TypeORM for database ORM
- PostgreSQL database
- JWT for authentication
- Passport.js strategies

**DevOps**
- Docker & Docker Compose
- Railway deployment ready
- ESLint & Prettier
- Jest testing framework

## 🔧 Development

### Available Scripts

```bash
# Install all dependencies
npm run install:all

# Build all packages
npm run build:all

# Start development servers
npm run start:dev

# Run tests
npm run test

# Lint code
npm run lint

# Docker operations
npm run docker:up
npm run docker:down
npm run docker:logs
```

## 🚀 Deployment

The application is configured for deployment on Railway with:
- Multi-service setup (frontend + backend)
- PostgreSQL database
- Environment variable configuration
- Production-ready Docker containers

## 📝 API Documentation

When running the backend, API documentation is available at:
`http://localhost:3000/api/docs`
