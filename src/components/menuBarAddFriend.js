import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../customHooks/useForm";
import { addFriend } from "../actions/menuBarActions";
import { Db } from "../services/firebase";
import LoadingMenu from "./loadingMenu";
import Friend from "./Friend";

const contactListShow = { height: "8rem" };
const contactListHide = { height: 0 };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const MenuBarAddFriend = () => {
  const dispatch = useDispatch();
  const [userFriendsList, setUserFriendsList] = useState([]);
  const showFriends = useSelector((state) => state.showFriendsReducer);
  const user = useSelector((state) => state.loginReducer.email);
  const addFriendForm = useForm();
  const friendBox = useRef(0);

  const submitAddFriend = (e) => {
    e.preventDefault();
    dispatch(addFriend(addFriendForm.userDetails.friend));
    addFriendForm.setUserDetails({
      ...addFriendForm.userDetails,
      friend: "",
    });
    friendBox.current.value = "";
  };

  useEffect(() => {
    const getUserDataList = Db.collection("users")
      .doc(user)
      .onSnapshot((doc) => {
        try {
          setUserFriendsList(doc.data().friends);
        } catch (e) {
          console.log(e);
        }
      });

    return () => getUserDataList();
  }, [user]);

  return (
    <form className="friend-form" autocomplete="off">
      <fieldset>
        <legend>
          <span onClick={() => dispatch({ type: "toggle-friends" })}>
            Add Friend
            <button
              className="dropdown-button"
              style={showFriends ? buttonPointDown : buttonPointRight}
              onClick={(e) => e.preventDefault()}
            ></button>
          </span>
        </legend>
        <div
          className="contactlist-container"
          style={showFriends ? contactListShow : contactListHide}
        >
          <input
            type="text"
            name="friend"
            className="chatroom-textbox mb relative"
            placeholder="Add Friend"
            ref={friendBox}
            onChange={(e) => addFriendForm.handleChange(e)}
          />
          <button
            type="submit"
            disabled={addFriendForm.userDetails.friend === ""}
            onClick={(e) => submitAddFriend(e)}
          >Add Friend</button>
          {userFriendsList.length !== 0 ? (
            userFriendsList
              .sort()
              .map((key) => <Friend friendName={key} key={key} />)
          ) : (
            <LoadingMenu />
          )}
        </div>
      </fieldset>
    </form>
  );
};

export default MenuBarAddFriend;
