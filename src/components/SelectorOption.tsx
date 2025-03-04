import { motion } from "framer-motion";

import { useSelectorData } from "./ContextSelector";

export default function SelectorOption({ index }: { index: number }) {
  const selectorData = useSelectorData();
  if (!selectorData) {
    return null;
  }
  const { selectedItem, selectedItemRadius, b, directionCount } = selectorData;

  function getOpacity(index: number) {
    // Full opacity for all window directionCount/2 away, quadratic falloff after that
    const distance = Math.abs(selectedItem - index);
    const linearFalloff = 2 / directionCount * (1 - distance) + 2;
    return Math.pow(Math.max(linearFalloff, 0), 2);
  }

  const opacity = getOpacity(index);
  if (opacity < 0.01) {
    return null;
  }

  function getT(index: number) {
    return (index + 2 * directionCount) * Math.PI * 2 / directionCount; // Starting at 2*directionCount instead of 0 avoids needing crazy large a values
  }

  const a = selectedItemRadius / Math.exp(b * getT(selectedItem));
  const t = getT(index);
  const expbt = Math.exp(b * t);

  // Golden Spiral
  const x = a * expbt * Math.cos(t);
  const y = a * expbt * Math.sin(t);

  return (
    <motion.div
      className="selector-option"
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        opacity,
      }}
      // initial={false}
      // animate={{
      //   left: `${x}px`,
      //   top: `${y}px`,
      //   opacity,
      // }}
    >
      <h2>{index}</h2>
    </motion.div>
  )
}