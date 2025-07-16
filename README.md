# Full-Stack Authentication Application

A modern, production-ready authentication system built with Angular 19 and NestJS, featuring JWT authentication, role-based access control, and comprehensive user management capabilities.

## 🎯 What This Project Does

This is a complete authentication solution that provides:
- **Secure user login/registration** with JWT tokens
- **Role-based access control** (Admin vs User permissions)
- **User management dashboard** for admins
- **Responsive UI** that works on desktop and mobile
- **Production-ready deployment** configuration

## 🚀 Quick Start (5 Minutes)

### Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) - Check with `npm --version`
- **Docker Desktop** (recommended) - [Download here](https://www.docker.com/products/docker-desktop/)

*Alternative: You can use local PostgreSQL instead of Docker*

### Step-by-Step Setup

#### 1. Get the Code
```bash
# Clone the repository
git clone <repo-url>
cd auth

# Install all dependencies (this may take a few minutes)
npm run install:all
```

#### 2. Configure Environment
```bash
# Copy the example environment file
cp .env.example .env

# Open .env in your text editor and update the values
# (See "Environment Configuration" section below for details)
```

#### 3. Start the Application

**Option A: With Docker (Easiest)**
```bash
# This will start everything automatically
./start-docker.sh

# Wait for "Database connected successfully" message
```

**Option B: With Local PostgreSQL**
```bash
# Make sure PostgreSQL is running on your machine
./start-local.sh
```

#### 4. Access the Application

Once everything is running, open your browser:

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000
- **API Documentation**: http://localhost:3000/api/docs

#### 5. Login and Test

Use these default credentials:
- **Email**: `admin@example.com`
- **Password**: `Admin@2024#Secure!`

🎉 **You're all set!** You should see the dashboard with user management features.

## ⚙️ Environment Configuration (Important!)

### Understanding Environment Variables

The application uses environment variables to configure database connections, security settings, and URLs. These are stored in a `.env` file that you must create.

### Step 1: Create Your Environment File

```bash
# Copy the template (this file is safe to commit)
cp .env.example .env
```

### Step 2: Edit Your Environment File

Open `.env` in your text editor and update these values:

```bash
# Database Configuration
# For Docker: use the default value
# For local PostgreSQL: update with your local database details
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db

# JWT Secret (MUST CHANGE!)
# Generate a secure random string - see instructions below
JWT_SECRET=your-32-character-secret-key-here

# Application URLs
# These should match where your apps are running
CLIENT_URL=http://localhost:4200
API_URL=http://localhost:3000
```

### Step 3: Generate a Secure JWT Secret

**Important**: The JWT secret is used to sign authentication tokens. Use a secure random string:

```bash
# Run this command to generate a secure secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Copy the output and paste it as your JWT_SECRET in .env
```

### Environment File Security

- ✅ **DO commit**: `.env.example` (template file)
- ❌ **DON'T commit**: `.env` (contains your secrets)
- The `.env` file is already in `.gitignore` to prevent accidental commits

## 🗄️ Database Setup Options

### Option 1: Docker (Recommended for Beginners)

Docker automatically sets up PostgreSQL for you:

```bash
# Start everything with Docker
./start-docker.sh

# This will:
# 1. Start PostgreSQL in a container
# 2. Create the database
# 3. Run migrations
# 4. Start both frontend and backend
```

### Option 2: Local PostgreSQL (Advanced)

If you prefer to use your own PostgreSQL installation:

```bash
# Install PostgreSQL (macOS)
brew install postgresql@15

# Start PostgreSQL service
brew services start postgresql@15

# Create the database
createdb auth_db

# Update your .env file with local database details
# DATABASE_URL=postgresql://your-username:your-password@localhost:5432/auth_db

# Start the application
./start-local.sh
```

### Troubleshooting Database Issues

**Problem**: "Database connection failed"
- Check if PostgreSQL is running: `brew services list | grep postgresql`
- Verify your DATABASE_URL in `.env`
- For Docker: Try `docker-compose down && docker-compose up -d`

**Problem**: "Database auth_db does not exist"
- Create it manually: `createdb auth_db`
- Or restart Docker: `./start-docker.sh`

## 📁 Project Structure (What Goes Where)

```
auth/
├── client/                 # 🎨 Angular 19 Frontend
│   ├── src/app/
│   │   ├── core/          # 🛡️ Guards, interceptors, services
│   │   ├── features/      # 📱 Feature modules (auth, dashboard)
│   │   └── environments/  # 🌍 Environment configurations
│   └── angular.json       # Angular configuration
├── server/                 # 🚀 NestJS Backend API
│   ├── src/
│   │   ├── auth/          # 🔐 Authentication logic
│   │   ├── modules/       # 👥 Feature modules (users)
│   │   ├── common/        # 🛠️ Shared utilities
│   │   └── config/        # ⚙️ App configuration
│   └── data-source.ts     # Database configuration
├── shared/                 # 🔄 Shared TypeScript Types
│   └── src/
│       ├── dtos/          # 📝 Data Transfer Objects
│       ├── entities/      # 🏗️ Database entity definitions
│       └── enums/         # 📋 Shared enumerations
├── .env.example           # 📋 Environment template
├── docker-compose.yml     # 🐳 Docker services
├── railway.toml           # 🚂 Railway deployment config
├── start-docker.sh        # 🐳 Quick Docker setup
├── start-local.sh         # 💻 Local development setup
└── README.md              # 📖 This file
```

### Key Directories Explained

- **`/client`**: All frontend code (Angular app that users see)
- **`/server`**: All backend code (API that handles data and authentication)
- **`/shared`**: Common TypeScript types used by both frontend and backend
- **Scripts**: `start-docker.sh` and `start-local.sh` make setup easy

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

## 🔧 Development Workflow

### Daily Development Commands

```bash
# Start development (runs both frontend and backend)
npm run start:dev

# Install new dependencies
npm run install:all

# Build everything for production
npm run build:all

# Run tests
npm run test

# Check code quality
npm run lint

# Format code
npm run format
```

### Docker Development Commands

```bash
# Start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Rebuild containers after changes
npm run docker:rebuild
```

### Making Changes

1. **Frontend Changes**: Edit files in `/client/src/` - changes auto-reload
2. **Backend Changes**: Edit files in `/server/src/` - server auto-restarts
3. **Shared Types**: Edit files in `/shared/src/` - rebuild with `npm run build:shared`

### Common Development Tasks

**Adding a new API endpoint:**
1. Add route in `/server/src/` modules
2. Update DTOs in `/shared/src/dtos/`
3. Add frontend service call in `/client/src/app/core/services/`

**Adding a new page:**
1. Create component in `/client/src/app/features/`
2. Add route in `/client/src/app/app.routes.ts`
3. Update navigation if needed

## 🚀 Deployment to Production

### Railway Deployment (Recommended)

Railway is a modern hosting platform that makes deployment simple.

#### Prerequisites
- GitHub account with your code pushed
- Railway account (free tier available)

#### Step-by-Step Deployment

1. **Prepare Your Code**
   ```bash
   # Make sure all changes are committed
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Set Up Railway**
   - Go to [Railway.app](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add Database**
   - In Railway dashboard, click "Add Service"
   - Select "PostgreSQL"
   - Railway will automatically create DATABASE_URL

4. **Configure Environment Variables**
   
   In Railway dashboard, go to your service settings and add:
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-jwt-secret-here
   CLIENT_URL=https://your-frontend-url.railway.app
   API_URL=https://your-backend-url.railway.app
   ```

5. **Deploy!**
   - Railway automatically builds and deploys
   - You'll get URLs for both frontend and backend
   - Check deployment logs for any issues

#### Environment Variables for Production

Railway automatically provides `DATABASE_URL`, but you need to set:
- `JWT_SECRET` - Use the same secure secret from development
- `CLIENT_URL` - Your frontend's Railway URL
- `API_URL` - Your backend's Railway URL

### Alternative Deployment Options

- **Docker**: Use the included `Dockerfile` and `docker-compose.yml`
- **VPS**: Deploy to any server with Docker support
- **Cloud Providers**: AWS, Google Cloud, Azure (requires more setup)

### Troubleshooting Deployment

**Problem**: "Build failed"
- Check Railway logs for specific error
- Ensure all dependencies are in `package.json`
- Verify environment variables are set

**Problem**: "Database connection failed"
- Verify DATABASE_URL is automatically set by Railway
- Check that PostgreSQL service is running

**Problem**: "CORS errors"
- Ensure CLIENT_URL matches your frontend URL exactly
- Check that API_URL is set correctly

## 🆘 Troubleshooting Common Issues

### Installation Problems

**Problem**: `npm install` fails
```bash
# Clear npm cache and try again
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Permission errors on macOS/Linux
```bash
# Fix npm permissions
sudo chown -R $(whoami) ~/.npm
```

### Runtime Problems

**Problem**: "Port already in use"
```bash
# Find what's using the port
lsof -i :3000  # for backend
lsof -i :4200  # for frontend

# Kill the process
kill -9 <PID>
```

**Problem**: "Database connection failed"
```bash
# Check if PostgreSQL is running
brew services list | grep postgresql

# Restart PostgreSQL
brew services restart postgresql@15

# For Docker
docker-compose down && docker-compose up -d
```

**Problem**: "JWT token invalid"
- Check that JWT_SECRET is set in .env
- Ensure the secret is the same in both development and production
- Try logging out and logging in again

### Frontend Issues

**Problem**: "Cannot load Angular app"
- Check if backend is running on port 3000
- Verify API_URL in environment files
- Open browser dev tools to see console errors

**Problem**: "Login form not working"
- Check network tab in browser dev tools
- Verify backend API is responding
- Check CORS configuration

### Getting Help

1. **Check the logs**: Both frontend and backend show helpful error messages
2. **Browser dev tools**: F12 → Console/Network tabs show client-side issues
3. **Backend logs**: Check terminal where `npm run start:dev` is running
4. **Create an issue**: If you're stuck, create a GitHub issue with:
   - Your operating system
   - Node.js version (`node --version`)
   - Full error message
   - Steps to reproduce

## 📚 Additional Resources

### Learning Resources

- **Angular**: [Official Angular Tutorial](https://angular.io/tutorial)
- **NestJS**: [Official NestJS Documentation](https://docs.nestjs.com/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **PostgreSQL**: [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)

### API Documentation

When running locally, comprehensive API documentation is available at:
- **Swagger UI**: http://localhost:3000/api/docs
- **OpenAPI JSON**: http://localhost:3000/api/docs-json

### Project Standards

- **Code Style**: ESLint + Prettier (automatically formatted)
- **Testing**: Jest for unit tests
- **Git**: Use conventional commits (feat:, fix:, docs:, etc.)
- **TypeScript**: Strict mode enabled for type safety

## 🔮 Future Improvements

This section outlines critical enhancements that would elevate this authentication system to enterprise-grade production readiness. These improvements address scalability, security, maintainability, and user experience considerations.

### 1. **Soft Delete Implementation**
**Current State**: Hard deletion permanently removes user data
**Improvement**: Implement soft delete with `deletedAt` timestamp
- Add `@DeleteDateColumn()` to User entity
- Modify queries to filter out soft-deleted records
- Add restore functionality for accidentally deleted users
- Maintain data integrity for audit trails and compliance

### 2. **Comprehensive Logging System**
**Current State**: Basic console logging only
**Improvement**: Structured logging with Winston/Pino
- Implement log levels (error, warn, info, debug)
- Add request/response logging middleware
- Include correlation IDs for request tracking
- Log authentication attempts, user actions, and system events
- Integrate with log aggregation services (ELK stack, Splunk)

### 3. **Audit Trail & Activity Tracking**
**Current State**: No tracking of user actions
**Improvement**: Complete audit logging system
- Track login attempts, user CRUD operations, role changes
- Store IP addresses, user agents, and timestamps
- Implement audit log API for compliance reporting
- Add dashboard for monitoring suspicious activities
- Support for regulatory compliance (GDPR, HIPAA, SOX)

### 4. **Enhanced Security Features**
**Current State**: Basic JWT authentication
**Improvement**: Multi-layered security approach
- **Password Policies**: Complexity requirements, expiration, history
- **Account Lockout**: Prevent brute force attacks after failed attempts
- **Multi-Factor Authentication**: TOTP/SMS verification
- **Session Management**: Concurrent session limits, timeout handling
- **Rate Limiting**: API endpoint protection against abuse

### 5. **Database Optimizations**
**Current State**: Basic TypeORM configuration
**Improvement**: Production-ready database management
- **Advanced Indexing**: Optimize queries with composite indexes
- **Connection Pooling**: Implement proper connection management
- **Query Optimization**: Add pagination, filtering, and sorting
- **Read Replicas**: Separate read/write operations for scalability
- **Database Monitoring**: Query performance and health metrics

### 6. **API Enhancements**
**Current State**: Basic CRUD operations
**Improvement**: Enterprise-grade API design
- **Pagination**: Cursor-based pagination for large datasets
- **Advanced Filtering**: Dynamic query building with operators
- **API Versioning**: Support multiple API versions simultaneously
- **Response Caching**: Redis integration for performance
- **GraphQL Support**: Alternative query language for flexible data fetching

### 7. **Monitoring & Observability**
**Current State**: Limited error visibility
**Improvement**: Full observability stack
- **Health Checks**: Application and database health endpoints
- **Metrics Collection**: Prometheus integration for system metrics
- **Distributed Tracing**: OpenTelemetry for request flow tracking
- **Alerting System**: Real-time notifications for critical issues
- **Performance Monitoring**: Response times, throughput, error rates

### 8. **Testing Strategy**
**Current State**: Basic unit tests
**Improvement**: Comprehensive testing pyramid
- **Unit Tests**: 90%+ code coverage with Jest
- **Integration Tests**: Database and API endpoint testing
- **E2E Tests**: Full application flow with Cypress/Playwright
- **Performance Tests**: Load testing with Artillery/K6
- **Security Tests**: Automated vulnerability scanning

### 9. **User Experience Improvements**
**Current State**: Basic authentication flow
**Improvement**: Complete user lifecycle management
- **Email Verification**: Account activation workflow
- **Password Reset**: Secure recovery with time-limited tokens
- **User Profiles**: Extended user information and preferences
- **Notifications**: Real-time updates and email alerts
- **Internationalization**: Multi-language support (i18n)

### 10. **DevOps & Scalability**
**Current State**: Basic deployment configuration
**Improvement**: Production-ready infrastructure
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Container Orchestration**: Kubernetes deployment manifests
- **Load Balancing**: Horizontal scaling with multiple instances
- **Backup Strategy**: Automated database backups and recovery
- **Infrastructure as Code**: Terraform/Pulumi for environment management

### Implementation Priority

**Phase 1 (Critical for Production)**
1. Soft Delete Implementation
2. Comprehensive Logging System
3. Enhanced Security Features

**Phase 2 (Operations & Monitoring)**
4. Audit Trail & Activity Tracking
5. Monitoring & Observability
6. Database Optimizations

**Phase 3 (Scale & Performance)**
7. API Enhancements
8. DevOps & Scalability
9. Testing Strategy

**Phase 4 (User Experience)**
10. User Experience Improvements

### Business Impact

- **Security**: Reduced risk of data breaches and compliance violations
- **Reliability**: 99.9% uptime with proper monitoring and alerting
- **Scalability**: Support for 10x user growth without architecture changes
- **Maintainability**: Faster development cycles with better tooling
- **User Satisfaction**: Improved authentication experience and features
