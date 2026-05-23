# Document-Upload

A full-stack document management application with user authentication, applicant management, and file upload capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- PostgreSQL
- npm

### Setup (Automated)

**Windows:**
```bash
./setup.bat
```

**Mac/Linux:**
```bash
chmod +x setup.sh
./setup.sh
```

### Setup (Manual)

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   ```

2. **Frontend Setup:**
   ```bash
   cd client
   npm install
   ```

## 💻 Development

### Start Backend
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

### Start Frontend
```bash
cd client
npm run dev
# Runs on http://localhost:5173
```

## 📋 Features

- **User Authentication**: Firebase email/password and Google OAuth
- **Applicant Management**: Create and manage applicants
- **Document Management**: Upload and organize documents
- **File Upload**: Support for PDF, PNG, JPG with file size limits
- **Verification Status**: Track document verification status
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Architecture

### Frontend (React + Vite)
- Location: `client/`
- Frameworks: React 19, Firebase Auth, React Router
- Styling: Bootstrap 5, Custom CSS
- API Client: Axios

### Backend (Express + PostgreSQL)
- Location: `backend/`
- Framework: Express.js
- Database: PostgreSQL
- File Storage: Local disk (uploads/)
- Authentication: Firebase verification

## 🔧 Environment Configuration

### Backend `.env`
```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=document_upload_db
PORT=5000
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

### Frontend `.env.local`
```
VITE_API_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 📦 Deployment

For complete deployment instructions including:
- Backend deployment (Render, Railway, Heroku)
- Frontend deployment (Vercel)
- Firebase configuration
- Environment setup for production

See [DEPLOYMENT.md](DEPLOYMENT.md)

## 📂 Project Structure

```
Document-Upload/
├── backend/
│   ├── routes/           # API routes
│   ├── middleware/       # Multer upload config
│   ├── db.js            # Database connection
│   ├── server.js        # Express server
│   └── .env             # Environment variables
├── client/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── api/         # API client
│   │   ├── firebase.js  # Firebase config
│   │   └── main.jsx     # Entry point
│   └── .env.local       # Environment variables
├── DEPLOYMENT.md        # Production deployment guide
└── README.md           # This file
```

## 🔐 Security Notes

- Credentials are stored in `.env` files (never commit these!)
- `.env` files are excluded in `.gitignore`
- Always use environment variables for sensitive data
- Firebase credentials are loaded from environment

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running
- Verify database credentials in `.env`
- Check logs: `cd backend && npm run dev`

### Frontend shows CORS errors
- Ensure backend is running
- Check `VITE_API_URL` in `.env.local`
- Verify backend `.env` has correct `FRONTEND_URL`

### Firebase authentication fails
- Check Firebase credentials in `.env.local`
- Verify domain is authorized in Firebase console
- Clear browser cache and cookies

See [DEPLOYMENT.md](DEPLOYMENT.md) for more troubleshooting help.

## 📄 License

MIT

## 👥 Contributors

- Project created for document management system