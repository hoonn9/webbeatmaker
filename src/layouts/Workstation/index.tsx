import React, { ChangeEvent, useCallback, useEffect, useMemo, useState, VFC } from 'react';
import Track from '@components/Track';
import { AudioSource, AudioSourceMap, Instrument, Kit } from '@typings/common.types';
import Controller from '@components/Controller';
import { DRUM_808, DRUM_DRAKE } from '@constants/sourceMaps/drum';
import Melody from '@components/Melody';
import TrackPanel from '@components/TrackPanel';
import { TrackContext } from '@contexts/TrackContext';

interface Props {}

type SelectKit = {
  index: number;
  name: string;
  audioSourceMap: AudioSourceMap;
};

const Workspace: VFC<Props> = () => {
  const createKit = (selectKit: SelectKit): Kit => {
    const instruments: Instrument[] = Object.entries(selectKit.audioSourceMap).map(([name, audioSource]) =>
      createInstrument(name, audioSource),
    );
    return {
      name: selectKit.name,
      instruments: instruments,
    };
  };

  const createInstrument = (name: string, audioSource: AudioSource): Instrument => {
    return {
      name: name,
      audio: audioSource,
    };
  };

  const kitList = useMemo(
    (): SelectKit[] => [
      {
        index: 0,
        name: 'Drake',
        audioSourceMap: DRUM_DRAKE,
      },
      {
        index: 1,
        name: '808',
        audioSourceMap: DRUM_808,
      },
    ],
    [],
  );

  const [selectedKit, setSelectedKit] = useState<SelectKit>(kitList[0]);

  const [kit, setKit] = useState<Kit>(createKit(selectedKit));

  useEffect(() => {
    setKit(createKit(selectedKit));
  }, [selectedKit]);

  const onChangeKit = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const seletedIndex = e.currentTarget.value;
      setSelectedKit(kitList[+seletedIndex]);
    },
    [kitList],
  );

  return (
    <div className="bg-black">
      <div className="h-1/6 text-2xl">
        <label className="mr-4">SELECT KIT</label>
        <select
          className="bg-black border-2 border-solid border-white p-2"
          value={selectedKit.index}
          onChange={onChangeKit}
        >
          {kitList.map((selectKit, index) => {
            return (
              <option key={index} value={index}>
                {selectKit.name}
              </option>
            );
          })}
        </select>
      </div>
      <TrackContext>
        <TrackPanel instruments={kit.instruments} />
      </TrackContext>
      <div className="flex h-2/6">
        <Melody
          instrument={{
            name: 'skimask',
            rate: 120,
            audio: {
              src: 'melody/pianos/skimask-piano',
              icon: 'melody/trap-piano',
            },
          }}
        />
      </div>

      <Controller />
    </div>
  );
};

export default Workspace;
