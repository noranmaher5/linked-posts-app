import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';


export default function CreateComment({ postId }) {
  const [isShow, setIsShow] = useState(false);

  const form = useForm({
    defaultValues: {
      content: "",
      post: postId, 
    },
  });

  const { register, handleSubmit, reset } = form;

async function addComment(value) {
  try {
    let res = await axios.post(
      "https://linked-posts.routemisr.com/comments",
      value,
      {
        headers: {
          token: localStorage.getItem("userToken"),
         
        },
      }
    );

    if (res.data.message === "success") {
      toast.success("Comment added successfully ✅");
      reset();        // يفضي الفورم
      toggleModal();  // يقفل المودال
    }
  } catch (err) {
    console.log("Error while adding comment =>", err.response?.data || err);
    toast.error("Something went wrong ❌");
  }
}



  function toggleModal() {
    setIsShow(!isShow);
  }

  return (
    <div>
    <button
  onClick={toggleModal}
  className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md"
  type="button"
>
  Add Comment
</button>


      {isShow && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md bg-white rounded-lg shadow">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold">Add your comment</h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 hover:bg-gray-200 rounded-lg text-sm w-8 h-8 flex justify-center items-center"
              >
                ✕
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleSubmit(addComment)} className="space-y-4">
                <div>
                  <label
                    htmlFor="comment"
                    className="block mb-2 text-sm font-medium"
                  >
                    Your comment
                  </label>
                  <textarea
                    {...register("content")}
                    id="comment"
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder="Write your comment..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
