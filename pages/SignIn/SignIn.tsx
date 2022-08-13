import Link from 'next/link';
import { useState } from 'react';
import SignInStyles from './SignIn.module.css';
import React from 'react';

export default function SignIn() {
  const [loginValues, setLoginValues] = useState({
    name: '',
    passWord: '',
  });

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const { name, passWord } = loginValues;

  console.log(loginValues);

  const signUp = (event: any) => {
    event.preventDefault();
    fetch('http://localhost:3000/signUp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        passWord: passWord,
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
        name: name,
        password: passWord,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        if (result.token) {
          localStorage.setItem('token', result.token);
          alert('환영합니다!');
          <Link href='/' />;
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
          name='name'
          placeholder='전화번호, 사용자 이름 또는 이메일'
          onChange={handleInputValue}
        />
        <input
          id={SignInStyles.userPassword}
          type='password'
          name='passWord'
          placeholder='비밀번호'
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
