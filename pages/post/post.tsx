import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import Nav from '../../Components/Nav/Nav';
import HeaderTitle from '../../Components/HeaderTitle/HeaderTitle';

// CSS
import PostStyles from './Post.module.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

export default function Post() {
  const access_token = localStorage.getItem('token');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postThumbnailLink, setPostThumbnailLink] = useState<string>('');

  // const Editor = dynamic(
  //   () => import('@toast-ui/react-editor').then(m => m.Editor),
  //   { ssr: false },
  // );

  // const colorSyntax = dynamic(
  //   () => import('@toast-ui/editor-plugin-color-syntax'),
  //   { ssr: false },
  // );

  const NoSsrWysiwyg = dynamic(
    () => import('../Components/WysiwygEditor/index'),
    {
      ssr: false,
    },
  );

  const postThumbnailInputRef = useRef<HTMLInputElement | null>(null);
  // console.log(postThumbnailInputRef.current.files[0]);

  const changePostTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostTitle(e.target.value);
    },
    [],
  );

  const changePostThumbnailLink = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPostThumbnailLink(e.target.value);
    },
    [],
  );

  const postUploadButtonClick = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      if (!postThumbnailInputRef.current) {
        return;
      }

      const files = postThumbnailInputRef.current.files as FileList;

      const formData = new FormData();
      console.log(postTitle);
      console.log(postThumbnailLink);
      console.log(files);
      formData.append('postThumnailImg', files[0]);
      formData.append('postTitle', postTitle);
      formData.append('postThumbnailLink', postThumbnailLink);

      axios
        .post('http://localhost:3000/userInfoUpdate', formData, {
          headers: {
            Authorization: `${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function (response) {
          if (response.data.message === 'SUCCESS') {
            alert('게시글 저장되었습니다.');
          }
        });
    },
    [postTitle, postThumbnailLink, postThumbnailInputRef],
  );

  return (
    <>
      <HeaderTitle />
      <Nav />
      <section id={PostStyles.writer}>
        <h1 id={PostStyles.postPageTitle}>ADD POST</h1>
        <form id={PostStyles.postPageForm}>
          <h2 id={PostStyles.postTitle}>Title</h2>
          <input
            id={PostStyles.postTitleInput}
            type="text"
            name="postTitle"
            placeholder="제목을 입력해주세요."
            // onChange={changePostTitle}
          />
          <h2 id={PostStyles.postThumbnail}>Thumbnail</h2>
          <div id={PostStyles.postThumnailWrap}>
            <input
              id={PostStyles.postThumnailInput}
              type="text"
              name="postThumbnailLink"
              placeholder="링크를 입력해주세요."
              // onChange={changePostThumbnailLink}
            />
            <span>or</span>
            <input
              id={PostStyles.postThumnailBtn}
              type="file"
              accept="image/*"
              ref={postThumbnailInputRef}
            />
          </div>
          {/* <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            // language="ko-KR"
          />
          <button
            id={PostStyles.postUploadBtn}
            onClick={postUploadButtonClick}
          >
            개인 정보 수정
          </button> */}
          <NoSsrWysiwyg />
        </form>
      </section>
    </>
  );
}
