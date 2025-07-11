# Railway Web Deployment - Quick Reference

## 🚀 Step-by-Step Web Deployment

### 1. Prepare Repository
✅ **Files Ready**:
- `railway.toml` - Multi-service configuration
- `Dockerfile` - Backend container
- `client/Dockerfile` - Frontend container
- `nginx.conf` - Web server config
- `.env.prod` - Production environment template

### 2. Deploy to Railway
1. **Go to**: https://railway.app
2. **Login** with GitHub
3. **New Project** → "Deploy from GitHub repo"
4. **Select** your repository
5. **Railway auto-detects** your `railway.toml` and creates:
   - `auth-backend` service (backend)
   - `auth-frontend` service (frontend)

### 3. Add Database
- Click "Add Service" → "Database" → "PostgreSQL"
- `DATABASE_URL` automatically provided to services

### 4. Configure Environment Variables

#### Backend Service (`auth-backend`):
```
DATABASE_URL: (auto-provided by PostgreSQL addon)
JWT_SECRET: your-secure-32-character-secret
JWT_EXPIRES_IN: 24h
CLIENT_URL: https://your-frontend.railway.app
CORS_ORIGINS: https://your-frontend.railway.app
NODE_ENV: production
APP_ENV: prod
PORT: 3000
HOST: 0.0.0.0
```

#### Frontend Service (`auth-frontend`):
```
API_URL: https://your-backend.railway.app
NODE_ENV: production
```

### 5. Deployment Order
1. **Backend First**: Deploy backend, copy URL
2. **Frontend Config**: Set frontend `API_URL` to backend URL
3. **Frontend Deploy**: Deploy frontend, copy URL
4. **Backend Update**: Update backend `CLIENT_URL` and `CORS_ORIGINS`

### 6. Run Migrations
- Backend service → Settings → Connect
- Terminal: `npm run migration:run`

### 7. Test
- **Frontend**: Visit frontend URL
- **Login**: `admin@example.com` / `Admin@2024#Secure!`
- **API Docs**: Visit backend URL + `/api/docs`

## 🔧 Environment Variables Template

### Backend Variables
```
DATABASE_URL=postgresql://user:pass@host:port/db
JWT_SECRET=your-super-secure-32-character-secret-key
JWT_EXPIRES_IN=24h
CLIENT_URL=https://auth-frontend-xxxx.railway.app
CORS_ORIGINS=https://auth-frontend-xxxx.railway.app
NODE_ENV=production
APP_ENV=prod
PORT=3000
HOST=0.0.0.0
```

### Frontend Variables
```
API_URL=https://auth-backend-xxxx.railway.app
NODE_ENV=production
```

## 🎯 Success Indicators
- ✅ Both services show "Deployed" status
- ✅ Frontend loads without errors
- ✅ API docs accessible at backend URL
- ✅ Login works with admin credentials
- ✅ Database migrations completed

## 🔗 Quick Links
- **Railway Dashboard**: https://railway.app/dashboard
- **Deployment Guide**: `RAILWAY_DEPLOYMENT.md`
- **Validation Script**: `./deploy-railway.sh`
- **Login Credentials**: `LOGIN_CREDENTIALS.md`

## 💡 Pro Tips
1. **Deploy backend first**, get URL, then configure frontend
2. **Variables require redeploy** to take effect
3. **Check logs** in Railway dashboard for troubleshooting
4. **URLs are auto-generated** by Railway (format: `service-name-xxxx.railway.app`)
5. **Database connection** is automatic with PostgreSQL addon

Your full-stack auth app is ready for Railway web deployment! 🚀
