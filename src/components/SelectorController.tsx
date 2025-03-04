import SelectorOption from "../components/SelectorOption";
import { useSelectorData } from "../components/ContextSelector";
import PropertySlider from "../components/PropertySlider";

export default function Selector() {
  const selectorData = useSelectorData();
  if (!selectorData) {
    return null;
  }

  const { itemCount, setItemCount, circleSize, setCircleSize, selectedItem, setSelectedItem, selectedItemRadius, setSelectedItemRadius, a, setA, b, setB, directionCount, setDirectionCount } = selectorData;

  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOption key={index} index={index} />
    ));

  return (
    <>
      <div className="selector-container">
        {elements}
      </div>
      <div className="slider-container">
        {/* <PropertySlider value={circleSize} setValue={setCircleSize} label="Circle Size" min={1} max={500} step={10} /> */}
        <PropertySlider value={selectedItem} setValue={setSelectedItem} label="Selected Item" min={0} max={itemCount - 1} step={1} />
        <PropertySlider value={selectedItemRadius} setValue={setSelectedItemRadius} label="Selected Item Radius" min={1} max={500} step={10} />
        <PropertySlider value={itemCount} setValue={setItemCount} label="Item Count" min={1} max={100} step={1} />
        {/* <PropertySlider value={a} setValue={setA} label="a" min={0} max={20} step={0.01} isExponential={true} /> */}
        <PropertySlider value={b} setValue={setB} label="b" min={0} max={1} step={0.01} isExponential={true} />
        <PropertySlider value={directionCount} setValue={setDirectionCount} label="Direction Count" min={1} max={20} step={1} />
      </div>
    </>
  );
}