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
  UPDATE_BLOGS_WHEN_ANY_LIKE_INSERT,
  UPDATE_BLOGS_DATA_AFTER_UPLOAD_NEW_BLOGS,
} from "../type";

export const postBlog = (blog) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
      payload: true,
    });
    axios
      .post("http://localhost:5000/blog/upload", blog)
      .then((data) => {
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

export const updateBlogsDataWhenUploadNewBlog = (data) => {
  return {
    type: UPDATE_BLOGS_DATA_AFTER_UPLOAD_NEW_BLOGS,
    payload: data,
  };
};

export const getBlogsData = () => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER,
      payload: true,
    });
    axios
      .get("http://localhost:5000/blog/find-all-blogs")
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
    console.log("getOneBlogsDetails");
    axios(`http://localhost:5000/blog/find-blog/${id}`)
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
      .put("http://localhost:5000/blog/update-blog", updatedBlog)
      .then((data) => {
        console.log("update successfully");
        dispatch({
          type: LOADING_SPINNER_FOR_UPDATE_BLOGS,
          payload: false,
        });
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

export const updateBlogsWhenUpdateByAdmin = (allBlogData, updatedData) => {
  return (dispatch) => {
    console.log(allBlogData);
    const value = allBlogData.find((blog) => blog._id === updatedData._id);
    const index = allBlogData.findIndex((blog) => blog._id === updatedData._id);
    const newBlogDetails = {
      ...value,
      ...updatedData,
    };
    allBlogData.splice(index, 1, newBlogDetails);
    // console.log(allBlogData);
    dispatch({
      type: UPDATE_BLOGS_WHEN_ANY_ITEM_WILL_UPDATED,
      payload: allBlogData,
    });
  };
};

export const uploadComments = (id, comment) => {
  return (dispatch) => {
    dispatch(getModalToggle(false));
    axios
      .put(`http://localhost:5000/blog/upload-comment/${id}`, comment)
      .then((data) => console.log("comment uploaded successfully"))
      .catch((err) => alert("Comment not upload, please try again"));
  };
};

export const uploadLike = (id, like) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:5000/blog/upload-like/${id}`, like)
      .then(() => console.log("like uploaded"))
      .catch(() => alert("Like not set, please try again"));
  };
};

export const uploadUnlike = (id, unlikeUser) => {
  return (dispatch) => {
    axios
      .put(`http://localhost:5000/blog/upload-unlike/${id}`, unlikeUser)
      .then(() => console.log("unlike uploaded"))
      .catch(() => alert("Unlike not set, please try again"));
  };
};

export const updateBlogDetailsAfterCommentUpload = (blogDetails) => {
  return {
    type: UPDATE_BLOG_DETAILS,
    payload: blogDetails,
  };
};

export const updateIfAnyLikeInsert = (id, allBlogData, likes) => {
  return (dispatch) => {
    const value = allBlogData.find((blog) => blog._id === id);
    const index = allBlogData.findIndex((blog) => blog._id === id);
    const newBlogDetails = {
      ...value,
      like: likes,
    };
    allBlogData.splice(index, 1, newBlogDetails);
    // console.log(allBlogData);
    dispatch({
      type: UPDATE_BLOGS_WHEN_ANY_LIKE_INSERT,
      payload: allBlogData,
    });
  };
};

export const deleteBlog = (id) => {
  return (dispatch) => {
    dispatch({
      type: LOADING_SPINNER_FOR_BLOG_DETAILS,
      payload: true,
    });
    axios
      .delete(`http://localhost:5000/blog/delete-blog/${id}`)
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
