import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";

import costTriangle from "../assets/textures/cost-triangle.png";
import { WIDTH, HEIGHT } from "./SelectorOptionConstants";
export default function SelectorOption({ echoId, extraClassNames, extraStyles }
  : {
    echoId: string,
    extraClassNames?: string,
    extraStyles?: React.CSSProperties,
  }
) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }

  const cost = echoes[echoId].cost;
  const costTriangleElements = Array.from({ length: cost }, (_, index) => {
    const rotation = (cost - 2 * index - 1) * -7;
    const yOffset = 0.008 * (Math.abs(rotation) ** 2.02);
    const margin = -7 - 0.5 * (Math.abs(cost - 2 * index - 1));
    return (
      <img 
        key={`${echoes[echoId].name}-cost-triangle-${index}`}
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
    <div key={echoes[echoId].name}
      className={`selector-option ${extraClassNames ? extraClassNames : ""}`}
      style={{
        width: `${WIDTH}px`,
        height: `${HEIGHT}px`,
        ...extraStyles,
      }}
    >
      <div className="cost-triangle-container">
        {costTriangleElements}
      </div>
      <img src={`${echoes[echoId].image}`} alt={echoes[echoId].name} style={{ top: `5%` }} />
    </div>
  );
}
