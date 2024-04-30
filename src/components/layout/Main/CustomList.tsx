/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import { Item } from '@/apis/notice/notice.type';
import { useGetNoticeList } from '@/apis/notice/useNoticeService';
import Post from '@/components/feature/Post/Post';
import { PostData, PostProps } from '@/components/feature/Post/PostType';
// import styles from '@/pages/index.module.scss';

import 'swiper/css';
import 'swiper/css/pagination';
// import required modules
// eslint-disable-next-line import/order
import { Autoplay, Pagination } from 'swiper/modules';

function CustomList() {
  const { data } = useGetNoticeList({ limit: 10 });
  const customPost = data.items.map((item: Item) => {
    return item.item;
  });

  const posts = customPost.map((item: PostData) => ({
    name: item.shop?.item.name,
    id: item.id,
    startedAt: item.startsAt,
    workhour: item.workhour,
    address: item.shop?.item.address1,
    hourlyPay: item.hourlyPay,
    originalHourlyPay: item.shop?.item.originalHourlyPay,
    imageUrl: item.shop?.item.imageUrl,
    closed: item.closed,
    shopId: item.shop?.item.id
  }));

  return (
    <Swiper
      spaceBetween={14}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: true
      }}
      navigation
      slidesPerView={3}
      modules={[Autoplay, Pagination]}
      className="swiper"
    >
      {posts.map(
        (post: PostProps) =>
          !post.closed && (
            <SwiperSlide key={post.id}>
              <Post key={post.id} {...post} />
            </SwiperSlide>
          )
      )}
    </Swiper>
  );
}

export default CustomList;
