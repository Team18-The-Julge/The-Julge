import { Item } from '@/apis/notice/notice.type';
import { useGetNoticeList } from '@/apis/notice/useNoticeService';
import Pagination from '@/components/feature/pagination/pagination';
import usePagination from '@/hooks/usePagination';

const ITEMS_PER_PAGE = 6; // 페이지 당 아이템 수

function PaginationSample() {
  const { currentPage, totalPages, onPageChange, currentItems } = usePagination(useGetNoticeList, ITEMS_PER_PAGE);
  return (
    <>
      <h1>Items</h1>
      <ul>
        {currentItems.map((post: Item) => (
          <li key={post.item.id}>{post.item.id}</li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </>
  );
}

export default PaginationSample;
