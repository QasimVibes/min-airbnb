import React from "react";
import { Link } from "react-router-dom";

export default function DataNotFound() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800">
      <div className="h-screen flex flex-col justify-center items-center">
        <p className="text-4xl font-medium text-gray-800 dark:text-white">
          Data Not Found
        </p>
        <Link to={"/"} className="mt-4 text-xl text-blue-600 hover:underline">
          Go back home
        </Link>
      </div>
    </div>
  );
}
