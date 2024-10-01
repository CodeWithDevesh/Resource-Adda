import React from 'react'
import "./Page404.css"
import hb from "../assets/404.gif"

export default function Page404() {
  return (
    <div class="home">
      <div class="container">
        <div class="section-1">
            <div class="topper-sec">
                <img src={hb} alt="404 Gif" class="gif-img"/>
                <div class="text">Bhai tu bhatak gaya hai</div>
                <a href="" class="btn res-btn">Wapas Jaa</a>
            </div>
        </div>
    </div>
    </div>
  )
}
