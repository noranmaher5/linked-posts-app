import React from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import Comment from '../comment/comment';
import { Link } from 'react-router-dom';
import CreateComment from '../CreateComment/CreateComment';
import CreatePost from '../CreatePost/CreatePost';

export default function Home() {
  function getAllPosts() {
    return axios.get("https://linked-posts.routemisr.com/posts?limit=50", {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["getPosts"],
    queryFn: getAllPosts,
  });

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="cube1"></div>
        <div className="cube2"></div>
      </div>
    );
  }

  if (isError) {
    return <h3 className="text-center text-red-600 mt-8">{error.message}</h3>;
  }

  const postsArr = data?.data?.posts || [];

  return (
    <>
    <CreatePost />
      {postsArr.map((post) => (
        <div
          key={post._id}
          className="w-full md:w-[80%] mx-auto my-4 p-4 bg-gray-200 shadow-md rounded-md lg:w-[60%] bg-slate-100"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 mb-4">
              <img src={post.user.photo} className="size-[36px] rounded-full" alt={post.user.name} />
              <p className="ml-2 font-bold">{post.user.name}</p>
            </div>
            <div className=" text-xsm text-slate-500">{post.createdAt}</div>
          </div>

          <Link to={`/PostDeatils/${post._id}`}>
            {post.body && <h2 className="mb-4 ">{post.body}</h2>}
          {post.image && (
  <div className="flex justify-center items-center  rounded-md">
    <img src={post.image} className="w-100 rounded-md" alt={post.body} />
  </div>
)}

          </Link>

{post.comments?.length > 0 && <Comment comment={post.comments[0]} />}

<div className="flex items-center justify-between mt-2">
  <Link
    to={`/PostDeatils/${post._id}`}
    className="text-blue-600 text-sm hover:underline"
  >
    View all {post.comments?.length} comments
  </Link>

  <CreateComment postId={post._id} />
</div>

        </div>
      ))}
    </>
  );
}
