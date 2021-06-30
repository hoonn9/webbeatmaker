import { useTrackState } from '@contexts/TrackContext';
import { msToTime } from '@utils/time';
import React, { EventHandler, FocusEvent, useCallback, useState, VFC } from 'react';

interface Props {}

const Controller: VFC<Props> = ({}) => {
  const {
    ms,
    playing,
    play,
    pause,
    stop,
    bpm: bpmState,
    changeBpm,
    barLength: barLengthState,
    changeBarLength,
    splitBeat: splitBeatState,
    changeSplitBeat,
  } = useTrackState();

  const [bpm, setBpm] = useState<number>(bpmState);
  const [barLength, setBarLength] = useState<number>(barLengthState);

  const [splitBeat, setSplitBeat] = useState<number>(splitBeatState);

  const onChangeBPM = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const num = +value;
      if (typeof num !== 'number') {
        return;
      }
      setBpm(num);
    },
    [setBpm],
  );

  const onBlurBPM = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      changeBpm(+value);
    },
    [changeBpm],
  );

  return (
    <div className="flex justify-center items-center absolute bottom-0 w-full bg-white">
      <div className="flex-1">
        <p className="font-bold w-16 text-right mr-4 text-black text-5xl">{(ms < 0 ? 0 : msToTime(ms)).toFixed(2)}</p>
      </div>
      <div className="flex flex-1 border border-black">
        <input
          className="text-7xl w-48 text-black"
          type="number"
          pattern="[0-9]+"
          onBlur={onBlurBPM}
          value={bpm}
          onChange={onChangeBPM}
        />
      </div>
      {playing ? (
        <button onClick={stop} className="flex-1 w-full focus:outline-none text-red-400 text-5xl">
          STOP
        </button>
      ) : (
        <button onClick={play} className="flex-1 focus:outline-none text-green-300 text-5xl">
          PLAY
        </button>
      )}
      <button onClick={pause} className="flex-1 focus:outline-none text-gray-400 text-5xl">
        PAUSE
      </button>
    </div>
  );
};

export default Controller;
