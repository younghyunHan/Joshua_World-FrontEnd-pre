import Link from 'next/link';
import { useState } from 'react';
import SignInStyles from './SignIn.module.css';
import React from 'react';

export default function SignIn() {
  const [loginValues, setLoginValues] = useState({
    id: '',
    passWord: '',
  });

  const handleInputValue = (e: any) => {
    const { name, value } = e.target;
    setLoginValues({ ...loginValues, [name]: value });
  };

  const { id, passWord } = loginValues;

  const signUp = () => {
    fetch('http://localhost:3000/SignUp', {
      method: 'POST',
      body: JSON.stringify({
        id: id,
        passWord: passWord,
      }),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          alert('회원가입이 완료되었습니다.');
        } else if (result.message === 'INVALID_USER') {
          alert('ID와 PW를 확인해주세요.');
        }
      });
  };

  const goToMain = () => {
    fetch('http://localhost:3000/SignIn', {
      method: 'POST',
      body: JSON.stringify({
        email: id,
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
          name='id'
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
        <button type='button' id={SignInStyles.signInBtn} onChange={goToMain}>
          로그인
        </button>
        <button type='button' id={SignInStyles.signUpBtn} onChange={signUp}>
          회원가입
        </button>
      </form>
    </div>
  );
}
