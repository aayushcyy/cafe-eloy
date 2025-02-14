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
          ? "w-full flex flex-col bg-white rounded-lg overflow-hidden cursor-pointer lg:relative"
          : "w-full flex flex-col border-[1px] border-[#0000001f] bg-[#e6e6e6] rounded-lg overflow-hidden cursor-not-allowed lg:relative"
      }
    >
      <div className="w-full flex md:text-xs md:gap-8 lg:gap-16 md:justify-start justify-between md:py-2 md:px-3 py-1 px-2 text-[11px] font-medium lg:relative">
        <p className="w-20 lg:w-20">{slot}</p>
        <p className="md:w-12 lg:w-16 w-16">Rs.200</p>
        <p className="md:w-0 w-14">{available ? "Available" : "NA"}</p>
      </div>
      <div
        className={
          available
            ? `md:text-[8px] text-[7px] font-medium text-center bg-green-400`
            : `md:text-[8px] text-[7px] font-medium text-center bg-red-400`
        }
      >
        {available ? "Click to Book" : "Not Available"}
      </div>
    </div>
  );
}
