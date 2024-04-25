import React from "react";
import { Link } from "react-router-dom";

export default function Logo({className="mb-6"}) {
  return (
    <>
      <Link
        to={"/"}
        className={`${className} flex items-center  text-2xl font-semibold text-gray-900 dark:text-white`}
      >
        <img
          className="w-10 h-10 mr-2"
          src="/logo.png"
          alt="logo"
        />
        mini airbnb
      </Link>
    </>
  );
}
