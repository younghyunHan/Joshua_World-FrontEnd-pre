import axios from 'axios';
import { useState } from 'react';
import ArticleStyles from './Post.module.css';

export default function Post() {
  const [postValues, setPostValues] = useState({
    postTitle: '',
    postContent: '',
  });

  const access_token = localStorage.getItem('token');

  const handlePostValue = (event: any) => {
    const { name, value } = event.target;
    setPostValues({ ...postValues, [name]: value });
  };

  const addPost = (event: any) => {
    event.preventDefault();
    axios
      .post(
        'http://localhost:3000/post',
        {
          content: postValues,
        },
        {
          headers: {
            Authorization: `${access_token}`,
          },
        }
      )
      .then((response: any) => {
        console.log(response);
        if (response.data.message === 'SUCCESS') {
          alert('저장 완료 되었습니다.');
        }
      });
  };

  console.log(postValues);

  return (
    <article id={ArticleStyles.post}>
      <form id={ArticleStyles.postForm} onSubmit={addPost}>
        <h1 id={ArticleStyles.postFormTitle}>게시글 작성</h1>
        <div id={ArticleStyles.postTitleWrap}>
          <label htmlFor='postTitle' id={ArticleStyles.postTitleLable}>
            제목
          </label>
          <input
            type='text'
            id={ArticleStyles.postTitle}
            name='postTitle'
            placeholder='Title'
            onChange={handlePostValue}
          />
        </div>
        <div id={ArticleStyles.postContentWrap}>
          <label htmlFor='postContent' id={ArticleStyles.postContentLable}>
            내용
          </label>
          <textarea
            id={ArticleStyles.postContent}
            name='postContent'
            placeholder='게시글을 작성해주세요.'
            onChange={handlePostValue}
          />
        </div>
        <button id={ArticleStyles.submitBtn}>작성완료</button>
      </form>
    </article>
  );
}
