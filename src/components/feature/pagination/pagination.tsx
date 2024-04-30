import styles from '@/components/feature/pagination/pagination.module.scss';
import PaginationButton from '@/components/feature/pagination/paginationButton';

type PaginationType = {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
};

/**
 * Pagination 컴포넌트
 * @param currentPage 현재 페이지
 * @param totalPages 전체 페이지 수
 * @param onPageChange 현재 페이지 usestate에 저장하는 함수: onPageChange(저장할 페이지번호)
 */
function Pagination({ currentPage, totalPages, onPageChange }: PaginationType) {
  // 페이지 그룹 계산
  const handleClick = (page: number) => {
    onPageChange(page);
  };
  const groupStart = Math.floor((currentPage - 1) / 7) * 7 + 1;
  const groupEnd = Math.min(groupStart + 6, totalPages);

  return (
    <article className={styles.pagination}>
      {/* 이전 페이지 버튼 */}
      {totalPages > 7 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          direction="prev"
        />
      )}
      <ul className={styles.page}>
        {/* 페이지 번호 버튼 */}
        {/* 배열 길이  groupEnd - groupStart + 1 */}
        {Array.from({ length: groupEnd - groupStart + 1 }, (_, i) => i + groupStart).map((page) => (
          <li key={page}>
            <button type="button" id={currentPage === page ? styles.select : ''} onClick={() => handleClick(page)}>
              {page}
            </button>
          </li>
        ))}
      </ul>
      {/* 다음 페이지 버튼 */}
      {totalPages > 7 && (
        <PaginationButton
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          direction="next"
        />
      )}
    </article>
  );
}

export default Pagination;
