import axios, { AxiosError } from 'axios';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { PostAuthenticationPayload, PostAuthenticationRes } from '@/apis/authentication/authentication.type';
import { usePostAuthentication } from '@/apis/authentication/useAuthenticationService';
import Button from '@/components/common/Button/Button';
import InputForm from '@/components/common/Input/InputForm/InputForm';
import {
  IFormInput,
  defaultLoginFormValues,
  validate,
  status,
  LoginErrorMessage
} from '@/libs/constants/AuthForm.type';
import { ReactComponent as Logo } from '@/public/svgs/Logo.svg';

import { userInfoAtom } from '../../../libs/contexts/AuthAtom';
import Modal from '../Modal/Modal';
import ModalGroup, { useModal } from '../Modal/ModalGroup';

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid }
  } = useForm<IFormInput>({ defaultValues: defaultLoginFormValues, mode: 'onTouched' });

  // 모달 띄울 에러메세지
  const [alertMessage, setAlertMessage] = useState('');
  // 모달 열고 닫는 상태
  const { open: modalOpen, isOpen: isModalOpen } = useModal();
  // autom으로 유저 정보 전역 저장
  const [, setUserInfoAtom] = useAtom(userInfoAtom);
  // 버튼 active
  const [isButtonActive, setIsButtonActive] = useState(false);
  // 관리할 레지스터 (validation 을 위해 존재)
  const registerList = {
    email: register('email', validate.email),
    password: register('password', validate.password)
  };

  // 리다이렉트를 위한 라우터
  const router = useRouter();

  // 로그인 post 보내기
  const { mutate: loginMutate } = usePostAuthentication({
    email: '',
    password: ''
  });

  // login 성공시 실행
  const handleLoginSuccess = (userdata: PostAuthenticationRes) => {
    const { data } = userdata;
    if (data.item) {
      const { token, user } = data.item;
      const { id } = user.item;
      Cookies.set('authToken', token, { expires: 1, path: '/' });
      Cookies.set('userId', id, { expires: 1, path: '/' });
      setUserInfoAtom(userdata);
      router.push(status.login.redirectPath);
    } else {
      console.error('data item is empty');
    }
  };

  // login 실패시 실행
  const handleLoginError = (e: AxiosError) => {
    if (axios.isAxiosError(e) && e.response) {
      const data = e.response.data as LoginErrorMessage;
      setAlertMessage(data.message);
      modalOpen();
    } else {
      console.error(e);
    }
  };
  const onSubmit = (payload: PostAuthenticationPayload) => {
    loginMutate(payload, { onSuccess: handleLoginSuccess, onError: handleLoginError });
  };

  useEffect(() => {
    if (isValid) {
      setIsButtonActive(true);
    } else {
      setIsButtonActive(false);
    }
  }, [isValid]);
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
          <Button size="large" solid submit active={isButtonActive}>
            {status.login.buttonText}
          </Button>
        </div>
        <div>
          <p>{status.login.footerText}</p>
          <Link href={status.login.footerLink}>{status.login.footerLinkText}</Link>
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
