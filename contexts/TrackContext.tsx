import useInterval from '@hooks/useInterval';
import { getMsByBpm } from '@utils/time';
import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type PadInputMethod = 'write' | 'remove';

interface ContextProps {
  padInputMethod: PadInputMethod | null;
  setPadInputMethod: React.Dispatch<React.SetStateAction<PadInputMethod | null>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

interface Props {}

export const TrackContext: FC<Props> = ({ children }) => {
  const [padInputMethod, setPadInputMethod] = useState<PadInputMethod | null>(null);

  return <Context.Provider value={{ padInputMethod, setPadInputMethod }}>{children}</Context.Provider>;
};

export const useTrack = () => {
  const state = useContext(Context);
  if (!state) {
    throw new Error('Track context provider not found');
  }
  return state;
};
