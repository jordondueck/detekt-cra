import React from "react";
import logo from "../Logo/logo_text.png";

const Navigation = ({ route, isSignedIn, handleRouteChange }) => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <img className="logo__text" src={logo} alt="detekt logo" />
        </li>
        {route === "signin" ? (
          <li>
            <button
              className="button--text"
              onClick={() => handleRouteChange("registration")}
            >
              Register
            </button>
          </li>
        ) : route === "registration" ? (
          <li>
            <button
              className="button--text"
              onClick={() => handleRouteChange("signin")}
            >
              Sign In
            </button>
          </li>
        ) : isSignedIn ? (
          <li>
            <button
              className="button--text"
              onClick={() => handleRouteChange("signin")}
            >
              Sign Out
            </button>
          </li>
        ) : (
          undefined
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
