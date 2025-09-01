import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import UserPosts from '../UserPosts/UserPosts';
import ChangePassword from '../ChangePassword/ChangePassword';
import UploadProfilePhoto from '../UploadProfilePhoto/UploadProfilePhoto';
import CreatePost from '../CreatePost/CreatePost';

export default function Profile() {
  function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers: {
        token: localStorage.getItem("userToken")
      }
    });
  }

  let { data, isError, error, isLoading } = useQuery({
    queryKey: ["userData"],
    queryFn: getUserData,
  });

  const userData = data?.data?.user;

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
    <>
      {/* User Data */}
      <div className='w-full md:w-[80%] text-center mx-auto my-4 p-4 bg-gray-200 shadow-md rounded-md lg:w-[60%] bg-slate-100'>
        {userData?.photo ? (
          <img src={userData.photo} className='size-[50px] mx-auto rounded-full' alt="User" />
        ) : (
          <p>No photo available</p>
        )}
        <p><span className="font-bold">Name:</span> {userData?.name}</p>
        <p><span className="font-bold">Gender:</span> {userData?.gender}</p>
        <p><span className="font-bold">Email:</span> {userData?.email}</p>
        <p><span className="font-bold">Birthday:</span> {userData?.dateOfBirth}</p>
      </div>

      {/* Actions */}
      <div className='w-full text-center flex-col gap-3 items-center flex justify-center md:w-[80%] mx-auto my-4 p-4 bg-gray-900 shadow-md rounded-md lg:w-[60%] bg-slate-100'>
        <ChangePassword />
        <UploadProfilePhoto />
        <CreatePost />
      </div>

      {/* User Posts */}
      <UserPosts id={userData?._id} clickable />
    </>
  );
}
