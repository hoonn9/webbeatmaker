import useInterval from '@hooks/useInterval';
import React, { createContext, FC, useCallback, useContext, useState } from 'react';

interface ContextProps {
  ms: number;
  bpm: number;
  barLength: number;
  splitBeat: number;
  changeBpm: (value: number) => void;
  changeBarLength: (value: number) => void;
  changeSplitBeat: (value: number) => void;
  playing: boolean;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

const beatPerBar = 4;
const splitBeat = 4;
const DEFAULT_BPM = 60;
const DEFAULT_BAR_LENGTH = 4;
const DEFAULT_SPLIT_BEAT = 2;

interface Props {}

export const TrackContext: FC<Props> = ({ children }) => {
  const [ms, setMs] = useState<number>(-100);
  const [delay, setDelay] = useState<number>(1);
  const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
  const [barLength, setBarLength] = useState<number>(DEFAULT_BAR_LENGTH);
  const [splitBeat, setSplitBeat] = useState<number>(DEFAULT_SPLIT_BEAT);

  const [playing, setPlaying] = useState(false);

  useInterval(
    () => {
      setMs((time) => time + delay);
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
    setMs(-delay);
    setPlaying(false);
  }, []);

  const changeBpm = useCallback((value: number) => {
    if (value <= 0) {
      return;
    }
    setBpm(value);
  }, []);

  const changeBarLength = useCallback((value: number) => {
    if (value <= 0 || value > 4) {
      return;
    }
    setBarLength(value);
  }, []);

  const changeSplitBeat = useCallback((value: number) => {
    if (value <= 0 || value > 4) {
      return;
    }
    setSplitBeat(value);
  }, []);

  return (
    <Context.Provider
      value={{
        ms: ms,
        bpm: bpm,
        barLength: barLength,
        splitBeat: splitBeat,
        changeBpm: changeBpm,
        changeBarLength: changeBarLength,
        changeSplitBeat: changeSplitBeat,
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
