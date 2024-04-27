/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { ReactElement, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Address, Category } from '@/apis/common.type';
import { PostImageRes } from '@/apis/image/image.type';
import { usePostImage, usePutImage } from '@/apis/image/useImageService';
import { PostShopPayload } from '@/apis/shop/shop.type';
import { usePostShop } from '@/apis/shop/useShopService';
import { removeQueryParams } from '@/apis/utils';
import Button from '@/components/common/Button';
import FileInputForm from '@/components/common/Input/FileInputForm/FileInputForm';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import SelectForm from '@/components/common/Input/SelectForm/SelectForm';
import Modal from '@/components/feature/Modal/Modal';
import ModalGroup, { useModal } from '@/components/feature/Modal/ModalGroup';
import MainLayout from '@/layouts/MainLayout';
import { addressList, categoryList, pageList } from '@/libs/constants/contants';
import { formatNumber, removeCommasNumber } from '@/libs/utils/formatter';
import styles from '@/pages/shop/register/index.module.scss';
import { ReactComponent as CloseSvg } from '@/public/svgs/close-shop-page.svg';

type IFormInput = {
  name: string;
  category: { value: Category; label: Category } | null;
  address1: { value: Address; label: Address } | null;
  address2: string;
  originalHourlyPay: string;
  imageUrl: Array<File>;
  description: string;
};

const defaultValueList = {
  name: '',
  category: null,
  address1: null,
  address2: '',
  originalHourlyPay: '',
  imageUrl: [],
  description: ''
};

// 최소 및 최대 시급 설정
const minHourlyPay = 10000; // 최소 시급
const maxHourlyPay = 1000000000; // 최대 시급

const formList = {
  name: {
    label: '가게 이름',
    validate: { required: '가게 이름을 입력해 주세요.' },
    required: true,
    placeholder: '입력'
  },
  category: {
    label: '분류',
    validate: { required: '분류를 선택해 주세요.' },
    required: true,
    placeholder: '선택'
  },
  address1: {
    label: '주소',
    validate: { required: '주소를 선택해 주세요.' },
    required: true,
    placeholder: '입력'
  },
  address2: {
    label: '상세 주소',
    validate: { required: '상세 주소를 입력해 주세요.' },
    required: true,
    placeholder: '입력'
  },
  originalHourlyPay: {
    label: '기본 시급',
    validate: {
      required: '기본 시급을 입력해 주세요.',
      validate: {
        minMax: (value: string) => {
          if (!value) return '기본 시급을 입력해 주세요.';
          const numValue = removeCommasNumber(value); // 쉼표 제거 후 숫자 변환
          return (
            (numValue >= minHourlyPay && numValue <= maxHourlyPay) ||
            '시급은 최저시급 이상이어야 하고, 1,000,000,000원을 넘을 수 없습니다.'
          );
        }
      }
    },
    required: true,
    placeholder: '입력'
  },
  imageUrl: {
    label: '가게 이미지',
    validate: { required: '가게 이미지를 선택해 주세요.' },
    required: true,
    placeholder: ''
  },
  description: {
    label: '가게 설명',
    required: false,
    placeholder: '입력'
  }
};

// 토큰 나중에 쿠키로 대체
// jwtDecode
const token =
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMWFiNjk1My03MTNkLTQwNWEtOWM2NC05Njk0ZTFmZTFmOTQiLCJpYXQiOjE3MTQwNTYyOTZ9.OTO68dwg4m6AHcyHk841GlAf22OWKt5PxeTpHW_TGR4';

export const getServerSideProps: GetServerSideProps = async () => {
  // token이 없으면 홈페이지로 리다이렉트
  if (!token) {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }

  // const userId = jwtDecode<{ userId: string }>(token).userId ?? '';
  // const { data: shopData } = await UserService.getUser(userId);
  // const shopId = shopData?.item?.shop?.item?.id ?? '';
  // const userType = shopData?.item?.type ?? '';

  // // shopId가 있으면 /shop/[shopId] 페이지로 리다이렉트
  // if (shopId) {
  //   return {
  //     redirect: {
  //       destination: pageList.shopDetail(shopId),
  //       permanent: false
  //     }
  //   };
  // }

  // // employer가 아니면 홈페이지로 리다이렉트
  // if (userType !== 'employer') {
  //   return {
  //     redirect: {
  //       destination: pageList.home(),
  //       permanent: false
  //     }
  //   };
  // }

  return {
    props: {}
  };
};

// (shopId X) 사장님 가게 등록
export default function ShopRegisterPage() {
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

  const watchImageFile = watch('imageUrl')[0];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { mutate: getPresignedUrl, data: presignedUrlData }: { mutate: any; data: PostImageRes } = usePostImage({
    name: watchImageFile?.name || ''
  });
  const { mutate: putImageS3 } = usePutImage(watchImageFile);

  // 제출할 폼 데이터
  const postShopPayload: PostShopPayload = {
    name: watch('name'),
    category: watch('category')?.value || '한식',
    address1: watch('address1')?.value || '서울시 종로구',
    address2: watch('address2'),
    originalHourlyPay: removeCommasNumber((watch('originalHourlyPay') || 0).toString()),
    imageUrl: presignedUrlData?.item.url ? removeQueryParams(presignedUrlData?.item.url) : '',
    description: watch('description')
  };

  const { mutate: postShop, data: postShopData } = usePostShop(postShopPayload);

  // 모달
  const [openModal, setOpenModal] = useState<ReactElement | null>(null);
  const { toggle } = useModal();
  const handleClickCloseModal = {
    onError: () => {},
    onSubmit: () => {
      const shopId = postShopData?.item?.id ?? '';
      router.push(pageList.shopDetail(shopId));
    }
  };
  const modalList = {
    onError: <Modal.Error onClick={handleClickCloseModal.onError}>{postShopData?.message}</Modal.Error>,
    onSuccess: <Modal.Check onClick={handleClickCloseModal.onSubmit}>등록이 완료되었습니다.</Modal.Check>
  };

  const registerList = {
    name: register('name', formList.name.validate),
    category: register('category', formList.category.validate),
    address1: register('address1', formList.address1.validate),
    address2: register('address2', formList.address2.validate),
    originalHourlyPay: register('originalHourlyPay', formList.originalHourlyPay.validate),
    imageUrl: register('imageUrl', formList.imageUrl.validate),
    description: register('description')
  };

  const onSubmit = () => {
    // 폼 데이터 업로드
    postShop(postShopPayload);
  };

  // presignedUrlData 생성
  useEffect(() => {
    if (watchImageFile?.name) {
      getPresignedUrl({ name: watchImageFile.name });
    }
  }, [watchImageFile]);

  // 이미지 S3 업로드
  useEffect(() => {
    if (presignedUrlData) {
      putImageS3({ putFile: watchImageFile, putPresignedUrl: presignedUrlData?.item.url });
    }
  }, [presignedUrlData]);

  // 폼 제출
  useEffect(() => {
    // 에러 메세지 모달 렌더링
    if (postShopData?.message) {
      setOpenModal(modalList.onError);
      toggle();
    }

    // 폼 제출 성공 시 리다이렉션
    if (postShopData?.item) {
      setOpenModal(modalList.onSuccess);
      toggle();
    }
  }, [postShopData]);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>가게 정보</h1>
          <Link href={pageList.shop()}>
            <CloseSvg className={styles.closeIcon} />
          </Link>
        </div>
        <form className={styles.formContainer} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputGridContainer}>
            <InputForm
              label={formList.name.label}
              required={formList.name.required}
              errorMessage={errors.name?.message}
              placeholder={formList.name.placeholder}
              {...registerList.name}
            />
            <Controller
              control={control}
              name="category"
              render={({ field }) => (
                <SelectForm
                  label={formList.category.label}
                  required={formList.category.required}
                  instanceId="category"
                  optionList={categoryList}
                  errorMessage={errors.category?.message}
                  placeholder={formList.category.placeholder}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="address1"
              render={({ field }) => (
                <SelectForm
                  label={formList.address1.label}
                  required={formList.address1.required}
                  instanceId="address1"
                  optionList={addressList}
                  errorMessage={errors.address1?.message}
                  placeholder={formList.address1.placeholder}
                  {...field}
                />
              )}
            />
            <InputForm
              label={formList.address2.label}
              required={formList.address2.required}
              errorMessage={errors.address2?.message}
              placeholder={formList.address2.placeholder}
              {...registerList.address2}
            />
            <Controller
              control={control}
              name="originalHourlyPay"
              render={({ field }) => (
                <InputForm
                  label={formList.originalHourlyPay.label}
                  fieldLabel="원"
                  required={formList.originalHourlyPay.required}
                  errorMessage={errors.originalHourlyPay?.message}
                  placeholder={formList.originalHourlyPay.placeholder}
                  formatter={formatNumber}
                  {...field}
                />
              )}
            />
          </div>
          <FileInputForm
            className={styles.fileInput}
            label={formList.imageUrl.label}
            required={formList.imageUrl.required}
            errorMessage={errors.imageUrl?.message}
            {...registerList.imageUrl}
          />
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

ShopRegisterPage.getLayout = function getLayout(page: React.ReactNode) {
  return <MainLayout>{page}</MainLayout>;
};