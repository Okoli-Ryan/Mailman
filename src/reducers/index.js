import loginReducer from "./loginReducer";
import sendMessageReducer from "./sendMessageReducer";
import hideMenuReducer from "./displayMenuReducer";
import menuBarReducer from "./menuBarReducer";
import showContactsReducer from "./showContactsReducer";
import showModalJoinReducer from "./showModalJoinReducer";
import showModalCreateReducer from './showModalCreateReducer';
import showModalErrorReducer from './showModalErrorReducer';
import loadingReducer from "./loadingReducer";
import currentRoomReducer from "./currentRoomReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loginReducer,
  sendMessageReducer,
  hideMenuReducer,
  menuBarReducer,
  showContactsReducer,
  showModalCreateReducer,
  showModalJoinReducer,
  showModalErrorReducer,
  currentRoomReducer,
  loadingReducer,
});

export default allReducers;
