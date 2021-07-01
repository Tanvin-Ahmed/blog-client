import React from "react";
import { useHistory } from "react-router-dom";

const ShowBlogList = ({ blog, index }) => {
  const history = useHistory();
  const turnCate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "....." : string;
  };
  return (
    <div
      onClick={() => history.push(`/blog/${blog._id}`)}
      key={blog?._id}
      className="mt-3 md:h-56 shadow rounded p-2 flex flex justify-between items-center flex-wrap md:flex-nowrap cursor-pointer hover:bg-red-100 transition duration-700 ease-in-out"
    >
      <div className="md:h-56 flex justify-between items-center flex-wrap md:flex-nowrap">
        <img
          className="w-56 h-full rounded m-auto md:mr-5"
          src={`data:${blog?.image?.contentType};base64,${blog?.image?.img}`}
          alt={index + 1}
        />
        <div>
          <h3 className="text-xl font-bold">{blog?.title}</h3>
          <h5 className="text-gray-500">{blog?.author}</h5>
          <small className="text-red-400">
            {new Date(blog?.uploadedTime).toLocaleString()}
          </small>
          <p className="mt-3 mb-2">{turnCate(blog?.content, 200)}</p>
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
            {blog?.like?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowBlogList;
