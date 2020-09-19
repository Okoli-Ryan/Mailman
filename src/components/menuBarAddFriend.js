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
  const [userFriendsList, setUserFriendsList] = useState({friendsArray: [], loaded: false});
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
          setUserFriendsList({friendsArray: doc.data().friends, loaded: true});
        } catch (e) {
          console.log(e);
        }
      });

    return () => getUserDataList();
  }, [user]);

  return (
    <form className="friend-form" autoComplete="off">
       
        <div
          className="menubar-option"
          onClick={() => dispatch({ type: "toggle-friends" })}
        >
          <span className="menubar-select-room">Friend List</span>
          <span
            className="menubar-dropdown"
            style={showFriends ? buttonPointDown : buttonPointRight}
          ></span>
        </div>
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
            style={{marginBottom: '0.4rem'}}
          >
            Add Friend
          </button>
          {userFriendsList.loaded ? (
            userFriendsList.friendsArray.length !==0 ?
            (userFriendsList.friendsArray
              .sort()
              .map((key) => <Friend friendName={key} key={key} />)
            ) : (<p style={{paddingLeft: '1rem'}}>You have not added a friend yet</p>)
          ) : (
            <LoadingMenu />
          )}
        </div>
    </form>
  );
};

export default MenuBarAddFriend;
