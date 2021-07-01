import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSideBarToggle } from "../../../app/actions/pageInteractionAction";
import avatar from "../../../imgs/avatar.png";

const Header = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen, userInfo } = useSelector((state) => ({
    isSideBarOpen: state.pageInteractionReducer.isSideBarOpen,
    userInfo: state.userReducer.userInfo,
  }));

  const handleSideBarOpen = (toggle) => {
    dispatch(getSideBarToggle(toggle));
  };
  return (
    <div className="sticky top-0 bg-white shadow flex justify-between items-center">
      <div onClick={() => handleSideBarOpen(!isSideBarOpen)} className="menu">
        {!isSideBarOpen ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-3 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
      <img
        className="w-24"
        src="https://www.onblastblog.com/wp-content/uploads/2017/08/blogger-logo-624x357.jpg"
        alt=""
      />
      <div className="flex justify-between items-center px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {userInfo?.image ? (
          <img
            className="rounded-full w-10 ml-3"
            src={`data:${userInfo?.image?.contentType};base64,${userInfo?.image?.img}`}
            alt=""
          />
        ) : (
          <img className="rounded-full w-10 ml-3" src={avatar} alt="" />
        )}
      </div>
    </div>
  );
};

export default Header;
