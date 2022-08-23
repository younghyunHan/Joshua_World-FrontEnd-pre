import { useState } from 'react';
import SignUpStyles from './SignUp.module.css';
import React from 'react';
import { useRouter } from 'next/router';

export default function SignUp() {
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
          router.push('/SignIn/SignIn');
        }
      });
  };

  return (
    <div id={SignUpStyles.signUp}>
      <form id={SignUpStyles.signUpForm}>
        <h1 id={SignUpStyles.signUpFormName}>Blog</h1>
        <input
          id={SignUpStyles.userId}
          type='text'
          name='user_id'
          placeholder='전화번호, 사용자 이름 또는 이메일'
          onChange={handleInputValue}
        />
        <input
          id={SignUpStyles.userPassword}
          type='password'
          name='user_pw'
          placeholder='비밀번호'
          onChange={handleInputValue}
        />
        <input
          id={SignUpStyles.userName}
          type='text'
          name='user_name'
          placeholder='닉네임'
          onChange={handleInputValue}
        />
        <button type='button' id={SignUpStyles.signUpBtn} onClick={signUp}>
          회원가입
        </button>
      </form>
    </div>
  );
}
