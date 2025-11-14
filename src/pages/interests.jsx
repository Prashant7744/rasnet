// src/pages/Interests.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

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

  const toggleInterest = (interest) =>
    setSelected((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );

  const addCustomInterest = (e) => {
    if (e) e.preventDefault();
    const trimmed = customInterest.trim();
    if (!trimmed) return;
    if (!selected.includes(trimmed)) setSelected((s) => [...s, trimmed]);
    setCustomInterest("");
  };

  const handleSave = async () => {
    try {
      if (!user) {
        alert("Please sign in first!");
        return;
      }
      if (selected.length === 0) {
        alert("Please select at least one interest!");
        return;
      }

      setSaving(true);
      // write to Firestore under collection 'users' with doc id = uid, merge interests
      await setDoc(doc(db, "users", user.uid), { interests: selected }, { merge: true });

      alert("Interests saved!");
      navigate("/explore");
    } catch (err) {
      console.error("Saving error:", err);
      alert("Error saving interests. Check console.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page">
      <h1 className="h1">Select Your Interests 🌟</h1>

      <div className="chips" aria-live="polite">
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

      <form
        className="controls"
        onSubmit={(e) => {
          e.preventDefault();
          addCustomInterest();
        }}
      >
        <input
          type="text"
          placeholder="Add custom interest..."
          value={customInterest}
          onChange={(e) => setCustomInterest(e.target.value)}
          aria-label="custom-interest"
        />
        <button type="button" className="btn ghost" onClick={addCustomInterest}>
          Add
        </button>
      </form>

      <div style={{ marginTop: 12 }}>
        <button className="btn save" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : "Save Interests"}
        </button>
      </div>
    </div>
  );
}
