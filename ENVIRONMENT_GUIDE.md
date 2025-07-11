# Environment Configuration Guide

## Overview

This project uses environment variables to configure different deployment environments. **Never commit actual environment files to git** - they contain sensitive information.

## Environment Files

### ❌ **Never Commit These Files**
- `.env` - Base environment file
- `.env.local` - Local development
- `.env.dev` - Development environment  
- `.env.prod` - Production environment

These files are in `.gitignore` and should **never** be committed to git.

### ✅ **Safe to Commit (Templates)**
- `.env.example` - Base template
- `.env.local.example` - Local development template
- `.env.dev.example` - Development template
- `.env.prod.example` - Production template

These are safe templates that you can commit to git.

## Quick Setup

### 1. Create Environment Files from Templates
```bash
# Run the setup script to create all environment files
./setup-env-files.sh
```

Or manually copy templates:
```bash
cp .env.example .env
cp .env.local.example .env.local
cp .env.dev.example .env.dev
cp .env.prod.example .env.prod
```

### 2. Edit Each Environment File
Fill in your actual values in each `.env` file:

#### Local Development (`.env.local`)
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db
JWT_SECRET=your-local-32-character-secret-key
CLIENT_URL=http://localhost:4200
API_URL=http://localhost:3000
```

#### Development (`.env.dev`)
```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/auth_db_dev
JWT_SECRET=your-dev-32-character-secret-key
CLIENT_URL=http://localhost:4200
API_URL=http://localhost:3000
```

#### Production (`.env.prod`)
```bash
# For Railway deployment, use Railway's environment variables instead
DATABASE_URL=postgresql://user:pass@host:port/database
JWT_SECRET=your-super-secure-production-secret-key
CLIENT_URL=https://your-frontend.railway.app
API_URL=https://your-backend.railway.app
```

## Environment Variables Reference

### Core Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Node.js environment | `development`, `production` |
| `APP_ENV` | Application environment | `local`, `dev`, `prod` |
| `PORT` | Server port | `3000` |
| `HOST` | Server host | `localhost`, `0.0.0.0` |

### Database
| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:port/db` |

### Authentication
| Variable | Description | Example |
|----------|-------------|---------|
| `JWT_SECRET` | JWT signing secret (32+ chars) | `your-super-secure-32-character-key` |
| `JWT_EXPIRES_IN` | Token expiration time | `1h`, `24h`, `7d` |

### Client Configuration
| Variable | Description | Example |
|----------|-------------|---------|
| `CLIENT_URL` | Frontend URL | `http://localhost:4200` |
| `API_URL` | Backend URL | `http://localhost:3000` |
| `CORS_ORIGINS` | Allowed CORS origins | `http://localhost:4200` |

### Logging
| Variable | Description | Example |
|----------|-------------|---------|
| `LOG_LEVEL` | Logging level | `debug`, `info`, `warn`, `error` |

## Environment-Specific Usage

### Local Development
```bash
# Load local environment
source ./setup-env.sh local

# Or start services with local environment
./start-local.sh
```

### Development Environment
```bash
# Load dev environment
source ./setup-env.sh dev

# Or start services with dev environment
./start-local.sh dev
```

### Production (Railway)
**Don't use `.env.prod` file for production.** Instead, set environment variables in Railway dashboard:

1. Go to Railway dashboard → Your Project → Service → Variables
2. Set each variable individually
3. Railway will automatically provide `DATABASE_URL` from PostgreSQL addon

## Security Best Practices

### 🔐 **JWT Secrets**
- **Generate secure random strings**: At least 32 characters
- **Use different secrets per environment**
- **Never reuse secrets across projects**

Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 🛡️ **Environment Isolation**
- **Local**: Use local database and relaxed security
- **Development**: Use separate dev database
- **Production**: Use Railway's managed services and strict security

### 🚫 **Never Commit**
- Database passwords
- JWT secrets
- API keys
- Production URLs
- Any sensitive configuration

## Troubleshooting

### Missing Environment File
```bash
Error: Environment file .env.local not found
```
**Solution**: Create from template:
```bash
cp .env.local.example .env.local
# Edit .env.local with your values
```

### Invalid Environment Variables
```bash
Error: Invalid JWT_SECRET
```
**Solution**: Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Database Connection Failed
```bash
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution**: Check your `DATABASE_URL` and ensure PostgreSQL is running.

## Railway Production Setup

For Railway deployment, **don't use `.env.prod` file**. Instead:

1. **Add PostgreSQL addon** in Railway dashboard
2. **Set environment variables** in Railway dashboard:
   - `JWT_SECRET` (generate secure random string)
   - `CLIENT_URL` (frontend Railway URL)
   - `CORS_ORIGINS` (frontend Railway URL)
3. **Railway auto-provides** `DATABASE_URL`

## File Structure
```
/Users/cpopa/Projects/auth/
├── .env.example              # ✅ Template (safe to commit)
├── .env.local.example        # ✅ Template (safe to commit)
├── .env.dev.example          # ✅ Template (safe to commit)
├── .env.prod.example         # ✅ Template (safe to commit)
├── .env                      # ❌ Never commit (contains secrets)
├── .env.local                # ❌ Never commit (contains secrets)
├── .env.dev                  # ❌ Never commit (contains secrets)
├── .env.prod                 # ❌ Never commit (contains secrets)
├── setup-env.sh              # Environment loader
├── setup-env-files.sh        # Environment file creator
└── .gitignore                # Excludes all .env files
```

## Quick Reference

### Setup Commands
```bash
# Create all environment files from templates
./setup-env-files.sh

# Load local environment
source ./setup-env.sh local

# Start with specific environment
./start-local.sh dev
```

### Security Checklist
- ✅ All `.env` files are in `.gitignore`
- ✅ JWT secrets are 32+ characters
- ✅ Different secrets for each environment
- ✅ Production uses Railway environment variables
- ✅ No sensitive data in templates

Your environment configuration is now secure and properly organized! 🔒
