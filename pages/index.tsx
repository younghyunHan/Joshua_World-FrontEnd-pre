import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

import Modal from './Modal/Modal';
import TopListData from './TopListData/TopListData';
import MainContent from './MainContent/MainContent';

import MainStyles from './Main.module.css';

function Main() {
  const [categoryVisible, setCategoryVisible] = useState(true);
  const [navList, setNavList] = useState([]);

  const [userName, setUserName] = useState('');
  const [selectCategoryData, setSelectCategoryData] = useState('');
  const [searchData, setSearchData] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const access_token = localStorage.getItem('token');

  interface userInfoDataType {
    user_name: string;
    user_img: string;
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

  useEffect(() => {
    axios
      .get('http://localhost:3000/userName', {
        headers: {
          Authorization: `${access_token}`,
        },
      })
      .then(function (response) {
        setUserName(response.data[0].user_name);
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

  const handleUserData = (updatedUserName: string, updatedUserImg: string) => {
    setUserInfoData({
      user_name: updatedUserName,
      user_img: updatedUserImg,
    });
  };

  const userImg = userInfoData?.user_img;

  return (
    <div id={MainStyles.main}>
      <div id={MainStyles.mainWrap}>
        <header>
          <div id={MainStyles.topMenuWrap}>
            <ul id={MainStyles.topMenu}>
              <Link href="/SignIn">
                <span id={MainStyles.goToSignIn}>
                  {access_token ? '로그아웃' : '로그인'}
                </span>
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
                  ? `http://localhost:3000/${userImg}`
                  : '/images/myProfile.png'
              }
            />
            <div id={MainStyles.sideBarOneContent}>
              <span id={MainStyles.userName}>
                {userInfoData?.user_name ? userInfoData.user_name : userName}
              </span>
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
        <MainContent />
      </div>
      {modalOpen && (
        <Modal setModalOpen={showEditModal} handleUserData={handleUserData} />
      )}
    </div>
  );
}

export default Main;
