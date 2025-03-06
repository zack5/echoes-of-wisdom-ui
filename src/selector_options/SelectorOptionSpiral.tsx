import { useEchoesData } from "../contexts/ContextEchoes";
import { useSelectorData } from "../contexts/ContextSelector";
import SelectorOption from "./SelectorOption";

export default function SelectorOptionSpiral({ index }: { index: number }) {
  const echoes = useEchoesData();
  const selectorData = useSelectorData();
  if (!echoes || !selectorData) {
    return null;
  }
  const { selectedItem, itemScale, selectedItemRadius, b, directionCount } = selectorData;

  function computeOpacity(index: number) {
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

  const targetPosition = computePosition(index);
  const targetOpacity = computeOpacity(index);
  const targetScale = Math.max(0, (0.8 + 0.035 * (index - selectedItem)) * 1.16 * itemScale);

  return (
    <SelectorOption
      index={index}
      extraClassNames={index === selectedItem ? "selected" : ""}
      extraStyles={{
        width: 128,
        height: 128,
        borderRadius: "50%",
      }}
      targetPosition={targetPosition}
      targetOpacity={targetOpacity}
      targetScale={targetScale}
    />
  );
}
