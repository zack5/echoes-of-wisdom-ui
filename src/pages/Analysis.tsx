import { Link } from "react-router-dom";

import starIcon from '../assets/textures/star-icon.png'

function Stars({ rating }: { rating: number }) {
    const elements = new Array(5).fill(null).map((_, index) => {
        const isFilled = index < rating;
        return <img src={starIcon} alt="Star" key={index} className={isFilled ? 'star-filled' : 'star-empty'} />
    })
    
    return (
        <div className="stars">
            {elements}
        </div>
    )
}

export default function Analysis() {
  return (
    <div className="document-page-container">
      <h1>
        Design Analysis
      </h1>
      <p>
        Here are my thoughts on the design tradeoffs of each approach after getting hands on with them.
      </p>
      <Link to="/">
        <h2>Original</h2>
      </Link>
      <Stars rating={1} />
      <p>The original version shines in its simplicity, but its pros end there. This approach simply does not scale well past the first few echoes.</p>
      <Link to="/acceleration">
        <h2>Original + Acceleration</h2>
      </Link>
      <Stars rating={2} />
      <Link to="/scrolling-grid">
        <h2>Scrolling Grid</h2>
      </Link>
      <Link to="/tabbed-grid">
        <h2>Tabbed Grid</h2>
      </Link>
      <Link to="/bar">
        <h2>Cross Media Bar</h2>
      </Link>
      <Link to="/spiral-nav">
        <h2>Spiral Nav</h2>
      </Link>
      <h2>Final Thoughts</h2>
      <p>
        Favorite system
      </p>
    </div>
  );
}