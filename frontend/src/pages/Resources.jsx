import React from 'react'
import {  useParams } from 'react-router-dom'
export function Resources() {
const {branch: branch ,sem:sem}= useParams();
console.log(branch,sem)
  return (
    <div></div>
  )
}
