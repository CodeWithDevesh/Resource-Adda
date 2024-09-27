import React from "react";
import "./Home.css";
import character from "./../assets/character.png"
import Navbar from "./Navbar";

export function Home() {
    return (
        <>
            <div class="home">
                <Navbar/>

                <section class="hero">
                    <div class="hero-text">
                        <h1>Start Learning with us</h1>
                        <p>
                            Your one stop solution for cracking your semester
                            exam with ease. All resources and notes you will
                            ever need for your preparation.
                        </p>
                        <div class="buttons">
                            <a href="#" class="btn btn-pink">
                                <b>Start learning</b>
                            </a>
                            <a href="#" class="btn btn-outline">
                                Contribute
                            </a>
                        </div>
                    </div>
                    <div class="hero-image">
                        <img src={character} alt="Character Illustration" />
                    </div>
                </section>
            </div>
        </>
    );
}
