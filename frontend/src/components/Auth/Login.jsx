import React from "react";
import Doctor from "/image.png";
import { KeyRound, Mail, User } from "lucide-react";

const Login = () => {
  return (
    <div className="flex h-[95vh] w-full border border-gray-300 overflow-hidden object-contain rounded-xl p-2">
      <div className="flex-col items-center justify-center mx-auto sm:w-1/2 p-6 mr-2 rounded-lg w-full h-full border border-gray-300  " >
        <div className="mb-14">
          <h1 className="text-2xl font-bold">HealthScan AI</h1>
        </div>
        <div className="mb-3">
          <h1 className="text-xl font-bold">Hi There...</h1>
          <p className="text-sm">Get Started </p>
        </div>
        <form className="flex max-w-md flex-col gap-4  text-lg ">
          <div>
            <label
              htmlFor="email"
              className="mb-2 block font-medium text-gray-700"
            >
              Your email
            </label>
            <div className="flex rounded-xl border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex rounded-xl border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
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
            <div className="flex rounded-xl border border-gray-300 bg-gray-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500">
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
            className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300"
          >
            Submit
          </button>
        </form>
      </div>
      <img src={Doctor} alt="" className="h-full w-1/2 max-sm:hidden object-cover rounded-lg" />
    </div>
  );
};

export default Login;
