import { useNavigationData } from "../ContextNavigation";

import Joystick from "../Joystick";
import GameScreen from "../GameScreen";

export default function SelectorLayout( { settingsElements, menuElements }
  : { settingsElements: React.ReactNode, menuElements: React.ReactNode }) {
    
  const navigationData = useNavigationData();
  if (!navigationData) {
    return null;
  }
  
  const { joystickPosition, setJoystickPosition } = navigationData;
  return (
    <div className="selector-controller">
      <div className="slider-container">
        {settingsElements}
        <Joystick joystickPosition={joystickPosition} setJoystickPosition={setJoystickPosition} />
      </div>
      <GameScreen>
        {menuElements}
      </GameScreen>
    </div>
  );
}