import React, { useState } from "react";
import "./Contribute.css";
import Button from "../components/Button";
import { SOCKET_URL } from "../constants";
import { io } from "socket.io-client";
import { v4 } from "uuid";
import ProgressMenu from "../components/ProgressMenu";

export default function Contribute() {
    const [branch, setBranch] = useState("");
    const [sem, setSem] = useState("");
    const [subject, setSubject] = useState();
    const [unit, setUnit] = useState();
    const [file, setFile] = useState();
    const [email, setEmail] = useState();
    const [progresses, setProgresses] = useState([
       
    ]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const socket = io(SOCKET_URL, {
            transports: ["websocket"],
            upgrade: false,
            perMessageDeflate: true,
        });

        const chunkSize = 1024 * 512; // 512 KB chunks
        let offset = 0;
        const id = v4() + "." + file.name.split(".").pop(); // Unique ID for the file

        setProgresses((prevProgresses) => {
            let a = prevProgresses.map((element) => {
                return element;
            });
            a.push({ text: file.name, progress: 0, id });
            return a;
        });

        socket.on("uploadProgress", (progress) => {
            setProgresses((prevProgresses) => {
                return prevProgresses.map((element) => {
                    if (element.id === id) {
                        return { ...element, progress };
                    }
                    return element;
                });
            });
        });

        socket.on("uploadSuccess", (response) => {
            setProgresses((prevProgresses) => {
                return prevProgresses.filter((element) => element.id !== id);
            });
            alert("Thanks for your contribution😊");
            socket.close();
        });

        socket.on("error", (errorMessage) => {
            setProgresses((prevProgresses) => {
                return prevProgresses.filter((element) => element.id !== id);
            });
            console.log(errorMessage);
            alert(errorMessage);
            socket.close();
        });

        let retries = 0;
        const RETRY_LIMIT = 5;

        // Function to send a chunk after the previous one is acknowledged
        function uploadChunk(chunk, data) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();

                reader.onload = () => {
                    data.fileBuffer = reader.result;

                    socket.emit("uploadFileChunk", data);
                    socket.once("chunkUploaded", () => {
                        retries = 0;
                        resolve();
                    });
                };

                reader.onerror = (error) => {
                    reject(error);
                };

                reader.readAsArrayBuffer(chunk);
            });
        }

        async function uploadFileInChunks() {
            while (offset < file.size) {
                const chunk = file.slice(offset, offset + chunkSize);
                const data = {
                    branch,
                    sem,
                    subject,
                    unit,
                    fileName: file.name,
                    offset,
                    fileSize: file.size,
                    id,
                    type: "contribute",
                    email,
                };

                try {
                    await uploadChunk(chunk, data);
                    offset += chunkSize;
                } catch (error) {
                    console.error("Error uploading chunk:", error);
                    if (retries < RETRY_LIMIT) {
                        console.log("Retrying");
                        retries++;
                    } else break;
                }
            }
        }

        uploadFileInChunks();
    };

    return (
        <>
            <ProgressMenu progresses={progresses} />
            <div className="contribute">
                <span className="contri-head">Wanna help others?</span>
                <div className="contri-form-cont">
                    <div className="res-inner">
                        <form onSubmit={handleSubmit} className="contri-form">
                            <label htmlFor="branch">Branch ??</label>
                            <select
                                value={branch}
                                onChange={(e) => setBranch(e.target.value)}
                                name="Branch"
                                id="branch"
                                required
                            >
                                <option value="" disabled hidden>
                                    Select Branch
                                </option>
                                <option value="IT">IT</option>
                                <option value="CSE">CSE</option>
                                <option value="ECE">ECE</option>
                                <option value="Electrical">Electrical</option>
                                <option value="Chemical">Chemical</option>
                                <option value="Mining">Mining</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Metalurgy">Metalurgy</option>
                                <option value="Civil">Civil</option>
                                <option value="BioMed">BioMed</option>
                                <option value="BioTech">BioTech</option>
                            </select>
                            <label htmlFor="sem">Semester ??</label>
                            <select
                                value={sem}
                                onChange={(e) => setSem(e.target.value)}
                                name="sem"
                                id="sem"
                                required
                            >
                                <option value="" disabled hidden>
                                    Select Semester
                                </option>
                                <option value="1">Sem-1</option>
                                <option value="2">Sem-2</option>
                                <option value="3">Sem-3</option>
                                <option value="4">Sem-4</option>
                            </select>
                            <label htmlFor="subject">Subject ??</label>
                            <input
                                onChange={(e) => setSubject(e.target.value)}
                                type="text"
                                id="subject"
                                required
                            />
                            <label htmlFor="unit">Category ??</label>
                            <input
                                onChange={(e) => setUnit(e.target.value)}
                                type="text"
                                id="unit"
                                placeholder="Unit 1 Notes, Midsem PYQ, etc"
                                required
                            />
                            <label htmlFor="file">File ??</label>
                            <input
                                onChange={(e) => setFile(e.target.files[0])}
                                type="file"
                                id="file"
                                required
                            />
                            <label htmlFor="email">Email ??</label>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                id="email"
                                required
                            />

                            <Button
                                className={"contri-btn"}
                                text={"Contribute"}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
