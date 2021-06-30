import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { Beat, Instrument, Sound } from '@typings/common.types';
import { Howl } from 'howler';
import BeatPad from './BeatPad';
import { useTrackState } from '@contexts/TrackContext';

interface Props {
  instrument: Instrument;
}

const Track: VFC<Props> = ({ instrument }) => {
  const { playing, beatPosition, barLength, splitBeat } = useTrackState();
  const [audio, setAudio] = useState<string>();
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    const load = async () => {
      const audio = await import(`@assets/audios/${instrument.audio.src}.wav`);
      if (audio?.default) {
        setAudio(audio.default);
      }

      console.log(instrument.audio.icon);
      if (instrument.audio.icon) {
        const icon = await import(`@assets/images/${instrument.audio.icon}.png`);
        console.log(icon);
        if (icon?.default) {
          setIcon(icon.default);
        }
      }
    };
    load();
  }, [instrument]);

  const sound = useMemo(() => {
    if (audio) {
      const sound: Sound = new Howl({
        src: [audio],
      });
      return sound;
    }
  }, [audio]);

  const [beats, setBeats] = useState<Beat[]>();

  useEffect(() => {
    if (sound) {
      console.log('sound change', sound);
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

      setBeats((prev) => {
        const temp = [...(prev as Beat[])];
        temp[index].trigger = !temp[index].trigger;
        return temp;
      });
    },
    [beats],
  );

  if (!beats) {
    return <div>...loading</div>;
  }

  return (
    <div className="w-full flex">
      <div className="w-20 flex-shrink-0">
        {icon ? (
          <img className="w-8 h-8" src={icon} />
        ) : (
          <label className="w-32 inline-block font-bold text-xl">{instrument.name}</label>
        )}
      </div>
      <div className="flex flex-1">
        {beats.map((beat, index) => {
          return <BeatPad key={index} index={index} beat={beat} onClickBeatPad={onClickBeatPad} />;
        })}
      </div>
    </div>
  );
};

export default Track;
