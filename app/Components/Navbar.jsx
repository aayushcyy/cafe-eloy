"use client";

import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  //hover animation hooks
  const [animateHover, setAnimateHover] = useState(false);
  const [animateHover2, setAnimateHover2] = useState(false);
  const [animateHover3, setAnimateHover3] = useState(false);
  const [animateHover4, setAnimateHover4] = useState(false);

  //extracting path name
  const pathName = usePathname();

  return (
    <div className="w-full flex justify-between items-center py-3 text-base font-montserrat font-medium text-[#331A0B]">
      <div className="relative w-28">
        <Link href={"/"}>
          <Image src={logo} alt="" />
        </Link>
      </div>
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
        <div
          className="flex flex-col group relative"
          onMouseEnter={() => setAnimateHover4(true)}
          onMouseLeave={() => setAnimateHover4(false)}
        >
          <Link href="/about">Sign Up</Link>
          <motion.div
            initial={{ width: 0, originX: 0 }}
            animate={
              animateHover4 ? { width: "100%", originX: 1 } : { width: 0 }
            }
            className="bg-[#331A0B] h-[1px] w-full -mt-[2px]"
          ></motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          className="bg-[#D21C27] py-2.5 px-4 text-sm rounded-full text-white cursor-pointer"
        >
          Book Now!
        </motion.div>
      </div>
    </div>
  );
}
