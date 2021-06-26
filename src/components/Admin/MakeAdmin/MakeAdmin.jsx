import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addAdmin } from "../../../app/actions/userAction";

const MakeAdmin = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    dispatch(addAdmin(data));
  };
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-11/12 md:w-3/6 shadow-xl p-3">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            className="form-input py-2 px-3 mb-3 w-full border-gray-100 shadow"
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500">Email is required</span>
          )}
          <div className="flex justify-center items-center">
            <button
              className="focus:outline-none rounded py-2 px-4 bg-green-400 text-white hover:bg-green-500 flex justify-center items-center"
              type="submit"
            >
              Add New Admin{" "}
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default MakeAdmin;
