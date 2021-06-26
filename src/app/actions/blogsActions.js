import axios from "axios";
import {
  MODAL_TOGGLE,
  GET_ALL_BLOGS_INFO,
  GET_ONE_BLOG_DETAILS,
  POST_BLOG_INFO,
  LOADING_SPINNER,
  LOADING_SPINNER_FOR_BLOG_DETAILS,
  UPDATE_BLOGS_DATA_AFTER_DELETE,
  LOADING_SPINNER_FOR_UPDATE_BLOGS,
  UPDATE_BLOGS_WHEN_ANY_ITEM_WILL_UPDATED,
  UPDATE_BLOG_DETAILS,
} from "../type";

export const postBlog = (blog) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
      payload: true,
    });
    axios
      .post("https://blog-server-12345.herokuapp.com/blog/upload", blog)
      .then((data) => {
        dispatch({
          type: POST_BLOG_INFO,
          payload: data.data,
        });
        dispatch({
          type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
          payload: false,
        });
        alert("Blog uploaded");
      })
      .catch((err) => {
        dispatch({
          type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
          payload: false,
        });
        alert("Something went wrong, please try again");
      });
  };
};

export const getBlogsData = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER,
      payload: true,
    });
    axios
      .get("https://blog-server-12345.herokuapp.com/blog/find-all-blogs")
      .then((data) => {
        dispatch({
          type: LOADING_SPINNER,
          payload: false,
        });
        dispatch({
          type: GET_ALL_BLOGS_INFO,
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOADING_SPINNER,
          payload: false,
        });
      });
  };
};

export const getOneBlogsDetails = (id) => {
  return async (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_BLOG_DETAILS,
      payload: true,
    });
    axios(`https://blog-server-12345.herokuapp.com/blog/find-blog/${id}`)
      .then((data) => {
        dispatch({
          type: LOADING_SPINNER_FOR_BLOG_DETAILS,
          payload: false,
        });
        dispatch({
          type: GET_ONE_BLOG_DETAILS,
          payload: data.data,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: LOADING_SPINNER_FOR_BLOG_DETAILS,
          payload: false,
        });
      });
  };
};

export const updateBlog = (updatedBlog) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
      payload: true,
    });
    axios
      .put(
        "https://blog-server-12345.herokuapp.com/blog/update-blog",
        updatedBlog
      )
      .then((data) => {
        console.log("update successfully");
        dispatch({
          type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
          payload: false,
        });
        alert("update successfully");
      })
      .catch((err) => {
        console.log(err.message);
        dispatch({
          type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
          payload: false,
        });
        alert("something went wrong, please try again");
      });
  };
};

export const updateBlogsWhenUpdateByAdmin = (id, blogList) => {
  return (dispatch) => {
    axios(`https://blog-server-12345.herokuapp.com/blog/find-blog/${id}`).then(
      (data) => {
        const updateBlogIndex = blogList.findIndex((blog) => blog._id === id);
        blogList.splice(updateBlogIndex, 1, data.data);
        dispatch({
          type: UPDATE_BLOGS_WHEN_ANY_ITEM_WILL_UPDATED,
          payload: blogList,
        });
      }
    );
  };
};

export const uploadComments = (id, comment) => {
  return (dispatch) => {
    dispatch(getModalToggle(false));
    axios
      .put(
        `https://blog-server-12345.herokuapp.com/blog/upload-comment/${id}`,
        comment
      )
      .then((data) => console.log("comment uploaded successfully"))
      .catch((err) => alert("Comment not upload, please try again"));
  };
};
export const updateBlogDetailsAfterCommentUpload = (blogDetails) => {
  return {
    type: UPDATE_BLOG_DETAILS,
    payload: blogDetails,
  };
};

export const deleteBlog = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_BLOG_DETAILS,
      payload: true,
    });
    axios
      .delete(`https://blog-server-12345.herokuapp.com/blog/delete-blog/${id}`)
      .then((response) => {
        console.log("deleted");
        dispatch({
          type: LOADING_SPINNER_FOR_BLOG_DETAILS,
          payload: false,
        });
      })
      .catch((err) => {
        alert("Something went wrong, please try again");
        dispatch({
          type: LOADING_SPINNER_FOR_BLOG_DETAILS,
          payload: false,
        });
      });
  };
};

export const updateBlogListAfterDelete = (newList) => {
  return {
    type: UPDATE_BLOGS_DATA_AFTER_DELETE,
    payload: newList,
  };
};

export const getModalToggle = (toggle) => {
  return {
    type: MODAL_TOGGLE,
    payload: toggle,
  };
};
