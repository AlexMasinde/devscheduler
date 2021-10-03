import React, { useState } from "react";

import { validateUserDetails } from "../../utils/validators";
import { useAuth } from "../../contexts/authContext";

import Button from "../presentationcomponents/Button/Button";
import Input from "../presentationcomponents/Input/Input";

import logo from "../../icons/logo.svg";
import facebook from "../../icons/facebook.svg";
import google from "../../icons/google.svg";

import UserFormStyles from "./UserForm.module.css";

export default function UserForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signUp, googleSignUp } = useAuth();

  function handleEmail(e) {
    if (errors) {
      setErrors({ ...errors, email: "" });
    }
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    if (errors) {
      setErrors({ ...errors, password: "" });
    }
    setPassword(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const { valid, errors } = validateUserDetails(email, password);
    if (!valid) {
      return setErrors({ ...errors });
    }
    try {
      setLoading(true);
      setErrors({});
      await signUp(email, password);
      setLoading(false);
    } catch (err) {
      //auth/popup-closed-by-user --error
      if (err.code === "auth/email-already-in-use") {
        setErrors({ ...errors, email: "Email already in use" });
      } else {
        setErrors({ ...errors, authError: "Could not register. Try again" });
      }
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setLoading(true);
      await googleSignUp();
      setLoading(false);
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setErrors({
          ...errors,
          authError: "Sign up aborted by user! Try again",
        });
      } else {
        setErrors({ ...errors, authError: "Could not log in. Try again" });
      }
      setLoading(false);
    }
  }

  return (
    <div className={UserFormStyles.container}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={UserFormStyles.formcontainer}>
        <div className={UserFormStyles.header}>
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={UserFormStyles.input}>
            <Input placeholder="E-mail" type="text" onChange={handleEmail} />
            {errors.email && (
              <p className={UserFormStyles.error}>{errors.email}</p>
            )}
          </div>
          <div className={UserFormStyles.input}>
            <Input
              placeholder="Password"
              type="password"
              onChange={handlePassword}
            />
            {errors.password && (
              <p className={UserFormStyles.error}>{errors.password}</p>
            )}
            {errors.authError && (
              <p className={UserFormStyles.error}>{errors.authError}</p>
            )}
          </div>
          <div className={UserFormStyles.button}>
            <Button type="submit" loading={loading} text="Sign-Up" />
          </div>
        </form>
        <div className={UserFormStyles.accountcheck}>
          <p>
            Already have an account? <span>Login</span>
          </p>
        </div>
        <div className={UserFormStyles.or}>OR</div>
        <div className={UserFormStyles.iconscontainer}>
          <div onClick={() => handleGoogle()} className={UserFormStyles.icons}>
            <p>Google</p>
            <img src={google} alt="google" />
          </div>
          <div className={UserFormStyles.icons}>
            <p>Facebook</p>
            <img src={facebook} alt="facebook" />
          </div>
        </div>
      </div>
      <div>
        <p>Footer</p>
      </div>
    </div>
  );
}
