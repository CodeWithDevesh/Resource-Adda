import React, { useEffect, useState } from "react";
import "./fileexplorer.css";
import FolderList from "./FolderList";
import FileList from "./FileList";
import axios from "axios";
export default function fileexplorer() {
  const branch = "IT";
  const sem = "3";
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:3333/files?branch=${branch}&sem=${sem}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      });
  }, []);
  const [groupedBySubject,setGroupedBySubject] = useState({});

  useEffect(() => {
    if (!data.files) return;
    setGroupedBySubject(data.files.reduce((acc, file) => {
      acc[file.subject] = acc[file.subject] || [];
      acc[file.subject].push(file);
      return acc;
    }, {}));
    console.log(groupedBySubject)
  }, [data]);
  // State to track the selected folder

  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <div className="file-explorer">
      <div className="left-pane">
        <FolderList
          groupedBySubject={groupedBySubject}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
      </div>
      <div className="right-pane">
        {selectedSubject ? (
          <FileList
            files={groupedBySubject[selectedSubject]}
            subject={selectedSubject}
          />
        ) : (
          <div className="empty-box">Select a folder to see files</div>
        )}
      </div>
    </div>
  );
}
