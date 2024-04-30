import Image from 'next/image';

// import { useEffect } from 'react';
import styles from '@/components/feature/Gnb/Notification/Notification.module.scss';

// import { usePutAlert } from '@/apis/alert/useAlertService';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import alertListAtom from '../../NotificationModal/NotificationAtom';
// import { useAtom } from 'jotai';

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
  // const { mutate: putAlertMutate } = usePutAlert('', '');
  // const token = Cookies.get('token');
  // let userId = '';
  // if (token) {
  //   userId = jwtDecode<{ userId: string }>(token).userId ?? '';
  // }

  // const [postId, setPostId] = useAtom(alertListAtom);

  // useEffect(() => {
  //   putAlertMutate({ userId, postId });
  // }, [postId]);
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      <Image
        src={NotiStatus ? '/svgs/notification-active.svg' : '/svgs/notification-inactive.svg'}
        alt="알림"
        width={20}
        height={20}
      />
    </button>
  );
}
