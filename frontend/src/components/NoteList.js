import React from 'react';

function NoteList({ notes }) {
  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((note, index) => (
        <div key={index} style={{
          border: '1px solid gray',
          padding: '10px',
          margin: '10px auto',
          width: '50%',
          borderRadius: '10px'
        }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
