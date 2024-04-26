// import { Address, Link, ShopInfo, UserItem, UserType } from '@/apis/common.type';

// export type PostUserPayload = {
//   email: string;
//   password: string;
//   type: UserType;
// };

// type Item = {
//   id: string;
//   type: UserType;
//   email: string;
// };

// export type PostUserRes = {
//   item: Item;
//   links: Array<Link>;
// };

// type Shop = {
//   item: ShopInfo;
//   href: string;
// };

// export type GetUserRes = {
//   item: Item & {
//     shop: Shop | null;
//   };
//   links: Array<Link>;
// };

// export type PutUserPayload = {
//   name: string;
//   phone: string;
//   address: Address;
//   bio: string;
// };

// export type PutUserRes = {
//   item: UserItem & {
//     shop: { item: ShopInfo } | null;
//   };
//   links: Array<Link>;
// };

// export type ErrorPutUserRes = {
//   message: string;
// };

// export function isErrorPutUserRes(data: any): data is ErrorPutUserRes
// {return 'message' in data.data };
