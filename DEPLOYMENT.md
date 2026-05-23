# Deployment Guide

## Issues Fixed

This guide addresses the three main deployment errors:
1. **CORS errors** - Frontend can't reach backend
2. **Firebase unauthorized domain** - Auth doesn't work on deployed domain
3. **API URL configuration** - Hardcoded localhost endpoint

---

## 1. Fix CORS Errors

### Backend Setup (Render/Railway/Heroku)

1. **Copy `.env.example` to `.env`:**
   ```bash
   cp backend/.env.example backend/.env
   ```

2. **Set your Frontend URL in `.env`:**
   ```
   FRONTEND_URL=https://document-upload-git-main-atheq-s-projects.vercel.app
   ```

3. **Deploy to your backend hosting:**
   - Render (recommended): Deploy with `npm install && npm start`
   - Railway: Push to Git, it auto-deploys
   - Heroku: Use Heroku CLI or connect GitHub

4. **Update your frontend `.env.local` with the backend URL:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

---

## 2. Fix Firebase Unauthorized Domain Error

### Firebase Console Setup

1. **Go to Firebase Console:**
   - Visit https://console.firebase.google.com
   - Select your project

2. **Add Authorized Domain:**
   - Go to **Authentication** → **Settings** → **Authorized domains** tab
   - Click **Add domain**
   - Enter: `document-upload-git-main-atheq-s-projects.vercel.app`
   - Click **Add**

3. **Wait for propagation:**
   - Changes can take up to 5 minutes
   - Clear browser cache and try again

### Firebase Environment Variables

Make sure your `.env.local` in the `client` folder contains:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

---

## 3. API URL Configuration

### Frontend Setup (Vercel)

1. **Set Environment Variable in Vercel:**
   - Go to your Vercel project settings
   - **Environment Variables** section
   - Add new variable:
     ```
     Name: VITE_API_URL
     Value: https://your-backend-url.onrender.com
     ```

2. **Redeploy after adding environment variable:**
   - Trigger a new deployment in Vercel
   - Wait for build to complete

### Local Development

For local testing:
```bash
# Backend terminal
cd backend
npm install
node server.js
# Runs on http://localhost:5000

# Frontend terminal (new terminal)
cd client
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## Step-by-Step Deployment Process

### 1. Deploy Backend First

**Option A: Render (Recommended)**
```bash
# Create render.yaml in backend root if needed
# Then push to GitHub and connect to Render
git add backend/.env.example
git commit -m "Add backend env config"
git push
```

**Option B: Railway**
- Connect your GitHub repository
- Railway auto-deploys on push
- Set environment variables in Railway dashboard

**Option C: Heroku**
```bash
heroku create your-app-name
heroku config:set FRONTEND_URL=https://your-vercel-url.vercel.app
git push heroku main
```

After deployment, note your backend URL (e.g., `https://your-app.onrender.com`)

### 2. Update Frontend Environment

In your Vercel project settings:
- Add `VITE_API_URL` with your backend URL
- Add all `VITE_FIREBASE_*` variables

### 3. Update Firebase Authorized Domains

- Add your Vercel domain to Firebase console
- Wait 5 minutes for changes to propagate

### 4. Redeploy Frontend

- Trigger new deployment in Vercel
- Or push a new commit to trigger auto-deploy

---

## Testing Deployment

After deployment:

1. **Test Google Login:**
   - Should not show "unauthorized-domain" error
   - Should redirect to dashboard after login

2. **Test API Calls:**
   - Add an applicant
   - Should show in dashboard
   - No CORS errors in browser console

3. **View Console Errors:**
   - Open DevTools (F12)
   - Go to Console tab
   - Verify no CORS or auth errors

---

## Troubleshooting

### Still Getting CORS Errors?
- Clear browser cache: `Ctrl+Shift+Delete`
- Check `FRONTEND_URL` in backend `.env`
- Verify backend is deployed and running

### Firebase Still Showing Unauthorized Domain?
- Double-check domain spelling in Firebase console
- Check for `https://` prefix
- Wait up to 10 minutes
- Try incognito/private browsing mode

### API Returns 404?
- Check `VITE_API_URL` matches your backend URL
- Verify backend is running
- Check network tab in DevTools for actual request URL

### Backend Can't Connect to Database?
- Verify database credentials in `.env`
- For PostgreSQL on Railway/Render: use provided connection string
- Check database is running and accessible

---

## Environment Variables Summary

### Backend `.env`
```
DB_USER=postgres
DB_HOST=your_db_host
DB_NAME=document_upload_db
DB_PASSWORD=your_password
DB_PORT=5432
PORT=5000
FRONTEND_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

### Frontend `.env.local` (Vercel Environment Variables)
```
VITE_API_URL=https://your-backend-url.onrender.com
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

---

## Quick Reference

| Error | Cause | Fix |
|-------|-------|-----|
| CORS blocked | Backend doesn't allow frontend domain | Add `FRONTEND_URL` to backend `.env` |
| Firebase unauthorized-domain | Domain not in Firebase console | Add domain to Firebase Auth settings |
| API 404 errors | Wrong backend URL | Set `VITE_API_URL` in Vercel |
| Network error on localhost | Trying to access localhost from deployed app | Use deployed backend URL |

