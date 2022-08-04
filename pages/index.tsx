import React, { useState, useEffect } from 'react';
import Pagination from 'react-js-pagination';
import Link from 'next/link';
import TOP_MENU_LIST from './TopMenuData';
import NAV_LIST from './NavData';
import TOP_LIST_DATA from './TopListData';
import MAIN_TEXT_DATA from './MainTextData';

import MainStyles from './Main.module.css';

function Main() {
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [page, setPage] = useState(1);
  const [indexOfLastRecord, setIndexOfLastRecord] = useState(5);
  const [indexOfFirstRecord, setIndexOfFirstRecord] = useState(0);

  const handlePageChange = (page: number) => {
    setPage(page);
    setIndexOfLastRecord(page * 5); // 현재 페이지 * 레코드당 페이지;
  };

  useEffect(() => {
    setIndexOfFirstRecord(indexOfLastRecord - 5); // 마지막 레코드 - 레코드당 페이지;
  }, [indexOfLastRecord]);

  // const handleTextChange = (page: number) => {
  //   setPage(page);
  //   setIndexOfLastRecord(page * 10); // 현재 페이지 * 레코드당 페이지;
  // };

  // useEffect(() => {
  //   setIndexOfFirstRecord(indexOfLastRecord - 10); // 마지막 레코드 - 레코드당 페이지;
  // }, [indexOfLastRecord]);

  // console.log(page);
  // console.log(indexOfLastRecord);
  // console.log(indexOfFirstRecord);

  return (
    <div id={MainStyles.main}>
      <div id={MainStyles.mainWrap}>
        <header>
          <div id={MainStyles.topMenuWrap}>
            <ul id={MainStyles.topMenu}>
              {TOP_MENU_LIST.map((data, index) => {
                return (
                  <li key={data.id} className={MainStyles.topMenuContent}>
                    <Link
                      href={data.movePath}
                      className={MainStyles.goToSignIn}
                    >
                      {data.topMenu}
                    </Link>
                    {!(index === TOP_MENU_LIST.length - 1) && (
                      <div className={MainStyles.txtBar} />
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div id={MainStyles.headerImgBox}>
            <img
              id={MainStyles.headerImg}
              alt='myImg'
              src='/images/headerImg.png'
            />
          </div>
        </header>
        <nav id={MainStyles.sideBar}>
          <div id={MainStyles.sideBarOne}>
            <img id={MainStyles.myImg} alt='myImg' src='/images/myImg.png' />
            <div id={MainStyles.sideBarOneContent}>
              <span id={MainStyles.myName}>younghyun(Black)</span>
              <span id={MainStyles.myJob}>FrontDev</span>
              <span id={MainStyles.profile}>프로필</span>
              <div id={MainStyles.addMan}>
                <span id={MainStyles.addManContent}>이웃추가</span>
              </div>
            </div>
          </div>
          <div id={MainStyles.sideBarTwo}>
            <div id={MainStyles.navData}>
              <div
                id={MainStyles.category}
                onClick={() => {
                  setCategoryVisible(!categoryVisible);
                }}
              >
                category
              </div>
              {categoryVisible && (
                <ul>
                  {NAV_LIST.map((navData) => {
                    return (
                      <li
                        key={navData.id}
                        className={MainStyles.navDataContent}
                      >
                        <img
                          className={MainStyles.menuArrow}
                          alt='menuArrow'
                          src='/images/arrow.png'
                        />
                        <span>{navData.navMenu}</span>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <div id={MainStyles.searchBox}>
            <input placeholder='검색' id={MainStyles.search} />
            <img
              id={MainStyles.searchIcon}
              alt='searchIcon'
              src='/images/search.png'
            />
          </div>
        </nav>
        <div id={MainStyles.mainContent}>
          <div id={MainStyles.listWrap}>
            <div id={MainStyles.list}>
              <article>
                <section id={MainStyles.listTop}>
                  <div id={MainStyles.listTopWrap}>
                    <div id={MainStyles.listTopOne}>
                      <div>Dev</div>
                      <div id={MainStyles.listTopOneRight}>
                        <Link href='/Post/Post'>
                          <div>글쓰기</div>
                        </Link>
                        <div>목록</div>
                      </div>
                    </div>
                    <div id={MainStyles.listTopTwo}>
                      <div>글 제목</div>
                    </div>
                  </div>
                  {TOP_LIST_DATA[0].items
                    .slice(indexOfFirstRecord, indexOfLastRecord)
                    .map((topListData) => {
                      return (
                        <div
                          key={topListData.id}
                          className={MainStyles.listTopData}
                        >
                          {topListData.listTopDataTitle}
                        </div>
                      );
                    })}
                  <Pagination
                    activePage={page} // 현재 페이지
                    itemsCountPerPage={5} // 한 페이지당 보여줄 리스트 아이템의 개수
                    totalItemsCount={TOP_LIST_DATA[0].count} // 총 아이템의 개수
                    pageRangeDisplayed={5} //  Paginator 내에서 보여줄 페이지의 범위
                    prevPageText='‹' // "이전"을 나타낼 텍스트 (prev, <, ...)
                    nextPageText='›' // "다음"을 나타낼 텍스트 (next, >, ...)
                    onChange={handlePageChange} // 페이지가 바뀔 때 핸들링해줄 함수
                  />
                </section>
              </article>
            </div>
            <article>
              {/* <section id={MainStyles.mainText}>
                {MAIN_TEXT_DATA[0].items.map((mainTextData) => {
                  return (
                    <div
                      key={mainTextData.id}
                      className={MainStyles.mainTextData}
                    >
                      <img
                        src={mainTextData.mainTextDataImg}
                        alt='mainTextDataImg'
                        className={MainStyles.mainTextDataImg}
                      />
                      <div>{mainTextData.mainTextDataTitle}</div>
                    </div>
                  );
                })}
                <Pagination
                  activePage={page} // 현재 페이지
                  itemsCountPerPage={10} // 한 페이지당 보여줄 리스트 아이템의 개수
                  totalItemsCount={TOP_LIST_DATA[0].count} // 총 아이템의 개수
                  pageRangeDisplayed={5} //  Paginator 내에서 보여줄 페이지의 범위
                  prevPageText='‹' // "이전"을 나타낼 텍스트 (prev, <, ...)
                  nextPageText='›' // "다음"을 나타낼 텍스트 (next, >, ...)
                  onChange={handleTextChange} // 페이지가 바뀔 때 핸들링해줄 함수
                />
              </section> */}
            </article>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
