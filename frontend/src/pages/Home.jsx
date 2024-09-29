import React from "react";
import "./Home.css";
import Navbar from "../components/Navbar";
import Backdrop from "../components/Backdrop";
import { Link } from "react-router-dom";
import NavigateButton from "../components/NavigateButton";

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
                        <NavigateButton className="res-btn" text={"Get Study Material"} path={"/resources"}/>
                    </div>
                    <div className="topper-sec">
                        <span className="text">Topper's Section</span>
                        <NavigateButton className={"contri-btn"} text={"Contribute"} path={"/contribute"}/>
                    </div>
                </div>
            </div>
        </>
    );
}
