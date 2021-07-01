import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ShowBlogList from "../ShowBlogList/ShowBlogList";
import Loader from "../Loader/Loader";

const Favorite = () => {
  const { allBlogData, userInfo, loadingSpinner } = useSelector((state) => ({
    allBlogData: state.blogsReducer.allBlogData,
    userInfo: state.userReducer.userInfo,
    loadingSpinner: state.blogsReducer.loadingSpinner,
  }));
  const favoriteBlogs = useRef([]);
  useEffect(() => {
    favoriteBlogs.current = allBlogData.filter((blog) =>
      blog?.like.find((user) => user?.email === userInfo.email)
    );
  }, [allBlogData, userInfo.email]);

  return (
    <div>
      {loadingSpinner ? (
        <div className="flex justify-center items-center my-5">
          <Loader />
        </div>
      ) : (
        <>
          <h1 className="text-center text-blue-500 text-3xl font-semibold my-3">
            My Favorite Blogs
          </h1>
          {favoriteBlogs.current.length > 0 ? (
            favoriteBlogs.current.map((blog, index) => (
              <div>
                <ShowBlogList blog={blog} index={index} />
              </div>
            ))
          ) : (
            <h1
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
              className="font-bold text-3xl text-gray-300 absolute"
            >
              At first Like a Blog 😏
            </h1>
          )}
        </>
      )}
    </div>
  );
};

export default Favorite;
