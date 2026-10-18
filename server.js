const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = path.join(__dirname, "data");
const DATA_FILE = path.join(DATA_DIR, "registrations.json");

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

function readRegistrations() {
  try { return JSON.parse(fs.readFileSync(DATA_FILE, "utf8")); }
  catch { return []; }
}
function saveRegistration(entry) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const all = readRegistrations();
  all.push(entry);
  fs.writeFileSync(DATA_FILE, JSON.stringify(all, null, 2));
}

app.get("/api/health", (_req, res) => res.json({ ok: true, service: "IGEN GREENDAY API" }));

app.get("/api/stats", (_req, res) => {
  const all = readRegistrations();
  res.json({
    registrations: all.length,
    individuals: all.filter(x => x.participantType === "Individual").length,
    groups: all.filter(x => x.participantType === "Group").length,
    organisations: all.filter(x => x.participantType === "Organisation").length
  });
});

app.post("/api/register", (req, res) => {
  const { name, email, participantType, organisation, category, activity, city, consent } = req.body || {};
  if (!name || !email || !participantType || !category || !consent) {
    return res.status(400).json({ message: "Please complete all required fields and confirm consent." });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Please enter a valid email address." });
  }
  const entry = {
    id: `IGEN-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`,
    name: String(name).trim().slice(0, 100),
    email: String(email).trim().toLowerCase().slice(0, 200),
    participantType: String(participantType).slice(0, 30),
    organisation: String(organisation || "").trim().slice(0, 150),
    category: String(category).slice(0, 80),
    activity: String(activity || "").trim().slice(0, 200),
    city: String(city || "").trim().slice(0, 100),
    createdAt: new Date().toISOString()
  };
  saveRegistration(entry);
  res.status(201).json({ message: "Registration received! Take action, document your impact, and share it with the IGEN GREENDAY community.", registrationId: entry.id });
});

app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));

app.listen(PORT, () => console.log(`IGEN GREENDAY website running at http://localhost:${PORT}`));
