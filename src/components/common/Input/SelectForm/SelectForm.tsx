/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from 'react';
import Select, { GroupBase, SelectInstance, components } from 'react-select';

import styles from '@/components/common/Input/SelectForm/SelectForm.module.scss';
import { ReactComponent as DropdownSvg } from '@/public/svgs/dropdown.svg';
import { ReactComponent as SmallDropdownSvg } from '@/public/svgs/smallDropdown.svg';

import InputContainer, { InputContainerProps } from '../InputContainer';

const selectStyles = {
  control: (provided: any) => ({
    ...provided,
    width: `10.5rem`,
    padding: '1.6rem 2rem',
    borderRadius: '0.6rem',
    border: '0.1rem solid #CBC9CF',
    boxShadow: 'none',
    background: '#FFF',
    '&:hover': {},
    '&:focus': {},
    '&:active': {}
  }),
  valueContainer: (provided: any) => ({
    ...provided,
    padding: '0'
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: '1.6rem',
    fontWeight: '400',
    lineHeight: '2.6rem',
    margin: '0',
    color: '#111322'
  }),
  menu: (provided: any) => ({
    ...provided,
    marginTop: '0.8rem',
    textAlign: 'center',
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: '1.4rem',
    fontWeight: '400',
    lineHeight: '2.2rem',
    color: '#111322',
    borderRadius: '0.6rem',
    border: '0.1rem solid #E5E4E7',
    boxShadow: '0 0.4rem 2.5rem 0 rgba(0, 0, 0, 0.10)'
  }),
  menuList: (provided: any) => ({
    ...provided,
    // 스크롤바
    '::-webkit-scrollbar': {
      width: '1.2rem'
    },
    // 스크롤바 핸들
    '::-webkit-scrollbar-thumb': {
      cursor: 'default',
      background: '#7d7986',
      borderRadius: '9999rem',
      backgroundClip: 'padding-box',
      border: '0.4rem solid transparent'
    }
  }),
  option: (provided: any, state: { isSelected: boolean }) => ({
    ...provided,
    padding: '1.2rem 0',
    background: state.isSelected ? '#e5e4e7' : 'none',
    color: '#111322',
    borderBottom: '0.1rem solid #f2f2f3',
    '&:last-of-type': {
      borderBottom: 'none'
    },
    '&:hover': { background: !state.isSelected && '#f2f2f3' },
    '&:active': { background: '#e5e4e7' }
  }),
  placeholder: (provided: any) => ({
    ...provided,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: '1.6rem',
    fontWeight: '400',
    lineHeight: '2.6rem',
    color: '#A4A1AA',
    margin: '0'
  }),
  indicatorSeparator: () => ({}),
  dropdownIndicator: (provided: any) => ({
    ...provided,
    padding: '0'
  }),
  input: (provided: any) => ({
    ...provided
  })
};

const selectSmallStyle = {
  ...selectStyles,
  option: (provided: any, state: { isSelected: boolean }) => ({
    ...provided,
    padding: '0.8rem 0',
    background: state.isSelected ? '#e5e4e7' : 'none',
    color: '#111322',
    borderBottom: '0.1rem solid #f2f2f3',
    '&:first-of-type': {
      paddingTop: '1.2rem'
    },
    '&:last-of-type': {
      borderBottom: 'none',
      paddingBottom: '1.2rem'
    },
    '&:hover': { background: !state.isSelected && '#f2f2f3' },
    '&:active': { background: '#e5e4e7' }
  })
};

const selectErrorStyle = {
  ...selectStyles,
  control: (provided: any) => ({
    ...provided,
    padding: '1.6rem 2rem',
    borderRadius: '0.6rem',
    border: '0.1rem solid #ff4040',
    boxShadow: 'none',
    background: '#FFF',
    '&:hover': {},
    '&:focus': {
      border: '0.1rem solid #cbc9cf'
    },
    '&:active': {}
  })
};

const selectSmallErrorStyle = {
  ...selectSmallStyle,
  control: (provided: any) => ({
    ...provided,
    padding: '1.6rem 2rem',
    borderRadius: '0.6rem',
    border: '0.1rem solid #ff4040',
    boxShadow: 'none',
    background: '#FFF',
    '&:hover': {},
    '&:focus': {
      border: '0.1rem solid #cbc9cf'
    },
    '&:active': {}
  })
};

// 공고 정렬 select style
const selectFilterStyle = {
  ...selectSmallStyle,
  control: (provided: any) => ({
    ...provided,
    minHeight: '3rem',
    padding: '0.5rem 1rem',
    borderRadius: '0.6rem',
    gap: '0.6rem',
    border: '0',
    boxShadow: 'none',
    background: '#F2F2F3',
    '&:hover': {},
    '&:focus': {},
    '&:active': {}
  }),
  singleValue: (provided: any) => ({
    ...provided,
    fontFamily: 'SpoqaHanSansNeo-Regular',
    fontSize: '1.2rem',
    fontWeight: '400',
    lineHeight: 'normal',
    color: '#111322',
    textAlign: 'center'
  })
};

function DropdownIndicator(props: any) {
  const { size, selectProps } = props;
  const { menuIsOpen } = selectProps;
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        {size === 'filter' ? (
          <SmallDropdownSvg transform={menuIsOpen ? 'rotate(180)' : ''} />
        ) : (
          <DropdownSvg transform={menuIsOpen ? 'rotate(180)' : ''} />
        )}
      </components.DropdownIndicator>
    )
  );
}

interface SelectFormProps extends React.ComponentProps<typeof Select>, InputContainerProps {
  size?: 'large' | 'small' | 'filter';
  instanceId: string;
  optionList: string[];
}

/**
 * react-select를 이용한 Select 컴포넌트입니다.
 * react-hook-form의 Controller에 대응됩니다.
 * @param className string; 컨테이너의 스타일을 주입할 수 있습니다.
 * @param size large | small | 'filter'; 드롭다운 사이즈입니다. 기본값=large
 * @param instanceId string; 렌더링 시 요구되는 고유한 id입니다. react-select 요구사항입니다.
 * @param optionList string[]; 옵션 리스트입니다.
 * @param label string; input과 연결된 label입니다.
 * @param required boolean; label 끝에 '*' 문자를 추가합니다.
 * @param errorMessage string; 에러 메세지; react-hook-form의 errors.{form}.message에 대응됩니다.
 */

const SelectForm = forwardRef<React.Ref<Select>, SelectFormProps>(
  (
    {
      className = '',
      size = 'large',
      instanceId,
      optionList,
      label = '',
      required = false,
      errorMessage = '',
      ...field
    }: SelectFormProps,
    ref
  ) => {
    const selectOptionList = optionList.map((option) => ({ value: option, label: option }));

    const selectLargeStyles = errorMessage ? selectErrorStyle : selectStyles;
    const selectSmallStyles = errorMessage ? selectSmallErrorStyle : selectSmallStyle;

    return (
      <InputContainer className={className} label={label} required={required} errorMessage={errorMessage}>
        <Select
          className={styles.selectForm}
          instanceId={instanceId}
          options={selectOptionList}
          styles={size === 'small' ? selectSmallStyles : size === 'filter' ? selectFilterStyle : selectLargeStyles}
          // components={{ DropdownIndicator }}
          components={{
            // eslint-disable-next-line react/no-unstable-nested-components
            DropdownIndicator: (props) => <DropdownIndicator {...props} size={size} />
          }}
          isSearchable={false}
          ref={ref as React.Ref<SelectInstance<unknown, boolean, GroupBase<unknown>>>}
          {...field}
        />
      </InputContainer>
    );
  }
);

export default SelectForm;
