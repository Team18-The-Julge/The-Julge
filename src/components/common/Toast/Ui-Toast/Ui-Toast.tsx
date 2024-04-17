import styles from '@/components/common/Toast/Ui-Toast/Ui-Toast.module.scss';

interface UiToastProps {
  children: string;
}

function UiToast({ children }: UiToastProps) {
  return <div className={styles.toastBox}>{children}</div>;
}

export default UiToast;
