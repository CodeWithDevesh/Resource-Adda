import React from 'react'
import './fileexplorer.css'
export default function FileList({ files, subject }) {
    return (
        <div>
          <h2>Files for {subject}</h2>
          <ul className="file-list">
            {files.map((file) => (
              <li key={file._id} className="file-item">
                <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
                  {file.fileName}
                </a>
                <p className="file-meta">
                  Uploaded at: {new Date(file.uploadedAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        </div>
      );
}
