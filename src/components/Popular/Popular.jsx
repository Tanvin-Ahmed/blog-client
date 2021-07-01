import React, { useEffect } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import ShowBlogList from "../ShowBlogList/ShowBlogList";
import Loader from "../Loader/Loader";

const Popular = () => {
  const { allBlogData, loadingSpinner } = useSelector((state) => ({
    allBlogData: state.blogsReducer.allBlogData,
    loadingSpinner: state.blogsReducer.loadingSpinner,
  }));

  const popular = useRef([]);
  useEffect(() => {
    popular.current = allBlogData.filter((blog) => blog?.like?.length > 4);
  }, [allBlogData]);
  return (
    <div>
      {loadingSpinner ? (
        <div className="flex justify-center items-center my-5">
          <Loader />
        </div>
      ) : popular.current.length > 0 ? (
        popular.current.map((blog, index) => (
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
          Blogs are not available 😢
        </h1>
      )}
    </div>
  );
};

export default Popular;
