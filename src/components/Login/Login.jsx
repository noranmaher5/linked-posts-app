import React, { useContext } from 'react';
import style from "./Login.module.css";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserContext } from '../../Context/UserContext';


export default function Login() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let {userLogin, setUserLogin} = useContext(UserContext);


  const schema = z.object({
   
    email: z.string()
      .email("Invalid email format"),
    password: z.string()
      .regex(
        /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    
   
  });

  const form = useForm({
    defaultValues: {
    
      email: "",
      password: "",
     
      
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState: { errors } } = form;

  function handleLogin(data) {

    setIsLoading(true);




    axios.post('https://linked-posts.routemisr.com/users/signin', data)
      .then((response) => {
        if (response.data.message === "success") {
          setIsLoading(false);
          
          console.log(response);
         localStorage.setItem("userToken", response.data.token);
console.log("Saved Token:", response.data.token);
setUserLogin(response.data.token);
navigate('/');


     

        }
      })
      .catch((error) => {
        setIsLoading(false);
        setApiError(error.response.data.error)
      });
  }

  const errorMessageClass =
    "mt-2 text-sm text-red-600 bg-red-100 border border-red-300 px-3 py-1 rounded-md animate-fadeIn";

  return (

    <form onSubmit={handleSubmit(handleLogin)} className="max-w-md mx-auto my-12">


      {apiError && <h1 className='text-center bg-red-100 p-2 my-4 font-bold rounded-md'>{apiError}</h1>
      }


    

      {/* Email */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="email" {...register("email")} id="email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3">
          Enter your email
        </label>
        {errors.email && <p className={errorMessageClass}>{errors.email.message}</p>}
      </div>

      {/* Password */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" {...register("password")} id="password"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="password"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3">
          Enter your password
        </label>
        {errors.password && <p className={errorMessageClass}>{errors.password.message}</p>}
      </div>

     

      

    
    

      <button 
      disabled={isLoading}
      type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
        {isLoading ? <i className=' fas fa-spinner fa-spin'></i> :("Login") }
      </button>
    </form>
  );
}
