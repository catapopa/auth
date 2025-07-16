# Full-Stack Authentication App

Modern authentication system with Angular 19 + NestJS. JWT auth, role-based access, and user management dashboard.

## 🚀 Quick Start (2 Minutes)

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- Docker Desktop ([Download](https://www.docker.com/products/docker-desktop/))

### Setup

```bash
# 1. Clone and install
git clone <repo-url>
cd auth
npm run install:all

# 2. Setup environment
cp .env.example .env
# Edit .env and set JWT_SECRET (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
```

### Option 1: Docker (Recommended)

```bash
# 3. Start everything
./start-docker.sh
```

### Option 2: Local PostgreSQL

```bash
# 3a. Install and start PostgreSQL (macOS)
brew install postgresql@15
brew services start postgresql@15

# 3b. Create database
createdb auth_db

# 3c. Update .env with local database
# DATABASE_URL=postgresql://postgres:password@localhost:5432/auth_db

# 3d. Start application
./start-local.sh
```

### Access

- **App**: http://localhost:4200
- **API**: http://localhost:3000
- **Docs**: http://localhost:3000/api/docs

### Login

- **Email**: `admin@example.com`
- **Password**: `Admin@2024#Secure!`

✅ **Done!** You should see the user management dashboard.

## 🔧 Development

### Common Commands

```bash
# Start development mode
npm run start:dev

# Build for production
npm run build:all

# Run tests
npm run test

# With Docker
npm run docker:up    # Start services
npm run docker:down  # Stop services
```

### Project Structure

```
auth/
├── client/          # Angular 19 Frontend
├── server/          # NestJS Backend API
├── shared/          # Shared TypeScript types
└── start-docker.sh  # Quick setup script
```

## 🚀 Deployment

### Railway (Recommended)

1. Push code to GitHub
2. Connect to [Railway.app](https://railway.app)
3. Add PostgreSQL service
4. Set environment variables:
   ```
   JWT_SECRET=your-secure-secret
   CLIENT_URL=https://your-frontend-url.railway.app
   API_URL=https://your-backend-url.railway.app
   ```

## 🆘 Troubleshooting

**Port already in use**

```bash
lsof -i :3000  # Find process using port
kill -9 <PID>  # Kill process
```

**Database connection failed**

```bash
# Docker
docker-compose down && docker-compose up -d

# Local PostgreSQL
brew services restart postgresql@15
```

**Can't login**

- Check JWT_SECRET is set in .env
- Verify backend is running on port 3000
- Use default credentials: `admin@example.com` / `Admin@2024#Secure!`

## ✨ Features

- JWT authentication with refresh tokens
- Role-based access control (Admin/User)
- User management dashboard
- Responsive UI with PrimeNG components
- PostgreSQL with TypeORM
- Docker deployment ready

## 🛠️ Tech Stack

**Frontend:** Angular 19, NgRx, PrimeNG, TypeScript  
**Backend:** NestJS, TypeORM, PostgreSQL, JWT, Passport.js  
**DevOps:** Docker, Railway deployment, ESLint, Jest
