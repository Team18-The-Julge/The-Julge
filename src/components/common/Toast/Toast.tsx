import { useEffect } from 'react';

import { ToastProps } from '@/components/common/Toast/Type-Toast';
import UiToast from '@/components/common/Toast/Ui-Toast/Ui-Toast';

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
