import React from "react";
import { useDispatch } from 'react-redux'
import { createDM } from '../actions/menuBarActions'
import { Auth } from '../services/firebase'

const Friend = ({ friendName }) => {

  const dispatch = useDispatch()

  function createDMHandler(e){
    e.preventDefault()
    dispatch(createDM({friendName: friendName}))
  }

  return (
    <div className="contact-container">
      <button className="contact" onClick={(e) => createDMHandler(e)}>{friendName}</button>
    </div>
  );
};

export default Friend;
