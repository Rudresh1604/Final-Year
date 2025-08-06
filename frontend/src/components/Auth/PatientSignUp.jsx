import React, { useState } from "react";
import {
  Mail,
  KeyRound,
  Phone,
  User,
  MapPin,
  Droplet,
  CalendarDays,
  Home,
  Globe,
  Landmark,
  ListChecks,
  Mars,
} from "lucide-react";
import PatientImage from "/IntroImage.png";

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in formData.address) {
      setFormData({
        ...formData,
        address: { ...formData.address, [name]: value },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-5xl">
        {/* Left: Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
            Patient Sign Up
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-lg">
            {/* Full Name */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Full Name
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                <User className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  onChange={handleChange}
                  className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                <Mail className="w-5 h-5 text-gray-500 mx-2" />
                <input
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
              <label className="block mb-1 font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                <KeyRound className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  name="password"
                  type="password"
                  placeholder="At least 8 characters"
                  required
                  minLength={8}
                  onChange={handleChange}
                  className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Phone
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                <Phone className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  name="phone"
                  type="tel"
                  placeholder="123-456-7890"
                  onChange={handleChange}
                  className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                />
              </div>
            </div>

            {/* Age, Gender, Blood Group */}
            <div className="grid grid-cols-3 gap-4">
              {/* Age */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Age
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <CalendarDays className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="age"
                    type="number"
                    placeholder="25"
                    min={0}
                    max={120}
                    required
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Gender
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <Mars className="w-5 h-5 text-gray-500 mx-2" />
                  <select
                    name="gender"
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl cursor-pointer"
                  >
                    <option value="">Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              {/* Blood Group */}
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Blood Group
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <Droplet className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="bloodGroup"
                    type="text"
                    placeholder="O+, AB-"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                  />
                </div>
              </div>
            </div>

            {/* Address - Street */}
            <div>
              <label className="block mb-1 font-medium text-gray-700">
                Street
              </label>
              <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                <Home className="w-5 h-5 text-gray-500 mx-2" />
                <input
                  name="street"
                  type="text"
                  placeholder="123 Main Street"
                  onChange={handleChange}
                  className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                />
              </div>
            </div>

            {/* City and State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  City
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <Landmark className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="city"
                    type="text"
                    placeholder="Pune"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  State
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <MapPin className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="state"
                    type="text"
                    placeholder="Maharashtra"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                  />
                </div>
              </div>
            </div>

            {/* Pincode and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Pincode
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <ListChecks className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="pincode"
                    type="text"
                    placeholder="411001"
                    onChange={handleChange}
                    className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-700">
                  Country
                </label>
                <div className="flex items-center rounded-xl border border-gray-300 bg-gray-200">
                  <Globe className="w-5 h-5 text-gray-500 mx-2" />
                  <input
                    name="country"
                    type="text"
                    placeholder="India"
                    onChange={handleChange}
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

        {/* Right: Image */}
        <div className="hidden md:block w-full md:w-1/2">
          <img
            src={PatientImage}
            alt="Patient illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default PatientSignUp;
