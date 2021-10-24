import React from "react";
import { motion } from "framer-motion";

import RegularButtonStyles from "./Button.module.css";

export default function Button({
  text,
  disabled,
  type,
  loading,
  variant,
  onClick,
}) {
  const textLoading = loading ? RegularButtonStyles.textloading : "";
  const redBg = variant === "danger" ? RegularButtonStyles.danger : "";
  const whiteBg = variant === "light" ? RegularButtonStyles.light : "";

  const animationVariant = {
    visible: {
      opacity: [0, 1, 0],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  return (
    <motion.button
      className={`${RegularButtonStyles.btn} ${redBg} ${whiteBg}`}
      disabled={disabled}
      variants={animationVariant}
      animate={loading ? "visible" : ""}
      type={type}
      onClick={onClick}
    >
      <span className={textLoading}>{text}</span>
    </motion.button>
  );
}
