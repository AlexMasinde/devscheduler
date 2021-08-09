import React, { useEffect, useState } from "react";
import AddActivityModal from "../AddActivityModal/AddActivityModal";

import DashboardNav from "../DashboardNav/DashboardNav";

import DashboardStyles from "./Dashboard.module.css";

export default function Dashboard() {
  const [adding, setAdding] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closingModal = adding ? "" : DashboardStyles.modalout;

  useEffect(() => {
    let timeoutId;
    if (adding && !mounted) {
      setMounted(true);
    } else if (!adding && mounted) {
      timeoutId = setTimeout(() => setMounted(false), 490);
    }
    return () => clearTimeout(timeoutId);
  }, [mounted, adding]);

  return (
    <div>
      <div>
        <DashboardNav modal={{ adding, setAdding }} />
      </div>
      {mounted && (
        <div className={`${DashboardStyles.modal} ${closingModal}`}>
          <AddActivityModal modal={{ adding, setAdding }} />
        </div>
      )}
    </div>
  );
}
