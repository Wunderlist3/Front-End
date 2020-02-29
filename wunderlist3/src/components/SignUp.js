import React, { useState } from "react";
import Button from "./Button";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const SignupScreen = props => {
  const [signUpCred, setsignUpCred] = useState({
    username: "",
    password: "",
    firstName: "Alexis",
    lastName: "Hill"
  });

  const handleChange = e => {
    setsignUpCred({
      ...signUpCred,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post(
        "https://wunderlist-backend.herokuapp.com/api/auth/register",
        signUpCred
      )
      .then(res => {
        console.log("yoooo====>>>>", res);
        //props.history.push("/login");
      })
      .catch(err => {
        console.log("errrr====>>>>", err);
        console.error(err);
      });
  };

  return (
    <div className="signup-screen">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Userame
          <input
            placeholder="username"
            value={signUpCred.username}
            name="username"
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            placeholder="password"
            value={signUpCred.password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignupScreen;
