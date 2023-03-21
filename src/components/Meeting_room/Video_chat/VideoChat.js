import React, { useState } from "react";
import "./videochat.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { useDispatch , useSelector } from "react-redux";
import { channel_name } from "../../../actions";
const VideoChat = (props) => {
  const dr_email = props.dr_email;
  console.log("email from videochat", props.dr_email);
  console.log("slot from videochat", props.slot);
  const dispatch =useDispatch();
  const handleJoinMeeting = () => {
    //localStorage.setItem("Dr_email", dr_email);
    dispatch(channel_name(`${props.dr_email} ${props.slot}`));
  };

  const action_state =  JSON.parse(useSelector((state) => state.meeting_reducer))
  console.log(action_state)
  return (
    <div>
      {props.button_state ? (
        <Link to="/user/meetingroom">
          <Button
            variant="contained"
            size="small"
            color="primary"
            onClick={handleJoinMeeting}
          >
            Join Meeting
          </Button>
        </Link>
      ) : (
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleJoinMeeting}
          disabled
        >
          Join Meeting
        </Button>
      )}
    </div>
  );
};

export default VideoChat;
