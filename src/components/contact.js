import React from 'react'
import { useDispatch } from 'react-redux'

const Contact = ({room}) => {

    const dispatch = useDispatch();

    return <div className="contact-container">
        <button className="contact" onClick={() => dispatch({type: 'set-current-room', payload: room})}>
            {room}
        </button>
    </div>
}

export default Contact;