import { RefObject, useState } from 'react';

import styles from '@/components/feature/NotificationModal/NotificationModal.module.scss';
import { ReactComponent as Close } from '@/public/svgs/closeButton.svg';

import NotificationModalCard from './NotificationModalCard/NotificationModalCard';

// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { usePutAlert } from '@/apis/alert/useAlertService';

type NotificationModalProps = {
  alertCount: number;
  alertList: {
    shop: string;
    shopId: string;
    result: string;
    createdAt: string;
    startsAt: string;
    workhour: number;
    id: string;
  }[];
  isModalShow: boolean;
  filterRef?: RefObject<HTMLDivElement>;
};

export default function NotificationModal({ alertCount, alertList, isModalShow, filterRef }: NotificationModalProps) {
  const [modalClose, setModlaClose] = useState(false);
  console.log(alertList, 'alertList');
  return (
    isModalShow &&
    !modalClose && (
      <section className={styles.container} ref={filterRef}>
        <div>
          <p>알림 {alertCount}개</p>
          <Close onClick={() => setModlaClose(true)} />
        </div>

        {alertList.map((item) => (
          <NotificationModalCard
            key={item.shop}
            shop={item.shop}
            shopId={item.shopId}
            result={item.result as 'accepted' | 'rejected'}
            createdAt={item.createdAt}
            startsAt={item.startsAt}
            workhour={item.workhour}
            id={item.id}
          />
        ))}
      </section>
    )
  );
}
