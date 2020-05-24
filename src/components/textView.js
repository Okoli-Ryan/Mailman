import React from "react";
import sendButton from "../send-button.svg";

const TextView = () => {
  return (
    <div className="textview">
      <div className="message-view-container">
        <span
        className="message-view"
        role="textbox"
        contentEditable>    
        </span>
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
