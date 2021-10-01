import React, { useState } from "react";

import Button from "../presentationcomponents/Button/Button";
import Input from "../presentationcomponents/Input/Input";

import logo from "../../icons/logo.svg";
import facebook from "../../icons/facebook.svg";
import google from "../../icons/google.svg";

import UserFormStyles from "./UserForm.module.css";
import { validateUserDetails } from "../../utils/validators";

export default function UserForm() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

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

  function handleSubmit(e) {
    e.preventDefault();
    const { valid, errors } = validateUserDetails(email, password);
    if (!valid) {
      return setErrors({ ...errors });
    }
    console.log(email);
    console.log(password);
  }

  return (
    <div className={UserFormStyles.container}>
      <div>
        <img src={logo} alt="logo" />
      </div>
      <div className={UserFormStyles.formcontainer}>
        <h1>Sign Up</h1>
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
          </div>
          <div className={UserFormStyles.button}>
            <Button type="submit" disabled={loading} text="Sign-Up" />
          </div>
        </form>
        <div className={UserFormStyles.accountcheck}>
          <p>
            Already have an account? <span>Login</span>
          </p>
        </div>
        <div className={UserFormStyles.or}>OR</div>
        <div className={UserFormStyles.iconscontainer}>
          <div className={UserFormStyles.icons}>
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
