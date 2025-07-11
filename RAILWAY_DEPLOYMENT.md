# Railway Web Deployment Guide

## Overview
This guide will help you deploy both the backend (NestJS) and frontend (Angular) services to Railway using the **Railway Dashboard** (web interface).

## Prerequisites

### 1. GitHub Repository
- Ensure your code is pushed to a GitHub repository
- Railway will deploy directly from GitHub

### 2. Railway Account
- Sign up at [https://railway.app](https://railway.app)
- Connect your GitHub account

### 3. Environment Setup
- **Important**: Never commit actual `.env` files to git
- Use the provided `.env.example` templates
- Set environment variables in Railway dashboard

## Services Configuration

Your Railway project will have **2 services**:

### 1. Backend Service (`auth-backend`)
- **Source**: Root directory (`.`)
- **Dockerfile**: `Dockerfile`
- **Port**: 3000

### 2. Frontend Service (`auth-frontend`)
- **Source**: `client` directory
- **Dockerfile**: `client/Dockerfile`
- **Port**: 80

## Environment Variables (Railway Dashboard)

### Backend Service (`auth-backend`)
Set these in Railway dashboard → Your Project → auth-backend service → Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `DATABASE_URL` | *Auto-provided* | PostgreSQL connection (from database addon) |
| `JWT_SECRET` | `your-secure-32-char-secret` | JWT signing secret |
| `JWT_EXPIRES_IN` | `24h` | Token expiration time |
| `CLIENT_URL` | `https://your-frontend.railway.app` | Frontend URL (set after frontend deploys) |
| `CORS_ORIGINS` | `https://your-frontend.railway.app` | Allowed CORS origins |
| `NODE_ENV` | `production` | Production environment |
| `APP_ENV` | `prod` | Application environment |
| `PORT` | `3000` | Backend port |
| `HOST` | `0.0.0.0` | Host binding |

### Frontend Service (`auth-frontend`)
Set these in Railway dashboard → Your Project → auth-frontend service → Variables:

| Variable | Value | Description |
|----------|-------|-------------|
| `API_URL` | `https://your-backend.railway.app` | Backend API URL (set after backend deploys) |
| `NODE_ENV` | `production` | Production environment |

## Web Deployment Steps

### 1. Create New Project
1. Go to [https://railway.app](https://railway.app)
2. Login with your GitHub account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository

### 2. Automatic Service Detection
Railway will detect your `railway.toml` file and automatically create:
- **auth-backend** service (from root directory)
- **auth-frontend** service (from client directory)

### 3. Add Database
1. In your project dashboard, click "Add Service"
2. Select "Database" → "PostgreSQL"
3. Railway will provision and connect the database

### 4. Deploy Backend First
1. Go to your **auth-backend** service in Railway dashboard
2. Set environment variables (see table above)
3. Click "Deploy" (Railway will build using your `Dockerfile`)
4. Wait for deployment to complete
5. Copy the backend service URL (e.g., `https://auth-backend-xxxx.railway.app`)

### 5. Run Database Migrations
After backend deployment:
1. Go to backend service → Settings → Connect
2. Open the terminal connection
3. Run: `npm run migration:run`
4. Verify admin user was created

### 6. Configure Frontend
1. Go to your **auth-frontend** service in Railway dashboard
2. Go to Variables tab
3. Set `API_URL` to your backend URL from step 4
4. Click "Deploy"

### 7. Update Backend CORS
After frontend deployment:
1. Get your frontend URL (e.g., `https://auth-frontend-xxxx.railway.app`)
2. Go to backend service → Variables
3. Set `CLIENT_URL` and `CORS_ORIGINS` to your frontend URL
4. Redeploy backend service

## Post-Deployment

### 1. Verify Services
In Railway dashboard:
- Both services should show "Deployed" status
- Check service logs for any errors

### 2. Test Your Application
1. **Frontend**: Visit your frontend URL
2. **Backend API**: Visit `https://your-backend-url.railway.app/api/docs`
3. **Authentication**: Login with `admin@example.com` / `Admin@2024#Secure!`

### 3. Monitor Deployment
- Check service logs in Railway dashboard
- Monitor resource usage
- Set up alerts if needed

## Environment Variables Security

### ✅ **Best Practices**
- **Never commit** `.env` files to git
- Use Railway's environment variables feature
- Different secrets for each environment
- Use secure random strings for JWT secrets

### 🔐 **Generate Secure JWT Secret**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 📋 **Environment Variable Checklist**
- ✅ `DATABASE_URL` - Auto-provided by Railway PostgreSQL addon
- ✅ `JWT_SECRET` - Secure random string (32+ characters)
- ✅ `CLIENT_URL` - Frontend Railway URL
- ✅ `CORS_ORIGINS` - Frontend Railway URL
- ✅ `API_URL` - Backend Railway URL (for frontend service)

## Quick Deployment Validation

Run this script to check your setup:
```bash
./deploy-railway.sh
```

## Troubleshooting

### Common Issues

1. **Service Build Failures**
   - Check Railway build logs in dashboard
   - Verify Dockerfile syntax and dependencies
   - Ensure all required files are in repository

2. **Database Connection Issues**
   - Verify PostgreSQL addon is added
   - Check `DATABASE_URL` is automatically provided
   - Ensure database is in same region as services

3. **CORS Errors**
   - Verify `CLIENT_URL` and `CORS_ORIGINS` match frontend URL exactly
   - Check frontend `API_URL` points to correct backend URL
   - Ensure variables are set and services redeployed

4. **Environment Variables Not Applied**
   - Variables require service redeploy to take effect
   - Check variable names are exactly as shown (case-sensitive)
   - Verify variables are set in correct service

### Getting Help

In Railway dashboard:
- **View Logs**: Service → Logs tab
- **Check Metrics**: Service → Metrics tab
- **Environment Variables**: Service → Variables tab
- **Build Logs**: Service → Deployments → View Build Logs

### Service URLs
After deployment, your services will be available at:
- Backend: `https://auth-backend-[random].railway.app`
- Frontend: `https://auth-frontend-[random].railway.app`
- API Docs: `https://auth-backend-[random].railway.app/api/docs`

## Security Notes

- **Never commit** production secrets to git
- Use Railway's environment variables for all sensitive data
- Regularly rotate JWT secrets
- Use strong, unique passwords for database
- Keep different secrets for each environment

## Success Indicators

✅ Both services show "Deployed" status
✅ Frontend loads without errors
✅ Backend API returns 200 responses
✅ Authentication works end-to-end
✅ Database migrations completed successfully
✅ No sensitive data committed to git

Your full-stack authentication app is now securely deployed on Railway! 🚀
