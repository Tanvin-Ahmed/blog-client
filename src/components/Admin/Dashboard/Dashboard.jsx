import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBlog, getModalToggle } from "../../../app/actions/blogsActions";
import EditModal from "./EditModal";
import Loader from "../../Loader/Loader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { blogsData, commentFormToggle, loadingSpinner, spinnerForBlogUpdate } =
    useSelector((state) => ({
      blogsData: state.blogsReducer.allBlogData,
      commentFormToggle: state.blogsReducer.commentFormToggle,
      loadingSpinner: state.blogsReducer.loadingSpinner,
      spinnerForBlogUpdate: state.blogsReducer.spinnerForBlogUpdate,
    }));
  const selectedItem = useRef({});
  const openModal = () => {
    dispatch(getModalToggle(true));
  };
  const closeModal = () => {
    dispatch(getModalToggle(false));
  };
  const handleUpdateItem = (blog) => {
    selectedItem.current = blog;
    openModal();
  };
  const handleDeleteItemId = (id) => {
    dispatch(deleteBlog(id));
  };

  const turnCate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "....." : string;
  };
  return (
    <section className="mt-5">
      <h1 className="text-center mb-5 text-3xl text-red-400 font-semibold">
        Dashboard
      </h1>
      {loadingSpinner ? (
        <div className="flex justify-center items-center my-5">
          <Loader />
        </div>
      ) : (
        blogsData.map((blog, index) => (
          <div
            key={blog._id}
            className="mt-3 md:h-56 shadow rounded p-2 flex flex justify-between items-center flex-wrap md:flex-nowrap hover:bg-yellow-100 transition duration-700 ease-in-out"
          >
            <img
              className="w-56 h-full rounded m-auto md:mr-5"
              src={`data:${blog?.image?.contentType};base64,${blog?.image?.img}`}
              alt={index + 1}
            />
            <div>
              <h3 className="text-xl font-bold">{blog.title}</h3>
              <h5 className="text-gray-500">{blog.author}</h5>
              <small className="text-red-400">
                {new Date(blog.uploadedTime).toLocaleString()}
              </small>
              <p className="mt-3 mb-2">{turnCate(blog.content, 200)}</p>
              <div className="flex">
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
                    d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                  />
                </svg>
                {blog.like.length}
              </div>
            </div>
            <div className="w-full md:w-auto flex justify-center items-center md:flex-col">
              <div
                onClick={() => handleUpdateItem(blog)}
                className="cursor-pointer bg-blue-400 text-white hover:bg-blue-500 p-2 rounded hover:shadow-xl m-3"
              >
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div
                onClick={() => handleDeleteItemId(blog._id)}
                className="cursor-pointer bg-red-400 text-white hover:bg-red-500 p-2 rounded hover:shadow-xl m-3"
              >
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </div>
              {spinnerForBlogUpdate && (
                <div className="mr-3 md:m-auto">
                  <Loader />
                </div>
              )}
            </div>
            <EditModal
              selectedItem={selectedItem.current}
              commentFormToggle={commentFormToggle}
              closeModal={closeModal}
            />
          </div>
        ))
      )}
    </section>
  );
};

export default Dashboard;
