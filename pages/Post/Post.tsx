import ArticleStyles from './Post.module.css';

export default function Post() {
  return (
    <article id={ArticleStyles.post}>
      <form id={ArticleStyles.postForm}>
        <h1 id={ArticleStyles.postFormTitle}>게시글 작성</h1>
        <div id={ArticleStyles.postTitleWrap}>
          <label htmlFor='postTitle' id={ArticleStyles.postTitleLable}>
            제목
          </label>
          <input type='text' id={ArticleStyles.postTitle} placeholder='Title' />
        </div>
        <div id={ArticleStyles.postContentWrap}>
          <label htmlFor='postContent' id={ArticleStyles.postContentLable}>
            내용
          </label>
          <textarea
            id={ArticleStyles.postContent}
            placeholder='게시글을 작성해주세요.'
          />
        </div>
        <button id={ArticleStyles.submitBtn}>작성완료</button>
      </form>
    </article>
  );
}
