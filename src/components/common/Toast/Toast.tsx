import UiToast from '@/components/common/Toast/Ui-Toast/Ui-Toast';

interface ToastProps {
  children: string;
}

function Toast({ children }: ToastProps) {
  return <UiToast>{children}</UiToast>;
}
export default Toast;
