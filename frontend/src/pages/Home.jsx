import React from "react";
import "./Home.css";
import NavigateButton from "../components/NavigateButton";
import character from "../assets/character.png"


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
                        <img className="char" src={character} alt="" />
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
