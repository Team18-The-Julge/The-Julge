import Head from 'next/head';
import React from 'react';

import GnbData from '@/components/common/Gnb/GnbData';

function HeadLayout() {
  return (
    <>
      <Head>
        <title>The-Julge</title>
      </Head>
      <GnbData />
    </>
  );
}

export default HeadLayout;
