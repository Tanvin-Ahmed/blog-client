import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { uploadComments } from "../../app/actions/blogsActions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

const CommentForm = ({ blogId, commentFormToggle, closeModal }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => ({
    userInfo: state.userReducer.userInfo,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(uploadComments(blogId, data));
  };
  return (
    <div>
      <Modal
        isOpen={commentFormToggle}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-bold text-red-500">Hello Tanvin</h2>
          <button
            className="bg-red-300 text-red-700 p-1 rounded hover:bg-red-400 focus:outline-none"
            onClick={closeModal}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <h3 className="text-lg mb-3">Give your valuable feedback</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="form-input px-2 py-2 w-full rounded mb-3"
            defaultValue={userInfo?.email}
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-800">Email is required</span>
          )}
          <input
            type="text"
            defaultValue={userInfo?.name}
            className="form-input px-2 py-2 w-full rounded mb-3"
            {...register("name", { required: true })}
            placeholder="Name"
          />
          {errors.name && (
            <span className="text-red-800">Name is required</span>
          )}
          <textarea
            className="form-input px-2 py-2 w-full rounded mb-3"
            {...register("comment", { required: true })}
            cols="30"
            rows="10"
            placeholder="Write a comment..."
          ></textarea>
          {errors.comment && (
            <span className="text-red-800">Comment is required</span>
          )}
          <button
            className="flex justify-center items-center bg-green-200 hover:bg-green-300 px-3 py-2 m-auto rounded text-green-900 focus:outline-none"
            type="submit"
          >
            Comment{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-3"
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
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default CommentForm;
