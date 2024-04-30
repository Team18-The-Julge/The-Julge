import { jwtDecode } from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import UserService from '@/apis/user/User.service';
import Button from '@/components/common/Button/Button';
import MainLayout from '@/layouts/MainLayout';
import { pageList } from '@/libs/constants/contants';
import styles from '@/pages/shop/index.module.scss';

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {
  const { req } = context;
  const { cookies } = req;
  const { token } = cookies;

  const userId = jwtDecode<{ userId: string }>(token || '').userId ?? '';

  // token이 없으면 홈페이지로 리다이렉트
  if (!token) {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }

  const { data: shopData } = await UserService.getUser(userId);
  const shopId = shopData?.item?.shop?.item?.id ?? '';
  const userType = shopData?.item?.type ?? '';

  // shopId가 있으면 /shop/[shopId] 페이지로 리다이렉트
  if (shopId) {
    return {
      redirect: {
        destination: pageList.shopDetail(shopId),
        permanent: false
      }
    };
  }

  // employer가 아니면 홈페이지로 리다이렉트
  if (userType !== 'employer') {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }

  return {
    props: {}
  };
};

// (shopId X) 사장님 가게 상세
export default function ShopPage() {
  const router = useRouter();

  const handleClick = {
    toShopRegisterPage: () => router.push(pageList.shopRegister())
  };

  return (
    <section className={styles.section}>
      <h1 className={styles.title}>내 가게</h1>
      <article className={styles.article}>
        <p className={styles.description}>내 가게를 소개하고 공고도 등록해 보세요.</p>
        <Button className={styles.button} onClick={handleClick.toShopRegisterPage} size="medium" active solid>
          가게 등록하기
        </Button>
      </article>
    </section>
  );
}

ShopPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
