import { Auth, Db } from "../services/firebase";

export const signUp = (payload) => {
  return (dispatch) => {
    dispatch({type: 'loading-true'})
    Auth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        Db.collection("users").doc(payload.email).set({
          rooms: [],
          friends: []
        });
      })
      .then(() => {
        dispatch({ type: "set-user", payload: Auth.currentUser });
      })
      .catch(() => {
        dispatch({ type: "log-out" });
        dispatch({type: 'loading-false'})
        dispatch({type: 'show-error-modal'})
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
    dispatch({type: 'loading-true'})
    Auth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        dispatch({ type: "set-user", payload: Auth.currentUser });
      })
      .catch(() => {
        dispatch({ type: "log-out" });
        dispatch({type: 'loading-false'})
        dispatch({type: 'show-error-modal'})
      });
  };
};

export const setUser = (payload) => {
  return {
    type: "set-user",
    payload,
  };
};

//TODO change joinRoom if already exists to set-current-room and addUser action