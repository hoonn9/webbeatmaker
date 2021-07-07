import { useWorkstation } from '@contexts/WorkstationContext';
import { msToTime } from '@utils/time';
import React, { EventHandler, FocusEvent, useCallback, useState, VFC } from 'react';

interface Props {}

const Controller: VFC<Props> = ({}) => {
  const { ms, playing, play, pause, bpm: bpmState, changeBpm } = useWorkstation();

  const [bpm, setBpm] = useState<number | undefined>(bpmState);

  const onChangeBPM = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (!value) {
        setBpm(undefined);
        return;
      }
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
      if (!value) {
        setBpm(bpmState);
        return;
      }
      changeBpm(+value);
    },
    [changeBpm, bpmState],
  );

  return (
    <div className="flex h-1/6 w-full justify-center items-center bottom-0 bg-white">
      <div className="w-1/3">
        <p className="font-bold w-16 text-right mr-4 text-black text-4xl">{(ms < 0 ? 0 : msToTime(ms)).toFixed(2)}</p>
      </div>
      <div className="flex w-1/3 border border-black">
        <input
          className="text-5xl w-48 text-black"
          type="number"
          pattern="[0-9]+"
          onBlur={onBlurBPM}
          value={bpm}
          onChange={onChangeBPM}
        />
      </div>
      {playing ? (
        <button onClick={pause} className="w-1/3  focus:outline-none text-red-400 text-4xl">
          PAUSE
        </button>
      ) : (
        <button onClick={play} className="w-1/3 focus:outline-none text-green-300 text-4xl">
          PLAY
        </button>
      )}
    </div>
  );
};

export default Controller;
