import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMessage } from "../actions/UDmessageAction";
import sendButton from "../send-button.svg";

const showModal = { transform: "scale(1) translate(-50%)" };
const hideModal = { transform: "scale(0) translate(-50%)" };

const ModalUpdate = () => {
  const dispatch = useDispatch();
  const modalSelector = useSelector((state) => state.showModalUpdateReducer.show);
  const key = useSelector(state => state.showModalUpdateReducer.key)
  const messageBox = useRef(0)

  const submitEdit = useCallback(() => {
    dispatch(updateMessage(messageBox.current.value, key))
    messageBox.current.value = ""
    dispatch({type: 'hide-update-modal'})
  }, [key])

  return (
    <div
      className="modal modal-update"
      style={modalSelector ? showModal : hideModal}
    >
      <div className="cancel-container">
        <button
          className="cancel"
          onClick={() => dispatch({ type: "hide-update-modal" })}
        ></button>
      </div>
      <p className="modal-text modal-text-update">Edit Message</p>
      <div className="textview">
        <div className="message-view-container">
          <textarea
            placeholder="Send a message..."
            name="name"
            className="message-view"
            rows="1"
            ref={messageBox}
          ></textarea>
        </div>
        <div className="sendButton-container">
          <button
            className="sendButton"
            onClick={
              // dispatch(updateMessage())
              () => submitEdit()
            }
          >
            <img src={sendButton} alt="" className="sendButton-img" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
