import React, { forwardRef } from "react";

function Input({
  type = "text",
  placeholder,
  value,
  className = "",
  htmlFor,
    text,
  ...props
}, ref) {
  return (
    <>
      <div className="mb-5">
        <label
          htmlFor={htmlFor}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
        >
          {text}
        </label>
        <input
        value={value}
          type={type}
          id={htmlFor}
          className={`block w-full text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
          {...props}
          ref={ref}
        />
      </div>
    </>
  );
}

export default forwardRef(Input);