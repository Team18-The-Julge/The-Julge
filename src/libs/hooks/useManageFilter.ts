/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState, MouseEventHandler } from 'react';

import { Address as AddressType } from '@/apis/common.type';
import { useFilter } from '@/components/feature/Filter/FilterContext';

type filterDataType = {
  address?: AddressType[];
  startDate?: string;
  charge?: number;
};

export default function useManageFilter(setApiParamData: any, apiParamData: any) {
  const filterRef = useRef<HTMLDivElement>(null); // ref 객체 생성
  const { close } = useFilter();
  const [filterData, setFilterData] = useState<filterDataType>({});
  const [selectAddress, setSelectAddress] = useState<AddressType[]>([]);
  let reset = false;
  useEffect(() => {
    console.log(reset);
    if (!reset) {
      setFilterData({ address: selectAddress });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      reset = true;
    }
    function handleClickOutside(e: MouseEvent) {
      const { target } = e;
      if (filterRef.current && !filterRef.current.contains(target as Node)) {
        close(); // 외부 클릭 시 close 함수 호출
      }
    }
    // 이벤트 리스너 추가
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterRef, close]);

  const handleMenuClick: MouseEventHandler<HTMLElement> = (e) => {
    const clickedMenuText = e.currentTarget.textContent as AddressType;
    if (clickedMenuText && !filterData.address?.find((item) => item === clickedMenuText)) {
      setFilterData((prev) => ({ ...prev, address: [...(prev.address || []), clickedMenuText] }));
    }
    console.log(filterData);
  };
  const handleResetBtnClick: MouseEventHandler<HTMLButtonElement> = () => {
    setFilterData({ address: [], startDate: undefined, charge: undefined });
  };
  // 이건 나중에 적용하기 했을 때 돌아갈 로직을 적으시면 됩니다.
  const handleApplyBtnClick = () => {
    setSelectAddress(filterData.address ?? []);
    const add = filterData.address;
    setApiParamData({ ...apiParamData, address: add });
    console.log(`이거 ${add}`);
    close();
  };

  return { filterRef, handleMenuClick, filterData, handleResetBtnClick, handleApplyBtnClick };
}
