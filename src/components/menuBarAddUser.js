import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUserToRoom } from "../actions/menuBarActions";
import { useForm } from "../customHooks/useForm";

const contactListShow = { height: "8rem" };
const contactListHide = { height: 0 };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const MenuBarAddUser = () => {
  const dispatch = useDispatch();
  const showAddUser = useSelector((state) => state.showAddUserReducer);
  const disableAddUser = useSelector((state) => state.menuBarReducer);
  const addBox = useRef(0);
  const addUser = useForm();

  const submitAddUserToChatRoom = (e) => {
    e.preventDefault();
    dispatch(addUserToRoom(addUser.userDetails));
    addUser.setUserDetails({ ...addUser.userDetails, roomName: "" });
    addBox.current.value = "";
  };

  return (
    <form className="add-user-form" autoComplete="off">
      <div
        className="menubar-option"
        onClick={() => dispatch({ type: "toggle-add-user" })}
      >
        <span className="menubar-select-room">Add User To Room</span>
        <span
          className="menubar-dropdown"
          style={showAddUser ? buttonPointDown : buttonPointRight}
        ></span>
      </div>
      <div
        className="contactlist-container"
        style={showAddUser ? contactListShow : contactListHide}
      >
        <input
          type="text"
          name="username"
          className="chatroom-textbox mb"
          placeholder="User name..."
          disabled={disableAddUser === "empty"}
          ref={addBox}
          onChange={(e) => addUser.handleChange(e)}
        />
        <button
          disabled={disableAddUser === "empty"}
          onClick={(e) => submitAddUserToChatRoom(e)}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default MenuBarAddUser;
