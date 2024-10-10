import React, { useState } from "react";
import "./About.css";
import akshat from "../assets/akshat.jpg";
import akshata from "../assets/akshata.jpg";
import divyansh from "../assets/divyansh.jpg";
import devesh from "../assets/devesh.jpg";
import pinkNote from "../assets/sticky-pink.png";
import { motion } from "framer-motion";

export default function About() {
    const [selectedId, setId] = useState(null);

    return (
        <div className="aboutus">
            <section className="about-sec1 about-sec">
                <span className="contact-head">About Us</span>
                <div className="res-inner-contact">
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

            <section className="about-sec about-sec2">
                <span className="contact-head">Team</span>
                <div className="sticky-notes">
                    <motion.div
                        layoutId="akshata"
                        onClick={() => {
                            setId("akshata");
                        }}
                        whileHover={{ scale: "1.2" }}
                        whileTap={{ scale: ".9" }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="note akshata-note"
                    >
                        A
                    </motion.div>
                    <motion.div
                        layoutId="devesh"
                        onClick={() => {
                            setId("devesh");
                        }}
                        whileHover={{ scale: "1.2" }}
                        whileTap={{ scale: ".9" }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="note devesh-note"
                    >
                        D
                    </motion.div>
                    <motion.div
                        layoutId="divyansh"
                        onClick={() => {
                            setId("divyansh");
                        }}
                        whileHover={{ scale: "1.2" }}
                        whileTap={{ scale: ".9" }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="note divyansh-note"
                    >
                        D
                    </motion.div>
                    <motion.div
                        layoutId="akshat"
                        onClick={() => {
                            setId("akshat");
                        }}
                        whileHover={{ scale: "1.2" }}
                        whileTap={{ scale: ".9" }}
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, ease: "easeIn" }}
                        className="note akshat-note"
                    >
                        A
                    </motion.div>
                </div>
            </section>

            {selectedId == "akshata" && (
                <div
                    className="team-mate-overlay"
                    onClick={() => {
                        setId(null);
                    }}
                >
                    <motion.div
                        layoutId={selectedId}
                        className="team-mate akshata"
                    >
                        <img src={akshata} alt="" />
                        <p>
                            Hey peers! I worked on the design and frontend of
                            this website, which aims to provide a convenient
                            platform for you to browse relevant study material
                            for your semester exams.📚 Leave your worries to us
                            as the most of these resources are tried and tested,
                            and have helped us score good. I hope you make the
                            most of it!🙃
                        </p>
                    </motion.div>
                </div>
            )}
            {selectedId == "devesh" && (
                <div
                    className="team-mate-overlay"
                    onClick={() => {
                        setId(null);
                    }}
                >
                    <motion.div
                        layoutId={selectedId}
                        className="team-mate devesh"
                    >
                        <img src={devesh} alt="" />
                        <p>
                            As the lead developer of this website, I’ve worked
                            on both the frontend and backend. Honestly, my CPI
                            and I don’t exactly go hand in hand 🤧, which is why
                            I wanted to create this platform to help others
                            improve their's. Hopefully, this makes your academic
                            journey a little easier!😉
                        </p>
                    </motion.div>
                </div>
            )}
            {selectedId == "divyansh" && (
                <div
                    className="team-mate-overlay"
                    onClick={() => {
                        setId(null);
                    }}
                >
                    <motion.div
                        layoutId={selectedId}
                        className="team-mate divyansh"
                    >
                        <img src={divyansh} alt="" />
                        <p>
                            As part of the project, I worked on developing a
                            website where I contributed to making it responsive
                            across different devices. I was involved in both
                            designing and creating webpages, ensuring the
                            website was not only visually appealing but also
                            fully functional. This project allowed me to enhance
                            my skills in web design, responsiveness, and
                            functionality.
                        </p>
                    </motion.div>
                </div>
            )}
            {selectedId == "akshat" && (
                <div
                    className="team-mate-overlay"
                    onClick={() => {
                        setId(null);
                    }}
                >
                    <motion.div
                        layoutId={selectedId}
                        className="team-mate akshat"
                    >
                        <img src={akshat} alt="" />
                        <p>
                            Hello fellow learner! I’m a frontend developer who
                            came up with the idea for this website and worked
                            closely with my team to build it.👨🏻‍💻 I focused on
                            making the site easy to use and visually appealing,
                            bringing together design and development to turn our
                            ideas into a working website.🙃
                        </p>
                    </motion.div>
                </div>
            )}
            {/* <section className="team-container">
                <div className="res-inner-contact">
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

                <div className="res-inner-contact">
                    <img src={akshata} className="profile-photo" />
                    <span>Akshata Bakre</span>
                    <p>
                        Hey peers! I worked on the design and frontend of this
                        website, which aims to provide a convenient platform for
                        you to browse relevant study material for your semester
                        exams.📚 Leave your worries to us as the most of these
                        resources are tried and tested, and have helped us score
                        good. I hope you make the most of it!🙃
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:akshatabakre@gmail.com">
                            akshatabakre@gmail.com
                        </a>
                    </p>
                </div>
                <div className="res-inner-contact">
                    <img src={akshat} className="profile-photo" />
                    <span>Akshat Mishra</span>
                    <p>
                        Hello fellow learner! I’m a frontend developer who came
                        up with the idea for this website and worked closely
                        with my team to build it.👨🏻‍💻 I focused on making the site
                        easy to use and visually appealing, bringing together
                        design and development to turn our ideas into a working
                        website.🙃
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:akshatm985@gmail.com">
                            akshatm985@gmail.com
                        </a>
                    </p>
                </div>
                <div className="res-inner-contact">
                    <img src={divyansh} className="profile-photo" />
                    <span>Divyansh Sharma</span>
                    <p>
                        As part of the project, I worked on developing a website
                        where I contributed to making it responsive across
                        different devices. I was involved in both designing and
                        creating webpages, ensuring the website was not only
                        visually appealing but also fully functional. This
                        project allowed me to enhance my skills in web design,
                        responsiveness, and functionality.
                    </p>
                    <p>
                        Email:{" "}
                        <a href="mailto:divyanshsharma35403@gmail.com">
                            divyanshsharma35403@gmail.com
                        </a>
                    </p>
                </div>
            </section> */}
        </div>
    );
}
