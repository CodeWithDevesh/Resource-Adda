import React from 'react'
import "./Home.css"
export default function Home() {

return (
    <div class="home">
      <header>
        <div class="logo">
            <h1>Website name and logo</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Groups</a></li>
                <li><a href="#">Contribute</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-text">
            <h1>Start Learning with us</h1>
            <p>Your one stop solution for cracking your semester exam with ease. All resources and notes you will ever need for your preparation.</p>
            <div class="buttons">
                <a href="#" class="btn btn-pink">Start learning</a>
                <a href="#" class="btn btn-outline">Learn more</a>
            </div>
        </div>
        <div class="hero-image">
            <img src="character.png" alt="Character Illustration"/>
        </div>
    </section>
    </div>
  )
}
