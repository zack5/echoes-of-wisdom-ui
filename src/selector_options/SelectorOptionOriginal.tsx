import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";
import SelectorOptionSelfPositioning from "./SelectorOptionSelfPositioning";
import { WIDTH, HEIGHT, GAP } from "./SelectorOptionConstants";

export default function SelectorOptionOriginal({ echoId }: { echoId: string }) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  const { selectedEchoId, getEchoIndex } = selectorData;

  return (
    <SelectorOptionSelfPositioning
      echoId={echoId}
      extraClassNames=""
      extraStyles={{
        width: WIDTH,
        height: HEIGHT,
      }}
      targetPosition={{ x: (getEchoIndex(echoId) - getEchoIndex(selectedEchoId)) * (WIDTH + GAP), y: 0 }}
      targetOpacity={1}
      targetScale={1}
    />
  );
}
