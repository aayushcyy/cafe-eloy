"use client";

import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { getCookie } from "cookies-next";

export default function Proceed2PayBtn() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);
  const [slot, setSlot] = useState(null);
  const [newVal, setNewVal] = useState(false);
  const [documentId, setDocumentId] = useState(null);

  //geting data from cookie
  useEffect(() => {
    const userCookie = getCookie("user");
    if (userCookie) {
      const userData = JSON.parse(userCookie);
      setSlot(userData.slot);
      const loc = userData.location.includes("Samta") ? "samta" : "kota";
      const formattedDate = userData.date.replace(/\s/g, "").toLowerCase();
      setLocation(loc);
      setDate(formattedDate);

      // Generate document ID once location and date are available
      setDocumentId(`${loc}-${formattedDate}`);
    } else {
      console.log("can't get cookie!");
    }
  }, []);

  //creating document id to access/change data

  const handleSubmit = async () => {
    setLoading(true);

    if (!slot || !documentId || !newVal) {
      console.error("Missing required fields at client side:", {
        slot,
        documentId,
        newVal,
      });
      return;
    }
    try {
      const response = await fetch("../api/database/updateDoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slot: slot,
          newVal: newVal,
          documentId: documentId,
        }),
      });
      const data = await response.json();
      console.log("data after trying updateDoc: ", data);
    } catch (error) {
      console.error("Error updating doc: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[60%] flex justify-center">
      {loading ? (
        <Loader height={16} width={16} />
      ) : (
        <button
          className="w-full text-center font-medium cursor-pointer bg-red-500 hover:bg-[#dc3636] text-white py-2 rounded-md"
          onClick={handleSubmit}
        >
          Proceed to Payment
        </button>
      )}
    </div>
  );
}
