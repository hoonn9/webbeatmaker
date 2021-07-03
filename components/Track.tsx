import React, { useCallback, useEffect, useState, VFC } from 'react';
import { Beat, Instrument } from '@typings/common.types';
import BeatPad from './BeatPad';
import { useWorkstation } from '@contexts/WorkstationContext';
import useAudio from '@hooks/useAudio';
import { PadInputMethod, useTrack } from '@contexts/TrackContext';

interface Props {
  instrument: Instrument;
}

const Track: VFC<Props> = ({ instrument }) => {
  const { playing, beatPosition, barLength, splitBeat } = useWorkstation();
  const { setPadInputMethod } = useTrack();

  const { sound, iconUrl } = useAudio(instrument);
  const [beats, setBeats] = useState<Beat[]>();

  useEffect(() => {
    if (sound) {
      setBeats(
        Array.from({ length: barLength * splitBeat }, () => ({
          trigger: false,
          sound: sound,
        })),
      );
    }
  }, [sound]);

  useEffect(() => {
    if (beats && playing) {
      if (beats.length > beatPosition) {
        if (beats[beatPosition].trigger) {
          console.log(beatPosition);
          beats[beatPosition].sound.play();
        }
      }
    }
  }, [beats, playing, beatPosition]);

  const onClickBeatPad = useCallback(
    (index: number) => {
      if (!beats) {
        return;
      }
      const beat = beats[index];

      if (!beat.trigger) {
        beat.sound.play();
      }

      if (beats[index].trigger) {
        setPadInputMethod('remove');
      } else {
        setPadInputMethod('write');
      }

      setBeats((prev) => {
        const temp = [...(prev as Beat[])];
        temp[index].trigger = !temp[index].trigger;
        return temp;
      });
    },
    [beats],
  );

  const onMoveBeatPad = useCallback(
    (index: number, method: PadInputMethod) => {
      if (!beats) {
        return;
      }
      const beat = beats[index];

      if (beat.trigger && method === 'remove') {
        setBeats((prev) => {
          const temp = [...(prev as Beat[])];
          temp[index].trigger = false;
          return temp;
        });
      } else if (!beat.trigger && method === 'write') {
        beat.sound.play();
        setBeats((prev) => {
          const temp = [...(prev as Beat[])];
          temp[index].trigger = true;
          return temp;
        });
      }
    },
    [beats],
  );

  if (!beats) {
    return <div>...loading</div>;
  }

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

export default Track;
