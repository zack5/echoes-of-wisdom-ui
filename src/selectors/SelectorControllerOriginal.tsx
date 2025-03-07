import { useState, useEffect } from "react";

import { useNavigationData } from "../contexts/ContextNavigation";
import { useSelectorData } from "../contexts/ContextSelector";

import EchoTitle from "../components/EchoTitle";
import PropertySlider from "../components/PropertySlider";
import SelectorLayout from "../components/SelectorLayout";
import SortDisplay from "../components/SortDisplay";

import SelectorOptionOriginal from "../selector_options/SelectorOptionOriginal";
import { WIDTH, HEIGHT } from "../selector_options/SelectorOptionConstants";

import { useJoystickGridNavigation } from "../hooks/useJoystickGridNavigation";

export default function SelectorControllerOriginal({useAcceleration = false}: {useAcceleration?: boolean}) {
  
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!selectorData || !navigationData) {
    return null;
  }
  
  const { joystickPosition } = navigationData;
  const { sortedEchoIds, sortType, getEchoIndex, getEchoId, itemCount, selectedEchoId, setSelectedEchoId, acceleration, setAcceleration, minStepDuration, setMinStepDuration } = selectorData;
  
  const [index, setIndex] = useState(getEchoIndex(selectedEchoId));

  useEffect(() => {
    setSelectedEchoId(getEchoId(index));
  }, [index]);

  useJoystickGridNavigation({
    joystickPosition,
    itemCount,
    setIndex,
    numRows: 1,
    numColumns: itemCount,
    useAcceleration,
    acceleration,
    minStepDuration,
    sortType,
  });

  const selectedItem = getEchoIndex(selectedEchoId);

  const visibleWindow = useAcceleration ? itemCount * 0.8 : 30;
  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOptionOriginal key={index} echoId={sortedEchoIds[index]} />
    ))
    .filter((_, index) => Math.abs(index - selectedItem) <= visibleWindow / 2);

  const menuElements = (
    <>
      <div key={`echoes-container-${sortType}`}>
        {elements}
      </div>
      <EchoTitle
        extraStyles={{
          bottom: "-230px",
        }}
      />
      <SortDisplay />
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

  const parametersElements = useAcceleration ? (
    <>
      <PropertySlider
        value={acceleration}
        setValue={setAcceleration}
        label="Acceleration"
        min={0}
        max={1}
        step={0.01}
      />
      <PropertySlider
        value={minStepDuration}
        setValue={setMinStepDuration}
        label="Min Step Duration (ms)"
        subLabel="No acceleration is 80ms."
        min={1}
        max={80}
        step={1}
      />
    </>
  ) : null;

  return (
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements} useMask={true}/>
  )
}