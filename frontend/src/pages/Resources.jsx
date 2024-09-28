import React from 'react'
import {  useParams } from 'react-router-dom'
export default function Resources() {
const {branch: branch ,sem:sem}= useParams();
console.log(branch,sem)
  return (
    <div class="resourcebody">
      <div className="container">
        <h1>Information Technology</h1>
        <p>Semester-1</p>
        <div className="grid-container">
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Maths-1</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Physics-1</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Applied Chemistry</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Engineering Graphics</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Communication Skills</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Physics-1 Lab</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Applied Chemistry Lab</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Yoga</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Workshop</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>PYQs</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Books</p>
          </div>
          <div>
            <a href="#"><img src="blue-folder.png" alt="folder" /></a>
            <p>Value Education</p>
          </div>
        </div>
      </div>
    </div>
  )
}
