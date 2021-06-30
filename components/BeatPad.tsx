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
  const { splitBeat } = useTrackState();

  const splitClassName = useMemo(() => {
    if (index % splitBeat === 0) {
      return 'border-l-2';
    }
  }, [index, splitBeat]);

  const render = useMemo(() => {
    if (beat.trigger) {
      return (
        <button className={`bg-blue-300 w-full h-full ${splitClassName}`} onClick={() => onClickBeatPad(index)}>
          <img className="w-full h-full object-fill" src={PadOn} />
        </button>
      );
    } else {
      return (
        <button className={`bg-white border w-full h-full ${splitClassName}`} onClick={() => onClickBeatPad(index)} />
      );
    }
  }, [beat.trigger, index, splitBeat]);

  return (
    <div className="flex-shrink-0" style={{ width: 24, height: 32 }}>
      {render}
    </div>
  );
};

export default BeatPad;
