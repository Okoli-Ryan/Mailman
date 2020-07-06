import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Contact from "./contact";
import { logout } from "../actions/loginAction";
import { useForm } from "../customHooks/useForm";
import {
  createChatRoom,
  joinChatRoom,
  addUserToRoom,
} from "../actions/menuBarActions";
import { Db } from "../services/firebase";

const stylehide = { left: "-15rem" };
const styleShow = { left: 0 };
const contactListShow = { height: "7rem", overflowY: "auto" };
const contactListHide = { height: 0, overflowY: "hidden" };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const ContactList = () => {
  const [contactList, setContactList] = useState([]);
  const user = useSelector((state) => state.loginReducer.email);
  const dispatch = useDispatch();
  const hideMenu = useSelector((state) => state.hideMenuReducer);
  const disableAddUser = useSelector((state) => state.menuBarReducer);
  const showContacts = useSelector((state) => state.showContactsReducer);

  const createBox = useRef(0),
    joinBox = useRef(0),
    addBox = useRef(0);

  const createRoom = useForm(),
    joinRoom = useForm(),
    addUser = useForm();

  const submitCreateChatRoom = (e) => {
    e.preventDefault();
    dispatch(createChatRoom(createRoom.userDetails));
    createRoom.setUserDetails({ ...createRoom.userDetails, roomName: "" });
    createBox.current.value = "";
  };

  const submitJoinChatRoom = (e) => {
    e.preventDefault();
    dispatch(joinChatRoom(joinRoom.userDetails));
    joinRoom.setUserDetails({ ...joinRoom.userDetails, roomName: "" });
    joinBox.current.value = "";
  };

  const submitAddUserToChatRoom = (e) => {
    e.preventDefault();
    dispatch(addUserToRoom(addUser.userDetails));
    addUser.setUserDetails({ ...addUser.userDetails, username: "" });
    addBox.current.value = "";
  };

  useEffect(() => {
    const unsub = Db.collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        try {
          setContactList(doc.data().rooms);
        } catch (e) {
          console.log(e);
        }
      });

    return () => unsub();
  }, [user]);

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
              <input
                type="checkbox"
                onChange={(e) => createRoom.handleCheckbox(e)}
                name="public"
              />
              <span className="slider round"></span>
            </label>
            <label className="text">public</label>
          </div>

          <button type="submit" onClick={(e) => submitCreateChatRoom(e)}>
            Create
          </button>
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
            disabled={disableAddUser === "empty"}
            ref={addBox}
          />
          <button onClick={(e) => submitAddUserToChatRoom(e)}>Add</button>
        </fieldset>
      </form>

      <div className="contact-form">
        <fieldset>
          <legend>
            <span>
              Select Room
              <button
                className="dropdown-button"
                style={showContacts ? buttonPointDown : buttonPointRight}
                onClick={() => dispatch({ type: "toggle-contacts" })}
              ></button>
            </span>
          </legend>
          <div
            className="contactlist-container"
            style={showContacts ? contactListShow : contactListHide}
          >
            {contactList.map((key) => (
              <Contact room={key} key={key} />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="logout-chatroom-form">
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default ContactList;
