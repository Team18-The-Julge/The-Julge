import { MouseEventHandler } from 'react';

import { Address as AddressType } from '@/apis/common.type';
import styles from '@/components/feature/Filter/ScrollMenu/ScrollMenu.module.scss';

export default function ScrollMenu({ handleClick, list }: { handleClick: MouseEventHandler; list: AddressType[] }) {
  return (
    <div className={styles.addressListWrapper}>
      {list.map((item) => (
        <li key={item} role="presentation" className={styles.addressList} onClick={handleClick}>
          {item}
        </li>
      ))}
    </div>
  );
}
