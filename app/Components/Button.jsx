"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";

export default function Button({ classname, to, children, animation = false }) {
  return (
    <div>
      {animation && (
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Link href={`${to}`} className={`${classname}`}>
            {children}
          </Link>
        </motion.div>
      )}

      {!animation && (
        <Link href={`${to}`} className={`${classname}`}>
          {children}
        </Link>
      )}
    </div>
  );
}
