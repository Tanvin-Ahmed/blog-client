import {
  IS_LOGIN_PAGE,
  IS_USER_ADMIN,
  POST_SIGN_UP_DATA,
  USER_LOGIN_INFO,
} from "../type";

const initialState = {
  userInfo: {},
  isLogin: true,
  loginSpinner: false,
  isAdmin: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case IS_LOGIN_PAGE:
      return {
        ...state,
        isLogin: action.payload,
      };
    case POST_SIGN_UP_DATA:
      return {
        ...state,
        loginSpinner: action.payload,
      };
    case IS_USER_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
