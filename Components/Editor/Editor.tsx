import { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import Prism from 'prismjs'; // prism 테마 추가
import 'prismjs/themes/prism.css';

const Post = () => (
  <Editor
    initialValue="hello react editor world!"
    previewStyle="vertical"
    height="500px"
    usageStatistics={false}
    plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
    language="ko-KR"
  />
);

export default Post;
