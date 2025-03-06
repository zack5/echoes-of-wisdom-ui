import { createContext, useContext } from 'react';

import data from '/data/echoes.json';
import { EchoData } from '../utils/types';
const EchoesContext = createContext(null);

interface JsonData {
  category: string;
  cost: number;
  name: string;
  type: string;
}

export function EchoesProvider({ children }: { children: React.ReactNode }) {
  const echoes = data.reduce((result: Record<string, EchoData>, echo: JsonData) => {
    result[echo.name] = {
      category: echo.category,
      cost: echo.cost,
      image: `src/assets/echoes/128px-EoW_${echo.name.replace(/ /g, "_")}_Icon.png`,
      name: echo.name,
      type: echo.type,
    };
    return result;
  }, {});

  return (
    <EchoesContext.Provider value={echoes}>
      {children}
    </EchoesContext.Provider>
  );
}


export function useEchoesData() : Record<string, EchoData> {
  return useContext(EchoesContext) || {};
}