import { createContext, useContext, useState, useMemo } from 'react';
import { useEchoesData } from './ContextEchoes';

interface SelectorContextType {
  itemCount: number;
  setItemCount: (itemCount: number | ((prev: number) => number)) => void;
  itemScale: number;
  setItemScale: (itemScale: number | ((prev: number) => number)) => void;
  selectedEchoId: string;
  setSelectedEchoId: (selectedEchoId: string | ((prev: string) => string)) => void;
  selectedItemRadius: number;
  setSelectedItemRadius: (selectedItemRadius: number | ((prev: number) => number)) => void;
  b: number; // "spiral factor", b in golden spiral formula
  setB: (b: number | ((prev: number) => number)) => void;
  directionCount: number;
  setDirectionCount: (directionCount: number | ((prev: number) => number)) => void;
  acceleration: number;
  setAcceleration: (acceleration: number | ((prev: number) => number)) => void;
  minStepDuration: number;
  setMinStepDuration: (minStepDuration: number | ((prev: number) => number)) => void;
  sortedEchoIds: string[];
  getEchoIndex: (echoId: string) => number;
  getEchoId: (index: number) => string;
}

const SelectorContext = createContext<SelectorContextType | null>(null);

export function SelectorProvider({ children }: { children: React.ReactNode }) {
  const echoes = useEchoesData();
  if (!echoes) {
    return null;
  }

  const [itemCount, setItemCount] = useState<number>(Object.keys(echoes).length);
  const [itemScale, setItemScale] = useState<number>(1);
  const [selectedItemRadius, setSelectedItemRadius] = useState<number>(240);
  const [b, setB] = useState<number>(0.09);
  const [directionCount, setDirectionCount] = useState<number>(12);
  const [acceleration, setAcceleration] = useState<number>(0.15);
  const [minStepDuration, setMinStepDuration] = useState<number>(10);
  const sortedEchoIds = useMemo(() => Object.keys(echoes), [echoes, /* Sorting condition goes here */]);
  const [selectedEchoId, setSelectedEchoId] = useState<string>(() => sortedEchoIds[0]);
  
  function getEchoIndex(echoId: string) {
    return sortedEchoIds.indexOf(echoId);
  }

  function getEchoId(index: number) {
    return sortedEchoIds[index];
  }

  return (
    <SelectorContext.Provider value={{
      itemCount,
      setItemCount,
      itemScale,
      setItemScale,
      selectedEchoId,
      setSelectedEchoId,
      selectedItemRadius,
      setSelectedItemRadius,
      b,
      setB,
      directionCount,
      setDirectionCount,
      acceleration,
      setAcceleration,
      minStepDuration,
      setMinStepDuration,
      sortedEchoIds: sortedEchoIds,
      getEchoIndex,
      getEchoId,
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