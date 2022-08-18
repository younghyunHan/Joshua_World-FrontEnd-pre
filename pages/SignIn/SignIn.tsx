import Link from 'next/link';
import { useState } from 'react';
import SignInStyles from './SignIn.module.css';
import React from 'react';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [loginValues, setLoginValues] = useState({
    user_id: '',
    user_pw: '',
    user_name: '',
  });
  const router = useRouter();

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const { user_id, user_pw, user_name } = loginValues;

  const signUp = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        user_pw: user_pw,
        user_name: user_name,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.message === 'SUCCESS') {
          alert('회원가입이 완료되었습니다.');
        }
      });
  };

  const signIn = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user_id,
        user_pw: user_pw,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.token) {
          localStorage.setItem('token', result.token);
          alert('환영합니다.');
          router.push('/');
        } else if (result.message === 'INVALID_USER') {
          alert('ID와 PW를 확인해주세요.');
        }
      });
  };

  return (
    <div id={SignInStyles.signIn}>
      <form id={SignInStyles.signInForm}>
        <h1 id={SignInStyles.signInFormName}>Blog</h1>
        <input
          id={SignInStyles.userId}
          type='text'
          name='user_id'
          placeholder='전화번호, 사용자 이름 또는 이메일'
          onChange={handleInputValue}
        />
        <input
          id={SignInStyles.userPassword}
          type='password'
          name='user_pw'
          placeholder='비밀번호'
          onChange={handleInputValue}
        />
        <input
          id={SignInStyles.userName}
          type='text'
          name='user_name'
          placeholder='닉네임'
          onChange={handleInputValue}
        />
        <button type='button' id={SignInStyles.signInBtn} onClick={signIn}>
          로그인
        </button>
        <button type='button' id={SignInStyles.signUpBtn} onClick={signUp}>
          회원가입
        </button>
      </form>
    </div>
  );
}
