import useInterval from '@hooks/useInterval';
import React, { createContext, FC, useCallback, useContext, useState } from 'react';

interface ContextProps {
  ms: number;
  bpm: number;
  playing: boolean;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

const beatPerBar = 4;
const splitBeat = 4;
const bpm = 60;
const maxBpm = 150;

interface Props {}
export const TrackContext: FC<Props> = ({ children }) => {
  const [ms, setMs] = useState<number>(-100);
  const [delay, setDelay] = useState<number>(100);
  const [playing, setPlaying] = useState(false);

  useInterval(
    () => {
      setMs((time) => time + 100);
    },
    playing ? delay : null,
  );

  const play = useCallback(() => {
    setPlaying(true);
  }, []);

  const stop = useCallback(() => {
    setPlaying(false);
  }, []);

  const pause = useCallback(() => {
    setMs(-100);
    setPlaying(false);
  }, []);

  return (
    <Context.Provider
      value={{
        ms: ms,
        bpm: bpm,
        playing: playing,
        pause: pause,
        stop: stop,
        play: play,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useTrackState = () => {
  const state = useContext(Context);
  if (!state) {
    throw new Error('Track context provider not found');
  }
  return state;
};
