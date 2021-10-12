import React from "react";

import { useActivities } from "../../contexts/activitiesContext";
import { useAuth } from "../../contexts/authContext";

import ActiveSign from "../ActiveSign/ActiveSign";

import logo from "../../icons/logo.svg";
import projectsicon from "../../icons/projectsicon.svg";
import coursesicon from "../../icons/coursesicon.svg";
import readingsicon from "../../icons/readingsicon.svg";
import home from "../../icons/home.svg";
import logout from "../../icons/logout.svg";

import SidebarStyles from "./Sidebar.module.css";

export default function Sidebar() {
  const { activeCategory, dispatch } = useActivities();
  const { signOut } = useAuth();
  const homeActive = activeCategory === "Home" ? true : false;
  const projectsActive = activeCategory === "Projects" ? true : false;
  const coursesActive = activeCategory === "Courses" ? true : false;
  const readingsActive = activeCategory === "Readings" ? true : false;

  function selectCategory(category) {
    dispatch({
      type: "SET_ACTIVE_CATEGORY",
      payload: category,
    });
  }

  async function handleLogout() {
    await signOut();
  }

  return (
    <div className={SidebarStyles.container}>
      <div className={SidebarStyles.logo}>
        <img src={logo} alt="schedular home" />
      </div>
      <div className={SidebarStyles.categories}>
        <div
          onClick={() => selectCategory("Home")}
          className={SidebarStyles.categorycontainer}
        >
          <div className={SidebarStyles.category}>
            <img src={home} alt="select home" />
            <p>Home</p>
          </div>
          {homeActive && <ActiveSign />}
        </div>
        <div className={SidebarStyles.header}>
          <h1>Categories</h1>
        </div>
        <div
          onClick={() => selectCategory("Projects")}
          className={SidebarStyles.categorycontainer}
        >
          <div className={SidebarStyles.category}>
            <img src={projectsicon} alt="select projects" />
            <p>Projects</p>
          </div>
          {projectsActive && <ActiveSign />}
        </div>
        <div
          onClick={() => selectCategory("Courses")}
          className={SidebarStyles.categorycontainer}
        >
          <div className={SidebarStyles.category}>
            <img src={coursesicon} alt="select courses" />
            <p>Courses</p>
          </div>
          {coursesActive && <ActiveSign />}
        </div>
        <div
          onClick={() => selectCategory("Readings")}
          className={SidebarStyles.categorycontainer}
        >
          <div className={SidebarStyles.category}>
            <img src={readingsicon} alt="select readings" />
            <p>Readings</p>
          </div>
          {readingsActive && <ActiveSign />}
        </div>
      </div>
      <div
        className={`${SidebarStyles.category} ${SidebarStyles.logout}`}
        onClick={() => handleLogout()}
      >
        <img src={logout} alt="logout" />
        <p>Logout</p>
      </div>
    </div>
  );
}
