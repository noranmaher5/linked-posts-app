import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const userPhoto = localStorage.getItem("userPhoto");


  function handleSignOut() {
    setUserLogin(null);
    localStorage.removeItem("userToken");
    navigate("/login");
  }


    function getUserData() {
    return axios.get(`https://linked-posts.routemisr.com/users/profile-data`, {
      headers :{
token : localStorage.getItem("userToken")
      } 
    });
  }


let {data , isError ,  error , isLoading } = useQuery({
    queryKey:["userData"],
    queryFn:getUserData,
  });

const userData = data?.data?.user; 

  return (
    <nav className="bg-blue-900 border-b border-gray-200 dark:bg-gray-900 shadow-md relative z-50">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white dark:text-gray-200">
          Social App
        </Link>

        <div className="flex items-center gap-6">
          {userLogin ? (
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
              >
               <img
  src={userData?.photo || "/default-avatar.png"}
  alt="Profile"
  className="w-full h-full object-cover"
/>

              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-md border border-gray-200 bg-white shadow-xl dark:bg-gray-800 dark:border-gray-700">
                  <div className="px-4 py-2 border-b text-sm dark:text-white">
                    Welcome, {userData?.name}
                  </div>
                  <ul>
                    <li>
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <span
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200 cursor-pointer"
                      >
                        Sign out
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <ul className="flex gap-4 text-gray-700 dark:text-gray-200">
             <li>
  <Link to="/login" className="text-white">Login</Link>
</li>
<li>
  <Link to="/register" className="text-white">Register</Link>
</li>

            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}
