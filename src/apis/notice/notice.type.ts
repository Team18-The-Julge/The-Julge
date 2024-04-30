import { BaseQuery, Link, NoticeItem, ShopItem, Sort } from '@/apis/common.type';

type Shop = {
  item: ShopItem;
  href: string;
};

type ItemInfo = NoticeItem & {
  shop: Shop;
};

export type Item = {
  item: ItemInfo;
  links: Array<Link>;
};

export type BaseNoticesRes = {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<Item>;
  links: Array<Link>;
};

export type GetNoticeListParams = BaseQuery & {
  address?: string;
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: Sort;
};

export type GetNoticeListRes = BaseNoticesRes & {
  address: Array<string>;
  keyword?: string;
};

export type GetNoticeListByShopIdRes = BaseNoticesRes;

export type PostNoticePayload = {
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
};

export type PostNoticeRes = Item;

export type GetNoticeRes = Item;

export type PutNoticePayload = PostNoticePayload;

export type PutNoticeRes = Item;
