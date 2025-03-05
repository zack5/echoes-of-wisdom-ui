import { useEffect, useState } from "react";

import SelectorOption from "../components/SelectorOption";
import { useSelectorData } from "../components/ContextSelector";
import PropertySlider from "../components/PropertySlider";
import Joystick from "../components/Joystick";
import EchoTitle from "../components/EchoTitle";

export default function SelectorController() {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });
  const selectorData = useSelectorData();
  if (!selectorData) {
    return null;
  }

  const { itemCount, selectedItem, setSelectedItem, selectedItemRadius, setSelectedItemRadius, a, setA, b, setB, directionCount, setDirectionCount } = selectorData;

  const visibleWindow = directionCount * 3;
  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOption key={index} index={index} />
    ))
    .filter((_, index) => Math.abs(index - selectedItem) <= visibleWindow / 2);

  useEffect(() => {
    if (joystickPosition.x !== 0 || joystickPosition.y !== 0) {
      let inputAngle = Math.atan2(joystickPosition.y, joystickPosition.x);
      if (inputAngle < 0) {
        inputAngle += 2 * Math.PI;
      }
      const closestDirectionIndex = Array
        .from({ length: directionCount }, (_, index) => Math.abs(inputAngle - index * 2 * Math.PI / directionCount))
        .reduce((acc, val, index, arr) => val < arr[acc] ? index : acc, 0);

      const currentDirectionIndex = selectedItem % directionCount;
      if (closestDirectionIndex !== currentDirectionIndex) {
        const prevRing = Math.floor((selectedItem - directionCount / 2) / directionCount);
        const spotInPrevRing = prevRing * directionCount + closestDirectionIndex;
        const spotInNextRing = (prevRing + 1) * directionCount + closestDirectionIndex;
        const result = Math.abs(spotInPrevRing - selectedItem) < Math.abs(spotInNextRing - selectedItem)
          ? spotInPrevRing
          : spotInNextRing;
        setSelectedItem(Math.max(0, Math.min(result, itemCount - 1)));
      }
    }
  }, [joystickPosition, directionCount, selectedItem]);

  return (
    <>
      <div className="selector-container">
        {elements}
      </div>
      <EchoTitle />
      <div className="slider-container">
        {/* <PropertySlider value={circleSize} setValue={setCircleSize} label="Circle Size" min={1} max={500} step={10} /> */}
        <PropertySlider value={selectedItem} setValue={setSelectedItem} label="Selected Item" min={0} max={itemCount - 1} step={1} />
        <PropertySlider value={selectedItemRadius} setValue={setSelectedItemRadius} label="Selected Item Radius" min={1} max={500} step={10} />
        {/* <PropertySlider value={itemCount} setValue={setItemCount} label="Item Count" min={1} max={100} step={1} /> */}
        {/* <PropertySlider value={a} setValue={setA} label="a" min={0} max={20} step={0.01} isExponential={true} /> */}
        <PropertySlider value={b} setValue={setB} label="b" min={0} max={1} step={0.01} isExponential={true} />
        <PropertySlider value={directionCount} setValue={setDirectionCount} label="Direction Count" min={1} max={20} step={1} />
        <Joystick joystickPosition={joystickPosition} setJoystickPosition={setJoystickPosition} />
      </div>
    </>
  );
}