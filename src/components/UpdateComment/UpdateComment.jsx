import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateComment({ comment, refreshComments }) {
  const [newContent, setNewContent] = useState(comment.content);
  const [editing, setEditing] = useState(false);
  const userId = localStorage.getItem("userId"); // بيتخزن وقت الـ login

  // 🟢 Update Comment
  async function handleUpdate(e) {
    e.preventDefault();

    try {
      const res = await axios.put(
        `https://linked-posts.routemisr.com/comments/${comment._id}`,
        { content: newContent },
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Comment updated ✅");
        setEditing(false);
        refreshComments();
      }
    } catch (err) {
      console.log("Update error:", err.response?.data || err);
      toast.error("Failed to update ❌");
    }
  }

  // 🔴 Delete Comment
  async function handleDelete() {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;

    try {
      const res = await axios.delete(
        `https://linked-posts.routemisr.com/comments/${comment._id}`,
        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        }
      );

      if (res.data.message === "success") {
        toast.success("Comment deleted 🗑️");
        refreshComments();
      }
    } catch (err) {
      console.log("Delete error:", err.response?.data || err);
      toast.error("Failed to delete ❌");
    }
  }

  // لو مش صاحب الكومنت → ولا Edit ولا Delete
  // مؤقتًا خليه يبان لكل الناس
// (هتشوف Edit/Delete تحت أي Comment)
if (!comment.commentCreator?._id) {
  return null;
}


  return (
    <div className="mt-2 flex gap-2">
      {editing ? (
        <form onSubmit={handleUpdate} className="flex gap-2 flex-1">
          <input
            type="text"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="border rounded p-1 text-sm flex-1"
          />
          <button
            type="submit"
            className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setNewContent(comment.content);
            }}
            className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <button
            onClick={() => setEditing(true)}
            className="text-blue-600 text-sm hover:underline"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-red-600 text-sm hover:underline"
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
