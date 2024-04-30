import { MouseEventHandler, RefObject, useContext } from 'react';

import { Address as AddressType } from '@/apis/common.type';
import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import styles from '@/components/feature/Filter/Filter.module.scss';
import ScrollMenu from '@/components/feature/Filter/ScrollMenu/ScrollMenu';
import { ReactComponent as CloseButton } from '@/public/svgs/closeButton.svg';

import { FilterContext } from './FilterContext';

type FilterProps = {
  scrollMenuList: AddressType[];
  handleMenuClick: MouseEventHandler;
  clickedAddress: AddressType[] | undefined;
  handleResetBtnClick: MouseEventHandler;
  handleApplyBtnClick?: MouseEventHandler;
  filterRef: RefObject<HTMLDivElement>;
  // handleInputChange : SubmitEvent;
};

/**
 * Filter 컴포넌트
 * @param scrollMenuList 스크롤 메뉴에 들어갈 list, 우리 프로젝트에서는 constatns/addressList required; sring[]
 * @param handleMenuClick 메뉴를 클릭했을 때의 핸들러 . required ; MouseEventHanler
 * @param clickedAddress 클릭된 address들을 모아둔 List. required ; string[]
 * @param handleResetBtnClick 초기화 버튼 클릭시 핸들러. clickedAddress를 초기화해주고 input값도 초기화해줌. required; MouseEventHandler
 * @param handleApplyBtnClick 적용하기 버튼 클릭 시 동작할 handler ; MouseEventHandler
 * @param filterRe 필터에 걸어둔 ref
 */

export default function Filter({
  scrollMenuList,
  handleMenuClick,
  clickedAddress,
  handleResetBtnClick,
  handleApplyBtnClick,
  filterRef
}: FilterProps) {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    return null; // 로딩처리
  }

  const { close } = filterContext;
  return (
    <div className={styles.container} ref={filterRef}>
      <div className={styles.header}>
        <h1>상세 필터</h1>
        <CloseButton onClick={() => close()} />
      </div>

      <section className={styles.locationWrapper}>
        <p>위치</p>
        <ScrollMenu list={scrollMenuList} handleClick={handleMenuClick} />
        <section className={styles.badgeList}>
          {clickedAddress?.map((item) => (
            <div key={item}>
              <Badge title={item} color="red" closeBtn />
            </div>
          ))}
        </section>
      </section>

      <hr />

      <section className={styles.dateWrapper}>
        <p>시작일</p>
        <input placeholder="입력" />
      </section>

      <hr />

      <section className={styles.chargeWrapper}>
        <p>금액</p>
        <section>
          <input placeholder="입력" />
          <p>이상부터</p>
        </section>
      </section>

      <section className={styles.btnWrapper}>
        <Button
          solid={false}
          size="large"
          active
          submit={false}
          className={styles.resetBtn}
          onClick={handleResetBtnClick}
        >
          초기화
        </Button>
        <Button solid size="large" active submit={false} className={styles.applyBtn} onClick={handleApplyBtnClick}>
          적용하기
        </Button>
      </section>
    </div>
  );
}
