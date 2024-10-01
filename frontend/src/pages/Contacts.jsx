import React from 'react'
import "./Contacts.css"
import akshat from "../assets/akshat.jpg"
import akshata from "../assets/akshata.jpg"
import divyansh from "../assets/divyansh.jpg"
import devesh from "../assets/devesh.png"

export default function Contacts() {
  return (
    <div>
      <header>
        <h1>Contact Our Team</h1>
    </header>
    <section className="team-container res">
        <div className="res-inner res-inner-contact">
        <img src={devesh} className="profile-photo"/>
            <h2>Devesh Agrawal</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto nemo hic dignissimos eum quidem mollitia magni a laborum, unde excepturi, laudantium consequatur accusamus sequi autem porro rem ab. Soluta, laborum.</p>
            <p>Email: <a href="mailto:deveshagarwal652005@gmail.com">deveshagarwal652005@gmail.com</a></p>
        </div>

        <div className="res-inner res-inner-contact">
        <img src={akshata} className="profile-photo"/>
            <h2>Akshata Bakre</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil molestias soluta delectus iste voluptate dolorem recusandae perferendis adipisci qui deserunt doloremque consectetur odit saepe laudantium odio, cumque placeat, consequatur aliquam.</p>
            <p>Email: <a href="mailto:akshatabakre@gmail.com">akshatabakre@gmail.com</a></p>
        </div>
        <div className="res-inner res-inner-contact">
            <img src={akshat}  className="profile-photo"/>
            <h2>Akshat Mishra</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione vel mollitia incidunt quidem nesciunt consequatur facere iure aperiam impedit corrupti animi, eius adipisci fugit facilis pariatur eum eveniet reiciendis asperiores.</p>
            <p>Email: <a href="mailto:akshatm985@gmail.com">akshatm985@gmail.com</a></p>
        </div>
        <div className="res-inner res-inner-contact">
        <img src={divyansh}  className="profile-photo"/>
            <h2>Divyansh Sharma</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut illum placeat, alias beatae aliquam laboriosam fuga repellendus, expedita aliquid maxime iste in nostrum reiciendis obcaecati et repellat. Quia, laborum nesciunt.</p>
            <p>Email: <a href="mailto:divyanshsharma35403@gmail.com">divyanshsharma35403@gmail.com</a></p>
        </div>
    </section>
      
    </div>
  )
}
