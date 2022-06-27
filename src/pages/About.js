import React, { Component } from 'react';
import "./About.css";
import profile from "../assets/profile.jpg";
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div class="split left">
      <div className="centered">
        <img 
          className="profile"
          src={profile}
          alt="profile image"
          ></img>
      </div>
    </div>
    <div className="split right">
      <div className="centered">
        <div className="name_title">Hi, I'm Carolyn Zeng.</div>
        <div className="brief_description">
          I'm a rising junior majoring in Computer Science + Astronomy at the University of Illinois at Urbana-Champaign (UIUC). Glad to be in this program with everybody!
          My interests include AI, video games, quantum physics, anime/manga, and DND. My favorite band is Lord Huron.
          Feel free to connect on <a href="https://www.linkedin.com/in/carolyn-z-28637718b/">LinkedIn</a> or contact me on Discord at kaedezee#5636.
        </div>
      </div>
    </div>
      </div>
    )
  }
}