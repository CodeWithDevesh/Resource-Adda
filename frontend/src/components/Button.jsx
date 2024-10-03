import React from "react";
import "./Button.css";
export default function Button({ text, type, className, onClick }) {
    return (
        <button
            className={"btn hover-effect " + className}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    );
}