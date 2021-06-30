import React, { ChangeEvent, useCallback, useEffect, useMemo, useState, VFC } from 'react';
import Track from '@components/Track';
import { AudioSource, AudioSourceMap, Instrument, Kit } from '@typings/common.types';
import Controller from '@components/Controller';
import { useTrackState } from '@contexts/TrackContext';

interface Props {}

const drum808: AudioSourceMap = {
  kick: {
    src: 'drums/808/kick',
    icon: 'drum/kick',
  },
  snare: {
    src: 'drums/808/snare',
  },
  closeHH: {
    src: 'drums/808/closeHH',
  },
  openHH: {
    src: 'drums/808/openHH',
  },
  clap: {
    src: 'drums/808/clap',
  },
  bass: {
    src: 'drums/808/bass',
  },
};

const drumDrill: AudioSourceMap = {
  kick: {
    src: 'drums/drill/kick',
  },
  snare: {
    src: 'drums/drill/snare',
  },
  hihat: {
    src: 'drums/drill/hihat',
  },
  clap: {
    src: 'drums/drill/clap',
  },
};

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
        name: '808',
        audioSourceMap: drum808,
      },
      {
        index: 1,
        name: 'drill',
        audioSourceMap: drumDrill,
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
      <div className="overflow-scroll scrollbar scrollbar-track-gray-500 scrollbar-thumb-gray-500">
        {kit.instruments.map((inst) => {
          return <Track instrument={inst} />;
        })}
      </div>
      <div className="text-2xl">
        <label className="mr-4">SELECT KIT</label>
        <select
          className="bg-black border-2 border-solid border-white p-2"
          value={selectedKit.index}
          onChange={onChangeKit}
        >
          {kitList.map((selectKit, index) => {
            return <option value={index}>{selectKit.name}</option>;
          })}
        </select>
      </div>
      <Controller />
    </div>
  );
};

export default Workspace;
