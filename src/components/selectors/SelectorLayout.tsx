import { useNavigationData } from "../ContextNavigation";

import Joystick from "../Joystick";
import GameScreen from "../GameScreen";

export default function SelectorLayout({ settingsElements, menuElements }
  : { settingsElements: React.ReactNode, menuElements: React.ReactNode }) {

  const navigationData = useNavigationData();
  if (!navigationData) {
    return null;
  }

  const { joystickPosition, setJoystickPosition } = navigationData;
  return (
    <div className="selector-layout">
      <div className="selector-sidepanel">
        <div className="controls-container">
          <h2>Controls</h2>
          <div className="joystick-container">
            <Joystick joystickPosition={joystickPosition} setJoystickPosition={setJoystickPosition} />
          </div>
        </div>
        <div className="slider-container">
          <h2>Settings</h2>
          {settingsElements}
        </div>
      </div>
      <GameScreen>
        {menuElements}
      </GameScreen>
    </div>
  );
}