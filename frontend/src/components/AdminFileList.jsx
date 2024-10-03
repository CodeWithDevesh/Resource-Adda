import React from "react";

export default function AdminFileList({ files, subject, unit }) {
    console.log(files)
    return (
        <div>
            <h2>
                Notes for {subject}, Unit {unit}
            </h2>
            <ul className="file-list">
                {files.map((file) => (
                    <li key={file._id} className="file-item hover-effect">
                        <a
                            href={file.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {file.fileName}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
