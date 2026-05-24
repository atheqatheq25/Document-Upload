const { Pool } = require("pg");
require("dotenv").config();

// Validate required environment variables
if (!process.env.DATABASE_URL) {
  console.error("❌ FATAL ERROR: DATABASE_URL environment variable is not set");
  console.error("   Please set DATABASE_URL in your Render environment variables");
  console.error("   Format: postgresql://user:password@host:port/database");
  process.exit(1);
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (error) => {
  console.error("❌ Database pool error:", error.message || error);
});

pool.on("connect", () => {
  console.log("✓ Successfully connected to database");
});

// Test the connection with detailed error reporting
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("❌ Database connection failed:", error.message || error);
    console.error("   Error details:", error);
  } else {
    console.log("✓ Database connection verified");
  }
});

module.exports = pool;
