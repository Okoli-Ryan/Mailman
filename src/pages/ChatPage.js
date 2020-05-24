import React from "react";
import Header from "../components/header";
import ChatView from "../components/ChatView";
import ContactList from "../components/contactList";
import TextView from '../components/textView'

const ChatPage = () => {
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
