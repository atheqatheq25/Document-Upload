const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const applicantsRouter = require("./routes/applicants");
const documentsRouter = require("./routes/documents");
const filesRouter = require("./routes/files");
const usersRouter = require("./routes/users");
const initializeDatabase = require("./initDb");

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = "https://document-upload-silk.vercel.app";

// Log environment configuration for debugging
console.log("=== Server Configuration ===");
console.log(`PORT: ${PORT}`);
console.log(`Database: Render PostgreSQL`);
console.log(`Frontend URL (CORS): ${FRONTEND_URL}`);
console.log("===========================\n");

// CORS configuration - dynamically build allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:3000",
  "http://127.0.0.1:5173",
  FRONTEND_URL,
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
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

// Initialize database and start server
initializeDatabase().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // Handle server errors
  server.on("error", (error) => {
    console.error("❌ Server error:", error);
  });
}).catch((error) => {
  console.error("❌ Failed to initialize database:", error.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("❌ Uncaught exception:", error.message);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled rejection:", error.message);
});
