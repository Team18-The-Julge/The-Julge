import { useEffect } from 'react';

import { ToastProps } from '@/components/common/Toast/Type-Toast';
import UiToast from '@/components/common/Toast/Ui-Toast/Ui-Toast';

/**
 * Toast 컴포넌트
 * @param onShow setShowToast를 (false)로 변경합니다.
 * @param children, children으로 받아온 내용을 보여줍니다.
 */

function Toast({ onShow, children }: ToastProps) {
  useEffect(() => {
    const showToastTimer = setTimeout(() => {
      onShow();
    }, 3000);

    return () => {
      clearTimeout(showToastTimer);
    };
  }, [onShow]);
  return <UiToast>{children}</UiToast>;
}
export default Toast;
