import React from "react";
import secion1Image from "../assets/chalk-bg.jpg";
import books from "../assets/books.png"
import "./Backdrop.css"

export default function Backdrop() {
    return (
        <div className="backdrop">
            <div className="sec-1">
                <img className="bg-img" src={secion1Image} alt="" />
                <img className="books-img" src={books} alt="" />
            </div>
            {/* <div className="overlay"></div> */}
        </div>
    );
}
