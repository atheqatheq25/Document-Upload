const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    const { name, email, password, firebase_uid } = req.body;

    // Name and email are always required
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Password is required only if NOT using firebase_uid (Google login)
    if (!firebase_uid && !password) {
      return res.status(400).json({ error: "Password is required for email/password registration" });
    }

    const existingUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(200).json({
        message: "User already exists",
        user: existingUser.rows[0],
      });
    }

    const result = await pool.query(
      `INSERT INTO users (name, email, password, firebase_uid) VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, email, password || null, firebase_uid || null]
    );

    res.status(201).json({
      message: "✅ User Registered Successfully",
      user: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
