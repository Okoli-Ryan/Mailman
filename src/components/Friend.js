import React from "react";

const Friend = ({ friendName }) => {

  return (
    <div className="contact-container">
      <button className="contact" onClick={(e) => e.preventDefault()}>{friendName}</button>
    </div>
  );
};

export default Friend;
