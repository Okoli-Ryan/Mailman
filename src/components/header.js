import React from "react";
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

const Header = (props) => {
  const dispatch = useDispatch();
  const location = useLocation()
  const user = useSelector((state) => state.loginReducer);
  const room = useSelector((state) => state.menuBarReducer);

  return (
    <div className="header">
      <div className="header-content">
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
        <div></div>
      </div>
      {(location.pathname === "/chatpage") &&
        <div className="room-name">
          <p>{room}</p>
        </div>
}
    </div>
  );
};

export default Header;
