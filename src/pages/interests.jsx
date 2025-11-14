// src/pages/Interests.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseconfig";
import { ref, set } from "firebase/database";

const defaultInterests = [
  "Football",
  "Cricket",
  "Gym / Workout",
  "Reading / Study Groups",
  "Chess",
  "Music / Singing",
  "Photography",
  "Dance",
  "Coding / Hackathons",
  "Travel & Exploration",
];

export default function Interests({ user }) {
  const [selected, setSelected] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const addCustomInterest = () => {
    const trimmed = customInterest.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) {
      setSelected([...selected, trimmed]);
    }
    setCustomInterest("");
  };

  const handleSave = async () => {
    try {
      if (!user) {
        alert("Login required!");
        return;
      }

      setSaving(true); // FIX: saving state now used

      await set(ref(db, `users/${user.uid}/interests`), selected);

      setSaving(false);

      alert("Interests saved!");
      navigate("/explore");
    } catch (err) {
      setSaving(false);
      console.error("Saving error:", err);
      alert("Error saving interests. Check console.");
    }
  };

  return (
    <div className="page">
      <h1 className="h1">Select Your Interests 🌟</h1>

      <div className="chips">
        {defaultInterests.map((item) => (
          <button
            key={item}
            type="button"
            className={`chip ${selected.includes(item) ? "selected" : ""}`}
            onClick={() => toggleInterest(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="controls">
        <input
          type="text"
          placeholder="Add custom interest..."
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
        />
        <button type="button" className="btn ghost" onClick={addCustomInterest}>
          Add
        </button>
      </div>

      <button className="btn save" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : "Save Interests"}
      </button>
    </div>
  );
}
