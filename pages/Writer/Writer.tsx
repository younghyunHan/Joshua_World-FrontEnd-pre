import React, { useEffect, useRef, useState, useCallback } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';

import Nav from '../Components/Nav/Nav';
import HeaderTitle from '../Components/HeaderTitle/HeaderTitle';

// CSS
import WriterStyles from './Writer.module.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

export default function Writer() {
  const access_token = localStorage.getItem('token');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postThumbnailLink, setPostThumbnailLink] = useState<string>('');

  const Editor = dynamic(
    () => import('@toast-ui/react-editor').then(m => m.Editor),
    { ssr: false },
  );

  // const colorSyntax = dynamic(
  //   () => import('@toast-ui/editor-plugin-color-syntax'),
  //   { ssr: false },
  // );

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
    (event: any) => {
      event.preventDefault();
      if (!postThumbnailInputRef.current) {
        return;
      }

      const files = postThumbnailInputRef.current.files as FileList;

      const formData = new FormData();
      console.log(postTitle);
      console.log(postThumbnailLink);
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
    [postTitle, postThumbnailLink],
  );

  return (
    <>
      <HeaderTitle />
      <Nav />
      <section id={WriterStyles.writer}>
        <h1 id={WriterStyles.postPageTitle}>ADD POST</h1>
        <form id={WriterStyles.postPageForm}>
          <h2 id={WriterStyles.postTitle}>Title</h2>
          <input
            id={WriterStyles.postTitleInput}
            type="text"
            name="postTitle"
            placeholder="제목을 입력해주세요."
            onChange={changePostTitle}
          />
          <h2 id={WriterStyles.postThumbnail}>Thumbnail</h2>
          <div id={WriterStyles.postThumnailWrap}>
            <input
              id={WriterStyles.postThumnailInput}
              type="text"
              name="postThumbnailLink"
              placeholder="링크를 입력해주세요."
              onChange={changePostThumbnailLink}
            />
            <span>or</span>
            <input
              id={WriterStyles.postThumnailBtn}
              type="file"
              accept="image/*"
              ref={postThumbnailInputRef}
            />
          </div>
          <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            // plugins={[colorSyntax]}
            // language="ko-KR"
          />
          <button
            id={WriterStyles.postUploadBtn}
            onClick={postUploadButtonClick}
          >
            개인 정보 수정
          </button>
        </form>
      </section>
    </>
  );
}
