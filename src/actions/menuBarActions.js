import { Auth, Db, FieldValue } from "../services/firebase";

export const createChatRoom = (payload) => {
  return (dispatch, getState) => {
    const user = Auth.currentUser;
    Db.collection("chatrooms").doc(payload.roomName)
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
              console.log(err);
              dispatch({
                type: "set-current-room",
                payload: getState().menuBarReducer,
              });
            });
        } else {
          dispatch({
            type: "set-current-room",
            payload: payload.roomName,
          })
        }
      });
  };
};

export const joinChatRoom = (payload) => {
  return (dispatch, getState) => {
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
      .catch((err) => console.log(err));
  };
};

export const setCurrentRoom = (payload) => {
  return {
    type: "set-current-room",
    payload,
  };
};
