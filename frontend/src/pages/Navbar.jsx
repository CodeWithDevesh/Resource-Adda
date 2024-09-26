import React from "react";
import "./Navbar.css"

export default function Navbar() {
    return (
        <div>
            <header>
                <div class="logo">
                    <h1>Website name and logo</h1>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a href="/resources">Resources</a>
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
                </nav>
            </header>
        </div>
    );
}
