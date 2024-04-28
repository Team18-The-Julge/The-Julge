/* eslint-disable */
import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import {
  IFormInput,
  validate,
  status,
  SignupErrorMessage,
  defaultSignupFormValues
} from '@/libs/constants/AuthForm.type';
import { ReactComponent as Logo } from '@/public/svgs/Logo.svg';

import { userIdAtom } from '../../../libs/contexts/AuthAtom';
import Modal from '../Modal/Modal';
import ModalGroup, { useModal } from '../Modal/ModalGroup';
import { usePostUser } from '@/apis/user/useUserService';
import { PostInputType, PostUserRes } from '@/apis/user/user.type';
import RadioInputForm from '@/components/common/Input/RadioInputForm/RadioInputForm';

export default function SignupForm() {
  const {
    handleSubmit,
    register,
    watch,
    setError,
    clearErrors,
    formState: { errors, isValid }
  } = useForm<IFormInput>({ defaultValues: defaultSignupFormValues, mode: 'onTouched' });

  // 모달 열고 닫는 상태
  const { open: modalOpen, isOpen: isModalOpen } = useModal();
  // 모달 띄울 에러메세지
  const [alertMessage, setAlertMessage] = useState('');
  // autom으로 유저 정보 전역 저장
  const [, setUserIdAtom] = useAtom(userIdAtom);
  // 버튼 active
  const [isButtonActive, setIsButtonActive] = useState(false);
  // 관리할 레지스터 (validation 을 위해 존재)
  const registerList = {
    email: register('email', validate.email),
    password: register('password', validate.password),
    passwordConfirm: register('passwordConfirm'),
    type: register('type', validate.type)
  };

  // 리다이렉트를 위한 라우터
  const router = useRouter();

  // 회원가입 Post 보내기
  const { mutate: signupMutate } = usePostUser({
    email: '',
    password: '',
    type: 'employee'
  });

  //회원가입 성공시 실행
  const handleSignupSuccess = (userdata: PostUserRes) => {
    const { id } = userdata.item;
    console.log(id);
    setUserIdAtom(id);
    Cookies.set('signupData', id, { expires: 1, path: '/' });
    router.push(status.signup.redirectPath);
    console.log('성공', userdata.item);
  };

  //회원가입 실패시 실행
  const handleSignupError = (e: AxiosError) => {
    if (axios.isAxiosError(e) && e.response) {
      const data = e.response.data as SignupErrorMessage;
      setAlertMessage(data.message);
      modalOpen();
    } else {
      console.log(e);
    }
  };

  const onSubmit = (payload: PostInputType) => {
    // eslint-disable-next-line no-unused-vars
    const { passwordConfirm, ...dataToSubmit } = payload;
    console.log('보내는', dataToSubmit);
    signupMutate(dataToSubmit, { onSuccess: handleSignupSuccess, onError: handleSignupError });
  };
  //회원가입시 비밀번호 확인 validating을 위한 watch
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  useEffect(() => {
    //회원가입시 비번 벨리데이팅
    if (password !== passwordConfirm) {
      setError('passwordConfirm', { type: 'password-mismatch', message: '비밀번호가 일치하지 않습니다.' });
    } else {
      clearErrors('passwordConfirm');

      if (isValid) {
        setIsButtonActive(true);
      } else {
        setIsButtonActive(false);
      }
    }
  }, [password, passwordConfirm, alertMessage, isValid]);

  //회원가입시 비번 똑같은 지 확인하는 레지스터
  const passwordConfirmRegister = register('passwordConfirm', {
    validate: {
      matchPassword: (value) => {
        const passwordState = watch('password'); // 현재 폼의 password 값 가져오기
        return passwordState === value || '비밀번호가 일치하지 않습니다.';
      }
    },
    required: '비밀번호를 확인해주세요'
  });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Logo width="248" height="44" />
        <div>
          <InputForm
            label="이메일"
            errorMessage={errors.email?.message}
            type="email"
            {...registerList.email}
            name="email"
          />
          <InputForm
            label="비밀번호"
            errorMessage={errors.password?.message}
            type="password"
            {...registerList.password}
            name="password"
          />
          <InputForm
            label={status.signup.formLabel[2]}
            errorMessage={errors.passwordConfirm?.message}
            type="password"
            {...passwordConfirmRegister}
          />
          <RadioInputForm labels={['사장님', '알바생']} {...registerList.type} />

          <Button size="large" solid submit active={isButtonActive}>
            {status.signup.buttonText}
          </Button>
        </div>
        <div>
          <p>{status.signup.footerText}</p>
          <Link href={status.signup.footerLink}>{status.signup.footerLinkText}</Link>
        </div>
      </form>
      {isModalOpen && (
        <ModalGroup.Content>
          <Modal.Error>{alertMessage}</Modal.Error>
        </ModalGroup.Content>
      )}
    </>
  );
}
