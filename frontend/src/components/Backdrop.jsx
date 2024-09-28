import React from "react";
import secion1Image from "../assets/home section 1.webp";
import "./Backdrop.css"

export default function Backdrop() {
    return (
        <div className="backdrop">
            <div className="sec-1">
                <img src={secion1Image} alt="" />
            </div>
            <div className="overlay"></div>
        </div>
    );
}
