const showModalErrorReducer = (state = false, action) => {
    switch (action.type) {
      case "show-error-modal":
        return true;
      case "hide-error-modal":
        return false;
      case "toggle-error-modal":
        return !state;
      default:
        return state;
    }
  };
  
  export default showModalErrorReducer;
  