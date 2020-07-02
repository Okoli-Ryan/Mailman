const currentRoomReducer = (state = "empty", action) => {
  switch (action.type) {
    case "set":
      return action.payload;
    default:
      return state;
  }
};

export default currentRoomReducer;