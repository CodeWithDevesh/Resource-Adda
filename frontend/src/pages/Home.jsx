import React from "react";
import "./Home.css";
import NavigateButton from "../components/NavigateButton";
import character from "../assets/character.png"
import {motion } from "framer-motion";
export function Home() {
    return (
        <>
            <div className="home">
                <div className="container">
                    <motion.div 
                    intial={{opacity:1}}
                    exit={{opacity:0 }}
                    transition={{duration:0.5}}
                    className="section-1"
                    >
                        <motion.div 
                        className="slangs"
                        intial={{opacity:1, y:0}}
                        exit={{opacity:0 ,y:-50}}
                        transition={{duration:0.5}}
                        >
                            <div className="text first-slang">
                                <span>Haa bhai... Aa gaya padhne</span>
                            </div>
                            <div className="text second-slang">
                                <span>Notes nahi mil rahe ??</span>
                            </div>
                        </motion.div>
                        <NavigateButton className="res-btn" text={"Get Study Material"} path={"/resources"}/>
                    </motion.div>
                    <motion.div  
                    className="topper-sec"
                    intial={{opacity:1}}
                    exit={{opacity:0 }}
                    transition={{duration:0.5}}
                    >
                        <motion.span 
                        className="text"
                        intial={{opacity:1, x:0}}
                        exit={{opacity:0 ,x:-50}}
                        transition={{duration:0.5}}
                        >Topper's Section</motion.span>
                        <NavigateButton className={"contri-btn"} text={"Contribute"} path={"/contribute"}/>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
