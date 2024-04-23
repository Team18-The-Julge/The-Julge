import { ReactNode } from 'react';

interface UiToastProps {
  children: ReactNode;
}

interface ToastProps {
  onShow: () => void;
  children: ReactNode;
}

export type { UiToastProps, ToastProps };
