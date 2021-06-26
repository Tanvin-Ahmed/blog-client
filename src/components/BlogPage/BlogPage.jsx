import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getModalToggle,
  getOneBlogsDetails,
} from "../../app/actions/blogsActions";
import CommentForm from "../CommentForm/CommentForm";
import Loader from "../Loader/Loader";

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogDetails, commentFormToggle, loadingSpinner } = useSelector(
    (state) => ({
      blogDetails: state.blogsReducer.blogDetails,
      commentFormToggle: state.blogsReducer.commentFormToggle,
      loadingSpinner: state.blogsReducer.loadingSpinner,
    })
  );
  const openModal = () => {
    dispatch(getModalToggle(true));
  };
  const closeModal = () => {
    dispatch(getModalToggle(false));
  };

  useEffect(() => {
    dispatch(getOneBlogsDetails(id));
  }, [dispatch, id]);

  return (
    <div>
      {loadingSpinner ? (
        <div className="flex justify-center items-center my-5">
          <Loader />
        </div>
      ) : (
        <>
          <div className="heder text-center">
            <img
              className="m-auto mt-10 md:w-3/4"
              src={`data:${blogDetails?.image?.contentType};base64,${blogDetails?.image?.img}`}
              alt="cover-img"
            />
            <h1 className="text-4xl font-bold my-3 text-red-400">
              {blogDetails.title}
            </h1>
            <h3 className="text-xl font-bold">{blogDetails.author}</h3>
            <h5 className="text-md mt-3 font-bold text-blue-400">
              {new Date(blogDetails.uploadedTime).toLocaleString()}
            </h5>
          </div>
          <div className="body">
            <p className="p-5">{blogDetails.content}</p>
            <div>
              <div className="flex justify-center times-center">
                <div className="flex justify-center times-center">
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
                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                    />
                  </svg>
                  <p>{blogDetails?.like?.length}</p>
                </div>
                <svg
                  onClick={openModal}
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 ml-10 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <CommentForm
            commentFormToggle={commentFormToggle}
            closeModal={closeModal}
          />
        </>
      )}
    </div>
  );
};

export default BlogPage;
