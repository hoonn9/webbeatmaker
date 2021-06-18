export interface AudioSource {
  src: string;
}

export interface Sound {
  play: () => void;
}

export type Beat = {
  trigger: boolean;
  sound: Sound;
};

// interface KitImpl {
//   instruments: Instrument[];
// }

// export class Kit implements KitImpl {
//   instruments: Instrument[];
//   constructor(audioSources: AudioSourceMap, barLength: number) {
//     this.instruments = Object.entries(audioSources).map((e) => {
//       const [name, audio] = e;
//       return new Instrument(name, audio, barLength);
//     });
//   }
// }

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
  audio: AudioSource;
  length: number;
};

export type Kit = {
  instruments: Instrument[];
};
