// import Image from 'next/image';
import classNames from 'classnames';
import Image from 'next/image';

import { useGetNotice } from '@/apis/notice/useNoticeService';
import Button from '@/components/common/Button';
import styles from '@/components/feature/CommonShopDescription/ShopDescriptionArticle.module.scss';
import calcFormatDuratoin from '@/libs/utils/calcFormatDuratoin';
import { ReactComponent as ClockSvg } from '@/public/svgs/clock-notice.svg';
import { ReactComponent as LocationSvg } from '@/public/svgs/clock.svg';

import PostTagNotice from '../Post/PostTag/PostTagNotice';
// ShopArticle
export function ShopDescriptionArticle() {
  const { data } = useGetNotice('4490151c-5217-4157-b072-9c37b05bed47', '99996477-82db-4bda-aae1-4044f11d9a8b');

  const { item: noticeItem } = data;
  const {
    hourlyPay,
    startsAt,
    workhour,
    description,
    closed,
    shop: { item: shopItem }
  } = noticeItem;

  const { name, address1, address2, description: shopDescription, imageUrl, originalHourlyPay } = shopItem;
  const workDuration = calcFormatDuratoin(startsAt, workhour);

  const now = new Date().getTime();
  const startsAtDate = new Date(startsAt).getTime();
  const isPreviousNotice = startsAtDate < now;

  const handleEditNotice = () => {
    console.log('공고편집');
  };

  const noticeImgClosedClasses = classNames(
    closed || startsAtDate < now ? styles.noticeImgClosed : styles.noticeImgOpened
  );

  return (
    <article className={styles.articleContainer}>
      <div>{name}</div>
      <div className={styles.noticeContainer}>
        <div className={styles.noticeImg}>
          이미지
          <Image src={imageUrl} alt="shop" width={2156} height={1232} style={{ objectFit: 'cover' }} priority />
          <div className={noticeImgClosedClasses}>{isPreviousNotice ? '지난 공고' : '마감 완료'}</div>
        </div>
        <div className={styles.noticeDetailContainer}>
          <div className={styles.noticeInfo}>
            <div className={styles.noticeHourlyPayBox}>
              <p className={styles.noticeHourlyPCategory}>시급</p>
              <div className={styles.noticeHourlyDetail}>
                <p className={styles.noticeName}>{hourlyPay}원</p>
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
            <Button className={styles.noticeButton} size="medium" active onClick={handleEditNotice}>
              공고편집하기
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.noticeCommentContainer}>
        <p className={styles.noticeCommentTitle}>공고 설명</p>
        <p className={styles.noticeComment}>{description}</p>
      </div>
    </article>
  );
}

export default ShopDescriptionArticle;
