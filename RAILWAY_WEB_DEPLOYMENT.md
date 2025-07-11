# 🚀 Railway Web Deployment Guide

## Quick Steps

1. **Push your code to GitHub** (make sure latest changes are committed)

2. **Go to Railway**: https://railway.app

3. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository
   - Railway will automatically detect `railway.toml` and create 2 services

4. **Add Database**:
   - Click "Add Service" → "Database" → "PostgreSQL"
   - This will auto-generate `DATABASE_URL` for backend

5. **Configure Backend Service (`auth-backend`)**:
   - Add these environment variables:
     ```
     NODE_ENV=production
     APP_ENV=prod
     PORT=3000
     HOST=0.0.0.0
     JWT_SECRET=your-super-secure-jwt-secret-key-change-this-to-random-string
     JWT_EXPIRES_IN=24h
     LOG_LEVEL=info
     ```
   - After frontend deploys, add:
     ```
     CLIENT_URL=https://your-frontend-url.railway.app
     CORS_ORIGINS=https://your-frontend-url.railway.app
     ```

6. **Configure Frontend Service (`auth-frontend`)**:
   - Add these environment variables:
     ```
     NODE_ENV=production
     PORT=80
     ```
   - After backend deploys, update `client/src/environments/environment.prod.ts`:
     ```typescript
     export const environment = {
       production: true,
       apiUrl: 'https://your-backend-url.railway.app',
       clientUrl: 'https://your-frontend-url.railway.app',
       environment: 'prod'
     };
     ```

7. **Deploy Order**:
   - Backend first (needs database)
   - Frontend second (needs backend URL)
   - Update backend with frontend URL
   - Redeploy backend

## URLs After Deployment

- **Backend**: `https://auth-backend-[random].railway.app`
- **Frontend**: `https://auth-frontend-[random].railway.app`
- **API Docs**: `https://auth-backend-[random].railway.app/api/docs`

## Test Login

- Email: `admin@example.com`
- Password: `Admin@2024#Secure!`

## Troubleshooting

- Check deployment logs in Railway dashboard
- Verify environment variables are set correctly
- Ensure CORS_ORIGINS matches your frontend URL
- Database migrations run automatically on backend start
