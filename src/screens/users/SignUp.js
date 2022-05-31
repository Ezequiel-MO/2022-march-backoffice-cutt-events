import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Create <span className="text-white-100">your Account</span>
      </h1>
      <form className="my-10 bg-gray-50 rounded-lg px-10 py-5">
        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your name"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="email"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Register email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="password"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Register password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="confirmPassword"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Repeat your password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-100"
          />
        </div>
        <input
          type="submit"
          value="Start Session"
          className="my-5 text-white-100 bg-orange-50 w-full py-2 uppercase font-bold rounded hover:cursor-pointer hover:bg-white-100 hover:text-orange-50 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white-100 uppercase text-sm"
          to="/"
        >
          You have an account ? Login
        </Link>
        <Link
          className="block text-center text-white-100 my-5 uppercase text-sm"
          to="/forgot-password"
        >
          Forgot your password ?
        </Link>
      </nav>
    </>
  );
};

export default SignUp;
