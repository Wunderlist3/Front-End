import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import MainPage from "./Components/MainPage";
import { WelcomePage, Register, Signin, ForgotPassword, Signout, ListItem } from "./Components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="Front-End">
        <Route exact path="/" component={WelcomePage} />

        <Route exact path="/register" component={Register} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/forgot" component={ForgotPassword} />
        <Route exact path="/signout" component={Signout} />

        <PrivateRoute exact path="/my" component={MainPage} />
        

        <PrivateRoute path="/my/list" component={ListItem} />
      </BrowserRouter>
    </div>
  );
}

export default App;
