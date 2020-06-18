import { Db, Auth, FieldValue, Function } from "../services/firebase";

const menuBarReducer = (state = "empty", action) => {
  switch (action.type) {
    case "create-chatroom":
      const user = Auth.currentUser;
      const roomPage = Db.collection("chatrooms")
        .doc(action.payload.roomName)
        .set({
          authUsers: [user.uid],
          messages: {
            data: {
              sender: "notification",
              text: `${action.payload.roomName} has been created`,
              timestamp: FieldValue.serverTimestamp(),
            },
          },
          public: action.payload.public,
        })
        .then(() => {
          console.log("done");
          return action.payload.roomName;
        })
        .catch((err) => console.log(err));
      return roomPage;

    case "join-chatroom":
      const currentPage = Db.collection("chatrooms")
        .doc(action.payload.roomName)
        .update({
          authUsers: FieldValue.arrayUnion(Auth.currentUser.uid),
          messages: {
            data: {
              sender: "notification",
              text: `${Auth.currentUser.email} has been added to the group`,
              timestamp: FieldValue.serverTimestamp(),
            },
          },
        })
        .then(() => {
          console.log("updated");
          return action.payload.roomName;
        })
        .catch((err) => {
          console.log(err);
          return state;
        });
      return currentPage;

    case "add-user":
      Db.collection("chatrooms")
        .doc(state)
        .update({
          authUsers: FieldValue.arrayUnion(action.payload.uid),
          messages: {
            data: {
              sender: "notification",
              text: `${action.payload.email} has been added to the group`,
              timestamp: FieldValue.serverTimestamp(),
            },
          },
        })
        .then(() => console.log(`${action.payload.email} added successfully`));
      return state;

    default:
      return state;
  }
};

export default menuBarReducer;
