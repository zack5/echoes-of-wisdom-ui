import { createContext, useContext, useState, useMemo, useEffect, useRef } from 'react';
import { useEchoesData } from './ContextEchoes';
import { SortType } from '../utils/types';

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
  sortType: SortType;
  setSortType: (sortType: SortType | ((prev: SortType) => SortType)) => void;
}

const SelectorContext = createContext<SelectorContextType | null>(null);

export function SelectorProvider({ children }: { children: React.ReactNode }) {
  const echoes = useEchoesData();
  if (!echoes) {
    return null;
  }

  const sortFunctions = {
    [SortType.LastUsed]: (a: string, b: string) => echoes[a].lastUsed - echoes[b].lastUsed,
    [SortType.MostUsed]: (a: string, b: string) => echoes[b].timesUsed - echoes[a].timesUsed,
    [SortType.LastLearned]: (a: string, b: string) => echoes[a].lastLearned - echoes[b].lastLearned,
    [SortType.Cost]: (a: string, b: string) => echoes[b].cost - echoes[a].cost,
    [SortType.Type]: (a: string, b: string) => echoes[a].startingOrder - echoes[b].startingOrder,
  }

  const [itemCount, setItemCount] = useState<number>(Object.keys(echoes).length);
  const [itemScale, setItemScale] = useState<number>(1);
  const [selectedItemRadius, setSelectedItemRadius] = useState<number>(240);
  const [b, setB] = useState<number>(0.09);
  const [directionCount, setDirectionCount] = useState<number>(12);
  const [acceleration, setAcceleration] = useState<number>(0.15);
  const [minStepDuration, setMinStepDuration] = useState<number>(10);
  const [sortType, setSortType] = useState<SortType>(SortType.Type);
  const sortedEchoIds = useRef(useMemo(() => Object.keys(echoes).sort(sortFunctions[sortType]), [echoes, sortType]));
  const [selectedEchoId, setSelectedEchoId] = useState<string>(() => sortedEchoIds.current[0]);
  
  function getEchoIndex(echoId: string) {
    return sortedEchoIds.current.indexOf(echoId);
  }

  function getEchoId(index: number) {
    return sortedEchoIds.current[index];
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "y") {
        setSortType((prev) => {
          const values = Object.values(SortType);
          const currentIndex = values.indexOf(prev);
          const nextIndex = (currentIndex + 1) % values.length;
          const result = values[nextIndex];
          sortedEchoIds.current = Object.keys(echoes).sort(sortFunctions[result]);
          setSelectedEchoId(sortedEchoIds.current[0]);
          return result;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
      sortedEchoIds: sortedEchoIds.current,
      getEchoIndex,
      getEchoId,
      sortType,
      setSortType,
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