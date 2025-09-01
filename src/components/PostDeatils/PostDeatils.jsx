import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Comment from '../comment/comment';

const PostDetails = () => {
  let { id } = useParams();
  console.log("Post ID from params =>", id);

  function getSinglePost() {
    return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("userToken"),
      },
    });
  }

  let { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["getPostDetails", id],
    queryFn: getSinglePost,
    select: (res) => res?.data?.post   
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

  return (
    <div key={data?._id} className='w-full md:w-[80%] mx-auto my-4 p-4 bg-gray-200 shadow-md rounded-md lg:w-[60%] bg-slate-100'>
      <div className='flex items-center justify-between mb-4'>
        <div className='flex items-center gap-2 mb-4'>
          <img src={data?.user?.photo} className='size-[36px]' alt="" />
          <p className='ml-2 font-bold'>{data?.user?.name}</p>
        </div>
        <div className='text-xsm text-slate-500'>{data?.createdAt}</div>
      </div>

      {data?.content && <h2 className='mb-4'>{data.content}</h2>}
      {data?.image && <img src={data.image} className='w-full rounded-md' alt={data.content} />}

      {data?.comments?.map((comment) => (
        <Comment key={comment._id} comment={comment} refreshComments={refetch} />
      ))}
    </div>
  );
};

export default PostDetails;
