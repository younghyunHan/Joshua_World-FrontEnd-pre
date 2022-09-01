import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import TopListData from './TopListData/TopListData';
import CategoryData from './CategoryData/CategoryData';
import TOP_MENU_LIST from './TopMenuData';
import MainStyles from './Main.module.css';

function Main() {
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [navList, setNavList] = useState([]);
  const [selectCategoryData, setSelectCategoryData] = useState('');

  const access_token = localStorage.getItem('token');

  useEffect(() => {
    axios
      .get('http://localhost:3000/category', {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then(function (response) {
        setNavList(response.data);
      });
  }, []);

  const selectCategory = (event: any) => {
    return setSelectCategoryData(event.target.textContent);
  };

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
                  {navList.map((navData) => {
                    return (
                      <li
                        key={navData['id']}
                        className={MainStyles.navDataContent}
                      >
                        <img
                          className={MainStyles.menuArrow}
                          alt='menuArrow'
                          src='/images/arrow.png'
                        />
                        <span onClick={selectCategory}>
                          {navData['category']}
                        </span>
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
                        <Link href='/Editor/Editor'>
                          <div>글쓰기</div>
                        </Link>
                        <div>목록</div>
                      </div>
                    </div>
                    <div id={MainStyles.listTopTwo}>
                      <div>글 제목</div>
                    </div>
                  </div>
                  {selectCategoryData ? (
                    <CategoryData selectCategoryData={selectCategoryData} />
                  ) : (
                    <TopListData />
                  )}
                </section>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
