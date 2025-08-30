import React from "react";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="text-center">
        {/* Big 404 text */}
        <h1 className="text-7xl font-extrabold text-purple-600 mb-4">404</h1>

        {/* Error message */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-purple-600 text-white rounded-sm shadow-md hover:bg-purple-700 active:ring ring-amber-500 active:scale-[0.95] cursor-pointer transition duration-300"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
