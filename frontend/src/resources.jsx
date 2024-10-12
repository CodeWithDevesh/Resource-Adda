import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./pages/Navbar";
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
                setFiles(response.data.files);
                groupFilesBySubject(response.data.files);
            })
            .catch((error) => {
            });
    }, [branch, sem]);
    const groupFilesBySubject = (files) => {
        const groupedFiles = files.reduce((acc, file) => {
            acc[file.subject] = acc[file.subject] || [];
            acc[file.subject].push(file);
            return acc;
        }, {});
    };

    return <>Resources</>;
}
