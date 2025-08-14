import React from 'react';
import style from "./Register.module.css";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Register() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const schema = z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters long")
      .max(10, "Name must be at most 10 characters long"),
    email: z.string()
      .email("Invalid email format"),
    password: z.string()
      .regex(
        /^(?=.*[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),
    rePassword: z.string(),
    dateOfBirth: z.string()
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)")
      .refine((date) => {
        const userDate = new Date(date);
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        return userDate < now;
      }, "Date of birth must be in the past"),
    gender: z.enum(["male", "female"], {
      message: "Gender must be either 'male' or 'female'"
    }),
  }).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
    },
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, formState: { errors } } = form;

  function handleRegister(data) {

    setIsLoading(true);




    axios.post('https://linked-posts.routemisr.com/users/signup', data)
      .then((response) => {
        if (response.data.message === "success") {
          setIsLoading(false);
          navigate('/login');
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

    <form onSubmit={handleSubmit(handleRegister)} className="max-w-md mx-auto my-12">


      {apiError && <h1 className='text-center bg-red-100 p-2 my-4 font-bold rounded-md'>{apiError}</h1>
      }


      {/* Name */}

      <div className="relative z-0 w-full mb-5 group">
        <input type="text" {...register("name")} id="name"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="name"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3">
          Enter your name
        </label>
        {errors.name && <p className={errorMessageClass}>{errors.name.message}</p>}
      </div>

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

      {/* Re-Password */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="password" {...register("rePassword")} id="rePassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="rePassword"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3">
          Confirm your password
        </label>
        {errors.rePassword && <p className={errorMessageClass}>{errors.rePassword.message}</p>}
      </div>

      {/* Date of Birth */}
      <div className="relative z-0 w-full mb-5 group">
        <input type="date" {...register("dateOfBirth")} id="dateOfBirth"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " />
        <label htmlFor="dateOfBirth"
          className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3">
          Enter your birthday
        </label>
        {errors.dateOfBirth && <p className={errorMessageClass}>{errors.dateOfBirth.message}</p>}
      </div>

      {/* Gender */}
      <div className="flex my-3">
        <div className="flex items-center me-4">
          <input id="male" type="radio" value="male" {...register("gender")}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-2" />
          <label htmlFor="male" className="ms-2 text-sm font-medium text-gray-900">Male</label>
        </div>
        <div className="flex items-center me-4">
          <input id="female" type="radio" value="female" {...register("gender")}
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-2" />
          <label htmlFor="female" className="ms-2 text-sm font-medium text-gray-900">Female</label>
        </div>
      </div>
      {errors.gender && <p className={errorMessageClass}>{errors.gender.message}</p>}

      <button 
      disabled={isLoading}
      type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5">
        {isLoading ? <i className=' fas fa-spinner fa-spin'></i> : "Submit"}
      </button>
    </form>
  );
}
