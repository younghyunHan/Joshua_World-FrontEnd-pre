import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import Modal from './Modal/Modal';
import TOP_MENU_LIST from './TopMenuData';
import TopListData from './TopListData/TopListData';
import MainContent from './MainContent/MainContent';

import MainStyles from './Main.module.css';

function Main() {
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [navList, setNavList] = useState([]);
  const [selectCategoryData, setSelectCategoryData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const access_token = localStorage.getItem('token');

  interface userInfoDataType {
    user_name: string;
    user_img: object;
  }

  // user_info 변경
  const [userInfoData, setUserInfoData] = useState<null | userInfoDataType>(
    null,
  );

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
    setSelectCategoryData(event.target.textContent);
  };

  const searchUsersInput = (event: any) => {
    const userInput = event.target.value;
    setSearchData(userInput);
  };

  const showEditModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleUserData = (updatedUserName: string, updatedUserImg: object) => {
    // console.log(upda$tedUserImg);
    // console.log(updatedUserName);
    setUserInfoData({
      // ...userInfoData,
      user_name: updatedUserName,
      user_img: updatedUserImg,
    });
  };

  return (
    <div id={MainStyles.main}>
      <div id={MainStyles.mainWrap}>
        <header>
          <div id={MainStyles.topMenuWrap}>
            <ul id={MainStyles.topMenu}>
              {TOP_MENU_LIST.map((data, index) => (
                <li key={data.id} className={MainStyles.topMenuContent}>
                  <Link href={data.movePath} className={MainStyles.goToSignIn}>
                    {data.topMenu}
                  </Link>
                  {!(index === TOP_MENU_LIST.length) && (
                    <div className={MainStyles.txtBar} />
                  )}
                </li>
              ))}
              <Link href="/SignIn" id={MainStyles.goToSignIn}>
                {access_token ? '로그아웃' : '로그인'}
              </Link>
            </ul>
          </div>
          <div id={MainStyles.headerImgBox}>
            <img
              id={MainStyles.headerImg}
              alt="myImg"
              src="/images/headerImg.png"
            />
          </div>
        </header>
        <nav id={MainStyles.sideBar}>
          <div id={MainStyles.sideBarOne}>
            <img
              id={MainStyles.myImg}
              alt="myImg"
              src={
                userInfoData
                  ? userInfoData?.user_img?.fieldname
                  : '/images/myProfile.png'
                // typeof userInfoData !== 'undefined'
                //   ? userInfoData?.user_img
                //   : '/images/myProfile.png'
              }
            />
            <div id={MainStyles.sideBarOneContent}>
              <span id={MainStyles.userName}>
                {userInfoData ? userInfoData.user_name : 'Black'}
              </span>
              <span id={MainStyles.profile}>프로필</span>
              <div id={MainStyles.addMan}>
                <span id={MainStyles.addManContent}>이웃추가</span>
              </div>
              <div id={MainStyles.editButtonWrap}>
                <button id={MainStyles.editButton} onClick={showEditModal}>
                  Edit
                </button>
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
                  {navList.map(navData => (
                    <li
                      key={navData['id']}
                      className={MainStyles.navDataContent}
                    >
                      <img
                        className={MainStyles.menuArrow}
                        alt="menuArrow"
                        src="/images/arrow.png"
                      />
                      <span onClick={selectCategory}>
                        {navData['category']}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div id={MainStyles.searchBox}>
            <input
              placeholder="검색"
              id={MainStyles.search}
              onChange={searchUsersInput}
            />
            <img
              id={MainStyles.searchIcon}
              alt="searchIcon"
              src="/images/search.png"
            />
          </div>
        </nav>
        <div id={MainStyles.mainContent}>
          <div id={MainStyles.listWrap}>
            <div id={MainStyles.list}>
              <TopListData
                searchData={searchData}
                selectCategoryData={selectCategoryData}
              />
            </div>
          </div>
        </div>
        <MainContent selectCategoryData={selectCategoryData} />
      </div>
      {modalOpen && (
        <Modal setModalOpen={showEditModal} handleUserData={handleUserData} />
      )}
    </div>
  );
}

export default Main;
