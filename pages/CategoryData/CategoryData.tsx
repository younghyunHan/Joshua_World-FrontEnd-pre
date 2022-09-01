import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import Link from 'next/link';

import CategoryDataStyles from './CategoryData.module.css';

function CategoryData({ selectCategoryData }) {
  const [page, setPage] = useState(1);
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(5);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const [categoryData, setCatagoryData] = useState([]);

  const handlePageChange = (page: number) => {
    setPage(page);
    setIndexOfLastRecord(page * 5); // 현재 페이지 * 레코드당 페이지;
  };

  useEffect(() => {
    setIndexOfFirstRecord(indexOfLastRecord - 5); // 마지막 레코드 - 레코드당 페이지;
  }, [indexOfLastRecord]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('token');

      axios
        .get('http://localhost:3000/selectCategory', {
          headers: {
            Authorization: `${access_token}`,
          },
          params: {
            category: selectCategoryData,
          },
        })
        .then((response: any) => {
          setCatagoryData(response.data);
        });
    }
  }, [selectCategoryData]);

  return (
    <article>
      <section id={CategoryDataStyles.listTop}>
        <div id={CategoryDataStyles.listTopWrap}>
          <div id={CategoryDataStyles.listTopOne}>
            <div id={CategoryDataStyles.listTopOneLeft}>
              <div>{selectCategoryData}</div>
              <span>총 {categoryData.length}개 글</span>
            </div>
            <div id={CategoryDataStyles.listTopOneRight}>
              <Link href='/Editor/Editor'>
                <div>글쓰기</div>
              </Link>
            </div>
          </div>
          <div id={CategoryDataStyles.listTopTwo}>
            <div>글 제목</div>
            <div>작성일</div>
          </div>
        </div>
        {categoryData
          .slice(indexOfFirstRecord, indexOfLastRecord)
          .map((data, index) => {
            return (
              <div key={index} className={CategoryDataStyles.listTopData}>
                {data['title']}
              </div>
            );
          })}
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
          totalItemsCount={categoryData.length} // 총 아이템의 개수
          pageRangeDisplayed={5} //  Paginator 내에서 보여줄 페이지의 범위
          prevPageText='‹' // "이전"을 나타낼 텍스트 (prev, <, ...)
          nextPageText='›' // "다음"을 나타낼 텍스트 (next, >, ...)
          onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
        />
      </section>
    </article>
  );
}

export default CategoryData;
