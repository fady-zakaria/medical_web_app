import React from "react";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";
import "./chatui.css";
import Message from "./Message";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AiOutlineSend, AiOutlineCloseCircle } from "react-icons/ai";
import { GrAttachment } from "react-icons/gr";
import { storage } from "./../../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useSelector, useDispatch } from "react-redux";

const ChatUI = () => {
  const scroll_down = useRef(null);
  const [open, setopen] = useState(false);
  const [img, setimg] = useState("");
  const token = JSON.parse(useSelector((state) => state.auth));
  const email = JSON.parse(useSelector(state => state.meeting_reducer));
  console.log("from chat ", token);
  const name = "P";
  // const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    scroll_down.current?.scrollIntoView();
  }, [chat]);

  useEffect(() => {
    socketRef.current = io.connect("https://meeting-chat-api.herokuapp.com/");
    socketRef.current.on(
      "message",
      ({ name: name, msg: message, type: type, room: room }) => {
        if(room === email) {
          setChat([
            ...chat,
            { name: "Dr", msg: message, type: type, room: room },
          ]);
        }
      }
    );
    return () => socketRef.current.disconnect();
  }, [chat]);

  const [text, settext] = useState("");

  const onMessageSubmit = (e) => {
    //const { name, text } = state
    if (text !== "") {
      setChat([...chat, { name: name, msg: text, type: "text", room: email }]);
      socketRef.current.emit("message", {
        name: name,
        msg: text,
        type: "text",
        room: email,
      });
      window.scrollTo({ bottom: 0, behavior: "smooth" });
      settext("");
      e.preventDefault();
    }
    //setState({ message: "", name })
  };

  const send_pic = (file) => {
    if (!file) return;
    console.log(file);
    console.log(file.name);

    const storageRef = ref(storage, `/files/${file.name}`);

    //check if image already exists
    getDownloadURL(storageRef)
            .then((url) => {
              console.log(url);
              console.log("yes");
              //send image without upload again 
              setChat([...chat, { name: name, msg: url, type: "img", room: email }]);
                    socketRef.current.emit("message", {
                      name: name,
                      msg: url,
                      type: "img",
                      room: email
                    });
                    setopen(false);
                    window.scrollTo({ bottom: 0, behavior: "smooth" });
            
            })
            .catch((err) => {
              console.log("don't exist");
              console.log(err);
              //upload image on firebase then send it 
              const uploadTask = uploadBytesResumable(storageRef, file);

              uploadTask.on("state_changed", () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then((url) => {
                    console.log(url);
                    setChat([...chat, { name: name, msg: url, type: "img", room: email }]);
                    socketRef.current.emit("message", {
                      name: name,
                      msg: url,
                      type: "img",
                      room: email
                    });
                    setopen(false);
                    window.scrollTo({ bottom: 0, behavior: "smooth" });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
            });

   
  };

  const renderChat = () => {
    console.log("chat", chat);
    return chat.map((chat, index) =>
      chat.name === name ? (
        <Message chat={chat} own key={index} />
      ) : (
        <Message chat={chat} key={index} />
      )
    );
  };

  return (
    <div className="chatui-container">
      <div className="chatboxui">
        <div className="topui">
          <div className="topbar">
            <p className="msg-avatar-text">CHAT WITH DOCTOR</p>
          </div>

          {renderChat()}
          <div ref={scroll_down}></div>
          {/* <Message />
          <Message own />
          <Message />
          <Message /> */}
        </div>
        <div className="bottomUi">
          {!open ? (
            <textarea
              className="chatMessageInput"
              placeholder="Enter your text"
              onChange={(e) => settext(e.target.value)}
              value={text}
            ></textarea>
          ) : (
            <input type="file" onChange={(e) => setimg(e.target.files[0])} />
          )}

          <div
            className="attachFile"
            onClick={open ? (e) => setopen(false) : (e) => setopen(true)}
          >
            {open ? (
              <AiOutlineCloseCircle style={{ color: "white" }} />
            ) : (
              <AttachFileIcon style={{ color: "white" }} />
            )}
          </div>
          <button
            className="chatSubmitButton"
            type="submit"
            onClick={open ? (e) => send_pic(img) : onMessageSubmit}
          >
            <AiOutlineSend style={{ fontSize: "22px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatUI;
