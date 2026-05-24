const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/add-applicant", async (req, res) => {
  try {
    const { name, user_email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Applicant name is required" });
    }

    const result = await pool.query(
      `INSERT INTO applicants (name, user_email) VALUES ($1, $2) RETURNING *`,
      [name, user_email]
    );

    res.status(201).json({
      message: "✅ Applicant Added Successfully",
      applicant: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error adding applicant:", error.message);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});

router.get("/get-applicants", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM applicants ORDER BY id DESC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching all applicants:", error.message);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});

router.get("/get-applicants/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const result = await pool.query(
      `SELECT * FROM applicants WHERE user_email = $1 ORDER BY id DESC`,
      [email]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching applicants:", error.message);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});

router.delete("/delete-applicant/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM applicants WHERE id = $1", [id]);
    res.status(200).json({ message: "🗑 Applicant Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
