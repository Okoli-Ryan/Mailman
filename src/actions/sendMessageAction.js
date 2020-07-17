import { Db, Auth, FieldValue } from "../services/firebase";

export const sendMessage = (payload) => {
  return (dispatch, getState) => {
    const date = Date.now()
    Db.collection("chatrooms")
      .doc(getState().menuBarReducer)
      .update({
        [`messages.data${date}`]: {
          sender: Auth.currentUser.email,
          text: payload,
          timestamp: FieldValue.serverTimestamp(),
          key: 'data'+ date
        },
      });
  };
};
