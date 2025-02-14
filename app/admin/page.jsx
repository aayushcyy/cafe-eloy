"use client";

import React, { useState } from "react";
import logo from "../../public/logoDark.png";
import Image from "next/image";
import {
  ArrowLeftStartOnRectangleIcon,
  BellIcon,
  CalendarDaysIcon,
  CheckBadgeIcon,
  ClockIcon,
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  Squares2X2Icon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function page() {
  const [showCalender, setShowCalender] = useState(false);
  return (
    <div className="w-full h-screen flex bg-black text-white">
      <div className="h-screen w-20 border-r-[1px] border-darkTernary flex flex-col">
        <div className="flex justify-center py-4">
          <Image src={logo} alt="" height={100} width={100} className="w-16" />
        </div>
        {/* side navbar */}
        <div className="flex flex-col h-screen py-5 pb-14 justify-between items-center ">
          <div className="flex flex-col gap-10 items-center">
            <div className="py-1.5 px-1.5 rounded-md cursor-pointer hover:bg-[#3f54a55c] hover:text-blue-300 transition-all ease-in duration-400">
              <Squares2X2Icon className="size-5" />
            </div>
            <div className="py-1.5 px-1.5 rounded-md cursor-pointer hover:bg-[#3f54a55c] hover:text-blue-300 transition-all ease-in duration-400">
              <CalendarDaysIcon className="size-5" />
            </div>
            <div className="py-1.5 px-1.5 rounded-md cursor-pointer hover:bg-[#3f54a55c] hover:text-blue-300 transition-all ease-in duration-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="M280-80v-366q-51-14-85.5-56T160-600v-280h80v280h40v-280h80v280h40v-280h80v280q0 56-34.5 98T360-446v366h-80Zm4000H560v-280q0-83 58.5-141.5T760-880v800h-80Z" />
              </svg>{" "}
            </div>
            <div className="py-1.5 px-1.5 rounded-md cursor-pointer hover:bg-[#3f54a55c] hover:text-blue-300 transition-all ease-in duration-400">
              <UsersIcon className="size-5" />{" "}
            </div>
          </div>
          <div className="flex flex-col gap-7 items-center">
            <div className="py-1.5 px-1.5 rounded-md cursor-pointer hover:bg-[#3f54a55c] hover:text-blue-300 transition-all ease-in duration-400">
              <Cog6ToothIcon className="size-5 " />
            </div>
            <div className="w-5 h-[1px] bg-darkTernary"></div>
            <div className="py-1.5 px-1.5 cursor-pointer">
              <ArrowLeftStartOnRectangleIcon className="size-5 text-red-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-screens">
        {/* top navbar */}
        <nav className="w-full py-3 px-5 border-b-[1px] border-darkTernary flex justify-between">
          <p className="text-xl font-montserrat font-medium">Dashboard</p>
          <div className="flex gap-5">
            <div className="bg-[#171717] py-1.5 flex items-center justify-center px-2 rounded-full">
              <BellIcon className="size-5 " />
            </div>
            <div className="bg-[#171717] py-1.5 flex items-center justify-center px-2 rounded-full border-2 border-green-500">
              <p className="text-sm">RZ</p>
            </div>
          </div>
        </nav>
        <div className="w-full h-screen px-5 py-1 font-montserrat flex flex-col">
          <p className="text-lg">Welcome, Admin</p>
          <div className="w-full h-auto">
            {/* total booking div */}
            <div className="flex flex-col gap-2.5 w-72 bg-darkSecondary max-h-[242px] px-2.5 py-2.5 rounded-md">
              {/* total bookings */}
              <div className="flex text-sm items-center justify-between w-full">
                <div className="flex gap-3">
                  <p>Total Bookings:</p>
                  <div className="px-2 flex items-center justify-center text-base font-medium rounded-sm bg-[#C84320]">
                    10
                  </div>
                </div>
                <div className=" flex">
                  <div
                    className="px-1.5 py-0.5 bg-[#282828] text-xs rounded-sm border-black cursor-pointer"
                    onClick={() => setShowCalender(!showCalender)}
                  >
                    14 Feb
                  </div>
                </div>
              </div>
              <div className="w-full h-[1px] bg-darkSecondary" />
              {/* Slots booked */}
              <div className="w-full flex flex-wrap gap-1">
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>4PM - 5PM</p>
                  <CheckBadgeIcon className="size-4 text-green-500 stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>4PM - 5PM</p>
                  <CheckBadgeIcon className="size-4 text-green-500 stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>5PM - 6PM</p>
                  <ExclamationTriangleIcon className="size-4 text-red-500 stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>6PM - 7PM</p>
                  <CheckBadgeIcon className="size-4 text-green-500 stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>7PM - 8PM</p>
                  <ClockIcon className="size-4 text-white stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>5PM - 6PM</p>
                  <ExclamationTriangleIcon className="size-4 text-red-500 stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>7PM - 8PM</p>
                  <ClockIcon className="size-4 text-white stroke-2" />
                </div>
                <div className="text-xs w-[49%] flex justify-between rounded-sm px-2 py-1 bg-darkTernary">
                  <p>7PM - 8PM</p>
                  <ClockIcon className="size-4 text-white stroke-2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
