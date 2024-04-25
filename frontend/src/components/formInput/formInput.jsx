import React, { forwardRef } from "react";

 function FormInput({
  label,
  type,
  placeholder,
  name,
  className = "",
  ...props
}, ref) {
  return (
    <>
      <div>
        <label
          htmlFor={name}
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          id={name}
          className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
      </div>
    </>
  );
}

export default forwardRef(FormInput);
