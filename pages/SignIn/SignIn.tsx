import Link from 'next/link';
import SignInStyles from './SignIn.module.css';

export default function SignIn() {
  return (
    <div id={SignInStyles.signIn}>
      <form id={SignInStyles.signInForm}>
        <h1 id={SignInStyles.signInFormName}>Blog</h1>
        <input
          id={SignInStyles.userId}
          type='text'
          placeholder='전화번호, 사용자 이름 또는 이메일'
        />
        <input
          id={SignInStyles.userPassword}
          type='password'
          placeholder='비밀번호'
        />
        <Link href='/' id={SignInStyles.goToMain}>
          <button type='button' id={SignInStyles.signInBtn}>
            로그인
          </button>
        </Link>
      </form>
    </div>
  );
}
