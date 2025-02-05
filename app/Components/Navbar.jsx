"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  ArrowLeftIcon,
  ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";
import { getCookie, deleteCookie } from "cookies-next";
import useStore from "../store/store";

export default function Navbar({ showBook = true }) {
  //hover animation hooks
  const [animateHover, setAnimateHover] = useState(false);
  const [animateHover2, setAnimateHover2] = useState(false);
  const [animateHover3, setAnimateHover3] = useState(false);
  const [animateHover4, setAnimateHover4] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const profileDivRef = useRef(null);

  //accessing zustand method
  const { isLoggedIn } = useStore();

  //extracting path name
  const pathName = usePathname();

  // Use useEffect to fetch cookie data and set user data (Prevents re-renders)
  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setUserData(JSON.parse(user));
    }
  }, [isLoggedIn]);

  //Signout function
  const handleSignOut = () => {
    deleteCookie("user");
    setUserData(null);
    window.location.reload();
  };

  //closing the profile if clicked outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDivRef.current && !profileDivRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full flex justify-between items-center py-3 text-base font-montserrat font-medium text-[#331A0B]">
      <div className="relative w-28">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
      </div>
      {!pathName.includes("login") && (
        <div className="flex justify-between items-center gap-56">
          <div className="flex gap-14">
            <div
              className="flex flex-col group relative"
              onMouseEnter={() => setAnimateHover(true)}
              onMouseLeave={() => setAnimateHover(false)}
            >
              <Link href={"/menu"}>Menu</Link>
              <motion.div
                initial={{ width: 0, originX: 0 }}
                animate={
                  animateHover ? { width: "100%", originX: 1 } : { width: 0 }
                }
                className="bg-[#331A0B] h-[1px] w-full -mt-[2px]"
              ></motion.div>
            </div>
            <div
              className="flex flex-col group relative"
              onMouseEnter={() => setAnimateHover2(true)}
              onMouseLeave={() => setAnimateHover2(false)}
            >
              <Link href="/about">About Us</Link>
              <motion.div
                initial={{ width: 0, originX: 0 }}
                animate={
                  animateHover2 ? { width: "100%", originX: 1 } : { width: 0 }
                }
                className="bg-[#331A0B] h-[1px] w-full -mt-[2px]"
              ></motion.div>
            </div>
            <div
              className="flex flex-col group relative"
              onMouseEnter={() => setAnimateHover3(true)}
              onMouseLeave={() => setAnimateHover3(false)}
            >
              <Link href="/feedback">Feedback</Link>
              <motion.div
                initial={{ width: 0, originX: 0 }}
                animate={
                  animateHover3 ? { width: "100%", originX: 1 } : { width: 0 }
                }
                className="bg-[#331A0B] h-[1px] w-full -mt-[2px]"
              ></motion.div>
            </div>
          </div>
          <div className="flex items-center gap-10">
            {pathName.includes("menu") && (
              <div className="cursor-pointer relative">
                <div className="w-[6px] h-[6px] rounded-full bg-primaryRed z-20 absolute right-[2px] -top-[2px]"></div>
                <ShoppingBagIcon className="size-5 stroke-1.5" />
              </div>
            )}
            {showBook && !userData && (
              <div
                className="flex flex-col group relative"
                onMouseEnter={() => setAnimateHover4(true)}
                onMouseLeave={() => setAnimateHover4(false)}
              >
                <Link href="/login">Sign Up</Link>
                <motion.div
                  initial={{ width: 0, originX: 0 }}
                  animate={
                    animateHover4 ? { width: "100%", originX: 1 } : { width: 0 }
                  }
                  className="bg-[#331A0B] h-[1px] w-full -mt-[2px]"
                ></motion.div>
              </div>
            )}
            {!showBook && !userData ? (
              <Link href={"/login"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#D21C27] py-2.5 px-4 text-sm rounded-full text-white cursor-pointer"
                >
                  Sign up
                </motion.div>
              </Link>
            ) : (
              <Link href={"/book"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#D21C27] py-2.5 px-4 text-sm rounded-full text-white cursor-pointer"
                >
                  Book Now!
                </motion.div>
              </Link>
            )}
            {userData && (
              <div>
                <UserCircleIcon
                  className="size-9 cursor-pointer stroke-1.5"
                  onClick={() => setOpenProfile(!openProfile)}
                />
              </div>
            )}
          </div>
        </div>
      )}
      {/* Profile Div */}
      {openProfile && (
        <div className="bg-[#908f8f7e] w-full h-screen absolute left-0 top-0 z-[25]">
          <motion.div
            initial={{ opacity: 0, right: -200 }}
            animate={{ opacity: 1, right: 0, duration: 0.5, ease: "circInOut" }}
            className="bg-[white] h-screen w-[27%] right-0 absolute px-4 py-4 flex flex-col gap-5"
          >
            <div ref={profileDivRef}>
              {/* Back Button */}
              <div>
                <div
                  className="w-8 h-7 items-center justify-start cursor-pointer flex"
                  onClick={() => setOpenProfile(false)}
                >
                  <ArrowLeftIcon className="size-6 stroke-2" />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {/* User Details */}
                <div className="flex gap-4 py-2">
                  <div className="w-14 h-14 flex items-center justify-center text-xl bg-red-400 rounded-[100%]">
                    AC
                  </div>
                  <div className="flex flex-col">
                    <p className="text-2xl">{userData.name || "User"}</p>
                    <p className="text-[#000000a7]">{userData.email || ""}</p>
                  </div>
                </div>
                {/* Upcoming Bookings */}
                <div className="flex flex-col gap-1 rounded-md">
                  <p>Upcoming bookings</p>
                  <div className="flex flex-col gap-2 bg-[#247332] px-2 py-2 rounded-md">
                    <div className="flex justify-between px-3 py-1 text-sm rounded-md bg-white">
                      <div className="">
                        <p>Date: 3 Feb 25</p>
                        <p>Branch: Samta Colony, Raipur</p>
                      </div>
                      <div>
                        <p>Slot: 3PM - 4PM</p>
                      </div>
                    </div>
                    <div className="flex justify-between text-sm px-3 py-1 rounded-md bg-white">
                      <div>
                        <p>Date: 3 Feb 25</p>
                        <p>Branch: Samta Colony, Raipur</p>
                      </div>
                      <div>
                        <p>Slot: 3PM - 4PM</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Booking History Section */}
                <div className="flex flex-col gap-1">
                  <p>Booking History</p>
                  <div className="flex flex-col gap-2 bg-[#a5a5a5] px-2 py-2 text-sm rounded-md">
                    <div className="flex justify-between px-3 py-1 rounded-md bg-white">
                      <div>
                        <p>Date: 22 Jan 25</p>
                        <p>Branch: Samta Colony, Raipur</p>
                      </div>
                      <div>
                        <p>Slot: 2PM - 3PM</p>
                        <p>Paid: Rs.200</p>
                      </div>
                    </div>
                    <div className="flex justify-between px-3 py-1 rounded-md bg-white">
                      <div>
                        <p>Date: 3 Feb 25</p>
                        <p>Branch: Jagganath Chowk, Kota</p>
                      </div>
                      <div>
                        <p>Slot: 3PM - 4PM</p>
                        <p>Paid: Rs.200</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex absolute bottom-10 left-5 cursor-pointer underline text-black"
                onClick={handleSignOut}
              >
                <ArrowLeftStartOnRectangleIcon className="size-6" /> Logout
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
