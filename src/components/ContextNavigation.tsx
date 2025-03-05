import { createContext, useContext, useState } from 'react';

interface NavigationContextType {
  joystickPosition: { x: number, y: number };
  setJoystickPosition: (joystickPosition: { x: number, y: number }) => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

  return (
    <NavigationContext.Provider value={{ joystickPosition, setJoystickPosition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigationData() {
  return useContext(NavigationContext);
}