import { Auth, Function} from "../services/firebase";

const loginReducer = (state = false, action) => {
  switch (action.type) {
    case "sign-up":
      // const makeAdmin = Function.httpsCallable('addAdminRole')
      Auth.createUserWithEmailAndPassword(
        action.payload.email,
        action.payload.password
      )
        // .then(cred => {
        //   return Db.collection("users").doc(cred.user.uid).set({
        //     email: action.payload.email,
        //   });
        // })
        .then((user) => {
          const makeAdmin = Function.httpsCallable("addAdminRole");
          makeAdmin(action.payload);
        })
        .catch((error) => {
          console.log(error.message);
          return false;
        });
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
      Auth.signOut();
      return false;
    default:
      return state;

    case "searchUser":
        const findUser = Function.httpsCallable('findUser');
        findUser(action.payload).then(user => {
          console.log(user)
        })
        return state;
  }
};

export default loginReducer;
