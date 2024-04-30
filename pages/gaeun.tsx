// import Filter from '@/components/feature/Filter/Filter';
// import { useFilter } from '@/components/feature/Filter/FilterContext';
// import { addressList } from '@/libs/constants/contants';
// import useManageFilter from '@/libs/hooks/useManageFilter';

// // const alertlist = [
// //   {
// //     shop: 'gaeunshop',
// //     result: 'rejected',
// //     createdAt: '2024-04-17T18:41:16.187Z', // createdAt
// //     startsAt: '2024-04-23T06:00:00Z', // notice - startsAt
// //     workhour: 8
// //   },
// //   {
// //     shop: 'gaeunshop1',
// //     result: 'accepted',
// //     createdAt: '2024-04-17T18:41:16.187Z', // createdAt
// //     startsAt: '2024-04-23T06:00:00Z', // notice - startsAt
// //     workhour: 9
// //   }
// // ];
// export default function Gaeun() {
//   const { isOpen, open } = useFilter();
//   const { filterRef, handleMenuClick, filterData, handleResetBtnClick, handleApplyBtnClick } = useManageFilter();
// // import { useState, MouseEventHandler, useEffect, useRef } from 'react';

// // import { Address as AddressType } from '@/apis/common.type';
// // //import RadioInputForm from '@/components/common/Input/RadioInputForm/RadioInputForm';
// // import { Filter, useFilter } from '@/components/feature/Filter/Filter';
// // import NotificationModal from '@/components/feature/NotificationModal/NotificationModal';
// // import { addressList } from '@/libs/constants/constatns';
// // //import { userInfoAtom } from '@/components/feature/AuthForm/AuthAtom'; // 유저 정보 저장된 거 가져오기
// // import { useAtom } from 'jotai';
// // const alertlist = [
// //   {
// //     shop: 'gaeunshop',
// //     result: 'rejected',
// //     createdAt: '2024-04-17T18:41:16.187Z', // createdAt
// //     startsAt: '2024-04-23T06:00:00Z', // notice - startsAt
// //     workhour: 8
// //   },
// //   {
// //     shop: 'gaeunshop1',
// //     result: 'accepted',
// //     createdAt: '2024-04-17T18:41:16.187Z', // createdAt
// //     startsAt: '2024-04-23T06:00:00Z', // notice - startsAt
// //     workhour: 9
// //   }
// // ];
// // export default function Gaeun() {
// //   const filterRef = useRef<HTMLDivElement>(null); // ref 객체 생성
// //   const { isOpen, open, close } = useFilter();

// //   //새이렇게 갖다가 쓰시면 됩니다.
// //   const [userInfo] = useAtom(userInfoAtom);
// //   console.log(userInfo);
// //   // 여기는 hook으로 뺄겁니다.
// //   // 외부 클릭 감지를 위한 useEffect
// //   useEffect(() => {
// //     function handleClickOutside(e: MouseEvent) {
// //       const { target } = e;
// //       if (filterRef.current && !filterRef.current.contains(target as Node)) {
// //         close(); // 외부 클릭 시 close 함수 호출
// //       }
// //     }

// //     // 이벤트 리스너 추가
// //     document.addEventListener('mousedown', handleClickOutside);

// //     return () => {
// //       // 컴포넌트 언마운트 시 이벤트 리스너 제거
// //       document.removeEventListener('mousedown', handleClickOutside);
// //     };
// //   }, [filterRef, close]); // 의존성 배열에 ref와 close 함수 추가

// //   // clickedAddress 필수로 관리 해주세요 (prop으로 넘김) => 시작일과 금액도 같이 객체로 관리해주세요
// //   const [clickedAddress, setClickedAddress] = useState<AddressType[]>([]);

// //   // 다음 handleMenuClick을 선언하고
// //   const handleMenuClick: MouseEventHandler<HTMLElement> = (e) => {
// //     const clickedMenuText = e.currentTarget.textContent as AddressType;
// //     if (clickedMenuText && !clickedAddress.find((item) => item === clickedMenuText)) {
// //       setClickedAddress((prev) => [...prev, clickedMenuText]);
// //     }
// //   };
// //   // 이건 이렇게 똑같이 작성해서 사용하시면 됩니다.
// //   const handleResetBtnClick = () => {
// //     setClickedAddress([]);
// //   };
// //   // 이건 나중에 적용하기 했을 때 돌아갈 로직을 적으시면 됩니다.
// //   const handleApplyBtnClick = () => {
// //     console.log('적용');
// //     close();
// //   };

//   if (!isOpen) {
//     return (
//       <button type="button" onClick={open}>
//         click
//       </button>
//     );
//   }
//   return (
//     <>
//       <div>
//         <Filter
//           scrollMenuList={addressList}
//           handleMenuClick={handleMenuClick}
//           clickedAddress={clickedAddress}
//           handleResetBtnClick={handleResetBtnClick}
//           handleApplyBtnClick={handleApplyBtnClick}
//           filterRef={filterRef}
//         />
//       </div>
//       <NotificationModal alertCount={6} alertList={alertlist} isModalShow />
//     </>
//   );
// }
