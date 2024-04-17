// import { ReactComponent as Left } from '@/public/svgs/leftChevron.svg';
// import { ReactComponent as Right } from '@/public/svgs/rightChevron.svg';

import styles from './pagination.module.scss';

type PaginationType = {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

/* Pagination 컴포넌트
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지 수
 * @param onPageChange 현재 페이지 usestate에 저장하는 함수: onPageChange(페이지번호)
 */
function Pagination({ currentPage, totalPages, onPageChange }: PaginationType) {
  // 페이지 그룹 계산
  const groupStart = Math.floor((currentPage - 1) / 7) * 7 + 1;
  const groupEnd = Math.min(groupStart + 6, totalPages);

  return (
    <article className={styles.pagination}>
      {/* 이전 페이지 버튼 */}
      {totalPages > 7 && (
        <div>
          <button
            type="button"
            className={currentPage === 1 ? styles.disable : ''}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt;
          </button>
          {/* <Left /> */}
        </div>
      )}
      <ul className={styles.page}>
        {/* 페이지 번호 버튼 */}
        {/* 배열 길이  groupEnd - groupStart + 1 */}
        {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => i + groupStart).map((page) => (
          <li key={page}>
            <button type="button" id={currentPage === page ? styles.select : ''} onClick={() => onPageChange(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
      {/* 다음 페이지 버튼 */}
      {totalPages > 7 && (
        <div>
          <button
            type="button"
            className={currentPage === totalPages ? styles.disable : ''}
            onClick={() => onPageChange(currentPage + 1)}
          >
            &gt;
          </button>
          {/* <Right /> */}
        </div>
      )}
    </article>
  );
}

export default Pagination;
