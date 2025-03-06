import { useEffect } from "react";

import { useNavigationData } from "../ContextNavigation";
import { useSelectorData } from "../ContextSelector";
import EchoTitle from "../EchoTitle";
import PropertySlider from "../PropertySlider";
import SelectorLayout from "../SelectorLayout";
import SelectorOptionSpiral from "../selector_options/SelectorOptionSpiral";

export default function SelectorSpiral() {
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  if (!selectorData || !navigationData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const {
    itemCount,
    selectedItem, setSelectedItem,
    selectedItemRadius, setSelectedItemRadius,
    b, setB,
    directionCount, setDirectionCount,
    itemScale, setItemScale
  } = selectorData;

  const visibleWindow = directionCount * 3;
  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOptionSpiral key={index} index={index} />
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

  const parametersElements = (
    <>
      <PropertySlider
        value={selectedItemRadius}
        setValue={setSelectedItemRadius}
        label="Radius"
        min={1}
        max={500}
        step={10}
      />
      <PropertySlider
        value={itemScale}
        setValue={setItemScale}
        label="Item Scale"
        min={0.5}
        max={1.5}
        step={0.01}
      />
      <PropertySlider
        value={directionCount}
        setValue={setDirectionCount}
        label="Direction Count"
        min={1}
        max={20}
        step={1}
      />
      <PropertySlider value={b}
        setValue={setB}
        label="Spiral Factor"
        subLabel="'b' in formula r=a*e^(b*theta)"
        min={0}
        max={0.2}
        step={0.01}
      />
    </>
  )

  const menuElements = (
    <>
      {elements}
      <EchoTitle
        extraStyles={{
          bottom: "-430px",
        }
        } />
    </>
  )

  return (
    <SelectorLayout parametersElements={parametersElements} menuElements={menuElements} />
  )
}