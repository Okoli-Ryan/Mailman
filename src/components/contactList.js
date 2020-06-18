import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/loginAction";
import { useForm } from "../customHooks/useForm";
import { Function } from '../services/firebase'

const stylehide = { left: "-14rem" };
const styleShow = { left: 0 };

const ContactList = () => {
  const dispatch = useDispatch();
  const hideMenu = useSelector((state) => state.hideMenuReducer);
  const disableAddUser = useSelector(state => state.menuBarReducer)

  const createRoom = useForm(),
    joinRoom = useForm(),
    addUser = useForm();

  return (
    <div className="menu" style={hideMenu ? stylehide : styleShow}>
      <div className="cancel-container">
        <button
          className="cancel"
          onClick={() => dispatch({ type: "hide" })}
        ></button>
      </div>

      <div className="create-chatroom-form">
        <fieldset>
          <legend>Create Chatroom</legend>
          <input
            type="text"
            name="roomName"
            className="chatroom-textbox mb"
            placeholder="Chatroom name..."
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

          <button onClick={() => dispatch({type: 'create-chatroom', payload: createRoom.userDetails})}>Create</button>
        </fieldset>
      </div>

      <div className="join-chatroom-form">
        <fieldset>
          <legend>Join Chatroom</legend>
          <input
            type="text"
            name="roomName"
            className="chatroom-textbox mb"
            placeholder="Chatroom name..."
            onChange={(e) => joinRoom.handleChange(e)}
          />
          <button onClick={() => dispatch({type: 'join-chatroom', payload: joinRoom.userDetails})}>Join</button>
        </fieldset>
      </div>

      <div className="add-user-form">
        <fieldset>
          <legend>Add User</legend>
          <input
            type="text"
            name="username"
            className="chatroom-textbox mb"
            placeholder="User name..."
            onChange={(e) => addUser.handleChange(e)}
            disabled={disableAddUser}
          />
          <button onClick={() => Function.httpsCallable('findUser')(addUser.userDetails.username).then(user => dispatch({type: 'add-user', payload: user})).catch(err => console.log(err))}>Add</button>
        </fieldset>
      </div>

      <div className="logout-chatroom-form">
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default ContactList;
