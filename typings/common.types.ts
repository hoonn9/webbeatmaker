import { Howl } from 'howler';

export interface AudioSource {
  src: string;
  icon?: string;
}

// export interface Sound {
//   play: () => void;
// }

export type Beat = {
  trigger: boolean;
  sound: Howl;
};

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

export type Instrument = {
  name: string;
  rate?: number;
  audio: AudioSource;
};

export type Kit = {
  name: string;
  instruments: Instrument[];
};
