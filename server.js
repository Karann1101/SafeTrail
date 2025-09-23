// server.js
require('dotenv').config(); // optional if you later use env vars
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Use env vars in production. For now you can keep these here.
const SUPABASE_URL = process.env.SUPABASE_URL || "https://emoyknqofiqsdrjvjchp.supabase.co";
const SUPABASE_KEY = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVtb3lrbnFvZmlxc2RyanZqY2hwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MjIwMzEsImV4cCI6MjA3NDE5ODAzMX0.hscWgKNGtM0WX6TYgqi2Dv4EoKTI7t1XjMQcYQjABw8";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Basic validation helper
function validateRegisterBody(body) {
  if (!body) return "Missing body";
  const { name, idProof, tripDuration, emergencyContacts } = body;
  if (!name) return "name is required";
  if (!idProof) return "idProof is required";
  if (!tripDuration) return "tripDuration is required";
  if (!emergencyContacts || !Array.isArray(emergencyContacts) || emergencyContacts.length === 0)
    return "emergencyContacts must be a non-empty array";
  return null;
}

// API: Register tourist
app.post("/registerTourist", async (req, res) => {
  try {
    const validationError = validateRegisterBody(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    let { name, idProof, tripDuration, emergencyContacts } = req.body;

    // Fix: Ensure emergencyContacts is a valid array
    if (typeof emergencyContacts === "string") {
      try {
        emergencyContacts = JSON.parse(emergencyContacts);
      } catch (e) {
        // If parsing fails, it's not a valid JSON string
        return res.status(400).json({ error: "Invalid format for emergencyContacts" });
      }
    }
    
    // Insert + select() to get returned row(s)
    const resp = await supabase
      .from("tourists")
      .insert([
        { name, id_proof: idProof, trip_duration: tripDuration, emergency_contacts: emergencyContacts }
      ])
      .select();

    console.log("Supabase insert response:", resp);

    if (resp.error) return res.status(400).json({ error: resp.error.message });

    // resp.data is an array of inserted rows; take first
    const inserted = Array.isArray(resp.data) ? resp.data[0] : resp.data;

    return res.status(201).json({ message: "Tourist registered!", tourist: inserted || null });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// API: Get tourist details
app.get("/getTourist/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("tourists")
      .select("*")
      .eq("id", req.params.id)
      .single();

    if (error) return res.status(404).json({ error: "Tourist not found", details: error.message });
    res.json(data);
  } catch (err) {
    console.error("Get error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
