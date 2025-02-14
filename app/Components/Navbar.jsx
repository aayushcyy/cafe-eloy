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
import useMyStore from "../store/store";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function Navbar({ showBook, showBook2, isUsserLoggedIn }) {
  //hover animation hooks
  const [animateHover, setAnimateHover] = useState(false);
  const [animateHover2, setAnimateHover2] = useState(false);
  const [animateHover3, setAnimateHover3] = useState(false);
  const [loader, setLoader] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState(null);
  const [upcomingBooking, setUpcomingBooking] = useState([]);
  const [prevBooking, setPrevBooking] = useState([]);
  const profileDivRef = useRef(null);
  const router = useRouter();

  //avatars access
  const avatars = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
    "/avatars/avatar9.png",
    "/avatars/avatar10.png",
  ];

  //accessing zustand method
  const { isLoggedIn } = useMyStore();
  const pathName = usePathname();

  // fetching cookie data and seting user data
  useEffect(() => {
    const user = getCookie("user");
    if (user) {
      setUserData(JSON.parse(user));
      //setZustandUser(JSON.parse(user));
    }
  }, [isLoggedIn]);

  //Signout function
  const handleSignOut = () => {
    deleteCookie("user");
    setUserData(null);
    router.push("/");
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

  //opening profile and fetching booking details
  const handleProfileOpen = async () => {
    setOpenProfile(!openProfile);
    if (!userData || !userData.email) return;
    try {
      setLoader(true);
      const response = await fetch("/api/database/getBooking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userData.email }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch booking data!");
      }
      const data = await response.json();
      console.log("bookings data! ", data.data.bookings);
      setUserBookings(data.data.bookings);
    } catch (error) {
      console.error("Error fetching booking data:", error);
    } finally {
      setLoader(false);
    }
  };

  //categorizing and updating bookings
  useEffect(() => {
    //categorizing the slots as upcoming or previous bookings
    const categorizeBookings = (bookings) => {
      if (bookings) {
        const today = new Date();
        const formattedToday = today.toISOString().split("T")[0];

        const previousBookings = [];
        const upcomingBookings = [];

        function convertDate(dateStr) {
          const months = {
            jan: "01",
            feb: "02",
            mar: "03",
            apr: "04",
            may: "05",
            jun: "06",
            jul: "07",
            aug: "08",
            sep: "09",
            oct: "10",
            nov: "11",
            dec: "12",
          };
          const day = dateStr.slice(0, -5);
          const monthStr = dateStr.match(/^(\d{1,2})([a-z]{3})(\d{2})$/)[2];
          const month = months[monthStr];
          const year = "20" + dateStr.slice(-2);
          return `${year}-${month}-${day.padStart(2, "0")}`;
        }

        function convertTimeTo24Hour(timeStr) {
          // Convert "9PM - 10PM" to [21:00, 22:00] (24-hour format)
          let [startTime, endTime] = timeStr.split(" - ").map((time) => {
            let [hour, period] = [parseInt(time.slice(0, -2)), time.slice(-2)];
            if (period.toLowerCase() === "pm" && hour !== 12) hour += 12;
            if (period.toLowerCase() === "am" && hour === 12) hour = 0;
            console.log("formatted booking hour: ", hour);
            return hour;
          });
          return [startTime, endTime];
        }

        bookings.forEach((booking) => {
          const bookingDate = convertDate(booking.date);
          const [startHour] = convertTimeTo24Hour(booking.slot);

          if (bookingDate < formattedToday) {
            previousBookings.push(booking);
          } else if (bookingDate > formattedToday) {
            upcomingBookings.push(booking);
          } else {
            const currentHour = today.getHours();
            if (startHour < currentHour) {
              previousBookings.push(booking);
            } else {
              upcomingBookings.push(booking);
            }
          }
        });

        console.log("previous bookings are! ", previousBookings);
        if (previousBookings) setPrevBooking(previousBookings);
        if (upcomingBookings) setUpcomingBooking(upcomingBookings);
      } else {
        console.log("bookings isn't fullfilled yet!");
      }
    };
    categorizeBookings(userBookings);
  }, [userBookings]);

  return (
    <div className="w-full flex justify-between items-center md:py-3 py-2 text-base font-montserrat font-medium text-[#331A0B] md:px-0 px-2">
      {/* Logo */}
      <div className="relative md:w-24 w-20 md:mt-1">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
      </div>
      {!pathName.includes("login") && (
        <div className="flex justify-between items-center md:gap-[6vw]">
          {/* menu */}
          <div className="md:flex gap-[4vw] hidden">
            {/* Menu Option */}
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
            {/* About Us Option */}
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
            {/* Feedback Option */}
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
          {/* Icons */}
          <div className="flex items-center gap-[3vw]">
            {/* Cart Icon */}
            {pathName.includes("menu") && (
              <div className="cursor-pointer relative">
                <div className="w-[6px] h-[6px] rounded-full bg-primaryRed z-20 absolute right-[2px] -top-[2px]"></div>
                <ShoppingBagIcon className="size-5 stroke-1.5" />
              </div>
            )}
            {!showBook && !userData && !pathName.includes("book") && (
              <Link href={"/book"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#D21C27] py-2 px-4 text-sm rounded-full text-white cursor-pointer md:block hidden"
                >
                  Book Cabin
                </motion.div>
              </Link>
            )}{" "}
            {!showBook2 && !isUsserLoggedIn && !isLoggedIn && (
              <Link href={"/login"}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="bg-[#D21C27] md:py-2 md:px-4 md:text-sm md:mb-0 py-1.5 px-2.5 mr-3 text-xs mb-1 rounded-full text-white cursor-pointer"
                >
                  Sign in
                </motion.div>
              </Link>
            )}
            {/* Profile Open */}
            {userData && (
              <div className="md:mr-0 mr-3">
                {userData.randomAvatar ? (
                  <Image
                    src={avatars[userData.randomAvatar]}
                    width={100}
                    height={100}
                    alt="profile"
                    onClick={handleProfileOpen}
                    className="md:w-10 md:mb-0 w-8 mb-1 rounded-full bg-transparent cursor-pointer"
                  />
                ) : (
                  <UserCircleIcon
                    className="size-9 cursor-pointer stroke-1.5 hover:text-red-600 transition-all ease-in-out duration-200"
                    onClick={() => setOpenProfile(!openProfile)}
                  />
                )}
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
            animate={{ opacity: 1, right: 0, ease: "circInOut" }}
            className="bg-[white] h-screen md:w-[43%] lg:w-[25%] md:px-4 md:py-4 md:gap-5 w-[75%] px-3 py-4 right-0 absolute flex flex-col gap-2"
          >
            <div ref={profileDivRef} className="flex flex-col md:gap-3 gap-1">
              {/* Back Button */}
              <div>
                <div
                  className="md:w-8 md:h-7 w-5 h-4 items-center justify-start cursor-pointer flex"
                  onClick={() => setOpenProfile(false)}
                >
                  <ArrowLeftIcon className="size-6 stroke-2" />
                </div>
              </div>
              <div className="flex flex-col md:gap-5 gap-3">
                {/* User Details */}
                <div className="flex md:gap-4 items-center gap-2 py-2">
                  <div className="md:w-14 md:h-14 w-10 h-10 flex items-center justify-center text-xl rounded-[100%] relative">
                    <Image
                      src={avatars[userData.randomAvatar]}
                      height={100}
                      width={100}
                      alt="profile img"
                    />
                  </div>
                  <div className="flex flex-col md:mb-0 mb-1">
                    <p className="md:text-2xl text-md">
                      {userData ? userData.name : "User"}
                    </p>
                    <p className="text-[#000000a7] md:text-base text-xs">
                      {userData ? userData.email : ""}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col pr-1 gap-4 w-full h-[65vh] overflow-y-scroll">
                  {/* Upcoming Bookings */}
                  <div className="flex flex-col gap-3 rounded-md">
                    <p className="md:text-base text-xs">Upcoming bookings</p>
                    <div className="flex flex-col gap-3 rounded-md">
                      {loader && (
                        <div className="w-full items-center flex justify-center">
                          <Loader width={20} height={20} />
                        </div>
                      )}
                      {upcomingBooking.length > 0 ? (
                        upcomingBooking.map((booking) => (
                          <div
                            className="flex justify-between md:border-[2px] md:px-2 md:pb-1 md:pt-2 md:text-sm md:rounded-md border-[1px] border-[#bebebe57] px-1 pb-[2px] pt-[5px] text-xs rounded-sm bg-green-100 relative"
                            key={booking.bookingId}
                          >
                            <p className="text-orange-700 md:text-xs md:px-1 md:-top-[8px] text-[9px] font-medium bg-white rounded-sm absolute italic px-[2px] -top-[5px] leading-[9px]">
                              {booking.bookingId}
                            </p>
                            <div className="text-[10px] leading-tight md:leading-normal md:text-xs flex flex-col md:gap-0 gap-[1px]">
                              <p className="capitalize">
                                Date:{" "}
                                <span className="capitalize">
                                  {booking.date.replace(
                                    /(\d{2})(\w{3})(\d{2})/,
                                    "$1 $2 $3"
                                  )}
                                </span>
                              </p>
                              <p>
                                <span className="md:inline hidden">
                                  Branch:
                                </span>{" "}
                                {booking.branch.includes("samta")
                                  ? "Samta Colony, Raipur"
                                  : "Kota Chowk, Raipur"}
                              </p>
                            </div>
                            <div className="text-[10px] leading-tight md:leading-normal md:text-xs flex flex-col md:gap-0 gap-[1px]">
                              <p>Slot: {booking.slot}</p>
                              <p>Paid: {booking.amountPaid}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-black">
                          Your don't have any booking yet!
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="w-full md:h-[1px] h-[.5px] bg-[#7a7a7a31] mt-1"></div>
                  {/* Booking History Section */}
                  <div className="flex flex-col gap-3">
                    <p className="md:text-base text-xs">Booking History</p>
                    <div className="flex flex-col gap-3 text-sm rounded-md">
                      {loader && (
                        <div className="w-full items-center flex justify-center">
                          <Loader width={20} height={20} />
                        </div>
                      )}
                      {prevBooking.length > 0 ? (
                        prevBooking.map((booking) => (
                          <div
                            className="flex justify-between md:border-[2px] md:px-2 md:pb-1 md:pt-2 md:text-sm md:rounded-md border-[1px] border-[#bebebe57] px-1 pb-[2px] pt-[5px] text-xs rounded-sm bg-red-100 relative"
                            key={booking.bookingId}
                          >
                            <p className="text-orange-700 md:text-xs md:px-1 md:-top-[8px] text-[9px] font-medium bg-white rounded-sm absolute italic px-[2px] -top-[5px] leading-[9px]">
                              {booking.bookingId}
                            </p>
                            <div className="text-[10px] leading-tight md:leading-normal md:text-xs flex flex-col md:gap-0 gap-[1px]">
                              <p className="capitalize">
                                Date:{" "}
                                <span className="capitalize">
                                  {booking.date.replace(
                                    /(\d{2})(\w{3})(\d{2})/,
                                    "$1 $2 $3"
                                  )}
                                </span>
                              </p>
                              <p>
                                <span className="md:inline-block hidden">
                                  Branch:
                                </span>{" "}
                                {booking.branch.includes("samta")
                                  ? "Samta Colony, Raipur"
                                  : "Kota Chowk, Raipur"}
                              </p>
                            </div>
                            <div className="text-[10px] leading-tight md:leading-normal md:text-xs flex flex-col md:gap-0 gap-[1px]">
                              <p>Slot: {booking.slot}</p>
                              <p>Paid: {booking.amountPaid}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-xs text-black">
                          Your don't have any booking yet!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex absolute bottom-10 left-5 cursor-pointer underline text-black md:text-base text-xs"
                onClick={handleSignOut}
              >
                <ArrowLeftStartOnRectangleIcon className="md:size-6 size-4" />{" "}
                Logout
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
