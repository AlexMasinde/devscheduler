import React from "react";
import { motion } from "framer-motion";

import { useAuth } from "../../contexts/authContext";

import theme from "../../icons/theme.svg";
import user from "../../icons/user.svg";
import logout from "../../icons/logout.svg";

import HeaderDropdownStyles from "./HeaderDropdown.module.css";
import { Link } from "react-router-dom";

export default function HeaderDropdown() {
  const { signOut } = useAuth();

  async function handleSignout() {
    await signOut();
  }
  return (
    <div className={HeaderDropdownStyles.container}>
      <Link to="/profile">
        <motion.div
          className={HeaderDropdownStyles.item}
          whileHover={{ scale: 1.1, cursor: "pointer" }}
        >
          <img src={user} alt="user profile" />
          <p>Account</p>
        </motion.div>
      </Link>
      <motion.div
        className={HeaderDropdownStyles.item}
        whileHover={{ scale: 1.1, cursor: "pointer" }}
      >
        <img src={theme} alt="toggle theme" />
        <p>Theme</p>
      </motion.div>
      <motion.div
        onClick={() => handleSignout()}
        className={HeaderDropdownStyles.item}
        whileHover={{ scale: 1.1, cursor: "pointer" }}
      >
        <img src={logout} alt="logout" />
        <p>Logout</p>
      </motion.div>
    </div>
  );
}
