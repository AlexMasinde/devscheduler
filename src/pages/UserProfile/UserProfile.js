import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "../../firebase";

import { validateProfile } from "../../utils/validators";
import { uploadImage } from "../../utils/uploadImage";

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
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState("Select Profile Picture");

  function handleUserName(e) {
    if (errors) {
      setErrors({ ...errors, name: "" });
    }
    setUserName(e.target.value);
  }

  function handleImage(e) {
    if (errors) {
      setErrors({ ...errors, image: "" });
    }
    const image = e.target.files[0];
    const rawName = image.name;
    const truncatedName =
      rawName.length > 20 ? rawName.substring(0, 20) + "..." : rawName;
    setImageName(truncatedName);
    setImage(image);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { validationErrors, valid } = validateProfile(
      image,
      userName,
      currentUser
    );
    if (!valid) {
      console.log(validationErrors);
      return setErrors(validationErrors);
    }

    try {
      setLoading(true);
      const updateDetails = {};
      //uploadimage
      if (image) {
        updateDetails.photoURL = await uploadImage(image, currentUser);
        console.log("Image");
      }

      if (userName) {
        updateDetails.displayName = userName;
      }

      if (Object.keys(updateDetails).length >= 1) {
        console.log(updateDetails);
        const user = auth.currentUser;
        await user.updateProfile(updateDetails);
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div className={UserProfileStyles.container}>
      <div className={UserProfileStyles.logo}>
        <Link to="/">
          <img src={logo} alt="Home" />
        </Link>
      </div>
      <div className={UserProfileStyles.details}>
        <div className={UserProfileStyles.currentdetails}>
          <img src={currentUser.photoURL ?? placeholderpic} alt="Profile" />
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
            {errors.name && (
              <p className={UserProfileStyles.error}>{errors.name}</p>
            )}
          </div>
          <div className={UserProfileStyles.image}>
            <p id={UserProfileStyles.imageLabel}>Profile Picture</p>
            <label>
              <input type="file" onChange={handleImage} disabled={loading} />
              <span>{imageName}</span>
            </label>
            {errors.image && (
              <p className={UserProfileStyles.error}>{errors.image}</p>
            )}
          </div>
          <div className={UserProfileStyles.button}>
            <Button type="submit" text="Update Profile" loading={loading} />
          </div>
        </form>
        {errors.updateError && (
          <p className={UserProfileStyles.updateError}>{errors.updateError}</p>
        )}
      </div>
    </div>
  );
}

// if (
//   currentUser.displayName.trim() !== userName.trim() &&
//   currentUser.displayName.trim() !== ""
// ) {
//   return setErrors({ ...errors, userName: "" });
// }
