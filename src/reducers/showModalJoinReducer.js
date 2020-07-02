const showModalJoinReducer = (state = false, action) => {
  switch (action.type) {
    case "show-join-modal":
      return true;
    case "hide-join-modal":
      return false;
    case "toggle-join-modal":
      return !state;
    default:
      return state;
  }
};

export default showModalJoinReducer;
