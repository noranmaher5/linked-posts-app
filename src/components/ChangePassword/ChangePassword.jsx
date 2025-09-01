import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function ChangePassword() {
  const [isShow, setIsShow] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
    },
  });

  // toggle modal
  function toggleModal() {
    setIsShow(!isShow);
  }

  // handle API call
  function handleChangePassword(data) {
    axios
      .patch(
        "https://linked-posts.routemisr.com/users/change-password",
        {
          password: data.currentPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            token: localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("Password Changed ", response.data);
        toast.success("Password updated successfully! ");
        setIsShow(false);
      })
      .catch((error) => {
        console.error("Error changing password :", error.response?.data || error);
        toast.error(error.response?.data?.message || "Failed to update password");
      });
  }

  return (
    <div>
      {/* open modal button */}
      <button
        onClick={toggleModal}
        className="block cursor-pointer text-white bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
      >
        Change Password
      </button>

      {/* Modal */}
      {isShow && (
        <div
          id="authentication-modal"
          tabIndex={-1}
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 
          z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] 
          max-h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Change Password
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 
                  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                  justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✕
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <form
                  onSubmit={handleSubmit(handleChangePassword)}
                  className="space-y-4"
                >
                  <div>
                    <label
                      htmlFor="currentPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      {...register("currentPassword")}
                      id="currentPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="newPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      {...register("newPassword")}
                      id="newPassword"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                      rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
                      dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 
                    focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium 
                    rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 
                    dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
