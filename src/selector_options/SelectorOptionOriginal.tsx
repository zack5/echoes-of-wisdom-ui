import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";
import SelectorOptionSelfPositioning from "./SelectorOptionSelfPositioning";
import { WIDTH, HEIGHT, GAP } from "./SelectorOptionConstants";

export default function SelectorOptionOriginal({ index }: { index: number }) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  const { selectedItem } = selectorData;

  return (
    <SelectorOptionSelfPositioning
      index={index}
      extraClassNames=""
      extraStyles={{
        width: WIDTH,
        height: HEIGHT,
      }}
      targetPosition={{ x: (index - selectedItem) * (WIDTH + GAP), y: 0 }}
      targetOpacity={1}
      targetScale={1}
    />
  );
}
