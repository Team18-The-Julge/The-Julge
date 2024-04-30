export default function calculateMinutesAgo(time: string) {
  const givenTime: Date = new Date(time);
  const currentTime: Date = new Date();

  // 시간 차이 계산 - 밀리초 단위
  const diff = currentTime.getTime() - givenTime.getTime();

  // 밀리초를 분, 시, 일, 월, 년 단위로 변환
  const minutes = Math.floor(diff / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (minutes < 2) return '1 분 전';
  if (minutes < 60) return `${minutes} 분 전`;
  if (hours < 24) return hours === 1 ? '1 시간 전' : `${hours} 시간 전`;
  if (days < 31) return days === 1 ? '1 일 전' : `${days} 일 전`;
  if (months < 12) return months === 1 ? '1 달 전' : `${months} 달 전`;
  return years === 1 ? '1 year ago' : `${years} 년 전`;
}
