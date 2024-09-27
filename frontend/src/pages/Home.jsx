import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";

export function Home() {
    return (
        <>
            <Navbar />
            <div className="home">
                <div className="section-1">
                    <div className="first-slang">
                        <span>Haa Bhaai... Aa gyaa Padhnee</span>
                    </div>
                    <div className="second-slang">
                        <span>Notes nhi milre ??</span>
                    </div>
                </div>
            </div>
        </>
    );
}
