import React, { useEffect, useState, VFC } from 'react';
import { Instrument } from '@classes/Instrument';
import { AudioSourceMap, DrumSource, Kit } from '@classes/Drum';

interface Props {}

const drum808: AudioSourceMap = {
  kick: {
    src: './audios/drums/808/kick.wav',
  },
  closeHH: {
    src: './audios/drums/808/closeHH.wav',
  },
  openHH: {
    src: './audios/drums/808/openHH.wav',
  },
  snare: {
    src: './audios/drums/808/snare.wav',
  },
  clap: {
    src: './audios/drums/808/clap.wav',
  },
};

const barLength = 16;
const beatPerBar = 4;
const splitBeat = 4;

const Workspace: VFC<Props> = () => {
  const [kit, setKit] = useState<Kit>(new Kit(drum808, barLength));

  useEffect(() => {}, []);
  return (
    <div>
      work
      {kit.instruments.map((inst) => {
        return (
          <div>
            <label>{inst.name}</label>
            {inst.sounds.map((sound) => {
              return <button onClick={() => sound.play()}>클릭</button>;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Workspace;
