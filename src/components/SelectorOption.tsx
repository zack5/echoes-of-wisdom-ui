import { useEchoesData } from "./ContextEchoes";
import { useSelectorData } from "./ContextSelector";
import { useState, useEffect } from "react";

export default function SelectorOption({ index }: { index: number }) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  const { selectedItem, selectedItemRadius, b, directionCount } = selectorData;

  function getOpacity(index: number) {
    const distance = Math.abs(selectedItem - index);
    const linearFalloff = (2 / directionCount) * (1 - distance) + 2.2;
    return Math.pow(Math.max(linearFalloff, 0), 2);
  }

  function getT(index: number) {
    return ((index + 2 * directionCount) * Math.PI * 2) / directionCount;
  }

  function computePosition(index: number) {
    const a = selectedItemRadius / Math.exp(b * getT(selectedItem));
    const t = getT(index);
    const expbt = Math.exp(b * t);
    return {
      x: a * expbt * Math.cos(t),
      y: a * expbt * Math.sin(t),
    };
  }

  const targetOpacity = getOpacity(index);
  const targetScale = 0.8 + 0.03 * (index - selectedItem);
  const { x: targetX, y: targetY } = computePosition(index);

  // Animated state values
  const [x, setX] = useState(targetX);
  const [y, setY] = useState(targetY);
  const [opacity, setOpacity] = useState(targetOpacity);
  const [scale, setScale] = useState(targetScale);

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      setX((prev) => prev + (targetX - prev) * 0.1);
      setY((prev) => prev + (targetY - prev) * 0.1);
      setOpacity((prev) => prev + (targetOpacity - prev) * 0.1);
      setScale((prev) => prev + (targetScale - prev) * 0.1);

      if (
        Math.abs(x - targetX) > 0.5 ||
        Math.abs(y - targetY) > 0.5 ||
        Math.abs(opacity - targetOpacity) > 0.01 ||
        Math.abs(scale - targetScale) > 0.01
      ) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [targetX, targetY, targetOpacity, targetScale]);

  if (opacity < 0.01) {
    return null;
  }

  return (
    <div
      className={`selector-option ${index === selectedItem ? "selected" : ""}`}
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
      }}
    >
      <img src={`${echoes[index].image}`} alt={echoes[index].name} />
    </div>
  );
}
