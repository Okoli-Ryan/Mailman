const showModalUpdateReducer = (state = {show: false, key: 'empty'}, action) => {
    switch (action.type) {
      case "show-update-modal":
        return {...state, show: true, key: action.payload};
      case "hide-update-modal":
        return {...state, show: false, key: 'empty'};
      default:
        return state;
    }
  };
  
  export default showModalUpdateReducer;