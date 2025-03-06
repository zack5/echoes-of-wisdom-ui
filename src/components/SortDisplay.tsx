import { useSelectorData } from "../contexts/ContextSelector";

import sortBackground from "../assets/textures/sort-background.png";
import { SortType } from "../utils/types";
export default function SortDisplay({ extraStyles = {} }: { extraStyles?: React.CSSProperties }) {
  const selectorData = useSelectorData();
  if (!selectorData) {
    return null;
  }

  const currentSortType = selectorData.sortType;

  const elements = Object.values(SortType).map((sortType, index) => {
    return (
      <div className={sortType === currentSortType ? "pip pip-selected" : "pip"} key={index} />
    )
  })

  return (
    <div className="sort-display-container" style={extraStyles}>
      <div className="sort-display">
        <div className="sort-display-option">{currentSortType}</div>
        <div className="sort-display-pips">{elements}</div>
        <img src={sortBackground} alt="sort-background" />
      </div>
    </div>
  )
}