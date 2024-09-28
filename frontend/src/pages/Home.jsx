import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";

export function Home() {
    return (
        <>
            <div className="home">
                <div className="section-1">
                    <div className="first-slang">
                        <span>Haa Bhaai... Aa gyaa Padhnee</span>
                    </div>
                    <div className="second-slang">
                        <span>Notes nhi milre ??</span>
                    </div>
                    <div className="res-btn"><a href="/resources">Get Study Material</a></div>
                    
                </div>
            </div>
        </>
    );
}
