export const letterSentRecent = (SentTime: string) => {
  const sentDate = new Date(SentTime);
  const nowDate = new Date();

  const diffMinutes = (nowDate.getTime() - sentDate.getTime()) / 1000 / 60;
  return diffMinutes <= 5;
};