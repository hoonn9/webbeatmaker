import React, { useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { Beat, Instrument, Sound } from '@typings/common.types';
import { Howl } from 'howler';
import BeatPad from './BeatPad';
import { useTrackState } from '@contexts/TrackContext';
import { getMsByBpm } from '@utils/time';

interface Props {
  instrument: Instrument;
}

const Track: VFC<Props> = ({ instrument }) => {
  const { playing, ms, bpm, barLength, splitBeat } = useTrackState();
  const [audio, setAudio] = useState<any>();

  useEffect(() => {
    const load = async () => {
      const audio = await import(`@assets/audios/${instrument.audio.src}.wav`);
      if (audio?.default) {
        setAudio(audio.default);
      }
    };
    load();
  }, []);

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
      setBeats(
        Array.from({ length: barLength * splitBeat }, () => ({
          trigger: false,
          sound: sound,
        })),
      );
    }
  }, [sound]);

  const msByBpm = useMemo(() => {
    return +(getMsByBpm(bpm) / splitBeat).toFixed(0);
  }, [bpm]);
  /**
   * bpm 60 => 1초에 1번
   * ms / 1000 => 1beat
   */

  useEffect(() => {
    console.log(ms, msByBpm);

    if (beats && playing && ms % msByBpm === 0) {
      console.log(ms, msByBpm);
      const beatPosition = ms / msByBpm;
      console.log(beatPosition);
      if (beats.length > beatPosition) {
        if (beats[beatPosition].trigger) {
          beats[beatPosition].sound.play();
        }
      }
    }
  }, [ms, beats]);

  const onClickBeatPad = useCallback(
    (index: number) => {
      if (!beats) {
        return;
      }
      const beat = beats[index];
      console.log(index, beat);
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
    <div className="w-full flex h-16">
      <div>
        <label className="w-32 inline-block font-bold text-xl">{instrument.name}</label>
      </div>
      <div className="flex w-full">
        {beats.map((beat, index) => {
          if (index % splitBeat === 0) {
            return (
              <>
                <div className={` h-full bg-white w-px`} />
                <BeatPad key={index} index={index} beat={beat} onClickBeatPad={onClickBeatPad} />
              </>
            );
          }
          return <BeatPad key={index} index={index} beat={beat} onClickBeatPad={onClickBeatPad} />;
        })}
      </div>
    </div>
  );
};

export default Track;
