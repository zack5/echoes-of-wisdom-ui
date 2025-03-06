import { createContext, useContext } from 'react';

import data from '/data/echoes.json';
import { EchoData } from '../utils/types';
const EchoesContext = createContext(null);

interface JsonData {
  name: string;
  cost: number;
}

export function EchoesProvider({ children }: { children: React.ReactNode }) {
  const echoes = data.map((entry: JsonData, index: number) => ({
    id: index,
    name: entry.name,
    image: `src/assets/echoes/128px-EoW_${entry.name.replace(/ /g, "_")}_Icon.png`,
    cost: entry.cost,
  }));

  return (
    <EchoesContext.Provider value={echoes}>
      {children}
    </EchoesContext.Provider>
  );
}


export function useEchoesData() : EchoData[] {
  return useContext(EchoesContext) || [];
}