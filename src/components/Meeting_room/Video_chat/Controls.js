import React, { useState } from "react";
import "./videochat.css";
import { useClient } from "./agoraConfig";
// import Button from "@mui/material/Button";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { channel_name } from "./../../../actions";
import { leave } from "../../../actions";

const Controls = (props) => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const client = useClient();
  // const { tracks, setStart, setInCall } = props;
  const { tracks, setStart } = props;

  const [tracksState, setTracksState] = useState({ video: true, audio: true });

  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!tracksState.audio);
      setTracksState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!tracksState.video);
      setTracksState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    dispatch(leave());
    //localStorage.removeItem("Dr_email");
    // dispatch(channel_name(""));
    navigate("/user");
    // setInCall(false);
  };
  return (
    <>
      <button
        className="meeting-btn"
        onClick={() => {
          mute("audio");
        }}
      >
        {tracksState.audio ? <MicIcon /> : <MicOffIcon />}
      </button>
      <button
        className="meeting-btn"
        onClick={() => {
          mute("video");
        }}
      >
        {tracksState.video ? <VideocamIcon /> : <VideocamOffIcon />}
      </button>
      <button
        className="meeting-btn"
        onClick={() => {
          leaveChannel();
        }}
      >
        <ExitToAppIcon />
        Leave
      </button>
    </>
  );
};

export default Controls;
