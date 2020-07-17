const showFriendsReducer = (state = false, action) => {
    switch (action.type) {
      case "toggle-friends":
        return !state;
      default:
        return state;
    }
  };
  
  export default showFriendsReducer;