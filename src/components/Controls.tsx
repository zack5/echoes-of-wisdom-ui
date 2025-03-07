import { useLocation } from "react-router-dom";

import { useEffect, useState } from "react";
import { useNavigationData } from "../contexts/ContextNavigation";

import Joystick from "./Joystick";

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

  function triggerButton(button: string) {
    const event = new KeyboardEvent("keydown", { key: button });
    document.dispatchEvent(event);
  }

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
              <button onClick={() => triggerButton("Q")}>Q</button>
            </div>
            <div className="keyboard-control-instructions">
              <p>Tab right:</p>
              <button onClick={() => triggerButton("E")}>E</button>
            </div>
            <div className="keyboard-control-instructions">
              <p>Sort:</p>
              <button onClick={() => triggerButton("Y")} disabled={!canSort}>Y</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}