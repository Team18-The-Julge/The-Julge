/* eslint-disable react-hooks/exhaustive-deps */
import axios, { AxiosError } from 'axios';
import { jwtDecode } from 'jwt-decode';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { PostNoticePayload } from '@/apis/notice/notice.type';
import { usePostNotice } from '@/apis/notice/useNoticeService';
import UserService from '@/apis/user/User.service';
import Button from '@/components/common/Button/Button';
import DateTimeForm from '@/components/common/Input/DateTimeForm/DateTimeForm';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import Modal from '@/components/feature/Modal/Modal';
import ModalGroup, { useModal } from '@/components/feature/Modal/ModalGroup';
import MainLayout from '@/layouts/MainLayout';
import { MAX_HOURLY_PAY, MIN_HOURLY_PAY, pageList } from '@/libs/constants/contants';
import { formatNumber, removeCommasNumber } from '@/libs/utils/formatter';
import roundUpToNextHour from '@/libs/utils/roundUpToNextHour';
import styles from '@/pages/shop/[shopId]/register/index.module.scss';
import { ReactComponent as CloseSvg } from '@/public/svgs/close-shop-page.svg';

type IFormInput = {
  hourlyPay: string;
  startsAt: string;
  workhour: string;
  description: string;
};

// 현재 시간
const now = roundUpToNextHour(new Date());

const defaultValueList = {
  hourlyPay: '',
  startsAt: now.toISOString(),
  workhour: '',
  description: ''
};

const formList = {
  hourlyPay: {
    label: '시급',
    validate: {
      required: '시급을 입력해 주세요.',
      validate: {
        minMax: (value: string) => {
          if (!value) return '시급을 입력해 주세요.';
          const numValue = removeCommasNumber(value); // 쉼표 제거 후 숫자 변환
          return (
            (numValue >= MIN_HOURLY_PAY && numValue <= MAX_HOURLY_PAY) ||
            '시급은 최저시급 이상이어야 하고, 1,000,000,000원을 넘을 수 없습니다.'
          );
        }
      }
    },
    required: true,
    placeholder: '입력'
  },
  startsAt: {
    label: '시작 일시',
    validate: {
      required: '시작 일시를 선택해 주세요.',
      validate: {
        afterNow: (value: string) => {
          const start = new Date(value);
          return start > new Date() ? true : '시작 일시는 현재 시간보다 이후여야 합니다.';
        }
      }
    },
    required: true,
    placeholder: ''
  },
  workhour: {
    label: '업무 시간',
    validate: {
      required: '업무 시간을 입력해 주세요.',
      validate: {
        minMax: (value: string) => {
          const numVal = removeCommasNumber(value);
          return numVal < 1 || numVal > 24 ? '근무 시간은 1시간 이상 24시간 이하여야 합니다.' : true;
        }
      }
    },
    required: true,
    placeholder: '입력'
  },
  description: {
    label: '공고 설명',
    required: false,
    placeholder: '입력'
  }
};

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

  const { query } = context;
  const { shopId: currentShopId }: { shopId?: string } = query;

  const { data: userData } = await UserService.getUser(userId);
  const shopId = userData?.item?.shop?.item?.id ?? '';
  const userType = userData?.item?.type ?? '';

  // shopId와 currentShopId가 다르면 /shop 페이지로 리다이렉트
  if (shopId !== currentShopId) {
    return {
      redirect: {
        destination: pageList.shop(),
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
    props: { shopId }
  };
};

// 사장님 공고 등록
export default function ShopNoticeRegisterPage({ shopId }: { shopId: string }) {
  const router = useRouter();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInput>({
    defaultValues: defaultValueList, // 폼 기본값
    mode: 'onTouched' // onTouched 시 검증
  });

  // 제출할 폼 데이터
  const postNoticePayload: PostNoticePayload = {
    hourlyPay: removeCommasNumber((watch('hourlyPay') || 0).toString()),
    startsAt: new Date(watch('startsAt')).toISOString(),
    workhour: removeCommasNumber((watch('workhour') || 0).toString()),
    description: watch('description')
  };

  const { mutate: postNotice, data: postNoticeData } = usePostNotice(shopId, postNoticePayload);

  // 모달
  const [openModal, setOpenModal] = useState<ReactElement | null>(null);
  const { toggle } = useModal();
  const handleClickCloseModal = {
    onError: () => {},
    onSuccess: () => {
      const noticeId = postNoticeData?.item?.id;
      router.push(pageList.shopNoticeDetail(shopId, noticeId));
    }
  };

  const modalList = {
    // eslint-disable-next-line react/no-unstable-nested-components
    onError: (message: string) => <Modal.Error onClick={handleClickCloseModal.onError}>{message}</Modal.Error>,
    onSuccess: <Modal.Check onClick={handleClickCloseModal.onSuccess}>등록이 완료되었습니다.</Modal.Check>
  };

  const registerList = {
    hourlyPay: register('hourlyPay', formList.hourlyPay.validate),
    startsAt: register('startsAt', formList.startsAt.validate),
    workhour: register('workhour'),
    description: register('description')
  };

  const onSuccess = () => {
    setOpenModal(modalList.onSuccess);
    toggle();
  };

  const onError = (e: AxiosError) => {
    if (axios.isAxiosError(e) && e.response) {
      const { message } = e.response.data as { message: string };
      console.log('message', message);
      setOpenModal(modalList.onError(message));
      toggle();
    }
  };

  const onSubmit = () => {
    // 폼 데이터 업로드
    postNotice(postNoticePayload, { onSuccess, onError });
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>공고 등록</h1>
          <Link href={pageList.shop()}>
            <CloseSvg className={styles.closeIcon} />
          </Link>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGridContainer}>
            <Controller
              control={control}
              name="hourlyPay"
              render={({ field }) => (
                <InputForm
                  label={formList.hourlyPay.label}
                  fieldLabel="원"
                  required={formList.hourlyPay.required}
                  errorMessage={errors.hourlyPay?.message}
                  placeholder={formList.hourlyPay.placeholder}
                  formatter={formatNumber}
                  {...field}
                />
              )}
            />
            <Controller
              name="startsAt"
              control={control}
              render={({ field }) => (
                <DateTimeForm
                  label={formList.startsAt.label}
                  required
                  errorMessage={errors.startsAt?.message}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="workhour"
              render={({ field }) => (
                <InputForm
                  label={formList.workhour.label}
                  fieldLabel="시간"
                  required={formList.workhour.required}
                  errorMessage={errors.workhour?.message}
                  placeholder={formList.workhour.placeholder}
                  formatter={formatNumber}
                  {...field}
                />
              )}
            />
          </div>
          <InputForm
            label={formList.description.label}
            required={formList.description.required}
            errorMessage={errors.description?.message}
            placeholder={formList.description.placeholder}
            textarea
            {...registerList.description}
          />
        </form>
        <div className={styles.buttonContainer}>
          <ModalGroup.Trigger disableToggle>
            <Button className={styles.submitButton} onClick={handleSubmit(onSubmit)} submit active size="large" solid>
              등록하기
            </Button>
          </ModalGroup.Trigger>
        </div>
      </section>
      <ModalGroup.Content>{openModal}</ModalGroup.Content>
    </>
  );
}

ShopNoticeRegisterPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};
