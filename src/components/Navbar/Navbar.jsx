import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CounterContext } from '../../Context/CounterContext';

export default function Navbar() {
  let { count } = useContext(CounterContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 shadow-md relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Social App <span className="text-blue-600">({count})</span>
          </span>
        </Link>

        {/* Right Section */}
        <div className="flex items-center md:order-2 space-x-3">
          
          {/* Profile Button */}
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
            >
              <img 
                className="w-8 h-8 rounded-full" 
                src="/docs/images/people/profile-picture-3.jpg" 
                alt="user"
              />
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg dark:bg-gray-700 z-50 animate-fadeIn">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                  <span className="block text-sm text-gray-900 dark:text-white">Bonnie Green</span>
                  <span className="block text-sm text-gray-500 truncate dark:text-gray-400">name@flowbite.com</span>
                </div>
                <ul className="py-2">
                  <li>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
                    >
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Auth Links */}
          <ul className="flex gap-4 text-gray-800 dark:text-gray-200 ml-6">
            <li>
              <Link to="/login" className="hover:text-blue-500 transition">Login</Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-blue-500 transition">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
