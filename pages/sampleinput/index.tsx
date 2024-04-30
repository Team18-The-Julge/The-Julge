import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import DateTimeForm from '@/components/common/Input/DateTimeForm/DateTimeForm';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import SelectForm from '@/components/common/Input/SelectForm/SelectForm';
import { formatNumber, formatPhoneNumber, removeCommasNumber, removeHyphens } from '@/libs/utils/formatter';
import styles from '@/pages/sampleinput/index.module.scss';

// SelectForm 드롭다운 옵션입니다.
const optionList = [
  '서울시 종로구',
  '서울시 중구',
  '서울시 용산구',
  '서울시 성동구',
  '서울시 광진구',
  '서울시 동대문구',
  '서울시 중랑구',
  '서울시 성북구',
  '서울시 강북구',
  '서울시 도봉구',
  '서울시 노원구',
  '서울시 은평구',
  '서울시 서대문구',
  '서울시 마포구',
  '서울시 양천구',
  '서울시 강서구',
  '서울시 구로구',
  '서울시 금천구',
  '서울시 영등포구',
  '서울시 동작구',
  '서울시 관악구',
  '서울시 서초구',
  '서울시 강남구',
  '서울시 송파구',
  '서울시 강동구'
];

// 폼 타입입니다.
interface IFormInput {
  email: string;
  password: string;
  hourlyPay: number;
  phone?: string;
  startsAt: string;
  address: string | { value: string; label: string };
  description?: string;
}

// 폼 기본값입니다.
const defaultFormValues = {
  email: '',
  password: '',
  hourlyPay: 0,
  phone: '',
  startsAt: new Date().toISOString(), // api에서 날짜의 기본 포맷은 ISO8601입니다.
  address: { value: '서울시 용산구', label: '서울시 용산구' } // SelectForm의 기본값은 {value,label} 객체쌍으로 전달해주세요.
};

// 폼 검증 객체입니다.
const validate = {
  email: {
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, // 값이 만족해야 하는 문자열 포맷입니다.
      message: '올바른 이메일 주소가 아닙니다.' // pattern.value를 만족하지 못할 경우 erros에 message가 전달됩니다.
    },
    required: '이메일을 입력해 주세요.', // 값이 없을 경우 errors에 message가 전달됩니다.
    submit: '이메일을 확인해 주세요.' // 폼 제출 시 값에 문제가 있을 경우 errors에 message가 전달됩니다.
  },
  password: {
    required: '비밀번호를 입력해 주세요.',
    submit: '비밀번호을 확인해 주세요.'
  },
  phone: {
    required: '전화번호를 입력해 주세요.',
    submit: '비밀번호를 확인해 주세요.'
  },
  startsAt: {
    required: '시간을 선택해 주세요.',
    submit: '시간을 확인해 주세요.'
  },
  address: {
    required: '주소를 선택해 주세요.',
    submit: '주소를 확인해 주세요.'
  }
};

/** **********************************
 * react-hook-form 사용 예시 페이지입니다.
 ********************************** */
export default function InputPage() {
  // useForm에서 필요한 속성을 불러옵니다.
  const {
    control, // react-hook-form의 Controller에 연결됩니다.
    register, // 폼 데이터 관련 객체입니다. value, onChange 등 input 속성이 포함되어 있습니다.
    handleSubmit, // 폼 제출 시 호출할 함수입니다.
    // setError, // 에러를 의도적으로 생성합니다. API에서 받아온 에러를 errors에 전달할 수 있습니다. ex) setError('form', { type: 'form', message: 'api 에러 메세지입니다.' });
    formState: { errors } // 폼 상태 객체입니다. errors['form'].message에 validate의 에러 메세지가 저장됩니다.
  } = useForm<IFormInput>({
    defaultValues: defaultFormValues, // 폼 기본값
    mode: 'onBlur' // onBlur 시 검증
  });

  // useForm register를 모아놓은 객체입니다.
  const registerList = {
    hourlyPay: register('hourlyPay'),
    phone: register('phone', validate.phone),
    startsAt: register('startsAt', validate.startsAt),
    address: register('address', validate.address),
    description: register('description')
  };

  // 폼 제출 시 handleSubmit에서 호출할 함수입니다.
  const onSubmit = (data: IFormInput) => {
    const cleanedData = { ...data }; // 최종 제출할 데이터입니다.

    // Raw 인풋 데이터를 올바른 값으로 변경합니다.
    Object.keys(cleanedData).forEach((key) => {
      // 빈 값, 0, undefined, null 키 제거
      if (!cleanedData[key as keyof IFormInput]) {
        delete cleanedData[key as keyof IFormInput];
      }
      // 전화번호 하이픈 제거
      if (cleanedData.phone) {
        cleanedData.phone = removeHyphens(cleanedData.phone);
      }
      // 주소에서 value만 추출
      if (cleanedData.address && typeof cleanedData.address === 'object') {
        cleanedData.address = cleanedData.address.value; // 'value'만 추출
      }
      // 시급을 숫자로 변환
      if (cleanedData.hourlyPay) {
        cleanedData.hourlyPay = removeCommasNumber(cleanedData.hourlyPay.toString());
      }
      // 시간을 ISO8601 형식으로 변환
      if (cleanedData.startsAt) {
        cleanedData.startsAt = new Date(cleanedData.startsAt).toISOString();
      }
    });

    console.log('제출', cleanedData);

    // 폼 제출 액션을 여기에서 호출합니다.
    // 페이지 이동, API 호출, ...
  };

  // 폼 JSX 예시입니다.
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* 이메일
      <InputForm
        className={styles.input}
        label="이메일"
        type="email"
        required
        errorMessage={errors.email?.message}
        {...registerList.email}
      />
      {/* 비밀번호 
      <InputForm
        className={styles.input}
        label="비밀번호"
        type="password"
        required
        errorMessage={errors.password?.message}
        {...registerList.password}
      /> */}
      {/* 시급 */}
      <Controller
        name="hourlyPay"
        control={control}
        render={({ field }) => (
          <InputForm
            className={styles.input}
            label="시급"
            errorMessage={errors.hourlyPay?.message}
            formatter={formatNumber}
            {...field}
          />
        )}
      />
      {/* 전화번호 */}
      <Controller
        name="phone"
        control={control}
        render={({ field }) => (
          <InputForm
            className={styles.input}
            label="전화번호"
            required
            errorMessage={errors.phone?.message}
            formatter={formatPhoneNumber}
            {...field}
          />
        )}
      />
      {/* 시간 */}
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
      {/* 주소 */}
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <SelectForm
            label="선택 라벨"
            errorMessage={errors.address?.message}
            required
            className={styles.input}
            instanceId="address"
            optionList={optionList}
            placeholder="선택"
            {...field}
          />
        )}
      />
      {/* 소개 */}
      <InputForm className={styles.input} label="소개" textarea {...registerList.description} placeholder="소개" />
      {/* 폼 제출 버튼 */}
      <Button className={styles.input} onClick={handleSubmit(onSubmit)} type="submit" solid size="large" active>
        제출하기
      </Button>
    </form>
  );
}
