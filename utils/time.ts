export const msToTime = (ms: number) => {
  const now_sec = ms / 1000;
  const sec = now_sec % 60;
  return sec;
};

export const getMsByBpm = (bpm: number) => {
  return (60 / bpm) * 10000;
};
