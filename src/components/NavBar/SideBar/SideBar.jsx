import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getSideBarToggle } from "../../../app/actions/pageInteractionAction";
import { getUserDataAfterReload } from "../../../app/actions/userAction";

const SideBar = () => {
  const dispatch = useDispatch();
  const { isSideBarOpen, isAdmin, userInfo } = useSelector((state) => ({
    isSideBarOpen: state.pageInteractionReducer.isSideBarOpen,
    isAdmin: state.userReducer.isAdmin,
    userInfo: state.userReducer.userInfo,
  }));

  const handleCloseSideBar = () => {
    dispatch(getSideBarToggle(false));
  };

  const handleLogOut = () => {
    sessionStorage.removeItem("blog/user");
    dispatch(getUserDataAfterReload());
  };

  return (
    <div
      onClick={handleCloseSideBar}
      style={{ height: "91vh" }}
      className={
        isSideBarOpen
          ? "z-50 bg-white absolute w-4/5 md:w-52 shadow flex flex-col justify-between px-3 py-5"
          : "hidden"
      }
    >
      <div className="h-96 font-samibold flex flex-col justify-around">
        <Link
          to="/"
          className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
        >
          Home{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
        {userInfo?.email && (
          <>
            <Link
              to="/HotBlogs"
              className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
            >
              Hot Blogs{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"
                />
              </svg>
            </Link>
            <Link className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center">
              Popular Blogs{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </svg>
            </Link>
            <Link className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center">
              Favorite Blogs{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </Link>
            {isAdmin && (
              <>
                <Link
                  to="/admin/dashboard"
                  className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
                >
                  Dashboard{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
                    />
                  </svg>
                </Link>
                <Link
                  to="/admin/blog-upload-form"
                  className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
                >
                  Post New Blog{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </Link>
                <Link
                  to="/admin/make-admin"
                  className="transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
                >
                  Make Admin{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Link>
              </>
            )}
          </>
        )}
      </div>
      {userInfo?.email ? (
        <button
          onClick={handleLogOut}
          type="button"
          className="focus:outline-none transition duration-700 ease-in-out hover:bg-red-200 p-2 rounded shadow flex justify-between items-center"
        >
          Log Out{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      ) : (
        <Link
          to="/login"
          className="transition duration-700 ease-in-out hover:bg-green-200 p-2 rounded shadow flex justify-between items-center"
        >
          Log In{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
            />
          </svg>
        </Link>
      )}
    </div>
  );
};

export default SideBar;
