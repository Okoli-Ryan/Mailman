import { Auth, Db, FieldValue } from "../services/firebase";

export const createChatRoom = (payload) => {
  return (dispatch, getState) => {
   
    dispatch({ type: "loading-true" });
    Db.collection("chatrooms")
      .doc(payload.roomName)
      .get()
      .then((doc) => {
        //if doc doesnt exist, create it
        let date = Date.now();
        if (!doc.exists) {
          Db.collection("chatrooms")
            .doc(payload.roomName)
            .set({
              authUsers: [Auth.currentUser.email],
              messages: {
                [`data${date}`]: {
                  sender: "notification",
                  key: "data" + date,
                  text: `${payload.roomName} has been created`,
                  timestamp: FieldValue.serverTimestamp(),
                },
              },
              public: payload.public,
            })
            .then(() => {
              //add room name to Auth.currentUser doc
              Db.collection("users")
                .doc(Auth.currentUser.email)
                .update({
                  rooms: FieldValue.arrayUnion(payload.roomName),
                });
            })
            //change current room on redux
            .then(() => {
              dispatch({ type: "set-current-room", payload: payload.roomName });
            })
            //error in updating messages field
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
          //if document exists, show join modal
          dispatch({ type: "set", payload: payload.roomName });
          dispatch({ type: "loading-false" });
          dispatch({
            type: "show-join-modal",
          });
        }
      })
      //error in checking if doc exists
      .catch((e) => {
        console.log(e);
        dispatch({ type: "loading-false" });
        dispatch({ type: "hide" });
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
        let date = Date.now();
        if (doc.exists) {
          Db.collection("chatrooms")
            .doc(payload.roomName)
            .update({
              authUsers: FieldValue.arrayUnion(Auth.currentUser.email),
              [`messages.data${date}`]: {
                sender: "notification",
                text: `${Auth.currentUser.email} has been added to the group`,
                timestamp: FieldValue.serverTimestamp(),
                key: "data" + date,
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
              dispatch({ type: "loading-false" });
              dispatch({ type: "show-error-modal" });
              dispatch({ type: "hide" });
            });
        } else {
          dispatch({ type: "set", payload: payload.roomName });
          dispatch({ type: "loading-false" });
          dispatch({ type: "show-create-modal" });
          dispatch({ type: "hide" });
        }
      })
      .catch((e) => {
        console.log(e);
        dispatch({ type: "loading-false" });
        dispatch({
          type: "set-current-room",
          payload: getState().menuBarReducer,
        });
        dispatch({ type: "show-error-modal" });
        dispatch({ type: "hide" });
      });
  };
};

export const addUserToRoom = (payload) => {
  return (dispatch, getState) => {
    let date = Date.now();
    Db.collection("chatrooms")
      .doc(getState().menuBarReducer)
      .update({
        authUsers: FieldValue.arrayUnion(payload.username),
        [`messages.data${date}`]: {
          sender: "notification",
          text: `${payload.username} has been added to the group`,
          timestamp: FieldValue.serverTimestamp(),
          key: "data" + date,
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
        console.log("Auth.currentUser added");
      })
      .catch((err) => {
        dispatch({ type: "loading-false" });
        dispatch({ type: "show-error-modal" });
      });
  };
};

export const addFriend = (payload) => {
  return (dispatch, getState) => {
    Db.collection("users")
      .doc(Auth.currentUser.email)
      .update({
        friends: FieldValue.arrayUnion(payload),
      });
  };
};

export const setCurrentRoom = (payload) => {
  return {
    type: "set-current-room",
    payload,
  };
};
