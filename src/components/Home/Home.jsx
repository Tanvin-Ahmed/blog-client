import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDataAfterReload } from "../../app/actions/userAction";
import Loader from "../Loader/Loader";
import ShowBlogList from "../ShowBlogList/ShowBlogList";

const Home = () => {
  const dispatch = useDispatch();
  const { blogsData, loadingSpinner } = useSelector((state) => ({
    blogsData: state.blogsReducer.allBlogData,
    loadingSpinner: state.blogsReducer.loadingSpinner,
  }));

  useEffect(() => {
    dispatch(getUserDataAfterReload());
  }, [dispatch]);

  return (
    <section>
      <div
        style={{ height: "70vh" }}
        className="bg-cover-image bg-center bg-no-repeat bg-cover flex flex-col justify-center items-center"
      >
        <h1 className="font-bold text-4xl text-red-400">Welcome to Blog</h1>
      </div>
      <div className="my-3">
        <h1 className="text-center mb-5 text-3xl font-bold text-red-400">
          Our Blogs
        </h1>
        {loadingSpinner ? (
          <div className="flex justify-center items-center mb-5">
            <Loader />
          </div>
        ) : (
          blogsData.map((blog, index) => (
            <ShowBlogList blog={blog} index={index} />
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
