import React from 'react';

import Footer from '@/components/common/Footer/Footer';
import HeadLayout from '@/layouts//HeadLayout';
import styles from '@/layouts/layout.module.scss';
// 헤더 푸터가 적용되어있는 레이아웃 (기본값)
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeadLayout />
      <main className={styles.mainStyle}>{children}</main>
      <Footer />
    </>
  );
}
