import { createContext, useContext, useState, useEffect } from 'react';

interface NavigationContextType {
  joystickPosition: { x: number, y: number };
  setJoystickPosition: (joystickPosition: { x: number, y: number }) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

const JOYSTICK_MOVE_RADIUS = 50;

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "d") {
        setJoystickPosition({ x: JOYSTICK_MOVE_RADIUS, y: 0 });
      } else if (event.key === "ArrowLeft" || event.key === "a") {
        setJoystickPosition({ x: -JOYSTICK_MOVE_RADIUS, y: 0 });
      } else if (event.key === "ArrowUp" || event.key === "w") {
        setJoystickPosition({ x: 0, y: -JOYSTICK_MOVE_RADIUS });
      } else if (event.key === "ArrowDown" || event.key === "s") {
        setJoystickPosition({ x: 0, y: JOYSTICK_MOVE_RADIUS });
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowLeft" 
        || event.key === "ArrowUp" || event.key === "ArrowDown"
        || event.key === "d" || event.key === "a" || event.key === "w" || event.key === "s")
      {
        setJoystickPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <NavigationContext.Provider value={{ joystickPosition, setJoystickPosition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}