import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const fetchNotes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/notes");
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching notes:", err);
      setLoading(false);
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    try {
      await axios.post("http://localhost:5000/api/notes", {
        title: title.trim(),
        content: content.trim(),
      });
      setTitle("");
      setContent("");
      setIsAdding(false);
      fetchNotes();
    } catch (err) {
      console.error("Error adding note:", err);
      alert("Error adding note. Make sure your backend is running on port 5000!");
    }
  };

  const deleteNote = async (noteId) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${noteId}`);
      fetchNotes();
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>My Notes</h1>
        </div>

        {!isAdding ? (
          <button className="add-btn" onClick={() => setIsAdding(true)}>
            + Add New Note
          </button>
        ) : (
          <form className="note-form" onSubmit={addNote}>
            <input
              type="text"
              placeholder="Note Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input-title"
              autoFocus
            />
            <textarea
              placeholder="Note Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="input-content"
              rows="4"
            />
            <div className="form-actions">
              <button type="submit" className="save-btn">
                Save Note
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => {
                  setIsAdding(false);
                  setTitle("");
                  setContent("");
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📄</div>
            <p>No notes yet. Create your first note!</p>
          </div>
        ) : (
          <div className="notes-grid">
            {notes.map((note) => (
              <div key={note.id} className="note-card">
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <button
                    className="delete-btn"
                    onClick={() => deleteNote(note.id)}
                    title="Delete note"
                  >
                    ✕
                  </button>
                </div>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <small>{new Date(note.timestamp).toLocaleDateString()}</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;