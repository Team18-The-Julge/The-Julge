import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

import { GetAlertListRes } from '@/apis/alert/alert.type';
import styles from '@/components/common/Gnb/Gnb.module.scss';
import LogoutMenu from '@/components/feature/Gnb/Logout/Logout';
import Menu from '@/components/feature/Gnb/Menu/Menu';
import NotiButton from '@/components/feature/Gnb/Notification/Notification';
import Searchbar from '@/components/feature/Gnb/Searchbar/Searchbar';
import NotificationModal from '@/components/feature/NotificationModal/NotificationModal';

type Props = {
  alertList: GetAlertListRes;
  userType: 'employee' | 'employer' | 'guest';
};

type AlertFormat = {
  shop: string;
  result: string;
  createdAt: string;
  startsAt: string;
  workhour: number;
};

function Gnb({ userType, alertList }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formattedAlertList, setFormattedAlertList] = useState<AlertFormat[]>([]);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalFilterRef = useRef<HTMLDivElement>(null);
  const NotiStatus = alertList.count > 0;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);
  useEffect(() => {
    if (alertList && alertList.count > 0) {
      const formatAlertList = alertList.items.map((alert) => ({
        shop: alert.item.shop.item.name,
        result: alert.item.result,
        createdAt: alert.item.createdAt,
        startsAt: alert.item.notice.item.startsAt,
        workhour: alert.item.notice.item.workhour
      }));
      setFormattedAlertList(formatAlertList);
    }
  }, [alertList]);

  return (
    <div className={styles.gnbContainer}>
      <div className={styles.gnbWrapper}>
        <div className={styles.gnbSection}>
          <div className={styles.gnbLogo}>
            <Link href="/" passHref>
              <Image src="/svgs/logo.svg" alt=" logo" width={112} height={40} />
            </Link>
          </div>
          <div className={styles.gnbSearchbar}>
            <Searchbar />
          </div>
          {userType === 'guest' && (
            <div className={styles.gnbMenu}>
              <Menu name="로그인" id="signin" />
              <Menu name="회원가입" id="signup" />
            </div>
          )}
          {userType === 'employee' && (
            <div className={styles.gnbMenuThree}>
              <Menu id="user" name="내 프로필" />
              <LogoutMenu name="로그아웃" />
              <NotiButton NotiStatus={NotiStatus} onClick={toggleModal} />
              <div className={styles.notiModalSection} ref={modalRef}>
                {isModalOpen && (
                  <NotificationModal
                    alertCount={alertList.count}
                    alertList={formattedAlertList}
                    isModalShow={isModalOpen}
                    filterRef={modalFilterRef}
                  />
                )}
              </div>
            </div>
          )}
          {userType === 'employer' && (
            <div className={styles.gnbMenuThree}>
              <Menu id="shop" name="내 가게" />
              <LogoutMenu name="로그아웃" />
              <NotiButton NotiStatus={NotiStatus} onClick={toggleModal} />
              <div className={styles.notiModalSection} ref={modalRef}>
                {isModalOpen && (
                  <NotificationModal
                    alertCount={alertList.count}
                    alertList={formattedAlertList}
                    isModalShow={isModalOpen}
                    filterRef={modalFilterRef}
                  />
                )}
              </div>
              <div className={styles.gnbContainer}> </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gnb;
