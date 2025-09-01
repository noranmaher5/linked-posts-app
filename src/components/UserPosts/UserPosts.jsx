import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import toast from "react-hot-toast";
import CreateComment from "../CreateComment/CreateComment";
import Comment from "../comment/comment";
import UpdatePost from "../UpdatePost/UpdatePost";

export default function UserPosts({ id, clickable }) {
  const queryClient = useQueryClient();
  const [editingPost, setEditingPost] = useState(null); // post in edit modal

  // === Fetch Posts ===
  function getUserPosts() {
    return axios.get(`https://linked-posts.routemisr.com/users/${id}/posts`, {
      headers: { token: localStorage.getItem("userToken") },
    });
  }

  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["userPosts", id],
    queryFn: getUserPosts,
    select: (res) => res?.data?.posts,
  });

  // === Delete Post ===
  const deleteMutation = useMutation({
    mutationFn: (postId) =>
      axios.delete(`https://linked-posts.routemisr.com/posts/${postId}`, {
        headers: { token: localStorage.getItem("userToken") },
      }),
    onSuccess: () => {
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries(["userPosts", id]);
    },
    onError: () => toast.error("Failed to delete post"),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {data?.map((post) => (
        <div
          key={post?._id}
          className="w-full md:w-[80%] mx-auto my-4 p-4 bg-gray-200 shadow-md rounded-md lg:w-[60%] bg-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={post?.user?.photo}
                className="size-[36px] rounded-full"
                alt={post?.user?.name}
              />
              <p className="ml-2 font-bold">{post?.user?.name}</p>
            </div>

            {/* Menu - 3 Dots */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="p-2 rounded-full hover:bg-gray-300">
                ⋮
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2 text-sm`}
                      onClick={() => setEditingPost(post)}
                    >
                      <i className="fa-solid fa-pen"></i>Edit Post
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? "bg-gray-100" : ""
                      } w-full text-left px-4 py-2 text-sm text-red-600`}
                      onClick={() => {
                        if (
                          window.confirm("Are you sure you want to delete this post?")
                        ) {
                          deleteMutation.mutate(post._id);
                        }
                      }}
                    >
                     <i classN="fa-solid fa-trash"></i> Delete Post
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>

          {/* clickable body */}
          {clickable ? (
            <Link to={`/PostDeatils/${post?._id}`}>
              {post?.body && <h2 className="mb-4">{post?.body}</h2>}
              {post?.image && (
                <img src={post?.image} className="w-full rounded-md" alt={post?.body} />
              )}
            </Link>
          ) : (
            <>
              {post?.body && <h2 className="mb-4">{post?.body}</h2>}
              {post?.image && (
                <img src={post?.image} className="w-full rounded-md" alt={post?.body} />
              )}
            </>
          )}

          {post?.comments?.length > 0 && <Comment comment={post?.comments[0]} />}

          <div className="flex items-center justify-between mt-2">
            {clickable && (
              <Link
                to={`/PostDeatils/${post?._id}`}
                className="text-blue-600 text-sm hover:underline"
              >
                View all {post?.comments?.length} comments
              </Link>
            )}
            <CreateComment postId={post?._id} />
          </div>
        </div>
      ))}

      {/* Modal for Update */}
      {editingPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[1000]">
          <div className="bg-white rounded-lg p-6 w-[500px]">
            <h2 className="text-lg font-bold mb-4">Update Post</h2>
            <UpdatePost
              post={editingPost}
              onClose={() => setEditingPost(null)}
              onSuccess={() => {
                toast.success("Post updated successfully");
                queryClient.invalidateQueries(["userPosts", id]);
                setEditingPost(null);
              }}
            />
            <button
              onClick={() => setEditingPost(null)}
              className="mt-4 px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
