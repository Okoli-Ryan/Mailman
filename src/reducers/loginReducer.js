import { Function } from "../services/firebase";

const loginReducer = (state = false, action) => {
  switch (action.type) {

    case "set-user":
      return action.payload
    case "log-out":
      return false;
    default:
      return state;

    case "searchUser":
      const findUser = Function.httpsCallable("findUser");
      findUser(action.payload).then((user) => {
        console.log(user);
      });
      return state;
  }
};

export default loginReducer;
