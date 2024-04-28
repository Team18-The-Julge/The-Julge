export type Category = '한식' | '중식' | '일식' | '양식' | '분식' | '카페' | '편의점' | '기타';

export type UserType = 'employer' | 'employee';

export type Status = 'pending' | 'accepted' | 'rejected' | 'canceled';

export type Sort = 'time' | 'pay' | 'hour' | 'shop';

export type Result = 'accepted' | 'rejected';

export type Address =
  | '서울시 종로구'
  | '서울시 중구'
  | '서울시 용산구'
  | '서울시 성동구'
  | '서울시 광진구'
  | '서울시 동대문구'
  | '서울시 중랑구'
  | '서울시 성북구'
  | '서울시 강북구'
  | '서울시 도봉구'
  | '서울시 노원구'
  | '서울시 은평구'
  | '서울시 서대문구'
  | '서울시 마포구'
  | '서울시 양천구'
  | '서울시 강서구'
  | '서울시 구로구'
  | '서울시 금천구'
  | '서울시 영등포구'
  | '서울시 동작구'
  | '서울시 관악구'
  | '서울시 서초구'
  | '서울시 강남구'
  | '서울시 송파구'
  | '서울시 강동구';

export type ShopInfo = {
  name: string;
  category: Category;
  address1: Address;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export type ShopItem = {
  id: string;
  name: string;
  category: string;
  address1: string;
  address2: string;
  description: string;
  imageUrl: string;
  originalHourlyPay: number;
};

export type NoticeItem = {
  id: string;
  hourlyPay: number;
  startsAt: string;
  workhour: number;
  description: string;
  closed: boolean;
};

export type ApplicationItem = {
  id: string;
  status: Status;
};

export type UserInfo = {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
};

export type UserItem = UserInfo & {
  item: {
    id: string;
    email: string;
    type: UserType;
  };
};

export type BaseQuery = {
  offset?: number;
  limit?: number;
};

export type Link = {
  rel: string;
  description: string;
  method: string;
  href: string;
  body?: unknown;
  query?: BaseQuery & {
    address?: string;
    keyword?: string;
    startsAtGte?: string;
    hourlyPayGte?: number;
    sort?: Sort;
  };
};
