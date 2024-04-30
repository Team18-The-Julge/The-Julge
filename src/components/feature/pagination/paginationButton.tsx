import classNames from 'classnames';
import React from 'react';

import styles from '@/components/feature/pagination/pagination.module.scss';
import { ReactComponent as Left } from '@/public/svgs/leftChevron.svg';
import { ReactComponent as Right } from '@/public/svgs/rightChevron.svg';

type PaginationButtonProps = {
  currentPage: number;
  totalPages: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (pageNumber: number) => void;
  direction: 'prev' | 'next';
};
function PaginationButton({ currentPage, totalPages, onPageChange, direction }: PaginationButtonProps) {
  const handleClick = () => {
    if (direction === 'prev') {
      onPageChange(currentPage - 1);
    } else if (direction === 'next') {
      onPageChange(currentPage + 1);
    }
  };
  const buttonClass = classNames({
    [styles.disable]:
      (direction === 'prev' && currentPage === 1) || (direction === 'next' && currentPage === totalPages)
  });
  return (
    <div>
      <button type="button" className={buttonClass} onClick={handleClick}>
        {direction === 'prev' ? <Left /> : <Right />}
      </button>
    </div>
  );
}

export default PaginationButton;
