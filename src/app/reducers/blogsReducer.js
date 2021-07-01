import {
  MODAL_TOGGLE,
  GET_ALL_BLOGS_INFO,
  GET_ONE_BLOG_DETAILS,
  LOADING_SPINNER,
  LOADING_SPINNER_FOR_BLOG_DETAILS,
  UPDATE_BLOGS_DATA_AFTER_DELETE,
  LOADING_SPINNER_FOR_UPDATE_BLOGS,
  UPDATE_BLOGS_WHEN_ANY_ITEM_WILL_UPDATED,
  UPDATE_BLOG_DETAILS,
  UPDATE_BLOGS_WHEN_ANY_LIKE_INSERT,
  UPDATE_BLOGS_DATA_AFTER_UPLOAD_NEW_BLOGS,
} from "../type";

const initialState = {
  allBlogData: [],
  blogDetails: {},
  commentFormToggle: false,
  loadingSpinner: false,
  spinnerForBlogDetails: false,
  spinnerForBlogUpdate: false,
};

const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BLOGS_INFO:
      return {
        ...state,
        allBlogData: action.payload,
      };
    case UPDATE_BLOGS_DATA_AFTER_UPLOAD_NEW_BLOGS:
      return {
        ...state,
        allBlogData: action.payload,
      };
    case GET_ONE_BLOG_DETAILS:
      return {
        ...state,
        blogDetails: action.payload,
      };
    case UPDATE_BLOG_DETAILS:
      return {
        ...state,
        blogDetails: action.payload,
      };
    case MODAL_TOGGLE:
      return {
        ...state,
        commentFormToggle: action.payload,
      };
    case UPDATE_BLOGS_WHEN_ANY_ITEM_WILL_UPDATED:
      return {
        ...state,
        allBlogData: action.payload,
      };
    case LOADING_SPINNER:
      return {
        ...state,
        loadingSpinner: action.payload,
      };
    case LOADING_SPINNER_FOR_BLOG_DETAILS:
      return {
        ...state,
        spinnerForBlogDetails: action.payload,
      };
    case UPDATE_BLOGS_DATA_AFTER_DELETE:
      return {
        ...state,
        allBlogData: action.payload,
      };
    case UPDATE_BLOGS_WHEN_ANY_LIKE_INSERT:
      return {
        ...state,
        allBlogData: action.payload,
      };
    case LOADING_SPINNER_FOR_UPDATE_BLOGS:
      return {
        ...state,
        spinnerForBlogUpdate: action.payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
