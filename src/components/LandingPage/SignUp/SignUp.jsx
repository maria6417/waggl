import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../NavBar/NavBar";

export default function SignUp(props) {
  return (
    <div>
      <NavBar type="welcome" />
      <h1>Sign Up in here!</h1>
      <Link to="/">
        <button>This is a Link to App "Page"!</button>
      </Link>
    </div>
  );
}
