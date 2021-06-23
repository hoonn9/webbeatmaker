import { useTrackState } from '@contexts/TrackContext';
import { Beat } from '@typings/common.types';
import React, { useCallback, useMemo, VFC } from 'react';

interface Props {
  index: number;
  beat: Beat;
  onClickBeatPad: (index: number) => void;
}

const BeatPad: VFC<Props> = ({ index, beat, onClickBeatPad }) => {
  const { splitBeat } = useTrackState();

  const render = useMemo(() => {
    if (beat.trigger) {
      if (index % (4 * splitBeat) === 0) {
        return <button className="bg-blue-300 flex-1 border-l-2 border-black" onClick={() => onClickBeatPad(index)} />;
      }
      return <button className="bg-blue-300 flex-1" onClick={() => onClickBeatPad(index)} />;
    } else {
      if (index % (4 * splitBeat) === 0) {
        return <button className="bg-white flex-1 border-l-2 border-black" onClick={() => onClickBeatPad(index)} />;
      }
      return <button className="bg-white flex-1" onClick={() => onClickBeatPad(index)} />;
    }
  }, [beat.trigger, index, splitBeat]);

  return <div className="w-8 flex border">{render}</div>;
};

export default BeatPad;
