import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Sort } from '@/apis/common.type';
import { Item } from '@/apis/notice/notice.type';
import { useGetNoticeList } from '@/apis/notice/useNoticeService';
import Button from '@/components/common/Button/Button';
import SelectForm from '@/components/common/Input/SelectForm/SelectForm';
import Filter from '@/components/feature/Filter/Filter';
import { useFilter } from '@/components/feature/Filter/FilterContext';
import PostList from '@/components/feature/Post/PostList/PostList';
import Pagination from '@/components/feature/pagination/pagination';
import { addressList } from '@/libs/constants/contants';
import useManageFilter from '@/libs/hooks/useManageFilter';
import styles from '@/pages/index.module.scss';
// pagination option
const ITEMS_PER_PAGE = 6; // 페이지 당 아이템 수
const changeSortString = (sortdata: string) => {
  let sortValue;
  if (sortdata === '마감임박순') {
    sortValue = 'time';
  } else if (sortdata === '시급많은순') {
    sortValue = 'pay';
  } else if (sortdata === '시간적은순') {
    sortValue = 'hour';
  } else if (sortdata === '가나다순') {
    sortValue = 'shop';
  }
  return sortValue;
};
// selectForm option
type IFormInput = {
  filter: { value: string; label: string };
};
const optionList = ['마감임박순', '시급많은순', '시간적은순', '가나다순'];
const defaultFormValues = {
  filter: { value: '마감임박순', label: '마감임박순' } // SelectForm의 기본값은 {value,label} 객체쌍으로 전달해주세요.
};

type PostSearchProps = {
  search?: string;
};
export type ApiParamData = {
  currentPage: number;
  offsetNum: number;
  keyword: string;
  address?: Array<string>;
  startsAtGte?: number;
  hourlyPayGte?: number;
};

function PostSearch({ search = '' }: PostSearchProps) {
  // selectForm option
  const {
    control, // react-hook-form의 Controller에 연결됩니다.
    formState: { errors }, // 폼 상태 객체입니다. errors['form'].message에 validate의 에러 메세지가 저장됩니다.
    watch
  } = useForm<IFormInput>({
    defaultValues: defaultFormValues, // 폼 기본값
    mode: 'onBlur' // onBlur 시 검증
  });

  // useState
  const [apiParamData, setApiParamData] = useState({
    currentPage: 1, // 현재 페이지 위치
    offsetNum: 0,
    keyword: search,
    address: undefined,
    startsAtGte: undefined,
    hourlyPayGte: undefined
  });
  const sort = watch('filter').value;
  const sortData = changeSortString(sort);
  // filter
  const { isOpen, toggle } = useFilter();
  const { filterRef, handleMenuClick, filterData, handleResetBtnClick, handleApplyBtnClick } = useManageFilter(
    setApiParamData,
    apiParamData
  );
  const handlefilterClick = () => {
    toggle();
  };

  // data 받아오기
  const { data } = useGetNoticeList({
    limit: ITEMS_PER_PAGE,
    offset: apiParamData.offsetNum,
    keyword: apiParamData.keyword,
    startsAtGte: apiParamData.startsAtGte,
    sort: sortData as Sort,
    hourlyPayGte: apiParamData.hourlyPayGte,
    address: apiParamData.address
  });

  const totalItem = data.count;
  const totalPages: number = Math.ceil(totalItem / ITEMS_PER_PAGE);
  useEffect(() => {
    setApiParamData({
      ...apiParamData,
      offsetNum: (apiParamData.currentPage - 1) * ITEMS_PER_PAGE
    });
    console.log(`address = ${apiParamData.address}`);
  }, [apiParamData.currentPage, data.items, ITEMS_PER_PAGE]);

  // 페이지 위치 변경
  const onPageChange = (page: number): void => {
    setApiParamData({
      ...apiParamData,
      currentPage: page
    });
  };
  const dataList = data.items.map((item: Item) => {
    return item.item;
  });

  let pageTitle = <h2>전체 공고</h2>;

  if (search) {
    pageTitle = (
      <h2>
        <span className={styles.highlight}>{search}</span>에 대한 공고 목록
      </h2>
    );
  }

  return (
    <section className={styles.noticeContainer}>
      <article className={styles.noticeList}>
        <div className={styles.txtContent}>
          {pageTitle}
          <div className={styles.condition}>
            <Controller
              name="filter"
              control={control}
              render={({ field }) => (
                <SelectForm
                  size="filter"
                  errorMessage={errors.filter?.message}
                  className={styles.filterInput}
                  instanceId="filter"
                  optionList={optionList}
                  {...field}
                />
              )}
            />
            <div className={styles.filterContent}>
              <Button solid active size="small" onClick={handlefilterClick} className={styles.filterBt}>
                상세필터
              </Button>
              {/* filter도 추가 */}
              {isOpen && (
                <Filter
                  scrollMenuList={addressList}
                  handleMenuClick={handleMenuClick}
                  clickedAddress={filterData.address}
                  handleResetBtnClick={handleResetBtnClick}
                  handleApplyBtnClick={handleApplyBtnClick}
                  setApiParamData={setApiParamData}
                  filterRef={filterRef}
                  apiData={apiParamData}
                />
              )}
            </div>
          </div>
        </div>
        <PostList datas={dataList} />
      </article>
      <Pagination currentPage={apiParamData.currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </section>
  );
}

export default PostSearch;
