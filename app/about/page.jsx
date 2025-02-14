import React from "react";
import Navbar from "../Components/Navbar";

export default function page() {
  return (
    <div className="w-full h-screen flex flex-col md:px-28 bg-[#E6E0E0] text-[#331A0B]">
      <Navbar />
      <div className="w-full h-[80vh] flex items-center justify-center text-center">
        <p className="text-xs md:text-base">
          The app is under development in this part!
        </p>
      </div>
    </div>
  );
}
