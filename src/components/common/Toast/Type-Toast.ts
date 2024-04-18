interface UiToastProps {
  children: string;
}

interface ToastProps {
  onShow: () => void;
  children: string;
}

export type { UiToastProps, ToastProps };
