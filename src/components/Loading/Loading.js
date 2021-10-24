import React from "react";
import { motion } from "framer-motion";

import LoadingStyles from "./Loading.module.css";

export default function Loading() {
  const animateVariant = {
    repeat: {
      rotate: 360,
      transition: { duration: 1, yoyo: Infinity },
    },
  };
  return (
    <div className={LoadingStyles.container}>
      <motion.div
        className={LoadingStyles.loader}
        variants={animateVariant}
        animate="repeat"
      ></motion.div>
    </div>
  );
}
