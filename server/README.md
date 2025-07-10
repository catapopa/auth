# Server (NestJS Backend)

Authentication API with JWT, TypeORM, and PostgreSQL.

## 🚀 Quick Start

Use the root scripts instead:

```bash
cd ..
./start-docker.sh    # or ./start-local.sh
```

Or run manually:

```bash
npm install
npm run start:dev    # Requires PostgreSQL running
```

## 📚 Scripts

```bash
npm run start:dev      # Development with hot reload
npm run build          # Build for production
npm run test           # Unit tests
npm run migration:run  # Run database migrations
```

## 🔑 Key Files

- `src/auth/` - JWT authentication
- `src/modules/users/` - User CRUD operations
- `src/migrations/` - Database schema migrations
- `.env` - Environment configuration

## 📁 Project Structure

```
server/
├── src/
│   ├── auth/           # Authentication module
│   ├── modules/users/  # User management
│   ├── common/         # Shared utilities
│   └── migrations/     # Database migrations
├── test/              # E2E tests
└── data-source.ts     # Database configuration
```

$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

```

```
