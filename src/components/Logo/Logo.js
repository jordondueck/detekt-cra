import React, { Fragment } from "react";
import logo from "./logo-noname.png";

const Logo = () => {
  return (
    <Fragment>
      <img className="logo__image" src={logo} alt="detekt logo" />
    </Fragment>
  );
};

export default Logo;
