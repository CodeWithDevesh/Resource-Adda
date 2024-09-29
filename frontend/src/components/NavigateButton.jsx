import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./NavigateButton.css"

export default function NavigateButton({path, text, className}) {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(path);
  }

  return (
    <div className={'nav-btn hover-effect ' + className} onClick={handleNav}>
      {text}
    </div>
  )
}
