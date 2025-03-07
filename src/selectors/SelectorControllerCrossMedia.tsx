import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

import { useEchoesData } from "../contexts/ContextEchoes";
import { useNavigationData } from "../contexts/ContextNavigation";
import { useSelectorData } from "../contexts/ContextSelector";

import EchoTitle from "../components/EchoTitle";
import SelectorLayout from "../components/SelectorLayout";

import SelectorOption from "../selector_options/SelectorOption";
import { WIDTH, HEIGHT, GRID_COLUMNS, GAP } from "../selector_options/SelectorOptionConstants";

import { useJoystickGridNavigation } from "../hooks/useJoystickGridNavigation";

export default function SelectorControllerCrossMedia() {
  const echoesData = useEchoesData();
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!echoesData || !navigationData || !selectorData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const { itemCount, selectedEchoId, setSelectedEchoId, getEchoIndex, getEchoId, sortedEchoIds, sortType } = selectorData;

  const [selectedColumn, setSelectedColumn] = useState(0);

  const typeSet = useMemo(
    () => Array.from(new Set(Object.values(echoesData).map(echo => echo.type)))
    , [echoesData]
  );

  const echoIdsPerType = useMemo(() => {
    return typeSet.map(type => Object.entries(echoesData)
      .filter(([_, echo]) => echo.type === type)
      .map(([id, _]) => id)
    );
  }, [echoesData, typeSet]);

  const numColumns = echoIdsPerType.length;

  useJoystickGridNavigation({
    joystickPosition,
    itemCount,
    setIndex: (index) => setSelectedColumn(index),
    numRows: 1,
    numColumns: numColumns,
    sortType
  });

  // useEffect(() => {
  //   setSelectedEchoId(getEchoId(index));
  // }, [index]);

  const transition = {
    duration: 0.3,
    ease: "easeOut",
  }

  const elements = echoIdsPerType
    .map((echoIds) => {
      const echoElements = echoIds.map((echoId) => <SelectorOption key={echoId} echoId={echoId} />);
      return (
        <div>
          <motion.div 
            className="echo-cross-media-vertical-container"
            style={{
              // position: "absolute",
              display: "grid",
              gridTemplateRows: `repeat(${echoIds.length}, ${HEIGHT}px)`,
              gap: `${GAP}px`,
            }}
            initial={false}
            animate={{
              x: 0,
              y: 0,
            }}
            transition={transition}
          >
            {echoElements}
          </motion.div>
        </div>
      )
    })

  const parentX = -1 * (WIDTH / 2)
    - selectedColumn * (WIDTH + GAP)
  const parentY = -1 * (HEIGHT / 2)

  const menuElements = (
    <>
      <motion.div
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
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements} useMask={true}/>
  )
}