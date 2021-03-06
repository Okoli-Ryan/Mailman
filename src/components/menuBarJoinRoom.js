import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinChatRoom } from "../actions/menuBarActions";
import { useForm } from "../customHooks/useForm";

const contactListShow = { height: "8rem" };
const contactListHide = { height: 0 };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const MenuBarJoinRoom = () => {
  const dispatch = useDispatch();
  const showJoin = useSelector((state) => state.showJoinRoomReducer);
  const joinBox = useRef(0);
  const joinRoom = useForm();
  const submitJoinChatRoom = (e) => {
    e.preventDefault();
    dispatch(joinChatRoom(joinRoom.userDetails));
    joinRoom.setUserDetails({ ...joinRoom.userDetails, roomName: "" });
    joinBox.current.value = "";
  };

  return (
    <form className="join-chatroom-form" autoComplete="off">
      <div
        className="menubar-option"
        onClick={() => dispatch({ type: "toggle-join" })}
      >
        <span className="menubar-select-room">Join A Room</span>
        <span
          className="menubar-dropdown"
          style={showJoin ? buttonPointDown : buttonPointRight}
        ></span>
      </div>
      <div
        className="contactlist-container"
        style={showJoin ? contactListShow : contactListHide}
      >
        <input
          type="text"
          name="roomName"
          className="chatroom-textbox mb"
          placeholder="Chatroom name..."
          ref={joinBox}
          onChange={(e) => joinRoom.handleChange(e)}
        />
        <button
          disabled={joinRoom.userDetails.roomName === ""}
          onClick={(e) => submitJoinChatRoom(e)}
        >
          Join
        </button>
      </div>
    </form>
  );
};

export default MenuBarJoinRoom;
