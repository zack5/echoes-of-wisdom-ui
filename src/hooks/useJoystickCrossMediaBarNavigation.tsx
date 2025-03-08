import { useJoystickNavigation, Axis } from "./useJoystickNavigation";

import { CrossMediaBarNavigationData } from "../utils/types";

export function useJoystickCrossMediaBarNavigation({
  joystickPosition,
  typeCounts,
  setCrossMediaBarNavigationData,
  useAcceleration = false,
  acceleration = 0,
  minStepDuration = 80,
}: {
  joystickPosition: { x: number, y: number },
  typeCounts: number[],
  setCrossMediaBarNavigationData: (navigationData: CrossMediaBarNavigationData | ((prev: CrossMediaBarNavigationData) => CrossMediaBarNavigationData)) => void,
  useAcceleration?: boolean,
  acceleration?: number,
  minStepDuration?: number,
}) {
  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(value, max));
  };

  const wrap = (value: number, min: number, max: number) => {
    const range = max - min;
    return min + ((((value - min) % range) + range) % range);
  };

  const onIncrement = (axis: Axis, change: number) => {
    setCrossMediaBarNavigationData((prev: CrossMediaBarNavigationData) => {
      if (axis === "x") {
        return {
          ...prev,
          columnIndex: clamp(prev.columnIndex + change, 0, typeCounts.length - 1),
        };
      } else {
        return {
          ...prev,
          typeIndexes: prev.typeIndexes.map(
            (value, i) => i === prev.columnIndex ? clamp(value + change, 0, typeCounts[i] - 1) : value),
        };
      }
    });
  };

  const onIncrementWithWrapping = (axis: Axis, change: number) => {
    setCrossMediaBarNavigationData((prev: CrossMediaBarNavigationData) => {
      if (axis === "x") {
        return {
          ...prev,
          columnIndex: wrap(prev.columnIndex + change, 0, typeCounts.length ),
        };
      } else {
        return {
          ...prev,
          typeIndexes: prev.typeIndexes.map(
            (value, i) => i === prev.columnIndex ? wrap(value + change, 0, typeCounts[i]) : value),
        };
      }
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
}
