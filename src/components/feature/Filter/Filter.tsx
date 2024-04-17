/* eslint-disable */
import styles from '@/components/feature/Filter/styles.module.scss';
import { ReactComponent as CloseButton } from '@/public/svgs/closeButton.svg';

export default function Filter() {
  return (
    <div className={styles.container}>
      <h1>상세 필터</h1>
      <p>위치</p>
      <CloseButton />
    </div>
  );
}
