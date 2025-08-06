import React from "react";
import Doctor from "/IntroImage.png";
import { KeyRound, Mail, User } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-row bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <div className="mb-10">
            <h1 className="text-2xl font-bold">HealthScan AI</h1>
          </div>
          <div className="mb-5">
            <h1 className="text-xl font-bold">Hi There...</h1>
            <p className="text-sm">Welcome Back </p>
          </div>
          <form className="flex max-w flex-col gap-4 text-lg ">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block font-medium text-gray-700"
              >
                Your email
              </label>
              <div className="flex rounded-lg border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                <Mail className="w-8 h-8 my-auto text-gray-500 ml-2" />
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  required
                  className="w-full  focus:outline-none p-2.5  "
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password1"
                className="mb-2 block  font-medium text-gray-700"
              >
                Your password
              </label>
              <div className="flex rounded-lg border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                <KeyRound className="w-8 h-8 my-auto text-gray-500 ml-2" />
                <input
                  id="password1"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full p-2.5   focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block  font-medium text-gray-700"
              >
                Select your role
              </label>
              <div className="flex rounded-lg border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
                <User className="w-8 h-8 my-auto text-gray-500 ml-2 " />
                <select
                  id="role"
                  required
                  className="w-full  p-2.5   focus:outline-none  cursor-pointer"
                >
                  <option value="patient">Patient</option>
                  <option value="doctor">Doctor</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
            >
              Submit
            </button>
          </form>
          <div className="flex items-center justify-center mt-4">
            <p>Don't have an account?</p>
            <Link to="/signup" className="ml-2 text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>

        {/* Right: Image */}
        <div className="w-full max-md:hidden md:w-1/2">
          <img
            src={Doctor}
            alt="Doctor illustration"
            className="w-full h-full object-cover scale-105 "
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
