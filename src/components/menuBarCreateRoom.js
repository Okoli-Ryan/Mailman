import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import { createChatRoom } from "../actions/menuBarActions";

const contactListShow = { height: "8rem" };
const contactListHide = { height: 0 };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const MenuBarCreateRoom = () => {
  const dispatch = useDispatch();
  const showCreate = useSelector((state) => state.showCreateRoomReducer);
  const createBox = useRef(0);
  const createRoom = useForm();

  const submitCreateChatRoom = (e) => {
    e.preventDefault();
    dispatch(createChatRoom(createRoom.userDetails));
    createRoom.setUserDetails({ ...createRoom.userDetails, roomName: "" });
    createBox.current.value = "";
  };

  return (
    <form className="create-chatroom-form" autoComplete="off">
      <div
        className="menubar-option"
        onClick={() => dispatch({ type: "toggle-create" })}
      >
        <span className="menubar-select-room">Create Room</span>
        <span
          className="menubar-dropdown"
          style={showCreate ? buttonPointDown : buttonPointRight}
        ></span>
      </div>
      <div
        className="contactlist-container"
        style={showCreate ? contactListShow : contactListHide}
      >
        <input
          type="text"
          name="roomName"
          className="chatroom-textbox mb"
          placeholder="Chatroom name..."
          ref={createBox}
          onChange={(e) => createRoom.handleChange(e)}
        />
        <div className="private-public mb">
          <label className="text">Public Room</label>
          <label className="switch">
            <input
              type="checkbox"
              onChange={(e) => createRoom.handleCheckbox(e)}
              name="public"
            />
            <span className="slider round"></span>
          </label>
        </div>

        <button
          type="submit"
          disabled={createRoom.userDetails.roomName === ""}
          onClick={(e) => submitCreateChatRoom(e)}
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default MenuBarCreateRoom;
