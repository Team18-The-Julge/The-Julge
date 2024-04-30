import React from 'react';

import PostList from '@/components/feature/Post/PostList/PostList';
import PostListOne from '@/components/feature/Post/PostList/PostListOne';

const mockPosts = [
  {
    id: '1',
    startsAt: '2024-04-25T09:00:00',
    workhour: 8,
    description: '응',
    closed: false,
    shop: {
      item: {
        id: 'shop1',
        name: '명품 설렁탕',
        category: 'Category 1',
        address1: '경기도 성남시 분당구',
        address2: 'Apt 101',
        description: '응',
        imageUrl: '/images/default.png',
        originalHourlyPay: 20000
      },
      href: '/shop/shop1'
    },
    hourlyPay: 32000
  },
  {
    id: '2',
    startsAt: '2024-04-26T10:00:00',
    workhour: 6,
    description: '응',
    closed: true,
    shop: {
      item: {
        id: 'shop2',
        name: 'Shop 2',
        category: 'Category 2',
        address1: '경기도 파주시 아동동',
        address2: 'Suite 202',
        description: '응',
        imageUrl: '/images/default.png',
        originalHourlyPay: 18000
      },
      href: '/shop/shop2'
    },
    hourlyPay: 22000
  },
  {
    id: '3',
    startsAt: '2024-05-10T10:10:50',
    workhour: 10,
    description: '흠',
    closed: false,
    shop: {
      item: {
        id: 'shop3',
        name: 'Shop 3',
        category: 'Category 2',
        address1: '경기도 파주시 아동동',
        address2: 'Suite 202',
        description: '응',
        imageUrl: '/images/default.png',
        originalHourlyPay: 13000
      },
      href: '/shop/shop2'
    },
    hourlyPay: 15000
  },
  {
    id: '4',
    startsAt: '2024-05-10T10:10:50',
    workhour: 10,
    description: '응',
    closed: false,
    shop: {
      item: {
        id: 'shop4',
        name: 'Shop 4',
        category: 'Category 4',
        address1: '경기도 파주시 아동동',
        address2: 'Suite 202',
        description: '아니야',
        imageUrl: '/images/default.png',
        originalHourlyPay: 13000
      },
      href: '/shop/shop2'
    },
    hourlyPay: 2000
  }
];

export default function Page() {
  return (
    <div style={{ padding: '30px' }}>
      <div>
        <PostListOne datas={mockPosts} />
      </div>
      <hr style={{ margin: '10px' }} />
      <div>
        <PostList datas={mockPosts} />
      </div>
    </div>
  );
}
