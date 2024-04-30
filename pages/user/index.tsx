import { jwtDecode } from 'jwt-decode';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { GetApplicationListRes } from '@/apis/application/application.type';
import { useGetApplicationListByUserId } from '@/apis/application/useApplicationService';
import { useGetUser } from '@/apis/user/useUserService';
import ApplyDetail from '@/components/layout/UserPage/ApplyDetail';
import ProfileCard from '@/components/layout/UserPage/ProfileCard';
import { pageList } from '@/libs/constants/contants';
import styles from '@/pages/user/index.module.scss';

type UserData = {
  item: {
    id: string;
    name: string;
    phone: string;
    address: string;
    bio: string;
  };
};

type Props = {
  userId: string;
  userData: UserData;
  applicationData: GetApplicationListRes;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { cookies } = req;
  const { token } = cookies;

  if (!token) {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }

  const userId = jwtDecode<{ userId: string }>(token).userId ?? '';

  if (!userId) {
    return {
      redirect: {
        destination: pageList.home(),
        permanent: false
      }
    };
  }
  return { props: { userId } };
};

export default function UserDetailPage({ userId }: Props) {
  const { data: userData } = useGetUser(userId);
  const { data: applicationData } = useGetApplicationListByUserId(userData?.item.id, { offset: 0, limit: 5 });

  const router = useRouter();
  const onClickList = () => {
    router.push(pageList.home());
  };
  const isRegisterd = !!(userData?.item && userData?.item.name);

  if (!userData || !applicationData) return null;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <section className={`${styles.profileSection} ${!isRegisterd ? styles.columnDirection : ''}`}>
          <h1>내 프로필</h1>
          <ProfileCard isRegisterd={isRegisterd} {...userData.item} />
        </section>
        {isRegisterd && (
          <section className={styles.listSection}>
            <h1>신청 내역</h1>
            <ApplyDetail applicationData={applicationData} onClickList={onClickList} />
          </section>
        )}
      </div>
    </div>
  );
}
