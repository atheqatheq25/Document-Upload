# Render Backend Environment Variables

## CRITICAL: Set these in your Render Dashboard

### Option 1: Using Render PostgreSQL Service (RECOMMENDED)
If you create a Render PostgreSQL database, Render automatically provides a `DATABASE_URL` environment variable.
**You do NOT need to set individual DB_* variables - just ensure DATABASE_URL is available.**

1. Create a PostgreSQL database service in Render
2. The `DATABASE_URL` will be automatically available to your web service
3. Set the following additional variables:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

### Option 2: Using External PostgreSQL Database
If using an external PostgreSQL database (not Render's), construct the DATABASE_URL manually:

```
DATABASE_URL=postgresql://user:password@host:port/database_name
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

## Troubleshooting Database Connection

If you see "Database connection failed" errors:

1. **Verify DATABASE_URL is set** - Go to your Render service settings → Environment tab
2. **Check PostgreSQL service is running** - If using Render PostgreSQL, verify the service status
3. **Verify connection string format** - Should be: `postgresql://user:password@host:port/database`
4. **Test the connection** - In Render logs, you'll see "Database connection verified" if successful

## Complete Environment Variables Reference

```
# Database (REQUIRED)
DATABASE_URL=postgresql://user:password@host:5432/database_name

# Server Configuration
NODE_ENV=production
PORT=5000

# Frontend (Required for CORS)
FRONTEND_URL=https://your-vercel-domain.vercel.app
```
