import React from "react";
import { useDispatch, useSelector } from "react-redux";
const showModal = { transform: "scale(1) translateX(-50%)" };
const hideModal = { transform: "scale(0) translateX(-50%)" };

const ModalError = () => {
  const dispatch = useDispatch();
  const showModalError = useSelector((state) => state.showModalErrorReducer);
  return (
    <div
      style={showModalError.display ? showModal : hideModal}
      className="modal modal-error"
    >
      <p className="modal-text">{showModalError.message}</p>
      <div className="modal-button-container">
        <button
          onClick={() => dispatch({ type: "hide-error-modal" })}
          className="modal-button"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

export default ModalError;
