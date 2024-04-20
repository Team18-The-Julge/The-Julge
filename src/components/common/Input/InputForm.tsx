import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import FieldLabel from '@/components/common/Input/FieldLabel';
import Input from '@/components/common/Input/Input';
import InputContainer from '@/components/common/Input/InputContainer';
import styles from '@/components/common/Input/InputForm.module.scss';

interface InputFormProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  className?: string;
  label?: string;
  fieldLabel?: string;
  errorMessage?: string | undefined | null;
  textarea?: boolean;
  rows?: number;
  register?: UseFormRegisterReturn;
  // eslint-disable-next-line no-unused-vars
  formatter?: (value: string) => string;
}

/**
 * react-hook-form과 호환되는 InputForm 컴포넌트입니다.
 * label, input, errorMessage가 포함되어있습니다.
 * @param className string; InputForm 커스텀 스타일; 컨테이너의 스타일을 주입할 수 있습니다.
 * @param label string; input과 연결된 label입니다.
 * @param fieldLabel string; input 맨 뒤에 고정된 문자열; ex) '원'
 * @param errorMessage string; 에러 메세지; react-hook-form의 errors.{form}.message에 대응됩니다.
 * @param type string; input의 타입; type=number의 경우 01234 -> 1,234 형태로 포맷팅됩니다. 금액/시간 등에는 number를 사용해주세요.
 * @param textarea boolean; textarea; input을 textarea로 변경합니다.
 * @param rows number; textarea의 줄 수; textarea의 높이를 지정합니다. 기본값=5
 * @param register UseFormRegisterReturn; react-hook-form의 register('form', validator)와 대응됩니다.
 * @param required boolean; label 끝에 '*' 문자를 추가합니다.
 * @param formatter function;input의 value를 포맷팅합니다.
 * @param rest 기타 input의 모든 속성을 지원합니다.
 * @returns
 */

export default function InputForm({
  className = '',
  label = '',
  fieldLabel = '',
  errorMessage = '',
  textarea = false,
  rows = 5,
  register,
  required = false,
  ...rest
}: InputFormProps) {
  // fieldLabel 너비 지정
  const [inputFieldPaddingRight, setInputFieldPaddingRight] = useState('2rem');
  const fieldLabelRef = useRef<HTMLSpanElement>(null);

  const classes = {
    inputFieldContainer: classNames(styles.inputFieldContainer),
    inputField: classNames(fieldLabel && `paddingRight: ${inputFieldPaddingRight}`),
  };

  useEffect(() => {
    // fieldLabel 크기만큼 여백 지정
    const fieldLabelWidth = fieldLabelRef.current?.offsetWidth ?? 0;
    setInputFieldPaddingRight(`${fieldLabelWidth / 10 + 2}rem`);
  }, [fieldLabel]);

  return (
    <InputContainer className={className} label={label} required={required} errorMessage={errorMessage}>
      <div className={classes.inputFieldContainer}>
        <Input
          style={{ paddingRight: inputFieldPaddingRight }}
          id={label}
          textarea={textarea}
          rows={rows}
          invalid={!!errorMessage}
          {...register}
          {...rest}
        />
        <FieldLabel ref={fieldLabelRef}>{fieldLabel}</FieldLabel>
      </div>
    </InputContainer>
  );
}
