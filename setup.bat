@echo off
REM Setup script for Document-Upload project (Windows)

echo.
echo ======================================
echo Document-Upload Project Setup
echo ======================================
echo.

REM Backend Setup
echo 📦 Setting up Backend...
cd backend

if not exist .env (
  echo ⚠️  .env file not found, creating from .env.example...
  copy .env.example .env
  echo ✓ Backend .env created
) else (
  echo ✓ Backend .env already exists
)

echo 📥 Installing backend dependencies...
call npm install

cd ..

REM Frontend Setup
echo.
echo 📦 Setting up Frontend...
cd client

if not exist .env.local (
  echo ⚠️  .env.local file not found, creating from .env.example...
  copy .env.example .env.local
  echo ✓ Frontend .env.local created
) else (
  echo ✓ Frontend .env.local already exists
)

echo 📥 Installing frontend dependencies...
call npm install

cd ..

echo.
echo ======================================
echo ✅ Setup Complete!
echo ======================================
echo.
echo 📖 Next Steps:
echo 1. Backend: cd backend ^&^& npm run dev
echo 2. Frontend: cd client ^&^& npm run dev
echo.
echo For production deployment, see DEPLOYMENT.md
echo.
pause
