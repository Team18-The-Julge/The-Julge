import { ReactNode } from 'react';

import LoginForm from '@/components/feature/LoginForm/LoginForm';
import EmptyLayout from '@/layouts/EmptyLayout';

export default function login() {
  return <LoginForm />;
}
login.getLayout = function getLayout(page: ReactNode) {
  return <EmptyLayout>{page}</EmptyLayout>;
};
