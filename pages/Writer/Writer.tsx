import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';

import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
// import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import Nav from '../Components/Nav';

// CSS
import WriterStyles from './Writer.module.css';

import '@toast-ui/editor/dist/toastui-editor.css';

import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';

// import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
// import Prism from 'prismjs';
// // 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
// import 'prismjs/themes/prism.css';

export default function Writer() {
  const Editor = dynamic(
    () => import('@toast-ui/react-editor').then(m => m.Editor),
    { ssr: false },
  );

  const colorSyntax = dynamic(() => import({ colorSyntax }), { ssr: false });

  return (
    <>
      <Nav />
      <section id={WriterStyles.writer}>
        <h1 id={WriterStyles.postPageTitle}>ADD POST</h1>
        <form id={WriterStyles.postPageForm}>
          <h2 id={WriterStyles.postTitle}>Title</h2>
          <input
            id={WriterStyles.postTitleInput}
            placeholder="제목을 입력해주세요."
          />
          <h2 id={WriterStyles.postThumbnail}>Thumbnail</h2>
          <div id={WriterStyles.postThumnailWrap}>
            <input
              id={WriterStyles.postThumnailInput}
              placeholder="링크를 입력해주세요."
            />
            <span>or</span>
            <input id={WriterStyles.postThumnailBtn} type="file" />
          </div>
          <Editor
            initialValue="hello react editor world!"
            previewStyle="vertical"
            height="500px"
            initialEditType="wysiwyg"
            useCommandShortcut={false}
            plugins={[colorSyntax]}
            // language="ko-KR"
          />
        </form>
      </section>
    </>
  );
}
