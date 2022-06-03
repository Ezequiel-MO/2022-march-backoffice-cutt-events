import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import baseAPI from "../../axios/axiosConfig";

import { toastOptions } from "../../dev-data/toast";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email, password, passwordConfirm].includes("")) {
      toast.error("Please fill all the fields", toastOptions);
      return;
    }
    if (password !== passwordConfirm) {
      toast.error("Passwords do not match", toastOptions);
      return;
    }

    if (password.length < 8 || passwordConfirm.length < 8) {
      toast.error(
        "Password must be between at least 8 characters",
        toastOptions
      );
      return;
    }

    try {
      const response = await baseAPI.post(`v1/users/signup`, {
        name,
        email,
        password,
        passwordConfirm,
      });
      console.log("response", response);
      toast.success("User created", toastOptions);
      setName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
    } catch (error) {
      toast.warn(error.data.message ?? "not able to sign up", toastOptions);
    }
  };

  return (
    <>
      <h1 className="font-black text-4xl capitalize">
        Create <span className="text-white-100">your Account</span>
      </h1>
      <form
        className="my-10 bg-gray-50 rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
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
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
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
