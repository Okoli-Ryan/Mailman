import { Auth, Db, FieldValue } from "../services/firebase";

export const createChatRoom = (payload) => {
  return (dispatch, getState) => {
    //get current user
    const user = Auth.currentUser;

    // check if room exists first, else display modal to join or change group name
    dispatch({ type: "loading-true" });
    Db.collection("chatrooms")
      .doc(payload.roomName)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          Db.collection("chatrooms")
            .doc(payload.roomName)
            .set({
              authUsers: [user.email],
              messages: {
                [`data${Date.now()}`]: {
                  sender: "notification",
                  text: `${payload.roomName} has been created`,
                  timestamp: FieldValue.serverTimestamp(),
                },
              },
              public: payload.public,
            })
            .then(() => {
              Db.collection("users")
                .doc(Auth.currentUser.email)
                .set({
                  rooms: [payload.roomName],
                });
            })
            .then(() => {
              console.log("created");
              dispatch({ type: "set-current-room", payload: payload.roomName });
            })
            .catch((err) => {
              dispatch({ type: "loading-false" });
              console.log(err);
              dispatch({
                type: "set-current-room",
                payload: getState().menuBarReducer,
              });
              dispatch({ type: "show-error-modal" });
            });
        } else {
          dispatch({ type: "set", payload: payload.roomName });
          dispatch({ type: "loading-false" });
          dispatch({
            type: "show-join-modal",
          });
        }
      })
      .catch(() => {
        dispatch({ type: "show-error-modal" });
        dispatch({
          type: "set-current-room",
          payload: getState().menuBarReducer,
        });
      });
  };
};

export const joinChatRoom = (payload) => {
  return (dispatch, getState) => {
    dispatch({ type: "loading-true" });
    Db.collection("chatrooms")
      .doc(payload.roomName)
      .get()
      .then((doc) => {
        if (doc.exists) {
          Db.collection("chatrooms")
            .doc(payload.roomName)
            .update({
              authUsers: FieldValue.arrayUnion(Auth.currentUser.email),
              [`messages.data${Date.now()}`]: {
                sender: "notification",
                text: `${Auth.currentUser.email} has been added to the group`,
                timestamp: FieldValue.serverTimestamp(),
              },
            })
            .then(() => {
              Db.collection("users")
                .doc(Auth.currentUser.email)
                .update({ rooms: FieldValue.arrayUnion(payload.roomName) });
            })
            .then(() => {
              console.log("joined");
              dispatch({ type: "set-current-room", payload: payload.roomName });
            })
            .catch((err) => {
              console.log(err);
              dispatch({
                type: "set-current-room",
                payload: getState().menuBarReducer,
              });
              dispatch({ type: "show-error-modal" });
            });
        } else {
          dispatch({ type: "set", payload: payload.roomName });
          dispatch({ type: "show-create-modal" });
        }
      })
      .catch(() => {
        dispatch({ type: "set-current-room" });
        dispatch({ type: "show-error-modal" });
      });
  };
};

export const addUserToRoom = (payload) => {
  return (dispatch, getState) => {
    Db.collection("chatrooms")
      .doc(getState().menuBarReducer)
      .update({
        authUsers: FieldValue.arrayUnion(payload.username),
        [`messages.data${Date.now()}`]: {
          sender: "notification",
          text: `${payload.username} has been added to the group`,
          timestamp: FieldValue.serverTimestamp(),
        },
      })
      .then(() => {
        Db.collection("users")
          .doc(payload.username)
          .update({
            rooms: FieldValue.arrayUnion(getState().menuBarReducer),
          });
      })
      .then(() => {
        console.log("user added");
      })
      .catch((err) => {
        dispatch({ type: "show-error-modal" });
      });
  };
};

export const setCurrentRoom = (payload) => {
  return {
    type: "set-current-room",
    payload,
  };
};
