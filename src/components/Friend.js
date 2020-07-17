import React from "react";

const Friend = ({ friendName }) => {

  return (
    <div className="contact-container">
      <button className="contact">{friendName}</button>
    </div>
  );
};

export default Friend;
