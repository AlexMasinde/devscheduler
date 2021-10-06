import React, { useState } from "react";

import { useAuth } from "../../contexts/authContext";

import Input from "../../components/presentationcomponents/Input/Input";
import Button from "../../components/presentationcomponents/Button/Button";

import logo from "../../icons/logo.svg";

import placeholderpic from "../../icons/placeholder.jpg";

import UserProfileStyles from "./UserProfile.module.css";

export default function UserProfile() {
  const { currentUser } = useAuth();
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState();

  function handleUserName(e) {
    setUserName(e.target.value);
  }

  function handleImage(e) {
    setImage(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={UserProfileStyles.container}>
      <div className={UserProfileStyles.logo}>
        <img src={logo} />
      </div>
      <div className={UserProfileStyles.details}>
        <div className={UserProfileStyles.currentdetails}>
          <img src={currentUser.photoURL ?? placeholderpic} />
          <p> {currentUser?.email}</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={UserProfileStyles.username}>
            <p>Username</p>
            <Input
              placeholder="username"
              type="text"
              onChange={handleUserName}
              value={userName}
            />
          </div>
          <div className={UserProfileStyles.image}>
            <p id={UserProfileStyles.imageLabel}>Profile Picture</p>
            <label>
              <input type="file" onChange={handleImage} disabled={loading} />
              <span>Select Profile Picture</span>
            </label>
          </div>
          <div className={UserProfileStyles.button}>
            <Button type="submit" text="Update Profile" />
          </div>
        </form>
      </div>
    </div>
  );
}
