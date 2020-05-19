import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signin(props) {
  const [logInData, setLogInData] = useState({
    username: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://wunderlist-02.herokuapp.com/api/auth/login", logInData)
      .then(res => {
        console.log("res: ", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("message", res.data.message);
        localStorage.setItem("userID", res.data.userID);
        setIsLoading(false);
        props.history.push("/my");
      })
      .catch(err => console.log("Log In Error: ", err));
  };

  const handleChanges = e => {
    setLogInData({
      ...logInData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading === true) {
    return (
      <>
        <div> Please try again </div>
      </>
    );
  } else {
    return (
      <div className="signinContainer negative-top-margin-adjustment">
        <div>
          <div>
            <h1>Sign in</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                placeholder="Username"
                autoFocus
                onChange={handleChanges}
              />
              <br />
              <label htmlFor="password">Password</label>
              <input
                name="password"
                label="Password"
                type="password"
                id="password"
                placeholder="Password"
                autoComplete="current-password"
                onChange={handleChanges}
              />
            </div>
            <button className="blackButton" type="submit">
              Sign In
            </button>
            <div>
              <div>
                <Link to={`/forgot-password`}>Forgot password?</Link>
              </div>
              <div>
                <Link to={`/register`}>{"New to WunderList? Sign Up"}</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
