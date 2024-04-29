import Image from 'next/image';

import styles from '@/components/feature/Gnb/Notification/Notification.module.scss';

type NotiButtonProps = {
  NotiStatus: boolean;
  onClick: () => void;
};

/**
 * 활성 및 비활성 상태 사이를 전환할 수 있는 알림 버튼을 렌더링
 * 버튼을 클릭하면 현재 상태에 따라 모달 창 표시
 *
 * @param {boolean} props.NotiStatus - 알림이 활성 상태 여부
 * true일 경우 '활성' 이미지를 표시하고, 그렇지 않으면 '비활성' 이미지.
 * @param {function} props.onClick - 버튼 클릭 시 실행할 함수
 */
export default function NotiButton({ NotiStatus, onClick }: NotiButtonProps) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Image
        src={NotiStatus ? '/svgs/notification-active.svg' : '/svgs/notification-inactive.svg'}
        alt="알림"
        className="imageResponsive"
        width={500}
        height={300}
      />
    </button>
  );
}
