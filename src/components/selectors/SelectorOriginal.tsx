import { useEffect, useRef } from "react";

import { useNavigationData } from "../ContextNavigation";
import { useSelectorData } from "../ContextSelector";
import EchoTitle from "../EchoTitle";
import SelectorLayout from "../SelectorLayout";
import SelectorOptionOriginal from "../selector_options/SelectorOptionOriginal";
import { WIDTH, HEIGHT } from "../selector_options/SelectorOptionConstants";

const INITIAL_DELAY = 430;
const REPEAT_RATE = 80;

export default function SelectorOriginal() {
  const navigationData = useNavigationData();
  const selectorData = useSelectorData();
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const isHoldingRef = useRef(0) // -1: holding left, 0: not held, 1: holding right
  if (!selectorData || !navigationData) {
    return null;
  }

  const { joystickPosition } = navigationData;
  const { itemCount, selectedItem, setSelectedItem } = selectorData;

  const increment = () => {
    setSelectedItem((prev) => {
      const next = prev + isHoldingRef.current;
      const clamped = Math.max(0, Math.min(next, itemCount - 1));
      return clamped;
    });
  }

  const visibleWindow = 20;
  const elements = Array.from({ length: itemCount }, (_, index) => index)
    .map((index) => (
      <SelectorOptionOriginal key={index} index={index} />
    ))
    .filter((_, index) => Math.abs(index - selectedItem) <= visibleWindow / 2);

  const startIncrement = () => {
    increment();

    timeoutRef.current = window.setTimeout(() => {
      if (isHoldingRef.current) {
        intervalRef.current = window.setInterval(() => {
          increment();
        }, REPEAT_RATE);
      }
    }, INITIAL_DELAY);
  }

  const stopIncrement = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (intervalRef.current) window.clearInterval(intervalRef.current);
  }

  useEffect(() => {
    if (isHoldingRef.current != Math.sign(joystickPosition.x)) {
      isHoldingRef.current = 0;
      stopIncrement();
    }

    if (Math.abs(joystickPosition.x) > 0) {
      if (!isHoldingRef.current) {
        isHoldingRef.current = Math.sign(joystickPosition.x);
        startIncrement();
      }
    } else {
      if (isHoldingRef.current) {
        isHoldingRef.current = 0;
        stopIncrement();
      }
    }

    return () => {
      if (joystickPosition && Math.abs(joystickPosition.x) <= 0) {
        stopIncrement();
      }
    }
  }, [joystickPosition, setSelectedItem]);

  const menuElements = (
    <>
      {elements}
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

  return (
    <SelectorLayout settingsElements={null} menuElements={menuElements} />
  )
}