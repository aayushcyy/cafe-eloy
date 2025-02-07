"use client";

import React, { useState } from "react";
import Loader from "./Loader";

export default function Proceed2PayBtn() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
    } catch (error) {
    } finally {
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
