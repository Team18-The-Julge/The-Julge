import classNames from 'classnames/bind';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

import { usePutAlert } from '@/apis/alert/useAlertService';
import styles from '@/components/feature/NotificationModal/NotificationModalCard/NotificationModal.module.scss';
import { pageList } from '@/libs/constants/contants';
import calculateMinutesAgo from '@/libs/utils/calculateMinutesAgo';
import calculateWorkhour from '@/libs/utils/calculateWorkhour';

import alertListAtom from '../NotificationAtom';

type dataProps = {
  shop: string; // shop - name
  shopId: string; // shop - item - id
  result: 'accepted' | 'rejected'; // item - result
  createdAt: string; // createdAt
  startsAt: string; // notice - startsAt
  workhour: number; // notice - workhour
  id: string; // item- id
};

const resultComment = {
  accepted: '승인',
  rejected: '거절'
};

export default function NotificationModalCard(data: dataProps) {
  const { shop, shopId, result, createdAt, startsAt, workhour, id } = data;
  const calculatedTime = calculateMinutesAgo(createdAt);
  const [, setAlertPostId] = useAtom(alertListAtom);
  const { userNoticeDetail } = pageList;
  const cn = classNames.bind(styles);
  const elipseCN = cn(result, 'elipse');
  const token = Cookies.get('token');
  let userId = '';
  const { mutate: putAlertMutate } = usePutAlert('', '');
  if (token) {
    userId = jwtDecode<{ userId: string }>(token).userId ?? '';
  }
  const { formattedDate, fromToHour } = calculateWorkhour(startsAt, workhour);
  const handleClick = () => {
    setAlertPostId(id);
    putAlertMutate({ userId, id });
    console.log(userId, 'userId');
    console.log(id, 'postid');
  };
  // 해당 공고 페이지로 링크 걸어주기
  return (
    <Link href={userNoticeDetail(shopId, id)}>
      <article className={cn('container')} onClick={handleClick} aria-hidden="true">
        <div className={elipseCN} />
        <p>
          {`${shop} (${formattedDate} ${fromToHour}) 공고 지원이 `}
          <span className={cn(`${result}Comment`)}>{resultComment[result]}</span>되었어요.
        </p>
        <p>{calculatedTime}</p>
      </article>
    </Link>
  );
}
