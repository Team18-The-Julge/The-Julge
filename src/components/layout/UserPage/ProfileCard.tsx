import React, { useState } from 'react';

import Button from '@/components/common/Button/Button';
import ModalGroup from '@/components/feature/Modal/ModalGroup';
import UserEditModal from '@/components/feature/UserEditModal/UesrEditModal';

import styles from './ProfileCard.module.scss';

type UserProfileProps = {
  isRegisterd: boolean;
  name: string;
  phone: string;
  address: string;
  bio: string;
};

export default function ProfileCard({ isRegisterd, ...props }: UserProfileProps) {
  const [isModalOpen, setModalOpen] = useState(false);
  console.log(isModalOpen);
  const toggleModal = () => setModalOpen(!isModalOpen);

  if (!isRegisterd) {
    return (
      <div className={styles.nonDataWrapper}>
        <div className={styles.section}>
          <p>내 프로필을 등록하고 원하는 가게에 지원해 보세요.</p>
        </div>
        <div className={styles.section}>
          <ModalGroup.Trigger>
            <Button className={styles.editButton} solid size="large" active onClick={toggleModal}>
              내 프로필 등록하기
            </Button>
          </ModalGroup.Trigger>
        </div>
        {isModalOpen && (
          <ModalGroup.Content>
            <UserEditModal onClose={toggleModal} />
          </ModalGroup.Content>
        )}
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.section}>
        <div className={styles.nameSection}>
          <h1>이름</h1>
          <p>{props.name}</p>
        </div>
        <div className={styles.infoSection}>
          <p>☎ {props.phone}</p>
          <p>☎ {props.address}</p>
        </div>
        <div className={styles.bioSection}>
          <p>{props.bio}</p>
        </div>
      </div>

      <div className={styles.section}>
        <ModalGroup.Trigger>
          <Button className={styles.editButton} solid size="large" active onClick={toggleModal}>
            편집하기
          </Button>
        </ModalGroup.Trigger>
      </div>

      {isModalOpen && (
        <ModalGroup.Content>
          <UserEditModal onClose={toggleModal} />
        </ModalGroup.Content>
      )}
    </div>
  );
}
