import React from "react";
import { useState, useEffect, useRef } from "react";
import "./chatui.css";

const Message = (props) => {
  console.log("message", props);
  console.log("own", props.own);
  const [open_img, setOpen_img] = useState(false);
  const [src_img, get_src] = useState("");
  return (
    <div
      className={props.own ? "messages-container own" : "messages-container"}
    >
      <div className="total-message">
        <div className="message-avatar">
          <p className="msg-avatar-text">{props.chat.name}</p>
          {/* <p>Dr</p> */}
        </div>
        {props.chat.type === "text" ? (
          <p className="message-text">{props.chat.msg}</p>
        ) : open_img ? (
          <div id="myModal" className="modal_image">
            <span className="close" onClick={(e) => setOpen_img(false)}>
              &times;
            </span>
            <img alt={props.chat.msg} className="modal-content" src={src_img} />
          </div>
        ) : (
          <img
            alt={props.chat.msg}
            onClick={(e) => {
              setOpen_img(true);
              get_src(props.chat.msg);
            }}
            width="300px"
            height="250px"
            src={props.chat.msg}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
