const showModalErrorReducer = (state = {display: false, message: ""}, action) => {
    switch (action.type) {
      case "show-error-modal":
        return {display: true, message: action.message};
      case "hide-error-modal":
        return {...state, display: false};
      case "toggle-error-modal":
        return {...state, display: !state.display};
      default:
        return state;
    }
  };
  
  export default showModalErrorReducer;
  