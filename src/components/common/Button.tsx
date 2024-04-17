import classNames from 'classnames';
import React from 'react';

import styles from '@/components/common/Button.module.scss';

interface ButtonType extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  solid?: boolean;
  size: 'large' | 'medium' | 'small';
  active: boolean;
  submit?: boolean; // 버튼 타입을 submit으로 지정
}

/**
 * Button 컴포넌트
 * @param solid 버튼 스타일; boolean
 * @param size 버튼 크기 required; large | medium | small
 * @param active 버튼 상태 required; boolean
 * @param submit 버튼 타입을 submit으로 지정; boolean
 * @param className 버튼 커스텀 스타일; string
 * @param onClick 버튼 클릭 이벤트 콜백 함수; function
 */

export default function Button({ children, className, solid, size, active, submit = false, onClick }: ButtonType) {
  const buttonClasses = classNames(
    styles.defaultButton,
    styles[size],
    solid && styles.solid,
    !active && styles.inactive,
    className
  );

  return (
    <button className={buttonClasses} type={submit ? 'submit' : 'button'} onClick={active ? onClick : () => {}}>
      {children}
    </button>
  );
}
