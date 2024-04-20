import { ReactElement } from 'react';
import { createPortal } from 'react-dom';

import styles from '@/components/Modal/Portal.module.scss';

function Potal({ children }: { children: ReactElement }) {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return createPortal(<div className={styles.Potal}>{children}</div>, document.getElementById('modal') as HTMLElement);
}

export default Potal;