"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Components/Navbar";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { motion } from "motion/react";
import dayjs from "dayjs";
import BookingDiv from "../Components/BookingDiv";
import Loader from "../Components/Loader";

export default function page() {
  //location and date value
  const [locationValue, setLocationValue] = useState("");
  const [dateValue, setDateValue] = useState("Today");

  const [optionOpen, setOptionOpen] = useState(false);
  const [dateOptionOpen, setDateOptionOpen] = useState(false);
  const [tommDate, setTommDate] = useState("");
  const [afterTommDate, setAfterTommDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [slotsData, setSlotsData] = useState(null);
  const locationDivRef = useRef(null);
  const dateDivRef = useRef(null);

  //generating upcoming 2 days
  useEffect(() => {
    const tomorrow = dayjs().add(1, "day").format("D MMM YY");
    setTommDate(tomorrow);
    const dayAfterTomorrow = dayjs().add(2, "day").format("D MMM YY");
    setAfterTommDate(dayAfterTomorrow);

    //handling outside click of inputs
    const handleClickOutside = (e) => {
      if (!locationDivRef.current.contains(e.target)) setOptionOpen(false);
      if (!dateDivRef.current.contains(e.target)) setDateOptionOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //creating document Id
  const shortLocation = locationValue.includes("Samta") ? "samta" : "kota";

  const sDateValue =
    dateValue === "Today"
      ? dayjs().format("DMMMYY")
      : dateValue.replace(/\s/g, "");

  const temId = `${shortLocation}-${sDateValue}`;
  const documentId = temId.toLowerCase();

  useEffect(() => {
    const checkDocExistence = async () => {
      if (!locationValue || !dateValue) {
        console.log("Please fill all fields correctly");
        return;
      }
      setLoading(true);
      try {
        const response = await fetch("/api/database/getDoc", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ documentId }),
        });
        //empty the slots before filling in with new value
        setSlotsData(null);
        const data = await response.json();
        if (data.data.slots) {
          setSlotsData(data.data.slots);
        }
      } catch (error) {
        console.error("Error signing up: ", error);
        console.log("slots empty tha");
        //creating slots when slot wasn't available
        createSlots();
        console.log("called the createSlots functino");
      } finally {
        setLoading(false);
      }
    };
    checkDocExistence();
  }, [dateValue, locationValue]);

  //creating slots when it wasn't available
  const createSlots = async () => {
    console.log("creatSlots function starttttt!");
    setLoading(true);
    try {
      const response = await fetch("/api/database/createDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ dateValue, locationValue, documentId }),
      });
      setSlotsData(null);
      const data = await response.json();
      if (data.data.slots) {
        setSlotsData(data.data.slots);
        console.log("the data i got from creating doc: ", data);
        //setSlotsData(data.data.slots);
      }
    } catch (error) {
      console.error("Error creating doc: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col px-36 bg-[#E6E0E0] text-primaryText font-montserrat">
      <Navbar showBook={false} />
      <div className="w-full h-[90vh] flex justify-center">
        {/* Input Container */}
        <div className="w-[40%] flex  gap-7">
          {/* Location Selector */}
          <div ref={locationDivRef} className="flex flex-col w-[60%] gap-2">
            <p className="text-sm text-gray-400">Location</p>
            <div className="flex flex-col bg-white text-sm rounded-md">
              <div
                onClick={() => setOptionOpen(!optionOpen)}
                className="flex items-center justify-between py-2 cursor-pointer px-3"
              >
                <p className="font-medium">
                  {locationValue ? locationValue : "Select Location"}
                </p>{" "}
                <ChevronDownIcon height={20} />
              </div>
              {optionOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "spring",
                  }}
                  className="flex flex-col border-t-[1px] border-[#ddddddc6]"
                >
                  <p
                    onClick={() => {
                      setLocationValue("Samta Colony, Raipur");
                      setOptionOpen(false);
                    }}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Samta Colony, Raipur
                  </p>
                  <div className="w-full h-[1px] bg-[#ddddddc6]"></div>
                  <p
                    onClick={() => {
                      setLocationValue("Jagganath Chowk, Kota, Raipur");
                      setOptionOpen(false);
                    }}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Jagganath Chowk, Kota, Raipur
                  </p>
                </motion.div>
              )}
            </div>
          </div>
          {/* Date Selector */}
          <div ref={dateDivRef} className="flex flex-col w-[20%] gap-2">
            <p className="text-sm text-gray-400">Date</p>
            <div className="flex flex-col bg-white text-sm rounded-md">
              <div
                onClick={() => setDateOptionOpen(!dateOptionOpen)}
                className="flex items-center justify-between py-2 cursor-pointer px-3"
              >
                <p className="font-medium">
                  {dateValue === "Today" ? "Today" : dateValue.slice(0, -2)}
                </p>{" "}
                <ChevronDownIcon height={20} />
              </div>
              {dateOptionOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: "easeInOut",
                    type: "spring",
                  }}
                  className="flex flex-col border-t-[1px] border-[#ddddddc6]"
                >
                  <p
                    onClick={() => {
                      setDateValue("Today");
                      setDateOptionOpen(false);
                    }}
                    className="py-2 px-3 cursor-pointer"
                  >
                    Today
                  </p>
                  <div className="w-full h-[1px] bg-[#ddddddc6]"></div>
                  <p
                    onClick={() => {
                      setDateValue(tommDate);
                      setDateOptionOpen(false);
                    }}
                    className="py-2 px-3 cursor-pointer"
                  >
                    {tommDate.slice(0, -2)}
                  </p>
                  <div className="w-full h-[1px] bg-[#ddddddc6]"></div>
                  <p
                    onClick={() => {
                      setDateValue(afterTommDate);
                      setDateOptionOpen(false);
                    }}
                    className="py-2 px-3 cursor-pointer"
                  >
                    {afterTommDate.slice(0, -2)}
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
        {/* showing booking options */}
        <div className="w-[40%] flex flex-col">
          <div className="w-[85%] flex flex-col gap-2">
            <p className="text-sm text-gray-400">Available Slots</p>
            {loading ? (
              <Loader height={80} width={80} />
            ) : (
              <div className="flex flex-col gap-[10px]">
                {slotsData ? (
                  Object.entries(slotsData).map(([timeSlot, isAvailable]) => (
                    <div key={timeSlot}>
                      <BookingDiv slot={timeSlot} available={isAvailable} />
                    </div>
                  ))
                ) : (
                  <p className="text-sm font-medium text-center">
                    Please Select Date and Branch to see the Availability
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
