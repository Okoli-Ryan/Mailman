import { Db, Auth, FieldValue } from "../services/firebase";

export const sendMessage = (payload) => {
  return (dispatch, getState) => {
    Db.collection("chatrooms")
      .doc(getState().menuBarReducer)
      .update({
        [`messages.data${Date.now()}`]: {
          sender: Auth.currentUser.email,
          text: payload,
          timestamp: FieldValue.serverTimestamp(),
        },
      });
  };
};
