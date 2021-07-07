import { Instrument } from '@typings/common.types';
import React, { useCallback, VFC } from 'react';
import Track from '@components/Track';
import { useTrack } from '@contexts/TrackContext';

interface Props {
  instruments: Instrument[];
}

const TrackPanel: VFC<Props> = ({ instruments }) => {
  const { setPadInputMethod } = useTrack();

  const onMouseLeave = useCallback(() => {
    setPadInputMethod(null);
  }, []);

  return (
    <div
      onMouseLeave={onMouseLeave}
      style={{ overflow: 'scroll' }}
      className="h-2/6 overflow-scroll scrollbar scrollbar-track-black scrollbar-thumb-gray-400"
    >
      {instruments.map((inst, index) => {
        return <Track key={index} instrument={inst} />;
      })}
    </div>
  );
};

export default TrackPanel;
