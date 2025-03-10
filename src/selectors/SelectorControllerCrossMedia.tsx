import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";

import { useEchoesData } from "../contexts/ContextEchoes";
import { useNavigationData } from "../contexts/ContextNavigation";
import { useSelectorData } from "../contexts/ContextSelector";

import EchoTitle from "../components/EchoTitle";
import SelectorLayout from "../components/SelectorLayout";

import SelectorOption from "../selector_options/SelectorOption";
import { WIDTH, HEIGHT, GAP } from "../selector_options/SelectorOptionConstants";

import { useJoystickCrossMediaBarNavigation } from "../hooks/useJoystickCrossMediaBarNavigation";

export default function SelectorControllerCrossMedia() {
  const echoesData = useEchoesData();
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!echoesData || !navigationData || !selectorData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const { selectedEchoId, setSelectedEchoId, crossMediaBarNavigationData, setCrossMediaBarNavigationData } = selectorData;

  const typeSet = useMemo(
    () => Array.from(new Set(Object.values(echoesData).map(echo => echo.type)))
    , [echoesData]
  );

  const echoIdsPerType = useMemo(() => {
    return typeSet.map(type => Object.entries(echoesData)
      .filter(([_, echo]) => echo.type === type)
      .sort(([_, a], [__, b]) => a.cost - b.cost)
      .map(([id, _]) => id)
    );
  }, [echoesData, typeSet]);

  const typeCounts = useMemo(() => {
    return echoIdsPerType.map(ids => ids.length);
  }, [echoIdsPerType]);
  
  const remountVisuals = useRef(0);
  useEffect(() => {
    remountVisuals.current++;
    const colIndex = typeSet.indexOf(echoesData[selectedEchoId].type);
    const typeIndex = echoIdsPerType[colIndex].indexOf(selectedEchoId);
    setCrossMediaBarNavigationData((prev) => ({
      columnIndex: colIndex,
      typeIndexes: prev.typeIndexes.map((_, i) => i === colIndex ? typeIndex : _),
    }));
  }, []);
  
  useEffect(() => {
    const col = crossMediaBarNavigationData.columnIndex;
    const typeIndex = crossMediaBarNavigationData.typeIndexes[col];
    setSelectedEchoId(echoIdsPerType[col][typeIndex]);
  }, [crossMediaBarNavigationData]);

  useJoystickCrossMediaBarNavigation({
    joystickPosition,
    typeCounts,
    setCrossMediaBarNavigationData,
  });

  const transition = {
    duration: 0.3,
    ease: "easeOut",
  }

  const visibleWindow = 15;
  const numColumns = typeSet.length;

  const elements = echoIdsPerType
    .map((echoIds, colIndex) => {
      if (Math.abs(colIndex - crossMediaBarNavigationData.columnIndex) > visibleWindow) {
        return <div key={typeSet[colIndex]}/>;
      }

      const y = crossMediaBarNavigationData.typeIndexes[colIndex]
        * -1 * (HEIGHT + GAP);

      const echoElements = echoIds.map((echoId) => <SelectorOption key={echoId} echoId={echoId} />);
      
      return (
        <div key={typeSet[colIndex]}>
          <motion.div 
            className="echo-cross-media-vertical-container"
            style={{
              position: "absolute",
              display: "grid",
              gridTemplateRows: `repeat(${echoIds.length}, ${HEIGHT}px)`,
              gap: `${GAP}px`,
            }}
            initial={false}
            animate={{
              y: y,
            }}
            transition={transition}
          >
            {echoElements}
          </motion.div>
        </div>
      )
    })

  const parentX = -1 * (WIDTH / 2)
    - crossMediaBarNavigationData.columnIndex * (WIDTH + GAP)
  const parentY = -1 * (HEIGHT / 2)

  const menuElements = (
    <>
      <motion.div
        key={remountVisuals.current}
        className="cross-media-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${numColumns}, ${WIDTH}px)`,
          gap: `${GAP}px`,
          position: "absolute",
        }}
        initial={false}
        animate={{
          x: parentX,
          y: parentY,
        }}
        transition={transition}
      >
        {elements}
      </motion.div>

      <EchoTitle
        extraStyles={{
          bottom: "-230px",
        }}
      />
      
      <div
        className="selected"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: WIDTH,
          height: HEIGHT,
        }}
      ></div>
    </>
  )

  const parametersElements = null;

  return (
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements}/>
  )
}