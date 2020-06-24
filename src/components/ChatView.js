import React, { useEffect, useState, useCallback, useRef } from "react";
import { Db } from "../services/firebase";
import { useSelector } from "react-redux";
import Message from "./message";

const ChatView = () => {
  const [messageList, setMessageList] = useState([]);
  const chatview = useRef(0);
  const room = useSelector((state) => state.menuBarReducer);

  const arrange = useCallback((e) => {
    const array = Object.values(e);
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
          } catch (e) {}
        });
      return () => unsubscribe();
    }
  }, [room, arrange]);

  useEffect(() => {
    chatview.current.scrollIntoView({ behavior: 'smooth'})
  }, [messageList])

  return (
    <div className="chat-view">
      {messageList &&
        messageList.map((msg) => (
          <Message
            sender={msg.sender ? msg.sender : "..."}
            reply={msg.text ? msg.text : "..."}
            time={msg.timestamp ? msg.timestamp.seconds : "..."}
          />
        ))}
        <div ref={chatview}></div>
    </div>
  );
};

export default ChatView;
