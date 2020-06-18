const hideMenuReducer = (state = true, action) => {
  switch (action.type) {
    case "display":
      return false;
    case "hide":
      return true;
    default:
      return state;
  }
};

export default hideMenuReducer;
