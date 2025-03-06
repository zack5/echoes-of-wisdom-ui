import { useState, useEffect, useRef } from "react";

import overworld from "../assets/textures/overworld-no-ui.jpg";
import overworldMask from "../assets/textures/overworld-no-ui-mask.png";
import uiOverlay from "../assets/textures/ui-overlay.png";

export default function GameScreen({ children, useMask = false }: { children: React.ReactNode, useMask?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        const scale = width / 1920;
        setScale(scale);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div ref={containerRef} className="game-screen-container">
        <div className="game-screen"
          style={{
            width: "1920px",
            height: "1080px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "absolute",
            top: "0",
            left: "0",
            overflow: "hidden",
          }}
        >
          <img src={overworld} alt="background" className="game-image-fullscreen background-blur"/>
          <div className="selector-container">
            {children}
          </div>
          {useMask && <img src={overworldMask} alt="overworld-mask" className="game-image-fullscreen background-blur ui-layer"/>}
          <img src={uiOverlay} alt="ui-overlay" className="game-image-fullscreen ui-layer"/>
        </div>
      </div>
    </>
  );
}