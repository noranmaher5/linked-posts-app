import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";


export default function UploadProfilePhoto() {
  const [isShow, setIsShow] = useState(false);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      photo: "",
    },
  });
  let { register, handleSubmit, reset } = form;

  // toggle modal
  function toggleModal() {
    setIsShow(!isShow);
    if (!isShow) {
      setPreview(null);
      reset();
    }
  }

  // handle file preview
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  }

  // handle API call
  async function handleUploadPhoto(data) {
    const file = data.photo[0];
    if (!file) return;

    const myData = new FormData();
    myData.append("photo", file);

    setLoading(true);
    try {
      const res = await axios.put(
        `https://linked-posts.routemisr.com/users/upload-photo`,
        myData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      toast.success("Photo uploaded successfully"); 
      console.log("Photo uploaded successfully:", res.data);

      setIsShow(false);
      setPreview(null);
      reset();
    } catch (err) {
      console.log("Error while uploading photo =>", err.response?.data || err);
      toast.error(err.response?.data?.message || "something went wrong"); 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={toggleModal}
        className="block cursor-pointer text-white bg-blue-700 hover:bg-blue-800 
        focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg 
        text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 
        dark:focus:ring-blue-800"
      >
        Upload Profile Photo
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
                  Upload your Profile Photo
                </h3>
                <button
                  type="button"
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 
                  hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex 
                  justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Body */}
              <div className="p-4">
                <form
                  onSubmit={handleSubmit(handleUploadPhoto)}
                  className="space-y-4"
                >
                  {/* Preview */}
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-full mx-auto mb-4 border"
                    />
                  )}

                  {/* File Input */}
                  <div className="flex flex-col items-center">
                    <input
                      type="file"
                      {...register("photo")}
                      id="photo"
                      onChange={handleFileChange}
                      className="absolute opacity-0 w-0 h-0"
                      required
                    />
                    <label
                      htmlFor="photo"
                      className="flex justify-center cursor-pointer items-center gap-3 
                      bg-red-500 py-3 px-4 rounded-lg text-white hover:bg-red-600"
                    >
                      <i className="fa-solid fa-image text-2xl"></i>
                      <span>Select Photo</span>
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center items-center gap-2 text-white 
                    bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
                    focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
                    text-center dark:bg-blue-600 dark:hover:bg-blue-700 
                    dark:focus:ring-blue-800 disabled:opacity-70"
                  >
                    {loading && (
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                      </svg>
                    )}
                    {loading ? "Uploading..." : "Update Profile"}
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
