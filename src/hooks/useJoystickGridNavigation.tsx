import { useEffect, useState } from "react";
import { SortType } from "../utils/types";

import { useJoystickNavigation, Axis } from "./useJoystickNavigation";

export function useJoystickGridNavigation({
  joystickPosition,
  itemCount,
  setIndex,
  numRows = itemCount,
  numColumns = 1,
  useAcceleration = false,
  acceleration = 0,
  minStepDuration = 80,
  sortType,
}: {
  joystickPosition: { x: number, y: number },
  itemCount: number,
  setIndex: (index: number | ((index: number) => number)) => void,
  numRows?: number,
  numColumns?: number,
  useAcceleration?: boolean,
  acceleration?: number,
  minStepDuration?: number,
  sortType?: SortType,
}) {
  const [hasMounted, setHasMounted] = useState(false);

  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max));
  };

  const wrap = (value: number, min: number, max: number) => {
    const range = max - min;
    return min + ((((value - min) % range) + range) % range);
  };

  const getCoords = (index: number) => {
    const row = Math.floor(index / numColumns);
    const col = index % numColumns;
    return { row, col };
  };

  const getIndex = (row: number, col: number) => {
    return row * numColumns + col;
  };

  const onIncrement = (axis: Axis, change: number) => {
    setIndex(index => {
      const { row, col } = getCoords(index);
      
      let nextIndex = index;
      if (axis === "x") {
        nextIndex = getIndex(row, clamp(col + change, 0, numColumns - 1));
        nextIndex = clamp(nextIndex, 0, itemCount - 1);
      } else {
        nextIndex = getIndex(clamp(row + change, 0, numRows - 1), col);
        if (nextIndex >= itemCount) nextIndex -= numColumns;
        nextIndex = clamp(nextIndex, 0, itemCount - 1);
      }

      return nextIndex;
    });
  };

  const onIncrementWithWrapping = (axis: Axis, change: number) => {
    setIndex(index => {
      const { row, col } = getCoords(index);

      let nextIndex = index;
      if (axis === "x") {
        nextIndex = getIndex(row, wrap(col + change, 0, numColumns));
        if (nextIndex >= itemCount) {
          if (change < 0) nextIndex = itemCount - 1;
          else nextIndex = getIndex(row, 0);
        }
      } else {
        nextIndex = getIndex(wrap(row + change, 0, numRows), col);
        if (nextIndex >= itemCount) {
          if (change < 0) nextIndex = getIndex(numRows - 2, col);
          else {
            if (nextIndex < numRows * numColumns) nextIndex = itemCount - 1;
            else nextIndex = getIndex(0, col);
          }
        }
      }

      return nextIndex;
    });
  };

  useJoystickNavigation({
    joystickPosition,
    useAcceleration,
    acceleration,
    minStepDuration,
    onIncrement,
    onIncrementWithWrapping,
  });

  useEffect(() => {
    if (!hasMounted) {
      setHasMounted(true);
      return;
    }
    setIndex(0);
  }, [sortType]);
}
