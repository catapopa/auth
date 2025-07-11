# Setup Guide

## Environment Configuration

Before running the application, you need to create your environment file from the provided template:

### 1. Create Environment File

```bash
# Copy the template and customize for your environment
cp .env.example .env
```

### 2. Configure Environment Variables

Edit `.env` with your actual values:

```bash
# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db

# JWT Secret (generate a secure one)
JWT_SECRET=your-32-character-secret-key

# URLs
CLIENT_URL=http://localhost:4200
API_URL=http://localhost:3000
```

### 3. Generate JWT Secret

```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Database Setup

### With Docker (Recommended)
```bash
./start-docker.sh
```

### With Local PostgreSQL
```bash
# Install PostgreSQL
brew install postgresql@15

# Start PostgreSQL
brew services start postgresql@15

# Create database
createdb auth_db

# Run the application
./start-local.sh
```

## Railway Deployment

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Create new project from GitHub repo
4. Add PostgreSQL database
5. Configure environment variables in Railway dashboard
6. Deploy!

## Notes

- **Never commit `.env` files** - they contain sensitive information
- All `.env` files are already in `.gitignore`
- Use `.env.*.example` files as templates only
- Environment variables are loaded automatically by the application
