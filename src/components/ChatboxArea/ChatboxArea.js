import React from "react";

import ChatWindow from '../ChatWindow/ChatWindow';
import ChatInput from '../ChatInput/ChatInput';

import './ChatboxArea.css';

const ChatboxArea = props => {
  return (
      <div className="ChatboxArea">
          <ChatWindow />
          <ChatInput />
      </div>
  );
};

export default ChatboxArea;