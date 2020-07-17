import React from "react";
import { useSelector } from "react-redux";

const Loading = () => {
  const displayLoading = useSelector((state) => state.loadingReducer);
  return (
    displayLoading && (
      <div className="loading fixed">
        <div className="loading-container"></div>
      </div>
    )
  );
};

export default Loading;
