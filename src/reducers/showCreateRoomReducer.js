const showCreateRoomReducer = (state = false, action) => {
    switch (action.type) {
      case "toggle-create":
        return !state;
      default:
        return state;
    }
  };
  
  export default showCreateRoomReducer;