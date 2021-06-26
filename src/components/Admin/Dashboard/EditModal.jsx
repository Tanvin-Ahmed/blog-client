import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog } from "../../../app/actions/blogsActions";
import Loader from "../../Loader/Loader";

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

const EditModal = ({ selectedItem, commentFormToggle, closeModal }) => {
  const { spinnerForBlogUpdate } = useSelector((state) => ({
    spinnerForBlogUpdate: state.blogsReducer.spinnerForBlogUpdate,
  }));
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const updatedBlog = {
      _id: selectedItem._id,
      ...data,
      uploadedTime: new Date().toUTCString(),
    };
    dispatch(updateBlog(updatedBlog));
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
          <h2 className="text-2xl font-bold text-blue-500">Update Blog</h2>
          <button
            className="bg-red-300 text-red-700 p-1 rounded hover:bg-red-400 focus:outline-none"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-input px-2 py-2 w-full rounded mb-3"
            defaultValue={selectedItem.title}
            {...register("title", { required: true })}
            placeholder="Title"
          />
          {errors.title && (
            <span className="text-red-800">Email is required</span>
          )}
          <input
            type="text"
            className="form-input px-2 py-2 w-full rounded mb-3"
            defaultValue={selectedItem.author}
            {...register("author", { required: true })}
            placeholder="Author"
          />
          {errors.author && (
            <span className="text-red-800">Name is required</span>
          )}
          <textarea
            className="form-input px-2 py-2 w-full rounded mb-3"
            defaultValue={selectedItem.content}
            {...register("content", { required: true })}
            cols="30"
            rows="10"
            placeholder="Write a comment..."
          ></textarea>
          {errors.content && (
            <span className="text-red-800">Content is required</span>
          )}
          <button
            className="flex justify-center items-center bg-blue-400 hover:bg-blue-500 px-3 py-2 m-auto rounded text-white focus:outline-none"
            type="submit"
          >
            Save This Change{" "}
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
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </button>
        </form>
        {spinnerForBlogUpdate && (
          <div className="flex justify-center items-center mt-3">
            <Loader />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EditModal;
