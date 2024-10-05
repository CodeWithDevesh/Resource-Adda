import React, { useState } from "react";
import "./Contribute.css";
import Button from "../components/Button";
import axios from "axios";
import { BASE_SERVER_URL } from "../constants";

export default function Contribute() {
    const [branch, setBranch] = useState("");
    const [sem, setSem] = useState("");
    const [subject, setSubject] = useState();
    const [unit, setUnit] = useState();
    const [file, setFile] = useState();
    const [email, setEmail] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("branch", branch);
        formData.append("sem", sem);
        formData.append("subject", subject);
        formData.append("unit", unit);
        formData.append("file", file);
        formData.append("email", email);

        try {
            await axios.post(`${BASE_SERVER_URL}/contribute`, formData);
            alert("Your request has been submitted for approval.");
        } catch (error) {
            console.error("Error submitting contribution:", error);
            alert("Submission failed. Please try again.");
        }
    };

    return (
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
                        <label htmlFor="unit">Unit ??</label>
                        <input
                            onChange={(e) => setUnit(e.target.value)}
                            type="text"
                            id="unit"
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

                        <Button className={"contri-btn"} text={"Contribute"} />
                    </form>
                </div>
            </div>
        </div>
    );
}
