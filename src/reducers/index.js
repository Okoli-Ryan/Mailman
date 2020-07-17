import loginReducer from "./loginReducer";
import hideMenuReducer from "./displayMenuReducer";
import menuBarReducer from "./menuBarReducer";
import showContactsReducer from "./showContactsReducer";
import showModalJoinReducer from "./showModalJoinReducer";
import showModalCreateReducer from './showModalCreateReducer';
import showModalErrorReducer from './showModalErrorReducer';
import loadingReducer from "./loadingReducer";
import currentRoomReducer from "./currentRoomReducer";
import showModalUpdateReducer from './showModalUpdateReducer';
import showFriendsReducer from './showFriendsReducer'
import showCreateRoomReducer from './showCreateRoomReducer'
import showJoinRoomReducer from './showJoinRoomReducer'
import showAddUserReducer from './showAddUserReducer'
import { combineReducers } from "redux";

const allReducers = combineReducers({
  loginReducer,
  hideMenuReducer,
  menuBarReducer,
  showContactsReducer,
  showModalCreateReducer,
  showModalJoinReducer,
  showModalErrorReducer,
  currentRoomReducer,
  showFriendsReducer,
  loadingReducer,
  showModalUpdateReducer,
  showCreateRoomReducer,
  showAddUserReducer,
  showJoinRoomReducer
});

export default allReducers;
