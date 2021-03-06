import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getModalToggle,
  getOneBlogsDetails,
  uploadLike,
  uploadUnlike,
} from "../../app/actions/blogsActions";
import CommentForm from "../CommentForm/CommentForm";
import Loader from "../Loader/Loader";

const BlogPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { blogDetails, commentFormToggle, spinnerForBlogDetails, userInfo } =
    useSelector((state) => ({
      blogDetails: state.blogsReducer.blogDetails,
      commentFormToggle: state.blogsReducer.commentFormToggle,
      spinnerForBlogDetails: state.blogsReducer.spinnerForBlogDetails,
      userInfo: state.userReducer.userInfo,
    }));

  useMemo(() => {
    dispatch(getOneBlogsDetails(id));
  }, [dispatch, id]);

  const blogId = useRef("");
  const handleComment = (id) => {
    blogId.current = id;
    openModal();
  };
  const openModal = () => {
    dispatch(getModalToggle(true));
  };
  const closeModal = () => {
    dispatch(getModalToggle(false));
  };

  const handleLike = (id) => {
    const liker = {
      email: userInfo.email,
    };
    dispatch(uploadLike(id, liker));
  };

  const handleUnlike = (id) => {
    const unlikeUser = {
      email: userInfo.email,
    };
    dispatch(uploadUnlike(id, unlikeUser));
  };

  const isLiked = useRef(null);
  useEffect(() => {
    isLiked.current = blogDetails?.like?.find(
      (liker) => liker.email === userInfo.email
    );
  }, [blogDetails?.like, userInfo.email]);

  return (
    <div>
      {spinnerForBlogDetails ? (
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
                  {isLiked.current ? (
                    <svg
                      onClick={() => handleUnlike(blogDetails?._id)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 cursor-pointer"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                    </svg>
                  ) : (
                    <svg
                      onClick={() => handleLike(blogDetails?._id)}
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
                  )}
                  <p className="ml-2">{blogDetails?.like?.length}</p>
                </div>
                <div className="flex justify-center times-center">
                  <svg
                    onClick={() => handleComment(blogDetails?._id)}
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
                  <p className="ml-2">{blogDetails?.comments?.length}</p>
                </div>
              </div>
            </div>
          </div>
          <CommentForm
            blogId={blogId.current}
            commentFormToggle={commentFormToggle}
            closeModal={closeModal}
          />
          <div className="flex flex-col justify-center items-center">
            <h1 className="my-4 text-3xl font-semibold text-yellow-500">
              Comments
            </h1>
            {blogDetails?.comments?.length > 0 &&
              blogDetails?.comments?.map((comment) => (
                <div className="w-11/12 p-3 my-3 shadow rounded">
                  <h3 className="text-2xl font-semibold text-blue-500">
                    {comment?.name}
                  </h3>
                  <small className="text-sm text-red-400">
                    {comment?.email}
                  </small>
                  <p className="text-semibold">{comment?.comment}</p>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BlogPage;
