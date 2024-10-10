import React from "react";
import "./Home.css";
import NavigateButton from "../components/NavigateButton";
import character from "../assets/character.png"
import {backInOut, easeIn, easeInOut, motion } from "framer-motion";
import { duration } from "@mui/material";
export function Home() {
    return (
        <>
            <div className="home">
                <div className="container">
                    <motion.div 
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    transition={{duration:1}}
                    className="section-1"
                    >
                        <motion.div 
                        className="slangs"
                        initial={{opacity:0, y:-100}}
                        animate={{opacity:1, y:0}}
                        exit={{opacity:0 ,y:-100}}
                        transition={{duration:1}}
                        >
                            <div className="text first-slang">
                                <span>Haa bhai... Aa gaya padhne</span>
                            </div>
                            <div className="text second-slang">
                                <span>Notes nahi mil rahe ??</span>
                            </div>
                        </motion.div>
                        <motion.div
                        initial={{opacity:0, x:100}}
                        animate={{opacity:1, x:0 }}
                        transition={{duration:1}}
                        >
                        <NavigateButton className="res-btn" text={"Get Study Material"} path={"/resources"}/>
                        </motion.div>
                    </motion.div>
                    <motion.div  
                    className="topper-sec"
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0 }}
                    transition={{duration:1}}
                    >
                        <motion.span 
                        className="text"
                        initial={{opacity:0, x:-100}}
                        animate={{opacity:1,x:0}}
                        exit={{opacity:0 ,x:-100}}
                        transition={{duration:1}}
                        >Topper's Section</motion.span>
                        <motion.div
                        initial={{opacity:0, y:100}}
                        animate={{opacity:1, y:0}}
                        exit={{opacity:0}}
                        transition={{duration:1}}
                        >
                        <NavigateButton className={"contri-btn"} text={"Contribute"} path={"/contribute"}/>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </>
    );
}
