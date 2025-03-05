import { useEchoesData } from "./ContextEchoes";
import { useSelectorData } from "./ContextSelector";

export default function EchoTitle() {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!selectorData || !echoes) {
    return null;
  }

  const { selectedItem } = selectorData;
  const echo = echoes[selectedItem];

  return (
    <div className="echo-title">
      <h1>{echo.name}</h1>
    </div>
  )
}