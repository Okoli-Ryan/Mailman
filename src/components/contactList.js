import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/loginAction";
import { useForm } from "../customHooks/useForm";
import {createChatRoom, joinChatRoom, addUserToRoom} from '../actions/menuBarActions'

const stylehide = { left: "-14rem" };
const styleShow = { left: 0 };

const ContactList = () => {
  const dispatch = useDispatch();
  const hideMenu = useSelector((state) => state.hideMenuReducer);
  const disableAddUser = useSelector(state => state.menuBarReducer)
  const createBox = useRef(0), joinBox = useRef(0), addBox = useRef(0)

  const createRoom = useForm(),
    joinRoom = useForm(),
    addUser = useForm();

    const submitCreateChatRoom = (e) => {
      e.preventDefault();
      dispatch(createChatRoom(createRoom.userDetails))
      createRoom.setUserDetails({...createRoom.userDetails, roomName: ''})
      createBox.current.value=""
    }

    const submitJoinChatRoom = (e) => {
      e.preventDefault();
      dispatch(joinChatRoom(joinRoom.userDetails))
      joinRoom.setUserDetails({...joinRoom.userDetails, roomName: ''})
      joinBox.current.value=""
    }

    const submitAddUserToChatRoom = (e) => {
      e.preventDefault();
      dispatch(addUserToRoom(addUser.userDetails))
      addUser.setUserDetails({...addUser.userDetails, username: ''})
      addBox.current.value=""
    }

  return (
    <div className="menu" style={hideMenu ? stylehide : styleShow}>
      <div className="cancel-container">
        <button
          className="cancel"
          onClick={() => dispatch({ type: "hide" })}
        ></button>
      </div>

      <form className="create-chatroom-form">
        <fieldset>
          <legend>Create Chatroom</legend>
          <input
            type="text"
            name="roomName"
            className="chatroom-textbox mb"
            placeholder="Chatroom name..."
            ref={createBox}
            onChange={(e) => createRoom.handleChange(e)}
          />
          <div className="private-public mb">
            <label className="text">private</label>
            <label className="switch">
              <input type="checkbox" onChange={(e) => createRoom.handleCheckbox(e)} name="public"/>
              <span className="slider round"></span>
            </label>
            <label className="text">public</label>
          </div>

          <button type='submit' onClick={(e) => submitCreateChatRoom(e)}>Create</button>
        </fieldset>
      </form>

      <form className="join-chatroom-form">
        <fieldset>
          <legend>Join Chatroom</legend>
          <input
            type="text"
            name="roomName"
            className="chatroom-textbox mb"
            placeholder="Chatroom name..."
            ref={joinBox}
            onChange={(e) => joinRoom.handleChange(e)}
          />
          <button onClick={(e) => submitJoinChatRoom(e)}>Join</button>
        </fieldset>
      </form>

      <form className="add-user-form">
        <fieldset>
          <legend>Add User</legend>
          <input
            type="text"
            name="username"
            className="chatroom-textbox mb"
            placeholder="User name..."
            onChange={(e) => addUser.handleChange(e)}
            disabled={disableAddUser === 'empty'}
            ref={addBox}
          />
          <button onClick={(e) => submitAddUserToChatRoom(e)}>Add</button>
        </fieldset>
      </form>

      <div className="logout-chatroom-form">
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default ContactList;
