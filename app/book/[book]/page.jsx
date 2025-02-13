import Navbar from "@/app/Components/Navbar";
import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import Proceed2PayBtn from "@/app/Components/Proceed2PayBtn";

export default async function page({ params }) {
  const { book } = params;

  // fetching cookie data and seting user data
  const cookieStore = await cookies();
  const user = cookieStore.get("user");
  const userData = JSON.parse(user.value);
  userData.bookingId = book;
  console.log("userData ->  ", userData);

  return (
    <div className="w-full h-screen flex flex-col lg:px-36 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar showBook={false} showBook2={false} />
      <div className="w-full flex justify-center h-[90vh]">
        <div className="flex flex-col lg:w-2/4 lg:px-0 items-center pt-10 relative">
          {/* Receipt div */}
          <div className="bg-[#FFFFFF] lg:pt-5 pt-2 flex flex-col lg:w-[60%] w-[55%] relative">
            <div className="flex flex-col lg:gap-[4px] gap-[1px] justify-center lg:px-7 px-3 lg:text-sm text-[10px] font-[410]">
              <p className="uppercase lg:text-sm text-[10px] font-normal text-orange-700 lg:mb-4 mb-2">
                Booking Summary
              </p>
              <p className="text-orange-700 italic">{book}</p>
              <p>Name: {userData.name}</p>
              <p>Email: {userData.email}</p>
              <p>Date: {userData.date}</p>
              <div className="flex items-start gap-1">
                <p>Branch: </p>
                <p className="w-[70%]">
                  {userData.location.includes("Samta")
                    ? "Samta Colony, Raipur"
                    : "Kota Chowk, Raipur"}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p>
                  Slot: {userData.slot}{" "}
                  <span className="text-[#7d7d7d]">(1Hr)</span>
                </p>{" "}
                <p className="lg:text-sm text-[11px]">Rs.200</p>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="lg:text-xs text-[8px] text-[#7d7d7d]">
                  Convenience Fee
                </p>
                <p>Rs.13</p>
              </div>
              <div className="flex overflow-hidden font-thin text-[#939393cd]">
                ........................................................................................................................................................................................................................................
              </div>
              <div className="flex items-center justify-between">
                <p>Sub Total</p>
                <p>Rs.213</p>
              </div>
            </div>
            <div className="flex items-center justify-between lg:px-7 px-3 py-2 lg:text-base text-[13px] bg-orange-200 mt-2 font-medium">
              <p>Amount Payable</p>
              <p>Rs.213</p>
            </div>
            {/* circle div */}
            <div className="bg-[#E6E0E0] w-5 h-5 rounded-full absolute top-1/2 -translate-y-1/2 -left-[10px]"></div>
            <div className="bg-[#E6E0E0] w-5 h-5 rounded-full absolute top-1/2 -translate-y-1/2 -right-[10px]"></div>
          </div>
          {/* information div */}
          <div className="flex gap-1 py-2 mt-3 lg:w-[60%] w-[55%]">
            <InformationCircleIcon className="lg:size-4 size-2.5" />{" "}
            <p className="flex items-center lg:text-xs text-[8px] w-[90%]">
              By proceeding, I express my consent to complete this transaction.
            </p>
          </div>
          {/* Proceed button */}
          <Proceed2PayBtn bookingId={book} />
        </div>
      </div>
    </div>
  );
}
