import React from "react";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function FileList({ files, subject, unit }) {
    console.log(files);
    return (
        <>
            <div>
                <h2>
                    {subject} :- {unit}
                </h2>
                <ul className="file-list">
                    {files.map((file) => (
                        <li
                            key={file._id}
                            className="file-item hover-effect"
                            onClick={() =>
                                window.open(
                                    file.fileUrl,
                                    "_blank",
                                    "noopener noreferrer"
                                )
                            }
                            style={{ cursor: "pointer" }} // Add a pointer cursor for better UX
                        >
                            {file.fileName}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
