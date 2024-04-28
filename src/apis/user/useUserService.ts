import { useMutation, useSuspenseQuery } from '@tanstack/react-query';

import queryOptions from '@/apis/user/queries';
import { GetUserRes, PostUserPayload, PostUserRes, PutUserPayload, PutUserRes } from '@/apis/user/user.type';
import { selectData } from '@/apis/utils';

/**
 * 사용자를 등록하여 회원가입을 수행합니다.
 * @param payload \{
  email: string;
  password: string;
  type: 'employer' | 'employee';
}
 * @returns \{
  item: Item;
  links: Array\<Link>;
}
 */

export function usePostUser(payload: PostUserPayload) {
  // const [isError, setIsError] = useState(false);
  const res = useMutation(queryOptions.postUser(payload));
  return selectData<PostUserRes>(res);
}

/**
 * 특정 사용자의 정보를 조회합니다.
 * @param userId required; string
 * @returns \{
  item: Item & {
    shop: Shop | null;
  };
  links: Array\<Link>;
}
 */

export function useGetUser(userId: string) {
  const res = useSuspenseQuery(queryOptions.getUser(userId));
  return selectData<GetUserRes>(res);
}

/**
 * 특정 사용자의 정보를 수정합니다.
 * @param payload \{
  name: string;
  phone: string;
  address: Address;
  bio: string;
}
 * @returns \{
  item: UserItem & {
    shop: { item: ShopInfo } | null;
  };
  links: Array\<Link>;
}
 */

export function usePutUser(userId: string, payload: PutUserPayload) {
  const res = useMutation(queryOptions.putUser(userId, payload));
  return selectData<PutUserRes>(res);
}
