import { useTrackState } from '@contexts/TrackContext';
import { Beat } from '@typings/common.types';
import React, { useMemo, VFC } from 'react';
import PadOff from '@assets/pad-off.png';
import PadOn from '@assets/pad-on.png';

// const PadOff = require('@assets/pad-off.png');

interface Props {
  index: number;
  beat: Beat;
  onClickBeatPad: (index: number) => void;
}

const BeatPad: VFC<Props> = ({ index, beat, onClickBeatPad }) => {
  const { barLength, splitBeat } = useTrackState();

  const render = useMemo(() => {
    if (beat.trigger) {
      return (
        <button className="bg-blue-300 flex-1" onClick={() => onClickBeatPad(index)}>
          <img className="w-full h-full object-fill" src={PadOn} />
        </button>
      );
    } else {
      return (
        <button className="bg-white flex-1" onClick={() => onClickBeatPad(index)}>
          <img className="w-full h-full object-fill" src={PadOff} />
        </button>
      );
    }
  }, [beat.trigger, index, splitBeat]);

  return <div className="w-4 h-8 flex mx-2">{render}</div>;
};

export default BeatPad;
