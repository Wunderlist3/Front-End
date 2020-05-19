import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register(props) {
  const [signUpData, setSignUpData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);

    axios
      .post("https://wunderlist-02.herokuapp.com/api/auth/register", signUpData)
      .then(res => {
        console.log("res: ", res);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("message", res.data.message);
        localStorage.setItem("userID", res.data.userID);
        setIsLoading(false);
        props.history.push("/my");
      })
      .catch(err => console.log("Sign Up Error: ", err));
  };

  const handleChanges = e => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value
    });
  };

  if (isLoading === true) {
    return (
      <>
        <div>Loading...</div>
      </>
    );
  } else {
    return (
      <div className="registerContainer negative-top-margin-adjustment">
        <div>
          <div>
            <h1>Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div>
                  <label htmlFor="firstName">First Name</label>
                  <input
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    autoComplete="fname"
                    onChange={handleChanges}
                    placeholder="First Name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    autoComplete="lname"
                    onChange={handleChanges}
                    placeholder="Last Name"
                  />
                </div>
                <div>
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    name="username"
                    label="Username"
                    type="username"
                    autoComplete="username"
                    onChange={handleChanges}
                    placeholder="Username"
                  />
                </div>
                <div>
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    onChange={handleChanges}
                    placeholder="Password"
                  />
                </div>
                <div className="termsOfServiceDiv">

                </div>
              </div>
            </div>
            <button className="blackButton" type="submit">
              Sign Up
            </button>
            <div>
              <div>
                <Link to={`/signin`}>Already have an account? Sign in</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
