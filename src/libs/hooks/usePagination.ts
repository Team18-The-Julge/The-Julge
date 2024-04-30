import { useEffect, useState } from 'react';

import { Item } from '@/apis/notice/notice.type';

/**
 * Pagination 컴포넌트
 * @param apifunction 사용할 api 함수 => items 불러와야할 api 함수 작성
 * @param itemsPerPage 한 페이지에 보여줄 post 개수]
 * @
 * @return currentPage: number;  현재 페이지
 * @return totalPages: number; 총 페이지 개수
 * @return onPageChange: (page: number) => void; pagechange 함수
 * @return currentItems: Array<any>; 반환하는 데이터 리스트
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function usePagination(apifunction: any, itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState<number>(1); // 현재 페이지 위치
  const [offsetNum, setOffsetNum] = useState<number>(0);

  const { data } = apifunction({ limit: itemsPerPage, offset: offsetNum });

  const totalItem = data.count;
  const totalPages: number = Math.ceil(totalItem / itemsPerPage);
  useEffect(() => {
    setOffsetNum((currentPage - 1) * itemsPerPage);
  }, [currentPage, data.items, itemsPerPage]);

  // 페이지 위치 변경
  const onPageChange = (page: number): void => {
    setCurrentPage(page);
  };
  const dataList = data.items.map((item: Item) => {
    return item.item;
  });
  return {
    currentPage,
    totalPages,
    onPageChange,
    currentItems: dataList
  };
}
