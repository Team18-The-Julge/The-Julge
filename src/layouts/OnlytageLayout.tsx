import React from 'react';

import Footer from '@/components/common/Footer/Footer';
import HeadLayout from '@/layouts//HeadLayout';

export default function OnlytagLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeadLayout />
      <main>{children}</main>
      <Footer />
    </>
  );
}
