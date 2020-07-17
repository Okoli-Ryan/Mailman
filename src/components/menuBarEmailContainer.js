import React from "react";
import { useSelector } from "react-redux";

const MenuBarEmailContainer = () => {
  const user = useSelector((state) => state.loginReducer.email);

  return (
    <div className="active-email-container">
      {user && (
        <div className="user-email-inner-container">
          <span></span>
          <p className="current-user-email">{user.split("@", 1)}</p>
        </div>
      )}
    </div>
  );
};

export default MenuBarEmailContainer;
