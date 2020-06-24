import React from "react";
import { Auth } from '../services/firebase'

const meMessage = {
  message: {
    backgroundColor: "#00ffff",
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

const Message = ({ sender, time, reply }) => {

  const user = Auth.currentUser.email

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
        <div className="sender">{sender}</div>
        <div className="reply">{reply}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  );
};

export default Message;
