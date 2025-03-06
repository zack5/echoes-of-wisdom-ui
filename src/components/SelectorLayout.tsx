import { useNavigationData } from "./ContextNavigation";

import Joystick from "./Joystick";
import GameScreen from "./GameScreen";

export default function SelectorLayout({ parametersElements, menuElements }
  : { parametersElements: React.ReactNode | null, menuElements: React.ReactNode }) {

  const navigationData = useNavigationData();
  if (!navigationData) {
    return null;
  }

  const hasSettingsElements = parametersElements !== null;

  const { joystickPosition, setJoystickPosition } = navigationData;
  return (
    <div className="selector-layout">
      <div className="selector-sidepanel">
        <div className="controls-container">
          <div className="controls-title-container">
            <h2>Controls</h2>
            <p>Use arrow keys or virtual joystick.</p>
          </div>
          <div className="joystick-container">
            <Joystick joystickPosition={joystickPosition} setJoystickPosition={setJoystickPosition} />
          </div>
        </div>
        <div className="slider-container">
          {hasSettingsElements && (
            <>
              <h2>Parameters</h2>
              {parametersElements}
            </>
          )}
        </div>
      </div>
      <GameScreen>
        {menuElements}
      </GameScreen>
    </div>
  );
}