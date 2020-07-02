import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinChatRoom } from "../actions/menuBarActions";
const showModal = { transform: "scale(1) translate(-50%, -50%)" };
const hideModal = { transform: "scale(0) translate(-50%, -50%)" };

const ModalCreate = () => {
  const dispatch = useDispatch();
  const room = useSelector((state) => state.currentRoomReducer);
  const modalSelector = useSelector((state) => state.showModalCreateReducer);

  const createGroupOption = useCallback(() => {
    dispatch({ type: "hide-modal" });
    dispatch(joinChatRoom(room));
  }, [room]);

  return (
    <div
      className="modal modal-create"
      style={modalSelector ? showModal : hideModal}
    >
      <p className="modal-text">{room} group already exists</p>
      <div className="modal-button-container">
        <button onClick={() => createGroupOption()}>Join Group</button>
        <button onClick={() => dispatch({ type: "hide-modal" })}>Cancel</button>
      </div>
    </div>
  );
};

export default ModalCreate;
