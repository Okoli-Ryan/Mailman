import React from "react";
import Header from "./header";
import ChatView from "./ChatView";
import ContactList from "./contactList";
import TextView from './textView'

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
