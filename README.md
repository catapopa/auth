# User Management Authentication App

A full-stack application with Angular frontend and NestJS backend that implements user authentication and management with role-based access control.

## 🚀 Features

- **Authentication**: JWT-based authentication system
- **Role-based Access Control**: Admin and regular user roles
- **User Management**: CRUD operations for users (admin only)
- **Responsive UI**: Modern UI using PrimeNG components
- **State Management**: NgRx for frontend state management
- **Database**: PostgreSQL with TypeORM
- **Security**: Password hashing, JWT tokens, route guards

## 🛠 Tech Stack

### Frontend

- **Angular 19** - Frontend framework
- **NgRx** - State management (store, effects)
- **PrimeNG** - UI component library
- **TypeScript** - Type safety
- **SCSS** - Styling

### Backend

- **NestJS** - Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication tokens
- **Passport** - Authentication middleware
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Docker (for PostgreSQL)
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd auth
```

### 2. Database Setup

The application uses TypeORM migrations for database schema management.

#### Prerequisites

- PostgreSQL installed and running
- Database user with CREATE privileges

#### Option 1: Automatic Setup (Recommended)

```bash
cd server
./setup-db.sh  # Creates the database
npm run build  # Compile TypeScript
npm run migration:run  # Run migrations
npm start     # Start the server
```

#### Option 2: Manual Setup

1. **Create the database**:

```sql
-- Connect to PostgreSQL as superuser
createdb auth_db

-- Or using psql:
psql -U postgres
CREATE DATABASE auth_db;
\q
```

2. **Run migrations**:

```bash
cd server
npm run build
npm run migration:run
```

#### Option 3: Using Docker

```bash
# Start PostgreSQL in Docker
docker run --name postgres-auth \
  -e POSTGRES_DB=auth_db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 5432:5432 -d postgres

# Then run migrations
cd server
npm run build
npm run migration:run
```

#### Migration Commands

```bash
# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Generate new migration (after entity changes)
npm run migration:generate -- src/migrations/NewMigrationName

# Create empty migration
npm run migration:create -- src/migrations/NewMigrationName
```

### 3. Shared Package Setup

```bash
cd shared
npm install
npm run build  # Build shared types and utilities
```

### 4. Backend Setup

```bash
cd server
npm install
npm run build  # Compile TypeScript
npm run migration:run  # Run database migrations
npm run start:dev  # Start in development mode
```

The backend will start on `http://localhost:3000`

**Note**: Migrations will create the database schema and seed the initial admin user.

### 5. Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will start on `http://localhost:4200`

## 👤 Default Admin User

The application seeds an admin user on startup:

- **Email**: admin@example.com
- **Password**: Admin@2024#Secure!

## 🔐 User Roles

### Admin Users

- View all users
- Create new users
- Edit existing users
- Delete users
- Access to admin features

### Regular Users

- View user list (read-only)
- View their own profile
- Limited access to features

## 📱 Application Flow

1. **Login Page**: Users authenticate with email/password
2. **Dashboard**: Displays user management interface
3. **User Management**:
   - Admins can perform CRUD operations
   - Regular users have read-only access
4. **User Dialog**: Modal for creating/editing users (admin only)

## 🏗 Architecture

### Monorepo Structure

The application follows a monorepo structure with shared types and utilities:

```
auth/
├── client/                 # Angular frontend
├── server/                 # NestJS backend
└── shared/                 # Shared types and utilities
    ├── src/
    │   ├── types.ts        # Common interfaces and types
    │   ├── constants.ts    # Shared constants and permissions
    │   └── index.ts        # Exported utilities
    └── package.json
```

### Shared Package Benefits

- **Type Safety**: Consistent types between frontend and backend
- **DRY Principle**: No duplication of interfaces and enums
- **Maintainability**: Single source of truth for data models
- **Validation**: Shared constants for validation rules
- **Permissions**: Centralized role-based permissions

### Frontend Architecture

```
src/
├── app/
│   ├── components/          # UI components
│   ├── guards/             # Route guards
│   ├── interceptors/       # HTTP interceptors
│   ├── models/             # TypeScript interfaces (to be replaced by shared)
│   ├── services/           # API services
│   └── store/              # NgRx store (actions, reducers, effects, selectors)
```

### Backend Architecture

```
src/
├── auth/                   # Authentication module
├── users/                  # User management module
├── app.module.ts          # Main application module
└── main.ts                # Application entry point
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Role-based Guards**: Route and method-level authorization
- **Input Validation**: DTO validation with class-validator
- **CORS**: Configured for frontend origin
- **HTTP Interceptors**: Automatic token attachment

## 🧪 API Endpoints

### Authentication

- `POST /auth/login` - User login
- `POST /auth/profile` - Get user profile

### Users

- `GET /users` - Get all users (authenticated)
- `POST /users` - Create user (admin only)
- `PATCH /users/:id` - Update user (admin only)
- `DELETE /users/:id` - Delete user (admin only)

## 🎨 UI Components

- **Login Form**: Reactive form with validation
- **User Table**: Paginated data table with role badges
- **User Dialog**: Modal form for user creation/editing
- **Navigation**: Header with user info and logout
- **Responsive Design**: Mobile-friendly interface

## 📦 Environment Variables

### Backend (.env)

```env
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=auth_db
```

## 🚀 Production Deployment

### Backend

1. Set production environment variables
2. Use proper JWT secret
3. Enable database migrations
4. Set up HTTPS
5. Configure proper CORS origins

### Frontend

1. Build for production: `npm run build`
2. Serve static files
3. Configure API endpoint URLs
4. Enable HTTPS

## 🔄 Development Workflow

1. **Backend Development**:

   - Use `npm run start:dev` for hot reload
   - Database changes auto-sync (development only)

2. **Frontend Development**:
   - Use `npm start` for dev server
   - Hot reload enabled
   - NgRx DevTools available

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection**: Ensure PostgreSQL is running
2. **CORS Errors**: Check backend CORS configuration
3. **Token Expiry**: Tokens expire after 24 hours
4. **Port Conflicts**: Ensure ports 3000 and 4200 are available

## 📈 Future Enhancements

- [ ] Email verification for new users
- [ ] Password reset functionality
- [ ] User avatar uploads
- [ ] Audit logging
- [ ] Advanced filtering and search
- [ ] Email notifications
- [ ] Two-factor authentication
- [ ] API rate limiting
- [ ] Database migrations
- [ ] Unit and integration tests
- [ ] Docker containerization for full app
- [ ] CI/CD pipeline setup

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Development Notes

This application was built as a demonstration of modern full-stack development practices, including:

- Clean architecture principles
- Separation of concerns
- Type safety throughout the stack
- Proper error handling
- Security best practices
- Responsive design patterns
- State management patterns

The codebase is structured for maintainability and scalability, with clear separation between business logic, data access, and presentation layers.
