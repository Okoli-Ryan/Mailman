const showAddUserReducer = (state = false, action) => {
    switch (action.type) {
      case "toggle-add-user":
        return !state;
      default:
        return state;
    }
  };
  
  export default showAddUserReducer;