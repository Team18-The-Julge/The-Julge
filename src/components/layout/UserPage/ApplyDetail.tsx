import React, { useState } from 'react';

import { GetApplicationListRes } from '@/apis/application/application.type';
import Button from '@/components/common/Button/Button';
import EmployeeTable from '@/components/feature/Notice/EmployeeTable/EmployeeTable';
import StatusChip from '@/components/feature/Notice/StatusChip/StatusChip';
import styles from '@/components/layout/UserPage/ApplyDetail.module.scss';

type NoticeListData = {
  applicationData: GetApplicationListRes;
  onClickList: () => void;
};

function ApplyDetail({ applicationData, onClickList }: NoticeListData) {
  console.log('확인용 111111', applicationData);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(applicationData.count / itemsPerPage - 1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = applicationData.items.slice(startIndex, endIndex);

  const applicationDataItems = currentItems.map((notice) => ({
    id: notice.item.id,
    store: notice.item.shop?.item?.name,
    date: notice.item.createdAt,
    hourlyPay: notice.item.notice?.item?.hourlyPay,
    status: <StatusChip status={notice.item.status} />
  }));

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <div>
      {applicationData.count === 0 ? (
        <div className={styles.container}>
          <div className={styles.wrapper}>
            <div className={styles.applycationEmpty}>아직 신청 내역이 없어요.</div>
            <Button className={styles.applycationButton} solid size="large" active onClick={onClickList}>
              공고 보러가기
            </Button>
          </div>
        </div>
      ) : (
        <div className={styles.tableContainer}>
          <EmployeeTable
            applicationList={applicationDataItems}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
}

export default ApplyDetail;
