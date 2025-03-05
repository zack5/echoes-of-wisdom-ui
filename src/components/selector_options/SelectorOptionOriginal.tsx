import { useEchoesData } from "../ContextEchoes";
import { useSelectorData } from "../ContextSelector";
import SelectorOption from "./SelectorOption";
import { WIDTH, HEIGHT, GAP } from "./SelectorOptionConstants";

export default function SelectorOptionOriginal({ index }: { index: number }) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  const { selectedItem } = selectorData;

  return (
    <SelectorOption
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
