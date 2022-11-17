import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';

import Nav from './Components/Nav';
// import Modal from './Modal/Modal';
// import TopListData from './TopListData/TopListData';
// import MainContent from './MainContent/MainContent';

import MainStyles from './Main.module.css';

function Main() {
  // const [categoryVisible, setCategoryVisible] = useState(true);
  // const [navList, setNavList] = useState([]);
  // const [userName, setUserName] = useState('');

  // const [listData, setListData] = useState([]);
  // const [selectCategoryData, setSelectCategoryData] = useState('');
  // const [searchData, setSearchData] = useState('');
  // const [modalOpen, setModalOpen] = useState(false);

  // const access_token = localStorage.getItem('token');

  // interface userInfoDataType {
  //   user_name: string;
  //   user_img: string;
  // }

  // // user_info 변경
  // const [userInfoData, setUserInfoData] = useState<null | userInfoDataType>(
  //   null,
  // );

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/list', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //       })
  //       .then(function (response) {
  //         setListData(response.data);
  //       });
  //   }
  // }, []);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/selectCategory', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //         params: {
  //           category: selectCategoryData,
  //         },
  //       })
  //       .then((response: any) => {
  //         setListData(response.data);
  //       });
  //   }
  // }, [selectCategoryData]);

  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     const access_token = localStorage.getItem('token');

  //     axios
  //       .get('http://localhost:3000/searchData', {
  //         headers: {
  //           Authorization: `${access_token}`,
  //         },
  //         params: {
  //           searchData: searchData,
  //         },
  //       })
  //       .then((response: any) => {
  //         setListData(response.data);
  //       });
  //   }
  // }, [searchData]);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/category', {
  //       headers: {
  //         Authorization: `${access_token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setNavList(response.data);
  //     });
  // }, []);

  // useEffect(() => {
  //   axios
  //     .get('http://localhost:3000/userName', {
  //       headers: {
  //         Authorization: `${access_token}`,
  //       },
  //     })
  //     .then(function (response) {
  //       setUserName(response.data[0].user_name);
  //     });
  // }, []);

  // const selectCategory = (event: any) => {
  //   setSelectCategoryData(event.target.textContent);
  // };

  // const searchUsersInput = (event: any) => {
  //   const userInput = event.target.value;
  //   setSearchData(userInput);
  // };

  // const showEditModal = () => {
  //   setModalOpen(!modalOpen);
  // };

  // const handleUserData = (updatedUserName: string, updatedUserImg: string) => {
  //   setUserInfoData({
  //     user_name: updatedUserName,
  //     user_img: updatedUserImg,
  //   });
  // };

  // const userImg = userInfoData?.user_img;

 
  useEffect(() => {
    console.log('컴포넌트가 화면에 나타남');
    return () => {
      console.log('컴포넌트가 화면에서 사라짐');
    };
  }, []);

  return (
    <>
      <header>
        <div id={MainStyles.title}>
          <h1>Joshua_World</h1>
          <img
            id={MainStyles.headerImg}
            alt="headerImg"
            src={'/images/headerImg.png'}
          />
        </div>
        <Nav />
      </header>
      <main>
        <section>
          <h1>HOME</h1>
        </section>
        <section id={MainStyles.informationTech}></section>
      </main>
    </>
    // <>
    //   <header>
    //     <div id={MainStyles.title}>
    //       <h1>Joshua_World</h1>
    //       <img
    //         id={MainStyles.headerImg}
    //         alt="headerImg"
    //         src={'/images/headerImg.png'}
    //       />
    //     </div>
    //     <Nav />
    //   </header>
    //   <div id={MainStyles.main}>
    //     <div id={MainStyles.mainWrap}>
    //       <nav id={MainStyles.sideBar}>
    //         <div id={MainStyles.sideBarOne}>
    //           <img
    //             id={MainStyles.myImg}
    //             alt="myImg"
    //             src={
    //               userInfoData
    //                 ? `http://localhost:3000/${userImg}`
    //                 : '/images/myProfile.png'
    //             }
    //           />
    //           <div id={MainStyles.sideBarOneContent}>
    //             <span id={MainStyles.userName}>
    //               {userInfoData?.user_name ? userInfoData.user_name : userName}
    //             </span>
    //             <div id={MainStyles.editButtonWrap}>
    //               <button id={MainStyles.editButton} onClick={showEditModal}>
    //                 Edit
    //               </button>
    //             </div>
    //           </div>
    //         </div>
    //         <div id={MainStyles.sideBarTwo}>
    //           <div id={MainStyles.navData}>
    //             <div
    //               id={MainStyles.category}
    //               onClick={() => {
    //                 setCategoryVisible(!categoryVisible);
    //               }}
    //             >
    //               category
    //             </div>
    //             {categoryVisible && (
    //               <ul>
    //                 {navList.map(navData => (
    //                   <li
    //                     key={navData['id']}
    //                     className={MainStyles.navDataContent}
    //                   >
    //                     <span
    //                       onClick={selectCategory}
    //                       className={MainStyles.navDataContentTitle}
    //                     >
    //                       {navData['category']}
    //                     </span>
    //                   </li>
    //                 ))}
    //               </ul>
    //             )}
    //           </div>
    //         </div>
    //         <div id={MainStyles.searchBox}>
    //           <input
    //             placeholder="검색"
    //             id={MainStyles.search}
    //             onChange={searchUsersInput}
    //           />
    //           <img
    //             id={MainStyles.searchIcon}
    //             alt="searchIcon"
    //             src="/images/search.png"
    //           />
    //         </div>
    //       </nav>
    //       <div id={MainStyles.mainContent}>
    //         <div id={MainStyles.listWrap}>
    //           <div id={MainStyles.list}>
    //             <TopListData topListData={listData} />
    //           </div>
    //         </div>
    //       </div>
    //       <MainContent MainContentListData={listData} />
    //     </div>
    //     {modalOpen && (
    //       <Modal setModalOpen={showEditModal} handleUserData={handleUserData} />
    //     )}
    //   </div>
    // </>
  );
}

export default Main;
