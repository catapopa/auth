# Railway Deployment Guide

## Environment Variables Configuration

When deploying to Railway, you need to set these environment variables in the Railway dashboard:

### Backend Service (auth-backend)
```
NODE_ENV=production
APP_ENV=production
PORT=8080
HOST=0.0.0.0
JWT_SECRET=your-secure-jwt-secret-here
JWT_EXPIRES_IN=24h
LOG_LEVEL=info
CLIENT_URL=https://your-frontend-domain.railway.app
CORS_ORIGINS=https://your-frontend-domain.railway.app
DATABASE_URL=automatically-provided-by-railway-postgres
```

### Frontend Service (auth-frontend)
```
NODE_ENV=production
PORT=80
API_URL=https://your-backend-domain.railway.app
CLIENT_URL=https://your-frontend-domain.railway.app
```

## Important Notes

1. **Replace placeholder URLs**: Update the URLs with your actual Railway domains
2. **JWT_SECRET**: Use a secure 32+ character random string
3. **DATABASE_URL**: Automatically provided when you add PostgreSQL service
4. **Domain Names**: Railway provides unique domains for each service

## Steps to Deploy

1. **Push to GitHub**: Ensure your code is in a GitHub repository
2. **Create Railway Project**: Connect your GitHub repo to Railway
3. **Add PostgreSQL**: Add a PostgreSQL database service
4. **Set Environment Variables**: Add the variables above in Railway dashboard
5. **Deploy**: Railway will automatically build and deploy both services

## Security Best Practices

- Never commit actual URLs or secrets to version control
- Use Railway's environment variable system for all sensitive data
- Regularly rotate your JWT_SECRET
- Keep your domains private until ready for production use
