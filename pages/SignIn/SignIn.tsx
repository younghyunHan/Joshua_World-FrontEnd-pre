import Link from 'next/link';
import './SignIn.css';

export default function SignIn() {
  return (
    <div id='signIn'>
      <form id='SignInForm'>
        <h1 id='SignInFormName'>Blog</h1>
        <input
          id='userId'
          type='text'
          placeholder='전화번호, 사용자 이름 또는 이메일'
        />
        <input id='userPassword' type='password' placeholder='비밀번호' />
        <Link href='/Main/Mainjj'>
          <button type='button' id='signInBtn'>
            로그인
          </button>
        </Link>
      </form>
    </div>
  );
}
