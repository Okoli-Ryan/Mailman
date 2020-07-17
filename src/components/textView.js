import React, { useRef } from "react";
import sendButton from "../send-button.svg";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import { sendMessage } from "../actions/sendMessageAction";

const TextView = () => {
  const dispatch = useDispatch();
  const message = useForm();
  const textarea = useRef(0);
  const send = () => {
    console.log("sent");
    dispatch(sendMessage(message.userDetails.name));
    message.setUserDetails({ ...message.userDetails, name: "" });
    textarea.current.value = "";
  };

  return (
    <div className="textview" onClick={() => dispatch({type: 'hide'})}>
      <div className="message-view-container">
        <textarea
          placeholder="Send a message..."
          name="name"
          className="message-view"
          rows="1"
          ref={textarea}
          disabled={useSelector((state) => state.menuBarReducer) === "empty"}
          onChange={(e) => message.handleChangeWithCase(e)}
        />
      </div>
      <div className="sendButton-container">
        <button
          className="sendButton"
          disabled={
            useSelector((state) => state.menuBarReducer) === "empty" ||
            !message.userDetails.name
          }
          onClick={() => send()}
        >
          <img src={sendButton} alt="" className="sendButton-img" />
        </button>
      </div>
    </div>
  );
};

export default TextView;
