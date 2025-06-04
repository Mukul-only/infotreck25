import React, { useState } from "react";
import Header from "../components/Header"; // Assuming this path is correct
import Wrapper from "../util/Wrapper"; // Assuming this path is correct
import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiLogIn } from "react-icons/fi"; // Import icons
import { IoPersonAddOutline } from "react-icons/io5";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the field being typed into
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email Address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }

    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm Password is required.";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with submission (e.g., API call)
      console.log("Form submitted successfully:", formData);
      // Reset form or redirect
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      setErrors({});
      alert("Account created successfully! (Simulated)");
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-white bg-background">
      <Header />
      <Wrapper className="flex items-center justify-center flex-grow py-12">
        <div className="w-full max-w-md p-8 border border-bdr sm:w-md bg-neutral-800 sm:p-10 rounded-xl">
          <h1 className="mb-8 text-3xl font-bold text-center text-white sm:text-4xl">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="name"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiUser className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2.5 bg-neutral-700 border rounded-md text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.name ? "border-red-500" : "border-neutral-600"
                  }`}
                  placeholder="Your Name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiMail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2.5 bg-neutral-700 border rounded-md text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.email ? "border-red-500" : "border-neutral-600"
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2.5 bg-neutral-700 border rounded-md text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.password ? "border-red-500" : "border-neutral-600"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mb-1 text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FiLock className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className={`w-full pl-10 pr-4 py-2.5 bg-neutral-700 border rounded-md text-white placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-neutral-600"
                  }`}
                  placeholder="••••••••"
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-full px-4 py-3 font-semibold text-white transition-colors duration-200 bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
            >
              Sign Up
              <IoPersonAddOutline className="w-5 h-5 ml-2" />
            </button>

            <p className="text-sm text-center text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-indigo-400 hover:text-indigo-300"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Wrapper>
    </div>
  );
};

export default SignupPage;
