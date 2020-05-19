import React from "react";
import { NavLink } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fab } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

library.add(fab);

const WelcomePage = props => {
  return (
    <div className="negative-top-margin-adjustment">
      <div className="welcomePageContainer">
        <div className="textDiv">
          <h1>Wunderlist</h1>
          <h2>Perfect Reminders</h2>
        </div>
        <button
          className="blackButton"
          onClick={() => props.history.push("/register")}
        >
          Sign Up
        </button>
        <button
          className="whiteButton"
          onClick={() => props.history.push("/signin")}
        >
          Sign In
        </button>
        <br />
        <div className="welcomepage-socialmedia-container">

        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
