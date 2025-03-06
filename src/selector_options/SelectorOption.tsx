import { useState, useEffect } from "react";
import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";

import costTriangle from "../assets/textures/cost-triangle.png";

export default function SelectorOption({ index, extraClassNames, extraStyles, targetPosition, targetOpacity, targetScale,  }
  : {
    index: number,
    extraClassNames: string,
    extraStyles: React.CSSProperties,
    targetPosition: { x: number, y: number },
    targetOpacity: number,
    targetScale: number 
  }
) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  
  const { x: targetX, y: targetY } = targetPosition;

  // Animated state values
  const [x, setX] = useState(targetX);
  const [y, setY] = useState(targetY);
  const [opacity, setOpacity] = useState(targetOpacity);
  const [scale, setScale] = useState(targetScale);

  useEffect(() => {
    let animationFrame: number;
  
    const animate = () => {
      setX((prevX) => {
        const newX = prevX + (targetX - prevX) * 0.1;
        return Math.abs(newX - targetX) < 0.5 ? targetX : newX;
      });
  
      setY((prevY) => {
        const newY = prevY + (targetY - prevY) * 0.1;
        return Math.abs(newY - targetY) < 0.5 ? targetY : newY;
      });
  
      setOpacity((prevOpacity) => {
        const newOpacity = prevOpacity + (targetOpacity - prevOpacity) * 0.1;
        return Math.abs(newOpacity - targetOpacity) < 0.01 ? targetOpacity : newOpacity;
      });
  
      setScale((prevScale) => {
        const newScale = prevScale + (targetScale - prevScale) * 0.1;
        return Math.abs(newScale - targetScale) < 0.01 ? targetScale : newScale;
      });
  
      // Keep animating only if needed
      animationFrame = requestAnimationFrame(animate);
    };
  
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [targetX, targetY, targetOpacity, targetScale]);

  if (opacity < 0.01) {
    return null;
  }

  const cost = echoes[index].cost;
  const costTriangleElements = Array.from({ length: cost }, (_, index) => {
    const rotation = (cost - 2 * index - 1) * -7;
    const yOffset = 0.008 * (Math.abs(rotation) ** 2.02);
    const margin = -7 - 0.5 * (Math.abs(cost - 2 * index - 1));
    return (
      <img 
        src={costTriangle} 
        alt="triangle" 
        style={{ 
          transform: `translateY(${yOffset}px) rotate(${rotation}deg)`, 
          marginInline: `${margin}px` 
        }} 
      />
    );
  });

  return (
    <div
      className={`selector-option ${extraClassNames}`}
      style={{
        ...extraStyles,
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <img src={`${echoes[index].image}`} alt={echoes[index].name} style={{ top: `5%` }} />
      <div className="cost-triangle-container">
        {costTriangleElements}
      </div>
    </div>
  );
}
