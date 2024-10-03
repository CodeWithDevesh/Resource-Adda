import React from "react";
import "./About.css";
import akshat from "../assets/akshat.jpg";
import akshata from "../assets/akshata.jpg";
import divyansh from "../assets/divyansh.jpg";
import devesh from "../assets/devesh.png";

export default function About() {
    return (
        <div className="aboutus">
            <span className="contact-head">About Us</span>

            <section className="team-container res">
                <div className="res-inner res-inner-contact">
                    Welcome to our platform, crafted by a team of dedicated
                    students who understand the pressures of college life. We
                    built this resource hub to simplify last-minute study prep,
                    providing easy access to essential study materials. Our team
                    has worked tirelessly to ensure that every subject, unit,
                    and branch has the resources you need, all in one place.
                    This platform is for students, by students—designed to help
                    you succeed when it matters most!
                </div>
            </section>

            <span className="contact-head">Team</span>

            <section className="team-container res">
                <div className="res-inner res-inner-contact">
                    <img src={devesh} className="profile-photo" />
                    <span>Devesh Agarwal</span>
                    <p>
                        As the lead developer of this website, I’ve worked on
                        both the frontend and backend. Honestly, my CPI and I
                        don’t exactly go hand in hand 🤧, which is why I wanted
                        to create this platform to help others improve their's.
                        Hopefully, this makes your academic journey a little
                        easier!😉
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:deveshagarwal652005@gmail.com">
                            deveshagarwal652005@gmail.com
                        </a>
                    </p>
                </div>

                <div className="res-inner res-inner-contact">
                    <img src={akshata} className="profile-photo" />
                    <span>Akshata Bakre</span>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nihil molestias soluta delectus iste voluptate
                        dolorem recusandae perferendis adipisci qui deserunt
                        doloremque consectetur odit saepe laudantium odio,
                        cumque placeat, consequatur aliquam.
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:akshatabakre@gmail.com">
                            akshatabakre@gmail.com
                        </a>
                    </p>
                </div>
                <div className="res-inner res-inner-contact">
                    <img src={akshat} className="profile-photo" />
                    <span>Akshat Mishra</span>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Ratione vel mollitia incidunt quidem nesciunt
                        consequatur facere iure aperiam impedit corrupti animi,
                        eius adipisci fugit facilis pariatur eum eveniet
                        reiciendis asperiores.
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:akshatm985@gmail.com">
                            akshatm985@gmail.com
                        </a>
                    </p>
                </div>
                <div className="res-inner res-inner-contact">
                    <img src={divyansh} className="profile-photo" />
                    <span>Divyansh Sharma</span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Aut illum placeat, alias beatae aliquam laboriosam
                        fuga repellendus, expedita aliquid maxime iste in
                        nostrum reiciendis obcaecati et repellat. Quia, laborum
                        nesciunt.
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:divyanshsharma35403@gmail.com">
                            divyanshsharma35403@gmail.com
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
}
