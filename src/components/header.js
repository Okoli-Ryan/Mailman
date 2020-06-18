import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  return (
    <div className="header">
      <div className="menu-button-container">
        <button onClick={() => dispatch({ type: "display" })} className="menubar"></button>
      </div>
      <div className="app-name-container">
        <p>M@ilman</p>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
