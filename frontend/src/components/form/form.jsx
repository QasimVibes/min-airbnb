import React, { useState } from "react";
import { Input, Error } from "../index";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Form({ Edit }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: Edit ? Edit.title : "",
      description: Edit ? Edit.description : "",
      location: Edit ? Edit.location : "",
      country: Edit ? Edit.country : "",
      price: Edit ? Edit.price : "",
      image: "",
    },
  });

  const onSubmit = (data) => {
    setLoading(true);
    setError("");
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("country", data.country);
    formData.append("price", data.price);
    formData.append("image", data.image[0]);

    if (Edit) {
      fetch(`http://localhost:3000/api/v1/listings/update/${Edit._id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      fetch("http://localhost:3000/api/v1/listings/create", {
        method: "POST",
        body: formData,
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.error("Error:", error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  if (error !== "") {
    return <Error />;
  }
  return (
    <div
      className="bg-white dark:bg-gray-900 p-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <form className="max-w-lg mx-auto">
        <Input
          text="Title"
          className="p-4"
          htmlFor={"title"}
          {...register("title", {
            required: { value: true, message: "Title is required" },
          })}
        />
        {errors.title && (
          <p className="text-red-500 mb-2">{errors.title.message}</p>
        )}
        <Input
          text="City"
          className="p-4"
          htmlFor={"city"}
          {...register("location", {
            required: { value: true, message: "City is required" },
          })}
        />

        {errors.location && (
          <p className="text-red-500 mb-2">{errors.location.message}</p>
        )}
        <Input
          text="Country"
          className="p-4"
          htmlFor={"country"}
          {...register("country", {
            required: { value: true, message: "Country is required" },
          })}
        />
        {errors.country && (
          <p className="text-red-500 mb-2">{errors.country.message}</p>
        )}
        <Input
          text="Price"
          className="p-2"
          type="number"
          htmlFor={"price"}
          {...register("price", {
            required: { value: true, message: "Price is required" },
            min: { value: 0, message: "Price cannot be negative" },
          })}
        />
        {errors.price && (
          <p className="text-red-500 mb-2">{errors.price.message}</p>
        )}
        <div className="mb-5">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Desciption
          </label>
          <textarea
            id="message"
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("description", {
              required: { value: true, message: "Description is required" },
            })}
          ></textarea>
        </div>
        {errors.description && (
          <p className="text-red-500 mb-2">{errors.description.message}</p>
        )}
        <div className="mb-5">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-30 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-3 h-3 mb-2 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or JPEG (MAX SIZE. 5Mb)
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                {...(Edit
                  ? { ...register("image") }
                  : {
                      ...register("image", {
                        required: { value: true, message: "Image is required" },
                      }),
                    })}
              />
            </label>
          </div>
          {errors.image && (
            <p className="text-red-500 my-2">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`py-2 px-4 text-white w-full ${
            Edit ? "bg-green-600" : "bg-blue-700"
          } ${
            Edit ? "hover:bg-green-700" : "hover:bg-blue-800"
          } focus:ring-4 focus:outline-none focus:ring-${
            Edit ? "green-300" : "blue-300"
          } font-medium rounded-lg text-sm me-2 dark:bg-${
            Edit ? "green-600" : "blue-600"
          } dark:hover:bg-${Edit ? "green-700" : "blue-700"} dark:focus:ring-${
            Edit ? "green-800" : "blue-800"
          } inline-flex items-center justify-center`}
        >
          {loading && (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentColor"
              />
            </svg>
          )}
          {Edit ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
}
