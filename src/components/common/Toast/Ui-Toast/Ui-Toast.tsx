import { UiToastProps } from '@/components/common/Toast/Type-Toast';
import styles from '@/components/common/Toast/Ui-Toast/Ui-Toast.module.scss';

function UiToast({ children }: UiToastProps) {
  return <div className={styles.toastBox}>{children}</div>;
}

export default UiToast;
