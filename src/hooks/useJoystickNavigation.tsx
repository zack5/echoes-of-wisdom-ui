import { useEffect, useRef } from "react";

const INITIAL_DELAY = 430;
const REPEAT_RATE = 80;

export type Axis = "x" | "y";

export function useJoystickNavigation({
  joystickPosition,
  useAcceleration = false,
  acceleration = 0,
  minStepDuration = 80,
  onIncrement,
  onIncrementWithWrapping,
}: {
  joystickPosition: { x: number, y: number },
  useAcceleration?: boolean,
  acceleration?: number,
  minStepDuration?: number,
  onIncrement: (axis: Axis, change: number) => void,
  onIncrementWithWrapping: (axis: Axis, change: number) => void,
}) {
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const axisRef = useRef<Axis>("x");
  const isHoldingRef = useRef(0);

  const getAxis = () => {
    return Math.abs(joystickPosition.y) > Math.abs(joystickPosition.x) ? "y" : "x";
  };

  const startIncrement = (axis: Axis) => {
    onIncrementWithWrapping(axis, isHoldingRef.current);
    let currentRepeatRate = REPEAT_RATE;

    timeoutRef.current = setTimeout(() => {
      if (isHoldingRef.current) {
        const tick = () => {
          onIncrement(axis, isHoldingRef.current);
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
  }, [joystickPosition]);
}
