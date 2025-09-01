import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreatePost({ onPostCreated }) {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  const { register, handleSubmit, reset } = useForm({
    defaultValues: { body: "", image: null },
  });

  // Preview & Validate Image
  function handleFileChange(e) {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File should be an image");
        e.target.value = null;
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Size of image should not exceed 2MB");
        e.target.value = null;
        return;
      }
      setPreview(URL.createObjectURL(file));
    }
  }

  // Submit Post
  async function onSubmit(data) {
    const token = localStorage.getItem("userToken");
    if (!token) {
      toast.error("End of session! Please login");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("body", data.body);
      if (data.image && data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post(
        "https://linked-posts.routemisr.com/posts",
        formData,
        {
          headers: {
            token: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      

      toast.success("Post published successfully!");
      reset();
      setPreview(null);

      if (onPostCreated) onPostCreated(res.data);
      navigate("/");

    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to publish post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full md:w-[80%] mx-auto my-6 p-6 bg-slate-100 shadow-md rounded-md lg:w-[60%]">
      <h2 className="text-lg font-bold mb-4">
        <i className="fa-regular fa-pen-to-square"></i> Create a new post
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* نص البوست */}
        <textarea
          {...register("body")}
          className="w-full border rounded-md p-3 text-sm"
          placeholder="What's on your mind?"
          rows="4"
          required
          autoFocus
        ></textarea>

        {/* عرض البريفيو */}
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-64 object-cover rounded-md border mb-3"
          />
        )}

        {/* إدخال الصورة */}
        <input
          type="file"
          {...register("image")}
          onChange={(e) => {
            if (e.target.files.length === 0) setPreview(null);
            else handleFileChange(e);
          }}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 
            file:rounded-md file:border-0 file:text-sm file:font-semibold 
            file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* الأزرار */}
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 flex justify-center items-center gap-2 text-white 
              bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none 
              focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 
              disabled:opacity-70"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <i className="fa fa-spinner fa-spin"></i> Publishing...
              </span>
            ) : (
              "Publish Post"
            )}
          </button>

       
        </div>
      </form>
    </div>
  );
}
