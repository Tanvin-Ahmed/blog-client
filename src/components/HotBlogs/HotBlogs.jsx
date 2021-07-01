import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ShowBlogList from "../ShowBlogList/ShowBlogList";
import Loader from "../Loader/Loader";

const HotBlogs = () => {
  const { allBlogData, loadingSpinner } = useSelector((state) => ({
    allBlogData: state.blogsReducer.allBlogData,
    loadingSpinner: state.blogsReducer.loadingSpinner,
  }));
  const hotBlogs = useRef([]);
  useEffect(() => {
    let a = 0;
    for (let i = allBlogData.length - 1; i >= 0; i--) {
      const element = allBlogData[i];
      if (a === 6) {
        break;
      }
      a++;
      hotBlogs.current.push(element);
    }
  }, [allBlogData]);
  return (
    <div>
      <h1 className="text-center text-red-400 font-semibold text-3xl my-4">
        Hot Blogs are here
      </h1>
      {loadingSpinner ? (
        <div className="flex justify-center items-center my-4">
          <Loader />
        </div>
      ) : (
        hotBlogs.current
          .slice(0, 5)
          .map((blog, index) => <ShowBlogList blog={blog} index={index} />)
      )}
    </div>
  );
};

export default HotBlogs;
