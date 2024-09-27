import React from "react";
import "./Navbar.css";
import hamburger from "../assets/hamburger.svg";
export default function Navbar() {
    return (
        <div>
            <header>
                <div className="logo">
                    <h1>ADDA</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li className="resources">
                            <a href="/">Resources</a>
                            <BranchMenu />
                        </li>
                        <li>
                            <a href="#">Contact Us</a>
                        </li>
                        <li>
                            <a href="#">Groups</a>
                        </li>
                        <li>
                            <a href="#">Contribute</a>
                        </li>
                    </ul>
                    <div className="hamburger">
                        <svg
                            width="800px"
                            height="800px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 18L20 18"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 12L20 12"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                            <path
                                d="M4 6L20 6"
                                stroke="#FFFFFF"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                </nav>
            </header>
        </div>
    );
}

function BranchMenu() {
    return (
        <>
            <div className="branch-cont">
                <ul>
                    <li>
                        <div className="branch">IT</div>
                        <SemMenu branch="IT"/>
                    </li>
                    <li>
                        <div className="branch">CSE</div>
                        <SemMenu branch="CSE"/>
                    </li>
                    <li>
                        <div className="branch">ECE</div>
                        <SemMenu branch="ECE"/>
                    </li>
                    <li>
                        <div className="branch">Electrical</div>
                        <SemMenu branch="Electrical"/>
                    </li>
                    <li>
                        <div className="branch">Metalurgy</div>
                        <SemMenu branch="Metalurgy"/>
                    </li>
                    <li>
                        <div className="branch">Mechanical</div>
                        <SemMenu branch="Mechanical" style={{top: '-40%'}}/>
                    </li>
                    <li>
                        <div className="branch">Mining</div>
                        <SemMenu branch="Mining"/>
                    </li>
                    <li>
                        <div className="branch">BioTechnology</div>
                        <SemMenu branch="BioTechnology"/>
                    </li>
                    <li>
                        <div className="branch">BioMedical</div>
                        <SemMenu branch="BioMedical"/>
                    </li>
                </ul>
            </div>
        </>
    );
}

function SemMenu({ branch }) {
    return (
        <>
            <div className="sem-cont">
                <ul>
                    <li>
                        <a href={"/resources/" +  branch  + "/1"}>Sem-1</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/2"}>Sem-2</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/3"}>Sem-3</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/4"}>Sem-4</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/5"}>Sem-5</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/6"}>Sem-6</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/7"}>Sem-7</a>
                    </li>
                    <li>
                        <a href={"/resources/" +  branch  + "/8"}>Sem-8</a>
                    </li>
                </ul>
            </div>
        </>
    );
}
