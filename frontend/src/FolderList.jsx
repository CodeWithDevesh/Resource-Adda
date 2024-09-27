import React from 'react'
import './fileexplorer.css'
export default function FolderList({ groupedBySubject, selectedSubject, setSelectedSubject }) {
    return (
    <div>
    <h2>Folders</h2>
    <ul className="folder-list">
      {Object.keys(groupedBySubject).map((subject, idx) => (
        <li
          key={idx}
          className={`folder-item ${selectedSubject === subject ? 'selected' : ''}`}
          onClick={() => setSelectedSubject(subject)}
        >
          📁 {subject}
        </li>
      ))}
    </ul>
  </div>
);
}
