// import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import axios from 'axios';
import EditorStyles from './Editor.module.css';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
// import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
// import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
// import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default function Editor() {
  const [navData, setNavData] = useState([]);
  const access_token = localStorage.getItem('token');

  const addPost = (event: any) => {
    event.preventDefault();

    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const date = now.getDate();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const postTime = `${year}:${
      month + 1
    }:${date}:${hour}:${minutes}:${seconds}`;

    // axios
    //   .post(
    //     'http://localhost:3000/post',
    //     {
    //       postTime: postTime,
    //     },
    //     {
    //       headers: {
    //         // Authorization: `${access_token}`,
    //       },
    //     }
    //   )
    //   .then((response: any) => {
    //     console.log(response);
    //     if (response.data.message === 'SUCCESS') {
    //       alert('저장 완료 되었습니다.');
    //     }
    //   });
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/category', {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then(function (response) {
        setNavData(response.data);
      });
  }, []);

  return (
    <>
      <form id={EditorStyles.reactQuillWrap}>
        <input placeholder='제목' id={EditorStyles.postTitle} />
        <input placeholder='카테고리' id={EditorStyles.postCategory} />
        <select>
          <option></option>
        </select>
        {/* <CKEditor
          editor={ClassicEditor}
          config={{
            plugins: [Paragraph, Bold, Italic, Essentials],
            toolbar: ['bold', 'italic'],
          }}
          data='<p>Hello from the first editor working with the context!</p>'
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log('Editor1 is ready to use!', editor);
          }}
        /> */}
        <button type='button' id={EditorStyles.postSubmit} onClick={addPost}>
          제출
        </button>
      </form>
    </>
  );
}
