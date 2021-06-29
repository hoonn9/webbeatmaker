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
    <div className="flex justify-center items-center absolute bottom-0 w-full">
      <div className="flex w-auto bg-blue-300 py-1 px-2 rounded-t-xl">
        <div className="font-bold border w-16 text-right mr-4">{(ms < 0 ? 0 : msToTime(ms)).toFixed(2)}</div>
        <div>
          <label>BPM</label>
          <input
            className="text-3xl text-black"
            type="number"
            pattern="[0-9]+"
            onBlur={onBlurBPM}
            value={bpm}
            onChange={onChangeBPM}
          />
        </div>
        <div>
          {playing ? (
            <button onClick={stop} className="w-8 h-8 focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          ) : (
            <button onClick={play} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          )}
          <button onClick={pause} className="focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Controller;
