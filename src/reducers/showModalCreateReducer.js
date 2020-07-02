const showModalCreateReducer = (state = false, action) => {
    switch (action.type) {
      case "show-create-modal":
        return true;
      case "hide-create-modal":
        return false;
      case "toggle-create-modal":
        return !state;
      default:
        return state;
    }
  };
  
  export default showModalCreateReducer;
  