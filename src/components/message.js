import React from "react";
const meMessage = {
  message: {
  backgroundColor: "#00ffff",
  margin: "1rem 1rem 1rem 5rem",
  },
  messageContainer: {
    alignItems: 'flex-end'
  }
};
const youMessage = {
  message: {
  backgroundColor: "beige",
  margin: "1rem 5rem 1rem 1rem",
  },
  messageContainer: {
    alignItems: 'flex-start'
  }
};

const Message = ({ sender, time, reply }) => {
  return (
    <div className="message-container" style={sender === 'me' ? meMessage.messageContainer : youMessage.messageContainer}>
      <div className="message" style={sender === "me" ? meMessage.message : youMessage.message}>
        <div className="sender">{sender}</div>
        <div className="reply">{reply}</div>
        <div className="time">{time}</div>
      </div>
    </div>
  );
};

export default Message;
