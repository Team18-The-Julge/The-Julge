/**
 * 주어진 시작 시간과 근무 시간을 기반으로 새로운 종료 시간을 계산
 *
 * @param {string} duration ISO 8601 형식의 날짜와 시간 문자열
 * @param {number} workhour 추가할 근무 시간(시간 단위).
 * @returns {string} 새로운 종료 시간을 포함한 전체 시간 문자열을 반환 포맷: "YYYY-MM-DD HH:MM~HH:MM".
 *
 * @example
 * // 근무 시작 시간이 오전 9시이고, 8시간 근무하는 경우:
 * calcTimeWithWorkHours('2021-04-01T09:00:00', 8);
 * // => '2021-04-01 09:00~17:00'
 */

function calcFormatDuratoin(duration: string, workhour: number) {
  const date = duration.slice(0, 10);
  const time = duration.slice(11, 13);
  const minutes = duration.slice(14, 16);

  const numTime = Number(time);
  const worktimeAdded = numTime + workhour;

  const newTime = `${worktimeAdded % 24}:${minutes}`;

  return `${date} ${time}:${minutes}~${newTime} (${workhour}시간)`;
}

export default calcFormatDuratoin;
