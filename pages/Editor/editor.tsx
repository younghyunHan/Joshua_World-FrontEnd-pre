import React, { useEffect, useRef, useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import EditorStyles from './Editor.module.css';

export default function Editor() {
  const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

  // 사용하고 싶은 옵션, 나열 되었으면 하는 순서대로 나열
  const toolbarOptions = [
    ['link', 'image', 'video'], // 링크, 이미지, 비디오 업로드 설정
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [
      'bold',
      'italic',
      'underline',
      'strike',
      'blockquote',
      'code-block',
      'formula',
    ],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ], // 리스트, 인덴트 설정
    [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
    ['clean'], // toolbar 설정 초기화 설정
  ];

  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'code-block',
    'formula',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <>
      <div id={EditorStyles.reactQuillWrap}>
        <input placeholder='제목' id={EditorStyles.postTitle} />
        <input
          placeholder='날짜(글 작성 기준 년/월/일/시간/분/초)'
          id={EditorStyles.postDate}
        />
        <input placeholder='카테고리' id={EditorStyles.postCategory} />
        <ReactQuill
          style={{
            width: '850px',
          }}
          modules={modules}
          placeholder='내용을 입력해주세요'
          theme='snow'
          formats={formats}
        />
        <button type='button' id={EditorStyles.postSubmit}>
          제출
        </button>
      </div>
    </>
  );
}
