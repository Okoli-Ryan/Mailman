const showJoinRoomReducer = (state = false, action) => {
    switch (action.type) {
      case "toggle-join":
        return !state;
      default:
        return state;
    }
  };
  
  export default showJoinRoomReducer;