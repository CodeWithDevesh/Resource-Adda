import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Upload.css";
import Button from "../components/Button"

export default function Upload() {
    const [branch, setBranch] = useState("");
    const [unit, setUnit] = useState("");
    const [sem, setSem] = useState("");
    const [subject, setSubject] = useState("");
    const [file, setFile] = useState(null);
    const [showLogin, setShowLogin] = useState(false);
    const [jwtToken, setJwtToken] = useState("");

    useEffect(() => {
        // Check if the JWT token is valid
        if (!jwtToken) {
            setShowLogin(true);
        } else {
            // Validate token with backend (optional)
            axios
                .get("http://localhost:3333/validate-token", {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                })
                .then((res) => {
                    // If token is valid, do nothing
                    setShowLogin(false);
                })
                .catch((err) => {
                    // If token is invalid, show login
                    setShowLogin(true);
                });
        }
    }, [jwtToken]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("branch", branch);
        formData.append("unit", unit);
        formData.append("sem", sem);
        formData.append("subject", subject);
        formData.append("file", file);

        try {
            const res = await axios.post(
                "http://localhost:3333/server/upload",
                formData,
                {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                }
            );
            console.log(res.data);
            alert("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file", error);
        }
    };

    return (
        <>
            <div className="res">
                <div className="res-inner">
                    {showLogin && <LoginDialog setJwtToken={setJwtToken} />}
                    {!showLogin && (
                        <div>
                            <h1>Upload Notes</h1>
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label>Branch:</label>
                                    <input
                                        type="text"
                                        value={branch}
                                        onChange={(e) =>
                                            setBranch(e.target.value)
                                        }
                                        // style="text-transform:uppercase"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Unit:</label>
                                    <input
                                        type="text"
                                        value={unit}
                                        onChange={(e) =>
                                            setUnit(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Semester:</label>
                                    <input
                                        type="number"
                                        value={sem}
                                        max='8'
                                        min='1'
                                        step='1'
                                        onChange={(e) =>
                                            setSem(e.target.value)
                                        }
                                        required
                                    />
                                </div>
                                <div>
                                    <label>Subject:</label>
                                    <input
                                        type="text"
                                        value={subject}
                                        onChange={(e) =>
                                            setSubject(e.target.value)
                                        }
                                        // style="text-transform:uppercase"
                                        required
                                    />
                                </div>
                                <div>
                                    <label>File:</label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                                <Button type="submit" text="Upload"/>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

const LoginDialog = ({ setJwtToken }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                "http://localhost:3333/server/admin_login",
                {
                    username,
                    password,
                }
            );
            const { token } = res.data;
            setJwtToken(token); // Save token in parent state
            alert("Login successful");
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="login-dialog">
            <h2>Login</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <Button text={"Login"} onClick={handleLogin}/>
        </div>
    );
};
