import React, { useCallback, useEffect, useState, VFC } from 'react';
import { Beat, Instrument } from '@typings/common.types';
import BeatPad from './BeatPad';
import { useWorkstation } from '@contexts/WorkstationContext';
import useAudio from '@hooks/useAudio';
import { PadInputMethod, useTrack } from '@contexts/TrackContext';
import { cloneDeep } from 'lodash';
interface Props {
  instrument: Instrument;
}

const Track: VFC<Props> = ({ instrument }) => {
  const { playing, beatPosition, barLength, splitBeat } = useWorkstation();
  const { setPadInputMethod } = useTrack();

  const { sound, iconUrl } = useAudio(instrument);
  const [beats, setBeats] = useState<Beat[]>([]);

  useEffect(() => {
    if (sound) {
      setBeats([]);
      setBeats((prev) => {
        prev.forEach((beat) => {
          beat.sound.unload();
        });
        return Array.from({ length: barLength * splitBeat }, () => ({
          trigger: false,
          sound: sound,
        }));
      });
    }
  }, [sound]);

  useEffect(() => {
    if (playing) {
      if (beats.length > beatPosition) {
        if (beats[beatPosition].trigger) {
          beats[beatPosition].sound.play();
        }
      }
    }
  }, [beats, playing, beatPosition]);

  const onClickBeatPad = useCallback(
    (index: number) => {
      if (!beats[index].trigger) {
        beats[index].sound.play();
      }

      if (beats[index].trigger) {
        setPadInputMethod('remove');
      } else {
        setPadInputMethod('write');
      }

      setBeats((prev) => {
        const temp = cloneDeep(prev);
        temp[index].trigger = !temp[index].trigger;
        return temp;
      });
    },
    [beats],
  );

  const onMoveBeatPad = useCallback(
    (index: number, method: PadInputMethod) => {
      const beat = beats[index];

      if (beat.trigger && method === 'remove') {
        setBeats((prev) => {
          const temp = cloneDeep(prev);
          temp[index].trigger = false;
          return temp;
        });
      } else if (!beat.trigger && method === 'write') {
        beat.sound.play();
        setBeats((prev) => {
          const temp = cloneDeep(prev);
          temp[index].trigger = true;
          return temp;
        });
      }
    },
    [beats],
  );

  return (
    <div className="w-full flex">
      <div className="w-20 flex-shrink-0">
        {iconUrl ? (
          <img className="w-8 h-8" src={iconUrl} />
        ) : (
          <label className="w-32 inline-block font-bold text-xl">{instrument.name}</label>
        )}
      </div>
      <div className="flex flex-1">
        {beats.map((beat, index) => {
          return (
            <BeatPad
              key={index}
              index={index}
              beat={beat}
              onClickBeatPad={onClickBeatPad}
              onMoveBeatPad={onMoveBeatPad}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(Track);
