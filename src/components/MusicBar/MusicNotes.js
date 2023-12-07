import React, { useState } from "react";

function MusicNotes({ onSelectedNotes }) {
  const [selectedMusicalNotes, setSelectedMusicalNotes] = useState([]);
  const [showCheckboxes, setShowCheckboxes] = useState(false);

  const musicalNotes = [
    { id: "C4", note: "C", duration: "w" },
    { id: "D4", note: "D", duration: "q" },
    { id: "E4", note: "E", duration: "h" },
    { id: "F4", note: "F", duration: "q" },
    { id: "G4", note: "G", duration: "8" },
    { id: "A4", note: "A", duration: "q" },
    { id: "B4", note: "B", duration: "h" },
  ];

  // const musicalNotes = ["Cbb-4", "Cb-4", "C-4", "C#-4"];

  const handleMusicalNotes = (noteId) => {
    const isSelected = selectedMusicalNotes.includes(noteId);
    const updatedSelectedNotes = isSelected
      ? selectedMusicalNotes.filter((id) => id !== noteId)
      : [...selectedMusicalNotes, noteId];

    const selectedNotesObjects = musicalNotes.filter((note) =>
      updatedSelectedNotes.includes(note.id)
    );

    setSelectedMusicalNotes(updatedSelectedNotes);
    onSelectedNotes(selectedNotesObjects);
  };

  const toggleCheckboxes = () => {
    setShowCheckboxes(!showCheckboxes);
  };

  return (
    <div>
      <label>Notes:</label>
      <div>
        {showCheckboxes &&
          musicalNotes.map((note) => (
            <label key={note.id}>
              <input
                type="checkbox"
                value={note.id}
                checked={selectedMusicalNotes.includes(note.id)}
                onChange={() => handleMusicalNotes(note.id)}
              />
              {note.note}
            </label>
          ))}
      </div>
      <button onClick={toggleCheckboxes}>
        {showCheckboxes ? "Hide Checkboxes" : "Show Checkboxes"}
      </button>
    </div>
  );
}

export default MusicNotes;
