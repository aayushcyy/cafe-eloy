"use client";

import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { UserIcon, PhoneIcon } from "@heroicons/react/24/outline";
import blob2 from "../../public/blob2.svg";
import Image from "next/image";

export default function page() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [OTP, setOTP] = useState("");
  const [showOTPSec, setShowOTPSec] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [inputReadOnly, setInputReadOnly] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !phone) return null;
    if (phone.length < 10 || phone.length > 10) {
      setPhoneError(true);
    } else {
      alert("submit successful");
      setPhoneError(false);
      setShowOTPSec(true);
      setInputReadOnly(true);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-36 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar />
      <div className="w-full h-[90vh] gap-28 flex relative">
        <div className="w-[50%] h-full flex pt-40 justify-center">
          <p className="text-7xl font-bold italic -rotate-6">
            Sign up to <br /> get started
          </p>
        </div>
        <form
          className="w-[30%] flex px-10 flex-col pt-20"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-semibold my-8 text-[#331A0B]">
              Sign Up
            </p>
            <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg">
              <UserIcon className="size-5 text-[#807f7f]" strokeWidth="2" />
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                readOnly={inputReadOnly}
              />
            </div>
            <div className="flex items-center bg-[#ffffff8a] px-2 py-1 rounded-lg mb-4">
              <PhoneIcon className="size-5 text-[#807f7f]" strokeWidth="2" />
              <input
                type="tel"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-black py-2 px-2 w-full rounded-sm bg-transparent outline-none font-medium text-sm"
                placeholder="Enter your phone"
                readOnly={inputReadOnly}
              />
            </div>
            {phoneError && (
              <p className="text-xs text-red-500 w-full text-start">
                Please enter a correct detail
              </p>
            )}
            {!showOTPSec && (
              <div className="w-full flex">
                <button
                  className="bg-red-500 text-sm w-full font-medium px-4 py-2 rounded-lg text-center text-white"
                  type="submit"
                >
                  Get OTP
                </button>
              </div>
            )}
            {/* otp entering section */}
            {showOTPSec && (
              <div className="flex flex-col gap-3 w-full">
                <p className="text-xs font-medium">
                  Enter the OTP send on your number
                </p>
                <div className="flex gap-20 items-center">
                  <input
                    type="text"
                    value={OTP}
                    onChange={(e) => setOTP(e.target.value)}
                    className="w-24 text-black outline-none px-2 py-1 rounded-md"
                    placeholder="OTP"
                  />
                  <p className="text-xs font-medium underline cursor-pointer text-blue-500">
                    Resend OTP
                  </p>
                </div>
                <div className="w-full justify-center flex mt-2">
                  <button className="bg-red-500 text-sm font-medium px-4 py-2 rounded-lg text-center text-white">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
