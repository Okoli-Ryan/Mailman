import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Contact from "./contact";
import LoadingMenu from "./loadingMenu";
import { Db } from "../services/firebase";

const contactListShow = { height: "8rem" };
const contactListHide = { height: 0 };
const buttonPointRight = { transform: "rotateZ(270deg)" };
const buttonPointDown = { transform: "rotateZ(360deg)" };

const MenuBarSelectRoom = () => {

    const dispatch = useDispatch();
    const showContacts = useSelector((state) => state.showContactsReducer);
    const [userContactList, setUserContactList] = useState([]);
    const user = useSelector((state) => state.loginReducer.email);

    useEffect(() => {
        const getUserDataList = Db.collection("users")
          .doc(user)
          .onSnapshot((doc) => {
            try {
              setUserContactList(doc.data().rooms);
            } catch (e) {
              console.log(e);
            }
          });
    
        return () => getUserDataList();
      }, [user]);

    return (
        <div className="contact-form">
        <fieldset>
          <legend>
            <span onClick={() => dispatch({ type: "toggle-contacts" })}>
              Select Room
              <button
                className="dropdown-button"
                style={showContacts ? buttonPointDown : buttonPointRight}
              ></button>
            </span>
          </legend>
          <div
            className="contactlist-container"
            style={showContacts ? contactListShow : contactListHide}
          >
            {userContactList.length !== 0 ? (
              userContactList
                .sort()
                .map((key) => <Contact room={key} key={key} />)
            ) : (
              <LoadingMenu />
            )}
          </div>
        </fieldset>
      </div>
    )
}

export default MenuBarSelectRoom;