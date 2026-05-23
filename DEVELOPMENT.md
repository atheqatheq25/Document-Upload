# Development Guide

## Prerequisites

- **Node.js**: v16 or higher
- **PostgreSQL**: v12 or higher
- **npm**: v8 or higher

## Initial Setup

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd Document-Upload

# Option A: Automated (recommended)
./setup.bat  # Windows
./setup.sh   # Mac/Linux

# Option B: Manual
cd backend && npm install
cd ../client && npm install
```

### 2. Database Setup

**Create PostgreSQL database:**
```bash
# Using psql
psql -U postgres
CREATE DATABASE document_upload_db;
```

**Check backend/.env has correct credentials:**
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=document_upload_db
```

### 3. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable Email/Password authentication
4. Enable Google Sign-In
5. Get your credentials from Project Settings
6. Add to `client/.env.local`:
   ```
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

### 4. Start Development

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
# Watches for changes, runs on http://localhost:5000
```

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

## Available Commands

### Backend
```bash
npm run dev        # Start with auto-reload (nodemon)
npm start          # Start production server
npm run lint       # Run linter (if configured)
```

### Frontend
```bash
npm run dev        # Start dev server with HMR
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Lint code
```

## Code Structure

### Backend Routes

- `POST /register-user` - Register new user
- `POST /add-applicant` - Add applicant
- `GET /get-applicants/:email` - Get user's applicants
- `DELETE /delete-applicant/:id` - Delete applicant
- `POST /add-document` - Add document
- `GET /get-documents/:applicantId` - Get documents
- `DELETE /delete-document/:id` - Delete document
- `POST /upload-file` - Upload file
- `GET /get-files/:documentId` - Get files
- `DELETE /delete-file/:id` - Delete file

### Frontend Components

- `ApplicantDashboard` - Main dashboard
- `ApplicantTabs` - Tabs for applicants
- `DocumentViewer` - View/upload documents
- `Modals` - Add applicant/document modals

## Environment Variables

### Backend (.env)
```
# Database
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
DB_NAME=document_upload_db

# Server
PORT=5000
NODE_ENV=development

# CORS
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env.local)
```
# API
VITE_API_URL=http://localhost:5000

# Firebase
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

## Common Issues & Solutions

### Backend Won't Start

**Issue: "ECONNREFUSED" or database error**
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Ensure PostgreSQL is running
- Check DB credentials in `.env`
- Verify database exists: `psql -l | grep document_upload_db`

**Issue: "Cannot find module 'express'"**
**Solution:**
```bash
cd backend
npm install
```

### Frontend Shows Blank Page

**Issue: API errors in console**
**Solution:**
- Check backend is running on `http://localhost:5000`
- Verify `VITE_API_URL` in `.env.local`
- Check CORS errors in browser console

### CORS Errors

**Issue: "CORS policy blocked request"**
**Solution:**
- Ensure backend `.env` has `FRONTEND_URL=http://localhost:5173`
- Restart backend after changing `.env`
- Check browser console for exact origin error

### Firebase Authentication Fails

**Issue: "auth/invalid-api-key" or similar**
**Solution:**
- Verify all Firebase credentials in `.env.local`
- Check Firebase project still exists
- Try creating new Firebase project if old one is deleted
- Check Firebase console has Email/Password and Google enabled

### Hot Module Replacement (HMR) Issues

**Issue: Frontend doesn't auto-reload on changes**
**Solution:**
```bash
# Kill all node processes
taskkill /F /IM node.exe  # Windows
killall node               # Mac/Linux

# Restart frontend
cd client && npm run dev
```

## Debugging

### Frontend
- Open browser DevTools (F12)
- Check Console tab for errors
- Check Network tab for API calls
- Use React DevTools extension

### Backend
- Check terminal output from `npm run dev`
- Add `console.log()` for debugging
- Use `node --inspect` for step debugging
- Check database directly: `psql -U postgres -d document_upload_db`

## Git Workflow

**Never commit:**
- `.env` files (included in `.gitignore`)
- `node_modules/` folders
- `.local` files
- Build artifacts

**Before committing:**
```bash
npm run lint   # Check code style
npm run build  # Ensure no build errors
git add .
git commit -m "Descriptive message"
git push
```

## Testing Locally

### Test Backend API
```bash
# Using curl
curl -X GET http://localhost:5000/get-applicants/test@gmail.com

# Using Thunder Client or Postman
GET http://localhost:5000/get-applicants/test@gmail.com
```

### Test Authentication Flow
1. Click "Register" on landing page
2. Create account with email/password
3. Test Google login
4. Should redirect to dashboard

### Test File Upload
1. Login to dashboard
2. Add an applicant
3. Add a document
4. Select a file (PDF/PNG/JPG)
5. Click upload
6. Verify file appears in document viewer

## Performance Tips

- Use React DevTools Profiler
- Check Network tab for slow requests
- Monitor backend response times
- Use `npm run build` to check bundle size

## Next Steps

- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production
- Add tests (Jest for backend, Vitest for frontend)
- Set up CI/CD pipeline
- Add logging/monitoring
- Implement error boundaries

## Questions?

Check:
1. Console errors (browser & terminal)
2. `.env` files are properly configured
3. Services are running (PostgreSQL, backend, frontend)
4. Network requests in DevTools
