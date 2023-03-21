import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState, useRef } from "react";
// import { ConditionallyRender } from "react-util-kit";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";
import config from "./config";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./chatbotui.css";
import axios from "axios";

const Chatbotui = () => {
  const [showChatbot, setChatbot] = useState(false);

  return (
    <div>
      <div
        className={`${
          showChatbot
            ? "chatbot-container showchatbot-container"
            : "chatbot-container"
        }`}
      >
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
      {/* <Link to="/chat"> */}
      <button className="chat-btn" onClick={() => setChatbot(!showChatbot)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
          class="chat-icon"
        >
          <path d="M192 408h64v-48h-64zm384-216h-32a96 96 0 00-96-96H344V24a24 24 0 00-48 0v72H192a96 96 0 00-96 96H64a48 48 0 00-48 48v128a48 48 0 0048 48h32a96 96 0 0096 96h256a96 96 0 0096-96h32a48 48 0 0048-48V240a48 48 0 00-48-48zM96 368H64V240h32zm400 48a48.14 48.14 0 01-48 48H192a48.14 48.14 0 01-48-48V192a48 48 0 0148-48h256a48 48 0 0148 48zm80-48h-32V240h32zM240 208a48 48 0 1048 48 47.996 47.996 0 00-48-48zm160 0a48 48 0 1048 48 47.996 47.996 0 00-48-48zm-16 200h64v-48h-64zm-96 0h64v-48h-64z"></path>
        </svg>
      </button>
      {/* </Link> */}
      {/* <i class="bi bi-chat-dots"></i> */}
    </div>
  );
};

export default Chatbotui;
