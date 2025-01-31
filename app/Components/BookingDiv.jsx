import React from "react";

export default function BookingDiv({ slot = "10AM - 11AM", available = true }) {
  return (
    <div
      className={
        available
          ? "w-full flex flex-col bg-white rounded-lg overflow-hidden cursor-pointer"
          : "w-full flex flex-col bg-white rounded-lg overflow-hidden cursor-not-allowed"
      }
    >
      <div className="w-full flex text-xs gap-24 font-medium py-2 px-3">
        <p className="w-20">{slot}</p>
        <p>Rs.200</p>
        <p>{available ? "Available" : "NA"}</p>
      </div>
      <div
        className={
          available
            ? `text-[8px] font-medium text-center bg-green-400`
            : `text-[8px] font-medium text-center bg-red-400`
        }
      >
        {available ? "Click to Book" : "Not Available"}
      </div>
    </div>
  );
}
