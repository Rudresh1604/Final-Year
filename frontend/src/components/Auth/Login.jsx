import React from "react";
import Doctor from "/image.png";

const Login = () => {
  return (
    <div className="flex items-center justify-between w-full h-screen">
      <div className="flex-col items-center justify-center sm:w-1/2 w-full h-full">
        <div className="mb-3">
          <h1 className="text-xl font-bold">Hi There...</h1>
          <p className="text-sm">Get Started </p>
        </div>
        <form className="flex max-w-md flex-col gap-4 mx-auto p-6 text-lg ">
          <div>
            <label
              htmlFor="email1"
              className="mb-2 block font-medium text-gray-700"
            >
              Your email
            </label>
            <input
              id="email1"
              type="email"
              placeholder="name@example.com"
              required
              className="w-full rounded-lg border border-gray-300 bg-gray-100 focus:outline-none p-2.5  focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="password1"
              className="mb-2 block  font-medium text-gray-700"
            >
              Your password
            </label>
            <input
              id="password1"
              type="password"
              required
              placeholder="Enter your password"
              className="w-full rounded-lg border border-gray-300 p-2.5  focus:border-blue-500 bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="mb-2 block  font-medium text-gray-700"
            >
              Select your role
            </label>
            <select
              id="role"
              required
              className="w-full rounded-lg border border-gray-300 p-2.5  text-gray-700 focus:outline-none focus:border-blue-500 bg-gray-100 focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
      <img src={Doctor} alt="" className="h-screen w-1/2 max-sm:hidden" />
    </div>
  );
};

export default Login;
