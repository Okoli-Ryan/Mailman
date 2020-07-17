import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../actions/loginAction";

const MenuBarLogout = () => {
  const dispatch = useDispatch();

  return (
    <div className="logout-chatroom-form">
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default MenuBarLogout;
