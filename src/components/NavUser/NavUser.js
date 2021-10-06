import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../../contexts/authContext";

import HeaderDropdown from "../HeaderDropdown/HeaderDropdown";

import placeholderpic from "../../icons/placeholder.jpg";
import arrowdowncolored from "../../icons/arrowdowncolored.svg";
import arrowupcolored from "../../icons/arrowupcolored.svg";

import NavUserStyles from "./NavUser.module.css";
import { Link } from "react-router-dom";

export default function NavUser() {
  const { currentUser } = useAuth();
  const [dropdown, setDropdown] = useState(false);

  function handleDropdown() {
    setDropdown(!dropdown);
  }

  return (
    <div className={NavUserStyles.container}>
      <Link to="/profile">
        <p>{currentUser.displayName ?? currentUser.email}</p>
      </Link>
      <Link to="/profile">
        <div className={NavUserStyles.profilepicture}>
          <img src={currentUser.photoURL ?? placeholderpic} alt="profile" />
        </div>
      </Link>

      <div onClick={() => handleDropdown()} className={NavUserStyles.arrow}>
        <img src={dropdown ? arrowupcolored : arrowdowncolored} alt="" />
      </div>
      <AnimatePresence>
        {dropdown && (
          <motion.div
            className={NavUserStyles.dropdown}
            initial={{ y: -25 }}
            animate={{ y: 5 }}
            exit={{ y: -25, opacity: 0 }}
          >
            <HeaderDropdown />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
