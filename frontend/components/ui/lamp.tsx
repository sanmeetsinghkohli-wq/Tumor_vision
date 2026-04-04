"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative min-h-screen overflow-hidden w-full flex flex-col items-center bg-[#140E1C]",
        className
      )}
    >
      {/* ── Beam layer (top portion, absolute) ── */}
      <div className="absolute top-0 left-0 right-0 h-[55vh] flex items-end justify-center overflow-hidden pointer-events-none">
        {/* Left conic beam */}
        <motion.div
          initial={{ opacity: 0.4, width: "12rem" }}
          whileInView={{ opacity: 1, width: "28rem" }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute bottom-0 right-1/2 h-52 overflow-visible bg-gradient-conic from-[#C5757C] via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute w-full left-0 bg-[#140E1C] h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute w-36 h-full left-0 bg-[#140E1C] bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic beam */}
        <motion.div
          initial={{ opacity: 0.4, width: "12rem" }}
          whileInView={{ opacity: 1, width: "28rem" }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute bottom-0 left-1/2 h-52 bg-gradient-conic from-transparent via-transparent to-[#C5757C] text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute w-36 h-full right-0 bg-[#140E1C] bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute w-full right-0 bg-[#140E1C] h-36 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Horizontal beam line */}
        <motion.div
          initial={{ width: "12rem", opacity: 0 }}
          whileInView={{ width: "28rem", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
          className="absolute bottom-[4.5rem] z-50 h-[2px] bg-gradient-to-r from-transparent via-[#F9AAAD] to-transparent"
        />

        {/* Glow orb at beam origin */}
        <div className="absolute bottom-16 z-40 h-24 w-72 rounded-full bg-[#C5757C] opacity-30 blur-3xl" />
        <motion.div
          initial={{ width: "6rem" }}
          whileInView={{ width: "14rem" }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeInOut" }}
          className="absolute bottom-16 z-30 h-24 rounded-full bg-[#F9AAAD] blur-2xl opacity-50"
        />

        {/* Floor mask */}
        <div className="absolute bottom-0 h-16 w-full bg-[#140E1C] blur-xl z-50" />
      </div>

      {/* ── Content (below beams) ── */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full pt-[50vh]">
        {children}
      </div>
    </div>
  );
};
