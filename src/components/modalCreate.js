import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createChatRoom } from "../actions/menuBarActions";
const showModal = { transform: "scale(1) translate(-50%, -50%)" };
const hideModal = { transform: "scale(0) translate(-50%, -50%)" };

const ModalCreate = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.currentRoomReducer);
  const modalSelector = useSelector((state) => state.showModalCreateReducer);
  let createRoomName = {roomName: room}
  const createGroupOptionPublic = useCallback(() => {
    dispatch({ type: "hide-create-modal" });
    dispatch(createChatRoom({...createRoomName, public: true}));
  }, [createRoomName]);

  const createGroupOptionPrivate = useCallback(() => {
    dispatch({ type: "hide-create-modal" });
    dispatch(createChatRoom({...createRoomName, public: false}));
  }, [createRoomName]);

//TODO error modal should remove loading screen first
//TODO showing error, create modal and loggin screen when trying to create group
//TODO test join group modal

  return (
    <div
      className="modal modal-create"
      style={modalSelector ? showModal : hideModal}
    >
      <p className="modal-text">'{room}' room does not exist. Would you like to create it?</p>
      <div className="modal-button-container">
        <button onClick={() => createGroupOptionPublic()}>Create public room</button>
        <button onClick={() => createGroupOptionPrivate()}>Create private room</button>
        <button onClick={() => dispatch({ type: "hide-create-modal" })}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalCreate;
