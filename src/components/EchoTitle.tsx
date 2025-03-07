import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";

import echoNameBackground from "../assets/textures/echo-name-background.png";

export default function EchoTitle( {extraStyles}: {extraStyles: React.CSSProperties} ) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!selectorData || !echoes) {
    return null;
  }

  const { selectedEchoId } = selectorData;
  const echo = echoes[selectedEchoId];

  return (
    <div className="echo-title" style={extraStyles}>
      <img src={echoNameBackground} alt="echo-name-background" />
      <span>{echo.name}</span>
    </div>
  )
}