import React from "react";

import FooterStyles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={FooterStyles.footer}>
      <p>&copy; Copyright 2021</p>
      <a href="/">Dev Scheduler</a>
    </footer>
  );
}
