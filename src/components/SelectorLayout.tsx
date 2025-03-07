import Controls from "./Controls";
import GameScreen from "./GameScreen";

export default function SelectorLayout({ parametersElements, menuElements, useMask = false }
  : { parametersElements: React.ReactNode | null, menuElements: React.ReactNode, useMask?: boolean }) {
  const hasSettingsElements = parametersElements !== null;

  return (
    <div className="selector-layout">
      <div className="selector-sidepanel">
        <Controls />
        <div className="slider-container">
          {hasSettingsElements && (
            <>
              <h2>Parameters</h2>
              {parametersElements}
            </>
          )}
        </div>
      </div>
      <GameScreen useMask={useMask}>
        {menuElements}
      </GameScreen>
    </div>
  );
}