import { useEffect, useState } from 'react';

export default function usePagination(totalItems: number, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 위치
  // 전체 페이지 = (전체 카드 개수 / 한 페이지에 보여주는 카드 개수)의 올림수
  const totalPages: number = Math.ceil(totalItems / itemsPerPage);

  // 페이지 위치 변경
  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };

  const startIndex: number = (currentPage - 1) * itemsPerPage;
  const endIndex: number = startIndex + itemsPerPage;
  useEffect(() => {
    setCurrentPage(1);
  }, [totalItems]); // totalItems가 변경될 때마다 currentPage를 1로 초기화

  return {
    currentPage,
    totalPages,
    onPageChange,
    startIndex,
    endIndex
  };
}
