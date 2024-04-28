import Pagination from '@/components/feature/Pagination/Pagination';
import usePagination from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 6; // 페이지 당 아이템 수
// 임시로 목업 데이터를 불러왔기 때문에 이후 수정이 필요할 것
// data -> card data / totalItems -> 전체 card 개수
function PaginationSample({ data, totalItems }: { data: string[]; totalItems: number }) {
  /*
   * currentPage 현재 페이지 (usestate 사용)
   * totalPages 전체 페이지 수
   * onPageChange 현재 페이지 usestate에 저장하는 함수: onPageChange(페이지번호)
   * startIndex, endIndex 보여지는 card 범위 지정 ex(0~6까지/7~12까지)
   */
  const { currentPage, totalPages, onPageChange, startIndex, endIndex } = usePagination(totalItems, ITEMS_PER_PAGE);
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Items</h1>
      <ul>
        {currentItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
}

// 목업 데이터 생성
export async function getStaticProps() {
  const totalItems = 100;
  const data = Array.from({ length: totalItems }, (_, i) => `Item ${i + 1}`);

  return {
    props: {
      data,
      totalItems
    }
  };
}
export default PaginationSample;
