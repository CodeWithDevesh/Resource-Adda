import { useState } from "react";
import Button from "./Button";
import axios from "axios";

// Its css is defined in AdminPannel.css
export default function LoginDialog({ setJwtToken }) {
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
            console.log(res);
            const { token } = res.data;
            localStorage.setItem("token", token)
            setJwtToken(token); // Save token in parent state
        } catch (error) {
            console.error("Login failed", error);
            alert("Invalid credentials");
        }
    };

    return (
        <div className="admin-cont">
            <div className="admin-inner-cont">
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
                    <Button text={"Login"} onClick={handleLogin} />
                </div>
            </div>
        </div>
    );
}
