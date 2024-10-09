import React from "react";
import secion1Image from "../assets/chalk-bg.jpg";
import tableImage from "../assets/tabel-front.png"
import "./Backdrop.css"

export default function Backdrop() {
    return (
        <div className="backdrop">
            <div className="sec-1">
                <img className="bg-img" src={secion1Image} alt="" />
                <img className="bg-img" style={{zIndex: 80}} src={tableImage} alt="" />
            </div>
            {/* <div className="overlay"></div> */}
        </div>
    );
}
