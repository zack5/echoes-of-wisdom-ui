import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";

import zack from "../assets/about/zack.jpg";
import pokeball from "../assets/about/pokeball.png";

export default function About() {
  return (
    <div className="about-page-container">
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
      <p>I loved playing Echoes of Wisdom, but I did not love linearly scrolling through all 127 echoes every time I needed to find one! Exploring other alternatives in this project was immensely satisfying.</p>

      <p>Implementation is my own. This project was inspired by the fantastic video by Game Maker's Toolkit, who built many of these prototypes in Unity: <a href="Can I fix Zelda's UI using Unity">https://www.youtube.com/watch?v=e4vsgC41bYg</a></p>

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