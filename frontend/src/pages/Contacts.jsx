import React from 'react'
import "./Contacts.css"
import akshat from "../assets/akshat.jpg"
import akshata from "../assets/akshata.jpg"
import divyansh from "../assets/divyansh.jpg"

export default function Contacts() {
  return (
    <div>
      <header>
        <h1>Contact Our Team</h1>
    </header>

    <section class="team-container res">
        <div class="res-inner">
        <img src={akshat} class="profile-photo"/>
            <h2>Devesh Agrawal</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nemo hic dignissimos eum quidem mollitia magni a laborum, unde excepturi, laudantium consequatur accusamus sequi autem porro rem ab. Soluta, laborum.</p>
            <p>Email: <a href="mailto:devesh@example.com">devesh@example.com</a></p>
        </div>

        <div class="res-inner">
        <img src={akshata} class="profile-photo"/>
            <h2>Akshata Bakre</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil molestias soluta delectus iste voluptate dolorem recusandae perferendis adipisci qui deserunt doloremque consectetur odit saepe laudantium odio, cumque placeat, consequatur aliquam.</p>
            <p>Email: <a href="mailto:akshata@example.com">akshata@example.com</a></p>
        </div>
        <div class="res-inner">
            <img src={akshat}  class="profile-photo"/>
            <h2>Akshat Mishra</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione vel mollitia incidunt quidem nesciunt consequatur facere iure aperiam impedit corrupti animi, eius adipisci fugit facilis pariatur eum eveniet reiciendis asperiores.</p>
            <p>Email: <a href="mailto:akshat@example.com">akshat@example.com</a></p>
        </div>
        <div class="res-inner">
        <img src={divyansh}  class="profile-photo"/>
            <h2>Divyansh Sharma</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut illum placeat, alias beatae aliquam laboriosam fuga repellendus, expedita aliquid maxime iste in nostrum reiciendis obcaecati et repellat. Quia, laborum nesciunt.</p>
            <p>Email: <a href="mailto:divyansh@example.com">divyansh@example.com</a></p>
        </div>
    </section>
      
    </div>
  )
}
