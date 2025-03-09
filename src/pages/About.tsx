import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

import zack from "../assets/about/zack.jpg";
import pokeball from "../assets/about/pokeball.png";

export default function About() {
  return (
    <div className="document-page-container">
      <h1>
        About
      </h1>
      <div className="about-me-container">
        <img src={zack} alt="Zack Cinquini" className="my-image"/>
        <div className="about-me-text">
          <h2>Zack Cinquini</h2>
          <ul>
            <li>
              <div className="about-me-text-icon">👨‍💻</div>
              <div>Software engineer</div>
            </li>
            <li>
              <div className="about-me-text-icon">🚊</div>
              <div>Transit lover</div>
            </li>
            <li>
              <div className="about-me-text-icon"><img style={{width: "1rem", height: "1rem"}} src={pokeball} alt="Pokeball"/></div>
              <div>Smoliv fan</div>
            </li>
          </ul>
        </div>
      </div>
      <p>Echoes of Wisdom is a 2024 action-adventure game on the Nintendo Switch. The game's central mechanic involves spawning creatures and objects—"echoes"—to solve puzzles and beat enemies. I had a blast playing Echoes of Wisdom, but the menu for selecting which echo to use was definitely a missed opportunity. Throughout your quest you can collect up to 127 echoes, and the main method of using one is by finding it in a one-dimensional list. You may sort by “Type” and “Most Recently Used” which helps, but I believe other options could provide a better experience and match the high bar of polish set by the rest of the game. Exploring alternatives in this project was immensely satisfying.</p>

      <p>I implemented these prototypes using TypeScript and React. This project was inspired by the fantastic video by Game Maker's Toolkit, who built many of these prototypes in Unity: <a href="https://www.youtube.com/watch?v=e4vsgC41bYg">Can I fix Zelda's UI using Unity?</a></p>

      <h2>Contact</h2>
      <a href="mailto:isaac.cinquini@gmail.com">
        <div className="contact-row">
          <IoMail />
          <span>isaac.cinquini@gmail.com</span>
        </div>
      </a>
      <a href="https://www.linkedin.com/in/zackcinquini">
        <div className="contact-row">
          <IoLogoLinkedin />
          <span>linkedin.com/in/zackcinquini</span>
        </div>
      </a>
      <a href="https://github.com/zack5">
        <div className="contact-row">
          <IoLogoGithub />
          <span>github.com/zack5</span>
        </div>
      </a>

    </div>
  );
}