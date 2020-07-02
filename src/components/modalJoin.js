import React, { useCallback} from "react";
import { useDispatch, useSelector } from "react-redux";
import { joinChatRoom } from '../actions/menuBarActions'
const showModal = {transform: 'scale(1) translate(-50%, -50%)'}
const hideModal = {transform: 'scale(0) translate(-50%, -50%)'}

const ModalJoin = () => {
  const dispatch = useDispatch();
  const room = useSelector(state => state.currentRoomReducer)
  const modalSelector = useSelector((state) => state.showModalJoinReducer);

    const joinGroupOption = useCallback(() => {
        dispatch({type: 'hide-modal'})
        dispatch(joinChatRoom(room))
    }, [room])

  return (
      <div className="modal modal-join" style={modalSelector ? showModal : hideModal}>
        <p className='modal-text'>{room} group already exists</p>
        <div className="modal-button-container">
          <button onClick={() => joinGroupOption()}>Join Group</button>
          <button onClick={() => dispatch({type: 'hide-modal'})}>Cancel</button>
        </div>
      </div>
    
  );
};

export default ModalJoin;