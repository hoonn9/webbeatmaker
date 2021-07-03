import { useWorkstation } from '@contexts/WorkstationContext';
import useAudio from '@hooks/useAudio';
import { Instrument } from '@typings/common.types';
import { Howl } from 'howler';
import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react';

interface Props {
  instrument: Instrument;
}

const Melody: VFC<Props> = ({ instrument: defaultInstrument }) => {
  const { playing, beatPosition, bpm } = useWorkstation();
  const [instrument, setInstrument] = useState({ ...defaultInstrument, rate: bpm / (defaultInstrument.rate || 120) });
  const { sound, iconUrl } = useAudio(instrument);

  const [on, setOn] = useState<boolean>(false);

  useEffect(() => {
    if (sound) {
      if (playing && on) {
        if (beatPosition === 0) {
          sound.stop();
          sound.play();
        }
      } else {
        sound.stop();
      }
    }
  }, [sound, playing, on, beatPosition]);

  useEffect(() => {
    if (sound) {
      sound.stop();
      setInstrument((prev) => {
        const temp = Object.assign({}, prev);
        temp.rate = bpm / (defaultInstrument.rate || 120);
        console.log(temp.rate);
        return temp;
      });
    }
  }, [bpm]);

  return (
    <div className="flex-1 w-full" style={{ maxWidth: '25%' }}>
      <div className="relative w-full h-full" onClick={() => setOn((prev) => !prev)}>
        {!on && <div className="absolute opacity-50 bg-black w-full h-full" />}
        <img className="w-full h-full object-cover" src={iconUrl} />
      </div>
    </div>
  );
};

export default Melody;
