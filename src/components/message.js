import React, { useState } from "react";
import { Auth } from "../services/firebase";
import { useDispatch } from "react-redux";
import { deleteMessage, updateMessage } from "../actions/UDmessageAction";

const meMessage = {
  message: {
    backgroundColor: "#74f2fd",
    margin: "1rem 1rem 1rem 5rem",
  },
  messageContainer: {
    alignItems: "flex-end",
  },
};
const youMessage = {
  message: {
    backgroundColor: "beige",
    margin: "1rem 5rem 1rem 1rem",
  },
  messageContainer: {
    alignItems: "flex-start",
  },
};

const showOptionsStyle = {
  top: "0rem",
};

const hideOptionsStyle = {
  top: "-5rem",
};

const Message = ({ sender, time, reply, _key }) => {
  const user = Auth.currentUser.email;
  const dispatch = useDispatch();
  const [showOptions, setShowOptions] = useState(false);

  const updateEvent = () => {
    dispatch({ type: "show-update-modal", payload: _key })
    setShowOptions(false)
  }

  //TODO form validation for menu bar inputs
  //TODO firestore rules for deleting and updating messages
  //TODO friends doc
  return (
    <div
      className="message-container"
      style={
        sender === user
          ? meMessage.messageContainer
          : youMessage.messageContainer
      }
    >
      <div
        className="message"
        style={sender === user ? meMessage.message : youMessage.message}
      >
        <div className="sender">
          <span className="message-email">
            {sender === user ? "me" : sender.split("@", 1)}
          </span>
          <span
            className="message-options"
            style={sender === user ? {display: 'flex'} : {display:'none'}}
            onClick={() => setShowOptions((prevState) => !prevState)}
          >
            {showOptions ? 'x' : '...'}
          </span>
          <div
            className="opt-menu"
            style={showOptions === true ? showOptionsStyle : hideOptionsStyle}
          >
            <div
              className="opt-button"
              onClick={() =>
                updateEvent()
              }
            >
              Update
            </div>
            <div
              className="opt-button"
              onClick={() => dispatch(deleteMessage(_key))}
            >
              Delete
            </div>
          </div>
        </div>
        <div className="reply">{reply}</div>
        <div className="time">
          {time.toString().slice(0, 10) + " " + time.toString().slice(16, 21)}
        </div>
      </div>
    </div>
  );
};

export default Message;
