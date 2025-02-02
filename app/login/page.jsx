"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import {
  UserIcon,
  PhoneIcon,
  AtSymbolIcon,
  KeyIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Loader from "../Components/Loader";

export default function page() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignup, setShowSignup] = useState(true);
  const [signupError, setSignupError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [userData, setUserData] = useState(null);
  const router = useRouter();

  // Signup working correctly
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setSignupError("Please fill all fields correctly");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User signup successful: ", data);
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/book");
      } else {
        console.error("Error signing up: ", data.message);
      }
    } catch (error) {
      console.error("Error signing up: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setLoginError("Please fill all fields correctly");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("User login successful: ", data);
        setUserData(data);
        router.push("/book");
      } else {
        console.error("Error logging in: ", data.message);
      }
    } catch (error) {
      console.error("Error logging in: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-36 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar />
      <div className="w-full h-[90vh] gap-28 flex relative">
        <div className="w-[50%] h-full flex pt-40 justify-center">
          <p className="text-7xl font-bold italic -rotate-6">
            {showSignup ? "Sign up" : "Login"} to <br /> get started
          </p>
        </div>

        {/* Login form */}
        {!showSignup && (
          <form
            className="w-[30%] flex px-10 flex-col pt-10"
            //onSubmit={}
          >
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-semibold my-8 text-[#331A0B]">
                Login
              </p>
              <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg">
                <AtSymbolIcon
                  className="size-5 text-[#807f7f]"
                  strokeWidth="2"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                  //readOnly={inputReadOnly}
                />
              </div>
              <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg mb-1">
                <KeyIcon className="size-5 text-[#807f7f]" strokeWidth="2" />
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                  placeholder="Enter your password"
                />
                {showPassword ? (
                  <EyeIcon
                    className="size-6 cursor-pointer text-[#2aa1f1]"
                    strokeWidth="2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="size-6 cursor-pointer text-[#2aa1f1]"
                    strokeWidth="2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              <div>
                <button className="bg-red-500 text-sm w-full font-medium px-4 py-2 rounded-lg text-center text-white">
                  Login
                </button>
              </div>
              <div className="flex justify-center my-2">
                <p
                  className="text-xs text-[#1e81dd] font-medium cursor-pointer"
                  onClick={() => setShowSignup(true)}
                >
                  Don't have an account? Sign up
                </p>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center">
                <Loader height={24} width={24} />
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mt-8">
                <div className="w-20 h-[1px] bg-[#807f7f]"></div>
                <p className="text-xs text-[#807f7f]">or</p>
                <div className="w-20 h-[1px] bg-[#807f7f]"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-sm font-medium bg-[#c3c3c3] px-2 py-2 rounded-lg w-full">
                <GlobeAltIcon className="size-5" strokeWidth="2" />
                Continue with Google
              </div>
            </div>
          </form>
        )}

        {/* Sign up form */}
        {showSignup && (
          <form
            className="w-[30%] flex px-10 flex-col pt-7"
            //onSubmit={}
          >
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-semibold my-8 text-[#331A0B]">
                Sign up
              </p>
              <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg">
                <UserIcon className="size-5 text-[#807f7f]" strokeWidth="2" />
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                  //readOnly={inputReadOnly}
                />
              </div>
              <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg">
                <AtSymbolIcon
                  className="size-5 text-[#807f7f]"
                  strokeWidth="2"
                />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                  //readOnly={inputReadOnly}
                />
              </div>
              <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg">
                <KeyIcon className="size-5 text-[#807f7f]" strokeWidth="2" />
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                  placeholder="Enter your password"
                />
                {showPassword ? (
                  <EyeIcon
                    className="size-6 cursor-pointer text-[#2aa1f1]"
                    strokeWidth="2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <EyeSlashIcon
                    className="size-6 cursor-pointer text-[#2aa1f1]"
                    strokeWidth="2"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
              {signupError && (
                <p className="text-xs text-red-500 font-medium">
                  {signupError}
                </p>
              )}
              <div className="mt-2">
                <button
                  className="bg-red-500 text-sm w-full font-medium px-4 py-2 rounded-lg text-center text-white"
                  onClick={handleSignup}
                >
                  Sign up
                </button>
              </div>
              <div className="flex justify-center my-2">
                <p
                  className="text-xs text-[#1e81dd] font-medium cursor-pointer"
                  onClick={() => setShowSignup(false)}
                >
                  Already have an account? Login
                </p>
              </div>
            </div>
            {loading && (
              <div className="flex justify-center items-center">
                <Loader height={24} width={24} />
              </div>
            )}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 mt-8">
                <div className="w-20 h-[1px] bg-[#807f7f]"></div>
                <p className="text-xs text-[#807f7f]">or</p>
                <div className="w-20 h-[1px] bg-[#807f7f]"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-sm font-medium bg-[#c3c3c3] px-2 py-2 rounded-lg w-full">
                <GlobeAltIcon className="size-5" strokeWidth="2" />
                Continue with Google
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
