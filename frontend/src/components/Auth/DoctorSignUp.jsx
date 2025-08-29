import React, { useState } from "react";
import {
  Mail,
  KeyRound,
  Phone,
  User,
  MapPin,
  Building,
  Award,
  HeartPulse,
  CalendarDays,
} from "lucide-react";

const DoctorSignup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    specialization: "",
    experience: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="w-full  p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Doctor Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-lg">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block font-medium text-gray-700"
          >
            Full Name
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <User className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Dr. John Smith"
              required
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-1 block font-medium text-gray-700"
          >
            Email
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <Mail className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              required
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="mb-1 block font-medium text-gray-700"
          >
            Password
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <KeyRound className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="password"
              name="password"
              type="password"
              minLength={8}
              required
              placeholder="At least 8 characters"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label
            htmlFor="phone"
            className="mb-1 block font-medium text-gray-700"
          >
            Phone
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <Phone className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="123-456-7890"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
            />
          </div>
        </div>

        {/* Age & Experience */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="age"
              className="mb-1 block font-medium text-gray-700"
            >
              Age
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
              <CalendarDays className="w-6 h-6 mx-2 text-gray-500" />
              <input
                name="age"
                type="number"
                min={18}
                max={100}
                onChange={handleChange}
                required
                placeholder="35"
                className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="experience"
              className="mb-1 block font-medium text-gray-700"
            >
              Experience (yrs)
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
              <Award className="w-6 h-6 mx-2 text-gray-500" />
              <input
                name="experience"
                type="number"
                min={0}
                max={100}
                onChange={handleChange}
                placeholder="10"
                className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              />
            </div>
          </div>
        </div>

        {/* Specialization */}
        <div>
          <label
            htmlFor="specialization"
            className="mb-1 block font-medium text-gray-700"
          >
            Specialization
          </label>
          <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
            <HeartPulse className="w-6 h-6 mx-2 text-gray-500" />
            <input
              name="specialization"
              placeholder="Cardiology, Dermatology"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
            />
          </div>
        </div>

        {/* City & State */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="city"
              className="mb-1 block font-medium text-gray-700"
            >
              City
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
              <Building className="w-6 h-6 mx-2 text-gray-500" />
              <input
                name="city"
                type="text"
                onChange={handleChange}
                placeholder="Pune"
                className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="state"
              className="mb-1 block font-medium text-gray-700"
            >
              State
            </label>
            <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200 focus-within:ring-2 focus-within:ring-blue-500">
              <MapPin className="w-6 h-6 mx-2 text-gray-500" />
              <input
                name="state"
                type="text"
                onChange={handleChange}
                placeholder="Maharashtra"
                className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 transition focus:ring-4 focus:ring-blue-300"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default DoctorSignup;
