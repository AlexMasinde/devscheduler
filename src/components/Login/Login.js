import React, { useState } from "react";
import { useHistory } from "react-router";

import { validateUserDetails } from "../../utils/validators";
import { useAuth } from "../../contexts/authContext";

import Button from "../presentationcomponents/Button/Button";
import Input from "../presentationcomponents/Input/Input";

import logo from "../../icons/logo.svg";
import facebook from "../../icons/facebook.svg";
import google from "../../icons/google.svg";

import LoginStyles from "./Login.module.css";
import { Link } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { signIn, googleSignUp } = useAuth();
  const history = useHistory();

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
      await signIn(email, password);
      setLoading(false);
      history.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setErrors({ ...errors, email: "User not registered!" });
      } else if (err.code === "auth/wrong-password") {
        setErrors({ ...errors, password: "Wrong password! Try again" });
      } else {
        setErrors({ ...errors, authError: "Could not log in! Try again" });
      }
      setLoading(false);
    }
  }

  async function handleGoogle() {
    try {
      setLoading(true);
      await googleSignUp();
      setLoading(false);
      history.push("/dashboard");
    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setErrors({
          ...errors,
          authError: "Log in aborted by user! Try again",
        });
      } else {
        setErrors({ ...errors, authError: "Could not log in. Try again" });
      }
      setLoading(false);
    }
  }

  return (
    <div className={LoginStyles.container}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={LoginStyles.formcontainer}>
        <div className={LoginStyles.header}>
          <h1>Login</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={LoginStyles.input}>
            <Input placeholder="E-mail" type="text" onChange={handleEmail} />
            {errors.email && (
              <p className={LoginStyles.error}>{errors.email}</p>
            )}
          </div>
          <div className={LoginStyles.input}>
            <Input
              placeholder="Password"
              type="password"
              onChange={handlePassword}
            />
            {errors.password && (
              <p className={LoginStyles.error}>{errors.password}</p>
            )}
            {errors.authError && (
              <p className={LoginStyles.error}>{errors.authError}</p>
            )}
          </div>
          <div className={LoginStyles.button}>
            <Button type="submit" loading={loading} text="Login" />
          </div>
        </form>
        <div className={LoginStyles.accountcheck}>
          <p>
            Don't have an account?{" "}
            <Link to="/signup">
              <span className={LoginStyles.link}>Sign up</span>
            </Link>
          </p>
        </div>
        <div className={LoginStyles.or}>OR</div>
        <div className={LoginStyles.iconscontainer}>
          <div onClick={() => handleGoogle()} className={LoginStyles.icons}>
            <p>Google</p>
            <img src={google} alt="google" />
          </div>
          <div className={LoginStyles.icons}>
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
