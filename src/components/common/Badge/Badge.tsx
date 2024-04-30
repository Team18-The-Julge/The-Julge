import classNames from 'classnames/bind';
import { useState } from 'react';

import { ReactComponent as CloseButton } from '@/public/svgs/badgeCloseBtn.svg';

import styles from './Badge.module.scss';

type BadgeProps = {
  title: string;
  color: string;
  closeBtn?: boolean;
};

export default function Badge({ title, color, closeBtn = false }: BadgeProps) {
  const [isShown, setIsShown] = useState(true);
  const cn = classNames.bind(styles);
  const className = cn('container', color, isShown ? styles.show : styles.hide);

  const handleCloseButtonClick = () => {
    setIsShown(false);
  };

  return (
    <div className={className}>
      <p>{title}</p>
      {closeBtn && <CloseButton onClick={handleCloseButtonClick} />}
    </div>
  );
}
