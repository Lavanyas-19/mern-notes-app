import React, { useState } from 'react';

function NoteForm({ addNote }) {
  const [note, setNote] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title && note.content) {
      addNote(note);
      setNote({ title: '', content: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Enter title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Enter content"
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        required
      />
      <button type="submit">Add Note</button>
    </form>
  );
}

export default NoteForm;
