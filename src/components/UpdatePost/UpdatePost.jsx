import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdatePost({ post, onClose, onSuccess }) {
  const [body, setBody] = useState(post?.body || "");
  const [image, setImage] = useState(null); // هخليه فايل

  const mutation = useMutation({
    mutationFn: async () => {
      const formData = new FormData();
      formData.append("body", body);
      if (image) formData.append("image", image);

      return axios.put(
        `https://linked-posts.routemisr.com/posts/${post._id}`,
        formData,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );
    },
    onSuccess: () => {
      toast.success("Post updated successfully");
      onSuccess();
    },
    onError: (err) => {
      toast.error("Failed to update post");
      console.error(err);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Post Body</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full border rounded-md p-2"
          rows="4"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full border rounded-md p-2"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {mutation.isLoading ? "Updating..." : "Update"}
        </button>
      </div>
    </form>
  );
}
