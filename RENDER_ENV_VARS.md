# Render Backend Environment Variables
# These need to be set in your Render Dashboard

# Copy the following to Render project environment variables:

DB_USER=postgres
DB_PASSWORD=[your_database_password]
DB_HOST=[your_render_postgres_host]
DB_PORT=5432
DB_NAME=document_upload_db
PORT=5000
NODE_ENV=production

# IMPORTANT: Set your Vercel frontend URL here after you deploy frontend
FRONTEND_URL=https://your-vercel-domain.vercel.app
