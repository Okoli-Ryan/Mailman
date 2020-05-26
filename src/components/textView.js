import React from "react";
import sendButton from "../send-button.svg";

const TextView = () => {

  return (
    <div className="textview">
      <div className="message-view-container">
        <textarea
        placeholder='Send a message...'
        className="message-view"
        rows="1"
        />    
      </div>
      <div className="sendButton-container">
        <button className="sendButton" onClick={() => console.log(2)}>
          <img src={sendButton} alt="" className="sendButton-img" />
        </button>
      </div>
    </div>
  );
};

export default TextView;
