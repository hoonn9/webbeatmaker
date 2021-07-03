import { useWorkstation } from '@contexts/WorkstationContext';
import { Beat } from '@typings/common.types';
import React, { useCallback, useMemo, VFC } from 'react';
import PadOff from '@assets/pad-off.png';
import PadOn from '@assets/pad-on.png';
import { PadInputMethod, useTrack } from '@contexts/TrackContext';

// const PadOff = require('@assets/pad-off.png');

interface Props {
  index: number;
  beat: Beat;
  onClickBeatPad: (index: number) => void;
  onMoveBeatPad: (index: number, method: PadInputMethod) => void;
}

const BeatPad: VFC<Props> = ({ index, beat, onClickBeatPad, onMoveBeatPad }) => {
  const { splitBeat } = useWorkstation();
  const { padInputMethod, setPadInputMethod } = useTrack();

  const splitClassName = useMemo(() => {
    if (index % splitBeat === 0) {
      return 'border-l-2';
    }
  }, [index, splitBeat]);

  const onMouseMove = useCallback(() => {
    if (padInputMethod) {
      onMoveBeatPad(index, padInputMethod);
    }
  }, [padInputMethod]);

  const onMouseUp = useCallback(() => {
    setPadInputMethod(null);
  }, []);

  const render = useMemo(() => {
    if (beat.trigger) {
      return (
        <button
          draggable={false}
          className={`bg-blue-300 w-full h-full ${splitClassName}`}
          onPointerDown={onClickBeatPad.bind(this, index)}
          onPointerUp={onMouseUp}
        >
          <img className="w-full h-full object-fill" src={PadOn} draggable={false} />
        </button>
      );
    } else {
      return (
        <button
          draggable={false}
          className={`bg-white border w-full h-full ${splitClassName}`}
          onPointerDown={onClickBeatPad.bind(this, index)}
          onPointerUp={onMouseUp}
        />
      );
    }
  }, [beat.trigger, index, splitBeat]);

  return (
    <div
      draggable={false}
      onMouseMove={onMouseMove}
      onTouchMove={onMouseMove}
      className="flex-shrink-0"
      style={{ width: 24, height: 32 }}
    >
      {render}
    </div>
  );
};

export default BeatPad;
