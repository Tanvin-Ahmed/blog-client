import axios from "axios";
import {
  IS_LOGIN_PAGE,
  IS_USER_ADMIN,
  POST_SIGN_UP_DATA,
  USER_LOGIN_INFO,
} from "../type";

export const postSignUp = (userData, history, from) => {
  return (dispatch) => {
    dispatch({
      type: POST_SIGN_UP_DATA,
      payload: true,
    });

    axios
      .post("https://blog-server-12345.herokuapp.com/user/sign-up", userData)
      .then((data) => {
        sessionStorage.setItem("blog/user", JSON.stringify(data.data));
        dispatch({
          type: USER_LOGIN_INFO,
          payload: data.data,
        });
        dispatch({
          type: POST_SIGN_UP_DATA,
          payload: false,
        });
        history.replace(from);
        dispatch(getAdmin(data?.data?.email));
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGN_UP_DATA,
          payload: false,
        });
        alert("something went wrong, please try again");
      });
  };
};

export const getUserInfo = (user, history, from) => {
  return (dispatch) => {
    dispatch({
      type: POST_SIGN_UP_DATA,
      payload: true,
    });

    axios
      .post(`https://blog-server-12345.herokuapp.com/user/find-user`, user)
      .then((data) => {
        sessionStorage.setItem("blog/user", JSON.stringify(data.data));
        const userData = JSON.parse(sessionStorage.getItem("blog/user"));
        dispatch({
          type: USER_LOGIN_INFO,
          payload: userData,
        });
        dispatch({
          type: POST_SIGN_UP_DATA,
          payload: false,
        });
        history.replace(from);
        dispatch(getAdmin(userData?.email));
      })
      .catch((err) => {
        dispatch({
          type: POST_SIGN_UP_DATA,
          payload: false,
        });
        alert("Check your email address and password then try again");
      });
  };
};

export const getUserDataAfterReload = () => {
  return (dispatch) => {
    const userData = JSON.parse(sessionStorage.getItem("blog/user"));
    dispatch({
      type: USER_LOGIN_INFO,
      payload: userData,
    });
  };
};

export const addAdmin = (email) => {
  return (dispatch) => {
    dispatch({
      type: POST_SIGN_UP_DATA,
      payload: true,
    });
    axios
      .post("https://blog-server-12345.herokuapp.com/user/add-admin", email)
      .then((data) => {
        alert("Add new Admin Successfully");
      })
      .catch((err) => {
        alert("something went wrong, please try again");
      });
  };
};

export const getAdmin = (email) => {
  return (dispatch) => {
    axios(`https://blog-server-12345.herokuapp.com/user/find-admin/${email}`)
      .then((data) => {
        if (data.data) {
          dispatch({
            type: IS_USER_ADMIN,
            payload: true,
          });
        } else {
          dispatch({
            type: IS_USER_ADMIN,
            payload: false,
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getIsLogin = (toggle) => {
  return {
    type: IS_LOGIN_PAGE,
    payload: toggle,
  };
};
