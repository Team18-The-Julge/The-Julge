import { useAtomValue } from 'jotai';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

import AlertService from '@/apis/alert/Alert.service';
import { GetAlertListRes } from '@/apis/alert/alert.type';
import UserService from '@/apis/user/User.service';
import Gnb from '@/components/common/Gnb/Gnb';
// import { useAtom } from 'jotai';
import alertListAtom from '@/components/feature/NotificationModal/NotificationAtom';

function GnbData() {
  const [userType, setUserType] = useState<'guest' | 'employee' | 'employer'>('guest');
  const [alertList, setAlertList] = useState<GetAlertListRes>({
    offset: 0,
    limit: 5,
    count: 0,
    hasNext: false,
    items: [],
    links: []
  });

  const postId = useAtomValue(alertListAtom);
  useEffect(() => {
    const fetchData = async () => {
      const token = Cookies.get('token');
      let userId = '';
      if (token) {
        userId = jwtDecode<{ userId: string }>(token).userId ?? '';
      }
      if (!userId) {
        setUserType('guest');
        return;
      }

      try {
        const userInfo = await UserService.getUser(userId);
        if (!userInfo.data) {
          setUserType('guest');
        }

        const user = userInfo.data.item;
        setUserType(user.type);

        if (user.type === 'employee' || user.type === 'employer') {
          const params = { offset: 0, limit: 5 };
          const alertListData = await AlertService.getAlertList(userId, params);
          console.log(alertListData);
          setAlertList(alertListData.data);
        }
      } catch (error) {
        setUserType('guest');
      }
    };
    fetchData();
    console.log(postId);
  }, [postId]);
  return <Gnb alertList={alertList} userType={userType} />;
}

export default GnbData;
