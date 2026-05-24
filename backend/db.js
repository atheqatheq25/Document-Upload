const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (error) => {
  console.error("❌ Database pool error:", error.message);
});

pool.on("connect", () => {
  console.log("✓ Successfully connected to database");
});

// Test the connection
pool.query("SELECT NOW()", (error, result) => {
  if (error) {
    console.error("❌ Database connection failed:", error.message);
  } else {
    console.log("✓ Database connection verified");
  }
});

module.exports = pool;
