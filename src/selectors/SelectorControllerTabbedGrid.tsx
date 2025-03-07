import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { useEchoesData } from "../contexts/ContextEchoes";
import { useNavigationData } from "../contexts/ContextNavigation";
import { useSelectorData } from "../contexts/ContextSelector";

import EchoTitle from "../components/EchoTitle";
import KeyButton from "../components/KeyButton";
import SelectorLayout from "../components/SelectorLayout";

import SelectorOption from "../selector_options/SelectorOption";
import { WIDTH, HEIGHT, GRID_COLUMNS, GAP } from "../selector_options/SelectorOptionConstants";

import { useJoystickGridNavigation } from "../hooks/useJoystickGridNavigation";

export default function SelectorControllerTabbedGrid() {
  const echoesData = useEchoesData();
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!echoesData || !navigationData || !selectorData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const { selectedEchoId, setSelectedEchoId } = selectorData;

  const categorySet = ["object", "object2", "bug", "plains", "flying", "aquatic", "monster"];

  const [tabIndex, setTabIndex] = useState(categorySet.indexOf(echoesData[selectedEchoId].category));
  
  const echoeIdsByCategory = useMemo(() => {
    return categorySet.reduce((acc, category) => {
      acc[category] = Object.entries(echoesData)
        .filter(([_, echo]) => echo.category === category)
        .map(([id, _]) => id);
      return acc;
    }, {} as Record<string, string[]>);
  }, [echoesData, categorySet]);
  const currentEchoeIds = echoeIdsByCategory[categorySet[tabIndex]];

  const [_, setIndex] = useState(() => currentEchoeIds.indexOf(selectedEchoId));

  const itemCount = currentEchoeIds.length;
  const numRows = Math.ceil(itemCount / GRID_COLUMNS);

  function handleSetIndex(index: number) {
    setSelectedEchoId(currentEchoeIds[index]);
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "e") {
        const newTabIndex = (tabIndex + 1) % categorySet.length;
        setTabIndex(newTabIndex);
        setIndex(0);
        setSelectedEchoId(echoeIdsByCategory[categorySet[newTabIndex]][0]);
      } else if (event.key === "q") {
        const newTabIndex = (tabIndex - 1 + categorySet.length) % categorySet.length;
        setTabIndex(newTabIndex);
        setIndex(0);
        setSelectedEchoId(echoeIdsByCategory[categorySet[newTabIndex]][0]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [setTabIndex, tabIndex, categorySet, echoeIdsByCategory, setSelectedEchoId]);

  useJoystickGridNavigation({
    joystickPosition,
    itemCount,
    setIndex,
    onSetIndex: handleSetIndex,
    numRows,
    numColumns: GRID_COLUMNS,
  });

  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOption key={index} echoId={currentEchoeIds[index]} />
    ))

  const selectedIndex = currentEchoeIds.indexOf(selectedEchoId);
  const row = Math.floor(selectedIndex / GRID_COLUMNS);
  const col = selectedIndex % GRID_COLUMNS;

  const gridWidth = GRID_COLUMNS * (WIDTH + GAP) - GAP;
  const gridHeight = 3 * (HEIGHT + GAP) - GAP;

  const targetSelectedX = 1 * (col * (WIDTH + GAP)) - gridWidth / 2;
  const targetSelectedY = -1 * HEIGHT / 2
    + (HEIGHT + GAP) * (row - 1);

  const transition = {
    duration: 0.3,
    ease: "easeOut",
  }

  const tabPips = categorySet.map((_, index) => {
    return (
      <div className={index === tabIndex ? "pip pip-selected" : "pip"} key={index} />
    )
  })

  const menuElements = (
    <>
      <div
        className="scrolling-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_COLUMNS}, ${WIDTH}px)`,
          gridTemplateRows: `repeat(${numRows}, ${HEIGHT}px)`,
          gap: `${GAP}px`,
          position: "absolute",
          transform: `translate(-50%, -50%)`,
          width: gridWidth,
          height: gridHeight,
        }}
      >
        {elements}
      </div>
      <EchoTitle
        extraStyles={{
          top: "-400px",
        }}
      />
      <div className="tab-nav">
        <KeyButton action="q" />
        <div className="selector-option tab-pips-container">
          {tabPips}
        </div>
        <KeyButton action="e" />
      </div>
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
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements}/>
  )
}