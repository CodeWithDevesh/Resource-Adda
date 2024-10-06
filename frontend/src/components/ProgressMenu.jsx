import React from "react";
import "./ProgressMenu.css";

export default function ProgressMenu({progresses}) {
    return (
        <div className="progress-menu">
            {progresses.map((p) => {
                return <ProgressBar key={p.id} text={p.text} progress={p.progress}/>
            })}
        </div>
    )
}


const ProgressBar = ({text, progress}) => {
    return (
        <div className="progress-bar">
            <div className="progress-label">
                {text}
            </div>
            <div className="bar">
            <div className="conpleted-bar" style={{width: `${progress}%`}}>
            </div>
            </div>
        </div>
    )
}