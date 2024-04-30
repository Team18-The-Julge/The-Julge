/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

import { useGetNotice } from '@/apis/notice/useNoticeService';
import Post from '@/components/feature/Post/Post';
import styles from '@/components/feature/Post/PostList/RecentPostList.module.scss';

function RecentPostList({ noticeList }: { noticeList: Array<{ noticeId: string; shopId: string }> }) {
  const { data: data1 } = useGetNotice(noticeList[0].shopId, noticeList[0].noticeId);
  const { data: data2 } = useGetNotice(noticeList[1].shopId, noticeList[1].noticeId);
  const { data: data3 } = useGetNotice(noticeList[2].shopId, noticeList[2].noticeId);
  const { data: data4 } = useGetNotice(noticeList[3].shopId, noticeList[3].noticeId);
  const { data: data5 } = useGetNotice(noticeList[4].shopId, noticeList[4].noticeId);
  const { data: data6 } = useGetNotice(noticeList[5].shopId, noticeList[5].noticeId);

  data1.item.key = 'data1';
  data2.item.key = 'data2';
  data3.item.key = 'data3';
  data4.item.key = 'data4';
  data5.item.key = 'data5';
  data6.item.key = 'data6';

  const datas = [data1.item, data2.item, data3.item, data4.item, data5.item, data6.item];

  const posts = datas.map((item) => ({
    key: item.key,
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
    <div className={styles.listWrapper}>
      {datas.length === 0 ? (
        <div className={styles.blankWrapper}>게시물이 존재하지 않습니다.</div>
      ) : (
        posts.map((post) => {
          const { key, ...rest } = post;
          console.log('key', key);
          return <Post key={key} {...rest} />;
        })
      )}
    </div>
  );
}

export default RecentPostList;
