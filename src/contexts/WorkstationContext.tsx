import useInterval from '@hooks/useInterval';
import { getMsByBpm } from '@utils/time';
import React, { createContext, FC, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

interface ContextProps {
  ms: number;
  bpm: number;
  barLength: number;
  splitBeat: number;
  msByBpm: number;
  changeBpm: (value: number) => void;
  changeBarLength: (value: number) => void;
  changeSplitBeat: (value: number) => void;
  playing: boolean;
  beatPosition: number;
  play: () => void;
  pause: () => void;
}

const Context = createContext<ContextProps | undefined>(undefined);

const DEFAULT_BPM = 120;
const DEFAULT_BAR_LENGTH = 16;
const DEFAULT_SPLIT_BEAT = 4;

interface Props {}

export const WorkstationContext: FC<Props> = ({ children }) => {
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
      if (beatPosition === barLength * splitBeat - 1) {
        setBeatPosition(0);
        setMs(0);
      } else {
        setBeatPosition((prev) => prev + 1);
      }
    },
    playing ? msByBpm : null,
  );

  const play = useCallback(() => {
    setPlaying(true);
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

  const playingRef = useRef(playing);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  const onPressSpacebar = useCallback((event: KeyboardEvent) => {
    const { code } = event;
    if (code === 'Space') {
      if (playingRef.current) {
        pause();
      } else {
        play();
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keypress', onPressSpacebar);
    return () => window.removeEventListener('keypress', onPressSpacebar);
  }, []);

  return (
    <Context.Provider
      value={{
        ms: ms,
        bpm: bpm,
        barLength: barLength,
        splitBeat: splitBeat,
        msByBpm: msByBpm,
        changeBpm: changeBpm,
        changeBarLength: changeBarLength,
        changeSplitBeat: changeSplitBeat,
        playing: playing,
        beatPosition: beatPosition,
        pause: pause,
        play: play,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useWorkstation = () => {
  const state = useContext(Context);
  if (!state) {
    throw new Error('Track context provider not found');
  }
  return state;
};
