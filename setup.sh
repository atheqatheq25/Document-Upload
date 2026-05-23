#!/bin/bash

# Setup script for Document-Upload project

echo "======================================"
echo "Document-Upload Project Setup"
echo "======================================"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
  echo "⚠️  .env file not found, creating from .env.example..."
  cp .env.example .env
  echo "✓ Backend .env created"
else
  echo "✓ Backend .env already exists"
fi

echo "📥 Installing backend dependencies..."
npm install

cd ..

# Frontend Setup
echo ""
echo "📦 Setting up Frontend..."
cd client

if [ ! -f .env.local ]; then
  echo "⚠️  .env.local file not found, creating from .env.example..."
  cp .env.example .env.local
  echo "✓ Frontend .env.local created"
else
  echo "✓ Frontend .env.local already exists"
fi

echo "📥 Installing frontend dependencies..."
npm install

cd ..

echo ""
echo "======================================"
echo "✅ Setup Complete!"
echo "======================================"
echo ""
echo "📖 Next Steps:"
echo "1. Backend: cd backend && npm run dev"
echo "2. Frontend: cd client && npm run dev"
echo ""
echo "For production deployment, see DEPLOYMENT.md"
