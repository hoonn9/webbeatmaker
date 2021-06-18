import React, { useState, VFC } from 'react';
import Track from '@components/Track';
import { AudioSource, AudioSourceMap, Beat, Instrument, Kit } from '@typings/common.types';
import Controller from '@components/Controller';

interface Props {}

const drum808: AudioSourceMap = {
  kick: {
    src: './audios/drums/808/kick.wav',
  },
  snare: {
    src: './audios/drums/808/snare.wav',
  },
  closeHH: {
    src: './audios/drums/808/closeHH.wav',
  },
  openHH: {
    src: './audios/drums/808/openHH.wav',
  },
  clap: {
    src: './audios/drums/808/clap.wav',
  },
};

const barLength = 32;
const beatPerBar = 4;
const splitBeat = 4;
const bpm = 60;
const maxBpm = 150;

const Workspace: VFC<Props> = () => {
  const createKit = (audioSourceMap: AudioSourceMap): Kit => {
    const instruments: Instrument[] = Object.entries(audioSourceMap).map(([name, audioSource]) =>
      createInstrument(name, audioSource),
    );
    return {
      instruments: instruments,
    };
  };

  const createInstrument = (name: string, audioSource: AudioSource): Instrument => {
    return {
      name: name,
      audio: audioSource,
      length: barLength,
    };
  };

  const [kit, setKit] = useState<Kit>(createKit(drum808));

  return (
    <div>
      <div className="overflow-scroll">
        {kit.instruments.map((inst) => {
          return <Track instrument={inst} />;
        })}
      </div>
      <Controller />
    </div>
  );
};

export default Workspace;
