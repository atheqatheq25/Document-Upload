const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "document_upload_db",
  password: process.env.DB_PASSWORD || "123456",
  port: Number(process.env.DB_PORT) || 5432,
});

module.exports = pool;
