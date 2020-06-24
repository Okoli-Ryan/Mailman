const currentRoomReducer = (state='empty', action) => {
    switch(action.type){
        case 'set-room':
            return action.payload
            default:
                return state;
    }
}

export default currentRoomReducer