export const msToTime = (ms: number) => {
  const now_sec = ms / 1000;
  const sec = now_sec % 60;
  return sec;
};
