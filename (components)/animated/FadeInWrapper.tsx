"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInWrapperProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

export const FadeInWrapper = ({
  children,
  delay = 0.2,
  duration = 0.6,
  className = "",
}: FadeInWrapperProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
