import { Beat } from '@typings/common.types';
import React, { VFC } from 'react';

interface Props {
  index: number;
  beat: Beat;
  onClickBeatPad: (index: number) => void;
}

const BeatPad: VFC<Props> = ({ index, beat, onClickBeatPad }) => {
  return (
    <div className="w-16 flex border">
      {beat.trigger ? (
        <button className="bg-blue-300 flex-1" onClick={() => onClickBeatPad(index)} />
      ) : (
        <button className="bg-blue-600 flex-1" onClick={() => onClickBeatPad(index)} />
      )}
    </div>
  );
};

export default BeatPad;
