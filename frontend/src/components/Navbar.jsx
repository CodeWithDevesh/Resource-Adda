import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div className={
                            isMenuOpen
                                ? "underlay"
                                : "underlay collapse"
                        } onClick={toggleMenu}></div>
            <div>
                <header>
                    <div className="logo">
                        <h1>ADDA</h1>
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li className="resources">
                                <Link to="/resources">Resources</Link>
                                {/* <BranchMenu /> */}
                            </li>
                            <li>
                                <Link to="#">Contact Us</Link>
                            </li>
                            <li>
                                <Link to="#">Groups</Link>
                            </li>
                            <li>
                                <Link to="#">Contribute</Link>
                            </li>
                        </ul>
                        <div
                            className={
                                isMenuOpen ? "hamburger" : "hamburger collapse"
                            }
                            onClick={toggleMenu}
                        >
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
                    <div
                        className={
                            isMenuOpen
                                ? "hamburger-cont"
                                : "hamburger-cont collapse"
                        }
                    >
                        <HamburgerMenu />
                    </div>
                </header>
            </div>
        </>
    );
}

// function BranchMenu() {
//     return (
//         <>
//             <div className="branch-cont">
//                 <ul>
//                     <li>
//                         <div className="branch">IT</div>
//                         <SemMenu branch="IT" />
//                     </li>
//                     <li>
//                         <div className="branch">CSE</div>
//                         <SemMenu branch="CSE" />
//                     </li>
//                     <li>
//                         <div className="branch">ECE</div>
//                         <SemMenu branch="ECE" />
//                     </li>
//                     <li>
//                         <div className="branch">Electrical</div>
//                         <SemMenu branch="Electrical" />
//                     </li>
//                     <li>
//                         <div className="branch">Metalurgy</div>
//                         <SemMenu branch="Metalurgy" />
//                     </li>
//                     <li>
//                         <div className="branch">Mechanical</div>
//                         <SemMenu branch="Mechanical" style={{ top: "-40%" }} />
//                     </li>
//                     <li>
//                         <div className="branch">Mining</div>
//                         <SemMenu branch="Mining" />
//                     </li>
//                     <li>
//                         <div className="branch">BioTechnology</div>
//                         <SemMenu branch="BioTechnology" />
//                     </li>
//                     <li>
//                         <div className="branch">BioMedical</div>
//                         <SemMenu branch="BioMedical" />
//                     </li>
//                 </ul>
//             </div>
//         </>
//     );
// }

// function SemMenu({ branch }) {
//     return (
//         <div className="sem-cont">
//             <ul>
//                 <li>
//                     <Link to={"/resources/" + branch + "/1"}>Sem-1</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/2"}>Sem-2</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/3"}>Sem-3</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/4"}>Sem-4</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/5"}>Sem-5</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/6"}>Sem-6</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/7"}>Sem-7</Link>
//                 </li>
//                 <li>
//                     <Link to={"/resources/" + branch + "/8"}>Sem-8</Link>
//                 </li>
//             </ul>
//         </div>
//     );
// }

function HamburgerMenu() {
    return (
        <>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className="resources">
                    <Link to="/">Resources</Link>
                    {/* <BranchMenu /> */}
                </li>
                <li>
                    <Link to="#">Contact Us</Link>
                </li>
                <li>
                    <Link to="#">Groups</Link>
                </li>
                <li>
                    <Link to="#">Contribute</Link>
                </li>
            </ul>
        </>
    );
}

// function HamburgerBranchMenu() {
//     return (
//         <>
//             <div className="hamburger-branch-cont">
//                 <ul>
//                     <li>
//                         <div className="branch">IT</div>
//                         <SemMenu branch="IT" />
//                     </li>
//                     <li>
//                         <div className="branch">CSE</div>
//                         <SemMenu branch="CSE" />
//                     </li>
//                     <li>
//                         <div className="branch">ECE</div>
//                         <SemMenu branch="ECE" />
//                     </li>
//                     <li>
//                         <div className="branch">Electrical</div>
//                         <SemMenu branch="Electrical" />
//                     </li>
//                     <li>
//                         <div className="branch">Metalurgy</div>
//                         <SemMenu branch="Metalurgy" />
//                     </li>
//                     <li>
//                         <div className="branch">Mechanical</div>
//                         <SemMenu branch="Mechanical" style={{ top: "-40%" }} />
//                     </li>
//                     <li>
//                         <div className="branch">Mining</div>
//                         <SemMenu branch="Mining" />
//                     </li>
//                     <li>
//                         <div className="branch">BioTechnology</div>
//                         <SemMenu branch="BioTechnology" />
//                     </li>
//                     <li>
//                         <div className="branch">BioMedical</div>
//                         <SemMenu branch="BioMedical" />
//                     </li>
//                 </ul>
//             </div>
//         </>
//     );
// }
