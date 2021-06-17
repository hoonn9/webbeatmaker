import { AudioSource, Sound } from '@typings/common.types';
import { Howl } from 'howler';

export class Instrument {
  sounds: Sound[];
  constructor(public name: string, audio: AudioSource, length: number) {
    this.sounds = new Array(length).fill(
      new Howl({
        src: [audio.src],
      }),
    );
  }
}
