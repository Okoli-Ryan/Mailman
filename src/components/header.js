import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loginReducer);

  return (
    <div className="header">
      <div className="menu-button-container">
        {user.email && (
          <button
            onClick={() => dispatch({ type: "display" })}
            className="menubar"
          ></button>
        )}
      </div>
      <div className="app-name-container">
        <p>M@ilman</p>
      </div>
      <div>
      </div>
    </div>
  );
};

export default Header;
