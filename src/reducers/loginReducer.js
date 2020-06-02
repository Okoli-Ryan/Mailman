import { Auth } from "../services/firebase";

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "sign-up":
      const signup = async () => {
        try {
          await Auth.createUserWithEmailAndPassword(
            action.payload.email,
            action.payload.password
          );
        } catch (error) {
          console.log(error.message);
          return false;
        }
      };
      signup();
      break;

    case "set-user":
      return action.payload;

    case "log-in":
      const login = async () => {
        try {
          await Auth.signInWithEmailAndPassword(
            action.payload.email,
            action.payload.password
          );
        } catch (error) {
          console.log(error);
          return false;
        }
      };
      login();
      break;
    case "log-out":
      return false;
    default:
      return state;
  }
};

export default loginReducer;
