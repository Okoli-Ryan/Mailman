const menuBarReducer = (state = "empty", action) => {
  switch (action.type) {
    case "set-current-room":
      return action.payload;

    case "add-user":
      return state;

    default:
      return state;
  }
};

export default menuBarReducer;
