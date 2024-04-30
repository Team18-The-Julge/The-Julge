import Image from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/components/feature/Post/Post.module.scss';
import PostTag from '@/components/feature/Post/PostTag/PostTag';
import calcFormatDuratoin from '@/libs/utils/calcFormatDuratoin';

import { PostProps } from './PostType';

export default function Post({
  id,
  name,
  startedAt,
  workhour,
  address,
  hourlyPay,
  originalHourlyPay,
  imageUrl,
  closed,
  shopId
}: PostProps) {
  const router = useRouter();
  const duration = calcFormatDuratoin(startedAt, workhour);

  const handleClickToDetailPage = () => {
    router.push(`/shop/${shopId}/${id}`);
  };

  return (
    <div
      role="presentation"
      className={closed ? `${styles.cardWrapper} ${styles.closed}` : styles.cardWrapper}
      onClick={handleClickToDetailPage}
    >
      <div className={styles.cardHeader}>
        <Image
          className={styles.img}
          src={imageUrl}
          alt={name}
          width={1120}
          height={640}
          style={{ objectFit: 'cover' }}
        />
        {closed && (
          <div className={styles.closedLayer}>
            <span className={styles.closedText}>지난 공고</span>
          </div>
        )}
      </div>
      <section className={styles.cardSection}>
        <div className={styles.sectionContent}>
          <div className={closed ? `${styles.title} ${styles.closed}` : styles.title}>{name}</div>
          <div className={styles.sectionDuration}>
            <Image
              className={styles.img}
              src={closed ? '/svgs/clock-disabled.svg' : '/svgs/clock.svg'}
              alt="clock"
              width={17}
              height={17}
            />
            <p className={closed ? `${styles.duration} ${styles.closed}` : styles.duration}>{duration}</p>
          </div>
          <div className={styles.sectionAddress}>
            <Image
              className={styles.img}
              src={closed ? '/svgs/location-disabled.svg' : '/svgs/location.svg'}
              alt="location"
              width={17}
              height={17}
            />
            <p className={closed ? `${styles.address} ${styles.closed}` : styles.address}>{address}</p>
          </div>
        </div>
        <div className={styles.sectionHourlyPay}>
          <p className={closed ? `${styles.hourlyPay} ${styles.closed}` : styles.hourlyPay}>
            {`${hourlyPay.toLocaleString()}원`}
          </p>
          <PostTag closed={closed} hourlyPay={hourlyPay} originalHourlyPay={originalHourlyPay} />
        </div>
      </section>
    </div>
  );
}
