import React from 'react';
import {Link, NavLink} from "react-router-dom"
const SignupForm = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-3">
            {/* Logo */}
            <svg className="w-8 h-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L3 21h9l-2-8 5-6 2 14h6L12 2z" />
            </svg>
            <h2 className="ml-2 font-bold text-lg text-gray-800">TailGrids</h2>
          </div>
          <p className="text-gray-500">
            Have an account?<Link to="/login"><a href="#" className="text-blue-600 hover:underline">Log in</a></Link> 
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-4">Sign up to TailGrids</h3>
        <p className="text-gray-500 mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

        <form>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700">
            Get Started
          </button>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-500">Sign Up with Social Account</p>
          <div className="flex justify-center mt-4 space-x-4">
            <button className="bg-gray-100 p-3 rounded-lg">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-6 h-6"/>
            </button>
            <button className="bg-gray-100 p-3 rounded-lg">
              <img src="https://img.icons8.com/ios-filled/50/000000/facebook-new.png" alt="Facebook" className="w-6 h-6"/>
            </button>
            <button className="bg-gray-100 p-3 rounded-lg">
              <img src="https://img.icons8.com/ios-filled/50/000000/twitter.png" alt="Twitter" className="w-6 h-6"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
