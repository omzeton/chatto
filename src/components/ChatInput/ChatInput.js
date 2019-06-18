import React from "react";

import "./ChatInput.css";

const ChatInput = props => {
  return (
    <div className="ChatInput">
      <div className="ChatInput__Send"></div>
      <form>
        <textarea
          placeholder="Type your message here..."
          className="ChatInput__Input"
        />
      </form>
    </div>
  );
};

export default ChatInput;
