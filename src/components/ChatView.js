import React from "react";
import Message from "./message";

const ChatView = () => {

  return (
    <div className="chat-view">
      <Message
        sender="me"
        time={new Date().toLocaleTimeString()}
        reply="Hey There! Hoe the calabsas windown is not on the peplope party when there was just wnough sunshine to radiate the luminousity through the CIA. How is the family and everything in the interstate"
      />
      <Message
        sender="you"
        time={new Date().toLocaleTimeString()}
        reply="Everything is fine darling, you won't belieeeeeve the day i just had. But i'm fine all the way, keep fighting, the grind, you know... Stuff and shit. How's the kids and family tho?"
      />
      <Message
        sender="me"
        time={new Date().toLocaleTimeString()}
        reply="You cant be serious"
      />
      <Message
        sender="me"
        time={new Date().toLocaleTimeString()}
        reply="You know i used to be in the army?"
      />
      <Message
        sender="mike"
        time={new Date().toLocaleTimeString()}
        reply="I never knw you could be so heartless that i cant even begin to imagine how the coronavirus would abe ve able to wipre hout the human race with a laser beam coming at 20,000kmph with its beacker on"
      />
      <Message
        sender="James"
        time={new Date().toLocaleTimeString()}
        reply="Bruh"
      />
    </div>
  );
};

export default ChatView;
