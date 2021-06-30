import useInterval from '@hooks/useInterval';
import { getMsByBpm } from '@utils/time';
import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useState } from 'react';

interface ContextProps {
  ms: number;
  bpm: number;
  barLength: number;
  splitBeat: number;
  changeBpm: (value: number) => void;
  changeBarLength: (value: number) => void;
  changeSplitBeat: (value: number) => void;
  playing: boolean;
  beatPosition: number;
  play: () => void;
  stop: () => void;
  pause: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

const DEFAULT_BPM = 60;
const DEFAULT_BAR_LENGTH = 16;
const DEFAULT_SPLIT_BEAT = 4;

interface Props {}

export const TrackContext: FC<Props> = ({ children }) => {
  const [delay, setDelay] = useState<number>(10);
  const [ms, setMs] = useState<number>(-delay);
  const [bpm, setBpm] = useState<number>(DEFAULT_BPM);
  const [barLength, setBarLength] = useState<number>(DEFAULT_BAR_LENGTH);
  const [splitBeat, setSplitBeat] = useState<number>(DEFAULT_SPLIT_BEAT);
  const [playing, setPlaying] = useState(false);
  const [beatPosition, setBeatPosition] = useState<number>(0);

  const msByBpm = useMemo(() => {
    return +(getMsByBpm(bpm) / splitBeat).toFixed(0);
  }, [bpm, splitBeat]);

  useInterval(
    () => {
      setMs((time) => time + delay);
    },
    playing ? delay : null,
  );

  useInterval(
    () => {
      setBeatPosition((prev) => prev + 1);
    },
    playing ? msByBpm : null,
  );

  const play = useCallback(() => {
    setPlaying(true);
  }, [msByBpm]);

  const stop = useCallback(() => {
    setPlaying(false);
  }, []);

  const pause = useCallback(() => {
    setPlaying(false);
    setMs(0);
    setBeatPosition(0);
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
        beatPosition: beatPosition,
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
