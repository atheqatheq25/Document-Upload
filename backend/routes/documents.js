const express = require("express");
const pool = require("../db");

const router = express.Router();

router.post("/add-document", async (req, res) => {
  try {
    const { applicant_id, document_name } = req.body;

    if (!applicant_id || !document_name || !document_name.trim()) {
      return res.status(400).json({
        error: "Applicant ID and Document Name are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO documents (applicant_id, document_name) VALUES ($1, $2) RETURNING *`,
      [applicant_id, document_name]
    );

    res.status(201).json({
      message: "✅ Document Added Successfully",
      document: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

router.get("/get-documents/:applicantId", async (req, res) => {
  try {
    const { applicantId } = req.params;
    const result = await pool.query(
      `SELECT * FROM documents WHERE applicant_id = $1 ORDER BY id DESC`,
      [applicantId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

router.delete("/delete-document/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM documents WHERE id = $1", [id]);
    res.status(200).json({ message: "🗑 Document Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
