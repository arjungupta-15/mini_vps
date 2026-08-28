const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────

// Health check - CI/CD pipelines often ping this
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running 🟢",
    timestamp: new Date().toISOString(),
  });
});

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Mini API!" });
});

// Get all users (static data for demo)
app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Alice", role: "Developer" },
    { id: 2, name: "Bob", role: "DevOps Engineer" },
    { id: 3, name: "Charlie", role: "Designer" },
  ];
  res.json({ success: true, data: users });
});

// Add a new user
app.post("/api/users", (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ success: false, message: "name and role are required" });
  }

  const newUser = { id: Date.now(), name, role };
  res.status(201).json({ success: true, data: newUser });
});

// ─── Start server ─────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app; // export for testing
