import { AudioSource } from '@typings/common.types';
import { Instrument } from './Instrument';

export interface DrumSource {
  kick: AudioSource;
  closeHH: AudioSource;
  openHH: AudioSource;
  snare: AudioSource;
  clap: AudioSource;
}

export interface AudioSourceMap {
  [name: string]: AudioSource;
}

interface KitImpl {
  instruments: Instrument[];
}

export class Kit implements KitImpl {
  instruments: Instrument[];
  constructor(audioSources: AudioSourceMap, barLength: number) {
    this.instruments = Object.entries(audioSources).map((e) => {
      const [name, audio] = e;
      audio.src;
      return new Instrument(name, audio, barLength);
    });
  }
}
