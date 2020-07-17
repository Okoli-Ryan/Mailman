import React, { useEffect, useState, useCallback, useRef } from "react";
import { Db } from "../services/firebase";
import { useSelector } from "react-redux";
import Message from "./message";
import { useDispatch } from "react-redux";
import ModalJoin from "./modalJoin";
import ModalCreate from "./modalCreate";
import ModalUpdate from './modalUpdate'
import StartChatting from "./startChatting"

const ChatView = () => {
  const [messageList, setMessageList] = useState([]);
  const dispatch = useDispatch();
  const chatview = useRef(0);
  const room = useSelector((state) => state.menuBarReducer);

  const arrange = useCallback((e) => {
    // const array = Object.values(e);
    const array = Object.entries(e).map(val => Object.assign({ ...val[1], key: val[0] }))
    array.sort((a, b) => {
      const w = a.timestamp.seconds > b.timestamp.seconds ? 1 : -1;
      return w;
    });

    return array;
  }, []);

  useEffect(() => {
    if (room !== "empty") {
      const unsubscribe = Db.collection("chatrooms")
        .doc(room)
        .onSnapshot((doc) => {
          try {
            const msgList = arrange(doc.data().messages);
            setMessageList(msgList);
            dispatch({ type: "loading-false" });
          } catch (e) {}
        });
      return () => {
        dispatch({ type: "loading-false" });
        unsubscribe();
      };
    }
  }, [room, arrange]);

  useEffect(() => {
    chatview.current.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  // const formatTime = (time) => {
  //   const 
  // }

  return (
    <div className="chat-view" onClick={() => dispatch({type: 'hide'})}>
      <ModalJoin />
      <ModalCreate />
      <ModalUpdate/>
      {messageList.length !== 0 ? (
        messageList.map((msg) => (
          <Message
            sender={msg.sender ? msg.sender : "..."}
            reply={msg.text ? msg.text : "..."}
            time={msg.timestamp ? msg.timestamp.toDate() : "..."}
            _key={msg.key}
          />
        ))) : <StartChatting/>}
      <div ref={chatview}></div>
    </div>
  );
};

export default ChatView;
