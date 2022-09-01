import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import axios from 'axios';
import TopListDataStyles from './TopListData.module.css';

function TopListData() {
  const [page, setPage] = useState(1);
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(5);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);
  const [topListData, setTopListData] = useState([]);

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
          setTopListData(response.data);
        });
    }
  }, []);

  return (
    <section>
      {topListData
        .slice(indexOfFirstRecord, indexOfLastRecord)
        .map((data, index) => {
          return (
            <div key={data['id']} className={TopListDataStyles.listTopData}>
              {data['title']}
            </div>
          );
        })}
      <Pagination
        activePage={page} // 현재 페이지
        itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
        totalItemsCount={topListData.length} // 총 아이템의 개수
        pageRangeDisplayed={5} //  Paginator 내에서 보여줄 페이지의 범위
        prevPageText='‹' // "이전"을 나타낼 텍스트 (prev, <, ...)
        nextPageText='›' // "다음"을 나타낼 텍스트 (next, >, ...)
        onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
      />
    </section>
  );
}

export default TopListData;
