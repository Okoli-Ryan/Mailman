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
    <form className="add-user-form" autocomplete="off">
      <fieldset>
        <legend>
          <span onClick={() => dispatch({ type: "toggle-add-user" })}>
            Add User To Room
            <button
              className="dropdown-button"
              style={showAddUser ? buttonPointDown : buttonPointRight}
              onClick={(e) => e.preventDefault()}
            ></button>
          </span>
        </legend>
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
      </fieldset>
    </form>
  );
};

export default MenuBarAddUser;
