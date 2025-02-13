import React from "react";

export default function BookingDiv({
  slot = "10AM - 11AM",
  available = true,
  fadeDiv,
}) {
  return (
    <div
      className={
        available && !fadeDiv
          ? "w-full flex flex-col bg-white rounded-lg overflow-hidden cursor-pointer"
          : "w-full flex flex-col border-[1px] border-[#0000001f] bg-[#e6e6e6] rounded-lg overflow-hidden cursor-not-allowed"
      }
    >
      <div className="w-full flex lg:text-xs lg:gap-24 lg:justify-start lg:py-2 lg:px-3 justify-between py-1 px-2 text-[11px] font-medium ">
        <p className="w-20">{slot}</p>
        <p>Rs.200</p>
        <p>{available ? "Available" : "NA"}</p>
      </div>
      <div
        className={
          available
            ? `lg:text-[8px] text-[7px] font-medium text-center bg-green-400`
            : `lg:text-[8px] text-[7px] font-medium text-center bg-red-400`
        }
      >
        {available ? "Click to Book" : "Not Available"}
      </div>
    </div>
  );
}
