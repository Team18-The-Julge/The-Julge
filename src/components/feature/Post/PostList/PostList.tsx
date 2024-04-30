import React from 'react';

import Post from '@/components/feature/Post/Post';
import styles from '@/components/feature/Post/PostList/PostList.module.scss';
import { PostListProps } from '@/components/feature/Post/PostType';

function PostList({ datas }: PostListProps) {
  const posts = datas.map((item) => ({
    name: item.shop?.item.name,
    id: item.id,
    startedAt: item.startsAt,
    workhour: item.workhour,
    address: item.shop?.item.address1,
    hourlyPay: item.hourlyPay,
    originalHourlyPay: item.shop?.item.originalHourlyPay,
    imageUrl: item.shop?.item.imageUrl,
    closed: item.closed,
    shopId: item.shop.item.id
  }));

  return (
    <div className={styles.listWrapper}>
      {datas.length === 0 ? (
        <div className={styles.blankWrapper}>게시물이 존재하지 않습니다.</div>
      ) : (
        posts.map((post) => <Post key={post.id} {...post} />)
      )}
    </div>
  );
}

export default PostList;
