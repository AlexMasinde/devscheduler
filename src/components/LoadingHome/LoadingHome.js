import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import logo from "../../icons/logo.svg";

import LoadingHomeStyles from "./LoadingHome.module.css";

const animationVariant = {
  visible: {
    opacity: [0, 1, 0],
    transition: { duration: 1.5, repeat: Infinity },
  },
};

export default function LoadingHome() {
  return (
    <AnimatePresence>
      <motion.div
        className={LoadingHomeStyles.container}
        variants={animationVariant}
        animate="visible"
      >
        <img src={logo} alt="logo" />
      </motion.div>
    </AnimatePresence>
  );
}
