import React, { useEffect, useState } from "react";
import "./fileexplorer.css";
import FolderList from "./FolderList";
import FileList from "./FileList";
import axios from "axios";
export default function fileexplorer() {
    // const [data,setData]= useState({});
    // useEffect(() => {
    //   axios
    //     .get(`http://localhost:3333/files?branch=${branch}&sem=${sem}`)
    //     .then((res) => {
    //       console.log(res.data);
    //       setData(res.data);
    //     });
    // }, []);
    // const [groupedBySubject,setGroupedBySubject] = useState({});

    // useEffect(() => {
    //   if (!data.files) return;
    //   setGroupedBySubject(data.files.reduce((acc, file) => {
    //     acc[file.subject] = acc[file.subject] || {};
    //     acc[file.subject][file.unit] = acc[file.subject][file.unit] || [];
    //     acc[file.subject][file.unit].push(file);
    //     return acc;
    //   }, {}));
    // }, [data]);
    // State to track the selected folder

    const [data] = useState({
        files: [
            {
                isPyq: false,
                _id: "66f5b5ea50a7e7c1aa7858af",
                fileUrl:
                    "https://storage.googleapis.com/shayog-data/a45b5dda-8e94-4589-b5b2-c20187879b42.pdf",
                branch: "IT",
                sem: "3",
                unit: "1",
                fileName: "Ethos-SoftwareDevelopment Challenge.pdf",
                subject: "maths",
                uploadedAt: "2024-09-26T19:28:42.722Z",
                __v: 0,
            },
            {
                isPyq: false,
                _id: "66f5b6bd4c214b6f668fa7ae",
                fileUrl:
                    "https://storage.googleapis.com/shayog-data/5ae11226-cc8e-44bc-87d8-a55dc9a3075f.pdf",
                branch: "IT",
                sem: "3",
                unit: "2",
                fileName: "Ethos-SoftwareDevelopment Challenge.pdf",
                subject: "maths",
                uploadedAt: "2024-09-26T19:32:13.698Z",
                __v: 0,
            },
        ],
    });
    const groupedBySubject = data.files.reduce((acc, file) => {
        if (!acc[file.subject]) {
            acc[file.subject] = {};
        }
        if (!acc[file.subject][file.unit]) {
            acc[file.subject][file.unit] = [];
        }
        acc[file.subject][file.unit].push(file);
        return acc;
    }, {});

    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);

    return (
        <div className="file-explorer">
            <div className="left-pane">
                <FolderList
                    groupedBySubject={groupedBySubject}
                    selectedSubject={selectedSubject}
                    setSelectedSubject={setSelectedSubject}
                    setSelectedUnit={setSelectedUnit}
                />
            </div>
            <div className="right-pane">
                {selectedSubject && selectedUnit ? (
                    <FileList
                        files={groupedBySubject[selectedSubject][selectedUnit]}
                        subject={selectedSubject}
                        unit={selectedUnit}
                    />
                ) : (
                    <div className="empty-box">
                        Select a folder to see files
                    </div>
                )}
            </div>
        </div>
    );
}
