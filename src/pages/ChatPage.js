import React, {useEffect} from "react";
import Header from "../components/header";
import ChatView from "../components/ChatView";
import ContactList from "../components/contactList";
import TextView from '../components/textView'
import { useDispatch } from 'react-redux'

const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({type: 'loading-false'})
  }, [])
  return (
    <div className="chat-page">
      <Header/>
      <ChatView/>
      <ContactList/>
      <TextView/>
    </div>
  );
}

export default ChatPage;
