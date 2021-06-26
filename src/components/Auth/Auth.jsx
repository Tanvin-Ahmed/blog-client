import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getIsLogin,
  getUserInfo,
  postSignUp,
} from "../../app/actions/userAction";

const Auth = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLogin, loginSpinner } = useSelector((state) => ({
    isLogin: state.userReducer.isLogin,
    loginSpinner: state.userReducer.loginSpinner,
  }));
  const { from } = location.state || { from: { pathname: "/" } };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (!isLogin) {
      if (data.password.trim().length > 5) {
        if (data.password === data.cfPassword) {
          const userData = new FormData();
          userData.append("file", data.file[0]);
          userData.append("name", data.name);
          userData.append("email", data.email);
          userData.append("password", data.password);
          // for (let obj of userData) {
          //   console.log(obj);
          // }
          dispatch(postSignUp(userData, history, from));
        } else {
          alert("Password and Confirm Password not match");
        }
      } else {
        alert("Password at last 6 characters");
      }
    } else {
      dispatch(getUserInfo(data, history, from));
    }
  };
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-11/12 md:w-3/6 shadow-xl p-3">
        <div className="flex justify-around items-center">
          <button
            onClick={() => dispatch(getIsLogin(true))}
            type="button"
            className={`px-4 py-2 mb-4 font-semibold focus:outline-none ${
              isLogin && "shadow-lg rounded bg-blue-100"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => dispatch(getIsLogin(false))}
            type="button"
            className={`px-4 py-2 mb-4 font-semibold focus:outline-none ${
              !isLogin && "shadow-lg rounded bg-blue-100"
            }`}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isLogin && (
            <>
              <input
                className="form-input rounded px-3 py-2 w-full mb-3 border-gray-200 shadow focus:outline-none"
                type="text"
                {...register("name", { required: true })}
                placeholder="Name"
              />
              {errors.name && (
                <span className="text-red-400">Name is required</span>
              )}
            </>
          )}
          <input
            className="form-input rounded px-3 py-2 w-full mb-3 border-gray-200 shadow focus:outline-none"
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-400">This field is required</span>
          )}
          <input
            className="form-input rounded px-3 py-2 w-full mb-3 border-gray-200 shadow focus:outline-none"
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-400">This field is required</span>
          )}
          {!isLogin && (
            <>
              <input
                className="form-input rounded px-3 py-2 w-full mb-3 border-gray-200 shadow focus:outline-none"
                type="password"
                {...register("cfPassword", { required: true })}
                placeholder="Confirm Password"
              />
              {errors.cfPassword && (
                <span className="text-red-400">This field is required</span>
              )}
            </>
          )}
          {!isLogin && (
            <>
              <input
                className="hidden"
                id="file"
                type="file"
                accept="image/*"
                {...register("file", { required: true })}
              />
              <label
                className="bg-blue-400 w-full mb-4 px-4 py-2 font-semibold text-white rounded hover:bg-blue-500 flex justify-center items-center"
                htmlFor="file"
              >
                Select Profile Photo{" "}
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
              {errors.file && (
                <span className="text-red-400">This field is required</span>
              )}
            </>
          )}
          <div className="flex justify-center items-center">
            <button
              className="px-4 py-2 bg-green-500 rounded font-bold text-white hover:bg-green-600 focus:outline-none"
              type="submit"
            >
              {isLogin ? "Log In" : "Sign Up"}
            </button>
          </div>
        </form>
        {loginSpinner && (
          <p className="mt-3 text-center text-green-600 font-semibold">
            Please Wait....
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;
