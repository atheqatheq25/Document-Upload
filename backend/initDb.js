const pool = require("./db");

const initializeDatabase = async () => {
  try {
    console.log("Initializing database tables...");

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255),
        firebase_uid VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Users table created");

    // Create applicants table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS applicants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Applicants table created");

    // Create documents table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        applicant_id INT NOT NULL REFERENCES applicants(id) ON DELETE CASCADE,
        document_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Documents table created");

    // Create uploaded_files table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS uploaded_files (
        id SERIAL PRIMARY KEY,
        document_id INT NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
        file_name VARCHAR(255) NOT NULL,
        file_path VARCHAR(255) NOT NULL,
        verification_status VARCHAR(50) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✓ Uploaded files table created");

    console.log("✅ Database initialization complete!");
  } catch (error) {
    console.error("❌ Database initialization error:", error);
  }
};

module.exports = initializeDatabase;
