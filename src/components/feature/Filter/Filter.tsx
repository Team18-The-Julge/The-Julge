import { MouseEventHandler, RefObject, useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { Address as AddressType } from '@/apis/common.type';
import Badge from '@/components/common/Badge/Badge';
import Button from '@/components/common/Button/Button';
import DateTimeForm from '@/components/common/Input/DateTimeForm/DateTimeForm';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import styles from '@/components/feature/Filter/Filter.module.scss';
import { FilterContext } from '@/components/feature/Filter/FilterContext';
import ScrollMenu from '@/components/feature/Filter/ScrollMenu/ScrollMenu';
import { formatNumber, removeCommasNumber } from '@/libs/utils/formatter';
import { ReactComponent as CloseButton } from '@/public/svgs/closeButton.svg';

// 폼 타입입니다.
type IFormInput = {
  hourlyPay: number;
  startsAt: string;
  description?: string;
};
// 폼 기본값입니다.
const defaultFormValues = {
  hourlyPay: 0,
  startsAt: new Date().toISOString() // api에서 날짜의 기본 포맷은 ISO8601입니다.
};

type FilterProps = {
  scrollMenuList: AddressType[];
  handleMenuClick: MouseEventHandler;
  clickedAddress: AddressType[] | undefined;
  handleResetBtnClick: MouseEventHandler;
  handleApplyBtnClick: () => void;
  // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-explicit-any
  setApiParamData: any;
  filterRef: RefObject<HTMLDivElement>;
  // eslint-disable-next-line no-empty-pattern, @typescript-eslint/no-explicit-any
  apiData: any;
  // handleInputChange : SubmitEvent;
};

/**
 * Filter 컴포넌트
 * @param scrollMenuList 스크롤 메뉴에 들어갈 list, 우리 프로젝트에서는 constatns/addressList required; sring[]
 * @param handleMenuClick 메뉴를 클릭했을 때의 핸들러 . required ; MouseEventHanler
 * @param clickedAddress 클릭된 address들을 모아둔 List. required ; string[]
 * @param handleResetBtnClick 초기화 버튼 클릭시 핸들러. clickedAddress를 초기화해주고 input값도 초기화해줌. required; MouseEventHandler
 * @param setApiParamData 적용하기 버튼 클릭 시 동작할 handler ; MouseEventHandler
 * @param filterRe 필터에 걸어둔 ref
 */

export default function Filter({
  scrollMenuList,
  handleMenuClick,
  clickedAddress,
  handleResetBtnClick,
  handleApplyBtnClick,
  filterRef,
  setApiParamData,
  apiData
}: FilterProps) {
  const filterContext = useContext(FilterContext);

  if (!filterContext) {
    return null; // 로딩처리
  }

  const { close } = filterContext;
  const {
    control, // react-hook-form의 Controller에 연결됩니다.
    formState: { errors }, // 폼 상태 객체입니다. errors['form'].message에 validate의 에러 메세지가 저장됩니다.
    // watch,
    getValues,
    handleSubmit
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useForm<IFormInput>({
    defaultValues: defaultFormValues, // 폼 기본값
    mode: 'onBlur' // onBlur 시 검증
  });

  // const watchTime = watch('startsAt');
  const onSubmit = () => {
    // Raw 인풋 데이터를 올바른 값으로 변경합니다.
    const hourlyPay = removeCommasNumber(getValues('hourlyPay').toString());
    const startsAt = new Date(getValues('startsAt')).toISOString();
    console.log(hourlyPay, startsAt);
    // eslint-disable-next-line no-unused-expressions
    handleApplyBtnClick();
    setApiParamData({ ...apiData, startsAtGte: startsAt, hourlyPayGte: hourlyPay });
  };

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
        <Controller
          name="startsAt"
          control={control}
          render={({ field }) => (
            <DateTimeForm
              className={styles.input}
              label="시간 라벨"
              required
              errorMessage={errors.startsAt?.message}
              {...field}
            />
          )}
        />
      </section>

      <hr />

      <section className={styles.chargeWrapper}>
        <p>금액</p>
        <section>
          <Controller
            name="hourlyPay"
            control={control}
            render={({ field }) => (
              <InputForm
                className={styles.input}
                label="시급"
                fieldLabel="원"
                errorMessage={errors.hourlyPay?.message}
                formatter={formatNumber}
                {...field}
              />
            )}
          />
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
        <Button solid size="large" active submit={false} className={styles.applyBtn} onClick={handleSubmit(onSubmit)}>
          적용하기
        </Button>
      </section>
    </div>
  );
}
