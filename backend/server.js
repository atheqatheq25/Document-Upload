const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const applicantsRouter = require("./routes/applicants");
const documentsRouter = require("./routes/documents");
const filesRouter = require("./routes/files");
const usersRouter = require("./routes/users");

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for Google authentication
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://127.0.0.1:5000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

app.use("/uploads", express.static(uploadPath));

app.get("/", (req, res) => {
  res.send("?? Backend + PostgreSQL Running Successfully");
});

app.use("/", applicantsRouter);
app.use("/", documentsRouter);
app.use("/", filesRouter);
app.use("/", usersRouter);

app.listen(PORT, () => {
  console.log(`?? Server running on port ${PORT}`);
});
