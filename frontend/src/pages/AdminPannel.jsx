import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminPannel.css";
import AdminNavbar from "../components/AdminNavbar";
import LoginDialog from "../components/LoginDialog";
import Upload from "./Upload";

export default function AdminPannel() {
    const [jwtToken, setJwtToken] = useState(localStorage.getItem("token"));
    const [showLogin, setShowLogin] = useState(true);
    const [view, setView] = useState("home");

    // Validate JWT Token and show login screen if invalid
    const validateToken = () => {
        if (!jwtToken) {
            setShowLogin(true);
        } else {
            axios
                .get("http://localhost:3333/validate-token", {
                    headers: { Authorization: `Bearer ${jwtToken}` },
                })
                .then((res) => {
                    setShowLogin(false);
                })
                .catch((err) => {
                    setShowLogin(true);
                });
        }
    };

    useEffect(validateToken, [jwtToken, view]);

    return (
        <>
            <AdminNavbar setView={setView} />
            {showLogin && <LoginDialog setJwtToken={setJwtToken} />}
            {!showLogin && (
                <div>
                    {view == "home" && <AdminHome />}
                    {view == "upload" && <Upload jwtToken={jwtToken}/>}
                    {view == "requests" && <Requests />}
                </div>
            )}
        </>
    );
}

const AdminHome = () => {
    return (
        <div className="admin-cont">
            <div className="admin-inner-cont">Admin Panel</div>
        </div>
    );
};


const Requests = () => {
    return <>Requests</>;
};
