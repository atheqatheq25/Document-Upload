const express = require("express");
const fs = require("fs");
const path = require("path");
const upload = require("../middleware/upload");
const pool = require("../db");

const router = express.Router();

router.post("/upload-file", upload.single("file"), async (req, res) => {
  try {
    const { document_id } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    if (!document_id) {
      return res.status(400).json({ error: "Document ID is required" });
    }

    const relativePath = `uploads/${req.file.filename}`;

    const result = await pool.query(
      `INSERT INTO uploaded_files (document_id, file_name, file_path, verification_status) VALUES ($1, $2, $3, $4) RETURNING *`,
      [document_id, req.file.filename, relativePath, "Pending"]
    );

    res.status(201).json({
      message: "✅ File Uploaded Successfully",
      file: result.rows[0],
    });
  } catch (error) {
    console.error("❌ Error uploading file:", error.message);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});

router.get("/get-files/:documentId", async (req, res) => {
  try {
    const { documentId } = req.params;
    const result = await pool.query(
      `SELECT * FROM uploaded_files WHERE document_id = $1 ORDER BY id DESC`,
      [documentId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("❌ Error fetching files:", error.message);
    res.status(500).json({ error: "❌ Server Error", details: error.message });
  }
});

router.delete("/delete-file/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const fileResult = await pool.query(
      `SELECT * FROM uploaded_files WHERE id = $1`,
      [id]
    );

    if (fileResult.rows.length === 0) {
      return res.status(404).json({ error: "File not found" });
    }

    const file = fileResult.rows[0];
    const filePath = file.file_path;
    const absolutePath = filePath && path.isAbsolute(filePath)
      ? filePath
      : filePath
      ? path.join(__dirname, "..", filePath)
      : null;

    if (absolutePath && fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
    }

    await pool.query(`DELETE FROM uploaded_files WHERE id = $1`, [id]);
    res.status(200).json({ message: "🗑 File Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Server Error" });
  }
});

module.exports = router;
