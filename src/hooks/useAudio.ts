import { Instrument } from '@typings/common.types';
import { Howl } from 'howler';
import { useEffect, useMemo, useState } from 'react';

interface Result {
  sound?: Howl;
  iconUrl?: string;
}

const useAudio = (instrument: Instrument): Result => {
  const [audio, setAudio] = useState<string>();
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    const load = async () => {
      const audio = await import(`@assets/audios/${instrument.audio.src}.mp3`);
      if (audio?.default) {
        setAudio(audio.default);
      }

      if (instrument.audio.icon) {
        const icon = await import(`@assets/images/${instrument.audio.icon}.png`);
        if (icon?.default) {
          setIcon(icon.default);
        }
      }
    };
    load();
  }, [instrument]);

  const sound = useMemo(() => {
    if (audio) {
      const sound = new Howl({
        src: [audio],
      });

      if (instrument.rate) {
        sound.rate(instrument.rate);
      }
      return sound;
    }
  }, [audio, instrument.rate]);

  return {
    sound,
    iconUrl: icon,
  };
};

export default useAudio;
