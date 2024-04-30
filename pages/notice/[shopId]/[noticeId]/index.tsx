import { jwtDecode } from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';

import NoticeService from '@/apis/notice/Notice.service';
import { GetNoticeRes } from '@/apis/notice/notice.type';
import UserService from '@/apis/user/User.service';
import { GetUserRes } from '@/apis/user/user.type';
import AsyncBoundary from '@/components/common/AsyncBoundary/AsyncBoundary';
import { NoticeArticleNoLogin, RecentNoticeListArticle } from '@/components/layout/notice/Article';
import MainLayout from '@/layouts/MainLayout';
import { pageList } from '@/libs/constants/contants';
import styles from '@/pages/notice/[shopId]/[noticeId]/index.module.scss';

// 클라이언트 사이드에서만 로드; 403 에러 방지
const NoticeArticle = dynamic(() => import('@/components/layout/notice/Article'), {
  ssr: false // SSR 금지
});

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { query, req } = context;
  const { shopId, noticeId }: { shopId?: string; noticeId?: string } = query;

  const { cookies } = req;
  const { token } = cookies;

  const userId = jwtDecode<{ userId: string }>(token || '').userId ?? '';
  const { data: userData } = await UserService.getUser(userId);

  // shopId나 noticeId가 없으면 홈페이지로 리다이렉트
  if (!shopId || !noticeId) {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }

  const { data: noticeData } = await NoticeService.getNotice(shopId, noticeId);

  if (!noticeData?.item) {
    return {
      notFound: true
    };
  }

  // 최근에 본 공고 {userId: [{shopId, noticeId}, ...]}를 쿠키에서 가져와서 전부 getNotice(shopId, noticeId)
  // 데이터를 RecentNoticeListData로 반환

  return {
    props: { noticeData, userData, notFound: false }
  };
};

// (shopId O) 사장님 가게 상세
export default function NoticeDetailPage({
  noticeData,
  userData
}: {
  noticeData: GetNoticeRes;
  userData: GetUserRes | null;
}) {
  const { name, category } = noticeData?.item?.shop?.item ?? null;

  const noticeId = noticeData.item.id;
  const shopId = noticeData.item.shop.item.id;
  const visitedData = { noticeId, shopId };

  // 로그인 상태에 따라 구분
  // eslint-disable-next-line react/no-unstable-nested-components
  function SelectNoticeArticle() {
    if (!userData?.item) return <NoticeArticleNoLogin noticeData={noticeData} />;
    if (userData?.item?.type !== 'employee') return <NoticeArticleNoLogin noticeData={noticeData} />;
    return <NoticeArticle noticeData={noticeData} userData={userData} />;
  }

  useEffect(() => {
    if (!localStorage.getItem('visitedData')) {
      console.log('visitedData', visitedData);
      localStorage.setItem('visitedData', JSON.stringify([visitedData]));
    } else {
      const localVisitedData = JSON.parse(localStorage.getItem('visitedData') as string);

      // visitedData가 localVisitedData 배열에 이미 존재하는지 확인
      if (localVisitedData[0].noticeId !== visitedData.noticeId) {
        const newLocalVisitedData = [visitedData].concat(localVisitedData).slice(0, 6);
        localStorage.setItem('visitedData', JSON.stringify(newLocalVisitedData));
        console.log('newLocalVisitedData', newLocalVisitedData);
      } else {
        console.log('ㅇㅇㅇㅇlocalVisitedData', localVisitedData);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <section className={styles.section}>
        <p className={styles.category}>{category}</p>
        <h1 className={styles.title}>{name}</h1>
        <AsyncBoundary>{SelectNoticeArticle()}</AsyncBoundary>
      </section>
      <section className={styles.sectionBottom}>
        <h1 className={styles.title}>최근에 본 공고</h1>
        <AsyncBoundary>
          <RecentNoticeListArticle />
        </AsyncBoundary>
      </section>
    </>
  );
}

NoticeDetailPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
