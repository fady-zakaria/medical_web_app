import { useEffect, useState } from "react";
import "./videochat.css";
import {
 // channelName,
  config,
  useClient,
  useMicrophoneAndCameraTracks,
} from "./agoraConfig";
import ChatUI from "../Chat_app/ChatUI";
import Video from "./Video";
import Controls from "./Controls";
import { useSelector, useDispatch } from "react-redux";
import { join, leave, channel_name } from "../../../actions";
import { useNavigate } from "react-router-dom";

const VideoCall = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  //disable back button in meeting
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event){
        window.history.pushState(null, document.title,  window.location.href);
    });

    //close button 
    window.addEventListener('beforeunload', function (e) {
      // e.preventDefault();
      dispatch(leave());
      dispatch(channel_name(""));
      e.returnValue = '';
      // console.log(e.returnValue);
      
  });

 

  // const email_dr_video_call = JSON.parse(
  //   JSON.stringify(localStorage.getItem("Dr_email"))
  // );
  // console.log("dr_email from video call:", email_dr_video_call);
  

  const channelName = JSON.parse(useSelector(state => state.meeting_reducer));
  console.log(channelName);
  const [users, setUsers] = useState([]);
  const [start, setStart] = useState(false);
  const client = useClient();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const no = useSelector(state => state.page_reducer);
  console.log(no);
  
  useEffect(() => {
    dispatch(join());
    
    //check for reload 
      if (performance.navigation.type === 1) {
        console.log("This page is reloaded");
        dispatch(leave());
      } else {
        console.log("This page is not reloaded");
      }


    
      //check for duplicate 
    if(no>0){
      dispatch(leave());
      alert("The page is already loaded. Can't Duplicate tab.");
      
      navigate('/user');
      
    }
    else{
      let init = async (name) => {
        client.on("user-published", async (user, mediaType) => {
          await client.subscribe(user, mediaType);
          console.log("subscribe success");
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return [...prevUsers, user];
            });
          }
          if (mediaType === "audio") {
            user.audioTrack.play();
          }
        });
  
        client.on("user-unpublished", (user, mediaType) => {
          console.log("unpublished", user, mediaType);
          if (mediaType === "audio") {
            if (user.audioTrack) user.audioTrack.stop();
          }
          if (mediaType === "video") {
            setUsers((prevUsers) => {
              return prevUsers.filter((User) => User.uid !== user.uid);
            });
          }
        });
  
        client.on("user-left", (user) => {
          console.log("leaving", user);
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        });
  
        try {
          await client.join(config.appId, name, config.token, null);
        } catch (error) {
          console.log("error");
        }
  
        if (tracks) await client.publish([tracks[0], tracks[1]]);
        setStart(true);
      };
  
      if (ready && tracks) {
        try {
          console.log("init ready");
          console.log("channel_name_from_useEffect", channelName);
          init(channelName);
        } catch (error) {
          console.log(error);
        }
      }
    }
   
  }, [channelName, client, ready, tracks]);

  return (
    <div className="meeting-container">
      <div className="meeting-room">
        <div className="main-container-chat">
          <div className="total-video-container">
            {start && tracks && <Video tracks={tracks} users={users} />}
          </div>
          <div className="controls-container">
            {ready && <Controls tracks={tracks} setStart={setStart} />}
          </div>
        </div>
      </div>
      <ChatUI />
    </div>
  );
};

export default VideoCall;
