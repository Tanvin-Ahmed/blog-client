import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { postBlog } from "../../../app/actions/blogsActions";
import Loader from "../../Loader/Loader";

const PostBlog = () => {
  const dispatch = useDispatch();
  const { loadingSpinner } = useSelector((state) => ({
    loadingSpinner: state.blogsReducer.loadingSpinner,
  }));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.title.trim() && data.author.trim() && data.content.trim()) {
      const blogData = new FormData();
      blogData.append("file", data.image[0]);
      blogData.append("title", data.title);
      blogData.append("author", data.author);
      blogData.append("content", data.content);
      blogData.append("like", []);
      blogData.append("comment", []);
      blogData.append("uploadedTime", new Date().toUTCString());
      dispatch(postBlog(blogData));
    } else {
      alert("Please fill up all requirement and try again.");
    }
  };
  return (
    <section className="flex justify-center items-center">
      <div className="w-11/12 md:w-3/6 shadow-xl p-3">
        <h1 className="text-center text-3xl font-semibold text-red-400 mb-4">
          Add A Blog
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            className="form-input py-2 px-3 w-full mb-3 border-gray-100 shadow"
            {...register("title", { required: true })}
            placeholder="Title"
          />
          {errors.title && (
            <span className="text-red-500">Title is required</span>
          )}

          <input
            type="text"
            className="form-input py-2 px-3 w-full mb-3 border-gray-100 shadow"
            {...register("author", { required: true })}
            placeholder="Author"
          />
          {errors.author && (
            <span className="text-red-500">Author is required</span>
          )}

          <textarea
            className="form-input py-2 px-3 w-full mb-3 border-gray-100 shadow"
            {...register("content", { required: true })}
            cols="30"
            rows="10"
            placeholder="Content..."
          ></textarea>
          {errors.content && (
            <span className="text-red-500">Content is required</span>
          )}
          <input
            className="hidden"
            id="file"
            type="file"
            accept="image/*"
            {...register("image")}
          />
          <label
            className="bg-blue-400 w-full mb-4 px-4 py-2 font-semibold text-white rounded hover:bg-blue-500 flex justify-center items-center"
            htmlFor="file"
          >
            Select an Image{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </label>
          <div className="flex justify-center items-center">
            <button
              className="px-5 py-2 rounded bg-green-400 text-white hover:bg-green-500 flex justify-center items-center focus:outline-none"
              type="submit"
            >
              Save{" "}
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
          </div>
        </form>
        {loadingSpinner && (
          <div className="flex justify-center items-center mt-3">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default PostBlog;
