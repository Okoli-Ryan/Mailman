const showContactsReducer = (state = false, action) => {
  switch (action.type) {
    case "toggle-contacts":
      return !state;
    default:
      return state;
  }
};

export default showContactsReducer;