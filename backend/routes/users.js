const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/register-user", async (req, res) => {
  try {
    const { name, email, password, firebase_uid } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
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
      [name, email, password, firebase_uid]
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
