const showContactsReducer = (state = false, action) => {
  switch (action.type) {
    case "toggle-contacts":
      return !state;
    default:
      return false;
  }
};

export default showContactsReducer;