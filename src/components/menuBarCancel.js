import React from "react";
import { useDispatch } from "react-redux";

const MenuBarCancel = () => {
  const dispatch = useDispatch();

  return (
    <div className="cancel-container">
        <button
          className="cancel"
          onClick={() => dispatch({ type: "hide" })}
        ></button>
      </div>
  );
};

export default MenuBarCancel;
