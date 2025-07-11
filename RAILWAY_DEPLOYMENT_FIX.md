# Railway Deployment Guide

## Current Issue & Solution

Your Railway deployment is only working for the backend because of monorepo configuration issues. Here's how to fix it:

## Step 1: Update Railway Configuration

Your `railway.toml` has been updated with the correct configuration for a monorepo with multiple services.

## Step 2: Configure Environment Variables in Railway

You need to set these environment variables in your Railway dashboard:

### Backend Service (`auth-backend`)
```
NODE_ENV=production
APP_ENV=prod
PORT=3000
HOST=0.0.0.0
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-to-random-string
JWT_EXPIRES_IN=24h
LOG_LEVEL=info
CLIENT_URL=https://your-frontend-service.railway.app
CORS_ORIGINS=https://your-frontend-service.railway.app
DATABASE_URL=(automatically provided by Railway PostgreSQL)
```

### Frontend Service (`auth-frontend`)
```
NODE_ENV=production
PORT=80
API_URL=https://your-backend-service.railway.app
CLIENT_URL=https://your-frontend-service.railway.app
```

## Step 3: Deploy to Railway

1. **Push your changes to GitHub:**
   ```bash
   git add .
   git commit -m "Fix Railway monorepo configuration"
   git push origin main
   ```

2. **In Railway Dashboard:**
   - Go to your project
   - You should see both services: `auth-backend` and `auth-frontend`
   - If not, trigger a new deployment

3. **Set Environment Variables:**
   - For each service, go to Variables tab
   - Add the environment variables listed above
   - Replace the placeholder URLs with your actual Railway service URLs

## Step 4: Update URLs After Deployment

After both services are deployed, update the environment variables with the actual URLs:

1. **Get your service URLs from Railway dashboard**
2. **Update backend environment variables:**
   - `CLIENT_URL` = your frontend service URL
   - `CORS_ORIGINS` = your frontend service URL

3. **Update frontend build arguments:**
   - `API_URL` = your backend service URL
   - `CLIENT_URL` = your frontend service URL

## Step 5: Verify Deployment

1. **Backend Health Check:**
   - Visit: `https://your-backend-service.railway.app/api/docs`
   - Should show Swagger API documentation

2. **Frontend Health Check:**
   - Visit: `https://your-frontend-service.railway.app`
   - Should show your Angular application

3. **Test Authentication:**
   - Try logging in with: `admin@example.com` / `Admin@2024#Secure!`

## Common Issues & Solutions

### Issue: "Service failed to build"
**Solution:** Check Railway logs for build errors. Common fixes:
- Ensure all dependencies are listed in package.json
- Check that shared package builds correctly
- Verify Dockerfile paths are correct

### Issue: "Frontend shows 404 for API calls"
**Solution:** 
- Verify `API_URL` environment variable is set correctly
- Check CORS settings on backend
- Ensure backend `CLIENT_URL` matches frontend URL

### Issue: "Environment variables not working"
**Solution:**
- Railway variables are case-sensitive
- Use `${{VARIABLE_NAME}}` syntax in railway.toml
- Redeploy after changing environment variables

## Railway Project Structure

Your Railway project should show:
```
📦 your-project
├── 🔧 auth-backend (Node.js)
├── 🌐 auth-frontend (Static Site)
└── 🗄️ PostgreSQL (Database)
```

## Deployment Commands

If you need to manually trigger deployments:

```bash
# Deploy backend
railway up --service auth-backend

# Deploy frontend  
railway up --service auth-frontend
```

## Environment Variable Reference

### Required for Backend:
- `DATABASE_URL` (auto-provided by Railway PostgreSQL)
- `JWT_SECRET` (32+ character secret)
- `CLIENT_URL` (your frontend URL)
- `CORS_ORIGINS` (your frontend URL)

### Required for Frontend:
- `API_URL` (your backend URL)
- `CLIENT_URL` (your frontend URL)

## Support

If you're still having issues:
1. Check Railway deployment logs
2. Verify all environment variables are set
3. Ensure both services are active and healthy
4. Test API endpoints directly using the backend URL
