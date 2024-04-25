import styles from '@/components/common/Table/Table.module.scss';
import { NoticesColumn } from '@/components/common/Table/Table.type';
import Pagination from '@/components/feature/pagination/pagination';

interface TableProps<T> {
  data: T[];
  columns: NoticesColumn<T>[];
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

/**
 * Table 컴포넌트
 * @param data 불러올 데이터
 * @param colums EMPLOYER_COLUMNS or EMPLOYEE_COLUMNS 에 따라 cell 내용을 다르게 보여줍니다.
 * @param currentPage 현제페이지
 * @param totalPages 전체페이지 수
 * @param onPageChange 현재 페이지 usestate에 저장하는 함수: onPageChange(페이지번호)
 */

function Table<T extends { id: string }>({ data, columns, currentPage, totalPages, onPageChange }: TableProps<T>) {
  return (
    <div className={styles.container}>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => {
                return (
                  <th key={column.id as string}>
                    <span>{column.label}</span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              return (
                <tr key={item.id}>
                  {columns.map((column) => {
                    return (
                      <td key={column.id as string}>
                        <span>{item[column.id]}</span>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}

export default Table;
