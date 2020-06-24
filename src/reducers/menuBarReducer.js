import { Db, Auth, FieldValue, Function } from "../services/firebase";
import {store} from '../index.js'

const menuBarReducer = (state = "empty", action) => {
  switch (action.type) {
    case "create-chatroom":
        // const user = Auth.currentUser;
        // Db.collection("chatrooms")
        //   .doc(action.payload.roomName)
        //   .set({
        //     authUsers: [user.uid],
        //     messages: {
        //       data: {
        //         sender: "notification",
        //         text: `${action.payload.roomName} has been created`,
        //         timestamp: FieldValue.serverTimestamp(),
        //       },
        //     },
        //     public: action.payload.public,
        //   })
        return 'F'
        

    case "set-current-room":
      return action.payload;

    case "add-user":
      
      return state;

    default:
      return state;
  }
};

export default menuBarReducer;
