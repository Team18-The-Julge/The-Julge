/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
import classNames from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';

import {
  useGetApplicationListByUserId,
  usePostApplication,
  usePutApplication
} from '@/apis/application/useApplicationService';
import { BaseQuery, Status } from '@/apis/common.type';
import { GetNoticeRes } from '@/apis/notice/notice.type';
import { GetUserRes } from '@/apis/user/user.type';
import Button from '@/components/common/Button/Button';
import Toast from '@/components/common/Toast/Toast';
import Modal from '@/components/feature/Modal/Modal';
import ModalGroup, { useModal } from '@/components/feature/Modal/ModalGroup';
import RecentPostList from '@/components/feature/Post/PostList/RecentPostList';
import PostTagNotice from '@/components/feature/Post/PostTag/PostTagNotice';
import styles from '@/components/layout/notice/Article.module.scss';
import { pageList } from '@/libs/constants/contants';
import calcFormatDuratoin from '@/libs/utils/calcFormatDuratoin';
import { ReactComponent as ClockSvg } from '@/public/svgs/clock-notice.svg';
import { ReactComponent as LocationSvg } from '@/public/svgs/location-shop.svg';

const DEFAULT_LIMIT = 100;

// NoticeArticleNoLogin; 비로그인 사용자
export function NoticeArticleNoLogin({ noticeData }: { noticeData: GetNoticeRes }) {
  const { item: noticeItem } = noticeData;

  const {
    hourlyPay,
    startsAt,
    workhour,
    description: noticeDescription,
    closed,
    shop: { item: shopItem }
  } = noticeItem;

  const { name, address1, address2, description: shopDescription, imageUrl, originalHourlyPay } = shopItem;

  const workDuration = calcFormatDuratoin(startsAt, workhour);

  const now = new Date().getTime();
  const startsAtDate = new Date(startsAt).getTime();
  const isPreviousNotice = startsAtDate < now;

  const buttonState = {
    label: '신청 불가',
    active: false,
    onClick: () => {}
  };

  const noticeImgClosedClasses = classNames(
    closed || startsAtDate < now ? styles.noticeImgClosed : styles.noticeImgOpened
  );

  return (
    <>
      <article className={styles.articleNotice}>
        <div className={styles.noticeImg}>
          <Image src={imageUrl} alt="shop" width={2156} height={1232} style={{ objectFit: 'cover' }} priority />
          <div className={noticeImgClosedClasses}>{isPreviousNotice ? '지난 공고' : '마감 완료'}</div>
        </div>
        <div className={styles.noticeContainer}>
          <div className={styles.noticeDetailContainer}>
            <div className={styles.noticeTitleContainer}>
              <p className={styles.noticeCategory}>시급</p>
              <div className={styles.noticeNameContainer}>
                <p className={styles.noticeName}>{name}</p>
                <PostTagNotice closed={closed} hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
              </div>
            </div>
            <div className={styles.noticeInfoContainer}>
              <ClockSvg className={styles.noticeInfoIcon} />
              <span className={styles.noticeInfoText}>{workDuration}</span>
            </div>
            <div className={styles.noticeInfoContainer}>
              <LocationSvg className={styles.noticeInfoIcon} />
              <span className={styles.noticeInfoText}>{`${address1} ${address2}`}</span>
            </div>
            <p className={styles.noticeDescription}>{shopDescription}</p>
          </div>
          <div className={styles.noticeButtonContainer}>
            <Button
              className={styles.noticeButton}
              size="medium"
              active={buttonState.active}
              onClick={buttonState.onClick}
            >
              {buttonState.label}
            </Button>
          </div>
        </div>
      </article>
      <div className={styles.noticeCommentContainer}>
        <p className={styles.noticeCommentTitle}>공고 설명</p>
        <p className={styles.noticeComment}>{noticeDescription}</p>
      </div>
    </>
  );
}

// NoticeArticle
export default function NoticeArticle({ noticeData, userData }: { noticeData: GetNoticeRes; userData: GetUserRes }) {
  const router = useRouter();

  const { item: noticeItem } = noticeData;

  const {
    id: noticeId,
    hourlyPay,
    startsAt,
    workhour,
    description: noticeDescription,
    closed,
    shop: { item: shopItem }
  } = noticeItem;

  const { id: shopId, name, address1, address2, description: shopDescription, imageUrl, originalHourlyPay } = shopItem;

  const userId = userData.item.id;
  const userType = userData.item.type;
  const userQualifyList = {
    noLogin: 'noLogin',
    noProfile: 'noProfile',
    qualified: 'qualified'
  };
  // 유저가 로그인 했는지, 프로필 작성했는지 확인
  const qualifyUser = () => {
    if (!userData?.item) return userQualifyList.noLogin;
    if (!('name' in userData.item)) return userQualifyList.noProfile;
    return userQualifyList.qualified;
  };

  const workDuration = calcFormatDuratoin(startsAt, workhour);

  // 페이지 이동
  const handleClick = {
    toUserEdit: () => router.push(pageList.userEdit())
  };

  const now = new Date().getTime();
  const startsAtDate = new Date(startsAt).getTime();
  const isPreviousNotice = startsAtDate < now;

  const statusList: { [key: string]: Status } = {
    accepted: 'accepted',
    canceled: 'canceled',
    rejected: 'rejected',
    pending: 'pending'
  };

  // 지원 정보 가져오기, 지원하기, 지원 취소하기 등
  const [getApplicationParams, setGetApplicationParams] = useState<BaseQuery>({ offset: 0, limit: DEFAULT_LIMIT });
  const [applicationStatus, setApplicationStatus] = useState({ id: '', status: '' });
  const { data: applicationData, refetch: getApplicationData } = useGetApplicationListByUserId(
    userId || '',
    getApplicationParams
  );
  const {
    mutate: postApplication,
    data: postApplicationData,
    error: postError,
    isSuccess: postSuccess
  } = usePostApplication(shopId, noticeId);
  const {
    mutate: cancelApplication,
    data: cancelApplicationData,
    error: cancelError,
    isSuccess: cancelSuccess
  } = usePutApplication(shopId, noticeId, applicationStatus.id, { status: statusList.canceled });

  // 토스트
  const [openToast, setOpenToast] = useState<ReactElement | null>(null);
  const toastList = {
    onPost: <Toast onShow={() => setOpenToast(null)}>신청 완료!</Toast>,
    onCancel: <Toast onShow={() => setOpenToast(null)}>취소했어요</Toast>
  };

  // 모달
  const [openModal, setOpenModal] = useState<ReactElement | null>(null);
  const { toggle, close } = useModal();

  function ErrorModal(message: string) {
    const qualify = qualifyUser();
    if (qualify === userQualifyList.noProfile) {
      return <Modal.Error onClick={() => handleClick.toUserEdit()}>내 프로필을 먼저 등록해 주세요.</Modal.Error>;
    }
    return <Modal.Error>{message}</Modal.Error>;
  }

  // 모달 닫기
  const handleClickCloseModal = {
    onPutSuccess: () => {
      console.log('put: 취소하기');
      cancelApplication(shopId, noticeId, applicationStatus.id, { status: statusList.canceled }); // 공고 지원 취소
      setGetApplicationParams({ offset: 0, limit: DEFAULT_LIMIT });
      close();
    }
  };

  // 모달 목록
  const modalList = {
    onError: (message: string) => ErrorModal(message),
    onCancel: <Modal.Select buttonClick={handleClickCloseModal.onPutSuccess}>신청을 취소하시겠어요?</Modal.Select>,
    onNoProfile: () => <Modal.Error onClick={handleClick.toUserEdit}>내 프로필을 먼저 등록해 주세요.</Modal.Error>
  };

  // 모달 상태
  const applicationState = {
    apply: {
      label: '신청하기',
      active: true,
      onClick: () => {
        console.log('신청하기');
        if (qualifyUser() === userQualifyList.noProfile) {
          setOpenModal(modalList.onError(''));
          toggle();
        } else {
          postApplication({ shopId, noticeId }); // 공고 지원
          setGetApplicationParams({ offset: 0, limit: DEFAULT_LIMIT });
        }
      }
    },
    cancel: {
      label: '취소하기',
      active: true,
      onClick: () => {
        console.log('취소하기');
        setOpenModal(modalList.onCancel); // 지원 취소
        toggle();
      }
    },
    inactive: {
      label: '신청 불가',
      active: false,
      onClick: () => {}
    }
  };

  // eslint-disable-next-line consistent-return
  const currentState = () => {
    if (userType !== 'employee') return applicationState.inactive;
    if (closed) return applicationState.inactive;
    if (isPreviousNotice) return applicationState.inactive;
    if (applicationStatus.status === statusList.accepted) return applicationState.cancel;
    if (applicationStatus.status === statusList.pending) return applicationState.cancel; /// cancel ////
    if (applicationStatus.status === statusList.canceled) return applicationState.apply;
    if (applicationStatus.status === statusList.rejected) return applicationState.apply;
    return applicationState.apply;
  };

  const [buttonState, setButtonState] = useState(currentState());

  // 사이드 이펙트
  // 1단계: POST/PUT 요청 보내면 getApplicationListByUserId 재요청
  useEffect(() => {
    getApplicationData();
  }, [cancelApplicationData, postApplicationData]);

  // 2단계: applicatoinData에서 지원한 유저 id, status 검색
  useEffect(() => {
    const items = applicationData?.items;

    if (items?.length > 0) {
      const application = items.find((item: any) => {
        return (
          item.item.notice.item.id === noticeId &&
          (item.item.status === statusList.accepted ||
            item.item.status === statusList.pending ||
            item.item.status === statusList.canceled)
        );
      });
      // 조건을 만족하는 신청이 없으면 계속 탐색
      if (!application?.item.id) {
        if (applicationData.hasNext)
          setGetApplicationParams((prev) => ({
            offset: (prev.offset || 0) + (prev.limit || DEFAULT_LIMIT),
            limit: prev.limit
          }));
      } else {
        console.log('application', application);
        setApplicationStatus({ id: application.item.id, status: application.item.status });
      }
    }
  }, [applicationData]);

  // 3단계: 버튼 상태 변경
  useEffect(() => {
    console.log('applicationStatus', applicationStatus);
    setButtonState(currentState());
  }, [applicationStatus]);

  // 4단계: 버튼 상태 디버그
  useEffect(() => {
    console.log('buttonState', buttonState);
  }, [buttonState]);

  // cancelSuccess, cancelError 핸들링
  useEffect(() => {
    if (cancelError) {
      const message = cancelError?.response?.data?.message;
      setOpenModal(modalList.onError(message));
      toggle();
    }
    if (cancelSuccess) {
      console.log('취소하기 토스트');
      setOpenToast(toastList.onCancel);
    }
  }, [cancelError, cancelSuccess]);

  // postSuccess, postError 핸들링
  useEffect(() => {
    if (postError) {
      const message = postError?.response?.data?.message;
      setOpenModal(modalList.onError(message));
      toggle();
    }
    if (postSuccess) {
      console.log('신청하기 토스트');
      setOpenToast(toastList.onPost);
    }
  }, [postError, postSuccess]);

  const noticeImgClosedClasses = classNames(
    closed || startsAtDate < now ? styles.noticeImgClosed : styles.noticeImgOpened
  );

  return (
    <>
      <article className={styles.articleNotice}>
        <div className={styles.noticeImg}>
          <Image src={imageUrl} alt="shop" width={2156} height={1232} style={{ objectFit: 'cover' }} priority />
          <div className={noticeImgClosedClasses}>{isPreviousNotice ? '지난 공고' : '마감 완료'}</div>
        </div>
        <div className={styles.noticeContainer}>
          <div className={styles.noticeDetailContainer}>
            <div className={styles.noticeTitleContainer}>
              <p className={styles.noticeCategory}>시급</p>
              <div className={styles.noticeNameContainer}>
                <p className={styles.noticeName}>{name}</p>
                <PostTagNotice closed={closed} hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
              </div>
            </div>
            <div className={styles.noticeInfoContainer}>
              <ClockSvg className={styles.noticeInfoIcon} />
              <span className={styles.noticeInfoText}>{workDuration}</span>
            </div>
            <div className={styles.noticeInfoContainer}>
              <LocationSvg className={styles.noticeInfoIcon} />
              <span className={styles.noticeInfoText}>{`${address1} ${address2}`}</span>
            </div>
            <p className={styles.noticeDescription}>{shopDescription}</p>
          </div>
          <div className={styles.noticeButtonContainer}>
            <ModalGroup.Trigger disableToggle>
              <Button
                className={styles.noticeButton}
                size="medium"
                active={buttonState.active}
                solid={buttonState.label === applicationState.apply.label}
                onClick={buttonState.onClick}
              >
                {buttonState.label}
              </Button>
            </ModalGroup.Trigger>
          </div>
        </div>
      </article>
      <div className={styles.noticeCommentContainer}>
        <p className={styles.noticeCommentTitle}>공고 설명</p>
        <p className={styles.noticeComment}>{noticeDescription}</p>
      </div>
      <ModalGroup.Content>{openModal}</ModalGroup.Content>
      {openToast}
    </>
  );
}

export function RecentNoticeListArticle() {
  const [noticeList, setNoticeList] = useState<Array<any>>([]);

  useEffect(() => {
    if (localStorage.getItem('visitedData')) {
      const localVisitedData = JSON.parse(localStorage.getItem('visitedData') as string);
      setNoticeList(localVisitedData);
    }
  }, []);

  // 공고가 없을 때
  if (!noticeList.length) {
    return (
      <article className={styles.articleNoticeListEmpty}>
        <p className={styles.description}>최근에 본 공고가 없습니다.</p>
      </article>
    );
  }

  // 공고가 있을 때
  return (
    <article className={styles.articleNoticeList}>
      <RecentPostList noticeList={noticeList} />
    </article>
  );
}
