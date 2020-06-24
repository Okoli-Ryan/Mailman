import { Auth, Db } from "../services/firebase";

export const signUp = (payload) => {
  return (dispatch) => {
    Auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        Db.collection("users").doc(payload.email);
      })
      .then(() => {
        dispatch({ type: "set-user", payload: Auth.currentUser });
      })
      .catch(() => {
        dispatch({ type: "log-out" });
      });
  };
};

export const logout = () => {
  return (dispatch) => {
    Auth.signOut()
      .then(() => {
        dispatch({ type: "log-out" });
      })
      .then(() => {
        dispatch({ type: "set-current-room", payload: "empty" });
      });
  };
};

export const login = (payload) => {
  return (dispatch) => {
    Auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        console.log(Auth.currentUser);
        dispatch({ type: "set-user", payload: Auth.currentUser });
      })
      .catch(() => {
        dispatch({ type: "log-out" });
      });
  };
};

export const setUser = (payload) => {
  return {
    type: "set-user",
    payload,
  };
};
