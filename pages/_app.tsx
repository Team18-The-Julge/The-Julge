import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

import AsyncBoundary from '@/components/common/AsyncBoundary/AsyncBoundary';
import { FilterProvider } from '@/components/feature/Filter/FilterContext';
import ModalGroup from '@/components/feature/Modal/ModalGroup';
import '@/styles/reset.scss';
import MainLayout from '@/layouts/MainLayout';

// 각 페이지에서 불러와서 쓸 '레이아웃이 적용된 페이지'의 type
type NextPageWithLayout = NextPage & {
  // eslint-disable-next-line no-unused-vars
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
// 레이아웃 가이드
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const queryClient = new QueryClient();
  // 페이지 내부에서 getLayout 설정이 없었다면 헤더&푸터 적용되어있는 기본 레이아웃 불러오기
  const getLayout = Component.getLayout ?? ((page) => <MainLayout>{page}</MainLayout>);

  // ErrorBoundary: 자바스크립트 오류 처리; 비동기 에러의 경우 컴포넌트에서 throw error를 통해 자바스크립트 에러를 발생시킬 수 있다.
  // Suspense: 비동기 로딩 처리
  return (
    <AsyncBoundary>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <ModalGroup.Root>
            <FilterProvider>{getLayout(<Component {...pageProps} />)}</FilterProvider>
          </ModalGroup.Root>
        </QueryClientProvider>
      </Provider>
    </AsyncBoundary>
  );
}
