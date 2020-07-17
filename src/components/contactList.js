import React from "react";
import { useSelector } from "react-redux";

import MenuBarSelectRoom from "./menuBarSelectRoom";
import MenuBarAddFriend from "./menuBarAddFriend";
import MenuBarCreateRoom from "./menuBarCreateRoom";
import MenuBarJoinRoom from "./menuBarJoinRoom";
import MenuBarAddUser from "./menuBarAddUser";
import MenuBarLogout from "./menuBarLogout";
import MenuBarCancel from "./menuBarCancel";
import MenuBarEmailContainer from "./menuBarEmailContainer";

const stylehide = { left: "-15rem" };
const styleShow = { left: 0 };

const ContactList = () => {
  const hideMenu = useSelector((state) => state.hideMenuReducer);

  return (
    <div className='menu-container' style={hideMenu ? stylehide : styleShow}>
      <div className="menu">
        <MenuBarCancel />

        <MenuBarEmailContainer />

        <MenuBarSelectRoom />

        <MenuBarAddFriend />

        <MenuBarCreateRoom />

        <MenuBarJoinRoom />

        <MenuBarAddUser />
      </div>
      <div className="menu-logout">
        <MenuBarLogout />
      </div>
    </div>
  );
};

export default ContactList;
