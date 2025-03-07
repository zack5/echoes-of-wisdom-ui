import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { useNavigationData } from "../contexts/ContextNavigation";

import Joystick from "./Joystick";
import KeyButton from "./KeyButton";
export default function Controls() {
  const navigationData = useNavigationData();
  if (!navigationData) {
    return null;
  }
  const { joystickPosition, setJoystickPosition } = navigationData;
  const [canSort, setCanSort] = useState(true);
  const pathname = useLocation().pathname;

  useEffect(() => {
    setCanSort(!!document.querySelector(".sort-display"));
  }, [pathname]);

  return (

    <div className="controls-container">
      <h2>Controls</h2>
      <div className="controls-title-container">
        <span>Move with arrow keys, WASD, or virtual joystick.</span>
        <div className="virtual-controls">
          <div className="joystick-container">
            <Joystick joystickPosition={joystickPosition} setJoystickPosition={setJoystickPosition} />
          </div>
          <div className="keyboard-control-instructions-container">
            <div className="keyboard-control-instructions">
              <p>Tab left:</p>
              <KeyButton action="q" />
            </div>
            <div className="keyboard-control-instructions">
              <p>Tab right:</p>
              <KeyButton action="e" />
            </div>
            <div className="keyboard-control-instructions">
              <p>Sort:</p>
              <KeyButton action="y" disabled={!canSort} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}