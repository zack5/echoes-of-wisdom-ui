import { createContext, useContext, useState } from 'react';

interface SelectorContextType {
  itemCount: number;
  setItemCount: (itemCount: number) => void;
  circleSize: number;
  setCircleSize: (circleSize: number) => void;
  selectedItem: number;
  setSelectedItem: (selectedItem: number) => void;
  selectedItemRadius: number;
  setSelectedItemRadius: (selectedItemRadius: number) => void;
  a: number;
  setA: (a: number) => void;
  b: number;
  setB: (b: number) => void;
  directionCount: number;
  setDirectionCount: (directionCount: number) => void;
}

const SelectorContext = createContext<SelectorContextType | null>(null);

export function SelectorProvider({ children }: { children: React.ReactNode }) {
  const [itemCount, setItemCount] = useState<number>(100);
  const [circleSize, setCircleSize] = useState<number>(12);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [selectedItemRadius, setSelectedItemRadius] = useState<number>(200);
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(0.15);
  const [directionCount, setDirectionCount] = useState<number>(12);

  return (
    <SelectorContext.Provider value={{
      itemCount,
      setItemCount,
      circleSize,
      setCircleSize,
      selectedItem,
      setSelectedItem,
      selectedItemRadius,
      setSelectedItemRadius,
      a,
      setA,
      b,
      setB,
      directionCount,
      setDirectionCount
    }}>
      <>
        {children}
      </>
    </SelectorContext.Provider>
  );
}

export function useSelectorData() {
  return useContext(SelectorContext);
}