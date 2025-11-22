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
  Eye,
  EyeOff,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { registerDoctor } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DoctorSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    specialization: "",
    experience: "",
    city: "",
    state: "",
  });
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fd = new FormData();

      fd.append("name", formData.name);
      fd.append("email", formData.email);
      fd.append("password", formData.password);
      fd.append("phone", formData.phone);
      fd.append("age", formData.age);
      fd.append("experience", formData.experience);
      fd.append("gender", formData.gender);

      fd.append("specialization", formData.specialization);

      fd.append(
        "location",
        JSON.stringify({
          city: formData.city,
          state: formData.state,
        })
      );

      if (file) {
        fd.append("profile", file);
      }

      // fd.forEach((value, key) => {
      //   console.log(key, value);
      // });
      // return;

      const res = await dispatch(registerDoctor(fd));

      if (res.payload && res.payload.success) {
        toast.success("Doctor registered successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        navigate("/login");
      } else {
        toast.error(res.payload?.message || "Doctor registration failed!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        console.error("Registration failed:", res.payload);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full  p-8 rounded-lg">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Doctor Sign Up
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 text-lg">
        {/* Profile */}
        <div>
          <label
            htmlFor="profile"
            className="mb-1 block font-medium text-gray-700"
          >
            Profile Picture
          </label>
          <div className="flex justify-center">
            <label
              htmlFor="profile"
              className="relative w-36 h-36 rounded-full overflow-hidden cursor-pointer border-2 bg-gray-200 border-gray-300 hover:border-blue-500 transition"
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex  flex-col items-center justify-center text-gray-500">
                  <span className="text-center px-4">Click to upload</span>
                </div>
              )}
              <input
                id="profile"
                name="profile"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                required
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="mb-1 block font-medium text-gray-700"
          >
            Full Name
          </label>
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <User className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              placeholder="Dr. John Smith"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              required
            />
          </div>
        </div>

        {/* Gender */}
        <div>
          <label
            htmlFor="Gender"
            className="mb-1 block font-medium text-gray-700"
          >
            Gender
          </label>
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <User className="w-6 h-6 mx-2 text-gray-500" />
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={`w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl ${
                formData.gender ? "text-black" : "text-gray-500"
              }`}
              required
            >
              <option value="" className="">
                Select Gender
              </option>
              <option value="Male" className="active:text-black">
                Male
              </option>
              <option value="Female">Female</option>
              <option value="Others">Other</option>
            </select>
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
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <Mail className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              required
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
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <KeyRound className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              minLength={8}
              placeholder="At least 8 characters"
              onChange={handleChange}
              className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="mr-3 text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
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
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <Phone className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
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
            <div
              className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
            focus-within:ring-2 focus-within:ring-blue-500"
            >
              <CalendarDays className="w-6 h-6 mx-2 text-gray-500" />
              <input
                id="age"
                name="age"
                type="number"
                min={18}
                max={100}
                value={formData.age}
                onChange={handleChange}
                placeholder="35"
                className="w-full bg-gray-200 p-2.5 focus:outline-none rounded-r-xl"
                required
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
            <div
              className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
            focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Award className="w-6 h-6 mx-2 text-gray-500" />
              <input
                id="experience"
                name="experience"
                type="number"
                min={0}
                max={100}
                value={formData.experience}
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
          <div
            className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
          focus-within:ring-2 focus-within:ring-blue-500"
          >
            <HeartPulse className="w-6 h-6 mx-2 text-gray-500" />
            <input
              id="specialization"
              name="specialization"
              type="text"
              value={formData.specialization}
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
            <div
              className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
            focus-within:ring-2 focus-within:ring-blue-500"
            >
              <Building className="w-6 h-6 mx-2 text-gray-500" />
              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
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
            <div
              className="flex items-center rounded-xl border border-gray-300 bg-gray-200 
            focus-within:ring-2 focus-within:ring-blue-500"
            >
              <MapPin className="w-6 h-6 mx-2 text-gray-500" />
              <input
                id="state"
                name="state"
                type="text"
                value={formData.state}
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
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 px-5 py-2.5 text-white hover:bg-blue-700 
          transition focus:ring-4 focus:ring-blue-300 cursor-pointer"
        >
          {loading ? "Registering..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default DoctorSignup;
