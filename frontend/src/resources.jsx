import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import axios from "axios";

export default function Resources() {
    const [files, setFiles] = useState({});
    const [folders, setFolders] = useState({});
    const { branch, sem } = useParams();
    const gf = {};
    useEffect(() => {
        axios
            .get(`http://localhost:3333/files?branch=${branch}&sem=${sem}`)
            .then((response) => {
                console.log(response.data);
                setFiles(response.data.files);
                groupFilesBySubject(response.data.files);
                console.log(gf)
            })
            .catch((error) => {
                console.error("Error fetching files:", error);
            });
    }, [branch, sem]);
    const groupFilesBySubject = (files) => {
        const groupedFiles = files.reduce((acc, file) => {
            acc[file.subject] = acc[file.subject] || [];
            acc[file.subject].push(file);
            return acc;
        }, {});
        console.log(groupedFiles)
    };

    return <>Resources</>;
}
