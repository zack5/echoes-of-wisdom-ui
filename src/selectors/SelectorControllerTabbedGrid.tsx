import { motion } from "framer-motion";

import { useEchoesData } from "../contexts/ContextEchoes";
import { useNavigationData } from "../contexts/ContextNavigation";
import { useSelectorData } from "../contexts/ContextSelector";

import EchoTitle from "../components/EchoTitle";
import SelectorLayout from "../components/SelectorLayout";

import SelectorOption from "../selector_options/SelectorOption";
import { WIDTH, HEIGHT, GRID_COLUMNS, GAP } from "../selector_options/SelectorOptionConstants";

import { useJoystickGridNavigation } from "../hooks/useJoystickGridNavigation";

export default function SelectorControllerScrollingGrid() {
  const echoesData = useEchoesData();
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!echoesData || !navigationData || !selectorData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const { itemCount, selectedItem, setSelectedItem } = selectorData;

  const numRows = Math.ceil(itemCount / GRID_COLUMNS);

  useJoystickGridNavigation({
    joystickPosition,
    itemCount,
    setSelectedItem,
    numRows,
    numColumns: GRID_COLUMNS,
  });

  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOption key={index} index={index} />
    ))

  const row = Math.floor(selectedItem / GRID_COLUMNS);
  const col = selectedItem % GRID_COLUMNS;
  console.log(row, col);

  const targetGridX = -1 * (4 * (WIDTH + GAP) + WIDTH / 2);
  const targetGridY = -1 * (Math.min(Math.max(row, 1), numRows - 2) * (HEIGHT + GAP) + HEIGHT / 2);

  const gridWidth = GRID_COLUMNS * (WIDTH + GAP) - GAP;
  const targetSelectedX = 1 * (col * (WIDTH + GAP)) - gridWidth / 2;
  const targetSelectedY = -1 * HEIGHT / 2
    - (HEIGHT + GAP) * (row === 0 ? 1 : 0)
    + (HEIGHT + GAP) * (row === numRows - 1 ? 1 : 0);

  const transition = {
    duration: 0.3,
    ease: "easeOut",
  }

  const menuElements = (
    <>
      <motion.div
        className="scrolling-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${WIDTH}px)`,
          gridTemplateRows: `repeat(${numRows}, ${HEIGHT}px)`,
          gap: `${GAP}px`,
          position: "absolute",
        }}
        initial={false}
        animate={{
          x: targetGridX,
          y: targetGridY,
        }}
        transition={transition}
      >
        {elements}
      </motion.div>
      <EchoTitle
        extraStyles={{
          bottom: "-500px",
        }}
      />
      <motion.div
        className="selected"
        style={{
          position: "absolute",
          width: WIDTH,
          height: HEIGHT,
        }}
        initial={false}
        animate={{
          x: targetSelectedX,
          y: targetSelectedY,
        }}
        transition={transition}
      ></motion.div>
    </>
  )

  const parametersElements = null;

  return (
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements} useMask={true}/>
  )
}