import { useEffect, useRef } from "react";

const INITIAL_DELAY = 430;
const REPEAT_RATE = 80;

type Axis = "x" | "y";

export function useJoystickGridNavigation({
  joystickPosition,
  itemCount,
  getEchoIndex,
  getEchoId,
  setSelectedEchoId,
  numRows = itemCount,
  numColumns = 1,
  useAcceleration = false,
  acceleration = 0,
  minStepDuration = 80,
}: {
  joystickPosition: { x: number, y: number },
  itemCount: number,
  getEchoIndex: (echoId: string) => number,
  getEchoId: (index: number) => string,
  setSelectedEchoId: (item: string | ((prev: string) => string)) => void,
  numRows?: number,
  numColumns?: number,
  useAcceleration?: boolean,
  acceleration?: number,
  minStepDuration?: number,
}) {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const axisRef = useRef<Axis>("x");
  const isHoldingRef = useRef(0);

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

  const getAxis = () => {
    return Math.abs(joystickPosition.y) > Math.abs(joystickPosition.x) ? "y" : "x";
  };

  const increment = (axis: Axis) => {
    setSelectedEchoId((prev) => {
      const prevIndex = getEchoIndex(prev);
      const change = isHoldingRef.current;
      const { row, col } = getCoords(prevIndex);
      
      let nextIndex = prevIndex;
      if (axis === "x") {
        nextIndex = getIndex(row, clamp(col + change, 0, numColumns - 1));
        nextIndex = clamp(nextIndex, 0, itemCount - 1);
      } else {
        nextIndex = getIndex(clamp(row + change, 0, numRows - 1), col);
        nextIndex = clamp(nextIndex, 0, itemCount - 1);
      }

      return getEchoId(nextIndex);
    });
  };

  const incrementWithWrapping = (axis: Axis) => {
    setSelectedEchoId((prev) => {
      const prevIndex = getEchoIndex(prev);
      const change = isHoldingRef.current;
      const { row, col } = getCoords(prevIndex);

      let nextIndex = prevIndex;
      if (axis === "x") {
        nextIndex = getIndex(row, wrap(col + change, 0, numColumns));
        if (nextIndex >= itemCount) nextIndex = getIndex(row, 0);
        return getEchoId(nextIndex);
      } else {
        nextIndex = getIndex(wrap(row + change, 0, numRows), col);
        if (nextIndex >= itemCount) {
          if (change < 0) nextIndex = getIndex(numRows - 2, col);
          else nextIndex = getIndex(0, col);
        }

        return getEchoId(nextIndex);
      }
    });
  };

  const startIncrement = (axis: Axis) => {
    incrementWithWrapping(axis);
    let currentRepeatRate = REPEAT_RATE;

    timeoutRef.current = setTimeout(() => {
      if (isHoldingRef.current) {
        const tick = () => {
          increment(axis);
          if (useAcceleration) {
            currentRepeatRate = Math.max(currentRepeatRate * (1 - acceleration), minStepDuration);
          }
          intervalRef.current = setTimeout(tick, currentRepeatRate);
        };
        tick();
      }
    }, INITIAL_DELAY);
  };

  const stopIncrement = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearTimeout(intervalRef.current);
  };

  useEffect(() => {
    const axis = getAxis();
    if (axis !== axisRef.current) {
      axisRef.current = axis;
      isHoldingRef.current = 0;
      stopIncrement();
    }

    if (isHoldingRef.current != Math.sign(joystickPosition[axis])) {
      isHoldingRef.current = 0;
      stopIncrement();
    }

    const movementThreshold = 30;
    if (joystickPosition.x**2 + joystickPosition.y**2 > movementThreshold**2) {
      if (!isHoldingRef.current) {
        isHoldingRef.current = Math.sign(joystickPosition[axisRef.current]);
        startIncrement(axisRef.current);
      }
    } else {
      if (isHoldingRef.current) {
        isHoldingRef.current = 0;
        stopIncrement();
      }
    }

    return () => {
      if (joystickPosition && Math.abs(joystickPosition[axisRef.current]) <= 0) {
        stopIncrement();
      }
    };
  }, [joystickPosition, setSelectedEchoId]);
}
