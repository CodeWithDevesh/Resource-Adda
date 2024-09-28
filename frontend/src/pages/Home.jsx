import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";
import { Link } from "react-router-dom";

export function Home() {
    return (
        <>
            <div className="home">
                <div className="container">
                    <div className="section-1">
                        <div className="slangs">
                            <div className="text first-slang">
                                <span>Haa Bhaai... Aa gyaa Padhnee</span>
                            </div>
                            <div className="text second-slang">
                                <span>Notes nhi milre ??</span>
                            </div>
                        </div>
                        <div className="btn res-btn">
                            <Link to="/resources">Get Study Material</Link>
                        </div>
                    </div>
                    <div className="topper-sec">
                        <span className="text">Topper's Section</span>
                        <div className="btn contri-btn">
                            <Link to="/contribute">Contribute</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
