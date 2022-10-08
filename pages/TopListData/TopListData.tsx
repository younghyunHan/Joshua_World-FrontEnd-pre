import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import Link from 'next/link';

import TopListDataStyles from './TopListData.module.css';

function TopListData({ searchData, selectCategoryData }) {
  const [page, setPage] = useState(1);
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(5);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const [listData, setListData] = useState([]);

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
        .get('http://localhost:3000/list', {
          headers: {
            Authorization: `${access_token}`,
          },
        })
        .then(function (response) {
          setListData(response.data);
        });
    }
  }, []);

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
          setListData(response.data);
        });
    }
  }, [selectCategoryData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const access_token = localStorage.getItem('token');

      axios
        .get('http://localhost:3000/searchData', {
          headers: {
            Authorization: `${access_token}`,
          },
          params: {
            searchData: searchData,
          },
        })
        .then((response: any) => {
          setListData(response.data);
        });
    }
  }, [searchData]);

  console.log(listData);

  return (
    <article>
      <section id={TopListDataStyles.listTop}>
        <div id={TopListDataStyles.listTopWrap}>
          <div id={TopListDataStyles.listTopOne}>
            <div id={TopListDataStyles.listTopOneLeft}>
              <div>All</div>
              <span>총 {listData.length}개 글</span>
            </div>
            <div id={TopListDataStyles.listTopOneRight}>
              <Link href="/Editor/Editor">
                <div>글쓰기</div>
              </Link>
            </div>
          </div>
          <div id={TopListDataStyles.listTopTwo}>
            <div>글 제목</div>
            <div>작성일</div>
          </div>
        </div>
        {listData.slice(indexOfFirstRecord, indexOfLastRecord).map(data => (
          <div key={data['id']} className={TopListDataStyles.listTopData}>
            {data['title']}
          </div>
        ))}
        <Pagination
          activePage={page} // 현재 페이지
          itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
          totalItemsCount={listData.length} // 총 아이템의 개수
          pageRangeDisplayed={5} //  Paginator 내에서 보여줄 페이지의 범위
          prevPageText="‹" // "이전"을 나타낼 텍스트 (prev, <, ...)
          nextPageText="›" // "다음"을 나타낼 텍스트 (next, >, ...)
          onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
        />
      </section>
    </article>
  );
}

export default TopListData;
