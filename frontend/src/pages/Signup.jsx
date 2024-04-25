import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Error, FormInput, Logo } from "../components";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "http://localhost:3000/api/v1/users/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: data.userName,
            email: data.email,
            password: data.password,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const loginResponse = await fetch(
        "http://localhost:3000/api/v1/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          credentials: "include",
        }
      );

      if (!loginResponse.ok) {
        throw new Error("Network response was not ok");
      }
      const loginuser = await loginResponse.json();
      dispatch(login(loginuser.data.user));
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (error !== "") {
    return <Error />;
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-9 mx-auto md:h-screen lg:py-0">
          <Logo />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormInput
                  label="User name"
                  placeholder="Name"
                  type="text"
                  name="name"
                  {...register("userName", {
                    required: { value: true, message: "Name is required" },
                  })}
                />
                {errors.userName && (
                  <p className="text-red-500">{errors.userName.message}</p>
                )}
                <FormInput
                  label="Your email"
                  placeholder="name@company.com"
                  type="email"
                  name="email"
                  {...register("email", {
                    required: { value: true, message: "Email is required" },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <FormInput
                  label="Password"
                  placeholder="••••••••"
                  type="password"
                  name="password"
                  {...register("password", {
                    required: { value: true, message: "Password is required" },
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
                <Button text="Create an account" loading={loading} />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
