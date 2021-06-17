export interface AudioSource {
  src: string;
}

export interface Sound {
  play: () => void;
}

export type Beat = {
  name: string;
  sound: Sound;
};
