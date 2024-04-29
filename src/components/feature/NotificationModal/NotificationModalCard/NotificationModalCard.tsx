import classNames from 'classnames/bind';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Link from 'next/link';

import { usePutAlert } from '@/apis/alert/useAlertService';
import styles from '@/components/feature/NotificationModal/NotificationModalCard/NotificationModal.module.scss';
import calculateMinutesAgo from '@/libs/utils/calculateMinutesAgo';
import calculateWorkhour from '@/libs/utils/calculateWorkhour';

type dataProps = {
  shop: string; // shop - name
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
  const { shop, result, createdAt, startsAt, workhour, id } = data;
  const calculatedTime = calculateMinutesAgo(createdAt);
  const token = Cookies.get('token');
  let userId = '';
  if (token) {
    userId = jwtDecode<{ userId: string }>(token).userId ?? '';
  }

  const cn = classNames.bind(styles);
  const elipseCN = cn(result, 'elipse');
  const { formattedDate, fromToHour } = calculateWorkhour(startsAt, workhour);
  const { mutate: putAlertMutate } = usePutAlert('', '');

  const handleClick = () => {
    putAlertMutate(userId, id);
    console.log(userId, id);
  };

  return (
    <Link href="/">
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
