"use client";
import React from "react";
import { motion } from "framer-motion";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: any[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-transparent"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-8 rounded-3xl border border-white/5 bg-[#0F0F11] shadow-lg max-w-xs w-full hover:border-white/10 transition-colors" key={i}>
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">"{text}"</p>
                  <div className="flex items-center gap-3 mt-5">
                    {image ? (
                        <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name}
                        className="h-10 w-10 rounded-full bg-gray-700 object-cover"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900" />
                    )}
                    <div className="flex flex-col">
                      <div className="text-sm font-bold text-white tracking-tight leading-5">{name}</div>
                      <div className="text-xs leading-5 text-gray-500 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};