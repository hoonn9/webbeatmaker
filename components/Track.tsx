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

  const sound = useMemo(() => {
    const sound: Sound = new Howl({
      src: [instrument.audio.src],
    });
    return sound;
  }, []);

  const [beats, setBeats] = useState<Beat[]>(
    Array.from({ length: barLength * 4 * splitBeat }, () => ({
      trigger: false,
      sound: sound,
    })),
  );

  const msByBpm = useMemo(() => {
    return +(getMsByBpm(bpm) / (4 * splitBeat)).toFixed(0);
  }, [bpm]);
  /**
   * bpm 60 => 1초에 1번
   * ms / 1000 => 1beat
   */

  useEffect(() => {
    if (playing && ms % msByBpm === 0) {
      const beatPosition = ms / msByBpm;
      if (beats.length > beatPosition) {
        if (beats[beatPosition].trigger) {
          beats[beatPosition].sound.play();
        }
      }
    }
  }, [ms, beats]);

  const onClickBeatPad = useCallback(
    (index: number) => {
      const beat = beats[index];
      console.log(index, beat);
      if (!beat.trigger) {
        beat.sound.play();
      }
      setBeats((prev) => {
        const temp = [...prev];
        temp[index].trigger = !temp[index].trigger;
        return temp;
      });
    },
    [beats],
  );

  return (
    <div className="w-full flex h-16">
      <div>
        <label className="w-32 inline-block font-bold text-xl">{instrument.name}</label>
      </div>
      <div className="flex w-full">
        {beats.map((beat, index) => {
          if (index % (4 * splitBeat) === 0) {
            return (
              <>
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
